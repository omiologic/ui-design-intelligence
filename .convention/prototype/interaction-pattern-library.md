# Interaction Pattern Library

Use this library when planning, generating, or auditing prototype interactions.
It defines common interaction patterns in terms that map to `InteractionFlow`,
`ComponentStateModel`, `PrototypeConfig`, and `.convention/vocabulary/interaction-states.json`.

The library is intentionally behavior-focused. It does not define visual style,
component code, or a clickable runtime.

## Shared Interaction Vocabulary

Use these states consistently when describing patterns:

- `default`: Resting state before user input.
- `hover`: Pointer preview state.
- `focus`: Keyboard or programmatic focus state.
- `active`: Pressed, current, or in-progress activation state.
- `selected`: Chosen item or view.
- `disabled`: Visible but unavailable control.
- `expanded`: Content or options are revealed.
- `collapsed`: Content or options are hidden but available.
- `open`: Overlay, drawer, menu, or disclosure is visible and interactive.
- `closed`: Overlay, drawer, menu, or disclosure is not visible.
- `loading`: Data, validation, or transition is in progress.
- `success`: Action completed successfully.
- `warning`: Action can proceed but needs attention.
- `error`: Action failed or input is invalid.
- `empty`: No items or results are available.
- `hidden`: Element is not exposed to the user.
- `visible`: Element is exposed to the user.
- `sticky`: Element remains fixed within a scroll context.
- `dismissible`: Element can be closed or removed.
- `required`: Input or step must be completed.
- `optional`: Input or step can be skipped.

## Pattern Format

Each pattern should be represented in prototype artifacts with:

- Trigger: event and source node, such as `click`, `tap`, `submit`, `change`,
  `input`, `focus`, `blur`, `keydown`, `routeEnter`, `routeLeave`, or
  `timeout`.
- Condition: when the action applies, such as `always`, `whenState`,
  `whenValid`, `whenInvalid`, `whenViewport`, `whenAuthenticated`, or `custom`.
- Action: behavior to perform, such as `navigate`, `openOverlay`,
  `closeOverlay`, `toggleState`, `setState`, `submitForm`, `validateField`,
  `showFeedback`, `hideFeedback`, `scrollTo`, or `none`.
- Result: observable outcome, such as `routeChanged`, `overlayOpened`,
  `overlayClosed`, `stateChanged`, `formSubmitted`, `validationShown`,
  `feedbackShown`, `feedbackHidden`, `focusMoved`, or `noOp`.
- Feedback: what the user sees, hears, or can infer after the action.
- Recovery: how the user reverses, retries, edits, or exits.
- Accessibility: keyboard behavior, focus behavior, labels, state
  announcements, and reduced-motion expectations where relevant.

## Patterns

### Tabs

Use tabs for switching between peer views that share the same context.

Expected states:

- Tab list: `default`
- Active tab: `selected`, `focus` when keyboard-focused
- Inactive tabs: `default`, `hover`, `focus`
- Disabled tab: `disabled`
- Panel: `visible` for selected tab, `hidden` for inactive panels
- Async panel: `loading`, `empty`, `error`, or `success` when relevant

Expected behavior:

- `click` or `tap` on a tab sets the selected tab and visible panel.
- Arrow keys move focus between tabs when the prototype specifies keyboard
  behavior.
- Enter or Space activates the focused tab.
- Route or query state is documented when tab selection must persist.

Mobile behavior:

- Tabs may remain horizontal when there are few labels.
- Overflowing tabs need scroll, wrapping, or a different pattern such as a
  segmented control or select.

Failure modes:

- Too many tabs for the viewport.
- Tab labels represent tasks instead of peer views.
- Inactive panels remain exposed to keyboard or screen-reader flow.

Audit prompts:

- Does every tab have a matching panel?
- Is the selected state visually and semantically distinct?
- Is keyboard focus different from selected state when needed?

### Drawers

Use drawers for contextual panels that support the current screen without
replacing it.

Expected states:

- Drawer: `closed`, `open`
- Trigger: `default`, `hover`, `focus`, `active`
- Backdrop when used: `visible`, `hidden`, `dismissible`
- Drawer content: `loading`, `empty`, `error`, or `success` when relevant

Expected behavior:

- Trigger opens the drawer with `openOverlay`.
- Close button, Escape, or configured outside click closes it with
  `closeOverlay`.
- Focus moves into the drawer on open and returns to the trigger on close.
- Scroll behavior is explicit when the drawer content or page can scroll.

Mobile behavior:

- Side drawers often become full-width bottom sheets or full-screen panels.
- Touch targets and close controls must remain visible.

Failure modes:

- Drawer opens without a close path.
- Drawer duplicates full-page navigation.
- Focus remains behind the drawer.

Audit prompts:

- Is the drawer contextual to the current screen?
- Is focus trapped or managed appropriately?
- Is mobile sizing documented?

### Dialogs

Use dialogs for focused interruption, confirmation, blocking choices, or short
tasks that must be resolved before continuing.

Expected states:

- Dialog: `closed`, `open`
- Trigger: `default`, `hover`, `focus`, `active`
- Confirmation action: `default`, `disabled`, `loading`, `success`, `error`
- Dismiss action: `default`, `hover`, `focus`, `active`

Expected behavior:

- Opening a dialog moves focus to the first meaningful element or title.
- Escape and close button behavior are specified.
- Outside-click policy is explicit.
- Focus is trapped while modal dialogs are open.
- Focus returns to a sensible source after close.

Mobile behavior:

- Dialogs may become full-screen for complex forms or long content.
- Destructive actions must remain separated from safe exits.

Failure modes:

- No cancel or close path.
- Confirmation copy does not describe the consequence.
- Dialog content scrolls while controls disappear.

Audit prompts:

- Is the dialog necessary, or would inline disclosure work?
- Are destructive and safe actions visually and behaviorally distinct?
- Is focus return defined?

### Filters

Use filters to narrow sets of items, results, records, or product choices.

Expected states:

- Filter control: `default`, `hover`, `focus`, `active`, `selected`
- Filter group: `expanded`, `collapsed`
- Results region: `loading`, `empty`, `error`, `success`
- Applied filter chip: `selected`, `dismissible`
- Reset control: `default`, `disabled`

Expected behavior:

- Selecting a filter updates state and result set.
- Result feedback says what changed or how many results remain when relevant.
- Clear, reset, and remove-filter paths are defined.
- Async filtering includes loading and error behavior.

Mobile behavior:

- Complex filters may move into a drawer or full-screen panel.
- Apply and reset controls should remain reachable.

Failure modes:

- Filters apply invisibly without feedback.
- No empty-state path for zero results.
- Filter state cannot be cleared.

Audit prompts:

- Are selected filters visible after the filter panel closes?
- Is the result update immediate, delayed, or apply-button based?
- Is zero-results recovery defined?

### Steppers

Use steppers for ordered, multi-step processes where progress and sequence
matter.

Expected states:

- Current step: `active`
- Completed step: `success`
- Future step: `disabled` or `default`
- Step with issues: `warning` or `error`
- Optional step: `optional`
- Required step: `required`

Expected behavior:

- Continue validates the current step before advancing when required.
- Back returns to the previous step without losing entered data unless stated.
- Step navigation rules are explicit: linear, editable completed steps, or free
  navigation.
- Completion state is distinct from current state.

Mobile behavior:

- Step indicators may collapse to a compact progress label.
- Long forms need save, back, and recovery behavior.

Failure modes:

- Users can advance with invalid required fields.
- Back behavior loses data unexpectedly.
- Step labels do not match the actual task.

Audit prompts:

- Is progress understandable without relying only on color?
- Are optional steps clearly skippable?
- Is data persistence specified?

### Accordions

Use accordions for progressive disclosure of related content where users do not
need every section open at once.

Expected states:

- Item header: `default`, `hover`, `focus`, `active`
- Item panel: `expanded`, `collapsed`
- Disabled item: `disabled`

Expected behavior:

- Activating a header toggles the panel.
- Multi-open versus single-open behavior is explicit.
- Keyboard focus stays predictable after expansion or collapse.
- Expanded content remains accessible in reading order.

Mobile behavior:

- Accordions are useful for dense content on compact screens.
- Long expanded content needs clear re-collapse or next-step paths.

Failure modes:

- Critical information hidden by default without cue.
- Accordion used for primary navigation without route behavior.
- Keyboard focus jumps unexpectedly.

Audit prompts:

- Is hidden content optional or secondary?
- Is expanded state clearly indicated?
- Can the user scan labels before opening?

### Comparison Tables

Use comparison tables when users must compare attributes across options.

Expected states:

- Table: `default`, `loading`, `empty`, `error`, `success`
- Selected option: `selected`
- Sticky headers or columns: `sticky` when used
- Unavailable cells or actions: `disabled`

Expected behavior:

- Sorting, filtering, or highlighting interactions are explicit.
- Feature availability and unavailable actions are distinguishable.
- CTA behavior for each option is clear.
- Sticky behavior is documented when used.

Mobile behavior:

- Tables may become stacked cards, horizontal scroll, or comparison drawers.
- Primary comparison attributes should remain visible.

Failure modes:

- Too many columns on mobile without an alternate layout.
- CTAs are ambiguous across rows or columns.
- Unavailable values look like selectable values.

Audit prompts:

- Is comparison the right pattern, or would cards be clearer?
- Are important differences easy to identify?
- Is mobile comparison behavior specified?

### Product Selectors

Use product selectors when users choose among product variants, bundles,
configurations, or compatibility options.

Expected states:

- Option: `default`, `hover`, `focus`, `selected`, `disabled`
- Compatibility feedback: `success`, `warning`, `error`
- Details panel: `expanded`, `collapsed`
- Add or continue action: `disabled`, `loading`, `success`, `error`

Expected behavior:

- Selecting an option updates dependent information.
- Incompatible options explain why they are unavailable.
- Required selections disable forward actions until complete.
- Variant changes preserve or reset dependent choices explicitly.

Mobile behavior:

- Dense selectors may become radio-card lists, drawers, or step flows.
- Selected state must remain visible after scrolling.

Failure modes:

- Disabled options do not explain constraints.
- Selection changes hidden dependent values.
- CTA remains enabled before required choices are made.

Audit prompts:

- Can users tell what is selected?
- Are compatibility constraints explicit?
- Does selection feedback happen before commitment?

### Onboarding Flows

Use onboarding flows to introduce setup, permissions, preferences, or first-run
tasks.

Expected states:

- Step: `default`, `active`, `success`, `warning`, `error`
- Skip action: `default`, `disabled` when skipping is unavailable
- Permission state: `required`, `optional`, `success`, `error`
- Progress indicator: `active`, `success`

Expected behavior:

- Each step has a clear purpose and next action.
- Skip, later, or back behavior is explicit when allowed.
- Permission requests explain value and recovery path.
- Completion routes the user to the correct next screen.

Mobile behavior:

- Steps should be short and preserve progress.
- Keyboard and safe-area behavior should be noted for input-heavy steps.

Failure modes:

- Onboarding blocks users without explanation.
- Optional setup is presented as mandatory.
- Permission denial has no recovery path.

Audit prompts:

- Does each step earn its place?
- Are users told what happens after completion?
- Is denial or skipping handled?

### Checkout Steps

Use checkout steps for transactional flows with user input, review, payment,
confirmation, or fulfillment.

Expected states:

- Step: `active`, `success`, `error`, `disabled`
- Form fields: `required`, `optional`, `error`, `success`
- Payment or submission: `loading`, `success`, `error`
- Review action: `default`, `disabled`

Expected behavior:

- Each step validates before progression.
- Edit paths are available from review screens.
- Errors preserve entered information where possible.
- Final confirmation states what happened and what comes next.

Mobile behavior:

- Summary, price, or primary CTA may become sticky.
- Long forms need clear progress and recovery.

Failure modes:

- Payment or submit loading has no disabled state.
- Errors lose form data.
- Users cannot return to edit previous steps.

Audit prompts:

- Is the user protected from duplicate submission?
- Are validation and payment failures recoverable?
- Is final confirmation unambiguous?

### Settings Flows

Use settings flows for account, preference, notification, privacy, billing, or
configuration changes.

Expected states:

- Setting row: `default`, `hover`, `focus`
- Toggle or selector: `active`, `selected`, `disabled`
- Save action: `disabled`, `loading`, `success`, `error`
- Unsaved changes: `warning`

Expected behavior:

- Immediate-save versus explicit-save behavior is documented.
- Destructive or privacy-sensitive changes require confirmation when needed.
- Unsaved changes and navigation-away behavior are defined.
- Success and error feedback are visible and recoverable.

Mobile behavior:

- Settings groups may become stacked sections.
- Destructive actions should not sit next to common safe actions.

Failure modes:

- Users cannot tell whether changes saved.
- Toggle behavior is immediate but feedback is delayed or missing.
- Dangerous settings lack confirmation.

Audit prompts:

- Is save behavior predictable?
- Are unsaved changes handled?
- Are sensitive settings protected from accidental activation?

## Audit Prompts For Any Pattern

Use these prompts when reviewing interaction behavior:

- Does each interactive target have a stable source node ID?
- Is the trigger event explicit?
- Is the condition explicit or safely `always`?
- Is the action observable to the user?
- Is the result represented as route, overlay, state, form, feedback, focus, or
  no-op behavior?
- Are default, hover, focus, active, selected, disabled, loading, empty, error,
  and success states included where relevant?
- Is keyboard behavior equivalent to pointer behavior?
- Is focus moved, trapped, restored, or preserved where the pattern requires
  it?
- Is mobile behavior specified when layout or interaction changes?
- Are failure, cancellation, retry, and recovery paths defined?
- Is feedback timely enough for the user to understand what happened?

## Pattern Selection Notes

Use the simplest pattern that matches the user task:

- Choose tabs for peer views, not sequential steps.
- Choose accordions for optional disclosure, not required decision flow.
- Choose drawers for contextual support, not replacement pages.
- Choose dialogs for focused interruption, not long browsing tasks.
- Choose steppers for ordered completion, not unrelated settings.
- Choose comparison tables when users need side-by-side evaluation.
- Choose product selectors when user choices affect compatibility,
  configuration, or availability.

When a pattern does not fit the task, document the mismatch and choose a more
appropriate structure before producing the prototype config.
