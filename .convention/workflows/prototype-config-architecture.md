# Prototype Config Architecture

## Decision

Sprint 003 adds prototype configuration as a behavior layer over wireframe
structure.

The relationship is:

```txt
DesignSystemSeed -> UIBlueprint / WireframeConfig -> PrototypeConfig
```

`PrototypeConfig` does not duplicate page, section, component, or layout
hierarchy. It references the source wireframe and its node IDs, then adds
screens, routes, states, events, actions, overlays, forms, navigation flows, and
transitions.

## Ownership

| Artifact | Owns | Does Not Own |
| --- | --- | --- |
| `WireframeConfig` | Structural hierarchy, node IDs, node types, labels, responsive notes, accessibility annotations. | Runtime behavior, event ordering, route flow, form submission simulation. |
| `PrototypeConfig` | Screens, routes, component state models, interaction flows, overlays, forms, navigation flows, and transitions. | Layout hierarchy, final visual styling, runtime implementation, renderer/editor code. |
| `DesignSystemSeed` | Component state vocabulary, allowed behavior conventions, accessibility rules, and token/component intent. | Screen routes or interaction flow instances. |

## Reference Rules

- Use `source.sourceWireframeId` and `source.sourceWireframeRef` to identify the
  source wireframe artifact.
- Use `screen.wireframeRef` to reference the wireframe screen or root node.
- Use `nodeId`, `sourceNodeId`, `targetNodeId`, `triggerNodeId`, and related
  fields to reference existing wireframe nodes.
- Do not copy the wireframe `root`, `children`, layout patterns, or node nesting
  into prototype config.
- Use existing interaction-state vocabulary from
  `.convention/vocabulary/interaction-states.json`.
- Keep prototype config declarative. A later runtime may implement it, but the
  schema should not assume a framework.

## MVP Schema Set

- `.convention/schemas/prototype-config.schema.json`
- `.convention/schemas/interaction-flow.schema.json`
- `.convention/schemas/component-state-model.schema.json`

The first example is
`.convention/examples/dental-appointment.prototype-config.example.json`, which opens
an appointment dialog from a hero CTA and a compact-viewport sticky bar.
