---
name: study-ui-accessibility
description: Study observable accessibility structure, landmark cues, focus risks, form labeling, keyboard behavior, and responsive accessibility concerns.
license: See repository LICENSE
---

# Study UI Accessibility

Use this skill when a captured page needs observable accessibility study before audit or blueprint generation.

## Purpose

Identify accessibility-relevant structure and risks visible from page captures or descriptions, especially landmarks, labels, focus paths, forms, overlays, and responsive behavior.

## Philosophy

Accessibility study is evidence collection before judgment. The goal is to make
structural access visible early: what users can find, understand, operate,
dismiss, submit, and recover from. Static captures can reveal risks, but they do
not prove technical conformance or failure without implementation, keyboard, DOM,
or assistive-technology evidence.

## Evidence Discipline

This skill studies observable accessibility structure; it does not claim full
WCAG conformance without DOM, keyboard, screen reader, or automated test
evidence. Record visible labels, landmarks, headings, focus cues, form
relationships, overlays, and responsive risks, and mark implementation-only
questions as unverified.

## References

- `references/accessibility-observation.md`
- `references/accessibility-study-method.md`
- `references/_shared/schemas/study-output.schema.json`
- `references/_shared/templates/page-study.md`
- `references/_shared/vocabulary/ui-terminology.json`
- `references/_shared/examples/page-study.example.json`

## Boundary

- Owns: observed accessibility findings from page captures or descriptions — landmark presence, label coverage, focus path logic, form grouping, overlay behavior, and responsive reading order as observable structure.
- Does not own: structured audit findings with severity ratings, design recommendations, or wireframe planning.
- Hand off formal accessibility audit reports to `generate-accessibility-audit-report`.
- Hand off interaction behavior observation to `study-ui-interaction`.

## Rules

1. Distinguish observable evidence from issues that require DOM or assistive technology testing.
2. Record landmark, navigation, heading, form, focus, overlay, and sticky UI risks.
3. Note missing evidence explicitly instead of assuming implementation failure.
4. Hand off confirmed risks to accessibility audit and blueprint review skills.
5. Preserve observed, inferred, and missing-evidence categories in every
   meaningful finding.
6. Reference browser, keyboard, DOM, or automated validation only when that
   evidence is available or when recommending future evidence collection.
7. Do not add a subagent by default; use a separate evidence collection pass only
   when live-page testing is explicitly in scope.

## Method

1. Scan the visible structure for landmarks, heading hierarchy, navigation cues,
   form labels, helper/error text, overlay controls, and sticky UI.
2. Check observable signals for labels, names, landmarks, heading order, form
   recovery, focus risks, keyboard-sensitive components, and responsive access.
3. Identify risks visible from the capture, such as unlabeled icon-only controls,
   missing form helper/error areas, ambiguous focus return, or hidden mobile
   actions.
4. Separate confirmed visual-structure risks from implementation questions such
   as DOM order, ARIA, focus trap, and keyboard handling.
5. Tie each finding to visible evidence and, when possible, a section or
   component label.
6. Hand off severe or unverified issues to audit or blueprint review with the
   exact missing evidence.

## Anti-Patterns

- Conformance leap: claiming accessibility because headings or labels appear
  visually clean.
- Failure leap: claiming ARIA, DOM order, keyboard behavior, or accessible names
  are missing from a screenshot without implementation evidence.
- Visual-only study: ignoring focus, keyboard, responsive access, and recovery
  paths.
- Color-only critique: making contrast claims without supplied measurements or
  visual-testing evidence.
- Issue without target: reporting a risk without naming the affected region,
  component, control, or task.
- Missing evidence erased: leaving unknown DOM, keyboard, or assistive-tech
  questions out of the handoff.

## Inline Example

Input evidence: a checkout drawer is visible with an "X" icon, email field,
coupon field, submit button, and no visible error/help text.

Finding: observed accessibility risk is icon-only close control without visible
label and form fields without visible helper/error areas; inferred risk is focus
trap and return-focus behavior; missing evidence requires DOM or keyboard test.

Structured finding:

- Observed: checkout drawer, icon-only close control, email field, coupon field,
  submit button, no visible helper/error text in the capture.
- Inferred: close control naming, focus trap, return focus, and sticky/overlay
  recovery may be risks.
- Missing evidence: DOM labels, ARIA names, keyboard path, validation states,
  error association, loading, and success behavior.
- Handoff: `accessibility-wireframe-review` for structural fix guidance and
  `study-ui-interaction` for state and dismissal behavior.

## Hand-Offs

- Send observed structural risks to `accessibility-wireframe-review`.
- Send interaction-specific focus or dismissal questions to
  `study-ui-interaction`.
- Send confirmed form and overlay requirements to `generate-ui-blueprint-from-study`.
