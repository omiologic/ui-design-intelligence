---
name: generate-interactive-prototype-config
description: Generate schema-valid PrototypeConfig JSON from wireframe config, design-system seed data, knowledge patterns, and user behavior requirements.
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
animation craft, and runtime implementation to adjacent layers. The best output
is boringly explicit: every trigger has a result, every overlay has a close and
focus path, every form has validation states, and every responsive behavior is
conditioned rather than implied.

## Decision Criteria

1. Use this skill after there is a wireframe, blueprint, or clear node map.
2. Use design-system seed data to keep component states, actions, and
   accessibility rules consistent.
3. Use knowledge patterns only as behavior evidence, not as hidden runtime code.
4. Prefer explicit references to `screenId`, `routeId`, `nodeId`, and
   `wireframeRef`.
5. Hand off uncertain component behavior to state-model or interaction-flow
   skills before final assembly.
6. Stop at configuration when the user needs prototype behavior; hand off to a
   future runtime/editor only after the config audits cleanly.

## Boundary

- Owns: prototype behavior configuration and cross-reference assembly.
- Does not own: runtime playback, visual layout generation, final animation
  polish, component code, visual UI-kit work, or production accessibility
  certification.

## References

- `references/prototype-config-generation.md`
- `../../../shared/schemas/prototype-config.schema.json`
- `../../../shared/schemas/wireframe-config.schema.json`
- `../../../shared/schemas/design-system-seed.schema.json`
- `../../../shared/examples/dental-appointment.prototype-config.example.json`

## Rules

1. Emit schema-facing `PrototypeConfig` data only.
2. Reference wireframe nodes instead of restating layout trees.
3. Include keyboard, focus, validation, and responsive conditions when behavior
   depends on them.
4. Preserve open questions for missing triggers, states, or target nodes.
5. Do not invent a renderer, preview app, editor, export engine, or React
   implementation.
6. Every interaction must have a trigger, action, and result.
7. Overlay focus and close behavior must be explicit.
8. Mobile-only affordances must use viewport conditions.
9. Form errors must point at prototype state IDs, not unrelated model IDs.

## Anti-Patterns

- Rebuilding wireframe layout inside prototype config.
- Capturing click behavior in prose only.
- Treating hover-only interactions as complete for touch devices.
- Adding runtime framework assumptions to schema data.

## Workflow

1. Identify source wireframe, blueprint, seed, and knowledge inputs.
2. Build the screen and route inventory from existing structure.
3. Generate or import component state models and interaction flows.
4. Add overlays, forms, navigation flows, transitions, and responsive behavior.
5. Check node, state, screen, route, and focus references.
6. Validate against `prototype-config.schema.json`.

## Inline Example

```json
{
  "version": "0.1.0",
  "type": "prototypeConfig",
  "id": "appointment-dialog-prototype",
  "name": "Appointment Dialog Prototype",
  "source": {
    "sourceWireframeId": "dental-homepage-wireframe",
    "sourceWireframeRef": "shared/examples/dental-homepage.ui-blueprint.json",
    "notes": ["References wireframe node IDs without copying layout."]
  },
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
