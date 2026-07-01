# Component Selection Guidelines

Use this guide when a user task can be represented by more than one component
pattern. Component selection is a product decision, not a naming preference: the
right pattern depends on comparison needs, density, interruption cost,
hierarchy, mobile behavior, and accessibility.

This guide complements `shared/examples/component-decision-tree.example.json`,
`shared/vocabulary/component-anatomy.json`,
`shared/vocabulary/component-variants.json`,
`shared/design-system/component-anatomy-reference.md`, and
`shared/design-system/component-state-guidelines.md`.

## Selection Principles

1. Start with the user job. Choose the pattern that makes the next decision
   easiest, not the pattern that looks most modern.
2. Preserve comparison when users must compare values across multiple items.
3. Preserve context when interrupting the current task would increase risk or
   cognitive load.
4. Prefer explicit controls over hidden controls when options are few and
   high-impact.
5. Choose mobile behavior before choosing desktop decoration.
6. Treat keyboard, focus, labeling, error recovery, and screen-reader behavior
   as selection criteria, not implementation cleanup.
7. Do not use a complex component to compensate for weak hierarchy or unclear
   information architecture.

## Common Component Decisions

| Decision | Prefer first option when | Prefer second option when | Watch for |
| --- | --- | --- | --- |
| Table vs card list | Users compare columns, scan many records, sort/filter, select rows, or need dense operational data. | Users inspect rich objects, media, summaries, or heterogeneous actions where each item has a different story. | Cards make comparison expensive; tables make rich browsing feel cramped. |
| Tabs vs segmented control | Content panes are substantial, mutually exclusive, and need persistent structure or deep links. | A compact mode/filter switch changes one view, metric, period, or state without changing page structure. | Tabs used as filters; segmented controls hiding large content regions. |
| Modal vs drawer | The task is short, blocking, requires confirmation, or must keep focus tightly trapped. | The task needs side-by-side context, longer forms, inspect/edit flow, or progressive details while the page remains a reference. | Modals for long workflows; drawers for destructive confirmations that need full attention. |
| Dropdown vs combobox | The option set is short, known, and users choose one visible label. | Users search, filter, create, or select from a long or remote option set. | Comboboxes without search value; dropdowns with hundreds of options. |
| Accordion vs progressive disclosure | Multiple independent sections can expand/collapse and users may jump between them. | The experience reveals the next relevant details, questions, or controls based on prior context. | Accordions hiding required steps; progressive disclosure that obscures available choices. |

## Criteria

### Density

- High-density operational views favor tables, compact lists, segmented
  controls, inline filters, and persistent toolbars.
- Low-density storytelling or product browsing can use cards, feature panels,
  media-led lists, and larger content blocks.
- Density must stay tied to scan behavior. Spacious components are still poor
  if they force users to open every item to compare basics.

### Comparison

- Use tables when users compare the same fields across records.
- Use card lists when users compare qualitative summaries, images, trust
  signals, or feature packages.
- Use tabs only when comparison across panes is not the primary job. If users
  need side-by-side comparison, tabs are usually the wrong pattern.

### Interruption

- Use modals for short, blocking, reversible or confirmable tasks.
- Use drawers when preserving the underlying page context helps the task.
- Avoid overlays when a full page, inline edit, or expandable region would
  reduce focus and recovery complexity.

### Hierarchy

- Choose components that make primary action, secondary action, and supporting
  content obvious without extra decoration.
- If every item needs a primary CTA, check whether the page lacks a clearer
  grouping, filter, or recommendation model.
- If a component needs many badges, icons, and color accents to communicate
  priority, the chosen pattern may be too weak.

### Mobile Behavior

- Tables need a mobile strategy before approval: priority columns, horizontal
  scroll, row detail expansion, card conversion, or summary-first list.
- Drawers need edge, width, dismissal, and focus behavior for small screens.
- Tabs and segmented controls need overflow, wrapping, or reduced option counts.
- Accordions must keep headings, expanded state, and focus order clear.

### Accessibility

- Prefer native semantics when they fit: table, button, link, form control,
  heading, list, dialog.
- Tabs require correct tablist/tab/tabpanel relationships and keyboard behavior.
- Comboboxes require input value, option announcement, active descendant or
  focus management, and clear empty/no-result states.
- Dialogs and drawers require focus trap, visible close, escape behavior where
  allowed, and focus return.
- Accordions require button headings, expanded/collapsed state, and clear region
  relationships when content is complex.

## Prototype And Behavior Cross-Reference

Component choice changes prototype requirements:

- Tables and card lists need empty, loading, error, filtered, paginated, and
  selected states when data availability changes the task.
- Tabs and accordions need selected/expanded state, keyboard behavior, and
  content relationship notes.
- Modals and drawers need trigger, open, close, dismissal, focus trap, focus
  return, and responsive behavior.
- Dropdowns and comboboxes need opening, selection, keyboard navigation, empty
  results, validation, and disabled states.
- Progressive disclosure needs trigger conditions, revealed content, reversal
  behavior, and guardrails for required information.

Use `shared/design-system/component-state-guidelines.md` for reusable states and
hand prototype-specific flows to prototype skills after stable node IDs exist.

## Design-System Seed Guidance

When generating or auditing a `DesignSystemSeed`, component selection guidance
should appear as component rules, variants, and handoff notes:

- `components.cards.rules`: when cards are appropriate, when tables or lists
  should replace them, and what anatomy is required.
- `components.header.rules`: when tabs, segmented controls, or menus may appear
  in navigation regions.
- `components.buttons.rules`: when a destructive action requires dialog,
  inline confirmation, or no overlay.
- `usageNotes`: cross-component tradeoffs that downstream wireframe and
  prototype agents must preserve.
- `openQuestions`: unresolved data volume, mobile behavior, accessibility, or
  comparison requirements that block confident selection.

Do not encode one component as the default for every page type. Component
selection should vary with domain, data shape, user intent, and device.

## Audit Prompts

Use these prompts when reviewing a wireframe, design spec, prototype config, or
seed:

- Table/card mismatch: Are users expected to compare repeated fields, but the
  design uses cards? Are users expected to inspect rich objects, but the design
  uses a cramped table?
- Tabs/filter mismatch: Do tabs merely change a small filter value? Does a
  segmented control hide substantial page sections?
- Overlay mismatch: Is a modal carrying a long workflow that needs page context?
  Is a drawer being used for a destructive confirmation that should block the
  task?
- Select/search mismatch: Is a dropdown hiding a large or searchable option
  set? Is a combobox overbuilt for three known choices?
- Disclosure mismatch: Are required steps hidden in accordions? Does
  progressive disclosure prevent users from understanding what information will
  be needed?
- Mobile mismatch: Has the selected component defined what stacks, scrolls,
  collapses, remains sticky, or becomes a summary?
- Accessibility mismatch: Does the chosen component imply ARIA, keyboard, focus,
  labeling, or error behavior that the spec or prototype does not model?

## Stop Conditions

Stop and ask for clarification or preserve an open question when:

- data volume is unknown and the choice depends on comparison density
- the user task could be blocking or contextual and overlay choice is unclear
- mobile behavior changes the component pattern
- required keyboard/focus behavior cannot be represented
- the component choice would force downstream agents to invent missing states
