#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";

const root = process.cwd();
const validator = path.join(root, "scripts/validate-taste-profiles.mjs");

const cases = [
  {
    file: "tests/invalid-taste-profiles/out-of-vocabulary-profile.json",
    expected: [
      'preferredStructures "masonryHero" is not an approved node type or layout pattern',
      'rules.layoutSelection.hero "floatingOrbGrid" is not an approved node type or layout pattern',
      'rules.overlayUse.allowed "lightbox" is not an approved node type'
    ]
  }
];

function runValidator(args = []) {
  return spawnSync(process.execPath, [validator, ...args], {
    cwd: root,
    encoding: "utf8"
  });
}

const validResult = runValidator();
if (validResult.status !== 0) {
  process.stderr.write(validResult.stdout);
  process.stderr.write(validResult.stderr);
  console.error("Invalid taste-profile validation failed: valid profiles no longer pass.");
  process.exit(1);
}

const failures = [];
for (const testCase of cases) {
  const absoluteFile = path.join(root, testCase.file);
  if (!fs.existsSync(absoluteFile)) {
    failures.push(`${testCase.file}: fixture is missing`);
    continue;
  }

  const result = runValidator([testCase.file]);
  const output = `${result.stdout}${result.stderr}`;
  if (result.status === 0) {
    failures.push(`${testCase.file}: expected validation to fail, but it passed`);
    continue;
  }

  for (const expected of testCase.expected) {
    if (!output.includes(expected)) {
      failures.push(`${testCase.file}: expected error containing ${JSON.stringify(expected)}`);
    }
  }
}

if (failures.length) {
  console.error("Invalid taste-profile validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(`Invalid taste-profile validation passed for ${cases.length} invalid fixture(s).`);
