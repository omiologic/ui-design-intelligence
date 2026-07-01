# Navigation Patterns

Use these patterns when planning, generating, or auditing prototype navigation.
They apply to `PrototypeConfig.screens`, `routes`, `navigationFlows`,
`interactions`, `transitions`, and human prototype plans.

This reference complements:

- `shared/prototype/prototype-quality-checklist.md`
- `shared/prototype/interaction-pattern-library.md`
- `shared/prototype/state-and-feedback-guidelines.md`
- `shared/schemas/prototype-config.schema.json`
- `shared/recipes/prototype.recipe.md`

It defines navigation behavior and handoff expectations. It does not define
visual styling, routing framework code, or a clickable runtime.

## Artifact Mapping

Represent navigation behavior across these fields:

- `screens`: each destination or major stateful surface that can be entered.
- `routes`: URL-like paths or route IDs tied to screens.
- `navigationFlows`: source screen, destination screen, trigger node, and
  navigation action.
- `interactions`: event-level behavior for route changes, overlays, menus,
  scroll targets, active states, and focus movement.
- `transitions`: major movement between screens, states, overlays, or routes.
- `notes`: assumptions, responsive behavior, context preservation, and open
  questions.

## Blueprint Structure Versus Prototype Detail

Put navigation in blueprint structure when it defines information architecture:

- Header, footer, sidebar, bottom navigation, or primary nav regions.
- Named navigation groups.
- Persistent nav locations.
- Section order and major content destinations.
- Stable node IDs for nav items and destination sections.

Put navigation in prototype detail when it defines behavior:

- Which trigger changes which route or screen.
- Active, focus, selected, expanded, collapsed, open, closed, sticky, hidden, or
  visible states.
- Mobile collapse or drawer behavior.
- Back behavior and context preservation.
- Scroll-to behavior.
- Overlay close, focus return, and route synchronization.
- Authentication, permission, viewport, or state conditions.

If a navigation behavior cannot be tied to a stable blueprint node, repair the
source structure before treating the prototype as implementation-ready.

## Core Rules

- Every navigation trigger needs a stable source node ID.
- Every route should point to a defined screen.
- Every navigation flow should define source screen, destination screen, trigger
  node, and action.
- Active state must be distinct from focus state.
- Mobile navigation behavior must be specified when desktop navigation
  collapses, hides, moves, or changes interaction mode.
- Back behavior must be explicit for multi-step, overlay, drawer, filtered, and
  stateful flows.
- Navigation should preserve user context unless the prototype states otherwise.

## Top Navigation

Use top navigation for broad page, product, section, or account-level movement
when users need persistent orientation.

Expected states:

- Nav region: `default`, `sticky` when persistent on scroll.
- Nav item: `default`, `hover`, `focus`, `active`, `selected`.
- Current page or section: `selected` or `active`.
- Disabled item: `disabled` when unavailable.
- Compact trigger: `visible`, `hidden`, `open`, `closed` when nav collapses.

Expected behavior:

- Click or tap navigates, scrolls, opens a menu, or changes state.
- Keyboard focus moves through items in a predictable order.
- Active state follows the current route or section.
- Sticky behavior is documented when used.
- Skip, anchor, or focus movement is noted for same-page navigation.

Mobile behavior:

- Top navigation may collapse into a menu button, drawer, disclosure, or bottom
  navigation.
- Primary action should remain reachable if desktop nav contains a key CTA.
- Menu open/close, Escape, outside-click, focus return, and scroll lock behavior
  should be defined.

Failure modes:

- Current route is not indicated.
- Top nav hides the primary action on mobile.
- Same-page anchors scroll but do not update focus or section context.

Audit prompts:

- Does each nav item have one clear destination or behavior?
- Is the active item distinct from keyboard focus?
- What happens on compact viewports?

## Sidebar Navigation

Use sidebar navigation for dashboards, admin tools, settings, documentation,
and multi-section workspaces.

Expected states:

- Sidebar: `visible`, `hidden`, `expanded`, `collapsed`.
- Current item: `selected`.
- Group: `expanded`, `collapsed`.
- Trigger: `default`, `hover`, `focus`, `active`.
- Mobile drawer version: `open`, `closed`.

Expected behavior:

- Selecting an item changes route, screen, or content region.
- Collapsing preserves enough orientation through icons, labels, tooltips, or
  accessible names.
- Nested groups define expansion behavior.
- Current section remains clear across route changes.

Mobile behavior:

- Sidebar usually becomes a drawer, full-screen menu, or bottom nav.
- Opening and closing behavior must include focus and scroll behavior.

Failure modes:

- Collapsed sidebar loses accessible labels.
- Nested nav state resets unexpectedly.
- Sidebar creates a dead end on mobile.

Audit prompts:

- Can users tell where they are?
- Does collapse preserve orientation?
- Are nested groups keyboard reachable?

## Bottom Navigation

Use bottom navigation for a small set of high-frequency destinations on compact
or mobile-first experiences.

Expected states:

- Nav item: `default`, `focus`, `active`, `selected`.
- Disabled destination: `disabled`.
- Notification or status indicator: `visible`, `hidden`, `warning` when
  relevant.

Expected behavior:

- Each item maps to a top-level destination.
- Selected item tracks the current route or screen.
- Tap targets remain large enough for touch.
- Labels remain clear; icon-only items need accessible names.

Mobile behavior:

- Bottom nav should not compete with sticky CTAs unless priority is explicit.
- Long labels, overflow, and safe-area behavior should be considered.

Failure modes:

- Too many destinations.
- Bottom nav hides the primary form or checkout action.
- Current section is not obvious.

Audit prompts:

- Are these truly top-level destinations?
- Is the selected state clear?
- Does bottom nav conflict with sticky actions?

## Breadcrumbs

Use breadcrumbs for hierarchy and return context, not primary task navigation.

Expected states:

- Breadcrumb item: `default`, `hover`, `focus`.
- Current item: `active` or plain current label.
- Truncated item: `collapsed` when hierarchy is too long.

Expected behavior:

- Ancestor items navigate to stable parent routes.
- Current item is not a misleading link unless the product convention requires
  it.
- Long trails truncate predictably.

Mobile behavior:

- Breadcrumbs may collapse to a back link or shortened trail.
- Current context must remain understandable.

Failure modes:

- Breadcrumbs replace needed local navigation.
- Back behavior is confused with hierarchy.
- Current page is clickable without purpose.

Audit prompts:

- Is this hierarchy or history?
- Does each ancestor route exist?
- What happens on mobile?

## Tabs As Navigation

Use tabs for peer views inside one context. Use route-backed tabs when tab state
must be shareable or persistent.

Expected states:

- Active tab: `selected`.
- Focused tab: `focus`.
- Panel: `visible` or `hidden`.
- Async panel: `loading`, `empty`, `error`, or `success`.

Expected behavior:

- Activating a tab changes visible panel or route-backed tab state.
- Keyboard behavior is defined when the prototype includes it.
- Active tab stays synced with route or screen state when route-backed.

Mobile behavior:

- Tabs can scroll, wrap, collapse into a select, or become segmented controls.
- Overflow handling must be explicit.

Failure modes:

- Tabs represent sequential steps.
- Active panel is hidden from visual users but still reachable by keyboard.
- Too many tabs fit poorly on mobile.

Audit prompts:

- Are tab views peers?
- Is route persistence needed?
- Is selected state separate from focus?

## Command Palettes

Use command palettes for search-driven actions, quick navigation, or power-user
task access.

Expected states:

- Palette: `open`, `closed`.
- Search field: `focus`, `loading`, `error`.
- Result list: `loading`, `empty`, `success`.
- Result item: `default`, `hover`, `focus`, `selected`.

Expected behavior:

- Keyboard shortcut, button, or menu item opens the palette.
- Focus moves to the search field.
- Typing filters or queries results.
- Enter activates selected result.
- Escape closes and returns focus.
- Empty and no-permission states are defined.

Mobile behavior:

- Command palettes may become full-screen search or be omitted when not useful.
- Keyboard and viewport behavior must be noted.

Failure modes:

- Palette exposes actions unavailable to the user.
- Empty results lack recovery.
- Focus is not trapped or restored.

Audit prompts:

- Who needs this shortcut?
- Are actions permission-aware?
- Is keyboard behavior complete?

## Mobile Drawers

Use mobile drawers for collapsed navigation, filters, account menus, or
contextual panels on compact screens.

Expected states:

- Drawer: `open`, `closed`.
- Trigger: `default`, `focus`, `active`.
- Backdrop: `visible`, `hidden`, `dismissible` when used.
- Active item: `selected`.

Expected behavior:

- Trigger opens drawer.
- Close button, Escape, outside-click policy, and route selection close behavior
  are defined.
- Focus moves into drawer and returns on close.
- Route selection updates screen and closes drawer when appropriate.

Mobile behavior:

- Drawer width, full-screen behavior, safe area, scroll lock, and sticky footer
  actions should be described when relevant.

Failure modes:

- Drawer has no close affordance.
- Drawer scroll traps content or hides actions.
- Active route is not visible after opening.

Audit prompts:

- Is the drawer replacing desktop nav or adding contextual behavior?
- Is focus managed?
- Are primary actions still reachable?

## Contextual Back Behavior

Use contextual back behavior for multi-step forms, nested settings, overlays,
filtered result views, and drill-in flows where browser history alone is
insufficient.

Expected states:

- Back control: `default`, `hover`, `focus`, `active`, `disabled` when not
  available.
- Previous screen or state: route, overlay, step, or selected item.
- Unsaved changes: `warning`.

Expected behavior:

- Back destination is explicit.
- Data preservation is documented.
- Unsaved changes prompt when leaving would lose work.
- Overlay back closes overlay before leaving parent context when relevant.
- Filtered or searched contexts define whether filters persist.

Mobile behavior:

- Browser, system, app, or header back behavior must not conflict.
- Back should be reachable in one-handed flows when it is primary.

Failure modes:

- Back exits too far.
- Back loses data unexpectedly.
- Browser back and UI back do different things without explanation.

Audit prompts:

- Where exactly does back go?
- What state is preserved?
- What happens with unsaved changes?

## Route Changes And Focus

When navigation changes route or screen:

- Move focus to the new screen heading, main region, or first meaningful
  control.
- Preserve focus only when the same screen region updates in place and
  preserving focus helps the user.
- Announce meaningful route or region changes in implementation notes when
  relevant.
- Preserve scroll position only when returning to a prior browsing context.
- Reset scroll when a route represents a new page-level destination unless the
  prototype states otherwise.

Audit prompts:

- Does focus land somewhere meaningful?
- Is scroll position intentional?
- Can keyboard users continue without hunting?

## Preserving User Context

Preserve context for:

- Filtered result sets.
- Search queries.
- Selected items.
- Form progress.
- Open details panels.
- Return from edit flows.
- Back from review or confirmation screens.

Document context loss when:

- The user intentionally resets filters.
- A route change starts a new task.
- Security, permissions, or session state requires reset.
- Data has become stale and must be reloaded.

Audit prompts:

- What user context matters here?
- Is preservation expected or surprising?
- Is reset explained?

## Dead-End Checks

A navigation flow has a dead end when users cannot continue, recover, return, or
understand completion.

Check for:

- Screen with no next action and no completion message.
- Overlay with no close path.
- Step with disabled continue and no explanation.
- Empty state with no recovery path.
- Mobile menu with hidden primary action.
- Error route with no retry or support path.
- Back action that exits the task unexpectedly.

## Audit Outcomes

Use these outcomes for navigation review:

- `pass`: Navigation is complete for the intended handoff level.
- `passWithNotes`: Minor non-blocking navigation issues are documented.
- `revise`: Dead ends, hidden actions, ambiguous back behavior, focus issues, or
  responsive collapse gaps must be fixed.
- `blocked`: Source nodes, destination screens, route requirements, or primary
  flows are missing.

## Minimum Bar

A prototype meets the minimum navigation bar when:

- Every navigation trigger has a stable node ID.
- Every route maps to a defined screen.
- Every navigation flow has source screen, destination screen, trigger node,
  and action.
- Active, focus, selected, disabled, open, closed, expanded, collapsed, hidden,
  visible, and sticky states are represented where relevant.
- Responsive collapse behavior is documented.
- Contextual back behavior and context preservation are explicit.
- Dead ends, hidden primary actions, and ambiguous exits are reviewed.
