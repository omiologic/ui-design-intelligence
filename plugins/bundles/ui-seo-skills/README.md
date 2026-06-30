# UI SEO Skills

## Summary

`ui-seo-skills` is the active SEO metadata and SEO-review bundle. It generates
title tags, meta descriptions, page summaries, and SEO-specific audit findings
grounded in visible content.

## When To Install

Install this bundle when the task is search-facing metadata, page-summary
clarity, snippet alignment, duplicate metadata, or SEO-only findings.

Do not install it for broader UX, accessibility, interaction, or site-quality
audits; use `ui-audit-skills` for those commands.

## Included

Skills:

- `generate-meta-description`
- `generate-title-tag`
- `generate-seo-audit-report`
- `generate-page-summary`

Agents:

- `seo-content-analyst`

Commands:

- `seo-audit-page`
- `seo-audit-site`

Shared assets include the page-audit schema, UI terminology vocabulary, audit
severity vocabulary, and page-audit template.

## Requirements

SEO workflows need visible page content, metadata, headings, summaries, study
notes, or supplied business context. The bundle does not perform crawl,
analytics, ranking, or technical SEO diagnostics.

## Install

```bash
UI_PLUGIN_BUNDLE="ui-seo-skills" ./install.sh
```

Install into a project-local target:

```bash
UI_PLUGIN_BUNDLE="ui-seo-skills" UI_PLUGIN_TARGET="./.claude" ./install.sh
```

Uninstall:

```bash
UI_PLUGIN_BUNDLE="ui-seo-skills" ./uninstall.sh
```

## Usage Example

Use `seo-audit-page` when one page has weak or mismatched metadata. Use
`seo-audit-site` when titles, descriptions, summaries, or headings should be
compared across a page group. Use `generate-title-tag`,
`generate-meta-description`, and `generate-page-summary` for concrete
remediation outputs.

## Relationship To Other Bundles

- Upstream: `ui-study-skills` can supply page evidence and hierarchy.
- Adjacent: `ui-audit-skills` owns general `audit-page` and `audit-site`
  commands.
- Downstream: `ui-blueprint-skills` may use page summaries as structural input.

SEO-specific command ownership belongs here: `seo-audit-page` and
`seo-audit-site`.

## Versioning And Status

Version: `0.1.0`. Status: `active`. This bundle owns the stable SEO-only command
surface after the audit/SEO collision resolution.

## License

Uses the repository license. Release-grade bundle packaging should include a
bundle-local `LICENSE` that points to or copies the repository license.
