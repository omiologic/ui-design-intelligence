# Accessibility Audit Reporting

Generate accessibility findings from observed UI structure, interaction notes,
captures, or provided implementation details.

## Decision Heuristics

- Review landmark structure, heading order, control names, visible labels, form
  errors, focus order, keyboard operation, and overlay dismissal.
- Treat inaccessible primary actions, trapped focus, missing form recovery, and
  hidden required information as high or critical depending on severity.
- Separate likely accessibility risk from verified implementation failure when
  only visual evidence is available.
- Recommend expected behavior, not just the violation label.
- Tie every finding to a user task, affected user capability, and corrective
  structure. A violation name alone is not enough.
- Use the shared audit severity tokens exactly; do not invent "major", "minor",
  or WCAG conformance labels unless verified by a separate implementation test.

## Evidence Rules

- Observed: structure, labels, states, focus notes, breakpoints, or captured
  behavior present in the supplied source.
- Inferred risk: likely failure when the source omits necessary accessibility
  structure, such as return focus or field-level errors.
- Out of scope: contrast, DOM roles, live regions, and browser behavior unless
  the source includes implementation evidence.

## Anti-Pattern

Bad: saying "not accessible" without naming the user task or evidence.

Corrected: state which user cannot complete which task, cite the observed UI
evidence, and recommend a verifiable behavior.

Bad: assigning `critical` because the word "accessibility" appears in the issue.

Corrected: reserve `critical` for blocked completion, unsafe dismissal, or
unrecoverable primary task failure; otherwise use `high`, `medium`, or `low`
based on task impact.

## Worked Example

If a modal opens from a product card and there is no visible close control or
return-focus behavior, create a high severity finding when the modal blocks the
page. Recommend focus trap, Escape dismissal, visible close control, and return
focus to the trigger.

For a payment form with a required card field but no visible label or field-level
error location, create a high severity finding. The impact is failed input and
recovery in a primary checkout task. Recommend visible label, helper text when
needed, associated error text, and failed-submit focus guidance.

## Hand-Off

Hand off structural diagnosis to `accessibility-wireframe-review`, stateful
behavior details to `generate-interaction-audit-report`, component remediation to
`component-wireframe-planner`, and implementation-specific verification to the
target frontend or QA workflow.
