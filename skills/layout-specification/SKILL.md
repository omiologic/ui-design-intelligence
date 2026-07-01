---
name: layout-specification
description: Define UIBlueprint layout structure and responsive behavior using approved layout patterns for pages, sections, components, sticky UI, drawers, and overlays.
license: See repository LICENSE
---

# Layout Specification

Use this skill when wireframe work needs explicit layout patterns or responsive behavior.

## Purpose

Translate layout intent into approved layout pattern choices and
breakpoint-specific structural notes.

## Philosophy

Layout in a UIBlueprint is structural, not decorative. The goal is to communicate
priority, grouping, scan path, and responsive equivalence before visual design
chooses exact pixels. A good layout note tells future designers and developers
what must remain true when the interface changes size or density.

Layout choices follow content relationships. A grid, split, sidebar, table, or
stack is justified by what the user needs to read, compare, choose, input,
navigate, or monitor. If the reason is only that a pattern looks polished, the
choice belongs to downstream visual design, not the wireframe.

## References

- `references/layout-patterns.md`
- `references/layout-selection-contract.md`
- `references/responsive-rules.md`
- `references/_shared/vocabulary/layout-patterns.json`
- `references/_shared/vocabulary/ui-layer-types.json`
- `references/_shared/design-philosophy/layout-pattern-selection.md`
- `references/_shared/design-philosophy/hierarchy-density-register.md`

## Decision Criteria

1. Start by naming the information job: read, compare, choose, input, navigate,
   monitor, recover, or act.
2. Use single-column or stacked layouts for narrative, forms, and narrow focus.
3. Use grid layouts for peer items with similar anatomy and scanning weight.
4. Use split layouts when two complementary regions must be compared or acted on
   together.
5. Use table or matrix layouts when row/column comparison is the task, not when
   content is merely repeated.
6. Use sidebar, sticky, drawer, or overlay layers only when persistent context or
   access changes task success.
7. On mobile, preserve decision priority even if the pattern changes.

## Boundary

- Owns: layout pattern selection, breakpoint-specific structural notes, and column and grid decisions for wireframe plans.
- Does not own: component-level anatomy, interaction behavior, visual token values, or final wireframe emission.
- Hand off component internals to `component-wireframe-planner`.
- Hand off interaction behavior to `interaction-patterns`.
- Hand off final wireframe emission to `generate-wireframe-config`.

## Rules

1. Describe grouping, order, density, and breakpoint behavior without colors,
   type scale, shadows, imagery, or final spacing tokens.
2. State what changes at desktop, tablet, and mobile when the user's scan path or
   action path changes.
3. Prefer the least complex layout that preserves the page or component goal.
4. Flag layouts that require data assumptions, scroll containment, or sticky
   behavior.
5. Explain responsive changes in terms of order, grouping, navigation, dense
   data, persistent UI, hidden content, and action reachability.
6. Existing anti-pattern validation may cover deterministic fixture failures,
   but this skill does not need a new command or subagent by default.

## Anti-Patterns

- One-size grid: every problem becomes equal cards, destroying hierarchy.
- Decorative split: a second column exists only to make the layout feel richer.
- False comparison: unrelated content is placed side by side.
- Decorative layout language: "premium asymmetric hero" describes taste, not the
  structural relationship that must survive handoff.
- Responsive stacking without priority: mobile order preserves DOM convenience
  instead of user task sequence.
- Hidden mobile action: primary CTAs, filters, form controls, or recovery paths
  disappear at smaller breakpoints.
- Table denial: comparison data is forced into cards without explaining how
  users compare rows.
- Sticky everything: persistent UI competes with content and creates focus and
  viewport risks.

## Workflow

1. Identify the task: read, compare, choose, input, navigate, or monitor.
2. Identify content relationships: sequence, peers, comparison, paired evidence,
   persistent context, dense data, or persistent action.
3. Choose the layout pattern that supports that task with the least structural
   complexity.
4. Define desktop, tablet, and mobile behavior for order, grouping, disclosure,
   and persistent UI.
5. Note accessibility and implementation risks created by the layout.
6. Hand layout notes back to the page, section, or component planner.

## Inline Example

Input: "Pricing plans with three tiers and feature comparison."

Output: cards or columns for tier selection, matrix/table for feature comparison,
and mobile notes that keep the recommended plan and primary action before the
long comparison.

Input: "Support article with troubleshooting steps and recovery actions."

Output: use `singleColumn` or `stack` because order matters; keep warnings and
recovery actions in sequence on mobile instead of turning steps into a grid.

## Hand-Offs

- Use `page-wireframe-planner` for section order and page-level CTA cadence.
- Use `section-wireframe-planner` when layout choice depends on section purpose.
- Use `interaction-patterns` if responsive behavior requires disclosure,
  sticky bars, drawers, or overlays.
