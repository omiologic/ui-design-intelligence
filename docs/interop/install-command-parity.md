# Install And Command Parity

## Decision

Sprint 002 documents parity with downstream taste-tool workflows without
implementing a marketplace or `npx skills add` installer. Sprint 003 extends the
same local parity model to design-system seed workflows.

The supported install path remains this repository's deterministic local bundle
installer:

```bash
./install.sh
UI_PLUGIN_BUNDLE="ui-design-intelligence" ./install.sh
UI_PLUGIN_TARGET="/path/to/.claude" ./install.sh
```

This keeps current installs stable while the repository continues its transition
from a single skill package into a plugin monorepo with skills, agents,
commands, and shared assets.

## What Parity Means In Sprint 002

| Area | Sprint 002 Behavior | Deferred |
| --- | --- | --- |
| Install | `install.sh` installs selected bundle manifests into an agent root. | `npx skills add`, marketplace metadata, remote registry publishing. |
| Bundle selection | `UI_PLUGIN_BUNDLE` selects `ui-study-skills`, `ui-audit-skills`, `ui-blueprint-skills`, `ui-seo-skills`, `ui-knowledge-skills`, `ui-design-system-skills`, or `ui-design-intelligence`. | Public marketplace bundle discovery. |
| Target selection | `UI_PLUGIN_TARGET` installs skills, agents, commands, and shared files under one agent root. | Tool-specific install adapters beyond the current local directory layout. |
| Commands | Markdown commands are installed from bundle manifests into `commands/`. | Tool-specific slash-command marketplaces or generated command registries. |
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

The export seed workflow is intentionally a script in Sprint 002, not an
installed command. It may become a command after bundle packaging and command
parity are updated in a later task.

## Bundle Command Matrix

| Bundle | Installed Commands |
| --- | --- |
| `ui-study-skills` | `study-page`, `study-site` |
| `ui-audit-skills` | `audit-page`, `audit-site`, `audit-interactions` |
| `ui-blueprint-skills` | `generate-blueprint-from-study` |
| `ui-seo-skills` | `audit-page`, `audit-site` |
| `ui-knowledge-skills` | `extract-patterns-from-study`, `index-knowledge-base`, `search-ui-knowledge`, `generate-blueprint-from-knowledge`, `explain-blueprint-lineage` |
| `ui-design-system-skills` | `generate-design-system-seed`, `audit-design-system-seed` |
| `ui-design-intelligence` | `study-page`, `study-site`, `audit-page`, `audit-site`, `audit-interactions`, `generate-blueprint-from-study`, `extract-patterns-from-study`, `index-knowledge-base`, `search-ui-knowledge`, `generate-blueprint-from-knowledge`, `explain-blueprint-lineage`, `generate-design-system-seed`, `audit-design-system-seed` |

## Validation Coverage

Sprint 003 adds `npm run validate:design-system` and
`npm run validate:style-references`. Design-system validation checks
`DesignSystemSeed` examples and templates, standalone foundation schemas,
design-system vocabulary alignment, component decision-tree targets,
source/confidence metadata, and `ui-design-system-skills` plus aggregate bundle
packaging. Style-reference validation checks style records, category/index
drift, scope and intensity vocabulary, mapping keys, source/license metadata,
application/patch/blend examples, and `ui-style-reference-skills` plus aggregate
bundle packaging. The release validator runs these through `npm run validate`.

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

The following are intentionally outside Sprint 002:

- `npx skills add` compatibility or a published package entrypoint.
- Marketplace manifests, remote install metadata, or registry publishing.
- Tool-specific command registries for third-party agents.
- A first-class installed export command.
- Direct adapters that claim to emit a private third-party format.

Before any deferred install work ships, it should preserve the current
manifest-selected local install path and pass release validation for all
buildable bundles.
