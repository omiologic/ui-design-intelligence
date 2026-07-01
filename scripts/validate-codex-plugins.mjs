#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";

const root = process.cwd();
const outputRoot = path.join(root, "dist", "codex-plugins");
const marketplaceRoot = path.join(root, "dist", "codex-marketplace");
const args = process.argv.slice(2);
const requestedBundles = args.filter((arg) => !arg.startsWith("--"));
const errors = [];

function fail(message) {
  errors.push(message);
}

function run(command, args, options = {}) {
  const result = spawnSync(command, args, {
    cwd: options.cwd ?? root,
    encoding: "utf8",
    stdio: "pipe"
  });

  if (result.error) {
    fail(`Failed to run ${command}: ${result.error.message}`);
    return;
  }
  if (result.status !== 0) {
    fail(`${command} ${args.join(" ")} failed:\n${result.stderr || result.stdout}`);
  }
}

function readJson(file) {
  try {
    return JSON.parse(fs.readFileSync(file, "utf8"));
  } catch (error) {
    fail(`${path.relative(root, file)}: invalid JSON (${error.message})`);
    return null;
  }
}

function listPackageDirs() {
  if (!fs.existsSync(outputRoot)) {
    fail("dist/codex-plugins/: directory does not exist; run npm run build:codex-plugins first");
    return [];
  }

  return fs
    .readdirSync(outputRoot, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => path.join(outputRoot, entry.name))
    .filter((dir) => requestedBundles.length === 0 || requestedBundles.includes(path.basename(dir)))
    .sort();
}

function requireNoDir(packageDir, relativeDir) {
  const absolute = path.join(packageDir, relativeDir);
  if (fs.existsSync(absolute)) {
    fail(`${path.relative(root, absolute)}: must not exist in Codex plugin packages`);
  }
}

function validatePackage(packageDir) {
  const packageName = path.basename(packageDir);
  const manifestPath = path.join(packageDir, ".codex-plugin", "plugin.json");
  const skillsDir = path.join(packageDir, "skills");
  const inspectionPath = path.join(packageDir, "PACKAGE_INSPECTION.md");

  if (!fs.existsSync(manifestPath)) {
    fail(`${path.relative(root, manifestPath)}: file does not exist`);
    return;
  }
  if (!fs.existsSync(skillsDir) || !fs.statSync(skillsDir).isDirectory()) {
    fail(`${path.relative(root, skillsDir)}: skills directory does not exist`);
  }
  if (!fs.existsSync(inspectionPath)) {
    fail(`${path.relative(root, inspectionPath)}: package inspection file does not exist`);
  }

  requireNoDir(packageDir, "agents");
  requireNoDir(packageDir, "commands");

  const manifest = readJson(manifestPath);
  if (!manifest) return;

  if (manifest.schemaVersion !== "ui-design-intelligence.codex-plugin.v1") {
    fail(`${path.relative(root, manifestPath)}: unexpected schemaVersion "${manifest.schemaVersion}"`);
  }
  if (manifest.packageType !== "codex-plugin") {
    fail(`${path.relative(root, manifestPath)}: packageType must be "codex-plugin"`);
  }
  if (manifest.name !== packageName) {
    fail(`${path.relative(root, manifestPath)}: name must match package directory "${packageName}"`);
  }

  for (const field of ["displayName", "version", "description", "repository", "license"]) {
    if (typeof manifest[field] !== "string" || manifest[field].length === 0) {
      fail(`${path.relative(root, manifestPath)}: missing string field "${field}"`);
    }
  }

  for (const fileName of ["README.md", manifest.license, manifest.sourceBundle?.changelog]) {
    if (typeof fileName !== "string" || fileName.length === 0) continue;
    const file = path.join(packageDir, fileName);
    if (!fs.existsSync(file)) {
      fail(`${path.relative(root, file)}: package metadata file is missing`);
    }
  }

  if (!Array.isArray(manifest.assets?.skills) || manifest.assets.skills.length === 0) {
    fail(`${path.relative(root, manifestPath)}: assets.skills must be a non-empty array`);
  }
  if (!Array.isArray(manifest.assets?.shared)) {
    fail(`${path.relative(root, manifestPath)}: assets.shared must be an array`);
  }
  if (!Array.isArray(manifest.assets?.omitted?.agents)) {
    fail(`${path.relative(root, manifestPath)}: assets.omitted.agents must be an array`);
  }
  if (!Array.isArray(manifest.assets?.omitted?.commands)) {
    fail(`${path.relative(root, manifestPath)}: assets.omitted.commands must be an array`);
  }

  for (const skillName of manifest.assets?.skills ?? []) {
    const skillFile = path.join(skillsDir, skillName, "SKILL.md");
    if (!fs.existsSync(skillFile)) {
      fail(`${path.relative(root, skillFile)}: skill listed in manifest is missing SKILL.md`);
    }
  }

  for (const sharedPath of manifest.assets?.shared ?? []) {
    const file = path.join(packageDir, sharedPath);
    if (!fs.existsSync(file)) {
      fail(`${path.relative(root, file)}: shared asset listed in manifest is missing`);
    }
  }

  if (fs.existsSync(skillsDir)) {
    run("node", [path.join(root, "scripts", "verify-installed-references.mjs"), "skills"], { cwd: packageDir });
  }
}

function validateMarketplace(packageDirs) {
  const marketplacePath = path.join(marketplaceRoot, ".agents", "plugins", "marketplace.json");
  const rootMarketplacePath = path.join(marketplaceRoot, "marketplace.json");
  const readmePath = path.join(marketplaceRoot, "README.md");
  if (!fs.existsSync(marketplacePath)) {
    fail(`${path.relative(root, marketplacePath)}: file does not exist; run npm run build:codex-plugins first`);
    return;
  }
  if (!fs.existsSync(rootMarketplacePath)) {
    fail(`${path.relative(root, rootMarketplacePath)}: root marketplace mirror does not exist`);
  }
  if (!fs.existsSync(readmePath)) {
    fail(`${path.relative(root, readmePath)}: marketplace README does not exist`);
  }

  const marketplace = readJson(marketplacePath);
  if (!marketplace) return;

  if (marketplace.name !== "ui-design-intelligence-local") {
    fail(`${path.relative(root, marketplacePath)}: name must be "ui-design-intelligence-local"`);
  }
  if (!Array.isArray(marketplace.plugins) || marketplace.plugins.length === 0) {
    fail(`${path.relative(root, marketplacePath)}: plugins must be a non-empty array`);
    return;
  }

  const expectedNames = new Set(packageDirs.map((dir) => path.basename(dir)));
  const seenNames = new Set();

  for (const entry of marketplace.plugins) {
    if (typeof entry.name !== "string" || entry.name.length === 0) {
      fail(`${path.relative(root, marketplacePath)}: marketplace entry is missing name`);
      continue;
    }
    if (requestedBundles.length > 0 && !requestedBundles.includes(entry.name)) continue;

    seenNames.add(entry.name);
    if (!expectedNames.has(entry.name)) {
      fail(`${path.relative(root, marketplacePath)}: entry "${entry.name}" does not match a generated package`);
    }
    if (entry.source?.source !== "local") {
      fail(`${path.relative(root, marketplacePath)}: entry "${entry.name}" source.source must be "local"`);
    }
    if (typeof entry.source?.path !== "string" || !entry.source.path.startsWith("./")) {
      fail(`${path.relative(root, marketplacePath)}: entry "${entry.name}" source.path must be ./-prefixed`);
      continue;
    }

    const pluginDir = path.resolve(marketplaceRoot, entry.source.path);
    const pluginManifest = path.join(pluginDir, ".codex-plugin", "plugin.json");
    if (!fs.existsSync(pluginManifest)) {
      fail(`${path.relative(root, marketplacePath)}: entry "${entry.name}" points at missing plugin manifest ${path.relative(root, pluginManifest)}`);
    }
    if (entry.interface?.displayName === undefined) {
      fail(`${path.relative(root, marketplacePath)}: entry "${entry.name}" missing interface.displayName`);
    }
  }

  for (const expectedName of expectedNames) {
    if (!seenNames.has(expectedName)) {
      fail(`${path.relative(root, marketplacePath)}: missing marketplace entry for generated package "${expectedName}"`);
    }
  }
}

const packageDirs = listPackageDirs();
if (requestedBundles.length) {
  const found = new Set(packageDirs.map((dir) => path.basename(dir)));
  for (const bundleName of requestedBundles) {
    if (!found.has(bundleName)) {
      fail(`dist/codex-plugins/${bundleName}: requested package directory does not exist`);
    }
  }
}

for (const packageDir of packageDirs) validatePackage(packageDir);
validateMarketplace(packageDirs);

if (errors.length) {
  console.error("Codex plugin validation failed:");
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(`Codex plugin validation passed for ${packageDirs.length} package(s) and local marketplace fixture.`);
