#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { schemaWithVocabularyEnums } from "./lib/schema-enums.mjs";

const root = process.cwd();
const schemaPath = path.join(root, "shared/schemas/wireframe-config.schema.json");
const actual = fs.readFileSync(schemaPath, "utf8");
const expected = `${JSON.stringify(schemaWithVocabularyEnums(root), null, 2)}\n`;

if (actual !== expected) {
  console.error("Schema enums are out of sync with shared vocabulary.");
  console.error("Run: npm run build:schema");
  process.exit(1);
}

console.log("Schema enums match shared vocabulary.");
