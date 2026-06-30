# UI Audit Skills

## Summary

`ui-audit-skills` is the active quality-review bundle for site, page, section,
interaction, accessibility, and SEO audit findings. It produces structured,
evidence-backed reports rather than new wireframes.

## When To Install

Install this bundle when the goal is to evaluate quality, prioritize findings,
or produce remediation guidance from captures, study notes, wireframes, or
existing site/page evidence.

Do not install it for SEO-only metadata work unless broader UX, interaction, or
accessibility review is needed; use `ui-seo-skills` for SEO-only commands.

## Included

Skills:

- `generate-site-audit-report`
- `generate-page-audit-report`
- `generate-section-audit-report`
- `generate-interaction-audit-report`
- `generate-accessibility-audit-report`
- `generate-seo-audit-report`

Agents:

- `ui-audit-lead`
- `accessibility-reviewer`
- `seo-content-analyst`

Commands:

- `audit-page`
- `audit-site`
- `audit-interactions`

Shared assets include the page-audit schema, audit severity vocabulary, page and
interaction audit templates, and page-audit example.

## Requirements

Audits need evidence: study notes, captured page material, wireframes,
interaction paths, or supplied observations. Findings should distinguish
observed facts from inferred risk.

## Install

```bash
UI_PLUGIN_BUNDLE="ui-audit-skills" ./install.sh
```

Install into a project-local target:

```bash
UI_PLUGIN_BUNDLE="ui-audit-skills" UI_PLUGIN_TARGET="./.claude" ./install.sh
```

Uninstall:

```bash
UI_PLUGIN_BUNDLE="ui-audit-skills" ./uninstall.sh
```

## Usage Example

Use `audit-page` for one page, `audit-site` for repeated cross-page patterns, or
`audit-interactions` for forms, overlays, navigation, feedback states, and other
behavior-heavy flows. The command sequence routes through `ui-audit-lead` and
the focused audit generators.

## Relationship To Other Bundles

- Upstream: `ui-study-skills` supplies observed evidence.
- Adjacent: `ui-seo-skills` owns SEO-only audit commands.
- Downstream: `ui-blueprint-skills`, `ui-design-system-skills`, or
  `ui-prototype-skills` can receive remediation handoffs.

General audit command ownership belongs here: `audit-page`, `audit-site`, and
`audit-interactions`. SEO-only workflows use `seo-audit-page` and
`seo-audit-site` from `ui-seo-skills`.

## Versioning And Status

Version: `0.1.0`. Status: `active`. This bundle owns the stable general audit
command surface.

## License

Uses the repository license. Release-grade bundle packaging should include a
bundle-local `LICENSE` that points to or copies the repository license.
