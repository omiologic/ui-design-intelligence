#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const errors = [];

function fail(message) {
  errors.push(message);
}

function readJson(file) {
  try {
    return JSON.parse(fs.readFileSync(file, "utf8"));
  } catch (error) {
    fail(`${file}: invalid JSON (${error.message})`);
    return null;
  }
}

function walk(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const item = path.join(dir, entry.name);
    return entry.isDirectory() ? walk(item) : [item];
  });
}

function childrenOf(node) {
  return Array.isArray(node?.children) ? node.children : [];
}

function descendantNodes(node, nodes = []) {
  if (!node || typeof node !== "object" || Array.isArray(node)) return nodes;
  nodes.push(node);
  for (const child of childrenOf(node)) descendantNodes(child, nodes);
  return nodes;
}

function directPageChildren(doc, type) {
  return childrenOf(doc.root).filter((child) => child?.type === type);
}

function hasText(value) {
  return typeof value === "string" && value.trim().length > 0;
}

function hasAccessibilityText(node, key) {
  return hasText(node?.accessibility?.[key]);
}

function checkPagePreflight(doc, file) {
  if (doc.root?.type !== "page") return;

  for (const type of ["header", "main", "footer"]) {
    if (directPageChildren(doc, type).length === 0) {
      fail(`${file}: structural-antipattern missing page-level "${type}" landmark region`);
    }
  }

  for (const viewport of ["desktop", "tablet", "mobile"]) {
    if (!hasText(doc.responsive?.[viewport])) {
      fail(`${file}: structural-antipattern missing responsive.${viewport} note`);
    }
  }
}

function checkPlaceholderLabels(doc, file) {
  const fillerLabels = new Set([
    "button",
    "card",
    "content",
    "heading",
    "image",
    "lorem ipsum",
    "placeholder",
    "section",
    "text",
    "todo"
  ]);

  for (const node of allNodes(doc)) {
    if (typeof node.label !== "string") continue;
    const normalized = node.label.trim().toLowerCase();
    if (fillerLabels.has(normalized)) {
      fail(`${file}: structural-antipattern filler label "${node.label}" on node "${node.id ?? "unknown"}"`);
    }
  }
}

function checkCtaPileup(doc, file) {
  for (const node of allNodes(doc)) {
    const primaryCtas = childrenOf(node).filter((child) => child?.role === "primaryCTA");
    if (primaryCtas.length > 1) {
      fail(`${file}: structural-antipattern CTA pile-up under node "${node.id ?? "unknown"}"`);
    }
  }
}

function checkOverlayContracts(doc, file) {
  for (const [index, overlay] of (doc.overlays ?? []).entries()) {
    const location = `overlays[${index}]`;
    if (!["dialog", "drawer", "popover"].includes(overlay?.type)) continue;

    if (!hasText(overlay.state)) {
      fail(`${file}: structural-antipattern ${location} missing state`);
    }
    if (!hasAccessibilityText(overlay, "ariaLabel")) {
      fail(`${file}: structural-antipattern ${location} missing accessibility.ariaLabel`);
    }
    if (!hasAccessibilityText(overlay, "focusManagement")) {
      fail(`${file}: structural-antipattern ${location} missing accessibility.focusManagement`);
    }
    if (!hasAccessibilityText(overlay, "keyboardBehavior")) {
      fail(`${file}: structural-antipattern ${location} missing accessibility.keyboardBehavior`);
    }
  }
}

function checkFormRecovery(doc, file) {
  for (const form of allNodes(doc).filter((node) => node.type === "form")) {
    const descendants = descendantNodes(form, []);
    const hasError = descendants.some((node) => node.state === "error" || node.role === "errorText");
    const hasSuccess = descendants.some((node) => node.state === "success");
    if (!hasError || !hasSuccess) {
      fail(`${file}: structural-antipattern form "${form.id ?? "unknown"}" missing error and success recovery states`);
    }
  }
}

function hasDescendant(node, predicate) {
  return descendantNodes(node, []).some(predicate);
}

function checkDecorativeSections(doc, file) {
  for (const section of allNodes(doc).filter((node) => node.type === "section")) {
    const hasStructuralJob = hasDescendant(section, (node) =>
      [
        "heading",
        "paragraph",
        "button",
        "buttonGroup",
        "card",
        "cardGrid",
        "list",
        "table",
        "comparisonTable",
        "accordion",
        "tabs",
        "form"
      ].includes(node.type) || hasText(node.role)
    );

    if (!hasStructuralJob) {
      fail(`${file}: structural-antipattern decorative section "${section.id ?? "unknown"}" has no content or task job`);
    }
  }
}

function checkDialogTaskContract(doc, file) {
  for (const [index, overlay] of (doc.overlays ?? []).entries()) {
    if (overlay?.type !== "dialog") continue;
    const hasTaskControl = hasDescendant(overlay, (node) =>
      ["form", "button", "buttonGroup"].includes(node.type) ||
      ["primaryCTA", "secondaryCTA"].includes(node.role)
    );

    if (!hasTaskControl) {
      fail(`${file}: structural-antipattern dialog overlays[${index}] has no task or dismissal control`);
    }
  }
}

function checkNavigationStack(doc, file) {
  for (const header of allNodes(doc).filter((node) => node.type === "header")) {
    const navigationCount = childrenOf(header).filter((child) => child?.type === "navigation").length;
    if (navigationCount > 1) {
      fail(`${file}: structural-antipattern navigation stack in header "${header.id ?? "unknown"}"`);
    }
  }
}

function allNodes(doc) {
  const nodes = [];
  descendantNodes(doc.root, nodes);
  for (const overlay of doc.overlays ?? []) descendantNodes(overlay, nodes);
  return nodes;
}

const explicitFiles = process.argv.slice(2);
const defaultFiles = walk(path.join(root, ".convention/examples"))
  .filter((file) => file.endsWith(".ui-blueprint.json") || file.endsWith("ui-blueprint.example.json"));
const files = explicitFiles.length
  ? explicitFiles.map((file) => path.resolve(root, file))
  : defaultFiles;

for (const file of files.sort()) {
  const doc = readJson(file);
  if (!doc || doc.type !== "wireframe") continue;
  checkPagePreflight(doc, file);
  checkPlaceholderLabels(doc, file);
  checkCtaPileup(doc, file);
  checkOverlayContracts(doc, file);
  checkFormRecovery(doc, file);
  checkDecorativeSections(doc, file);
  checkDialogTaskContract(doc, file);
  checkNavigationStack(doc, file);
}

if (errors.length) {
  console.error("Blueprint anti-pattern validation failed:");
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(`Blueprint anti-pattern validation passed for ${files.length} blueprint files.`);
