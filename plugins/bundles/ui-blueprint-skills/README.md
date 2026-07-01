# UI Blueprint Skills

## Summary

`ui-blueprint-skills` is the active structural blueprint bundle. It normalizes
UI terminology, plans pages, sections, components, layouts, and interactions,
reviews wireframe accessibility, and emits schema-valid UIBlueprint JSON.

## When To Install

Install this bundle when the work should produce controlled wireframe structure
from a brief, study output, or already planned UI concept.

Do not install it as a visual design, production component, browser automation,
or prototype-runtime package. Use design-system, style-reference, or prototype
bundles when the task needs those later layers.

## Included

Skills:

- `design-terminology`
- `wireframe-schema`
- `page-wireframe-planner`
- `section-wireframe-planner`
- `component-wireframe-planner`
- `layout-specification`
- `interaction-patterns`
- `accessibility-wireframe-review`
- `generate-ui-blueprint-from-study`
- `generate-wireframe-config`

Agents:

- `blueprint-architect`
- `accessibility-reviewer`

Commands:

- `create-wireframe`
- `generate-blueprint-from-study`
- `review-generated-wireframe`

Shared assets include the UIBlueprint schema, study-output schema, controlled
vocabulary, structural design philosophy, taste profiles, blueprint templates,
examples, interop docs, and export-seed script.

## Requirements

Input should include a brief, study output, knowledge-derived plan, or explicit
page/section/component structure. Final JSON generation expects enough planned
structure to avoid inventing page order, component anatomy, states, or overlay
contracts.

No other bundle is required, but `ui-study-skills` is the usual upstream source
for observed page evidence, and `ui-knowledge-skills` can provide reusable
pattern inputs.

## Install

Codex/GPT skills-only target:

```bash
node scripts/install-bundle.mjs install ui-blueprint-skills "$HOME/.agents" "$HOME/.agents/skills" --skills-only --dry-run
node scripts/install-bundle.mjs install ui-blueprint-skills "$HOME/.agents" "$HOME/.agents/skills" --skills-only
```

Claude/local full-bundle target:

```bash
UI_PLUGIN_BUNDLE="ui-blueprint-skills" ./install.sh
```

Claude/local project target:

```bash
UI_PLUGIN_BUNDLE="ui-blueprint-skills" UI_PLUGIN_TARGET="./.claude" ./install.sh --dry-run
UI_PLUGIN_BUNDLE="ui-blueprint-skills" UI_PLUGIN_TARGET="./.claude" ./install.sh
```

Use `--force` only when you intentionally want to overwrite non-identical
existing files.

Uninstall:

```bash
UI_PLUGIN_BUNDLE="ui-blueprint-skills" ./uninstall.sh
```

## Usage Example

Use `create-wireframe` with a brief, requirements note, study output, or audit
finding when the user wants one clear entrypoint. The workflow routes
terminology, page planning, section planning, interaction modeling,
accessibility review, and final `generate-wireframe-config` assembly into
`wireframe.json` and `wireframe-notes.md`.

Use `generate-blueprint-from-study` when the input is already a page-study
artifact and you want the lower-level study-to-blueprint workflow directly.

Use `review-generated-wireframe` after generation to score the artifact against
the blueprint quality rubric and report whether it is weak, usable, or strong
before downstream design-spec, prototype, or implementation work.

## Relationship To Other Bundles

- Upstream: `ui-study-skills` and `ui-knowledge-skills`.
- Adjacent: `ui-audit-skills` can review generated structure.
- Downstream: `ui-design-system-skills`, `ui-style-reference-skills`, and
  `ui-prototype-skills` can consume blueprint structure after this bundle.

## Versioning And Status

Version: `0.1.0`. Status: `active`. This is the mature core structural bundle
and the reference README shape for later bundles.

## License

Uses the repository license. Release-grade bundle packaging should include a
bundle-local `LICENSE` that points to or copies the repository license.
