# AWS Setup For Remote UI Knowledge

This guide shows how to connect your own AWS resources to the optional remote
`ui-knowledge` layer without editing committed source files.

Keep all real bucket names, account IDs, ARNs, signed URLs, access keys, secret
keys, and session tokens in your local shell, AWS profile, SSO session, IAM
role, or ignored local env files. Committed examples must use placeholders.

Official AWS references:

- [Amazon S3 getting started](https://docs.aws.amazon.com/AmazonS3/latest/userguide/GetStartedWithS3.html)
- [S3 policy actions](https://docs.aws.amazon.com/AmazonS3/latest/userguide/using-with-s3-policy-actions.html)
- [S3 Vectors overview](https://docs.aws.amazon.com/AmazonS3/latest/userguide/s3-vectors.html)

## Beginner Model

Use two AWS storage concepts:

```txt
normal S3 bucket
  stores canonical JSON/files that must remain fetchable and schema-valid

S3 vector bucket + vector index
  stores embeddings and metadata for semantic search
  points back to canonical records in the normal S3 bucket
```

The normal S3 bucket is the source of truth. If the vector index is stale or
deleted, it can be rebuilt from canonical pattern records.

## Local First

Remote storage is optional. Local mode is the default:

```bash
export UI_KNOWLEDGE_STORAGE_PROVIDER=local
export UI_KNOWLEDGE_LOCAL_DIR=./ui-knowledge
export UI_KNOWLEDGE_VECTOR_PROVIDER=none
```

Validate local behavior without AWS:

```bash
npm run validate:knowledge
npm run validate:knowledge-index
npm run validate:knowledge-storage
npm run validate:knowledge-vectors
```

## Credential-Safe Validation

`npm run validate` is safe to run without any AWS credentials. When
`UI_KNOWLEDGE_S3_BUCKET`, `UI_KNOWLEDGE_S3_PREFIX`, and
`UI_KNOWLEDGE_AWS_REGION` are not configured, the cloud-dependent validators
log a `[SKIP]` line and exit with code 0 instead of failing:

```txt
[SKIP] Knowledge storage validation skipped: UI_KNOWLEDGE_S3_BUCKET, ...
[SKIP] Knowledge remote smoke skipped. Pass --remote to opt in.
```

This means contributors can run the full validation chain offline without any
AWS setup.

When credentials are configured, use `validate:cloud` to run the full remote
chain against your environment:

```bash
npm run validate:cloud
```

`validate:cloud` requires `UI_KNOWLEDGE_S3_BUCKET`, `UI_KNOWLEDGE_S3_PREFIX`,
`UI_KNOWLEDGE_AWS_REGION`, `UI_KNOWLEDGE_VECTOR_BUCKET`,
`UI_KNOWLEDGE_VECTOR_INDEX`, `UI_KNOWLEDGE_EMBEDDING_PROVIDER`, and
`UI_KNOWLEDGE_EMBEDDING_MODEL`. It runs storage and vector dry-run checks
without performing real writes. Pass `--write` to `smoke:knowledge-remote` for
real storage writes.

## Normal S3 Bucket

Create or choose one general purpose S3 bucket for canonical `ui-knowledge`
records:

```bash
aws s3api create-bucket \
  --bucket <your-normal-s3-bucket> \
  --region <your-aws-region>
```

Recommended bucket settings:

- Keep Block Public Access enabled.
- Keep ACLs disabled.
- Use the same AWS Region as your vector bucket and embedding provider.
- Enable versioning when you want rollback or audit history.
- Use the default encryption your organization requires.
- Do not put sensitive project names in the bucket name.

Recommended canonical prefix:

```txt
ui-knowledge/
```

The storage sync script plans keys such as:

```txt
s3://<your-normal-s3-bucket>/ui-knowledge/patterns/<pattern-id>.pattern.json
```

Run a no-network dry run:

```bash
export UI_KNOWLEDGE_STORAGE_PROVIDER=s3
export UI_KNOWLEDGE_S3_BUCKET=<your-normal-s3-bucket>
export UI_KNOWLEDGE_S3_PREFIX=ui-knowledge/
export UI_KNOWLEDGE_AWS_REGION=<your-aws-region>

node scripts/sync-knowledge-storage.mjs --patterns .convention/knowledge/examples --provider s3 --dry-run
```

## S3 Vector Bucket And Index

Create or choose one S3 vector bucket and one vector index for pattern
retrieval. S3 Vectors stores vectors separately from normal S3 objects; vector
indexes live inside vector buckets.

Use the AWS console or current AWS CLI/SDK support for S3 Vectors to create:

```txt
vector bucket: <your-vector-bucket>
vector index:  <your-vector-index>
region:        <your-aws-region>
```

Recommended vector metadata:

- `patternId`
- `patternType`
- `category`
- `confidence`
- `status`
- knowledge tag arrays such as `pageTypes`, `sectionTypes`, and `audiences`
- canonical `storageRef`

Run an offline vector projection dry run:

```bash
export UI_KNOWLEDGE_VECTOR_PROVIDER=s3-vectors
export UI_KNOWLEDGE_VECTOR_BUCKET=<your-vector-bucket>
export UI_KNOWLEDGE_VECTOR_INDEX=<your-vector-index>
export UI_KNOWLEDGE_AWS_REGION=<your-aws-region>
export UI_KNOWLEDGE_EMBEDDING_PROVIDER=bedrock
export UI_KNOWLEDGE_EMBEDDING_MODEL=<your-embedding-model>

node scripts/index-knowledge-vectors.mjs --patterns .convention/knowledge/examples --provider s3-vectors --dry-run
```

Run deterministic local mock retrieval:

```bash
node scripts/index-knowledge-vectors.mjs \
  --patterns .convention/knowledge/examples \
  --provider mock \
  --mock-embeddings \
  --out /tmp/ui-knowledge-vectors.json \
  --dry-run

node scripts/query-knowledge-vectors.mjs \
  --query "homepage appointment booking" \
  --records /tmp/ui-knowledge-vectors.json \
  --filter pageTypes=homepage
```

## Environment Setup

Use shell exports for quick testing:

```bash
export UI_KNOWLEDGE_STORAGE_PROVIDER=s3
export UI_KNOWLEDGE_LOCAL_DIR=./ui-knowledge
export UI_KNOWLEDGE_S3_BUCKET=<your-normal-s3-bucket>
export UI_KNOWLEDGE_S3_PREFIX=ui-knowledge/

export UI_KNOWLEDGE_VECTOR_PROVIDER=s3-vectors
export UI_KNOWLEDGE_VECTOR_BUCKET=<your-vector-bucket>
export UI_KNOWLEDGE_VECTOR_INDEX=<your-vector-index>

export UI_KNOWLEDGE_AWS_REGION=<your-aws-region>
export UI_KNOWLEDGE_EMBEDDING_PROVIDER=bedrock
export UI_KNOWLEDGE_EMBEDDING_MODEL=<your-embedding-model>
```

Or copy `.env.example` to `.env.local` and keep `.env.local` ignored:

```bash
cp .env.example .env.local
```

Do not commit `.env.local`.

Check that required values are present without printing secrets:

```bash
npm run validate:knowledge-env -- --check-remote-env
```

## IAM Guidance

Prefer AWS SSO, an AWS profile, or an IAM role. Avoid long-lived access keys.
Grant only the resources and actions required by your workflow.

Canonical S3 read/write/list needs:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "ListKnowledgePrefix",
      "Effect": "Allow",
      "Action": ["s3:ListBucket"],
      "Resource": "arn:aws:s3:::<your-normal-s3-bucket>",
      "Condition": {
        "StringLike": {
          "s3:prefix": ["ui-knowledge/*"]
        }
      }
    },
    {
      "Sid": "ReadWriteKnowledgeObjects",
      "Effect": "Allow",
      "Action": [
        "s3:GetObject",
        "s3:PutObject"
      ],
      "Resource": "arn:aws:s3:::<your-normal-s3-bucket>/ui-knowledge/*"
    }
  ]
}
```

S3 Vectors access uses the `s3vectors` namespace. Scope resources to your vector
bucket and index when your organization has the exact ARN format available:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "UseKnowledgeVectorIndex",
      "Effect": "Allow",
      "Action": [
        "s3vectors:GetVectorBucket",
        "s3vectors:GetIndex",
        "s3vectors:PutVectors",
        "s3vectors:QueryVectors"
      ],
      "Resource": [
        "arn:aws:s3vectors:<your-aws-region>:<your-account-id>:bucket/<your-vector-bucket>",
        "arn:aws:s3vectors:<your-aws-region>:<your-account-id>:bucket/<your-vector-bucket>/index/<your-vector-index>"
      ]
    }
  ]
}
```

If your embedding provider is Bedrock, also grant only the selected model:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "InvokeEmbeddingModel",
      "Effect": "Allow",
      "Action": ["bedrock:InvokeModel"],
      "Resource": "arn:aws:bedrock:<your-aws-region>::foundation-model/<your-embedding-model>"
    }
  ]
}
```

If your embedding provider is OpenAI, keep `OPENAI_API_KEY` in your local
environment or secret manager. Do not put it in committed files.

## Optional Remote Smoke Checks

Run these after configuring your AWS account. Start with dry-run:

```bash
npm run validate:knowledge-env -- --check-remote-env
node scripts/sync-knowledge-storage.mjs --patterns .convention/knowledge/examples --provider s3 --dry-run
node scripts/index-knowledge-vectors.mjs --patterns .convention/knowledge/examples --provider s3-vectors --dry-run
npm run smoke:knowledge-remote -- --remote
```

Then run real writes only when you intend to create or update remote data:

```bash
node scripts/sync-knowledge-storage.mjs --patterns .convention/knowledge/examples --provider s3
node scripts/index-knowledge-vectors.mjs --patterns .convention/knowledge/examples --provider s3-vectors
npm run smoke:knowledge-remote -- --remote --write
```

Query the vector index or a local mock fixture:

```bash
node scripts/query-knowledge-vectors.mjs \
  --query "homepage appointment booking" \
  --provider s3-vectors \
  --filter pageTypes=homepage
```

## Troubleshooting

| Symptom | Likely Cause | Fix |
| --- | --- | --- |
| Missing env vars | Remote mode is enabled but required variables are empty. | Run `npm run validate:knowledge-env -- --check-remote-env`; set values in shell, `.env.local`, AWS profile, SSO, or IAM role. |
| Wrong Region | Bucket, vector index, or embedding model is in a different Region. | Use one `UI_KNOWLEDGE_AWS_REGION` for storage, vectors, and embeddings when possible. |
| Access denied for S3 | IAM policy lacks list/read/write on the canonical prefix. | Add `s3:ListBucket` for the prefix and `s3:GetObject`/`s3:PutObject` for objects. |
| Access denied for vectors | IAM policy lacks `s3vectors` actions or uses the wrong vector resource. | Grant vector bucket/index permissions with the `s3vectors` namespace. |
| Missing vector index | Vector bucket exists but the named index does not. | Create the vector index or update `UI_KNOWLEDGE_VECTOR_INDEX`. |
| Stale search results | Canonical records changed but vector records were not rebuilt. | Re-run storage sync, then re-run vector indexing. |
| Schema validation failure | Fetched canonical JSON does not match repository schemas. | Fix the canonical record locally, run `npm run validate:knowledge`, sync again, and rebuild vectors. |
| Signed URL or bucket leak in git | A real storage URL was added to a committed file. | Replace it with placeholders and run `npm run validate:knowledge-env`. |

## Safety Checklist

- Real values live only in shell env, ignored files, AWS profiles, SSO, IAM
  roles, or secret managers.
- Normal S3 bucket stores canonical records.
- S3 vector bucket/index stores embeddings and metadata only.
- Vector metadata includes canonical storage references.
- Full pattern records are fetched and schema-validated before use.
- Curation changes are followed by local index rebuild, storage sync, and vector
  rebuild.
