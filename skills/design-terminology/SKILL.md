---
name: design-terminology
description: Normalize UI wording into the approved UIBlueprint vocabulary so wireframe skills use consistent node types, content roles, layout names, layers, and interaction states.
license: See repository LICENSE
---

# Design Terminology

Use this skill when user-provided UI terms need to be mapped into the repository's controlled UIBlueprint vocabulary.

## Purpose

Prevent invented or inconsistent UI terms before page, section, component, layout, interaction, or accessibility work begins.

## Philosophy

Terminology is a modeling decision, not a copy-editing pass. The right word is
the one that preserves behavior, hierarchy, layer, and user intent for later
wireframe work. Good UIBlueprints avoid slang because casual labels like "popup"
or "tile" hide whether the structure blocks progress, belongs to page flow, or
needs state and accessibility handling.

## References

- `references/controlled-vocabulary.md`
- `references/term-disambiguation.md`
- `references/terminology-mapping.md`
- `references/_shared/vocabulary/node-types.json`
- `references/_shared/vocabulary/layout-patterns.json`
- `references/_shared/vocabulary/content-roles.json`
- `references/_shared/vocabulary/interaction-states.json`
- `references/_shared/vocabulary/ui-layer-types.json`
- `references/_shared/design-philosophy/preflight-checklist.md`

## Decision Criteria

1. Map by behavior first: blocking task interruption is `dialog`; contextual
   extra detail is `popover`; secondary panel work is `drawer`; persistent status
   is `banner` or `toast`.
2. Map by structural level second: whole experience is `page`, major page band is
   `section`, reusable object is a component node, and arrangement belongs to
   layout vocabulary.
3. Map by content role only after the node is clear: proof, input, navigation,
   CTA, comparison, and error are roles inside structure, not substitutes for
   node types.
4. When two terms fit, choose the one that makes downstream accessibility and
   interaction obligations harder to ignore.
5. Preserve original wording only as a human-facing label or annotation; approved
   vocabulary remains the machine contract.

## Boundary

- Owns: canonical UI term selection and consistency enforcement before structural wireframe work begins.
- Does not own: final structural layout, interaction behavior specification, component anatomy details, or accessibility rule application.
- Hand off structural planning after term alignment to `page-wireframe-planner`.
- Hand off interaction behavior to `interaction-patterns`.

## Rules

1. Replace casual UI wording with approved vocabulary before producing JSON.
2. Keep node type, content role, layout pattern, layer, and state terms in
   separate categories.
3. Flag concepts that have no approved vocabulary match instead of inventing a
   plausible token.
4. Preserve user-facing labels only as labels; do not let marketing copy become
   schema vocabulary.
5. Add command or fixture coverage only for deterministic vocabulary drift or
   invalid-token checks. Ambiguous language mapping remains skill judgment until
   a fixture can prove the behavior.
6. Keep this skill self-contained for now; add a terminology subagent only if a
   future workflow needs a dedicated normalization pass before planning.

## Anti-Patterns

- Preserving "popup" unchanged: it hides whether the overlay is modal,
  contextual, or status feedback.
- Calling every repeated item a `card`: it erases whether the item is a product,
  article, testimonial, plan, or navigation choice.
- Using visual labels as structural terms: "big blue button" describes styling,
  while the blueprint needs action, role, and state.
- Treating roles as nodes: `primaryCTA`, `errorText`, and `testimonial` describe
  content purpose inside structure; they do not replace `button`, `paragraph`, or
  `card`.

## Workflow

1. Collect the user's casual terms and group them by node, role, layout, layer,
   and state.
2. Resolve ambiguous terms with behavior tests from
   `references/term-disambiguation.md` and `references/terminology-mapping.md`.
3. Return canonical terms plus short rationale for any term likely to affect
   schema, interaction, accessibility, or handoff.
4. Hand unresolved vocabulary to the sibling planner instead of guessing.

## Inline Example

Input: "A popup cart slides in, has checkout and promo code, then shows an error."

Output: map "popup cart" to `drawer` because it is an edge-attached secondary
workflow, "checkout" to `button` with role `primaryCTA`, "promo code" to
`inputGroup`, and "error" to `error` state plus `errorText` content role.

## Hand-Offs

- Use `interaction-patterns` when the mapped term implies open, close, focus, or
  dismissal behavior.
- Use `layout-specification` when the ambiguity is about arrangement rather than
  vocabulary.
- Use `wireframe-schema` when a term cannot be represented with the approved
  node model.
