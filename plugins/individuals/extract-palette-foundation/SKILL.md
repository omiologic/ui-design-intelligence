---
name: extract-palette-foundation
description: Extract or recommend semantic palette tokens with intent, usage, provenance, confidence, and accessibility notes for DesignSystemSeed output.
license: See repository LICENSE
---

# Extract Palette Foundation

## Purpose

Create semantic palette tokens for design-system seed output.

## Philosophy

Palette work starts with semantic roles, not attractive swatches. Exact values
must only look exact when evidence supports them; inferred or generated colors
need clear usage intent, confidence, and accessibility constraints so downstream
work does not treat guesses as certified design tokens.

## References

- `references/palette-foundation-method.md`
- `references/_shared/design-philosophy/design-system/design-system-principles.md`
- `references/_shared/design-philosophy/design-system/design-system-anti-slop.md`
- `references/_shared/design-philosophy/design-system/skill-doctrine.md`
- `references/_shared/schemas/design-system-seed.schema.json`
- `references/_shared/schemas/palette-foundation.schema.json`
- `references/_shared/vocabulary/design-token-types.json`
- `references/_shared/vocabulary/accessibility-rules.json`
- `references/_shared/vocabulary/design-system-source-kinds.json`

## Decision Criteria

1. Use CSS or user-provided hex values as high-confidence observed values.
2. Treat screenshot colors as approximate unless backed by source code.
3. Generate support colors only when needed to complete the seed.
4. Prefer semantic token names over visual names.

## Rules

1. Include `intent`, `usage`, `useOn`, `doNotUseOn`, and accessibility notes.
2. Mark every color with `source` and `confidence`.
3. Do not rely on color alone for state or errors.
4. Do not add large decorative palette systems in Sprint 003.
5. Use `{category}.{role}.{purpose}` names such as
   `color.action.primary`, never value names such as `blueButton`.
6. Every token must have a role and usage; delete orphan tokens.

## Boundary

Owns palette foundation only. Does not own final visual design, contrast
certification, or token build pipelines.

## Workflow

1. Inventory observed and provided colors.
2. Map colors to semantic roles.
3. Generate missing support roles conservatively.
4. Add accessibility caveats.
5. Return schema-compatible palette JSON.

## Anti-Patterns

- Naming tokens `blue` or `lightBlue` without intent.
- Using one color family for every role.
- Omitting do-not-use guidance.
- Marking screenshot-picked colors as `observed` or `high` confidence.
- Shipping inferred color pairs without `contrastCheckRequired`.

## Inline Example

```json
{
  "mode": "light",
  "colors": {
    "color.action.primary": {
      "name": "color.action.primary",
      "value": "#1D6F8F",
      "intent": "Primary appointment or conversion action",
      "usage": "Single main CTA background per region",
      "useOn": ["color.surface.default"],
      "doNotUseOn": ["color.status.error"],
      "accessibilityNotes": ["contrastCheckRequired"],
      "source": "inferred",
      "confidence": "medium",
      "note": "Approximate value from screenshot; confirm against source CSS."
    },
    "color.surface.default": {
      "name": "color.surface.default",
      "value": "#FFFFFF",
      "intent": "Default page and section surface",
      "usage": "Primary content surface",
      "accessibilityNotes": ["contrastCheckRequired with text colors"],
      "source": "recommended",
      "confidence": "medium"
    }
  },
  "accessibilityNotes": ["Do not certify contrast until final values are measured."]
}
```

## Hand-Offs

Hand off final contrast validation and production token export to later
validation or implementation tasks.
