---
name: audit-design-system-naming
description: Audit DesignSystemSeed token, component, variant, anatomy, state, header, footer, and brand terminology for vocabulary drift.
license: See repository LICENSE
---

# Audit Design System Naming

## Purpose

Check whether design-system seed names are semantic, predictable, and aligned
with shared vocabulary.

## Philosophy

Naming is the design-system contract. Good names describe role and purpose so
values can change safely; weak names describe colors, sizes, moods, or brand
flourish and force downstream tools to guess intent.

## References

- `references/design-system-naming-audit.md`
- `references/_shared/design-philosophy/design-system/design-system-principles.md`
- `references/_shared/design-philosophy/design-system/design-system-anti-slop.md`
- `references/_shared/design-philosophy/design-system/skill-doctrine.md`
- `references/_shared/design-system/token-taxonomy.md`
- `references/_shared/design-system/component-anatomy-reference.md`
- `references/_shared/schemas/design-system-seed.schema.json`
- `references/_shared/vocabulary/design-token-types.json`
- `references/_shared/vocabulary/component-anatomy.json`
- `references/_shared/vocabulary/component-variants.json`
- `references/_shared/vocabulary/layout-roles.json`
- `references/_shared/vocabulary/design-system-source-kinds.json`

## Decision Criteria

1. Use this audit after generating or editing a design-system seed.
2. Prefer semantic names such as `color.action.primary` and `button.primary`.
3. Flag visual-only or vague names.
4. Preserve user-provided brand names while normalizing internal tokens.

## Rules

1. Check color token names, typography roles, component variants, anatomy parts,
   interaction states, header/footer parts, and audit terminology.
2. Flag names like `blueButton`, `bigCard`, `coolHeader`, and `popupThing`.
3. Use shared vocabulary before adding new terms.
4. Require semantic token names to follow `{category}.{role}.{purpose}` where
   applicable.
5. Flag orphan names that do not map to usage, intent, or a component role.

## Boundary

Owns naming review only. Does not decide final brand naming or copy.

## Workflow

1. Inventory names in the seed.
2. Compare names to shared vocabulary and naming patterns.
3. Classify drift by severity.
4. Recommend normalized replacements.

## Anti-Patterns

- Visual naming instead of intent naming.
- Multiple names for the same component.
- Brand terms mixed into generic component tokens.
- Value names such as `blueButton`, `radiusBig`, or `color12`.
- A normalized-looking name with no semantic usage behind it.

## Inline Example

```json
{
  "status": "needsRevision",
  "findings": [
    {
      "severity": "blocker",
      "path": "components.buttons.variants.blueButton",
      "issue": "Variant is named by value rather than role.",
      "replacement": "button.primary",
      "rationale": "Primary describes action priority and can reference any palette value."
    },
    {
      "severity": "warning",
      "path": "palette.colors.color12",
      "issue": "Token has no category-role-purpose meaning.",
      "replacement": "color.action.primary"
    }
  ],
  "namingConvention": "{category}.{role}.{purpose}",
  "openQuestions": ["Confirm whether the branded campaign color needs a semantic role."]
}
```

## Hand-Offs

Hand off structural inconsistencies to `audit-design-system-consistency`.
