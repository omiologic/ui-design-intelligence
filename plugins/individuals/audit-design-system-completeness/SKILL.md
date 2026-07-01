---
name: audit-design-system-completeness
description: Audit DesignSystemSeed artifacts for required sections, provenance, confidence, accessibility notes, usage guidance, and open questions.
license: See repository LICENSE
---

# Audit Design System Completeness

## Purpose

Check whether a design-system seed is complete enough for blueprint, wireframe,
or prototype generation.

## Philosophy

Completeness is not the same as certainty. A usable seed may contain inferred or
low-confidence decisions, but those decisions must be explicit, source-labeled,
accessible enough to guide downstream work, and backed by open questions where
evidence is missing.

## References

- `references/design-system-completeness-audit.md`
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
- `references/_shared/vocabulary/accessibility-rules.json`
- `references/_shared/vocabulary/design-system-source-kinds.json`

## Decision Criteria

1. Use this audit before downstream generation consumes a seed.
2. Flag missing sections, missing source/confidence, missing rules, and missing
   open questions.
3. Treat low-confidence fields as acceptable only when they are explicit.
4. Require accessibility notes for palette and interaction-relevant components.

## Rules

1. Check brand, palette, typography, iconography, buttons, cards, header, and
   footer.
2. Verify source/confidence metadata where exactness matters.
3. Check semantic token intent fields.
4. Report severity and remediation.
5. Treat hidden assumptions, orphan tokens, missing accessibility constraints,
   and missing open questions as completeness failures.

## Boundary

Owns completeness review only. Does not rewrite the seed unless asked.

## Workflow

1. Validate required sections exist.
2. Check provenance and confidence.
3. Check token taxonomy, naming, token accessibility, component anatomy,
   component states, responsive behavior, and component fields.
4. Assign draft, review-ready, or implementation-ready readiness using the
   shared quality checklist.
5. Summarize blockers, warnings, and follow-ups.

## Anti-Patterns

- Passing a seed with hidden assumptions.
- Treating low confidence as a failure when it is clearly marked.
- Ignoring accessibility notes.
- Passing a seed with inferred color pairs but no contrast-check requirement.
- Treating missing component states as a downstream implementation detail.

## Inline Example

```json
{
  "status": "blocked",
  "findings": [
    {
      "severity": "blocker",
      "path": "palette.colors.color.action.primary",
      "issue": "Inferred action color has no accessibility note.",
      "remediation": "Add contrastCheckRequired and keep confidence at medium until measured."
    },
    {
      "severity": "warning",
      "path": "openQuestions",
      "issue": "No question records unresolved source CSS confirmation.",
      "remediation": "Add an open question for final color and font verification."
    }
  ],
  "checkedContracts": ["brand", "palette", "typography", "iconography", "components"],
  "openQuestions": ["Confirm exact palette values from source CSS."]
}
```

## Hand-Offs

Hand off missing sections to focused foundation skills and naming drift to
`audit-design-system-naming`.
