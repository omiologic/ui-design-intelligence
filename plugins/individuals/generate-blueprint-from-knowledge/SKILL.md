---
name: generate-blueprint-from-knowledge
description: Create a blueprint plan from retrieved reusable UI pattern knowledge before final UIBlueprint JSON assembly.
license: See repository LICENSE
---

# Generate Blueprint From Knowledge

Use this skill after relevant pattern records have been retrieved for a brief and
the next step is a page, section, component, or interaction blueprint plan.

## Purpose

Apply selected pattern knowledge to a new blueprint plan while recording which
patterns influenced which decisions.

## Philosophy

Knowledge-informed generation should not paste patterns together. It should use
patterns as evidence-backed constraints and decision aids, then produce a
coherent page or component plan for the current brief.

## References

- `references/knowledge-to-blueprint.md`
- `../../../knowledge/schemas/pattern-record.schema.json`
- `../../../knowledge/schemas/blueprint-lineage.schema.json`
- `../../../knowledge/templates/blueprint-lineage.md`

## Decision Criteria

1. Use retrieved patterns only when their tags and reasons match the brief.
2. Map each selected pattern to a page section, component, interaction, or
   responsive decision.
3. Preserve the current brief's goal over any single pattern's default sequence.
4. Prepare lineage notes before final JSON assembly.

## Boundary

- Owns: knowledge-informed blueprint planning and lineage draft decisions.
- Does not own: search, curation, or final schema-valid JSON emission.

## Rules

1. Do not use raw study output when a curated pattern record exists for the same
   decision.
2. Do not apply contradictory patterns without documenting the conflict.
3. Keep pattern influence visible in annotations or lineage.
4. Hand final JSON assembly to `generate-wireframe-config`.

## Anti-Patterns

- Pattern collage: assembling unrelated matched patterns without a single user
  journey.
- Hidden lineage: using pattern knowledge without recording why.
- Overriding the brief: forcing healthcare or conversion defaults onto a utility
  workflow because tags partially match.
- Final JSON drift: emitting schema JSON before the plan is settled.

## Workflow

1. Read the brief, selected pattern records, and retrieval reasons.
2. Decide target scope: page, section, component, interaction, or overlay.
3. Map patterns to structural decisions and note conflicts or assumptions.
4. Draft the plan and lineage entries.
5. Hand off final assembly to `generate-wireframe-config`.

## Inline Example

For a dental homepage, use a credibility-first hero pattern for the opening
section and a sticky appointment CTA pattern for mobile conversion support, then
record both pattern IDs in lineage.

## Hand-Offs

- Use `search-ui-knowledge` before this skill.
- Use `generate-wireframe-config` for final UIBlueprint JSON.
- Use `explain-blueprint-lineage` after generation or review.
