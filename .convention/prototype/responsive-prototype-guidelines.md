# Responsive Prototype Guidelines

Use these guidelines when describing responsive behavior in prototype specs,
`PrototypeConfig` artifacts, prototype plans, and end-to-end prototype examples.

This reference complements:

- `.convention/prototype/prototype-quality-checklist.md`
- `.convention/prototype/interaction-pattern-library.md`
- `.convention/prototype/state-and-feedback-guidelines.md`
- `.convention/prototype/form-flow-patterns.md`
- `.convention/prototype/navigation-patterns.md`
- `.convention/schemas/prototype-config.schema.json`
- `.convention/recipes/prototype.recipe.md`

Responsive prototype guidance should describe behavior, priority, state, and
handoff expectations. It should not require a rendered UI, pixel-perfect layout,
or runtime implementation.

## Viewport Vocabulary

Use the viewport names supported by prototype config:

- `compact`: phone-sized or narrow viewport behavior.
- `medium`: tablet, small laptop, or constrained split-view behavior.
- `expanded`: standard desktop behavior.
- `large`: wide desktop or high-density display behavior.

When a prototype only needs two responsive modes, prefer `compact` and
`expanded`. Add `medium` or `large` only when behavior actually changes.

## Artifact Mapping

Represent responsive behavior across these prototype fields:

- `screens[].viewportPriority`: the viewports that matter for a screen.
- `states`: responsive-only visibility, sticky, collapsed, expanded, hidden, or
  overflow states.
- `interactions[].condition.viewport`: viewport-specific triggers and behavior.
- `overlays`: drawer, dialog, sheet, or menu behavior that changes by viewport.
- `forms`: step, validation, save, submit, and progress behavior in compact
  layouts.
- `navigationFlows`: route, scroll, drawer, tab, back, and sticky action
  behavior that changes across viewports.
- `transitions`: viewport-specific state or screen movement.
- `notes`: assumptions, responsive risks, unresolved behavior, and handoff
  details.

## Core Rules

- Do not assume desktop behavior works unchanged on mobile.
- Every control hidden on one viewport needs an alternate path or an explicit
  reason it is unavailable.
- Every sticky action needs rules for priority, overlap, dismissal, and focus
  return.
- Every responsive overlay needs open, close, focus, scroll, and viewport-size
  behavior.
- Every dense table, grid, form, nav, or comparison section needs compact
  handling.
- Touch targets, text overflow, and keyboard access must be considered before
  implementation handoff.

## Desktop Behavior

Use `expanded` for standard desktop behavior.

Expected prototype details:

- Primary navigation location.
- Visible primary actions.
- Sidebar, header, table, grid, dialog, and panel behavior.
- Hover behavior where it affects interaction.
- Keyboard focus order.
- Scroll position for anchored or same-page navigation.
- Wide content rules for tables, dashboards, and comparison surfaces.

Common desktop risks:

- Primary action appears in multiple places with conflicting behavior.
- Hover-only affordances are required for completion.
- Sticky headers or sidebars obscure focused content.
- Wide tables hide overflow behavior that appears only on smaller screens.

Audit prompts:

- What is the desktop default layout and interaction model?
- What desktop behavior changes at narrower widths?
- Can keyboard users complete the same flow without hover?

## Tablet And Medium Behavior

Use `medium` when behavior differs from both phone and desktop.

Expected prototype details:

- Whether navigation remains expanded, becomes compact, or shifts to a drawer.
- Whether multi-column content becomes two-column or stacked.
- Whether side panels become overlays.
- Whether dense controls remain inline or move behind a filter/sort panel.
- Whether sticky CTAs or summaries appear.

Common medium risks:

- Desktop sidebar plus content leaves too little usable space.
- Tables and grids become cramped but not truly responsive.
- Drawers or dialogs are sized like desktop modals on touch-first devices.

Audit prompts:

- Is `medium` behavior meaningfully different, or can it inherit another mode?
- Does the interaction still work with touch?
- Are controls reachable without hover?

## Mobile And Compact Behavior

Use `compact` for phone-sized or narrow viewport behavior.

Expected prototype details:

- Navigation collapse or replacement pattern.
- Stacked content order.
- Sticky CTA or bottom action behavior.
- Drawer, sheet, dialog, or full-screen overlay behavior.
- Form step and progress behavior.
- Table, grid, comparison, and card-list alternatives.
- Touch target and thumb-reach considerations.
- Mobile back behavior.

Common compact risks:

- Primary action disappears.
- A menu opens but has no close path.
- Sticky CTA overlaps form fields, banners, cookie notices, or system controls.
- Tables require horizontal scroll without preserving row context.
- Dialogs are too tall and hide actions.
- Long labels and error text push controls out of view.

Audit prompts:

- What is the compact equivalent of each primary desktop action?
- What moves, stacks, hides, collapses, or becomes sticky?
- Is there a mobile-only dead end?

## Large Viewport Behavior

Use `large` only when wide layouts have special behavior.

Expected prototype details:

- Maximum content width or density behavior.
- Multi-panel, split-view, or persistent side-panel behavior.
- Wide dashboard or table behavior.
- Whether sticky actions remain local to a region.
- Whether very wide screens reveal additional context.

Common large risks:

- Content stretches too wide to scan.
- Actions drift far from the content they affect.
- Wide density hides the intended responsive behavior for smaller screens.

Audit prompts:

- Does wide space improve the task or just stretch it?
- Are actions still visually and behaviorally connected to their content?

## Layout Shifts

Document layout shifts when content changes position across viewports.

Common shifts:

- Multi-column to stacked.
- Sidebar to drawer.
- Top nav to mobile drawer.
- Filter bar to filter drawer.
- Comparison table to cards.
- Inline CTA to sticky CTA.
- Dialog to full-screen sheet.
- Horizontal tabs to scrollable tabs or select.

Prototype requirements:

- State the trigger viewport.
- State where the moved control appears.
- State what happens to focus and active state.
- State whether content order changes.
- State whether data, filters, selections, and scroll position persist.

Fail review when:

- A moved control loses its interaction.
- Source node IDs are unclear after the shift.
- The user has no equivalent path on compact viewports.

## Hidden Controls

Controls may hide responsively only when the prototype explains why.

Acceptable reasons:

- Duplicate desktop action is replaced by a compact equivalent.
- Optional support action moves into a menu.
- Low-priority content collapses behind disclosure.
- A capability is unavailable on a viewport and has a documented alternate
  path.

Unacceptable reasons:

- Primary action disappears.
- Error recovery disappears.
- Close, cancel, back, or save is unavailable.
- Hidden content is still required to complete the flow.

Audit prompts:

- What replaces this hidden control?
- Is the replacement visible enough for the task?
- Does keyboard focus skip hidden controls correctly?

## Stacked Content

When content stacks:

- Preserve task order, not just visual order.
- Keep labels connected to their controls.
- Keep actions near the content they affect.
- Move supporting content after the decision-critical content unless the journey
  requires reassurance first.
- Ensure comparison content still supports comparison.

Audit prompts:

- Does the stacked order match the user decision path?
- Are repeated cards or fields still scannable?
- Does the primary action remain close enough to its context?

## Sticky CTAs And Sticky Regions

Use sticky actions when the primary action must remain available during long
scrolling flows.

Prototype requirements:

- Define the sticky node ID.
- Define when it appears and disappears.
- Define what it duplicates or replaces.
- Define overlap rules with banners, nav, cookie notices, keyboards, and bottom
  navigation.
- Define focus return if sticky action opens an overlay.
- Define disabled, loading, success, and error states when the action submits or
  changes state.

Fail review when:

- Sticky action duplicates a different behavior than the desktop action.
- Sticky action hides content, errors, or form controls.
- Sticky action remains active when required inputs are incomplete.

Audit prompts:

- Is sticky behavior necessary for task completion?
- Does it obscure anything important?
- Does it share state with the non-sticky action?

## Touch Targets

Prototype specs should flag touch target risk even without pixel dimensions.

Review for:

- Small icon buttons.
- Close controls.
- Dense table row actions.
- Segmented controls.
- Tabs.
- Date or time selectors.
- Drag handles.
- Checkbox and radio groups.
- Menu items.

Prototype requirements:

- Touch-only controls need accessible names.
- Adjacent destructive and safe actions need separation.
- Gesture actions need a non-gesture alternative.
- Compact controls must remain reachable by keyboard and screen reader.

Audit prompts:

- Could this be tapped accurately?
- Is there a non-gesture alternative?
- Are destructive actions protected from accidental taps?

## Overflow

Prototype specs should state how overflow is handled for:

- Long headings.
- Long labels.
- Error text.
- Long CTA labels.
- Tables.
- Cards.
- Dialog content.
- Forms.
- Navigation labels.
- Toasts and banners.
- Uploaded filenames or dynamic data.

Acceptable strategies:

- Wrap.
- Truncate with accessible full value.
- Stack.
- Scroll inside a defined region.
- Move to detail view.
- Collapse into disclosure.
- Convert table rows to cards.

Fail review when:

- Text can cover controls.
- Horizontal scroll is required without preserving context.
- Dialog actions move off-screen without a persistent action area.
- Error text pushes recovery controls away from the failing field.

## Gesture Alternatives

Gestures are useful but should not be the only path for critical behavior.

For swipe, drag, pinch, long-press, or pull-to-refresh:

- Define the gesture.
- Define the non-gesture alternative.
- Define state feedback.
- Define failure or cancellation behavior.
- Define accessibility notes.

Audit prompts:

- Can keyboard and assistive technology users complete the same action?
- Is the gesture discoverable?
- What happens if the gesture is interrupted?

## Responsive Overlays

Dialogs, drawers, menus, sheets, and popovers often change by viewport.

Prototype requirements:

- Desktop modal versus mobile full-screen or sheet behavior.
- Open and close controls.
- Escape and outside-click policy where relevant.
- Focus movement and return.
- Scroll lock.
- Sticky footer actions.
- Content overflow.
- Safe area and keyboard overlap risk.

Audit prompts:

- Does the overlay fit compact viewports?
- Are actions visible when content scrolls?
- Is focus managed differently by viewport?

## Responsive Forms

Forms need explicit compact behavior.

Prototype requirements:

- Field stacking.
- Label placement.
- Helper and error text placement.
- Progress indicator behavior for multi-step forms.
- Keyboard overlap behavior.
- Sticky submit or save action behavior.
- Back behavior.
- Partial progress preservation.

Audit prompts:

- Does the mobile keyboard hide important controls?
- Is the first error reachable after validation?
- Can users move backward without losing data?

## Responsive Navigation

Navigation should follow `.convention/prototype/navigation-patterns.md`.

Prototype requirements:

- Desktop nav pattern.
- Compact replacement: drawer, bottom nav, menu, tabs, command palette, or
  simplified links.
- Active and focus state behavior.
- Open and close behavior.
- Contextual back behavior.
- Hidden primary action replacement.

Audit prompts:

- Is compact navigation complete?
- Is there a mobile-only dead end?
- Does selected state survive route changes?

## Representing Responsive Behavior Without A Runtime

When no rendered prototype exists, describe responsive behavior with:

- `viewportPriority` on screens.
- Viewport-specific interaction conditions.
- States for sticky, hidden, visible, open, closed, expanded, collapsed,
  loading, error, and success behavior.
- Navigation flows for compact-only or desktop-only paths.
- Notes that identify assumptions and unresolved responsive decisions.
- Human-readable plan sections for desktop, medium, compact, and large behavior
  when relevant.

Example behavior statements:

- "On `compact`, the filter sidebar becomes a drawer opened by
  `mobile-filter-button`."
- "On `compact`, `mobile-sticky-demo-button` duplicates the desktop demo CTA and
  returns focus after the dialog closes."
- "On `expanded`, comparison attributes remain tabular; on `compact`, they stack
  into product cards."
- "On `compact`, validation summary receives focus after submit and field-level
  errors remain inline."

## Review Outcomes

Use these outcomes for responsive review:

- `pass`: Responsive behavior is complete for the intended handoff level.
- `passWithNotes`: Minor non-blocking responsive risks are documented.
- `revise`: Missing compact behavior, hidden actions, overflow, inaccessible
  touch targets, or unclear state changes must be fixed.
- `blocked`: Source nodes, required viewport targets, primary flows, or
  responsive ownership are missing.

## Minimum Bar

A prototype meets the minimum responsive bar when:

- Screens identify relevant viewport priorities.
- Every primary desktop action has compact behavior or an explicit non-goal.
- Navigation collapse or replacement behavior is documented.
- Forms, overlays, grids, tables, and dense content define compact behavior
  where relevant.
- Sticky CTAs and sticky regions define visibility, overlap, focus, and state
  behavior.
- Hidden controls have alternate paths.
- Touch target, text overflow, and mobile-only dead-end risks are reviewed.
- Responsive behavior works alongside wireframe structure and design-system
  assumptions without requiring a visual runtime.
