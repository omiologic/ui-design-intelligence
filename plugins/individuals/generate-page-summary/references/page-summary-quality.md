# Page Summary Quality

Use this reference to produce page summaries that are useful for SEO, audits,
blueprints, and handoff without turning into an audit report.

## Decision Heuristics

- Start with what is visible or supplied: page type, topic, audience, offer,
  proof, primary action, and major content groups.
- Summarize the page journey at a high level: orientation, proof, detail,
  comparison, action, and support when present.
- Keep the summary factual. Do not praise, diagnose, or recommend unless the user
  explicitly asks for an evaluative summary.
- Include strengths or risks only as neutral observations when they are visible,
  such as "relies on testimonials for proof" or "routes users to a booking form."
- Record uncertainty instead of inventing intent. If the page does not state an
  audience, do not create one.

## Summary Shape

A durable page summary should usually answer:

1. What kind of page is this?
2. Who appears to be served?
3. What does the page offer or explain?
4. What proof, comparison, or support content is present?
5. What primary action or understanding does the page ask from users?
6. What handoff context matters for SEO, audit, or blueprint work?

## Evidence Discipline

- Observed: visible headings, section labels, copy, CTAs, forms, proof, metadata,
  screenshots, wireframe nodes, or supplied study notes.
- Inferred: likely audience, business intent, or user goal when supported by
  multiple observed signals.
- Missing: page purpose, audience, proof, action, or content hierarchy that cannot
  be determined from the source.
- Do not convert missing evidence into a defect. Hand quality questions to
  `generate-page-audit-report` or `generate-seo-audit-report`.

## Anti-Pattern

Bad: "This is a strong conversion page that should improve bookings."

Corrected: "A dental consultation landing page that introduces implant services,
uses patient proof and process sections to build confidence, and routes users to
a booking CTA."

Bad: "A page for everyone who wants great service."

Corrected: "A service page describing emergency dental care, appointment
availability, insurance support, and contact options. The audience is not stated
directly."

## Worked Example

Input evidence: SaaS pricing page with hero, plan comparison table, feature
matrix, customer proof, implementation FAQ, and primary trial/contact actions.

Output: "A SaaS pricing page that helps buyers compare subscription plans,
review feature differences, validate the offer through customer proof, and
choose between starting a trial or contacting sales."

Why: the summary captures type, user task, hierarchy, proof, comparison, and
action without evaluating whether the pricing page is good.

## Hand-Off

Use `generate-title-tag` and `generate-meta-description` for search-facing
metadata, `generate-page-audit-report` for UX quality findings, and
`generate-seo-audit-report` for metadata or search-intent mismatch.
