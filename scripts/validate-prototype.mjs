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

function walk(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const item = path.join(dir, entry.name);
    return entry.isDirectory() ? walk(item) : [item];
  });
}

function validateAgainstSchema(doc, schema, file, label) {
  if (!doc || !schema) return;
  for (const error of validateJsonSchema(doc, schema)) {
    fail(`${path.relative(root, file)}: ${label} schema ${error}`);
  }
}

function addId(set, value, file, location) {
  if (typeof value !== "string") return;
  if (set.has(value)) fail(`${path.relative(root, file)}: duplicate id "${value}" at ${location}`);
  set.add(value);
}

function requireKnown(set, value, file, location, label) {
  if (typeof value !== "string") return;
  if (!set.has(value)) fail(`${path.relative(root, file)}: ${location} references unknown ${label} "${value}"`);
}

const prototypeSchema = readJson(path.join(root, ".convention/schemas/prototype-config.schema.json"));
const interactionFlowSchema = readJson(path.join(root, ".convention/schemas/interaction-flow.schema.json"));
const componentStateModelSchema = readJson(path.join(root, ".convention/schemas/component-state-model.schema.json"));
const interactionStatesDoc = readJson(path.join(root, ".convention/vocabulary/interaction-states.json"));
const approvedStates = new Set(interactionStatesDoc?.interactionStates ?? []);
const runtimeThemeFiles = walk(path.join(root, ".convention/examples"))
  .filter((file) => file.endsWith("runtime-design-theme.example.json"))
  .sort();
const runtimeThemeIds = new Set(
  runtimeThemeFiles
    .map((file) => readJson(file)?.id)
    .filter((id) => typeof id === "string")
);

function checkComponentStateModel(model, file, knownNodeRefs) {
  validateAgainstSchema(model, componentStateModelSchema, file, "component-state-model");
  requireKnown(knownNodeRefs, model.nodeId, file, `componentStateModels.${model.id}.nodeId`, "referenced node");
  if (!approvedStates.has(model.initialState)) {
    fail(`${path.relative(root, file)}: componentStateModels.${model.id}.initialState "${model.initialState}" is not approved`);
  }
  for (const state of model.allowedStates ?? []) {
    if (!approvedStates.has(state)) {
      fail(`${path.relative(root, file)}: componentStateModels.${model.id}.allowedStates "${state}" is not approved`);
    }
  }
}

function checkInteraction(flow, file, knownNodeRefs, stateIds, screenIds, routeIds) {
  validateAgainstSchema(flow, interactionFlowSchema, file, "interaction-flow");
  requireKnown(knownNodeRefs, flow.trigger?.sourceNodeId, file, `interactions.${flow.id}.trigger.sourceNodeId`, "referenced node");
  requireKnown(screenIds, flow.trigger?.screenId, file, `interactions.${flow.id}.trigger.screenId`, "screen");
  requireKnown(routeIds, flow.trigger?.routeId, file, `interactions.${flow.id}.trigger.routeId`, "route");
  requireKnown(knownNodeRefs, flow.action?.targetNodeId, file, `interactions.${flow.id}.action.targetNodeId`, "referenced node");
  requireKnown(screenIds, flow.action?.targetScreenId, file, `interactions.${flow.id}.action.targetScreenId`, "screen");
  requireKnown(routeIds, flow.action?.targetRouteId, file, `interactions.${flow.id}.action.targetRouteId`, "route");
  requireKnown(stateIds, flow.action?.targetStateId, file, `interactions.${flow.id}.action.targetStateId`, "state");
  requireKnown(stateIds, flow.condition?.stateId, file, `interactions.${flow.id}.condition.stateId`, "state");
  requireKnown(stateIds, flow.result?.resultingStateId, file, `interactions.${flow.id}.result.resultingStateId`, "state");
  requireKnown(knownNodeRefs, flow.result?.focusTargetNodeId, file, `interactions.${flow.id}.result.focusTargetNodeId`, "referenced node");
}

function checkPrototype(doc, file) {
  validateAgainstSchema(doc, prototypeSchema, file, "prototype-config");
  if (!doc) return;

  requireKnown(runtimeThemeIds, doc.runtimeDesignThemeRef, file, "runtimeDesignThemeRef", "runtime design theme");
  requireKnown(runtimeThemeIds, doc.source?.sourceRuntimeDesignThemeId, file, "source.sourceRuntimeDesignThemeId", "runtime design theme");
  if (doc.runtimeDesignThemeRef && doc.source?.sourceRuntimeDesignThemeId && doc.runtimeDesignThemeRef !== doc.source.sourceRuntimeDesignThemeId) {
    fail(`${path.relative(root, file)}: runtimeDesignThemeRef must match source.sourceRuntimeDesignThemeId`);
  }

  const allIds = new Set();
  const screenIds = new Set();
  const routeIds = new Set();
  const stateIds = new Set();
  const knownNodeRefs = new Set();

  for (const screen of doc.screens ?? []) {
    addId(allIds, screen.id, file, `screens.${screen.id}`);
    screenIds.add(screen.id);
    if (screen.wireframeRef) knownNodeRefs.add(screen.wireframeRef);
  }
  for (const route of doc.routes ?? []) {
    addId(allIds, route.id, file, `routes.${route.id}`);
    routeIds.add(route.id);
    requireKnown(screenIds, route.screenId, file, `routes.${route.id}.screenId`, "screen");
  }
  for (const state of doc.states ?? []) {
    addId(allIds, state.id, file, `states.${state.id}`);
    stateIds.add(state.id);
    if (state.nodeId) knownNodeRefs.add(state.nodeId);
    requireKnown(screenIds, state.screenId, file, `states.${state.id}.screenId`, "screen");
    if (!approvedStates.has(state.state)) {
      fail(`${path.relative(root, file)}: states.${state.id}.state "${state.state}" is not approved`);
    }
  }
  for (const model of doc.componentStateModels ?? []) {
    addId(allIds, model.id, file, `componentStateModels.${model.id}`);
    if (model.nodeId) knownNodeRefs.add(model.nodeId);
  }
  for (const overlay of doc.overlays ?? []) {
    addId(allIds, overlay.id, file, `overlays.${overlay.id}`);
    if (overlay.nodeId) knownNodeRefs.add(overlay.nodeId);
    for (const nodeId of overlay.triggerNodeIds ?? []) knownNodeRefs.add(nodeId);
    if (overlay.dismissal?.focusReturnNodeId) knownNodeRefs.add(overlay.dismissal.focusReturnNodeId);
  }
  for (const form of doc.forms ?? []) {
    addId(allIds, form.id, file, `forms.${form.id}`);
    if (form.nodeId) knownNodeRefs.add(form.nodeId);
    if (form.submitNodeId) knownNodeRefs.add(form.submitNodeId);
    for (const field of form.fields ?? []) {
      if (field.nodeId) knownNodeRefs.add(field.nodeId);
      for (const stateId of field.validationStateIds ?? []) {
        requireKnown(stateIds, stateId, file, `forms.${form.id}.fields.${field.id}.validationStateIds`, "state");
      }
    }
  }
  for (const flow of doc.navigationFlows ?? []) {
    addId(allIds, flow.id, file, `navigationFlows.${flow.id}`);
    requireKnown(screenIds, flow.fromScreenId, file, `navigationFlows.${flow.id}.fromScreenId`, "screen");
    requireKnown(screenIds, flow.toScreenId, file, `navigationFlows.${flow.id}.toScreenId`, "screen");
    knownNodeRefs.add(flow.triggerNodeId);
  }
  for (const transition of doc.transitions ?? []) {
    addId(allIds, transition.id, file, `transitions.${transition.id}`);
    requireKnown(stateIds, transition.from, file, `transitions.${transition.id}.from`, "state");
    requireKnown(stateIds, transition.to, file, `transitions.${transition.id}.to`, "state");
  }
  for (const interaction of doc.interactions ?? []) {
    addId(allIds, interaction.id, file, `interactions.${interaction.id}`);
  }

  for (const screen of doc.screens ?? []) {
    requireKnown(routeIds, screen.routeId, file, `screens.${screen.id}.routeId`, "route");
  }
  for (const model of doc.componentStateModels ?? []) {
    checkComponentStateModel(model, file, knownNodeRefs);
  }
  for (const interaction of doc.interactions ?? []) {
    checkInteraction(interaction, file, knownNodeRefs, stateIds, screenIds, routeIds);
  }
}

const prototypeFiles = walk(path.join(root, ".convention/examples"))
  .filter((file) => file.endsWith(".prototype-config.example.json"))
  .sort();

for (const file of prototypeFiles) {
  checkPrototype(readJson(file), file);
}

function requireText(file, expected, label) {
  const fullPath = path.join(root, file);
  const text = fs.existsSync(fullPath) ? fs.readFileSync(fullPath, "utf8") : "";
  if (!text.includes(expected)) {
    fail(`${file}: missing ${label}`);
  }
}

requireText(
  ".convention/workflows/design-system-prototype-pipeline.md",
  "study -> knowledge -> style reference -> DesignSystemSeed -> RuntimeDesignTheme -> blueprint/wireframe -> PrototypeConfig -> viewer/runtime",
  "seed-to-runtime-theme-to-prototype pipeline summary"
);
requireText(
  ".convention/workflows/design-system-prototype-pipeline.md",
  "RuntimeDesignTheme Versus VisualExperienceSpec",
  "runtime theme versus visual experience boundary"
);
requireText(
  "plugins/individuals/generate-interactive-prototype-config/SKILL.md",
  "runtimeDesignThemeRef",
  "prototype skill runtime theme reference guidance"
);
requireText(
  "plugins/individuals/generate-interactive-prototype-config/references/prototype-config-generation.md",
  "RuntimeDesignTheme",
  "prototype generation runtime theme guidance"
);

if (errors.length) {
  console.error("Prototype validation failed:");
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(`Prototype validation passed for ${prototypeFiles.length} prototype config example(s).`);
