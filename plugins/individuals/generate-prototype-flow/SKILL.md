---
name: generate-prototype-flow
description: Generate journey-facing prototype flow strategy before detailed PrototypeConfig states, routes, and interactions are assembled.
license: See repository LICENSE
---

# Generate Prototype Flow

Use this skill when a prototype needs user journey logic before low-level
interaction configuration.

## Purpose

Define prototype steps, decision points, user intent, content moments, and
handoff needs for `PrototypeConfig` generation.

## Philosophy

Prototype flow strategy explains why screens, overlays, and states exist. The
prototype config then defines exact events, focus, routes, and transitions.

## Decision Criteria

1. Use this before `generate-interactive-prototype-config` when flow intent is
   underspecified.
2. Use it for multi-step forms, dialogs, product guides, and onboarding paths.
3. Preserve missing node IDs as blockers for config generation.

## Boundary

- Owns: journey-facing prototype sequence, decision points, and content needs.
- Does not own: schema-valid `PrototypeConfig`, event payloads, focus targets,
  or runtime rendering.

## References

- `../../../docs/interop/content-journey-layer-architecture.md`
- `../../../.convention/schemas/prototype-config.schema.json`
- `../../../.convention/schemas/user-journey-map.schema.json`

## Rules

1. Identify entry, decision, success, error, and recovery moments.
2. Mark required node IDs for later prototype config.
3. Include copy needs for dialogs, forms, empty states, and confirmations.
4. Do not generate runtime code.

## Anti-Patterns

- Jumping straight to click handlers without journey intent.
- Ignoring error and recovery paths.
- Treating copy as optional in prototype decision points.

## Workflow

1. Identify source journey and blueprint.
2. Map prototype steps and branch points.
3. Identify required states, overlays, forms, and messages.
4. Hand off node and state requirements to prototype config generation.

## Inline Example

```json
{
  "entry": "product-guide-cta",
  "steps": ["open-guide", "answer-preferences", "show-recommendation"],
  "recovery": ["edit-answers", "compare-all-models"]
}
```

## Hand-Offs

Hand off behavior assembly to `generate-interactive-prototype-config` and
prototype-ready copy to `generate-prototype-copy`.
