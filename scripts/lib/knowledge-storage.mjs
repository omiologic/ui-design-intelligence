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

export function normalizeS3Prefix(prefix) {
  const text = String(prefix ?? "").trim().replace(/^\/+/, "");
  if (!text) return "";
  return text.endsWith("/") ? text : `${text}/`;
}

export function parseS3Uri(uri) {
  const match = String(uri ?? "").match(/^s3:\/\/([^/]+)\/(.+)$/);
  if (!match) throw new Error(`expected an s3:// bucket/key URI`);
  return { bucket: match[1], key: match[2] };
}

export function storageKeyForPattern(pattern, config) {
  const id = pattern?.id;
  if (!id || !/^[a-z][a-z0-9]*(?:-[a-z0-9]+)*$/.test(id)) {
    throw new Error(`pattern record is missing a valid id`);
  }
  return `${normalizeS3Prefix(config.s3Prefix)}patterns/${id}.pattern.json`;
}

export function storageRefForS3Object({ bucket, key, objectType = "patternRecord", etag = "", versionId = "" }) {
  const ref = {
    kind: "s3Uri",
    uri: `s3://${bucket}/${key}`,
    objectType,
    updatedAt: new Date().toISOString()
  };
  if (etag) ref.etag = etag;
  if (versionId) ref.versionId = versionId;
  return ref;
}

export function storageRefForLocalPath(file, objectType = "patternRecord") {
  return {
    kind: "localPath",
    uri: file.split(path.sep).join("/"),
    objectType,
    updatedAt: new Date().toISOString()
  };
}

function firstConfigured(...values) {
  return values.find((value) => String(value ?? "").length > 0) ?? "";
}

export function redactStorageRef(ref) {
  if (!ref || typeof ref !== "object") return ref;
  const copy = { ...ref };
  if (typeof copy.uri === "string") {
    if (copy.uri.startsWith("s3://")) {
      const { key } = parseS3Uri(copy.uri);
      copy.uri = `s3://<bucket>/${key}`;
    } else {
      copy.uri = redactValue(copy.uri);
    }
  }
  if (copy.etag) copy.etag = redactValue(copy.etag);
  if (copy.versionId) copy.versionId = redactValue(copy.versionId);
  return copy;
}

export function loadKnowledgeStorageConfig(options = {}) {
  const envConfig = loadKnowledgeEnv(options.env ?? process.env);
  const provider = firstConfigured(options.provider, envConfig[knowledgeEnvKeys.storageProvider], "local");
  const config = {
    provider,
    localDir: firstConfigured(options.localDir, envConfig[knowledgeEnvKeys.localDir], "ui-knowledge"),
    s3Bucket: firstConfigured(options.bucket, envConfig[knowledgeEnvKeys.s3Bucket]),
    s3Prefix: normalizeS3Prefix(firstConfigured(options.prefix, envConfig[knowledgeEnvKeys.s3Prefix], "ui-knowledge/")),
    awsRegion: firstConfigured(options.region, envConfig[knowledgeEnvKeys.awsRegion]),
    dryRun: Boolean(options.dryRun)
  };

  if (!["local", "s3"].includes(config.provider)) {
    throw new Error(`unsupported knowledge storage provider "${config.provider}"`);
  }

  if (config.provider === "s3") {
    const missing = missingKnowledgeEnv({
      ...envConfig,
      [knowledgeEnvKeys.storageProvider]: "s3",
      [knowledgeEnvKeys.s3Bucket]: config.s3Bucket,
      [knowledgeEnvKeys.s3Prefix]: config.s3Prefix,
      [knowledgeEnvKeys.awsRegion]: config.awsRegion
    }).filter((key) => [
      knowledgeEnvKeys.s3Bucket,
      knowledgeEnvKeys.s3Prefix,
      knowledgeEnvKeys.awsRegion
    ].includes(key));
    if (missing.length > 0) throw new Error(formatMissingKnowledgeEnvMessage(missing));
  }

  return config;
}

export function redactStorageConfig(config) {
  return redactKnowledgeConfig({
    [knowledgeEnvKeys.storageProvider]: config.provider,
    [knowledgeEnvKeys.localDir]: config.localDir,
    [knowledgeEnvKeys.s3Bucket]: config.s3Bucket,
    [knowledgeEnvKeys.s3Prefix]: config.s3Prefix,
    [knowledgeEnvKeys.awsRegion]: config.awsRegion
  });
}

export class LocalKnowledgeStorageAdapter {
  constructor(config) {
    this.config = config;
    this.root = path.resolve(config.localDir || "ui-knowledge");
  }

  resolveLocalPath(storageRef) {
    if (!storageRef || storageRef.kind !== "localPath") {
      throw new Error(`local adapter requires a localPath storageRef`);
    }
    return path.resolve(storageRef.uri);
  }

  async list(prefix = "") {
    const start = path.join(this.root, prefix);
    if (!fs.existsSync(start)) return [];
    const walk = (dir) => fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
      const item = path.join(dir, entry.name);
      return entry.isDirectory() ? walk(item) : [path.relative(this.root, item).split(path.sep).join("/")];
    });
    return walk(start).sort();
  }

  async fetch(storageRef) {
    const file = this.resolveLocalPath(storageRef);
    return fs.readFileSync(file, "utf8");
  }

  async put(storageRef, body) {
    const file = this.resolveLocalPath(storageRef);
    fs.mkdirSync(path.dirname(file), { recursive: true });
    fs.writeFileSync(file, body);
    return { ...storageRef, updatedAt: new Date().toISOString() };
  }

  async exists(storageRef) {
    return fs.existsSync(this.resolveLocalPath(storageRef));
  }
}

export class S3KnowledgeStorageAdapter {
  constructor(config) {
    this.config = config;
    this.client = null;
  }

  async s3Client() {
    if (this.client) return this.client;
    let mod;
    try {
      mod = await import("@aws-sdk/client-s3");
    } catch {
      throw new Error("S3 storage requires optional package @aws-sdk/client-s3 for non-dry-run operations.");
    }
    this.sdk = mod;
    this.client = new mod.S3Client({ region: this.config.awsRegion });
    return this.client;
  }

  async list(prefix = this.config.s3Prefix) {
    const client = await this.s3Client();
    const { ListObjectsV2Command } = this.sdk;
    const response = await client.send(new ListObjectsV2Command({
      Bucket: this.config.s3Bucket,
      Prefix: prefix
    }));
    return (response.Contents ?? []).map((item) => item.Key).filter(Boolean).sort();
  }

  async fetch(storageRef) {
    const uri = storageRef?.uri ?? storageRef;
    const { bucket, key } = parseS3Uri(uri);
    const client = await this.s3Client();
    const { GetObjectCommand } = this.sdk;
    const response = await client.send(new GetObjectCommand({ Bucket: bucket, Key: key }));
    return response.Body.transformToString();
  }

  async put(storageRef, body) {
    const { bucket, key } = parseS3Uri(storageRef.uri);
    const client = await this.s3Client();
    const { PutObjectCommand } = this.sdk;
    const response = await client.send(new PutObjectCommand({
      Bucket: bucket,
      Key: key,
      Body: body,
      ContentType: "application/json"
    }));
    return storageRefForS3Object({
      bucket,
      key,
      objectType: storageRef.objectType,
      etag: response.ETag,
      versionId: response.VersionId
    });
  }

  async exists(storageRef) {
    const { bucket, key } = parseS3Uri(storageRef.uri);
    const client = await this.s3Client();
    const { HeadObjectCommand } = this.sdk;
    try {
      await client.send(new HeadObjectCommand({ Bucket: bucket, Key: key }));
      return true;
    } catch (error) {
      if (error?.$metadata?.httpStatusCode === 404 || error?.name === "NotFound") return false;
      throw error;
    }
  }
}

export function createKnowledgeStorageAdapter(config) {
  if (config.provider === "local") return new LocalKnowledgeStorageAdapter(config);
  if (config.provider === "s3") return new S3KnowledgeStorageAdapter(config);
  throw new Error(`unsupported knowledge storage provider "${config.provider}"`);
}
