#!/usr/bin/env node
import { spawnSync } from "node:child_process";
import {
  knowledgeEnvKeys,
  loadKnowledgeEnv,
  missingKnowledgeEnv
} from "./lib/knowledge-env.mjs";

const root = process.cwd();

function run(commandArgs) {
  const result = spawnSync("node", commandArgs, { cwd: root, stdio: "inherit" });
  if (result.error) {
    console.error(`validate-knowledge-storage: ${result.error.message}`);
    process.exit(1);
  }
  if (result.status !== 0) process.exit(result.status ?? 1);
}

const env = loadKnowledgeEnv();
const required = missingKnowledgeEnv({ ...env, [knowledgeEnvKeys.storageProvider]: "s3" });

if (required.length > 0) {
  console.log("[SKIP] Knowledge storage validation skipped: UI_KNOWLEDGE_S3_BUCKET, UI_KNOWLEDGE_S3_PREFIX, and UI_KNOWLEDGE_AWS_REGION are not configured.");
  console.log("       Run `npm run validate:cloud` in an environment with credentials.");
  process.exit(0);
}

const bucket = env[knowledgeEnvKeys.s3Bucket];
const rawPrefix = env[knowledgeEnvKeys.s3Prefix] || "ui-knowledge/";
const prefix = rawPrefix.endsWith("/") ? rawPrefix : `${rawPrefix}/`;
const patternKey = `${prefix}patterns/credibility-first-healthcare-hero.pattern.json`;

run(["scripts/sync-knowledge-storage.mjs", "--patterns", ".convention/knowledge/examples", "--provider", "s3", "--dry-run"]);
run(["scripts/fetch-knowledge-storage.mjs", "--s3-uri", `s3://${bucket}/${patternKey}`, "--dry-run"]);

console.log("Knowledge storage validation passed (dry run).");
