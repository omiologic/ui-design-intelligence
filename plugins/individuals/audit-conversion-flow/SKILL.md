---
name: audit-conversion-flow
description: Audit conversion journeys for CTA timing, proof placement, objection handling, friction, and next-action clarity.
license: See repository LICENSE
---

# Audit Conversion Flow

Use this skill to review whether a conversion journey earns and supports the
desired action.

## Purpose

Evaluate conversion flow clarity, proof order, CTA timing, objection coverage,
form friction, and recovery paths before copy or prototype work ships.

## Philosophy

Conversion audit is not pressure optimization. It checks whether the user has
enough understanding, trust, and low-friction next steps to act responsibly.

## Decision Criteria

1. Use this for booking, lead, signup, purchase, inquiry, and quote flows.
2. Flag premature CTAs, weak proof, hidden friction, and unsupported claims.
3. Preserve sensitive review risks.

## Boundary

- Owns: conversion journey critique and repair guidance.
- Does not own: analytics attribution, A/B testing, pricing claims, legal
  review, or production copy approval.

## References

- `../../../.convention/schemas/user-journey-map.schema.json`
- `../../../.convention/knowledge/schemas/objection-pattern.schema.json`

## Rules

1. Check if the CTA appears after enough context.
2. Check if proof answers the stated objections.
3. Check if forms and dialogs have recovery paths.
4. Do not invent outcomes or guarantees.

## Anti-Patterns

- CTA repetition with no new reason to act.
- Burying objections after the form.
- Treating every conversion goal as lead generation.

## Workflow

1. Identify conversion goal and audience readiness.
2. Review stage order, proof, objections, and CTA timing.
3. Flag friction and missing recovery.
4. Recommend journey, content, or prototype fixes.

## Inline Example

```json
{
  "finding": "cta-before-proof",
  "severity": "high",
  "recommendation": "Move product comparison and support proof before the inquiry CTA."
}
```

## Hand-Offs

Hand off journey fixes to `generate-conversion-journey`, objection gaps to
`generate-objection-map`, and copy repair to `generate-cta-copy`.
