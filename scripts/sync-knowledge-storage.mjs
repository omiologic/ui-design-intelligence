#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import {
  createKnowledgeStorageAdapter,
  loadKnowledgeStorageConfig,
  redactStorageConfig,
  redactStorageRef,
  storageKeyForPattern,
  storageRefForLocalPath,
  storageRefForS3Object
} from "./lib/knowledge-storage.mjs";

const root = process.cwd();
const args = process.argv.slice(2);

function usage() {
  return `Usage: node scripts/sync-knowledge-storage.mjs [options]

Plans or syncs local pattern records to the configured canonical knowledge
storage.

Options:
  --patterns <dir>      Pattern record directory. Default: .convention/knowledge/examples
  --provider <name>     local or s3. Default: UI_KNOWLEDGE_STORAGE_PROVIDER or local
  --local-dir <path>    Local storage root. Default: UI_KNOWLEDGE_LOCAL_DIR or ui-knowledge
  --bucket <name>       S3 bucket override. Prefer env for real values.
  --prefix <prefix>     S3 key prefix. Default: UI_KNOWLEDGE_S3_PREFIX or ui-knowledge/
  --region <region>     AWS region override. Prefer env for real values.
  --dry-run             Validate planned writes without writing or contacting AWS.
  --help                Show this help text.
`;
}

function fail(message) {
  console.error(`sync-knowledge-storage: ${message}`);
  console.error("");
  console.error(usage());
  process.exit(1);
}

function readOption(name) {
  const index = args.indexOf(name);
  if (index === -1) return null;
  const value = args[index + 1];
  if (!value || value.startsWith("--")) fail(`${name} requires a value`);
  return value;
}

function walk(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const item = path.join(dir, entry.name);
    return entry.isDirectory() ? walk(item) : [item];
  });
}

function readJson(file) {
  return JSON.parse(fs.readFileSync(file, "utf8"));
}

function relative(file) {
  return path.relative(root, file).split(path.sep).join("/");
}

if (args.includes("--help")) {
  console.log(usage());
  process.exit(0);
}

const allowed = new Set([
  "--patterns",
  "--provider",
  "--local-dir",
  "--bucket",
  "--prefix",
  "--region",
  "--dry-run",
  "--help"
]);
for (let index = 0; index < args.length; index += 1) {
  const item = args[index];
  if (!item.startsWith("--")) continue;
  if (!allowed.has(item)) fail(`unknown option ${item}`);
  if (!["--dry-run", "--help"].includes(item)) index += 1;
}

let config;
try {
  config = loadKnowledgeStorageConfig({
    provider: readOption("--provider") ?? undefined,
    localDir: readOption("--local-dir") ?? undefined,
    bucket: readOption("--bucket") ?? undefined,
    prefix: readOption("--prefix") ?? undefined,
    region: readOption("--region") ?? undefined,
    dryRun: args.includes("--dry-run")
  });
} catch (error) {
  fail(error.message);
}

const patternsDir = path.resolve(root, readOption("--patterns") ?? ".convention/knowledge/examples");
const patternFiles = walk(patternsDir).filter((file) => file.endsWith(".pattern.json")).sort();
if (patternFiles.length === 0) fail(`no pattern records found under ${relative(patternsDir)}`);

const plans = patternFiles.map((file) => {
  const pattern = readJson(file);
  if (config.provider === "s3") {
    const key = storageKeyForPattern(pattern, config);
    return {
      file,
      pattern,
      storageRef: storageRefForS3Object({ bucket: config.s3Bucket, key, objectType: "patternRecord" })
    };
  }
  const destination = path.join(config.localDir || "ui-knowledge", "patterns", `${pattern.id}.pattern.json`);
  return {
    file,
    pattern,
    storageRef: storageRefForLocalPath(destination, "patternRecord")
  };
});

console.log("Knowledge storage sync plan:");
console.log(JSON.stringify(redactStorageConfig(config), null, 2));

for (const plan of plans) {
  console.log(`- ${relative(plan.file)} -> ${JSON.stringify(redactStorageRef(plan.storageRef))}`);
}

if (config.dryRun) {
  console.log(`Dry run complete. Planned ${plans.length} object write(s); no storage was changed.`);
  process.exit(0);
}

const adapter = createKnowledgeStorageAdapter(config);
for (const plan of plans) {
  const body = `${JSON.stringify(plan.pattern, null, 2)}\n`;
  const written = await adapter.put(plan.storageRef, body);
  console.log(`Wrote ${relative(plan.file)} -> ${JSON.stringify(redactStorageRef(written))}`);
}
