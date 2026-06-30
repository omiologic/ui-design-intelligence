# SEO Audit Reporting

Generate SEO audit findings for metadata, search intent, page summaries,
headings, and content hierarchy.

## Decision Heuristics

- Identify page purpose and likely search intent before judging metadata.
- Check title tag, meta description, primary heading, section headings, and
  visible proof for alignment.
- Treat misleading or missing metadata as more severe when the page is a primary
  acquisition, product, service, or location page.
- Do not invent keywords unsupported by visible content or supplied business
  context.
- Treat SEO as expectation-setting: metadata should make the page journey
  predictable before the user clicks.
- Check whether metadata, headings, and visible content describe the same user
  task.
- Distinguish generation work from audit work. The audit names the mismatch and
  hands generation to the title, meta description, or page summary skills.

## Evidence Rules

- Observed: supplied title, meta description, page summary, headings, section
  labels, visible copy, proof, CTAs, URL/name, or study findings.
- Inferred risk: likely mismatch when metadata promises an action, location,
  proof, or service not represented in visible content.
- Out of scope: search volume, rankings, crawl diagnostics, schema markup, and
  technical SEO unless supplied evidence includes those data.

## Anti-Pattern

Bad: recommending keyword stuffing or generic high-volume terms.

Corrected: recommend concise metadata that reflects the page's actual offer,
audience, location, proof, and action.

Bad: flagging SEO quality without identifying whether the issue is title,
description, headings, page summary, or content mismatch.

Corrected: target the exact metadata or hierarchy element, cite evidence, explain
user expectation impact, and hand off generation if needed.

## Worked Example

For a dental homepage titled only "Home", create a medium SEO finding. Evidence
is the vague title, impact is weak search snippet clarity, and recommendation is
a specific title that names the practice category, location, and primary value
without exceeding practical snippet length.

For a service page whose meta description promises pricing but no pricing or
cost guidance appears on the page, create a high finding when pricing is a
primary search intent. Recommend either removing the pricing promise or adding
visible pricing guidance.

## Hand-Off

Hand off metadata generation to `generate-title-tag` and
`generate-meta-description`, page summary work to `generate-page-summary`, and
structural content hierarchy issues to `generate-page-audit-report`.
