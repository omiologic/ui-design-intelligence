# Information Architecture Study Method

Use this reference to study observable information architecture from captures,
page descriptions, sitemaps, route lists, or blueprint examples.

## Core Principle

IA study maps how users understand where they are, what choices exist, what
belongs together, and where they can go next. Study visible structure first.
Recommendations for restructuring belong in planners or audits after the
evidence is recorded.

## Capture Template

For each page, capture:

- Source: page name, URL or route, viewport, capture date, and supplied context.
- Page purpose: observed page title, H1, hero promise, or primary task.
- Global navigation: labels, order, active state, grouped items, and missing or
  collapsed mobile evidence.
- Local navigation: sidebars, tabs, breadcrumbs, in-page anchors, filters,
  category menus, related links, and section jump links.
- Content hierarchy: heading order, section labels, grouping, repeated item
  labels, and visual/structural emphasis.
- Cross-links: cards, CTAs, related content, footer links, support paths, and
  recovery links.
- Findability cues: search, filters, breadcrumbs, current location, selected
  state, progress, category labels, and route naming.
- Continuity: whether navigation labels, CTAs, and section names match the page
  promise and likely next step.
- Observed evidence, inferred structure, and missing evidence.

## Observable Signals

### Labels

- Are navigation labels specific, distinct, and consistent with page headings?
- Do CTA labels describe the same action the destination appears to support?
- Do repeated cards, filters, or categories use comparable naming?

### Grouping

- Do related items sit together?
- Are peer items visually and structurally comparable?
- Are local navigation and filters separated from global navigation?
- Are support, legal, account, and recovery links placed where users expect them?

### Priority

- Which choices appear first in navigation and page sections?
- Does the first viewport reveal the page's job and primary path?
- Are important choices buried in footer, hidden menus, accordions, or unrelated
  sections?

### Continuity

- Do global navigation, breadcrumbs, page title, H1, section labels, CTAs, and
  footer links tell a coherent path?
- Does the page offer a clear next step after comparison, input, reading, or
  support?
- Are page-to-page relationships visible through links, categories, or related
  content?

### Findability

- Can users locate key content from navigation, search, filters, hubs, related
  links, and footer support?
- Are orphan-risk pages or key tasks visible from at least one expected path?
- Does mobile preserve the same findability through drawer navigation, search,
  filters, or in-page anchors?

## Anti-Patterns

- Rewrite without evidence: replacing the site or page structure before mapping
  the observed labels, groups, and links.
- Navigation flattening: treating global nav, local nav, breadcrumbs, filters,
  related links, and footer support as one undifferentiated list.
- Label invention: renaming sections or routes without marking the change as a
  recommendation rather than observation.
- Active-state guess: assuming current location or selected nav when the capture
  does not show it.
- Orphan claim without route evidence: calling a page orphaned without route,
  sitemap, link, or navigation evidence.
- Mobile IA blind spot: studying desktop navigation only when mobile drawer,
  filters, or search may change findability.
- SEO-only IA: treating title/meta optimization as the whole structure instead
  of mapping labels, hierarchy, grouping, and journeys.

## Command Decision

Commands can help when structured files exist:

- Route lists, sitemaps, or captured URL inventories can reveal duplicate labels,
  missing hubs, orphan-risk routes, or inconsistent naming.
- Blueprint JSON can be checked for navigation labels, breadcrumbs, page
  hierarchy, and repeated CTA names.
- Deterministic checks should support evidence gathering, not decide IA quality.

This skill does not need a subagent by default. Use a separate IA pass only when
the work involves many pages, a route inventory, or cross-page sitemap
reconciliation.

## Worked Example

Input evidence: a service page shows global nav labels `Services`, `Pricing`,
`Reviews`, and `Contact`; breadcrumb `Home / Services / Implants`; page sections
`Implant Dentistry`, `Benefits`, `Process`, `Insurance`, `FAQ`, and `Book a
Consultation`; service cards link to three related treatments.

Finding:

- Observed: global navigation and breadcrumb place the page under `Services`;
  section order moves from service promise to process, insurance, objections, and
  booking.
- Inferred: the primary path is service evaluation leading to consultation.
- Missing evidence: whether all service cards link to detail pages and whether
  mobile navigation exposes `Services` and `Book a Consultation`.
- Handoff: send section-order questions to `page-wireframe-planner`, label
  ambiguity to `design-terminology`, and cross-page consistency to
  `generate-site-audit-report`.
