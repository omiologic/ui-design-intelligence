# Responsive Observation

Study what changes across desktop, tablet, and mobile: structure, order,
navigation, density, sticky UI, and component substitution.

## Decision Heuristics

- Record a responsive change only when structure or task priority changes.
- Treat navigation collapse as a behavior change, not just a layout change.
- Watch for content reordering that changes persuasion, proof, or form context.
- Compare complex data presentations: tables may become cards, accordions, or
  simplified summaries.
- Track whether primary actions, filters, form controls, recovery paths, and
  support remain reachable at each breakpoint.
- Mark missing breakpoints, collapsed menu contents, open filters, expanded
  tables, and untested states as missing evidence.

## Observation Categories

- Reorder: section order, proof/action order, form placement, support/recovery
  placement, and comparison sequence.
- Collapse: navigation, filters, details, FAQ, tables, search, and account
  controls.
- Stack: columns, grids, sidebars, cards, form groups, and media/copy pairs.
- Hide: content or actions that disappear without a visible access path.
- Transform: table to cards, sidebar to drawer, overlay to full-screen, grid to
  list, or comparison to disclosure.
- Sticky UI: persistent CTAs, bars, headers, carts, summaries, and what they may
  obscure.

## Anti-Pattern

Bad: "Mobile is stacked and smaller."

Corrected: "Mobile collapses navigation into a drawer, moves the booking form
below trust proof, changes the comparison table into stacked cards, and keeps the
sticky CTA visible after the hero."

Bad: "The page is responsive" from a desktop capture only.

Corrected: "Responsive behavior is missing evidence until mobile or tablet
captures, breakpoint notes, or live screenshot checks are supplied."

Bad: "The table works on mobile" when the capture only shows a collapsed
`View all features` trigger.

Corrected: "The table is collapsed behind `View all features`; expanded mobile
behavior and comparison usability are missing evidence."

## Worked Example

For a pricing page, compare whether plan cards remain comparable on mobile, if
feature rows are hidden, and whether the primary plan CTA remains near the plan
summary after stacking.

For a dashboard, compare whether summary status, filters, primary chart/table,
alerts, drilldowns, and empty/error states remain reachable across breakpoints.

## Hand-Off

Use `layout-specification` for breakpoint blueprint notes, `study-ui-accessibility`
for hidden or sticky UI risks, and `generate-page-audit-report` for responsive
quality findings.
