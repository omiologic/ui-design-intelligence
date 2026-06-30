---
name: generate-header-foundation
description: Generate header layout, anatomy, navigation, behavior, provenance, and confidence for DesignSystemSeed foundations.
license: See repository LICENSE
---

# Generate Header Foundation

## Purpose

Create header foundation guidance for desktop/mobile layout, anatomy,
navigation, behavior, and rules.

## Philosophy

Header foundations encode navigation capacity, responsive behavior, and CTA
priority without designing the final chrome. Preserve observed structure when it
exists, keep mobile behavior explicit, and prevent the header from creating a
second competing primary journey.

## References

- `references/header-foundation-method.md`
- `references/_shared/design-philosophy/design-system/design-system-principles.md`
- `references/_shared/design-philosophy/design-system/design-system-anti-slop.md`
- `references/_shared/design-philosophy/design-system/skill-doctrine.md`
- `references/_shared/schemas/design-system-seed.schema.json`
- `references/_shared/schemas/header-foundation.schema.json`
- `references/_shared/vocabulary/component-anatomy.json`
- `references/_shared/vocabulary/layout-roles.json`
- `references/_shared/vocabulary/interaction-states.json`
- `references/_shared/vocabulary/accessibility-rules.json`
- `references/_shared/vocabulary/design-system-source-kinds.json`

## Decision Criteria

1. Preserve observed navigation when evidence exists.
2. Use drawer behavior on mobile when navigation exceeds compact capacity.
3. Keep conversion CTA visible when page goals require it.
4. Avoid final visual header styling.

## Rules

1. Include layout, height, behavior, anatomy, navigation, rules, source, and
   confidence.
2. Keep header CTA priority subordinate to page journey when needed.
3. Record sticky behavior explicitly.
4. Bound navigation item counts and name mobile overflow behavior.
5. Use semantic anatomy and behavior contracts rather than final CSS.

## Boundary

Owns header foundation only. Does not own production navigation code, dropdown
implementation, or visual styling.

## Workflow

1. Identify header anatomy and nav count.
2. Choose desktop and mobile layout contracts.
3. Define behavior and rules.
4. Return schema-compatible header JSON.

## Anti-Patterns

- Header that competes with the hero CTA.
- Mobile nav with no drawer or menu model.
- Unbounded primary navigation items.
- Treating sticky behavior as implied instead of recorded.
- Encoding final visual header styling in the foundation.

## Inline Example

```json
{
  "layout": {
    "desktop": "logo-nav-cta",
    "mobile": "logo-menu-action"
  },
  "height": {
    "desktop": "72px",
    "mobile": "56px"
  },
  "behavior": {
    "sticky": false,
    "mobileMenu": "drawer"
  },
  "anatomy": ["logo", "primaryNavigation", "primaryAction", "mobileMenuButton"],
  "navigation": {
    "maxItems": 5,
    "overflowBehavior": "drawer"
  },
  "rules": ["Header CTA must not outrank the page's primary conversion path."],
  "source": "recommended",
  "confidence": "medium"
}
```

## Hand-Offs

Hand off detailed navigation flow to prototype skills.
