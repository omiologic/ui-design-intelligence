---
name: study-ui-responsive-behavior
description: Study responsive layout behavior, breakpoint changes, collapsed navigation, reordered content, and mobile-specific UI risks from captured page evidence.
license: See repository LICENSE
---

# Study UI Responsive Behavior

Use this skill when desktop, tablet, or mobile captures need comparison before audit or blueprint work.

## Purpose

Document structural changes across viewports, including navigation, columns, ordering, tables, sticky elements, forms, and overlays.

## Philosophy

Responsive study is about task equivalence, not visual resizing. A smaller
viewport can change structure, but it should not erase orientation, comparison,
input, recovery, or primary action access. Study what actually changes across
captures and mark missing breakpoints or hidden states explicitly.

## Evidence Discipline

Compare like-for-like captures before declaring responsive behavior. Only record
changes visible across provided viewports, and mark missing breakpoints or
untested states explicitly. Do not infer quality from visual polish; focus on
whether information and action priority survive the viewport change.

## References

- `references/responsive-observation.md`
- `references/responsive-study-method.md`
- `references/_shared/schemas/study-output.schema.json`
- `references/_shared/templates/page-study.md`
- `references/_shared/vocabulary/ui-terminology.json`
- `references/_shared/examples/page-study.example.json`
- `../../../shared/workflows/capture-manifest-consumption.md`
- `../../../shared/templates/capture-manifest.example.json`

## Boundary

- Owns: observable responsive structure findings across viewport sizes — navigation collapse behavior, column shifts, element reordering, table behavior, sticky element placement, form layout, and overlay behavior at breakpoints.
- Does not own: interaction state study, accessibility evaluation, or responsive design recommendations.
- Hand off interaction changes at breakpoints to `study-ui-interaction`.
- Hand off accessibility implications of responsive layout to `study-ui-accessibility`.

## Rules

1. Compare structure across viewports rather than describing visual polish.
2. Identify collapsed navigation, reordered content, simplified tables, stacked cards, full-width forms, and sticky UI.
3. Flag cases where mobile hides required content or actions.
4. Hand off layout decisions to `layout-specification` and accessibility risks to `study-ui-accessibility`.
5. Preserve observed, inferred, and missing-evidence categories in findings.
6. Do not declare responsive behavior from one viewport or from cosmetic changes
   alone.
7. Treat `capture-manifest.json` as the viewport evidence index when supplied:
   compare successful captures by viewport and record missing or failed
   breakpoint captures as explicit gaps.
8. Reference browser screenshot commands only for explicit live-page breakpoint
   capture workflows; no subagent is needed by default.

## Method

1. If `capture-manifest.json` is supplied, group captures and failed captures
   by viewport before comparing behavior.
2. Create a viewport comparison table for desktop, tablet if available, and
   mobile.
3. Track navigation, first viewport content, primary CTA, section order, repeated
   grids, tables, forms, overlays, and sticky UI across each viewport.
4. Record structural changes as preserved, reordered, collapsed, hidden, or
   transformed.
5. Check dense data, filters, form controls, support, recovery, and hidden
   content for preserved access paths.
6. Flag responsive equivalence risks where a user loses the ability to orient,
   compare, input, recover, or act.
7. Mark absent captures, failed viewport captures, or untested interactions as
   missing evidence.

## Anti-Patterns

- Responsiveness without evidence: declaring behavior from a single viewport.
- Smaller-only description: focusing on font, spacing, crop, or visual polish
  instead of structural task changes.
- Hidden mobile action: primary CTA, filters, form submit, recovery, or support
  disappears.
- Drawer black box: navigation or filters collapse but the open state is not
  captured.
- Table denial: comparison data becomes cards or disclosure without row labels,
  summary, or comparison path.
- Sticky obstruction: persistent UI may cover content, fields, errors, or CTAs
  without dismissal evidence.
- Missing evidence erased: tablet, open drawer, expanded table, overlay, or
  error states are not recorded as unknown.

## Inline Example

Input evidence: desktop pricing uses three columns plus a comparison table;
mobile stacks plans, hides the comparison table behind "View all features", and
adds sticky checkout CTA.

Finding: observed desktop-to-mobile transformation is columns to stack, table to
disclosure, and CTA to sticky bar; action priority is preserved; comparison is
available but more hidden; missing evidence is expanded mobile table behavior.

Structured finding:

- Observed: desktop plan columns become stacked mobile cards; comparison table
  becomes `View all features`; checkout CTA becomes sticky.
- Inferred: primary action priority is preserved because checkout remains
  visible near the plan summary.
- Risk: mobile comparison requires extra disclosure and may be harder to scan.
- Missing evidence: expanded comparison behavior, sticky CTA overlap, keyboard
  and focus behavior, and tablet layout.
- Handoff: `layout-specification` for breakpoint notes and
  `study-ui-accessibility` for hidden comparison and sticky UI risks.

## Hand-Offs

- Send layout transformation decisions to `layout-specification`.
- Send hidden content and sticky UI risks to `study-ui-accessibility`.
- Send responsive notes to `generate-ui-blueprint-from-study`.
