#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { copyDir } from "./lib/bundle-skill.mjs";

const root = process.cwd();
const bundlesDir = path.join(root, "plugins", "bundles");
const distDir = path.join(root, "dist");
const buildRoot = path.join(distDir, "build");
const pluginDist = path.join(distDir, "plugins");
const args = process.argv.slice(2);
const buildAll = args.includes("--all");
const requestedBundles = args.filter((arg) => !arg.startsWith("--"));

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

function uniqueSorted(values) {
  return [...new Set(values)].sort();
}

function copyFile(source, target) {
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.copyFileSync(source, target);
}

function skillSourceDir(skillName) {
  const individual = path.join(root, "plugins", "individuals", skillName);
  if (fs.existsSync(path.join(individual, "SKILL.md"))) return individual;

  const compatibility = path.join(root, "skills", skillName);
  if (fs.existsSync(path.join(compatibility, "SKILL.md"))) return compatibility;

  throw new Error(`Bundle skill source does not exist: ${skillName}`);
}

function rewriteBundleSkillReferences(skillDir) {
  const skillFile = path.join(skillDir, "SKILL.md");
  let text = fs.readFileSync(skillFile, "utf8");
  text = text.split("../../../shared/").join("../../shared/");
  text = text.split("../../../knowledge/").join("../../knowledge/");
  text = text.split("../../../docs/").join("../../docs/");
  text = text.split("../../shared/").join("../../shared/");
  fs.writeFileSync(skillFile, text);
}

function shouldBuild(manifest) {
  if (requestedBundles.length) return requestedBundles.includes(manifest.name);
  if (buildAll) return true;
  return manifest.status === "active" || manifest.status === "transitional";
}

function resolveManifest(manifest, manifestMap, stack = []) {
  if (!Array.isArray(manifest.includes) || manifest.includes.length === 0) {
    return {
      ...manifest,
      skills: [...(manifest.skills ?? [])],
      agents: [...(manifest.agents ?? [])],
      commands: [...(manifest.commands ?? [])],
      shared: [...(manifest.shared ?? [])]
    };
  }

  if (stack.includes(manifest.name)) {
    throw new Error(`Circular bundle includes chain: ${[...stack, manifest.name].join(" -> ")}`);
  }

  const expanded = {
    ...manifest,
    skills: [...(manifest.skills ?? [])],
    agents: [...(manifest.agents ?? [])],
    commands: [...(manifest.commands ?? [])],
    shared: [...(manifest.shared ?? [])]
  };

  for (const includedName of manifest.includes) {
    const included = manifestMap.get(includedName);
    if (!included) throw new Error(`Included bundle does not exist: ${manifest.name} includes ${includedName}`);
    const resolved = resolveManifest(included.manifest, manifestMap, [...stack, manifest.name]);
    expanded.skills.push(...resolved.skills);
    expanded.agents.push(...resolved.agents);
    expanded.commands.push(...resolved.commands);
    expanded.shared.push(...resolved.shared);
  }

  expanded.skills = uniqueSorted(expanded.skills);
  expanded.agents = uniqueSorted(expanded.agents);
  expanded.commands = uniqueSorted(expanded.commands);
  expanded.shared = uniqueSorted(expanded.shared);
  return expanded;
}

run("node", ["scripts/validate-bundles.mjs"]);

fs.mkdirSync(pluginDist, { recursive: true });
fs.rmSync(buildRoot, { recursive: true, force: true });
fs.mkdirSync(buildRoot, { recursive: true });

const manifestRecords = fs
  .readdirSync(bundlesDir, { withFileTypes: true })
  .filter((entry) => entry.isDirectory())
  .map((entry) => {
    const dir = path.join(bundlesDir, entry.name);
    return {
      dir,
      manifest: readJson(path.join(dir, "plugin.json"))
    };
  })
  .sort((a, b) => a.manifest.name.localeCompare(b.manifest.name));

const manifestMap = new Map(manifestRecords.map((record) => [record.manifest.name, record]));
const manifests = manifestRecords
  .filter(({ manifest }) => shouldBuild(manifest))
  .map((record) => ({
    ...record,
    resolvedManifest: resolveManifest(record.manifest, manifestMap)
  }));

if (requestedBundles.length && manifests.length !== requestedBundles.length) {
  const found = new Set(manifests.map(({ manifest }) => manifest.name));
  for (const bundleName of requestedBundles) {
    if (!found.has(bundleName)) {
      console.error(`Requested bundle manifest was not found: ${bundleName}`);
      process.exit(1);
    }
  }
}

for (const { dir, manifest, resolvedManifest } of manifests) {
  const buildDir = path.join(buildRoot, resolvedManifest.name);
  const archivePath = path.join(pluginDist, `${resolvedManifest.name}.zip`);
  fs.rmSync(buildDir, { recursive: true, force: true });
  fs.rmSync(archivePath, { force: true });
  fs.mkdirSync(buildDir, { recursive: true });

  fs.writeFileSync(path.join(buildDir, "plugin.json"), `${JSON.stringify(resolvedManifest, null, 2)}\n`);
  copyFile(path.join(dir, "README.md"), path.join(buildDir, "README.md"));
  copyFile(path.join(dir, resolvedManifest.license), path.join(buildDir, resolvedManifest.license));
  copyFile(path.join(dir, resolvedManifest.changelog), path.join(buildDir, resolvedManifest.changelog));

  for (const skillName of resolvedManifest.skills) {
    const targetDir = path.join(buildDir, "skills", skillName);
    copyDir(skillSourceDir(skillName), targetDir);
    rewriteBundleSkillReferences(targetDir);
  }

  for (const agent of resolvedManifest.agents) {
    copyFile(path.join(root, "agents", `${agent}.md`), path.join(buildDir, "agents", `${agent}.md`));
  }

  for (const command of resolvedManifest.commands) {
    copyFile(path.join(root, "commands", `${command}.md`), path.join(buildDir, "commands", `${command}.md`));
  }

  for (const sharedPath of resolvedManifest.shared) {
    copyFile(path.join(root, sharedPath), path.join(buildDir, sharedPath));
  }

  run("node", ["scripts/verify-installed-references.mjs", path.relative(root, path.join(buildDir, "skills"))]);
  run("zip", ["-r", archivePath, ".", "-x", "*/__pycache__/*", "*/.DS_Store"], { cwd: buildDir });
  console.log(`Built ${path.relative(root, archivePath)}`);
}

console.log(`Built ${manifests.length} bundle(s).`);
