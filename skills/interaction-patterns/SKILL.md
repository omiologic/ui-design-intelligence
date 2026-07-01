---
name: interaction-patterns
description: Define UIBlueprint interaction patterns for dialogs, drawers, popovers, forms, accordions, tabs, banners, toasts, sticky bars, and stateful components.
license: See repository LICENSE
---

# Interaction Patterns

Use this skill when a wireframe needs interaction behavior, overlay behavior, or state terminology.

## Purpose

Specify interaction and overlay behavior in schema-friendly terms without
inventing state names or implementation detail.

## Philosophy

Interactions are justified when they make the user's task clearer, safer, or more
recoverable. They are not decoration. A wireframe should capture the interaction
contract: trigger, state, focus, dismissal, feedback, and where the user returns
after the interaction ends.

Every interaction must earn its interruption. Start with the least disruptive
surface that preserves meaning and recovery, then escalate only when the task
needs blocking attention, extra space, persistence, or a separate route.

## References

- `references/interaction-surface-selection.md`
- `references/overlay-patterns.md`
- `references/form-patterns.md`
- `references/state-terminology.md`
- `references/_shared/vocabulary/interaction-states.json`
- `references/_shared/vocabulary/node-types.json`
- `references/_shared/design-philosophy/overlay-decision.md`
- `references/_shared/design-philosophy/structural-anti-slop.md`

## Decision Criteria

1. Prefer inline structure when the content, control, validation, or feedback
   belongs in the current flow.
2. Use a dialog when the user must make or confirm a blocking decision before
   continuing.
3. Use a drawer when secondary work needs space but should preserve page context.
4. Use a popover when contextual help or selection belongs to one trigger and can
   be dismissed lightly.
5. Use a toast for transient confirmation that does not require action.
6. Use a banner for persistent page-, form-, or system-level status.
7. Use sticky bars only when persistent access materially improves task success.
8. Use a new page when the task needs a URL, history behavior, or full-page
   context.

## Boundary

- Owns: interaction pattern selection, state naming, overlay behavior, focus management, and schema-friendly trigger and state specification for wireframe plans.
- Does not own: visual styling, design token values, final wireframe JSON emission, or runtime implementation code.
- Hand off page structure and section ordering to `page-wireframe-planner` or `section-wireframe-planner`.
- Hand off final wireframe emission to `generate-wireframe-config`.

## Rules

1. Always specify trigger, visible state, dismissal, focus path, keyboard path,
   and return point for overlays and hidden-content controls.
2. Include loading, empty, error, disabled, selected, expanded, and success states
   only when they change the user's next action or feedback.
3. Keep behavior at wireframe fidelity: name the contract, not framework events
   or animation timing.
4. Prefer inline feedback over overlays when the issue belongs to one field,
   control, or section.
5. Do not hide primary content, required instructions, or recovery actions behind
   hover-only, transient, or easily missed surfaces.
6. A deterministic command could later flag incomplete interaction contracts, but
   this skill does not need a command or subagent by default.

## Anti-Patterns

- Modal for non-blocking content: it interrupts task flow without earning the
  interruption.
- Drawer for required primary work: the main task becomes secondary and easier
  to miss.
- Interaction without state: the blueprint says a control opens or submits but
  omits open, error, loading, or success handling.
- Tooltip as required instruction: critical guidance disappears behind hover or
  focus-only UI.
- Toast for recovery: the message can disappear before the user fixes the
  problem.
- Dismissal ambiguity: users can open an overlay but the wireframe does not say
  how they leave or where focus returns.
- Responsive mismatch: a desktop popover is kept on mobile even though it needs
  a drawer, page, or inline treatment.

## Workflow

1. Decide whether the interaction is necessary for the task or only decorative.
2. Choose the smallest surface that preserves context, safety, and feedback.
3. Escalate only when inline treatment cannot support the decision, space,
   persistence, or recovery need.
4. Define trigger, state names, dismissal, focus, keyboard, feedback, recovery,
   responsive behavior, and return point.
5. Attach the interaction to concrete node IDs or paths.
6. Hand accessibility-sensitive patterns to review before final output.

## Inline Example

Input: "Open size guide from product details."

Output: trigger from size picker; `dialog` only if measurement choice blocks
purchase; close button, escape dismissal, focus trap, and return focus to size
guide trigger.

Input: "Show payment failed after checkout submit."

Output: use a form-level `banner` and field-level error text when the user can
fix payment inline; use a `dialog` only if the checkout must halt until the
payment path is resolved. Do not use a disappearing toast for required recovery.

## Hand-Offs

- Use `design-terminology` if the brief says "popup", "flyout", or another
  ambiguous term.
- Use `component-wireframe-planner` when interaction state belongs inside a
  reusable component.
- Use `accessibility-wireframe-review` for dialogs, drawers, tabs, accordions,
  forms, and keyboard-heavy flows.
