# SEO Severity And Remediation

Use this reference to turn SEO observations into prioritized findings. In this
repository, SEO is treated as expectation-setting for the page journey: search
metadata should help the right user predict what the page contains before they
click.

## Decision Heuristics

- Start with page purpose, page type, visible headings, summary, metadata, and
  primary action.
- Judge search-facing clarity against the page's actual content, not desired
  keyword targets.
- Raise severity when metadata misleads users before a high-value page,
  acquisition page, service page, location page, product page, or support path.
- Treat missing or duplicated metadata as more severe when it prevents distinct
  pages from being understood.
- Treat keyword stuffing as a UX defect because it weakens information scent and
  often overpromises the page.
- Do not invent keywords, locations, claims, prices, ratings, or proof that the
  page does not support.

## Severity Model

| Severity | Use When | Example |
| --- | --- | --- |
| `critical` | Metadata or headings fundamentally misrepresent a core page or block understanding of search intent | Product page title and description describe a different product |
| `high` | Primary acquisition, service, product, location, or support page has misleading, missing, or duplicate metadata | Multiple location pages share the same generic title and description |
| `medium` | Metadata is vague, weak, or mismatched but the page purpose remains recoverable | Homepage title is "Home" while the page clearly offers emergency dental care |
| `low` | Metadata is mostly accurate but could better reflect proof, audience, action, or hierarchy | Meta description omits a visible same-week appointment cue |
| `info` | Contextual observation with no corrective action | Strong metadata pattern worth preserving |

## SEO Audit Checks

- Title tag: page-specific topic, brand/location when supported, no duplication
  across distinct pages.
- Meta description: concrete promise, supported audience/offer/action, no keyword
  stuffing or unsupported claims.
- Primary heading: aligns with page purpose and does not fight the title.
- Section headings: reveal hierarchy and search-relevant content structure.
- Page summary: factual and consistent with visible content.
- Content hierarchy: visible proof, service/product details, and next actions
  support the metadata promise.
- Search intent: metadata matches the user's likely informational, commercial,
  transactional, navigational, or support task.

## Remediation Patterns

| Issue | Typical Severity | Fix |
| --- | --- | --- |
| Vague title such as "Home" or "Services" | medium | Name the page topic, service/product, location/audience when supported, and brand |
| Duplicate metadata across distinct pages | medium to high | Make each title and description page-specific |
| Unsupported superlative or claim | medium to high | Remove the claim or add page evidence before using it |
| Keyword-first heading structure | medium | Rewrite headings around user intent and content hierarchy |
| Meta description promises missing action | high | Align the description to visible actions or add the missing action |
| Metadata omits visible differentiator | low to medium | Add supported proof, audience, location, or next-step cue |
| Search intent and page content mismatch | high | Revise metadata or page content so the click promise matches the journey |

## Anti-Pattern

Bad: "Add best dentist, cheap dentist, Austin dentist, emergency dentist to the
title and description."

Corrected: "Use a title such as `Emergency Dental Care in Austin | Example
Dental` only if the page visibly supports emergency care and Austin location.
Use the meta description to name services, insurance or reviews when present,
and the booking path without adding unsupported price or quality claims."

## Worked Example

```json
{
  "id": "homepage-title-is-generic",
  "title": "Homepage title does not describe the visible service",
  "severity": "medium",
  "category": "seo",
  "target": "titleTag",
  "evidence": "The title is \"Home\", while the page introduces family and emergency dental care in Austin with same-week booking.",
  "impact": "Searchers cannot tell what the page offers from the snippet, reducing qualified clicks and setting weak expectations.",
  "recommendation": "Generate a page-specific title such as \"Family and Emergency Dental Care in Austin | Example Dental\" if the visible content supports those terms.",
  "handoff": "generate-title-tag"
}
```

## Hand-Off

Use `generate-title-tag`, `generate-meta-description`, and
`generate-page-summary` for generation work. Use `generate-page-audit-report`
when the issue is the visible page journey rather than metadata. Use a future
command only for deterministic checks such as length bounds, duplicate metadata,
or banned generic phrases.
