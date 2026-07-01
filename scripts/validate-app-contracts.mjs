#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { validateJsonSchema } from "./lib/json-schema-validator.mjs";

const root = process.cwd();
const fixtureDir = path.join(root, "shared/examples/app-handoff");
const errors = [];

const schemaByType = {
  appQueryContext: "app-query-context.schema.json",
  appRetrievalResults: "app-retrieval-results.schema.json",
  appRunRecord: "app-run-record.schema.json",
  appArtifactManifest: "app-artifact-manifest.schema.json",
  appPackageMetadata: "app-package-metadata.schema.json"
};

const remoteStorageProviders = new Set(["s3", "s3Vector", "hosted"]);
const safeStorageProviders = new Set(["local", "package", "redacted"]);
const knownCommands = new Set(Object.keys(JSON.parse(fs.readFileSync(path.join(root, "package.json"), "utf8")).scripts ?? {}));

function fail(message) {
  errors.push(message);
}

function rel(file) {
  return path.relative(root, file);
}

function readJson(file) {
  try {
    return JSON.parse(fs.readFileSync(file, "utf8"));
  } catch (error) {
    fail(`${rel(file)}: invalid JSON (${error.message})`);
    return null;
  }
}

function walkValue(value, visitor, location = "$") {
  visitor(value, location);
  if (Array.isArray(value)) {
    value.forEach((item, index) => walkValue(item, visitor, `${location}[${index}]`));
    return;
  }
  if (!value || typeof value !== "object") return;
  for (const [key, child] of Object.entries(value)) {
    walkValue(child, visitor, `${location}.${key}`);
  }
}

function resolveRepoPath(value) {
  if (typeof value !== "string" || value.length === 0) return null;
  if (value.startsWith("package://")) return null;
  return path.resolve(root, value);
}

function isInsideRoot(file) {
  const relative = path.relative(root, file);
  return relative === "" || (!relative.startsWith("..") && !path.isAbsolute(relative));
}

function checkSafeString(value, file, location) {
  if (typeof value !== "string") return;
  if (/AKIA[0-9A-Z]{16}/.test(value)) {
    fail(`${rel(file)}: ${location} looks like an AWS access key`);
  }
  if (/aws_secret_access_key/i.test(value)) {
    fail(`${rel(file)}: ${location} must not contain credential names`);
  }
  if (/X-Amz-(Signature|Credential|Security-Token)=/i.test(value)) {
    fail(`${rel(file)}: ${location} must not contain signed URL parameters`);
  }
  if (/https?:\/\//i.test(value)) {
    fail(`${rel(file)}: ${location} must use repository-local or placeholder-safe references, not live URLs`);
  }
  if (/^\/Users\//.test(value) || /^\/home\//.test(value)) {
    fail(`${rel(file)}: ${location} must not use absolute user-local paths`);
  }
}

function checkRepoPath(value, file, location) {
  const resolved = resolveRepoPath(value);
  if (!resolved) return;
  if (!isInsideRoot(resolved)) {
    fail(`${rel(file)}: ${location} points outside the repository (${value})`);
    return;
  }
  if (!fs.existsSync(resolved)) {
    fail(`${rel(file)}: ${location} references missing file (${value})`);
  }
}

function validateAgainstSchema(doc, schemaFile, targetFile, label) {
  const schemaPath = path.join(root, schemaFile);
  const schema = readJson(schemaPath);
  if (!doc || !schema) return;
  for (const error of validateJsonSchema(doc, schema)) {
    fail(`${rel(targetFile)}: ${label} schema ${error}`);
  }
}

function npmScriptFromCommand(command) {
  if (typeof command !== "string") return null;
  const match = command.match(/^npm run ([a-z0-9:_-]+)$/);
  return match?.[1] ?? null;
}

function collectFixtureFiles() {
  if (!fs.existsSync(fixtureDir)) {
    fail("shared/examples/app-handoff: fixture directory is missing");
    return [];
  }
  return fs
    .readdirSync(fixtureDir, { withFileTypes: true })
    .filter((entry) => entry.isFile() && entry.name.endsWith(".json"))
    .map((entry) => path.join(fixtureDir, entry.name))
    .sort();
}

const fixtureFiles = collectFixtureFiles();
const fixtureById = new Map();
const fixtureByType = new Map();
const docs = [];

for (const file of fixtureFiles) {
  const doc = readJson(file);
  if (!doc) continue;
  docs.push({ file, doc });

  const schemaName = schemaByType[doc.type];
  if (!schemaName) {
    fail(`${rel(file)}: unknown app contract type "${doc.type}"`);
  } else {
    validateAgainstSchema(doc, path.join("shared/schemas", schemaName), file, doc.type);
  }

  if (typeof doc.id === "string") {
    if (fixtureById.has(doc.id)) {
      fail(`${rel(file)}: duplicate fixture id "${doc.id}"`);
    }
    fixtureById.set(doc.id, { file, doc });
  }
  if (typeof doc.type === "string") {
    if (!fixtureByType.has(doc.type)) fixtureByType.set(doc.type, []);
    fixtureByType.get(doc.type).push({ file, doc });
  }

  walkValue(doc, (value, location) => {
    checkSafeString(value, file, location);
    if (!value || typeof value !== "object" || Array.isArray(value)) return;

    if (typeof value.path === "string") checkRepoPath(value.path, file, `${location}.path`);
    if (typeof value.schemaRef === "string") checkRepoPath(value.schemaRef, file, `${location}.schemaRef`);
    if (typeof value.sourceSchemaRef === "string") checkRepoPath(value.sourceSchemaRef, file, `${location}.sourceSchemaRef`);
    if (typeof value.licenseRef === "string") checkRepoPath(value.licenseRef, file, `${location}.licenseRef`);
    if (typeof value.changelogRef === "string") checkRepoPath(value.changelogRef, file, `${location}.changelogRef`);

    if (value.storageRef && typeof value.storageRef === "object") {
      const provider = value.storageRef.provider;
      if (!safeStorageProviders.has(provider)) {
        fail(`${rel(file)}: ${location}.storageRef.provider "${provider}" is not allowed in committed app handoff fixtures`);
      }
      if (remoteStorageProviders.has(provider)) {
        fail(`${rel(file)}: ${location}.storageRef must not require remote storage during offline validation`);
      }
      if (provider === "local") checkRepoPath(value.storageRef.uri, file, `${location}.storageRef.uri`);
    }

    const scriptName = npmScriptFromCommand(value.command);
    if (scriptName && !knownCommands.has(scriptName)) {
      fail(`${rel(file)}: ${location}.command references unknown npm script "${scriptName}"`);
    }
  });
}

function requireFixture(id, file, location) {
  if (typeof id !== "string") return;
  if (!fixtureById.has(id)) {
    fail(`${rel(file)}: ${location} references unknown app fixture id "${id}"`);
  }
}

function validateReferencedJson(reference, file, location, schemaKey = "schemaRef", pathKey = "path") {
  if (!reference || typeof reference !== "object") return;
  const artifactPath = reference[pathKey];
  const schemaRef = reference[schemaKey];
  if (typeof artifactPath !== "string" || typeof schemaRef !== "string") return;
  if (!artifactPath.endsWith(".json") || !schemaRef.endsWith(".json")) return;
  if (artifactPath.startsWith("package://")) return;

  const targetFile = path.join(root, artifactPath);
  if (!fs.existsSync(targetFile)) return;
  const doc = readJson(targetFile);
  validateAgainstSchema(doc, schemaRef, targetFile, `${location} referenced artifact`);
}

function checkArtifactRefs(values, file, location) {
  for (const [index, ref] of (values ?? []).entries()) {
    validateReferencedJson(ref, file, `${location}[${index}]`);
  }
}

for (const { file, doc } of docs) {
  if (doc.queryContextId) requireFixture(doc.queryContextId, file, "queryContextId");
  if (doc.retrievalResultsId) requireFixture(doc.retrievalResultsId, file, "retrievalResultsId");
  if (doc.artifactManifestId) requireFixture(doc.artifactManifestId, file, "artifactManifestId");
  if (doc.sourceRunId) requireFixture(doc.sourceRunId, file, "sourceRunId");

  checkArtifactRefs(doc.sourceRefs, file, "sourceRefs");
  checkArtifactRefs(doc.inputs, file, "inputs");
  checkArtifactRefs(doc.outputs, file, "outputs");
  checkArtifactRefs(doc.artifacts, file, "artifacts");

  for (const [index, result] of (doc.results ?? []).entries()) {
    if (result?.storageRef?.provider === "local" && result.sourceSchemaRef) {
      const targetFile = path.join(root, result.storageRef.uri);
      if (fs.existsSync(targetFile)) {
        validateAgainstSchema(readJson(targetFile), result.sourceSchemaRef, targetFile, `results[${index}] referenced retrieval record`);
      }
    }
  }
}

const requiredTypes = [
  "appQueryContext",
  "appRetrievalResults",
  "appRunRecord",
  "appArtifactManifest",
  "appPackageMetadata"
];

for (const type of requiredTypes) {
  if (!fixtureByType.has(type)) fail(`shared/examples/app-handoff: missing ${type} fixture`);
}

const runKinds = new Set((fixtureByType.get("appRunRecord") ?? []).map(({ doc }) => doc.runKind));
for (const kind of ["creation", "review"]) {
  if (!runKinds.has(kind)) fail(`shared/examples/app-handoff: missing ${kind} appRunRecord fixture`);
}

if (errors.length) {
  console.error("App contract validation failed:");
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(`App contract validation passed for ${docs.length} fixture file(s).`);
