---
name: generate-prototype-copy
description: Generate prototype-ready copy for screens, dialogs, forms, messages, and states from a content model and prototype config.
license: See repository LICENSE
---

# Generate Prototype Copy

Use this skill when a prototype needs realistic text for screens, dialogs,
forms, validation, confirmations, empty states, and recovery paths.

## Purpose

Generate `PrototypeContent` that references content model entries, prototype
screens, forms, dialogs, and node IDs.

## Philosophy

Prototype copy should make the flow testable without pretending to be approved
production copy. It should clarify user decisions, states, and recovery.

## Decision Criteria

1. Use this after a content model and prototype flow or config exists.
2. Include form microcopy, errors, confirmations, and dialog copy.
3. Mark claims and specs for review.

## Boundary

- Owns: prototype-ready copy and review metadata.
- Does not own: runtime behavior, route definitions, focus management, layout,
  or production approval.

## References

- `../../../shared/content/content-pattern-library.md`
- `../../../shared/content/claim-risk-guidelines.md`
- `../../../shared/content/content-accessibility-guidelines.md`
- `../../../shared/content/cta-patterns.md`
- `../../../shared/content/laws-of-copywriting.md`
- `../../../shared/content/microcopy-guidelines.md`
- `../../../shared/content/proof-and-credibility-patterns.md`
- `../../../shared/schemas/prototype-content.schema.json`
- `../../../shared/schemas/content-model.schema.json`
- `../../../shared/schemas/prototype-config.schema.json`

## Rules

1. Reference screens and nodes rather than inventing structure.
2. Include error and success copy where forms exist.
3. Preserve source and confidence metadata.
4. Keep copy concise enough for prototype surfaces.
5. Use the laws-of-copywriting reference to keep prototype decisions,
   benefits, proof moments, objections, CTAs, and recovery copy clear.
6. Use the content pattern library for form, error, empty state, FAQ, proof,
   comparison, and CTA-support copy structures.
7. Use CTA patterns for prototype primary, secondary, destructive, disabled,
   retry, save, continue, and support actions.
8. Use claim-risk guidelines to keep prototype claims draft, review-flagged,
   and separate from production approval.
9. Use proof and credibility patterns to add placeholder-safe proof slots when
   real proof is unavailable.
10. Use microcopy guidelines for form labels, helper text, validation errors,
   empty states, success states, confirmation dialogs, destructive actions,
   loading states, permission prompts, recovery, accessibility, and tone
   restraint.
11. Use content accessibility guidelines for plain language, screen-reader-
   friendly labels, accessible errors, cognitive load, and copy that does not
   rely on visual context.

## Anti-Patterns

- Lorem ipsum in testable states.
- Dialog copy without a clear user decision.
- Missing error, empty, or success states.

## Workflow

1. Read content model and prototype config.
2. Identify screen, dialog, form, and message needs.
3. Select content patterns for prototype surfaces and state messages.
4. Select microcopy guidance for forms, dialogs, states, messages, and product
   flow moments.
5. Check content accessibility for forms, CTAs, dialogs, empty states, support
   copy, and state messages.
6. Select proof patterns or placeholder-safe proof slots for trust-sensitive
   surfaces.
7. Select CTA patterns for screen, dialog, form, state, retry, save, continue,
   and support actions.
8. Check the decision logic, proof, objections, and action readiness for each
   major prototype surface.
9. Generate concise copy with claim-risk review metadata.
10. Validate against `prototype-content.schema.json`.

## Inline Example

```json
{
  "type": "prototypeContent",
  "sourceContentModelId": "product-content",
  "screens": [
    {
      "screenId": "guide-screen",
      "content": [
        {
          "nodeId": "product-guide-dialog",
          "contentRef": "content.product-guide-dialog",
          "copy": {
            "title": {
              "value": "Find the right lighting setup",
              "source": "generated",
              "confidence": "medium",
              "status": "draft"
            }
          },
          "review": { "status": "draft", "needsReview": ["productSpecs"] }
        }
      ]
    }
  ]
}
```

## Hand-Offs

Hand off form details to `generate-form-microcopy`, CTA labels to
`generate-cta-copy`, and behavior gaps to `generate-prototype-flow`.
