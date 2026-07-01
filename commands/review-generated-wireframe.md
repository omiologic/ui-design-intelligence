# Review Generated Wireframe

## Purpose

Review a generated wireframe for structural quality, not only schema validity.
The command scores the artifact against `shared/quality/blueprint-quality-rubric.md`,
assigns a quality band, explains why the wireframe is weak, usable, or strong,
and gives repair recommendations.

This is a judgment-led review workflow. Deterministic validators can support the
review, but they do not replace the rubric score.

## Use When

- A generated `wireframe.json`, UIBlueprint, or wireframe plan needs quality
  review before design-spec, prototype, or implementation handoff.
- The user asks whether a generated wireframe is weak, usable, or strong.
- The artifact passes schema checks but may still have weak journey, proof,
  state, register, accessibility, responsive, or anti-pattern quality.

## Required Inputs

- Generated wireframe JSON, UIBlueprint, or a clear wireframe artifact.
- Blueprint quality rubric: `shared/quality/blueprint-quality-rubric.md`.
- Original brief, user goal, or review scope when available.

## Optional Inputs

- `wireframe-notes.md`.
- `shared/recipes/wireframe.recipe.md`.
- Study output, audit findings, design-system seed, style reference, or
  knowledge lineage.
- Target register or taste profile.
- Deterministic validation output from schema, examples, or anti-pattern
  scripts.
- Output directory.

## Missing Input Questions

Ask at most three blocking questions before proceeding.

Default questions:

1. Which wireframe artifact should be reviewed?
2. Should the score use the supplied brief/user goal or only structural quality?
3. What register should the artifact be judged against: conversion,
   utility-product, dashboard, form flow, or another stated context?

If the original brief is missing, proceed only with structural quality and state
that the score cannot fully judge goal fit.

## Default Pipeline

1. Confirm the input is a readable wireframe artifact or can be summarized as
   one.
2. Identify source brief, primary user, primary goal, success action, and target
   register when available.
3. Run or consult schema validation when possible.
4. Run or consult deterministic anti-pattern checks when possible, especially
   `scripts/validate-blueprint-antipatterns.mjs`.
5. Review against the eight rubric criteria from
   `shared/quality/blueprint-quality-rubric.md`.
6. Score each criterion from `0` to `2`:
   - `0`: missing, confusing, wrong, or actively harmful.
   - `1`: present but weak, incomplete, generic, or poorly prioritized.
   - `2`: clear, fit-for-purpose, and useful for downstream handoff.
7. Sum the score and assign a band:
   - `0-9`: weak
   - `10-13`: usable
   - `14-16`: strong
8. Explain each score with concrete evidence from the artifact.
9. List repair recommendations in priority order.
10. State whether the artifact is ready for design-spec, prototype-plan, or
    implementation handoff.

## Stop Conditions

Stop and ask for input when:

- No wireframe artifact is supplied.
- The artifact cannot be parsed, read, or summarized enough to score.
- The requested review depends on visual design evidence not present in the
  wireframe artifact.
- The user expects an objective automated grade for judgment-led criteria.

Do not infer product claims, proof quality, brand taste, visual elegance, or
implementation correctness beyond what the artifact and supporting brief show.

## Outputs

- `wireframe-review.md`: scorecard, quality band, evidence, weak spots, repair
  recommendations, and handoff readiness.
- Optional `wireframe-repair-plan.md` when the artifact needs substantial
  revision before downstream use.

`wireframe-review.md` should use this shape:

```md
# Wireframe Review

## Summary

- Score: 0-16
- Band: weak | usable | strong
- Readiness: not ready | design review needed | ready for downstream handoff

## Scorecard

| Criterion | Score | Evidence | Repair |
| --- | ---: | --- | --- |

## Blocking Issues

## Repair Recommendations

## Handoff Guidance

## Residual Risk
```

## Quality Checks

- The review distinguishes schema validity from quality.
- The scorecard covers all eight rubric criteria:
  - journey clarity
  - single primary action
  - proof placement
  - state coverage
  - register fit
  - landmark coverage
  - responsive priority
  - anti-pattern absence
- The quality band is consistent with the score:
  - `0-9`: weak
  - `10-13`: usable
  - `14-16`: strong
- Each criterion has evidence and repair guidance.
- Findings name affected nodes, sections, overlays, or responsive notes when
  possible.
- Repair recommendations are prioritized by downstream risk.
- The review states whether the wireframe is ready for design-spec,
  prototype-plan, or implementation handoff.

## Agents

- Required: `blueprint-architect`.
- Required when landmarks, focus, labels, forms, overlays, keyboard behavior, or
  responsive accessibility affect the score: `accessibility-reviewer`.
- Optional when review scope comes from broader site or page audit:
  `ui-audit-lead`.

## Skills

- `wireframe-schema`
- `accessibility-wireframe-review`
- `layout-specification`
- `interaction-patterns`
- Optional supporting scripts:
  `scripts/validate-blueprint-antipatterns.mjs`,
  `scripts/validate-examples.mjs`

## Example Invocation

```txt
/review-generated-wireframe
Wireframe: ui-design-intelligence/wireframe.json
Brief: Dental homepage for new patients comparing providers and booking an
appointment.
Register: conversion
Review against the blueprint quality rubric and report weak, usable, or strong.
```

Existing-artifact example:

```txt
/review-generated-wireframe
Wireframe: ui-design-intelligence/product-page/wireframe.json
Notes: ui-design-intelligence/product-page/wireframe-notes.md
Score against structural quality only if the original brief is unavailable.
```

## Inputs

Use `## Required Inputs` and `## Optional Inputs` as the source of truth for this
consumer command. This compatibility section exists because bundle validation
expects every installed command to expose an `Inputs` section.

## Workflow

Use `## Default Pipeline` as the source of truth for this consumer command. This
compatibility section exists because bundle validation expects every installed
command to expose a `Workflow` section.
