# Design System Seed Orchestration

## Decision Heuristics

Use a seed when the workflow needs stable design-system assumptions before
blueprint or prototype generation. Prefer explicit user-provided and observed
values over inferred, recommended, or generated values.

When style references, brand direction, or screenshot studies inform the seed,
use `references/_shared/design-system/visual-style-calibration.md` before
choosing tokens or component rules. Calibrate contrast, density, hierarchy,
restraint, texture, imagery, motion posture, and category fit into seed fields;
do not leave them as mood words.

## Anti-Pattern

Do not collapse every section into one generic style guide paragraph. The seed
must preserve machine-readable sections, source labels, confidence, usage notes,
and open questions.

Do not treat style calibration as brand voice or prototype behavior. Brand voice
controls language. Prototype behavior controls interaction and runtime posture.
Calibration controls reusable visual choices in the seed.

Do not repair generic output with adjectives alone. Use
`references/_shared/design-system/anti-generic-ui-guidelines.md` to convert
one-note palettes, weak hierarchy, generic cards, over-rounded components,
decorative gradients, vague spacing, default typography, or unsupported visual
flourishes into concrete token, component, density, state, accessibility,
responsive, or handoff decisions.

## Worked Example

For a dental homepage prompt plus screenshot, mark clinic name as
`userProvided`, screenshot color approximations as `observed` with medium
confidence, typography as `recommended`, and missing support colors as
`generated`.

## Hand-Off

After assembly, run `audit-design-system-completeness`,
`audit-design-system-naming`, and `audit-design-system-consistency` before
blueprint or prototype generation consumes the seed.

Before the seed leaves the design-system layer, check
`references/_shared/design-system/design-system-handoff-checklist.md`. The
handoff must identify token names, semantic roles, component coverage, state
coverage, accessibility notes, responsive notes, source references, unresolved
decisions, and any app-facing artifact manifest or run-record status.
