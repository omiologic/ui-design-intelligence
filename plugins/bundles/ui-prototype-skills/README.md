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
- `study-ui-prototype-behavior`
- `generate-component-state-model`
- `generate-interaction-flow`
- `generate-clickable-prototype-plan`
- `audit-prototype-interactions`

Agents:

- `prototype-architect`

Commands:

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

```bash
UI_PLUGIN_BUNDLE="ui-prototype-skills" ./install.sh
```

Install into a project-local target:

```bash
UI_PLUGIN_BUNDLE="ui-prototype-skills" UI_PLUGIN_TARGET="./.claude" ./install.sh
```

Uninstall:

```bash
UI_PLUGIN_BUNDLE="ui-prototype-skills" ./uninstall.sh
```

## Usage Example

Use `generate-prototype-from-blueprint` with a schema-valid UIBlueprint and
optional design-system seed. The workflow can generate component state models,
interaction flows, and a prototype config, then use `audit-prototype-flow` to
check missing states, unreachable screens, unclear dismissals, or broken task
flow.

## Relationship To Other Bundles

- Required upstream in normal use: `ui-blueprint-skills`.
- Recommended upstream when component foundations matter:
  `ui-design-system-skills`.
- Optional upstream: `ui-knowledge-skills`.
- Adjacent: `ui-audit-skills` can review quality issues outside prototype flow.

## Versioning And Status

Version: `0.1.0`. Status: `transitional`. The bundle is buildable but remains a
newer behavior layer that depends on blueprint and design-system contracts.

## License

Uses the repository license. Release-grade bundle packaging should include a
bundle-local `LICENSE` that points to or copies the repository license.
