---
name: generate-footer-foundation
description: Generate footer layout, anatomy, navigation groups, industry-specific needs, provenance, and confidence for DesignSystemSeed foundations.
license: See repository LICENSE
---

# Generate Footer Foundation

## Purpose

Create footer foundation guidance for recovery navigation, contact details,
legal links, and industry-specific needs.

## Philosophy

Footer foundations should define recovery structure and required trust or legal
content, not a decorative endcap. Keep navigation grouped, make contact and
compliance needs explicit, and avoid turning the footer into a second hero or a
dumping ground for every page.

## References

- `references/footer-foundation-method.md`
- `references/_shared/design-philosophy/design-system/design-system-principles.md`
- `references/_shared/design-philosophy/design-system/design-system-anti-slop.md`
- `references/_shared/design-philosophy/design-system/skill-doctrine.md`
- `references/_shared/schemas/design-system-seed.schema.json`
- `references/_shared/schemas/footer-foundation.schema.json`
- `references/_shared/vocabulary/component-anatomy.json`
- `references/_shared/vocabulary/layout-roles.json`
- `references/_shared/vocabulary/content-roles.json`
- `references/_shared/vocabulary/accessibility-rules.json`
- `references/_shared/vocabulary/design-system-source-kinds.json`

## Decision Criteria

1. Preserve required contact and legal information.
2. Include industry-specific needs for local service or healthcare work.
3. Keep footer navigation grouped and readable.
4. Avoid making the footer a second hero section.

## Rules

1. Include layout, anatomy, navigation groups, rules, source, and confidence.
2. Add industry-specific needs when relevant.
3. Keep legal links accessible but visually secondary.
4. Preserve contact and support recovery paths when the site type requires
   them.
5. Keep mobile footer structure stacked and scannable.

## Boundary

Owns footer foundation only. Does not own final footer styling, maps, embeds, or
production content management.

## Workflow

1. Identify recovery navigation needs.
2. Define desktop and mobile layout.
3. Add contact/legal/industry needs.
4. Return schema-compatible footer JSON.

## Anti-Patterns

- Footer as a dumping ground for every page link.
- Missing contact information for local-service sites.
- Legal links hidden from keyboard users.
- Using the footer as another primary conversion hero.
- Hiding unresolved compliance needs outside open questions.

## Inline Example

```json
{
  "layout": {
    "desktop": "columns-with-contact",
    "mobile": "stacked"
  },
  "anatomy": ["contact", "serviceNavigation", "legal", "secondaryAction"],
  "navigationGroups": ["services", "company", "legal"],
  "industrySpecificNeeds": ["show phone number for local-service recovery"],
  "rules": [
    "Keep legal links keyboard reachable.",
    "Do not repeat the hero's primary CTA treatment in the footer."
  ],
  "source": "recommended",
  "confidence": "medium",
  "note": "Confirm required compliance links with project owner."
}
```

## Hand-Offs

Hand off exact content and compliance review to project-specific implementation.
