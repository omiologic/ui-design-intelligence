---
name: generate-content-journey-map
description: Generate content journey maps that translate user stages into section content goals, copy roles, and content handoffs.
license: See repository LICENSE
---

# Generate Content Journey Map

Use this skill when a journey needs content-specific direction before copy is
written.

## Purpose

Map journey stages to content goals, copy roles, recommended sections,
microcopy needs, proof needs, and downstream content model requirements.

## Philosophy

Content journey mapping is the bridge between strategy and copy. It should say
what each content area must accomplish before any writer fills the node.

## Decision Criteria

1. Use this after a user journey map exists.
2. Use it before content-model generation for complex pages or prototypes.
3. Include proof, CTA, and microcopy requirements when they affect trust.

## Boundary

- Owns: content goals, copy roles, and section-level content strategy.
- Does not own: final copy, node hierarchy, visual treatment, or interactions.

## References

- `../../../.convention/content/audience-intent-reference.md`
- `../../../.convention/content/objection-handling-reference.md`
- `../../../.convention/schemas/user-journey-map.schema.json`
- `../../../.convention/schemas/content-model.schema.json`
- `../../../.convention/workflows/content-journey-layer-architecture.md`

## Rules

1. Tie every content goal to a journey stage.
2. Use copy roles such as headline, body, proof, CTA, helper text, or error.
3. Do not create final copy.
4. Mark missing structure as a handoff to blueprint planning.
5. Use audience intent guidance to match copy roles, proof needs, CTA posture,
   microcopy depth, and tone restraint to user readiness.
6. Use objection handling guidance to map objections to page sections, FAQ
   entries, comparison copy, form support, and CTA support copy.

## Anti-Patterns

- Writing full marketing sections in the journey map.
- Ignoring component anatomy and copy fit.
- Treating all sections as awareness content.

## Workflow

1. Read the journey stages and page goal.
2. Identify audience readiness and emotional state for each stage.
3. Assign content jobs and copy roles per stage.
4. Identify required proof, microcopy, and objection responses.
5. Hand off content-model requirements.

## Inline Example

```json
{
  "stage": "solution-evaluation",
  "contentGoal": "Help users compare options.",
  "copyRoles": ["headline", "comparison-body", "primaryCTA"]
}
```

## Hand-Offs

Hand off final copy to `generate-content-model-from-blueprint` and CTA language
to `generate-cta-copy`.
