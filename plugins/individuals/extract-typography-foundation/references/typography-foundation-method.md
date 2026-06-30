# Typography Foundation Method

## Decision Heuristics

Typography in Sprint 003 should be consistent before it is final. Recommend
safe defaults when source evidence is weak.

## Anti-Pattern

Do not infer a commercial font from a screenshot and mark it as observed.

## Worked Example

Use `Inter, system-ui, sans-serif` as `recommended` when no CSS evidence exists,
and define `h1`, `h2`, and `body` roles with usage notes.

## Hand-Off

Return typography JSON compatible with `typography-foundation.schema.json`.
