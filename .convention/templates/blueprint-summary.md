# Blueprint Summary

## Source

- URL or name:
- Study inputs:
- Audit inputs:
- Blueprint scope:

## Intent

State the page, section, component, or overlay goal in one concise paragraph.
Separate observed evidence from inferred product or business intent.

## Structure

Summarize the proposed UIBlueprint structure:

- Root type and label
- Primary regions or sections
- Reusable components
- Overlays, sticky UI, or stateful interactions
- Responsive behavior
- Accessibility notes

## Vocabulary Decisions

Record any important controlled-vocabulary choices:

- Node types
- Layout patterns
- Content roles
- Interaction states
- UI layers

## Handoffs

List the next skills or workflows that should consume the blueprint:

- `generate-wireframe-config` for schema-valid JSON output
- `page-wireframe-planner`, `section-wireframe-planner`, or
  `component-wireframe-planner` for scope-specific refinement
- `accessibility-wireframe-review` for structural accessibility review

## Output

When a structured blueprint is requested, return JSON matching
`.convention/schemas/wireframe-config.schema.json`.
