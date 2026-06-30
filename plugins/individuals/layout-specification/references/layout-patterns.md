# Layout Patterns

The canonical list is `_shared/vocabulary/layout-patterns.json`.

## Decision Heuristics

- Choose the pattern from the content relationship: sequence, peer scan,
  comparison, paired evidence, persistent navigation, dense data, or persistent
  action.
- Choose `singleColumn` when reading order matters more than comparison.
- Choose `twoColumn` when one side explains and the other side supports with a
  form, media placeholder, proof, or summary.
- Choose `threeColumn`, `cardGrid`, or `featureGrid` only when items are peers
  and can be scanned without a strict sequence.
- Choose `sidebar` when navigation or filters must remain available while the
  main content changes.
- Choose `splitHero` when a single supporting visual or form is essential to the
  hero decision.
- Choose `centeredHero` when the message and action carry the page and media is
  secondary or absent.
- Choose `modalOverlay` or `drawerPanel` only for overlay roots, not normal page
  sections.
- Prefer the least complex pattern that preserves priority, grouping, scan path,
  and action path.

## Common Usage

- `singleColumn`: simple stacked content.
- `twoColumn`: content and media or content and form.
- `sidebar`: persistent secondary navigation or filters.
- `centeredHero`: focused hero content.
- `cardGrid`: repeated cards.
- `featureGrid`: benefit or feature cards.
- `comparisonGrid`: side-by-side option comparison.
- `modalOverlay`: blocking overlay structure.
- `drawerPanel`: edge-attached panel structure.

## Anti-Pattern

Bad: choosing `cardGrid` because a section has multiple paragraphs.

Corrected: use `singleColumn` for a narrative explanation. Use `cardGrid` only
when each item is an independent object with comparable anatomy.

Bad: using `splitHero` because it looks more polished when the second column is
decorative.

Corrected: use `centeredHero` or `singleColumn` unless the second region carries
proof, a form, a preview, or another decision-making job.

Bad: forcing a feature comparison into cards when users need row-by-row
comparison.

Corrected: use a comparison grid, table, or matrix and define how it changes at
smaller breakpoints.

## Worked Example

Prompt: "Hero with a booking form and short service promise."

Use `splitHero`: left side contains heading, body, and proof; right side contains
the form. On mobile, convert to single-column with promise first and form second.

## Hand-Off

This file chooses layout vocabulary. Use `responsive-rules.md` for breakpoint
changes, page or section planners for content order, and visual design systems
for final spacing, typography, color, and imagery.
