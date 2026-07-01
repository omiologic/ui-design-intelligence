import fs from "node:fs";
import path from "node:path";
import {
  formatMissingKnowledgeEnvMessage,
  knowledgeEnvKeys,
  loadKnowledgeEnv,
  missingKnowledgeEnv,
  redactKnowledgeConfig,
  redactValue
} from "./knowledge-env.mjs";
import { redactStorageRef } from "./knowledge-storage.mjs";

export { redactStorageRef };

function firstConfigured(...values) {
  return values.find((value) => String(value ?? "").length > 0) ?? "";
}

function stringList(values) {
  return Array.isArray(values) ? values.filter((value) => typeof value === "string" && value.length > 0) : [];
}

function flattenTags(tags = {}) {
  return Object.fromEntries(
    Object.entries(tags)
      .filter(([, values]) => Array.isArray(values))
      .map(([key, values]) => [key, stringList(values)])
  );
}

export function loadKnowledgeVectorConfig(options = {}) {
  const envConfig = loadKnowledgeEnv(options.env ?? process.env);
  const config = {
    provider: firstConfigured(options.provider, envConfig[knowledgeEnvKeys.vectorProvider], "none"),
    vectorBucket: firstConfigured(options.vectorBucket, envConfig[knowledgeEnvKeys.vectorBucket]),
    vectorIndex: firstConfigured(options.vectorIndex, envConfig[knowledgeEnvKeys.vectorIndex]),
    awsRegion: firstConfigured(options.region, envConfig[knowledgeEnvKeys.awsRegion]),
    embeddingProvider: firstConfigured(options.embeddingProvider, envConfig[knowledgeEnvKeys.embeddingProvider]),
    embeddingModel: firstConfigured(options.embeddingModel, envConfig[knowledgeEnvKeys.embeddingModel]),
    dryRun: Boolean(options.dryRun),
    mockEmbeddings: Boolean(options.mockEmbeddings)
  };

  if (!["none", "s3-vectors", "mock"].includes(config.provider)) {
    throw new Error(`unsupported knowledge vector provider "${config.provider}"`);
  }

  if (config.provider === "s3-vectors") {
    const missing = missingKnowledgeEnv({
      ...envConfig,
      [knowledgeEnvKeys.vectorProvider]: "s3-vectors",
      [knowledgeEnvKeys.vectorBucket]: config.vectorBucket,
      [knowledgeEnvKeys.vectorIndex]: config.vectorIndex,
      [knowledgeEnvKeys.awsRegion]: config.awsRegion,
      [knowledgeEnvKeys.embeddingProvider]: config.embeddingProvider,
      [knowledgeEnvKeys.embeddingModel]: config.embeddingModel
    }).filter((key) => [
      knowledgeEnvKeys.vectorBucket,
      knowledgeEnvKeys.vectorIndex,
      knowledgeEnvKeys.awsRegion,
      knowledgeEnvKeys.embeddingProvider,
      knowledgeEnvKeys.embeddingModel
    ].includes(key));
    if (missing.length > 0) throw new Error(formatMissingKnowledgeEnvMessage(missing));
  }

  return config;
}

export function redactVectorConfig(config) {
  return redactKnowledgeConfig({
    [knowledgeEnvKeys.vectorProvider]: config.provider,
    [knowledgeEnvKeys.vectorBucket]: config.vectorBucket,
    [knowledgeEnvKeys.vectorIndex]: config.vectorIndex,
    [knowledgeEnvKeys.awsRegion]: config.awsRegion,
    [knowledgeEnvKeys.embeddingProvider]: config.embeddingProvider,
    [knowledgeEnvKeys.embeddingModel]: config.embeddingModel
  });
}

export function patternEmbeddingText(pattern) {
  const structure = pattern.structure ?? {};
  const mapping = pattern.wireframeMapping ?? {};
  const impact = pattern.blueprintImpact ?? {};
  const tags = pattern.tags ?? {};

  return [
    `name: ${pattern.name}`,
    `summary: ${pattern.summary}`,
    `patternType: ${pattern.patternType}`,
    `category: ${pattern.category}`,
    ...Object.entries(tags).map(([key, values]) => `${key}: ${stringList(values).join(", ")}`),
    `useWhen: ${stringList(pattern.useWhen).join(" | ")}`,
    `avoidWhen: ${stringList(pattern.avoidWhen).join(" | ")}`,
    `structure.required: ${stringList(structure.required).join(" | ")}`,
    `structure.optional: ${stringList(structure.optional).join(" | ")}`,
    `structure.notes: ${stringList(structure.notes).join(" | ")}`,
    `wireframeMapping.nodeType: ${mapping.nodeType ?? ""}`,
    `wireframeMapping.layout: ${mapping.layout ?? ""}`,
    `wireframeMapping.contentRoles: ${stringList(mapping.contentRoles).join(", ")}`,
    `wireframeMapping.recommendedChildren: ${stringList(mapping.recommendedChildren).join(", ")}`,
    `wireframeMapping.notes: ${stringList(mapping.notes).join(" | ")}`,
    `blueprintImpact.recommendedSections: ${stringList(impact.recommendedSections).join(", ")}`,
    `blueprintImpact.recommendedInteractions: ${stringList(impact.recommendedInteractions).join(", ")}`,
    `blueprintImpact.notes: ${stringList(impact.notes).join(" | ")}`
  ].filter((line) => !line.endsWith(": ")).join("\n");
}

export function projectPatternToVectorRecord(pattern) {
  const storageRef = pattern.storageRef ?? null;
  return {
    key: pattern.id,
    text: patternEmbeddingText(pattern),
    metadata: {
      patternId: pattern.id,
      patternType: pattern.patternType,
      category: pattern.category,
      name: pattern.name,
      confidence: pattern.confidence?.level,
      status: pattern.status,
      tags: flattenTags(pattern.tags),
      storageRef
    }
  };
}

export function deterministicEmbedding(text, dimensions = 12) {
  const vector = Array.from({ length: dimensions }, () => 0);
  const input = String(text ?? "");
  for (let index = 0; index < input.length; index += 1) {
    const slot = index % dimensions;
    vector[slot] += ((input.charCodeAt(index) % 53) - 26) / 26;
  }
  const magnitude = Math.sqrt(vector.reduce((sum, value) => sum + value * value, 0)) || 1;
  return vector.map((value) => Number((value / magnitude).toFixed(6)));
}

export async function embedText(text, config) {
  if (config.mockEmbeddings || config.embeddingProvider === "mock") {
    return deterministicEmbedding(text);
  }

  if (config.embeddingProvider === "bedrock") {
    let mod;
    try {
      mod = await import("@aws-sdk/client-bedrock-runtime");
    } catch {
      throw new Error("Bedrock embeddings require optional package @aws-sdk/client-bedrock-runtime for non-dry-run operations.");
    }
    const client = new mod.BedrockRuntimeClient({ region: config.awsRegion });
    const response = await client.send(new mod.InvokeModelCommand({
      modelId: config.embeddingModel,
      contentType: "application/json",
      accept: "application/json",
      body: JSON.stringify({ inputText: text })
    }));
    const body = JSON.parse(new TextDecoder().decode(response.body));
    const embedding = body.embedding ?? body.embeddings?.[0];
    if (!Array.isArray(embedding)) throw new Error("Bedrock embedding response did not contain an embedding array.");
    return embedding;
  }

  if (config.embeddingProvider === "openai") {
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) throw new Error("OpenAI embeddings require OPENAI_API_KEY in the local environment.");
    const response = await fetch("https://api.openai.com/v1/embeddings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: config.embeddingModel,
        input: text
      })
    });
    if (!response.ok) throw new Error(`OpenAI embedding request failed with HTTP ${response.status}`);
    const body = await response.json();
    const embedding = body.data?.[0]?.embedding;
    if (!Array.isArray(embedding)) throw new Error("OpenAI embedding response did not contain an embedding array.");
    return embedding;
  }

  throw new Error(`embedding provider "${config.embeddingProvider || "<empty>"}" is not supported for non-dry-run vector operations`);
}

export function cosineSimilarity(a, b) {
  const length = Math.min(a.length, b.length);
  let dot = 0;
  let left = 0;
  let right = 0;
  for (let index = 0; index < length; index += 1) {
    dot += a[index] * b[index];
    left += a[index] * a[index];
    right += b[index] * b[index];
  }
  return dot / ((Math.sqrt(left) * Math.sqrt(right)) || 1);
}

export function vectorRecordWithEmbedding(record, embedding) {
  return {
    ...record,
    embedding
  };
}

export function matchFilters(metadata, filters = {}) {
  for (const [key, expected] of Object.entries(filters)) {
    if (!expected) continue;
    const actual = key in metadata ? metadata[key] : metadata.tags?.[key];
    if (Array.isArray(actual)) {
      if (!actual.includes(expected)) return false;
      continue;
    }
    if (actual !== expected) return false;
  }
  return true;
}

export function rankMockVectorRecords({ records, query, filters = {}, limit = 5 }) {
  const queryEmbedding = deterministicEmbedding(query);
  return records
    .filter((record) => matchFilters(record.metadata ?? {}, filters))
    .map((record) => {
      const embedding = record.embedding ?? deterministicEmbedding(record.text);
      return {
        key: record.key,
        score: Number(cosineSimilarity(queryEmbedding, embedding).toFixed(6)),
        metadata: record.metadata
      };
    })
    .sort((a, b) => b.score - a.score || a.key.localeCompare(b.key))
    .slice(0, limit);
}

export function explainVectorMatch(result, query) {
  const tags = result.metadata?.tags ?? {};
  const tagSummary = Object.entries(tags)
    .flatMap(([key, values]) => stringList(values).map((value) => `${key}:${value}`))
    .slice(0, 5)
    .join(", ");
  return `Matched "${query}" with ${result.metadata?.patternType ?? "pattern"}:${result.metadata?.category ?? result.key}; score ${result.score}${tagSummary ? `; tags ${tagSummary}` : ""}.`;
}

export function redactVectorRecord(record) {
  return {
    ...record,
    embedding: record.embedding ? `<${record.embedding.length}-dimension-vector>` : undefined,
    metadata: {
      ...record.metadata,
      storageRef: redactStorageRef(record.metadata?.storageRef)
    }
  };
}

export class MockVectorAdapter {
  constructor(records = []) {
    this.records = records;
  }

  async putVectors(records) {
    this.records = records;
    return { count: records.length };
  }

  async queryVectors({ query, filters = {}, limit = 5 }) {
    return rankMockVectorRecords({ records: this.records, query, filters, limit });
  }
}

export class S3VectorsAdapter {
  constructor(config) {
    this.config = config;
    this.client = null;
  }

  async s3VectorsClient() {
    if (this.client) return this.client;
    let mod;
    try {
      mod = await import("@aws-sdk/client-s3vectors");
    } catch {
      throw new Error("S3 vector operations require optional package @aws-sdk/client-s3vectors for non-dry-run operations.");
    }
    this.sdk = mod;
    this.client = new mod.S3VectorsClient({ region: this.config.awsRegion });
    return this.client;
  }

  async putVectors(records) {
    const client = await this.s3VectorsClient();
    const { PutVectorsCommand } = this.sdk;
    if (!PutVectorsCommand) throw new Error("@aws-sdk/client-s3vectors does not expose PutVectorsCommand in this environment.");
    await client.send(new PutVectorsCommand({
      vectorBucketName: this.config.vectorBucket,
      indexName: this.config.vectorIndex,
      vectors: records.map((record) => ({
        key: record.key,
        data: { float32: record.embedding },
        metadata: record.metadata
      }))
    }));
    return { count: records.length };
  }

  async queryVectors({ embedding, filters = {}, limit = 5 }) {
    const client = await this.s3VectorsClient();
    const { QueryVectorsCommand } = this.sdk;
    if (!QueryVectorsCommand) throw new Error("@aws-sdk/client-s3vectors does not expose QueryVectorsCommand in this environment.");
    const response = await client.send(new QueryVectorsCommand({
      vectorBucketName: this.config.vectorBucket,
      indexName: this.config.vectorIndex,
      queryVector: { float32: embedding },
      filter: filters,
      topK: limit,
      returnMetadata: true,
      returnDistance: true
    }));
    return (response.vectors ?? []).map((item) => ({
      key: item.key,
      score: typeof item.distance === "number" ? Number((1 - item.distance).toFixed(6)) : 0,
      metadata: item.metadata ?? {}
    }));
  }
}

export function createVectorAdapter(config, records = []) {
  if (config.provider === "mock") return new MockVectorAdapter(records);
  if (config.provider === "s3-vectors") return new S3VectorsAdapter(config);
  throw new Error(`vector provider "${config.provider}" does not support vector operations`);
}

export function readVectorRecords(file) {
  return JSON.parse(fs.readFileSync(path.resolve(file), "utf8"));
}

export function writeVectorRecords(file, records) {
  fs.mkdirSync(path.dirname(path.resolve(file)), { recursive: true });
  fs.writeFileSync(path.resolve(file), `${JSON.stringify(records, null, 2)}\n`);
}

export function redactVectorConfigForLog(config) {
  const redacted = redactVectorConfig(config);
  if (redacted[knowledgeEnvKeys.vectorBucket]) {
    redacted[knowledgeEnvKeys.vectorBucket] = redactValue(redacted[knowledgeEnvKeys.vectorBucket]);
  }
  return redacted;
}
