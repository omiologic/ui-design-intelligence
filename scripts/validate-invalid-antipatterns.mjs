#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";

const root = process.cwd();
const validator = path.join(root, "scripts/validate-blueprint-antipatterns.mjs");

const cases = [
  {
    file: "tests/invalid-antipatterns/cta-pileup.ui-blueprint.json",
    expected: ["structural-antipattern CTA pile-up"]
  },
  {
    file: "tests/invalid-antipatterns/missing-responsive.ui-blueprint.json",
    expected: ["structural-antipattern missing responsive.mobile note"]
  },
  {
    file: "tests/invalid-antipatterns/overlay-without-contract.ui-blueprint.json",
    expected: [
      "structural-antipattern overlays[0] missing accessibility.focusManagement",
      "structural-antipattern overlays[0] missing accessibility.keyboardBehavior"
    ]
  },
  {
    file: "tests/invalid-antipatterns/form-without-recovery.ui-blueprint.json",
    expected: ["structural-antipattern form \"contact-form\" missing error and success recovery states"]
  },
  {
    file: "tests/invalid-antipatterns/filler-labels.ui-blueprint.json",
    expected: ["structural-antipattern filler label \"Placeholder\""]
  },
  {
    file: "tests/invalid-antipatterns/decorative-section.ui-blueprint.json",
    expected: ["structural-antipattern decorative section \"decorative-band\" has no content or task job"]
  },
  {
    file: "tests/invalid-antipatterns/dialog-without-task-control.ui-blueprint.json",
    expected: ["structural-antipattern dialog overlays[0] has no task or dismissal control"]
  },
  {
    file: "tests/invalid-antipatterns/navigation-stack.ui-blueprint.json",
    expected: ["structural-antipattern navigation stack in header \"stacked-header\""]
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
  console.error("Invalid anti-pattern validation failed: valid examples no longer pass.");
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
  console.error("Invalid anti-pattern validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(`Invalid anti-pattern validation passed for ${cases.length} invalid fixtures.`);
