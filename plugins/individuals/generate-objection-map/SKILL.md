---
name: generate-objection-map
description: Generate objection maps that capture user concerns, journey-stage friction, response strategies, and content moves.
license: See repository LICENSE
---

# Generate Objection Map

Use this skill when a journey or conversion path needs explicit objection and
friction handling.

## Purpose

Map user concerns, friction points, response strategies, required proof, and
content moves that should influence journey, blueprint, and copy decisions.

## Philosophy

Objections are not negative copy prompts. They are decision risks that should be
answered honestly with proof, clarity, comparison, or recovery paths.

## Decision Criteria

1. Use this when users may hesitate because of price, trust, effort, risk,
   suitability, compliance, or product choice.
2. Use evidence from studies or knowledge patterns where possible.
3. Mark unsupported claim areas for review.

## Boundary

- Owns: objection type, user concern, response strategy, and content moves.
- Does not own: final proof claims, legal approval, pricing accuracy, or layout.

## References

- `../../../.convention/content/objection-handling-reference.md`
- `../../../knowledge/schemas/objection-pattern.schema.json`
- `../../../docs/interop/content-journey-layer-architecture.md`

## Rules

1. Tie each objection to a journey stage.
2. Use content moves that can be implemented by later copy skills.
3. Do not invent proof or claims.
4. Include review risks for sensitive domains.
5. Use objection handling guidance to categorize price, trust, complexity,
   effort, risk, compatibility, time, switching cost, privacy, safety, and proof
   gap concerns.

## Anti-Patterns

- Treating objections as aggressive sales pressure.
- Hiding uncertainty or eligibility constraints.
- Using generic reassurance without evidence.

## Workflow

1. Identify likely objections from audience, product, and journey.
2. Group objections by stage and concern type.
3. Select safe response patterns and required proof or review metadata.
4. Recommend honest content moves and proof needs.
5. Hand off to journey and content skills.

## Inline Example

```json
{
  "objection": "I am not sure which model fits my work.",
  "responseStrategy": "Offer guided comparison before inquiry.",
  "contentMoves": ["comparison-copy", "guided-dialog", "specialist-cta"]
}
```

## Hand-Offs

Hand off reusable records to `extract-copy-patterns-from-study`, journey
updates to `generate-conversion-journey`, and copy to `generate-section-copy`.
