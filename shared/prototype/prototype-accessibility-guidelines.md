# Prototype Accessibility Guidelines

Use these guidelines when planning, generating, or auditing prototype behavior.
They apply before implementation, visual QA, or a rendered clickable runtime
exists.

This reference complements:

- `shared/vocabulary/accessibility-rules.json`
- `shared/prototype/prototype-quality-checklist.md`
- `shared/prototype/interaction-pattern-library.md`
- `shared/prototype/state-and-feedback-guidelines.md`
- `shared/prototype/form-flow-patterns.md`
- `shared/prototype/navigation-patterns.md`
- `shared/prototype/responsive-prototype-guidelines.md`
- `shared/prototype/component-behavior-reference.md`
- `shared/prototype/edge-case-scenarios.md`

Prototype accessibility is about whether planned behavior can be implemented
accessibly. It does not replace visual contrast testing, assistive technology
testing, semantic HTML review, or production QA.

## Accessibility Rule Mapping

Use the shared accessibility rules as review anchors:

- `visibleFocus`: interactive controls must define a visible focus state.
- `keyboardReachable`: interactive controls and overlay controls must be
  reachable by keyboard.
- `semanticLabels`: controls, navigation, fields, and regions need meaningful
  labels.
- `inlineFieldErrors`: field-specific errors appear at the field and do not rely
  on toast or color alone.
- `overlayFocusManagement`: blocking overlays must describe focus entry,
  containment, dismissal, and return.
- `targetSize`: touch-oriented controls must preserve usable target size across
  responsive states.
- `contrastCheckRequired`: generated or inferred color pairs require contrast
  validation before production use.
- `nonColorState`: error, warning, success, selected, required, and focus states
  must not rely on color alone.
- `readableTypeScale`: text tokens must preserve readable size, line-height, and
  hierarchy for body, labels, helper text, errors, captions, and dense UI.
- `disabledLegibility`: disabled-state color and opacity choices must remain
  legible enough to explain unavailable actions when needed.
- `motionReduced`: prototype behavior that implies motion should preserve a
  reduced-motion path.

## Behavior Versus Visual Accessibility

Prototype accessibility should define:

- Keyboard flow.
- Focus movement and focus return.
- Dialog and drawer focus containment.
- Error association and recovery.
- State changes and feedback announcements.
- Semantic labels for controls, regions, and navigation.
- Target-size risk and touch alternatives.
- Reduced-motion alternatives.
- Non-color state communication.

Visual accessibility review should validate:

- Contrast ratios.
- Actual target dimensions.
- Type scale.
- Spacing.
- Visual hierarchy.
- Color token choices.
- Final icon and illustration meaning.

Content accessibility review should validate:

- Plain language.
- Clear labels.
- Error text clarity.
- Inclusive wording.
- Reading load.
- Translation risk.

The prototype should flag these downstream needs, not pretend they are already
approved.

## Interaction State Mapping

Accessibility expectations by interaction state:

- `default`: control role, label, and purpose are understandable.
- `hover`: hover affordance is not the only cue.
- `focus`: focus state is visible and keyboard reachable.
- `active`: activation is available by keyboard and pointer.
- `selected`: selected state does not rely on color alone.
- `disabled`: reason is available when needed; disabled text remains legible.
- `expanded`: expanded relationship and controlled content are clear.
- `collapsed`: collapsed content remains discoverable.
- `open`: focus entry and active region are defined.
- `closed`: focus return is defined when opened from a trigger.
- `loading`: important progress is perceivable and duplicate actions are
  managed.
- `success`: success feedback is perceivable beyond color.
- `warning`: warning is perceivable and actionable.
- `error`: error is associated with the source field, region, or action.
- `empty`: empty state explains next action and is not confused with permission.
- `hidden`: hidden content is not reachable by keyboard or screen reader unless
  intentionally offscreen for assistive technology.
- `visible`: visible content appears in a sensible reading and focus order.
- `sticky`: sticky regions do not obscure focus, errors, or controls.
- `dismissible`: dismissal is keyboard reachable and understandable.
- `required`: required state is communicated beyond color.
- `optional`: optional state is clear when it affects completion.

## Keyboard Flow

Prototype specs should define keyboard behavior for:

- Navigation.
- Buttons and links.
- Forms.
- Dialogs and drawers.
- Menus.
- Tabs.
- Accordions.
- Carousels.
- Uploaders.
- Filter panels.
- Command palettes.
- Toasts or dismissible feedback when interactive.

Pass when:

- Every interactive target is keyboard reachable.
- Activation is documented for Enter, Space, arrow keys, Escape, or Tab when
  relevant.
- Keyboard order follows task order.
- Users can recover, cancel, retry, close, or go back by keyboard.
- Keyboard behavior matches pointer behavior.

Fail when:

- A required action is pointer-only.
- Focus enters a hidden or inactive region.
- Keyboard users cannot close overlays or reach recovery actions.

## Focus States And Focus Movement

Prototype specs should describe:

- Initial focus after route changes.
- Focus after opening overlays.
- Focus after closing overlays.
- Focus after validation errors.
- Focus after async success or failure.
- Focus after route-backed tab or navigation changes.
- Focus preservation for in-place updates.

Pass when:

- Focus target is named for major state changes.
- Focus return target is named for dialogs, drawers, menus, and sheets.
- Error summaries or first invalid fields receive focus when appropriate.
- Focus does not move unexpectedly for small non-blocking feedback.

Fail when:

- Focus is lost after route changes.
- Dialog close returns focus to the top of the page instead of the trigger.
- Error feedback appears without a focus or announcement plan.

## Dialogs, Drawers, Menus, And Overlays

Blocking overlays need explicit focus management.

Prototype requirements:

- Trigger node.
- Open state.
- Close state.
- Initial focus target.
- Focus containment or trapping when modal.
- Escape behavior.
- Outside-click policy.
- Close control.
- Focus return target.
- Scroll lock when relevant.
- Error, loading, and success behavior inside the overlay when relevant.

Pass when:

- Keyboard users can open, use, and close the overlay.
- Focus stays inside modal overlays.
- Dismissal does not lose user context.

Fail when:

- Overlay can open but has no close path.
- Keyboard focus remains behind the overlay.
- Closing an overlay loses focus or data unexpectedly.

## Error Association

Errors must connect to the field, region, action, or state that caused them.

Prototype requirements:

- Field-level errors appear near the field when possible.
- Error summaries are included for long forms or multi-error submissions.
- Error text explains recovery.
- Focus moves to error summary or first invalid field when appropriate.
- Toast-only error is avoided for blocking validation.
- Color is not the only error indicator.

Pass when:

- Users can identify what failed and how to fix it.
- Errors are associated with fields or regions in handoff notes.
- User-entered data is preserved after recoverable errors.

Fail when:

- Error says only "Invalid" or "Something went wrong" without recovery.
- Required state is color-only.
- Screen-reader users would not know an error appeared.

## Readable Labels And Semantic Roles

Prototype specs should identify labels for:

- Buttons.
- Links.
- Icon-only controls.
- Form fields.
- Navigation landmarks.
- Regions.
- Dialogs.
- Menus.
- Tabs.
- Tables.
- Search.
- Filter panels.
- Status regions.

Pass when:

- Labels describe outcomes or purpose.
- Icon-only controls have accessible names.
- Repeated controls are distinguishable.
- Regions and navigation groups have meaningful labels.

Fail when:

- Labels are generic, such as "Click here", "More", or "Submit", where outcome
  matters.
- Placeholder text is the only form label.
- Repeated buttons cannot be distinguished outside visual context.

## Target Size And Touch Behavior

Prototype specs should flag target-size risk for compact or touch-first
viewports.

Review:

- Icon buttons.
- Close controls.
- Menu items.
- Tabs.
- Pagination.
- Dense table actions.
- Checkbox and radio groups.
- Carousel controls.
- Drag handles.
- Upload controls.
- Sticky CTAs.

Pass when:

- Touch controls are reachable and separated enough to avoid accidental action.
- Destructive actions are not adjacent to safe actions without protection.
- Gesture-only actions have non-gesture alternatives.

Fail when:

- Required controls are too dense to use reliably.
- Swipe, drag, or long-press is the only path for a core action.
- Sticky controls overlap fields, errors, or system UI.

## Reduced Motion

Prototype specs do not need final animation curves, but they should identify
motion-sensitive behavior.

Motion-sensitive behavior includes:

- Auto-advancing carousels.
- Animated route transitions.
- Drawer and dialog transitions.
- Toast entry and exit.
- Loading effects.
- Scroll animations.
- Drag or swipe interactions.
- Parallax or reveal effects.

Pass when:

- Motion is not required to understand state.
- Reduced-motion path is documented for meaningful movement.
- Timed or animated feedback remains perceivable without motion.

Fail when:

- Motion is the only state cue.
- Auto-advancing content cannot be paused.
- Scroll or transition motion blocks task completion.

## Async Feedback

Async behavior needs accessible feedback.

Prototype requirements:

- Loading state.
- Success state.
- Error state.
- Retry or recovery.
- Duplicate action prevention.
- Status announcement notes for important updates.
- Focus movement only when useful.

Pass when:

- Users know work is in progress.
- Users know whether it succeeded or failed.
- Users can retry or recover.

Fail when:

- Loading is visual-only.
- Success disappears before it can be understood.
- Error feedback appears away from the action without focus or announcement.

## Pattern Review Prompts

### Dialogs

- Is focus moved into the dialog?
- Is focus trapped when modal?
- Can Escape close it when appropriate?
- Is the close control keyboard reachable?
- Is focus returned to the trigger?

### Forms

- Are all fields labeled?
- Are required and optional states clear beyond color?
- Are errors associated with fields or summaries?
- Does focus move to the right recovery point after failed submit?
- Is entered data preserved?

### Menus

- Can the trigger open and close by keyboard?
- Are menu items keyboard reachable?
- Is disabled item behavior explained when needed?
- Does Escape close and return focus?

### Tabs

- Is selected state separate from focus state?
- Can keyboard users move between tabs?
- Are inactive panels hidden from focus order?
- Does route-backed tab state preserve context?

### Carousels

- Are previous and next controls keyboard reachable?
- Is autoplay omitted or pausable?
- Is there a non-gesture path?
- Does focus remain stable when the slide changes?

### Async Feedback

- Is loading announced or perceivable?
- Is duplicate submission prevented?
- Are success and error states clear beyond color?
- Is retry reachable?

## Handoff Notes

Prototype accessibility handoff should list:

- Known behavior covered in prototype.
- Known behavior deferred to visual QA.
- Known behavior deferred to implementation QA.
- Open questions.
- Blocking accessibility issues.
- Required review by accessibility specialist when needed.

Do not mark a prototype implementation-ready when:

- Keyboard behavior is unknown.
- Focus behavior is unknown.
- Blocking overlay behavior is unknown.
- Form error recovery is unknown.
- Compact touch behavior hides required actions.

## Review Outcomes

Use these outcomes:

- `pass`: Prototype accessibility behavior is sufficient for the stated handoff
  level.
- `passWithNotes`: Minor non-blocking accessibility notes remain.
- `revise`: Missing keyboard, focus, label, error, target, motion, or feedback
  behavior must be fixed.
- `blocked`: Source nodes, interaction targets, form rules, overlay behavior, or
  accessibility requirements are missing.

## Minimum Bar

A prototype meets the minimum accessibility bar when:

- Every interactive target is keyboard reachable or has a documented non-goal.
- Focus states and focus movement are documented for major interactions.
- Blocking overlays define focus entry, containment, dismissal, and return.
- Errors are associated with fields, regions, or summaries and include recovery.
- Labels and semantic roles are meaningful enough for implementation handoff.
- Touch target risks are documented for compact viewports.
- Motion-sensitive behavior has a reduced-motion path or is marked out of
  scope.
- State feedback does not rely on color alone.
- Remaining accessibility work is documented as visual QA, implementation QA, or
  specialist review.
