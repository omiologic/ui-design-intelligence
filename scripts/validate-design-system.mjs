#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { validateJsonSchema } from "./lib/json-schema-validator.mjs";

const root = process.cwd();
const errors = [];

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

function resolveBundleManifest(manifest) {
  if (!manifest || !Array.isArray(manifest.includes) || manifest.includes.length === 0) {
    return manifest;
  }

  const expanded = {
    ...manifest,
    skills: manifest.skills ?? [],
    agents: manifest.agents ?? [],
    commands: manifest.commands ?? [],
    shared: manifest.shared ?? []
  };

  for (const includedName of manifest.includes) {
    const included = readJson(path.join(root, "plugins/bundles", includedName, "plugin.json"));
    const resolved = resolveBundleManifest(included);
    expanded.skills.push(...(resolved?.skills ?? []));
    expanded.agents.push(...(resolved?.agents ?? []));
    expanded.commands.push(...(resolved?.commands ?? []));
    expanded.shared.push(...(resolved?.shared ?? []));
  }

  expanded.skills = uniqueSorted(expanded.skills);
  expanded.agents = uniqueSorted(expanded.agents);
  expanded.commands = uniqueSorted(expanded.commands);
  expanded.shared = uniqueSorted(expanded.shared);
  return expanded;
}

function walk(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const item = path.join(dir, entry.name);
    return entry.isDirectory() ? walk(item) : [item];
  });
}

function requireArray(doc, file, key) {
  const values = doc?.[key];
  if (!Array.isArray(values) || values.length === 0) {
    fail(`${path.relative(root, file)}: expected non-empty array property "${key}"`);
    return [];
  }
  return values;
}

function namedSet(file, key) {
  const doc = readJson(file);
  const names = new Set();
  for (const item of requireArray(doc, file, key)) {
    if (!item || typeof item !== "object" || typeof item.name !== "string" || item.name.length === 0) {
      fail(`${path.relative(root, file)}: ${key} entries must be records with name`);
      continue;
    }
    if (names.has(item.name)) fail(`${path.relative(root, file)}: duplicate name "${item.name}"`);
    names.add(item.name);
  }
  return names;
}

function validateAgainstSchema(doc, schema, file, label) {
  if (!doc || !schema) return;
  for (const error of validateJsonSchema(doc, schema)) {
    fail(`${path.relative(root, file)}: ${label} schema ${error}`);
  }
}

const seedSchema = readJson(path.join(root, "shared/schemas/design-system-seed.schema.json"));
const sectionSchemas = {
  brand: readJson(path.join(root, "shared/schemas/brand-foundation.schema.json")),
  palette: readJson(path.join(root, "shared/schemas/palette-foundation.schema.json")),
  typography: readJson(path.join(root, "shared/schemas/typography-foundation.schema.json")),
  iconography: readJson(path.join(root, "shared/schemas/iconography-foundation.schema.json")),
  buttons: readJson(path.join(root, "shared/schemas/button-foundation.schema.json")),
  cards: readJson(path.join(root, "shared/schemas/card-foundation.schema.json")),
  header: readJson(path.join(root, "shared/schemas/header-foundation.schema.json")),
  footer: readJson(path.join(root, "shared/schemas/footer-foundation.schema.json"))
};

const vocabularyDir = path.join(root, "shared/vocabulary");
const tokenTypes = namedSet(path.join(vocabularyDir, "design-token-types.json"), "designTokenTypes");
const componentVariants = namedSet(path.join(vocabularyDir, "component-variants.json"), "componentVariants");
const layoutRoles = namedSet(path.join(vocabularyDir, "layout-roles.json"), "layoutRoles");
const accessibilityRules = namedSet(path.join(vocabularyDir, "accessibility-rules.json"), "accessibilityRules");
const interactionStatesDoc = readJson(path.join(vocabularyDir, "interaction-states.json"));
const interactionStates = new Set(requireArray(interactionStatesDoc, path.join(vocabularyDir, "interaction-states.json"), "interactionStates"));
const sourceKindsDoc = readJson(path.join(vocabularyDir, "design-system-source-kinds.json"));
const sourceKinds = new Set(requireArray(sourceKindsDoc, path.join(vocabularyDir, "design-system-source-kinds.json"), "sourceKinds"));
const confidenceLevels = new Set(requireArray(sourceKindsDoc, path.join(vocabularyDir, "design-system-source-kinds.json"), "confidenceLevels"));
const anatomyDoc = readJson(path.join(vocabularyDir, "component-anatomy.json"));
const anatomyByComponent = new Map();
for (const item of requireArray(anatomyDoc, path.join(vocabularyDir, "component-anatomy.json"), "componentAnatomy")) {
  if (!item || typeof item !== "object" || typeof item.component !== "string") {
    fail("shared/vocabulary/component-anatomy.json: entries must include component");
    continue;
  }
  anatomyByComponent.set(item.component, {
    parts: new Set(Array.isArray(item.parts) ? item.parts : []),
    requiredParts: new Set(Array.isArray(item.requiredParts) ? item.requiredParts : [])
  });
}

function checkSourceConfidence(value, file, location) {
  if (Array.isArray(value)) {
    value.forEach((item, index) => checkSourceConfidence(item, file, `${location}[${index}]`));
    return;
  }
  if (!value || typeof value !== "object") return;

  if (typeof value.source === "string") {
    if (!sourceKinds.has(value.source)) {
      fail(`${path.relative(root, file)}: ${location}.source "${value.source}" is not approved`);
    }
    if (!confidenceLevels.has(value.confidence)) {
      fail(`${path.relative(root, file)}: ${location}.confidence "${value.confidence}" is not approved`);
    }
  }

  for (const [key, child] of Object.entries(value)) {
    checkSourceConfidence(child, file, `${location}.${key}`);
  }
}

function tokenCategory(tokenName) {
  return typeof tokenName === "string" ? tokenName.split(".")[0] : "";
}

function checkTokenName(tokenName, file, location) {
  if (!/^[a-z]+(?:\.[a-z][A-Za-z0-9]*){2,}$/.test(tokenName)) {
    fail(`${path.relative(root, file)}: ${location} token "${tokenName}" must follow semantic dot notation`);
    return;
  }
  const category = tokenCategory(tokenName);
  if (!tokenTypes.has(category)) {
    fail(`${path.relative(root, file)}: ${location} token "${tokenName}" uses unknown token category "${category}"`);
  }
}

function checkPalette(doc, file) {
  const colorTokens = Object.keys(doc.palette?.colors ?? {});
  if (colorTokens.length === 0) {
    fail(`${path.relative(root, file)}: palette.colors must define at least one token`);
  }
  for (const tokenName of colorTokens) {
    checkTokenName(tokenName, file, `palette.colors.${tokenName}`);
    const token = doc.palette.colors[tokenName];
    for (const field of ["intent", "usage", "source", "confidence"]) {
      if (!(field in token)) fail(`${path.relative(root, file)}: palette.colors.${tokenName}.${field} is required`);
    }
    if (!Array.isArray(token.accessibilityNotes) || token.accessibilityNotes.length === 0) {
      fail(`${path.relative(root, file)}: palette.colors.${tokenName}.accessibilityNotes must not be empty`);
    }
  }
}

function checkTokenReference(ref, paletteTokens, file, location) {
  if (typeof ref !== "string" || !ref.startsWith("color.")) return;
  if (!paletteTokens.has(ref)) {
    fail(`${path.relative(root, file)}: ${location} references missing palette token "${ref}"`);
  }
}

function checkVariants(variants, expectedComponent, file, location) {
  for (const [variantName, variant] of Object.entries(variants ?? {})) {
    if (!componentVariants.has(variantName)) {
      fail(`${path.relative(root, file)}: ${location}.${variantName} is not an approved component variant`);
    }
    if (!variantName.startsWith(`${expectedComponent}.`)) {
      fail(`${path.relative(root, file)}: ${location}.${variantName} must be a ${expectedComponent} variant`);
    }
    if (!variant || typeof variant !== "object") continue;
    for (const action of variant.allowedActions ?? []) {
      if (typeof action !== "string" || action.length === 0) {
        fail(`${path.relative(root, file)}: ${location}.${variantName}.allowedActions entries must be strings`);
      }
    }
  }
}

function checkAnatomy(component, anatomy, file, location) {
  const record = anatomyByComponent.get(component);
  if (!record) {
    fail(`${path.relative(root, file)}: no component anatomy vocabulary for "${component}"`);
    return;
  }
  for (const part of anatomy ?? []) {
    if (!record.parts.has(part)) {
      fail(`${path.relative(root, file)}: ${location} part "${part}" is not approved for ${component}`);
    }
  }
  for (const requiredPart of record.requiredParts) {
    if (!(anatomy ?? []).includes(requiredPart)) {
      fail(`${path.relative(root, file)}: ${location} should include required ${component} part "${requiredPart}"`);
    }
  }
}

function checkComponents(doc, file) {
  const paletteTokens = new Set(Object.keys(doc.palette?.colors ?? {}));
  const buttons = doc.components?.buttons;
  const cards = doc.components?.cards;
  const header = doc.components?.header;
  const footer = doc.components?.footer;

  checkVariants(buttons?.variants, "button", file, "components.buttons.variants");
  for (const state of buttons?.states ?? []) {
    if (!interactionStates.has(state)) {
      fail(`${path.relative(root, file)}: components.buttons.states "${state}" is not an approved interaction state`);
    }
  }
  for (const [variantName, variant] of Object.entries(buttons?.variants ?? {})) {
    checkTokenReference(variant.background, paletteTokens, file, `components.buttons.variants.${variantName}.background`);
    checkTokenReference(variant.text, paletteTokens, file, `components.buttons.variants.${variantName}.text`);
    checkTokenReference(variant.border, paletteTokens, file, `components.buttons.variants.${variantName}.border`);
  }

  checkVariants(cards?.variants, "card", file, "components.cards.variants");
  checkAnatomy("card", cards?.anatomy ?? [], file, "components.cards.anatomy");
  for (const [key, value] of Object.entries(cards?.base ?? {})) {
    checkTokenReference(value, paletteTokens, file, `components.cards.base.${key}`);
  }

  checkAnatomy("header", header?.anatomy ?? [], file, "components.header.anatomy");
  checkAnatomy("footer", footer?.anatomy ?? [], file, "components.footer.anatomy");
}

function checkSeed(doc, file) {
  validateAgainstSchema(doc, seedSchema, file, "design-system-seed");
  validateAgainstSchema(doc.brand, sectionSchemas.brand, file, "brand-foundation");
  validateAgainstSchema(doc.palette, sectionSchemas.palette, file, "palette-foundation");
  validateAgainstSchema(doc.typography, sectionSchemas.typography, file, "typography-foundation");
  validateAgainstSchema(doc.iconography, sectionSchemas.iconography, file, "iconography-foundation");
  validateAgainstSchema(doc.components?.buttons, sectionSchemas.buttons, file, "button-foundation");
  validateAgainstSchema(doc.components?.cards, sectionSchemas.cards, file, "card-foundation");
  validateAgainstSchema(doc.components?.header, sectionSchemas.header, file, "header-foundation");
  validateAgainstSchema(doc.components?.footer, sectionSchemas.footer, file, "footer-foundation");

  checkSourceConfidence(doc, file, "$");
  checkPalette(doc, file);
  checkComponents(doc, file);

  for (const section of ["brand", "palette", "typography", "iconography"]) {
    if (!doc[section]) fail(`${path.relative(root, file)}: missing required section "${section}"`);
  }
  for (const section of ["buttons", "cards", "header", "footer"]) {
    if (!doc.components?.[section]) fail(`${path.relative(root, file)}: missing required component section "${section}"`);
  }
}

function checkDecisionTree(doc, file) {
  if (!doc) return;
  if (doc.type !== "componentDecisionTree") {
    fail(`${path.relative(root, file)}: type must be componentDecisionTree`);
    return;
  }
  const treeComponents = new Set();
  for (const tree of doc.trees ?? []) {
    if (typeof tree.component !== "string") {
      fail(`${path.relative(root, file)}: tree.component is required`);
      continue;
    }
    treeComponents.add(tree.component);
    for (const decision of tree.decisions ?? []) {
      for (const field of ["yes", "no"]) {
        const target = decision[field];
        if (target === "continue") continue;
        if (!componentVariants.has(target)) {
          fail(`${path.relative(root, file)}: ${tree.component} decision ${field} target "${target}" is not an approved component variant`);
        } else if (!target.startsWith(`${tree.component}.`)) {
          fail(`${path.relative(root, file)}: ${tree.component} decision ${field} target "${target}" is for a different component`);
        }
      }
    }
  }
  for (const requiredComponent of ["button", "card"]) {
    if (!treeComponents.has(requiredComponent)) {
      fail(`${path.relative(root, file)}: decision tree must include "${requiredComponent}"`);
    }
  }
}

function checkBundlePackaging() {
  const designSystemManifest = readJson(path.join(root, "plugins/bundles/ui-design-system-skills/plugin.json"));
  const aggregateManifest = resolveBundleManifest(readJson(path.join(root, "plugins/bundles/ui-design-intelligence/plugin.json")));
  if (!designSystemManifest || !aggregateManifest) return;

  const requiredSkills = [
    "generate-design-system-seed",
    "extract-brand-foundation",
    "extract-palette-foundation",
    "extract-typography-foundation",
    "extract-iconography-foundation",
    "generate-button-foundation",
    "generate-card-foundation",
    "generate-header-foundation",
    "generate-footer-foundation",
    "audit-design-system-completeness",
    "audit-design-system-naming",
    "audit-design-system-consistency"
  ];
  const requiredCommands = ["generate-design-system-seed", "audit-design-system-seed"];
  const requiredAgents = ["design-system-architect"];
  const requiredShared = [
    "shared/schemas/design-system-seed.schema.json",
    "shared/templates/design-system-seed.json",
    "shared/templates/design-system-seed.md",
    "shared/examples/design-system-seed.example.json",
    "shared/vocabulary/design-token-types.json"
  ];

  function includesAll(manifest, field, values, label) {
    const actual = new Set(manifest[field] ?? []);
    for (const value of values) {
      if (!actual.has(value)) {
        fail(`plugins/bundles/${manifest.name}/plugin.json: missing ${label} "${value}"`);
      }
    }
  }

  includesAll(designSystemManifest, "skills", requiredSkills, "skill");
  includesAll(designSystemManifest, "commands", requiredCommands, "command");
  includesAll(designSystemManifest, "agents", requiredAgents, "agent");
  includesAll(designSystemManifest, "shared", requiredShared, "shared asset");

  includesAll(aggregateManifest, "skills", requiredSkills, "skill");
  includesAll(aggregateManifest, "commands", requiredCommands, "command");
  includesAll(aggregateManifest, "agents", requiredAgents, "agent");
  includesAll(aggregateManifest, "shared", requiredShared, "shared asset");
}

const seedFiles = [
  ...walk(path.join(root, "shared/examples")).filter((file) => file.endsWith("design-system-seed.example.json") || file.endsWith("design-system-seed.compact.json")),
  path.join(root, "shared/templates/design-system-seed.json")
].sort();

for (const file of seedFiles) {
  const doc = readJson(file);
  checkSeed(doc, file);
}

const decisionTreeFiles = walk(path.join(root, "shared/examples")).filter((file) => file.endsWith("component-decision-tree.example.json")).sort();
for (const file of decisionTreeFiles) {
  checkDecisionTree(readJson(file), file);
}

if (layoutRoles.size === 0 || accessibilityRules.size === 0) {
  fail("shared design-system vocabulary must include layout roles and accessibility rules");
}
checkBundlePackaging();

if (errors.length) {
  console.error("Design-system validation failed:");
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(`Design-system validation passed for ${seedFiles.length} seed file(s) and ${decisionTreeFiles.length} decision tree file(s).`);
