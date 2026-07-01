#!/usr/bin/env node
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { spawnSync } from "node:child_process";

const root = process.cwd();
const bundlesDir = path.join(root, "plugins", "bundles");

function run(command, args, options = {}) {
  const result = spawnSync(command, args, {
    cwd: options.cwd ?? root,
    stdio: "inherit"
  });

  if (result.error) {
    console.error(`Failed to run ${command}: ${result.error.message}`);
    process.exit(1);
  }
  if (result.status !== 0) process.exit(result.status ?? 1);
}

function readJson(file) {
  return JSON.parse(fs.readFileSync(file, "utf8"));
}

function isBuildableStatus(status) {
  return status === "active" || status === "transitional";
}

function buildableBundleNames() {
  return fs
    .readdirSync(bundlesDir, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => readJson(path.join(bundlesDir, entry.name, "plugin.json")))
    .filter((manifest) => isBuildableStatus(manifest.status))
    .map((manifest) => manifest.name)
    .sort();
}

run("npm", ["run", "validate"]);
run("npm", ["run", "validate:install-matrix"]);
run("node", ["scripts/build-bundles.mjs"]);
run("npm", ["run", "build:codex-plugins"]);

const tempRoot = fs.mkdtempSync(path.join(os.tmpdir(), "ui-blueprint-release-"));

try {
  for (const bundleName of buildableBundleNames()) {
    const targetRoot = path.join(tempRoot, bundleName);
    const skillsDir = path.join(targetRoot, "skills");

    run("node", ["scripts/validate-bundles.mjs", "--strict", bundleName]);
    run("node", ["scripts/install-bundle.mjs", "install", bundleName, targetRoot, skillsDir]);
    run("node", ["scripts/verify-installed-references.mjs", skillsDir]);
    run("node", ["scripts/install-bundle.mjs", "uninstall", bundleName, targetRoot, skillsDir]);
    console.log(`Release validation passed for ${bundleName}`);
  }
} finally {
  fs.rmSync(tempRoot, { recursive: true, force: true });
}

run("npm", ["run", "inspect:release-artifacts"]);

console.log("Release validation passed.");
