#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";

const root = process.cwd();
const validator = path.join(root, "scripts/validate-examples.mjs");

const cases = [
  {
    file: "tests/invalid-examples/unknown-node-type.ui-blueprint.json",
    expected: ["schema $.root.children[0].children[0].type must be one of"]
  },
  {
    file: "tests/invalid-examples/bad-id-casing.ui-blueprint.json",
    expected: ["schema $.id must match pattern"]
  },
  {
    file: "tests/invalid-examples/missing-required-field.ui-blueprint.json",
    expected: ["schema $.root.children[0].label is required"]
  },
  {
    file: "tests/invalid-examples/duplicate-node-id.ui-blueprint.json",
    expected: ['duplicate node id "duplicate-node"']
  },
  {
    file: "tests/invalid-examples/out-of-vocabulary-tokens.ui-blueprint.json",
    expected: [
      'role "marketingHeadline" is not an approved content role',
      'layout "masonry" is not an approved layout pattern',
      'state "pressed" is not an approved interaction state'
    ]
  },
  {
    file: "tests/invalid-examples/bad-version-string.ui-blueprint.json",
    expected: ["schema $.version must match pattern"]
  },
  {
    file: "tests/invalid-examples/disallowed-extra-property.ui-blueprint.json",
    expected: ["schema $.theme is not allowed"]
  },
  {
    file: "tests/invalid-examples/card-direct-page.ui-blueprint.json",
    expected: ['type "card" is not allowed inside "page"']
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
  console.error("Invalid-example validation failed: valid examples no longer pass.");
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
  console.error("Invalid-example validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(`Invalid-example validation passed for ${cases.length} invalid fixtures.`);
