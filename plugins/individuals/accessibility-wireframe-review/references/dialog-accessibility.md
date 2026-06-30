# Dialog Accessibility

Use this checklist for `dialog` and blocking overlay nodes.

## Decision Heuristics

Use a `dialog` only when background interaction must pause. If the content is
contextual and non-blocking, prefer `popover`; if it is a side workflow, prefer
`drawer`.

- Dialog has an accessible name.
- Focus moves into the dialog on open.
- Focus is trapped while the dialog is open.
- Escape closes the dialog unless the task is destructive or legally required.
- Focus returns to the trigger on close.
- Primary and secondary actions are clearly identified.
- Background content is not reachable while the dialog is modal.

## Focus Trap And Return Focus

On open, focus should move to the dialog heading or first meaningful control. Tab
and Shift+Tab stay inside the dialog. On close, focus returns to the trigger that
opened the dialog unless that trigger no longer exists; then focus returns to the
nearest stable parent control.

## Destructive Or Legal Tasks

Escape may be disabled only when dismissing would lose legally required review or
destructive confirmation. In that case, include explicit cancel and confirm
actions and explain the keyboard behavior.

## Anti-Pattern

Bad: "Dialog opens with contact form" and no focus notes.

Corrected: include `accessibility.ariaLabel`, `focusManagement`, and
`keyboardBehavior`, plus a clear close action and return-focus behavior.

## Worked Example

For a contact dialog, set `state: "closed"` by default, give the dialog an
accessible name, move focus to the heading on open, trap focus, close on Escape,
and return focus to the "Contact us" trigger.

## Hand-Off

This file reviews modal accessibility only. Use `overlay-patterns.md` to decide
whether the surface should be a dialog, drawer, popover, or toast, and use
`component-wireframe-planner` for the dialog's child structure.
