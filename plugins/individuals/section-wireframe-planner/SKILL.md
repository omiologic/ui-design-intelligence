---
name: section-wireframe-planner
description: Plan reusable section-level UIBlueprint structure, purpose, layout intent, and handoff notes before final JSON assembly.
license: See repository LICENSE
---

# Section Wireframe Planner

Use this skill when the user needs section composition decisions rather than a
complete page or final JSON emission.

## Purpose

Create focused section wireframes with enough structure to serve a page journey
while remaining reusable across compatible contexts.

## Philosophy

A section is reusable when its internal job is clear, not when it is generic. The
section should carry one structural purpose such as orient, compare, prove,
capture input, answer objections, or resolve next steps. Page context may choose
the section, but the section body should still be understandable on its own.

Reusable but context-aware section planning means keeping the anatomy stable
while naming what the page must supply around it: sequence, CTA cadence, proof
quality, source data, interaction behavior, and responsive priority.

## References

- `references/section-patterns.md`
- `references/section-completeness-rubric.md`
- `references/_shared/wireframe-schema/valid-node-types.md`
- `references/_shared/vocabulary/node-types.json`
- `references/_shared/vocabulary/layout-patterns.json`
- `references/_shared/schemas/wireframe-config.schema.json`
- `references/_shared/design-philosophy/layout-pattern-selection.md`
- `references/_shared/design-philosophy/structural-anti-slop.md`
- `references/_shared/taste-profiles/README.md`
- `references/_shared/taste-profiles/conversion.json`
- `references/_shared/taste-profiles/utility-product.json`

## Decision Criteria

1. Use a hero when the section introduces the page promise and primary action.
2. Use feature, comparison, testimonial, FAQ, form, or CTA structures when the
   section has that specific job; do not hide purpose behind a generic section.
3. Choose layout by scanning behavior: quick scan favors list or grid, comparison
   favors matrix/table, narrative favors stacked sequence, input favors form
   grouping.
4. Add page-specific assumptions only as annotations unless the section cannot be
   reused without them.
5. Select the page's taste profile when page context is known. Use `conversion`
   for sections that orient, prove, explain, resolve objections, or support a
   conversion action; use `utility-product` for sections that establish state,
   expose controls, support comparison, show feedback, or support recovery. If
   page context is unknown, state the fallback and keep the section structurally
   reusable.
6. Apply profile guidance locally: use the matching `sectionOrder` job to name
   why the section exists, prefer compatible `preferredStructures`, and carry the
   profile `reason` into page-context notes when it affects surrounding order.
7. Add responsive notes when grouping, order, disclosure, or interaction changes.
8. Check section completeness for required roles, state coverage, recovery,
   responsive behavior, and page-context assumptions before handoff.

## Boundary

- Owns: section purpose, section anatomy, local layout intent, reusable content
  roles, and section-level responsive notes.
- Does not own: page-level ordering, reusable component internals, schema
  explanation, or final JSON assembly from a completed plan.
- Hand off page context and CTA cadence to `page-wireframe-planner`.
- Hand off final emission to `generate-wireframe-config`.

## Rules

1. Make one section purpose dominant and keep secondary content subordinate.
2. Include representative content roles that prove the section can work with real
   content length and labels.
3. Keep component repetition consistent unless a meaningful variant is declared.
4. Annotate dependencies on page context, data source, or interaction.
5. Do not ship decorative or empty sections; existing validation can catch some
   filler labels and state omissions, but section purpose remains a judgment
   check.
6. Do not add a command or subagent by default; use existing validation and
   planner handoffs unless future fixtures define repeatable section failures.

## Anti-Patterns

- Anonymous section: the label says "content block" but the structure has no
  clear job.
- Decorative section: visual rhythm replaces orientation, proof, comparison,
  input, objection handling, navigation, recovery, or action.
- Section sameness: unrelated sections reuse the same density and card rhythm.
- Everything grid: unrelated items are forced into equal cards, flattening
  hierarchy.
- Kitchen-sink card: each repeated item carries too many roles to remain
  scannable.
- Proof detached from claim: trust signals appear without a nearby promise or
  source context.
- Context leakage: the section hard-codes page-specific navigation or final CTA
  behavior when it should stay reusable.
- Missing recovery: forms, data, or interactive sections omit empty, loading,
  error, disabled, or success states.
- Unsupported responsive collapse: a dense desktop structure becomes a long
  mobile stack without preserved priority.

## Workflow

1. Name the section job before choosing nodes.
2. Select or inherit the taste profile from page context. If none fits, state the
   neutral fallback.
3. Match the section job to the selected profile's `sectionOrder` when possible,
   then use compatible `preferredStructures` to bias anatomy and layout.
4. Identify required roles, repeated anatomy, state coverage, responsive
   behavior, and page-context assumptions.
5. Choose the smallest pattern that communicates that job.
6. Add child nodes for heading, supporting content, proof/input/action, and any
   repeated items.
7. Add responsive and accessibility notes for changed order, controls, or
   disclosure.
8. State what page-level planner must supply around the section, including the
   profile reason when the section depends on page sequence.

## Inline Example

Input: "FAQ section for pricing questions."

Output: selected or inherited profile `conversion`; the section maps to
`resolve-objections`, so `accordion` is preferred. Use `section` with heading and
intro, repeated accordion items for questions, helper copy for unresolved
pricing, and responsive notes that mobile keeps question labels visible before
expansion.

Input: "Feature section for three benefits, but one benefit is the main purchase
driver."

Output: selected or inherited profile `conversion`; the section maps to
`explain` and `prove`, so do not force three equal cards. Use a focused
proof/detail section for the main driver, then a smaller peer `cardGrid` for
secondary benefits.

## Hand-Offs

- Use `page-wireframe-planner` when section order or CTA cadence is unresolved.
- Use `component-wireframe-planner` for repeated cards, accordions, forms, or
  tabs inside the section.
- Use `layout-specification` when arrangement drives the section's usefulness.
- Use `generate-wireframe-config` when the section plan is ready to emit as
  schema-valid JSON.
