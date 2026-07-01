# UI Knowledge Format Foundation

This directory defines the reusable knowledge-base formats for
`ui-blueprint-skills`. It is not a warehouse for captured websites, client
research, competitor screenshots, or project-specific studies.

The repository owns the format layer:

- `.convention/knowledge/schemas/`: JSON schemas for source records, study wrappers, pattern
  records, audit insights, indexes, and blueprint lineage.
- `.convention/knowledge/vocabulary/`: controlled tokens for pattern types, source types,
  confidence levels, statuses, and knowledge tags.
- `.convention/knowledge/templates/`: markdown templates for hand-authored or reviewed
  knowledge artifacts.
- `.convention/knowledge/examples/`: small generic examples that demonstrate schema shape
  without copying real client or competitor archives.

User projects own the archive layer. Real captures, screenshots, studies,
audits, extracted patterns, generated blueprints, and lineage files should live
in a project-local `ui-knowledge/` workspace created for that project.

Sprint 007 defines an optional remote archive and retrieval contract in
`docs/knowledge/remote-storage-contract.md`, with local-only configuration
instructions in `docs/knowledge/remote-storage-configuration.md` and user AWS
setup guidance in `docs/knowledge/aws-user-setup.md`. The short version is:

```txt
normal S3 bucket       = canonical knowledge records and generated artifacts
S3 vector bucket/index = semantic retrieval index over selected records
```

S3 Vectors is a retrieval index, not the source of truth. Local `ui-knowledge/`
archives remain the default when remote storage environment variables are not
configured.

## Project-Local Archive Shape

A project-local archive should be disposable and client/project scoped:

```txt
ui-knowledge/
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

Do not commit project-local `ui-knowledge/` archives to this repository unless a
future task explicitly adds sanitized fixtures under `.convention/knowledge/examples/`.

## Artifact Levels

The knowledge system has distinct artifact levels. Keeping them separate
prevents raw observations from becoming copyable design instructions.

| Level | Artifact | Responsibility |
| --- | --- | --- |
| 1 | Capture | Stores page evidence such as URL metadata, screenshots, extracted DOM/text, and raw capture files. |
| 2 | Study | Records evidence-backed observations from study skills. `StudyOutput` answers what was observed. |
| 3 | Audit | Evaluates quality, risk, gaps, severity, and remediation. Audit reports answer what is strong, weak, missing, or risky. |
| 4 | Pattern Knowledge | Extracts reusable UI structure, behavior, hierarchy, conversion logic, accessibility constraints, or responsive rules from evidence. |
| 5 | Knowledge Index | Summarizes pattern records for fast lookup by tags such as industry, page type, section type, conversion goal, and confidence. |
| 6 | Blueprint | Applies selected patterns to a new planned UI structure or UIBlueprint wireframe. |
| 7 | Lineage | Records which patterns influenced a generated blueprint and why. |

Sprint 008 adds content-specific knowledge records for realistic prototypes and
node-tied copy generation:

- `copy-patterns/`: reusable headline, body, CTA, section, component, and
  microcopy structures.
- `journey-patterns/`: reusable audience-goal, journey-stage, objection, and
  conversion path logic.
- `cta-patterns/`: reusable action-label sets and CTA decision rules. These can
  use `copy-pattern.schema.json` until a narrower CTA schema is needed.
- `microcopy-patterns/`: reusable labels, helper text, errors,
  confirmations, empty states, and dialog copy. These can use
  `copy-pattern.schema.json` until a narrower microcopy schema is needed.
- `objection-patterns/`: reusable user concerns and response strategies.
- `voice-profiles/`: reusable tone, vocabulary, and content-rule profiles.
- `industry-language/`: curated terminology notes and domain phrase guidance.

## Evidence vs Reusable Knowledge

`StudyOutput` stays evidence-based. It should preserve source observations,
interpretations, and downstream handoff notes without pretending one observed
page is a reusable rule.

Pattern records carry reusable knowledge. A pattern record should abstract from
one or more studies or audits into a reusable recommendation, retain source
references, declare confidence, and avoid copying exact page composition.

In short:

- Study output answers: what did we observe?
- Audit output answers: what is strong, weak, missing, or risky?
- Pattern knowledge answers: what reusable design pattern can be applied later?
- Blueprint output answers: what should be built or wireframed now?

## Sprint 003 Boundary

Sprint 003 establishes this directory and the format foundation. Later Sprint
003 tasks will add vocabulary, templates, examples, validation scripts,
workspace initialization, skills, commands, agents, and bundle packaging.

Initial schemas are defined in `.convention/knowledge/schemas/`:

- `source-record.schema.json`
- `study-record.schema.json`
- `pattern-record.schema.json`
- `audit-insight.schema.json`
- `knowledge-index.schema.json`
- `blueprint-lineage.schema.json`

Sprint 008 content knowledge schemas are also defined in `.convention/knowledge/schemas/`:

- `copy-pattern.schema.json`
- `journey-pattern.schema.json`
- `objection-pattern.schema.json`
- `voice-profile.schema.json`

## Validation And Indexing

Knowledge records are checked by deterministic scripts:

```bash
npm run validate:knowledge
npm run validate:knowledge-index
```

`validate:knowledge` checks schema shape, unique pattern IDs, approved tag
vocabulary, approved confidence/status values, required `sourceRefs`, and
wireframe mapping vocabulary. It also rejects credentials, signed AWS URLs,
account-specific ARNs, and concrete S3 URIs in committed examples; storage
references must use local paths or placeholder S3 URIs.
`validate:knowledge-index` verifies that
`.convention/knowledge/examples/knowledge-index.example.json` is generated from the seed
pattern records.

These checks intentionally do not judge whether a pattern is strategically good,
whether its confidence should be raised, or whether it should be merged with a
near-duplicate. Those remain curation and review responsibilities.

## Workspace Initialization

Create a project-local archive with:

```bash
node scripts/init-knowledge-workspace.mjs --out ./ui-knowledge
```

The script creates an empty `index.json`, source/page capture folders, study and
audit folders, pattern folders, generated blueprint storage, and lineage
storage. Use `--check` to validate the planned structure without writing files:

```bash
node scripts/init-knowledge-workspace.mjs --out ./ui-knowledge --check
```

The initialized workspace belongs to the user project. Keep real captures,
screenshots, studies, audits, and generated client work out of this plugin
repository unless they are intentionally sanitized as examples.

## Storage Sync And Fetch

Local storage is the default:

```bash
node scripts/sync-knowledge-storage.mjs --patterns .convention/knowledge/examples --provider local --dry-run
```

S3 storage is configured with environment variables from `.env.example` or
`docs/knowledge/remote-storage-configuration.md`. Use dry-run first to validate
planned canonical keys without AWS credentials or network access:

```bash
node scripts/sync-knowledge-storage.mjs --patterns .convention/knowledge/examples --provider s3 --dry-run
```

Fetch a canonical record by storage reference, S3 URI, or local path:

```bash
node scripts/fetch-knowledge-storage.mjs --s3-uri "s3://<bucket>/ui-knowledge/patterns/<pattern-id>.pattern.json" --dry-run
node scripts/fetch-knowledge-storage.mjs --local-path ./ui-knowledge/patterns/<pattern-id>.pattern.json --out /tmp/pattern.json
```

The S3 adapter loads `@aws-sdk/client-s3` only for non-dry-run S3 operations,
so offline validation does not require AWS packages or credentials. Command
diagnostics redact bucket, prefix, key, region, version, and local path values.

Content knowledge records follow the same local-first storage rule as UI
pattern records. Local archives should store them under `ui-knowledge/content/`.
Optional S3 storage should preserve the same relative shape under the configured
prefix, for example
`s3://<bucket>/<prefix>/content/copy-patterns/<pattern-id>.copy-pattern.json`.
Remote vector retrieval may project content records later, but canonical
content records remain schema-valid JSON files in local or normal S3 storage.

## Vector Projection And Query

Pattern records can be projected into vector-ready records:

```bash
node scripts/index-knowledge-vectors.mjs --patterns .convention/knowledge/examples --provider mock --mock-embeddings --out /tmp/ui-knowledge-vectors.json --dry-run
```

Query deterministic mock records locally:

```bash
node scripts/query-knowledge-vectors.mjs --query "dentistry homepage appointment booking trust hero" --records /tmp/ui-knowledge-vectors.json --filter pageTypes=homepage
```

The vector projection includes summary, tags, `useWhen`, `avoidWhen`,
structure, wireframe mapping, and blueprint impact. Metadata keeps filterable
pattern ID, type, category, confidence, status, tags, and canonical storage
references. Real S3 vector writes remain optional and require user-configured
credentials plus optional SDK packages; normal validation uses mocks.
