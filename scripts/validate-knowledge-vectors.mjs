#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";
import {
  knowledgeEnvKeys,
  loadKnowledgeEnv,
  missingKnowledgeEnv
} from "./lib/knowledge-env.mjs";

const root = process.cwd();

const env = loadKnowledgeEnv();
if (env[knowledgeEnvKeys.vectorProvider] === "s3-vectors") {
  const required = missingKnowledgeEnv({ ...env, [knowledgeEnvKeys.vectorProvider]: "s3-vectors" });
  if (required.length > 0) {
    console.log("[SKIP] Knowledge vector validation skipped: S3 vector environment variables are not fully configured.");
    console.log("       Run `npm run validate:cloud` in an environment with credentials.");
    process.exit(0);
  }
}
const tmpDir = "/tmp/ui-knowledge-vector-validation";
const vectorFile = path.join(tmpDir, "vectors.json");
const queryFile = path.join(tmpDir, "query-results.json");
const expectedFile = path.join(root, "tests", "knowledge-vectors", "mock-query-results.expected.json");
const errors = [];

function fail(message) {
  errors.push(message);
}

function run(args) {
  const result = spawnSync("node", args, {
    cwd: root,
    encoding: "utf8",
    stdio: "pipe"
  });
  if (result.status !== 0) {
    fail(`${args.join(" ")} failed:\n${result.stderr || result.stdout}`);
  }
  return result;
}

fs.mkdirSync(tmpDir, { recursive: true });

run([
  "scripts/index-knowledge-vectors.mjs",
  "--patterns",
  ".convention/knowledge/examples",
  "--provider",
  "mock",
  "--mock-embeddings",
  "--out",
  vectorFile,
  "--dry-run"
]);

if (!fs.existsSync(vectorFile)) {
  fail("vector fixture was not written");
} else {
  const records = JSON.parse(fs.readFileSync(vectorFile, "utf8"));
  if (records.length !== 3) fail(`expected 3 vector records, got ${records.length}`);
  for (const record of records) {
    if (!record.key) fail("vector record missing key");
    if (!record.text?.includes("summary:")) fail(`${record.key}: projection missing summary text`);
    if (!record.text?.includes("wireframeMapping")) fail(`${record.key}: projection missing wireframe mapping text`);
    if (!record.metadata?.patternId) fail(`${record.key}: metadata missing patternId`);
    if (!record.metadata?.storageRef) fail(`${record.key}: metadata missing storageRef`);
    if (!Array.isArray(record.embedding) || record.embedding.length !== 12) fail(`${record.key}: mock embedding must have 12 dimensions`);
  }
}

const expected = JSON.parse(fs.readFileSync(expectedFile, "utf8"));
run([
  "scripts/query-knowledge-vectors.mjs",
  "--query",
  expected.query,
  "--records",
  vectorFile,
  "--filter",
  "pageTypes=homepage",
  "--limit",
  "3",
  "--out",
  queryFile
]);

if (!fs.existsSync(queryFile)) {
  fail("query fixture was not written");
} else {
  const query = JSON.parse(fs.readFileSync(queryFile, "utf8"));
  const ids = new Set((query.results ?? []).map((result) => result.patternId));
  for (const id of expected.requiredPatternIds) {
    if (!ids.has(id)) fail(`query results did not include required pattern ${id}`);
  }
  for (const result of query.results ?? []) {
    if (!result.reason) fail(`${result.patternId}: missing reason`);
    if (!result.storageRef) fail(`${result.patternId}: missing storageRef`);
  }
}

if (errors.length > 0) {
  console.error("Knowledge vector validation failed:");
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log("Knowledge vector validation passed.");
