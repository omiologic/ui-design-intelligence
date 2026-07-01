---
name: generate-interactive-prototype-config
description: Generate schema-valid PrototypeConfig JSON from wireframe config, design-system seed data, optional RuntimeDesignTheme refs, knowledge patterns, and user behavior requirements.
license: See repository LICENSE
---

# Generate Interactive Prototype Config

Use this skill when a workflow needs structured prototype behavior layered over
an existing blueprint or wireframe.

## Purpose

Generate `PrototypeConfig` JSON that defines screens, routes, states,
interactions, overlays, forms, navigation flows, and transitions without
duplicating layout vocabulary.

## Philosophy

Prototype config is a declarative behavior layer over an existing wireframe. It
should make a future clickable experience unambiguous by referencing stable
screen, route, state, and node IDs while leaving layout, final styling,
animation craft, and runtime implementation to adjacent layers. When a
`RuntimeDesignTheme` is available, the config may cite `runtimeDesignThemeRef`
so a future viewer can resolve component state styling and status behavior
without copying token maps into prototype behavior data. The best output is
boringly explicit: every trigger has a result, every overlay has a close and
focus path, every form has validation states, and every responsive behavior is
conditioned rather than implied.

## Decision Criteria

1. Use this skill after there is a wireframe, blueprint, or clear node map.
2. Use design-system seed data to keep component states, actions, and
   accessibility rules consistent.
3. Use `RuntimeDesignTheme` refs when component states, focus treatments,
   disabled/loading/empty states, or success/error/warning/info behavior needs
   viewer-ready theme tokens.
4. Use knowledge patterns only as behavior evidence, not as hidden runtime code.
5. Prefer explicit references to `screenId`, `routeId`, `nodeId`, and
   `wireframeRef`.
6. Hand off uncertain component behavior to state-model or interaction-flow
   skills before final assembly.
7. Stop at configuration when the user needs prototype behavior; hand off to a
   future runtime/editor only after the config audits cleanly.

## Boundary

- Owns: prototype behavior configuration and cross-reference assembly.
- Does not own: runtime playback, visual layout generation, final animation
  polish, component code, visual UI-kit work, or production accessibility
  certification.

## References

- `references/prototype-config-generation.md`
- `../../../.convention/schemas/prototype-config.schema.json`
- `../../../.convention/schemas/wireframe-config.schema.json`
- `../../../.convention/schemas/design-system-seed.schema.json`
- `../../../.convention/schemas/runtime-design-theme.schema.json`
- `../../../.convention/examples/dental-appointment.prototype-config.example.json`
- `../../../.convention/examples/runtime-theme/ledgerpilot.runtime-design-theme.example.json`

## Rules

1. Emit schema-facing `PrototypeConfig` data only.
2. Reference wireframe nodes instead of restating layout trees.
3. Include keyboard, focus, validation, and responsive conditions when behavior
   depends on them.
4. Add `runtimeDesignThemeRef` only when a runtime theme artifact exists; cite
   it for status/state/component styling and keep token values in the runtime
   theme.
5. Preserve open questions for missing triggers, states, target nodes, or
   missing runtime theme coverage.
6. Do not invent a renderer, preview app, editor, export engine, or React
   implementation.
7. Every interaction must have a trigger, action, and result.
8. Overlay focus and close behavior must be explicit.
9. Mobile-only affordances must use viewport conditions.
10. Form errors must point at prototype state IDs, not unrelated model IDs.

## Anti-Patterns

- Rebuilding wireframe layout inside prototype config.
- Capturing click behavior in prose only.
- Treating hover-only interactions as complete for touch devices.
- Adding runtime framework assumptions to schema data.

## Workflow

1. Identify source wireframe, blueprint, seed, and knowledge inputs.
2. Identify whether a `RuntimeDesignTheme` exists for viewer-ready component
   state styling, status behavior, focus, disabled, selected, loading, and empty
   state mappings.
3. Build the screen and route inventory from existing structure.
4. Generate or import component state models and interaction flows.
5. Add overlays, forms, navigation flows, transitions, and responsive behavior.
6. Check node, state, screen, route, focus, and runtime theme references.
7. Validate against `prototype-config.schema.json`.

## Inline Example

```json
{
  "version": "0.1.0",
  "type": "prototypeConfig",
  "id": "appointment-dialog-prototype",
  "name": "Appointment Dialog Prototype",
  "source": {
    "sourceWireframeId": "dental-homepage-wireframe",
    "sourceWireframeRef": ".convention/examples/dental-homepage.ui-blueprint.json",
    "sourceRuntimeDesignThemeId": "dental-runtime-theme",
    "sourceRuntimeDesignThemeRef": "artifacts/dental/runtime-design-theme.json",
    "notes": ["References wireframe node IDs without copying layout."]
  },
  "runtimeDesignThemeRef": "dental-runtime-theme",
  "screens": [
    {
      "id": "home-screen",
      "label": "Home",
      "wireframeRef": "dental-homepage",
      "routeId": "home-route",
      "initialState": "default"
    }
  ],
  "routes": [
    { "id": "home-route", "path": "/", "screenId": "home-screen" }
  ],
  "states": [
    {
      "id": "dialog-open",
      "name": "Dialog Open",
      "state": "open",
      "nodeId": "appointment-dialog",
      "screenId": "home-screen",
      "description": "Dialog is visible and receives focus."
    }
  ],
  "componentStateModels": [],
  "interactions": [
    {
      "id": "open-dialog",
      "trigger": {
        "event": "click",
        "sourceNodeId": "book-button",
        "screenId": "home-screen",
        "routeId": "home-route"
      },
      "action": {
        "type": "openOverlay",
        "targetNodeId": "appointment-dialog",
        "targetStateId": "dialog-open"
      },
      "result": {
        "type": "overlayOpened",
        "description": "Appointment dialog opens and focus moves inside.",
        "resultingStateId": "dialog-open",
        "focusTargetNodeId": "appointment-dialog"
      }
    }
  ],
  "overlays": [
    {
      "id": "appointment-dialog-overlay",
      "nodeId": "appointment-dialog",
      "type": "dialog",
      "initialState": "closed",
      "triggerNodeIds": ["book-button"],
      "dismissal": {
        "methods": ["escape", "closeButton"],
        "focusReturnNodeId": "book-button"
      }
    }
  ],
  "forms": [],
  "navigationFlows": [],
  "transitions": [],
  "notes": ["Runtime implementation remains out of scope."]
}
```

## Hand-Offs

Hand off source behavior study to `study-ui-prototype-behavior`, component state
gaps to `generate-component-state-model`, interaction details to
`generate-interaction-flow`, plan sequencing to `generate-clickable-prototype-plan`,
and final review to `audit-prototype-interactions`.
