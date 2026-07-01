#!/usr/bin/env node
import { spawnSync } from "node:child_process";
import {
  formatMissingKnowledgeEnvMessage,
  knowledgeEnvKeys,
  loadKnowledgeEnv,
  missingKnowledgeEnv
} from "./lib/knowledge-env.mjs";

const args = process.argv.slice(2);
const runRemote = args.includes("--remote");
const writeRemote = args.includes("--write");
const root = process.cwd();

function usage() {
  return `Usage: node scripts/smoke-knowledge-remote.mjs [options]

Optional remote smoke checks for user-owned AWS knowledge storage.

Options:
  --remote   Opt in to configured remote smoke checks.
  --write    With --remote, perform real storage/vector writes.
  --help     Show this help text.
`;
}

function run(label, commandArgs) {
  const result = spawnSync("node", commandArgs, {
    cwd: root,
    encoding: "utf8",
    stdio: "inherit"
  });
  if (result.error) {
    console.error(`${label} failed: ${result.error.message}`);
    process.exit(1);
  }
  if (result.status !== 0) process.exit(result.status ?? 1);
}

if (args.includes("--help")) {
  console.log(usage());
  process.exit(0);
}

const allowed = new Set(["--remote", "--write", "--help"]);
for (const arg of args) {
  if (!allowed.has(arg)) {
    console.error(`smoke-knowledge-remote: unknown option ${arg}`);
    console.error("");
    console.error(usage());
    process.exit(1);
  }
}

if (!runRemote) {
  console.log("[SKIP] Knowledge remote smoke skipped. Pass --remote to opt in.");
  process.exit(0);
}

const env = loadKnowledgeEnv();
const required = missingKnowledgeEnv({
  ...env,
  [knowledgeEnvKeys.storageProvider]: "s3",
  [knowledgeEnvKeys.vectorProvider]: "s3-vectors"
});

if (required.length > 0) {
  console.log("Knowledge remote smoke skipped. Required remote env vars are missing.");
  console.log(formatMissingKnowledgeEnvMessage(required));
  process.exit(0);
}

run("remote env validation", ["scripts/validate-knowledge-env.mjs", "--check-remote-env"]);

run("remote storage dry run", [
  "scripts/sync-knowledge-storage.mjs",
  "--patterns",
  ".convention/knowledge/examples",
  "--provider",
  "s3",
  "--dry-run"
]);

run("remote vector dry run", [
  "scripts/index-knowledge-vectors.mjs",
  "--patterns",
  ".convention/knowledge/examples",
  "--provider",
  "s3-vectors",
  "--dry-run"
]);

if (!writeRemote) {
  console.log("Knowledge remote smoke preflight passed. Real writes skipped; pass --remote --write to opt in.");
  process.exit(0);
}

run("remote storage write", [
  "scripts/sync-knowledge-storage.mjs",
  "--patterns",
  ".convention/knowledge/examples",
  "--provider",
  "s3"
]);

run("remote vector write", [
  "scripts/index-knowledge-vectors.mjs",
  "--patterns",
  ".convention/knowledge/examples",
  "--provider",
  "s3-vectors"
]);

console.log("Knowledge remote smoke completed with explicit remote writes.");
