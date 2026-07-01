# Remote Knowledge Storage Contract

Sprint 007 adds an optional remote retrieval layer for project-local
`ui-knowledge/` archives. The repository still owns schemas, vocabulary,
templates, examples, skills, and validation. User projects own real captures,
studies, pattern records, generated blueprints, and lineage.

Remote storage must preserve that boundary:

```txt
normal S3 bucket       = canonical knowledge records and generated artifacts
S3 vector bucket/index = semantic retrieval index over selected records
```

S3 Vectors is not the source of truth. It is a search index that points back to
canonical records.

## Why Two Bucket Types

Use a normal S3 bucket for canonical artifacts because those files must remain
readable, auditable, versionable, and schema-valid:

- source records
- captures and optional evidence assets
- study records
- audit records
- pattern records
- knowledge indexes
- generated blueprints
- blueprint lineage records
- content knowledge records such as copy patterns, journey patterns, objection
  patterns, and voice profiles

Use an S3 vector bucket and vector index for retrieval because skills need fast
semantic matching over pattern knowledge:

- embeddings derived from selected pattern text
- metadata filters such as pattern type, page type, industry, confidence, and
  status
- similarity search results
- pointers to canonical S3 objects

The vector index can be rebuilt from canonical S3 records. Canonical S3 records
must not depend on the vector index to remain valid.

## Canonical Storage Responsibilities

Canonical storage contains the durable `ui-knowledge/` archive for a user or
project. A recommended object layout is:

```txt
s3://<bucket>/<prefix>/
  index.json
  sources/
    {source-id}/
      source.json
      pages/
        {page-id}/
          capture/
          studies/
          audits/
          patterns/
  patterns/
    pages/
    sections/
    components/
    interactions/
    storytelling/
    conversion/
  content/
    copy-patterns/
    journey-patterns/
    cta-patterns/
    microcopy-patterns/
    objection-patterns/
    voice-profiles/
    industry-language/
  blueprints/
    generated/
  lineage/
    blueprint-lineage/
```

Canonical records must remain valid against repository schemas after fetch.
Consumers should validate fetched records before using them in generation or
audit decisions.

## Vector Index Responsibilities

The vector index stores retrieval records derived from canonical pattern
records. A vector entry should contain:

- a stable key, usually the pattern record ID
- an embedding derived from selected pattern fields
- filterable metadata
- a canonical storage pointer

Recommended metadata:

```json
{
  "patternId": "credibility-first-healthcare-hero",
  "s3Uri": "s3://<bucket>/<prefix>/patterns/sections/hero/credibility-first-healthcare-hero.pattern.json",
  "patternType": "section",
  "category": "hero",
  "status": "accepted",
  "confidence": "high",
  "industries": ["healthcare", "dentistry"],
  "pageTypes": ["homepage"],
  "sectionTypes": ["hero"],
  "conversionGoals": ["appointmentBooking"]
}
```

Recommended embedding text projection:

```txt
name
summary
tags
useWhen
avoidWhen
structure.required
structure.optional
structure.notes
wireframeMapping
blueprintImpact
```

The repository implementation also projects pattern type, category, wireframe
content roles, recommended children, blueprint sections, blueprint
interactions, and notes so vector records preserve the planning context needed
by search and generation skills.

Sprint 008 content knowledge records should use the same canonical storage
contract. They may later be projected into vector records for copy and journey
retrieval, but normal S3 or local files remain the source of truth. Retrieval
metadata should keep the content record type, ID, status, confidence, industry,
page type, journey stage, conversion goal, and canonical storage pointer.

Do not embed raw private captures unless a user explicitly owns the storage,
privacy policy, and retention plan for those captures.

## Local Fallback

Remote storage is optional. When remote environment variables are absent, skills
and scripts should continue to use local files:

```bash
UI_KNOWLEDGE_STORAGE_PROVIDER=local
UI_KNOWLEDGE_LOCAL_DIR=./ui-knowledge
```

Local mode should remain the default for repository validation and examples.
Normal validation must not require AWS credentials, network access, bucket
names, or vector indexes.

## Environment Configuration

Committed files may name environment variables but must not contain real bucket
names, account IDs, ARNs, signed URLs, access keys, secret keys, or session
tokens.

The committed placeholder contract lives in `.env.example`; local setup
instructions live in `docs/knowledge/remote-storage-configuration.md`.

```bash
UI_KNOWLEDGE_STORAGE_PROVIDER=local|s3
UI_KNOWLEDGE_LOCAL_DIR=./ui-knowledge
UI_KNOWLEDGE_S3_BUCKET=
UI_KNOWLEDGE_S3_PREFIX=ui-knowledge/
UI_KNOWLEDGE_VECTOR_PROVIDER=none|s3-vectors
UI_KNOWLEDGE_VECTOR_BUCKET=
UI_KNOWLEDGE_VECTOR_INDEX=
UI_KNOWLEDGE_AWS_REGION=
UI_KNOWLEDGE_EMBEDDING_PROVIDER=bedrock|openai|custom
UI_KNOWLEDGE_EMBEDDING_MODEL=
```

Real values belong in the user's shell, AWS profile, SSO session, IAM role, or
ignored local config file.

## Retrieval Flow

Skills should retrieve remote knowledge in a staged flow:

```txt
1. Parse the user brief into query dimensions.
2. Build semantic query text and metadata filters.
3. Query the S3 vector index.
4. Receive ranked pattern IDs and canonical storage references.
5. Fetch full pattern JSON from normal S3.
6. Validate fetched records against repository schemas.
7. Apply selected records as decision context.
8. Generate blueprint, audit, design-system, or prototype output.
9. Write generated output and lineage to canonical storage when configured.
```

The skill should not blindly copy retrieved patterns. Retrieval supplies
evidence-backed decision context; the skill still owns task-specific judgment,
schema validity, and explicit lineage.

## Lineage Flow

Generated blueprint lineage should record:

- query dimensions
- selected pattern IDs
- why each pattern was used
- canonical storage references for selected records
- generated output references
- assumptions and unresolved gaps

This keeps remote retrieval explainable:

```txt
Why did this blueprint include a sticky CTA?
Which pattern record suggested it?
Which canonical record was fetched?
Which output did it influence?
```

## Later Adapter Options

Sprint 007 defaults to a schema-first S3 plus S3 Vectors contract.

Bedrock Knowledge Bases is a later adapter option when the product needs
managed ingestion, managed retrieval, citations, reranking, or agent-facing RAG
APIs. It should not replace canonical pattern records or lineage.

OpenSearch is a later adapter option when the product needs hybrid keyword and
vector search, richer faceting, heavier query volume, or advanced operational
search controls.

Both later adapters should consume the same canonical records and preserve the
same lineage contract.

## Adapter Boundary

Implementation tasks should add adapters behind stable operations:

```txt
loadConfig()
listCanonicalRecords()
fetchCanonicalRecord(ref)
putCanonicalRecord(ref, record)
projectPatternForEmbedding(record)
upsertVector(record)
queryVectors(query, filters)
writeLineage(record)
```

The skill layer should depend on these operations, not on hardcoded AWS
resource names.
