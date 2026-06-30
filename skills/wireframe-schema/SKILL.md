---
name: wireframe-schema
description: Explain, validate, and resolve modeling questions about the UIBlueprint wireframe JSON schema without owning page, section, component, or final assembly decisions.
license: See repository LICENSE
---

# Wireframe Schema

Use this skill when an agent needs to understand schema constraints, validate
wireframe shape, or decide how a structural concept should be represented in the
UIBlueprint model. Do not use it as the primary planner or final JSON assembly
skill.

## Purpose

Guide agents through the schema contract and representation choices that make a
wireframe valid and reviewable.

## Philosophy

The schema is the contract; this skill is the modeling judgment that the schema
cannot supply. A good wireframe is not better because it has more nodes. It is
better when the node tree exposes the user journey, hierarchy, interaction
contract, responsive shifts, and handoff assumptions before visual design begins.

## References

- `references/wireframe-config.schema.json`
- `references/valid-node-types.md`
- `references/schema-authoring.md`
- `references/schema-modeling-judgment.md`
- `references/_shared/vocabulary/node-types.json`
- `references/_shared/schemas/wireframe-config.schema.json`
- `references/_shared/design-philosophy/preflight-checklist.md`
- `references/_shared/design-philosophy/structural-anti-slop.md`

## Decision Criteria

1. Create a node when the element has its own purpose, label, state, children,
   accessibility expectation, or implementation responsibility.
2. Use `children` for normal reading and task flow. Use `overlays` for UI that
   appears above or outside that flow and has separate trigger/dismissal logic.
3. Put meaning in roles and annotations when a separate node would only describe
   decoration.
4. Add responsive notes when the user can reach information or actions in a
   different order, grouping, or interaction pattern across breakpoints.
5. Add accessibility notes where structure alone cannot prove the expected label,
   landmark, focus order, keyboard path, or error relationship.
6. Add state only when it changes action availability, content, feedback, focus,
   recoverability, or user understanding.
7. Treat schema validity as the floor; review whether the tree exposes journey,
   hierarchy, interaction contracts, and assumptions.

## Boundary

- Owns: schema constraints, node representation choices, valid-node questions,
  and review of whether a proposed model fits UIBlueprint.
- Does not own: page section ordering, section/component anatomy, study-to-
  blueprint translation, or emitting final complete JSON.
- If the user asks "what should this page contain?", hand off to a planner.
- If the user asks "turn this plan into final JSON", hand off to
  `generate-wireframe-config`.

## Rules

1. Point agents to the schema and valid-node references for mechanical fields
   instead of restating those fields in prose.
2. Treat representative content, action priority, state, and responsive behavior
   as first-class structural data.
3. Annotate non-obvious logic such as conditional sections, validation behavior,
   filtering, or overlay triggers.
4. Keep final visual design details out unless they are needed as structural
   placeholders.
5. Do not add a command or subagent for judgment-only modeling gaps; use
   existing validators for deterministic checks and this skill for modeling
   review.

## Anti-Patterns

- Node inflation: every text fragment becomes a node, making hierarchy harder to
  review.
- Node flattening: sections and controls sit at one level, hiding journey and
  ownership.
- Overlay-as-child by default: modal or dismissible UI becomes invisible to
  interaction and accessibility review.
- Schema-valid but rationale-free JSON: validators pass, but reviewers cannot
  understand why the structure exists.
- Deep styling tree: nodes exist only to encode visual wrappers, spacing,
  columns, shadows, or image crop.
- Meaningless labels: labels such as "Section", "Content", "Card", or "Button"
  validate but hide purpose.
- Role-as-node drift: custom node types are invented for primary, featured,
  urgent, premium, or highlighted variants.
- Annotation dumping: unresolved planning, styling, and implementation detail
  are mixed together with no clear handoff.
- State under-modeling: forms, data, filters, and overlays only show the happy
  path.

## Workflow

1. Identify the primary user goal and the structural scope: page, section,
   component, overlay, or state.
2. Draft the node tree around journey order before adding details.
3. Promote only meaningful units into nodes; keep decorative or copy-only detail
   as labels, roles, or annotations.
4. Decide children versus overlays based on reading flow, trigger, dismissal,
   focus, and return behavior.
5. Add responsive and accessibility notes where the structure changes or needs
   review.
6. Add assumptions or rationale annotations only where they clarify handoff.
7. Run the preflight checklist mentally before returning JSON.

## Inline Example

Context:

Brief: "A pricing page with comparison, FAQ, and signup modal."

Flow: use `page-wireframe-planner` to choose page sequence and CTA cadence; use
`component-wireframe-planner` for the comparison table or signup form anatomy;
use this skill to resolve table, dialog, and overlay representation; use
`generate-wireframe-config` only when the structure is ready to emit as JSON.

Example:

Input: "A product page with image gallery, size picker, add to cart, reviews, and
a size guide modal."

Output: model gallery, purchase controls, reviews, and support content as page
children; model size guide as an overlay `dialog` with trigger and focus notes.

Input: "A checkout form with coupon entry, async payment, and success state."

Output: model checkout as a `form` with grouped `inputGroup`s, field-level and
form-level feedback, `loading`, `error`, and `success` state coverage where
available. Use annotations for unverified payment gateway behavior instead of
inventing custom schema fields.

Modeling JSON sketch:

```json
{
  "root": {
    "type": "form",
    "label": "Checkout Form",
    "children": [
      { "type": "inputGroup", "label": "Contact fields" },
      { "type": "inputGroup", "label": "Payment fields" },
      { "type": "button", "label": "Submit payment", "role": "primaryCTA", "state": "default" },
      { "type": "banner", "label": "Payment processing", "state": "loading" },
      { "type": "banner", "label": "Payment error with recovery", "state": "error" },
      { "type": "banner", "label": "Payment success", "state": "success" }
    ]
  }
}
```

Use nodes for meaningful structure and states. Do not invent custom types such
as `paymentWidget`, `primaryHero`, or `featuredCard`; represent variants with
approved node types plus roles, states, labels, and annotations.

## Hand-Offs

- Use `design-terminology` before this skill when the brief uses ambiguous terms.
- Use `page-wireframe-planner`, `section-wireframe-planner`, or
  `component-wireframe-planner` when composition decisions are still open.
- Use `generate-wireframe-config` when the structure is planned and the next
  task is final JSON assembly.
- Use `accessibility-wireframe-review` after schema modeling but before handoff.
