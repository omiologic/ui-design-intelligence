#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { copyDir } from "./lib/bundle-skill.mjs";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(scriptDir, "..");
const [action, bundleName, targetRootArg, skillsDirArg] = process.argv.slice(2);

if (!action || !bundleName || !targetRootArg || !skillsDirArg || !["install", "uninstall"].includes(action)) {
  console.error("Usage: node scripts/install-bundle.mjs <install|uninstall> <bundle-name> <target-root> <skills-dir>");
  process.exit(1);
}

const targetRoot = path.resolve(targetRootArg);
const skillsDir = path.resolve(skillsDirArg);
const manifestPath = path.join(root, "plugins", "bundles", bundleName, "plugin.json");
const installRecordDir = path.join(targetRoot, ".ui-blueprint-bundles");
const installRecordPath = path.join(installRecordDir, `${bundleName}.json`);

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

function loadBundleManifest(bundle) {
  return readJson(path.join(root, "plugins", "bundles", bundle, "plugin.json"));
}

function resolveManifest(manifest, stack = []) {
  if (!Array.isArray(manifest.includes) || manifest.includes.length === 0) {
    return {
      ...manifest,
      skills: manifest.skills ?? [],
      agents: manifest.agents ?? [],
      commands: manifest.commands ?? [],
      shared: manifest.shared ?? []
    };
  }

  if (stack.includes(manifest.name)) {
    throw new Error(`Circular bundle includes chain: ${[...stack, manifest.name].join(" -> ")}`);
  }

  const expanded = {
    ...manifest,
    skills: manifest.skills ?? [],
    agents: manifest.agents ?? [],
    commands: manifest.commands ?? [],
    shared: manifest.shared ?? []
  };

  for (const includedName of manifest.includes) {
    const includedPath = path.join(root, "plugins", "bundles", includedName, "plugin.json");
    if (!fs.existsSync(includedPath)) throw new Error(`Included bundle does not exist: ${manifest.name} includes ${includedName}`);
    const resolved = resolveManifest(loadBundleManifest(includedName), [...stack, manifest.name]);
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

function removeFileIfExists(file) {
  if (fs.existsSync(file)) fs.rmSync(file, { force: true });
}

function removeDirIfExists(dir) {
  if (fs.existsSync(dir)) fs.rmSync(dir, { recursive: true, force: true });
}

function pruneEmptyDirs(startDir, stopDir) {
  let current = startDir;
  while (current.startsWith(stopDir) && current !== stopDir && fs.existsSync(current)) {
    if (fs.readdirSync(current).length > 0) return;
    fs.rmdirSync(current);
    current = path.dirname(current);
  }
}

function skillSourceDir(skillName) {
  const individual = path.join(root, "plugins", "individuals", skillName);
  if (fs.existsSync(path.join(individual, "SKILL.md"))) return individual;

  const compatibility = path.join(root, "skills", skillName);
  if (fs.existsSync(path.join(compatibility, "SKILL.md"))) return compatibility;

  throw new Error(`Bundle skill source does not exist: ${skillName}`);
}

function rewriteInstalledSkillReferences(skillDir) {
  const skillFile = path.join(skillDir, "SKILL.md");
  let text = fs.readFileSync(skillFile, "utf8");
  text = text.split("../../../shared/").join("../../shared/");
  text = text.split("../../../knowledge/").join("../../knowledge/");
  fs.writeFileSync(skillFile, text);
}

function loadManifest() {
  if (!fs.existsSync(manifestPath)) {
    throw new Error(`Bundle manifest does not exist: plugins/bundles/${bundleName}/plugin.json`);
  }

  const manifest = readJson(manifestPath);
  if (manifest.name !== bundleName) {
    throw new Error(`Bundle manifest name "${manifest.name}" does not match requested bundle "${bundleName}"`);
  }
  return resolveManifest(manifest);
}

function preflightInstall(manifest) {
  for (const skillName of manifest.skills) {
    skillSourceDir(skillName);
  }

  for (const agentName of manifest.agents) {
    const file = path.join(root, "agents", `${agentName}.md`);
    if (!fs.existsSync(file)) throw new Error(`Bundle agent does not exist: agents/${agentName}.md`);
  }

  for (const commandName of manifest.commands) {
    const file = path.join(root, "commands", `${commandName}.md`);
    if (!fs.existsSync(file)) throw new Error(`Bundle command does not exist: commands/${commandName}.md`);
  }

  for (const sharedPath of manifest.shared) {
    const file = path.join(root, sharedPath);
    if (!fs.existsSync(file)) throw new Error(`Bundle shared file does not exist: ${sharedPath}`);
  }
}

function installBundle(manifest) {
  preflightInstall(manifest);

  fs.mkdirSync(skillsDir, { recursive: true });

  for (const skillName of manifest.skills) {
    const targetDir = path.join(skillsDir, skillName);
    copyDir(skillSourceDir(skillName), targetDir);
    rewriteInstalledSkillReferences(targetDir);
    console.log(`Installed skill: ${skillName}`);
  }

  for (const agentName of manifest.agents) {
    copyFile(path.join(root, "agents", `${agentName}.md`), path.join(targetRoot, "agents", `${agentName}.md`));
    console.log(`Installed agent: ${agentName}`);
  }

  for (const commandName of manifest.commands) {
    copyFile(path.join(root, "commands", `${commandName}.md`), path.join(targetRoot, "commands", `${commandName}.md`));
    console.log(`Installed command: ${commandName}`);
  }

  for (const sharedPath of manifest.shared) {
    copyFile(path.join(root, sharedPath), path.join(targetRoot, sharedPath));
    console.log(`Installed shared file: ${sharedPath}`);
  }

  fs.mkdirSync(installRecordDir, { recursive: true });
  fs.writeFileSync(
    installRecordPath,
    `${JSON.stringify(
      {
        bundle: manifest.name,
        version: manifest.version,
        installedAt: new Date().toISOString(),
        targetRoot,
        skillsDir,
        skills: manifest.skills,
        agents: manifest.agents,
        commands: manifest.commands,
        shared: manifest.shared
      },
      null,
      2
    )}\n`
  );
}

function uninstallBundle(manifest) {
  const record = fs.existsSync(installRecordPath) ? readJson(installRecordPath) : manifest;
  const skills = record.skills ?? manifest.skills;
  const agents = record.agents ?? manifest.agents;
  const commands = record.commands ?? manifest.commands;
  const shared = record.shared ?? manifest.shared;

  for (const skillName of skills) {
    removeDirIfExists(path.join(skillsDir, skillName));
    console.log(`Removed skill: ${skillName}`);
  }

  for (const agentName of agents) {
    removeFileIfExists(path.join(targetRoot, "agents", `${agentName}.md`));
    pruneEmptyDirs(path.join(targetRoot, "agents"), targetRoot);
    console.log(`Removed agent: ${agentName}`);
  }

  for (const commandName of commands) {
    removeFileIfExists(path.join(targetRoot, "commands", `${commandName}.md`));
    pruneEmptyDirs(path.join(targetRoot, "commands"), targetRoot);
    console.log(`Removed command: ${commandName}`);
  }

  for (const sharedPath of shared) {
    const target = path.join(targetRoot, sharedPath);
    removeFileIfExists(target);
    pruneEmptyDirs(path.dirname(target), path.join(targetRoot, "shared"));
    console.log(`Removed shared file: ${sharedPath}`);
  }

  removeFileIfExists(installRecordPath);
  pruneEmptyDirs(installRecordDir, targetRoot);
}

try {
  const manifest = loadManifest();
  if (action === "install") installBundle(manifest);
  if (action === "uninstall") uninstallBundle(manifest);
} catch (error) {
  console.error(error.message);
  process.exit(1);
}
