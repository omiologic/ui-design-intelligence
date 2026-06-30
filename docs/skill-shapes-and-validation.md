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
default validation gate enforces the currently stable subset, and the strict
canonical gate is the ratchet used as migration tasks add the remaining sections.

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

Prototype skills are planned in Sprint 003 but are not complete at this point in
the task sequence.

Expected shape once implemented:

- Behavior, route, screen, state, event, action, transition, overlay, form, and
  navigation-flow ownership
- Explicit boundary from visual motion craft and production runtime code
- Schema-backed output examples
- Audit checks for missing states, unreachable screens, unclear dismissals, and
  broken task flow

Prototype bundle validation is deferred to
`.plan/sprint-003/tasks/sprint-003.23.run-sprint-003-design-system-prototype-validation.task.md`.

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

Run skill-only validation:

```bash
npm run validate:skills
```

This checks skill frontmatter, local `## References`, and required `SKILL.md`
body sections: `Purpose`, `References`, `Rules`, `Anti-Patterns`, `Hand-Offs`,
one decision section, and one workflow section. It also rejects deprecated
top-level taxonomy headings such as `Best-Practice Checks`, `Evidence Rules`,
`Inline Examples`, `Cross-Skill Example`, `Decision Heuristics`,
`Worked Example`, and singular `Hand-Off`.

Run the strict canonical skill gate:

```bash
npm run validate:skills:canonical
```

The strict gate additionally requires `Philosophy`, `Boundary`, and the singular
`Inline Example` section. It is expected to become the default once Sprint 004
skill migration tasks have normalized the corpus.

Run strict validation for an affected bundle:

```bash
npm run validate:bundles:strict -- ui-knowledge-skills
```

Strict bundle validation requires all referenced skills, agents, commands, and
shared files to exist. Normal bundle validation allows planned bundles to name
future assets.

Run release validation:

```bash
npm run validate:release
```

Release validation runs the full validation chain, builds every active or
transitional bundle, validates each buildable bundle strictly, installs each
bundle into a temporary target, verifies installed skill references, uninstalls
it, and reports per-bundle success.

## Current Deferrals

- Full final Sprint 003 release validation across all late design-system,
  prototype, and style-reference assets is deferred to the dedicated close
  validation task after those assets are implemented.
