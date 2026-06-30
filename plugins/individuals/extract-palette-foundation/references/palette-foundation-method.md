# Palette Foundation Method

## Decision Heuristics

Choose semantic roles first, then values. If the value is screenshot-derived,
set medium or low confidence and explain the limitation.

## Anti-Pattern

Do not make the seed look authoritative when values are approximate. Exact hex
confidence requires CSS, brand assets, or user input.

## Worked Example

`color.action.primary` can use an observed screenshot blue with medium
confidence and note that it is approximate. `color.surface.subtle` can be
generated to support section grouping.

## Hand-Off

Return palette JSON that validates against `palette-foundation.schema.json` and
preserve contrast questions for audit.
