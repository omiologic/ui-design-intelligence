# Audit Site

## Purpose

Audit a site or multi-page experience for repeated UX, IA, interaction,
accessibility, and SEO issues.

## Use When

- The user wants site-level findings rather than a single-page audit.
- Multiple pages should be compared for consistency and quality.

## Inputs

- Site URL, page list, captures, or prior site study.
- Optional business goals and target audience.

## Workflow

1. Use `ui-audit-lead` to define site-level audit scope.
2. Use `ui-researcher` to identify core journeys and page roles.
3. Use `ui-specification-analyst` to compare templates and navigation.
4. Use `accessibility-reviewer` and `seo-content-analyst` for repeated risks.
5. Use `generate-site-audit-report` for cross-page findings.
6. Use `generate-page-audit-report` for page-specific follow-ups.
7. Use `generate-title-tag`, `generate-meta-description`, and `generate-page-summary` for repeated metadata and summary remediation.

## Outputs

- Site audit report.
- Repeated pattern findings and prioritized fixes.

## Agents

- `ui-audit-lead`
- `ui-researcher`
- `ui-specification-analyst`
- `accessibility-reviewer`
- `seo-content-analyst`

## Skills

- `generate-site-audit-report`
- `generate-page-audit-report`
- `generate-accessibility-audit-report`
- `generate-seo-audit-report`
- `generate-title-tag`
- `generate-meta-description`
- `generate-page-summary`
