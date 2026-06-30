---
name: curate-ui-knowledge
description: Review, deduplicate, tag, merge, accept, deprecate, or promote reusable UI pattern knowledge records.
license: See repository LICENSE
---

# Curate UI Knowledge

Use this skill when candidate pattern records need review before they become
trusted retrieval inputs.

## Purpose

Keep the knowledge base useful by removing noise, merging duplicates, improving
tags, and managing confidence and status.

## Philosophy

A knowledge base gets worse when every observation is saved. Curation protects
retrieval quality by making fewer, clearer, better-supported records available
for future blueprint work.

## References

- `references/knowledge-curation.md`
- `../../../knowledge/schemas/pattern-record.schema.json`
- `../../../knowledge/vocabulary/confidence-levels.json`
- `../../../knowledge/vocabulary/pattern-statuses.json`
- `../../../knowledge/vocabulary/knowledge-tags.json`

## Decision Criteria

1. Accept patterns that are reusable, evidence-backed, clearly tagged, and not
   duplicate of a better record.
2. Merge patterns that describe the same structural decision at the same level.
3. Lower confidence or keep `candidate` when support is thin.
4. Deprecate patterns that are outdated, harmful, too narrow, or superseded.

## Boundary

- Owns: curation judgment, tags, status, confidence, merge notes, and duplicate
  prevention.
- Does not own: raw extraction, search ranking, or blueprint assembly.

## Rules

1. Do not promote confidence without a reason.
2. Preserve source references when merging.
3. Prefer precise tags over broad retrieval bait.
4. Keep deprecated or merged records only when traceability is useful.

## Anti-Patterns

- Knowledge hoarding: accepting every candidate because storage is cheap.
- Duplicate drift: many near-identical patterns split retrieval quality.
- Confidence inflation: treating common-sense advice as validated evidence.
- Tag dilution: broad tags make every query match every pattern.

## Workflow

1. Read candidate records and the existing index.
2. Compare IDs, names, summaries, tags, and wireframe mappings.
3. Decide accept, revise, merge, deprecate, or reject.
4. Update confidence and status with reasons.
5. Rebuild and validate the index after changes.

## Inline Example

Two candidate sticky CTA patterns for appointment booking should merge when they
share the same trigger, placement, and conversion role; keep separate only if one
is mobile-only and the other is a desktop page-level pattern.

## Hand-Offs

- Use `extract-ui-pattern-knowledge` for new candidates.
- Use `index-knowledge-base` after curation changes.
- Use `search-ui-knowledge` to test whether tags retrieve the intended records.
