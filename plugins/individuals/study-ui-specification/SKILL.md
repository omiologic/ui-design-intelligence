---
name: study-ui-specification
description: Study a captured page's visible UI structure, sections, components, content groups, and reusable patterns for downstream blueprint work.
license: See repository LICENSE
---

# Study UI Specification

Use this skill when a captured page needs a structured inventory of visible UI elements and reusable patterns.

## Purpose

Produce an evidence-backed specification of page sections, components, repeated patterns, content groups, and notable structural details.

## Philosophy

Specification study turns visible UI into a structured inventory for downstream
blueprint work. It should be precise enough to preserve structure, labels,
roles, states, and assumptions, but disciplined enough not to invent styling,
behavior, or schema-valid JSON that the evidence does not support.

## Evidence Discipline

Inventory what is visible before judging or redesigning it. Preserve user-facing
labels as observed labels, separate inferred component purpose from visible
structure, and note capture limits such as hidden drawers, offscreen content, or
unopened states.

## References

- `references/specification-inventory.md`
- `references/specification-extraction-method.md`
- `references/_shared/schemas/study-output.schema.json`
- `references/_shared/templates/page-study.md`
- `references/_shared/vocabulary/ui-terminology.json`
- `references/_shared/examples/page-study.example.json`

## Rules

1. Inventory visible structure before judging quality.
2. Group observations by page region, section, component, and repeated pattern.
3. Preserve labels from the source when they identify user-facing content.
4. Hand off interaction behavior to `study-ui-interaction` and blueprint generation to `ui-blueprint-skills`.
5. Separate observed evidence, inferred node/component purpose, missing evidence,
   and handoff assumptions.
6. Do not extract visual styling, exact spacing, motion, color, or typography as
   structural specification.
7. Use validation commands only after study output becomes a schema-targeted
   example or translated blueprint; no subagent is needed by default.

## Method

1. Divide the capture into regions: header, navigation, main sections, repeated
   content groups, overlays if visible, and footer.
2. Name each visible section by its user-facing label or most specific observed
   purpose.
3. Identify repeated patterns and record one representative item plus variation
   notes instead of duplicating every item.
4. Mark inferred component types separately when the capture only suggests them.
5. Extract candidate node types, content roles, labels, child anatomy, states,
   responsive notes, and accessibility cues only where evidence supports them.
6. Mark unresolved assumptions such as hidden drawers, offscreen content,
   untested states, and unsupported responsive behavior.
7. Produce a downstream inventory of sections, components, labels, repeated
   patterns, and unknowns.

## Anti-Patterns

- Visual over-specification: colors, shadows, exact spacing, typography, or
  motion become structural requirements.
- Node inflation: every text line becomes a separate component.
- Node flattening: meaningful containment and repeated item anatomy disappear.
- Hidden uncertainty: inferred component type, state, or responsive behavior is
  written as observed fact.
- Styling masquerading as layout: labels such as "premium card" replace
  structural role and anatomy.
- State omission: forms, overlays, filters, and data regions are inventoried only
  in default state.
- Vocabulary drift: local names are copied into downstream plans without later
  normalization to approved node types, roles, layouts, or states.

## Inline Example

Input evidence: a product page shows a header, image gallery, title/price block,
variant selector, add-to-cart button, shipping accordion, reviews grid, and
footer.

Finding: observed regions are header, product purchase area, support details,
social proof, and footer; repeated pattern is review card; inferred component
types are gallery, selector, accordion, and card; missing evidence is cart drawer
behavior after add-to-cart.

Structured extraction:

- Observed nodes: header navigation, main product area, support accordion,
  reviews grid, footer.
- Candidate roles: product title as headline, price as `price`, add-to-cart as
  `primaryCTA`, reviews as testimonial/proof content.
- Inferred components: gallery, variant selector, accordion, review card.
- Missing evidence: selected variant state, add-to-cart loading/success/error,
  cart drawer behavior, mobile ordering, and accessibility labels.
- Handoff: `study-ui-interaction` for cart and selector behavior,
  `component-wireframe-planner` for purchase controls, and
  `generate-ui-blueprint-from-study` for blueprint translation.

## Hand-Offs

- Send trigger, overlay, state, and feedback questions to `study-ui-interaction`.
- Send structural inventory to `generate-ui-blueprint-from-study`.
- Send reusable component anatomy candidates to `component-wireframe-planner`.
- Send schema representation uncertainty to `wireframe-schema`.
