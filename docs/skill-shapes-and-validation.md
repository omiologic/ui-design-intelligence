# Skill Shapes And Validation

This repository intentionally supports multiple skill shapes. The difference is
architectural, not drift: each shape owns a different layer of the UI blueprint
pipeline.

## Common Contract

Every skill directory must include `SKILL.md` with YAML frontmatter:

- `name`: lowercase kebab-case and identical to the directory name
- `description`: specific enough to explain when the skill should be used
- `license`: repository license reference

Reusable details belong in `references/`, not in an oversized `SKILL.md`.
References listed in a `## References` section must resolve locally after
bundle installation.

Use shared assets instead of local vocabulary forks:

- `shared/schemas/` for output contracts
- `shared/vocabulary/` for controlled terms
- `shared/templates/` for reusable output shapes
- `shared/examples/` and focused test fixtures for examples

## Canonical SKILL.md Template

Sprint 004 standardizes skill bodies around one canonical section contract. The
validation gate enforces the canonical section set by default; all sections are
required for every skill.

Canonical section order:

1. `## Purpose`
2. `## Philosophy`
3. `## Decision Criteria` or `## Evidence Discipline`
4. `## Boundary`
5. `## References`
6. `## Rules`
7. `## Anti-Patterns`
8. `## Workflow` or `## Method`
9. `## Inline Example`
10. `## Hand-Offs`

Domain variants:

- Study skills may use `## Evidence Discipline` and `## Method` instead of
  `## Decision Criteria` and `## Workflow`.
- Generator, planner, audit, knowledge, design-system, style-reference, and
  prototype skills should use `## Decision Criteria` and `## Workflow` unless
  the skill is explicitly evidence-gathering.
- Use the singular `## Inline Example` section. Cross-skill context belongs
  inside that section when it helps explain the example.
- Fold best-practice checks and evidence rules into `## Rules`, `## Decision
  Criteria`, or focused reference files. Do not add separate top-level
  `## Best-Practice Checks` or `## Evidence Rules` sections.
- Reference files may use focused local headings when they are method documents;
  the canonical section gate applies to `SKILL.md` bodies.
- `skills/skill-creator` is a compatibility guide that keeps a canonical skill
  core, then appends upstream skill-authoring documentation. Its appended guide
  headings are not a UI blueprint pipeline variant.

Every JSON-emitting skill needs a compact, schema-shaped JSON example. The
example should anchor output shape and required metadata, not attempt to be a
full exhaustive fixture.

## Planner And Generator Skills

Planner and generator skills create new blueprint, wireframe, SEO, audit,
knowledge, or design-system artifacts.

Expected shape:

- Purpose and usage boundary
- References to schema, vocabulary, examples, or focused method docs
- Decision criteria for when to use the skill
- Rules for output shape and evidence handling
- Workflow steps
- Anti-patterns
- Hand-offs to adjacent skills

Product-facing planner/generator references may carry deeper judgment, examples,
or hand-off detail, but the required section gate now targets `SKILL.md` bodies
because those are the artifacts readers and agents load first.

## Study Skills

Study skills observe existing interfaces. They should not invent reusable
patterns, judge final quality, or generate new blueprints directly unless a
later handoff skill is invoked.

Expected shape:

- Evidence-first purpose
- Observation method
- Capture or input expectations
- Fields to record in `StudyOutput`
- Explicit confidence and unknowns
- Hand-offs to audit, knowledge, blueprint, SEO, accessibility, or interaction
  skills

Study skills may reference browser or capture commands only when the task
includes a live page or screenshot workflow.

## Knowledge Skills

Knowledge skills manage reusable UI pattern knowledge between study/audit output
and blueprint generation.

Expected shape:

- Extraction, curation, search, generation, or lineage purpose
- Source and confidence requirements
- Deduplication and drift rules
- Pattern record, index, insight, and lineage schema references
- Retrieval or handoff behavior
- Clear boundary from raw study output and final quality audit

The knowledge vertical owns reusable pattern records. Project-specific studied
site archives belong in project-local `ui-knowledge/` workspaces, not in this
repository.

## Design-System Skills

Design-system skills create or audit lightweight foundation artifacts, not a
production component library.

Expected shape:

- Seed/foundation scope and source type expectations
- Required sections for brand, palette, typography, iconography, buttons, cards,
  header, and footer
- Provenance labels such as observed, inferred, recommended, generated, and
  user-provided
- Confidence handling for exact values
- Audit expectations for completeness, naming, and consistency
- Hand-off from style/knowledge inputs into blueprint and prototype outputs

These skills must preserve uncertainty instead of inventing exact tokens,
fonts, colors, or component rules from weak evidence.

Sprint 004 design-system skill migration should use
`shared/design-philosophy/design-system/skill-doctrine.md` as the operational
reference. That doctrine makes seed ownership, semantic roles, provenance,
confidence, accessibility constraints, consistency locks, open questions, and
anti-slop failures actionable for skill bodies, examples, audits, and later
validation.

## Prototype Skills

Prototype skills are active as of Sprint 009. They plan behavior-first
interaction structures: screens, states, flows, overlays, and form contracts.

Expected shape:

- Behavior, route, screen, state, event, action, transition, overlay, form, and
  navigation-flow ownership
- Explicit boundary from visual motion craft and production runtime code
- Schema-backed output examples
- Audit checks for missing states, unreachable screens, unclear dismissals, and
  broken task flow

## Commands And Agents

Commands are thin workflow entrypoints. They should name the skill or agent
sequence, required inputs, outputs, validation commands, and handoff files.

Agent files are documentation-first orchestrator contracts referenced by bundle
manifests, not executable subagent definitions with frontmatter. The filename
stem is the manifest reference. If a later host adopts executable agents, the
minimum frontmatter should be `name`, `description`, and explicit capability
fields such as `tools` or `model`; until then, bundle manifests provide the
machine-readable roster.

Canonical agent section order:

1. `## Purpose`
2. `## Use When`
3. `## Boundary`
4. `## Skills`
5. `## Commands`
6. `## Workflow`
7. `## Arbitration`
8. `## Inputs`
9. `## Outputs`
10. `## Worked Example`
11. `## Hand-Offs`

Orchestrating agents should use numbered workflows with branch conditions and
stop conditions. They should arbitrate conflicting skill outputs by preserving
schema validity, accessibility, evidence confidence, source provenance, explicit
user constraints, and layer ownership before stylistic preference. Adjacent
agents should be disambiguated in `## Boundary`, especially across blueprint,
design-system, style-reference, prototype, audit, and knowledge layers. Agents
must not replace schema or fixture validation.

Agent rosters are machine-checkable:

- `## Skills` and `## Commands` entries use `required: \`name\`` or
  `optional: \`name\``.
- Required roster entries must exist in the repository and be present in every
  bundle that ships the agent.
- Optional roster entries must exist in the repository; they represent
  aggregate-bundle or cross-bundle handoff capabilities.
- `## Inputs` and `## Outputs` should link to schemas, templates, or examples
  using repository paths such as `shared/schemas/study-output.schema.json` or
  mark intentionally prose-only outputs with `Prose-only:`.

## Validation Gates

Run all standard checks:

```bash
npm run validate
```

This currently checks schema drift, generated node-type references, skill
frontmatter and local references, examples, taste profiles, quality golden-set
fixtures, knowledge records, design-system assets, prototype examples,
style-reference records and examples, index generation, knowledge workspace
initialization, blueprint anti-patterns, invalid fixtures, bundle manifests,
capture URL smoke behavior, and blueprint export seed output.

Run behavioral test validation:

```bash
npm run validate:behavioral-tests
```

This validates `tests/behavioral/*.behavioral-test.json` fixtures and, for any
fixture with a `referenceExample`, checks each declared signal against that
artifact offline without calling any model.

## Behavioral Test Format

Behavioral fixtures live in `tests/behavioral/` and use the filename pattern
`{skill-name}.behavioral-test.json`. They are defined by
`shared/schemas/skill-behavioral-test.schema.json`.

Required fields:

- `skill`: kebab-case name of the skill under test.
- `brief`: compact input scenario (at least 10 characters).
- `requiredSignals`: array of at least one signal object.

Optional field:

- `referenceExample`: repository-relative path to an existing artifact. When
  present the validator checks every signal against it.

Each signal requires:

- `description`: human-readable assertion (at least 5 characters).
- `check`: one of the check types listed below.

### Check Types

| Check | What it asserts | Required fields |
| --- | --- | --- |
| `nodeTypePresent` | A node with `type === target` exists somewhere in the artifact's node tree. | `target` |
| `fieldPresent` | Dot-path field is truthy and non-empty. | `target` |
| `fieldMatchesValue` | Dot-path field equals `expectedValue` exactly. | `target`, `expectedValue` |
| `fieldCountAtLeast` | Dot-path array has at least `minCount` items. | `target`, `minCount` |
| `allArrayItemsHaveField` | Every item in the `target` array has a truthy `field`. | `target`, `field` |
| `fieldValuesInSet` | Every item's `field` in the `target` array is in `allowedValues`. | `target`, `field`, `allowedValues` |
| `overlayHasDismissal` | Every entry in `artifact.overlays` has `.dismissal.methods` as a non-empty array. | — |
| `antiPatternAbsent` | Declaration only — documents a failure mode; always passes statically. | `value` (label) |
| `rubricCriteria` | Declaration only — documents a quality criterion; always passes statically. | `value` (label) |

### Adding A Fixture For A New Skill

1. Create `tests/behavioral/{skill-name}.behavioral-test.json`.
2. Set `skill` to the exact kebab-case skill directory name.
3. Write a `brief` that represents a realistic scenario a user would hand to the
   skill.
4. Choose a `referenceExample` from `shared/examples/` that a correct skill
   output would match structurally, or use an artifact from `tests/`.
5. Add at least three mechanically checkable signals (`nodeTypePresent`,
   `fieldPresent`, `fieldCountAtLeast`, etc.) plus one declaration-only signal
   (`antiPatternAbsent` or `rubricCriteria`) documenting the most important
   failure mode to watch for.
6. Run `npm run validate:behavioral-tests` to confirm all signals pass against
   the reference artifact.

Signals that require model output are recorded as `antiPatternAbsent` or
`rubricCriteria` declarations. They document intent for manual review and
evaluator tooling rather than blocking the offline gate.

Run skill-only validation:

```bash
npm run validate:skills
```

This checks skill frontmatter, local `## References`, and all required `SKILL.md`
body sections: `Purpose`, `Philosophy`, `Boundary`, `References`, `Rules`,
`Anti-Patterns`, `Hand-Offs`, one decision section (`Decision Criteria` or
`Evidence Discipline`), one workflow section (`Workflow` or `Method`), and the
singular `Inline Example` section. It also rejects deprecated top-level taxonomy
headings such as `Best-Practice Checks`, `Evidence Rules`, `Inline Examples`,
`Cross-Skill Example`, `Decision Heuristics`, `Worked Example`, and singular
`Hand-Off`.

Run targeted validation for an affected skill:

```bash
npm run validate:skill -- page-wireframe-planner
```

Targeted skill validation checks only the named skill directory under
`plugins/individuals/` and its compatibility copy under `skills/` when present.
It is intended for local iteration; full validation remains the release gate.

Run the full canonical skill gate (alias for `validate:skills`):

```bash
npm run validate:skills:canonical
```

Both `validate:skills` and `validate:skills:canonical` now run the same check.
The canonical gate (`Philosophy`, `Boundary`, `Inline Example`) is the default
since Sprint 009 normalized the full skill corpus.

Run strict validation for an affected bundle:

```bash
npm run validate:bundle -- ui-knowledge-skills
```

Strict bundle validation requires all referenced skills, agents, commands, and
shared files to exist. Normal bundle validation allows planned bundles to name
future assets.

Run changed-file validation:

```bash
npm run validate:changed
```

This routes Git changed files to targeted validators when possible, including
skill, bundle, example, knowledge, design-system, prototype, style-reference,
install-matrix, and Codex package checks. If package or validator wiring
changes, it falls back to the full `npm run validate` chain.

Run release validation:

```bash
npm run validate:release
```

Install matrix validation is the local release gate for install/update safety:

```bash
npm run validate:install-matrix
```

It covers Codex `.agents` skills-only installs, Claude `.claude` full installs,
component and aggregate bundles, dry-run behavior, conflict blocking, identical
reinstall, forced overwrite, uninstall record scope, and installed reference
checks.

Release validation runs the full validation chain, builds every active or
transitional bundle, validates each buildable bundle strictly, installs each
bundle into a temporary target, verifies installed skill references, uninstalls
it, builds generated Codex plugin packages, inspects release artifacts, and
reports per-bundle success.

Inspect release artifacts after building bundles and Codex plugin packages:

```bash
npm run inspect:release-artifacts
```

The inspection checks generated zip entries without manual unpacking, rejects
local/private state, verifies manifests, README, license, and changelog files,
checks generated Codex package manifests, and writes
`dist/release-artifact-inspection.md`.

For local packaging iteration only:

```bash
npm run package:fast
```

`package:fast` skips full validation only because the command is explicit. Run
`npm run validate:release` before publishing release candidates.

## Behavioral Tests

Behavioral fixtures live in `tests/behavioral/` and use the extension
`.behavioral-test.json`. Each fixture is validated against
`shared/schemas/skill-behavioral-test.schema.json`.

### What a behavioral fixture is

A behavioral fixture declares the structural signals that a correct skill output
must satisfy. It does not capture exact model output (which is brittle across
runs). Instead it captures the minimum structural contract: which fields must be
present, which node types must appear in the artifact tree, which array items
must carry required sub-fields, and which anti-patterns must be absent.

When a `referenceExample` path is provided, the validator loads that artifact
and asserts each signal against it deterministically — no model call required.
Fixtures without a `referenceExample` are validated for fixture structure only;
their signals document intent.

### Required fixture fields

- `skill` — kebab-case name of the skill under test (matches the skill directory
  name).
- `brief` — compact scenario that would be handed to the skill as input.
- `requiredSignals` — array of signal objects, each with `description` and
  `check`, plus check-specific fields.
- `referenceExample` (optional) — repository-relative path to an existing
  artifact in `shared/examples/` or `tests/quality-golden-set/`.

### Signal check types

| Check | What it asserts |
|---|---|
| `nodeTypePresent` | A node with the given `target` type exists anywhere in the artifact's blueprint tree (root + overlays). |
| `fieldPresent` | The dot-path `target` field is present and non-empty in the artifact. |
| `fieldMatchesValue` | The dot-path `target` field equals `expectedValue`. |
| `fieldCountAtLeast` | The dot-path `target` array has at least `minCount` items. |
| `allArrayItemsHaveField` | Every item in the `target` array has a truthy `field` property. |
| `fieldValuesInSet` | Every `target[].field` value is contained in `allowedValues`. |
| `overlayHasDismissal` | Every overlay in `artifact.overlays` has a non-empty `dismissal.methods` array. |
| `antiPatternAbsent` | Declaration only — always passes. Documents a pattern the skill must not produce; reviewed by evaluators against live output. |
| `rubricCriteria` | Declaration only — always passes. Documents a rubric criterion the skill should satisfy; reviewed by evaluators against live output. |

### How to add a fixture for a new skill

1. Create `tests/behavioral/<skill-name>.behavioral-test.json`.
2. Set `skill` to the exact skill directory name.
3. Write a `brief` that covers the scenario you want to guard.
4. Add at least one `requiredSignals` entry. Use `fieldPresent` and
   `fieldMatchesValue` to assert top-level artifact shape; use `nodeTypePresent`
   for blueprint artifacts; use `allArrayItemsHaveField` to assert evidence
   discipline on arrays.
5. If a reference example already exists in `shared/examples/`, set
   `referenceExample` to its repository-relative path so the validator confirms
   signals hold against it.
6. Run `npm run validate:behavioral-tests` to confirm the fixture passes.

### Running behavioral tests

```bash
npm run validate:behavioral-tests
```

Behavioral tests are included in the full validation chain:

```bash
npm run validate
```

## Current Deferrals

- Full final Sprint 003 release validation across all late design-system,
  prototype, and style-reference assets is deferred to the dedicated close
  validation task after those assets are implemented.
