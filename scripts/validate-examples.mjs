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

function loadVocabulary(file, key) {
  const doc = readJson(file);
  const values = doc?.[key];
  if (!Array.isArray(values)) {
    fail(`${file}: expected array property "${key}"`);
    return new Set();
  }
  return new Set(values);
}

function loadRecordVocabulary(file, key, nameLabel) {
  const doc = readJson(file);
  const values = doc?.[key];
  if (!Array.isArray(values)) {
    fail(`${file}: expected array property "${key}"`);
    return new Set();
  }

  const names = new Set();
  for (const item of values) {
    if (!item || typeof item !== "object" || Array.isArray(item)) {
      fail(`${file}: ${key} entries must be records`);
      continue;
    }
    if (typeof item.name !== "string" || item.name.length === 0) {
      fail(`${file}: ${nameLabel} record missing name`);
      continue;
    }
    if (names.has(item.name)) fail(`${file}: duplicate ${nameLabel} "${item.name}"`);
    names.add(item.name);
    if (typeof item.definition !== "string" || item.definition.length === 0) {
      fail(`${file}: ${nameLabel} "${item.name}" must include a definition`);
    }
  }

  return names;
}

function loadNodeTypeVocabulary(file) {
  const doc = readJson(file);
  const values = doc?.nodeTypes;
  if (!Array.isArray(values)) {
    fail(`${file}: expected array property "nodeTypes"`);
    return { names: new Set(), records: new Map() };
  }

  const names = new Set();
  const records = new Map();
  for (const item of values) {
    if (typeof item === "string") {
      names.add(item);
      records.set(item, {
        name: item,
        definition: "",
        allowedChildren: [],
        overlayOnly: false
      });
      continue;
    }

    if (!item || typeof item !== "object" || Array.isArray(item)) {
      fail(`${file}: nodeTypes entries must be strings or records`);
      continue;
    }
    if (typeof item.name !== "string" || item.name.length === 0) {
      fail(`${file}: nodeTypes record missing name`);
      continue;
    }
    if (names.has(item.name)) fail(`${file}: duplicate node type "${item.name}"`);
    names.add(item.name);
    records.set(item.name, item);

    if (typeof item.definition !== "string" || item.definition.length === 0) {
      fail(`${file}: node type "${item.name}" must include a definition`);
    }
    if (!Array.isArray(item.allowedChildren)) {
      fail(`${file}: node type "${item.name}" must include allowedChildren array`);
    }
    if (typeof item.overlayOnly !== "boolean") {
      fail(`${file}: node type "${item.name}" must include overlayOnly boolean`);
    }
  }

  for (const record of records.values()) {
    for (const childType of record.allowedChildren ?? []) {
      if (!names.has(childType)) {
        fail(`${file}: node type "${record.name}" allows unknown child "${childType}"`);
      }
    }
  }

  return { names, records };
}

const nodeTypeVocabulary = loadNodeTypeVocabulary(path.join(root, "shared/vocabulary/node-types.json"));
const nodeTypes = nodeTypeVocabulary.names;
const nodeTypeRecords = nodeTypeVocabulary.records;
const layoutPatterns = loadVocabulary(path.join(root, "shared/vocabulary/layout-patterns.json"), "layoutPatterns");
const contentRoles = loadVocabulary(path.join(root, "shared/vocabulary/content-roles.json"), "contentRoles");
const interactionStates = loadVocabulary(path.join(root, "shared/vocabulary/interaction-states.json"), "interactionStates");
const auditSeverities = loadRecordVocabulary(path.join(root, "shared/vocabulary/audit-severity.json"), "auditSeverities", "audit severity");

const schema = readJson(path.join(root, "shared/schemas/wireframe-config.schema.json"));
if (schema) {
  const schemaTypes = new Set(schema.$defs?.nodeType?.enum ?? []);
  for (const type of nodeTypes) {
    if (!schemaTypes.has(type)) fail(`shared/schemas/wireframe-config.schema.json: missing node type enum "${type}"`);
  }
  for (const type of schemaTypes) {
    if (!nodeTypes.has(type)) fail(`shared/schemas/wireframe-config.schema.json: enum has non-vocabulary node type "${type}"`);
  }
  checkSchemaEnum("contentRole", contentRoles, "content role");
  checkSchemaEnum("layoutPattern", layoutPatterns, "layout pattern");
  checkSchemaEnum("interactionState", interactionStates, "interaction state");
}

const pageAuditSchema = readJson(path.join(root, "shared/schemas/page-audit.schema.json"));
if (pageAuditSchema) {
  checkAuditSchemaEnum("overallSeverity", auditSeverities, "audit severity");
  checkAuditFindingSchemaEnum("severity", auditSeverities, "audit finding severity");
}

function checkSchemaEnum(defName, vocabularySet, label) {
  const schemaValues = new Set(schema.$defs?.[defName]?.enum ?? []);
  for (const value of vocabularySet) {
    if (!schemaValues.has(value)) {
      fail(`shared/schemas/wireframe-config.schema.json: missing ${label} enum "${value}"`);
    }
  }
  for (const value of schemaValues) {
    if (!vocabularySet.has(value)) {
      fail(`shared/schemas/wireframe-config.schema.json: enum has non-vocabulary ${label} "${value}"`);
    }
  }
}

function checkAuditSchemaEnum(fieldName, vocabularySet, label) {
  const schemaValues = new Set(pageAuditSchema.properties?.[fieldName]?.enum ?? []);
  for (const value of vocabularySet) {
    if (!schemaValues.has(value)) {
      fail(`shared/schemas/page-audit.schema.json: missing ${label} enum "${value}"`);
    }
  }
  for (const value of schemaValues) {
    if (!vocabularySet.has(value)) {
      fail(`shared/schemas/page-audit.schema.json: enum has non-vocabulary ${label} "${value}"`);
    }
  }
}

function checkAuditFindingSchemaEnum(fieldName, vocabularySet, label) {
  const schemaValues = new Set(pageAuditSchema.properties?.findings?.items?.properties?.[fieldName]?.enum ?? []);
  for (const value of vocabularySet) {
    if (!schemaValues.has(value)) {
      fail(`shared/schemas/page-audit.schema.json: missing ${label} enum "${value}"`);
    }
  }
  for (const value of schemaValues) {
    if (!vocabularySet.has(value)) {
      fail(`shared/schemas/page-audit.schema.json: enum has non-vocabulary ${label} "${value}"`);
    }
  }
}

const explicitExampleFiles = process.argv.slice(2);
const sharedExampleFiles = walk(path.join(root, "shared/examples"))
  .filter((file) => file.endsWith(".ui-blueprint.json") || file.endsWith("ui-blueprint.example.json"));
const auditExampleFiles = walk(path.join(root, "shared/examples"))
  .filter((file) => file.endsWith("page-audit.example.json"));
const skillExampleFiles = [
  ...walk(path.join(root, "skills")),
  ...walk(path.join(root, "plugins/individuals"))
].filter((file) =>
  file.endsWith(".json") &&
  file.includes(`${path.sep}examples${path.sep}`) &&
  !file.includes(`${path.sep}_shared${path.sep}`)
);
const exampleFiles = explicitExampleFiles.length
  ? explicitExampleFiles.map((file) => path.resolve(root, file))
  : [...sharedExampleFiles, ...skillExampleFiles];

function checkCardinality(node, file, location) {
  const record = nodeTypeRecords.get(node.type);
  const rules = record?.cardinality;
  if (!rules) return;

  const children = Array.isArray(node.children) ? node.children : [];
  if (rules.children) {
    const count = children.length;
    if (Number.isInteger(rules.children.min) && count < rules.children.min) {
      fail(`${file}: ${location} must have at least ${rules.children.min} children`);
    }
    if (Number.isInteger(rules.children.max) && count > rules.children.max) {
      fail(`${file}: ${location} must have at most ${rules.children.max} children`);
    }
  }

  for (const [childType, rule] of Object.entries(rules)) {
    if (childType === "children") continue;
    const count = children.filter((child) => child?.type === childType).length;
    if (Number.isInteger(rule.min) && count < rule.min) {
      fail(`${file}: ${location} must contain at least ${rule.min} "${childType}" child`);
    }
    if (Number.isInteger(rule.max) && count > rule.max) {
      fail(`${file}: ${location} must contain at most ${rule.max} "${childType}" child`);
    }
  }
}

function checkNode(node, file, location, seenIds, context = {}) {
  if (!node || typeof node !== "object" || Array.isArray(node)) {
    return;
  }

  if (typeof node.id === "string" && seenIds.has(node.id)) {
    fail(`${file}: duplicate node id "${node.id}"`);
  } else if (typeof node.id === "string") {
    seenIds.add(node.id);
  }

  if (typeof node.type === "string" && !nodeTypes.has(node.type)) {
    fail(`${file}: ${location}.type "${node.type}" is not an approved node type`);
  }
  const record = nodeTypeRecords.get(node.type);
  if (record?.overlayOnly && !context.inOverlay && !(context.isRoot && record.rootAllowed)) {
    fail(`${file}: ${location}.type "${node.type}" is overlay-only and must be used in overlays or as an overlay component root`);
  }
  if (context.parentType) {
    const parentRecord = nodeTypeRecords.get(context.parentType);
    const allowedChildren = parentRecord?.allowedChildren ?? [];
    if (!allowedChildren.includes(node.type)) {
      fail(`${file}: ${location}.type "${node.type}" is not allowed inside "${context.parentType}"`);
    }
  }
  if (typeof node.role === "string" && !contentRoles.has(node.role)) {
    fail(`${file}: ${location}.role "${node.role}" is not an approved content role`);
  }
  if (typeof node.layout === "string" && !layoutPatterns.has(node.layout)) {
    fail(`${file}: ${location}.layout "${node.layout}" is not an approved layout pattern`);
  }
  if (typeof node.state === "string" && !interactionStates.has(node.state)) {
    fail(`${file}: ${location}.state "${node.state}" is not an approved interaction state`);
  }

  if (Array.isArray(node.children)) {
    node.children.forEach((child, index) => checkNode(child, file, `${location}.children[${index}]`, seenIds, {
      parentType: node.type,
      inOverlay: context.inOverlay,
      isRoot: false
    }));
  }
  checkCardinality(node, file, location);
}

for (const file of exampleFiles.sort()) {
  const doc = readJson(file);
  if (!doc) continue;

  for (const error of validateJsonSchema(doc, schema)) {
    fail(`${file}: schema ${error}`);
  }

  const seenIds = new Set();
  if (doc.root) checkNode(doc.root, file, "root", seenIds, { isRoot: true, inOverlay: false });
  if (Array.isArray(doc.overlays)) {
    doc.overlays.forEach((overlay, index) => checkNode(overlay, file, `overlays[${index}]`, seenIds, {
      isRoot: false,
      inOverlay: true
    }));
  }
}

for (const file of auditExampleFiles.sort()) {
  const doc = readJson(file);
  if (!doc) continue;

  for (const error of validateJsonSchema(doc, pageAuditSchema)) {
    fail(`${file}: page-audit schema ${error}`);
  }

  if (typeof doc.overallSeverity === "string" && !auditSeverities.has(doc.overallSeverity)) {
    fail(`${file}: overallSeverity "${doc.overallSeverity}" is not an approved audit severity`);
  }
  for (const [index, finding] of (doc.findings ?? []).entries()) {
    if (typeof finding?.severity === "string" && !auditSeverities.has(finding.severity)) {
      fail(`${file}: findings[${index}].severity "${finding.severity}" is not an approved audit severity`);
    }
  }
}

if (errors.length) {
  console.error("Example validation failed:");
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(`Example validation passed for ${exampleFiles.length + auditExampleFiles.length} example files.`);
