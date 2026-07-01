import fs from "node:fs";
import path from "node:path";

function readJson(root, relativePath) {
  return JSON.parse(fs.readFileSync(path.join(root, relativePath), "utf8"));
}

function nodeTypeNames(root) {
  return readJson(root, ".convention/vocabulary/node-types.json").nodeTypes.map((item) => {
    if (typeof item === "string") return item;
    return item.name;
  });
}

function arrayVocabulary(root, relativePath, key) {
  const values = readJson(root, relativePath)[key];
  if (!Array.isArray(values)) {
    throw new Error(`${relativePath} must contain array property ${key}`);
  }
  return values;
}

export function schemaWithVocabularyEnums(root) {
  const schema = readJson(root, ".convention/schemas/wireframe-config.schema.json");

  schema.$defs.nodeType = {
    type: "string",
    enum: nodeTypeNames(root)
  };
  schema.$defs.contentRole = {
    type: "string",
    enum: arrayVocabulary(root, ".convention/vocabulary/content-roles.json", "contentRoles")
  };
  schema.$defs.layoutPattern = {
    type: "string",
    enum: arrayVocabulary(root, ".convention/vocabulary/layout-patterns.json", "layoutPatterns")
  };
  schema.$defs.interactionState = {
    type: "string",
    enum: arrayVocabulary(root, ".convention/vocabulary/interaction-states.json", "interactionStates")
  };

  schema.$defs.node.properties.role = {
    "$ref": "#/$defs/contentRole"
  };
  schema.$defs.node.properties.layout = {
    "$ref": "#/$defs/layoutPattern"
  };
  schema.$defs.node.properties.state = {
    "$ref": "#/$defs/interactionState"
  };

  return schema;
}
