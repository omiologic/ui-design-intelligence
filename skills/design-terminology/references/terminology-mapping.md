# Terminology Mapping

Map common informal terms to approved vocabulary before generating wireframes.

| Informal term | Approved vocabulary |
| --- | --- |
| popup | `dialog` or `popover` |
| modal | `dialog` |
| slide panel | `drawer` |
| top menu | `navigation` inside `header` |
| selling button | `button` with role `primaryCTA` |
| cards section | `section` containing `cardGrid` |
| hero image | `imagePlaceholder` inside `hero` |
| alert | `banner` or `toast` |
| sticky promo | `stickyBar` |
| FAQ toggle | `accordion` |

## Decision Heuristics

- Map "popup" by modality: blocking means `dialog`; anchored contextual content
  means `popover`; transient feedback means `toast`.
- Map "alert" by persistence: inline message means `banner`; transient feedback
  means `toast`; blocking confirmation means `dialog`.
- Map "grid" by item type: repeated peers mean `cardGrid`; feature benefits can
  use `featureGrid`; option comparisons use `comparisonGrid` or
  `comparisonTable`.
- Map "CTA" to a `button` plus content role, not to a custom node type.

## Anti-Pattern

Bad: preserving both `modal`, `popup`, and `overlay` as separate custom node
types in one blueprint.

Corrected: choose `dialog`, `drawer`, `popover`, or `toast` based on behavior,
then describe the user's original language in `label` or `annotations` if useful.

## Worked Example

For "slide-out cart popup", choose `drawer` because the panel is edge-attached
and supports a secondary checkout workflow. Use `dialog` only if checkout must
block all page interaction.

## Hand-Off

This mapping resolves language ambiguity. Use `interaction-patterns` when the
behavior remains ambiguous and `layout-specification` when the term describes
placement rather than component type.
