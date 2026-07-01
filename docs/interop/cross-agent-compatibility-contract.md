# Cross-Agent Compatibility Contract

This contract defines the install targets Sprint 005 supports before adding new
package generators or smoke tests. Codex/GPT, Claude, and generic local skill
folders are separate surfaces with different package shapes.

## Supported Surfaces

| Surface | Install target | Package shape | Bundle assets | Validation gate |
| --- | --- | --- | --- | --- |
| Codex local skills | `$HOME/.agents/skills` or `$PWD/.agents/skills` | Skill directories containing `SKILL.md` plus local references, scripts, and assets. | Skills plus manifest-declared shared/knowledge reference assets via `install-bundle.mjs --skills-only`. Agents and commands are not installed into `.agents` by this path. | `scripts/verify-installed-references.mjs <skills-dir>` after install; Sprint 005 smoke tests cover user-local and project-local `.agents/skills`. |
| Codex plugin package | `dist/codex-plugins/{bundle-name}/` | `.codex-plugin/plugin.json`, package README/license/changelog, `skills/`, `PACKAGE_INSPECTION.md`, and manifest-declared shared/knowledge reference assets generated from bundle manifests. | Skills and reference assets packaged for Codex plugin loading. Agents and commands are omitted and recorded in generated metadata. | `npm run build:codex-plugins` then `npm run validate:codex-plugins`; local marketplace smoke tests cover app/CLI plugin discovery. |
| Codex local marketplace | `dist/codex-marketplace/.agents/plugins/marketplace.json` | Local marketplace catalog with `plugins[]` entries pointing at mirrored generated package folders under `dist/codex-marketplace/plugins/`. | Marketplace metadata plus mirrored Codex plugin packages for CLI-compatible local loading. Source inspection copies stay under `dist/codex-plugins`. | `npm run validate:codex-plugins` validates marketplace entries and package paths. |
| ChatGPT/GPT-facing skill distribution | Skills CLI or generated Codex plugin package | Repository `skills/` surface for direct skill installs; generated plugin package for marketplace-shaped installs. | Skills only unless a later marketplace task adds supported metadata. | Skills CLI install examples must not mention `.claude`; plugin validation gates apply to generated packages. |
| Claude Code/local compatibility | `$HOME/.claude` or `$PWD/.claude` | `.claude/skills`, `.claude/agents`, `.claude/commands`, `.claude/shared`, and `.claude/.ui-blueprint-bundles`. | Skills, agents, commands, shared schemas/vocabulary/templates/examples/docs, helper scripts referenced by bundle manifests, and install records. | `scripts/verify-installed-references.mjs <skills-dir>`; existing-project tests cover dry-run, conflict blocking, `--force`, reinstall, and uninstall. |
| Generic local skills folder | Any explicit skills directory | Skill directories under the supplied skills directory. The parent is treated as the install root for records if using `install-bundle.mjs`. | Skills can be installed alone only when the consuming agent ignores bundle commands and agents. Full bundle assets should use a named agent root instead. | `scripts/verify-installed-references.mjs <skills-dir>` plus consumer-agent manual smoke testing. |

## Target Layout Rules

- Codex examples use `.agents/skills`; they do not install Claude-style agents
  or commands.
- Claude examples use `.claude`; they can receive skills, agents, commands,
  shared files, docs, scripts, examples, and bundle install records.
- Generic examples must say whether they are skills-only or full-bundle
  compatibility installs.
- Generated Codex plugin packages are release artifacts under `dist/`; committed
  bundle manifests remain the source of truth.
- Codex plugin packages include `.codex-plugin/plugin.json`, package
  README/license/changelog files, `PACKAGE_INSPECTION.md`, `skills/`, and
  manifest-declared reference assets.
- The generated local marketplace fixture lives under `dist/codex-marketplace`,
  exposes `.agents/plugins/marketplace.json` for the Codex CLI/app, and mirrors
  generated packages under `dist/codex-marketplace/plugins`.

## Bundle Asset Ownership

Skills-only installs receive each selected skill directory and any
manifest-declared shared or knowledge files required by those skills'
references. They are appropriate for Codex local skill discovery, Skills CLI
installs, and generic agents that load skill folders plus adjacent reference
assets.

Direct local skills-only installs must pass `--skills-only` to
`scripts/install-bundle.mjs`; otherwise the installer performs a full bundle
install for Claude/local compatibility targets.

Full bundle installs receive every asset declared by the resolved bundle
manifest:

- `skills` -> `<target-root>/skills`
- `agents` -> `<target-root>/agents` for full bundle installs only
- `commands` -> `<target-root>/commands` for full bundle installs only
- `shared` -> copied under `<target-root>` using the manifest path for both
  skills-only and full bundle installs
- install record -> `<target-root>/.ui-blueprint-bundles/{bundle}.json`

Aggregate bundles use `includes` to compose component bundles. Consumers should
choose `ui-design-intelligence` when they want the full workflow in one target,
and component bundles when they want narrower context, fewer commands, or a
smaller install surface.

## Existing-Project Safety

Installers must block non-identical existing files by default. Documentation for
existing projects should show `--dry-run` first and reserve `--force` for
intentional overwrites. `--force` is not a merge operation; it replaces the
conflicting installed target with the repository copy.

Uninstall removes only files recorded for the selected bundle install where an
install record exists. If no record exists, uninstall falls back to the current
bundle manifest.

`npm run validate:install-matrix` is the release gate for supported local
install targets. It exercises clean Codex `.agents` skills-only installs, clean
Claude `.claude` full installs, aggregate and component bundles, dry-run,
conflict blocking, identical reinstall, forced overwrite, reference
verification, and uninstall record scope.

## Unsupported Surfaces

- Direct installation of Claude commands or agents into Codex `.agents` targets.
- Treating internal `plugins/bundles/*/plugin.json` files as Codex marketplace
  manifests.
- Publishing marketplace-only metadata beyond the generated
  `ui-design-intelligence.codex-plugin.v1` package metadata before a later task
  defines and validates final marketplace requirements.
- Browser automation, MCP servers, hosted app integrations, or rendered
  prototype runtimes as part of this install contract.
- Silent merging with user-edited skill, command, agent, or shared files.

## Assumptions

- The repository remains the source of truth for bundle composition.
- `plugins/individuals/` is preferred for bundle builds; `skills/` remains a
  compatibility source for existing skill installs.
- Generated artifacts under `dist/` are reproducible and should not be edited
  manually.
- Codex plugin metadata requirements may change; the generated package validator
  owns the current repository-local shape until final marketplace requirements
  are available.
