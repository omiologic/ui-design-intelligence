# Responsive Study Method

Use this reference to compare desktop, tablet, and mobile captures without
turning visual polish into responsive evidence.

## Core Principle

Responsive study asks whether the same user task remains possible across
viewports. Record structural changes that affect orientation, reading order,
comparison, navigation, input, recovery, and action priority. Do not declare a
page responsive without breakpoint evidence.

## Breakpoint Capture Template

For each viewport, record:

- Source: page name, viewport size or device label, capture date, and supplied
  context.
- Navigation: visible nav, collapsed drawer, menu trigger, search, filters,
  breadcrumbs, active state, and missing menu contents.
- First viewport: page promise, primary action, proof/status, and critical
  context.
- Section order: preserved, reordered, omitted, collapsed, or transformed.
- Layout transformation: columns to stack, grid to list, table to cards,
  sidebar to drawer, overlay to full-screen, or unchanged.
- Dense content: table, comparison, chart, data list, pricing, or product grid
  handling.
- Forms and controls: field grouping, submit action, helper/error areas,
  disabled/loading/success/error visibility.
- Sticky or persistent UI: what remains visible, what it may obscure, and
  whether dismissal exists.
- Hidden or collapsed content: what is hidden, how it is reached, and whether it
  is safe to hide.
- Observed, inferred, and missing evidence.

## Responsive Change Vocabulary

- Preserved: same information/action remains available with equivalent priority.
- Reordered: content appears in a different sequence.
- Collapsed: content remains available behind a trigger or disclosure.
- Hidden: content is not visible and no access path is shown.
- Transformed: pattern changes, such as table to cards or sidebar to drawer.
- Simplified: secondary detail is reduced while the core task remains possible.
- Persistent: sticky or fixed UI remains visible across scroll or viewport.

## Observable Signals

### Reorder

- Hero proof moves before or after action.
- Form moves below summary, proof, or eligibility.
- Support/recovery moves closer to or farther from the task.
- Product, pricing, or comparison detail changes sequence.

### Collapse

- Navigation becomes a drawer or menu.
- Filters become a drawer, chips, summary, or inline controls.
- FAQ, tables, or long details become accordions.
- Search or account controls move behind icons.

### Stack

- Columns become one column.
- Card grids become lists.
- Sidebars move above, below, or behind drawers.
- Form groups become full-width fields.

### Hide

- Primary action, filters, form controls, comparison rows, support, or recovery
  paths disappear.
- Content is absent without a visible trigger or continuation path.

### Dense Data

- Tables scroll, stack, summarize, become cards, become accordions, or disappear.
- Charts expose summary, legend, filters, and detail access differently.
- Comparison tasks remain possible or become fragmented.

## Anti-Patterns

- Responsiveness without evidence: saying "responsive" with only one viewport or
  only visual polish cues.
- Smaller-only description: noting font, spacing, or crop changes without task
  impact.
- Hidden mobile action: the primary CTA, filter, form submit, recovery path, or
  support route disappears.
- Table denial: dense comparison content becomes cards without row labels,
  summary, or comparison path.
- Drawer black box: mobile navigation or filters collapse, but the open state is
  not captured.
- Sticky obstruction: persistent UI may cover form fields, CTAs, errors, or
  content without dismissal evidence.
- Proof/order reversal: mobile order weakens trust or context before asking for
  action.
- Missing evidence erased: unprovided tablet, expanded nav, open filter,
  expanded table, or error states are not marked as unknown.

## Command And Tool Decision

Browser screenshot commands are useful when a live page is in scope: capture the
same route at desktop, tablet, and mobile sizes, then capture open navigation,
filters, overlays, tables, and error states where possible. Treat those commands
as optional evidence collection, not as required for static-capture studies.
This skill does not need a subagent by default; use a separate responsive review
pass only for multi-page or live breakpoint exploration.

## Worked Example

Input: desktop pricing page shows three plan columns and a detailed comparison
table; mobile capture shows stacked plan cards, a sticky checkout CTA, and a
`View all features` disclosure.

Finding:

- Observed: desktop columns transform to stacked cards; comparison table
  collapses behind `View all features`; checkout CTA becomes sticky.
- Inferred: action priority is preserved because checkout remains visible after
  the plan summary.
- Risk: comparison is less available on mobile and may require extra disclosure.
- Missing evidence: expanded `View all features` behavior, sticky CTA overlap,
  keyboard/focus behavior, and tablet layout.
- Handoff: `layout-specification` for breakpoint notes and
  `study-ui-accessibility` for hidden comparison and sticky UI risks.
