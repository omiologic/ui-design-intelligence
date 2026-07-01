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

function readText(file) {
  try {
    return fs.readFileSync(path.join(root, file), "utf8");
  } catch (error) {
    fail(`${file}: cannot read (${error.message})`);
    return "";
  }
}

function requireIncludes(file, fragments) {
  const text = readText(file);
  for (const fragment of fragments) {
    if (!text.includes(fragment)) fail(`${file}: missing "${fragment}"`);
  }
}

const schemaFile = path.join(root, ".convention/schemas/component-spec.schema.json");
const schema = readJson(schemaFile);
const validFiles = walk(path.join(root, ".convention/examples/react-components"))
  .filter((file) => file.endsWith(".component-spec.example.json"));

function namesFromVocabulary(file, key) {
  const doc = readJson(path.join(root, file));
  const values = doc?.[key];
  if (!Array.isArray(values)) {
    fail(`${file}: expected array property "${key}"`);
    return [];
  }
  return values.map((value) => value?.name).filter((value) => typeof value === "string");
}

function levelsFromVocabulary(file, key) {
  const doc = readJson(path.join(root, file));
  const values = doc?.[key];
  if (!Array.isArray(values)) {
    fail(`${file}: expected array property "${key}"`);
    return [];
  }
  return values.map((value) => value?.level).filter((value) => Number.isInteger(value));
}

function checkEnumMatchesVocabulary(schemaValues, vocabularyValues, label) {
  const schemaSet = new Set(schemaValues ?? []);
  const vocabularySet = new Set(vocabularyValues);
  for (const value of vocabularySet) {
    if (!schemaSet.has(value)) fail(`${schemaFile}: missing ${label} enum "${value}"`);
  }
  for (const value of schemaSet) {
    if (!vocabularySet.has(value)) fail(`${schemaFile}: enum has non-vocabulary ${label} "${value}"`);
  }
}

if (schema) {
  checkEnumMatchesVocabulary(
    schema.$defs?.componentLayer?.enum,
    namesFromVocabulary(".convention/vocabulary/react-components/component-layer.json", "componentLayers"),
    "component layer"
  );
  checkEnumMatchesVocabulary(
    schema.$defs?.complexityLevel?.enum,
    levelsFromVocabulary(".convention/vocabulary/react-components/component-complexity.json", "componentComplexityLevels"),
    "component complexity level"
  );
  checkEnumMatchesVocabulary(
    schema.$defs?.dataCoupling?.enum,
    namesFromVocabulary(".convention/vocabulary/react-components/data-coupling.json", "dataCouplingValues"),
    "data coupling"
  );
  checkEnumMatchesVocabulary(
    schema.$defs?.sourceType?.enum,
    namesFromVocabulary(".convention/vocabulary/react-components/source-type.json", "sourceTypes"),
    "source type"
  );
  checkEnumMatchesVocabulary(
    schema.$defs?.implementationTarget?.properties?.framework?.enum,
    namesFromVocabulary(".convention/vocabulary/react-components/implementation-target.json", "implementationTargets"),
    "implementation target"
  );
  checkEnumMatchesVocabulary(
    schema.$defs?.implementationTarget?.properties?.defaultComponentCodeFormat?.enum,
    namesFromVocabulary(".convention/vocabulary/react-components/component-code-format.json", "componentCodeFormats"),
    "component code format"
  );
}

requireIncludes(".convention/templates/ui-design-intelligence.config.yml", [
  "reactComponents:",
  "defaultComponentCodeFormat:",
  "componentBuildConventionPath:",
  "consumer-componentBuildConventionPath"
]);

requireIncludes(".convention/contracts/react-components/component-build-config.contract.md", [
  "componentBuildConventionPath",
  "relative paths resolve from the consumer workspace root",
  "missing files should not fail the skill workflow",
  "They cannot override repository safety"
]);

requireIncludes("docs/react-components/component-build-config.md", [
  "componentBuildConventionPath",
  "Relative paths resolve from the consumer workspace root",
  "The target file must be markdown",
  "Missing or unreadable files should produce a warning",
  "Consumer conventions can make implementation choices more specific"
]);

requireIncludes("docs/react-components/README.md", [
  "ui-react-component-skills",
  "ecosystem-architecture.md",
  "repository-placement-recommendation.md"
]);

requireIncludes("docs/react-components/ecosystem-architecture.md", [
  "ComponentSpec",
  "RuntimeDesignTheme",
  "VisualExperienceSpec",
  "React component skill layer owns"
]);

requireIncludes("docs/react-components/recommended-file-organization.md", [
  "plugins/individuals/",
  ".convention/react-patterns/",
  "Install-Safe References",
  "Future Runtime Repository"
]);

requireIncludes("docs/react-components/repository-placement-recommendation.md", [
  "Keep the React UI component skill set inside",
  "Split Later When Work Is Runtime-Oriented",
  "ui-shared-component-skills",
  "ui-app-component-skills"
]);

requireIncludes(".convention/react-patterns/react-component-rules.md", [
  "ComponentSpec",
  "Controlled And Uncontrolled State",
  "Event Contracts",
  "Storybook Readiness",
  "Reusable UI component owns"
]);

requireIncludes(".convention/react-patterns/memoization-guidelines.md", [
  "Memoization is a performance tool",
  "When To Use `memo`",
  "When Not To Use `memo`",
  "Stale State Risks",
  "Do not use `useCallback` on every event handler by default"
]);

requireIncludes(".convention/react-patterns/ui-layer-boundary.md", [
  "Reusable UI components should stay in the UI layer",
  "Data Layer Responsibilities",
  "Container Adapter Pattern",
  "Shared component calls `fetch`",
  "ComponentSpec Requirement"
]);

requireIncludes(".convention/react-patterns/accessibility-rules.md", [
  "Button Versus Link",
  "Forms",
  "Motion"
]);

requireIncludes(".convention/react-patterns/storybook-rules.md", [
  "UI-Layer Fixtures",
  "Accessibility Review",
  "ResponsiveStress"
]);

requireIncludes(".convention/react-patterns/ai-output-rules.md", [
  "Do Not Jump Straight To Code",
  "Separate Concerns",
  "blanket `memo`, `useMemo`, or `useCallback`"
]);

requireIncludes(".convention/react-patterns/styling-rules.md", [
  "componentBuildConventionPath",
  "Responsive Rules",
  "Anti-Patterns"
]);

requireIncludes(".convention/templates/react-components/component-analysis-template.md", [
  "ComponentSpec Output",
  "Default component code format: jsx | tsx",
  "Shared UI vs App-Specific Decision",
  "Accessibility Requirements",
  "Do not include JSX or TSX source code"
]);

requireIncludes(".convention/templates/react-components/component-implementation-plan-template.md", [
  "Default component code format: jsx | tsx",
  "JSX/TSX Output Preference",
  "Data And Side-Effect Boundary",
  "Storybook Plan",
  "Performance And Memoization"
]);

requireIncludes(".convention/templates/react-components/storybook-plan-template.md", [
  "Data-free UI fixtures",
  "Controls And Args",
  "Viewport Scenarios",
  "Accessibility Checks",
  "Raw API response excluded"
]);

const reactComponentSkills = [
  "mockup-to-component-analysis",
  "component-spec-to-react-plan",
  "storybook-from-component-spec",
  "shared-ui-component-planner",
  "app-specific-component-planner",
  "react-component-review"
];

for (const skill of reactComponentSkills) {
  requireIncludes(`plugins/individuals/${skill}/SKILL.md`, [
    "references/_shared/contracts/react-components/component-spec.contract.md",
    "references/_shared/react-patterns/",
    "references/_shared/templates/react-components/",
    "## Boundary",
    "## Inline Example"
  ]);
}

for (const [skill, workflowFile] of [
  ["mockup-to-component-analysis", "mockup-to-component-analysis.md"],
  ["component-spec-to-react-plan", "component-spec-to-react-plan.md"],
  ["storybook-from-component-spec", "storybook-from-component-spec.md"],
  ["shared-ui-component-planner", "shared-ui-component-planning.md"],
  ["app-specific-component-planner", "app-specific-component-planning.md"],
  ["react-component-review", "react-component-review.md"]
]) {
  const workflowPath = `plugins/individuals/${skill}/references/${workflowFile}`;
  requireIncludes(`plugins/individuals/${skill}/SKILL.md`, [`references/${workflowFile}`]);
  requireIncludes(workflowPath, ["Component"]);
}

requireIncludes("plugins/individuals/mockup-to-component-analysis/SKILL.md", [
  "Produce `ComponentSpec`",
  "do not write JSX or TSX",
  "componentBuildConventionPath"
]);

requireIncludes("plugins/individuals/component-spec-to-react-plan/SKILL.md", [
  "defaultComponentCodeFormat",
  "memoization",
  "container/view separation",
  "references/react-component-architect-role.md",
  "references/ui-implementation-engineer-role.md"
]);

requireIncludes("plugins/individuals/react-component-review/SKILL.md", [
  "data-layer leakage",
  "blanket memoization",
  "Storybook",
  "references/accessibility-reviewer-role.md",
  "references/design-system-reviewer-role.md"
]);

requireIncludes("plugins/individuals/storybook-from-component-spec/SKILL.md", [
  "references/storybook-writer-role.md"
]);

const reactBundle = readJson(path.join(root, "plugins/bundles/ui-react-component-skills/plugin.json"));
if (reactBundle) {
  for (const skill of reactComponentSkills) {
    if (!reactBundle.skills?.includes(skill)) {
      fail(`plugins/bundles/ui-react-component-skills/plugin.json: missing skill "${skill}"`);
    }
  }
  for (const sharedPath of [
    ".convention/contracts/react-components/component-spec.contract.md",
    ".convention/schemas/component-spec.schema.json",
    ".convention/templates/react-components/component-analysis-template.md",
    ".convention/templates/react-components/component-implementation-plan-template.md",
    ".convention/templates/react-components/storybook-plan-template.md",
    ".convention/react-patterns/memoization-guidelines.md",
    ".convention/react-patterns/ui-layer-boundary.md",
    "docs/react-components/ecosystem-architecture.md",
    "docs/react-components/repository-placement-recommendation.md",
    "docs/react-components/component-build-config.md"
  ]) {
    if (!reactBundle.shared?.includes(sharedPath)) {
      fail(`plugins/bundles/ui-react-component-skills/plugin.json: missing shared file "${sharedPath}"`);
    }
  }
}

requireIncludes("plugins/bundles/ui-react-component-skills/README.md", [
  "ComponentSpec",
  "defaultComponentCodeFormat",
  "componentBuildConventionPath",
  "Future `ui-shared-component-skills` and `ui-app-component-skills` bundle"
]);

requireIncludes("plugins/bundles/README.md", [
  "ui-react-component-skills",
  "No command ownership in first bundle"
]);

requireIncludes("README.md", [
  "ui-react-component-skills",
  "reactComponents.componentBuildConventionPath"
]);

for (const file of validFiles.sort()) {
  const doc = readJson(file);
  if (!doc || !schema) continue;
  for (const error of validateJsonSchema(doc, schema)) {
    fail(`${file}: component-spec schema ${error}`);
  }

  const format = doc.implementationTarget?.defaultComponentCodeFormat;
  if (!["jsx", "tsx"].includes(format)) {
    fail(`${file}: implementationTarget.defaultComponentCodeFormat must be jsx or tsx`);
  }
}

const invalidCases = [
  {
    file: "tests/invalid-react-components/bad-code-format.component-spec.json",
    expected: ["$.implementationTarget.defaultComponentCodeFormat must be one of"]
  },
  {
    file: "tests/invalid-react-components/bad-complexity.component-spec.json",
    expected: ["$.complexityLevel must be one of"]
  },
  {
    file: "tests/invalid-react-components/missing-open-questions.component-spec.json",
    expected: ["$.openQuestions is required"]
  },
  {
    file: "tests/invalid-react-components/unknown-data-coupling.component-spec.json",
    expected: ["$.dataCoupling must be one of"]
  },
  {
    file: "tests/invalid-react-components/unknown-component-layer.component-spec.json",
    expected: ["$.componentLayer must be one of"]
  }
];

for (const testCase of invalidCases) {
  const file = path.join(root, testCase.file);
  if (!fs.existsSync(file)) {
    fail(`${testCase.file}: fixture is missing`);
    continue;
  }
  const doc = readJson(file);
  if (!doc || !schema) continue;
  const fixtureErrors = validateJsonSchema(doc, schema);
  if (fixtureErrors.length === 0) {
    fail(`${testCase.file}: expected validation to fail, but it passed`);
    continue;
  }
  const output = fixtureErrors.join("\n");
  for (const expected of testCase.expected) {
    if (!output.includes(expected)) {
      fail(`${testCase.file}: expected error containing ${JSON.stringify(expected)}`);
    }
  }
}

const behavioralFixtures = [
  "tests/behavioral/mockup-to-component-analysis.behavioral-test.json",
  "tests/behavioral/component-spec-to-react-plan.behavioral-test.json",
  "tests/behavioral/storybook-from-component-spec.behavioral-test.json",
  "tests/behavioral/react-component-review.behavioral-test.json"
];

const requiredBehavioralSignals = [
  "premature-jsx-tsx-output",
  "data-layer-leakage-into-ui",
  "responsive",
  "accessibility",
  "defaultcomponentcodeformat",
  "blanket-memoization"
];

let behavioralSignalText = "";
for (const fixture of behavioralFixtures) {
  const file = path.join(root, fixture);
  if (!fs.existsSync(file)) {
    fail(`${fixture}: behavioral fixture is missing`);
    continue;
  }
  const doc = readJson(file);
  if (!doc) continue;
  if (!reactComponentSkills.includes(doc.skill)) {
    fail(`${fixture}: skill "${doc.skill}" is not a React component skill`);
  }
  behavioralSignalText += ` ${JSON.stringify(doc.requiredSignals ?? [])}`.toLowerCase();
}

for (const signal of requiredBehavioralSignals) {
  if (!behavioralSignalText.includes(signal)) {
    fail(`tests/behavioral: missing React component behavioral signal "${signal}"`);
  }
}

if (errors.length) {
  console.error("React component validation failed:");
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(`React component validation passed for ${validFiles.length} example file(s), ${invalidCases.length} invalid fixture(s), and ${behavioralFixtures.length} behavioral fixture(s).`);
