# Generate User Journey Map

## Purpose

Generate a `UserJourneyMap` artifact that defines audience, primary goal,
journey stages, user questions, needs, objections, content goals, and copy
strategy before blueprint or content generation.

## Use When

- A page, flow, or prototype brief lacks clear journey-stage logic.
- Content generation needs audience intent and stage order before copy is
  written.
- Blueprint planning needs user questions, objections, or conversion path
  context.

## Inputs

- Industry, product, service, or feature context.
- Audience and primary user goal.
- Page type, flow type, or prototype scope.
- Conversion goal or completion condition when relevant.
- Optional study output, knowledge patterns, brand voice, or existing brief.

Stop when audience, primary goal, or source truth is unknown.

## Workflow

1. Use `user-journey-architect` to confirm audience, primary goal, scope, and
   source truth.
2. Use `generate-user-journey-map` to draft journey stages, user questions,
   needs, content goals, recommended sections, and copy strategy.
3. Use `generate-objection-map` when trust, risk, pricing, effort, product
   choice, or eligibility concerns affect the path.
4. Use `audit-user-journey` to check stage clarity and handoff readiness.
5. Hand the settled journey to blueprint, content, or prototype workflows.

## Outputs

- `journey-map.json` or schema-ready `UserJourneyMap`.
- Optional `journey-map.md` summary with assumptions and open questions.
- Handoff notes for blueprint, content model, or prototype flow generation.

## Agents

- `user-journey-architect`
- Optional: `ux-content-strategist`

## Skills

- `generate-user-journey-map`
- `generate-objection-map`
- `audit-user-journey`
- Optional: `generate-conversion-journey`
- Optional: `generate-content-journey-map`
