#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { bundleSkill, copyDir, productSkillSourceDir, productSkills } from "./lib/bundle-skill.mjs";

const root = process.cwd();
const pkg = JSON.parse(fs.readFileSync(path.join(root, "package.json"), "utf8"));
const distDir = path.join(root, "dist");
const archiveName = `${pkg.name}-${pkg.version}.zip`;
const archivePath = path.join(distDir, archiveName);
const packageDir = path.join(distDir, "package");
const skipValidation = process.argv.includes("--skip-validation");

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

if (!fs.existsSync(path.join(root, "plugins", "individuals"))) {
  console.error("Cannot package: no product skill source directory exists.");
  process.exit(1);
}

for (const skill of productSkills) {
  const skillFile = path.join(productSkillSourceDir(root, skill), "SKILL.md");
  if (!fs.existsSync(skillFile)) {
    console.error(`Cannot package: product skill is missing SKILL.md: ${skill}`);
    process.exit(1);
  }
}

if (!fs.existsSync(distDir)) fs.mkdirSync(distDir, { recursive: true });
if (fs.existsSync(archivePath)) fs.rmSync(archivePath);
fs.rmSync(packageDir, { recursive: true, force: true });
fs.mkdirSync(packageDir, { recursive: true });

if (skipValidation) {
  console.warn("Skipping full validation because --skip-validation was supplied. Run npm run validate:release before publishing.");
} else {
  run("npm", ["run", "validate"]);
}

const files = [
  "README.md",
  "LICENSE",
  "CHANGELOG.md",
  "MIGRATION.md",
  "install.sh",
  "uninstall.sh",
  "package.json",
  "plugins/individuals",
  "plugins/bundles",
  "agents",
  "commands",
  "docs",
  "shared",
  "tests/invalid-examples",
  "tests/invalid-content",
  "tests/invalid-antipatterns",
  "scripts/validate-skills.mjs",
  "scripts/validate-changed.mjs",
  "scripts/validate-examples.mjs",
  "scripts/validate-content.mjs",
  "scripts/validate-blueprint-antipatterns.mjs",
  "scripts/validate-invalid-examples.mjs",
  "scripts/validate-invalid-content.mjs",
  "scripts/validate-invalid-antipatterns.mjs",
  "scripts/validate-bundles.mjs",
  "scripts/validate-install-matrix.mjs",
  "scripts/validate-codex-plugins.mjs",
  "scripts/validate-release.mjs",
  "scripts/inspect-release-artifacts.mjs",
  "scripts/capture-url.mjs",
  "scripts/export-blueprint-seed.mjs",
  "scripts/build-bundles.mjs",
  "scripts/build-codex-plugins.mjs",
  "scripts/install-bundle.mjs",
  "scripts/build-schema.mjs",
  "scripts/check-schema-drift.mjs",
  "scripts/build-valid-node-types.mjs",
  "scripts/verify-installed-references.mjs",
  "scripts/install-skill.mjs",
  "scripts/lib"
].filter((item) => fs.existsSync(path.join(root, item)));

for (const file of files) {
  const source = path.join(root, file);
  const target = path.join(packageDir, file);
  if (fs.statSync(source).isDirectory()) {
    copyDir(source, target);
  } else {
    fs.mkdirSync(path.dirname(target), { recursive: true });
    fs.copyFileSync(source, target);
  }
}

for (const skillName of productSkills) {
  bundleSkill({
    root,
    skillName,
    targetDir: path.join(packageDir, "skills", skillName)
  });
}

run("node", ["scripts/verify-installed-references.mjs", "dist/package/skills"]);

run("zip", ["-r", archivePath, ".", "-x", "*/__pycache__/*", "*/.DS_Store"], { cwd: packageDir });

console.log(`Created ${path.relative(root, archivePath)}`);
