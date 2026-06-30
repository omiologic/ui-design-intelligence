# Site Audit Reporting

Generate site-level audit findings from multiple page captures, page studies, or
page audit notes.

## Decision Heuristics

- Start with repeated patterns: navigation, template consistency, repeated calls
  to action, forms, search, account flows, footer support, and metadata.
- Evaluate information architecture through navigation labels, page
  relationships, hub/detail structure, orphaned pages, and whether users can
  recover when they land deep in the site.
- Evaluate journey continuity across discovery, comparison, decision, action,
  and support steps; a page can be acceptable alone and still fail when its
  handoff to the next page is unclear.
- Evaluate repeated component structure before visual preference: cards, forms,
  accordions, filters, and CTA blocks should keep stable roles across template
  groups.
- Check responsive behavior at the site level when navigation, primary actions,
  or repeated sections change meaning or priority between desktop and mobile.
- Treat a repeated medium issue as higher priority than a one-off medium issue
  when it affects core journeys across pages.
- Use `high` or `critical` only when the issue blocks a primary journey, creates
  major accessibility risk, or makes page intent unrecoverable.
- Preserve page-specific evidence in each finding so the recommendation is
  traceable.

## Evidence Rules

- Cite representative pages, template groups, URLs or page names, navigation
  labels, CTAs, metadata, and repeated components that support the finding.
- Separate observed evidence from inferred journey or business impact. Observed
  evidence names what appears across pages; impact explains why it matters.
- Treat a single-page issue as page-level unless it reveals a repeated template,
  navigation, component, metadata, or journey pattern.
- Do not claim analytics, ranking loss, conversion loss, or technical
  performance impact unless supplied evidence supports it.
- Commands are useful only for deterministic cross-page checks such as duplicate
  metadata, missing blueprint fields, or inconsistent route inventories. Use
  judgment for UX severity.

## Anti-Pattern

Bad: averaging every page into a vague "site needs better UX" conclusion.

Corrected: identify the repeated pattern, cite representative pages, describe
the user impact, and recommend a system-level fix.

Bad: promoting an isolated page defect into a site-level issue without proving
that the pattern repeats.

Corrected: state the single-page defect in a page audit, or cite the shared
template/component that causes the defect across multiple pages.

## Worked Example

If three service pages use different CTA labels, one hides contact options below
the fold, and the navigation changes order between pages, create a site-level
finding about journey inconsistency. Set severity based on how directly the
pattern affects the user's ability to compare services and request contact.

If five location pages reuse the same title, summary, and hero claim while only
changing the city name, create a site-level finding about duplicated local
intent. Cite representative pages, explain how the repeated template weakens
orientation and search promise clarity, and recommend page-specific metadata and
proof points.

## Hand-Off

Hand off page-specific remediation to `generate-page-audit-report`, interaction
state issues to `generate-interaction-audit-report`, accessibility risks to
`generate-accessibility-audit-report`, and SEO metadata issues to
`generate-seo-audit-report`. Hand off taxonomy, hub/detail, or orphaned-page
mapping to `study-ui-information-architecture` before final severity if the
site structure is unclear.
