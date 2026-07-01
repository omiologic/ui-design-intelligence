# Extract Copy Patterns From Study

## Purpose

Extract reusable copy, CTA, microcopy, journey, objection, or voice patterns
from evidence-backed study outputs without copying protected page text.

## Use When

- A study identifies reusable content behavior worth storing as knowledge.
- Copy or journey behavior should become a pattern for future generation.
- Content knowledge needs source references, confidence, status, and review
  boundaries.

## Inputs

- Study output, audit findings, or source notes.
- Evidence references and source IDs.
- Pattern type to extract when known: copy, journey, objection, or voice.
- Optional project-local `ui-knowledge/content/` path.

Stop when the source evidence is missing or the proposed pattern would copy
external wording instead of abstracting reusable structure.

## Workflow

1. Use `ux-content-strategist` to identify reusable content behavior.
2. Use `extract-copy-patterns-from-study` to choose the correct knowledge schema:
   copy pattern, journey pattern, objection pattern, or voice profile.
3. Preserve sourceRefs, confidence, status, and review risks.
4. Use `curate-ui-knowledge` later when pattern approval or merging is needed.
5. Save or return candidate records for local knowledge storage.

## Outputs

- Candidate content knowledge records.
- Suggested storage paths under `ui-knowledge/content/`.
- Curation notes and unresolved evidence gaps.

## Agents

- `ux-content-strategist`
- Optional: `ui-knowledge-librarian`

## Skills

- `extract-copy-patterns-from-study`
- Optional: `curate-ui-knowledge`
- Optional: `search-ui-knowledge`
