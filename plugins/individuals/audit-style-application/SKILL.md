---
name: audit-style-application
description: Review StyleApplication, StylePatch, or StyleBlend outputs for scope fit, accessibility risk, contradictions, and overuse.
license: See repository LICENSE
---

# Audit Style Application

Use this skill when a style application, patch, or blend needs review before it
affects design-system, blueprint, or prototype outputs.

## Purpose

Audit style usage for scope correctness, compatibility, accessibility, source
integrity, and preservation of existing decisions.

## Philosophy

Style audits protect downstream work from visual drift. The audit should judge
whether the artifact honors its declared scope, target, intensity, preserve
rules, avoid rules, source constraints, and accessibility obligations. It should
not reward novelty for its own sake, and it should not ask design-system seed
generation to solve problems that belong in the style artifact.

## Decision Criteria

1. Check whether the style fits the project, industry, scope, component, and
   target intensity.
2. Flag style overuse, low contrast, conflicting mappings, and missing preserve
   rules.
3. Confirm source/license notes exist for generated or external-derived records.
4. Prefer actionable fixes over vague taste judgment.
5. Send artifacts back to recommendation, application, blending, extraction, or
   mapping based on the smallest failing contract.

## Boundary

- Owns: readiness review for style artifacts.
- Does not own: rewriting full design-system seeds, implementing UI, changing
  blueprint structure, or replacing product requirements.

## References

- `references/style-application-audit.md`
- `../../../shared/schemas/style-application.schema.json`
- `../../../shared/schemas/style-patch.schema.json`
- `../../../shared/schemas/style-blend.schema.json`

## Rules

1. Audit against the requested scope, not personal preference.
2. Treat accessibility risks as blockers or explicit caveats.
3. Do not approve copied third-party prose in distributed records.
4. Require local artifacts to prove they do not override global brand,
   typography, palette, structure, or component decisions.


## Anti-Patterns

- Approving a style because it is fashionable while it harms the task.
- Missing local/global scope drift.
- Ignoring source and license notes.

## Workflow

1. Validate the artifact shape and referenced style id.
2. Review scope, intensity, preserve, apply-to, and avoid rules.
3. Compare against compatibility and accessibility risks.
4. Return findings, required fixes, and handoff status.

## Inline Example

```json
{
  "status": "changes_required",
  "artifactType": "styleApplication",
  "findings": [
    {
      "severity": "high",
      "field": "preserve",
      "issue": "The section application does not preserve brand palette.",
      "fix": "Add brand palette to preserve rules before mapping."
    },
    {
      "severity": "medium",
      "field": "avoid",
      "issue": "Glass surface treatment lacks contrast guardrails.",
      "fix": "Add avoid rules for low contrast text over translucent panels."
    }
  ],
  "handoff": "Return to apply-style-reference for a scoped patch."
}
```

## Hand-Offs

Hand accepted artifacts to design-system mapping or downstream generation. Hand
rejected artifacts back to recommendation, blending, or application skills.
