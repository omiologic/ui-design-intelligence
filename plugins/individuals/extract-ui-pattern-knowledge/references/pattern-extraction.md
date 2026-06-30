# Pattern Extraction Reference

## Decision Heuristics

- Save a pattern when the observation changes future structure, hierarchy,
  interaction, conversion, accessibility, responsive behavior, or handoff.
- Require traceable evidence through study or audit IDs and finding labels.
- Prefer smaller reusable patterns over broad page imitations.

## Anti-Pattern

- Do not turn one page's full composition into a reusable blueprint.
- Do not save decorative choices, final copy, brand treatment, or image style.
- Do not assign tags that are not supported by the source evidence.

## Worked Example

Evidence: a service page establishes clinical credibility before asking for a
consultation.

Reusable pattern: a healthcare hero should keep headline, trust signal, support
copy, and primary CTA together before detailed service explanation.

## Hand-Off

Hand candidate records to `curate-ui-knowledge` for merge, status, and
confidence decisions. Hand saved records to `index-knowledge.mjs` through the
`index-knowledge-base` command.
