---
name: generate-seo-audit-report
description: Generate SEO audit findings for page intent, titles, meta descriptions, headings, summaries, content hierarchy, and search-facing clarity.
license: See repository LICENSE
---

# Generate SEO Audit Report

Use this skill when audit output needs search-facing content and metadata
findings, either inside `ui-audit-skills` or the SEO-only `ui-seo-skills`
bundle.

## Purpose

Evaluate whether page metadata, headings, summaries, and visible content align
with page intent, search usefulness, and user expectations.

## Philosophy

SEO audit work is expectation-setting for the page journey. A title, meta
description, heading, and page summary form the promise before the click; visible
content must keep that promise. The report should judge alignment with user
intent and page evidence, not chase unsupported keywords or generic search
volume.

## References

- `references/seo-audit-reporting.md`
- `references/seo-severity-remediation.md`
- `../../../shared/schemas/page-audit.schema.json`
- `../../../shared/vocabulary/audit-severity.json`
- `../../../shared/templates/page-audit.md`

## Decision Criteria

1. `critical`: metadata or headings fundamentally misrepresent a core page or
   block understanding of search intent.
2. `high`: a primary acquisition, service, product, location, or support page has
   misleading, missing, or duplicate metadata.
3. `medium`: metadata is vague, weak, or mismatched but page purpose remains
   recoverable.
4. `low`: metadata is mostly accurate but omits a supported proof, audience,
   action, or hierarchy cue.
5. `info`: contextual observation with no corrective action.

## Boundary

- Owns: SEO audit findings covering metadata completeness, heading structure, page summaries, and content-to-search-intent alignment.
- Does not own: meta description or title tag writing, accessibility audit, on-page content rewriting, or conversion analysis.
- Hand off meta description writing to `generate-meta-description`.
- Hand off title tag writing to `generate-title-tag`.
- Hand off multi-dimension page evaluation to `generate-page-audit-report`.

## Rules

1. Cite supplied title, meta description, page summary, headings, section labels,
   visible copy, proof, CTAs, URL/name, or study findings.
2. Mark unsupported promises as inferred risk when metadata claims content,
   action, location, proof, or pricing not visible in the source.
3. Do not claim rankings, search volume, crawl status, or technical SEO behavior
   unless supplied data supports it.
4. Every finding needs target, evidence, impact, recommendation, and optional
   handoff.

1. Use `seo` as `auditType`.
2. Ground findings in visible content, supplied metadata, or page purpose.
3. Flag missing, duplicated, vague, misleading, or mismatched metadata.
4. Keep recommendations aligned with actual page content.
5. Hand off generation work to `generate-title-tag`, `generate-meta-description`, and `generate-page-summary`.
6. Return JSON matching `page-audit.schema.json`.
7. Add deterministic commands only when checking length bounds, duplicate
   metadata, or banned generic phrases from fixtures. This skill does not need a
   separate SEO/UX subagent yet; use `generate-page-audit-report` when the issue
   is the page journey rather than metadata alignment.

## Anti-Patterns

- Keyword-first recommendation: pushes search terms that visible content does not
  support.
- Unsupported claim: metadata says best, affordable, trusted, local, pricing, or
  same-day without page evidence.
- Duplicate snippet: distinct pages share the same title or meta description.
- Metadata-content mismatch: snippet promises booking, pricing, downloads, or
  support that the page does not provide.
- Vague target: finding says "SEO is weak" without naming title, meta
  description, heading, summary, or content hierarchy.

## Workflow

1. Identify page type, source, title, meta description, page summary, primary
   heading, section headings, visible proof, and primary action.
2. Infer likely search intent only from page evidence or supplied context.
3. Compare metadata promise against visible content hierarchy and user journey.
4. Separate metadata generation needs from page-journey problems.
5. Assign severity using `references/seo-severity-remediation.md`.
6. Return schema-valid findings with concrete fixes and handoffs.

## Inline Example

```json
{
  "id": "dental-homepage-seo-audit",
  "source": {
    "urlOrName": "Dental homepage"
  },
  "auditType": "seo",
  "summary": "The metadata underspecifies the visible service and location promise.",
  "overallSeverity": "medium",
  "findings": [
    {
      "id": "generic-home-title",
      "title": "Title tag is generic despite specific service content",
      "severity": "medium",
      "category": "seo",
      "target": "titleTag",
      "evidence": "The title is \"Home\" while the page visibly offers family and emergency dental care in Austin with same-week booking.",
      "impact": "Users cannot tell what the page offers before clicking from search results.",
      "recommendation": "Generate a page-specific title such as \"Family and Emergency Dental Care in Austin | Example Dental\" only if the visible content supports those terms.",
      "handoff": "generate-title-tag"
    }
  ]
}
```

## Hand-Offs

Hand off title rewrites to `generate-title-tag` and meta description rewrites to
`generate-meta-description`. Hand off page journey, proof, or CTA problems to
`generate-page-audit-report` when the SEO issue is caused by visible content
rather than metadata alone.
