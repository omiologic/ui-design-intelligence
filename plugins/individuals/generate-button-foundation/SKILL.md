---
name: generate-button-foundation
description: Generate button base rules, variants, states, allowed actions, provenance, and confidence for DesignSystemSeed component foundations.
license: See repository LICENSE
---

# Generate Button Foundation

## Purpose

Create the button component foundation for a design-system seed.

## Philosophy

Button foundations encode action priority and state coverage, not final button
styling. The seed should make one primary action role clear, bind variants to
semantic tokens, and preserve focus, disabled, and loading behavior so downstream
prototype and UI work does not invent unsafe states.

## References

- `references/button-foundation-method.md`
- `references/_shared/design-philosophy/design-system/design-system-principles.md`
- `references/_shared/design-philosophy/design-system/design-system-anti-slop.md`
- `references/_shared/design-philosophy/design-system/skill-doctrine.md`
- `references/_shared/schemas/design-system-seed.schema.json`
- `references/_shared/schemas/button-foundation.schema.json`
- `references/_shared/vocabulary/component-variants.json`
- `references/_shared/vocabulary/interaction-states.json`
- `references/_shared/vocabulary/accessibility-rules.json`
- `references/_shared/vocabulary/design-system-source-kinds.json`

## Decision Criteria

1. Define `button.primary`, `button.secondary`, and optional low-emphasis
   variants based on task priority.
2. Include states needed by prototype behavior.
3. Use semantic palette tokens rather than raw colors where possible.
4. Keep destructive behavior explicit.

## Rules

1. Include base radius, font weight, heights, variants, states, and rules.
2. Use allowed actions such as `navigate` and `openDialog` deliberately.
3. Preserve focus, disabled, and loading states.
4. Do not define visual hover styling as production CSS.
5. Use semantic token references for color roles instead of raw visual values.
6. Avoid multiple primaries, value-named variants, and unowned action behavior.

## Boundary

Owns button foundation. Does not own final visual styling or framework
components.

## Workflow

1. Identify primary conversion/completion actions.
2. Map action priority to variants.
3. Add state coverage and allowed actions.
4. Return schema-compatible button JSON.

## Anti-Patterns

- Multiple primary buttons competing in one region.
- Generic labels that hide outcomes.
- Variant names like `blueButton`.
- Missing `focus`, `disabled`, or `loading` states.
- Encoding final CSS hover styles in the seed.

## Inline Example

```json
{
  "base": {
    "radius": "6px",
    "fontWeight": 600,
    "height": {"default": "44px", "compact": "36px"}
  },
  "variants": {
    "button.primary": {
      "usage": "Single highest-priority action per region",
      "background": "color.action.primary",
      "text": "color.text.inverse",
      "requiredParts": ["label"],
      "allowedActions": ["navigate", "openDialog"]
    },
    "button.secondary": {
      "usage": "Supporting action below the primary priority",
      "background": "color.surface.default",
      "text": "color.action.primary",
      "border": "color.border.default",
      "requiredParts": ["label"],
      "allowedActions": ["navigate"]
    }
  },
  "states": ["default", "hover", "focus", "disabled", "loading"],
  "rules": ["Only one primary action variant may dominate a region."],
  "source": "recommended",
  "confidence": "medium"
}
```

## Hand-Offs

Hand off final behavior to prototype config and final styling to visual tooling.
