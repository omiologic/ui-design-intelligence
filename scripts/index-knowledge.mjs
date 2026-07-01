#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const args = process.argv.slice(2);
const patternsDir = path.resolve(root, valueAfter("--patterns") ?? ".convention/knowledge/examples");
const outFile = path.resolve(root, valueAfter("--out") ?? ".convention/knowledge/examples/knowledge-index.example.json");
const check = args.includes("--check");

function valueAfter(flag) {
  const index = args.indexOf(flag);
  if (index === -1) return null;
  return args[index + 1] ?? null;
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

function existingMetadata() {
  if (!fs.existsSync(outFile)) {
    return {
      version: "0.1.0",
      generatedAt: new Date().toISOString().slice(0, 10)
    };
  }
  const existing = readJson(outFile);
  return {
    version: existing.version ?? "0.1.0",
    generatedAt: existing.generatedAt ?? new Date().toISOString().slice(0, 10)
  };
}

const metadata = existingMetadata();
const patternFiles = walk(patternsDir)
  .filter((file) => file.endsWith(".pattern.json"))
  .sort();

const patterns = patternFiles.map((file) => {
  const pattern = readJson(file);
  return {
    id: pattern.id,
    path: relative(file),
    patternType: pattern.patternType,
    category: pattern.category,
    name: pattern.name,
    summary: pattern.summary,
    tags: pattern.tags,
    confidence: pattern.confidence?.level,
    status: pattern.status,
    ...(pattern.storageRef ? { storageRef: pattern.storageRef } : {})
  };
});

const index = {
  version: metadata.version,
  generatedAt: metadata.generatedAt,
  patterns
};

const output = `${JSON.stringify(index, null, 2)}\n`;

if (check) {
  const existing = fs.existsSync(outFile) ? fs.readFileSync(outFile, "utf8") : "";
  if (existing !== output) {
    console.error(`${relative(outFile)} is out of sync with ${relative(patternsDir)}.`);
    console.error(`Run: node scripts/index-knowledge.mjs --patterns ${relative(patternsDir)} --out ${relative(outFile)}`);
    process.exit(1);
  }
  console.log(`Knowledge index is up to date for ${patterns.length} pattern record(s).`);
} else {
  fs.mkdirSync(path.dirname(outFile), { recursive: true });
  fs.writeFileSync(outFile, output);
  console.log(`Wrote ${relative(outFile)} with ${patterns.length} pattern record(s).`);
}
