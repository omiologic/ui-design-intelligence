#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { syncSharedReferenceBundles } from "./lib/bundle-skill.mjs";

const root = process.cwd();
const vocabularyPath = path.join(root, ".convention/vocabulary/node-types.json");
const individualOutputPath = path.join(root, "plugins/individuals/wireframe-schema/references/valid-node-types.md");
const vocabulary = JSON.parse(fs.readFileSync(vocabularyPath, "utf8"));

const records = vocabulary.nodeTypes;
if (!Array.isArray(records)) {
  console.error(".convention/vocabulary/node-types.json must contain nodeTypes array");
  process.exit(1);
}

const lines = [
  "# Valid Node Types",
  "",
  "This file is generated from `.convention/vocabulary/node-types.json`. Do not edit it by hand.",
  "",
  "Use only these `type` values for UIBlueprint nodes.",
  "",
  "## Summary",
  ""
];

for (const record of records) {
  lines.push(`- \`${record.name}\`: ${record.definition}`);
}

lines.push("", "## Semantics", "");

for (const record of records) {
  lines.push(`### \`${record.name}\``, "");
  lines.push(record.definition, "");
  lines.push(`- Overlay only: \`${record.overlayOnly ? "true" : "false"}\``);
  if (record.rootAllowed) lines.push("- May be used as a component-root example.");
  const children = record.allowedChildren ?? [];
  lines.push(`- Allowed children: ${children.length ? children.map((child) => `\`${child}\``).join(", ") : "none"}`);
  if (record.cardinality) {
    lines.push(`- Cardinality: \`${JSON.stringify(record.cardinality)}\``);
  }
  lines.push("");
}

lines.push("## Required Node Fields", "");
lines.push("Every node must include:", "");
lines.push("- `id`: lowercase kebab-case identifier, unique within the wireframe.");
lines.push("- `type`: one approved node type from this reference.");
lines.push("- `label`: human-readable label for the node.");
lines.push("");

if (fs.existsSync(path.dirname(individualOutputPath))) {
  fs.writeFileSync(individualOutputPath, `${lines.join("\n")}`);
  console.log(`Wrote ${path.relative(root, individualOutputPath)}`);
}

const syncedCount = syncSharedReferenceBundles(root);
console.log(`Synced _shared bundles for ${syncedCount} skill source directories.`);
