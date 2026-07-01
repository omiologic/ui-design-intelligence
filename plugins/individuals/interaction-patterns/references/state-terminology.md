# State Terminology

Use `_.convention/vocabulary/interaction-states.json` as the source of truth.

## Decision Heuristics

Name the user-visible state, not the implementation event. A state belongs in
the wireframe when it changes available actions, content, focus behavior, or
feedback.

Common structural states include:

- `open` and `closed` for overlays.
- `expanded` and `collapsed` for accordions and drawers.
- `selected` for tabs or choices.
- `loading`, `success`, `warning`, `error`, and `empty` for feedback states.

Do not invent synonyms such as shown, popped, activated, or failed when an
approved state exists.

## Anti-Pattern

Bad: `state: "submitted"` on a form.

Corrected: represent the result as `success` or `error`, and include the
corresponding `banner`, `toast`, or field-level error content.

## Worked Example

For tabs, mark the active tab as `selected` and keep panel content as child
sections. Do not use `open` for tabs because tabs choose among peer panels rather
than opening an overlay.

## Hand-Off

This file normalizes state names. Use `form-patterns.md` and
`overlay-patterns.md` for behavior, and the shared interaction-state vocabulary
for the allowed token list.
