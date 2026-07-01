#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import {
  createKnowledgeStorageAdapter,
  loadKnowledgeStorageConfig,
  parseS3Uri,
  redactStorageConfig,
  redactStorageRef,
  storageRefForLocalPath,
  storageRefForS3Object
} from "./lib/knowledge-storage.mjs";

const root = process.cwd();
const args = process.argv.slice(2);

function usage() {
  return `Usage: node scripts/fetch-knowledge-storage.mjs [options]

Fetches a canonical knowledge object by storage reference or S3 URI.

Options:
  --storage-ref <json-or-file>  Storage reference JSON or path to JSON file.
  --s3-uri <uri>                S3 URI to fetch.
  --local-path <path>           Local file path to fetch.
  --provider <name>             local or s3. Inferred from reference when omitted.
  --bucket <name>               S3 bucket override. Prefer env for real values.
  --prefix <prefix>             S3 key prefix. Default: UI_KNOWLEDGE_S3_PREFIX or ui-knowledge/
  --region <region>             AWS region override. Prefer env for real values.
  --out <path>                  Write fetched content to a file instead of stdout.
  --dry-run                     Validate the planned fetch without contacting storage.
  --help                        Show this help text.
`;
}

function fail(message) {
  console.error(`fetch-knowledge-storage: ${message}`);
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

function readStorageRef(value) {
  if (!value) return null;
  if (fs.existsSync(value)) return JSON.parse(fs.readFileSync(value, "utf8"));
  return JSON.parse(value);
}

if (args.includes("--help")) {
  console.log(usage());
  process.exit(0);
}

const allowed = new Set([
  "--storage-ref",
  "--s3-uri",
  "--local-path",
  "--provider",
  "--bucket",
  "--prefix",
  "--region",
  "--out",
  "--dry-run",
  "--help"
]);
for (let index = 0; index < args.length; index += 1) {
  const item = args[index];
  if (!item.startsWith("--")) continue;
  if (!allowed.has(item)) fail(`unknown option ${item}`);
  if (!["--dry-run", "--help"].includes(item)) index += 1;
}

let storageRef = null;
try {
  storageRef = readStorageRef(readOption("--storage-ref"));
} catch (error) {
  fail(`invalid --storage-ref: ${error.message}`);
}

const s3Uri = readOption("--s3-uri");
const localPath = readOption("--local-path");
if (!storageRef && s3Uri) {
  const { bucket, key } = parseS3Uri(s3Uri);
  storageRef = storageRefForS3Object({ bucket, key, objectType: "patternRecord" });
}
if (!storageRef && localPath) {
  storageRef = storageRefForLocalPath(localPath, "patternRecord");
}
if (!storageRef) fail("provide --storage-ref, --s3-uri, or --local-path");

const inferredProvider = storageRef.kind === "s3Uri" ? "s3" : "local";
let config;
try {
  config = loadKnowledgeStorageConfig({
    provider: readOption("--provider") ?? inferredProvider,
    bucket: readOption("--bucket") ?? (storageRef.kind === "s3Uri" ? parseS3Uri(storageRef.uri).bucket : undefined),
    prefix: readOption("--prefix") ?? undefined,
    region: readOption("--region") ?? undefined,
    dryRun: args.includes("--dry-run")
  });
} catch (error) {
  fail(error.message);
}

console.log("Knowledge storage fetch plan:");
console.log(JSON.stringify(redactStorageConfig(config), null, 2));
console.log(`- ${JSON.stringify(redactStorageRef(storageRef))}`);

if (config.dryRun) {
  console.log("Dry run complete. No storage was contacted.");
  process.exit(0);
}

const adapter = createKnowledgeStorageAdapter(config);
const body = await adapter.fetch(storageRef);
const outFile = readOption("--out");
if (outFile) {
  const absoluteOut = path.resolve(root, outFile);
  fs.mkdirSync(path.dirname(absoluteOut), { recursive: true });
  fs.writeFileSync(absoluteOut, body);
  console.log(`Wrote ${path.relative(root, absoluteOut).split(path.sep).join("/")}.`);
} else {
  process.stdout.write(body);
}
