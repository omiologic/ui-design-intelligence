# UI Blueprint Skills Architecture Plan

## Purpose

`ui-design-intelligence` is a reusable skill repository for producing consistent UIBlueprint wireframe JSON and related UI study, audit, SEO, knowledge, design-system, style-reference, and prototype workflows. The repository is built around a shared design language, not isolated prompts.

## Current Architecture

- `skills/` contains product and maintenance skill directories. Each skill has a required `SKILL.md` file with frontmatter `name` and `description`.
- `shared/vocabulary/` contains canonical UI terms for node types, layout patterns, content roles, interaction states, and UI layer types.
- `shared/schemas/` contains the MVP wireframe JSON schema.
- `shared/examples/` contains valid UIBlueprint examples used by validators and skill references.
- `scripts/` contains local validation and packaging utilities.
- `plugins/individuals/` is scaffolded as the future source location for reusable plugin skill directories.
- `plugins/bundles/` is scaffolded for committed bundle manifests and bundle README files.
- `agents/` and `commands/` contain shared workflow assets referenced by bundle manifests.
- `dist/plugins/` is scaffolded with `.gitkeep`; generated plugin bundle contents and zip files remain release output.
- `.plan/` contains sprint objectives, summaries, and task files for repository work.

## Multi-Plugin Transition Decision

The repository and package identity are `ui-design-intelligence`. The original
Sprint 001 `ui-blueprint-skills` identity remains as a compatibility bundle for
the controlled UIBlueprint wireframing surface.

Compatibility rule: existing `skills/*` consumers, `install.sh`,
`uninstall.sh`, and `npm run package` must keep working until a later migration
task explicitly replaces them. During the transition, `skills/` remains the
compatibility surface for the completed MVP blueprint skillset.

Source-of-truth rule: future plugin skill source will live in
`plugins/individuals/{skill-name}`. Bundle directories under `plugins/bundles/*`
should commit `plugin.json` and README files only; built bundle contents are
generated under `dist/build/*` and zipped under `dist/plugins/*`.

Bundle manifest rule: each `plugins/bundles/{bundle-name}/plugin.json` uses the
internal fields documented in `plugins/bundles/README.md`: `name`, `version`,
`description`, `status`, `skills`, `agents`, `commands`, and `shared`. Manifest
entries may name current individuals or explicitly planned individuals from
`.plan/sprint-001/objectives/multiple-plugin.md`; build validation will resolve
them as the corresponding source files are added.

Current skill classification:

- Product blueprint skills that should become plugin individuals:
  `design-terminology`, `wireframe-schema`, `page-wireframe-planner`,
  `section-wireframe-planner`, `component-wireframe-planner`,
  `layout-specification`, `interaction-patterns`, and
  `accessibility-wireframe-review`.
- Repository maintenance utilities that remain outside end-user plugin bundles:
  `skill-creator` and `sprint-planner`.

Migration rule: do not move product skills out of `skills/` until the bundle
build, validation, install, and compatibility story can prove the same MVP skill
behavior from `plugins/individuals`. Copying or mirroring is acceptable during
the transition; duplicating long-term hand-maintained sources is not.

Sprint 001 migration status: the eight current blueprint product skills are
copied into `plugins/individuals/` as individual plugin sources, while `skills/`
remains the compatibility mirror. Shared helper code prefers
`plugins/individuals/{skill-name}` for packaging/install bundling and falls back
to `skills/{skill-name}` when needed. Schema and `_shared` reference generation
sync both locations.

Initial bundle manifests:

- `ui-study-skills`: study vertical for page and site observations.
- `ui-audit-skills`: transitional audit/report vertical.
- `ui-blueprint-skills`: transitional MVP blueprint bundle.
- `ui-seo-skills`: transitional SEO metadata and SEO audit bundle.
- `ui-design-intelligence`: transitional full bundle combining study, audit, SEO, and blueprint workflows.

Initial development order:

1. Build the study vertical first so downstream audit, SEO, and blueprint work
   can reuse a common observation shape.
2. Keep the transitional `ui-blueprint-skills` bundle buildable from individual
   sources so existing users have a stable install path.
3. Grow audit and SEO individuals as separate verticals. Audit and SEO are now
   transitional.
4. Enable `ui-design-intelligence` only after its referenced study, audit, SEO,
   blueprint, agent, command, and shared assets exist.

Naming reconciliation:

- Interaction vocabulary is implemented as
  `shared/vocabulary/interaction-states.json`. Earlier planning language used
  `interaction-patterns.json`; interaction patterns now live in skill reference
  guidance, while the shared JSON file controls canonical state tokens.
- `shared/examples/ui-blueprint.example.json` is the canonical full-bundle
  blueprint example. Additional implemented blueprint examples are
  `minimal-page.ui-blueprint.json`, `product-page.ui-blueprint.json`, and
  `dental-homepage.ui-blueprint.json`.
- Shared workflow assets live at top-level `agents/` and `commands/`. Earlier
  planning for agents and commands inside `skills/*/` is superseded.

Bundle lifecycle:

- `planned`: manifest can describe future bundle intent; validation checks
  manifest shape, README, agents, and commands, but does not require all future
  skill/shared files to exist.
- `transitional`: manifest is buildable and installable, but may preserve legacy
  compatibility behavior during migration.
- `active`: manifest is buildable, installable, and treated as a normal release
  bundle.

Contributor workflow for a new individual skill:

1. Add `plugins/individuals/{skill-name}/SKILL.md` with matching frontmatter.
2. Put reusable long-form guidance in `references/`.
3. Add or update shared schemas, vocabulary, templates, or examples under
   `shared/` when the skill needs canonical data.
4. Add the skill name to each target bundle manifest.
5. Add related agent, command, and shared file manifest entries.
6. Keep generated expanded bundle contents out of `plugins/bundles/*`.
7. Run `npm run validate:bundles`, then `npm run build:bundles {bundle-name}`
   for buildable bundles.

Initial study individual skills now live under `plugins/individuals/`:

- `study-ui-storytelling`
- `study-ui-specification`
- `study-ui-interaction`
- `study-ui-information-architecture`
- `study-ui-responsive-behavior`
- `study-ui-accessibility`

These skills share `shared/schemas/study-output.schema.json`,
`shared/vocabulary/ui-terminology.json`, `shared/templates/page-study.md`, and
`shared/examples/page-study.example.json`.

## Implemented MVP

The MVP includes these wireframing skills:

- `design-terminology`
- `wireframe-schema`
- `page-wireframe-planner`
- `section-wireframe-planner`
- `component-wireframe-planner`
- `layout-specification`
- `interaction-patterns`
- `accessibility-wireframe-review`

The repository also includes maintenance skills that are validated in the repo but not installed or packaged by default:

- `skill-creator`
- `sprint-planner`

The product/install boundary is an explicit allowlist in `install.sh`, `uninstall.sh`, and `scripts/build-zip.mjs`.

Sprint 002 product skill body status: the eight blueprint product skills now use
the richer product skill shape from `.plan/sprint-002/objectives/skills-review-01.md`.
Their `SKILL.md` files include philosophy, decision criteria, non-schema rules,
anti-patterns, workflows, inline examples, and hand-offs, with root `skills/`
compatibility mirrors kept synchronized with `plugins/individuals/`.

Sprint 002 boundary status: `wireframe-schema` owns schema explanation and
representation questions; page, section, and component planners own structural
decisions; `generate-ui-blueprint-from-study` owns evidence-to-structure
translation; `generate-wireframe-config` owns final schema-valid JSON assembly.
README examples follow this plan-then-generate sequence.

Sprint 002 study skill method status: the six study skills keep explicit
observed-vs-inferred evidence discipline and now include step-by-step methods,
inline input-to-finding examples, and hand-offs for audit, blueprint, SEO,
interaction, accessibility, and layout follow-up.

Sprint 002 interop status: `docs/interop/README.md` defines the seam between
this repository and downstream visual-taste tooling. `ui-blueprint-skills` owns
study, IA, structure, interaction contracts, responsive priorities, and
accessibility constraints. Taste Skill-style, Impeccable-style, and Emil
Kowalski-style tools consume those structural handoffs and own visual design,
motion, rendered code, and implementation craft.

Sprint 002 export seed decision: the canonical handoff artifact is a repository-
native Blueprint Export Seed, documented in
`docs/interop/blueprint-export-seed.md`. It can be adapted into
`PRODUCT.md`-style context, `DESIGN.md`-style direction, or design-engineering
prompts, but it does not copy or claim a third-party private format. The seed
template lives at `shared/templates/blueprint-export-seed.md`, with a worked
example at `shared/examples/ui-blueprint.export-seed.md`.

Sprint 002 export workflow status: `scripts/export-blueprint-seed.mjs`
prototypes deterministic export from a committed UIBlueprint plus structural
taste profile into the native seed markdown format. `npm run validate:export-seed`
regenerates the example from `shared/examples/ui-blueprint.example.json` and
`shared/taste-profiles/conversion.json`, then compares it to the committed seed
example.

Sprint 002 install and command parity decision: local bundle installation remains
the supported path. `install.sh` plus `UI_PLUGIN_BUNDLE` and `UI_PLUGIN_TARGET`
provide practical parity for installing skills, agents, commands, and shared
files beside downstream taste tools. Marketplace or `npx skills add` support is
deferred and documented in `docs/interop/install-command-parity.md`.

Sprint 002 packaging status: `ui-blueprint-skills` and `ui-design-intelligence`
bundle manifests include design philosophy references, taste profiles, Blueprint
Export Seed template/example/docs, and the export seed prototype script. Legacy
release packaging includes `docs/`, Sprint 002 validation fixtures, and the
export seed script alongside the existing shared assets.

Sprint 002 release status: full validation, strict bundle validation for all
buildable bundles, release install/uninstall validation, and legacy package
build passed. The repository package archive now uses the
`ui-design-intelligence` package name.

## Shared Reference Resolution

Product skills are self-contained at install time. Each product skill keeps a bundled copy of required shared files under:

```txt
skills/{skill-name}/references/_shared/
```

`shared/` remains the canonical source for vocabulary, schemas, and shared examples. The committed `_shared` copies make source-time validation and single-skill manual installs work. `install.sh` and `scripts/build-zip.mjs` refresh those `_shared` copies when installing or packaging so release output does not depend on sibling skills or repo-level `shared/` paths.

Skill `SKILL.md` reference sections must point at `references/_shared/...`, not `../../shared/...` or `../wireframe-schema/...`.

Sprint 002 reference-safety status: study skills and the two blueprint
generator skills (`generate-wireframe-config` and
`generate-ui-blueprint-from-study`) also use install-safe
`references/_shared/...` paths. `scripts/build-valid-node-types.mjs` syncs
their required schemas, templates, vocabulary, examples, and selected design
philosophy references alongside the original blueprint product skill bundles.

## Structural Taste Architecture

Sprint 002 keeps the UIBlueprint substrate neutral and layers structural taste
on top of it. The neutral substrate remains:

- `shared/schemas/`: shape, required fields, and machine-checkable structure.
- `shared/vocabulary/`: canonical names and semantic meaning for node types,
  layouts, content roles, interaction states, UI layers, and related terms.
- `shared/examples/`: schema-valid examples that can optionally demonstrate a
  profile but must still validate without profile-specific assumptions.

Structural opinions live outside that substrate:

- `shared/design-philosophy/`: shared rationale, decision flowcharts, blueprint
  locks, structural anti-slop rules, and pre-flight checks.
- `shared/taste-profiles/`: named profile files that bias structural decisions
  such as section order, density, layout selection, CTA cadence, overlay use,
  and register-specific hierarchy.

Base skills own universal structural judgment that should hold for nearly every
blueprint: preserve landmarks, keep one primary journey clear, justify overlays,
separate observed evidence from inference, avoid schema-valid but meaningless
nodes, and hand off ambiguity to the right sibling skill. Taste profiles own
contextual bias: whether a page should be conversion-led, editorial, utility or
product-led, denser, slower, more proof-heavy, or more task-focused.

Blueprint examples may declare taste context with optional metadata keys rather
than new required schema fields:

```json
{
  "metadata": {
    "tasteProfile": "conversion",
    "register": "marketing"
  }
}
```

Those keys are advisory for skills, profile-aware validators, and export tools.
They do not change the base schema contract, and examples without them remain
valid neutral UIBlueprints. If Sprint 002 adds profile validation, it should
validate these metadata values against `shared/taste-profiles/` without making
`shared/schemas/wireframe-config.schema.json` opinionated.

## Install And Packaging

`install.sh` installs a selected plugin bundle by manifest name. The default
bundle is `ui-blueprint-skills`, preserving the original product wireframing
install behavior while adding manifest-referenced agents, commands, and shared
files when present. The repository name is `ui-design-intelligence`; the default
bundle remains a compatibility install surface. Repository maintenance skills
remain excluded from default end-user installs.

Default plugin target:

```txt
~/.claude
```

Installed skills go to `~/.claude/skills`; agents, commands, and shared files
go to sibling `agents/`, `commands/`, and `shared/` directories under the same
plugin target.

Select a bundle:

```bash
UI_PLUGIN_BUNDLE="ui-study-skills" ./install.sh
UI_PLUGIN_BUNDLE="ui-blueprint-skills" ./install.sh
UI_PLUGIN_BUNDLE="ui-design-intelligence" ./install.sh
```

`ui-design-intelligence` is transitional during Sprint 001 and installs once
selected explicitly with `UI_PLUGIN_BUNDLE`.

## Capture URL Workflow

Sprint 001 implements `scripts/capture-url.mjs` as a deterministic metadata
helper rather than a browser automation tool. It validates an HTTP(S) URL and
emits a JSON envelope that can reference externally supplied screenshots, DOM
exports, or study notes. It does not fetch remote pages, launch a browser, or
create screenshots. Study commands consume that metadata plus externally
provided evidence.

Override the plugin target:

```bash
UI_PLUGIN_TARGET="/path/to/.claude" ./install.sh
```

Compatibility target:

```bash
UI_BLUEPRINT_SKILLS_DIR="/path/to/.claude/skills" ./install.sh
```

`uninstall.sh` mirrors the selected bundle name and target. It removes only the
skills, agents, commands, shared files, and install record associated with that
bundle manifest or its recorded install metadata.

`npm run package` runs validation and creates a generated release archive under `dist/`. The archive includes product wireframing skills, shared files, and validation/package utilities; it excludes repository maintenance skills. The `dist/` directory is ignored because archives are generated artifacts.

`npm run build:bundles` validates bundle manifests and builds all `active` or
`transitional` bundles into `dist/build/{bundle-name}/`, then creates
`dist/plugins/{bundle-name}.zip`. Use explicit bundle names to build a subset or
`--all` to attempt planned bundles as well. Generated bundle folders and zip
files remain ignored release output.

`npm run validate:release` is the release gate for currently buildable bundles.
It runs normal validation, builds active/transitional bundles, installs each
buildable bundle into a temporary target, runs installed-reference verification,
and uninstalls the bundle before cleaning the temporary directory.

## Validation

`npm run validate` currently runs:

- `scripts/check-schema-drift.mjs`
- `scripts/build-valid-node-types.mjs`
- `scripts/validate-skills.mjs`
- `scripts/validate-examples.mjs`
- `scripts/validate-invalid-examples.mjs`
- `scripts/validate-bundles.mjs`

Skill validation checks required frontmatter, matching skill names, useful descriptions, duplicate names, and referenced files.

Product skill validation also checks that local references include the required
judgment sections: decision heuristics, an anti-pattern, a worked example, and a
hand-off statement. This keeps product skills from regressing into generic
vocabulary lists.

Example validation runs in two layers for wireframe examples. First, `scripts/validate-examples.mjs` validates each wireframe example against `shared/schemas/wireframe-config.schema.json` directly using the repository-local schema-subset validator in `scripts/lib/json-schema-validator.mjs`. This avoids network-installed dependencies and keeps offline validation deterministic. Second, it runs semantic checks for duplicate node ids, controlled vocabulary membership, node containment, overlay-only placement, and cardinality.

Wireframe example validation scans `*.ui-blueprint.json` files in
`shared/examples/` and skill-local JSON examples under both `skills/` and
`plugins/individuals/`. This lets future study/audit examples coexist in
`shared/examples/` without being treated as UIBlueprint wireframes.

Audit example validation scans `page-audit.example.json` files in
`shared/examples/`, validates them against `shared/schemas/page-audit.schema.json`,
and checks audit severity values against `shared/vocabulary/audit-severity.json`.

Invalid example validation runs fixtures under `tests/invalid-examples/` through the same validator and asserts they fail with expected messages for schema and semantic failure categories.

Bundle validation checks `plugins/bundles/*/plugin.json`, bundle README files,
and referenced `agents/*.md` and `commands/*.md` files. Agent and command
markdown must contain the sections documented in `agents/README.md` and
`commands/README.md`.

For buildable bundles with `status: "active"` or `status: "transitional"`,
bundle validation also requires referenced skills and shared files to exist.
`status: "planned"` manifests may name future skills and shared assets without
blocking current validation.

Strict bundle validation is available with:

```bash
npm run validate:bundles:strict -- ui-audit-skills
```

Strict mode requires selected bundles to resolve referenced skills and shared
files even if they are still marked `planned`. This gives release work a
definition-of-done gate without making normal `npm run validate` fail for
intentionally planned future bundles.

`node-types.json` stores semantic records rather than a flat list. Each node type defines direct child containment, overlay-only placement, and selected cardinality rules. `scripts/validate-examples.mjs` enforces those semantic rules.

`scripts/build-schema.mjs` regenerates schema enums for node types, content roles, layout patterns, and interaction states from `shared/vocabulary/*`. Unknown vocabulary tokens hard-fail; the MVP does not include an `x-custom` escape hatch.

## Known Follow-Up Decisions

The remaining sprint tasks intentionally harden the initial MVP:

- fix shared reference resolution after installation
- add semantic containment rules to vocabulary
- validate against the real JSON Schema file
- add negative fixtures that prove validation catches failures
- deepen skill references with decision heuristics, anti-patterns, and examples

## Deprecation

`skills/` is a read-only compatibility mirror for the eight blueprint product
skills. It exists to keep existing consumers, `install.sh`, `uninstall.sh`, and
`npm run package` working during the transition period.

Rules:

- Do not make changes directly in `skills/`. The canonical source for all
  product skills is `plugins/individuals/{skill-name}`.
- After updating a skill in `plugins/individuals/`, sync the change to its
  `skills/` mirror and run `npm run check:skills-parity` to confirm they match.
  Use `npm run sync:shared-references` (or a dedicated mirror command if added)
  to propagate shared reference changes to both trees at once.
- `npm run validate` and `npm run validate:ci` both run `check:skills-parity`
  so drift between the two trees is caught in CI.

Retirement condition:

The `skills/` directory will be removed when all consumers have migrated to
bundle install paths and no install script requires the direct `skills/` surface.

Target milestone: `1.0.0`.

## Design Rules

- Keep vocabulary and schema canonical in `shared/`.
- Keep skill instructions focused and use `references/` for reusable detail.
- Keep generated artifacts out of source.
- Prefer boring, explicit names over clever or brand-heavy names.
- Do not add domain-specific skills until the core schema, vocabulary, examples, and validation are stronger.
