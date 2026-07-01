# UI Content Skills

## Summary

`ui-content-skills` is the planned UX content bundle. It generates realistic,
node-tied copy for blueprints and prototypes, including content models,
prototype copy, page/section/component copy, form microcopy, CTA labels, copy
audits, and reusable copy-pattern extraction.

## When To Install

Install this bundle when a prototype or blueprint needs realistic copy instead
of placeholder labels. Use it after journey and structure exist so copy length,
role, and placement fit the actual blueprint nodes.

Do not install it as a CMS, SEO content operation, production copy approval
system, or visual mockup generator.

## Included

Skills:

- `generate-content-model-from-blueprint`
- `generate-prototype-copy`
- `generate-page-copy`
- `generate-section-copy`
- `generate-component-copy`
- `generate-form-microcopy`
- `generate-cta-copy`
- `audit-prototype-copy`
- `audit-copy-for-user-journey`
- `audit-copy-for-conversion`
- `audit-copy-for-brand-voice`
- `extract-copy-patterns-from-study`
- `generate-copy-from-knowledge`

Agents:

- `ux-copywriter`
- `conversion-copywriter`
- `prototype-content-designer`

Commands:

- `generate-content-model-from-blueprint`
- `generate-prototype-copy`
- `audit-prototype-copy`
- `extract-copy-patterns-from-study`
- `generate-copy-from-knowledge`

Shared assets include content/journey schemas and copy/voice knowledge schemas.

## Requirements

Content generation should consume a journey map, source blueprint, optional
brand voice, optional design-system seed, and optional knowledge patterns. It
should preserve source, confidence, status, and review-risk metadata.

## Install

Codex/GPT full .agents target:

```bash
node scripts/install-bundle.mjs install ui-content-skills "$HOME/.agents" "$HOME/.agents/skills" --dry-run
node scripts/install-bundle.mjs install ui-content-skills "$HOME/.agents" "$HOME/.agents/skills"
```

Claude/local full-bundle target:

```bash
UI_PLUGIN_BUNDLE="ui-content-skills" ./install.sh
```

Use `--force` only when you intentionally want to overwrite non-identical
existing files.

Uninstall:

```bash
UI_PLUGIN_BUNDLE="ui-content-skills" ./uninstall.sh
```

## Usage Example

Use `generate-content-model-from-blueprint` after a journey map and blueprint
exist. The skill fills blueprint node IDs with realistic copy while marking
source, confidence, approval status, and review risks.

## Relationship To Other Bundles

- Upstream: `ux-journey-skills` defines stage logic and content goals.
- Required upstream in normal use: `ui-blueprint-skills`.
- Optional upstream: `ui-knowledge-skills` and `ui-design-system-skills`.
- Downstream: `ui-prototype-skills` can consume prototype-ready content.

## Versioning And Status

Version: `0.1.0`. Status: `planned`. This bundle is scaffolded during Sprint
008 and is not yet release-active until agents, commands, examples, and
validation are added.

## License

Uses the repository license. Release-grade bundle packaging should include a
bundle-local `LICENSE` that points to or copies the repository license.
