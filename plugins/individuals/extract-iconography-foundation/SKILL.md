---
name: extract-iconography-foundation
description: Define iconography style, usage, rules, source, and confidence for a lightweight design-system seed.
license: See repository LICENSE
---

# Extract Iconography Foundation

## Purpose

Create iconography foundation guidance for style, stroke, corner treatment,
preferred library, usage, and rules.

## Philosophy

Iconography foundations should create one coherent support system, not a custom
asset direction. Prefer accessible, label-supporting icon roles with honest
source and confidence metadata, and avoid mixing families or inventing final
illustration style in the seed layer.

## References

- `references/iconography-foundation-method.md`
- `references/_shared/design-philosophy/design-system/design-system-principles.md`
- `references/_shared/design-philosophy/design-system/design-system-anti-slop.md`
- `references/_shared/design-philosophy/design-system/skill-doctrine.md`
- `references/_shared/schemas/design-system-seed.schema.json`
- `references/_shared/schemas/iconography-foundation.schema.json`
- `references/_shared/vocabulary/component-anatomy.json`
- `references/_shared/vocabulary/accessibility-rules.json`
- `references/_shared/vocabulary/design-system-source-kinds.json`

## Decision Criteria

1. Use observed icon systems when source evidence is clear.
2. Recommend one simple icon style when evidence is missing.
3. Keep icons supportive of labels and scanning.
4. Avoid mixing filled and outline styles in one component group.

## Rules

1. Include source and confidence.
2. Define usage by context: navigation, cards, status, and buttons.
3. Keep iconography structural enough for generation, not final artwork.
4. Keep one icon family/style unless the evidence gives a recorded reason.
5. Include label and accessibility constraints whenever icons appear in
   interactive contexts.

## Boundary

Owns icon style conventions only. Does not own custom icon production,
illustration, or final visual asset creation.

## Workflow

1. Identify observed or requested icon library/style.
2. Normalize style and rules.
3. Add usage guidance and constraints.
4. Return schema-compatible iconography JSON.

## Anti-Patterns

- Decoration-only icons in every card.
- Mixing icon families without a reason.
- Treating icons as a substitute for accessible labels.
- Claiming an observed icon library from screenshots alone.
- Creating custom production icon artwork in a seed.

## Inline Example

```json
{
  "style": "outline",
  "strokeWidth": "2px",
  "cornerStyle": "rounded",
  "preferredLibrary": "lucide",
  "usage": {
    "buttons": "support text labels only",
    "navigation": "use sparingly for recognition",
    "status": "pair with visible status text"
  },
  "rules": [
    "Do not replace accessible labels with icons.",
    "Use one icon family unless a source explicitly requires otherwise."
  ],
  "source": "recommended",
  "confidence": "medium",
  "note": "No source icon system was observed."
}
```

## Hand-Offs

Hand off production asset choices to downstream visual design or implementation.
