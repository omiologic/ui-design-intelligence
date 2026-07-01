#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const bundlesDir = path.join(root, "plugins", "bundles");
const agentsDir = path.join(root, "agents");
const commandsDir = path.join(root, "commands");
const args = process.argv.slice(2);
const strict = args.includes("--strict");
const requestedBundles = args.filter((arg) => !arg.startsWith("--"));
const errors = [];
const manifestsForCollisionCheck = [];
const manifestRecords = new Map();

const requiredAgentSections = [
  "## Purpose",
  "## Use When",
  "## Boundary",
  "## Skills",
  "## Commands",
  "## Workflow",
  "## Arbitration",
  "## Inputs",
  "## Outputs",
  "## Worked Example",
  "## Hand-Offs"
];

const requiredCommandSections = [
  "## Purpose",
  "## Use When",
  "## Inputs",
  "## Workflow",
  "## Outputs",
  "## Agents",
  "## Skills"
];

const requiredBundleReadmeSections = [
  "## Summary",
  "## When To Install",
  "## Included",
  "## Requirements",
  "## Install",
  "## Usage Example",
  "## Relationship To Other Bundles",
  "## Versioning And Status",
  "## License"
];

const creationFacingAgents = new Set([
  "blueprint-architect",
  "design-system-architect",
  "prototype-architect",
  "ui-researcher",
  "ui-specification-analyst",
  "ui-interaction-analyst",
  "accessibility-reviewer"
]);

const requiredCreationAgentSections = [
  "## Creation Defaults",
  "## Required Inputs",
  "## Missing Input Questions",
  "## Stop Conditions",
  "## Output Files",
  "## Quality Gates",
  "## Escalation And Handoffs"
];

const allowedStatuses = new Set(["planned", "transitional", "active"]);
const marketplaceOnlyFields = new Set([
  "category",
  "icon",
  "keywords",
  "homepage",
  "publisher",
  "publisherId",
  "marketplace",
  "marketplaceSlug",
  "slug",
  "pricing"
]);

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

function uniqueSorted(values) {
  return [...new Set(values)].sort();
}

function normalizeDependencies(dependencies) {
  if (!Array.isArray(dependencies)) return [];
  return dependencies;
}

function resolveManifest(manifest, stack = []) {
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
    fail(`plugins/bundles/${manifest.name}/plugin.json: circular includes chain: ${[...stack, manifest.name].join(" -> ")}`);
    return manifest;
  }

  const expanded = {
    ...manifest,
    skills: [...(manifest.skills ?? [])],
    agents: [...(manifest.agents ?? [])],
    commands: [...(manifest.commands ?? [])],
    shared: [...(manifest.shared ?? [])]
  };

  for (const includedName of manifest.includes) {
    const included = manifestRecords.get(includedName)?.manifest;
    if (!included) {
      fail(`plugins/bundles/${manifest.name}/plugin.json: included bundle does not exist: ${includedName}`);
      continue;
    }

    const resolved = resolveManifest(included, [...stack, manifest.name]);
    expanded.skills.push(...(resolved.skills ?? []));
    expanded.agents.push(...(resolved.agents ?? []));
    expanded.commands.push(...(resolved.commands ?? []));
    expanded.shared.push(...(resolved.shared ?? []));
  }

  expanded.skills = uniqueSorted(expanded.skills);
  expanded.agents = uniqueSorted(expanded.agents);
  expanded.commands = uniqueSorted(expanded.commands);
  expanded.shared = uniqueSorted(expanded.shared);
  return expanded;
}

function requireMarkdownSections(file, sections) {
  if (!fs.existsSync(file)) {
    fail(`${path.relative(root, file)}: file does not exist`);
    return;
  }

  const text = fs.readFileSync(file, "utf8");
  if (!/^#\s+.+/m.test(text)) {
    fail(`${path.relative(root, file)}: missing top-level heading`);
  }

  for (const section of sections) {
    if (!text.includes(section)) {
      fail(`${path.relative(root, file)}: missing ${section}`);
    }
  }
}

function readText(file) {
  try {
    return fs.readFileSync(file, "utf8");
  } catch {
    return "";
  }
}

function sectionBody(text, sectionName) {
  const lines = text.split(/\r?\n/);
  const start = lines.findIndex((line) => line === `## ${sectionName}`);
  if (start === -1) return "";

  const body = [];
  for (const line of lines.slice(start + 1)) {
    if (line.startsWith("## ")) break;
    body.push(line);
  }
  return body.join("\n");
}

function parseRosterItems(file, text, sectionName) {
  const body = sectionBody(text, sectionName);
  const items = [];
  const rosterPattern = /^-\s+(required|optional):\s+`([^`]+)`/gm;
  let match;

  while ((match = rosterPattern.exec(body))) {
    items.push({ kind: match[1], name: match[2] });
  }

  const backtickedBullets = [...body.matchAll(/^-\s+(?!required:|optional:).*?`([^`]+)`/gm)];
  for (const bullet of backtickedBullets) {
    fail(`${path.relative(root, file)}: ${sectionName} roster item must start with "required:" or "optional:": ${bullet[0]}`);
  }

  if (items.length === 0) {
    fail(`${path.relative(root, file)}: ${sectionName} must include at least one structured roster item`);
  }

  return items;
}

function parseRepoLinks(text) {
  const links = [];
  const pathPattern = /`((?:shared|knowledge)\/(?:schemas|templates|examples)\/[^`]+)`/g;
  let match;
  while ((match = pathPattern.exec(text))) links.push(match[1]);
  return links;
}

function skillExists(skillName) {
  return fs.existsSync(path.join(root, "plugins", "individuals", skillName, "SKILL.md"))
    || fs.existsSync(path.join(root, "skills", skillName, "SKILL.md"));
}

function commandExists(commandName) {
  return fs.existsSync(path.join(commandsDir, `${commandName}.md`));
}

function agentExists(agentName) {
  return fs.existsSync(path.join(agentsDir, `${agentName}.md`));
}

function isBuildableStatus(status) {
  return status === "active" || status === "transitional";
}

function requiresResolvedReferences(manifest) {
  if (isBuildableStatus(manifest.status)) return true;
  if (!strict) return false;
  if (requestedBundles.length === 0) return true;
  return requestedBundles.includes(manifest.name);
}

function isAggregateBundle(manifest) {
  return Array.isArray(manifest.includes) && manifest.includes.length > 0;
}

function isSemver(version) {
  return typeof version === "string" && /^\d+\.\d+\.\d+$/.test(version);
}

function versionMajorMinor(version) {
  const [major, minor] = version.split(".").map((value) => Number.parseInt(value, 10));
  return { major, minor };
}

if (!fs.existsSync(bundlesDir)) {
  fail("plugins/bundles/: directory does not exist");
} else {
  const bundleDirs = fs
    .readdirSync(bundlesDir, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .sort();

  for (const bundleName of bundleDirs) {
    const manifestPath = path.join(bundlesDir, bundleName, "plugin.json");
    if (!fs.existsSync(manifestPath)) continue;
    const manifest = readJson(manifestPath);
    if (manifest) manifestRecords.set(bundleName, { manifest, manifestPath });
  }

  for (const bundleName of requestedBundles) {
    if (!bundleDirs.includes(bundleName)) {
      fail(`plugins/bundles/${bundleName}/plugin.json: requested bundle manifest does not exist`);
    }
  }

  for (const bundleName of bundleDirs) {
    if (strict && requestedBundles.length > 0 && !requestedBundles.includes(bundleName)) continue;

    const bundleDir = path.join(bundlesDir, bundleName);
    const manifestPath = path.join(bundleDir, "plugin.json");
    const readmePath = path.join(bundleDir, "README.md");

    if (!fs.existsSync(manifestPath)) {
      fail(`plugins/bundles/${bundleName}/plugin.json: file does not exist`);
      continue;
    }
    requireMarkdownSections(readmePath, requiredBundleReadmeSections);

    const manifest = manifestRecords.get(bundleName)?.manifest ?? readJson(manifestPath);
    if (!manifest) continue;
    const resolvedManifest = resolveManifest(manifest);
    manifestsForCollisionCheck.push({ manifest: resolvedManifest, sourceManifest: manifest, manifestPath });

    if (manifest.name !== bundleName) {
      fail(`${path.relative(root, manifestPath)}: name must match directory "${bundleName}"`);
    }

    for (const field of ["version", "description", "status", "displayName", "maintainer", "repository", "license", "changelog"]) {
      if (typeof manifest[field] !== "string" || manifest[field].length === 0) {
        fail(`${path.relative(root, manifestPath)}: missing string field "${field}"`);
      }
    }

    if (!isSemver(manifest.version)) {
      fail(`${path.relative(root, manifestPath)}: version must be semantic x.y.z, got "${manifest.version}"`);
    } else if (manifest.status === "active") {
      const { major, minor } = versionMajorMinor(manifest.version);
      if (major === 0 && minor < 2) {
        fail(`${path.relative(root, manifestPath)}: active bundles must use a meaningful version at or above 0.2.0`);
      }
    }

    if (!allowedStatuses.has(manifest.status)) {
      fail(`${path.relative(root, manifestPath)}: status must be one of ${[...allowedStatuses].join(", ")}`);
    }

    for (const field of marketplaceOnlyFields) {
      if (Object.hasOwn(manifest, field)) {
        fail(`${path.relative(root, manifestPath)}: marketplace-only field "${field}" is deferred and must not be present yet`);
      }
    }

    if (!Array.isArray(manifest.dependencies)) {
      fail(`${path.relative(root, manifestPath)}: "dependencies" must be an array`);
    }

    for (const dependency of normalizeDependencies(manifest.dependencies)) {
      if (typeof dependency !== "string" || dependency.length === 0) {
        fail(`${path.relative(root, manifestPath)}: dependencies must be bundle-name strings`);
      } else if (dependency === manifest.name) {
        fail(`${path.relative(root, manifestPath)}: dependency must not reference itself: ${dependency}`);
      } else if (!manifestRecords.has(dependency)) {
        fail(`${path.relative(root, manifestPath)}: dependency bundle does not exist: ${dependency}`);
      }
    }

    if (manifest.includes !== undefined && !Array.isArray(manifest.includes)) {
      fail(`${path.relative(root, manifestPath)}: "includes" must be an array when present`);
    }

    for (const includedName of manifest.includes ?? []) {
      if (typeof includedName !== "string" || includedName.length === 0) {
        fail(`${path.relative(root, manifestPath)}: includes must be bundle-name strings`);
      } else if (includedName === manifest.name) {
        fail(`${path.relative(root, manifestPath)}: includes must not reference itself: ${includedName}`);
      } else if (!manifestRecords.has(includedName)) {
        fail(`${path.relative(root, manifestPath)}: included bundle does not exist: ${includedName}`);
      }
    }

    if (!isAggregateBundle(manifest)) {
      for (const field of ["skills", "agents", "commands", "shared"]) {
        if (!Array.isArray(manifest[field])) {
          fail(`${path.relative(root, manifestPath)}: "${field}" must be an array`);
        }
      }
    } else {
      for (const field of ["skills", "agents", "commands", "shared"]) {
        if (Array.isArray(manifest[field]) && manifest[field].length > 0) {
          fail(`${path.relative(root, manifestPath)}: aggregate composition should not hand-maintain "${field}"; use "includes"`);
        }
      }
      if (!Array.isArray(manifest.includes) || manifest.includes.length === 0) {
        fail(`${path.relative(root, manifestPath)}: aggregate composition must declare non-empty "includes"`);
      }
    }

    for (const fileName of [manifest.license, manifest.changelog]) {
      if (typeof fileName === "string" && !fs.existsSync(path.join(bundleDir, fileName))) {
        fail(`${path.relative(root, manifestPath)}: metadata file does not exist: ${fileName}`);
      }
    }

    if (typeof manifest.license === "string") {
      const licensePath = path.join(bundleDir, manifest.license);
      const licenseText = readText(licensePath).trim();
      if (fs.existsSync(licensePath) && licenseText.length === 0) {
        fail(`${path.relative(root, licensePath)}: license file must not be empty`);
      }
    }

    if (typeof manifest.changelog === "string") {
      const changelogPath = path.join(bundleDir, manifest.changelog);
      const changelogText = readText(changelogPath);
      if (fs.existsSync(changelogPath)) {
        if (!/^# Changelog/m.test(changelogText)) {
          fail(`${path.relative(root, changelogPath)}: changelog must start with "# Changelog"`);
        }
        if (!changelogText.includes(manifest.name)) {
          fail(`${path.relative(root, changelogPath)}: changelog should name the bundle "${manifest.name}"`);
        }
      }
    }

    if (requiresResolvedReferences(manifest)) {
      for (const skill of resolvedManifest.skills ?? []) {
        if (!skillExists(skill)) {
          fail(`${path.relative(root, manifestPath)}: referenced skill does not exist: ${skill}`);
        }
      }

      for (const sharedPath of resolvedManifest.shared ?? []) {
        if (!fs.existsSync(path.join(root, sharedPath))) {
          fail(`${path.relative(root, manifestPath)}: referenced shared file does not exist: ${sharedPath}`);
        }
      }
    }

    for (const agent of resolvedManifest.agents ?? []) {
      const agentPath = path.join(agentsDir, `${agent}.md`);
      requireMarkdownSections(agentPath, requiredAgentSections);
      if (creationFacingAgents.has(agent)) {
        requireMarkdownSections(agentPath, requiredCreationAgentSections);
      }

      if (!agentExists(agent)) continue;
      const text = readText(agentPath);
      const skillRoster = parseRosterItems(agentPath, text, "Skills");
      const commandRoster = parseRosterItems(agentPath, text, "Commands");

      for (const item of skillRoster) {
        if (!skillExists(item.name)) {
          fail(`${path.relative(root, agentPath)}: ${item.kind} skill does not exist: ${item.name}`);
        }
        if (item.kind === "required" && !(resolvedManifest.skills ?? []).includes(item.name)) {
          fail(`${path.relative(root, manifestPath)}: agent "${agent}" requires skill "${item.name}" but this bundle does not include it`);
        }
      }

      for (const item of commandRoster) {
        if (!commandExists(item.name)) {
          fail(`${path.relative(root, agentPath)}: ${item.kind} command does not exist: ${item.name}`);
        }
        if (item.kind === "required" && !(resolvedManifest.commands ?? []).includes(item.name)) {
          fail(`${path.relative(root, manifestPath)}: agent "${agent}" requires command "${item.name}" but this bundle does not include it`);
        }
      }

      const ioText = `${sectionBody(text, "Inputs")}\n${sectionBody(text, "Outputs")}`;
      for (const repoLink of parseRepoLinks(ioText)) {
        if (!fs.existsSync(path.join(root, repoLink))) {
          fail(`${path.relative(root, agentPath)}: linked IO artifact does not exist: ${repoLink}`);
        }
      }
    }

    for (const command of resolvedManifest.commands ?? []) {
      requireMarkdownSections(path.join(commandsDir, `${command}.md`), requiredCommandSections);
    }
  }
}

const commandOwners = new Map();
for (const { manifest, sourceManifest, manifestPath } of manifestsForCollisionCheck) {
  if (isAggregateBundle(sourceManifest)) continue;
  if (!isBuildableStatus(manifest.status) && !strict) continue;

  for (const command of manifest.commands ?? []) {
    const owners = commandOwners.get(command) ?? [];
    owners.push(path.relative(root, manifestPath));
    commandOwners.set(command, owners);
  }
}

for (const [command, owners] of commandOwners) {
  if (owners.length > 1) {
    fail(`command "${command}" is owned by multiple component bundles: ${owners.join(", ")}`);
  }
}

if (errors.length) {
  console.error("Bundle validation failed:");
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log("Bundle validation passed.");
