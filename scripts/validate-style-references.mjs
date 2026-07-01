#!/usr/bin/env node
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
  } catch (error) {
    fail(`${path.relative(root, file)}: invalid JSON (${error.message})`);
    return null;
  }
}

function uniqueSorted(values) {
  return [...new Set(values)].sort();
}

function resolveBundleManifest(manifest) {
  if (!manifest || !Array.isArray(manifest.includes) || manifest.includes.length === 0) {
    return manifest;
  }

  const expanded = {
    ...manifest,
    skills: manifest.skills ?? [],
    agents: manifest.agents ?? [],
    commands: manifest.commands ?? [],
    shared: manifest.shared ?? []
  };

  for (const includedName of manifest.includes) {
    const included = readJson(path.join(root, "plugins/bundles", includedName, "plugin.json"));
    const resolved = resolveBundleManifest(included);
    expanded.skills.push(...(resolved?.skills ?? []));
    expanded.agents.push(...(resolved?.agents ?? []));
    expanded.commands.push(...(resolved?.commands ?? []));
    expanded.shared.push(...(resolved?.shared ?? []));
  }

  expanded.skills = uniqueSorted(expanded.skills);
  expanded.agents = uniqueSorted(expanded.agents);
  expanded.commands = uniqueSorted(expanded.commands);
  expanded.shared = uniqueSorted(expanded.shared);
  return expanded;
}

function walk(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const item = path.join(dir, entry.name);
    return entry.isDirectory() ? walk(item) : [item];
  });
}

function validateAgainstSchema(doc, schema, file, label) {
  if (!doc || !schema) return;
  for (const error of validateJsonSchema(doc, schema)) {
    fail(`${path.relative(root, file)}: ${label} schema ${error}`);
  }
}

function requireArray(doc, file, key) {
  const value = doc?.[key];
  if (!Array.isArray(value) || value.length === 0) {
    fail(`${path.relative(root, file)}: expected non-empty array property "${key}"`);
    return [];
  }
  return value;
}

function checkUnique(items, file, getId, label) {
  const seen = new Set();
  for (const item of items) {
    const id = getId(item);
    if (typeof id !== "string" || id.length === 0) {
      fail(`${path.relative(root, file)}: ${label} missing id`);
      continue;
    }
    if (seen.has(id)) fail(`${path.relative(root, file)}: duplicate ${label} id "${id}"`);
    seen.add(id);
  }
  return seen;
}

const schemasDir = path.join(root, ".convention/schemas");
const styleReferenceSchema = readJson(path.join(schemasDir, "style-reference.schema.json"));
const styleApplicationSchema = readJson(path.join(schemasDir, "style-application.schema.json"));
const stylePatchSchema = readJson(path.join(schemasDir, "style-patch.schema.json"));
const styleBlendSchema = readJson(path.join(schemasDir, "style-blend.schema.json"));

const styleCategoryEnum = new Set(styleReferenceSchema?.$defs?.styleCategory?.enum ?? []);
const scopeEnum = new Set(styleReferenceSchema?.$defs?.scope?.enum ?? []);
const intensityEnum = new Set(styleReferenceSchema?.$defs?.intensity?.enum ?? []);
const designSystemMappingKeys = new Set(Object.keys(styleReferenceSchema?.$defs?.designSystemMapping?.properties ?? {}));
const prototypeMappingKeys = new Set(Object.keys(styleReferenceSchema?.$defs?.prototypeMapping?.properties ?? {}));
const allowedComponentMappingKeys = new Set([
  "badges",
  "buttons",
  "cards",
  "dashboard",
  "dialogs",
  "drawers",
  "forms",
  "hero",
  "navigation",
  "sections",
  "tables",
  "tabs"
]);

const styleRoot = path.join(root, ".convention/style-references");
const categoryFile = path.join(styleRoot, "categories.json");
const indexFile = path.join(styleRoot, "index.json");
const categories = readJson(categoryFile);
const index = readJson(indexFile);

const categoryRecords = requireArray(categories, categoryFile, "categories");
const categoryIds = checkUnique(categoryRecords, categoryFile, (item) => item.id, "category");
for (const category of categoryRecords) {
  if (!styleCategoryEnum.has(category.id)) {
    fail(`${path.relative(root, categoryFile)}: category "${category.id}" is not allowed by style-reference.schema.json`);
  }
  for (const styleId of category.starterStyles ?? []) {
    if (typeof styleId !== "string" || styleId.length === 0) {
      fail(`${path.relative(root, categoryFile)}: category "${category.id}" has invalid starter style`);
    }
  }
}

const indexRecords = requireArray(index, indexFile, "styles");
const indexedIds = checkUnique(indexRecords, indexFile, (item) => item.id, "style");
const indexedPaths = new Map();
for (const item of indexRecords) {
  if (!categoryIds.has(item.category)) {
    fail(`${path.relative(root, indexFile)}: style "${item.id}" references unknown category "${item.category}"`);
  }
  if (!styleCategoryEnum.has(item.category)) {
    fail(`${path.relative(root, indexFile)}: style "${item.id}" category "${item.category}" is not allowed by schema`);
  }
  if (typeof item.path !== "string" || !item.path.endsWith(".style.json")) {
    fail(`${path.relative(root, indexFile)}: style "${item.id}" path must end with .style.json`);
    continue;
  }
  indexedPaths.set(item.id, path.join(styleRoot, item.path));
}

const styleFiles = walk(path.join(styleRoot, "styles")).filter((file) => file.endsWith(".style.json")).sort();
if (styleFiles.length === 0) fail(".convention/style-references/styles: expected at least one style record");
for (const file of styleFiles) {
  const doc = readJson(file);
  validateAgainstSchema(doc, styleReferenceSchema, file, "style-reference");
  if (!doc) continue;

  if (!indexedIds.has(doc.id)) {
    fail(`${path.relative(root, file)}: style id "${doc.id}" is missing from .convention/style-references/index.json`);
  } else if (path.resolve(indexedPaths.get(doc.id)) !== path.resolve(file)) {
    fail(`${path.relative(root, file)}: index path for style "${doc.id}" does not match this file`);
  }

  if (doc.category && !categoryIds.has(doc.category)) {
    fail(`${path.relative(root, file)}: style category "${doc.category}" is missing from categories.json`);
  }

  const expectedFileName = `${doc.id}.style.json`;
  if (path.basename(file) !== expectedFileName) {
    fail(`${path.relative(root, file)}: file name should be ${expectedFileName}`);
  }

  for (const key of Object.keys(doc.designSystemMapping ?? {})) {
    if (!designSystemMappingKeys.has(key)) {
      fail(`${path.relative(root, file)}: designSystemMapping has unsupported key "${key}"`);
    }
  }
  for (const key of Object.keys(doc.componentMapping ?? {})) {
    if (!allowedComponentMappingKeys.has(key)) {
      fail(`${path.relative(root, file)}: componentMapping has unsupported key "${key}"`);
    }
  }
  for (const key of Object.keys(doc.prototypeMapping ?? {})) {
    if (!prototypeMappingKeys.has(key)) {
      fail(`${path.relative(root, file)}: prototypeMapping has unsupported key "${key}"`);
    }
  }

  for (const [scope, rule] of Object.entries(doc.applicationScopes ?? {})) {
    if (!scopeEnum.has(scope)) fail(`${path.relative(root, file)}: applicationScopes has unsupported scope "${scope}"`);
    if (rule?.defaultIntensity && !intensityEnum.has(rule.defaultIntensity)) {
      fail(`${path.relative(root, file)}: applicationScopes.${scope}.defaultIntensity is unsupported`);
    }
  }

  const source = doc.source;
  if (!source || typeof source !== "object") {
    fail(`${path.relative(root, file)}: source metadata is required`);
  } else {
    if (source.type === "externalReference" && typeof source.url !== "string") {
      fail(`${path.relative(root, file)}: externalReference source requires url`);
    }
    const license = String(source.licenseNotes ?? "").toLowerCase();
    if (!license.includes("no copied") && !license.includes("do not copy") && !license.includes("not copy")) {
      fail(`${path.relative(root, file)}: source.licenseNotes must explicitly forbid or deny copied external prose`);
    }
  }
}

for (const item of indexRecords) {
  if (!fs.existsSync(path.join(styleRoot, item.path))) {
    fail(`${path.relative(root, indexFile)}: indexed style file does not exist: ${item.path}`);
  }
}
for (const category of categoryRecords) {
  for (const styleId of category.starterStyles ?? []) {
    if (!indexedIds.has(styleId)) {
      fail(`${path.relative(root, categoryFile)}: category "${category.id}" starter style "${styleId}" is missing from index`);
    }
  }
}

const templateChecks = [
  [".convention/templates/style-reference.json", styleReferenceSchema, "style-reference"],
  [".convention/templates/style-application.json", styleApplicationSchema, "style-application"],
  [".convention/templates/style-patch.json", stylePatchSchema, "style-patch"],
  [".convention/templates/style-blend.json", styleBlendSchema, "style-blend"]
];
for (const [relativeFile, schema, label] of templateChecks) {
  const file = path.join(root, relativeFile);
  validateAgainstSchema(readJson(file), schema, file, label);
}

const exampleChecks = [
  [file => file.endsWith("style-application.site.example.json") || file.endsWith("style-application.section.example.json") || file.endsWith("style-application.component.example.json") || file.endsWith("style-application.prototype.example.json") || file.endsWith("style-application.hero.example.json") || file.endsWith("style-application.pricing-section.example.json") || file.endsWith("style-application.card-grid.example.json") || file.endsWith("style-application.drawer.example.json") || file.endsWith("style-application.badge-system.example.json"), styleApplicationSchema, "style-application"],
  [file => file.endsWith("style-patch.section-preserve-brand.example.json") || file.endsWith("style-patch.component-preserve-typography.example.json"), stylePatchSchema, "style-patch"],
  [file => file.endsWith("style-blend.hero-luxury-aurora.example.json"), styleBlendSchema, "style-blend"]
];
const sharedExampleFiles = walk(path.join(root, ".convention/examples")).filter((file) => file.endsWith(".json"));
for (const [predicate, schema, label] of exampleChecks) {
  const files = sharedExampleFiles.filter(predicate).sort();
  if (files.length === 0) fail(`.convention/examples: expected ${label} example files`);
  for (const file of files) validateAgainstSchema(readJson(file), schema, file, label);
}

function checkBundlePackaging() {
  const styleManifest = readJson(path.join(root, "plugins/bundles/ui-style-reference-skills/plugin.json"));
  const aggregateManifest = resolveBundleManifest(readJson(path.join(root, "plugins/bundles/ui-design-intelligence/plugin.json")));
  if (!styleManifest || !aggregateManifest) return;

  const requiredSkills = [
    "generate-style-reference",
    "recommend-style-reference",
    "apply-style-reference",
    "blend-style-references",
    "audit-style-application",
    "extract-style-from-reference",
    "map-style-to-design-system-seed"
  ];
  const requiredCommands = [
    "generate-style-library",
    "recommend-style",
    "apply-style-to-design-system",
    "apply-style-to-section",
    "apply-style-to-component"
  ];
  const requiredAgents = ["style-reference-curator"];
  const requiredShared = [
    ".convention/workflows/style-reference-layer-architecture.md",
    ".convention/schemas/style-reference.schema.json",
    ".convention/schemas/style-application.schema.json",
    ".convention/schemas/style-patch.schema.json",
    ".convention/schemas/style-blend.schema.json",
    ".convention/style-references/categories.json",
    ".convention/style-references/index.json",
    ".convention/templates/style-reference.json",
    ".convention/examples/style-application.site.example.json",
    "scripts/validate-style-references.mjs"
  ];

  function includesAll(manifest, field, values, label) {
    const actual = new Set(manifest[field] ?? []);
    for (const value of values) {
      if (!actual.has(value)) {
        fail(`plugins/bundles/${manifest.name}/plugin.json: missing ${label} "${value}"`);
      }
    }
  }

  includesAll(styleManifest, "skills", requiredSkills, "skill");
  includesAll(styleManifest, "commands", requiredCommands, "command");
  includesAll(styleManifest, "agents", requiredAgents, "agent");
  includesAll(styleManifest, "shared", requiredShared, "shared asset");

  includesAll(aggregateManifest, "skills", requiredSkills, "skill");
  includesAll(aggregateManifest, "commands", requiredCommands, "command");
  includesAll(aggregateManifest, "agents", requiredAgents, "agent");
  includesAll(aggregateManifest, "shared", requiredShared, "shared asset");
}

checkBundlePackaging();

if (errors.length) {
  console.error("Style-reference validation failed:");
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(`Style-reference validation passed for ${styleFiles.length} style record(s) and ${sharedExampleFiles.filter((file) => file.includes("style-")).length} style example file(s).`);
