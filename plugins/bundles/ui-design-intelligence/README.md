# UI Design Intelligence

## Summary

`ui-design-intelligence` is the everything bundle for the repository's layered
UI workflow. It composes the study, audit, SEO, knowledge, blueprint,
design-system, style-reference, and prototype bundles instead of hand-listing a
second copy of their contents.

## When To Install

Install this bundle when a project needs the full stack available in one target:
study existing pages, capture visual evidence, analyze motion behavior, audit
quality, generate SEO and accessibility findings, extract reusable knowledge,
create lightweight design-system seeds, produce blueprints, curate style
references, and specify prototype behavior.

Do not install it when a project needs only one layer. Use component bundles for
smaller installs, clearer command ownership, and narrower agent context.

## Included

This aggregate is defined by `includes` in `plugin.json` and expands to:

- `ui-study-skills`
- `ui-audit-skills`
- `ui-seo-skills`
- `ui-blueprint-skills`
- `ui-knowledge-skills`
- `ui-design-system-skills`
- `ui-style-reference-skills`
- `ui-prototype-skills`
- `ui-react-component-skills`

The build expands those component bundles into one self-contained package with
all component skills, agents, commands, shared files, and aggregate release
metadata.

## Requirements

The full workflow still follows the layer order: study evidence first, then
knowledge and audit findings, then design-system and style constraints, then
blueprint structure, then prototype behavior. Installing the aggregate does not
remove the need for source evidence, schemas, validation, or explicit handoffs.

## Install

Codex/GPT full .agents target:

```bash
UI_PLUGIN_BUNDLE="ui-design-intelligence" UI_PLUGIN_TARGET="$HOME/.agents" ./install.sh --dry-run
UI_PLUGIN_BUNDLE="ui-design-intelligence" UI_PLUGIN_TARGET="$HOME/.agents" ./install.sh --with-config
```

Claude/local full-bundle target:

```bash
UI_PLUGIN_BUNDLE="ui-design-intelligence" ./install.sh --with-config
```

Claude/local project target:

```bash
UI_PLUGIN_BUNDLE="ui-design-intelligence" UI_PLUGIN_TARGET="./.claude" ./install.sh --dry-run
UI_PLUGIN_BUNDLE="ui-design-intelligence" UI_PLUGIN_TARGET="./.claude" ./install.sh --with-config
```

Use `--force` only when you intentionally want to overwrite non-identical
existing files.

Uninstall:

```bash
UI_PLUGIN_BUNDLE="ui-design-intelligence" ./uninstall.sh
```

## Usage Example

Use `study-page` or `study-site` to create evidence, route findings through
capture and motion study when needed, route findings through audit and SEO
commands, extract reusable knowledge, generate or audit a design-system seed,
create blueprint output, apply style guidance, and finish with prototype config
or prototype-flow audit commands.

## Relationship To Other Bundles

This bundle depends on and includes every component bundle. It owns no unique
commands; component bundles remain the source of command ownership and scoped
documentation. Use it for convenience when the installation target should carry
the whole catalog.

## Versioning And Status

Version: `0.2.0`. Status: `transitional`. The aggregate is buildable and
installable, but remains transitional because it spans every evolving layer.
Its contents are derived from component bundles via `includes`.

## License

See the bundle-local `LICENSE` and `CHANGELOG.md`. The bundle license currently
matches the repository-level license placeholder.
