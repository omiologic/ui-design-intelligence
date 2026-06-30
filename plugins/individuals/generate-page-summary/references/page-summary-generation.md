# Page Summary Generation

Generate concise summaries from page content, page studies, or supplied page
descriptions.

## Decision Heuristics

- Start with the page's literal type and topic.
- Capture the first-viewport promise, supporting proof, major content groups,
  and primary action.
- Use neutral language when page quality is uncertain.
- Do not convert an audit criticism into a summary unless the user asks for an
  evaluative summary.
- Separate observed evidence from inferred audience or business intent.
- Mention missing evidence only when it materially affects downstream handoff.

## Decision Rules

- Homepage: summarize the organization or product, primary audience when stated,
  core offer areas, proof, and primary path.
- Landing page: summarize promise, proof, objection handling, and conversion
  action.
- Product page: summarize product, category, key evaluation content, proof, and
  purchase or comparison path.
- Service page: summarize service, user need, location or eligibility when
  supported, proof, process, and contact action.
- Support page: summarize the user task, help topics, escalation paths, and
  recovery action.
- Article or guide: summarize topic, learning outcome, structure, and next step.

## Evidence Rules

- Use visible or supplied content: headings, sections, CTAs, forms, proof,
  metadata, screenshots, wireframe nodes, or study notes.
- Use "appears to" only for inference supported by multiple signals.
- Do not invent audience, proof, location, pricing, or calls to action.
- Do not include recommendations, severity, or remediation unless explicitly
  asked for an evaluative summary.

## Anti-Pattern

Bad: summarizing a page as "great for customers" without naming what the page
actually offers or asks users to do.

Corrected: "A local dental homepage introducing preventive and emergency care,
highlighting appointment availability, patient reviews, insurance support, and a
primary booking CTA."

Bad: turning a summary into a hidden audit: "The page fails to build trust before
asking users to book."

Corrected: "A consultation landing page that introduces the service, presents
booking CTAs, and includes trust evidence later in the page." Hand the critique
to `generate-page-audit-report`.

## Worked Example

For a SaaS pricing page, summarize plans, differentiators, proof, comparison
structure, and the primary trial or contact action without listing every feature
row.

For a mobile app support page, summarize the recovery task, help topic groups,
contact escalation, and any account verification steps without judging support
quality.

## Hand-Off

Hand off title generation to `generate-title-tag`, meta description generation
to `generate-meta-description`, and quality findings to
`generate-page-audit-report` or `generate-seo-audit-report`.
