# State And Feedback Guidelines

Use these guidelines when planning, generating, or auditing prototype states and
user feedback. They apply to `PrototypeConfig`, `ComponentStateModel`,
`InteractionFlow`, `PrototypeContent`, human prototype plans, and end-to-end
prototype examples.

This reference complements:

- `shared/prototype/prototype-quality-checklist.md`
- `shared/prototype/interaction-pattern-library.md`
- `shared/vocabulary/interaction-states.json`
- `shared/schemas/component-state-model.schema.json`
- `shared/schemas/prototype-config.schema.json`
- `shared/schemas/prototype-content.schema.json`

## Core Rule

Every meaningful user action should answer four questions:

- What changed?
- Is the system still working?
- What should the user do next?
- How can the user recover if something went wrong?

If the prototype cannot answer those questions, the state or feedback behavior
is incomplete.

## State Vocabulary

Use the existing interaction-state vocabulary consistently:

- `default`: Resting state before interaction.
- `hover`: Pointer preview state.
- `focus`: Keyboard or programmatic focus state.
- `active`: Pressed, current, or in-progress activation state.
- `selected`: Chosen option, row, tab, plan, view, or item.
- `disabled`: Visible but unavailable control or action.
- `expanded`: Content, options, or details are revealed.
- `collapsed`: Content, options, or details are hidden but available.
- `open`: Overlay, drawer, dialog, menu, or disclosure is visible.
- `closed`: Overlay, drawer, dialog, menu, or disclosure is hidden.
- `loading`: Data, validation, or transition is in progress.
- `success`: Action completed successfully.
- `warning`: User can proceed but needs attention.
- `error`: Action failed or input is invalid.
- `empty`: No data, items, results, or eligible options exist.
- `hidden`: Element is not exposed.
- `visible`: Element is exposed.
- `sticky`: Element remains fixed inside a scroll context.
- `dismissible`: Feedback, chip, banner, toast, or overlay can be removed.
- `required`: Input or step must be completed.
- `optional`: Input or step can be skipped.

Do not invent near-duplicate state names in prose when one of these states
fits. If a prototype needs a domain-specific state, document it in notes while
still mapping it to the closest allowed state.

## Feedback Channels

Choose the least disruptive channel that still makes the outcome clear.

### Inline

Use inline feedback for field validation, local component status, missing
requirements, and small recoverable problems.

Expected use:

- Form field errors
- Helper text after input
- Compatibility notes
- Filter result counts
- Row-level or card-level status

Avoid inline feedback when the result affects the whole screen or requires a
route, overlay, or global confirmation.

### Region-Level

Use region-level feedback for lists, tables, product grids, async panels,
search results, dashboards, and content sections.

Expected use:

- Loading panel
- Empty result state
- Failed data load
- Partial result warning
- Saved section state

Avoid region-level feedback when the user needs immediate confirmation for a
destructive or account-level action.

### Toast Or Temporary Message

Use toast-style feedback for short, non-blocking status confirmation when the
screen can remain usable.

Expected use:

- Saved
- Copied
- Added to queue
- Removed filter
- Background sync started

Avoid toast-only feedback for errors that require recovery, critical
confirmation, legal acknowledgement, or accessibility-sensitive instructions.

### Banner

Use banners for page-level status, warnings, outages, permissions, or
conditions that affect a full workflow.

Expected use:

- Permission denied
- Unsaved changes
- Sync failed
- Payment issue
- Account limitation
- Service unavailable

Avoid banners for small field-level validation.

### Dialog Or Confirmation

Use dialog feedback when the user must make a decision or acknowledge a
consequence before proceeding.

Expected use:

- Destructive action confirmation
- Critical permission request
- Irreversible change
- Leaving with unsaved changes
- Payment or submission confirmation when the next step depends on it

Avoid dialogs for routine success messages or low-risk actions.

## State Guidance

### Loading

Use `loading` when the system is fetching data, validating, submitting,
calculating, navigating, or preparing an async result.

Prototype requirements:

- Say what is loading when ambiguity would increase anxiety.
- Preserve layout dimensions where possible so the prototype does not imply
  jarring shifts.
- Disable duplicate-submit actions while submission is in progress.
- Define timeout, error, or retry behavior for important async actions.
- Move or preserve focus intentionally when loading begins and ends.

Copy expectations:

- Use short, concrete language such as "Loading results" or "Saving changes".
- Avoid vague messages like "Please wait" when the user needs context.

Accessibility expectations:

- Long or important loading states should be announced through an appropriate
  status region in implementation handoff notes.
- Loading indicators must not be the only clue if the action changes available
  controls.

Audit prompts:

- What action caused loading?
- What can the user still do?
- What happens if loading fails?
- Is duplicate submission prevented?

### Empty

Use `empty` when a list, table, search result, dashboard, cart, inbox, or
content region has no items to show.

Prototype requirements:

- Explain why the area is empty when it is not obvious.
- Provide a next action when one exists.
- Distinguish first-use empty states from zero-results empty states.
- Preserve filters or search context when empty state is caused by filtering.

Copy expectations:

- First-use: orient and offer setup.
- Zero-results: explain the condition and offer recovery.
- Permission-driven empty: avoid implying the user has no data when access is
  the real issue.

Accessibility expectations:

- Empty states should be reachable in reading order.
- CTA labels should describe the recovery action.

Audit prompts:

- Is this first-use, filtered, permission-related, or true absence?
- Is there a clear recovery path?
- Does the empty state avoid blame?

### Error

Use `error` when an action fails, input is invalid, data cannot load, or the
user cannot proceed.

Prototype requirements:

- State what failed.
- Say how to recover.
- Preserve user-entered data when possible.
- Put field errors near the related field.
- Use page or region errors for failures that affect more than one control.
- Define retry, edit, cancel, or support paths.

Copy expectations:

- Be specific and calm.
- Avoid blaming the user.
- Avoid technical error codes unless the target audience needs them.
- Do not hide risk-sensitive failures behind playful tone.

Accessibility expectations:

- Field errors should be associated with their fields.
- Error summaries should be focusable or announced when they appear.
- Color must not be the only error indicator.

Audit prompts:

- Can the user tell what happened?
- Can the user fix it?
- Is the failed value preserved?
- Does focus move to the right recovery point?

### Success

Use `success` when an action completes and the user needs confirmation.

Prototype requirements:

- Confirm the completed action.
- Say what happens next when the next step is not obvious.
- Avoid interrupting the user for low-risk routine success.
- Keep success feedback visible long enough for the user to understand it.

Copy expectations:

- Use concrete language such as "Appointment request sent" instead of generic
  "Success".
- Include next-step timing when relevant.

Accessibility expectations:

- Important success messages should be announced through a status region in
  implementation handoff notes.
- Success should not rely only on color.

Audit prompts:

- Does success confirm the actual action?
- Does the user know what to do next?
- Is the confirmation persistent enough for the workflow?

### Disabled

Use `disabled` when a visible control is unavailable.

Prototype requirements:

- Define why the control is disabled when the reason is not obvious.
- Define what enables it.
- Avoid using disabled state for controls that need to remain discoverable and
  explainable through focus.
- Do not rely on disabled state as the only validation pattern.

Copy expectations:

- Use helper text when the enabling condition is not visible.
- Avoid vague instructions such as "Complete all fields" when a specific
  missing requirement can be named.

Accessibility expectations:

- If users need to learn why a control is unavailable, provide an accessible
  explanation outside the disabled control.
- Disabled visual treatment must remain legible.

Audit prompts:

- Why is this disabled?
- What enables it?
- Can keyboard and screen-reader users understand the condition?

### Saving

Use saving behavior when a change is being persisted locally or remotely.
Saving usually maps to `loading`, then `success` or `error`.

Prototype requirements:

- Distinguish autosave from explicit save.
- Show when changes are unsaved, saving, saved, or failed.
- Define navigation-away behavior for unsaved changes.
- Prevent duplicate save actions when explicit save is in progress.

Copy expectations:

- Use short state labels: "Unsaved changes", "Saving", "Saved", "Could not
  save".
- For failures, include recovery: retry, keep editing, or contact support.

Accessibility expectations:

- Save status changes should be perceivable without relying on color or motion.
- Important failures should receive focus or status announcement.

Audit prompts:

- Is save immediate or explicit?
- What happens if the user leaves?
- What happens if save fails?

### Confirmation

Use confirmation when the user must verify an action, outcome, or consequence.
Confirmation commonly uses `warning`, `open`, `active`, `loading`, `success`,
or `error` depending on the flow.

Prototype requirements:

- Name the action being confirmed.
- Explain irreversible, destructive, financial, privacy, medical, legal, or
  account-level consequences.
- Provide safe exit and clear continuation.
- Avoid making the destructive action the easiest accidental target.

Copy expectations:

- Button labels should state the action, such as "Delete file" or "Cancel
  appointment".
- Avoid generic labels like "OK" for consequential actions.

Accessibility expectations:

- Confirmation dialogs need focus management, keyboard behavior, and focus
  return.
- Destructive options should be distinguishable beyond color.

Audit prompts:

- Is confirmation necessary?
- Is the consequence clear?
- Is there a safe cancel path?

### Retry

Use retry behavior when an action can be attempted again after failure.
Retry usually follows `error`, `warning`, or interrupted `loading`.

Prototype requirements:

- Preserve input and context before retry.
- Say whether retry repeats the same action or lets the user edit first.
- Define maximum-attempt, timeout, or support fallback behavior when relevant.
- Disable retry while retry submission is active.

Copy expectations:

- Use precise labels: "Try again", "Retry upload", "Resend code", "Check
  status".
- Explain if repeated retry can create duplicate requests or charges.

Accessibility expectations:

- Retry controls should be reachable near the failure message.
- Retry feedback should announce progress and result when important.

Audit prompts:

- What is retried?
- Is user data preserved?
- Is duplicate action risk handled?

### Optimistic Update

Use optimistic update when the UI changes immediately before backend
confirmation.

Prototype requirements:

- Define the immediate optimistic state.
- Define rollback behavior if the action fails.
- Show saving, syncing, or pending status when needed.
- Avoid optimistic updates for high-risk financial, legal, medical, destructive,
  or irreversible actions unless explicitly justified.

Copy expectations:

- Use subtle pending language when confirmation is not final.
- If rollback happens, explain what changed and how to retry.

Accessibility expectations:

- Pending and rollback states must be perceivable.
- Screen-reader users should receive confirmation when the optimistic state is
  finalized or reversed.

Audit prompts:

- Is optimistic update appropriate for the risk level?
- Is rollback defined?
- Can users tell pending from final?

### Permission

Use permission states when access, account role, browser permission, privacy
setting, or authentication affects available behavior.

Prototype requirements:

- Distinguish unauthenticated, unauthorized, permission denied, permission not
  requested, and permission unavailable where relevant.
- Explain the user benefit before requesting sensitive permissions.
- Define recovery paths: sign in, request access, change setting, contact
  admin, or continue without the permission.
- Avoid presenting permission-driven emptiness as true absence of data.

Copy expectations:

- Be specific about what access is needed and why.
- Avoid coercive or misleading permission copy.

Accessibility expectations:

- Permission prompts and denied states should be keyboard reachable.
- Recovery actions must have clear labels.

Audit prompts:

- What permission is missing?
- Why is it needed?
- Can the user continue without it?

## State-Completeness Checks By Surface

### Forms

Required states:

- `default`
- `focus`
- `required` or `optional`
- `disabled` when submit is unavailable
- `loading` or saving on submit
- `error` for invalid fields or failed submission
- `success` or confirmation after completion

Review questions:

- Are validation timing and error placement defined?
- Are field-level and form-level errors distinct?
- Does success say what happened next?
- Is retry or edit behavior available after failure?

### Lists, Tables, And Grids

Required states:

- `loading`
- `empty`
- `error`
- `success` or populated
- `selected` when selection exists
- `disabled` when row actions are unavailable

Review questions:

- Does loading preserve layout enough to avoid confusing jumps?
- Does empty state distinguish first-use from filtered results?
- Are row actions disabled with an explanation?
- Is selection visible and recoverable?

### Dialogs And Drawers

Required states:

- `open`
- `closed`
- `focus`
- `loading`, `error`, or `success` when the dialog submits data
- `disabled` for unavailable confirmation actions
- `dismissible` when users can close without completing

Review questions:

- Is focus moved in and returned?
- Is close behavior explicit?
- Are destructive confirmations clear?
- What happens if submit fails inside the overlay?

### Filters And Search

Required states:

- `default`
- `focus`
- `selected`
- `loading` when async
- `empty` for zero results
- `error` for failed search or filtering
- `dismissible` for applied chips when used

Review questions:

- Are selected filters visible after the panel closes?
- Is zero-results recovery defined?
- Is clear/reset behavior present?
- Does result feedback explain what changed?

### Async Actions

Required states:

- `active` or `loading`
- `disabled` for duplicate-submit prevention when relevant
- `success`
- `error`
- Retry or recovery path

Review questions:

- Can the action be triggered twice?
- What happens during slow response?
- What happens on failure?
- Is feedback persistent enough to understand?

## Copy And Microcopy Expectations

State messages are content. When generated, they should be represented in
`PrototypeContent` or linked to content model entries when available.

State copy should include:

- Plain description of the state.
- Next action or recovery when needed.
- Source, confidence, status, and review-risk metadata when represented in
  schema-backed prototype content.
- Review flags for medical, legal, financial, pricing, product-spec,
  accessibility, translation, brand, or client-sensitive language.

Use `shared/content/microcopy-guidelines.md` when available for detailed
form, state, dialog, and flow microcopy rules. Until that reference exists,
follow these minimum rules:

- Avoid generic "Something went wrong" when a specific recovery is available.
- Avoid "Success" as the full confirmation message.
- Avoid playful language for serious errors or sensitive decisions.
- Use CTA labels that describe outcomes.
- Keep state text short enough for compact UI.

## Motion And Timing Expectations

Prototype specs do not need production animation details, but they should state
behavioral timing when it affects comprehension.

Define timing when:

- Feedback disappears automatically.
- Loading can exceed a short wait.
- Toasts, banners, overlays, or transitions interrupt the flow.
- Optimistic updates may rollback.
- Reduced motion changes the experience.

Audit prompts:

- Is temporary feedback visible long enough?
- Can users pause or recover from a timed change?
- Does motion communicate state without becoming the only cue?

## Accessibility Expectations

State and feedback behavior should include:

- Focus management for errors, dialogs, drawers, route changes, and major async
  results.
- Keyboard access to retry, dismiss, cancel, edit, and continue actions.
- Non-color indicators for error, success, disabled, selected, and warning
  states.
- Screen-reader status announcement notes for important loading, error,
  success, and saved states.
- Field association for validation errors.
- Clear labels for state-changing controls.

Fail review when:

- Feedback is visual-only.
- Focus moves unpredictably.
- Keyboard users cannot reach recovery actions.
- Errors are not associated with fields or regions.

## Review Outcomes

Use these outcomes for state and feedback review:

- `pass`: Required states and feedback are complete for the handoff level.
- `passWithNotes`: Minor state or feedback issues remain but do not block
  review.
- `revise`: Missing, ambiguous, inaccessible, or weak feedback must be fixed.
- `blocked`: Source nodes, interaction targets, state model, content source, or
  required flow context is missing.

## Minimum Bar

A prototype meets the minimum state and feedback bar when:

- Every async action has loading, success or completion, error, and recovery
  behavior where relevant.
- Every form has focus, required or optional, disabled, validation, error,
  success, and recovery behavior where relevant.
- Every overlay has open, close, focus, dismissal, and failure behavior where
  relevant.
- Every list or result region has loading, empty, error, and populated behavior
  where relevant.
- Every generated state message has realistic copy and review metadata when
  represented in `PrototypeContent`.
- Accessibility expectations are documented for focus, keyboard, announcement,
  and non-color state communication.
