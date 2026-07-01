# Consumer Creation Contract

## Purpose

This contract defines how Sprint 006 consumer creation commands behave. It sits
above the specialist skills and agents: users should be able to ask for a
wireframe, design specification, or prototype plan without knowing which
specialist skills need to run.

Consumer commands are orchestration products, not new design theories. They
choose defaults, ask for missing inputs, stop when evidence is too weak, and
emit predictable artifacts.

## Command Family

| Command | Primary Job | Primary Outputs |
| --- | --- | --- |
| `create-wireframe` | Turn a brief, study, audit, or requirements note into a wireframe plan and schema-valid UIBlueprint when inputs are sufficient. | `wireframe.json`, `wireframe-notes.md` |
| `create-design-spec` | Turn product context, design-system seed, style constraints, wireframe decisions, and accessibility notes into a structural design specification. | `design-spec.md`, optional `design-spec.json` |
| `create-prototype-plan` | Turn a wireframe with stable node IDs and behavior requirements into prototype behavior artifacts. | `prototype-config.json`, `prototype-plan.md` |
| `review-generated-wireframe` | Score a generated wireframe against the blueprint quality rubric and report repairs. | `wireframe-review.md` |

## Required Command Sections

Every consumer creation command must include these sections, in this order:

1. `## Purpose`
2. `## Use When`
3. `## Required Inputs`
4. `## Optional Inputs`
5. `## Missing Input Questions`
6. `## Default Pipeline`
7. `## Stop Conditions`
8. `## Outputs`
9. `## Quality Checks`
10. `## Agents`
11. `## Skills`
12. `## Example Invocation`

The existing base command sections still apply. Consumer commands add stricter
input, output, quality, and stop-condition requirements because they are meant
to be user-facing entrypoints.

## Input Policy

Consumer commands should make conservative assumptions only when the artifact
will remain useful and honest. They should ask blocking questions when missing
inputs would make the result misleading.

### Required Inputs

Each command must declare the minimum viable inputs.

`create-wireframe` requires:

- page, screen, component, or flow scope
- audience or user type
- primary user goal
- success action or completion condition
- content source, brief, study, audit, or requirements note

`create-design-spec` requires:

- product or project context
- target screen, page, component, or flow scope
- intended implementation audience
- brand, design-system seed, style reference, or explicit permission to
  generate seed-level recommendations
- wireframe decisions or enough structure to define layout and components

`create-prototype-plan` requires:

- source wireframe or blueprint
- stable node IDs for interactive targets
- key user flows
- state requirements for forms, overlays, menus, async components, or navigation
- viewport or device requirements when behavior changes responsively

`review-generated-wireframe` requires:

- generated wireframe JSON or a clear wireframe artifact
- optional but preferred original brief or user goal
- blueprint quality rubric

### Optional Inputs

Optional inputs can improve quality but must not be treated as required unless
the user asks for the corresponding artifact depth.

- screenshots or URL captures
- existing study output
- design-system seed
- style reference or style application
- knowledge pattern records
- accessibility notes
- implementation constraints
- target framework or design-system library
- project-local config such as `.ui-design-intelligence.yml`

## Missing Input Questions

Consumer commands ask at most three blocking questions before proceeding. If
more information is missing, ask for the smallest set that determines the next
artifact decision.

Default blocking questions:

1. What is the artifact scope: page, screen, component, flow, or whole site?
2. Who is the primary user and what are they trying to complete?
3. What source should be treated as truth: brief, screenshot, existing page,
   study output, design-system seed, or your written requirements?

Command-specific blocking questions:

- `create-wireframe`: What is the primary action or completion condition?
- `create-design-spec`: Is there an existing brand/design-system source, or
  should the command generate seed-level recommendations with confidence notes?
- `create-prototype-plan`: Which wireframe node IDs are interactive, and what
  are the key flows?
- `review-generated-wireframe`: Should the review score against the supplied
  brief or only against structural quality?

If the user does not answer and the missing information is non-blocking, proceed
with explicit assumptions and list them in the output.

## Default Pipelines

### `create-wireframe`

1. Clarify scope, audience, primary goal, and source truth.
2. Use study skills only when the input is observed UI, screenshot, URL capture,
   or raw page notes.
3. Use `page-wireframe-planner`, `section-wireframe-planner`, or
   `component-wireframe-planner` based on scope.
4. Use `layout-specification` when layout or responsive behavior is central.
5. Use `interaction-patterns` when forms, overlays, filters, sticky UI, or
   stateful components appear.
6. Use `accessibility-wireframe-review` before final assembly.
7. Use `generate-wireframe-config` only after planning is sufficient.
8. Recommend `review-generated-wireframe` after output.

### `create-design-spec`

1. Clarify implementation audience, artifact scope, and source truth.
2. Use `generate-design-system-seed` or focused foundation skills when no
   trusted design-system seed exists.
3. Use style-reference skills only when the user asks for visual direction or
   supplies style input.
4. Use blueprint decisions or wireframe output as structural source.
5. Assemble `design-spec.md` with sections for intent, structure, components,
   states, responsive behavior, accessibility, content requirements,
   implementation notes, open questions, and validation checklist.
6. Emit `design-spec.json` only when a schema or downstream consumer requires
   structured data.

### `create-prototype-plan`

1. Confirm source wireframe exists and node IDs are stable.
2. Confirm screen, route, state, interaction, overlay, form, and responsive
   requirements.
3. Use `generate-component-state-model` for unclear component states.
4. Use `generate-interaction-flow` for event-to-result behavior.
5. Use `generate-interactive-prototype-config` to assemble schema-facing
   prototype data.
6. Use `generate-clickable-prototype-plan` for runtime handoff notes.
7. Use `audit-prototype-interactions` before final handoff.

### `review-generated-wireframe`

1. Confirm the input is a wireframe artifact or can be read as one.
2. Check schema validity and deterministic anti-patterns when possible.
3. Score the eight rubric criteria from `0` to `2`.
4. Sum the score and assign a band:
   - `0-9`: weak
   - `10-13`: usable
   - `14-16`: strong
5. Report specific reasons, affected nodes or sections when possible, and
   concrete repair suggestions.

## Stop Conditions

Consumer commands must stop instead of inventing when a missing input would make
the artifact misleading.

Stop for `create-wireframe` when:

- artifact scope is unknown
- primary goal or success action is unknown
- required content or page type is too vague to choose a register
- output would require final visual design rather than structural planning

Stop for `create-design-spec` when:

- implementation audience is unknown
- source of brand/design-system truth is unknown and recommendations are not
  allowed
- component vocabulary is too weak to specify reusable behavior
- the user expects production UI-kit governance rather than a design spec

Stop for `create-prototype-plan` when:

- source wireframe or node IDs are missing
- key flows are unknown
- overlay, form, route, or state targets cannot be referenced
- the user expects runtime implementation or clickable rendering rather than a
  behavior plan

Stop for `review-generated-wireframe` when:

- no wireframe artifact is supplied
- the artifact cannot be parsed or summarized enough to score
- the requested review requires visual design evidence not present in the
  artifact

## Output Files

Commands should use these default filenames unless the user requests another
target.

| Command | Required Files | Optional Files |
| --- | --- | --- |
| `create-wireframe` | `wireframe.json`, `wireframe-notes.md` | `wireframe-review.md`, `blueprint-lineage.md` |
| `create-design-spec` | `design-spec.md` | `design-spec.json`, `design-system-seed.json`, `style-application.json` |
| `create-prototype-plan` | `prototype-config.json`, `prototype-plan.md` | `component-state-model.json`, `interaction-flow.json`, `prototype-audit.md` |
| `review-generated-wireframe` | `wireframe-review.md` | `wireframe-repair-plan.md` |

When commands are run inside another project, write outputs under an explicit
user-provided directory when available. Otherwise recommend:

```txt
ui-design-intelligence/
  wireframe.json
  wireframe-notes.md
  design-spec.md
  prototype-config.json
  prototype-plan.md
  wireframe-review.md
```

## Markdown vs JSON Decision

- `create-wireframe` emits both JSON and Markdown by default. JSON is the
  machine artifact; Markdown explains assumptions, decisions, and gaps.
- `create-design-spec` emits Markdown by default. JSON is optional until a
  schema-backed design-spec artifact exists.
- `create-prototype-plan` emits both JSON and Markdown by default. JSON is the
  behavior config; Markdown is the runtime handoff plan.
- `review-generated-wireframe` emits Markdown by default because the scorecard
  is primarily a human review artifact.

## Agent And Skill Invocation

Consumer commands use agents for orchestration and skills for specialized
workflow rules.

Default routing:

- `create-wireframe` -> `blueprint-architect`, with `ui-researcher`,
  `ui-specification-analyst`, `ui-interaction-analyst`, and
  `accessibility-reviewer` when evidence or interactions require them.
- `create-design-spec` -> `design-system-architect`, `blueprint-architect`,
  `style-reference-curator`, and `accessibility-reviewer` as needed.
- `create-prototype-plan` -> `prototype-architect`, with
  `blueprint-architect` or `design-system-architect` only when source
  structure or component vocabulary is incomplete.
- `review-generated-wireframe` -> `blueprint-architect` and
  `accessibility-reviewer`; use `ui-audit-lead` when the review is part of a
  broader page or site audit.

Specialist skills remain the source of detailed rules. Consumer commands should
reference them by name and use their handoff boundaries instead of copying their
entire contents.

## Quality Checks

All creation commands must include quality checks before final handoff.

`create-wireframe` checks:

- schema-validity readiness
- selected register or taste-profile rationale
- journey clarity
- one primary action per region
- proof or comparison placement
- state and recovery coverage
- responsive priority
- accessibility notes
- structural anti-pattern absence

`create-design-spec` checks:

- source provenance
- confidence labels for inferred recommendations
- component vocabulary consistency
- state coverage
- responsive behavior
- accessibility constraints
- implementation handoff clarity
- open questions

`create-prototype-plan` checks:

- screen, route, node, state, and focus references
- overlay close and focus return behavior
- form validation and recovery
- keyboard behavior
- responsive conditions
- runtime boundary clarity

`review-generated-wireframe` checks:

- rubric score
- quality band
- specific weak areas
- repair suggestions
- residual risk

## Example Invocation Pattern

Each command should include at least one concrete invocation:

```txt
/create-wireframe
Brief: Create a homepage wireframe for a dental practice focused on booking new
patient consultations. Audience is local adults comparing providers. Primary
action is booking an appointment. Use a conversion register.
```

Commands should also include one short existing-artifact example when relevant,
such as creating a prototype plan from an existing `wireframe.json`.

## Relationship To Recipes

Recipes define the artifact contract. Commands define how to get there.

Consumer command docs should reference:

- `.convention/recipes/wireframe.recipe.md`
- `.convention/recipes/design-spec.recipe.md`
- `.convention/recipes/prototype.recipe.md`

Recipes are the artifact-level source of truth for required inputs, default
pipelines, output files, quality gates, stop conditions, repair guidance, and
handoffs.
