#!/usr/bin/env node
import path from "node:path";
import { spawnSync } from "node:child_process";

const root = process.cwd();
const explicitFiles = process.argv.slice(2).filter((arg) => !arg.startsWith("--"));

function run(command, args, options = {}) {
  const result = spawnSync(command, args, {
    cwd: options.cwd ?? root,
    encoding: "utf8",
    stdio: options.capture ? "pipe" : "inherit"
  });

  if (result.error) {
    console.error(`Failed to run ${command}: ${result.error.message}`);
    process.exit(1);
  }
  if (result.status !== 0) process.exit(result.status ?? 1);
  return result.stdout ?? "";
}

function changedFilesFromGit() {
  const output = run("git", ["status", "--porcelain"], { capture: true });
  return output
    .split("\n")
    .map((line) => line.trimEnd())
    .filter(Boolean)
    .map((line) => line.slice(3))
    .map((file) => file.includes(" -> ") ? file.split(" -> ").at(-1) : file)
    .filter((file) => file.length > 0)
    .sort();
}

function add(set, value) {
  if (value) set.add(value);
}

const changedFiles = explicitFiles.length ? explicitFiles : changedFilesFromGit();
const skillNames = new Set();
const bundleNames = new Set();
const exampleFiles = new Set();
const antiPatternFiles = new Set();
const commands = [];
let runSchema = false;
let runTasteProfiles = false;
let runQualityGoldenSet = false;
let runKnowledge = false;
let runContent = false;
let runDesignSystem = false;
let runPrototype = false;
let runStyleReferences = false;
let runInstallMatrix = false;
let runCodexPlugins = false;
let runInvalidExamples = false;
let runInvalidContent = false;
let runInvalidTasteProfiles = false;
let runInvalidAntipatterns = false;
let runFullValidate = false;

for (const file of changedFiles) {
  const normalized = file.split(path.sep).join("/");
  let match = normalized.match(/^plugins\/individuals\/([^/]+)\//);
  if (match) add(skillNames, match[1]);

  match = normalized.match(/^plugins\/bundles\/([^/]+)\//);
  if (match) add(bundleNames, match[1]);

  if (normalized.startsWith(".convention/examples/") && normalized.endsWith(".json")) {
    add(exampleFiles, normalized);
    if (normalized.endsWith(".ui-blueprint.json") || normalized.endsWith("ui-blueprint.example.json")) {
      add(antiPatternFiles, normalized);
    }
  }

  if (normalized.startsWith("tests/invalid-examples/")) runInvalidExamples = true;
  if (normalized.startsWith("tests/invalid-content/")) runInvalidContent = true;
  if (normalized.startsWith("tests/invalid-taste-profiles/")) runInvalidTasteProfiles = true;
  if (normalized.startsWith("tests/invalid-antipatterns/")) runInvalidAntipatterns = true;
  if (normalized.startsWith(".convention/taste-profiles/")) runTasteProfiles = true;
  if (normalized.startsWith("tests/quality-golden-set/")) runQualityGoldenSet = true;
  if (normalized.startsWith(".convention/knowledge/")) runKnowledge = true;
  if (
    normalized.endsWith(".user-journey-map.example.json") ||
    normalized.endsWith(".content-model.example.json") ||
    normalized.endsWith(".prototype-content.example.json") ||
    normalized.endsWith(".brand-voice.example.json") ||
    normalized.endsWith(".copy-pattern.json") ||
    normalized.endsWith(".journey-pattern.json") ||
    normalized.endsWith(".objection-pattern.json") ||
    normalized.endsWith(".voice-profile.json") ||
    normalized === "scripts/validate-content.mjs" ||
    normalized === "scripts/validate-invalid-content.mjs"
  ) runContent = true;
  if (normalized.startsWith(".convention/style-references/") || normalized.includes("style-reference") || normalized.includes("style-application") || normalized.includes("style-patch") || normalized.includes("style-blend")) runStyleReferences = true;
  if (normalized.includes("design-system") || normalized.includes("foundation") || normalized.startsWith(".convention/vocabulary/design-") || normalized.startsWith(".convention/vocabulary/component-") || normalized.startsWith(".convention/vocabulary/layout-roles")) runDesignSystem = true;
  if (normalized.includes("prototype") || normalized.includes("interaction-flow") || normalized.includes("component-state-model")) runPrototype = true;
  if (normalized.startsWith(".convention/schemas/") || normalized.startsWith(".convention/vocabulary/")) runSchema = true;
  if (["install.sh", "uninstall.sh", "scripts/install-bundle.mjs", "scripts/validate-install-matrix.mjs"].includes(normalized)) runInstallMatrix = true;
  if (normalized.includes("codex-plugin") || normalized.includes("codex-marketplace") || normalized === "scripts/build-codex-plugins.mjs" || normalized === "scripts/validate-codex-plugins.mjs") runCodexPlugins = true;
  if (normalized === "package.json" || normalized === "scripts/validate-changed.mjs") runFullValidate = true;
}

if (changedFiles.length === 0) {
  console.log("No changed files detected.");
  process.exit(0);
}

console.log(`Changed-file validation for ${changedFiles.length} file(s).`);

if (runFullValidate) {
  commands.push(["npm", ["run", "validate"]]);
} else {
  if (runSchema) {
    commands.push(["npm", ["run", "check:schema"]]);
    commands.push(["npm", ["run", "build:valid-node-types"]]);
  }
  if (skillNames.size > 0) commands.push(["npm", ["run", "validate:skill", "--", ...[...skillNames].sort()]]);
  if (bundleNames.size > 0) commands.push(["npm", ["run", "validate:bundle", "--", ...[...bundleNames].sort()]]);
  if (exampleFiles.size > 0) commands.push(["npm", ["run", "validate:examples", "--", ...[...exampleFiles].sort()]]);
  if (antiPatternFiles.size > 0) commands.push(["npm", ["run", "validate:blueprint-antipatterns", "--", ...[...antiPatternFiles].sort()]]);
  if (runTasteProfiles) commands.push(["npm", ["run", "validate:taste-profiles"]]);
  if (runQualityGoldenSet) commands.push(["npm", ["run", "validate:quality-golden-set"]]);
  if (runKnowledge) {
    commands.push(["npm", ["run", "validate:knowledge"]]);
    commands.push(["npm", ["run", "validate:knowledge-index"]]);
  }
  if (runContent) commands.push(["npm", ["run", "validate:content"]]);
  if (runDesignSystem) commands.push(["npm", ["run", "validate:design-system"]]);
  if (runPrototype) commands.push(["npm", ["run", "validate:prototype"]]);
  if (runStyleReferences) commands.push(["npm", ["run", "validate:style-references"]]);
  if (runInvalidExamples) commands.push(["npm", ["run", "validate:invalid-examples"]]);
  if (runInvalidContent) commands.push(["npm", ["run", "validate:invalid-content"]]);
  if (runInvalidTasteProfiles) commands.push(["npm", ["run", "validate:invalid-taste-profiles"]]);
  if (runInvalidAntipatterns) commands.push(["npm", ["run", "validate:invalid-antipatterns"]]);
  if (runInstallMatrix) commands.push(["npm", ["run", "validate:install-matrix"]]);
  if (runCodexPlugins) {
    commands.push(["npm", ["run", "build:codex-plugins"]]);
    commands.push(["npm", ["run", "validate:codex-plugins"]]);
  }
}

const seen = new Set();
const uniqueCommands = commands.filter(([command, args]) => {
  const key = `${command} ${args.join(" ")}`;
  if (seen.has(key)) return false;
  seen.add(key);
  return true;
});

if (uniqueCommands.length === 0) {
  console.log("No targeted validator matched changed files; run npm run validate before release.");
  process.exit(0);
}

for (const [command, args] of uniqueCommands) {
  run(command, args);
}

console.log(`Changed-file validation passed with ${uniqueCommands.length} command(s).`);
