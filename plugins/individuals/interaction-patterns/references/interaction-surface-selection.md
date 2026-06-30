# Interaction Surface Selection

Use this reference to choose the least interruptive interaction surface that
still protects the user's task, context, feedback, and recovery path.

## Core Principle

Every interaction must earn its interruption. If the user can understand,
complete, or recover from the task inline, keep it inline. Escalate to popover,
drawer, dialog, banner, toast, sticky bar, or a new page only when the task
requires a stronger surface.

## Surface Decision Matrix

| Surface | Use When | Required Contract |
| --- | --- | --- |
| Inline node | The content, validation, or control belongs directly in the current flow. | Label, state, feedback location, and how it changes the next action. |
| `popover` | Short contextual help or selection belongs to one trigger and should dismiss lightly. | Trigger, open/closed state, outside click/Escape dismissal, focus behavior, and return point. |
| `drawer` | Secondary work needs room while preserving page context, such as filters, cart, mobile nav, or detail editing. | Trigger, open/closed state, close affordance, Escape behavior, focus handling, and return point. |
| `dialog` | The user must complete, confirm, or dismiss a blocking decision before continuing. | Trigger, open/closed state, focus trap, close/dismissal rules, keyboard path, return focus, and feedback. |
| `banner` | Persistent page, form, or system status affects the current task. | Status level, placement, action if any, relationship to affected content, and dismissal if allowed. |
| `toast` | Transient confirmation does not require a decision or recovery action. | Triggering event, message state, timeout/dismissal behavior, and fallback if the message is important. |
| `stickyBar` | Persistent action or status materially improves task success across scroll or mobile. | Scope, primary action, overlap constraints, responsive behavior, and dismissal if allowed. |
| New page | The task deserves its own URL, history behavior, or full-page context. | Entry route, back path, page title/goal, and preserved context. |

## Contract Checklist

- Trigger: what node or event starts the interaction.
- Surface: inline, popover, drawer, dialog, banner, toast, sticky bar, or page.
- State: approved state names such as `open`, `closed`, `expanded`,
  `collapsed`, `selected`, `loading`, `success`, `warning`, `error`, `empty`, or
  `disabled`.
- Dismissal: how the user exits and whether dismissal is allowed.
- Focus: where focus moves on open and where it returns on close.
- Keyboard: Escape, Tab order, arrow keys, Enter/Space, or form submit behavior
  when relevant.
- Feedback: where errors, success, warnings, loading, and empty states appear.
- Recovery: how the user fixes or retries a failed action.
- Responsive: how the surface changes across desktop, tablet, and mobile.

## Anti-Patterns

- Modal overuse: a non-blocking helper, filter, or status interrupts the whole
  page.
- Hidden primary content: a popover, accordion, tooltip, or drawer hides the
  main task or required instructions.
- Toast for recovery: critical errors disappear before the user can act.
- Tooltip as documentation: required guidance only appears on hover or focus.
- Focus contract missing: the surface opens but focus movement, keyboard path,
  or return point is undefined.
- Dismissal trap: the user can open an overlay but cannot predictably leave it.
- State drift: implementation-style event names replace approved user-visible
  states.
- Responsive mismatch: a desktop popover becomes unusable on mobile without a
  drawer, page, or inline alternative.

## Deterministic Checks

A future command could flag interaction nodes that mention `dialog`, `drawer`,
`popover`, or hidden content without trigger, dismissal, focus, keyboard, or
return-point notes. This should stay deterministic and contract-focused; surface
choice still requires UX judgment. No subagent is needed by default.

## Worked Examples

Size guide from product details:

- Use inline helper text when the guide is one short measurement note.
- Use `popover` when the guide is brief and anchored to the size selector.
- Use `dialog` only when the measurement choice blocks purchase and needs a
  focused comparison table.

Checkout payment failure:

- Do not use a disappearing toast.
- Use a form-level `banner` and field-level error content, or a `dialog` only if
  the user must resolve the issue before continuing.
