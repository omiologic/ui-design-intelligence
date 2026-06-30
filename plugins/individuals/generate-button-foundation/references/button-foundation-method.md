# Button Foundation Method

## Decision Heuristics

Choose a button variant by user intent and priority, not by color.

## Anti-Pattern

Do not create `bigButton`, `blueButton`, or style-only variant names.

## Worked Example

If a CTA opens an appointment dialog, use `button.primary` with allowed action
`openDialog`, plus default, hover, focus, active, disabled, and loading states.

## Hand-Off

Return JSON compatible with `button-foundation.schema.json` and preserve
interaction questions for prototype skills.
