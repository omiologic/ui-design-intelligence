---
name: audit-copy-for-user-journey
description: Audit generated UX copy against user journey stages, user questions, content goals, and node-level handoffs.
license: See repository LICENSE
---

# Audit Copy For User Journey

Use this skill when generated copy must be checked against the intended user
journey before prototype or client review.

## Purpose

Find copy that misses the user need, answers the wrong journey stage, skips an
objection, or fails to support the next handoff.

## Philosophy

Copy is only useful if it helps the user move through the intended journey.
Well-written text can still be wrong when it appears too early, too late, or in
the wrong node.

## Decision Criteria

1. Use this after content-model or prototype-copy generation.
2. Compare copy fields to journey stages and content goals.
3. Flag copy that is generic, premature, or detached from user questions.

## Boundary

- Owns: journey alignment findings for copy.
- Does not own: full copy rewrite, page structure, conversion analytics, brand
  approval, or legal review.

## References

- `../../../.convention/content/audience-intent-reference.md`
- `../../../.convention/content/claim-risk-guidelines.md`
- `../../../.convention/content/content-accessibility-guidelines.md`
- `../../../.convention/content/copy-quality-checklist.md`
- `../../../.convention/content/laws-of-copywriting.md`
- `../../../.convention/content/objection-handling-reference.md`
- `../../../.convention/content/page-message-architecture.md`
- `../../../.convention/schemas/user-journey-map.schema.json`
- `../../../.convention/schemas/content-model.schema.json`
- `../../../.convention/workflows/content-journey-layer-architecture.md`

## Rules

1. Cite journey stage IDs and node IDs.
2. Distinguish missing content from misplaced content.
3. Preserve review-risk flags.
4. Do not judge visual design.
5. Use the laws-of-copywriting reference to check whether each stage answers
   the user's decision question, benefit need, proof need, and objection.
6. Use the copy quality checklist to flag unclear copy, missing benefits,
   unsupported proof, unhandled objections, and unearned CTAs at the node level.
7. Use claim-risk guidelines when journey-stage copy asks users to trust
   unsupported regulated, pricing, product, performance, compatibility, or
   availability claims before review.
8. Use page message architecture to flag section-order mismatches, missing user
   questions, premature CTAs, and free-floating copy that is not node-tied.
9. Use audience intent guidance to flag copy that assumes the wrong awareness,
   readiness, emotional state, proof need, CTA posture, or tone restraint.
10. Use objection handling guidance to flag missing objection responses or
   responses that use unsupported reassurance instead of proof, process, policy,
   comparison, support, or recovery.
11. Use content accessibility guidelines to flag journey copy that uses
   inaccessible labels, vague links, jargon, idioms, excessive cognitive load,
   or unclear recovery paths.

## Anti-Patterns

- Approving polished copy that ignores the stage.
- Treating every section as conversion-ready.
- Ignoring unresolved objections.

## Workflow

1. Read journey stages and content model entries.
2. Compare copy to audience state, user question, need, and content goal.
3. Check decision sequence, benefit clarity, proof, objections, and CTA
   readiness.
4. Compare section roles against the page type's message architecture.
5. Check objection coverage and response quality before commitment-heavy stages.
6. Check content accessibility against user readiness and journey context.
7. Check claim-risk timing before commitment-heavy journey stages.
8. Identify gaps, mismatches, and premature CTAs.
9. Recommend specific copy or journey repairs.

## Inline Example

```json
{
  "finding": "copy-stage-mismatch",
  "nodeId": "comparison-section",
  "journeyStage": "solution-evaluation",
  "recommendation": "Replace broad awareness copy with comparison language."
}
```

## Hand-Offs

Hand off journey repair to `generate-content-journey-map`, section copy repair
to `generate-section-copy`, and broader prototype-copy issues to
`audit-prototype-copy`.
