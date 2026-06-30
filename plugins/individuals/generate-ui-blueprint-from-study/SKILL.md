---
name: generate-ui-blueprint-from-study
description: Translate structured UI study findings into planned UIBlueprint structure, then hand off or emit schema-valid wireframe JSON when scope is clear.
license: See repository LICENSE
---

# Generate UI Blueprint From Study

Use this skill when study output should become UIBlueprint structure. It owns
evidence-to-structure translation, then may hand off to planners for missing
composition decisions or to `generate-wireframe-config` for final assembly.

## Purpose

Translate observed storytelling, specification, interaction, responsive, and
accessibility findings into blueprint structure without inventing vocabulary.

## Philosophy

Study-derived generation must preserve evidence discipline. Observed structure
can become nodes, roles, states, responsive notes, and accessibility assumptions;
missing evidence must remain a gap or explicit inference, not hidden invention.

## References

- `references/study-to-blueprint.md`
- `references/evidence-to-structure-mapping.md`
- `references/_shared/schemas/study-output.schema.json`
- `references/_shared/schemas/wireframe-config.schema.json`
- `references/_shared/vocabulary/node-types.json`
- `references/_shared/vocabulary/layout-patterns.json`
- `references/_shared/vocabulary/content-roles.json`
- `references/_shared/vocabulary/interaction-states.json`
- `references/_shared/examples/page-study.example.json`
- `references/_shared/examples/ui-blueprint.example.json`
- `references/_shared/design-philosophy/preflight-checklist.md`

## Decision Criteria

1. Choose the narrowest useful blueprint scope that the study evidence supports:
   page, section, component, overlay, or component state.
2. Map observed regions and behaviors before adding inferred structure.
3. Preserve page purpose, journey order, proof placement, CTA priority,
   responsive behavior, interaction states, and accessibility constraints when
   the study provides them.
4. Use planner handoffs when structure is necessary but not settled by the
   study.
5. Prefer neutral assumptions over confident invention when evidence is missing.

## Rules

- Separate observed facts, study interpretations, and generation assumptions
  before writing structure.
- Every major node should trace to a study finding, observed page region, or
  required structural convention.
- Each non-obvious role, layout, state, overlay, or responsive note needs a
  reason from evidence or an explicit assumption.
- Do not invent content, claims, proof, pricing, page order, interaction states,
  or responsive behavior.
- Keep uncertainty visible in annotations, assumptions, or handoffs.

1. Preserve study evidence in structure decisions.
2. Use approved node types, roles, layouts, and states.
3. Choose page, section, component, or overlay scope before writing JSON.
4. Validate output against the wireframe schema and semantic vocabulary.
5. Hand off ambiguous terminology to `design-terminology`.
6. Carry responsive, accessibility, and interaction findings into the blueprint
   as structural constraints.
7. A future command may validate traceability between study findings and
   blueprint annotations, but this skill does not need a command or subagent by
   default.

## Boundary

- Owns: mapping study findings into candidate UIBlueprint structure, carrying
  evidence notes forward, identifying scope, and preserving observed interaction,
  responsive, and accessibility findings.
- Does not own: inventing missing page strategy, choosing a new page sequence
  unsupported by the study, or acting as the generic final JSON assembler when a
  complete plan already exists.
- Hand off composition gaps to the relevant planner.
- Hand off final emission to `generate-wireframe-config` when translation is
  complete.

## Workflow

1. Read the study findings and separate observed facts, inferred structure, and
   missing evidence.
2. Choose the blueprint scope: page, section, component, overlay, or component
   state.
3. Map observed regions, actions, content roles, states, and responsive behavior
   into candidate nodes and annotations.
4. Normalize node types, roles, layouts, and states against approved vocabulary.
5. Add assumptions or handoffs for gaps the study does not settle.
6. Use planner skills only for unresolved structural choices the study does not
   settle.
7. Use `generate-wireframe-config` for final JSON assembly once the translated
   structure is complete.

## Anti-Patterns

- Generic landing-page inflation: a focused study becomes a full marketing page
  without evidence.
- Evidence loss: proof order, CTA priority, interaction behavior, or responsive
  findings disappear during translation.
- Hidden invention: missing sections, content, claims, states, or page order are
  added without assumptions.
- Vocabulary drift: study wording is copied directly when approved UIBlueprint
  vocabulary requires a normalized node, role, layout, or state.
- Happy-path collapse: forms, overlays, or data components lose observed empty,
  loading, error, disabled, or success states.
- Mobile erasure: observed sticky actions, reordering, or collapsed navigation
  are not represented in responsive notes.

## Inline Example

Context:

Input: a study finds a product page with gallery, option picker, sticky add-to-
cart bar on mobile, reviews, and a size guide overlay, but does not determine
where comparison content belongs.

Flow: this skill maps observed elements and evidence notes; `page-wireframe-
planner` resolves comparison placement; `interaction-patterns` clarifies the size
guide overlay; `generate-wireframe-config` emits final JSON.

Example:

Input study finding:

```json
{
  "label": "Proof appears before service details",
  "evidence": "Trust signals and testimonials appear before the step-by-step service explanation.",
  "interpretation": "The page treats confidence as a prerequisite for reading service details.",
  "handoff": "Preserve proof before service detail unless page planning finds a stronger order."
}
```

Blueprint translation:

```json
{
  "id": "homepage-proof-section",
  "type": "section",
  "label": "Proof Before Service Detail",
  "layout": "cardGrid",
  "children": [
    {
      "id": "homepage-proof-card",
      "type": "card",
      "label": "Trust Signal",
      "role": "trustSignal"
    }
  ]
}
```

Reason: the section order comes from study evidence, while the `section`,
`cardGrid`, `card`, and `trustSignal` terms come from approved blueprint
vocabulary. If final JSON supports annotations, carry the finding label or
evidence summary forward with the node.

## Hand-Offs

- Use `design-terminology` when study language does not map cleanly to approved
  vocabulary.
- Use page, section, or component planners when the study reveals parts but not
  composition.
- Use `generate-wireframe-config` when translated structure is ready for final
  schema-valid JSON.
