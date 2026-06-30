#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";

const args = process.argv.slice(2);
const root = process.cwd();

function usage() {
  return `Usage: node scripts/export-blueprint-seed.mjs --blueprint <file> [options]

Exports a repository-native Blueprint Export Seed markdown artifact from a
schema-valid UIBlueprint and an optional structural taste profile.

Options:
  --blueprint <file>      Source UIBlueprint JSON. Required.
  --profile <file>        Structural taste profile JSON. Defaults from blueprint metadata when available.
  --out <file>            Write markdown to a file instead of stdout.
  --expect <file>         Compare generated markdown to an expected file.
  --check                 Validate generation and required sections without writing output.
  --help                  Show this help text.
`;
}

function fail(message) {
  console.error(`export-blueprint-seed: ${message}`);
  console.error("");
  console.error(usage());
  process.exit(1);
}

function readOption(name) {
  const index = args.indexOf(name);
  if (index === -1) return null;
  const value = args[index + 1];
  if (!value || value.startsWith("--")) fail(`${name} requires a value`);
  return value;
}

function readJson(file) {
  try {
    return JSON.parse(fs.readFileSync(file, "utf8"));
  } catch (error) {
    fail(`${file}: invalid JSON (${error.message})`);
  }
}

function relative(file) {
  return path.relative(root, path.resolve(root, file));
}

function sentence(value) {
  if (!value) return "missing evidence";
  return String(value).replace(/\s+/g, " ").trim();
}

function list(items) {
  return items.length ? items.map((item) => `- ${item}`).join("\n") : "- missing evidence";
}

function ordered(items) {
  return items.length ? items.map((item, index) => `${index + 1}. ${item}`).join("\n") : "1. missing evidence";
}

function walk(node, visitor, ancestors = []) {
  if (!node || typeof node !== "object") return;
  visitor(node, ancestors);
  for (const child of node.children ?? []) walk(child, visitor, [...ancestors, node]);
}

function nodeRef(node) {
  return `\`${node.id}\``;
}

function nodeSummary(node) {
  return `${nodeRef(node)}: ${node.label || node.type}`;
}

function loadProfile(blueprint, explicitProfile) {
  const profilePath =
    explicitProfile ??
    (blueprint.metadata?.tasteProfile
      ? path.join("shared", "taste-profiles", `${blueprint.metadata.tasteProfile}.json`)
      : null);

  if (!profilePath) return { path: null, profile: null };
  if (!fs.existsSync(path.resolve(root, profilePath))) fail(`profile file does not exist: ${profilePath}`);
  return { path: profilePath, profile: readJson(path.resolve(root, profilePath)) };
}

function majorSections(rootNode) {
  const sections = [];
  for (const child of rootNode.children ?? []) {
    if (child.type === "main") {
      for (const mainChild of child.children ?? []) sections.push(mainChild);
    } else {
      sections.push(child);
    }
  }
  return sections;
}

function collectNodes(blueprint) {
  const all = [];
  if (blueprint.root) walk(blueprint.root, (node, ancestors) => all.push({ node, ancestors }));
  for (const overlay of blueprint.overlays ?? []) walk(overlay, (node, ancestors) => all.push({ node, ancestors, overlay: true }));
  return all;
}

function firstNodeByRole(nodes, role) {
  return nodes.find(({ node }) => node.role === role)?.node ?? null;
}

function componentInventory(nodes) {
  const componentTypes = new Set([
    "navigation",
    "buttonGroup",
    "card",
    "cardGrid",
    "form",
    "accordion",
    "tabs",
    "table",
    "comparisonTable",
    "dialog",
    "drawer",
    "popover",
    "stickyBar"
  ]);

  const items = [];
  const seen = new Set();
  for (const { node } of nodes) {
    if (!componentTypes.has(node.type) || seen.has(node.id)) continue;
    seen.add(node.id);
    items.push(`${nodeSummary(node)} (${node.type})`);
  }
  return items;
}

function accessibilityContracts(nodes) {
  const items = [];
  for (const { node } of nodes) {
    if (!node.accessibility) continue;
    const parts = Object.entries(node.accessibility).map(([key, value]) => `${key}: ${sentence(value)}`);
    items.push(`${nodeRef(node)} ${parts.join("; ")}.`);
  }
  return items;
}

function overlayContracts(overlays = []) {
  return overlays.map((overlay) => {
    const state = overlay.state ? `, state \`${overlay.state}\`` : "";
    return `${nodeSummary(overlay)} (${overlay.type}${state})`;
  });
}

function stateRequirements(nodes) {
  const items = [];
  for (const { node } of nodes) {
    if (node.state) items.push(`${nodeRef(node)} uses \`${node.state}\` state.`);
  }
  return items;
}

function profileBias(profile) {
  if (!profile) {
    return {
      sectionOrder: "none selected",
      density: "none selected",
      ctaCadence: "none selected",
      overlay: "none selected",
      responsive: "none selected"
    };
  }

  const sectionOrder = (profile.rules?.sectionOrder ?? [])
    .map((item) => item.job)
    .filter(Boolean)
    .join(", ");

  return {
    sectionOrder: sectionOrder || "missing evidence",
    density: profile.rules?.density?.reason
      ? `${profile.rules.density.default ?? "unspecified"} by default; ${profile.rules.density.reason}`
      : "missing evidence",
    ctaCadence: profile.rules?.ctaCadence?.reason ?? "missing evidence",
    overlay: profile.rules?.overlayUse?.reason ?? "missing evidence",
    responsive: (profile.rules?.responsivePriority ?? []).join(", ") || "missing evidence"
  };
}

function exportSeed({ blueprint, blueprintPath, profile, profilePath }) {
  const nodes = collectNodes(blueprint);
  const rootNode = blueprint.root ?? {};
  const sections = majorSections(rootNode);
  const primaryCta = firstNodeByRole(nodes, "primaryCTA");
  const register = blueprint.metadata?.register ?? "unknown";
  const tasteProfile = profile?.name ?? blueprint.metadata?.tasteProfile ?? "none selected";
  const bias = profileBias(profile);
  const inventory = componentInventory(nodes);
  const access = accessibilityContracts(nodes);
  const overlays = overlayContracts(blueprint.overlays ?? []);
  const states = stateRequirements(nodes);
  const description = sentence(blueprint.description);
  const pageName = `${rootNode.label ?? blueprint.label ?? blueprint.id} ${register === "unknown" ? "experience" : `${register} experience`}`;
  const sourceLine = profilePath
    ? `${relative(blueprintPath)} with ${relative(profilePath)}`
    : relative(blueprintPath);

  return `# Blueprint Export Seed

## Source

- Blueprint ID: \`${blueprint.id}\`
- Blueprint version: \`${blueprint.version}\`
- Source file or capture: \`${sourceLine}\`
- Scope: ${rootNode.type ?? "unknown"}, rooted at \`${rootNode.id ?? "missing"}\`
- Register: \`${register}\`
- Taste profile: \`${tasteProfile}\`

## Product Context

- Product, service, or page: ${pageName}
- Audience: missing evidence
- Primary user goal: ${description}
- Success action: ${primaryCta ? nodeRef(primaryCta) : "missing evidence"}
- Evidence status: generated from committed UIBlueprint structure${profile ? ` and the \`${profile.name}\` structural taste profile` : ""}; audience, brand voice, and visual style remain missing evidence.

## Structural Intent

The blueprint describes ${rootNode.type === "page" ? "a page" : `a ${rootNode.type ?? "structure"}`} with this ordered structure:

${ordered(sections.map(nodeSummary))}

Reusable structures and stateful areas:

${list(inventory)}

Overlays:

${list(overlays)}

## Taste Profile Bias

The \`${tasteProfile}\` profile contributes structural bias only:

- section-order bias: ${bias.sectionOrder}
- density bias: ${bias.density}
- CTA cadence: ${bias.ctaCadence}
- overlay guidance: ${bias.overlay}
- responsive priority: ${bias.responsive}

Do not treat this section as visual style guidance.

## Structural Constraints

Downstream tools should preserve:

- primary journey: preserve the source node order and keep \`${primaryCta?.id ?? "missing-primary-cta"}\` as the success action.
- navigation model: preserve visible navigation nodes and their accessibility labels.
- CTA model: keep one primary CTA unless new product evidence justifies another.
- required sections or components: preserve ${sections.map((node) => nodeRef(node)).join(", ") || "missing evidence"}.
- content or proof placement: preserve proof, feature, and action groups near their source sections.
- non-obvious annotations: preserve overlays, responsive notes, accessibility notes, and state nodes.

## Accessibility And Interaction Contracts

${list([...access, ...states])}

Open questions:

- Confirm DOM order, ARIA wiring, keyboard behavior, and screen reader behavior downstream.
- Confirm exact overlay trigger nodes when the blueprint does not identify them.

## Responsive Priorities

- desktop: ${sentence(blueprint.responsive?.desktop)}
- tablet: ${sentence(blueprint.responsive?.tablet)}
- mobile: ${sentence(blueprint.responsive?.mobile)}
- priority order: ${bias.responsive}

## Downstream Ownership

This repository owns the structural page order, node hierarchy, overlay
contracts, responsive priorities, and accessibility constraints above.

Downstream tools own final visual direction: color, typography, spacing, imagery,
icons, motion, component polish, and production code.

## Evidence Boundaries

Do not infer without additional evidence:

- actual brand personality or tone of voice.
- visual style, palette, type scale, imagery, or motion.
- target audience beyond provided or observed evidence.
- proof claim content, metrics, testimonials, or regulated claims.
- hidden interactions not represented in the blueprint.
- implementation framework or component library.
- DOM order, ARIA implementation, or screen reader behavior.

## Adapter Notes

- For product-context tools: use the page scope, primary goal, success action,
  register, and evidence boundaries.
- For design-direction tools: use the structural constraints, taste-profile bias,
  responsive priorities, and accessibility contracts without treating them as
  visual style.
- For design-engineering tools: use the component inventory, overlay contracts,
  state requirements, landmarks, and open implementation questions.
`;
}

function validateSeed(markdown) {
  const required = [
    "# Blueprint Export Seed",
    "## Source",
    "## Product Context",
    "## Structural Intent",
    "## Taste Profile Bias",
    "## Structural Constraints",
    "## Accessibility And Interaction Contracts",
    "## Responsive Priorities",
    "## Downstream Ownership",
    "## Evidence Boundaries",
    "## Adapter Notes"
  ];

  return required.filter((section) => !markdown.includes(section));
}

if (args.includes("--help")) {
  console.log(usage());
  process.exit(0);
}

const allowed = new Set(["--blueprint", "--profile", "--out", "--expect", "--check", "--help"]);
for (let index = 0; index < args.length; index += 1) {
  const item = args[index];
  if (!item.startsWith("--")) continue;
  if (!allowed.has(item)) fail(`unknown option ${item}`);
  if (!["--check", "--help"].includes(item)) index += 1;
}

const blueprintPath = readOption("--blueprint");
if (!blueprintPath) fail("--blueprint is required");
if (!fs.existsSync(path.resolve(root, blueprintPath))) fail(`blueprint file does not exist: ${blueprintPath}`);

const blueprint = readJson(path.resolve(root, blueprintPath));
const { path: profilePath, profile } = loadProfile(blueprint, readOption("--profile"));
const markdown = exportSeed({ blueprint, blueprintPath, profile, profilePath });
const missingSections = validateSeed(markdown);
if (missingSections.length) fail(`generated seed is missing required sections: ${missingSections.join(", ")}`);

const expectedFile = readOption("--expect");
if (expectedFile) {
  const expectedPath = path.resolve(root, expectedFile);
  if (!fs.existsSync(expectedPath)) fail(`expected file does not exist: ${expectedFile}`);
  const expected = fs.readFileSync(expectedPath, "utf8");
  if (markdown !== expected) {
    fail(`generated seed does not match expected file: ${expectedFile}`);
  }
}

if (args.includes("--check")) process.exit(0);

const outFile = readOption("--out");
if (outFile) {
  fs.mkdirSync(path.dirname(path.resolve(root, outFile)), { recursive: true });
  fs.writeFileSync(path.resolve(root, outFile), markdown);
} else {
  process.stdout.write(markdown);
}
