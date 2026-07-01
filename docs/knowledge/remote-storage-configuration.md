# Remote Storage Configuration

Remote UI knowledge storage is optional. Local `ui-knowledge/` archives remain
the default unless a user configures remote storage in their own environment.

Committed files may include variable names and empty placeholders only. Keep
real bucket names, S3 URLs, vector index names, AWS account IDs, ARNs, signed
URLs, access keys, secret keys, and session tokens out of git history.

For end-to-end AWS setup steps, IAM guidance, smoke checks, and
troubleshooting, see `docs/knowledge/aws-user-setup.md`.

## Environment Variables

```bash
UI_KNOWLEDGE_STORAGE_PROVIDER=local
UI_KNOWLEDGE_LOCAL_DIR=./ui-knowledge
UI_KNOWLEDGE_S3_BUCKET=
UI_KNOWLEDGE_S3_PREFIX=ui-knowledge/

UI_KNOWLEDGE_VECTOR_PROVIDER=none
UI_KNOWLEDGE_VECTOR_BUCKET=
UI_KNOWLEDGE_VECTOR_INDEX=

UI_KNOWLEDGE_AWS_REGION=
UI_KNOWLEDGE_EMBEDDING_PROVIDER=
UI_KNOWLEDGE_EMBEDDING_MODEL=
```

`UI_KNOWLEDGE_STORAGE_PROVIDER` accepts `local` or `s3`. When it is `s3`,
`UI_KNOWLEDGE_S3_BUCKET`, `UI_KNOWLEDGE_S3_PREFIX`, and
`UI_KNOWLEDGE_AWS_REGION` are required.

`UI_KNOWLEDGE_VECTOR_PROVIDER` accepts `none` or `s3-vectors`. When it is
`s3-vectors`, `UI_KNOWLEDGE_VECTOR_BUCKET`, `UI_KNOWLEDGE_VECTOR_INDEX`,
`UI_KNOWLEDGE_AWS_REGION`, `UI_KNOWLEDGE_EMBEDDING_PROVIDER`, and
`UI_KNOWLEDGE_EMBEDDING_MODEL` are required.

`UI_KNOWLEDGE_EMBEDDING_PROVIDER` names the service that creates embeddings
used by the vector index. Planned values are `bedrock`, `openai`, or `custom`.

## Local Setup

Use one of these local-only configuration paths:

- export values in the shell before running a skill or script
- copy `.env.example` to `.env.local` and keep `.env.local` ignored
- use an AWS profile configured outside the repository
- use AWS SSO or an IAM role instead of committed access keys
- use generated local cloud config files only when they match ignored names

Example shell setup:

```bash
export UI_KNOWLEDGE_STORAGE_PROVIDER=s3
export UI_KNOWLEDGE_S3_BUCKET=<your-normal-s3-bucket>
export UI_KNOWLEDGE_S3_PREFIX=ui-knowledge/
export UI_KNOWLEDGE_VECTOR_PROVIDER=s3-vectors
export UI_KNOWLEDGE_VECTOR_BUCKET=<your-vector-bucket>
export UI_KNOWLEDGE_VECTOR_INDEX=<your-vector-index>
export UI_KNOWLEDGE_AWS_REGION=<your-aws-region>
export UI_KNOWLEDGE_EMBEDDING_PROVIDER=bedrock
export UI_KNOWLEDGE_EMBEDDING_MODEL=<your-embedding-model>
```

The repository validator intentionally accepts missing remote env vars in normal
local mode. Run the remote-env check only when validating a configured machine:

```bash
npm run validate:knowledge-env -- --check-remote-env
```

Diagnostics redact configured bucket, prefix, vector index, region, and model
values before printing them.

## Canonical Storage Commands

Plan canonical S3 keys without contacting AWS:

```bash
node scripts/sync-knowledge-storage.mjs --patterns knowledge/examples --provider s3 --dry-run
```

Sync local pattern records to the configured canonical storage:

```bash
node scripts/sync-knowledge-storage.mjs --patterns knowledge/examples
```

Fetch a full canonical record by storage reference or URI:

```bash
node scripts/fetch-knowledge-storage.mjs --s3-uri "s3://<bucket>/ui-knowledge/patterns/<pattern-id>.pattern.json" --dry-run
```

Non-dry-run S3 commands require a locally available `@aws-sdk/client-s3`
package plus AWS credentials from a profile, SSO session, environment, or IAM
role. The package is optional so repository validation continues to work
offline.

## Vector Index Commands

Plan vector records without generating embeddings or contacting AWS:

```bash
node scripts/index-knowledge-vectors.mjs --patterns knowledge/examples --provider s3-vectors --dry-run
```

Generate deterministic mock embeddings for local validation:

```bash
node scripts/index-knowledge-vectors.mjs --patterns knowledge/examples --provider mock --mock-embeddings --out /tmp/ui-knowledge-vectors.json --dry-run
node scripts/query-knowledge-vectors.mjs --query "homepage appointment booking" --records /tmp/ui-knowledge-vectors.json --filter pageTypes=homepage
```

Real S3 vector indexing requires configured vector env vars, an embedding
provider/model, credentials for that provider, and an optional local SDK package
for the selected provider:

- S3 Vectors writes use `@aws-sdk/client-s3vectors`.
- Bedrock embeddings use `@aws-sdk/client-bedrock-runtime`.
- OpenAI embeddings use `OPENAI_API_KEY` from the local environment.

Vector metadata includes pattern ID, pattern type, category, confidence, status,
knowledge tags, and the canonical storage reference. Query output returns ranked
pattern IDs, scores, reasons, and redacted fetch pointers.

## Optional Remote Smoke Command

Default validation never contacts AWS. The remote smoke command skips unless
you explicitly opt in:

```bash
npm run smoke:knowledge-remote
npm run smoke:knowledge-remote -- --remote
npm run smoke:knowledge-remote -- --remote --write
```

`--remote` checks that required env vars exist and runs remote dry-run planning.
`--remote --write` performs real canonical storage and vector writes using your
configured AWS resources.
