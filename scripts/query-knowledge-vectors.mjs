#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import {
  createVectorAdapter,
  embedText,
  explainVectorMatch,
  loadKnowledgeVectorConfig,
  rankMockVectorRecords,
  readVectorRecords,
  redactVectorConfigForLog,
  redactStorageRef
} from "./lib/knowledge-vector.mjs";

const root = process.cwd();
const args = process.argv.slice(2);

function usage() {
  return `Usage: node scripts/query-knowledge-vectors.mjs [options]

Queries vector-backed knowledge records and returns ranked pattern IDs with
canonical storage pointers.

Options:
  --query <text>               Semantic query text.
  --records <path>             Mock vector records JSON for offline query tests.
  --provider <name>            mock or s3-vectors. Default: mock when --records is used.
  --vector-bucket <name>       Vector bucket override. Prefer env for real values.
  --vector-index <name>        Vector index override. Prefer env for real values.
  --region <region>            AWS region override. Prefer env for real values.
  --embedding-provider <name>  mock or bedrock. Default: env value.
  --embedding-model <name>     Embedding model override. Default: env value.
  --filter <key=value>         Metadata filter. Repeatable.
  --limit <n>                  Maximum results. Default: 5
  --out <path>                 Write ranked results to JSON.
  --help                       Show this help text.
`;
}

function fail(message) {
  console.error(`query-knowledge-vectors: ${message}`);
  console.error("");
  console.error(usage());
  process.exit(1);
}

function optionValues(name) {
  const values = [];
  for (let index = 0; index < args.length; index += 1) {
    if (args[index] === name) {
      const value = args[index + 1];
      if (!value || value.startsWith("--")) fail(`${name} requires a value`);
      values.push(value);
    }
  }
  return values;
}

function readOption(name) {
  return optionValues(name)[0] ?? null;
}

function parseFilters() {
  return Object.fromEntries(optionValues("--filter").map((item) => {
    const splitAt = item.indexOf("=");
    if (splitAt === -1) fail(`--filter must be key=value: ${item}`);
    return [item.slice(0, splitAt), item.slice(splitAt + 1)];
  }));
}

if (args.includes("--help")) {
  console.log(usage());
  process.exit(0);
}

const allowed = new Set([
  "--query",
  "--records",
  "--provider",
  "--vector-bucket",
  "--vector-index",
  "--region",
  "--embedding-provider",
  "--embedding-model",
  "--filter",
  "--limit",
  "--out",
  "--help"
]);
for (let index = 0; index < args.length; index += 1) {
  const item = args[index];
  if (!item.startsWith("--")) continue;
  if (!allowed.has(item)) fail(`unknown option ${item}`);
  if (item !== "--help") index += 1;
}

const query = readOption("--query");
if (!query) fail("--query is required");

const recordsFile = readOption("--records");
const provider = readOption("--provider") ?? (recordsFile ? "mock" : undefined);
let config;
try {
  config = loadKnowledgeVectorConfig({
    provider,
    vectorBucket: readOption("--vector-bucket") ?? undefined,
    vectorIndex: readOption("--vector-index") ?? undefined,
    region: readOption("--region") ?? undefined,
    embeddingProvider: readOption("--embedding-provider") ?? undefined,
    embeddingModel: readOption("--embedding-model") ?? undefined
  });
} catch (error) {
  fail(error.message);
}

const filters = parseFilters();
const limit = Number.parseInt(readOption("--limit") ?? "5", 10);
if (!Number.isInteger(limit) || limit < 1) fail("--limit must be a positive integer");

let rawResults;
if (recordsFile) {
  rawResults = rankMockVectorRecords({
    records: readVectorRecords(recordsFile),
    query,
    filters,
    limit
  });
} else {
  const adapter = createVectorAdapter(config);
  rawResults = await adapter.queryVectors({
    query,
    embedding: await embedText(query, config),
    filters,
    limit
  });
}

const results = rawResults.map((result) => ({
  patternId: result.metadata?.patternId ?? result.key,
  score: result.score,
  reason: explainVectorMatch(result, query),
  storageRef: redactStorageRef(result.metadata?.storageRef)
}));

const output = {
  query,
  filters,
  results
};

console.log("Knowledge vector query:");
console.log(JSON.stringify(redactVectorConfigForLog(config), null, 2));
console.log(JSON.stringify(output, null, 2));

const outFile = readOption("--out");
if (outFile) {
  fs.mkdirSync(path.dirname(path.resolve(root, outFile)), { recursive: true });
  fs.writeFileSync(path.resolve(root, outFile), `${JSON.stringify(output, null, 2)}\n`);
}
