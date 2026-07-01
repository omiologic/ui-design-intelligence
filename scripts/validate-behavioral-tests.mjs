#!/usr/bin/env node
/**
 * Validates behavioral test fixtures in tests/behavioral/.
 *
 * For each *.behavioral-test.json fixture:
 *   1. Validates the fixture structure against the schema.
 *   2. If referenceExample is declared, loads the artifact and asserts each
 *      requiredSignal check passes against it — deterministically, offline,
 *      without calling any model.
 *
 * Check types:
 *   nodeTypePresent        walk the artifact node tree; confirm a node with
 *                          type === target exists (blueprint artifacts).
 *   fieldPresent           dot-path field is truthy/non-empty in the artifact.
 *   fieldMatchesValue      dot-path field equals expectedValue.
 *   fieldCountAtLeast      dot-path array has >= minCount items.
 *   allArrayItemsHaveField every item in target array has a truthy `field`.
 *   fieldValuesInSet       every target[].field value is in allowedValues set.
 *   overlayHasDismissal    artifact.overlays[] each have .dismissal.methods
 *                          as a non-empty array.
 *   antiPatternAbsent      declaration only; always passes (documents intent).
 *   rubricCriteria         declaration only; always passes (documents intent).
 */

import fs from "node:fs";
import path from "node:path";
import { validateJsonSchema } from "./lib/json-schema-validator.mjs";

const root = process.cwd();
const errors = [];

function fail(message) {
  errors.push(message);
}

function readJson(file) {
  try {
    return JSON.parse(fs.readFileSync(file, "utf8"));
  } catch (err) {
    fail(`${file}: invalid JSON (${err.message})`);
    return null;
  }
}

function walk(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const item = path.join(dir, entry.name);
    return entry.isDirectory() ? walk(item) : [item];
  });
}

// Resolve a dot-notation path against an object.
function resolvePath(obj, dotPath) {
  const parts = dotPath.split(".");
  let cur = obj;
  for (const part of parts) {
    if (cur == null || typeof cur !== "object") return undefined;
    cur = cur[part];
  }
  return cur;
}

// Walk a blueprint node tree and collect all `type` values.
function collectNodeTypes(node, found = new Set()) {
  if (!node || typeof node !== "object") return found;
  if (typeof node.type === "string") found.add(node.type);
  for (const child of node.children ?? []) collectNodeTypes(child, found);
  return found;
}

function allNodeTypes(artifact) {
  const found = collectNodeTypes(artifact.root);
  for (const overlay of artifact.overlays ?? []) collectNodeTypes(overlay, found);
  return found;
}

function checkSignal(signal, artifact, fixturePath, signalIndex) {
  const loc = `${path.relative(root, fixturePath)}: signal[${signalIndex}] "${signal.description}"`;

  // Legacy signals use `value`; new signals use `target`. Support both.
  const target = signal.target ?? signal.value;

  switch (signal.check) {
    case "nodeTypePresent": {
      const types = allNodeTypes(artifact);
      if (!types.has(target)) {
        return `${loc}: node type "${target}" not found in reference artifact`;
      }
      return null;
    }

    case "fieldPresent": {
      const value = resolvePath(artifact, target);
      if (
        value === undefined ||
        value === null ||
        value === "" ||
        (Array.isArray(value) && value.length === 0)
      ) {
        return `${loc}: field "${target}" is absent or empty in reference artifact`;
      }
      return null;
    }

    case "fieldMatchesValue": {
      const value = resolvePath(artifact, target);
      if (value !== signal.expectedValue) {
        return `${loc}: field "${target}" expected "${signal.expectedValue}" but got "${value}"`;
      }
      return null;
    }

    case "fieldCountAtLeast": {
      const value = resolvePath(artifact, target);
      if (!Array.isArray(value)) {
        return `${loc}: field "${target}" is not an array`;
      }
      if (value.length < signal.minCount) {
        return `${loc}: field "${target}" has ${value.length} items, need >= ${signal.minCount}`;
      }
      return null;
    }

    case "allArrayItemsHaveField": {
      const arr = resolvePath(artifact, target);
      if (!Array.isArray(arr)) {
        return `${loc}: "${target}" is not an array`;
      }
      for (const [i, item] of arr.entries()) {
        const v = item?.[signal.field];
        if (v === undefined || v === null || v === "" || (Array.isArray(v) && v.length === 0)) {
          return `${loc}: item [${i}] in "${target}" is missing field "${signal.field}"`;
        }
      }
      return null;
    }

    case "fieldValuesInSet": {
      const arr = resolvePath(artifact, target);
      if (!Array.isArray(arr)) {
        return `${loc}: "${target}" is not an array`;
      }
      const allowed = new Set(signal.allowedValues ?? []);
      for (const [i, item] of arr.entries()) {
        const v = item?.[signal.field];
        if (!allowed.has(v)) {
          return `${loc}: item [${i}] "${target}[].${signal.field}" value "${v}" not in allowedValues`;
        }
      }
      return null;
    }

    case "overlayHasDismissal": {
      const overlays = artifact.overlays;
      if (!Array.isArray(overlays) || overlays.length === 0) {
        return `${loc}: artifact has no overlays to check`;
      }
      for (const [i, overlay] of overlays.entries()) {
        const methods = overlay?.dismissal?.methods;
        if (!Array.isArray(methods) || methods.length === 0) {
          return `${loc}: overlay [${i}] id="${overlay?.id}" missing dismissal.methods`;
        }
      }
      return null;
    }

    case "antiPatternAbsent":
    case "rubricCriteria":
      // Declaration-only — reviewed by evaluators, not mechanically checkable.
      return null;

    default:
      return `${loc}: unknown check type "${signal.check}"`;
  }
}

// ---- main ----

const schema = readJson(path.join(root, "shared/schemas/skill-behavioral-test.schema.json"));
if (!schema) {
  console.error("Could not load skill-behavioral-test.schema.json — aborting.");
  process.exit(1);
}

const explicitFiles = process.argv.slice(2);
const files = explicitFiles.length
  ? explicitFiles.map((f) => path.resolve(root, f))
  : walk(path.join(root, "tests/behavioral")).filter((f) =>
      f.endsWith(".behavioral-test.json")
    );

if (files.length === 0) {
  fail("tests/behavioral: expected at least one .behavioral-test.json fixture");
}

let passedFixtures = 0;
let totalSignals = 0;

for (const file of files.sort()) {
  const fixture = readJson(file);
  if (!fixture) continue;

  // Schema validation
  const schemaErrors = validateJsonSchema(fixture, schema);
  if (schemaErrors.length > 0) {
    for (const error of schemaErrors) fail(`${file}: schema ${error}`);
    continue;
  }

  totalSignals += fixture.requiredSignals?.length ?? 0;

  // Signal checks against referenceExample
  if (!fixture.referenceExample) {
    passedFixtures++;
    continue;
  }

  const refPath = fixture.referenceExample;
  if (path.isAbsolute(refPath)) {
    fail(`${file}: referenceExample must be repository-relative, not absolute`);
    continue;
  }
  const resolved = path.resolve(root, refPath);
  if (!resolved.startsWith(root + path.sep)) {
    fail(`${file}: referenceExample path escapes the repository`);
    continue;
  }
  if (!fs.existsSync(resolved)) {
    fail(`${file}: referenceExample not found: ${refPath}`);
    continue;
  }

  const artifact = readJson(resolved);
  if (!artifact) continue;

  let fixtureOk = true;
  for (const [i, signal] of fixture.requiredSignals.entries()) {
    const err = checkSignal(signal, artifact, file, i);
    if (err) {
      fail(err);
      fixtureOk = false;
    }
  }
  if (fixtureOk) passedFixtures++;
}

if (errors.length) {
  console.error("Behavioral test validation failed:");
  for (const error of errors) console.error(`  - ${error}`);
  process.exit(1);
}

console.log(
  `Behavioral test validation passed: ${passedFixtures} fixture(s), ${totalSignals} signal(s) checked.`
);
