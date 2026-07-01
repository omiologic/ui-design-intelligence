---
name: explain-blueprint-lineage
description: Explain which reusable UI pattern records influenced a generated blueprint and why.
license: See repository LICENSE
---

# Explain Blueprint Lineage

Use this skill when a generated blueprint needs traceability back to pattern
knowledge, study evidence, or audit-derived insight.

## Purpose

Summarize which patterns influenced which blueprint decisions, why they matched,
and what assumptions or gaps remain.

## Philosophy

Lineage makes generated structure reviewable. It should help a designer,
developer, or stakeholder understand the reasoning behind pattern use without
having to inspect every source record.

## References

- `references/lineage-explanation.md`
- `../../../knowledge/schemas/blueprint-lineage.schema.json`
- `../../../knowledge/templates/blueprint-lineage.md`

## Decision Criteria

1. Tie each used pattern to a concrete blueprint decision.
2. Explain why each pattern matched the brief or query.
3. Distinguish evidence-backed decisions from assumptions.
4. Surface unresolved gaps instead of overstating confidence.
5. Include retrieval reasons, canonical storage references, and generated
   output references when lineage provides them.

## Boundary

- Owns: lineage explanation and review summary.
- Does not own: pattern extraction, search, curation, or modifying the generated
  blueprint.

## Rules

1. Do not claim a study influenced a blueprint unless lineage or source refs say
   so.
2. Preserve pattern IDs, storage references, retrieval reasons, and generated
   output paths.
3. Keep explanations concise and decision-oriented.
4. Flag missing lineage as a quality issue.

## Anti-Patterns

- Attribution laundering: implying source evidence was used when only a pattern
  name is present.
- Vague explanation: "used for UX" without naming the section or decision.
- Confidence inflation: presenting candidate patterns as validated.
- Missing gaps: hiding assumptions that should be reviewed.
- Storage erasure: dropping canonical storage references from a lineage
  explanation when they are needed for review or refetch.
- Stale retrieval: ignoring that a vector result may point to an outdated,
  deprecated, or missing canonical record.

## Workflow

1. Read the lineage record, retrieval reasons, storage references, and generated
   output references.
2. Group used patterns by page, section, component, interaction, or responsive
   decision.
3. Explain the reason, source relationship, confidence/status, and canonical
   fetch pointer for each pattern.
4. List assumptions, unresolved gaps, stale-reference risks, and review
   recommendations.

## Inline Example

`sticky-appointment-cta` influenced the mobile sticky bar because the brief
targets appointment booking on a long service page; review should confirm it
does not obstruct forms or required legal content.

## Hand-Offs

- Use `generate-blueprint-from-knowledge` to create lineage entries.
- Use `curate-ui-knowledge` if lineage reveals weak or noisy patterns.
- Use audit skills if lineage exposes unresolved quality risks.
