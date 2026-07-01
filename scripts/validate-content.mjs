#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { validateJsonSchema } from "./lib/json-schema-validator.mjs";

const root = process.cwd();
const explicitFiles = process.argv.slice(2).filter((arg) => !arg.startsWith("--"));
const errors = [];

const sharedSchemaByType = {
  userJourneyMap: "shared/schemas/user-journey-map.schema.json",
  contentModel: "shared/schemas/content-model.schema.json",
  prototypeContent: "shared/schemas/prototype-content.schema.json",
  brandVoice: "shared/schemas/brand-voice.schema.json",
  toneOfVoiceReference: "shared/schemas/tone-of-voice-reference.schema.json"
};

const knowledgeSchemaByType = {
  copyPattern: "knowledge/schemas/copy-pattern.schema.json",
  journeyPattern: "knowledge/schemas/journey-pattern.schema.json",
  objectionPattern: "knowledge/schemas/objection-pattern.schema.json",
  voiceProfile: "knowledge/schemas/voice-profile.schema.json"
};

const contentExampleSuffixes = [
  ".user-journey-map.example.json",
  ".content-model.example.json",
  ".prototype-content.example.json",
  ".brand-voice.example.json"
];

const knowledgeExampleSuffixes = [
  ".copy-pattern.json",
  ".journey-pattern.json",
  ".objection-pattern.json",
  ".voice-profile.json"
];

const sourceKinds = new Set(["userProvided", "generated", "derivedFromStudy", "derivedFromKnowledge", "clientApproved"]);
const confidenceLevels = new Set(["low", "medium", "high", "approved"]);
const statuses = new Set(["draft", "reviewed", "clientApproved", "productionReady", "deprecated"]);
const riskLevels = new Set([
  "medicalClaims",
  "pricingAccuracy",
  "productSpecs",
  "legalCompliance",
  "financialClaims",
  "brandApproval",
  "clientApproval",
  "accessibilityLanguage",
  "translationReview"
]);
const reviewSensitiveConfidence = new Set(["low", "medium"]);
const reviewSensitiveTerms = /\b(battery|brightness|fit|price|pricing|checkout|support|policy|shipping|stock|legal|financial|medical|claim|approved|guarantee|guaranteed)\b/i;

function fail(message) {
  errors.push(message);
}

function rel(file) {
  return path.relative(root, file);
}

function readJson(file) {
  try {
    return JSON.parse(fs.readFileSync(file, "utf8"));
  } catch (error) {
    fail(`${rel(file)}: invalid JSON (${error.message})`);
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

function isContentExample(file) {
  const normalized = rel(file).split(path.sep).join("/");
  return normalized.startsWith("shared/examples/") && contentExampleSuffixes.some((suffix) => normalized.endsWith(suffix));
}

function isKnowledgeContentExample(file) {
  const normalized = rel(file).split(path.sep).join("/");
  return normalized.startsWith("knowledge/examples/") && knowledgeExampleSuffixes.some((suffix) => normalized.endsWith(suffix));
}

function isToneReference(file) {
  const normalized = rel(file).split(path.sep).join("/");
  return normalized === "shared/content/tone-of-voice/tone-of-voice-reference.json";
}

function collectFiles() {
  if (explicitFiles.length > 0) {
    return explicitFiles.map((file) => path.resolve(root, file)).sort();
  }

  return [
    ...walk(path.join(root, "shared/examples")).filter(isContentExample),
    ...walk(path.join(root, "knowledge/examples")).filter(isKnowledgeContentExample),
    ...walk(path.join(root, "shared/content/tone-of-voice")).filter(isToneReference)
  ].sort();
}

function validateAgainstSchema(doc, schemaRef, file, label) {
  const schemaFile = path.join(root, schemaRef);
  const schema = readJson(schemaFile);
  if (!doc || !schema) return;
  for (const error of validateJsonSchema(doc, schema)) {
    fail(`${rel(file)}: ${label} schema ${error}`);
  }
}

function resolveRepoPath(ref, file, location) {
  if (typeof ref !== "string" || ref.length === 0) return null;
  if (ref.startsWith("package://")) return null;
  if (/^[a-z]+:\/\//i.test(ref)) {
    fail(`${rel(file)}: ${location} must use repository-local references, not URLs`);
    return null;
  }
  const resolved = path.resolve(root, ref);
  const relative = path.relative(root, resolved);
  if (relative.startsWith("..") || path.isAbsolute(relative)) {
    fail(`${rel(file)}: ${location} points outside the repository (${ref})`);
    return null;
  }
  if (!fs.existsSync(resolved)) {
    fail(`${rel(file)}: ${location} references missing file (${ref})`);
    return null;
  }
  return resolved;
}

function readReferencedJson(ref, file, location) {
  const resolved = resolveRepoPath(ref, file, location);
  return resolved ? { file: resolved, doc: readJson(resolved) } : null;
}

function collectBlueprintNodeIds(blueprint) {
  const ids = new Set();

  function visit(node) {
    if (!node || typeof node !== "object") return;
    if (typeof node.id === "string") ids.add(node.id);
    for (const child of node.children ?? []) visit(child);
  }

  visit(blueprint?.root);
  for (const overlay of blueprint?.overlays ?? []) visit(overlay);
  return ids;
}

function collectPrototypeIds(prototypeConfig) {
  return {
    screenIds: new Set((prototypeConfig?.screens ?? []).map((screen) => screen.id)),
    routeIds: new Set((prototypeConfig?.routes ?? []).map((route) => route.id)),
    formIds: new Set((prototypeConfig?.forms ?? []).map((form) => form.id)),
    fieldIds: new Set((prototypeConfig?.forms ?? []).flatMap((form) => (form.fields ?? []).map((field) => field.id)))
  };
}

function hasReviewRisks(review) {
  return Array.isArray(review?.needsReview) && review.needsReview.length > 0;
}

function isCopyField(value) {
  return Boolean(
    value &&
      typeof value === "object" &&
      !Array.isArray(value) &&
      typeof value.value === "string" &&
      ("source" in value || "confidence" in value || "status" in value)
  );
}

function validateReview(review, file, location) {
  if (!review || typeof review !== "object") {
    fail(`${rel(file)}: ${location} review is required`);
    return;
  }
  if (!statuses.has(review.status)) fail(`${rel(file)}: ${location}.review.status "${review.status}" is not approved`);
  if (!Array.isArray(review.needsReview)) {
    fail(`${rel(file)}: ${location}.review.needsReview must be an array`);
    return;
  }
  for (const risk of review.needsReview) {
    if (!riskLevels.has(risk)) fail(`${rel(file)}: ${location}.review.needsReview "${risk}" is not approved`);
  }
}

function validateCopyField(field, file, location, inheritedReview) {
  if (typeof field.value !== "string" || field.value.length === 0) {
    fail(`${rel(file)}: ${location}.value is required`);
  }
  if (!sourceKinds.has(field.source)) fail(`${rel(file)}: ${location}.source "${field.source}" is not approved`);
  if (!confidenceLevels.has(field.confidence)) fail(`${rel(file)}: ${location}.confidence "${field.confidence}" is not approved`);
  if (!statuses.has(field.status)) fail(`${rel(file)}: ${location}.status "${field.status}" is not approved`);

  if (field.needsReview !== undefined) {
    if (!Array.isArray(field.needsReview)) {
      fail(`${rel(file)}: ${location}.needsReview must be an array`);
    } else {
      for (const risk of field.needsReview) {
        if (!riskLevels.has(risk)) fail(`${rel(file)}: ${location}.needsReview "${risk}" is not approved`);
      }
    }
  }

  const ownRisks = Array.isArray(field.needsReview) && field.needsReview.length > 0;
  const inheritedRisks = hasReviewRisks(inheritedReview);
  const sensitive = field.source === "generated" && (reviewSensitiveConfidence.has(field.confidence) || reviewSensitiveTerms.test(field.value));
  if (sensitive && !ownRisks && !inheritedRisks) {
    fail(`${rel(file)}: ${location} generated review-sensitive copy must declare needsReview or inherit review.needsReview`);
  }
}

function validateCopyValue(value, file, location, inheritedReview) {
  if (Array.isArray(value)) {
    value.forEach((item, index) => validateCopyValue(item, file, `${location}[${index}]`, inheritedReview));
    return;
  }
  if (!isCopyField(value)) {
    fail(`${rel(file)}: ${location} must be a copy field with value, source, confidence, and status`);
    return;
  }
  validateCopyField(value, file, location, inheritedReview);
}

function validateCopyMap(copy, file, location, inheritedReview) {
  if (!copy || typeof copy !== "object" || Array.isArray(copy)) {
    fail(`${rel(file)}: ${location} must be an object`);
    return;
  }
  for (const [key, value] of Object.entries(copy)) {
    validateCopyValue(value, file, `${location}.${key}`, inheritedReview);
  }
}

function validateArtifactSource(source, file, location) {
  if (!source || typeof source !== "object") {
    fail(`${rel(file)}: ${location} source is required`);
    return;
  }
  if (!sourceKinds.has(source.source)) fail(`${rel(file)}: ${location}.source "${source.source}" is not approved`);
  if (!confidenceLevels.has(source.confidence)) fail(`${rel(file)}: ${location}.confidence "${source.confidence}" is not approved`);
  if (!Array.isArray(source.sourceRefs) || source.sourceRefs.length === 0) {
    fail(`${rel(file)}: ${location}.sourceRefs must contain at least one reference`);
    return;
  }
  for (const [index, ref] of source.sourceRefs.entries()) {
    resolveRepoPath(ref, file, `${location}.sourceRefs[${index}]`);
  }
}

function validateUserJourneyMap(doc, file) {
  validateArtifactSource(doc.source, file, "$.source");
  validateReview(doc.review, file, "$");
  const stageIds = new Set();
  for (const [index, stage] of (doc.stages ?? []).entries()) {
    if (stageIds.has(stage.id)) fail(`${rel(file)}: $.stages[${index}].id duplicates "${stage.id}"`);
    stageIds.add(stage.id);
  }
}

function validateContentModel(doc, file) {
  validateArtifactSource(doc.source, file, "$.source");
  validateReview(doc.review, file, "$");
  validateCopyMap(doc.globalContent ?? {}, file, "$.globalContent", doc.review);

  const blueprintRef = readReferencedJson(doc.sourceBlueprintRef, file, "$.sourceBlueprintRef");
  const blueprintNodeIds = collectBlueprintNodeIds(blueprintRef?.doc);
  if (blueprintRef?.doc?.id && blueprintRef.doc.id !== doc.sourceBlueprintId) {
    fail(`${rel(file)}: $.sourceBlueprintId "${doc.sourceBlueprintId}" does not match ${rel(blueprintRef.file)} id "${blueprintRef.doc.id}"`);
  }

  let journeyStageIds = new Set(doc.journey?.stages ?? []);
  if (doc.journeyMapRef) {
    const journeyRef = readReferencedJson(doc.journeyMapRef, file, "$.journeyMapRef");
    if (journeyRef?.doc) {
      journeyStageIds = new Set((journeyRef.doc.stages ?? []).map((stage) => stage.id));
    }
  }

  for (const [index, section] of (doc.sections ?? []).entries()) {
    const location = `$.sections[${index}]`;
    validateReview(section.review, file, location);
    validateCopyMap(section.copy, file, `${location}.copy`, section.review);
    if (!blueprintNodeIds.has(section.nodeId)) {
      fail(`${rel(file)}: ${location}.nodeId "${section.nodeId}" does not exist in ${doc.sourceBlueprintRef}`);
    }
    if (!journeyStageIds.has(section.journeyStage)) {
      fail(`${rel(file)}: ${location}.journeyStage "${section.journeyStage}" is not declared by the linked journey`);
    }
  }
}

function validateNodeContent(entry, file, location, blueprintNodeIds) {
  validateReview(entry.review, file, location);
  validateCopyMap(entry.copy, file, `${location}.copy`, entry.review);
  if (!blueprintNodeIds.has(entry.nodeId)) {
    fail(`${rel(file)}: ${location}.nodeId "${entry.nodeId}" does not exist in the linked blueprint`);
  }
}

function validatePrototypeContent(doc, file) {
  validateArtifactSource(doc.source, file, "$.source");
  validateReview(doc.review, file, "$");

  const contentModelRef = readReferencedJson(doc.sourceContentModelRef, file, "$.sourceContentModelRef");
  const contentModel = contentModelRef?.doc;
  if (contentModel?.id && contentModel.id !== doc.sourceContentModelId) {
    fail(`${rel(file)}: $.sourceContentModelId "${doc.sourceContentModelId}" does not match ${rel(contentModelRef.file)} id "${contentModel.id}"`);
  }
  const blueprintRef = contentModel ? readReferencedJson(contentModel.sourceBlueprintRef, contentModelRef.file, "$.sourceBlueprintRef") : null;
  const blueprintNodeIds = collectBlueprintNodeIds(blueprintRef?.doc);

  const prototypeRef = readReferencedJson(doc.sourcePrototypeConfigRef, file, "$.sourcePrototypeConfigRef");
  const prototypeIds = collectPrototypeIds(prototypeRef?.doc);
  if (prototypeRef?.doc?.id && prototypeRef.doc.id !== doc.sourcePrototypeConfigId) {
    fail(`${rel(file)}: $.sourcePrototypeConfigId "${doc.sourcePrototypeConfigId}" does not match ${rel(prototypeRef.file)} id "${prototypeRef.doc.id}"`);
  }

  for (const [screenIndex, screen] of (doc.screens ?? []).entries()) {
    const screenLocation = `$.screens[${screenIndex}]`;
    if (!prototypeIds.screenIds.has(screen.screenId)) {
      fail(`${rel(file)}: ${screenLocation}.screenId "${screen.screenId}" is not declared by ${doc.sourcePrototypeConfigRef}`);
    }
    if (screen.routeId && !prototypeIds.routeIds.has(screen.routeId)) {
      fail(`${rel(file)}: ${screenLocation}.routeId "${screen.routeId}" is not declared by ${doc.sourcePrototypeConfigRef}`);
    }
    for (const [contentIndex, content] of (screen.content ?? []).entries()) {
      validateNodeContent(content, file, `${screenLocation}.content[${contentIndex}]`, blueprintNodeIds);
    }
  }

  for (const [index, dialog] of (doc.dialogs ?? []).entries()) {
    validateNodeContent(dialog, file, `$.dialogs[${index}]`, blueprintNodeIds);
  }

  for (const [index, form] of (doc.forms ?? []).entries()) {
    const location = `$.forms[${index}]`;
    validateReview(form.review, file, location);
    if (!prototypeIds.formIds.has(form.formId)) {
      fail(`${rel(file)}: ${location}.formId "${form.formId}" is not declared by ${doc.sourcePrototypeConfigRef}`);
    }
    if (!blueprintNodeIds.has(form.nodeId)) {
      fail(`${rel(file)}: ${location}.nodeId "${form.nodeId}" does not exist in the linked blueprint`);
    }
    if (form.title) validateCopyField(form.title, file, `${location}.title`, form.review);
    if (form.description) validateCopyField(form.description, file, `${location}.description`, form.review);
    validateCopyMap(form.actions, file, `${location}.actions`, form.review);

    for (const [fieldIndex, field] of (form.fields ?? []).entries()) {
      const fieldLocation = `${location}.fields[${fieldIndex}]`;
      if (!prototypeIds.fieldIds.has(field.fieldId)) {
        fail(`${rel(file)}: ${fieldLocation}.fieldId "${field.fieldId}" is not declared by ${doc.sourcePrototypeConfigRef}`);
      }
      if (!blueprintNodeIds.has(field.nodeId)) {
        fail(`${rel(file)}: ${fieldLocation}.nodeId "${field.nodeId}" does not exist in the linked blueprint`);
      }
      validateCopyField(field.label, file, `${fieldLocation}.label`, form.review);
      if (field.helperText) validateCopyField(field.helperText, file, `${fieldLocation}.helperText`, form.review);
      if (field.placeholder) validateCopyField(field.placeholder, file, `${fieldLocation}.placeholder`, form.review);
      if (field.errorText) validateCopyField(field.errorText, file, `${fieldLocation}.errorText`, form.review);
    }
  }

  for (const [index, message] of (doc.messages ?? []).entries()) {
    const location = `$.messages[${index}]`;
    validateReview(message.review, file, location);
    validateCopyMap(message.copy, file, `${location}.copy`, message.review);
    if (message.nodeId && !blueprintNodeIds.has(message.nodeId)) {
      fail(`${rel(file)}: ${location}.nodeId "${message.nodeId}" does not exist in the linked blueprint`);
    }
  }
}

function validateKnowledgeContent(doc, file) {
  if (!doc || typeof doc !== "object") return;
  if (!doc.type) fail(`${rel(file)}: type is required`);
  if (!doc.confidence?.level || !doc.confidence?.reason) {
    fail(`${rel(file)}: confidence.level and confidence.reason are required`);
  }
  if (!doc.status) fail(`${rel(file)}: status is required`);
  for (const [index, sourceRef] of (doc.sourceRefs ?? []).entries()) {
    for (const [evidenceIndex, evidenceRef] of (sourceRef.evidenceRefs ?? []).entries()) {
      resolveRepoPath(evidenceRef, file, `$.sourceRefs[${index}].evidenceRefs[${evidenceIndex}]`);
    }
  }
}

function validateToneOfVoiceReference(doc, file) {
  const toneIds = new Set();
  for (const [index, tone] of (doc.tones ?? []).entries()) {
    const location = `$.tones[${index}]`;
    if (toneIds.has(tone.id)) fail(`${rel(file)}: ${location}.id duplicates "${tone.id}"`);
    toneIds.add(tone.id);
    if (!/^[a-z][a-z0-9]*(?:-[a-z0-9]+)*$/.test(tone.id ?? "")) {
      fail(`${rel(file)}: ${location}.id "${tone.id}" must be a BrandVoice-compatible kebab-case tone id`);
    }
  }

  const blendIds = new Set();
  for (const [index, blend] of (doc.toneMixingRules?.commonBlends ?? []).entries()) {
    const location = `$.toneMixingRules.commonBlends[${index}]`;
    if (blendIds.has(blend.id)) fail(`${rel(file)}: ${location}.id duplicates "${blend.id}"`);
    blendIds.add(blend.id);
    if (!toneIds.has(blend.primaryTone)) {
      fail(`${rel(file)}: ${location}.primaryTone "${blend.primaryTone}" is not a declared tone id`);
    }
    if (!toneIds.has(blend.secondaryTone)) {
      fail(`${rel(file)}: ${location}.secondaryTone "${blend.secondaryTone}" is not a declared tone id`);
    }
  }

  for (const key of ["contentModel", "prototypeCopy", "audit"]) {
    if (typeof doc.recommendedUsage?.[key] !== "string" || doc.recommendedUsage[key].length === 0) {
      fail(`${rel(file)}: $.recommendedUsage.${key} is required for content workflow handoff`);
    }
  }
}

function validateBundleRefs(files) {
  const uxBundle = readJson(path.join(root, "plugins/bundles/ux-journey-skills/plugin.json"));
  const contentBundle = readJson(path.join(root, "plugins/bundles/ui-content-skills/plugin.json"));
  const uxShared = new Set(uxBundle?.shared ?? []);
  const contentShared = new Set(contentBundle?.shared ?? []);

  for (const file of files) {
    const relative = rel(file).split(path.sep).join("/");
    if (relative.endsWith(".user-journey-map.example.json") && !uxShared.has(relative)) {
      fail(`${relative}: must be listed in plugins/bundles/ux-journey-skills/plugin.json shared`);
    }
    if (
      (relative === "shared/content/tone-of-voice/tone-of-voice-reference.json" ||
        relative === "shared/content/tone-of-voice/tone-of-voice-reference.md" ||
        relative === "shared/schemas/tone-of-voice-reference.schema.json") &&
      !contentShared.has(relative)
    ) {
      fail(`${relative}: must be listed in plugins/bundles/ui-content-skills/plugin.json shared`);
    }
    if (
      (relative.endsWith(".content-model.example.json") ||
        relative.endsWith(".prototype-content.example.json") ||
        knowledgeExampleSuffixes.some((suffix) => relative.endsWith(suffix))) &&
      !contentShared.has(relative)
    ) {
      fail(`${relative}: must be listed in plugins/bundles/ui-content-skills/plugin.json shared`);
    }
  }
}

const files = collectFiles();
const docs = [];

for (const file of files) {
  if (!fs.existsSync(file)) {
    fail(`${rel(file)}: file is missing`);
    continue;
  }
  const doc = readJson(file);
  if (!doc) continue;
  docs.push({ file, doc });

  const schemaRef = sharedSchemaByType[doc.type] ?? knowledgeSchemaByType[doc.type];
  if (!schemaRef) {
    fail(`${rel(file)}: unknown content artifact type "${doc.type}"`);
    continue;
  }
  validateAgainstSchema(doc, schemaRef, file, doc.type);

  if (doc.type === "userJourneyMap") validateUserJourneyMap(doc, file);
  if (doc.type === "contentModel") validateContentModel(doc, file);
  if (doc.type === "prototypeContent") validatePrototypeContent(doc, file);
  if (doc.type === "toneOfVoiceReference") validateToneOfVoiceReference(doc, file);
  if (knowledgeSchemaByType[doc.type]) validateKnowledgeContent(doc, file);
}

validateBundleRefs([
  ...files.filter((file) => rel(file).startsWith("shared/examples/") || rel(file).startsWith("knowledge/examples/") || rel(file).startsWith("shared/content/")),
  path.join(root, "shared/content/tone-of-voice/tone-of-voice-reference.md"),
  path.join(root, "shared/schemas/tone-of-voice-reference.schema.json")
]);

if (errors.length) {
  console.error("Content validation failed:");
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(`Content validation passed for ${docs.length} content artifact file(s).`);
