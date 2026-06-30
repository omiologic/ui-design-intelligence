# Accessibility Severity

Use severity to decide what must be fixed before visual design and what can be
tracked as a handoff note. Severity is about user impact in the modeled
structure, not about how hard the fix might be.

## Decision Heuristics

- Start with the task path: if the issue blocks orientation, input, submission,
  recovery, dismissal, or navigation, it is at least major.
- Treat missing focus contracts on `dialog`, `drawer`, disclosure, and sticky
  interactions as major until the wireframe proves the user can enter, move,
  dismiss, and return.
- Treat missing labels on required controls and form fields as major because the
  user cannot reliably understand the action or input.
- Treat missing landmarks, heading order, and repeated-section labels as major on
  dense pages because they break page mapping for keyboard and assistive-tech
  users.
- Treat incomplete annotations as minor only when the structure remains operable
  and understandable without the missing note.
- Do not downgrade a structural issue because visual design or engineering could
  solve it later. If the wireframe owns the structure, the wireframe owns the
  fix.

## Severity Model

| Severity | Use When | Typical Fix |
| --- | --- | --- |
| Critical | The primary task cannot be found, operated, dismissed, submitted, or recovered | Restructure the affected path before handoff |
| Major | The task is possible but labels, grouping, focus, state, or responsive order create likely failure | Add missing labels, states, focus rules, or responsive priority |
| Minor | The structure works but handoff details are underspecified | Add annotations or clarify names |
| Follow-up | The risk depends on visual styling, code behavior, or content not present in the wireframe | Record the dependency and owner |

## Prioritization

1. Fix navigation and landmarks before isolated component polish.
2. Fix input, validation, and recovery before static content clarity.
3. Fix overlay focus and dismissal before secondary interaction notes.
4. Fix mobile access to required content and actions before desktop-only
   refinements.
5. Preserve the page's primary journey. Do not add extra UI when a clearer label,
   state, grouping, or focus rule solves the issue.

## Structure-First Fixes

- Add or rename a landmark when the page map is unclear.
- Add visible labels, helper text, and error placement to input groups.
- Add trigger, open state, focus entry, focus trap, dismissal, and return-focus
  notes to overlays.
- Add empty, loading, error, and disabled states when the component can enter
  those states.
- Add responsive notes that preserve required actions across breakpoints.

## Anti-Pattern

Bad: "Accessibility needs review later" on a form with unlabeled required fields
and no error model.

Corrected: mark the form issue as major, add labels and field-level errors in
the wireframe, and leave only visual contrast or code-level behavior as later
follow-up.

## Worked Example

Finding: `checkout.drawer > payment.form > cardNumber.inputGroup` has no visible
label and no error placement.

Severity: major. The input is required for the primary task, and the user cannot
recover from invalid input without an associated error location.

Fix: add a visible "Card number" label, helper text for accepted formats when
needed, field-level `errorText`, and submit-error focus guidance.

## Hand-Off

Use `component-wireframe-planner` when the fix requires changing form anatomy.
Use `interaction-patterns` when focus, dismissal, or keyboard behavior is
missing. Use `layout-specification` when responsive order or sticky UI causes the
accessibility issue.
