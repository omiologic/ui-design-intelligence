# Knowledge Curation Reference

## Decision Heuristics

- Accept records that are reusable, evidence-backed, and clear enough to guide a
  future wireframe decision.
- Merge when two records would answer the same query with the same advice.
- Promote confidence only when evidence or review history supports it.

## Anti-Pattern

- Do not use the knowledge base as a notes archive.
- Do not keep vague tags just to increase match rates.
- Do not delete traceability when merging records.

## Worked Example

Two candidate patterns both recommend proof before appointment booking. Merge
them when the reusable structure is the same, preserving both source refs and
using the stronger summary.

## Hand-Off

Hand accepted records to `index-knowledge-base`. Hand rejected or merged
decisions back to extraction notes if the source workflow needs an audit trail.
