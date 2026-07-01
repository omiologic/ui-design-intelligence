---
name: extract-copy-patterns-from-study
description: Extract reusable copy, CTA, microcopy, voice, and journey content patterns from evidence-backed study outputs.
license: See repository LICENSE
---

# Extract Copy Patterns From Study

Use this skill when a study contains reusable content or journey behavior that
should become knowledge records.

## Purpose

Extract copy patterns, CTA patterns, microcopy patterns, objection patterns,
journey patterns, or voice profiles from evidence-backed studies.

## Philosophy

Content knowledge should abstract reusable structure without copying client,
competitor, or private production text verbatim.

## Decision Criteria

1. Use this after study output identifies useful copy behavior.
2. Extract patterns only when reusable across contexts.
3. Preserve source references and confidence.

## Boundary

- Owns: reusable content-pattern extraction.
- Does not own: raw study capture, plagiarism, production copy reuse, SEO
  content strategy, or knowledge curation approval.

## References

- `../../../.convention/knowledge/schemas/copy-pattern.schema.json`
- `../../../.convention/knowledge/schemas/journey-pattern.schema.json`
- `../../../.convention/knowledge/schemas/objection-pattern.schema.json`
- `../../../.convention/knowledge/schemas/voice-profile.schema.json`

## Rules

1. Abstract patterns; do not copy exact page text unless explicitly provided by
   the user for reuse.
2. Include sourceRefs and confidence.
3. Mark candidate status unless reviewed.
4. Use the narrowest suitable schema.

## Anti-Patterns

- Turning one good headline into a universal rule.
- Copying competitor wording.
- Omitting evidence references.

## Workflow

1. Read study findings and source boundaries.
2. Identify reusable copy or journey behavior.
3. Choose copy, journey, objection, or voice schema.
4. Write candidate pattern record and review notes.

## Inline Example

```json
{
  "type": "copyPattern",
  "id": "trust-before-cta",
  "summary": "Place proof before asking users to book or inquire.",
  "status": "candidate"
}
```

## Hand-Offs

Hand off curation to `curate-ui-knowledge`, retrieval use to
`generate-copy-from-knowledge`, and journey strategy to
`generate-user-journey-map`.
