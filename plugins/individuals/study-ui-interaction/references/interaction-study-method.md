# Interaction Study Method

Use this reference to study interaction behavior from screenshots, captures,
descriptions, or live interaction evidence. This is an observation method, not a
replacement for interaction design or implementation testing.

## Core Principle

Study interactions by separating observed behavior, reasonable inference, and
missing evidence. A visible control can imply possible behavior, but the study
must not invent triggers, transitions, dismissal, validation, timing, keyboard
access, or success/failure states that the source does not show.

## Observation Template

For each interaction, record:

- Source: page name, route, viewport, capture date, or supplied description.
- Target: control, form, overlay, menu, disclosure, tab, filter, sticky UI, or
  feedback surface.
- Trigger evidence: visible button, link, icon, field, chip, row, tab, gesture,
  or supplied event.
- Surface evidence: inline content, `popover`, `drawer`, `dialog`, `banner`,
  `toast`, sticky bar, new page, or unknown.
- State evidence: `open`, `closed`, `expanded`, `collapsed`, `selected`,
  `loading`, `success`, `warning`, `error`, `empty`, `disabled`, or missing.
- Transition evidence: what appears, disappears, reorders, changes label, or
  changes available actions.
- Dismissal or completion path: close control, outside click, Escape, submit,
  cancel, back path, timeout, or missing evidence.
- Feedback timing: immediate, after submit, after async load, transient,
  persistent, unknown, or missing.
- Recovery path: where the user fixes errors, retries, clears filters, changes
  input, or escalates.
- Observed, inferred, and missing evidence.

## Observable Signals

### Triggers

- Buttons, links, tabs, rows, accordions, chips, filters, search fields, menu
  icons, form submit buttons, close controls, and sticky actions.
- Ambiguous affordances: items that look clickable but lack clear labels or
  state cues.

### Surfaces

- Inline expansion, menu, popover, drawer, dialog, banner, toast, sticky bar, or
  new page.
- Whether the surface is blocking, contextual, persistent, transient, or part of
  normal page flow.

### States

- Visible current state, selected filters, active tabs, expanded panels,
  disabled controls, loading indicators, empty results, errors, warnings, and
  success messages.
- Missing state evidence for forms, async data, filters, checkout, booking, and
  overlays.

### Feedback And Recovery

- Where confirmation, warning, error, validation, loading, and empty states
  appear.
- Whether feedback is persistent enough for the user to act.
- Whether recovery appears near the affected control or only globally.

### Focus, Keyboard, And Responsive Evidence

- Record visible focus cues only when shown.
- Mark keyboard path, focus trap, Escape behavior, return focus, and ARIA naming
  as missing evidence unless live or implementation evidence is supplied.
- Note when mobile changes the surface, hides controls, or changes recovery.

## Anti-Patterns

- Behavior invention: saying a control opens, submits, dismisses, validates, or
  succeeds without observed or supplied evidence.
- State collapse: recording only the default state and omitting missing loading,
  empty, error, disabled, or success states.
- Failed-state blind spot: forms, filters, booking, checkout, and data surfaces
  are studied only on the happy path.
- Surface mismatch claim without evidence: declaring that a dialog, drawer, or
  popover is wrong before observing the task and surface contract.
- Feedback timing guess: assuming toasts auto-dismiss or banners persist without
  timing evidence.
- Keyboard certainty from screenshots: claiming keyboard support or failure
  without live, DOM, or implementation evidence.
- Flow fragmentation: studying controls by visual location while missing how
  they work together as one task.

## Command And Tool Decision

Browser commands are useful when the task includes a live page: click controls,
capture before/after states, test Escape and tab order, submit forms with valid
and invalid data, and record mobile/desktop differences. Treat those as an
explicit evidence-collection workflow, not as assumed evidence from static
captures. This skill does not need a subagent by default; use a separate
interaction exploration pass only for complex live flows or multi-step products.

## Worked Example

Input: product listing capture shows filter button, selected category chips,
sort menu, product cards, empty-state text in another capture, and no visible
error or loading state.

Finding:

- Observed: filter trigger is visible, selected chips show `selected` state, sort
  menu trigger is visible, product cards update area is implied by listing, and
  empty-state text exists in a supplied capture.
- Inferred: filter likely opens a drawer or panel, but target surface is
  unconfirmed without the open state.
- Missing evidence: loading state, error state, clear-all behavior, drawer
  dismissal, keyboard behavior, return focus, and mobile filter behavior.
- Handoff: `interaction-patterns` to define filter surface and state contract;
  `study-ui-accessibility` for focus and keyboard risks.
