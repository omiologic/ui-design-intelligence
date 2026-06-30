# Overlay Patterns

## Decision Heuristics

- Start inline. Escalate only when the task requires interruption, extra space,
  persistent visibility, or a separate route.
- Use `dialog` when the user must complete, confirm, or dismiss a focused task
  before returning to the page.
- Use `drawer` when the overlay is a secondary workflow that benefits from page
  context, such as cart, filters, or navigation.
- Use `popover` for short contextual content anchored to one control.
- Use `toast` for transient feedback that does not require a decision.
- Use `banner` for persistent page, form, or system-level status that affects the
  current task.
- Use `stickyBar` for persistent page-level action or status, not temporary
  feedback.
- Use a new page when the task deserves a URL, history behavior, or full-page
  context.

## Contract Checklist

- Trigger and trigger node.
- Initial and active state using approved state vocabulary.
- Dismissal behavior and whether dismissal is allowed.
- Focus movement on open and return focus on close.
- Keyboard behavior, including Escape, Tab order, Enter/Space, and arrow keys
  when relevant.
- Feedback placement for loading, success, warning, error, empty, or disabled
  states.
- Responsive behavior for desktop, tablet, and mobile.

## Dialog

Use for blocking tasks. Include focus trap, escape close behavior, and return
focus to trigger.

## Drawer

Use for side panels, mobile navigation, filters, or secondary workflows. Include
close affordance and focus behavior.

## Popover

Use for lightweight contextual content. Dismiss on outside click and escape.

## Toast

Use for transient feedback. Do not require user action for critical decisions.

## Sticky Bar

Use for persistent calls to action or status. Ensure it does not obscure core
content.

## Anti-Pattern

Bad: using a `toast` for "Your payment failed. Choose another payment method."

Corrected: use a `banner` inside the checkout flow or a `dialog` if immediate
attention is required. A toast can disappear before the user resolves the task.

Bad: using a `dialog` for a short explanatory note beside a field.

Corrected: use inline helper text or a `popover` anchored to the field when the
information is optional and non-blocking.

Bad: defining a drawer without close behavior, Escape handling, or return focus.

Corrected: specify the complete interaction contract before final assembly.

## Worked Example

For mobile filters, use a `drawer` overlay with `state: "closed"` by default,
triggered from the product list toolbar. Include close behavior, Escape handling,
and return focus to the filter trigger.

## Hand-Off

This file chooses overlay type and dismissal behavior. Use
`component-wireframe-planner` for overlay child anatomy and
`accessibility-wireframe-review` for focus trap, return focus, and keyboard
review.
