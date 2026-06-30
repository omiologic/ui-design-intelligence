# Design System Consistency Audit

## Decision Heuristics

Consistency means the seed’s sections can be consumed together without guessing
or resolving contradictions downstream.

## Anti-Pattern

Do not let components reference palette tokens, state names, or actions that do
not exist elsewhere in the seed or shared vocabulary.

## Worked Example

If `button.primary.background` references `color.action.primary`, that color
token must exist in the palette and carry intent and accessibility notes.

## Hand-Off

Return conflicts with the section that should fix them first.
