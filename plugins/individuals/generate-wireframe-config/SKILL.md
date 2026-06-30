---
name: generate-wireframe-config
description: Assemble final schema-valid UIBlueprint wireframe config JSON from already planned page, section, component, or study-derived structure.
license: See repository LICENSE
---

# Generate Wireframe Config

Use this skill when a planned UI structure needs to be emitted as final
UIBlueprint wireframe JSON. Do not use it to decide page order, section anatomy,
component states, or schema modeling from scratch.

## Purpose

Produce complete wireframe config JSON with required top-level fields, valid
node nesting, approved vocabulary, responsive notes, and accessibility notes.

## Philosophy

Generation is the assembly line, not the design meeting. This skill preserves
decisions made by planners and study translation, normalizes them into the schema
contract, and refuses to invent missing structure without calling out the gap.

## References

- `references/wireframe-config-generation.md`
- `references/wireframe-assembly-quality.md`
- `references/_shared/schemas/wireframe-config.schema.json`
- `references/_shared/vocabulary/node-types.json`
- `references/_shared/vocabulary/layout-patterns.json`
- `references/_shared/vocabulary/content-roles.json`
- `references/_shared/vocabulary/interaction-states.json`
- `references/_shared/examples/ui-blueprint.example.json`
- `references/_shared/design-philosophy/preflight-checklist.md`
- `references/_shared/design-philosophy/structural-anti-slop.md`
- `references/_shared/taste-profiles/README.md`
- `references/_shared/taste-profiles/conversion.json`
- `references/_shared/taste-profiles/utility-product.json`

## Decision Criteria

1. Assemble only from an existing plan, study translation, or explicit
   structure.
2. Stop and hand off when page job, section order, component anatomy, states,
   responsive behavior, or overlay behavior are not planned enough.
3. Preserve the planned user journey, labels, roles, CTA priority, state
   coverage, responsive notes, accessibility notes, and assumptions.
4. Preserve the selected taste profile from the plan. If the plan lacks a
   profile but clearly states a marketing/conversion or utility/product register,
   record the inferred profile in metadata and annotations; if uncertain, leave
   profile metadata absent and note the gap instead of inventing a bias.
5. Normalize schema fields and vocabulary without changing design intent.
6. Prefer the smallest valid structure that still exposes purpose, hierarchy,
   interaction, responsive behavior, and handoff assumptions.

## Rules

1. Start from an existing plan, study translation, or explicit structure.
2. Preserve planner decisions, labels, roles, responsive notes, states, and
   accessibility notes unless they conflict with the schema.
3. Fill mechanical schema fields, stable IDs, nesting, and top-level structure.
4. Normalize vocabulary to approved node types, roles, layouts, and states.
5. Preserve profile-influenced decisions such as section job order, preferred
   structures, CTA cadence, overlay constraints, and responsive priority when
   they are present in the plan.
6. Report missing planning decisions instead of silently inventing them.
7. Run the preflight checklist before returning JSON, not only schema validity.
8. Use existing validation scripts for examples and deterministic structural
   checks; no separate scaffold command or subagent is needed by default.
9. Ensure the root and main node tree reveal the page or component job.
10. Preserve supplied section order, labels, and repeated-item structure.
11. Keep one primary page action identifiable when page scope is involved.
12. Include meaningful states for forms, overlays, data components, and async
    surfaces.
13. Preserve required content and action priority in responsive notes.
14. Cover landmarks, labels, focus, keyboard behavior, and feedback in
    accessibility notes where relevant.
15. Keep visual design details out of the wireframe.

## Boundary

- Owns: final JSON assembly, field completion, ID normalization, schema shape,
  vocabulary normalization, and final preflight before validation.
- Does not own: deciding the page journey, choosing section order, defining
  component states, interpreting raw study evidence, or explaining schema
  concepts.
- Hand off planning gaps to page, section, or component planners.
- Hand off schema representation uncertainty to `wireframe-schema`.

## Workflow

1. Confirm the input is planned enough to assemble: scope, structure, labels,
   states, responsive notes, and accessibility notes are present or intentionally
   absent.
2. Confirm whether the input selected a taste profile. Preserve it in
   `metadata.tasteProfile` and `metadata.register` when the schema permits
   metadata; otherwise record it in annotations.
3. Convert the plan into the top-level UIBlueprint document.
4. Normalize IDs and vocabulary without changing intent.
5. Add annotations for assumptions, unresolved gaps, selected profile rationale,
   and non-obvious logic.
6. Place overlays, sticky UI, inline feedback, and stateful components according
   to their role in the flow.
7. Validate mentally against the schema, shared vocabulary, selected taste
   profile, preflight checklist,
   and structural anti-slop rules before returning JSON.

## Anti-Patterns

- Schema-valid but purposeless output: validators pass, but the page job is not
  visible.
- Generic assembly: unresolved planning becomes a default hero, card grid, FAQ,
  and CTA sequence.
- Node inflation: every copy fragment becomes a node.
- Node flattening: meaningful containment and journey order disappear.
- Lost state coverage: forms, overlays, tables, or async regions lose error,
  loading, disabled, empty, or success states.
- Overlay leakage: dialogs or drawers are hidden inside normal page flow without
  trigger, dismissal, or focus behavior.
- Mobile afterthought: responsive notes say "stacks" without preserving action
  priority.
- Visual drift: annotations carry color, typography, motion, or production CSS
  instructions.

## Inline Example

Context:

Input chain: `page-wireframe-planner` outputs a pricing page plan; `interaction-
patterns` defines a signup dialog; `wireframe-schema` confirms dialog belongs in
`overlays`.

This skill preserves the selected `conversion` taste profile, then emits the
final UIBlueprint JSON with page root, ordered sections, overlay node,
responsive notes, accessibility notes, profile metadata or annotation, and stable
IDs.

Example:

Input plan: pricing page with header navigation, hero with one signup CTA,
comparison section, FAQ, signup dialog, desktop comparison table, and mobile
stacked plan cards.

Assembly:

- Use `page` as the root and preserve header, hero, comparison, FAQ, and footer
  order.
- Put the signup dialog in `overlays` with `closed` state plus trigger,
  dismissal, focus, and keyboard notes.
- Add responsive notes that the comparison table becomes stacked cards on mobile
  while the signup action remains reachable.
- Represent missing exact copy as structural labels instead of inventing
  marketing text.

Minimal emitted shape:

```json
{
  "id": "pricing-page-wireframe",
  "type": "wireframe",
  "label": "Pricing Page Wireframe",
  "version": "0.1.0",
  "metadata": {
    "tasteProfile": "conversion",
    "register": "marketing"
  },
  "root": {
    "id": "pricing-page",
    "type": "page",
    "label": "Pricing Page",
    "children": [
      { "id": "site-header", "type": "header", "label": "Site Header" },
      {
        "id": "main-content",
        "type": "main",
        "label": "Main Content",
        "children": [
          { "id": "pricing-hero", "type": "hero", "label": "Pricing Hero", "layout": "centeredHero" },
          {
            "id": "plan-comparison-section",
            "type": "section",
            "label": "Plan Comparison Section",
            "children": [
              { "id": "plan-comparison", "type": "comparisonTable", "label": "Plan Comparison" }
            ]
          },
          { "id": "pricing-faq", "type": "accordion", "label": "Pricing FAQ", "state": "collapsed" }
        ]
      },
      { "id": "site-footer", "type": "footer", "label": "Site Footer" }
    ]
  },
  "overlays": [
    {
      "id": "signup-dialog",
      "type": "dialog",
      "label": "Signup Dialog",
      "state": "closed",
      "accessibility": {
        "ariaLabel": "Signup form",
        "focusManagement": "Trap focus while open and return focus to signup trigger on close.",
        "keyboardBehavior": "Escape closes the dialog."
      }
    }
  ],
  "responsive": {
    "desktop": "Comparison remains a table.",
    "tablet": "Comparison condenses labels and preserves signup CTA.",
    "mobile": "Plans become stacked cards before FAQ; signup remains reachable."
  }
}
```

## Hand-Offs

- Use `page-wireframe-planner`, `section-wireframe-planner`, or
  `component-wireframe-planner` when the input is still a brief rather than a
  plan.
- Use `generate-ui-blueprint-from-study` when the source material is structured
  study output that still needs evidence-to-structure translation.
- Use `accessibility-wireframe-review` after emission for structural review.
