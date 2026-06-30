# Accessibility Study Method

Use this reference to study accessibility-relevant UI structure from screenshots,
page captures, descriptions, or partial implementation evidence. This is an
observation method, not a WCAG conformance test.

## Core Principle

Accessibility study separates what is visible, what is reasonably inferred, and
what is missing. A capture can reveal structural risks, but it cannot prove DOM
order, ARIA relationships, keyboard behavior, screen reader output, or automated
test results unless that evidence is supplied.

## Observation Template

For each relevant page region or component, record:

- Source: page name, route, viewport, capture date, or supplied description.
- Target: section, component, form, overlay, navigation, sticky UI, or control.
- Observed evidence: visible labels, headings, controls, helper/error text,
  focus cues, landmarks, grouping, state, and responsive behavior.
- Inferred risk: plausible issue that follows from visible structure but needs
  confirmation.
- Missing evidence: DOM order, keyboard path, focus trap, return focus, ARIA,
  screen reader naming, contrast, automated results, or device behavior.
- User impact: what task may become hard to find, understand, operate, dismiss,
  submit, or recover from.
- Handoff: accessibility review, interaction study, blueprint generation, audit
  report, or implementation test.

## Observable Signals

### Labels And Names

- Visible labels for fields and controls.
- Icon-only buttons with visible text, aria-label evidence, or missing label
  evidence.
- Button and link text that describes the action or destination.
- Repeated controls that need distinct names.

### Landmarks And Headings

- Header, navigation, main content, footer, breadcrumb, search, and form regions.
- Logical heading order and whether the first major heading names the page or
  task.
- Multiple navigation regions that may need accessible names.

### Forms And Errors

- Field labels, helper text, required/optional indicators, grouped fields, and
  submit action.
- Error, warning, loading, disabled, and success feedback when visible.
- Whether recovery appears near the affected field or only as a global message.

### Focus And Keyboard Risks

- Dialogs, drawers, popovers, accordions, tabs, menus, filters, sticky bars, and
  hidden content.
- Trigger, dismissal, focus movement, return focus, and keyboard path evidence.
- Controls that appear reachable only by hover, drag, or pointer position.

### Responsive Access

- Whether mobile preserves primary action, navigation, filters, form controls,
  comparison data, and recovery paths.
- Whether sticky UI obscures fields or content.
- Whether collapsed content remains discoverable and operable.

## Anti-Patterns

- Conformance leap: claiming the page is accessible because visible structure
  looks orderly.
- Failure leap: claiming a label, landmark, ARIA relationship, or keyboard path
  is missing when the capture simply does not show implementation evidence.
- Visual-only study: ignoring focus, keyboard, responsive access, and recovery
  because the static layout looks clear.
- Color-only critique: making contrast claims from screenshots without supplied
  color measurements or visual-testing evidence.
- Issue without target: reporting "accessibility problems" without naming the
  section, component, control, or task.
- Missing evidence erased: omitting unknown DOM, keyboard, or assistive-tech
  questions from the study handoff.

## Command And Tool Decision

Browser, DOM, keyboard, and automated accessibility checks can be useful when the
task includes a live page or implementation. Reference them as future evidence
collection, not as proof available from a static capture. This skill does not
need a subagent by default; use a separate evidence-collection pass only when
the work explicitly includes browser testing or implementation validation.

## Worked Example

Input: mobile checkout drawer capture with an icon-only close control, email
field, coupon field, submit button, sticky total bar, and no visible helper or
error text.

Finding:

- Observed evidence: drawer is visible, close control is icon-only, form fields
  are visible, submit action is visible, sticky total bar occupies bottom space,
  and no helper/error text is visible in the capture.
- Inferred risk: close control may lack an accessible name; sticky bar may
  obscure form recovery on small screens; drawer needs focus trap and return
  focus behavior.
- Missing evidence: DOM labels, ARIA names, keyboard path, focus trap, return
  focus, validation, error, loading, and success behavior.
- Handoff: `accessibility-wireframe-review` for structural fix guidance and
  `study-ui-interaction` for state and dismissal behavior.
