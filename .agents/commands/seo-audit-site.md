# SEO Audit Site

## Purpose

Audit a multi-page site or page group for repeated SEO metadata, page-summary,
heading, and search-intent alignment issues.

## Use When

- The user wants SEO-specific findings across multiple pages.
- Multiple page titles, descriptions, summaries, or headings should be compared
  for duplication, mismatch, or weak differentiation.

## Inputs

- Site URL, page list, captures, metadata inventory, page summaries, or study
  notes.
- Optional business goals, location, audience, and page-group definitions.

## Workflow

1. Use `seo-content-analyst` to group pages by intent and template.
2. Compare titles, meta descriptions, page summaries, headings, visible proof,
   and primary actions across the page set.
3. Use `generate-page-summary` for pages whose purpose needs clarification.
4. Use `generate-title-tag` and `generate-meta-description` for repeated
   metadata remediation patterns.
5. Use `generate-seo-audit-report` for representative SEO findings.
6. Hand off to `audit-site` only when repeated SEO issues are caused by broader
   navigation, UX, accessibility, or page-template problems.

## Outputs

- SEO site or page-group audit findings.
- Repeated metadata and summary remediation guidance.

## Agents

- `seo-content-analyst`

## Skills

- `generate-seo-audit-report`
- `generate-title-tag`
- `generate-meta-description`
- `generate-page-summary`
