#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { validateJsonSchema } from "./lib/json-schema-validator.mjs";

const root = process.cwd();
const errors = [];

const requiredCriteria = [
  "journey-clarity",
  "single-primary-action",
  "proof-placement",
  "state-coverage",
  "register-fit",
  "landmark-coverage",
  "responsive-priority",
  "anti-pattern-absence"
];

const allowedRegisters = new Set(["conversion", "utility-product"]);
const allowedModes = new Set(["checklist"]);

function fail(message) {
  errors.push(message);
}

function readJson(file) {
  try {
    return JSON.parse(fs.readFileSync(file, "utf8"));
  } catch (error) {
    fail(`${file}: invalid JSON (${error.message})`);
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

function hasText(value) {
  return typeof value === "string" && value.trim().length > 0;
}

function requireText(record, field, file) {
  if (!hasText(record?.[field])) fail(`${file}: missing text field "${field}"`);
}

function requireExistingRelativeFile(value, file, field) {
  if (!hasText(value)) {
    fail(`${file}: missing relative file field "${field}"`);
    return null;
  }
  if (path.isAbsolute(value)) {
    fail(`${file}: ${field} must be repository-relative, not absolute`);
    return null;
  }
  const resolved = path.resolve(root, value);
  if (!resolved.startsWith(root + path.sep)) {
    fail(`${file}: ${field} must stay inside the repository`);
    return null;
  }
  if (!fs.existsSync(resolved)) {
    fail(`${file}: ${field} does not exist: ${value}`);
    return null;
  }
  return resolved;
}

function checkReferenceBlueprint(fixture, file) {
  const blueprintFile = requireExistingRelativeFile(fixture.referenceBlueprint, file, "referenceBlueprint");
  if (!blueprintFile) return;

  const schema = readJson(path.join(root, "shared/schemas/wireframe-config.schema.json"));
  const blueprint = readJson(blueprintFile);
  if (!schema || !blueprint) return;

  for (const error of validateJsonSchema(blueprint, schema)) {
    fail(`${file}: referenceBlueprint schema ${error}`);
  }
  if (blueprint.type !== "wireframe") {
    fail(`${file}: referenceBlueprint must point to a wireframe blueprint`);
  }
}

function checkCriteria(fixture, file) {
  if (!Array.isArray(fixture.criteria)) {
    fail(`${file}: criteria must be an array`);
    return;
  }

  const names = new Set();
  for (const [index, criterion] of fixture.criteria.entries()) {
    const location = `criteria[${index}]`;
    if (!hasText(criterion?.name)) {
      fail(`${file}: ${location}.name is required`);
      continue;
    }
    if (names.has(criterion.name)) fail(`${file}: duplicate criterion "${criterion.name}"`);
    names.add(criterion.name);

    if (!requiredCriteria.includes(criterion.name)) {
      fail(`${file}: unknown criterion "${criterion.name}"`);
    }
    if (criterion.weight !== 2) {
      fail(`${file}: ${location}.weight must be 2 for the initial 0-2 rubric`);
    }
    if (!Array.isArray(criterion.expectedSignals) || criterion.expectedSignals.length < 2) {
      fail(`${file}: ${location}.expectedSignals must include at least two signals`);
      continue;
    }
    for (const [signalIndex, signal] of criterion.expectedSignals.entries()) {
      if (!hasText(signal)) fail(`${file}: ${location}.expectedSignals[${signalIndex}] must be text`);
    }
  }

  for (const criterion of requiredCriteria) {
    if (!names.has(criterion)) fail(`${file}: missing required criterion "${criterion}"`);
  }
}

const explicitFiles = process.argv.slice(2);
const files = explicitFiles.length
  ? explicitFiles.map((file) => path.resolve(root, file))
  : walk(path.join(root, "tests/quality-golden-set")).filter((file) => file.endsWith(".golden.json"));

if (files.length === 0) {
  fail("tests/quality-golden-set: expected at least one .golden.json fixture");
}

let sawConversion = false;
let sawUtilityProduct = false;

for (const file of files.sort()) {
  const fixture = readJson(file);
  if (!fixture) continue;

  requireText(fixture, "id", file);
  requireText(fixture, "version", file);
  requireText(fixture, "brief", file);
  requireText(fixture, "notes", file);

  if (!allowedRegisters.has(fixture.register)) {
    fail(`${file}: register must be one of ${Array.from(allowedRegisters).join(", ")}`);
  }
  if (fixture.register === "conversion") sawConversion = true;
  if (fixture.register === "utility-product") sawUtilityProduct = true;

  if (!allowedModes.has(fixture.evaluationMode)) {
    fail(`${file}: evaluationMode must be "checklist" for the initial foundation`);
  }
  if (fixture.minimumStrongScore !== 14) {
    fail(`${file}: minimumStrongScore must be 14 to match the documented strong band`);
  }

  requireExistingRelativeFile(fixture.rubric, file, "rubric");
  checkReferenceBlueprint(fixture, file);
  checkCriteria(fixture, file);
}

if (!sawConversion) fail("tests/quality-golden-set: missing conversion fixture");
if (!sawUtilityProduct) fail("tests/quality-golden-set: missing utility-product fixture");

if (errors.length) {
  console.error("Quality golden-set validation failed:");
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(`Quality golden-set validation passed for ${files.length} fixture(s).`);
