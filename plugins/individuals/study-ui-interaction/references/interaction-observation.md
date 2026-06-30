# Interaction Observation

Study how the interface invites action and communicates state through controls,
forms, overlays, disclosure components, and feedback messages.

## Decision Heuristics

- For each interaction, identify trigger, target surface, visible state, and
  dismissal or completion path.
- Record before/after state pairs when the source supplies multiple captures or
  live interaction evidence.
- Treat forms as workflows: field groups, validation, submit action, success
  feedback, and error recovery.
- Treat overlays by modality: blocking dialog, side drawer, contextual popover,
  or transient toast.
- Record affordance ambiguity when a control looks interactive but behavior is
  unclear from the capture.
- Preserve failed-state evidence separately from happy-path evidence; missing
  error, loading, empty, disabled, or success states matter for blueprint
  handoff.

## Observation Categories

- Triggers: buttons, links, tabs, rows, accordions, filters, chips, menus, form
  submits, close controls, and sticky actions.
- Surfaces: inline expansion, popover, drawer, dialog, banner, toast, sticky bar,
  or new page.
- States: open, closed, expanded, collapsed, selected, loading, success, warning,
  error, empty, disabled, or missing evidence.
- Dismissal and completion: close, cancel, Escape, outside click, submit, back
  path, timeout, or missing evidence.
- Feedback and recovery: validation, loading, confirmation, warnings, errors,
  retry, clear filters, and escalation.
- Responsive behavior: whether mobile changes the trigger, surface, state, or
  recovery path.

## Anti-Pattern

Bad: "The page has interactivity."

Corrected: "The filter button opens a side drawer, category chips show selected
state, and the drawer needs an explicit close path and return-focus behavior."

Bad: "The form validates inline" because a form is visible.

Corrected: "The capture shows fields and submit action; validation behavior,
loading state, success, and error recovery are missing evidence unless another
capture or live test shows them."

Bad: "The toast disappears after a few seconds" from a static screenshot.

Corrected: "A toast-like message is visible; timeout, persistence, and recovery
behavior require live or supplied timing evidence."

## Worked Example

For a checkout form, capture required fields, helper copy, submit button,
disabled/loading state, field-level errors, form-level error summary, and success
confirmation path.

For a filter drawer, capture trigger, closed and open states, selected filters,
apply/clear behavior, dismissal controls, result update feedback, empty results,
mobile behavior, and missing keyboard/focus evidence.

## Hand-Off

Use `study-ui-accessibility` for keyboard and focus risks, `interaction-patterns`
for blueprint behavior, and `generate-interaction-audit-report` for quality
findings.
