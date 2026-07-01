---
name: storybook-from-component-spec
description: Create Storybook story plans, controls, realistic fixture data, responsive cases, and accessibility review scenarios from a ComponentSpec.
license: See repository LICENSE
---

# Storybook From ComponentSpec

Use this skill when a `ComponentSpec` or React implementation plan needs
Storybook scenarios before or alongside component implementation.

## Purpose

Produce Storybook story plans that make component states, content variation,
responsive behavior, and accessibility requirements reviewable without depending
on raw API responses or app services.

## Philosophy

Storybook is a review surface for component behavior and resilience. Stories
should reveal whether a component handles real content, missing data, long text,
states, mobile layouts, focus, and accessibility constraints.

## Decision Criteria

1. Use this skill after a `ComponentSpec` exists.
2. Create more state stories as component complexity and data coupling increase.
3. Use display-ready fixtures for shared UI; keep API-shaped data out of shared
   stories.
4. Include app-specific loading, empty, error, ready, and validation states when
   the component has those states.

## Boundary

- Owns: story list, story purpose, sample data guidance, controls, state cases,
  responsive review notes, and accessibility review notes.
- Does not own: writing Storybook source files unless explicitly requested,
  building components, or reviewing final code.

## References

- `references/storybook-from-component-spec.md`
- `references/storybook-writer-role.md`
- `references/_shared/contracts/react-components/component-spec.contract.md`
- `references/_shared/contracts/react-components/storybook-handoff.contract.md`
- `references/_shared/templates/react-components/storybook-plan-template.md`
- `references/_shared/react-patterns/storybook-rules.md`
- `references/_shared/react-patterns/accessibility-rules.md`
- `references/_shared/react-patterns/ui-layer-boundary.md`
- `references/_shared/schemas/component-spec.schema.json`

## Rules

1. Use realistic content, not `Lorem ipsum`, `Test title`, or `Card 1`.
2. Use `storybook-plan-template.md` for structured Storybook handoffs.
3. Include `Default`, `LongContent`, `MinimalContent`, and `ResponsiveStress`
   for most reusable components.
4. Add `Loading`, `Empty`, `Error`, `Disabled`, `Selected`, or
   `ValidationError` when the spec includes those states.
5. Use Storybook controls for meaningful props only.
6. Keep shared UI stories data-free by using view-model fixtures.
7. Include accessibility and responsive review notes.

## Anti-Patterns

- Stories that only cover the happy path.
- Raw API responses used as shared UI story data.
- Placeholder copy that hides wrapping and density issues.
- Missing mobile or long-content scenarios.
- Controls that expose internal implementation details instead of component
  behavior.

## Workflow

1. Read the `ComponentSpec` and identify component layer, complexity, state, and
   props.
2. Choose required and optional stories based on layer and coupling.
3. Create realistic fixture data at the same grain as component props.
4. Define controls for content, state, layout, and variants.
5. Add responsive, keyboard/focus, contrast, and missing-content review notes.
6. Produce a Storybook plan or handoff contract.

## Inline Example

```txt
Stories for ProductFeatureGrid:
- Default: three realistic feature cards and CTA
- LongContent: long titles and descriptions
- MinimalContent: no section description and no CTA
- ResponsiveStress: six cards with mixed image presence
Controls: title, description, items, cta, layoutVariant
Accessibility review: section label, card article semantics, link vs button
```

## Hand-Offs

Hand component boundary issues back to `component-spec-to-react-plan`. Hand
shared UI suitability questions to `shared-ui-component-planner`. Hand completed
component and stories to `react-component-review`.
