---
name: generate-interaction-audit-report
description: Generate interaction audit reports for forms, overlays, navigation, disclosure patterns, feedback states, and task flows.
license: See repository LICENSE
---

# Generate Interaction Audit Report

Use this skill when behavior, state, or task completion quality is the primary
audit concern.

## Purpose

Evaluate triggers, states, transitions, feedback, keyboard behavior, error
recovery, and mobile interaction details.

## Philosophy

Every interaction surface is a structural decision. A report should explain
whether the surface helps the user complete, recover, compare, dismiss, or
continue a task. Interaction findings are not about taste or animation polish;
they are about missing contracts: trigger, state, feedback, dismissal, focus,
keyboard access, and responsive equivalence.

## References

- `references/interaction-audit-reporting.md`
- `references/interaction-severity-remediation.md`
- `../../../shared/schemas/page-audit.schema.json`
- `../../../shared/vocabulary/audit-severity.json`
- `../../../shared/templates/interaction-audit.md`

## Decision Criteria

1. `critical`: the user cannot complete, cancel, recover, or escape a primary
   task.
2. `high`: a primary workflow is likely blocked or misleading because trigger,
   feedback, error, focus, or dismissal behavior is missing.
3. `medium`: the task remains possible but the next step, state, or recovery path
   is unclear.
4. `low`: the interaction works but handoff detail is weak.
5. `info`: contextual observation with no corrective action.

## Rules

1. Cite observed triggers, states, feedback, focus notes, dismissal behavior, or
   captured interaction behavior.
2. Mark missing required contracts as inferred risk when no implementation test
   was performed.
3. Do not claim animation, framework, browser, or assistive-technology behavior
   unless the source includes that evidence.
4. Every finding needs target, evidence, impact, recommendation, and optional
   handoff.

1. Use `interaction` as `auditType`.
2. Inventory expected states before judging behavior.
3. Include keyboard, focus, recovery, and feedback findings where relevant.
4. Tie recommendations to task completion.
5. Return JSON matching `page-audit.schema.json`.
6. Use `interaction-patterns` when the source needs a contract definition before
   reporting. Add deterministic checks only for fixture-proven missing contracts;
   this report skill does not need a separate command or subagent yet.

## Anti-Patterns

- Happy-path-only report: documents trigger and success but omits loading, error,
  cancellation, dismissal, or retry paths.
- Gratuitous overlay acceptance: treats `dialog`, `drawer`, or `popover` as fine
  without asking whether the task earns interruption or hidden content.
- Hidden primary task: approves accordion, modal, or drawer behavior that buries
  the page's main action or required content.
- Vague interaction finding: says "confusing" without target, evidence, state,
  task impact, or fix.
- Visual-only fix: recommends animation or styling when the missing issue is
  state, feedback, dismissal, or focus.

## Workflow

1. Identify the source, viewport, user task, and interaction path.
2. Inventory trigger, surface, states, feedback, dismissal, focus, keyboard, and
   responsive behavior.
3. Separate observed failures from inferred risks and out-of-scope code checks.
4. Assign severity from task impact using `references/interaction-severity-remediation.md`.
5. Write schema-compatible findings with concrete interaction-contract fixes and
   handoffs.

## Inline Example

```json
{
  "id": "product-filters-interaction-audit",
  "source": {
    "urlOrName": "Product filter drawer",
    "viewport": "mobile"
  },
  "auditType": "interaction",
  "summary": "The filter drawer has controls and apply behavior but lacks result-state feedback.",
  "overallSeverity": "medium",
  "findings": [
    {
      "id": "filter-apply-missing-feedback-states",
      "title": "Filter apply has no loading, empty, error, or success feedback",
      "severity": "medium",
      "category": "interaction",
      "target": "productFilters.drawer",
      "evidence": "The drawer includes filter controls and an Apply button, but no post-apply state coverage.",
      "impact": "Users cannot tell whether filtering worked, failed, or returned no results.",
      "recommendation": "Add apply loading feedback, empty-results content, error with retry, and focus return to the updated result summary.",
      "handoff": "interaction-patterns"
    }
  ]
}
```

## Hand-Offs

Hand off missing structural states to blueprint or prototype skills. Hand off
implementation-specific event, focus, or runtime behavior verification to code
or browser-based testing outside this report skill.
