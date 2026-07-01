---
name: audit-design-system-consistency
description: Audit DesignSystemSeed artifacts for cross-section consistency between tokens, components, states, layout rules, accessibility notes, and usage guidance.
license: See repository LICENSE
---

# Audit Design System Consistency

## Purpose

Check whether design-system seed sections agree with one another before
downstream generation uses the seed.

## Philosophy

Consistency means every token, component, state, and accessibility rule points to
the same contract. A schema-valid seed can still fail if components reference
missing roles, action priority conflicts across sections, or accessibility rules
are isolated from the states that need them.

## References

- `references/design-system-consistency-audit.md`
- `references/_shared/design-philosophy/design-system/design-system-principles.md`
- `references/_shared/design-philosophy/design-system/design-system-anti-slop.md`
- `references/_shared/design-philosophy/design-system/skill-doctrine.md`
- `references/_shared/design-system/design-system-quality-checklist.md`
- `references/_shared/design-system/token-taxonomy.md`
- `references/_shared/design-system/component-anatomy-reference.md`
- `references/_shared/design-system/component-state-guidelines.md`
- `references/_shared/design-system/accessibility-token-guidelines.md`
- `references/_shared/design-system/responsive-system-guidelines.md`
- `references/_shared/schemas/design-system-seed.schema.json`
- `references/_shared/vocabulary/design-token-types.json`
- `references/_shared/vocabulary/component-anatomy.json`
- `references/_shared/vocabulary/component-variants.json`
- `references/_shared/vocabulary/layout-roles.json`
- `references/_shared/vocabulary/accessibility-rules.json`
- `references/_shared/vocabulary/design-system-source-kinds.json`
- `references/_shared/vocabulary/content-roles.json`
- `references/_shared/vocabulary/interaction-states.json`

## Decision Criteria

1. Use this audit after completeness and naming pass.
2. Verify components reference available tokens.
3. Verify states and actions match interaction vocabulary.
4. Verify header, footer, buttons, and cards follow the same source/confidence
   discipline.

## Rules

1. Check token references across components.
2. Check component variant behavior against allowed actions.
3. Check accessibility rules are not contradicted by component rules.
4. Record unresolved conflicts as open questions.
5. Flag multiple primaries, missing referenced tokens, orphan tokens, and
   final-styling drift across sections.

## Boundary

Owns cross-section consistency review only. Does not rewrite the seed unless
explicitly asked.

## Workflow

1. Compare palette and token taxonomy roles to component references.
2. Compare anatomy parts to component requirements.
3. Compare states to component requirements and shared state guidelines.
4. Compare token accessibility constraints to component states, palette roles,
   typography, target size, motion, and opacity guidance.
5. Compare responsive token and component expectations to header/footer/card,
   form, navigation, and prototype handoff rules.
6. Compare layout and content roles to header/footer/card rules.
7. Use the shared quality checklist to judge whether consistency gaps block
   review-ready or implementation-ready handoff.
8. Report conflicts and suggested fixes.

## Anti-Patterns

- Components referencing nonexistent token names.
- Header/footer rules contradicting responsive assumptions.
- Accessibility notes isolated from component state requirements.
- Two sections assigning primary action priority to competing components.
- Palette or type tokens present with no usage in components or notes.

## Inline Example

```json
{
  "status": "needsRevision",
  "findings": [
    {
      "severity": "blocker",
      "path": "components.buttons.variants.button.primary.background",
      "issue": "References color.action.primary, but palette does not define that token.",
      "remediation": "Add the semantic palette token or update the button reference."
    },
    {
      "severity": "warning",
      "path": "components.header.rules",
      "issue": "Header CTA is primary while button rules allow only one primary per region.",
      "remediation": "Clarify whether the header action is secondary on pages with a hero CTA."
    }
  ],
  "checkedContracts": ["token references", "component states", "action priority", "accessibility constraints"],
  "openQuestions": ["Should header CTA remain visible but secondary on conversion pages?"]
}
```

## Hand-Offs

Hand off missing token/component definitions to the relevant foundation skill.
