---
name: component-wireframe-planner
description: Plan reusable component-level UIBlueprint anatomy, states, behavior, and handoff notes before final JSON assembly.
license: See repository LICENSE
---

# Component Wireframe Planner

Use this skill when the user needs reusable component anatomy, state choices, or
behavior contracts. Use a generator only after those component decisions are
settled.

## Purpose

Describe component anatomy, required states, accessibility behavior, and
responsive behavior using approved UIBlueprint vocabulary.

## Philosophy

A component wireframe should expose the contract a reusable UI unit must keep
across contexts. The important decisions are anatomy, state surface, control
relationships, and what the parent page or section must provide. Components stay
portable by modeling structure and behavior, not one page's final copy or visual
treatment. State modeling comes before polish because empty, loading, error, and
disabled paths change what users can do; visual styling cannot rescue a component
that never modeled those paths.

## References

- `references/component-anatomy.md`
- `references/component-decision-matrix.md`
- `references/component-states.md`
- `references/_shared/wireframe-schema/valid-node-types.md`
- `references/_shared/vocabulary/node-types.json`
- `references/_shared/vocabulary/interaction-states.json`
- `references/_shared/schemas/wireframe-config.schema.json`
- `references/_shared/design-philosophy/preflight-checklist.md`

## Decision Criteria

1. Forms need empty, focused, validation, error, disabled, submitting, success,
   and recovery states because user input can fail or take time.
2. Dialogs and drawers need trigger, open, close, focus, escape, and return-focus
   behavior because they interrupt or relocate task flow.
3. Tabs and accordions need selected, expanded, collapsed, keyboard, and content
   relationship notes because hidden content must remain navigable.
4. Cards usually need only default, interactive, selected, unavailable, or loading
   states when those states change action or meaning.
5. Tables and lists need empty, loading, error, filtered, paginated, and selected
   states when data volume or failure changes the user's next action.
6. Do not add a state just to describe appearance. Add it when the state changes
   content, action, feedback, accessibility, or implementation responsibility.

## Boundary

- Owns: component anatomy, state surface, parent inputs, child outputs,
  component accessibility contracts, and reusable behavior notes.
- Does not own: page journey, section ordering, schema teaching, or final JSON
  assembly from a completed component plan.
- Hand off structural placement to `section-wireframe-planner` or
  `page-wireframe-planner`.
- Hand off final emission to `generate-wireframe-config`.

## Rules

1. Model the component's stable anatomy before adding context-specific content.
2. Include only states that change user choice, feedback, accessibility, or
   implementation responsibility.
3. Keep parent-owned decisions, such as page section order or global navigation,
   outside the component except as required inputs.
4. Annotate any required data, validation, or parent callback.
5. Use deterministic validation for component quality only when a missing
   structure can be checked from JSON. Happy-path-only or context-dependent
   component judgment remains a skill review until reliable fixtures exist.
6. Keep this skill self-contained for now; add a component-audit subagent only if
   future workflows need a separate reviewer before generation.

## Anti-Patterns

- Stateless interactive component: users can click, submit, expand, or fail, but
  the wireframe shows only default.
- Page-specific component: reusable anatomy is polluted with one page's sequence,
  campaign copy, or final styling.
- Hidden accessibility contract: a dialog, tab, accordion, or form lacks focus,
  label, or error relationships.
- Overmodeled card: decorative text fragments become separate nodes without
  changing state, role, or behavior.
- Happy-path-only data component: table, list, or card grid has populated rows
  but no empty, loading, or error path even though data availability changes the
  experience.

## Workflow

1. Identify the component type and its parent context.
2. Define anatomy: container, controls, content slots, repeated items, and
   feedback areas.
3. Choose required states using `references/component-states.md`.
4. Add accessibility and responsive notes for controls, forms, overlays, and
   hidden content.
5. State parent inputs and child outputs for handoff.

## Inline Example

Input: "Newsletter signup block."

Output: component with a `form`, labeled email `inputGroup`, submit `button`,
helper text, field-level error message, disabled or loading submit state,
success confirmation, and accessibility notes connecting input, helper, and
error text. Do not model hover colors or final button styling; those do not
change the wireframe contract.

State-aware JSON sketch:

```json
{
  "root": {
    "type": "form",
    "label": "Newsletter Signup Form",
    "children": [
      { "type": "heading", "label": "Newsletter heading", "role": "headline" },
      { "type": "inputGroup", "label": "Email field with helper and error relationship" },
      { "type": "button", "label": "Subscribe", "role": "primaryCTA", "state": "default" },
      { "type": "paragraph", "label": "Inline error message", "role": "errorText", "state": "error" },
      { "type": "paragraph", "label": "Signup success confirmation", "role": "body", "state": "success" }
    ]
  }
}
```

This is a component plan sketch. Final assembly must add stable IDs,
accessibility notes for labels and errors, responsive notes if placement
changes, and any parent-owned section context.

## Hand-Offs

- Use `section-wireframe-planner` when the component's page role is unclear.
- Use `interaction-patterns` when state, overlay, focus, or dismissal behavior
  drives the component.
- Use `generate-wireframe-config` when the component plan is ready to emit as
  schema-valid JSON.
- Use `accessibility-wireframe-review` for forms, tabsets, accordions, dialogs,
  drawers, and complex controls.
