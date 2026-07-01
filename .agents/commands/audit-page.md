# Audit Page

## Purpose

Audit one page for UX structure, content clarity, interaction quality,
accessibility risks, and SEO metadata.

## Use When

- The user wants prioritized page-level findings.
- Study material already exists or can be produced first.

## Inputs

- Page capture, study notes, or URL-derived observations.
- Optional audit scope and severity expectations.

## Workflow

1. Use `ui-audit-lead` to define audit scope.
2. Use `ui-researcher` and `ui-specification-analyst` if study context is missing.
3. Use `ui-interaction-analyst` for stateful or form-heavy pages.
4. Use `accessibility-reviewer` and `seo-content-analyst` for domain-specific findings.
5. Use `generate-page-audit-report` for the final page-level report.
6. Use `generate-interaction-audit-report`, `generate-accessibility-audit-report`, and `generate-seo-audit-report` for focused findings when needed.
7. Use `generate-title-tag`, `generate-meta-description`, and `generate-page-summary` when SEO remediation needs concrete metadata or summary output.

## Outputs

- Page audit report.
- Prioritized evidence-backed recommendations.

## Agents

- `ui-audit-lead`
- `accessibility-reviewer`
- `seo-content-analyst`

## Skills

- `generate-page-audit-report`
- `generate-section-audit-report`
- `generate-interaction-audit-report`
- `generate-accessibility-audit-report`
- `generate-seo-audit-report`
- `generate-title-tag`
- `generate-meta-description`
- `generate-page-summary`
