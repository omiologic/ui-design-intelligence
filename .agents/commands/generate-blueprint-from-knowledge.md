# Generate Blueprint From Knowledge

## Purpose

Create a blueprint plan from selected reusable pattern records before final
UIBlueprint JSON assembly.

## Use When

- Knowledge search has returned relevant pattern records.
- A blueprint should be generated from curated reusable knowledge rather than
  raw study notes alone.

## Inputs

- Project brief, selected pattern records, retrieval reasons, target scope, and
  optional project-local `ui-knowledge/` lineage path.

## Workflow

1. Use `search-ui-knowledge` if relevant patterns are not already selected.
2. Use `generate-blueprint-from-knowledge` to map patterns to page, section,
   component, interaction, responsive, or accessibility decisions.
3. Record assumptions, conflicts, and pattern influence for lineage.
4. Hand the settled plan to `generate-wireframe-config` for final JSON assembly.
5. Save or return lineage draft entries for review.

## Outputs

- Knowledge-informed blueprint plan.
- Draft lineage entries and handoff notes for final JSON assembly.

## Agents

- `ui-knowledge-librarian`
- `blueprint-architect`

## Skills

- `search-ui-knowledge`
- `generate-blueprint-from-knowledge`
- `generate-wireframe-config`
