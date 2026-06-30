# Page Audit Reporting

Generate page-level findings that are useful to designers, developers, and
content owners.

## Decision Heuristics

- Start with page intent: what job the page must perform and what action or
  understanding the user should leave with.
- Evaluate the first viewport before lower-page details because it frames user
  expectations.
- Separate categories: storytelling, structure, interaction, accessibility,
  responsive, SEO, content, and conversion.
- Escalate severity when the issue blocks the primary page action, hides
  critical information, or creates inaccessible behavior.
- Check the decision journey: orientation, proof, detail, comparison, objection
  handling, action, and recovery should appear in an order that fits the page.
- Treat CTA cadence as evidence. Repeated CTAs should follow new information,
  not appear as filler between generic sections.
- Treat responsive priority as page quality. Mobile should preserve the same
  required content and primary action.

## Evidence Rules

- Observed: visible structure, section order, headings, CTAs, proof, forms,
  overlays, responsive notes, or supplied study findings.
- Inferred risk: missing rationale or absent structure that a good page needs
  for its stated goal, such as no proof before a high-friction action.
- Out of scope: subjective visual taste, brand preference, animation polish, or
  code behavior unless supplied evidence supports it.

## Anti-Pattern

Bad: flagging subjective visual taste without evidence or impact.

Corrected: cite the observed page element, explain the user or business impact,
and recommend a concrete structural, content, or interaction change.

Bad: "The page needs more sections."

Corrected: state which missing decision step causes the issue, such as proof
before commitment, comparison before pricing, or recovery after form errors.

## Worked Example

For a landing page with a strong hero CTA but no proof above the fold, create a
medium conversion finding. Evidence should mention the missing first-viewport
trust signal, impact should explain hesitation, and recommendation should place
one proof element near the CTA without crowding the hero.

For a support page where the hero is large but task links are below repeated
marketing content, create a high structure finding if users cannot quickly reach
help. Recommend reducing hero weight and moving support topic navigation into
the first viewport.

## Hand-Off

Hand off structural redesign to `page-wireframe-planner`, interaction state
problems to `generate-interaction-audit-report`, accessibility issues to
`generate-accessibility-audit-report`, and metadata problems to
`generate-seo-audit-report`.
