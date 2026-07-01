---
name: study-ui-prototype-behavior
description: Study observed UI behavior from pages, screenshots, captures, or notes and convert it into prototype-ready state, trigger, flow, and accessibility findings.
license: See repository LICENSE
---

# Study UI Prototype Behavior

Use this skill when existing UI evidence needs to become prototype behavior
inputs rather than static wireframe structure.

## Purpose

Extract observed and inferred interaction behavior, including triggers, state
changes, overlays, form validation, navigation flows, responsive affordances,
and accessibility expectations.

## Philosophy

Prototype behavior study is evidence gathering for behavior specs. It should
separate what was observed from what was inferred, keep uncertainty visible, and
translate UI behavior into prototype-ready findings that later generators can
map to states, events, actions, overlays, forms, and navigation flows. It should
not turn visual motion or layout observations into behavior unless a state,
route, validation, focus, or interaction change is actually involved.

## Decision Criteria

1. Use this skill when behavior evidence exists in a live UI, recording,
   screenshot sequence, audit notes, or knowledge pattern.
2. Separate observed behavior from inferred or recommended behavior.
3. Capture keyboard and focus behavior when an overlay, menu, form, or route
   transition is involved.
4. Identify viewport-specific behavior separately from default behavior.
5. Hand off to generation when findings are ready for schema assembly; keep the
   study as evidence when node IDs, state names, or routes are still unknown.

## Boundary

- Owns: behavior observation, evidence labels, and prototype findings.
- Does not own: schema assembly, layout generation, final animation polish,
  runtime implementation, or final interaction audit.

## References

- `references/prototype-behavior-study.md`
- `../../../.convention/schemas/study-output.schema.json`
- `../../../.convention/schemas/prototype-config.schema.json`
- `../../../.convention/vocabulary/interaction-states.json`

## Rules

1. Record behavior as prototype-ready findings with source confidence.
2. Use shared interaction state names when possible.
3. Preserve missing evidence as open questions.
4. Do not produce final `PrototypeConfig` unless asked to assemble it.
5. Each finding must map to a possible node, screen, state, or route reference.
6. Distinguish click, tap, keydown, submit, route, and viewport events.
7. Overlay and form findings must include close, error, success, and focus
   handling when evidence supports them.

## Anti-Patterns

- Treating animations as behavior without state changes.
- Inferring validation rules from labels alone without marking uncertainty.
- Combining desktop and mobile behavior into one vague note.

## Workflow

1. Inventory available evidence and source strength.
2. List interactive surfaces and their source nodes.
3. Capture triggers, conditions, actions, results, and state names.
4. Record accessibility and responsive behavior.
5. Flag behavior gaps for generation or audit.

## Inline Example

```json
{
  "behaviorFindings": [
    {
      "id": "hero-cta-opens-appointment-dialog",
      "evidence": "observed",
      "sourceNodeId": "hero-book-button",
      "event": "click",
      "action": "openOverlay",
      "targetNodeId": "appointment-dialog",
      "resultingState": "open",
      "accessibility": {
        "focusManagement": "Focus appears to move into the dialog.",
        "keyboardBehavior": "Escape behavior not observed."
      },
      "openQuestions": ["Confirm close button and Escape dismissal behavior."]
    },
    {
      "id": "mobile-sticky-cta",
      "evidence": "inferred",
      "viewport": "compact",
      "event": "tap",
      "action": "openOverlay",
      "targetNodeId": "appointment-dialog",
      "openQuestions": ["Confirm sticky CTA exists in the source wireframe."]
    }
  ]
}
```

## Hand-Offs

Hand findings to `generate-interaction-flow`,
`generate-component-state-model`, or `generate-interactive-prototype-config`.
Hand ambiguity back to study or capture workflows.
