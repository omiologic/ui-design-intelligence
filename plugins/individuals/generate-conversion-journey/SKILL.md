---
name: generate-conversion-journey
description: Generate conversion-focused journey strategy that maps decision stages, proof needs, objections, and next-action logic.
license: See repository LICENSE
---

# Generate Conversion Journey

Use this skill when the primary journey goal is a lead, booking, purchase,
signup, inquiry, or other conversion action.

## Purpose

Generate journey strategy for conversion paths, including decision stages,
friction, proof needs, CTA timing, and handoff requirements for content and
blueprint generation.

## Philosophy

Conversion journeys should earn the action. They must place context, proof,
comparison, and reassurance before asking for commitment when the audience still
has unresolved questions.

## Decision Criteria

1. Use this for landing pages, product pages, service pages, booking flows, and
   lead forms.
2. Identify the conversion goal before recommending sections or CTAs.
3. Use objections and proof needs to shape stage order.

## Boundary

- Owns: conversion stage logic, objections, proof timing, and CTA strategy.
- Does not own: final CTA copy, pricing claims, layout hierarchy, form schema,
  or performance analytics.

## References

- `../../../.convention/workflows/content-journey-layer-architecture.md`
- `../../../.convention/content/audience-intent-reference.md`
- `../../../.convention/content/objection-handling-reference.md`
- `../../../.convention/schemas/user-journey-map.schema.json`
- `../../../.convention/knowledge/schemas/journey-pattern.schema.json`

## Rules

1. State the primary conversion goal explicitly.
2. Include a clear stage before final action.
3. Avoid pushy or unsupported conversion claims.
4. Mark pricing, medical, legal, or product-spec claims for review.
5. Use audience intent guidance to avoid purchase-ready CTAs for unaware,
   anxious, skeptical, comparison-ready, or returning users unless readiness is
   supported.
6. Use objection handling guidance to place price, trust, complexity, effort,
   risk, compatibility, time, switching cost, privacy, safety, and proof-gap
   responses before commitment.

## Anti-Patterns

- CTA-first journeys with no trust or decision support.
- Treating all audiences as ready to buy.
- Hiding risk or eligibility questions.

## Workflow

1. Parse audience, offer, and conversion goal.
2. Classify audience readiness and emotional state.
3. Identify likely objections and proof needs.
4. Select response patterns for unresolved objections.
5. Map stages from problem or need through action.
6. Recommend content roles and section order.
7. Hand off to blueprint and content skills.

## Inline Example

```json
{
  "primaryGoal": "product-inquiry",
  "stages": [
    {
      "id": "solution-evaluation",
      "userQuestion": "Which option fits my work?",
      "userNeed": "Compare choices clearly.",
      "contentGoal": "Support comparison before inquiry.",
      "copyStrategy": "Use practical decision-support language."
    }
  ]
}
```

## Hand-Offs

Hand off objection details to `generate-objection-map`, content sequencing to
`generate-content-journey-map`, and CTA wording to `generate-cta-copy`.
