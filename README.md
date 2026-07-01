# ui-design-intelligence

[![CI](https://github.com/omiologic/ui-design-intelligence/actions/workflows/validate.yml/badge.svg)](https://github.com/omiologic/ui-design-intelligence/actions/workflows/validate.yml)

Reusable agent skills for studying UI, auditing product quality, generating
schema-valid wireframes, building lightweight design-system seeds, curating
style references, and planning prototype behavior.

Repository: [omiologic/ui-design-intelligence](https://github.com/omiologic/ui-design-intelligence)

## Install

Most users should install first, then read the architecture notes only if they
are contributing or packaging bundles.

### Codex / GPT

Use Codex/GPT installs under `.agents`. A full install writes skills to
`.agents/skills`, role definitions to `.agents/agents`, commands to
`.agents/commands`, and reusable conventions to `.convention`.
Pass `--skills-only` only when the target should receive skill folders and
reference assets without roles or commands.

Direct `npx skills add omiologic/ui-design-intelligence -a codex` installation
is not the supported path after the Sprint 010 source-tree cleanup. Use the
bundle installer below so installed skills are selected by
`plugins/bundles/*/plugin.json` and sourced from `plugins/individuals/`.

If the target contains `skills-lock.json`, it was installed through the Skills
CLI/GitHub source flow. That flow installs `.agents/skills` only. It will not
install `.agents/agents`, `.agents/commands`, or project-level `.convention`
because those are bundle assets copied by `scripts/install-bundle.mjs`.

Manual Codex user-local install:

```bash
git clone https://github.com/omiologic/ui-design-intelligence.git ~/ui-design-intelligence
node ~/ui-design-intelligence/scripts/install-bundle.mjs install ui-design-intelligence "$HOME/.agents" "$HOME/.agents/skills" --dry-run
node ~/ui-design-intelligence/scripts/install-bundle.mjs install ui-design-intelligence "$HOME/.agents" "$HOME/.agents/skills"
node ~/ui-design-intelligence/scripts/verify-installed-references.mjs "$HOME/.agents/skills"
```

Manual Codex project-local install:

```bash
git clone https://github.com/omiologic/ui-design-intelligence.git ~/ui-design-intelligence
node ~/ui-design-intelligence/scripts/install-bundle.mjs install ui-design-intelligence "$PWD/.agents" "$PWD/.agents/skills" --dry-run
node ~/ui-design-intelligence/scripts/install-bundle.mjs install ui-design-intelligence "$PWD/.agents" "$PWD/.agents/skills"
node ~/ui-design-intelligence/scripts/verify-installed-references.mjs "$PWD/.agents/skills"
```

Use `--force` only when you intentionally want to replace conflicting existing
skill files.

### Claude / Local Full Bundle

Use Claude/local compatibility installs when you want the full
`ui-design-intelligence` bundle, including skills, agents, commands, convention
schemas, examples, docs, helper scripts, references, and install records.

```bash
git clone https://github.com/omiologic/ui-design-intelligence.git ~/ui-design-intelligence
node ~/ui-design-intelligence/scripts/install-bundle.mjs install ui-design-intelligence "$HOME/.claude" "$HOME/.claude/skills" --dry-run
node ~/ui-design-intelligence/scripts/install-bundle.mjs install ui-design-intelligence "$HOME/.claude" "$HOME/.claude/skills"
node ~/ui-design-intelligence/scripts/verify-installed-references.mjs "$HOME/.claude/skills"
```

Project-local install:

```bash
git clone https://github.com/omiologic/ui-design-intelligence.git ~/ui-design-intelligence
node ~/ui-design-intelligence/scripts/install-bundle.mjs install ui-design-intelligence "$PWD/.claude" "$PWD/.claude/skills" --dry-run
node ~/ui-design-intelligence/scripts/install-bundle.mjs install ui-design-intelligence "$PWD/.claude" "$PWD/.claude/skills"
node ~/ui-design-intelligence/scripts/verify-installed-references.mjs "$PWD/.claude/skills"
```

The installer blocks non-identical existing skills, agents, commands, and
convention files by default. Always use `--dry-run` first in existing projects. Use
`--force` only when you intentionally want to overwrite the target:

```bash
node ~/ui-design-intelligence/scripts/install-bundle.mjs install ui-design-intelligence "$PWD/.claude" "$PWD/.claude/skills" --force
```

### Install A Smaller Bundle

Install `ui-design-intelligence` when a target should have the full study,
audit, SEO, knowledge, blueprint, design-system, style, and prototype workflow.
Choose a component bundle when you want narrower context, fewer commands, or a
smaller install. Replace `ui-design-intelligence` with one of these bundle
names:

| Bundle | Use when you need |
| --- | --- |
| `ui-blueprint-skills` | Controlled vocabulary and schema-valid UIBlueprint generation |
| `ui-study-skills` | Page/site study, structure, interaction, responsive, and accessibility observations |
| `ui-audit-skills` | Page, site, section, interaction, accessibility, and SEO quality audits |
| `ui-design-system-skills` | Lightweight design-system seed and foundation planning |
| `ui-style-reference-skills` | Structured style references, style application, blends, and audits |
| `ui-prototype-skills` | Prototype config, interaction flows, state models, and behavior audits |
| `ui-knowledge-skills` | Reusable UI pattern knowledge, indexing, and lineage |
| `ui-seo-skills` | Title tags, meta descriptions, page summaries, and SEO audit findings |
| `ui-content-skills` | User journey copy, content models, prototype copy, microcopy, CTA labels, and copy audit workflows |

Example (blueprint skills, Codex/GPT):

```bash
node scripts/install-bundle.mjs install ui-blueprint-skills "$HOME/.agents" "$HOME/.agents/skills" --dry-run
node scripts/install-bundle.mjs install ui-blueprint-skills "$HOME/.agents" "$HOME/.agents/skills"
```

Claude/local component-bundle example:

```bash
node scripts/install-bundle.mjs install ui-blueprint-skills "$HOME/.claude" "$HOME/.claude/skills" --dry-run
node scripts/install-bundle.mjs install ui-blueprint-skills "$HOME/.claude" "$HOME/.claude/skills"
```

Content skills (Claude/local):

```bash
UI_PLUGIN_BUNDLE="ui-content-skills" ./install.sh
```

### Shell Wrapper For Claude / Local Compatibility

The shell wrapper defaults to a Claude-style target and the
`ui-blueprint-skills` compatibility bundle:

```bash
UI_PLUGIN_BUNDLE="ui-design-intelligence" ./install.sh
```

Set `UI_PLUGIN_TARGET="./.claude"` for project-local installation.
Pass `--dry-run` or `--force` through the wrapper when needed.
Interactive installs ask whether to create project config
`.ui-design-intelligence.yml`. Use `--with-config` to create it without a
prompt, or `--without-config` to skip it explicitly.

### First Run

Restart or reload your agent environment, then ask for a structured UI task:

```txt
Study this homepage and generate a UIBlueprint plan with accessibility risks.
```

If the agent references installed skills such as `study-ui-storytelling`,
`page-wireframe-planner`, `generate-design-system-seed`, or
`generate-interactive-prototype-config`, the install is working.

## Transition Direction

This repository is named `ui-design-intelligence`. The original
`ui-blueprint-skills` name remains as a compatibility bundle for controlled
UIBlueprint wireframe generation. The committed skill source lives under
`plugins/individuals/`, with `plugins/bundles/*` holding committed bundle
manifests. Runtime install folders and generated plugin packages still use a
flat `skills/` directory shape because that is what agents load.

## Plugin Monorepo Model

The repository is organized as a plugin monorepo:

- `plugins/individuals/`: source of truth for reusable installable skills.
- `plugins/bundles/`: committed bundle manifests and bundle README files.
- `.agents/agents/`: agent role definitions that bundles can include.
- `.agents/commands/`: command entrypoints that bundles can include.
- `.convention/`: schemas, vocabulary, templates, and examples used by skills and bundles.
- `.convention/knowledge/`: repository-owned UI knowledge schemas, vocabulary, templates,
  and generic examples for reusable pattern knowledge.
- `docs/interop/`: layer boundaries, install contracts, and handoff formats.
- `dist/build/`: generated expanded bundle folders.
- `dist/plugins/`: generated release zip files.

Individual skills are maintained once and included in one or more bundles by
listing their names in `plugins/bundles/{bundle-name}/plugin.json`.

Current bundle roles:

- `ui-study-skills`: page and site study skills for storytelling, structure,
  interaction, responsive behavior, and accessibility observations.
- `ui-audit-skills`: transitional audit bundle for site, page, section,
  interaction, accessibility, and SEO quality reports.
- `ui-blueprint-skills`: transitional MVP blueprint bundle for controlled
  vocabulary and UIBlueprint wireframe generation.
- `ui-seo-skills`: transitional SEO bundle for title tags, meta descriptions,
  page summaries, and SEO audit findings.
- `ui-design-system-skills`: lightweight design-system seed bundle for
  foundation sections, semantic token intent, component vocabulary, and seed
  audits.
- `ui-style-reference-skills`: structured style references, scoped style
  application, blends, and audits.
- `ui-prototype-skills`: prototype configs, state models, interaction flows, and
  behavior audits.
- `ui-content-skills`: planned content bundle for user journey copy, content
  models, prototype copy, microcopy, CTA labels, copy audits, and copy-pattern
  knowledge.
- `ui-design-intelligence`: transitional full bundle combining study, audit,
  SEO, knowledge, blueprint, design-system, style, and prototype workflows.

## What This Is

This repository provides installable skills for agents that support local skill
directories. Source skills are maintained under `plugins/individuals/` and
installed into target runtime `skills/` directories. The skills help an agent
produce predictable UIBlueprint JSON instead of ad hoc wireframe descriptions.

It is useful for:

- Designers who want consistent wireframe structure before visual design.
- Developers using Claude Code or compatible agents to generate UI blueprint JSON.
- Contributors adding new UI planning skills without redefining vocabulary each time.

## Where This Fits In The Taste Stack

This repository owns the structural layer: study findings, information
architecture, wireframe hierarchy, interaction contracts, responsive priorities,
accessibility constraints, and schema-valid UIBlueprint JSON. Downstream visual
taste tools own the rendered layer: color, typography, spacing, imagery, motion,
component polish, and production code.

See `docs/interop/README.md` for the layer-ownership table and the interop map
for Taste Skill-style, Impeccable-style, and Emil Kowalski-style design
engineering workflows. The downstream handoff artifact is defined in
`.convention/workflows/blueprint-export-seed.md`.

## Knowledge System

Sprint 003 adds a `.convention/knowledge/` foundation for reusable UI pattern knowledge.
This repository defines knowledge formats, controlled vocabulary, templates,
generic examples, scripts, skills, commands, agents, and bundle packaging. Real
captures, screenshots, studies, audits, extracted patterns, generated
blueprints, and lineage files belong in project-local `ui-knowledge/`
workspaces.

Remote knowledge storage is optional. The default workflow remains local, but
users can connect their own normal S3 bucket for canonical records and S3
vector bucket/index for retrieval through ignored environment configuration.
See `docs/knowledge/aws-user-setup.md` for setup, IAM, dry-run, and
troubleshooting guidance.

The knowledge flow is:

```txt
capture -> study -> audit -> pattern knowledge -> knowledge index -> blueprint -> lineage
```

`StudyOutput` remains evidence-based. Pattern records are the reusable layer:
they abstract evidence into tagged, confidence-scored design knowledge without
copying exact page composition.

Sprint 003 also adds a style-reference layer and a lightweight design-system
foundation layer after knowledge and before blueprint/prototype generation:

```txt
study -> knowledge -> style reference -> design system foundation -> blueprint/wireframe -> prototype
```

The style-reference layer treats styles as structured data instead of one skill
per style. It owns style records, scoped style applications, style blends, style
patches, compatibility guidance, intensity levels, source metadata, and
style-to-design-system mappings. This lets a style apply globally to a site or
locally to a page, section, component, or prototype behavior target without
replacing the whole design-system seed. See
`.convention/workflows/style-reference-layer-architecture.md`.

The design-system layer is a prototype design contract, not a production UI kit.
It owns `DesignSystemSeed` and foundation decisions such as semantic token
intent, component vocabulary, state names, layout rules, accessibility
constraints, and source/confidence metadata. See
`.convention/workflows/design-system-layer-architecture.md`.

The study-to-prototype artifact sequence is documented in
`.convention/workflows/design-system-prototype-pipeline.md`. It explains how
style references can be recommended, applied, blended, patched, and audited
before design-system seed generation; how `DesignSystemSeed` feeds blueprint and
wireframe generation; how state and component vocabulary constrain prototype
interactions; and why runtime/editor work remains a later package boundary.

Project-local design-system defaults should use `.ui-design-intelligence.yml`.
The starter config template is
`.convention/templates/ui-design-intelligence.config.yml`; it uses
`artifacts.outputDir` plus `artifacts.rootDirs` for page, screenshot, motion,
and handoff paths.

## Problems It Solves

- Prevents agents from inventing new UI terms for the same component.
- Keeps page, section, component, layout, interaction, and accessibility planning separate.
- Gives wireframe output a schema and examples that can be validated.
- Provides local install and package commands for repeatable use.

## Installed Skills

The default installer ships the compatibility blueprint bundle by default.

### Core Wireframe Skills

- `design-terminology`: Normalizes informal UI language into approved vocabulary.
- `wireframe-schema`: Explains and validates schema representation choices; it does not own page, section, or component planning.
- `layout-specification`: Defines layout patterns and responsive structure.
- `interaction-patterns`: Defines dialogs, drawers, popovers, forms, stateful components, and feedback patterns.
- `accessibility-wireframe-review`: Reviews wireframes for structural accessibility issues.

### Planning Skills

- `page-wireframe-planner`: Plans page-level journey, section order, CTA cadence, overlays, and responsive priorities.
- `section-wireframe-planner`: Plans reusable section purpose, anatomy, layout intent, and responsive behavior.
- `component-wireframe-planner`: Plans reusable component anatomy, states, behavior, and accessibility contracts.

### Generator Skills

- `generate-wireframe-config`: Assembles final schema-valid UIBlueprint JSON from an already planned page, section, component, or translated study structure.
- `generate-ui-blueprint-from-study`: Translates structured study findings into UIBlueprint structure, then hands off unresolved composition or final assembly.

## Repository Maintenance Skills

These skills are kept in the repository for local development and planning, and are validated by `npm run validate`, but they are not installed or packaged by default:

- `skill-creator`: Guidance for creating and maintaining agent skills.
- `sprint-planner`: Local utility for `.plan/` sprint summaries, objectives, and task files.

## Install And Command Parity

The compatibility contract separates target roots from skill roots. Codex local
installs use `.agents/skills` for skills and can also expose `.agents/agents`,
`.agents/commands`, and `.convention` with a full bundle install.
Claude/local compatibility installs use `.claude` for skills, agents,
commands, convention files, and install records. Generated Codex plugin packages use
their own `.codex-plugin/plugin.json` shape under `dist/` once built.

Commands are discipline-scoped:

- Study: `study-page`, `study-site`
- Audit: `audit-page`, `audit-site`, `audit-interactions`
- Blueprint: `generate-blueprint-from-study`
- Design system: `generate-design-system-seed`, `audit-design-system-seed`
- Export seed prototype: `scripts/export-blueprint-seed.mjs`

See `docs/interop/cross-agent-compatibility-contract.md` for target layouts and
`docs/interop/install-command-parity.md` for bundle command coverage.

### Capture URL Helper

The repository includes a deterministic URL metadata helper:

```bash
node scripts/capture-url.mjs --url "https://example.com" --screenshot "./captures/example.png"
```

This helper does not fetch pages, launch a browser, or create screenshots. It
records the URL and optional paths to externally captured screenshots, DOM
exports, or notes so study commands have an explicit evidence envelope.

### Blueprint Export Seed Prototype

The repository includes a deterministic prototype for exporting a structural
blueprint plus taste profile into the repository-native Blueprint Export Seed:

```bash
node scripts/export-blueprint-seed.mjs \
  --blueprint .convention/examples/ui-blueprint.example.json \
  --profile .convention/taste-profiles/conversion.json \
  --out /tmp/ui-blueprint.export-seed.md
```

The output is a downstream handoff artifact. It preserves structure,
accessibility, responsive priorities, and profile bias without choosing visual
style, motion, or implementation code.

### Custom Install Target

Use `UI_PLUGIN_TARGET` for a Claude/local agent root directory:

```bash
UI_PLUGIN_TARGET="/path/to/.claude" ./install.sh
```

For compatibility with earlier installer commands, `UI_BLUEPRINT_SKILLS_DIR`
still points directly at the target runtime skills directory. The installer
derives the plugin target from that directory's parent:

```bash
UI_BLUEPRINT_SKILLS_DIR="/path/to/.claude/skills" ./install.sh
```

### Manual Install

Use `scripts/install-bundle.mjs` for manual installs. Do not copy source
directories by hand; the installer resolves bundle manifests, copies the
selected `plugins/individuals/` skills, rewrites references, and verifies the
installed runtime tree.

## Usage Examples

Use skill names directly when your agent supports explicit skill invocation.

### Plan Then Generate A Page Wireframe

```txt
/page-wireframe-planner Plan a homepage wireframe for a dental clinic: journey, section order, primary CTA, overlays, and responsive priorities.
/generate-wireframe-config Assemble the approved page plan as schema-valid UIBlueprint JSON.
```

### Plan A Section

```txt
/section-wireframe-planner Plan an FAQ section with six questions, collapsed by default, including anatomy, state notes, and responsive behavior.
```

### Plan A Component

```txt
/component-wireframe-planner Plan a reusable product card component with image, title, price, short description, primary CTA, states, and parent inputs.
```

### Convert Study Findings

```txt
/generate-ui-blueprint-from-study Translate this page-study output into candidate UIBlueprint structure, preserving evidence notes and calling out composition gaps.
```

### Normalize UI Terminology

```txt
/design-terminology Normalize these UI terms into approved vocabulary: popup, slide panel, top menu, selling button.
```

### Review Accessibility

```txt
/accessibility-wireframe-review Review this dialog wireframe JSON for focus management, labels, keyboard behavior, and structural accessibility.
```

## Output Format

Wireframe examples use the UIBlueprint schema in:

```txt
.convention/schemas/wireframe-config.schema.json
```

Installed skills use their bundled copy at:

```txt
references/_shared/schemas/wireframe-config.schema.json
```

Every wireframe includes:

- top-level `id`, `type`, `label`, `version`, and `root`
- `type: "wireframe"` at the top level
- recursive nodes with required `id`, `type`, and `label`
- optional `children`, `overlays`, `responsive`, `accessibility`, `role`, `layout`, and `state`

Minimal shape:

```json
{
  "id": "example-page",
  "type": "wireframe",
  "label": "Example Page",
  "version": "0.1.0",
  "root": {
    "id": "example-root",
    "type": "page",
    "label": "Example Root"
  }
}
```

## Controlled Vocabulary

Shared vocabulary lives in:

```txt
.convention/vocabulary/
```

The current vocabulary files are:

- `node-types.json`
- `layout-patterns.json`
- `content-roles.json`
- `interaction-states.json`
- `ui-layer-types.json`
- `ui-terminology.json`
- `audit-severity.json`

Skills should reference these files instead of defining their own terms. This keeps generated wireframes compatible with the schema and with future renderers.

In product skills, listed references point at `references/_shared/vocabulary/`. Those files are bundled from the canonical `.convention/vocabulary/` source so each installed skill can be used on its own.

`node-types.json` is semantic, not just a flat token list. Each node type has a definition, allowed direct children, overlay placement rules, and selected cardinality rules. The example validator enforces those semantic rules.

Unknown `type`, `role`, `layout`, and `state` tokens hard-fail validation. There is no custom-token escape hatch in the MVP schema; add new vocabulary intentionally before using new terms in examples or generated output.

## Examples

Shared examples live in:

```txt
.convention/examples/
```

Skill-local examples live under each skill's `references/examples/` directory when useful.

Current shared examples include:

- `ui-blueprint.example.json`
- `dental-homepage.ui-blueprint.json`
- `product-page.ui-blueprint.json`
- `minimal-page.ui-blueprint.json`
- `page-study.example.json`
- `page-audit.example.json`

## Quality Golden Set

Quality fixtures live in:

```txt
tests/quality-golden-set/
```

The first golden set is checklist-based. It pairs compact briefs with
schema-valid reference blueprints and expected quality signals for journey
clarity, single primary action, proof placement, state coverage, register fit,
landmarks, responsive priority, and anti-pattern absence.

The rubric lives at:

```txt
.convention/quality/blueprint-quality-rubric.md
```

These fixtures are positive reference cases for discussing blueprint quality.
They intentionally do not duplicate invalid fixtures under `tests/invalid-*`,
which exist to prove deterministic failure behavior.

## Validate

Run all validations:

```bash
npm run validate
```

Run skill validation only:

```bash
npm run validate:skills
```

Run example validation only:

```bash
npm run validate:examples
```

Run invalid fixture validation only:

```bash
npm run validate:invalid-examples
```

Run quality golden-set validation only:

```bash
npm run validate:quality-golden-set
```

Run style-reference validation only:

```bash
npm run validate:style-references
```

Run bundle manifest validation only:

```bash
npm run validate:bundles
```

Run strict bundle validation for a selected bundle:

```bash
npm run validate:bundles:strict -- ui-blueprint-skills
```

Run targeted validation for one edited skill or bundle:

```bash
npm run validate:skill -- page-wireframe-planner
npm run validate:bundle -- ui-blueprint-skills
```

Run the changed-file validation router for local iteration:

```bash
npm run validate:changed
```

Run release validation for buildable bundles:

```bash
npm run validate:release
```

For the end-to-end publish checklist, including version checks, tags, GitHub
release artifacts, and local Codex marketplace fixtures, see
`docs/publishing.md`.

Run install matrix validation for supported local targets:

```bash
npm run validate:install-matrix
```

Build active/transitional plugin bundles:

```bash
npm run build:bundles
```

Inspect generated bundle archives, Codex plugin packages, and the local Codex
marketplace fixture:

```bash
npm run inspect:release-artifacts
```

Validation checks:

- every skill directory has `SKILL.md`
- skill frontmatter includes `name` and `description`
- skill `name` matches its directory
- skill references exist where practical
- example JSON parses
- examples validate against `.convention/schemas/wireframe-config.schema.json` directly
- shared wireframe examples are files ending in `.ui-blueprint.json` plus the canonical `ui-blueprint.example.json`; future non-wireframe examples can coexist in `.convention/examples/`
- page audit examples ending in `page-audit.example.json` validate against `.convention/schemas/page-audit.schema.json`
- skill-local wireframe examples are validated under `plugins/individuals/`
- a local schema-subset validator is used so validation works offline without third-party runtime dependencies
- duplicate node ids are rejected in a semantic validation layer
- example node types, roles, layouts, and states match shared vocabulary in the semantic validation layer
- node nesting follows `node-types.json` allowed-child semantics
- overlay-only node types appear only in overlays or overlay component roots
- node cardinality follows `node-types.json` semantic rules where defined
- schema enums are checked against controlled vocabulary during validation
- quality golden-set fixtures declare required rubric criteria and point to schema-valid reference blueprints
- style-reference validation checks style schemas, category/index drift, style ids,
  scope and intensity vocabulary, design-system/component/prototype mapping
  keys, source/license metadata, style templates, scoped application examples,
  patch examples, blend examples, and standalone/aggregate bundle packaging
- blueprint anti-pattern validation catches deterministic structural issues such as missing landmarks, missing responsive notes, filler labels, CTA pile-up, incomplete overlay contracts, forms without recovery, decorative sections with no job, dialogs without task controls, and stacked sibling header navigation
- invalid fixtures under `tests/invalid-examples/` fail with expected schema or semantic errors
- bundle manifests reference existing agent and command files with the expected markdown sections
- `scripts/capture-url.mjs` has a smoke validation path for deterministic URL metadata generation
- normal bundle validation allows `planned` bundles to reference future skills and shared files
- strict bundle validation requires selected bundles to resolve skills and shared files even if they are still marked `planned`
- targeted validation supports `validate:skill -- <name>`, `validate:bundle -- <name>`, and `validate:changed` for day-to-day edits
- install matrix validation covers Codex `.agents` full and skills-only installs, Claude `.claude` full installs, component and aggregate bundles, dry-run behavior, conflict blocking, identical reinstall, forced overwrite, uninstall record scope, and installed reference checks
- release artifact inspection checks generated zip contents, required metadata files, local/private state exclusions, Codex package manifests, marketplace entries, and generated version alignment
- release validation runs the full validation chain, install matrix, active/transitional bundle builds, Codex plugin package builds, temporary installs/uninstalls, installed reference checks, and release artifact inspection before release

Bundle builds:

- read committed manifests from `plugins/bundles/*/plugin.json`
- build `active` and `transitional` bundles by default
- copy referenced skills, agents, commands, and shared files into `dist/build/{bundle-name}/`
- create release zips in `dist/plugins/{bundle-name}.zip`
- verify copied skill references before zipping

## Package

Packaging creates release candidates. A version is considered published only
after the release commit and `v{version}` tag are pushed and the generated
archives are attached to the chosen release channel. See `docs/publishing.md`
for the full release checklist.

Create a release zip:

```bash
npm run package
```

This runs validation first and writes generated release output to:

```txt
dist/
```

For local iteration only, create the repository zip without running the full
validation chain:

```bash
npm run package:fast
```

`package:fast` is not a release candidate gate. Run `npm run validate:release`
before publishing any generated archive.

Generated files under `dist/` are ignored by Git because release archives are
generated artifacts. `dist/plugins/.gitkeep` is tracked only to preserve the
planned plugin release directory.

Release archives include product workflow skills and exclude repository
maintenance skills. Bundle packages also include the manifest-referenced interop
documentation, structural design philosophy references, taste profiles,
templates, examples, helper scripts, and validation fixtures required by the
selected bundle.

## Uninstall

Remove the default `ui-blueprint-skills` compatibility bundle from the same target used by
`install.sh`:

```bash
./uninstall.sh
```

Select the same bundle name used at install time to remove only that bundle's
installed skills, agents, commands, shared files, and install record:

```bash
UI_PLUGIN_BUNDLE="ui-study-skills" ./uninstall.sh
```

Use `UI_PLUGIN_TARGET` to uninstall from a custom plugin target:

```bash
UI_PLUGIN_TARGET="./.claude" ./uninstall.sh
```

The compatibility target override is still supported:

```bash
UI_BLUEPRINT_SKILLS_DIR="./.claude/skills" ./uninstall.sh
```

## Repository Structure

```txt
ui-design-intelligence/
  README.md
  LICENSE
  CHANGELOG.md
  MIGRATION.md
  install.sh
  uninstall.sh
  package.json
  plugins/
    individuals/
      study-ui-storytelling/
      study-ui-specification/
      study-ui-interaction/
      study-ui-information-architecture/
      study-ui-responsive-behavior/
      study-ui-accessibility/
    bundles/
      ui-audit-skills/
      ui-study-skills/
      ui-blueprint-skills/
      ui-seo-skills/
      ui-design-intelligence/
  .agents/
    agents/
      README.md
      ui-researcher.md
      ui-specification-analyst.md
      ui-interaction-analyst.md
      ui-audit-lead.md
      seo-content-analyst.md
      accessibility-reviewer.md
      blueprint-architect.md
    commands/
      README.md
      study-page.md
      study-site.md
      audit-page.md
      audit-site.md
      audit-interactions.md
      generate-blueprint-from-study.md
  .convention/
    vocabulary/
    schemas/
    examples/
  scripts/
    validate-skills.mjs
    validate-examples.mjs
    validate-bundles.mjs
    build-bundles.mjs
    install-bundle.mjs
    build-zip.mjs
  dist/
    plugins/
      .gitkeep
  .plan/
```

`plugins/individuals/` is the source location for reusable bundle skills, and
`plugins/bundles/` holds committed internal bundle manifests plus bundle README
files. Built bundle contents and runtime `skills/` trees are generated under
`dist/` or installed into agent targets; they are not committed source trees.

The first study vertical source set also lives in `plugins/individuals/`. These
skills share the study output schema, UI terminology vocabulary, page-study
template, and page-study example under `.convention/`.

Canonical skill shapes and release validation expectations are documented in
`docs/skill-shapes-and-validation.md`. That document records the intentional
differences between planner/generator, study, knowledge, design-system, and
planned prototype skill shapes.

## Contributing

When adding or updating a skill:

1. Use lowercase kebab-case for the skill directory.
2. Add or update the source skill under `plugins/individuals/{skill-name}/`.
3. Ensure frontmatter `name` exactly matches the directory name.
4. Write a specific `description` that explains when the skill should be used.
5. Put detailed reusable guidance in `references/` instead of bloating `SKILL.md`.
6. Keep canonical terms in `.convention/vocabulary/` and `.convention/schemas/`.
7. Add or update examples when behavior changes.
8. Add the skill name to one or more `plugins/bundles/{bundle-name}/plugin.json` manifests.
9. Run `npm run validate`.

When adding a skill to a bundle:

1. Add the skill directory under `plugins/individuals/{skill-name}/`.
2. Add any reusable schemas, vocabulary, templates, or examples under `.convention/`.
3. Add the skill name to the bundle manifest `skills` array.
4. Add required agent names, command names, and shared file paths to the same manifest.
5. Run `npm run validate:bundles`.
6. Run `npm run build:bundles {bundle-name}` for buildable bundles.

### Product Skill Content Standard

Product wireframing skills must encode judgment, not only vocabulary lists. Each
product skill's local references should include:

- `Decision Heuristics`: when to choose one structure, layout, state, or pattern over another
- `Anti-Pattern`: at least one bad structure and the corrected version
- `Worked Example`: a concrete example tied to the skill's scope
- `Hand-Off`: what the skill does not do and which skill should take over

`npm run validate:skills` checks product skill references for these sections so
new skills do not regress to generic prompt fragments.

For the full Sprint 003 skill-shape contract, including knowledge,
design-system, command, agent, strict bundle, and release validation gates, see
`docs/skill-shapes-and-validation.md`.

## Versioning

This repository is at `0.9.0`, the pre-1.0 integration milestone.

Release publication is tag-based: generated archives in `dist/` are not
releases by themselves. A published release should have a pushed `v{version}`
tag and release artifacts attached. See `docs/publishing.md`.

Version history:

- `0.1.0`: MVP core skills, vocabulary, schema, examples, validation, and install packaging.
- `0.2.0`: stronger schema and validation coverage.
- `0.3.0–0.8.0`: knowledge system, design-system, style-reference, prototype,
  multi-agent bundle professionalization, Codex support, E2E creation commands,
  remote knowledge retrieval, and app handoff contracts.
- `0.9.0`: pre-1.0 integration milestone — CI pipeline, credential-safe
  validation, shared reference sync, canonical skill gate, taste profile
  expansion, prototype skill layer, behavioral test fixtures, and
  `ui-content-skills` documentation.
- `1.0.0`: stable vocabulary and schema contract. Requires final public
  install-surface validation and a verified prototype skill layer under the CI
  gate.

Schema and vocabulary changes can affect downstream renderers. Breaking changes should be documented in `CHANGELOG.md`; add `MIGRATION.md` when compatibility guidance is needed.

## Security Notes

Skills are executable instructions for agents. Review `SKILL.md` and referenced files before installing third-party skill repositories.

Current security posture:

- The installer copies local skill directories only.
- The installer does not download remote code.
- Validation and packaging scripts run locally with Node.js.
- No telemetry is included.
- Generated release archives are written to `dist/`.
- Pin release versions before production use once releases exist.

## Planning Convention

Planning artifacts live in `.plan/`.

Each sprint uses a zero-padded numeric directory:

```txt
.plan/sprint-001
.plan/sprint-002
.plan/sprint-003
```

Each sprint may include local objective files:

```txt
.plan/sprint-001/objectives/*.md
```

Each sprint has one summary:

```txt
.plan/sprint-001/sprint-001.summary.md
```

Each sprint task lives under `tasks/` and uses the sprint number plus a task slug:

```txt
.plan/sprint-001/tasks/sprint-001.{task-name}.task.md
```
