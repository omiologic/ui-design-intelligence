# Knowledge Search Reference

## Decision Heuristics

- Treat page type, section/component type, interaction type, and conversion goal
  as stronger than broad industry tags.
- Prefer higher status and confidence only after relevance is established.
- Always explain recommended use for each returned pattern.

## Anti-Pattern

- Do not return broad industry matches that do not affect the requested page or
  component.
- Do not hide weak assumptions behind confident retrieval language.
- Do not use deprecated patterns for new generation.

## Worked Example

A healthcare service page query with appointment booking should retrieve a
credibility-first hero and sticky appointment CTA before unrelated healthcare SEO
patterns.

## Hand-Off

Hand selected matches to `generate-blueprint-from-knowledge`. Hand noisy or
duplicative result sets to `curate-ui-knowledge`.
