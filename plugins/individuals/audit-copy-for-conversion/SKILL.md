---
name: audit-copy-for-conversion
description: Audit generated copy for conversion clarity, CTA consistency, proof support, friction, and responsible action language.
license: See repository LICENSE
---

# Audit Copy For Conversion

Use this skill when copy should support booking, inquiry, signup, purchase,
quote, or other conversion goals.

## Purpose

Evaluate whether copy makes the next action clear, earns the CTA, answers
objections, supports proof, and avoids unsupported urgency or claims.

## Philosophy

Conversion copy should reduce uncertainty, not pressure users. It should make a
clear next step feel understandable and low-friction.

## Decision Criteria

1. Use this for landing pages, product pages, service pages, lead forms, and
   prototype flows with conversion goals.
2. Check CTA labels against journey readiness.
3. Treat claims and urgency as review-sensitive.

## Boundary

- Owns: conversion-copy findings and remediation guidance.
- Does not own: A/B testing, analytics attribution, final offer strategy,
  pricing approval, or legal review.

## References

- `../../../.convention/content/claim-risk-guidelines.md`
- `../../../.convention/content/cta-patterns.md`
- `../../../.convention/content/copy-quality-checklist.md`
- `../../../.convention/content/laws-of-copywriting.md`
- `../../../.convention/content/objection-handling-reference.md`
- `../../../.convention/content/page-message-architecture.md`
- `../../../.convention/content/proof-and-credibility-patterns.md`
- `../../../knowledge/schemas/copy-pattern.schema.json`
- `../../../.convention/schemas/content-model.schema.json`
- `../../../.convention/schemas/user-journey-map.schema.json`

## Rules

1. Check CTA clarity and consistency.
2. Check whether proof appears before commitment.
3. Flag friction and missing recovery copy.
4. Do not invent performance claims.
5. Use the laws-of-copywriting reference to flag weak benefit clarity, missing
   proof, unhandled objections, unsupported urgency, and unclear action
   readiness.
6. Use the copy quality checklist for deterministic pass/fail checks before
   calling conversion copy ready for handoff.
7. Use the CTA patterns reference to flag vague, misleading, overpromising,
   mismatched, destructive, disabled, or hierarchy-conflicting CTAs.
8. Use claim-risk guidelines to separate unsupported claims from legal, medical,
   financial, compliance, pricing, product, or client approval blockers.
9. Use proof and credibility patterns to flag vague proof, invented proof,
   unsupported badges, weak comparison proof, and proof placed after the CTA it
   needs to support.
10. Use page message architecture to verify conversion CTAs appear after the
   message sequence has answered the relevant user questions.
11. Use objection handling guidance to flag unhandled objections and risky
   responses that rely on unsupported reassurance, guarantees, or pressure.

## Anti-Patterns

- Unsupported urgency.
- Multiple primary CTAs in the same decision point.
- Asking users to commit before comparison or proof.

## Workflow

1. Identify conversion goal and CTA set.
2. Review the laws-of-copywriting decision questions against the page or flow.
3. Compare each CTA against intent, hierarchy, journey stage, and interaction
   risk patterns.
4. Review proof type, source, placement, and required evidence.
5. Review page-type sequence, objections, response patterns, and action
   language.
6. Flag gaps and risky claims using the claim-risk categories.
7. Recommend copy repairs.

## Inline Example

```json
{
  "finding": "cta-not-earned",
  "nodeId": "hero-section",
  "recommendation": "Use a guidance CTA until proof and comparison appear."
}
```

## Hand-Offs

Hand off CTA repair to `generate-cta-copy`, journey repair to
`generate-conversion-journey`, and copy-pattern extraction to
`extract-copy-patterns-from-study`.
