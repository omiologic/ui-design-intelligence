---
name: generate-accessibility-audit-report
description: Generate accessibility audit findings for UI structure, focus behavior, forms, overlays, navigation, responsive changes, and assistive technology risks.
license: See repository LICENSE
---

# Generate Accessibility Audit Report

Use this skill when accessibility risk needs a prioritized audit output.

## Purpose

Evaluate structural accessibility, keyboard behavior, focus order, labels,
landmarks, form recovery, overlays, and responsive reading order.

## Philosophy

An accessibility audit report is a prioritization and handoff artifact, not a
generic compliance claim. It should explain which user task is at risk, what
evidence supports the finding, why the severity is justified, and what structural
or behavioral fix should happen next. When evidence is incomplete, report the
missing evidence as risk instead of pretending an implementation test was run.

## References

- `references/accessibility-audit-reporting.md`
- `references/accessibility-severity-remediation.md`
- `../../../shared/schemas/page-audit.schema.json`
- `../../../shared/vocabulary/audit-severity.json`
- `../../../shared/templates/page-audit.md`

## Decision Criteria

1. `critical`: the primary task cannot be found, operated, dismissed, submitted,
   or recovered.
2. `high`: a primary workflow is likely blocked or seriously misleading because
   labels, focus, errors, or responsive access are missing.
3. `medium`: completion remains possible but structure creates likely confusion
   or extra cognitive load.
4. `low`: the structure works but handoff detail is weak.
5. `info`: contextual observation with no corrective action.

## Boundary

- Owns: accessibility finding reports for deployed or described UIs — landmarks, labels, focus order, keyboard behavior, overlay dismissal, form recovery, and responsive reading order.
- Does not own: accessibility review at wireframe fidelity, visual design recommendations, SEO evaluation, or interaction audit findings.
- Hand off wireframe-stage accessibility checks to `accessibility-wireframe-review`.
- Hand off multi-dimension page evaluation to `generate-page-audit-report`.

## Rules

1. Mark observed structure and behavior as evidence.
2. Mark missing required structure as inferred risk when no implementation test
   was performed.
3. Do not claim WCAG conformance, automated test coverage, DOM behavior, contrast,
   or screen-reader behavior unless the source includes that evidence.
4. Every finding needs target, evidence, impact, recommendation, and optional
   handoff.

1. Use `accessibility` as `auditType`.
2. Prioritize issues that block operation, understanding, or recovery.
3. Include evidence and expected accessible behavior.
4. Avoid claiming automated compliance without actual test evidence.
5. Return JSON matching `page-audit.schema.json`.
6. Hand off structural diagnosis to `accessibility-wireframe-review` before
   report generation when the source is a UIBlueprint. Use commands only for
   deterministic schema or fixture checks; this report skill does not need a
   separate command or subagent yet.

## Anti-Patterns

- Vague compliance finding: "not accessible" without target, evidence, user
  impact, or corrective behavior.
- Severity inflation: marking every accessibility issue `critical` even when the
  primary task still works.
- False automation: implying keyboard, screen-reader, or WCAG testing happened
  when only a wireframe or screenshot was reviewed.
- Visual-only fix: recommending color, spacing, or polish when the issue is
  actually label, state, focus, or recovery structure.

## Workflow

1. Identify the audited source, viewport, and primary user task.
2. Inventory landmarks, headings, controls, forms, overlays, state feedback, and
   responsive access.
3. Separate observed failures from inferred risks and out-of-scope code checks.
4. Assign severity from task impact using `references/accessibility-severity-remediation.md`.
5. Write schema-compatible findings with concrete structural recommendations and
   handoffs.

## Inline Example

```json
{
  "id": "checkout-drawer-accessibility-audit",
  "source": {
    "urlOrName": "Checkout drawer",
    "viewport": "mobile"
  },
  "auditType": "accessibility",
  "summary": "The payment form lacks visible labeling and recovery placement for a required card field.",
  "overallSeverity": "high",
  "findings": [
    {
      "id": "card-field-missing-label",
      "title": "Required card field has no visible label",
      "severity": "high",
      "category": "accessibility",
      "target": "checkout.drawer > payment.form > cardNumber.inputGroup",
      "evidence": "The supplied structure shows a required card field without a visible label or field-level error location.",
      "impact": "Keyboard and assistive-technology users may fail checkout input and recovery.",
      "recommendation": "Add a visible label, helper text when needed, associated error text, and failed-submit focus guidance.",
      "handoff": "accessibility-wireframe-review"
    }
  ]
}
```

## Hand-Offs

Hand off structural remediation to blueprint or wireframe skills when the issue
is architectural. Hand off implementation-specific verification to accessibility
testing outside this skill when DOM, keyboard, screen-reader, or contrast
evidence is required.
