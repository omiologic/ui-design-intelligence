---
name: generate-cta-copy
description: Generate clear CTA labels and supporting action copy aligned to journey stage, conversion goal, and component context.
license: See repository LICENSE
---

# Generate CTA Copy

Use this skill when buttons, links, sticky bars, dialogs, or forms need clear
action language.

## Purpose

Generate primary, secondary, and tertiary CTA labels with supporting copy that
matches the user readiness and conversion goal.

## Philosophy

CTA copy should name the next action honestly. It should not oversell,
manipulate, or ask for commitment before the journey has earned it.

## Decision Criteria

1. Use this when a journey stage and action target are known.
2. Use different labels for different user intents.
3. Keep sensitive promises out of CTA text unless approved.

## Boundary

- Owns: CTA labels and local action-support copy.
- Does not own: conversion strategy, route behavior, form submission, pricing,
  or final approval.

## References

- `../../../shared/content/claim-risk-guidelines.md`
- `../../../shared/content/cta-patterns.md`
- `../../../shared/content/laws-of-copywriting.md`
- `../../../knowledge/schemas/copy-pattern.schema.json`
- `../../../shared/schemas/content-model.schema.json`

## Rules

1. Make the action explicit.
2. Align CTA strength with user readiness.
3. Keep labels short and scannable.
4. Avoid vague labels like "Learn More" when a clearer action exists.
5. Use the laws-of-copywriting reference to confirm the CTA has been earned by
   decision readiness, benefit clarity, proof, and objection handling.
6. Use the CTA patterns reference to choose labels by intent, journey stage,
   interaction risk, and CTA hierarchy.
7. Use claim-risk guidelines before including savings, availability, response
   time, eligibility, compatibility, safety, performance, or outcome language in
   CTA text.

## Anti-Patterns

- Multiple competing primary CTAs.
- Commitment-heavy copy in awareness stages.
- Unsupported urgency.

## Workflow

1. Identify stage, goal, and action target.
2. Check whether the laws-of-copywriting readiness questions support the
   requested CTA strength.
3. Select the CTA intent pattern and hierarchy: primary, secondary, tertiary,
   destructive, or disabled.
4. Draft labels and supporting copy with tone variation that preserves the same
   user intent.
5. Check CTA claims against claim-risk categories.
6. Check consistency across repeated CTA locations.
7. Mark review risks.

## Inline Example

```json
{
  "journeyStage": "solution-evaluation",
  "primaryCTA": "Compare Models",
  "secondaryCTA": "Ask a Specialist"
}
```

## Hand-Offs

Hand off conversion-stage issues to `generate-conversion-journey` and placement
to `generate-content-model-from-blueprint`.
