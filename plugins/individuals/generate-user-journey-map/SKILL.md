---
name: generate-user-journey-map
description: Generate schema-facing user journey maps that define audience goals, stages, needs, objections, and content goals before copy or prototype work.
license: See repository LICENSE
---

# Generate User Journey Map

Use this skill when a brief needs a `UserJourneyMap` before blueprint copy,
content models, or prototype behavior are generated.

## Purpose

Generate a user journey map with audience, primary goal, stages, user questions,
user needs, content goals, recommended sections, copy strategy, and review
metadata.

## Philosophy

Journey maps are strategy artifacts, not page layouts. They should explain why
each stage exists and what the user needs before asking content or prototype
skills to produce node-level details.

## Decision Criteria

1. Use this before content generation when user intent or stage order is not
   explicit.
2. Prefer evidence from study output, knowledge patterns, and user-provided
   goals.
3. Mark assumptions and review risks instead of filling gaps with generic
   conversion advice.

## Boundary

- Owns: audience intent, journey stages, needs, objections, content goals, and
  section recommendations.
- Does not own: blueprint node hierarchy, final copy, visual design, runtime
  interactions, analytics instrumentation, or production content approval.

## References

- `../../../docs/interop/content-journey-layer-architecture.md`
- `../../../shared/content/audience-intent-reference.md`
- `../../../shared/content/objection-handling-reference.md`
- `../../../shared/schemas/user-journey-map.schema.json`
- `../../../knowledge/schemas/journey-pattern.schema.json`

## Rules

1. Keep stages user-centered and goal-driven.
2. Include user questions and needs for every stage.
3. Preserve uncertainty in notes or review metadata.
4. Do not generate final copy or new blueprint nodes.
5. Use audience intent guidance to map readiness and emotional state to user
   questions, content needs, proof needs, CTA posture, and tone considerations.
6. Use objection handling guidance to capture likely friction and safe response
   patterns before recommending conversion actions.

## Anti-Patterns

- Treating a journey map as a sitemap.
- Writing polished marketing copy before structure exists.
- Omitting objections or friction points.

## Workflow

1. Identify audience, context, and primary goal.
2. Classify audience awareness, readiness, and emotional state.
3. Draft stage sequence from awareness through action or completion.
4. Add questions, needs, objections, content goals, and recommended sections.
5. Map objections to content moves, proof needs, and review risks.
6. Add source, confidence, status, and review notes.
7. Hand off to blueprint or content-model generation.

## Inline Example

```json
{
  "version": "0.1.0",
  "type": "userJourneyMap",
  "id": "dental-booking-journey",
  "name": "Dental Booking Journey",
  "source": { "source": "generated", "confidence": "medium", "sourceRefs": ["brief"] },
  "audience": { "primary": "New patients", "intent": "Choose a clinic and book" },
  "primaryGoal": "appointment-booking",
  "stages": [
    {
      "id": "trust-building",
      "label": "Trust Building",
      "userQuestion": "Can I trust this clinic?",
      "userNeed": "Proof, services, and reassurance.",
      "contentGoal": "Reduce uncertainty before booking.",
      "recommendedSections": ["hero", "proof", "services"],
      "copyStrategy": "Use calm, specific reassurance."
    }
  ],
  "review": { "status": "draft", "needsReview": ["clientApproval"] }
}
```

## Hand-Offs

Hand off structure decisions to `page-wireframe-planner`, node-tied copy to
`generate-content-model-from-blueprint`, and journey quality review to
`audit-user-journey`.
