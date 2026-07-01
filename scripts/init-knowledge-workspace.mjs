#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";

const args = process.argv.slice(2);

function usage() {
  return `Usage: node scripts/init-knowledge-workspace.mjs [options]

Creates a project-local ui-knowledge workspace for captured evidence, studies,
audits, extracted patterns, generated blueprints, and lineage records.

Options:
  --out <path>     Workspace directory to create. Default: ./ui-knowledge
  --check          Validate arguments and planned structure without writing.
  --force          Replace an existing index.json if present.
  --help           Show this help text.
`;
}

function fail(message) {
  console.error(`init-knowledge-workspace: ${message}`);
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

if (args.includes("--help")) {
  console.log(usage());
  process.exit(0);
}

const allowed = new Set(["--out", "--check", "--force", "--help"]);
for (let index = 0; index < args.length; index += 1) {
  const item = args[index];
  if (!item.startsWith("--")) continue;
  if (!allowed.has(item)) fail(`unknown option ${item}`);
  if (!["--check", "--force", "--help"].includes(item)) index += 1;
}

const outDir = path.resolve(readOption("--out") ?? "ui-knowledge");
const checkOnly = args.includes("--check");
const force = args.includes("--force");

const directories = [
  "sources",
  "sources/_template-source/pages/_template-page/capture/screenshots",
  "sources/_template-source/pages/_template-page/capture/raw",
  "sources/_template-source/pages/_template-page/studies",
  "sources/_template-source/pages/_template-page/audits",
  "sources/_template-source/pages/_template-page/patterns",
  "patterns/pages",
  "patterns/sections/hero",
  "patterns/sections/faq",
  "patterns/sections/comparison",
  "patterns/sections/testimonials",
  "patterns/components/card",
  "patterns/components/form",
  "patterns/components/dialog",
  "patterns/components/drawer",
  "patterns/interactions",
  "patterns/storytelling",
  "patterns/conversion",
  "content/copy-patterns",
  "content/journey-patterns",
  "content/cta-patterns",
  "content/microcopy-patterns",
  "content/objection-patterns",
  "content/voice-profiles",
  "content/industry-language",
  "blueprints/generated",
  "lineage/blueprint-lineage"
];

const indexFile = path.join(outDir, "index.json");
const indexDocument = {
  version: "0.1.0",
  generatedAt: new Date().toISOString().slice(0, 10),
  patterns: []
};

function relative(file) {
  return path.relative(process.cwd(), file).split(path.sep).join("/");
}

if (checkOnly) {
  if (fs.existsSync(outDir) && !fs.statSync(outDir).isDirectory()) {
    fail(`--out path exists and is not a directory: ${relative(outDir)}`);
  }
  console.log(`Knowledge workspace plan is valid for ${relative(outDir)}.`);
  console.log(`Would create ${directories.length} directories and index.json.`);
  process.exit(0);
}

if (fs.existsSync(outDir) && !fs.statSync(outDir).isDirectory()) {
  fail(`--out path exists and is not a directory: ${relative(outDir)}`);
}

fs.mkdirSync(outDir, { recursive: true });

for (const directory of directories) {
  const absoluteDir = path.join(outDir, directory);
  fs.mkdirSync(absoluteDir, { recursive: true });
  const keepFile = path.join(absoluteDir, ".gitkeep");
  if (!fs.existsSync(keepFile)) fs.writeFileSync(keepFile, "");
}

if (fs.existsSync(indexFile) && !force) {
  console.log(`Kept existing ${relative(indexFile)}. Use --force to replace it.`);
} else {
  fs.writeFileSync(indexFile, `${JSON.stringify(indexDocument, null, 2)}\n`);
  console.log(`Wrote ${relative(indexFile)}.`);
}

console.log(`Initialized knowledge workspace at ${relative(outDir)}.`);
