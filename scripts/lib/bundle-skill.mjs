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

const sharedFiles = [
  ["shared/vocabulary/node-types.json", "vocabulary/node-types.json"],
  ["shared/vocabulary/layout-patterns.json", "vocabulary/layout-patterns.json"],
  ["shared/vocabulary/content-roles.json", "vocabulary/content-roles.json"],
  ["shared/vocabulary/interaction-states.json", "vocabulary/interaction-states.json"],
  ["shared/vocabulary/ui-layer-types.json", "vocabulary/ui-layer-types.json"],
  ["shared/vocabulary/README.md", "vocabulary/README.md"],
  ["shared/schemas/wireframe-config.schema.json", "schemas/wireframe-config.schema.json"],
  ["shared/design-philosophy/blueprint-locks.md", "design-philosophy/blueprint-locks.md"],
  ["shared/design-philosophy/hierarchy-density-register.md", "design-philosophy/hierarchy-density-register.md"],
  ["shared/design-philosophy/layout-pattern-selection.md", "design-philosophy/layout-pattern-selection.md"],
  ["shared/design-philosophy/overlay-decision.md", "design-philosophy/overlay-decision.md"],
  ["shared/design-philosophy/page-section-ordering.md", "design-philosophy/page-section-ordering.md"],
  ["shared/design-philosophy/preflight-checklist.md", "design-philosophy/preflight-checklist.md"],
  ["shared/design-philosophy/structural-anti-slop.md", "design-philosophy/structural-anti-slop.md"],
  ["shared/design-system/component-selection-guidelines.md", "design-system/component-selection-guidelines.md"],
  ["shared/design-system/anti-generic-ui-guidelines.md", "design-system/anti-generic-ui-guidelines.md"],
  ["shared/taste-profiles/README.md", "taste-profiles/README.md"],
  ["shared/taste-profiles/conversion.json", "taste-profiles/conversion.json"],
  ["shared/taste-profiles/utility-product.json", "taste-profiles/utility-product.json"],
  ["plugins/individuals/wireframe-schema/references/valid-node-types.md", "wireframe-schema/valid-node-types.md"],
  ["plugins/individuals/wireframe-schema/references/wireframe-config.schema.json", "wireframe-schema/wireframe-config.schema.json"]
];

const designSystemSharedFiles = [
  ["shared/design-philosophy/design-system/design-system-principles.md", "design-philosophy/design-system/design-system-principles.md"],
  ["shared/design-philosophy/design-system/design-system-anti-slop.md", "design-philosophy/design-system/design-system-anti-slop.md"],
  ["shared/design-philosophy/design-system/skill-doctrine.md", "design-philosophy/design-system/skill-doctrine.md"],
  ["shared/design-system/design-system-quality-checklist.md", "design-system/design-system-quality-checklist.md"],
  ["shared/design-system/design-system-handoff-checklist.md", "design-system/design-system-handoff-checklist.md"],
  ["shared/design-system/token-taxonomy.md", "design-system/token-taxonomy.md"],
  ["shared/design-system/component-anatomy-reference.md", "design-system/component-anatomy-reference.md"],
  ["shared/design-system/component-state-guidelines.md", "design-system/component-state-guidelines.md"],
  ["shared/design-system/accessibility-token-guidelines.md", "design-system/accessibility-token-guidelines.md"],
  ["shared/design-system/responsive-system-guidelines.md", "design-system/responsive-system-guidelines.md"],
  ["shared/design-system/visual-style-calibration.md", "design-system/visual-style-calibration.md"],
  ["shared/design-system/component-selection-guidelines.md", "design-system/component-selection-guidelines.md"],
  ["shared/design-system/anti-generic-ui-guidelines.md", "design-system/anti-generic-ui-guidelines.md"],
  ["shared/schemas/design-system-seed.schema.json", "schemas/design-system-seed.schema.json"],
  ["shared/schemas/brand-foundation.schema.json", "schemas/brand-foundation.schema.json"],
  ["shared/schemas/palette-foundation.schema.json", "schemas/palette-foundation.schema.json"],
  ["shared/schemas/typography-foundation.schema.json", "schemas/typography-foundation.schema.json"],
  ["shared/schemas/iconography-foundation.schema.json", "schemas/iconography-foundation.schema.json"],
  ["shared/schemas/button-foundation.schema.json", "schemas/button-foundation.schema.json"],
  ["shared/schemas/card-foundation.schema.json", "schemas/card-foundation.schema.json"],
  ["shared/schemas/header-foundation.schema.json", "schemas/header-foundation.schema.json"],
  ["shared/schemas/footer-foundation.schema.json", "schemas/footer-foundation.schema.json"],
  ["shared/vocabulary/design-token-types.json", "vocabulary/design-token-types.json"],
  ["shared/vocabulary/component-anatomy.json", "vocabulary/component-anatomy.json"],
  ["shared/vocabulary/component-variants.json", "vocabulary/component-variants.json"],
  ["shared/vocabulary/layout-roles.json", "vocabulary/layout-roles.json"],
  ["shared/vocabulary/accessibility-rules.json", "vocabulary/accessibility-rules.json"],
  ["shared/vocabulary/design-system-source-kinds.json", "vocabulary/design-system-source-kinds.json"],
  ["shared/vocabulary/content-roles.json", "vocabulary/content-roles.json"],
  ["shared/vocabulary/interaction-states.json", "vocabulary/interaction-states.json"]
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
  "style-to-design-system": {
    skills: ["map-style-to-design-system-seed"],
    files: [
      ["shared/design-system/visual-style-calibration.md", "design-system/visual-style-calibration.md"],
      ["shared/schemas/style-reference.schema.json", "schemas/style-reference.schema.json"],
      ["shared/schemas/style-application.schema.json", "schemas/style-application.schema.json"],
      ["shared/schemas/style-patch.schema.json", "schemas/style-patch.schema.json"],
      ["shared/schemas/style-blend.schema.json", "schemas/style-blend.schema.json"],
      ["shared/schemas/design-system-seed.schema.json", "schemas/design-system-seed.schema.json"]
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
      ["shared/schemas/study-output.schema.json", "schemas/study-output.schema.json"],
      ["shared/templates/page-study.md", "templates/page-study.md"],
      ["shared/vocabulary/ui-terminology.json", "vocabulary/ui-terminology.json"],
      ["shared/examples/page-study.example.json", "examples/page-study.example.json"]
    ]
  },
  "wireframe-generator": {
    skills: ["generate-wireframe-config"],
    files: [
      ["shared/schemas/wireframe-config.schema.json", "schemas/wireframe-config.schema.json"],
      ["shared/vocabulary/node-types.json", "vocabulary/node-types.json"],
      ["shared/vocabulary/layout-patterns.json", "vocabulary/layout-patterns.json"],
      ["shared/vocabulary/content-roles.json", "vocabulary/content-roles.json"],
      ["shared/vocabulary/interaction-states.json", "vocabulary/interaction-states.json"],
      ["shared/examples/ui-blueprint.example.json", "examples/ui-blueprint.example.json"],
      ["shared/design-philosophy/preflight-checklist.md", "design-philosophy/preflight-checklist.md"],
      ["shared/design-philosophy/structural-anti-slop.md", "design-philosophy/structural-anti-slop.md"],
      ["shared/taste-profiles/README.md", "taste-profiles/README.md"],
      ["shared/taste-profiles/conversion.json", "taste-profiles/conversion.json"],
      ["shared/taste-profiles/utility-product.json", "taste-profiles/utility-product.json"]
    ]
  },
  "study-to-blueprint-generator": {
    skills: ["generate-ui-blueprint-from-study"],
    files: [
      ["shared/schemas/study-output.schema.json", "schemas/study-output.schema.json"],
      ["shared/schemas/wireframe-config.schema.json", "schemas/wireframe-config.schema.json"],
      ["shared/vocabulary/node-types.json", "vocabulary/node-types.json"],
      ["shared/vocabulary/layout-patterns.json", "vocabulary/layout-patterns.json"],
      ["shared/vocabulary/content-roles.json", "vocabulary/content-roles.json"],
      ["shared/vocabulary/interaction-states.json", "vocabulary/interaction-states.json"],
      ["shared/examples/page-study.example.json", "examples/page-study.example.json"],
      ["shared/examples/ui-blueprint.example.json", "examples/ui-blueprint.example.json"],
      ["shared/design-philosophy/preflight-checklist.md", "design-philosophy/preflight-checklist.md"]
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
  ["../../shared/vocabulary/node-types.json", "references/_shared/vocabulary/node-types.json"],
  ["../../shared/vocabulary/layout-patterns.json", "references/_shared/vocabulary/layout-patterns.json"],
  ["../../shared/vocabulary/content-roles.json", "references/_shared/vocabulary/content-roles.json"],
  ["../../shared/vocabulary/interaction-states.json", "references/_shared/vocabulary/interaction-states.json"],
  ["../../shared/vocabulary/ui-layer-types.json", "references/_shared/vocabulary/ui-layer-types.json"],
  ["../../shared/schemas/wireframe-config.schema.json", "references/_shared/schemas/wireframe-config.schema.json"],
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
  text = text.split("../../shared/vocabulary/").join("references/_shared/vocabulary/");
  text = text.split("../../../shared/").join("references/_shared/");
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
