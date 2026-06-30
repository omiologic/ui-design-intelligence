---
name: extract-typography-foundation
description: Extract or recommend typography families and type scale tokens with source and confidence for lightweight design-system seed generation.
license: See repository LICENSE
---

# Extract Typography Foundation

## Purpose

Create typography foundation fields for font families and readable type scale.

## Philosophy

Typography foundations should create readable, reusable roles rather than a
finished type system. Treat screenshot-only font reads as inferred, keep the
scale compact, and make every token's usage clear enough for downstream
blueprints and prototypes to apply it consistently.

## References

- `references/typography-foundation-method.md`
- `references/_shared/design-philosophy/design-system/design-system-principles.md`
- `references/_shared/design-philosophy/design-system/design-system-anti-slop.md`
- `references/_shared/design-philosophy/design-system/skill-doctrine.md`
- `references/_shared/schemas/design-system-seed.schema.json`
- `references/_shared/schemas/typography-foundation.schema.json`
- `references/_shared/vocabulary/design-token-types.json`
- `references/_shared/vocabulary/design-system-source-kinds.json`

## Decision Criteria

1. Use CSS or explicit user input for observed font families.
2. Treat screenshot-only typography as inferred, not exact.
3. Recommend system-safe families when evidence is missing.
4. Keep scale small enough for blueprint/prototype consistency.

## Rules

1. Mark font families and scale values with source/confidence.
2. Include usage for each scale token.
3. Avoid viewport-scaled font-size formulas in seed guidance.
4. Keep production font licensing out of scope.
5. Use semantic role names such as `typography.heading.h1`; avoid names tied
   only to size, mood, or visual treatment.
6. Do not claim exact font families from screenshots without inspectable CSS or
   user-provided evidence.

## Boundary

Owns typography foundation only. Does not own final type art direction,
production CSS, or brand typography licensing.

## Workflow

1. Inspect available evidence for fonts.
2. Decide observed, inferred, recommended, or generated status.
3. Define compact scale roles.
4. Add notes where confirmation is needed.

## Anti-Patterns

- Claiming exact fonts from screenshots.
- Creating a large production type ramp too early.
- Using display type inside compact UI surfaces by default.
- Emitting orphan type tokens that no component or page role should use.
- Using final production CSS or viewport formulas as seed decisions.

## Inline Example

```json
{
  "fontFamilies": {
    "typography.family.heading": {
      "value": "Inter",
      "source": "inferred",
      "confidence": "medium",
      "note": "Looks similar in screenshot; confirm in source CSS."
    },
    "typography.family.body": {
      "value": "system sans",
      "source": "recommended",
      "confidence": "medium"
    }
  },
  "scale": {
    "typography.heading.h1": {
      "fontSize": "40px",
      "lineHeight": "48px",
      "fontWeight": 700,
      "usage": "Primary page heading only",
      "source": "recommended",
      "confidence": "medium"
    },
    "typography.body.default": {
      "fontSize": "16px",
      "lineHeight": "24px",
      "fontWeight": 400,
      "usage": "Default paragraph and form copy",
      "source": "recommended",
      "confidence": "medium"
    }
  }
}
```

## Hand-Offs

Hand off final typography decisions to downstream visual design or production
implementation.
