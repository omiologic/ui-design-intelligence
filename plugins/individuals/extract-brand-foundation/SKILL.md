---
name: extract-brand-foundation
description: Extract and normalize the brand foundation section for a DesignSystemSeed from brief, study, screenshot, URL, or knowledge inputs.
license: See repository LICENSE
---

# Extract Brand Foundation

## Purpose

Create the brand section of a design-system seed: name, summary, personality,
audience, positioning, voice, and visual direction.

## Philosophy

The brand foundation should make generation direction explicit without inventing
strategy. Preserve known brand facts, label category judgments as inferred or
recommended, and leave missing positioning or audience decisions as open
questions for the seed.

## References

- `references/brand-foundation-method.md`
- `references/_shared/design-system/brand-asset-color-extraction.md`
- `references/_shared/design-philosophy/design-system/design-system-principles.md`
- `references/_shared/design-philosophy/design-system/design-system-anti-slop.md`
- `references/_shared/design-philosophy/design-system/skill-doctrine.md`
- `references/_shared/schemas/design-system-seed.schema.json`
- `references/_shared/schemas/runtime-design-theme.schema.json`
- `references/_shared/schemas/brand-foundation.schema.json`
- `references/_shared/vocabulary/design-system-source-kinds.json`

## Decision Criteria

1. Prefer user-provided brand and audience facts.
2. Mark category-based judgments as `inferred` or `recommended`.
3. Avoid unsupported claims, regulated claims, or final campaign positioning.
4. Keep brand direction useful for generation without becoming marketing copy.

## Rules

1. Include source and confidence on every evidence-bearing brand field.
2. Separate voice tone from visual direction.
3. Keep personality terms concrete enough to affect generation.
4. Preserve open questions when brand facts are missing.
5. Do not upgrade inferred personality, audience, or positioning into
   high-confidence observed facts.
6. Avoid final-styling drift: visual direction describes density, style, and
   emphasis, not polished art direction.
7. When brand assets are present, preserve logo, wordmark, favicon, app icon,
   safe-background, extracted-color, and do-not-use evidence for downstream
   `RuntimeDesignTheme` generation.
8. Never promote screenshot-derived or inferred logo colors to high confidence.

## Boundary

Owns brand foundation only and may preserve brand asset evidence for runtime
theme handoff. Does not own palette, typography, component behavior, final
positioning, or copywriting.

## Workflow

1. Identify provided brand facts.
2. Extract category and audience cues.
3. Normalize voice and visual direction.
4. Mark provenance and confidence.
5. Return schema-compatible brand JSON plus human notes.

## Anti-Patterns

- Luxury or playful language without evidence.
- Copying a source site’s exact positioning.
- Treating visual direction as final art direction.
- Fabricating brand identity when the evidence is thin.
- Hiding unknown audience or positioning decisions outside `openQuestions`.

## Inline Example

```json
{
  "name": {"value": "Northline Dental", "source": "userProvided", "confidence": "high"},
  "summary": {"value": "Local dental practice focused on preventive care and appointment access.", "source": "inferred", "confidence": "medium"},
  "personality": {"values": ["calm", "practical", "precise"], "source": "inferred", "confidence": "medium"},
  "audience": {"values": ["local patients", "families comparing providers"], "source": "userProvided", "confidence": "high"},
  "positioning": {"value": "Accessible care with clear scheduling paths.", "source": "recommended", "confidence": "medium"},
  "voice": {
    "tone": {"value": "plainspoken and reassuring", "source": "recommended", "confidence": "medium"},
    "avoid": {"values": ["luxury claims", "fear-based urgency"], "source": "recommended", "confidence": "medium"}
  },
  "visualDirection": {
    "density": {"value": "moderate", "source": "recommended", "confidence": "medium"},
    "style": {"value": "clean service utility", "source": "recommended", "confidence": "medium"},
    "emphasis": {"value": "trust cues and appointment clarity", "source": "recommended", "confidence": "medium"}
  }
}
```

## Hand-Offs

Hand off color to `extract-palette-foundation`, typography to
`extract-typography-foundation`, and unresolved evidence gaps to seed open
questions.
