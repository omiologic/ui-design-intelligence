---
name: generate-content-model-from-blueprint
description: Generate node-tied ContentModel JSON from a source blueprint, journey map, brand voice, and optional knowledge patterns.
license: See repository LICENSE
---

# Generate Content Model From Blueprint

Use this skill after a journey map and blueprint exist and the workflow needs
realistic copy tied to blueprint node IDs.

## Purpose

Generate `ContentModel` data that fills blueprint nodes with role-aware copy,
source, confidence, status, and review-risk metadata.

## Philosophy

Structure constrains copy. The content model should fit existing node IDs and
component anatomy instead of inventing a parallel page or writing long copy that
cannot fit the planned structure.

## Decision Criteria

1. Use this after `UserJourneyMap` and `WireframeConfig` exist.
2. Use brand voice and content knowledge when available.
3. Stop when source node IDs or content goals are missing.

## Boundary

- Owns: node-tied content model entries and copy metadata.
- Does not own: blueprint structure, final production approval, prototype
  events, visual design, CMS publishing, or legal review.

## References

- `../../../.convention/workflows/content-journey-layer-architecture.md`
- `../../../.convention/content/audience-intent-reference.md`
- `../../../.convention/content/claim-risk-guidelines.md`
- `../../../.convention/content/cta-patterns.md`
- `../../../.convention/content/content-pattern-library.md`
- `../../../.convention/content/laws-of-copywriting.md`
- `../../../.convention/content/page-message-architecture.md`
- `../../../.convention/content/proof-and-credibility-patterns.md`
- `../../../.convention/schemas/content-model.schema.json`
- `../../../.convention/schemas/wireframe-config.schema.json`
- `../../../.convention/schemas/user-journey-map.schema.json`

## Rules

1. Reference blueprint nodes with `nodeId`.
2. Preserve source, confidence, status, and `needsReview`.
3. Keep copy length appropriate to node role.
4. Do not create new layout hierarchy.
5. Use the laws-of-copywriting reference for decision sequence, benefit
   translation, proof, objections, and CTA readiness.
6. Use the content pattern library to choose generic section structures unless
   a sourced knowledge `copyPattern` is more specific.
7. Use CTA patterns to keep node-tied action labels aligned to intent, journey
   stage, hierarchy, and interaction risk.
8. Use claim-risk guidelines to set `needsReview`, avoid `productionReady`, and
   rewrite unsupported claims into source-safe draft language.
9. Use proof and credibility patterns to choose evidence-backed proof structures
   without fabricating testimonials, stats, badges, guarantees, or case studies.
10. Use page message architecture to map journey-stage user questions, content
   goals, and section roles onto existing blueprint node order.
11. Use audience intent guidance to keep node copy pressure, proof, CTA posture,
   tone, and microcopy depth aligned to user readiness.

## Anti-Patterns

- Free-floating copy with no node ID.
- Production-ready claims without approval.
- Copy that ignores journey stage or component anatomy.

## Workflow

1. Read journey, blueprint, brand voice, content patterns, CTA patterns, and
   claim-risk guidelines.
2. Identify audience readiness for each relevant journey stage.
3. Select the page message architecture for the page type and user intent.
4. Select generic or knowledge-backed patterns for each section role.
5. Map section nodes to journey stages, user questions, and content goals.
6. Select proof patterns for claim-bearing or trust-sensitive nodes.
7. Generate copy fields with provenance metadata.
8. Mark sensitive claims for review using the claim-risk categories.
9. Validate against `content-model.schema.json`.

## Inline Example

```json
{
  "type": "contentModel",
  "sourceBlueprintId": "product-page",
  "sections": [
    {
      "nodeId": "hero-section",
      "journeyStage": "awareness",
      "contentGoal": "Explain the offer clearly.",
      "copy": {
        "headline": {
          "value": "Compare lighting options with confidence",
          "source": "generated",
          "confidence": "medium",
          "status": "draft"
        }
      },
      "review": { "status": "draft", "needsReview": ["productSpecs"] }
    }
  ]
}
```

## Hand-Offs

Hand off journey gaps to `generate-content-journey-map`, CTA wording to
`generate-cta-copy`, prototype-ready copy to `generate-prototype-copy`, and
quality review to `audit-prototype-copy`.
