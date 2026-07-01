---
name: generate-copy-from-knowledge
description: Generate draft UX copy from retrieved content knowledge patterns while preserving source, confidence, status, and review risks.
license: See repository LICENSE
---

# Generate Copy From Knowledge

Use this skill when retrieved copy, journey, objection, or voice patterns should
inform new draft copy.

## Purpose

Apply content knowledge patterns to generate draft copy for content models,
prototype content, CTAs, forms, sections, or components.

## Philosophy

Knowledge informs copy; it is not a copy-paste source. Generated copy should be
adapted to the new audience, journey stage, node, and brand voice.

## Decision Criteria

1. Use this after content knowledge retrieval.
2. Require audience, journey stage, and node or component context.
3. Preserve pattern IDs in `basedOn` or notes.

## Boundary

- Owns: draft copy informed by retrieved content knowledge.
- Does not own: retrieval implementation, pattern curation, production
  approval, or hidden copying from source pages.

## References

- `../../../.convention/content/content-pattern-library.md`
- `../../../.convention/knowledge/schemas/copy-pattern.schema.json`
- `../../../.convention/knowledge/schemas/voice-profile.schema.json`
- `../../../.convention/schemas/content-model.schema.json`

## Rules

1. Cite selected pattern IDs in metadata.
2. Adapt patterns to the current node and journey stage.
3. Do not reuse exact protected wording from external sources.
4. Mark generated output as draft unless approved.
5. Prefer retrieved `copyPattern` records over generic content patterns when
   they are more specific, sourced, and confidence-scored.

## Anti-Patterns

- Treating retrieved examples as approved copy.
- Ignoring brand voice.
- Dropping source or confidence metadata.

## Workflow

1. Review retrieved content patterns and current artifact context.
2. Select applicable pattern structure and voice guidance.
3. Generate node-fit draft copy.
4. Record source, confidence, status, and review risks.

## Inline Example

```json
{
  "copy": {
    "headline": {
      "value": "A clearer way to compare clinical lighting",
      "source": "derivedFromKnowledge",
      "confidence": "medium",
      "status": "draft",
      "basedOn": ["problem-solution-proof-cta"]
    }
  }
}
```

## Hand-Offs

Hand off retrieval to `search-ui-knowledge`, content-model assembly to
`generate-content-model-from-blueprint`, and copy quality review to
`audit-prototype-copy`.
