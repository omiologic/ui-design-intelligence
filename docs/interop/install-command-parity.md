# Install And Command Parity

## Decision

The supported install paths are target-specific. Codex/GPT full local installs
use `.agents` with skills under `.agents/skills`, roles under `.agents/agents`,
commands under `.agents/commands`, and conventions under `.agents/.convention`.
Claude/local compatibility installs use `.claude` for the same full bundle
surface. Generated Codex plugin packages use `.codex-plugin` package shape under
`dist/` once built.

The deterministic local bundle installer remains the shared implementation for
direct local installs:

```bash
node scripts/install-bundle.mjs install ui-design-intelligence "$HOME/.agents" "$HOME/.agents/skills" --dry-run
node scripts/install-bundle.mjs install ui-design-intelligence "$HOME/.claude" "$HOME/.claude/skills" --dry-run
```

The shell wrapper remains a Claude/local compatibility convenience:

```bash
./install.sh --dry-run
UI_PLUGIN_BUNDLE="ui-design-intelligence" ./install.sh
UI_PLUGIN_TARGET="/path/to/.claude" ./install.sh
```

## Compatibility Matrix

| Area | Supported behavior | Not implied |
| --- | --- | --- |
| Codex/GPT local full bundle | `install-bundle.mjs` installs selected bundle skills into `.agents/skills`, agents into `.agents/agents`, commands into `.agents/commands`, and conventions into `.agents/.convention`. | Generated Codex plugin marketplace metadata in `.agents`. |
| Codex/GPT local skills-only | `install-bundle.mjs --skills-only` installs selected bundle skills into `.agents/skills` and required convention reference assets beside them. | Agents and commands. |
| Codex plugin package | `build:codex-plugins` emits `.codex-plugin/plugin.json`, `skills/`, inspection output, and required reference assets under `dist/codex-plugins`. | Claude agents and commands in generated plugin packages. |
| Codex local marketplace | `build:codex-plugins` emits `dist/codex-marketplace/.agents/plugins/marketplace.json` with local entries for mirrored generated packages. | Public marketplace publishing or remote registry availability. |
| Claude/local full bundle | `install.sh` or `install-bundle.mjs` installs selected bundle manifests into `.claude`. | Codex plugin marketplace metadata in `.claude`. |
| Bundle selection | `UI_PLUGIN_BUNDLE` selects `ui-study-skills`, `ui-audit-skills`, `ui-blueprint-skills`, `ui-seo-skills`, `ui-knowledge-skills`, `ui-design-system-skills`, `ui-style-reference-skills`, `ui-prototype-skills`, `ui-content-skills`, or `ui-design-intelligence`. | Automatic bundle discovery in external marketplaces. |
| Target selection | `target-root` and `skills-dir` are passed separately; `UI_PLUGIN_TARGET` selects a Claude/local agent root for the shell wrapper. | Mixing target roots and skills roots. |
| Commands | Markdown commands are installed from bundle manifests into the selected target root's `commands/` directory. | Codex plugin package command registration. |
| Handoff | Blueprint Export Seed markdown can be passed to downstream visual-taste tools. | Direct invocation of third-party tools or private prompt formats. |

## Discipline-Scoped Commands

Commands are grouped by workflow discipline so this repository can sit beside
visual-taste tools without overlapping their responsibilities.

| Discipline | Commands | Owns |
| --- | --- | --- |
| Study | `study-page`, `study-site` | Evidence capture envelope, observed UI storytelling, structure, interaction, responsive, and accessibility findings. |
| Audit | `audit-page`, `audit-site`, `audit-interactions` | Structural, accessibility, interaction, SEO, and page-quality reports. |
| Design system | `generate-design-system-seed`, `audit-design-system-seed` | Lightweight design-system seed generation, foundation sections, naming/completeness/consistency audits, and downstream seed readiness. |
| Blueprint | `generate-blueprint-from-study` | Translating study evidence into UIBlueprint structure and final wireframe JSON handoff. |
| Export seed | `scripts/export-blueprint-seed.mjs` | Prototype-only deterministic conversion from blueprint plus taste profile to downstream seed markdown. |

The export seed workflow is intentionally a script, not an installed command.
It may become a command after bundle packaging and command parity require it.

## Bundle Command Matrix

| Bundle | Installed Commands |
| --- | --- |
| `ui-study-skills` | `study-page`, `study-site` |
| `ui-audit-skills` | `audit-page`, `audit-site`, `audit-interactions` |
| `ui-blueprint-skills` | `generate-blueprint-from-study` |
| `ui-seo-skills` | `audit-page`, `audit-site` |
| `ui-knowledge-skills` | `extract-patterns-from-study`, `index-knowledge-base`, `search-ui-knowledge`, `generate-blueprint-from-knowledge`, `explain-blueprint-lineage` |
| `ui-design-system-skills` | `generate-design-system-seed`, `audit-design-system-seed` |
| `ui-content-skills` | `generate-content-model-from-blueprint`, `generate-prototype-copy`, `audit-prototype-copy`, `extract-copy-patterns-from-study`, `generate-copy-from-knowledge` |
| `ui-design-intelligence` | `study-page`, `study-site`, `audit-page`, `audit-site`, `audit-interactions`, `generate-blueprint-from-study`, `extract-patterns-from-study`, `index-knowledge-base`, `search-ui-knowledge`, `generate-blueprint-from-knowledge`, `explain-blueprint-lineage`, `generate-design-system-seed`, `audit-design-system-seed` |

## Validation Coverage

Design-system validation checks
`DesignSystemSeed` examples and templates, standalone foundation schemas,
design-system vocabulary alignment, component decision-tree targets,
source/confidence metadata, and `ui-design-system-skills` plus aggregate bundle
packaging. Style-reference validation checks style records, category/index
drift, scope and intensity vocabulary, mapping keys, source/license metadata,
application/patch/blend examples, and `ui-style-reference-skills` plus aggregate
bundle packaging. Install matrix validation checks Codex `.agents`, Claude
`.claude`, aggregate, component, reinstall, conflict, force, and uninstall
behavior through `npm run validate:install-matrix`. The release validator runs
these gates before release.

## User Workflow Beside Taste Tools

1. Install a structural bundle locally with `./install.sh`.
2. Run study, audit, knowledge, design-system, or blueprint commands to produce
   structural evidence, reusable patterns, seed foundations, and UIBlueprint
   JSON.
3. Export a Blueprint Export Seed with `scripts/export-blueprint-seed.mjs` when
   downstream visual-taste tooling needs context.
4. Pass the seed markdown to the downstream tool. That tool owns visual design,
   motion, rendered components, and code.

## Deferred Work

The following remain outside the current install contract:

- Remote registry publishing.
- Tool-specific command registries for third-party agents.
- A first-class installed export command.
- Direct adapters that claim to emit a private third-party format.

Before any deferred install work ships, it should preserve the target split in
`cross-agent-compatibility-contract.md` and pass release validation for all
buildable bundles.
