---
name: generate-clickable-prototype-plan
description: Generate a human-readable clickable prototype plan that sequences screens, states, flows, overlays, forms, transitions, and audit checkpoints.
license: See repository LICENSE
---

# Generate Clickable Prototype Plan

Use this skill when a prototype needs an implementation plan before a runtime or
preview package consumes `PrototypeConfig`.

## Purpose

Create a plan that explains the clickable journey, source artifacts, screen
sequence, component states, interaction flows, audit requirements, and runtime
handoff notes.

## Philosophy

A clickable prototype plan is an execution map for behavior, not a promise that
the prototype already runs. It should sequence screens, routes, states,
interactions, overlays, forms, transitions, responsive conditions, and audit
gates so a later runtime or editor can consume the config without guessing.
Plans should stay framework-neutral and should surface blockers when source
nodes, states, validation paths, or accessibility behavior are missing.

## Decision Criteria

1. Use this skill after or alongside prototype config generation.
2. Prefer plan steps that map directly to screens, routes, states, and
   interactions.
3. Include audit gates before runtime implementation.
4. Keep renderer/editor details as later handoff notes.
5. Use a plan, not config generation, when the user needs sequencing, QA, or
   runtime handoff guidance rather than new schema data.

## Boundary

- Owns: clickable prototype plan, QA checklist, and runtime handoff notes.
- Does not own: generating code, creating a preview app, final animation polish,
  visual UI-kit work, browser QA, or recording final user tests.

## References

- `references/clickable-prototype-planning.md`
- `../../../shared/schemas/prototype-config.schema.json`
- `../../../shared/examples/dental-appointment.prototype-config.example.json`

## Rules

1. Plan behavior, not production implementation.
2. Include click/tap/key paths and expected state changes.
3. Include mobile-specific behavior and accessibility checks.
4. Identify missing source nodes, states, or validations as blockers.
5. Every plan step must map to config IDs.
6. Primary happy paths and failure states must both be represented.
7. Mobile sticky or drawer behavior must be scoped to compact viewports.
8. Runtime handoff must avoid framework commitments unless provided.

## Anti-Patterns

- Producing a marketing narrative instead of a stateful test plan.
- Skipping failure states because the happy path is clear.
- Claiming the prototype is clickable without a consuming runtime.

## Workflow

1. Summarize source wireframe, design-system seed, and prototype config.
2. List screens, routes, and entry points.
3. Sequence primary and secondary clickable flows.
4. Add overlays, forms, transitions, and responsive behavior.
5. Add audit checklist and unresolved questions.

## Inline Example

```json
{
  "planId": "appointment-clickable-plan",
  "sourcePrototypeConfigId": "appointment-dialog-prototype",
  "primaryPath": [
    {
      "step": 1,
      "screenId": "home-screen",
      "triggerNodeId": "book-button",
      "interactionId": "open-dialog",
      "expectedStateId": "dialog-open"
    },
    {
      "step": 2,
      "formId": "appointment-form",
      "interactionId": "submit-appointment-form",
      "successStateId": "form-success",
      "failureStateId": "form-error"
    }
  ],
  "responsiveChecks": [
    {
      "viewport": "compact",
      "interactionId": "open-dialog-from-sticky-cta",
      "expectedStateId": "dialog-open"
    }
  ],
  "auditGates": ["overlay close path", "focus return", "validation errors"]
}
```

## Hand-Offs

Hand plans to prototype runtime/editor work in a later package. Hand config
issues back to generation or audit skills.
