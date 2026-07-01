# Lineage Explanation Reference

## Decision Heuristics

- Explain pattern influence at the level of actual blueprint decisions.
- Separate retrieved pattern fit from source evidence and assumptions.
- Highlight missing or stale lineage.
- Include canonical `storageRef` values, retrieval reasons, and generated
  output references when present.

## Anti-Pattern

- Do not imply direct source copying.
- Do not collapse all pattern use into one generic rationale.
- Do not omit unresolved gaps that affect review.
- Do not hide missing, stale, or deprecated storage-backed pattern references.
- Do not print secret-bearing URLs or account-specific storage details.

## Worked Example

Lineage says `credibility-first-healthcare-hero` was used for the hero. Explain
that it supports trust before consultation booking and identify the source refs
or confidence level behind it.
If lineage includes a canonical storage reference, mention that the reviewer can
refetch the validated pattern record from the configured storage layer without
exposing bucket or account details in the explanation.

## Hand-Off

Hand weak-pattern concerns to `curate-ui-knowledge`. Hand unresolved blueprint
quality questions to audit or accessibility review skills.
