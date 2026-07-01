# UI Study Skills

## Summary

`ui-study-skills` is the active evidence-gathering bundle for studying existing
pages and sites. It turns captured UI evidence into structured observations
about storytelling, specification, interaction, information architecture,
responsive behavior, and accessibility.

## When To Install

Install this bundle when the workflow starts from an existing page, screenshot,
DOM export, capture notes, or URL metadata and needs evidence before audit,
knowledge extraction, blueprint generation, or SEO work.

Do not install it when the user already has enough structured study evidence or
only needs final blueprint JSON.

## Included

Skills:

- `study-ui-storytelling`
- `study-ui-specification`
- `study-ui-interaction`
- `study-ui-information-architecture`
- `study-ui-responsive-behavior`
- `study-ui-accessibility`

Agents:

- `ui-researcher`
- `ui-specification-analyst`
- `ui-interaction-analyst`
- `accessibility-reviewer`

Commands:

- `study-page`
- `study-site`

Shared assets include the study-output schema, UI terminology vocabulary, page
study template, and example study artifact.

## Requirements

Study workflows need captured evidence. Use `scripts/capture-url.mjs` for
deterministic URL metadata, then provide screenshots, DOM exports, page notes, or
other observed material. The study skills do not perform browser automation by
themselves.

## Install

Codex/GPT skills-only target:

```bash
node scripts/install-bundle.mjs install ui-study-skills "$HOME/.agents" "$HOME/.agents/skills" --skills-only --dry-run
node scripts/install-bundle.mjs install ui-study-skills "$HOME/.agents" "$HOME/.agents/skills" --skills-only
```

Claude/local full-bundle target:

```bash
UI_PLUGIN_BUNDLE="ui-study-skills" ./install.sh
```

Claude/local project target:

```bash
UI_PLUGIN_BUNDLE="ui-study-skills" UI_PLUGIN_TARGET="./.claude" ./install.sh --dry-run
UI_PLUGIN_BUNDLE="ui-study-skills" UI_PLUGIN_TARGET="./.claude" ./install.sh
```

Use `--force` only when you intentionally want to overwrite non-identical
existing files.

Uninstall:

```bash
UI_PLUGIN_BUNDLE="ui-study-skills" ./uninstall.sh
```

## Usage Example

Capture URL metadata, attach or reference screenshots and notes, then run
`study-page` for one page or `study-site` for a page group. The output should
preserve observed evidence and confidence so audit, knowledge, or blueprint
skills can consume it without guessing.

## Relationship To Other Bundles

- Downstream: `ui-audit-skills`, `ui-knowledge-skills`,
  `ui-blueprint-skills`, and `ui-seo-skills`.
- Adjacent: `ui-design-intelligence` includes this bundle for full-stack
  workflows.

## Versioning And Status

Version: `0.1.0`. Status: `active`. This bundle is mature enough for normal
study workflows, with capture artifacts supplied externally.

## License

Uses the repository license. Release-grade bundle packaging should include a
bundle-local `LICENSE` that points to or copies the repository license.
