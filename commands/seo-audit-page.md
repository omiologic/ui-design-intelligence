# SEO Audit Page

## Purpose

Audit one page for SEO metadata, page-summary accuracy, heading/content intent,
and search-facing snippet alignment.

## Use When

- The user wants SEO-specific findings for one page.
- The task does not require a full UX, interaction, or accessibility audit.

## Inputs

- Page title, meta description, page summary, URL/name, headings, visible copy,
  or study notes.
- Optional target audience, location, brand, and search intent context.

## Workflow

1. Use `seo-content-analyst` to define SEO scope and evidence quality.
2. Use `generate-page-summary` when the page purpose needs a neutral summary.
3. Use `generate-title-tag` and `generate-meta-description` when metadata needs
   concrete remediation.
4. Use `generate-seo-audit-report` for evidence-backed SEO findings.
5. Hand off to `audit-page` only when the SEO issue is caused by broader page
   journey, accessibility, or interaction quality.

## Outputs

- SEO page audit findings.
- Optional title tag, meta description, or page summary recommendations.

## Agents

- `seo-content-analyst`

## Skills

- `generate-seo-audit-report`
- `generate-title-tag`
- `generate-meta-description`
- `generate-page-summary`
