# Accessibility Checklist

Review whether the wireframe exposes enough structure for accessible
implementation. Focus on landmarks, names, focus movement, error recovery, and
responsive behavior.

## Decision Heuristics

- Start with landmarks before components: users need a reliable page map.
- Check focus order against the structural order, not the eventual visual layout.
- Require accessible names for navigation, dialogs, forms, and repeated controls.
- Prefer inline, associated errors for fields; use form-level summaries only as
  navigation aids.
- Treat mobile collapsed navigation and sticky UI as accessibility risks that
  need explicit behavior notes.

## Structure

- Page has clear header, main, and footer regions when applicable.
- Navigation has a meaningful label.
- Repeated sections have clear headings.

## Forms

- Inputs are grouped and labeled.
- Required and optional fields are clear.
- Error and helper text have defined placement.

## Interaction

- Interactive components expose state.
- Keyboard behavior is described for overlays and disclosure components.
- Focus order follows the visual and structural flow.

## Responsive

- Mobile layout does not hide required actions.
- Sticky UI does not obscure important content.

## Focus Order Reasoning

Focus should enter the page at skip links or the first meaningful control, move
through header navigation, then main content, then footer or persistent actions.
When layout changes on mobile, focus order should still follow the task sequence
rather than the desktop visual columns.

## Forms And Errors

Each `inputGroup` needs a label, helper text when the expected input is not
obvious, and nearby `errorText` when validation fails. A form-level `banner` can
summarize errors, but it should not replace field-level associations.

## Skip Links And Landmarks

Use landmarks for `header`, `navigation`, `main`, and `footer` when present. Add
skip-link guidance when pages have repeated navigation, long filters, sticky
headers, or dense repeated cards before the main content.

## Anti-Pattern

Bad: reviewing a checkout form only for whether fields are present.

Corrected: verify field labels, required/optional clarity, error placement,
focus order after submit, form-level error summary, and whether sticky checkout
actions obscure the final fields.

## Worked Example

For a mobile navigation drawer, require a labeled trigger, `drawer` with an
accessible name, focus moved into the drawer on open, Escape and close button
dismissal, return focus to the trigger, and background content removed from the
focus order.

## Hand-Off

This reference reviews accessibility risks. Use `interaction-patterns` to define
missing behavior, `component-wireframe-planner` to restructure components, and
`wireframe-schema` to encode fixes in schema-compatible fields.
