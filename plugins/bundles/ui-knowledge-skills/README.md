# UI Knowledge Skills

## Summary

`ui-knowledge-skills` is the reusable pattern-knowledge bundle. It extracts,
curates, indexes, searches, applies, and explains UI pattern knowledge between
study/audit evidence and blueprint generation.

## When To Install

Install this bundle when a project needs a reusable `ui-knowledge/` workspace,
pattern records, search indexes, or blueprint lineage over multiple studies,
audits, or generated artifacts.

Do not install it for one-off blueprint generation when no pattern library or
lineage record is needed.

## Included

Skills:

- `extract-ui-pattern-knowledge`
- `curate-ui-knowledge`
- `search-ui-knowledge`
- `generate-blueprint-from-knowledge`
- `explain-blueprint-lineage`

Agents:

- `ui-knowledge-librarian`
- `blueprint-architect`

Commands:

- `extract-patterns-from-study`
- `index-knowledge-base`
- `search-ui-knowledge`
- `generate-blueprint-from-knowledge`
- `explain-blueprint-lineage`

Shared assets include knowledge schemas, vocabulary, templates, examples,
validation scripts, index script, and workspace initialization script.

Remote knowledge retrieval is optional. When configured by the user, search can
use vector-backed retrieval plus canonical storage references; local
`ui-knowledge/` indexes remain the default and no committed bundle text should
contain real bucket URLs or account-specific resources.

## Requirements

This bundle is stateful. Project-specific studies, audits, pattern records, and
indexes should live in a project-local `ui-knowledge/` workspace, not in the
repository bundle source. Use `scripts/init-knowledge-workspace.mjs` to create
the workspace structure before saving project-local knowledge.

Input records should preserve `sourceRefs`, confidence, status, and evidence
labels so later searches and lineage explanations remain reviewable.

## Install

Codex/GPT full .agents target:

```bash
node scripts/install-bundle.mjs install ui-knowledge-skills "$HOME/.agents" "$HOME/.agents/skills" --dry-run
node scripts/install-bundle.mjs install ui-knowledge-skills "$HOME/.agents" "$HOME/.agents/skills"
```

Claude/local full-bundle target:

```bash
UI_PLUGIN_BUNDLE="ui-knowledge-skills" ./install.sh
```

Claude/local project target:

```bash
UI_PLUGIN_BUNDLE="ui-knowledge-skills" UI_PLUGIN_TARGET="./.claude" ./install.sh --dry-run
UI_PLUGIN_BUNDLE="ui-knowledge-skills" UI_PLUGIN_TARGET="./.claude" ./install.sh
```

Use `--force` only when you intentionally want to overwrite non-identical
existing files.

Uninstall:

```bash
UI_PLUGIN_BUNDLE="ui-knowledge-skills" ./uninstall.sh
```

## Usage Example

Initialize a project `ui-knowledge/` workspace, run
`extract-patterns-from-study` on accepted study/audit evidence, curate the
candidate pattern records, run `index-knowledge-base`, then use
`search-ui-knowledge` and `generate-blueprint-from-knowledge` for a new brief.

## Relationship To Other Bundles

- Upstream: `ui-study-skills` and `ui-audit-skills` provide evidence.
- Downstream: `ui-blueprint-skills` consumes selected knowledge patterns.
- Adjacent: `ui-design-intelligence` includes this bundle for full-stack
  workflows.

## Versioning And Status

Version: `0.1.0`. Status: `transitional`. The bundle is buildable and useful,
but remains newer and more stateful than the core bundles.

## License

Uses the repository license. Release-grade bundle packaging should include a
bundle-local `LICENSE` that points to or copies the repository license.
