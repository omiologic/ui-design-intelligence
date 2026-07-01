# Overlay Decision Model

Overlays interrupt the page flow. Use them only when interruption or temporary
context is the right structural behavior.

## First Question

Can the interaction be inline without losing clarity, focus, or recoverability?
If yes, prefer inline disclosure, section expansion, or a normal page region.

## Overlay Selection

### Dialog

Use a dialog when the user must complete, confirm, or dismiss a focused task
before returning to the page.

Why: a dialog blocks the background to protect attention and prevent conflicting
actions. It is wrong for lightweight tips, menus, or optional details.

Required blueprint evidence:

- Trigger
- Open and closed states
- Focus management
- Keyboard dismissal
- Primary and secondary actions
- Return focus behavior

### Drawer

Use a drawer when a secondary workflow needs more space but should preserve the
user's page context.

Why: a drawer keeps the originating page visible in concept while making room
for carts, filters, navigation, inspectors, or settings.

Required blueprint evidence:

- Edge or origin
- Trigger and close behavior
- Whether background remains interactive
- Responsive behavior
- Focus and keyboard rules

### Popover

Use a popover for contextual, anchored content that is useful but not blocking.

Why: a popover answers a local question or exposes a small control set without
claiming the whole page.

Required blueprint evidence:

- Anchor node
- Open and dismissed states
- Outside-click or escape behavior
- Placement fallback when space is constrained

### Toast

Use a toast for transient feedback after an action that does not require a new
decision.

Why: a toast confirms status without forcing the user to stop. It is wrong when
the user must choose, repair, or review important detail.

## Anti-Patterns

- Modal for non-blocking information: interruption without need.
- Popover for multi-step workflows: insufficient space and weak recovery.
- Drawer as a dumping ground: secondary workflow has no defined scope.
- Overlay without trigger or dismissal: the blueprint omits the interaction
  contract.
