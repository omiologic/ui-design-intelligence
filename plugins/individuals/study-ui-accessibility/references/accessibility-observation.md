# Accessibility Observation

Study visible accessibility structure and risk indicators. Do not claim technical
conformance without DOM, keyboard, or assistive technology evidence.

## Decision Heuristics

- Look for visible labels, headings, navigation names, error placement, and skip
  or bypass affordances.
- Record the target region or component for every observation so later audit and
  blueprint work can trace the issue.
- Treat overlays, drawers, sticky bars, and collapsed navigation as focus-order
  risks that need behavior evidence.
- Distinguish "not visible in capture" from "missing"; the latter requires
  stronger evidence.
- Prioritize barriers that affect task completion: forms, checkout, booking,
  navigation, and modal workflows.
- Include responsive access in the study when mobile captures or breakpoint
  descriptions are available; required content and actions should remain
  reachable.

## Observation Categories

- Labels and names: field labels, button text, icon-only controls, repeated
  controls, and ambiguous links.
- Landmarks and headings: header, navigation, main, footer, breadcrumb, search,
  form regions, and heading order.
- Forms and feedback: helper text, required/optional indicators, error placement,
  loading, disabled, and success evidence.
- Focus and keyboard risks: overlays, drawers, popovers, tabs, accordions,
  sticky bars, hidden content, and dismissal paths.
- Responsive access: mobile navigation, primary action, filters, form controls,
  comparison data, sticky UI, and recovery paths.

## Anti-Pattern

Bad: "This page is accessible because it has headings."

Corrected: "The page shows clear section headings, but the mobile navigation
drawer and booking dialog need focus-management evidence before accessibility can
be judged."

Bad: "The close icon has no accessible label" from a screenshot alone.

Corrected: "The close control is icon-only in the capture; accessible name is
missing evidence unless DOM, ARIA, or implementation details confirm it."

Bad: ignoring mobile because the desktop structure looks clear.

Corrected: record whether mobile preserves navigation, primary action, form
recovery, and hidden-content access when mobile evidence is available.

## Worked Example

For a contact form capture, record visible field labels, required indicators,
helper text, error placement if shown, submit action, success/error feedback, and
whether sticky UI could obscure fields on mobile.

For an overlay capture, record visible trigger if known, surface type, title,
close control, focus/dismissal evidence if provided, visible form or action
states, and missing keyboard or return-focus evidence.

## Hand-Off

Use `accessibility-wireframe-review` to encode safer blueprint behavior and
`generate-accessibility-audit-report` when the task is to report accessibility
risks as audit findings.
