# Knowledge To Blueprint Reference

## Decision Heuristics

- Use pattern records as constraints, not as complete page copies.
- Map every applied pattern to a concrete section, component, interaction, or
  responsive decision.
- Record assumptions and conflicts before final assembly.
- Fetch and validate full pattern records before using remote or vector search
  results in blueprint decisions.
- Preserve retrieval reasons and storage references for lineage.

## Anti-Pattern

- Do not concatenate matching patterns into a page without a journey.
- Do not suppress pattern conflicts.
- Do not skip lineage when a pattern changes the blueprint.
- Do not generate from an index summary or vector metadata alone.
- Do not use stale, deprecated, or schema-invalid fetched records.

## Worked Example

A dentistry homepage can use a credibility-first healthcare hero for the hero
section and a sticky appointment CTA for mobile conversion support. The final
plan still needs page-specific service, process, FAQ, and footer decisions.
If either match came from remote retrieval, fetch the canonical pattern record
first and include the retrieval reason plus `storageRef` in lineage.

## Hand-Off

Hand the settled plan to `generate-wireframe-config`. Hand lineage notes to
`explain-blueprint-lineage` for review-ready explanation.
