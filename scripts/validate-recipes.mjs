#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const recipesDir = path.join(root, "shared", "recipes");
const errors = [];

const expectedRecipes = [
  "wireframe.recipe.md",
  "design-spec.recipe.md",
  "prototype.recipe.md"
];

const requiredSections = [
  "## Artifact Purpose",
  "## Required Inputs",
  "## Optional Inputs",
  "## Default Pipeline",
  "## Outputs",
  "## Required Sections Or Fields",
  "## Quality Gates",
  "## Stop Conditions",
  "## Repair Guidance",
  "## Handoffs"
];

function fail(message) {
  errors.push(message);
}

function relative(file) {
  return path.relative(root, file);
}

function sectionBody(text, section) {
  const lines = text.split(/\r?\n/);
  const start = lines.findIndex((line) => line === section);
  if (start === -1) return "";

  const body = [];
  for (const line of lines.slice(start + 1)) {
    if (line.startsWith("## ")) break;
    body.push(line);
  }
  return body.join("\n").trim();
}

if (!fs.existsSync(recipesDir)) {
  fail("shared/recipes/: directory does not exist");
} else {
  for (const recipeName of expectedRecipes) {
    const recipePath = path.join(recipesDir, recipeName);
    if (!fs.existsSync(recipePath)) {
      fail(`shared/recipes/${recipeName}: file does not exist`);
      continue;
    }

    const text = fs.readFileSync(recipePath, "utf8");
    if (!/^#\s+.+/m.test(text)) {
      fail(`${relative(recipePath)}: missing top-level heading`);
    }

    for (const section of requiredSections) {
      if (!text.includes(section)) {
        fail(`${relative(recipePath)}: missing ${section}`);
        continue;
      }

      if (sectionBody(text, section).length === 0) {
        fail(`${relative(recipePath)}: ${section} is empty`);
      }
    }

    const stopBody = sectionBody(text, "## Stop Conditions");
    if (!/Stop and ask for input when:/m.test(stopBody)) {
      fail(`${relative(recipePath)}: Stop Conditions must include "Stop and ask for input when:"`);
    }

    const outputBody = sectionBody(text, "## Outputs");
    if (!/`[^`]+`/.test(outputBody)) {
      fail(`${relative(recipePath)}: Outputs must name default file artifacts in backticks`);
    }
  }
}

if (errors.length > 0) {
  console.error("Recipe validation failed:");
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(`Recipe validation passed for ${expectedRecipes.length} recipes.`);
