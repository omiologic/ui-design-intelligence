#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const errors = [];

function fail(message) {
  errors.push(message);
}

function read(file) {
  return fs.readFileSync(path.join(root, file), "utf8");
}

function requireFile(file) {
  if (!fs.existsSync(path.join(root, file))) {
    fail(`${file}: file does not exist`);
    return false;
  }
  return true;
}

function requireIncludes(file, fragments) {
  if (!requireFile(file)) return;
  const text = read(file);
  for (const fragment of fragments) {
    if (!text.includes(fragment)) fail(`${file}: missing "${fragment}"`);
  }
}

function fileContains(file, fragment) {
  if (!requireFile(file)) return false;
  return read(file).includes(fragment);
}

function requireAnyFileIncludes(files, fragment, label) {
  const matchingFiles = files.filter((file) => fs.existsSync(path.join(root, file)) && read(file).includes(fragment));
  if (matchingFiles.length === 0) {
    fail(`${label}: no file contains "${fragment}"`);
  }
}

function visualExperienceSpecErrors(file) {
  const localErrors = [];
  const absolutePath = path.join(root, file);
  if (!fs.existsSync(absolutePath)) return [`${file}: file does not exist`];

  const text = fs.readFileSync(absolutePath, "utf8");
  const requiredSections = [
    "# Visual Experience Spec",
    "## Evidence Files",
    "## Palette Timeline",
    "## Scroll Storyboard",
    "## Section State Map",
    "## Motion Fields",
    "## Captured Frame Index",
    "## Rendering Layer Ownership",
    "## Design Quality Notes",
    "## Implementation Notes",
    "## Originality Guardrails"
  ];

  for (const section of requiredSections) {
    if (!text.includes(section)) localErrors.push(`${file}: missing "${section}"`);
  }

  const requiredMarkers = [
    "| Range Or State | Observed Palette | Transition | Confidence | Evidence |",
    "| Frame | Scroll Progress | Section | Visual State | Motion Notes | Evidence |",
    "| Section | Default State | Active Or Pinned State | Exit State | Viewport Notes | Gaps |",
    "| Frame ID | Path | Type | Viewport | Scroll Progress | Interaction State | Status |",
    "Trigger:",
    "Rendering layer:",
    "Reduced-motion expectation:",
    "Performance risks:",
    ".screenshots/",
    ".motion_screenshots/",
    "capture-manifest.json"
  ];

  for (const marker of requiredMarkers) {
    if (!text.includes(marker)) localErrors.push(`${file}: missing required marker "${marker}"`);
  }

  return localErrors;
}

function requireValidVisualExperienceSpec(file) {
  for (const error of visualExperienceSpecErrors(file)) fail(error);
}

function requireInvalidVisualExperienceSpec(file, expectedFragment) {
  const localErrors = visualExperienceSpecErrors(file);
  if (localErrors.length === 0) {
    fail(`${file}: invalid fixture unexpectedly passed visual experience spec validation`);
    return;
  }
  if (expectedFragment && !localErrors.some((error) => error.includes(expectedFragment))) {
    fail(`${file}: invalid fixture did not fail for expected marker "${expectedFragment}"`);
  }
}

function readJson(file) {
  try {
    return JSON.parse(read(file));
  } catch (error) {
    fail(`${file}: invalid JSON (${error.message})`);
    return null;
  }
}

function requireSkill(skillName) {
  const skillFile = `plugins/individuals/${skillName}/SKILL.md`;
  requireIncludes(skillFile, ["## Purpose", "## References", "## Rules", "## Anti-Patterns", "## Workflow", "## Hand-Offs"]);
}

for (const skillName of ["study-ui-capture", "study-ui-motion"]) {
  requireSkill(skillName);
}

const studyBundle = readJson("plugins/bundles/ui-study-skills/plugin.json");
if (studyBundle) {
  for (const skillName of ["study-ui-capture", "study-ui-motion"]) {
    if (!studyBundle.skills?.includes(skillName)) {
      fail(`plugins/bundles/ui-study-skills/plugin.json: missing skill "${skillName}"`);
    }
  }

  for (const commandName of ["study-page", "study-site", "study-visual-experience"]) {
    if (!studyBundle.commands?.includes(commandName)) {
      fail(`plugins/bundles/ui-study-skills/plugin.json: missing command "${commandName}"`);
    }
  }

  if (!studyBundle.agents?.includes("visual-experience-analyst")) {
    fail('plugins/bundles/ui-study-skills/plugin.json: missing agent "visual-experience-analyst"');
  }

  for (const sharedPath of [
    "shared/workflows/study-capture-motion-routing.md",
    "shared/workflows/visual-experience-agent-routing.md",
    "shared/examples/visual-experience-e2e/README.md",
    "shared/examples/visual-experience-e2e/capture-manifest.json",
    "shared/examples/visual-experience-e2e/visual-experience-spec.md"
  ]) {
    if (!studyBundle.shared?.includes(sharedPath)) {
      fail(`plugins/bundles/ui-study-skills/plugin.json: missing shared file "${sharedPath}"`);
    }
  }
}

requireIncludes("commands/study-page.md", [
  "study-ui-capture",
  "study-ui-motion",
  "shared/workflows/study-capture-motion-routing.md",
  "capture-manifest.json",
  ".motion_screenshots",
  "visual-experience-spec.md"
]);

requireIncludes("commands/study-site.md", [
  "study-ui-capture",
  "study-ui-motion",
  "shared/workflows/study-capture-motion-routing.md",
  "capture-manifest.json",
  ".motion_screenshots",
  "visual-experience-spec.md"
]);

requireIncludes("commands/study-visual-experience.md", [
  "study-ui-capture",
  "study-ui-motion",
  "visual-experience-analyst",
  "shared/workflows/study-capture-motion-routing.md",
  "shared/workflows/visual-experience-agent-routing.md",
  "visual-experience-spec.md"
]);

const commandFiles = [
  "commands/study-page.md",
  "commands/study-site.md",
  "commands/study-visual-experience.md"
];
requireAnyFileIncludes(commandFiles, "study-ui-motion", "commands");
requireAnyFileIncludes(commandFiles, "visual-experience-spec.md", "commands");

requireIncludes("agents/visual-experience-analyst.md", [
  "study-ui-capture",
  "study-ui-motion",
  "capture-manifest.json",
  ".motion_screenshots",
  "visual-experience-spec.md"
]);

const agentFiles = [
  "agents/ui-researcher.md",
  "agents/ui-interaction-analyst.md",
  "agents/visual-experience-analyst.md"
];
requireAnyFileIncludes(agentFiles, "study-ui-capture", "agents");
requireAnyFileIncludes(agentFiles, "study-ui-motion", "agents");

requireIncludes("shared/workflows/study-capture-motion-routing.md", [
  "Codex Visibility",
  "study-ui-capture",
  "study-ui-motion",
  "visual-experience-spec.md",
  "Visual Experience Study Flow"
]);

requireIncludes("shared/workflows/visual-experience-agent-routing.md", [
  "study-ui-capture",
  "study-ui-motion",
  "visual-experience-spec.md",
  "runtime subagents"
]);

const codexVisibleFiles = [
  "plugins/individuals/study-ui-capture/SKILL.md",
  "plugins/individuals/study-ui-motion/SKILL.md",
  "shared/workflows/study-capture-motion-routing.md",
  "shared/workflows/visual-experience-agent-routing.md"
];
requireAnyFileIncludes(codexVisibleFiles, "study-ui-capture -> study-ui-motion", "Codex-visible routing");
requireAnyFileIncludes(codexVisibleFiles, "study visual experience", "Codex-visible routing");

requireIncludes("shared/templates/ui-design-intelligence.config.yml", [
  "artifacts:",
  "rootDir:",
  "projectSlug:",
  "pageSlugStrategy:",
  ".screenshots",
  ".motion_screenshots",
  "readySelectors:",
  "loaderSelectors:",
  "maxWaitMs:",
  "idleWaitMs:",
  "retryCount:",
  "rejectBlankFrames:",
  "failedCaptureDir:",
  "visualExperience:"
]);

requireIncludes("plugins/individuals/study-ui-capture/references/capture-execution-contract.md", [
  "# Capture Execution Contract",
  "## Tool Selection",
  "## Viewport Iteration",
  "## Readiness Algorithm",
  "## Retry Behavior",
  "## Blank-Frame Rejection",
  "## Still Screenshot Naming",
  "## Motion Frame Naming",
  "## Manifest Update Semantics",
  "## Failure Reason Vocabulary"
]);

requireIncludes("shared/templates/visual-experience-spec.md", [
  "# Visual Experience Spec",
  "## Evidence Files",
  "## Palette Timeline",
  "## Scroll Storyboard",
  "## Section State Map",
  "## Motion Fields",
  "## Captured Frame Index",
  "## Rendering Layer Ownership",
  "## Design Quality Notes",
  "## Implementation Notes",
  "## Originality Guardrails"
]);

requireValidVisualExperienceSpec("shared/examples/visual-experience-e2e/visual-experience-spec.md");
requireInvalidVisualExperienceSpec(
  "shared/examples/visual-experience-invalid/missing-captured-frame-index.md",
  "## Captured Frame Index"
);
requireInvalidVisualExperienceSpec(
  "shared/examples/visual-experience-invalid/missing-rendering-layer-ownership.md",
  "## Rendering Layer Ownership"
);
requireInvalidVisualExperienceSpec(
  "shared/examples/visual-experience-invalid/missing-originality-guardrails.md",
  "## Originality Guardrails"
);

const visualExampleManifest = readJson("shared/examples/visual-experience-e2e/capture-manifest.json");
if (visualExampleManifest) {
  if (!visualExampleManifest.config?.motionScreenshotDir?.includes(".motion_screenshots")) {
    fail("shared/examples/visual-experience-e2e/capture-manifest.json: motionScreenshotDir must reference .motion_screenshots");
  }
  if (!visualExampleManifest.captures?.some((capture) => capture.type === "motion-frame")) {
    fail("shared/examples/visual-experience-e2e/capture-manifest.json: expected at least one motion-frame capture");
  }
  if (!visualExampleManifest.failedCaptures?.some((capture) => capture.failureReason === "motion-state-unavailable")) {
    fail('shared/examples/visual-experience-e2e/capture-manifest.json: expected failed capture with "motion-state-unavailable"');
  }
}

const manifest = readJson("shared/templates/capture-manifest.example.json");
if (manifest) {
  for (const field of ["schemaVersion", "projectBrand", "page", "source", "config", "captures", "failedCaptures", "sourceGaps", "handoffs"]) {
    if (!Object.hasOwn(manifest, field)) fail(`shared/templates/capture-manifest.example.json: missing top-level field "${field}"`);
  }

  for (const field of ["screenshotDir", "motionScreenshotDir", "failedCaptureDir", "readySelectors", "loaderSelectors", "maxWaitMs", "idleWaitMs", "retryCount", "rejectBlankFrames"]) {
    if (!Object.hasOwn(manifest.config ?? {}, field)) fail(`shared/templates/capture-manifest.example.json: config missing "${field}"`);
  }

  for (const reason of ["blank-frame-rejected", "loader-still-visible", "capture-tool-unavailable", "motion-state-unavailable"]) {
    if (!manifest.config?.failureReasons?.includes(reason)) {
      fail(`shared/templates/capture-manifest.example.json: failureReasons missing "${reason}"`);
    }
  }

  const allCaptures = [...(manifest.captures ?? []), ...(manifest.failedCaptures ?? [])];
  for (const [index, capture] of allCaptures.entries()) {
    for (const field of ["id", "type", "status", "viewport", "readyState", "capturedAt"]) {
      if (!Object.hasOwn(capture, field)) fail(`shared/templates/capture-manifest.example.json: capture ${index} missing "${field}"`);
    }
  }
}

const artifactsDir = path.join(root, "artifacts");
if (fs.existsSync(artifactsDir)) {
  for (const entry of fs.readdirSync(artifactsDir, { withFileTypes: true })) {
    if (!entry.isFile()) continue;
    if (/\.(md|json|ya?ml)$/i.test(entry.name)) {
      fail(`artifacts/${entry.name}: flat study output is not allowed; use artifacts/{project_brand}/{page}/`);
    }
  }
}

requireIncludes("docs/visual-experience-bridge.md", [
  "study-ui-capture -> study-ui-motion -> VisualExperienceSpec",
  "artifacts/{project_brand}/{page}/",
  ".motion_screenshots"
]);

if (errors.length) {
  console.error("Visual experience bridge validation failed:");
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log("Visual experience bridge validation passed.");
