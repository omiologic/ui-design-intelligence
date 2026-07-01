---
name: generate-page-user-flow
description: Generate page-level user flow strategy that connects page sections, user decisions, and next actions without creating layout trees.
license: See repository LICENSE
---

# Generate Page User Flow

Use this skill when a single page needs a clear user path before blueprint or
content generation.

## Purpose

Define how a user moves through a page, which section roles answer which
questions, and where the page should branch to comparison, proof, form, or CTA
actions.

## Philosophy

A page flow is the reading and decision path. It should guide structure without
duplicating wireframe nodes or writing final copy.

## Decision Criteria

1. Use this after audience and page goal are known.
2. Use it before page wireframe planning when section order is uncertain.
3. Use it before content generation when copy goals depend on page sequence.

## Boundary

- Owns: page journey sequence, section intent, decision points, and exits.
- Does not own: node IDs, component anatomy, final copy, or prototype events.

## References

- `../../../docs/interop/content-journey-layer-architecture.md`
- `../../../.convention/schemas/user-journey-map.schema.json`

## Rules

1. Keep each step tied to a user question or need.
2. Name primary and secondary exits.
3. Do not invent detailed component structure.
4. Preserve unresolved page goals as open questions.

## Anti-Patterns

- Equal-weight section lists with no decision flow.
- Repeating CTAs without explaining why the user is ready.
- Mixing page flow and runtime state machines.

## Workflow

1. Identify page type, audience, and goal.
2. Map the expected scanning and decision sequence.
3. Assign section roles and exits.
4. Record objections and support content needed.
5. Hand off to `page-wireframe-planner`.

## Inline Example

```json
{
  "flow": ["hero", "problem", "comparison", "proof", "faq", "cta"],
  "primaryExit": "request-guidance",
  "secondaryExit": "compare-models"
}
```

## Hand-Offs

Hand off structure to `page-wireframe-planner`, copy to
`generate-page-copy`, and conversion review to `audit-conversion-flow`.
