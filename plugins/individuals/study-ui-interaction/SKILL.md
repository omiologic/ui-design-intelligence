---
name: study-ui-interaction
description: Study observed UI interactions, states, affordances, overlays, forms, and feedback behavior from captured page evidence.
license: See repository LICENSE
---

# Study UI Interaction

Use this skill when a captured page needs interaction and state analysis before audit or blueprint generation.

## Purpose

Document observable triggers, states, affordances, overlays, form behavior, disclosure patterns, and feedback behavior.

## Philosophy

Interaction study is behavior evidence collection before pattern selection.
Visible controls show possible actions, but the study must preserve the
difference between observed behavior, reasonable inference, and missing
evidence. The output should make downstream interaction contracts easier to
write without inventing behavior the capture did not prove.

## Evidence Discipline

Record interactions only when the capture shows a control, state, overlay,
feedback surface, or clear affordance. Reasonable implication is allowed for
standard controls, but label it as inferred until interaction evidence confirms
trigger, dismissal, validation, or success behavior.

## References

- `references/interaction-observation.md`
- `references/interaction-study-method.md`
- `references/_shared/schemas/study-output.schema.json`
- `references/_shared/templates/page-study.md`
- `references/_shared/vocabulary/ui-terminology.json`
- `references/_shared/examples/page-study.example.json`
- `../../../shared/workflows/capture-manifest-consumption.md`
- `../../../shared/templates/capture-manifest.example.json`

## Boundary

- Owns: observable interaction findings — triggers, states, affordances, overlays, form behavior, disclosure patterns, and feedback signals as visible from the UI.
- Does not own: interaction design recommendations, wireframe planning, accessibility depth evaluation, or responsive layout study.
- Hand off accessibility-specific findings to `study-ui-accessibility`.
- Hand off interaction design decisions to `interaction-patterns`.

## Rules

1. Record only interactions visible in the source or reasonably implied by controls.
2. Name states using observable behavior such as open, closed, selected, loading, error, or success.
3. Separate trigger, surface, dismissal, and feedback observations.
4. Hand off accessibility concerns to `study-ui-accessibility` and implementation structure to blueprint skills.
5. Preserve observed, inferred, and missing-evidence categories in findings.
6. Do not claim timing, keyboard behavior, focus behavior, validation, success,
   or error recovery without supplied or live evidence.
7. Treat `capture-manifest.json` as the interaction-state evidence index when
   supplied: use captures with `interactionState` as observed state evidence and
   failed state captures as missing trigger, target, feedback, or recovery
   evidence.
8. Reference browser commands only for explicit live-page interaction capture
   workflows; no subagent is needed by default.

## Method

1. If `capture-manifest.json` is supplied, list captures with
   `interactionState`, failed captures for requested states, and source gaps
   before describing behavior.
2. Scan for controls first: buttons, links, forms, tabs, accordions, filters,
   menus, overlays, sticky bars, and feedback messages.
3. For each control, record trigger, target surface, visible state, dismissal or
   completion path, and feedback if observed.
4. Capture before/after states when multiple captures or live evidence are
   supplied.
5. Distinguish visible state from implied behavior, such as "accordion likely
   expands" when only a chevron is visible.
6. Group interactions by task flow rather than by visual position when controls
   work together.
7. Flag missing states that matter for blueprint handoff, such as error, loading,
   empty, success, or close behavior.
8. Hand off interaction contracts to `interaction-patterns` and accessibility
   risks to `study-ui-accessibility`.

## Anti-Patterns

- Behavior invention: stating that a control opens, dismisses, validates, or
  succeeds without observed or supplied evidence.
- State collapse: recording the default state while omitting missing loading,
  empty, error, disabled, or success evidence.
- Failed-state blind spot: studying checkout, booking, filters, forms, and async
  data only on the happy path.
- Feedback timing guess: assuming a toast, banner, or loading state persists or
  disappears without timing evidence.
- Keyboard certainty from screenshots: claiming keyboard support or failure
  without live, DOM, or implementation evidence.
- Flow fragmentation: studying controls by visual location instead of the task
  flow they support together.

## Inline Example

Input evidence: an FAQ row has a chevron and one expanded answer; a newsletter
form shows email field and submit button but no error state.

Finding: observed interaction is accordion disclosure with expanded and collapsed
states; inferred trigger is row or chevron click; observed form fields are email
and submit; missing evidence includes validation, loading, success, and error
feedback.

Structured finding:

- Observed: one FAQ answer is expanded, other rows show chevrons, newsletter
  form has email field and submit button.
- Inferred: FAQ row or chevron likely toggles expanded/collapsed state.
- Missing evidence: validation, loading, success, error feedback, dismissal or
  reset behavior, keyboard behavior, and focus order.
- Handoff: use `interaction-patterns` to define accordion and form state
  contracts; use `study-ui-accessibility` for keyboard and focus risks.

## Hand-Offs

- Send focus, keyboard, label, and dismissal risks to `study-ui-accessibility`.
- Send overlay and state contracts to `interaction-patterns`.
- Send final structural implications to `generate-ui-blueprint-from-study`.
