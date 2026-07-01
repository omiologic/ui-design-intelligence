# Extract Patterns From Study

## Purpose

Convert study and audit outputs into candidate reusable UI pattern records.

## Use When

- Study findings contain reusable structure, behavior, hierarchy, conversion
  logic, accessibility constraints, or responsive behavior.
- Audit findings should become knowledge candidates before indexing.

## Inputs

- Study output JSON, audit reports, capture references, source IDs, target
  `ui-knowledge/` path, and optional extraction scope.

## Workflow

1. Use `ui-knowledge-librarian` to identify reusable findings.
2. Use `extract-ui-pattern-knowledge` to reject trivial or overly specific
   observations.
3. Normalize tags, confidence, source refs, and wireframe mapping.
4. Save candidate `*.pattern.json` records under project-local
   `ui-knowledge/patterns/`.
5. Mark the knowledge index stale until `index-knowledge-base` runs.

## Outputs

- Candidate pattern records and extraction notes.

## Agents

- `ui-knowledge-librarian`

## Skills

- `extract-ui-pattern-knowledge`
- `curate-ui-knowledge`
