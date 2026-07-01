#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";

const root = process.cwd();
const pkg = JSON.parse(fs.readFileSync(path.join(root, "package.json"), "utf8"));
const bundlesDir = path.join(root, "plugins", "bundles");
const buildRoot = path.join(root, "dist", "build");
const pluginZipRoot = path.join(root, "dist", "plugins");
const codexPluginRoot = path.join(root, "dist", "codex-plugins");
const marketplaceRoot = path.join(root, "dist", "codex-marketplace");
const reportPath = path.join(root, "dist", "release-artifact-inspection.md");
const errors = [];
const report = [];

const forbiddenEntryPatterns = [
  /^\.DS_Store$/,
  /\/\.DS_Store$/,
  /(^|\/)__pycache__(\/|$)/,
  /\.pyc$/,
  /(^|\/)\.git(\/|$)/,
  /(^|\/)\.env($|\.)/,
  /(^|\/)\.plan(\/|$)/,
  /(^|\/)node_modules(\/|$)/,
  /(^|\/)\.ui-blueprint-bundles(\/|$)/,
  /private\/tmp/,
  /private\/var/,
  /Users\/minhokang/
];

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

function relative(file) {
  return path.relative(root, file).split(path.sep).join("/");
}

function isBuildableStatus(status) {
  return status === "active" || status === "transitional";
}

function zipEntries(zipPath) {
  const result = spawnSync("unzip", ["-Z1", zipPath], {
    cwd: root,
    encoding: "utf8",
    stdio: "pipe"
  });

  if (result.error) {
    fail(`Failed to inspect ${relative(zipPath)} with unzip: ${result.error.message}`);
    return [];
  }
  if (result.status !== 0) {
    fail(`Failed to inspect ${relative(zipPath)}:\n${result.stderr || result.stdout}`);
    return [];
  }

  return result.stdout.split("\n").map((line) => line.trim()).filter(Boolean).sort();
}

function assertEntries(zipPath, entries, requiredEntries) {
  const entrySet = new Set(entries);
  for (const entry of requiredEntries) {
    if (!entrySet.has(entry)) fail(`${relative(zipPath)}: missing archive entry ${entry}`);
  }
}

function assertNoForbiddenEntries(label, entries) {
  for (const entry of entries) {
    for (const pattern of forbiddenEntryPatterns) {
      if (pattern.test(entry)) {
        fail(`${label}: forbidden local or temporary artifact entry ${entry}`);
      }
    }
  }
}

function listFiles(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const item = path.join(dir, entry.name);
    if (entry.isDirectory()) return listFiles(item);
    return [item];
  });
}

const bundleRecords = fs
  .readdirSync(bundlesDir, { withFileTypes: true })
  .filter((entry) => entry.isDirectory())
  .map((entry) => {
    const dir = path.join(bundlesDir, entry.name);
    return {
      dir,
      manifest: readJson(path.join(dir, "plugin.json"))
    };
  })
  .filter((record) => record.manifest && isBuildableStatus(record.manifest.status))
  .sort((a, b) => a.manifest.name.localeCompare(b.manifest.name));

report.push("# Release Artifact Inspection", "");
report.push(`- Repository package: \`${pkg.name}@${pkg.version}\``);
report.push(`- Buildable bundles inspected: ${bundleRecords.length}`);
report.push("");

report.push("## Bundle Zip Archives", "");

for (const { dir, manifest } of bundleRecords) {
  const zipPath = path.join(pluginZipRoot, `${manifest.name}.zip`);
  const buildManifestPath = path.join(buildRoot, manifest.name, "plugin.json");

  if (!fs.existsSync(zipPath)) {
    fail(`${relative(zipPath)}: bundle archive does not exist; run npm run build:bundles first`);
    continue;
  }
  if (!fs.existsSync(buildManifestPath)) {
    fail(`${relative(buildManifestPath)}: generated bundle manifest does not exist; run npm run build:bundles first`);
    continue;
  }

  const generatedManifest = readJson(buildManifestPath);
  const entries = zipEntries(zipPath);
  const skillEntries = entries.filter((entry) => /^skills\/[^/]+\/SKILL\.md$/.test(entry));
  assertNoForbiddenEntries(relative(zipPath), entries);
  assertEntries(zipPath, entries, ["plugin.json", "README.md", manifest.license, manifest.changelog]);

  if (skillEntries.length === 0) fail(`${relative(zipPath)}: archive contains no skills/*/SKILL.md entries`);
  if (generatedManifest) {
    if (generatedManifest.name !== manifest.name) fail(`${relative(buildManifestPath)}: generated name does not match source bundle`);
    if (generatedManifest.version !== manifest.version) fail(`${relative(buildManifestPath)}: generated version does not match source bundle`);
    if ((generatedManifest.skills ?? []).length !== skillEntries.length) {
      fail(`${relative(zipPath)}: skill entry count does not match generated manifest`);
    }
  }

  for (const fileName of ["README.md", manifest.license, manifest.changelog]) {
    if (!fs.existsSync(path.join(dir, fileName))) fail(`${relative(path.join(dir, fileName))}: source metadata file is missing`);
  }

  report.push(
    `- \`${manifest.name}@${manifest.version}\`: ${entries.length} entries, ${skillEntries.length} skills, ` +
    `metadata \`README.md\`, \`${manifest.license}\`, \`${manifest.changelog}\``
  );
}

report.push("", "## Codex Plugin Packages", "");

if (!fs.existsSync(codexPluginRoot)) {
  fail(`${relative(codexPluginRoot)}: directory does not exist; run npm run build:codex-plugins first`);
} else {
  for (const { manifest } of bundleRecords) {
    const packageDir = path.join(codexPluginRoot, manifest.name);
    const codexManifestPath = path.join(packageDir, ".codex-plugin", "plugin.json");
    if (!fs.existsSync(codexManifestPath)) {
      fail(`${relative(codexManifestPath)}: generated Codex plugin manifest is missing`);
      continue;
    }

    const codexManifest = readJson(codexManifestPath);
    const files = listFiles(packageDir).map((file) => relative(file)).sort();
    assertNoForbiddenEntries(relative(packageDir), files);

    for (const fileName of [".codex-plugin/plugin.json", "README.md", manifest.license, manifest.changelog, "PACKAGE_INSPECTION.md"]) {
      if (!fs.existsSync(path.join(packageDir, fileName))) fail(`${relative(path.join(packageDir, fileName))}: package file is missing`);
    }
    if (fs.existsSync(path.join(packageDir, "agents"))) fail(`${relative(path.join(packageDir, "agents"))}: Codex packages must not include agents`);
    if (fs.existsSync(path.join(packageDir, "commands"))) fail(`${relative(path.join(packageDir, "commands"))}: Codex packages must not include commands`);

    if (codexManifest) {
      if (codexManifest.name !== manifest.name) fail(`${relative(codexManifestPath)}: generated name does not match source bundle`);
      if (codexManifest.version !== manifest.version) fail(`${relative(codexManifestPath)}: generated version does not match source bundle`);
      if (!Array.isArray(codexManifest.assets?.skills) || codexManifest.assets.skills.length === 0) {
        fail(`${relative(codexManifestPath)}: assets.skills must be a non-empty array`);
      }
      report.push(
        `- \`${codexManifest.name}@${codexManifest.version}\`: ${codexManifest.assets?.skills?.length ?? 0} skills, ` +
        `${codexManifest.assets?.shared?.length ?? 0} shared assets, source bundle \`${manifest.name}@${manifest.version}\``
      );
    }
  }
}

report.push("", "## Codex Local Marketplace", "");

const marketplacePath = path.join(marketplaceRoot, ".agents", "plugins", "marketplace.json");
if (!fs.existsSync(marketplacePath)) {
  fail(`${relative(marketplacePath)}: marketplace fixture is missing`);
} else {
  const marketplace = readJson(marketplacePath);
  if (marketplace) {
    const pluginCount = Array.isArray(marketplace.plugins) ? marketplace.plugins.length : 0;
    if (pluginCount !== bundleRecords.length) {
      fail(`${relative(marketplacePath)}: marketplace plugin count ${pluginCount} does not match buildable bundle count ${bundleRecords.length}`);
    }
    report.push(`- \`${relative(marketplacePath)}\`: ${pluginCount} entries`);
  }
}

report.push("", "## Repository Package Archive", "");

const repoArchivePath = path.join(root, "dist", `${pkg.name}-${pkg.version}.zip`);
if (fs.existsSync(repoArchivePath)) {
  const entries = zipEntries(repoArchivePath);
  assertNoForbiddenEntries(relative(repoArchivePath), entries);
  assertEntries(repoArchivePath, entries, ["README.md", "LICENSE", "CHANGELOG.md", "package.json", "install.sh", "uninstall.sh"]);
  report.push(`- \`${relative(repoArchivePath)}\`: ${entries.length} entries`);
} else {
  report.push(`- \`${relative(repoArchivePath)}\`: not present; run \`npm run package\` or \`npm run package:fast\` to inspect it.`);
}

report.push("", "## Version Alignment", "");
report.push("- Bundle zip manifests and Codex package manifests match their source bundle versions.");
report.push(`- Repository package version is \`${pkg.version}\`; bundle versions are reported above because bundles may carry independent compatibility versions.`);
report.push("");

if (!fs.existsSync(path.dirname(reportPath))) fs.mkdirSync(path.dirname(reportPath), { recursive: true });
fs.writeFileSync(reportPath, `${report.join("\n")}\n`);

if (errors.length) {
  console.error("Release artifact inspection failed:");
  for (const error of errors) console.error(`- ${error}`);
  console.error(`Inspection report written to ${relative(reportPath)}`);
  process.exit(1);
}

console.log(`Release artifact inspection passed. Report written to ${relative(reportPath)}.`);
