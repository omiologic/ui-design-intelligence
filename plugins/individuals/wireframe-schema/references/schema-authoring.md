# Schema Authoring Judgment

Use the schema to make wireframe output predictable and machine-checkable. The
schema defines shape; the vocabulary and semantic validator define approved
meaning.

## Decision Heuristics

- Use `page` as the root for complete pages and overlay roots such as `dialog`
  only when generating a standalone overlay component.
- Use `children` for structural containment. Do not encode hierarchy in labels,
  IDs, or annotations.
- Use top-level `overlays` for dialogs, drawers, popovers, and toasts that are
  not part of the normal reading flow.
- Create a node when it has its own purpose, label, children, state,
  accessibility expectation, or implementation responsibility; otherwise use
  role, label, or annotation.
- Use `responsive` only for structural changes across desktop, tablet, and
  mobile.
- Use `accessibility` fields for landmark, accessible name, focus, keyboard, and
  notes that affect implementation.
- Keep `content` primitive and concise; detailed copy belongs in labels,
  paragraphs, or downstream content systems.
- Use annotations for rationale, assumptions, conditional logic, source evidence,
  and unresolved handoff questions, not for invalid schema fields or visual
  styling.

## Anti-Pattern

Bad: adding arbitrary keys such as `columns`, `variant`, `style`, or `zIndex` to
nodes.

Corrected: choose approved `type`, `layout`, `role`, `state`, `responsive`, and
`accessibility` fields. Put implementation notes in `annotations` when they do
not have a schema field.

Bad: building deep wrapper nodes only to represent spacing, visual grouping,
shadow, or crop.

Corrected: keep the tree shallow and meaningful; use approved layout tokens and
annotations for structural rationale.

Bad: modeling a size-guide dialog as a child of the product controls.

Corrected: place it in top-level `overlays` as a `dialog` with trigger,
dismissal, focus, keyboard, and return-focus notes.

Bad: using labels such as "Section", "Card", or "Button" that validate but hide
purpose.

Corrected: use labels that describe the section or action job, such as "Pricing
Comparison", "Trust Signal", or "Book Consultation".

## Worked Example

For a simple page:

```json
{
  "id": "simple-page",
  "type": "wireframe",
  "label": "Simple Page",
  "version": "0.1.0",
  "root": {
    "id": "page-root",
    "type": "page",
    "label": "Page Root",
    "children": [
      {
        "id": "main-content",
        "type": "main",
        "label": "Main Content"
      }
    ]
  }
}
```

The structure is valid because the top level has required fields, the root is a
valid node, and `main` is an allowed child of `page`.

For a product page with a size guide, product gallery and purchase controls
belong in normal page `children`, while the size guide belongs in `overlays`
when it opens above the flow. Reviews can be a proof `section` or `cardGrid`
when repeated testimonial items share anatomy. Add annotations for uncertain
states such as add-to-cart loading, variant errors, or unobserved mobile order.

## Hand-Off

This reference explains schema-safe authoring. Use `design-terminology` to choose
approved tokens, page/section/component planners to decide structure, and
validation scripts to prove output conforms.
