# Create Prototype Plan

## Purpose

Create a user-facing prototype behavior plan from an existing wireframe,
blueprint, design specification, or behavior requirements without requiring the
user to know the internal prototype skill chain.

The command produces `prototype-config.json` and `prototype-plan.md` by default.
It follows `.convention/recipes/prototype.recipe.md`.

## Use When

- A user asks for a prototype plan, prototype config, interaction plan,
  clickable prototype handoff, behavior map, or runtime handoff notes.
- A wireframe, blueprint, or design spec exists and needs screens, routes,
  states, interactions, overlays, forms, navigation, focus behavior, and
  responsive behavior.
- The desired result is a behavior plan, not runtime implementation, rendered
  UI, final animation craft, or a hosted clickable app.

## Required Inputs

- Source wireframe, blueprint, or design specification.
- Stable node IDs for screens, sections, components, and interactive targets.
- Key user flows.
- State requirements for forms, overlays, menus, navigation, async regions, or
  other interactive components.
- Viewport or device requirements when behavior changes responsively.

## Optional Inputs

- `design-system-seed.json` or `design-spec.md`.
- Existing component state model or interaction flow.
- Accessibility requirements.
- Runtime target or implementation framework.
- Motion constraints.
- Output directory.

## Missing Input Questions

Ask at most three blocking questions before proceeding.

Default questions:

1. What source artifact should be treated as truth: `wireframe.json`,
   blueprint, design spec, or written behavior requirements?
2. Which node IDs are interactive targets?
3. What are the key user flows this prototype must support?

Use these command-specific questions when the first three do not settle the
artifact:

- Which states must be represented for forms, overlays, menus, async regions,
  or navigation?
- Which viewport or device behaviors change the interaction model?

If missing information is non-blocking, proceed with explicit assumptions and
list them in `prototype-plan.md`.

## Default Pipeline

1. Confirm source wireframe, blueprint, or design spec exists.
2. Confirm stable node IDs for screens, sections, components, and interactive
   targets.
3. Identify screens, routes, overlays, forms, menus, async regions,
   navigational targets, and responsive behavior changes.
4. Use `study-ui-prototype-behavior` only when the source is observed UI or raw
   behavior notes rather than explicit requirements.
5. Use `generate-component-state-model` for dialogs, forms, menus, sticky bars,
   async components, navigation controls, and other interactive nodes with
   unclear states.
6. Use `generate-interaction-flow` for click, tap, keyboard, submit,
   validation, overlay, route, navigation, and recovery behavior.
7. Use `generate-interactive-prototype-config` to assemble
   `prototype-config.json` with explicit references back to source node IDs.
8. Use `generate-clickable-prototype-plan` to produce `prototype-plan.md` as the
   human runtime handoff.
9. Use `audit-prototype-interactions` before final handoff.
10. Record unresolved node, state, focus, route, responsive, and runtime-boundary
    questions.

## Stop Conditions

Stop and ask for input when:

- Source wireframe, blueprint, or design spec is missing.
- Stable node IDs are missing for interactive targets.
- Key flows are unknown.
- State, route, overlay, form, or focus targets cannot be referenced.
- Viewport behavior affects the prototype but requirements are unknown.
- The user expects runtime implementation, rendered UI, hosted preview, or a
  clickable app instead of a behavior plan.

Do not invent node IDs, final routes, validation rules, product facts, or
runtime architecture when the source artifact does not support them.

## Outputs

- `prototype-config.json`: structured prototype behavior config.
- `prototype-plan.md`: clickable prototype plan and runtime handoff notes.
- Optional `component-state-model.json` when state modeling is substantial.
- Optional `interaction-flow.json` when flow modeling is substantial.
- Optional `prototype-audit.md` with audit findings and repair guidance.

When no output directory is supplied, recommend:

```txt
ui-design-intelligence/
  prototype-config.json
  prototype-plan.md
```

## Quality Checks

- The artifact follows `.convention/recipes/prototype.recipe.md`.
- Every interaction target references a stable source node ID.
- Screens, routes, overlays, forms, menus, and async regions have explicit
  state behavior.
- Overlay behavior includes open, close, escape, outside-click policy, focus
  trap, and focus return when relevant.
- Forms define validation, disabled, error, success, recovery, and resubmission
  behavior where relevant.
- Keyboard behavior covers focus order, activation, escape, and submit actions.
- Responsive conditions state which interactions change, move, collapse, or
  disappear.
- Transitions are named only when they affect comprehension, state, or task
  continuity.
- Runtime boundary is clear: the artifact plans behavior but does not implement
  a prototype viewer.

## Agents

- Required: `prototype-architect`.
- Optional when source structure or component vocabulary is incomplete:
  `blueprint-architect`, `design-system-architect`, `accessibility-reviewer`.

## Skills

- `study-ui-prototype-behavior`
- `generate-component-state-model`
- `generate-interaction-flow`
- `generate-interactive-prototype-config`
- `generate-clickable-prototype-plan`
- `audit-prototype-interactions`
- Optional adjacent skills: `generate-wireframe-config`,
  `generate-design-system-seed`, `accessibility-wireframe-review`.

## Example Invocation

```txt
/create-prototype-plan
Source wireframe: ui-design-intelligence/wireframe.json
Design spec: ui-design-intelligence/design-spec.md
Key flows: open booking dialog, choose appointment type, submit booking form,
show validation errors, show success confirmation.
Viewport needs: desktop header CTA and mobile sticky CTA both open the booking
dialog.
Output directory: ui-design-intelligence/booking-prototype
```

Existing-artifact example:

```txt
/create-prototype-plan
Source: ui-design-intelligence/product-page/wireframe.json
Node IDs: product-gallery, variant-picker, add-to-cart-button, cart-feedback,
size-guide-dialog
Flows: choose variant, open size guide, add to cart, recover from missing size.
```

## Inputs

Use `## Required Inputs` and `## Optional Inputs` as the source of truth for this
consumer command. This compatibility section exists because bundle validation
expects every installed command to expose an `Inputs` section.

## Workflow

Use `## Default Pipeline` as the source of truth for this consumer command. This
compatibility section exists because bundle validation expects every installed
command to expose a `Workflow` section.
