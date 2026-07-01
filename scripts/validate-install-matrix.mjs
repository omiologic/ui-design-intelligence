#!/usr/bin/env node
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { spawnSync } from "node:child_process";

const root = process.cwd();
const tempRoot = fs.mkdtempSync(path.join(os.tmpdir(), "ui-install-matrix-"));
const results = [];

function relative(file) {
  return path.relative(root, file);
}

function run(args, options = {}) {
  const result = spawnSync(args[0], args.slice(1), {
    cwd: options.cwd ?? root,
    encoding: "utf8",
    stdio: "pipe",
    env: { ...process.env, ...(options.env ?? {}) }
  });

  const output = `${result.stdout ?? ""}${result.stderr ?? ""}`;
  if (options.expectFailure) {
    if (result.status === 0) {
      throw new Error(`Expected command to fail: ${args.join(" ")}\n${output}`);
    }
    return output;
  }

  if (result.error) {
    throw new Error(`Failed to run ${args.join(" ")}: ${result.error.message}`);
  }
  if (result.status !== 0) {
    throw new Error(`Command failed (${result.status}): ${args.join(" ")}\n${output}`);
  }
  return output;
}

function install(bundle, targetRoot, skillsDir, flags = []) {
  return run(["node", "scripts/install-bundle.mjs", "install", bundle, targetRoot, skillsDir, ...flags]);
}

function uninstall(bundle, targetRoot, skillsDir, flags = []) {
  return run(["node", "scripts/install-bundle.mjs", "uninstall", bundle, targetRoot, skillsDir, ...flags]);
}

function verify(skillsDir) {
  return run(["node", "scripts/verify-installed-references.mjs", skillsDir]);
}

function expectExists(file, label) {
  if (!fs.existsSync(file)) throw new Error(`${label} does not exist: ${file}`);
}

function expectMissing(file, label) {
  if (fs.existsSync(file)) throw new Error(`${label} should not exist: ${file}`);
}

function expectIncludes(text, value, label) {
  if (!text.includes(value)) throw new Error(`${label} did not include "${value}"`);
}

function writeText(file, text) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, text);
}

function appendText(file, text) {
  fs.appendFileSync(file, text);
}

function record(name) {
  results.push(name);
  console.log(`Install matrix passed: ${name}`);
}

function testDryRunWritesNoFiles() {
  const target = path.join(tempRoot, "dry-run", ".claude");
  const skills = path.join(target, "skills");
  install("ui-blueprint-skills", target, skills, ["--dry-run"]);
  expectMissing(path.join(tempRoot, "dry-run"), "dry-run target");

  const shellTarget = path.join(tempRoot, "dry-run-shell", ".claude");
  run(["./install.sh", "--dry-run"], { env: { UI_PLUGIN_TARGET: shellTarget } });
  expectMissing(path.join(tempRoot, "dry-run-shell"), "shell dry-run target");
  record("dry-run writes no files");
}

function testCleanCodexComponentInstall() {
  const project = path.join(tempRoot, "codex-component");
  const target = path.join(project, ".agents");
  const skills = path.join(target, "skills");
  install("ui-blueprint-skills", target, skills, ["--skills-only"]);
  verify(skills);

  expectExists(path.join(skills, "design-terminology", "SKILL.md"), "Codex skill");
  expectExists(path.join(project, ".convention", "schemas", "wireframe-config.schema.json"), "Codex convention reference asset");
  expectMissing(path.join(target, ".convention"), "Codex nested convention directory");
  expectMissing(path.join(target, "agents"), "Codex agents directory");
  expectMissing(path.join(target, "commands"), "Codex commands directory");
  record("clean Codex .agents component install");
}

function testCleanCodexFullInstall() {
  const project = path.join(tempRoot, "codex-full");
  const target = path.join(project, ".agents");
  const skills = path.join(target, "skills");
  install("ui-blueprint-skills", target, skills);
  verify(skills);

  expectExists(path.join(skills, "design-terminology", "SKILL.md"), "Codex full skill");
  expectExists(path.join(target, "agents", "blueprint-architect.md"), "Codex full agent");
  expectExists(path.join(target, "commands", "generate-blueprint-from-study.md"), "Codex full command");
  expectExists(path.join(project, ".convention", "schemas", "wireframe-config.schema.json"), "Codex full convention reference asset");
  expectMissing(path.join(target, ".convention"), "Codex full nested convention directory");
  record("clean Codex .agents full install");
}

function testCleanClaudeAggregateInstall() {
  const project = path.join(tempRoot, "claude-aggregate");
  const target = path.join(project, ".claude");
  const skills = path.join(target, "skills");
  install("ui-design-intelligence", target, skills);
  verify(skills);

  expectExists(path.join(skills, "study-ui-storytelling", "SKILL.md"), "aggregate skill");
  expectExists(path.join(target, "agents", "ui-researcher.md"), "aggregate agent");
  expectExists(path.join(target, "commands", "study-page.md"), "aggregate command");
  expectExists(path.join(project, ".convention", "schemas", "wireframe-config.schema.json"), "aggregate convention file");
  expectMissing(path.join(target, ".convention"), "Claude nested convention directory");
  record("clean Claude .claude aggregate install");
}

function testIdenticalReinstallAndUninstall() {
  const target = path.join(tempRoot, "reinstall", ".claude");
  const skills = path.join(target, "skills");
  install("ui-blueprint-skills", target, skills);
  install("ui-blueprint-skills", target, skills);
  verify(skills);

  const unrelated = path.join(target, "commands", "user-owned.md");
  writeText(unrelated, "# User Owned\n");
  uninstall("ui-blueprint-skills", target, skills);

  expectMissing(path.join(skills, "design-terminology"), "uninstalled skill");
  expectMissing(path.join(target, "commands", "generate-blueprint-from-study.md"), "uninstalled command");
  expectExists(unrelated, "unrelated user file");
  expectMissing(path.join(target, ".ui-blueprint-bundles", "ui-blueprint-skills.json"), "install record");
  record("identical reinstall and uninstall record scope");
}

function testConflictBlockingAndForce() {
  const project = path.join(tempRoot, "conflicts");
  const target = path.join(project, ".claude");
  const skills = path.join(target, "skills");
  install("ui-blueprint-skills", target, skills);

  const skillFile = path.join(skills, "design-terminology", "SKILL.md");
  const agentFile = path.join(target, "agents", "blueprint-architect.md");
  const commandFile = path.join(target, "commands", "generate-blueprint-from-study.md");
  const sharedFile = path.join(project, ".convention", "schemas", "wireframe-config.schema.json");

  appendText(skillFile, "\nLOCAL SKILL EDIT\n");
  appendText(agentFile, "\nLOCAL AGENT EDIT\n");
  appendText(commandFile, "\nLOCAL COMMAND EDIT\n");
  appendText(sharedFile, "\nLOCAL CONVENTION EDIT\n");

  const output = run(
    ["node", "scripts/install-bundle.mjs", "install", "ui-blueprint-skills", target, skills],
    { expectFailure: true }
  );
  expectIncludes(output, "skill design-terminology", "conflict output");
  expectIncludes(output, "agent blueprint-architect", "conflict output");
  expectIncludes(output, "command generate-blueprint-from-study", "conflict output");
  expectIncludes(output, "convention .convention/schemas/wireframe-config.schema.json", "conflict output");

  install("ui-blueprint-skills", target, skills, ["--force"]);
  const rewritten = fs.readFileSync(skillFile, "utf8");
  if (rewritten.includes("LOCAL SKILL EDIT")) {
    throw new Error("forced install did not overwrite local skill edit");
  }
  record("conflict blocking and force overwrite");
}

function testCodexAggregateInstall() {
  const target = path.join(tempRoot, "codex-aggregate", ".agents");
  const skills = path.join(target, "skills");
  install("ui-design-intelligence", target, skills, ["--skills-only"]);
  verify(skills);

  expectExists(path.join(skills, "generate-design-system-seed", "SKILL.md"), "aggregate Codex skill");
  expectExists(path.join(target, "knowledge", "schemas", "pattern-record.schema.json"), "aggregate Codex knowledge asset");
  expectMissing(path.join(target, "agents"), "aggregate Codex agents directory");
  expectMissing(path.join(target, "commands"), "aggregate Codex commands directory");
  record("clean Codex .agents aggregate install");
}

try {
  testDryRunWritesNoFiles();
  testCleanCodexComponentInstall();
  testCleanCodexFullInstall();
  testCleanClaudeAggregateInstall();
  testIdenticalReinstallAndUninstall();
  testConflictBlockingAndForce();
  testCodexAggregateInstall();
} finally {
  fs.rmSync(tempRoot, { recursive: true, force: true });
}

console.log(`Install matrix validation passed for ${results.length} scenario(s).`);
