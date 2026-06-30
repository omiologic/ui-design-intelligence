# Section Audit Reporting

Audit a section as a reusable UI unit with a specific job inside a page.

## Decision Heuristics

- Identify the section's job first: orient, explain, prove, compare, convert,
  answer objections, or support navigation.
- Judge whether heading, supporting content, media, proof, and actions match
  that job.
- Check whether the section can stand alone as a reusable pattern without losing
  context.
- Evaluate mobile stacking and reading order when the section contains cards,
  forms, tables, or media.
- Check hierarchy and density: the section should reveal what matters first and
  avoid flattening unrelated content into equal cards.
- Check adjacency only as needed: whether the section receives enough context
  from the prior section and sets up the next action without becoming a page
  audit.

## Evidence Rules

- Observed: section heading, label, role, child structure, proof, controls,
  repeated item anatomy, state notes, responsive notes, or supplied study
  findings.
- Inferred risk: missing section job, missing proof/input/action, or unsupported
  responsive behavior implied by the source.
- Out of scope: page-level ordering, site navigation, visual styling, animation,
  or code behavior unless supplied evidence directly concerns the section.

## Anti-Pattern

Bad: treating a section audit like a full page audit and diluting findings with
unrelated navigation or footer issues.

Corrected: keep the finding target inside the section and hand off broader page
issues to `generate-page-audit-report`.

Bad: calling every dense section "too busy" without naming the structural cause.

Corrected: cite whether density comes from mixed roles, unrelated cards,
unlabeled controls, hidden primary content, or missing grouping.

## Worked Example

For an FAQ section where answers are vague and disclosure controls lack clear
state, create one content finding for insufficient answers and one interaction
finding for disclosure state. Keep both targeted to the FAQ section.

For a feature grid where each card mixes feature, proof, metadata, and CTA, create
a medium structure finding. Recommend separating comparable feature cards from
proof content and using one section-level action when the cards are peers.

## Hand-Off

Hand off section restructuring to `section-wireframe-planner`, repeated component
anatomy to `component-wireframe-planner`, stateful behavior to
`generate-interaction-audit-report`, accessibility issues to
`generate-accessibility-audit-report`, and page-level sequencing issues to
`generate-page-audit-report`.
