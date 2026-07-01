# Prototype Quality Checklist

Use this checklist to review prototype plans, `PrototypeConfig` artifacts,
`PrototypeContent` artifacts, interaction flows, and end-to-end prototype
examples before they are used for implementation handoff, app rendering, or
audit.

This checklist complements schema validation. Passing JSON Schema validation
only proves the artifact shape is acceptable. This checklist reviews whether
the prototype behavior is complete, understandable, realistic, and safe to hand
off.

## Artifact Mapping

Use the checklist against these artifacts:

- `PrototypeConfig`: screens, routes, states, component state models,
  interactions, overlays, forms, navigation flows, transitions, and notes.
- `PrototypeContent`: screen copy, dialogs, forms, messages, review status,
  source metadata, confidence, and review-risk flags.
- `InteractionFlow`: trigger, condition, action, result, accessibility, and
  notes for event-level behavior.
- Human prototype plan: assumptions, runtime boundary, open questions, and
  implementation handoff notes.

## Readiness Levels

### Draft

A prototype is draft when the main flow exists but key details are still
inferred, incomplete, or awaiting review.

Draft is acceptable when:

- Source wireframe or blueprint references are present.
- Primary screens and routes are named.
- Major interactions are sketched.
- Open questions and assumptions are explicit.

Draft is not acceptable for implementation handoff.

### Review-Ready

A prototype is review-ready when a product, design, content, or accessibility
reviewer can inspect the intended behavior without guessing.

Review-ready requires:

- Stable node references for screens, routes, and interactive targets.
- Primary and secondary flows documented.
- Key states and recovery paths represented.
- Prototype copy tied to content sources or review status.
- Accessibility, responsive behavior, and unresolved questions noted.

### Implementation-Ready

A prototype is implementation-ready when an engineer can build from it without
inventing behavior, copy, state, or handoff assumptions.

Implementation-ready requires:

- All required screens, routes, overlays, forms, and navigation flows covered.
- All interactive targets mapped to stable source node IDs.
- State, error, loading, empty, success, disabled, and recovery behavior covered
  where relevant.
- Prototype copy has source, confidence, status, and review-risk metadata.
- Responsive behavior is specified for affected screens and interactions.
- Accessibility behavior is specified for focus, keyboard, labels, errors,
  dialogs, and feedback.
- Remaining open questions are non-blocking and clearly marked.

## Checklist

### 1. Source And Scope

Pass when:

- The prototype names its source wireframe, blueprint, design spec, or design
  system seed.
- Source node IDs are stable enough for screens, sections, components, and
  interactive targets.
- The prototype scope says what is included and what is intentionally out of
  scope.
- Runtime boundary is clear: the artifact plans behavior and handoff, but does
  not imply a rendered clickable app unless one is explicitly provided.

Fail when:

- Screens or interactions cannot be traced to source nodes.
- The prototype invents unsupported structure that is not documented as an
  assumption.
- The artifact mixes behavior planning with runtime implementation promises.

### 2. Flow Clarity

Pass when:

- Primary user flow has a clear start, decision points, success path, and
  recovery path.
- Secondary flows, fallback paths, and exits are named when they affect user
  behavior.
- Each flow describes actor intent, trigger, resulting state, and next step.
- Flow order matches the user journey and content model when those artifacts
  exist.

Fail when:

- The prototype only covers the ideal path.
- Users can reach dead ends without recovery or navigation.
- Flow descriptions omit what happens after a trigger.

### 3. Screen And Route Coverage

Pass when:

- Each screen has an ID, label, source node reference, and initial state.
- Routes are connected to screens and have meaningful paths or route IDs.
- Overlays, dialogs, drawers, and transient surfaces are represented separately
  from full screens.
- Entry and exit paths are documented for modal and multi-screen flows.

Fail when:

- A route points to an undefined screen.
- A screen is referenced by an interaction but missing from the screen list.
- Overlay behavior is described only as visual presence, not interaction state.

### 4. Complete States

Pass when relevant states are covered:

- Default
- Hover or press
- Focus
- Active or selected
- Disabled
- Loading or saving
- Empty
- Error
- Success
- Confirmation
- Expanded or collapsed
- Permission denied or unavailable

Fail when:

- Forms omit validation, disabled, error, success, or retry states.
- Async regions omit loading, empty, error, or recovery states.
- Important components have only a default state.

### 5. Interaction Clarity

Pass when each interaction specifies:

- Trigger event, such as click, tap, submit, change, input, keydown, routeEnter,
  or timeout.
- Source node ID.
- Condition, such as always, when valid, when invalid, when state, or when
  viewport.
- Action, such as navigate, open overlay, close overlay, toggle state, submit
  form, validate field, show feedback, or move focus.
- Result, such as route changed, overlay opened, state changed, validation
  shown, feedback shown, or focus moved.

Fail when:

- Trigger and result are ambiguous.
- Interaction names describe intent but not behavior.
- Keyboard and pointer behavior conflict.

### 6. Overlay And Dialog Behavior

Pass when overlays and dialogs define:

- Open trigger.
- Close controls.
- Escape-key policy.
- Outside-click policy.
- Focus trap.
- Focus return.
- Scroll lock when needed.
- Destructive or confirmation behavior when relevant.

Fail when:

- A dialog can open but has no close path.
- Focus behavior is missing.
- Destructive confirmation copy or action states are unclear.

### 7. Form Behavior

Pass when forms define:

- Field labels and helper text.
- Required and optional fields.
- Validation timing.
- Error placement and recovery.
- Disabled submit behavior.
- Submit action.
- Success or confirmation behavior.
- Retry, edit, or cancel paths.

Fail when:

- Errors do not tell users how to recover.
- Submit behavior is available before required conditions are met.
- Success state does not say what happened or what comes next.

### 8. Realistic Copy

Pass when prototype copy:

- Replaces placeholder labels with realistic copy where the prototype depends on
  content comprehension.
- References `PrototypeContent` or a content model when available.
- Carries source, confidence, status, and review-risk metadata where the schema
  supports it.
- Keeps generated copy out of production-ready status unless it is reviewed.
- Flags medical, financial, legal, pricing, product-spec, brand, client,
  accessibility, or translation review risks when relevant.

Fail when:

- Copy uses generic placeholders such as "Lorem ipsum", "Learn more" everywhere,
  or unnamed buttons where intent matters.
- Sensitive claims appear without review-risk metadata.
- CTA labels do not match the interaction result.

### 9. Component Fit

Pass when:

- Component choices match the task: tables for comparison, forms for input,
  dialogs for focused interruption, drawers for contextual panels, tabs for
  peer views, and accordions for progressive disclosure.
- Component anatomy and state needs are clear enough for design-system handoff.
- Reused components share behavior consistently across screens.

Fail when:

- A component pattern makes the task harder or hides the primary action.
- Similar components behave differently without explanation.
- The prototype depends on a component that is not defined or referenced.

### 10. Responsive Behavior

Pass when:

- Screens list viewport priorities or responsive conditions where behavior
  changes.
- Navigation, overlays, forms, grids, sticky actions, and dense content have
  compact viewport behavior.
- Controls that move, collapse, hide, or become sticky are documented.
- Touch target and mobile overflow risks are noted.

Fail when:

- Desktop behavior is assumed to work unchanged on mobile.
- Important controls disappear without an alternate path.
- Text, tables, dialogs, or forms can overflow without a planned response.

### 11. Accessibility

Pass when:

- Keyboard flow covers focus order, activation, escape, submit, and route or
  overlay changes.
- Focus behavior is defined for dialogs, drawers, menus, validation, and async
  feedback.
- Form errors are associated with fields.
- Button and link labels describe outcomes.
- Reduced motion, target size, contrast-sensitive states, and screen-reader
  feedback are noted where relevant.

Fail when:

- Pointer-only behavior is the only described path.
- Focus is lost after navigation, overlay close, validation, or async feedback.
- Error, loading, or success feedback is visual-only.

### 12. Handoff Notes

Pass when:

- Implementation assumptions are explicit.
- Unresolved questions are listed and marked blocking or non-blocking.
- Source artifacts and related design-system or content artifacts are
  referenced.
- Validation status is noted.
- The handoff states what should not be inferred.

Fail when:

- Engineers would need to invent states, copy, responsive behavior, or
  accessibility behavior.
- Known gaps are hidden in prose instead of listed as open questions.
- The artifact implies production approval for generated copy or sensitive
  claims.

## Review Outcomes

Use one of these outcomes in prototype reviews:

- `pass`: Ready for the stated handoff level.
- `passWithNotes`: Usable, with non-blocking issues documented.
- `revise`: Important behavior, state, copy, responsive, or accessibility gaps
  must be resolved before handoff.
- `blocked`: Source artifacts, stable node IDs, required flows, or review input
  are missing.

## Minimum Bar By Artifact

For `PrototypeConfig`:

- Must pass source and scope, flow clarity, screen and route coverage, complete
  states, interaction clarity, responsive behavior, accessibility, and handoff
  notes.

For `PrototypeContent`:

- Must pass realistic copy, form behavior copy, state feedback copy, source
  metadata, review status, and review-risk checks.

For `InteractionFlow`:

- Must pass trigger, condition, action, result, source node reference,
  accessibility, and recovery-path checks.

For human prototype plans:

- Must pass scope, flow clarity, state coverage, interaction clarity,
  responsive behavior, accessibility, open questions, and handoff notes.
