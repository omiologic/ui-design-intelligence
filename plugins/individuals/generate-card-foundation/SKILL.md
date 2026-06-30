---
name: generate-card-foundation
description: Generate card base rules, anatomy, variants, actions, provenance, and confidence for DesignSystemSeed component foundations.
license: See repository LICENSE
---

# Generate Card Foundation

## Purpose

Create card foundation rules for features, services, products, testimonials, or
other repeated content.

## Philosophy

Card foundations should protect repeated content consistency. Define card
variants by content job and required anatomy, keep action priority bounded, and
avoid visual names or final card styling that would turn the seed into a partial
component library.

## References

- `references/card-foundation-method.md`
- `references/_shared/design-philosophy/design-system/design-system-principles.md`
- `references/_shared/design-philosophy/design-system/design-system-anti-slop.md`
- `references/_shared/design-philosophy/design-system/skill-doctrine.md`
- `references/_shared/schemas/design-system-seed.schema.json`
- `references/_shared/schemas/card-foundation.schema.json`
- `references/_shared/vocabulary/component-anatomy.json`
- `references/_shared/vocabulary/component-variants.json`
- `references/_shared/vocabulary/content-roles.json`
- `references/_shared/vocabulary/design-system-source-kinds.json`

## Decision Criteria

1. Choose card variants by content job.
2. Keep anatomy consistent within repeated grids.
3. Include required parts and allowed actions.
4. Avoid overloading cards with competing CTAs.

## Rules

1. Include base, anatomy, variants, rules, source, and confidence.
2. Use approved variant names such as `card.service` and `card.feature`.
3. Keep social proof, service, and product card jobs distinct.
4. Preserve consistent anatomy inside repeated grids.
5. Bind card action roles to allowed actions rather than final UI behavior.

## Boundary

Owns card component foundation only. Does not own final card visuals or
production components.

## Workflow

1. Identify repeated content jobs.
2. Select variants from shared vocabulary.
3. Define anatomy and required parts.
4. Add rules and provenance.

## Anti-Patterns

- Mixing unrelated card jobs in one repeated grid.
- Adding too many CTAs to one card.
- Naming cards by visual size or color.
- Creating orphan card variants with no intended content job.
- Using production visual styling as the foundation contract.

## Inline Example

```json
{
  "base": {
    "radius": "8px",
    "hasBorder": true
  },
  "anatomy": ["media", "title", "summary", "action"],
  "variants": {
    "card.service": {
      "usage": "Repeated service option in a service grid",
      "requiredParts": ["title", "summary", "action"],
      "allowedActions": ["navigate"]
    },
    "card.testimonial": {
      "usage": "Social proof quote with attribution",
      "requiredParts": ["quote", "attribution"],
      "allowedActions": []
    }
  },
  "rules": ["Do not mix service and testimonial cards in one repeated grid."],
  "source": "recommended",
  "confidence": "medium"
}
```

## Hand-Offs

Hand off layout selection to blueprint skills and behavior to prototype skills.
