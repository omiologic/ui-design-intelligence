# Component States

Reference `_.convention/vocabulary/interaction-states.json` for canonical states.

## Decision Heuristics

Add a state only when it changes structure, behavior, accessibility, or copy. Do
not enumerate every visual pseudo-state for wireframes.

State coverage protects the user journey from happy-path bias. A component that
can wait, fail, be empty, become disabled, or require recovery should model that
condition before visual design begins.

## Common States

- `default`
- `hover`
- `focus`
- `active`
- `selected`
- `disabled`
- `expanded`
- `collapsed`
- `open`
- `closed`
- `loading`
- `success`
- `warning`
- `error`
- `empty`

## State Selection

- Use `open` and `closed` for overlays and disclosure surfaces.
- Use `expanded` and `collapsed` for accordions, drawers, and expandable groups.
- Use `selected` for tabs, segmented choices, and selected cards.
- Use `loading`, `success`, `warning`, `error`, and `empty` for async or feedback
  states that need distinct content.
- Use `disabled` only when the component remains visible but cannot be used.

## Required State Coverage

- Forms: default, focus, disabled, loading or submitting, success, error.
- Input groups: default, focus, error, disabled.
- Buttons: default, disabled, loading when action can take time.
- Dialogs and drawers: closed, open, loading or error when remote content or
  submission occurs inside the surface.
- Tabs and accordions: selected/open and unselected/closed relationships.
- Lists, tables, and card grids: populated, empty, loading, error, and selected
  when selection changes the next action.
- Cards: default, selected, unavailable, or loading only when those conditions
  change the card's meaning or available action.

## Best Practices

- Pair state names with feedback locations, not just labels.
- State how the user enters and exits states when the transition affects focus,
  keyboard access, or recovery.
- Keep visual-only states out unless they explain interaction semantics.
- Use representative state copy for errors and empty states because copy length
  can change the component structure.

## Anti-Pattern

Bad: writing `state: "clicked"` on a button.

Corrected: use `active` for press interaction if the state affects behavior, or
omit state if the wireframe does not need to describe that transient visual.

Bad: a data table only shows populated rows.

Corrected: include empty, loading, and error states when the data can be absent,
slow, or unavailable, and state what action the user can take next.

## Worked Example

For a newsletter form, include default form structure plus alternate `banner` or
`toast` feedback nodes for `success` and `error` states when submission outcome
changes the page.

## Hand-Off

This file names states. Use `interaction-patterns` to describe how users enter
or leave those states and `accessibility-wireframe-review` to verify that state
changes are perceivable and keyboard reachable.
