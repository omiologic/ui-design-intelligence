#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const errors = [];
const allowedRegisters = new Set(["marketing", "product"]);

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

function loadVocabulary(file, key) {
  const doc = readJson(file);
  const values = doc?.[key];
  if (!Array.isArray(values)) {
    fail(`${file}: expected array property "${key}"`);
    return new Set();
  }
  return new Set(values);
}

function loadNodeTypes(file) {
  const doc = readJson(file);
  const values = doc?.nodeTypes;
  if (!Array.isArray(values)) {
    fail(`${file}: expected array property "nodeTypes"`);
    return new Set();
  }

  const names = new Set();
  for (const item of values) {
    if (typeof item === "string") {
      names.add(item);
    } else if (item && typeof item === "object" && typeof item.name === "string") {
      names.add(item.name);
    } else {
      fail(`${file}: nodeTypes entries must be strings or records with name`);
    }
  }
  return names;
}

function walk(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const item = path.join(dir, entry.name);
    return entry.isDirectory() ? walk(item) : [item];
  });
}

function asArray(value, file, location) {
  if (!Array.isArray(value)) {
    fail(`${file}: ${location} must be an array`);
    return [];
  }
  return value;
}

function expectString(value, file, location) {
  if (typeof value !== "string" || value.length === 0) {
    fail(`${file}: ${location} must be a non-empty string`);
    return false;
  }
  return true;
}

function checkKebab(value, file, location) {
  if (typeof value === "string" && !/^[a-z][a-z0-9]*(?:-[a-z0-9]+)*$/.test(value)) {
    fail(`${file}: ${location} "${value}" must be kebab-case`);
  }
}

function checkTokenSet(values, allowed, file, location, label) {
  for (const value of asArray(values, file, location)) {
    if (!expectString(value, file, `${location}[]`)) continue;
    if (!allowed.has(value)) {
      fail(`${file}: ${location} "${value}" is not an approved ${label}`);
    }
  }
}

const nodeTypes = loadNodeTypes(path.join(root, "shared/vocabulary/node-types.json"));
const layoutPatterns = loadVocabulary(path.join(root, "shared/vocabulary/layout-patterns.json"), "layoutPatterns");
const contentRoles = loadVocabulary(path.join(root, "shared/vocabulary/content-roles.json"), "contentRoles");
const structuralTokens = new Set([...nodeTypes, ...layoutPatterns]);

const explicitFiles = process.argv.slice(2);
const files = explicitFiles.length
  ? explicitFiles.map((file) => path.resolve(root, file))
  : walk(path.join(root, "shared/taste-profiles")).filter((file) => file.endsWith(".json"));

for (const file of files.sort()) {
  const profile = readJson(file);
  if (!profile) continue;

  const expectedName = path.basename(file, ".json");
  if (profile.name !== expectedName) {
    fail(`${file}: name "${profile.name}" must match filename "${expectedName}"`);
  }
  checkKebab(profile.name, file, "name");

  if (!/^\d+\.\d+\.\d+$/.test(profile.version ?? "")) {
    fail(`${file}: version must be semantic version x.y.z`);
  }

  if (!allowedRegisters.has(profile.register)) {
    fail(`${file}: register "${profile.register}" is not approved; expected one of ${[...allowedRegisters].join(", ")}`);
  }

  const rules = profile.rules;
  if (!rules || typeof rules !== "object" || Array.isArray(rules)) {
    fail(`${file}: rules must be an object`);
    continue;
  }

  for (const [index, entry] of asArray(rules.sectionOrder, file, "rules.sectionOrder").entries()) {
    const location = `rules.sectionOrder[${index}]`;
    expectString(entry?.job, file, `${location}.job`);
    checkKebab(entry?.job, file, `${location}.job`);
    expectString(entry?.reason, file, `${location}.reason`);
    checkTokenSet(entry?.preferredStructures, structuralTokens, file, `${location}.preferredStructures`, "node type or layout pattern");
  }

  const layoutSelection = rules.layoutSelection;
  if (!layoutSelection || typeof layoutSelection !== "object" || Array.isArray(layoutSelection)) {
    fail(`${file}: rules.layoutSelection must be an object`);
  } else {
    for (const [key, values] of Object.entries(layoutSelection)) {
      checkTokenSet(values, structuralTokens, file, `rules.layoutSelection.${key}`, "node type or layout pattern");
    }
  }

  const overlayUse = rules.overlayUse;
  if (overlayUse && typeof overlayUse === "object" && !Array.isArray(overlayUse)) {
    checkTokenSet(overlayUse.allowed, nodeTypes, file, "rules.overlayUse.allowed", "node type");
    checkTokenSet(overlayUse.preferred, nodeTypes, file, "rules.overlayUse.preferred", "node type");
  } else {
    fail(`${file}: rules.overlayUse must be an object`);
  }

  if (Array.isArray(rules.contentRoles)) {
    checkTokenSet(rules.contentRoles, contentRoles, file, "rules.contentRoles", "content role");
  }

  for (const [index, antiPattern] of asArray(profile.antiPatterns, file, "antiPatterns").entries()) {
    checkKebab(antiPattern?.name, file, `antiPatterns[${index}].name`);
    expectString(antiPattern?.reason, file, `antiPatterns[${index}].reason`);
  }
}

if (errors.length) {
  console.error("Taste profile validation failed:");
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(`Taste profile validation passed for ${files.length} profile file(s).`);
