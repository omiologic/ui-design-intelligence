# UX Journey Skills

## Summary

`ux-journey-skills` is the planned journey-strategy bundle. It maps audience
goals, decision stages, objections, content goals, page flows, prototype flows,
and conversion paths before copy or prototype behavior is generated.

## When To Install

Install this bundle when a workflow needs the strategic backbone for a page,
flow, or prototype: who the user is, what they need at each stage, what may
block action, and which sections or interactions should answer those needs.

Do not install it as a copywriting bundle, analytics package, research archive,
or production journey orchestration system.

## Included

Skills:

- `generate-user-journey-map`
- `generate-conversion-journey`
- `generate-page-user-flow`
- `generate-prototype-flow`
- `generate-objection-map`
- `generate-content-journey-map`
- `audit-user-journey`
- `audit-conversion-flow`

Agents:

- `user-journey-architect`
- `ux-content-strategist`

Commands:

- `generate-user-journey-map`

Shared assets include the content/journey architecture document plus
`UserJourneyMap`, journey-pattern, and objection-pattern schemas.

## Requirements

Journey work should start from a brief, study output, knowledge patterns, or a
known product/page goal. It should usually run before content generation and
before prototype interaction details are finalized.

## Install

Codex/GPT full .agents target:

```bash
node scripts/install-bundle.mjs install ux-journey-skills "$HOME/.agents" "$HOME/.agents/skills" --dry-run
node scripts/install-bundle.mjs install ux-journey-skills "$HOME/.agents" "$HOME/.agents/skills"
```

Claude/local full-bundle target:

```bash
UI_PLUGIN_BUNDLE="ux-journey-skills" ./install.sh
```

Use `--force` only when you intentionally want to overwrite non-identical
existing files.

Uninstall:

```bash
UI_PLUGIN_BUNDLE="ux-journey-skills" ./uninstall.sh
```

## Usage Example

Use `generate-user-journey-map` to turn a brief such as "dentists evaluating a
clinical headlamp" into stages, user questions, objections, recommended
sections, and copy strategy. Then use content skills to fill blueprint nodes.

## Relationship To Other Bundles

- Upstream: `ui-study-skills` and `ui-knowledge-skills` can provide evidence
  and patterns.
- Downstream: `ui-content-skills` writes copy from the journey strategy.
- Adjacent: `ui-blueprint-skills` owns structure, and `ui-prototype-skills`
  owns behavior configuration.

## Versioning And Status

Version: `0.1.0`. Status: `planned`. This bundle is scaffolded during Sprint
008 and is not yet release-active until agents, commands, examples, and
validation are added.

## License

Uses the repository license. Release-grade bundle packaging should include a
bundle-local `LICENSE` that points to or copies the repository license.
