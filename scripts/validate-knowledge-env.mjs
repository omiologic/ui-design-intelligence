#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";
import {
  formatMissingKnowledgeEnvMessage,
  knowledgeEnvKeyList,
  knowledgeEnvKeys,
  loadKnowledgeEnv,
  missingKnowledgeEnv,
  redactKnowledgeConfig
} from "./lib/knowledge-env.mjs";

const root = process.cwd();
const errors = [];
const checkRemoteEnv = process.argv.includes("--check-remote-env");

function fail(message) {
  errors.push(message);
}

function relative(file) {
  return path.relative(root, file).split(path.sep).join("/");
}

function readText(file) {
  return fs.readFileSync(file, "utf8");
}

function isPlaceholderValue(rawValue) {
  const value = rawValue.trim().replace(/^['"]|['"]$/g, "");
  if (value === "") return true;
  if (value.includes("<") && value.includes(">")) return true;
  if (/^(your|example|placeholder|sample)[-_a-z0-9./]*$/i.test(value)) return true;
  if (/^(local|none|s3|s3-vectors|bedrock|openai|custom)$/i.test(value)) return true;
  if (value === "./ui-knowledge" || value === "ui-knowledge/") return true;
  return false;
}

function listedFiles() {
  const result = spawnSync("git", ["ls-files", "--cached", "--others", "--exclude-standard"], {
    cwd: root,
    encoding: "utf8",
    stdio: "pipe"
  });

  if (result.status === 0) {
    return result.stdout.split("\n").map((line) => line.trim()).filter(Boolean).sort();
  }

  fail(`git ls-files failed: ${result.stderr || result.stdout || result.error?.message}`);
  return [];
}

function assertGitignore() {
  const gitignorePath = path.join(root, ".gitignore");
  const requiredPatterns = [
    ".env",
    ".env.local",
    ".env.*.local",
    "ui-knowledge/",
    ".ui-knowledge-cloud.json",
    "ui-knowledge.remote.json"
  ];

  if (!fs.existsSync(gitignorePath)) {
    fail(".gitignore: file is missing");
    return;
  }

  const lines = new Set(readText(gitignorePath).split(/\r?\n/).map((line) => line.trim()));
  for (const pattern of requiredPatterns) {
    if (!lines.has(pattern)) fail(`.gitignore: missing ${pattern}`);
  }
}

function assertEnvExample() {
  const envExamplePath = path.join(root, ".env.example");
  if (!fs.existsSync(envExamplePath)) {
    fail(".env.example: file is missing");
    return;
  }

  const text = readText(envExamplePath);
  for (const key of knowledgeEnvKeyList) {
    if (!new RegExp(`^${key}=`, "m").test(text)) {
      fail(`.env.example: missing ${key}`);
    }
  }

  for (const line of text.split(/\r?\n/)) {
    const match = line.match(/^([A-Z0-9_]+)=(.*)$/);
    if (!match) continue;
    const [, key, value] = match;
    if (knowledgeEnvKeyList.includes(key) && !isPlaceholderValue(value)) {
      fail(`.env.example: ${key} must be empty or placeholder-only`);
    }
  }
}

function assertDocsMentionEnvContract() {
  const docsPath = path.join(root, "docs", "knowledge", "remote-storage-configuration.md");
  if (!fs.existsSync(docsPath)) {
    fail("docs/knowledge/remote-storage-configuration.md: file is missing");
    return;
  }

  const text = readText(docsPath);
  for (const key of knowledgeEnvKeyList) {
    if (!text.includes(key)) fail(`docs/knowledge/remote-storage-configuration.md: missing ${key}`);
  }
}

function scanFileForLeaks(file) {
  const absolute = path.join(root, file);
  if (!fs.existsSync(absolute)) return;
  if (fs.statSync(absolute).size > 1_000_000) return;

  let text = "";
  try {
    text = readText(absolute);
  } catch {
    return;
  }

  const checks = [
    {
      label: "AWS access key ID",
      pattern: /\b(?:AKIA|ASIA)[A-Z0-9]{16}\b/g
    },
    {
      label: "AWS secret access key assignment",
      pattern: /\b(?:AWS_SECRET_ACCESS_KEY|aws_secret_access_key)\s*=\s*([^\s#]+)/g
    },
    {
      label: "AWS session token assignment",
      pattern: /\b(?:AWS_SESSION_TOKEN|aws_session_token)\s*=\s*([^\s#]+)/g
    },
    {
      label: "account-specific AWS ARN",
      pattern: /\barn:aws[a-z-]*:[^\s:]+:[^\s:]*:\d{12}:[^\s)'"`]+/g
    },
    {
      label: "signed AWS URL",
      pattern: new RegExp(`\\b(?:${"X-Amz-"}${"Signature="}|${"AWSAccess"}${"KeyId="})`, "g")
    },
    {
      label: "concrete S3 URL",
      pattern: /\bs3:\/\/(?!<)([a-z0-9][a-z0-9.-]{1,61}[a-z0-9])(?:\/[^\s)'"`]*)?/g
    }
  ];

  for (const { label, pattern } of checks) {
    for (const match of text.matchAll(pattern)) {
      const value = match[1] ?? match[0];
      if (isPlaceholderValue(value)) continue;
      fail(`${file}: possible ${label} committed; replace with env variable or placeholder`);
    }
  }

  const privateEnvKeys = [
    knowledgeEnvKeys.s3Bucket,
    knowledgeEnvKeys.vectorBucket,
    knowledgeEnvKeys.vectorIndex
  ];
  for (const key of privateEnvKeys) {
    const pattern = new RegExp(`^${key}=([^\\r\\n#]+)`, "gm");
    for (const match of text.matchAll(pattern)) {
      const value = match[1] ?? "";
      if (!isPlaceholderValue(value)) {
        fail(`${file}: ${key} must not contain a committed real value`);
      }
    }
  }
}

assertGitignore();
assertEnvExample();
assertDocsMentionEnvContract();

for (const file of listedFiles()) {
  scanFileForLeaks(file);
}

if (checkRemoteEnv) {
  const config = loadKnowledgeEnv();
  const missing = missingKnowledgeEnv(config);
  if (missing.length > 0) {
    fail(formatMissingKnowledgeEnvMessage(missing));
  }
  console.log("Remote knowledge env diagnostic:");
  console.log(JSON.stringify(redactKnowledgeConfig(config), null, 2));
}

if (errors.length > 0) {
  console.error("Knowledge env validation failed:");
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log("Knowledge env validation passed.");
