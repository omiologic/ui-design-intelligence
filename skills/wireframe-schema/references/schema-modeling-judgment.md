# Schema Modeling Judgment

Use this reference when a proposed UIBlueprint shape is schema-valid but still
needs modeling judgment. The schema can reject invalid fields; it cannot decide
whether a node boundary, role, overlay, state, or annotation makes the wireframe
reviewable.

## Core Principle

Model structure that changes understanding, action, ownership, state,
accessibility, or implementation responsibility. Do not model decoration,
spacing, visual polish, or every copy fragment as nodes.

## Node Versus Role

Create a node when the element has at least one of these:

- Its own structural purpose.
- Its own label or user-facing name.
- Its own children or repeated anatomy.
- Its own state or interaction.
- Its own accessibility expectation.
- Its own implementation responsibility.

Use a `role`, label, or annotation when the meaning is important but a separate
node would only describe emphasis, priority, or decorative styling.

Examples:

- Use `button` with `role: "primaryCTA"` for the primary action, not a custom
  `primaryButton` type.
- Use `paragraph` with `role: "trustSignal"` for proof copy when a separate
  proof card would add no useful containment.
- Use `section` when a group has a distinct job such as proof, comparison, FAQ,
  or contact; do not create anonymous sections for spacing.

## Children Versus Overlays

Use `children` for normal reading and task flow. Use top-level `overlays` when a
surface sits outside that flow and needs separate trigger, dismissal, state, or
focus behavior.

Examples:

- Inline form error belongs near the affected `inputGroup` or as a form-level
  `banner` child.
- A size guide that blocks purchase belongs in `overlays` as a `dialog` with
  trigger and focus notes.
- A filter panel that slides over a product list belongs in `overlays` as a
  `drawer`; inline filter chips or selected summaries belong in page children.
- A persistent booking bar that participates in page action priority can be a
  `stickyBar` child, with responsive notes about overlap and reachability.

## Annotation Boundaries

Use annotations for rationale, assumptions, conditional logic, source evidence,
and unresolved handoff questions. Do not use annotations to smuggle invalid
fields, visual style, or production implementation detail into the blueprint.

Good annotation uses:

- "Proof appears before pricing because the study shows trust as the decision
  blocker."
- "Mobile filter drawer contents were not captured; verify selected and empty
  states."
- "Dialog trigger is the size-guide button; return focus to trigger on close."

Bad annotation uses:

- "Use 24px padding, purple gradient, 12px shadow."
- "Columns: 3" when the schema has an approved `layout` token.
- "Make this feel premium."

## State Granularity

Add a state when it changes available actions, content, feedback, focus,
recoverability, or user understanding.

- Forms usually need default, loading, error, disabled, and success coverage.
- Data regions usually need populated, empty, loading, and error coverage.
- Overlays need closed/open state plus dismissal and focus behavior.
- Tabs and choices need selected state.
- Accordions and drawers need expanded/collapsed or open/closed state.

Do not invent implementation event states such as `submitted`, `clicked`,
`animating`, or `hoveredOpen` when approved user-visible states exist.

## Validation Limits

Deterministic validators can catch:

- Invalid schema fields.
- Invalid node types, roles, layouts, or states.
- Missing required top-level fields.
- Placeholder labels.
- Some missing page regions, overlay contracts, form recovery states, and CTA
  pile-up.

Judgment is still required for:

- Whether a section has a meaningful job.
- Whether a node tree is too deep or too flat.
- Whether proof is close enough to the claim.
- Whether cards are truly peer items.
- Whether responsive notes preserve action priority.
- Whether annotations explain the right assumptions.

## Anti-Patterns

- Deep styling tree: nodes exist only to encode visual wrappers, spacing,
  columns, shadows, or image crop.
- Meaningless labels: schema-valid labels such as "Section", "Content", "Card",
  or "Button" hide purpose.
- Role-as-node drift: custom node types are invented for primary, featured,
  urgent, premium, or highlighted variants.
- Overlay-as-child by default: dialogs and drawers are buried in normal flow and
  lose trigger, dismissal, and focus review.
- Annotation dumping: unresolved planning, styling, and implementation detail
  are mixed together with no clear handoff.
- State under-modeling: forms, data, filters, and overlays only show the happy
  path.
- Schema-valid but storyless: the tree validates but the user journey, section
  role, and action priority are not visible.

## Command Decision

Existing validation already catches several deterministic issues. Placeholder
labels and selected structural anti-patterns are currently covered. Overly deep
trees and missing annotations can become deterministic checks only after the repo
defines fixture-backed thresholds. Do not add a new command or subagent for this
task; keep schema review judgment inside this skill and use existing validators
after final JSON assembly.

## Worked Example

Input: product page has gallery, purchase controls, reviews, and a size-guide
modal.

Model:

- Gallery and purchase controls are page `children` because they are part of the
  normal product decision flow.
- Reviews are a proof `section` or `cardGrid` because repeated testimonial items
  share anatomy.
- Size guide is an overlay `dialog` because it is a focused supplemental task
  with trigger, dismissal, focus, and return behavior.
- Add annotations for missing evidence such as variant error state, cart drawer
  behavior, and mobile ordering.
