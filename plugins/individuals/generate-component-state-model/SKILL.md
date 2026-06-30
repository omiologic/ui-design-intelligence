---
name: generate-component-state-model
description: Generate component state model JSON for prototype components, including allowed states, transitions, validation behavior, disabled/loading rules, and accessibility requirements.
license: See repository LICENSE
---

# Generate Component State Model

Use this skill when a component needs explicit prototype states before full
prototype config assembly.

## Purpose

Generate `ComponentStateModel` JSON for buttons, dialogs, forms, menus, sticky
bars, cards, accordions, tabs, and other interactive nodes.

## Philosophy

Component state models define the allowed behavior vocabulary for one
interactive node. They should describe states, transitions, validation,
disabled/loading behavior, focus, and keyboard requirements without drifting
into visual variants, layout structure, page routing, or component code. A
state belongs here only when it changes behavior or accessibility expectations,
not merely because a component looks different.

## Decision Criteria

1. Use this skill when allowed states or state transitions are unclear.
2. Use design-system seed conventions before inventing state names.
3. Include disabled, loading, validation, focus, and keyboard behavior when
   relevant.
4. Keep component state local; do not model full page navigation here.
5. Hand off to interaction-flow generation when a state change needs event,
   condition, action, and result details across nodes.

## Boundary

- Owns: component-level states and transitions.
- Does not own: complete prototype config, page routes, rendered components,
  visual UI-kit variants, final animation polish, or runtime implementation.

## References

- `references/component-state-modeling.md`
- `../../../shared/schemas/component-state-model.schema.json`
- `../../../shared/vocabulary/interaction-states.json`
- `../../../shared/schemas/design-system-seed.schema.json`

## Rules

1. Emit schema-valid component state model data.
2. Keep transition triggers concrete.
3. Include accessibility requirements for focusable, modal, and form states.
4. Reference the component node id and source wireframe when available.
5. Initial state must appear in allowed states.
6. Every state change must have a trigger.
7. Form components must include error and success handling.
8. Modal components must include focus management and Escape behavior.

## Anti-Patterns

- Using visual variants as states when behavior does not change.
- Hiding validation behavior inside field labels.
- Modeling unrelated page-level flows inside one component model.

## Workflow

1. Identify component role, node id, source wireframe, and initial state.
2. Define allowed states using shared vocabulary.
3. Add transitions with triggers and descriptions.
4. Add disabled, loading, validation, and accessibility requirements.
5. Validate against `component-state-model.schema.json`.

## Inline Example

```json
{
  "id": "appointment-dialog-state-model",
  "component": "dialog",
  "nodeId": "appointment-dialog",
  "wireframeRef": "dental-homepage",
  "initialState": "closed",
  "allowedStates": ["closed", "open"],
  "transitions": [
    {
      "from": "closed",
      "to": "open",
      "trigger": "click",
      "description": "Book appointment CTA opens the dialog."
    },
    {
      "from": "open",
      "to": "closed",
      "trigger": "keydown",
      "description": "Escape closes the dialog."
    }
  ],
  "accessibility": {
    "focusManagement": "Move focus into the dialog on open and return focus to the trigger on close.",
    "keyboardBehavior": "Escape closes the dialog; Tab remains inside while open.",
    "ariaLabel": "Request an appointment"
  }
}
```

## Hand-Offs

Hand component models to `generate-interactive-prototype-config` and unresolved
events to `generate-interaction-flow`.
