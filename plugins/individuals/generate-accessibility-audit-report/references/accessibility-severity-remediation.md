# Accessibility Severity And Remediation

Use this reference to turn accessibility observations into prioritized report
findings. The report should explain the user impact, cite observed evidence, and
recommend a structural fix that can be reviewed.

## Decision Heuristics

- Start with the blocked user task. Severity follows the task impact, not the
  amount of code or design work required.
- Use `critical` when the primary task cannot be found, operated, dismissed,
  submitted, or recovered by keyboard or assistive technology.
- Use `high` when the issue is likely to block or seriously mislead users in a
  primary workflow, such as an unlabeled required field, missing error recovery,
  inaccessible modal dismissal, or hidden mobile action.
- Use `medium` when the task remains possible but heading order, grouping,
  labels, focus notes, or responsive order create likely confusion.
- Use `low` when the structure works but the handoff lacks enough detail for
  confident implementation.
- Use `info` only for contextual observations that do not require corrective
  action.
- Separate verified evidence from inferred risk. If implementation behavior was
  not tested, say what is missing rather than claiming failure.

## Report Structure

Each accessibility finding should include:

- `target`: node path, selector, page area, or component name.
- `evidence`: what was observed in the blueprint, capture, or implementation.
- `impact`: which user or task is affected and why it matters.
- `severity`: one of `info`, `low`, `medium`, `high`, or `critical`.
- `recommendation`: a concrete structural or behavioral fix.
- `handoff`: the next skill or workflow when the report cannot own the fix.

## Remediation Patterns

| Issue | Typical Severity | Structural Fix |
| --- | --- | --- |
| Missing main landmark or unclear page map | medium to high | Add `header`, `main`, `footer`, navigation labels, and heading order |
| Required field without visible label | high | Add visible label, helper text when needed, and field-level `errorText` |
| Form errors only appear globally | medium to high | Add field-level errors and focus guidance after failed submit |
| Dialog lacks focus trap or return focus | high to critical | Add trigger, focus entry, trap, Escape or close action, and return-focus behavior |
| Mobile hides primary action or required content | high | Preserve the action/content or document an equivalent mobile path |
| State change is not perceivable | medium to high | Add success, loading, error, or empty feedback location and announcement notes |

## Anti-Pattern

Bad: "The form is not accessible."

Corrected: "`checkout.form > email.inputGroup` has no visible label or
field-level error placement. This is high severity because users cannot reliably
understand or recover from a required checkout field. Add a visible label,
helper text where needed, associated `errorText`, and failed-submit focus
guidance."

## Worked Example

Finding:

```json
{
  "id": "checkout-drawer-missing-focus-return",
  "title": "Checkout drawer lacks return-focus behavior",
  "severity": "high",
  "category": "accessibility",
  "target": "checkout.drawer",
  "evidence": "The drawer includes open and close actions, but no focus-management note describes where focus moves on open or returns on close.",
  "impact": "Keyboard and assistive-technology users can lose their place after closing a primary purchase workflow.",
  "recommendation": "Add focus entry, focus trap while open, Escape or close-button dismissal, and return focus to the cart trigger.",
  "handoff": "interaction-patterns"
}
```

## Hand-Off

Use `accessibility-wireframe-review` to diagnose structural accessibility risks
before writing a report. Use `interaction-patterns` for focus, keyboard, and
dismissal contracts. Use `component-wireframe-planner` for form or component
anatomy fixes. Use implementation QA only when code-level behavior must be
verified outside the wireframe.
