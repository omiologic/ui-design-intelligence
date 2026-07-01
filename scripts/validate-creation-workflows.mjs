#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { validateJsonSchema } from "./lib/json-schema-validator.mjs";

const root = process.cwd();
const errors = [];

const commandSectionNames = [
  "## Purpose",
  "## Use When",
  "## Required Inputs",
  "## Optional Inputs",
  "## Missing Input Questions",
  "## Default Pipeline",
  "## Stop Conditions",
  "## Outputs",
  "## Quality Checks",
  "## Agents",
  "## Skills",
  "## Example Invocation",
  "## Inputs",
  "## Workflow"
];

const creationCommands = [
  {
    file: ".agents/commands/create-wireframe.md",
    recipe: ".convention/recipes/wireframe.recipe.md",
    requiredOutputs: ["wireframe.json", "wireframe-notes.md"]
  },
  {
    file: ".agents/commands/create-design-spec.md",
    recipe: ".convention/recipes/design-spec.recipe.md",
    requiredOutputs: ["design-spec.md"]
  },
  {
    file: ".agents/commands/create-prototype-plan.md",
    recipe: ".convention/recipes/prototype.recipe.md",
    requiredOutputs: ["prototype-config.json", "prototype-plan.md"]
  }
];

const reviewCommand = {
  file: ".agents/commands/review-generated-wireframe.md",
  requiredOutputs: ["wireframe-review.md"],
  scoreCriteria: [
    "journey clarity",
    "single primary action",
    "proof placement",
    "state coverage",
    "register fit",
    "landmark coverage",
    "responsive priority",
    "anti-pattern absence"
  ]
};

const recipeSectionNames = [
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

const recipes = [
  ".convention/recipes/wireframe.recipe.md",
  ".convention/recipes/design-spec.recipe.md",
  ".convention/recipes/prototype.recipe.md"
];

const e2eExamples = [
  { dir: ".convention/examples/marketing-page-e2e", slug: "marketing-page" },
  { dir: ".convention/examples/dashboard-e2e", slug: "dashboard" },
  { dir: ".convention/examples/product-page-e2e", slug: "product-page" },
  { dir: ".convention/examples/multi-step-form-e2e", slug: "multi-step-form" }
];

const schemaBackedArtifacts = [
  {
    suffix: ".study.example.json",
    schema: ".convention/schemas/study-output.schema.json",
    label: "study"
  },
  {
    suffix: ".ui-blueprint.json",
    schema: ".convention/schemas/wireframe-config.schema.json",
    label: "wireframe"
  },
  {
    suffix: ".design-system-seed.example.json",
    schema: ".convention/schemas/design-system-seed.schema.json",
    label: "design-system-seed"
  },
  {
    suffix: ".prototype-config.example.json",
    schema: ".convention/schemas/prototype-config.schema.json",
    label: "prototype-config"
  }
];

function fail(message) {
  errors.push(message);
}

function absolute(file) {
  return path.join(root, file);
}

function exists(file) {
  return fs.existsSync(absolute(file));
}

function readText(file) {
  try {
    return fs.readFileSync(absolute(file), "utf8");
  } catch (error) {
    fail(`${file}: cannot read file (${error.message})`);
    return "";
  }
}

function readJson(file) {
  try {
    return JSON.parse(readText(file));
  } catch (error) {
    fail(`${file}: invalid JSON (${error.message})`);
    return null;
  }
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

function requireSections(file, text, sections) {
  for (const section of sections) {
    if (!text.includes(section)) {
      fail(`${file}: missing ${section}`);
      continue;
    }
    if (sectionBody(text, section).length === 0) {
      fail(`${file}: ${section} is empty`);
    }
  }
}

function requireText(file, text, expected, label = expected) {
  if (!text.includes(expected)) fail(`${file}: missing ${label}`);
}

function validateCommand(command) {
  if (!exists(command.file)) {
    fail(`${command.file}: file does not exist`);
    return;
  }

  const text = readText(command.file);
  requireSections(command.file, text, commandSectionNames);
  requireText(command.file, text, command.recipe, "recipe reference");
  requireText(command.file, text, "Ask at most three blocking questions", "missing-input question limit");
  requireText(command.file, text, "Stop and ask for input when:", "explicit stop prompt");

  for (const output of command.requiredOutputs) {
    requireText(command.file, text, `\`${output}\``, `output ${output}`);
  }
}

function validateReviewCommand(command) {
  if (!exists(command.file)) {
    fail(`${command.file}: file does not exist`);
    return;
  }

  const text = readText(command.file);
  requireSections(command.file, text, commandSectionNames);
  requireText(command.file, text, ".convention/quality/blueprint-quality-rubric.md", "rubric reference");
  requireText(command.file, text, "Score: 0-16", "score range");
  requireText(command.file, text, "Band: weak | usable | strong", "band contract");
  requireText(command.file, text, "Readiness: not ready | design review needed | ready for downstream handoff", "readiness contract");
  requireText(command.file, text, "| Criterion | Score | Evidence | Repair |", "scorecard table header");
  requireText(command.file, text, "0-9", "weak score band");
  requireText(command.file, text, "10-13", "usable score band");
  requireText(command.file, text, "14-16", "strong score band");

  for (const output of command.requiredOutputs) {
    requireText(command.file, text, `\`${output}\``, `output ${output}`);
  }
  for (const criterion of command.scoreCriteria) {
    requireText(command.file, text, criterion, `rubric criterion ${criterion}`);
  }
}

function validateRecipe(recipeFile) {
  if (!exists(recipeFile)) {
    fail(`${recipeFile}: file does not exist`);
    return;
  }

  const text = readText(recipeFile);
  requireSections(recipeFile, text, recipeSectionNames);
  requireText(recipeFile, text, "Stop and ask for input when:", "explicit stop prompt");
  if (!/`[^`]+`/.test(sectionBody(text, "## Outputs"))) {
    fail(`${recipeFile}: Outputs must name default file artifacts in backticks`);
  }
}

function validateE2eExample(example) {
  const requiredFiles = [
    "brief.md",
    "README.md",
    `${example.slug}.study.example.json`,
    `${example.slug}.design-system-seed.example.json`,
    `${example.slug}.ui-blueprint.json`,
    `${example.slug}.prototype-config.example.json`
  ];

  for (const fileName of requiredFiles) {
    const file = `${example.dir}/${fileName}`;
    if (!exists(file)) fail(`${file}: file does not exist`);
  }

  const readmeFile = `${example.dir}/README.md`;
  if (exists(readmeFile)) {
    const readme = readText(readmeFile).toLowerCase();
    for (const term of ["brief", "study", "design-system", "wireframe", "prototype"]) {
      if (!readme.includes(term)) fail(`${readmeFile}: missing chain term "${term}"`);
    }
  }

  for (const artifact of schemaBackedArtifacts) {
    const file = `${example.dir}/${example.slug}${artifact.suffix}`;
    if (!exists(file)) continue;

    const doc = readJson(file);
    const schema = readJson(artifact.schema);
    if (!doc || !schema) continue;

    for (const error of validateJsonSchema(doc, schema)) {
      fail(`${file}: ${artifact.label} schema ${error}`);
    }
  }
}

for (const command of creationCommands) validateCommand(command);
validateReviewCommand(reviewCommand);
for (const recipe of recipes) validateRecipe(recipe);
for (const example of e2eExamples) validateE2eExample(example);

if (errors.length > 0) {
  console.error("Creation workflow validation failed:");
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(
  `Creation workflow validation passed for ${creationCommands.length + 1} commands, ${recipes.length} recipes, and ${e2eExamples.length} end-to-end examples.`
);
