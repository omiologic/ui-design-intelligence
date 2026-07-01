#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";

const root = process.cwd();
const validator = path.join(root, "scripts/validate-content.mjs");

const cases = [
  {
    file: "tests/invalid-content/unknown-blueprint-node.content-model.example.json",
    expected: ['$.sections[0].nodeId "missing-product-node" does not exist']
  },
  {
    file: "tests/invalid-content/missing-review-risk.prototype-content.example.json",
    expected: ["generated review-sensitive copy must declare needsReview or inherit review.needsReview"]
  },
  {
    file: "tests/invalid-content/duplicate-tone-id.tone-of-voice-reference.json",
    expected: ['$.tones[1].id duplicates "clear-practical"']
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
  console.error("Invalid-content validation failed: valid content examples no longer pass.");
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
  console.error("Invalid-content validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(`Invalid-content validation passed for ${cases.length} invalid fixture(s).`);
