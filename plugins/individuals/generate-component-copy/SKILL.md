---
name: generate-component-copy
description: Generate component-level UI copy for cards, dialogs, tables, tabs, accordions, and other blueprint component nodes.
license: See repository LICENSE
---

# Generate Component Copy

Use this skill when a specific component node needs title, body, labels, or
actions that fit component anatomy.

## Purpose

Generate component-level copy for cards, dialogs, tables, tabs, accordions,
banners, sticky bars, and similar UI nodes.

## Philosophy

Component copy must fit the component. It should be short, scannable, and tied
to the action or decision the component supports.

## Decision Criteria

1. Use this when component anatomy is known.
2. Prefer content-model entries over unstructured prose.
3. Use form microcopy for form fields.

## Boundary

- Owns: component copy fields and action labels.
- Does not own: component design, state machine behavior, form validation
  logic, or production approval.

## References

- `../../../.convention/content/content-accessibility-guidelines.md`
- `../../../.convention/content/laws-of-copywriting.md`
- `../../../.convention/content/microcopy-guidelines.md`
- `../../../.convention/schemas/content-model.schema.json`
- `../../../.convention/vocabulary/component-anatomy.json`

## Rules

1. Match copy fields to component parts.
2. Keep copy concise.
3. Avoid unsupported product or pricing claims.
4. Preserve provenance metadata.
5. Use the laws-of-copywriting reference when a component carries a decision,
   proof point, objection response, CTA, or recovery moment.
6. Use microcopy guidelines for component labels, helper text, dialogs, banners,
   empty states, loading states, errors, confirmations, and permission prompts.
7. Use content accessibility guidelines to keep component labels, links, CTAs,
   dialog copy, empty states, and support text understandable without visual
   context.

## Anti-Patterns

- Long paragraphs inside compact cards.
- Button labels that do not describe the action.
- Copy that conflicts with parent section goal.

## Workflow

1. Identify component node, anatomy, and user task.
2. Identify the component's decision or proof job.
3. Identify any microcopy surfaces or state messages in the component.
4. Check copy accessibility for labels, links, buttons, and state messages.
5. Draft copy for required parts.
6. Add CTA or state copy only when needed.
7. Mark review risks.

## Inline Example

```json
{
  "nodeId": "product-card",
  "copy": {
    "title": "Adjustable Spot Headlamp",
    "body": "Focused control for procedures that need precise illumination.",
    "primaryCTA": "View Details"
  }
}
```

## Hand-Offs

Hand off section context to `generate-section-copy`, form fields to
`generate-form-microcopy`, and prototype states to `generate-prototype-copy`.
