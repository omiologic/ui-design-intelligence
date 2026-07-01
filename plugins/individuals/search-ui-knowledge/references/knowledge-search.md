# Knowledge Search Reference

## Decision Heuristics

- Treat page type, section/component type, interaction type, and conversion goal
  as stronger than broad industry tags.
- Prefer higher status and confidence only after relevance is established.
- Always explain recommended use for each returned pattern.
- Preserve canonical `storageRef` values with each result when available.

## Anti-Pattern

- Do not return broad industry matches that do not affect the requested page or
  component.
- Do not hide weak assumptions behind confident retrieval language.
- Do not use deprecated patterns for new generation.
- Do not treat vector rank as enough evidence to apply a pattern.
- Do not expose bucket names, signed URLs, account IDs, or secrets in results.

## Worked Example

A healthcare service page query with appointment booking should retrieve a
credibility-first hero and sticky appointment CTA before unrelated healthcare SEO
patterns.

## Local Or Vector Retrieval

Use the local `knowledge-index.schema.json` flow when remote vector storage is
not configured. When vector retrieval is configured, query projected pattern
records and preserve the returned canonical storage reference with each ranked
match so downstream skills can fetch the full validated pattern record.

Remote-capable result shape:

- pattern ID
- retrieval reason
- score or relative rank when supplied
- status and confidence
- matched filter dimensions
- canonical `storageRef`
- freshness or stale-index caveat when known

## Hand-Off

Hand selected matches to `generate-blueprint-from-knowledge`. Hand noisy or
duplicative result sets to `curate-ui-knowledge`.
