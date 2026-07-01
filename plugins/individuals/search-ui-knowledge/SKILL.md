---
name: search-ui-knowledge
description: Retrieve relevant reusable UI pattern records from a knowledge index for a brief, page type, section, component, or conversion goal.
license: See repository LICENSE
---

# Search UI Knowledge

Use this skill when a brief or blueprint request needs relevant reusable pattern
knowledge before planning or generation.

## Purpose

Turn a project brief into query tags, search a knowledge index, and return a
compact set of relevant patterns with reasons.

## Philosophy

Retrieval is a judgment step, not keyword matching alone. A good match explains
why the pattern applies and what it should influence. A bad match pollutes the
blueprint with generic advice.

## References

- `references/knowledge-search.md`
- `../../../.convention/knowledge/schemas/knowledge-index.schema.json`
- `../../../.convention/knowledge/schemas/pattern-record.schema.json`
- `../../../.convention/knowledge/vocabulary/knowledge-tags.json`

## Decision Criteria

1. Match on the highest-signal tags first: page type, section/component type,
   conversion goal, interaction type, audience, and industry.
2. Prefer accepted, validated, or higher-confidence records when relevance is
   similar.
3. Return reasons and recommended use, not just IDs.
4. Exclude deprecated records unless explicitly auditing lineage or history.
5. Preserve any `storageRef` returned by local indexes or remote retrieval so
   downstream skills can fetch the full record before applying it.

## Boundary

- Owns: query interpretation, retrieval, ranking explanation, and match summary.
- Does not own: creating pattern records, curating status, or generating final
  blueprint JSON.

## Rules

1. Keep result sets small enough for planning.
2. Explain missing matches and tag gaps.
3. Do not use raw study notes as search results when pattern records exist.
4. Surface assumptions when the brief lacks key query dimensions.
5. Use provider-neutral retrieval language: local index, vector-backed search,
   canonical storage reference, and fetched pattern record.

## Anti-Patterns

- Bag-of-tags retrieval: returning every partial match without usefulness.
- Industry overfit: ignoring page type or task because industry matches.
- Hidden rationale: returning pattern IDs without why they apply.
- Deprecated reuse: applying records marked deprecated.
- Blind vector trust: accepting a ranked vector result without checking status,
  confidence, tags, retrieval reason, and freshness.
- Source copying: treating retrieved pattern knowledge as permission to copy a
  source design or captured page.

## Workflow

1. Parse the brief into query dimensions.
2. Use local index search by default; use vector-backed retrieval only when the
   environment/configuration provides it.
3. Filter by hard constraints and rank by tag overlap, confidence, status, and
   retrieval score or reason.
4. Return pattern IDs, retrieval reasons, recommended use, gaps, and any
   `storageRef` needed to fetch canonical records.

## Inline Example

Query: dentistry homepage, appointment booking, patients.

Return: `credibility-first-healthcare-hero` for hero trust building and
`sticky-appointment-cta` for long-page mobile conversion support.

## Hand-Offs

- Use `generate-blueprint-from-knowledge` after selecting patterns.
- Use `curate-ui-knowledge` if search results are noisy or duplicated.
- Use `index-knowledge-base` if the index is stale.
