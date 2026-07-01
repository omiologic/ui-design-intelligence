---
name: audit-user-journey
description: Audit user journey maps for goal clarity, stage logic, objection coverage, content fit, and handoff readiness.
license: See repository LICENSE
---

# Audit User Journey

Use this skill to review a proposed user journey map before it drives blueprint,
content, or prototype work.

## Purpose

Evaluate whether the journey has a clear audience, goal, stage sequence, user
needs, objections, content goals, evidence, and safe handoffs.

## Philosophy

A weak journey creates generic copy and arbitrary prototype paths. Audit should
surface the missing decisions before downstream artifacts hide them.

## Decision Criteria

1. Use this before content generation when the journey is new or high-stakes.
2. Flag missing audience, goal, stage order, objections, or review risks.
3. Distinguish fixable gaps from blockers.

## Boundary

- Owns: journey quality review and remediation guidance.
- Does not own: rewriting the full journey, final copy, layout, or runtime
  behavior.

## References

- `../../../.convention/content/objection-handling-reference.md`
- `../../../.convention/schemas/user-journey-map.schema.json`
- `../../../docs/interop/content-journey-layer-architecture.md`

## Rules

1. Lead with concrete findings.
2. Cite stage IDs or missing fields.
3. Identify downstream risk for copy, blueprint, or prototype work.
4. Do not grade visual design.
5. Use objection handling guidance to flag missing price, trust, complexity,
   effort, risk, compatibility, time, switching cost, privacy, safety, or
   proof-gap concerns.

## Anti-Patterns

- Approving vague stage labels with no user need.
- Treating missing objections as harmless.
- Rewriting the artifact without naming the issue.

## Workflow

1. Check audience and primary goal.
2. Review stage sequence and user questions.
3. Check objections, response patterns, content goals, and handoffs.
4. Report blockers, fixes, and readiness.

## Inline Example

```json
{
  "finding": "conversion-stage-missing-objection",
  "severity": "medium",
  "recommendation": "Add risk and effort objections before CTA copy is generated."
}
```

## Hand-Offs

Hand off journey repair to `generate-user-journey-map` and conversion-specific
issues to `audit-conversion-flow`.
