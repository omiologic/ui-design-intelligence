---
name: generate-interaction-flow
description: Generate interaction flow JSON that connects event triggers, source nodes, conditions, actions, targets, results, and accessibility notes.
license: See repository LICENSE
---

# Generate Interaction Flow

Use this skill when a single interaction or flow step needs explicit structured
behavior.

## Purpose

Generate `InteractionFlow` JSON for click, tap, keydown, submit, route,
viewport, overlay, form, and navigation behavior.

## Philosophy

Interaction flows are narrow event-to-result contracts. They should make one
behavior auditable by naming the trigger source, condition, action, target,
result, focus movement, and accessibility expectations. A flow should not hide
state changes in prose, bundle unrelated interactions, or imply runtime event
listener code. It is the connective tissue between component state models and a
full prototype config.

## Decision Criteria

1. Use this skill for one interaction or a small related sequence.
2. Require source, trigger, action, and result before considering a flow ready.
3. Add conditions for viewport, state, role, form validity, or route.
4. Include accessibility notes when focus, live regions, or keyboard behavior
   change.
5. Hand off to component state modeling when a referenced state is not defined.

## Boundary

- Owns: event-to-result interaction modeling.
- Does not own: full prototype assembly, component code, visual motion assets,
  final animation polish, runtime event listeners, or visual UI-kit work.

## References

- `references/interaction-flow-generation.md`
- `../../../shared/schemas/interaction-flow.schema.json`
- `../../../shared/vocabulary/interaction-states.json`
- `../../../shared/schemas/wireframe-config.schema.json`

## Rules

1. Emit schema-valid interaction flow data.
2. Use node ids and state ids from the surrounding config.
3. Keep result semantics explicit.
4. Do not merge unrelated interactions into one vague flow.
5. Tap/click parity must be explicit when desktop and mobile share a flow.
6. Focus target must exist and be reachable.
7. State-gated flows must reference known state IDs.
8. Submit flows must include validation results.

## Anti-Patterns

- Writing "opens modal" without the trigger source and result state.
- Using animation duration as a substitute for behavior.
- Referencing target nodes that are not in the wireframe or prototype config.

## Workflow

1. Identify event, source node, screen, route, and optional key.
2. Define conditions and target state.
3. Define action type, target node, target route, or target overlay.
4. Define result, focus target, and resulting state.
5. Add accessibility notes and validate against the schema.

## Inline Example

```json
{
  "id": "close-dialog-with-escape",
  "label": "Close appointment dialog with Escape",
  "trigger": {
    "event": "keydown",
    "sourceNodeId": "appointment-dialog",
    "screenId": "home-screen",
    "key": "Escape"
  },
  "condition": {
    "type": "whenState",
    "stateId": "dialog-open"
  },
  "action": {
    "type": "closeOverlay",
    "targetNodeId": "appointment-dialog",
    "targetStateId": "dialog-closed"
  },
  "result": {
    "type": "overlayClosed",
    "description": "Dialog closes and focus returns to the opening CTA.",
    "resultingStateId": "dialog-closed",
    "focusTargetNodeId": "book-button"
  },
  "accessibility": {
    "focusManagement": "Return focus to the trigger.",
    "keyboardBehavior": "Escape works only while the dialog is open.",
    "ariaLive": "off"
  }
}
```

## Hand-Offs

Hand completed flows to `generate-interactive-prototype-config`. Hand component
state gaps to `generate-component-state-model` and final review to
`audit-prototype-interactions`.
