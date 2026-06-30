# Design System Seed Orchestration

## Decision Heuristics

Use a seed when the workflow needs stable design-system assumptions before
blueprint or prototype generation. Prefer explicit user-provided and observed
values over inferred, recommended, or generated values.

## Anti-Pattern

Do not collapse every section into one generic style guide paragraph. The seed
must preserve machine-readable sections, source labels, confidence, usage notes,
and open questions.

## Worked Example

For a dental homepage prompt plus screenshot, mark clinic name as
`userProvided`, screenshot color approximations as `observed` with medium
confidence, typography as `recommended`, and missing support colors as
`generated`.

## Hand-Off

After assembly, run `audit-design-system-completeness`,
`audit-design-system-naming`, and `audit-design-system-consistency` before
blueprint or prototype generation consumes the seed.
