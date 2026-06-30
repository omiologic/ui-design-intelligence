#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";

const [installDir] = process.argv.slice(2);
const errors = [];

if (!installDir) {
  console.error("Usage: node scripts/verify-installed-references.mjs <install-dir>");
  process.exit(1);
}

function read(file) {
  return fs.readFileSync(file, "utf8");
}

function referenceLines(text) {
  const lines = text.split("\n");
  const refs = [];
  let inReferences = false;

  for (const line of lines) {
    if (/^##\s+References\s*$/.test(line)) {
      inReferences = true;
      continue;
    }
    if (inReferences && /^##\s+/.test(line)) break;
    if (!inReferences) continue;

    const match = line.match(/`([^`]+)`/);
    if (match) refs.push(match[1]);
  }

  return refs;
}

for (const entry of fs.readdirSync(installDir, { withFileTypes: true })) {
  if (!entry.isDirectory()) continue;
  const skillDir = path.join(installDir, entry.name);
  const skillFile = path.join(skillDir, "SKILL.md");
  if (!fs.existsSync(skillFile)) continue;

  for (const ref of referenceLines(read(skillFile))) {
    if (/^(https?:|app:|file:)/.test(ref)) continue;
    const absoluteRef = path.resolve(skillDir, ref);
    if (!fs.existsSync(absoluteRef)) {
      errors.push(`${entry.name}: missing reference ${ref}`);
    }
  }
}

if (errors.length) {
  console.error("Installed reference verification failed:");
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(`Installed references resolve in ${installDir}`);
