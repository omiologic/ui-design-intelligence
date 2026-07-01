# UI Prototype Skills

## Summary

`ui-prototype-skills` is the structured prototype-behavior bundle. It generates
prototype configs, component state models, interaction flows, clickable
prototype plans, prototype-behavior studies, and prototype interaction audits.

## When To Install

Install this bundle after blueprint and lightweight design-system work when the
next artifact needs screens, routes, states, events, transitions, overlays,
forms, navigation flow, or prototype audit findings.

Do not install it as a renderer, hosted preview, visual animation craft package,
or production runtime implementation.

## Included

Skills:

- `generate-interactive-prototype-config`
- `generate-prototype-flow`
- `generate-interaction-flow`
- `generate-component-state-model`
- `generate-clickable-prototype-plan`
- `audit-prototype-interactions`
- `study-ui-prototype-behavior`

Agents:

- `prototype-architect`

Commands:

- `create-prototype-plan`
- `generate-prototype-from-blueprint`
- `generate-prototype-from-knowledge`
- `audit-prototype-flow`
- `explain-prototype-interactions`

Shared assets include prototype, interaction-flow, component-state,
study-output, wireframe, and design-system-seed schemas plus prototype examples
and interop docs.

## Requirements

Prototype generation depends on structural and foundation contracts. Provide a
UIBlueprint or compatible wireframe plan from `ui-blueprint-skills`; provide a
`DesignSystemSeed` from `ui-design-system-skills` when component variants,
states, accessibility constraints, or token roles should constrain behavior.

Knowledge-derived workflows may also use `ui-knowledge-skills` before this
bundle.

## Install

Codex/GPT skills-only target:

```bash
node scripts/install-bundle.mjs install ui-prototype-skills "$HOME/.agents" "$HOME/.agents/skills" --skills-only --dry-run
node scripts/install-bundle.mjs install ui-prototype-skills "$HOME/.agents" "$HOME/.agents/skills" --skills-only
```

Claude/local full-bundle target:

```bash
UI_PLUGIN_BUNDLE="ui-prototype-skills" ./install.sh
```

Claude/local project target:

```bash
UI_PLUGIN_BUNDLE="ui-prototype-skills" UI_PLUGIN_TARGET="./.claude" ./install.sh --dry-run
UI_PLUGIN_BUNDLE="ui-prototype-skills" UI_PLUGIN_TARGET="./.claude" ./install.sh
```

Use `--force` only when you intentionally want to overwrite non-identical
existing files.

Uninstall:

```bash
UI_PLUGIN_BUNDLE="ui-prototype-skills" ./uninstall.sh
```

## Usage Example

Use `create-prototype-plan` when the user wants one clear entrypoint for a
prototype behavior plan. The workflow confirms source wireframe node IDs,
generates state models and interaction flows, assembles `prototype-config.json`,
writes `prototype-plan.md`, and audits focus, keyboard, validation, overlays,
responsive behavior, and runtime boundaries.

Use `generate-prototype-from-blueprint` when the input is already a
schema-valid UIBlueprint and you want the lower-level source-artifact workflow
directly.

## Relationship To Other Bundles

- Required upstream in normal use: `ui-blueprint-skills`.
- Recommended upstream when component foundations matter:
  `ui-design-system-skills`.
- Optional upstream: `ui-knowledge-skills`.
- Adjacent: `ui-audit-skills` can review quality issues outside prototype flow.

## Versioning And Status

Version: `0.9.0`. Status: `active`. All seven prototype skills meet the full
canonical skill gate. The bundle is ready for production install.

## License

Uses the repository license. Release-grade bundle packaging should include a
bundle-local `LICENSE` that points to or copies the repository license.
