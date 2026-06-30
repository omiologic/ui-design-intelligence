# Specification Inventory

Study the page as a structural inventory: regions, sections, components, repeated
objects, content roles, and evidence that can be reused by blueprint generation.

## Decision Heuristics

- Start with page regions: header, navigation, main, footer, overlays, and sticky
  surfaces.
- Identify repeated objects before individual copy details. Repetition indicates
  a reusable component or section pattern.
- Record component anatomy only when visible: image, heading, metadata, body,
  action, form field, or disclosure.
- Use neutral labels such as "pricing card" or "testimonial block" when exact
  implementation names are not visible.
- Separate observed labels, inferred component purpose, candidate node type, and
  missing behavior.
- Preserve state and responsive evidence when visible; otherwise mark it as
  missing rather than filling a default happy path.

## Inventory Categories

- Regions: header, navigation, main, section, overlay, sticky UI, footer.
- Candidate node types: visible or inferred UIBlueprint node types.
- Labels and roles: user-facing labels, headings, CTA labels, helper/error text,
  metadata, price, trust signals, and legal text.
- Anatomy: child parts, repeated item structure, and containment relationships.
- States: selected, expanded, collapsed, open, closed, loading, empty, warning,
  error, success, disabled, or missing.
- Responsive notes: preserved, reordered, collapsed, hidden, transformed, or
  missing evidence.
- Assumptions: unresolved structure, hidden content, offscreen regions, and
  implementation-only behavior.

## Anti-Pattern

Bad: listing every line of copy as a separate component.

Corrected: group copy into structural components such as hero text block,
feature card, testimonial, FAQ item, or form field group.

Bad: extracting "blue gradient hero with large rounded cards" as blueprint
structure.

Corrected: record `hero`, headline/body/action roles, supporting proof or media
placeholder if visible, and leave visual styling to downstream design.

Bad: calling a visible dropdown a complete selector workflow without open,
selected, disabled, loading, or error state evidence.

Corrected: record the visible control and mark missing state/behavior evidence
for interaction study.

## Worked Example

For a product page, inventory header navigation, product hero, media gallery,
price block, purchase controls, details accordion, comparison section, review
cards, related products, and footer support links.

For a dashboard, inventory status summary, metric cards, filters, charts, tables,
alerts, drilldowns, empty/loading/error states if visible, and unresolved data or
responsive assumptions.

## Hand-Off

Use `study-ui-storytelling` for narrative interpretation, `study-ui-interaction`
for states and behaviors, and `component-wireframe-planner` or
`page-wireframe-planner` to convert the inventory into blueprint JSON.
