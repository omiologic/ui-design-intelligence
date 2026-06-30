# Component Anatomy

Components should expose the minimum structure needed to make behavior, content
hierarchy, and accessibility clear. Avoid adding page-level sections inside
reusable components.

## Decision Heuristics

- Use `card` for one repeatable item; use `cardGrid` only for the repeated set.
- Use `dialog` for blocking decisions or focused tasks; use `popover` for
  lightweight contextual help.
- Use `drawer` for secondary workflows that can slide over the page, especially
  mobile navigation, carts, and filters.
- Use `form` when submission is the component's primary purpose; use
  `inputGroup` for related fields and their helper or error text.
- Use `tabs` when panels are mutually exclusive and peers; use `accordion` when
  stacked content can be expanded independently.
- Use stable slots when component content varies by page. Slots preserve reuse;
  page-specific child nodes turn one component into many hidden variants.
- Give each control a job. If a child node does not change meaning, action,
  state, grouping, or accessibility, it is probably visual detail.

## Anatomy Completeness

- Container: canonical node type and label.
- Content: heading, body, metadata, media, or repeated item slots that carry the
  component's meaning.
- Controls: primary action, secondary actions, toggles, filters, or disclosure
  controls with roles.
- Feedback: error, empty, loading, success, or warning areas when the component
  can enter those conditions.
- Accessibility: labels, descriptions, keyboard behavior, and focus management
  where the component owns interaction.
- Boundaries: parent-provided data and child-emitted actions.

## Common Components

- `card`: optional imagePlaceholder, heading, paragraph, metadata, and button.
- `dialog`: heading, body content, actions, focus management, and keyboard behavior.
- `form`: grouped `inputGroup` nodes, helper text, error text, and actions.
- `tabs`: mutually exclusive content panels.
- `accordion`: stacked expandable disclosure items.

## Best Practices

- Plan the base component first, then name variants only when a child, state, or
  behavior genuinely changes.
- Prefer fewer, clearer children over deep trees that mirror visual layout.
- Keep representative copy only where length or meaning changes structure.
- Use real roles for actions and metadata so generators do not have to infer
  intent from labels alone.

## Anti-Pattern

Bad: modeling a modal as a `section` with a high z-index note.

Corrected: use `dialog` in top-level `overlays`, include an accessible name,
body content, action `buttonGroup`, `state: "closed"` or `state: "open"`, and
focus-management notes.

Bad: nesting page hero content, testimonials, and footer links inside a product
card because they appear near the card on one page.

Corrected: keep the product card to product media, name, primary metadata, and
actions. Put hero, proof, and footer structure in the surrounding section or
page plan.

## Worked Example

For a product card:

`card` -> `imagePlaceholder`, `heading`, `paragraph` with role `price`,
`button` with role `primaryCTA`

Do not include page navigation or unrelated proof inside the card. Those belong
to the surrounding section or page.

## Hand-Off

This reference defines component anatomy. Use `interaction-patterns` for trigger,
state, and dismissal behavior, `accessibility-wireframe-review` for focus and
label review, and `wireframe-schema` for final JSON validation.
