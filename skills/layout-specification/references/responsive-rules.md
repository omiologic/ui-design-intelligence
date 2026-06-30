# Responsive Rules

Describe meaningful structural changes by breakpoint.

## Decision Heuristics

Document responsive behavior only when structure, priority, navigation, table
presentation, sticky UI, or form layout changes. Do not describe cosmetic polish.

Responsive notes must preserve the user's decision path. Say what changes in
order, grouping, navigation, comparison, disclosure, sticky UI, and action
reachability.

## Desktop

Use the full intended layout, including multi-column sections and visible navigation.

## Tablet

Reduce columns, tighten section density, and preserve key actions.

## Mobile

Prefer single-column flow, collapsed navigation, simplified tables, and full-width
forms or dialogs where appropriate.

Do not hide required content, primary actions, filters, form controls, or
recovery paths on mobile. If content is collapsed, explain how it remains
discoverable and usable.

## Anti-Pattern

Bad: "Mobile uses smaller font and tighter padding."

Corrected: "Mobile collapses header navigation into a drawer, stacks the hero
form below the value proposition, and converts the comparison table into stacked
option cards."

Bad: "Mobile stacks everything."

Corrected: "Mobile places the primary plan recommendation and signup action
before stacked plan cards, then groups detailed feature rows into accordions."

Bad: hiding filters on mobile because the sidebar no longer fits.

Corrected: convert persistent filters into a drawer or inline filter summary
with a clear trigger and selected-state feedback.

## Worked Example

For a product comparison section:

- Desktop: `comparisonTable` remains visible with plans as columns.
- Tablet: reduce secondary metadata and keep the primary comparison rows.
- Mobile: replace the table with stacked `card` nodes or a simplified
  `accordion` if row-by-row reading is more useful.

## Hand-Off

This reference defines structural breakpoint notes. Use `layout-patterns.md` for
the base layout name and `accessibility-wireframe-review` to check that collapsed
navigation, hidden content, sticky bars, and tables remain usable.
