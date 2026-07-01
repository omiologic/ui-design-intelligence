# Form Flow Patterns

Use these patterns when planning, generating, or auditing single-step forms,
multi-step forms, intake flows, checkout forms, settings forms, search forms,
and form-like prototype interactions.

This reference complements:

- `shared/prototype/prototype-quality-checklist.md`
- `shared/prototype/state-and-feedback-guidelines.md`
- `shared/prototype/interaction-pattern-library.md`
- `shared/schemas/prototype-config.schema.json`
- `shared/schemas/prototype-content.schema.json`

It is behavior and handoff guidance. It does not define implementation code or
replace schema validation.

## Artifact Mapping

Represent form behavior across these artifacts:

- `PrototypeConfig.forms`: form IDs, source node IDs, fields, submit node IDs,
  validation states, error placement, and validation rules.
- `PrototypeConfig.states`: required, optional, disabled, loading, error,
  success, warning, and confirmation states tied to form nodes.
- `PrototypeConfig.interactions`: submit, validate, save, cancel, back,
  continue, retry, and field-change behavior.
- `PrototypeConfig.navigationFlows`: movement between form steps or screens.
- `PrototypeContent.forms`: title, description, field labels, helper text,
  placeholders, error text, and action labels.
- `PrototypeContent.messages`: loading, error, success, confirmation, toast,
  and inline-help messages related to form state.

## Core Rules

- Every form field needs a stable field ID and source node ID.
- Every required field needs a visible requirement cue or clear surrounding
  context.
- Every validation error needs a recovery instruction.
- Every submit action needs disabled, loading, success, and error behavior when
  relevant.
- Every multi-step flow needs back behavior, progress behavior, persistence
  behavior, and a clear completion state.
- Generated form copy is prototype content and should carry source, confidence,
  status, and review-risk metadata when represented in `PrototypeContent`.

## Form Anatomy

### Form Container

Define:

- Form ID.
- Source node ID.
- Screen or route.
- Form purpose.
- Entry condition.
- Completion condition.
- Submit node ID.
- Validation model.

Review questions:

- Is the form purpose clear before input starts?
- Does the form match the user journey stage?
- Is this one form, multiple forms, or a step in a larger flow?

### Fields

Define for each field:

- Field ID.
- Source node ID.
- Required or optional state.
- Label.
- Helper text when needed.
- Placeholder only when it helps, never as the only label.
- Validation state IDs.
- Error text.
- Dependency on other fields, if any.

Review questions:

- Can the field be understood without placeholder text?
- Is the required or optional status clear?
- Is helper text useful, short, and placed before error text?
- Is the error message specific enough to fix the input?

### Actions

Define:

- Primary submit or continue action.
- Secondary back, cancel, save, skip, or edit actions.
- Disabled behavior.
- Loading behavior.
- Success behavior.
- Error and retry behavior.

Review questions:

- Does each action label describe its result?
- Is the primary action disabled until required conditions are met, or does it
  validate on submit?
- Can users cancel or go back without losing unexpected data?

## Single-Step Form Pattern

Use a single-step form when all required input can be completed in one
reasonable screen.

Expected states:

- Form: `default`, `required`, `error`, `success`
- Fields: `default`, `focus`, `required`, `optional`, `error`, `success`
- Submit action: `default`, `disabled`, `loading`, `success`, `error`

Expected interactions:

- Field `focus` shows relevant helper text when needed.
- Field `input` or `blur` may validate a field if validation timing requires it.
- Submit validates the form.
- Valid submit moves to loading, then success or next route.
- Invalid submit shows inline and/or summary errors.

Minimum requirements:

- Required fields are identifiable.
- Validation timing is explicit.
- Error placement is explicit: `inline`, `summary`, `toast`, or `none`.
- Submit failure preserves entered data.
- Success state confirms what happened and what happens next.

Avoid:

- Placeholder-only labels.
- Toast-only validation errors.
- Generic submit labels when outcome matters.
- Clearing user-entered data after a recoverable error.

## Multi-Step Form Pattern

Use a multi-step form when input has a meaningful sequence, high cognitive load,
conditional sections, or review-before-submit requirements.

Expected states:

- Current step: `active`
- Required step: `required`
- Optional step: `optional`
- Completed step: `success`
- Step with issues: `error` or `warning`
- Future step: `default` or `disabled`
- Final submit: `loading`, `success`, `error`

Expected interactions:

- Continue validates the current step when required.
- Back returns to the previous step and preserves data unless documented.
- Edit returns from review to a specific step.
- Save or save-and-resume behavior is explicit when available.
- Final submit prevents duplicate submission while loading.

Minimum requirements:

- Step IDs and route IDs are stable.
- Current, completed, future, optional, and error states are distinguishable.
- Progress behavior is clear on desktop and mobile.
- Back behavior and data persistence are documented.
- Review step clearly separates editable summary from final submission.
- Final success state confirms completion and next steps.

Avoid:

- Advancing with invalid required fields.
- Hiding the current step on compact viewports.
- Making optional steps feel required.
- Losing data when moving backward.

## Progressive Disclosure Pattern

Use progressive disclosure when additional fields depend on a choice or are
only relevant to some users.

Expected states:

- Trigger field: `default`, `selected`, `focus`
- Dependent fields: `hidden`, `visible`, `required`, `optional`
- Dependent section: `expanded`, `collapsed`

Expected behavior:

- Selecting the trigger reveals, hides, requires, or clears dependent fields.
- Hidden required fields must not block submission unless they become visible
  and required.
- If hiding a section clears data, the prototype must say so.
- If hidden values are preserved, the prototype must say so.

Audit prompts:

- What condition reveals the dependent field?
- Does hiding the field clear, preserve, or ignore its value?
- Does validation account for hidden required fields?
- Is the dependency understandable without reading implementation notes?

## Validation Timing

Choose one or more timing rules and document them in the validation model.

### On Submit

Use when validation is complex, low urgency, or the user should not be
interrupted while typing.

Requirements:

- Submit triggers validation.
- Errors appear near fields and/or in a summary.
- Focus moves to the first error or error summary when appropriate.
- User-entered data is preserved.

### On Blur

Use when a field can be validated after the user leaves it.

Requirements:

- Error does not appear before the user has had a chance to answer.
- Correction clears or updates the error.
- Focus behavior remains predictable.

### On Input

Use for formatting, live availability, character limits, password strength, or
fields where immediate feedback reduces effort.

Requirements:

- Feedback is not noisy.
- Loading or checking state is represented when async.
- Error and success states are distinguishable.

### Before Step Advance

Use for multi-step forms.

Requirements:

- Continue validates the step.
- Invalid fields are identified.
- Step state changes to `error` or `warning` when needed.
- User remains on the step until blocking issues are resolved.

## Error Recovery

Every form error should answer:

- What is wrong?
- Where is it?
- How can the user fix it?
- Can the user retry, edit, cancel, save, or contact support?

Recovery requirements:

- Preserve entered data after recoverable errors.
- Keep error messages close to the related field when possible.
- Use an error summary for long forms or multi-error submissions.
- Provide retry for network or submission failures.
- Distinguish validation errors from system errors.

Avoid:

- "Invalid input" without explanation.
- Error text that repeats the label without recovery guidance.
- Form reset after failed submission.
- Recovery actions that are visually or keyboard hidden.

## Save, Submit, Cancel, And Back Behavior

### Save

Use save when users can persist partial progress.

Define:

- Save trigger.
- Saved, saving, and failed-save states.
- Whether save is automatic or explicit.
- What happens after save.
- Whether saved progress can be resumed.

### Submit

Use submit for final or step-level completion.

Define:

- Valid and invalid submit behavior.
- Loading and duplicate-submit prevention.
- Success route or message.
- Failure and retry behavior.

### Cancel

Use cancel when users can abandon the current form or step.

Define:

- Whether cancel loses entered data.
- Whether confirmation is required.
- Where the user goes after cancel.
- Focus and route behavior after cancel.

### Back

Use back when users can return to a previous step or screen.

Define:

- Whether data is preserved.
- Whether validation runs before leaving.
- Whether back exits the form or moves to the previous step.
- Mobile back behavior when browser or app navigation is involved.

## Content Mapping

Form copy should be represented in `PrototypeContent.forms` when available.

Map:

- Form title to `title`.
- Form explanation to `description`.
- Field label to `fields[].label`.
- Field helper copy to `fields[].helperText`.
- Placeholder copy to `fields[].placeholder`.
- Field error copy to `fields[].errorText`.
- Button labels to `actions`.
- Loading, success, error, confirmation, and inline-help messages to
  `PrototypeContent.messages`.

Review requirements:

- Labels are always present.
- Helper text explains why or how, not just what.
- Placeholder text does not replace labels.
- Error text includes recovery.
- Action labels describe outcomes.
- Generated sensitive copy carries review-risk metadata.

## Accessibility Requirements

Form prototypes should document:

- Keyboard focus order.
- Field-label association.
- Required and optional indication beyond color.
- Error association with fields.
- Error summary focus behavior for multi-error submissions.
- Disabled control explanation when needed.
- Screen-reader announcement notes for loading, error, success, and saved
  states.
- Touch target considerations for compact viewports.

Fail review when:

- Required fields are color-only.
- Errors are visual-only.
- The first error or summary cannot receive focus.
- Recovery controls are unavailable by keyboard.
- Placeholder text is the only label.

## Edge Cases

### Long Labels

Expected handling:

- Labels wrap without covering controls.
- Helper text remains visually connected to the field.
- Compact layouts keep labels readable.

Audit prompt:

- Does the longest realistic label fit the field layout?

### Optional Fields

Expected handling:

- Optional status is clear when most fields are required.
- Optional fields do not block submission.
- Skipped optional fields do not create errors later unless a dependency makes
  them required.

Audit prompt:

- Can users tell what can be skipped?

### Dependent Fields

Expected handling:

- Dependency trigger is documented.
- Hidden fields do not block submission.
- Revealed required fields become part of validation.
- Value clearing or preservation is explicit.

Audit prompt:

- What happens to dependent field values when the trigger changes?

### Partial Progress

Expected handling:

- Incomplete progress is either saved, discarded with confirmation, or preserved
  in memory for the session.
- Returning users know where to resume.
- Mobile interruption behavior is considered for long forms.

Audit prompt:

- Can users safely leave and return?

### Failed Submission

Expected handling:

- Data is preserved.
- Failure reason is shown when available.
- Retry is available when appropriate.
- Support or alternate path is documented for repeated failure.
- Duplicate submissions are prevented.

Audit prompt:

- Can users recover without re-entering everything?

## Review Outcomes

Use these outcomes for form-flow review:

- `pass`: Form states, copy, validation, navigation, recovery, and accessibility
  meet the intended handoff level.
- `passWithNotes`: Minor non-blocking form issues remain and are documented.
- `revise`: Missing states, weak copy, unclear validation, or incomplete
  recovery must be fixed.
- `blocked`: Source node IDs, required flow context, field requirements,
  validation rules, or content source are missing.

## Minimum Bar

A form prototype meets the minimum bar when:

- Form, field, action, and route IDs are stable.
- Required and optional states are explicit.
- Validation timing and error placement are documented.
- Submit has disabled or validation behavior, loading behavior, success
  behavior, error behavior, and retry or recovery behavior.
- Multi-step flows define progress, back, save, edit, review, and completion
  behavior where relevant.
- Generated labels, helper text, error text, and action labels are represented
  in `PrototypeContent` or documented in the human prototype plan.
- Accessibility behavior covers labels, required state, error association,
  keyboard flow, focus, and non-color feedback.
