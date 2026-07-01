---
name: accessibility-wireframe-review
description: Review UIBlueprint wireframes for accessibility issues in structure, landmarks, navigation, forms, dialogs, drawers, tabs, accordions, focus behavior, and responsive layout.
license: See repository LICENSE
---

# Accessibility Wireframe Review

Use this skill when a UI blueprint wireframe needs accessibility review before visual design or implementation.

## Purpose

Catch structural accessibility risks at wireframe fidelity, especially for
navigation, forms, overlays, responsive behavior, and interaction states.

## Philosophy

Accessibility review belongs in the wireframe because many failures are
structural before they are visual. Labels, landmarks, focus order, error
relationships, state clarity, and responsive access are cheaper to fix before
visual design and implementation harden the wrong structure.

## References

- `references/accessibility-checklist.md`
- `references/accessibility-severity.md`
- `references/dialog-accessibility.md`
- `references/_shared/wireframe-schema/valid-node-types.md`
- `references/_shared/vocabulary/node-types.json`
- `references/_shared/design-philosophy/preflight-checklist.md`

## Decision Criteria

1. Critical: the user cannot find, understand, operate, dismiss, submit, recover,
   or navigate the structure with keyboard or assistive technology.
2. Major: the task is possible but labels, state, grouping, focus, or responsive
   order create likely failure or high cognitive load.
3. Minor: the structure is understandable but annotations are incomplete enough
   to create handoff ambiguity.
4. Prefer fixes that preserve the intended journey before adding extra UI.
5. When issues compete, prioritize navigation, input, feedback, and overlays
   before static supporting content.
6. Use follow-up, not severity, for concerns that require visual styling,
   implementation, or content evidence outside the wireframe.

## Boundary

- Owns: structural accessibility review at wireframe fidelity — landmark presence, label coverage, focus path logic, form grouping, overlay dismissal contracts, and responsive reading order in structural plans.
- Does not own: visual polish, final production accessibility testing, WCAG compliance certification, or audit findings on deployed UIs.
- Hand off accessibility findings on existing UIs to `generate-accessibility-audit-report`.
- Hand off structural layout decisions to `page-wireframe-planner` or `section-wireframe-planner`.

## Rules

1. Review structure before visual details.
2. Check landmarks, navigation order, form labels, helper and error text,
   overlay focus, keyboard paths, and responsive equivalence.
3. Report issues with concrete node paths or IDs when available.
4. Suggest schema-compatible fixes using approved node types and accessibility
   fields.
5. Separate observed structural failures from assumptions that require design,
   content, or implementation follow-up.
6. Do not add a separate command for this review unless the repository gains
   deterministic fixtures for the specific accessibility condition being tested.
   Keep this skill self-contained unless a future audit workflow needs a
   dedicated accessibility subagent.

## Anti-Patterns

- Landmark gaps: the page has content but no reliable navigation, main, or footer
  structure.
- Unlabeled input path: forms collect data without labels, helper text, error
  placement, or recovery state.
- Overlay without focus contract: users can enter a dialog or drawer but cannot
  reliably move, dismiss, or return.
- Responsive loss: mobile removes or buries the same action that desktop makes
  primary.
- Deferred structural accessibility: the wireframe marks labels, focus, or error
  behavior as "implementation detail" even though the structure determines the
  user path.

## Workflow

1. Scan the node tree for landmarks, navigation, main task sequence, and footer.
2. Review all controls, forms, overlays, hidden content, sticky UI, and responsive
   notes.
3. Classify each issue by severity and tie it to a node path or ID.
4. Propose the smallest schema-compatible structural fix.
5. Note residual risks that require visual, content, or implementation review.

## Inline Example

Input: checkout drawer with coupon field, close icon, and submit button.

Output: major issue if the drawer lacks focus return because users can lose
their place after dismissal; major issue if coupon errors are not connected to
the input because recovery is blocked; minor issue if close icon label is
unspecified but the close action is otherwise modeled.

## Hand-Offs

- Use `interaction-patterns` when the fix requires a clearer focus, dismissal, or
  state model.
- Use `component-wireframe-planner` when form, tab, accordion, or drawer anatomy
  needs restructuring.
- Use `page-wireframe-planner` when the accessibility issue comes from page order
  or responsive priority.
