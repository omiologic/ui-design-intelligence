# Component Behavior Reference

Use this reference when planning, generating, or auditing behavior for reusable
UI components in prototypes. It connects prototype behavior to
`ComponentStateModel`, `PrototypeConfig`, interaction flows, and component
vocabulary.

This reference complements:

- `shared/prototype/prototype-quality-checklist.md`
- `shared/prototype/interaction-pattern-library.md`
- `shared/prototype/state-and-feedback-guidelines.md`
- `shared/prototype/form-flow-patterns.md`
- `shared/prototype/navigation-patterns.md`
- `shared/prototype/responsive-prototype-guidelines.md`
- `shared/vocabulary/component-anatomy.json`
- `shared/vocabulary/component-variants.json`
- `shared/schemas/component-state-model.schema.json`

## Behavior Versus Visual Design

Component behavior defines what a component does:

- States.
- Transitions.
- Triggers.
- Results.
- Validation.
- Feedback.
- Focus.
- Keyboard behavior.
- Responsive behavior.
- Recovery and failure paths.

Visual design-system tokens define how a component looks:

- Color.
- Typography.
- Spacing.
- Radius.
- Border.
- Shadow.
- Motion values.
- Density.

Do not use prototype behavior notes as a substitute for design tokens. Do not
use visual token names as a substitute for behavior. A button can have
`color.action.primary`, but the prototype still needs to say when it is
`disabled`, `loading`, `success`, or `error`.

## Component State Model Mapping

When a component is stateful, use `ComponentStateModel` conventions:

- `id`: stable state model ID.
- `component`: component type, such as `button`, `input`, `dialog`, or `table`.
- `nodeId`: stable source node ID.
- `wireframeRef`: optional source wireframe node or artifact reference.
- `initialState`: starting state.
- `allowedStates`: all supported interaction states.
- `transitions`: state changes and triggers.
- `disabledBehavior`: explanation of unavailable behavior.
- `loadingBehavior`: explanation of in-progress behavior.
- `validation`: validation states, error placement, and rules when applicable.
- `accessibility`: focus management and keyboard behavior.
- `notes`: assumptions, edge cases, and handoff detail.

Use existing interaction states: `default`, `hover`, `focus`, `active`,
`selected`, `disabled`, `expanded`, `collapsed`, `open`, `closed`, `loading`,
`success`, `warning`, `error`, `empty`, `hidden`, `visible`, `sticky`,
`dismissible`, `required`, and `optional`.

## Buttons

Use buttons for actions, not navigation disguised as text links.

Expected anatomy:

- Label.
- Optional leading or trailing icon.
- Optional loading indicator.
- Optional shortcut hint.

Expected states:

- `default`
- `hover`
- `focus`
- `active`
- `disabled`
- `loading` when action is in progress
- `success` or `error` when immediate feedback is attached

Behavior rules:

- Label must describe the outcome, not just the action style.
- Disabled behavior should explain the enabling condition when not obvious.
- Loading behavior should prevent duplicate submission for critical actions.
- Destructive actions need confirmation or clear consequence where relevant.
- Icon-only buttons need accessible names.

Accessibility expectations:

- Keyboard activation must match pointer activation.
- Focus state must be visible.
- Button outcome must be announced or reflected in feedback when the result is
  not visually obvious.

Common edge cases:

- Long labels.
- Duplicate primary actions.
- Loading button with no recovery path.
- Destructive button placed near a safe action.

Review prompts:

- What state changes after activation?
- Is duplicate activation prevented?
- Does the label match the result?

## Inputs

Use inputs for user-entered values.

Expected anatomy:

- Label.
- Input control.
- Optional helper text.
- Optional error text.
- Optional prefix or suffix.
- Optional counter.
- Optional clear control.

Expected states:

- `default`
- `focus`
- `required` or `optional`
- `disabled`
- `error`
- `success` when validation passes and success feedback matters
- `loading` when validation is async

Behavior rules:

- Labels are required. Placeholder text is not a label.
- Validation timing must be explicit: input, blur, submit, or step advance.
- Error text must explain recovery.
- Clear controls must say what they clear.
- Prefixes, suffixes, and counters must not obscure the value.

Accessibility expectations:

- Labels and errors should be associated with fields.
- Required and optional status should not rely only on color.
- Error summaries should focus or announce when needed.

Common edge cases:

- Long labels.
- Long values.
- Invalid pasted values.
- Async validation failure.
- Keyboard overlap on compact viewports.

Review prompts:

- Can users understand the input without placeholder text?
- What happens when validation fails?
- Is the entered value preserved after error?

## Selects And Comboboxes

Use selects for choosing one or more values from a known list. Use comboboxes
when filtering or user search within choices matters.

Expected anatomy:

- Label.
- Trigger or input.
- Option list.
- Selected value.
- Optional helper text.
- Optional error text.
- Optional clear control.

Expected states:

- `default`
- `focus`
- `open`
- `closed`
- `selected`
- `disabled`
- `loading` for async choices
- `empty` for no choices
- `error` for load or validation failure

Behavior rules:

- Opening and closing behavior must be explicit.
- Selected value must remain visible.
- Async options need loading, empty, and error states.
- Multi-select needs removal behavior.
- Dependent selects must define clearing or preserving child values.

Accessibility expectations:

- Keyboard navigation must be specified.
- Focus behavior on open and close must be defined.
- Option labels must be readable and unique enough.

Common edge cases:

- Too many options.
- No matching options.
- Disabled options that need explanation.
- Dependent field resets.

Review prompts:

- Is this a select, combobox, radio group, or typeahead?
- What happens when options fail to load?
- Can users clear or change the selected value?

## Cards

Use cards to group related content and actions.

Expected anatomy:

- Title.
- Optional media.
- Optional eyebrow.
- Optional description.
- Optional metadata.
- Optional badge.
- Optional actions.
- Optional secondary link.

Expected states:

- `default`
- `hover` and `focus` when interactive
- `selected` when cards are selectable
- `disabled` when unavailable
- `loading`, `empty`, or `error` when card data is async

Behavior rules:

- Decide whether the whole card is interactive or only nested actions are.
- Avoid multiple competing click targets without clear hierarchy.
- Selectable cards need selected and deselected behavior.
- Card actions should stay close to the content they affect.

Accessibility expectations:

- Clickable cards need clear keyboard behavior.
- Nested links and buttons must not create ambiguous activation.
- Titles should provide enough context when cards repeat.

Common edge cases:

- Long titles.
- Missing media.
- Multiple actions.
- Selected state on mobile.

Review prompts:

- What is clickable?
- Is card selection different from card navigation?
- Does repeated card content stay scannable?

## Modals And Dialogs

Use dialogs for focused interruption, confirmation, or short blocking tasks.

Expected anatomy:

- Title.
- Body.
- Primary action.
- Close control.
- Optional description.
- Optional secondary action.
- Optional destructive action.
- Optional footer.
- Optional status message.

Expected states:

- `closed`
- `open`
- `focus`
- `loading`
- `success`
- `error`
- `disabled` for unavailable actions
- `dismissible` when users can close without completing

Behavior rules:

- Opening moves focus into the dialog.
- Closing returns focus to a sensible source.
- Escape and outside-click policy must be explicit.
- Destructive confirmation must describe the consequence.
- Long dialogs need scroll and persistent actions.

Accessibility expectations:

- Modal dialogs trap focus.
- Dialog title should be identifiable.
- Close and cancel paths should be keyboard reachable.

Common edge cases:

- Mobile full-screen conversion.
- Lost focus after close.
- Submit error inside dialog.
- Content taller than viewport.

Review prompts:

- Is a dialog necessary?
- Is focus trapped and restored?
- Is there a clear safe exit?

## Tables

Use tables for structured comparison or data inspection.

Expected anatomy:

- Caption.
- Columns.
- Rows.
- Optional toolbar.
- Optional filters.
- Optional sort controls.
- Optional pagination.
- Optional empty state.
- Optional bulk actions.

Expected states:

- `default`
- `loading`
- `empty`
- `error`
- `success`
- `selected`
- `disabled`
- `sticky` when headers or columns remain fixed

Behavior rules:

- Sorting, filtering, pagination, row expansion, and selection behavior must be
  explicit.
- Empty and error states need recovery.
- Bulk actions need selection and confirmation rules.
- Responsive behavior must be documented.

Accessibility expectations:

- Caption should explain the table purpose.
- Sort and selection controls need keyboard behavior.
- Row actions should be reachable without pointer-only affordances.

Common edge cases:

- Too many columns.
- No data.
- Long cell values.
- Bulk action on mixed eligibility rows.

Review prompts:

- Is a table the right component, or should this become cards?
- What happens on compact viewports?
- Can users recover from zero results?

## Product Grids

Use product grids for browsing, filtering, sorting, and selecting products or
cards with commerce-like behavior.

Expected anatomy:

- Grid label.
- Product cards.
- Filters.
- Sort control.
- Result count.
- Pagination or load more.
- Empty state.
- Loading state.

Expected states:

- `default`
- `loading`
- `empty`
- `error`
- `selected`
- `disabled`
- `visible`
- `hidden`

Behavior rules:

- Filter and sort behavior must update results and result count.
- Product cards need clear primary actions.
- Empty results need recovery.
- Unavailable products need disabled or warning behavior.
- Pagination or load-more behavior must be explicit.

Accessibility expectations:

- Result updates should be announced in implementation notes when important.
- Filter controls should be keyboard reachable.
- Product card names should be unique enough in repeated layouts.

Common edge cases:

- No matching products.
- Too many filters.
- Out-of-stock or incompatible products.
- Sticky filter bar on compact viewports.

Review prompts:

- Can users tell what changed after filtering?
- Is selected or unavailable state clear?
- Is compact behavior documented?

## Carousels

Use carousels sparingly for small sets of peer content where browsing is
optional, not required for core task completion.

Expected anatomy:

- Track.
- Items.
- Previous and next controls.
- Optional pagination dots.
- Optional autoplay control.
- Optional status text.

Expected states:

- `default`
- `focus`
- `active`
- `disabled` for unavailable previous or next
- `loading` when items are async
- `error` when items fail

Behavior rules:

- Previous and next controls need disabled behavior at boundaries.
- Autoplay must be pausable or omitted.
- The current item or page should be communicated.
- Critical content should not be hidden only inside a carousel.

Accessibility expectations:

- Keyboard navigation must be defined.
- Autoplay, if used, needs pause behavior.
- Focus should not jump unexpectedly when slide changes.

Common edge cases:

- Single item.
- Very long item content.
- Compact viewport swipe with no button alternative.
- Autoplay masking user focus.

Review prompts:

- Is carousel content optional?
- Is there a non-gesture path?
- Can users pause movement?

## Uploaders

Use uploaders for file or media submission.

Expected anatomy:

- Label.
- Drop zone or file picker.
- Accepted file guidance.
- Progress indicator.
- File list.
- Error text.
- Remove or retry control.

Expected states:

- `default`
- `focus`
- `active` during drag or selection
- `loading` during upload
- `success`
- `error`
- `disabled`
- `empty`

Behavior rules:

- Accepted file types and size limits should be clear.
- Upload progress, success, failure, retry, and remove behavior must be
  documented.
- Failed uploads should preserve successful files.
- Drag and drop needs a non-drag alternative.

Accessibility expectations:

- File picker must be keyboard reachable.
- Progress and errors should be announced in implementation notes.
- Error text must explain recovery.

Common edge cases:

- Unsupported type.
- File too large.
- Network failure.
- Duplicate file.
- Partial upload failure.

Review prompts:

- Can users retry without starting over?
- Is drag optional?
- Are file constraints visible before upload?

## Toasts

Use toasts for short, non-blocking feedback.

Expected anatomy:

- Message.
- Optional title.
- Optional action.
- Optional dismiss control.
- Optional timeout.
- Optional undo action.

Expected states:

- `visible`
- `hidden`
- `dismissible`
- `success`
- `warning`
- `error`

Behavior rules:

- Toasts should not be the only recovery path for blocking errors.
- Timeout should be long enough to read.
- Undo action must state what it reverses.
- Multiple toasts need stacking or replacement behavior.

Accessibility expectations:

- Important toast messages need announcement notes.
- Dismiss action should be keyboard reachable.
- Timed content should not block critical information.

Common edge cases:

- Toast covers sticky CTA.
- Error toast disappears before recovery.
- Multiple quick actions produce repeated toasts.

Review prompts:

- Is toast the right feedback channel?
- What happens after timeout?
- Is undo available when needed?

## Menus

Use menus for compact action lists or navigation choices.

Expected anatomy:

- Trigger.
- Menu list.
- Menu items.
- Optional groups.
- Optional separators.
- Optional selected or checked state.

Expected states:

- Trigger: `default`, `hover`, `focus`, `active`
- Menu: `open`, `closed`
- Item: `default`, `hover`, `focus`, `selected`, `disabled`

Behavior rules:

- Trigger opens and closes the menu.
- Escape closes and returns focus.
- Outside-click policy should be explicit.
- Disabled items need explanation when the reason is not obvious.
- Destructive menu items should be separated or confirmed.

Accessibility expectations:

- Keyboard navigation and focus order must be defined.
- Menu trigger needs accessible name and state.
- Menu close behavior must be predictable.

Common edge cases:

- Menu extends beyond viewport.
- Item labels are too long.
- Touch targets are too small.
- Nested menus.

Review prompts:

- Is this a menu, select, command palette, or drawer?
- Are unavailable actions explained?
- Is close behavior clear?

## Filters

Use filters to narrow sets of results.

Expected anatomy:

- Filter group.
- Filter controls.
- Applied filter display.
- Result count.
- Clear or reset control.
- Empty result state.

Expected states:

- `default`
- `focus`
- `selected`
- `expanded`
- `collapsed`
- `loading`
- `empty`
- `error`
- `dismissible`

Behavior rules:

- Apply-immediate versus apply-button behavior must be explicit.
- Selected filters should remain visible after the filter UI closes.
- Clear and reset behavior must be defined.
- Zero-results recovery must be present.
- Async filtering needs loading and error behavior.

Accessibility expectations:

- Filter controls should be keyboard reachable.
- Result updates should be communicated where relevant.
- Applied filter chips need clear remove behavior.

Common edge cases:

- No results.
- Too many filter options.
- Dependent filters.
- Mobile filter drawer.

Review prompts:

- Can users see what is selected?
- Can users clear filters?
- What happens when no results match?

## Validation And Review Prompts

Use these prompts for any component:

- Does the component have a stable source node ID?
- Is the component type specific enough for behavior review?
- Are allowed states listed?
- Are state transitions tied to triggers?
- Are disabled and loading behavior documented?
- Are validation states and error placement documented when applicable?
- Is focus management documented?
- Is keyboard behavior equivalent to pointer behavior?
- Is responsive behavior documented for compact viewports?
- Are edge cases and recovery paths documented?
- Does the behavior depend on design-system tokens, or can it be understood
  independently?

## Minimum Bar

A component behavior handoff meets the minimum bar when:

- Component anatomy is identifiable.
- Required parts are present or documented as intentionally omitted.
- Initial state and allowed states are clear.
- State transitions have triggers.
- Disabled, loading, error, empty, success, and selected states are covered
  where relevant.
- Accessibility includes focus management and keyboard behavior.
- Common edge cases are reviewed.
- Visual style token decisions are not used as substitutes for behavior.
