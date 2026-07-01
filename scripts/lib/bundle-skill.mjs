import fs from "node:fs";
import path from "node:path";

export const productSkills = [
  "accessibility-wireframe-review",
  "component-wireframe-planner",
  "design-terminology",
  "interaction-patterns",
  "layout-specification",
  "page-wireframe-planner",
  "section-wireframe-planner",
  "wireframe-schema"
];

export const designSystemSkills = [
  "generate-design-system-seed",
  "generate-runtime-design-theme",
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

export const reactComponentSkills = [
  "mockup-to-component-analysis",
  "component-spec-to-react-plan",
  "storybook-from-component-spec",
  "shared-ui-component-planner",
  "app-specific-component-planner",
  "react-component-review"
];

const sharedFiles = [
  [".convention/vocabulary/node-types.json", "vocabulary/node-types.json"],
  [".convention/vocabulary/layout-patterns.json", "vocabulary/layout-patterns.json"],
  [".convention/vocabulary/content-roles.json", "vocabulary/content-roles.json"],
  [".convention/vocabulary/interaction-states.json", "vocabulary/interaction-states.json"],
  [".convention/vocabulary/ui-layer-types.json", "vocabulary/ui-layer-types.json"],
  [".convention/vocabulary/README.md", "vocabulary/README.md"],
  [".convention/schemas/wireframe-config.schema.json", "schemas/wireframe-config.schema.json"],
  [".convention/design-philosophy/blueprint-locks.md", "design-philosophy/blueprint-locks.md"],
  [".convention/design-philosophy/hierarchy-density-register.md", "design-philosophy/hierarchy-density-register.md"],
  [".convention/design-philosophy/layout-pattern-selection.md", "design-philosophy/layout-pattern-selection.md"],
  [".convention/design-philosophy/overlay-decision.md", "design-philosophy/overlay-decision.md"],
  [".convention/design-philosophy/page-section-ordering.md", "design-philosophy/page-section-ordering.md"],
  [".convention/design-philosophy/preflight-checklist.md", "design-philosophy/preflight-checklist.md"],
  [".convention/design-philosophy/structural-anti-slop.md", "design-philosophy/structural-anti-slop.md"],
  [".convention/design-system/component-selection-guidelines.md", "design-system/component-selection-guidelines.md"],
  [".convention/design-system/anti-generic-ui-guidelines.md", "design-system/anti-generic-ui-guidelines.md"],
  [".convention/taste-profiles/README.md", "taste-profiles/README.md"],
  [".convention/taste-profiles/conversion.json", "taste-profiles/conversion.json"],
  [".convention/taste-profiles/utility-product.json", "taste-profiles/utility-product.json"],
  ["plugins/individuals/wireframe-schema/references/valid-node-types.md", "wireframe-schema/valid-node-types.md"],
  ["plugins/individuals/wireframe-schema/references/wireframe-config.schema.json", "wireframe-schema/wireframe-config.schema.json"]
];

const designSystemSharedFiles = [
  [".convention/design-philosophy/design-system/design-system-principles.md", "design-philosophy/design-system/design-system-principles.md"],
  [".convention/design-philosophy/design-system/design-system-anti-slop.md", "design-philosophy/design-system/design-system-anti-slop.md"],
  [".convention/design-philosophy/design-system/skill-doctrine.md", "design-philosophy/design-system/skill-doctrine.md"],
  [".convention/design-system/design-system-quality-checklist.md", "design-system/design-system-quality-checklist.md"],
  [".convention/design-system/design-system-handoff-checklist.md", "design-system/design-system-handoff-checklist.md"],
  [".convention/design-system/brand-asset-color-extraction.md", "design-system/brand-asset-color-extraction.md"],
  [".convention/design-system/token-taxonomy.md", "design-system/token-taxonomy.md"],
  [".convention/design-system/component-anatomy-reference.md", "design-system/component-anatomy-reference.md"],
  [".convention/design-system/component-state-guidelines.md", "design-system/component-state-guidelines.md"],
  [".convention/design-system/accessibility-token-guidelines.md", "design-system/accessibility-token-guidelines.md"],
  [".convention/design-system/runtime-palette-status-state-modeling.md", "design-system/runtime-palette-status-state-modeling.md"],
  [".convention/design-system/responsive-system-guidelines.md", "design-system/responsive-system-guidelines.md"],
  [".convention/design-system/visual-style-calibration.md", "design-system/visual-style-calibration.md"],
  [".convention/design-system/component-selection-guidelines.md", "design-system/component-selection-guidelines.md"],
  [".convention/design-system/anti-generic-ui-guidelines.md", "design-system/anti-generic-ui-guidelines.md"],
  [".convention/schemas/design-system-seed.schema.json", "schemas/design-system-seed.schema.json"],
  [".convention/schemas/runtime-design-theme.schema.json", "schemas/runtime-design-theme.schema.json"],
  [".convention/schemas/brand-foundation.schema.json", "schemas/brand-foundation.schema.json"],
  [".convention/schemas/palette-foundation.schema.json", "schemas/palette-foundation.schema.json"],
  [".convention/schemas/typography-foundation.schema.json", "schemas/typography-foundation.schema.json"],
  [".convention/schemas/iconography-foundation.schema.json", "schemas/iconography-foundation.schema.json"],
  [".convention/schemas/button-foundation.schema.json", "schemas/button-foundation.schema.json"],
  [".convention/schemas/card-foundation.schema.json", "schemas/card-foundation.schema.json"],
  [".convention/schemas/header-foundation.schema.json", "schemas/header-foundation.schema.json"],
  [".convention/schemas/footer-foundation.schema.json", "schemas/footer-foundation.schema.json"],
  [".convention/vocabulary/design-token-types.json", "vocabulary/design-token-types.json"],
  [".convention/vocabulary/component-anatomy.json", "vocabulary/component-anatomy.json"],
  [".convention/vocabulary/component-variants.json", "vocabulary/component-variants.json"],
  [".convention/vocabulary/layout-roles.json", "vocabulary/layout-roles.json"],
  [".convention/vocabulary/accessibility-rules.json", "vocabulary/accessibility-rules.json"],
  [".convention/vocabulary/design-system-source-kinds.json", "vocabulary/design-system-source-kinds.json"],
  [".convention/vocabulary/content-roles.json", "vocabulary/content-roles.json"],
  [".convention/vocabulary/interaction-states.json", "vocabulary/interaction-states.json"]
];

const reactComponentSharedFiles = [
  [".convention/contracts/react-components/component-build-config.contract.md", "contracts/react-components/component-build-config.contract.md"],
  [".convention/contracts/react-components/component-implementation.contract.md", "contracts/react-components/component-implementation.contract.md"],
  [".convention/contracts/react-components/component-spec.contract.md", "contracts/react-components/component-spec.contract.md"],
  [".convention/contracts/react-components/shared-ui-vs-app-ui.contract.md", "contracts/react-components/shared-ui-vs-app-ui.contract.md"],
  [".convention/contracts/react-components/storybook-handoff.contract.md", "contracts/react-components/storybook-handoff.contract.md"],
  [".convention/schemas/component-spec.schema.json", "schemas/component-spec.schema.json"],
  [".convention/vocabulary/react-components/component-code-format.json", "vocabulary/react-components/component-code-format.json"],
  [".convention/vocabulary/react-components/component-code-format.md", "vocabulary/react-components/component-code-format.md"],
  [".convention/vocabulary/react-components/component-complexity.json", "vocabulary/react-components/component-complexity.json"],
  [".convention/vocabulary/react-components/component-complexity.md", "vocabulary/react-components/component-complexity.md"],
  [".convention/vocabulary/react-components/component-layer.json", "vocabulary/react-components/component-layer.json"],
  [".convention/vocabulary/react-components/component-layer.md", "vocabulary/react-components/component-layer.md"],
  [".convention/vocabulary/react-components/data-coupling.json", "vocabulary/react-components/data-coupling.json"],
  [".convention/vocabulary/react-components/data-coupling.md", "vocabulary/react-components/data-coupling.md"],
  [".convention/vocabulary/react-components/implementation-target.json", "vocabulary/react-components/implementation-target.json"],
  [".convention/vocabulary/react-components/implementation-target.md", "vocabulary/react-components/implementation-target.md"],
  [".convention/vocabulary/react-components/source-type.json", "vocabulary/react-components/source-type.json"],
  [".convention/vocabulary/react-components/source-type.md", "vocabulary/react-components/source-type.md"],
  [".convention/react-patterns/accessibility-rules.md", "react-patterns/accessibility-rules.md"],
  [".convention/react-patterns/ai-output-rules.md", "react-patterns/ai-output-rules.md"],
  [".convention/react-patterns/memoization-guidelines.md", "react-patterns/memoization-guidelines.md"],
  [".convention/react-patterns/react-component-rules.md", "react-patterns/react-component-rules.md"],
  [".convention/react-patterns/storybook-rules.md", "react-patterns/storybook-rules.md"],
  [".convention/react-patterns/styling-rules.md", "react-patterns/styling-rules.md"],
  [".convention/react-patterns/ui-layer-boundary.md", "react-patterns/ui-layer-boundary.md"],
  [".convention/templates/react-components/component-analysis-template.md", "templates/react-components/component-analysis-template.md"],
  [".convention/templates/react-components/component-implementation-plan-template.md", "templates/react-components/component-implementation-plan-template.md"],
  [".convention/templates/react-components/storybook-plan-template.md", "templates/react-components/storybook-plan-template.md"],
  [".convention/templates/ui-design-intelligence.config.yml", "templates/ui-design-intelligence.config.yml"]
];

export const sharedReferenceBundles = {
  blueprint: {
    skills: productSkills,
    files: sharedFiles
  },
  "design-system": {
    skills: designSystemSkills,
    files: designSystemSharedFiles
  },
  "react-components": {
    skills: reactComponentSkills,
    files: reactComponentSharedFiles
  },
  "style-to-design-system": {
    skills: ["map-style-to-design-system-seed"],
    files: [
      [".convention/design-system/visual-style-calibration.md", "design-system/visual-style-calibration.md"],
      [".convention/schemas/style-reference.schema.json", "schemas/style-reference.schema.json"],
      [".convention/schemas/style-application.schema.json", "schemas/style-application.schema.json"],
      [".convention/schemas/style-patch.schema.json", "schemas/style-patch.schema.json"],
      [".convention/schemas/style-blend.schema.json", "schemas/style-blend.schema.json"],
      [".convention/schemas/design-system-seed.schema.json", "schemas/design-system-seed.schema.json"]
    ]
  },
  study: {
    skills: [
      "study-ui-accessibility",
      "study-ui-information-architecture",
      "study-ui-interaction",
      "study-ui-responsive-behavior",
      "study-ui-specification",
      "study-ui-storytelling"
    ],
    files: [
      [".convention/schemas/study-output.schema.json", "schemas/study-output.schema.json"],
      [".convention/templates/page-study.md", "templates/page-study.md"],
      [".convention/vocabulary/ui-terminology.json", "vocabulary/ui-terminology.json"],
      [".convention/examples/page-study.example.json", "examples/page-study.example.json"]
    ]
  },
  "wireframe-generator": {
    skills: ["generate-wireframe-config"],
    files: [
      [".convention/schemas/wireframe-config.schema.json", "schemas/wireframe-config.schema.json"],
      [".convention/vocabulary/node-types.json", "vocabulary/node-types.json"],
      [".convention/vocabulary/layout-patterns.json", "vocabulary/layout-patterns.json"],
      [".convention/vocabulary/content-roles.json", "vocabulary/content-roles.json"],
      [".convention/vocabulary/interaction-states.json", "vocabulary/interaction-states.json"],
      [".convention/examples/ui-blueprint.example.json", "examples/ui-blueprint.example.json"],
      [".convention/design-philosophy/preflight-checklist.md", "design-philosophy/preflight-checklist.md"],
      [".convention/design-philosophy/structural-anti-slop.md", "design-philosophy/structural-anti-slop.md"],
      [".convention/taste-profiles/README.md", "taste-profiles/README.md"],
      [".convention/taste-profiles/conversion.json", "taste-profiles/conversion.json"],
      [".convention/taste-profiles/utility-product.json", "taste-profiles/utility-product.json"]
    ]
  },
  "study-to-blueprint-generator": {
    skills: ["generate-ui-blueprint-from-study"],
    files: [
      [".convention/schemas/study-output.schema.json", "schemas/study-output.schema.json"],
      [".convention/schemas/wireframe-config.schema.json", "schemas/wireframe-config.schema.json"],
      [".convention/vocabulary/node-types.json", "vocabulary/node-types.json"],
      [".convention/vocabulary/layout-patterns.json", "vocabulary/layout-patterns.json"],
      [".convention/vocabulary/content-roles.json", "vocabulary/content-roles.json"],
      [".convention/vocabulary/interaction-states.json", "vocabulary/interaction-states.json"],
      [".convention/examples/page-study.example.json", "examples/page-study.example.json"],
      [".convention/examples/ui-blueprint.example.json", "examples/ui-blueprint.example.json"],
      [".convention/design-philosophy/preflight-checklist.md", "design-philosophy/preflight-checklist.md"]
    ]
  }
};

export function productSkillSourceDir(root, skillName) {
  const individualDir = path.join(root, "plugins", "individuals", skillName);
  if (fs.existsSync(path.join(individualDir, "SKILL.md"))) return individualDir;

  return individualDir;
}

export function productSkillMirrorDirs(root, skillName) {
  return [
    path.join(root, "plugins", "individuals", skillName)
  ].filter((dir) => fs.existsSync(path.join(dir, "SKILL.md")));
}

const referenceRewrites = new Map([
  ["../../.convention/vocabulary/node-types.json", "references/_shared/vocabulary/node-types.json"],
  ["../../.convention/vocabulary/layout-patterns.json", "references/_shared/vocabulary/layout-patterns.json"],
  ["../../.convention/vocabulary/content-roles.json", "references/_shared/vocabulary/content-roles.json"],
  ["../../.convention/vocabulary/interaction-states.json", "references/_shared/vocabulary/interaction-states.json"],
  ["../../.convention/vocabulary/ui-layer-types.json", "references/_shared/vocabulary/ui-layer-types.json"],
  ["../../.convention/schemas/wireframe-config.schema.json", "references/_shared/schemas/wireframe-config.schema.json"],
  ["../wireframe-schema/references/valid-node-types.md", "references/_shared/wireframe-schema/valid-node-types.md"],
  ["../wireframe-schema/references/wireframe-config.schema.json", "references/_shared/wireframe-schema/wireframe-config.schema.json"]
]);

export function copyDir(source, target) {
  fs.rmSync(target, { recursive: true, force: true });
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.cpSync(source, target, {
    recursive: true,
    filter: (item) => !item.includes(`${path.sep}__pycache__${path.sep}`) && !item.endsWith(".pyc")
  });
}

function copyFile(source, target) {
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.copyFileSync(source, target);
}

export function skillSourceDirs(root, skillName) {
  return [
    path.join(root, "plugins", "individuals", skillName)
  ].filter((dir) => fs.existsSync(path.join(dir, "SKILL.md")));
}

export function syncSharedReferenceBundle(root, skillName, files) {
  for (const skillDir of skillSourceDirs(root, skillName)) {
    const sharedTarget = path.join(skillDir, "references", "_shared");
    fs.rmSync(sharedTarget, { recursive: true, force: true });
    for (const [sourceRelative, targetRelative] of files) {
      const source = path.join(root, sourceRelative);
      if (!fs.existsSync(source)) {
        throw new Error(`Shared source file is missing: ${sourceRelative}`);
      }
      copyFile(source, path.join(sharedTarget, targetRelative));
    }
  }
}

export function syncSharedReferenceBundles(root) {
  let count = 0;
  for (const bundle of Object.values(sharedReferenceBundles)) {
    for (const skillName of bundle.skills) {
      syncSharedReferenceBundle(root, skillName, bundle.files);
      count += skillSourceDirs(root, skillName).length;
    }
  }
  return count;
}

function rewriteSkillReferences(skillDir) {
  const skillFile = path.join(skillDir, "SKILL.md");
  let text = fs.readFileSync(skillFile, "utf8");
  for (const [from, to] of referenceRewrites) {
    text = text.split(from).join(to);
  }
  text = text.split("../../.convention/vocabulary/").join("references/_shared/vocabulary/");
  text = text.split("../../../.convention/").join("references/_shared/");
  fs.writeFileSync(skillFile, text);
}

function sharedFilesForSkill(skillName) {
  const filesBySource = new Map();
  for (const bundle of Object.values(sharedReferenceBundles)) {
    if (!bundle.skills.includes(skillName)) continue;
    for (const file of bundle.files) {
      filesBySource.set(file[0], file);
    }
  }
  return [...filesBySource.values()];
}

export function bundleSkill({ root, skillName, targetDir }) {
  const sourceDir = productSkillSourceDir(root, skillName);
  if (!fs.existsSync(path.join(sourceDir, "SKILL.md"))) {
    throw new Error(`Product skill is missing SKILL.md: ${skillName}`);
  }

  copyDir(sourceDir, targetDir);
  rewriteSkillReferences(targetDir);

  const sharedTarget = path.join(targetDir, "references", "_shared");
  fs.rmSync(sharedTarget, { recursive: true, force: true });

  for (const [sourceRelative, targetRelative] of sharedFilesForSkill(skillName)) {
    const source = path.join(root, sourceRelative);
    if (!fs.existsSync(source)) {
      throw new Error(`Shared source file is missing: ${sourceRelative}`);
    }
    copyFile(source, path.join(sharedTarget, targetRelative));
  }
}
