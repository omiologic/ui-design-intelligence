#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { copyDir } from "./lib/bundle-skill.mjs";

const root = process.cwd();
const bundlesDir = path.join(root, "plugins", "bundles");
const outputRoot = path.join(root, "dist", "codex-plugins");
const marketplaceRoot = path.join(root, "dist", "codex-marketplace");
const marketplacePluginRoot = path.join(marketplaceRoot, "plugins");
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

  throw new Error(`Bundle skill source does not exist: ${skillName}`);
}

function rewriteCodexSkillReferences(skillDir) {
  const skillFile = path.join(skillDir, "SKILL.md");
  const text = fs
    .readFileSync(skillFile, "utf8")
    .split("../../../.convention/").join("../../.convention/")
    .split("../../../knowledge/").join("../../knowledge/")
    .split("../../../docs/").join("../../docs/");
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

function codexPluginManifest(sourceManifest, resolvedManifest) {
  return {
    schemaVersion: "ui-design-intelligence.codex-plugin.v1",
    packageType: "codex-plugin",
    name: resolvedManifest.name,
    displayName: resolvedManifest.displayName,
    version: resolvedManifest.version,
    description: resolvedManifest.description,
    repository: resolvedManifest.repository,
    license: resolvedManifest.license,
    sourceBundle: {
      name: sourceManifest.name,
      status: sourceManifest.status,
      changelog: sourceManifest.changelog,
      dependencies: sourceManifest.dependencies ?? [],
      includes: sourceManifest.includes ?? []
    },
    assets: {
      skills: resolvedManifest.skills,
      shared: resolvedManifest.shared,
      omitted: {
        agents: resolvedManifest.agents,
        commands: resolvedManifest.commands,
        reason: "Codex plugin packages currently include skills and reference assets only; Claude/local agents and commands remain in full bundle installs."
      }
    }
  };
}

function inspectionMarkdown(manifest, codexManifest) {
  const omittedAgents = codexManifest.assets.omitted.agents;
  const omittedCommands = codexManifest.assets.omitted.commands;
  return `${[
    `# ${manifest.displayName} Codex Package Inspection`,
    "",
    "## Package",
    "",
    `- Name: \`${manifest.name}\``,
    `- Version: \`${manifest.version}\``,
    `- Source bundle status: \`${manifest.status}\``,
    "- Shape: `.codex-plugin/plugin.json`, package docs, `skills/`, and manifest-declared shared reference assets.",
    "",
    "## Included Assets",
    "",
    `- Skills: ${codexManifest.assets.skills.length}`,
    `- Shared/reference files: ${codexManifest.assets.shared.length}`,
    "",
    "## Omitted Assets",
    "",
    `- Agents omitted: ${omittedAgents.length}${omittedAgents.length ? ` (${omittedAgents.map((name) => `\`${name}\``).join(", ")})` : ""}`,
    `- Commands omitted: ${omittedCommands.length}${omittedCommands.length ? ` (${omittedCommands.map((name) => `\`${name}\``).join(", ")})` : ""}`,
    "",
    codexManifest.assets.omitted.reason,
    "",
    "## Validation",
    "",
    "- Reference verification must pass against `skills/` from the package root.",
    "- `npm run validate:codex-plugins` validates generated manifests, required directories, omitted assets, and reference resolution."
  ].join("\n")}\n`;
}

function marketplacePathForPackage(packageDir) {
  return `./${path.relative(marketplaceRoot, packageDir).split(path.sep).join("/")}`;
}

function marketplaceEntry(manifest, packageDir) {
  return {
    name: manifest.name,
    source: {
      source: "local",
      path: marketplacePathForPackage(packageDir)
    },
    policy: {
      installation: "AVAILABLE",
      authentication: "ON_INSTALL"
    },
    category: "Developer Tools",
    interface: {
      displayName: manifest.displayName,
      description: manifest.description
    }
  };
}

function marketplaceReadme(entries) {
  return `${[
    "# Codex Local Marketplace Fixture",
    "",
    "This generated fixture exposes the Codex plugin packages built from this repository's bundle manifests.",
    "",
    "## Add In Codex CLI",
    "",
    "From the repository root:",
    "",
    "```bash",
    "codex plugin marketplace add ./dist/codex-marketplace",
    "codex plugin marketplace list",
    "```",
    "",
    "Then open the plugin browser:",
    "",
    "```text",
    "codex",
    "/plugins",
    "```",
    "",
    "Choose this marketplace source, inspect a plugin, select `Install plugin`, and press Space on an installed plugin to toggle its enabled state.",
    "",
    "## Add In Codex App",
    "",
    "Restart Codex after generating this fixture. Open **Plugins**, switch to this local marketplace source, inspect a plugin, and select **Add to Codex**.",
    "",
    "The CLI reads `dist/codex-marketplace/.agents/plugins/marketplace.json` and the mirrored plugin folders in `dist/codex-marketplace/plugins/`.",
    "",
    "For a direct local marketplace link, open:",
    "",
    "```text",
    "codex://plugins/?marketplacePath=/absolute/path/to/dist/codex-marketplace/.agents/plugins/marketplace.json",
    "```",
    "",
    "Replace the path with this repository's absolute generated `.agents/plugins/marketplace.json` path.",
    "",
    "## Smoke Test",
    "",
    "1. Run `npm run build:codex-plugins`.",
    "2. Run `npm run validate:codex-plugins`.",
    "3. Add `./dist/codex-marketplace` with `codex plugin marketplace add`.",
    "4. Open the plugin browser and install one package.",
    "5. Start a new Codex thread and invoke one installed skill with `@`.",
    "6. Disable the plugin from the plugin browser, restart Codex, and confirm the skill is no longer offered.",
    "7. Reopen the plugin browser, uninstall the plugin, and remove the marketplace with `codex plugin marketplace remove <marketplace-name>` if needed.",
    "",
    "## Entries",
    "",
    ...entries.map((entry) => `- \`${entry.name}\` -> \`${entry.source.path}\``)
  ].join("\n")}\n`;
}

run("node", ["scripts/validate-bundles.mjs"]);

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

fs.rmSync(outputRoot, { recursive: true, force: true });
fs.mkdirSync(outputRoot, { recursive: true });
fs.rmSync(marketplaceRoot, { recursive: true, force: true });
fs.mkdirSync(marketplaceRoot, { recursive: true });
fs.mkdirSync(marketplacePluginRoot, { recursive: true });

const marketplaceEntries = [];

for (const { dir, manifest, resolvedManifest } of manifests) {
  const packageDir = path.join(outputRoot, resolvedManifest.name);
  fs.rmSync(packageDir, { recursive: true, force: true });
  fs.mkdirSync(path.join(packageDir, ".codex-plugin"), { recursive: true });

  const generatedManifest = codexPluginManifest(manifest, resolvedManifest);
  fs.writeFileSync(
    path.join(packageDir, ".codex-plugin", "plugin.json"),
    `${JSON.stringify(generatedManifest, null, 2)}\n`
  );
  fs.writeFileSync(path.join(packageDir, "PACKAGE_INSPECTION.md"), inspectionMarkdown(resolvedManifest, generatedManifest));
  copyFile(path.join(dir, "README.md"), path.join(packageDir, "README.md"));
  copyFile(path.join(dir, resolvedManifest.license), path.join(packageDir, resolvedManifest.license));
  copyFile(path.join(dir, resolvedManifest.changelog), path.join(packageDir, resolvedManifest.changelog));

  for (const skillName of resolvedManifest.skills) {
    const targetDir = path.join(packageDir, "skills", skillName);
    copyDir(skillSourceDir(skillName), targetDir);
    rewriteCodexSkillReferences(targetDir);
  }

  for (const sharedPath of resolvedManifest.shared) {
    copyFile(path.join(root, sharedPath), path.join(packageDir, sharedPath));
  }

  run("node", [path.join(root, "scripts", "verify-installed-references.mjs"), "skills"], { cwd: packageDir });
  const marketplacePackageDir = path.join(marketplacePluginRoot, resolvedManifest.name);
  copyDir(packageDir, marketplacePackageDir);
  marketplaceEntries.push(marketplaceEntry(resolvedManifest, marketplacePackageDir));
  console.log(
    `Built ${path.relative(root, packageDir)} ` +
    `(${resolvedManifest.skills.length} skills, ${resolvedManifest.shared.length} shared assets, ` +
    `${resolvedManifest.agents.length} agents omitted, ${resolvedManifest.commands.length} commands omitted)`
  );
}

const marketplace = {
  name: "ui-design-intelligence-local",
  displayName: "UI Design Intelligence Local",
  description: "Local Codex plugin marketplace generated from ui-design-intelligence bundle manifests.",
  generatedBy: "npm run build:codex-plugins",
  plugins: marketplaceEntries
};

fs.writeFileSync(path.join(marketplaceRoot, "marketplace.json"), `${JSON.stringify(marketplace, null, 2)}\n`);
fs.mkdirSync(path.join(marketplaceRoot, ".agents", "plugins"), { recursive: true });
fs.writeFileSync(
  path.join(marketplaceRoot, ".agents", "plugins", "marketplace.json"),
  `${JSON.stringify(marketplace, null, 2)}\n`
);
fs.writeFileSync(path.join(marketplaceRoot, "README.md"), marketplaceReadme(marketplaceEntries));

console.log(`Built ${path.relative(root, path.join(marketplaceRoot, ".agents", "plugins", "marketplace.json"))} (${marketplaceEntries.length} entries).`);
console.log(`Built ${manifests.length} Codex plugin package(s).`);
