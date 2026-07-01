export const knowledgeEnvKeys = Object.freeze({
  storageProvider: "UI_KNOWLEDGE_STORAGE_PROVIDER",
  localDir: "UI_KNOWLEDGE_LOCAL_DIR",
  s3Bucket: "UI_KNOWLEDGE_S3_BUCKET",
  s3Prefix: "UI_KNOWLEDGE_S3_PREFIX",
  vectorProvider: "UI_KNOWLEDGE_VECTOR_PROVIDER",
  vectorBucket: "UI_KNOWLEDGE_VECTOR_BUCKET",
  vectorIndex: "UI_KNOWLEDGE_VECTOR_INDEX",
  awsRegion: "UI_KNOWLEDGE_AWS_REGION",
  embeddingProvider: "UI_KNOWLEDGE_EMBEDDING_PROVIDER",
  embeddingModel: "UI_KNOWLEDGE_EMBEDDING_MODEL"
});

export const knowledgeEnvKeyList = Object.freeze(Object.values(knowledgeEnvKeys));

const sensitiveKeys = new Set([
  knowledgeEnvKeys.s3Bucket,
  knowledgeEnvKeys.s3Prefix,
  knowledgeEnvKeys.vectorBucket,
  knowledgeEnvKeys.vectorIndex,
  knowledgeEnvKeys.awsRegion,
  knowledgeEnvKeys.embeddingModel
]);

export function loadKnowledgeEnv(env = process.env) {
  return Object.fromEntries(
    knowledgeEnvKeyList.map((key) => [key, env[key] ?? ""])
  );
}

export function redactValue(value) {
  const text = String(value ?? "");
  if (text.length === 0) return "";
  if (text.startsWith("<") && text.endsWith(">")) return text;
  if (text.length <= 8) return "<redacted>";
  return `${text.slice(0, 4)}...${text.slice(-4)}`;
}

export function redactKnowledgeConfig(config) {
  return Object.fromEntries(
    Object.entries(config).map(([key, value]) => [
      key,
      sensitiveKeys.has(key) ? redactValue(value) : value
    ])
  );
}

export function missingKnowledgeEnv(config) {
  const missing = [];
  const storageProvider = config[knowledgeEnvKeys.storageProvider] || "local";
  const vectorProvider = config[knowledgeEnvKeys.vectorProvider] || "none";

  if (storageProvider === "s3") {
    for (const key of [
      knowledgeEnvKeys.s3Bucket,
      knowledgeEnvKeys.s3Prefix,
      knowledgeEnvKeys.awsRegion
    ]) {
      if (!config[key]) missing.push(key);
    }
  }

  if (vectorProvider === "s3-vectors") {
    for (const key of [
      knowledgeEnvKeys.vectorBucket,
      knowledgeEnvKeys.vectorIndex,
      knowledgeEnvKeys.awsRegion,
      knowledgeEnvKeys.embeddingProvider,
      knowledgeEnvKeys.embeddingModel
    ]) {
      if (!config[key] && !missing.includes(key)) missing.push(key);
    }
  }

  return missing;
}

export function formatMissingKnowledgeEnvMessage(missing) {
  if (missing.length === 0) return "";
  return [
    "Missing required UI knowledge remote storage environment variables:",
    ...missing.map((key) => `- ${key}`),
    "",
    "Set real values through shell env, an ignored local env file, AWS profile,",
    "AWS SSO, or an IAM role. Do not commit bucket names, ARNs, signed URLs,",
    "access keys, secret keys, or session tokens."
  ].join("\n");
}
