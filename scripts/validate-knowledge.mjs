#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { validateJsonSchema } from "./lib/json-schema-validator.mjs";

const root = process.cwd();
const args = process.argv.slice(2);
const knowledgeDir = valueAfter("--knowledge") ?? ".convention/knowledge";
const errors = [];

function valueAfter(flag) {
  const index = args.indexOf(flag);
  if (index === -1) return null;
  return args[index + 1] ?? null;
}

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

function walk(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const item = path.join(dir, entry.name);
    return entry.isDirectory() ? walk(item) : [item];
  });
}

function loadNamedVocabulary(file, key) {
  const doc = readJson(file);
  const values = doc?.[key];
  if (!Array.isArray(values)) {
    fail(`${path.relative(root, file)}: expected array property "${key}"`);
    return new Set();
  }

  const names = new Set();
  for (const item of values) {
    if (!item || typeof item !== "object" || typeof item.name !== "string") {
      fail(`${path.relative(root, file)}: ${key} entries must be records with name`);
      continue;
    }
    if (names.has(item.name)) fail(`${path.relative(root, file)}: duplicate "${item.name}"`);
    names.add(item.name);
  }
  return names;
}

function loadTagVocabulary(file) {
  const doc = readJson(file);
  const result = new Map();
  if (!doc) return result;

  for (const [key, values] of Object.entries(doc)) {
    if (!Array.isArray(values)) {
      fail(`${path.relative(root, file)}: "${key}" must be an array`);
      continue;
    }
    result.set(key, new Set(values));
  }
  return result;
}

function validateAgainstSchema(doc, schema, file, label) {
  if (!doc || !schema) return;
  for (const error of validateJsonSchema(doc, schema)) {
    fail(`${path.relative(root, file)}: ${label} schema ${error}`);
  }
}

function scanValueForStorageLeaks(value, file, location = "$") {
  if (typeof value === "string") {
    const checks = [
      {
        label: "AWS access key ID",
        pattern: /\b(?:AKIA|ASIA)[A-Z0-9]{16}\b/
      },
      {
        label: "account-specific AWS ARN",
        pattern: /\barn:aws[a-z-]*:[^\s:]+:[^\s:]*:\d{12}:[^\s)'"`]+/
      },
      {
        label: "signed AWS URL",
        pattern: new RegExp(`\\b(?:${"X-Amz-"}${"Signature="}|${"AWSAccess"}${"KeyId="})`)
      },
      {
        label: "concrete S3 URI",
        pattern: /\bs3:\/\/(?!<)[a-z0-9][a-z0-9.-]{1,61}[a-z0-9](?:\/[^\s)'"`]*)?/
      }
    ];

    for (const { label, pattern } of checks) {
      if (pattern.test(value)) {
        fail(`${path.relative(root, file)}: ${location} contains possible ${label}; examples must use placeholders`);
      }
    }
    return;
  }

  if (Array.isArray(value)) {
    value.forEach((item, index) => scanValueForStorageLeaks(item, file, `${location}[${index}]`));
    return;
  }

  if (!value || typeof value !== "object") return;
  for (const [key, item] of Object.entries(value)) {
    scanValueForStorageLeaks(item, file, `${location}.${key}`);
  }
}

function checkStorageRefs(value, file, location = "$") {
  if (Array.isArray(value)) {
    value.forEach((item, index) => checkStorageRefs(item, file, `${location}[${index}]`));
    return;
  }
  if (!value || typeof value !== "object") return;

  if (value.storageRef && typeof value.storageRef === "object" && !Array.isArray(value.storageRef)) {
    const ref = value.storageRef;
    const refLocation = `${location}.storageRef`;
    if (ref.kind === "s3Uri") {
      if (typeof ref.uri !== "string" || !ref.uri.startsWith("s3://")) {
        fail(`${path.relative(root, file)}: ${refLocation}.uri must start with s3:// when kind is s3Uri`);
      } else if (!ref.uri.startsWith("s3://<")) {
        fail(`${path.relative(root, file)}: ${refLocation}.uri must use an S3 placeholder in examples`);
      }
    }
    if (ref.kind === "localPath" && typeof ref.uri === "string" && ref.uri.startsWith("s3://")) {
      fail(`${path.relative(root, file)}: ${refLocation}.uri must be a local path when kind is localPath`);
    }
    if (ref.checksum && ref.checksum.algorithm === "sha256") {
      const checksum = ref.checksum.value;
      if (typeof checksum !== "string" || (!/^<[^>]+>$/.test(checksum) && !/^[a-f0-9]{64}$/.test(checksum))) {
        fail(`${path.relative(root, file)}: ${refLocation}.checksum.value must be a SHA-256 hex digest or placeholder`);
      }
    }
  }

  for (const [key, item] of Object.entries(value)) {
    checkStorageRefs(item, file, `${location}.${key}`);
  }
}

function checkTags(tags, file, location) {
  if (!tags || typeof tags !== "object" || Array.isArray(tags)) return;

  for (const [tagGroup, values] of Object.entries(tags)) {
    const allowed = tagVocabulary.get(tagGroup);
    if (!allowed) {
      fail(`${path.relative(root, file)}: ${location}.${tagGroup} is not an approved knowledge tag group`);
      continue;
    }
    if (!Array.isArray(values)) {
      fail(`${path.relative(root, file)}: ${location}.${tagGroup} must be an array`);
      continue;
    }
    for (const value of values) {
      if (!allowed.has(value)) {
        fail(`${path.relative(root, file)}: ${location}.${tagGroup} "${value}" is not approved`);
      }
    }
  }
}

function checkPattern(doc, file) {
  if (!doc) return;
  scanValueForStorageLeaks(doc, file);
  checkStorageRefs(doc, file);
  if (patternIds.has(doc.id)) {
    fail(`${path.relative(root, file)}: duplicate pattern id "${doc.id}"`);
  }
  patternIds.set(doc.id, file);

  if (!patternTypes.has(doc.patternType)) {
    fail(`${path.relative(root, file)}: patternType "${doc.patternType}" is not approved`);
  }
  if (!statuses.has(doc.status)) {
    fail(`${path.relative(root, file)}: status "${doc.status}" is not approved`);
  }
  if (!confidenceLevels.has(doc.confidence?.level)) {
    fail(`${path.relative(root, file)}: confidence.level "${doc.confidence?.level}" is not approved`);
  }
  if (!Array.isArray(doc.sourceRefs) || doc.sourceRefs.length === 0) {
    fail(`${path.relative(root, file)}: sourceRefs must contain at least one source reference`);
  } else {
    for (const [index, sourceRef] of doc.sourceRefs.entries()) {
      if (typeof sourceRef?.sourceId !== "string" || sourceRef.sourceId.length === 0) {
        fail(`${path.relative(root, file)}: sourceRefs[${index}].sourceId is required`);
      }
    }
  }

  if (!Array.isArray(doc.wireframeMapping?.contentRoles) || doc.wireframeMapping.contentRoles.length === 0) {
    fail(`${path.relative(root, file)}: wireframeMapping.contentRoles must contain at least one role`);
  }
  checkTags(doc.tags, file, "tags");
}

function checkIndex(doc, file) {
  if (!doc) return;
  scanValueForStorageLeaks(doc, file);
  checkStorageRefs(doc, file);
  const indexIds = new Set();
  for (const [index, entry] of (doc.patterns ?? []).entries()) {
    if (indexIds.has(entry.id)) {
      fail(`${path.relative(root, file)}: patterns[${index}].id duplicates "${entry.id}"`);
    }
    indexIds.add(entry.id);

    if (!patternIds.has(entry.id)) {
      fail(`${path.relative(root, file)}: patterns[${index}].id "${entry.id}" has no matching pattern record`);
    }
    if (!patternTypes.has(entry.patternType)) {
      fail(`${path.relative(root, file)}: patterns[${index}].patternType "${entry.patternType}" is not approved`);
    }
    if (!statuses.has(entry.status)) {
      fail(`${path.relative(root, file)}: patterns[${index}].status "${entry.status}" is not approved`);
    }
    if (!confidenceLevels.has(entry.confidence)) {
      fail(`${path.relative(root, file)}: patterns[${index}].confidence "${entry.confidence}" is not approved`);
    }
    checkTags(entry.tags, file, `patterns[${index}].tags`);
  }
}

const base = path.resolve(root, knowledgeDir);
const schemaDir = path.join(base, "schemas");
const vocabularyDir = path.join(base, "vocabulary");
const examplesDir = path.join(base, "examples");

const patternSchema = readJson(path.join(schemaDir, "pattern-record.schema.json"));
const sourceSchema = readJson(path.join(schemaDir, "source-record.schema.json"));
const indexSchema = readJson(path.join(schemaDir, "knowledge-index.schema.json"));
const lineageSchema = readJson(path.join(schemaDir, "blueprint-lineage.schema.json"));
const patternTypes = loadNamedVocabulary(path.join(vocabularyDir, "pattern-types.json"), "patternTypes");
const statuses = loadNamedVocabulary(path.join(vocabularyDir, "pattern-statuses.json"), "patternStatuses");
const confidenceLevels = loadNamedVocabulary(path.join(vocabularyDir, "confidence-levels.json"), "confidenceLevels");
const tagVocabulary = loadTagVocabulary(path.join(vocabularyDir, "knowledge-tags.json"));
const patternIds = new Map();

const patternFiles = walk(examplesDir).filter((file) => file.endsWith(".pattern.json")).sort();
const sourceFiles = walk(examplesDir).filter((file) => file.endsWith(".source.json")).sort();
const indexFiles = walk(examplesDir).filter((file) => file.endsWith("knowledge-index.example.json")).sort();
const lineageFiles = walk(examplesDir).filter((file) => file.endsWith(".blueprint-lineage.json")).sort();

for (const file of patternFiles) {
  const doc = readJson(file);
  validateAgainstSchema(doc, patternSchema, file, "pattern-record");
  checkPattern(doc, file);
}

for (const file of sourceFiles) {
  const doc = readJson(file);
  validateAgainstSchema(doc, sourceSchema, file, "source-record");
  scanValueForStorageLeaks(doc, file);
  checkStorageRefs(doc, file);
}

for (const file of indexFiles) {
  const doc = readJson(file);
  validateAgainstSchema(doc, indexSchema, file, "knowledge-index");
  checkIndex(doc, file);
}

for (const file of lineageFiles) {
  const doc = readJson(file);
  validateAgainstSchema(doc, lineageSchema, file, "blueprint-lineage");
  scanValueForStorageLeaks(doc, file);
  checkStorageRefs(doc, file);
}

if (errors.length) {
  console.error("Knowledge validation failed:");
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(`Knowledge validation passed for ${patternFiles.length} pattern record(s) and ${indexFiles.length} index file(s).`);
