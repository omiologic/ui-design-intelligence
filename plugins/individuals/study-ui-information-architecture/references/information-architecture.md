# Information Architecture

Study how the page organizes choices and content: navigation, labels, hierarchy,
grouping, wayfinding, and cross-links.

## Decision Heuristics

- Start with global navigation and page title to understand the user's location.
- Compare heading hierarchy to visual grouping. A mismatch is evidence of
  confusing structure.
- Treat repeated link groups as navigation, even when visually styled as cards.
- Note whether footer links resolve secondary tasks such as support, legal,
  contact, or account access.
- Separate observed IA from recommended IA. Renaming, regrouping, or reordering
  belongs in handoff notes unless the user explicitly asks for redesign.
- Record continuity between navigation labels, page title/H1, section labels,
  CTA labels, breadcrumbs, and related links.
- Check mobile or collapsed navigation evidence separately when available;
  desktop IA does not prove mobile findability.

## Observation Categories

- Labels: global nav, local nav, section names, CTA labels, cards, filters,
  categories, breadcrumbs, and footer links.
- Grouping: which items are peers, which are parent/child, and which are support
  or recovery paths.
- Priority: which labels and paths appear first, repeated, hidden, or buried.
- Continuity: whether labels and links tell one coherent page or site journey.
- Findability: search, filters, hubs, breadcrumbs, related links, selected
  states, progress, and mobile access.
- Missing evidence: collapsed menu contents, hidden search behavior, unavailable
  destination pages, route inventory, or sitemap data.

## Anti-Pattern

Bad: calling every group of links "navigation" without identifying its job.

Corrected: distinguish primary navigation, breadcrumb, local section navigation,
related content links, and footer support navigation.

Bad: rewriting the navigation into a cleaner taxonomy before recording observed
labels and grouping.

Corrected: record the observed labels, order, grouping, and continuity first;
then hand off a recommended taxonomy change as inference or audit remediation.

Bad: claiming a page is orphaned from one screenshot.

Corrected: mark orphan risk as missing evidence unless route, sitemap, or
cross-page link evidence confirms it.

## Worked Example

For a documentation page, capture top navigation, sidebar table of contents,
article headings, in-page anchor links, related articles, and footer support
links. Interpret whether users can move from overview to detail without losing
context.

For a service page, capture global nav, breadcrumb, service category labels,
section headings, cards linking to related services, FAQ placement, CTA labels,
footer support links, and whether mobile nav preserves service discovery.

## Hand-Off

Use `study-ui-specification` for component inventory, `generate-page-audit-report`
for hierarchy issues, `generate-site-audit-report` for cross-page navigation and
journey consistency, and `page-wireframe-planner` to redesign page structure.
