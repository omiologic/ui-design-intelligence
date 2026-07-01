---
name: study-ui-information-architecture
description: Study a captured page's navigation, hierarchy, content grouping, wayfinding, and information architecture before audit or blueprint work.
license: See repository LICENSE
---

# Study UI Information Architecture

Use this skill when a captured page needs navigation, hierarchy, and content organization analysis.

## Purpose

Document how information is grouped, labeled, prioritized, and connected across navigation, sections, links, and supporting content.

## Philosophy

Information architecture study is map-making before redesign. The work is to
record how labels, groups, hierarchy, navigation, and cross-links shape
findability and journey continuity. Do not rewrite taxonomy or page structure
until observed evidence, inferred risks, and missing evidence are separated.

## Evidence Discipline

Study the organization that is visible in the capture before inferring the site
model. Keep observed navigation labels, hierarchy, and links separate from
assumptions about unavailable pages, hidden menus, search results, or backend
taxonomy.

## References

- `references/information-architecture.md`
- `references/ia-study-method.md`
- `references/_shared/schemas/study-output.schema.json`
- `references/_shared/templates/page-study.md`
- `references/_shared/vocabulary/ui-terminology.json`
- `references/_shared/examples/page-study.example.json`
- `../../../shared/workflows/capture-manifest-consumption.md`
- `../../../shared/templates/capture-manifest.example.json`

## Boundary

- Owns: observable IA findings — navigation grouping, label choices, prioritization patterns, and cross-section connection structure as visible from the UI.
- Does not own: interaction behavior study, accessibility evaluation, conversion storytelling analysis, or blueprint design decisions.
- Hand off interaction pattern observation to `study-ui-interaction`.
- Hand off conversion-focused narrative observation to `study-ui-storytelling`.

## Rules

1. Study navigation labels, section hierarchy, content grouping, and wayfinding cues.
2. Separate global navigation, local navigation, breadcrumbs, in-page links, and footer navigation.
3. Identify whether hierarchy supports the primary user task.
4. Hand off structural redesign to page and section blueprint skills.
5. Preserve observed, inferred, and missing-evidence categories in findings.
6. Do not rename, regroup, or reorder as if it were observed evidence; record
   recommendations as handoffs.
7. Treat `capture-manifest.json` as the IA coverage index when supplied: use
   successful captures to map visible navigation and hierarchy, and record
   failed collapsed menu, search, route, or page captures as IA gaps.
8. Use commands only when structured route, sitemap, capture, or blueprint data
   can support deterministic consistency checks.

## Method

1. If `capture-manifest.json` is supplied, identify which captures cover
   desktop, mobile, menus, search, route/page states, and which failed captures
   limit IA conclusions.
2. Map global navigation, local navigation, breadcrumbs, in-page anchors, footer
   links, and repeated cross-links separately.
3. Record heading hierarchy and section grouping in visible order.
4. Compare visible navigation labels with the page's apparent primary task.
5. Identify wayfinding cues such as active states, breadcrumbs, progress
   indicators, category labels, and section anchors.
6. Study continuity between labels, headings, CTAs, related links, destination
   cues, and likely next steps.
7. Mark missing IA evidence, such as collapsed mobile menu contents or hidden
   search behavior.
8. Hand off redesign, taxonomy, or cross-page reconciliation rather than
   silently rewriting the structure.

## Anti-Patterns

- Rewrite without evidence: replacing page or site structure before mapping
  observed labels, groups, and links.
- Navigation flattening: treating primary nav, local nav, breadcrumbs, filters,
  related links, and footer support as one list.
- Label invention: presenting renamed labels as observations.
- Active-state guess: assuming current location when the capture does not show
  active, selected, breadcrumb, or URL evidence.
- Orphan claim without route evidence: calling a page orphaned without route,
  sitemap, link, or navigation evidence.
- Mobile IA blind spot: ignoring collapsed navigation, filters, search, or
  mobile wayfinding.
- SEO-only IA: reducing information architecture to title/meta wording instead
  of labels, hierarchy, grouping, and journeys.

## Inline Example

Input evidence: a service page nav shows "Services", "Pricing", "Reviews", and
"Contact"; page sections are hero, service cards, testimonials, FAQ, and contact
form.

Finding: observed IA prioritizes service discovery and contact; global nav
matches main page sections except FAQ; inferred primary task is choosing a
service then contacting; missing evidence is whether service cards link to
detail pages.

Structured finding:

- Observed: global navigation includes `Services`, `Pricing`, `Reviews`, and
  `Contact`; the page sequence moves from service promise to cards,
  testimonials, FAQ, and contact form.
- Inferred: the primary path is service evaluation leading to contact.
- Missing evidence: destination pages for service cards, mobile menu contents,
  active nav state, and whether FAQ is intentionally excluded from navigation.
- Handoff: page sequence questions to `page-wireframe-planner`, label ambiguity
  to `design-terminology`, and cross-page consistency to
  `generate-site-audit-report`.

## Hand-Offs

- Send page sequence conflicts to `page-wireframe-planner`.
- Send label ambiguity to `design-terminology` or SEO skills.
- Send observed navigation and grouping to `generate-ui-blueprint-from-study`.
- Send cross-page navigation, orphan-risk, and journey continuity issues to
  `generate-site-audit-report`.
