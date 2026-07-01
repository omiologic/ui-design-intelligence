# Design System Quality Checklist

Use this checklist to review `DesignSystemSeed` artifacts before they guide
wireframes, design specs, prototypes, or implementation handoff. It complements
schema validation; it does not replace design review. Use
`.convention/design-system/token-taxonomy.md` for token category and naming rules,
and `.convention/design-system/component-anatomy-reference.md` for component slots,
required parts, accessibility hooks, and state hooks. Use
`.convention/design-system/component-state-guidelines.md` for state coverage and
handoff boundaries between design-system seeds and prototype configs. Use
`.convention/design-system/accessibility-token-guidelines.md` for contrast, focus,
target size, readable type, reduced motion, disabled legibility, opacity, and
non-color state checks. Use
`.convention/design-system/responsive-system-guidelines.md` for responsive token,
component, density, sticky region, and prototype handoff expectations. Use
`.convention/design-system/visual-style-calibration.md` when style references, brand
direction, or screenshots influence contrast, density, hierarchy, restraint,
texture, imagery, motion posture, or category fit. Use
`.convention/design-system/component-selection-guidelines.md` when component rules
must choose patterns based on task fit, comparison, density, interruption,
hierarchy, mobile behavior, or accessibility. Use
`.convention/design-system/design-system-handoff-checklist.md` before a seed is
handed to implementation, blueprint generation, prototype generation, app
rendering, MCP-backed tooling, hosted artifact viewing, or formal review. Use
`.convention/design-system/anti-generic-ui-guidelines.md` when schema-valid output
still looks bland, default, one-note, or unsupported by source evidence.

## Readiness Bands

### Draft

A seed is draft when it is useful for exploration but not ready to constrain
downstream generation.

Pass when:

- Required schema sections exist.
- Low-confidence or inferred values are clearly marked.
- Open questions identify the missing source evidence.

Fail when:

- Tokens, components, or type choices look final but lack source/confidence.
- Missing fields are hidden in prose instead of `openQuestions`.
- The seed cannot explain what downstream artifact it is meant to guide.

### Review-Ready

A seed is review-ready when another agent, designer, or engineer can inspect the
contract and decide what must change before handoff.

Pass when:

- Brand, palette, typography, iconography, and component sections are complete
  enough to evaluate.
- Token names are semantic and map to real use cases.
- Component variants, states, and rules are coherent.
- Accessibility checks and unresolved risks are explicit.

Fail when:

- Reviewers must infer action priority, contrast risk, type scale purpose, or
  component behavior from raw values.
- Components reference tokens, states, anatomy, or actions that are not defined.
- Responsive behavior is absent for header, footer, cards, or major actions.

### Implementation-Ready

A seed is implementation-ready when it can constrain a design spec or prototype
without creating avoidable ambiguity. It is still not a production UI-kit
contract.

Pass when:

- Every render-critical decision has a role, source, confidence, and usage.
- Token references resolve across components.
- Accessibility and responsive constraints are specific enough to test.
- Handoff notes state what is governed, what is advisory, and what remains open.

Fail when:

- A downstream implementer would need to invent token roles, component states,
  accessibility behavior, or responsive priorities.
- The seed overclaims exactness from weak evidence.
- Open questions block primary action, typography hierarchy, color contrast, or
  component behavior.

## Checklist

| Area | DesignSystemSeed fields | Pass condition | Fail condition |
| --- | --- | --- | --- |
| Source contract | `source.inputType`, `source.sourceRefs`, `source.confidence`, `source.notes` | Input type and source references explain where the seed came from and how much trust to place in it. | Source is vague, missing, or too confident for the evidence. |
| Brand foundation | `brand.name`, `brand.summary`, `brand.personality`, `brand.audience`, `brand.positioning`, `brand.voice`, `brand.visualDirection` | Brand choices describe audience, positioning, voice, density, style, and emphasis without pretending to be final brand strategy. | Brand fields are generic, unsupported, contradictory, or missing voice/visual direction. |
| Token naming | `palette.colors`, `typography.fontFamilies`, `typography.scale`, component token references | Tokens follow `.convention/design-system/token-taxonomy.md`, use semantic dot notation, and describe intent rather than raw value names. | Tokens are value-named, duplicated, orphaned, or too implementation-specific. |
| Color roles | `palette.mode`, `palette.colors.*.intent`, `palette.colors.*.usage`, `palette.colors.*.useOn`, `palette.colors.*.accessibilityNotes` | Color roles define intent, usage, supported surfaces, and contrast/legibility review needs. | Colors are listed as decoration only, lack usage, create multiple primary actions, or omit contrast risk. |
| Typography | `typography.fontFamilies`, `typography.scale`, `typography.rules` | Type families and scale entries state hierarchy, usage, source, confidence, and readability constraints. | Type choices lack purpose, use viewport-scaled assumptions, or cannot support headings/body/UI labels. |
| Spacing | component `base`, `layout`, `rules`, `usageNotes` | Spacing intent is expressed through component density, layout rules, or handoff notes when exact scale is not governed. | Density is implied by screenshots only, or component spacing cannot be inferred without inventing values. |
| Radius | `components.buttons.base.radius`, `components.cards.base`, `components.header.rules`, `components.footer.rules` | Radius choices are consistent with brand/register and named as seed-level guidance. | Radius values conflict across components or imply final UI-kit governance without evidence. |
| Shadows/elevation | `components.cards.base`, component `rules`, `usageNotes` | Elevation use is constrained by purpose: grouping, overlay, affordance, or emphasis. | Shadows are decorative defaults, heavy without rationale, or inconsistent with flat/utility registers. |
| Buttons | `components.buttons.base`, `components.buttons.variants`, `components.buttons.states`, `components.buttons.rules` | Button variants define one primary action model, allowed actions, states, and accessibility expectations. | Multiple primaries compete, states are missing, or variants do not map to action priority. |
| Component anatomy | `components.buttons`, `components.cards`, `components.header`, `components.footer`, component references in notes/specs | Component parts follow `.convention/design-system/component-anatomy-reference.md` and separate required slots, optional slots, content hooks, accessibility hooks, and state hooks. | Components omit required parts, bury state/accessibility hooks in prose, or mix page structure into reusable components. |
| Cards | `components.cards.base`, `components.cards.anatomy`, `components.cards.variants`, `components.cards.rules` | Cards name anatomy, variants, density, content requirements, and when a card should not be used. | Cards become the default layout for everything or lack required title/summary/action anatomy. |
| Header | `components.header.layout`, `components.header.height`, `components.header.behavior`, `components.header.anatomy`, `components.header.navigation`, `components.header.rules` | Header rules define navigation density, action priority, sticky behavior, and responsive adaptation. | Header behavior is unspecified, nav count is unrealistic, or mobile behavior is left to downstream guesses. |
| Footer | `components.footer.layout`, `components.footer.anatomy`, `components.footer.navigationGroups`, `components.footer.rules` | Footer supports trust, navigation, contact/legal needs, and mobile scan order. | Footer is treated as decorative or lacks required legal/contact/navigation groups for the domain. |
| States | `components.*.states`, `components.*.rules`, `usageNotes` | Components that users act on follow `.convention/design-system/component-state-guidelines.md` and include default, focus, disabled, loading, error, or success states as relevant. | Interactive components have only default styling or omit focus/disabled/error behavior. |
| Accessibility | `palette.accessibilityNotes`, `components.*.rules`, `usageNotes`, `openQuestions` | Token accessibility follows `.convention/design-system/accessibility-token-guidelines.md`; contrast, focus visibility, text legibility, target size, icon labeling, disabled legibility, non-color state, and reduced-motion risks are named. | Accessibility is isolated to generic notes or lacks actionable constraints. |
| Responsive behavior | `components.header.layout`, `components.header.height`, `components.footer.layout`, `components.cards.variants`, `usageNotes` | Responsive guidance follows `.convention/design-system/responsive-system-guidelines.md`; priority explains what moves, collapses, hides, stacks, or stays persistent. | Responsive behavior is only "desktop/mobile" labels with no priority decision. |
| Visual style calibration | `brand.visualDirection`, `palette.colors`, `typography.scale`, `iconography`, `components.*`, `usageNotes` | Style direction is translated into contrast, density, hierarchy, restraint, texture, imagery, motion posture, and category-fit decisions with source/confidence notes. | Style remains mood words, defaults to generic type/cards, creates a one-note visual system, or overrides brand/accessibility without evidence. |
| Component selection | `components.*.variants`, `components.*.rules`, `usageNotes`, `openQuestions` | Component rules explain when to use table/card list, tabs/segmented controls, modal/drawer, dropdown/combobox, or accordion/progressive disclosure based on task fit. | Component choices are fashionable defaults, mismatch comparison/interruption needs, ignore mobile behavior, or imply unmodeled accessibility behavior. |
| Anti-generic UI | `brand.visualDirection`, `palette.colors`, `typography`, `components.*`, `usageNotes`, `openQuestions` | Generic-looking choices are replaced with concrete token roles, hierarchy, component rules, density, surface, imagery, or handoff constraints. | The seed relies on one-note palettes, generic card grids, over-rounded controls, decorative gradients, vague spacing, default typography, or unsupported flourishes. |
| Handoff notes | `usageNotes`, `openQuestions` | Notes state governed vs advisory decisions and list concrete unresolved questions. | Notes are generic, omit risks, or fail to tell downstream agents what not to invent. |

## Example Review Procedure

1. Validate the seed against `.convention/schemas/design-system-seed.schema.json`.
2. Review source confidence before reviewing values.
3. Check token naming and token-to-component references.
4. Check action priority, component states, accessibility, and responsive
   behavior.
5. Assign a readiness band: draft, review-ready, or implementation-ready.
6. Record blockers, warnings, and follow-ups with field paths.

## Review Output Shape

Use this shape when a command or agent reports design-system readiness:

```md
# Design System Seed Review

## Summary

- Readiness: draft | review-ready | implementation-ready
- Blocking issues: 0
- Warnings: 0
- Primary risk: short statement

## Checklist Results

| Area | Status | Evidence | Repair |
| --- | --- | --- | --- |

## Blocking Issues

## Warnings

## Handoff Notes

## Open Questions
```

Status values:

- `pass`: The field is present, coherent, and usable for the current readiness
  target.
- `warning`: The field is usable but weak, inferred, incomplete, or needs human
  confirmation.
- `fail`: The field is missing, contradictory, unsupported, or blocks safe
  downstream use.

## Handoff Rules

- Do not promote a seed above draft when source/confidence metadata is missing.
- Do not promote a seed above review-ready when component states, accessibility,
  or responsive behavior are not reviewable.
- Do not mark a seed implementation-ready when open questions block primary
  action priority, type hierarchy, contrast, or component behavior.
- Keep low-confidence recommendations visible; low confidence is acceptable
  only when downstream risk and confirmation needs are explicit.
- Do not hand a seed to downstream app, blueprint, prototype, or implementation
  consumers without checking
  `.convention/design-system/design-system-handoff-checklist.md`.
