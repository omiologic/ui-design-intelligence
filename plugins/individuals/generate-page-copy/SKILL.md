---
name: generate-page-copy
description: Generate page-level UX copy direction and draft copy from journey strategy, blueprint structure, and brand voice.
license: See repository LICENSE
---

# Generate Page Copy

Use this skill for page-level copy once audience, journey, and structure are
known.

## Purpose

Generate page-level headline, body, proof, CTA, and support copy aligned to the
journey and blueprint.

## Philosophy

Page copy should serve the page journey. It should not flatten every section
into the same message or overwrite section-specific content goals.

## Decision Criteria

1. Use this after page flow or journey is clear.
2. Use section-level skills when only one section needs copy.
3. Preserve claims and approval risks.

## Boundary

- Owns: page-level copy strategy and draft copy.
- Does not own: node hierarchy, SEO metadata, production approval, or detailed
  prototype state copy.

## References

- `../../../.convention/content/audience-intent-reference.md`
- `../../../.convention/content/claim-risk-guidelines.md`
- `../../../.convention/content/content-accessibility-guidelines.md`
- `../../../.convention/content/content-pattern-library.md`
- `../../../.convention/content/cta-patterns.md`
- `../../../.convention/content/laws-of-copywriting.md`
- `../../../.convention/content/objection-handling-reference.md`
- `../../../.convention/content/page-message-architecture.md`
- `../../../.convention/content/proof-and-credibility-patterns.md`
- `../../../.convention/schemas/content-model.schema.json`
- `../../../.convention/schemas/brand-voice.schema.json`
- `../../../.convention/workflows/content-journey-layer-architecture.md`

## Rules

1. Tie page copy to journey stages.
2. Keep CTAs consistent with the conversion goal.
3. Avoid unsupported claims.
4. Prefer node-tied output when a blueprint exists.
5. Use the laws-of-copywriting reference to check message sequence, benefit
   clarity, proof, objections, and action readiness.
6. Use the content pattern library to choose page-section structures before
   writing section copy.
7. Use CTA patterns to match page-level labels to user intent, journey stage,
   CTA hierarchy, and interaction risk.
8. Use claim-risk guidelines to downgrade unsupported claims, add `needsReview`,
   and avoid production-ready status when approval is missing.
9. Use proof and credibility patterns to select testimonials, stats,
   certifications, case studies, expert proof, guarantees, trust badges,
   comparison proof, or process proof only when evidence supports them.
10. Use page message architecture to choose message sequence by page type, user
   intent, journey stage, user question, content goal, and section role.
11. Use audience intent guidance to match copy depth, proof, CTA posture, and
   tone restraint to awareness, readiness, and emotional state.
12. Use objection handling guidance to answer price, trust, complexity, effort,
   risk, compatibility, time, switching cost, privacy, safety, and proof-gap
   concerns without unsupported claims.
13. Use content accessibility guidelines to keep page-level headings, links,
   CTAs, forms, dialogs, empty states, and support content understandable
   without relying on visual context.

## Anti-Patterns

- Generic hero-copy-only output.
- Repeating the same CTA without new context.
- Ignoring proof and objections.

## Workflow

1. Read journey, blueprint, and brand voice.
2. Identify audience state and readiness for the page or stage.
3. Select page message architecture for the page type and intent.
4. Select content patterns for hero, proof, comparison, FAQ, pricing, form, or
   state sections as needed.
5. Select proof patterns and required evidence for proof-bearing sections.
6. Select CTA intent and hierarchy patterns for page-level actions.
7. Map objections to FAQ, comparison, proof, form support, or CTA support copy.
8. Check page-level content accessibility for links, buttons, jargon, cognitive
   load, and recovery paths.
9. Identify page-level message hierarchy.
10. Draft copy by section role.
11. Mark claim-risk categories, review risks, and handoffs.

## Inline Example

```json
{
  "pageMessage": "Clinical lighting comparison for dentists",
  "primaryCTA": "Request Product Guidance",
  "review": ["productSpecs", "clientApproval"]
}
```

## Hand-Offs

Hand off section details to `generate-section-copy`, content model assembly to
`generate-content-model-from-blueprint`, and copy audit to
`audit-prototype-copy`.
