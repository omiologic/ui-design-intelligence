#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import {
  createVectorAdapter,
  embedText,
  loadKnowledgeVectorConfig,
  projectPatternToVectorRecord,
  redactVectorConfigForLog,
  redactVectorRecord,
  vectorRecordWithEmbedding,
  writeVectorRecords
} from "./lib/knowledge-vector.mjs";

const root = process.cwd();
const args = process.argv.slice(2);

function usage() {
  return `Usage: node scripts/index-knowledge-vectors.mjs [options]

Projects pattern records into vector-ready records and optionally writes them to
the configured vector index.

Options:
  --patterns <dir>             Pattern record directory. Default: .convention/knowledge/examples
  --provider <name>            none, mock, or s3-vectors
  --vector-bucket <name>       Vector bucket override. Prefer env for real values.
  --vector-index <name>        Vector index override. Prefer env for real values.
  --region <region>            AWS region override. Prefer env for real values.
  --embedding-provider <name>  mock or bedrock. Default: env value.
  --embedding-model <name>     Embedding model override. Default: env value.
  --mock-embeddings            Attach deterministic embeddings for tests.
  --out <path>                 Write planned vector records to JSON.
  --dry-run                    Print planned vector records without writing vectors.
  --help                       Show this help text.
`;
}

function fail(message) {
  console.error(`index-knowledge-vectors: ${message}`);
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
  "--vector-bucket",
  "--vector-index",
  "--region",
  "--embedding-provider",
  "--embedding-model",
  "--mock-embeddings",
  "--out",
  "--dry-run",
  "--help"
]);
for (let index = 0; index < args.length; index += 1) {
  const item = args[index];
  if (!item.startsWith("--")) continue;
  if (!allowed.has(item)) fail(`unknown option ${item}`);
  if (!["--mock-embeddings", "--dry-run", "--help"].includes(item)) index += 1;
}

let config;
try {
  config = loadKnowledgeVectorConfig({
    provider: readOption("--provider") ?? undefined,
    vectorBucket: readOption("--vector-bucket") ?? undefined,
    vectorIndex: readOption("--vector-index") ?? undefined,
    region: readOption("--region") ?? undefined,
    embeddingProvider: readOption("--embedding-provider") ?? undefined,
    embeddingModel: readOption("--embedding-model") ?? undefined,
    mockEmbeddings: args.includes("--mock-embeddings"),
    dryRun: args.includes("--dry-run")
  });
} catch (error) {
  fail(error.message);
}

const patternsDir = path.resolve(root, readOption("--patterns") ?? ".convention/knowledge/examples");
const patternFiles = walk(patternsDir).filter((file) => file.endsWith(".pattern.json")).sort();
if (patternFiles.length === 0) fail(`no pattern records found under ${relative(patternsDir)}`);

const records = patternFiles.map((file) => projectPatternToVectorRecord(readJson(file)));
const shouldEmbed = config.mockEmbeddings || !config.dryRun;
const vectorRecords = shouldEmbed ? [] : records;
if (shouldEmbed) {
  for (const record of records) {
    vectorRecords.push(vectorRecordWithEmbedding(record, await embedText(record.text, config)));
  }
}

const outFile = readOption("--out");
if (outFile) writeVectorRecords(outFile, vectorRecords);

console.log("Knowledge vector index plan:");
console.log(JSON.stringify(redactVectorConfigForLog(config), null, 2));
for (const record of vectorRecords) {
  console.log(`- ${JSON.stringify(redactVectorRecord(record))}`);
}

if (config.dryRun) {
  console.log(`Dry run complete. Planned ${vectorRecords.length} vector record(s); no embeddings or vector writes are required.`);
  process.exit(0);
}

if (!["mock", "s3-vectors"].includes(config.provider)) {
  fail(`provider ${config.provider} cannot write vectors`);
}

const adapter = createVectorAdapter(config);
const result = await adapter.putVectors(vectorRecords);
console.log(`Wrote ${result.count} vector record(s).`);
