#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { productSkillMirrorDirs, productSkills } from "./lib/bundle-skill.mjs";
import { schemaWithVocabularyEnums } from "./lib/schema-enums.mjs";

const root = process.cwd();
const schemaPath = path.join(root, "shared/schemas/wireframe-config.schema.json");
const schema = schemaWithVocabularyEnums(root);

fs.writeFileSync(schemaPath, `${JSON.stringify(schema, null, 2)}\n`);
console.log(`Wrote ${path.relative(root, schemaPath)}`);

const individualWireframeSchemaReference = path.join(root, "plugins/individuals/wireframe-schema/references/wireframe-config.schema.json");
if (fs.existsSync(path.dirname(individualWireframeSchemaReference))) {
  fs.copyFileSync(schemaPath, individualWireframeSchemaReference);
  console.log(`Wrote ${path.relative(root, individualWireframeSchemaReference)}`);
}

for (const skill of productSkills) {
  for (const skillDir of productSkillMirrorDirs(root, skill)) {
    const sharedSchema = path.join(skillDir, "references/_shared/schemas/wireframe-config.schema.json");
    const wireframeSchema = path.join(skillDir, "references/_shared/wireframe-schema/wireframe-config.schema.json");
    fs.mkdirSync(path.dirname(sharedSchema), { recursive: true });
    fs.mkdirSync(path.dirname(wireframeSchema), { recursive: true });
    fs.copyFileSync(schemaPath, sharedSchema);
    fs.copyFileSync(schemaPath, wireframeSchema);
  }
}

console.log(`Synced schema bundles for ${productSkills.length} product skills.`);
