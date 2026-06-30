# Title Tag Generation

Generate title tags for search snippets, browser tabs, and social previews.

## Decision Heuristics

- Identify page type first: homepage, service page, product page, article,
  category, location, support, or contact page.
- Lead with the term that best identifies the page's unique purpose.
- Add brand after the page topic unless the brand itself is the search target.
- Keep title variants easy to distinguish across pages.
- Treat the title as a pre-click UX promise: it should tell users what they will
  get before they choose the result.
- Use supported qualifiers only. Location, audience, price, urgency, proof,
  availability, and format claims must appear in visible content or supplied
  context.
- Keep the core promise early enough to survive truncation.
- Prefer one specific differentiator over a pile of broad keywords.

## Evidence Rules

- Use visible headings, page summary, section labels, primary CTA, product or
  service names, proof points, location, audience, and brand context.
- Compare with neighboring page titles when available to avoid duplicates and
  weak differentiation.
- Do not invent ranking targets, search volume, "near me" phrasing, urgency,
  pricing, location, or superlatives without evidence.
- If the page content cannot support a clear title, write conservatively and
  hand off the content mismatch to `generate-seo-audit-report`.

## Length Guidance

- Aim for roughly 50 to 60 characters when that keeps the title natural,
  specific, and readable.
- Shorter titles are acceptable when the topic is clear.
- Longer titles are acceptable only when extra words add supported
  differentiation.
- Do not pad, repeat, or stuff terms to satisfy a character target.

## Anti-Pattern

Bad: "Home | Brand" for every primary landing page.

Corrected: "Emergency Dental Care in Austin | Brand" when the page visibly
offers that service and location.

Bad: "Dental Dentist Dental Care Austin Emergency Same Day | Brand".

Corrected: "Emergency Dental Care in Austin | Brand" if the page visibly
supports emergency care, Austin relevance, and timely appointments.

Bad: "Best Affordable Dentist Near Me | Brand" when the page has no proof for
best, affordability, or local availability.

Corrected: "Family Dentistry Services | Brand" or hand off missing local intent
and proof to `generate-seo-audit-report`.

## Worked Example

For a product page, use the product name and category before the brand. Include a
high-value modifier only when the page supports it with content or proof.

For a support page, lead with the task or problem the user needs to solve before
the brand. Example: "Reset Your Account Password | Brand Support" when the page
actually provides that task flow.

## Hand-Off

Hand off meta description generation to `generate-meta-description`, concise
page summaries to `generate-page-summary`, and repeated or misleading title
issues to `generate-seo-audit-report`.
