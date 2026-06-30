# Layout Selection Contract

Use this reference to choose layout patterns from content relationships and to
write responsive notes that preserve the user task across breakpoints.

## Core Principle

Layout follows content relationships. A layout pattern should explain what the
user needs to do with the information: read in order, compare peers, choose one
option, complete input, navigate a region, monitor data, or keep an action
available. If the relationship is unclear, do not hide it behind a grid.

## Pattern Selection Flow

1. Name the section or component job: orient, prove, compare, choose, explain,
   collect input, navigate, monitor, or recover.
2. Identify whether order matters. If yes, prefer `stack`, `singleColumn`, or a
   process/list structure.
3. Identify whether items are peers. If yes, `cardGrid`, `featureGrid`, or
   `comparisonGrid` may fit.
4. Identify whether side-by-side comparison is the task. If yes, use a table,
   matrix, comparison grid, or two-column comparison depending on density.
5. Identify whether two regions must work together. If yes, use `twoColumn`,
   `splitHero`, or a sidebar pattern.
6. Identify whether persistent context is required. If yes, consider `sidebar`,
   sticky UI, drawer, or page-level navigation with interaction guidance.
7. Choose the simplest approved pattern that keeps priority, grouping, and
   action path clear.

## Pattern Criteria

| Relationship | Prefer | Avoid |
| --- | --- | --- |
| One idea or task in sequence | `singleColumn`, `stack` | Grid, tabs, carousel |
| Peer cards with similar anatomy | `cardGrid`, `featureGrid` | Arbitrary asymmetric structure |
| Feature or plan comparison | `comparisonGrid`, table/matrix, `twoColumn` | Cards when row-level comparison matters |
| Message plus supporting proof/form | `splitHero`, `twoColumn` | Decorative second column |
| Persistent filters or secondary navigation | `sidebar`, drawer on narrow screens | Inline filter sprawl |
| Dense operational data | table/matrix, list with filters | Card grid that hides relationships |
| Page-level action must stay reachable | `stickyBar` with responsive notes | Multiple competing sticky actions |

## Responsive Contract

For each breakpoint where structure changes, specify:

- Order: what moves earlier or later.
- Grouping: what stacks, collapses, remains paired, or becomes a repeated unit.
- Action priority: where the primary action remains reachable.
- Navigation and filters: whether they stay visible, become a drawer, or become
  inline controls.
- Dense data: whether tables scroll, stack, summarize, or become cards.
- Persistent UI: what sticks, what dismisses, and what content it must not
  obscure.
- Hidden content: what is hidden, why it is safe, and how users can still reach
  it.

## Anti-Patterns

- Uniform card grid for everything: peer-card structure replaces actual
  hierarchy and sequence.
- Premature visual detail: layout notes describe polish, styling, or exact
  spacing instead of structure.
- Decorative split: the second column has no decision-making role.
- False comparison: unrelated content is placed side by side.
- Hidden mobile action: a primary CTA, filter, form control, or recovery action
  disappears on mobile.
- Table denial: dense comparison data is forced into cards without explaining
  how users compare rows.
- Sticky overload: persistent UI competes with content, focus, or viewport
  space.
- Responsive handwave: notes only say "stacks on mobile" without order,
  grouping, or action priority.

## Validation And Commands

Existing structural anti-pattern validation can catch selected deterministic
layout failures when examples encode them, such as hidden mobile actions or
generic card-grid overuse. Do not add a separate command yet; most layout quality
depends on content relationships and task judgment. A future command should only
check explicit fixture rules, not replace planner judgment.

## Worked Examples

Pricing tiers with feature comparison:

- Desktop: use plan cards or columns for tier selection and a comparison table
  for detailed feature rows.
- Tablet: preserve recommended plan and primary action while reducing secondary
  metadata.
- Mobile: show recommended plan and primary action before stacked plan cards;
  convert dense comparison rows into grouped cards or accordions with clear
  row labels.

Support article:

- Use `singleColumn` or `stack` because reading order matters.
- Do not use `cardGrid` just because the article contains several paragraphs.
- On mobile, preserve headings, steps, warnings, and recovery actions in the same
  task order.
