# Generate Blueprint From Study

## Purpose

Convert page or site study findings into a schema-valid UIBlueprint wireframe or
blueprint plan.

## Use When

- Study output exists and the next step is structured wireframe JSON.
- Audit findings should become a proposed page, section, or component structure.

## Inputs

- Page study, site study, UI specification, interaction notes, or audit findings.
- Target output scope: page, section, component, or overlay.
- Optional `shared/recipes/wireframe.recipe.md` when the output should follow
  the Sprint 006 consumer wireframe artifact contract.

## Workflow

1. Use `blueprint-architect` to decide output scope and structure.
2. Use `ui-specification-analyst` to preserve observed structure and hierarchy.
3. Use `ui-interaction-analyst` for overlays, forms, and stateful behavior.
4. Use `accessibility-reviewer` for landmarks, focus, keyboard, and form notes.
5. Validate output against the UIBlueprint schema and shared vocabulary.

## Outputs

- Schema-valid UIBlueprint JSON or blueprint plan.
- Handoff notes for validation and implementation.
- Consumer workflow default files: `wireframe.json` and `wireframe-notes.md`.

## Agents

- `blueprint-architect`
- `ui-specification-analyst`
- `ui-interaction-analyst`
- `accessibility-reviewer`

## Skills

- Blueprint and wireframe skill family.
