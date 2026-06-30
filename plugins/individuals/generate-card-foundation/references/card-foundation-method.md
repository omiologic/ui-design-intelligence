# Card Foundation Method

## Decision Heuristics

Start from content purpose: service overview, feature explanation, product
preview, or testimonial proof.

## Anti-Pattern

Do not use a generic `card` variant for every repeated item when jobs differ.

## Worked Example

A dental services grid should use `card.service` with title, description, and
actions; a review section should use `card.testimonial`.

## Hand-Off

Return JSON compatible with `card-foundation.schema.json`.
