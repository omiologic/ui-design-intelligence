# UI Design System Skills

## Summary

`ui-design-system-skills` is the lightweight design-system seed bundle. It
creates and audits `DesignSystemSeed` JSON/Markdown artifacts, semantic token
intent, component foundation contracts, accessibility constraints, source
labels, and confidence metadata.

## When To Install

Install this bundle when downstream blueprint, style, or prototype work needs a
consistent brand, palette, typography, iconography, button, card, header, and
footer foundation.

Do not install it as a production design-system governance package, token build
pipeline, final CSS system, or component library.

## Included

Skills:

- `generate-design-system-seed`
- `extract-brand-foundation`
- `extract-palette-foundation`
- `extract-typography-foundation`
- `extract-iconography-foundation`
- `generate-button-foundation`
- `generate-card-foundation`
- `generate-header-foundation`
- `generate-footer-foundation`
- `audit-design-system-completeness`
- `audit-design-system-naming`
- `audit-design-system-consistency`

Agents:

- `design-system-architect`

Commands:

- `generate-design-system-seed`
- `audit-design-system-seed`

Shared assets include design-system doctrine, seed/foundation schemas,
controlled token/component vocabulary, templates, examples, and interop docs.

## Requirements

Inputs may be prompts, screenshots, URLs, study output, style references,
knowledge patterns, or mixed evidence. All extracted or generated values should
carry source labels and confidence.

Design-token provenance matters: user-provided and source-code values can be
high confidence; screenshot-derived colors, fonts, spacing, and icon libraries
are inferred unless source evidence confirms exactness.

## Install

```bash
UI_PLUGIN_BUNDLE="ui-design-system-skills" ./install.sh
```

Install into a project-local target:

```bash
UI_PLUGIN_BUNDLE="ui-design-system-skills" UI_PLUGIN_TARGET="./.claude" ./install.sh
```

Uninstall:

```bash
UI_PLUGIN_BUNDLE="ui-design-system-skills" ./uninstall.sh
```

## Usage Example

Run `generate-design-system-seed` from a brief plus study evidence to produce a
seed contract. Then run `audit-design-system-seed` before handing the seed to
blueprint, style-reference, or prototype workflows.

## Relationship To Other Bundles

- Upstream: `ui-study-skills`, `ui-knowledge-skills`, and
  `ui-style-reference-skills`.
- Downstream: `ui-blueprint-skills` can reference seed roles, and
  `ui-prototype-skills` can use component states and accessibility constraints.

This layer sits between evidence/knowledge and downstream generation. It owns a
seed contract, not final visual rendering.

## Versioning And Status

Version: `0.1.0`. Status: `transitional`. The layer is buildable but newer than
the core blueprint/study/audit/SEO bundles.

## License

Uses the repository license. Release-grade bundle packaging should include a
bundle-local `LICENSE` that points to or copies the repository license.
