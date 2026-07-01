# Index Knowledge Base

## Purpose

Validate project-local pattern records and build a lightweight knowledge index.

## Use When

- Pattern records have been added, edited, merged, or deprecated.
- Search results look stale or incomplete.
- A project-local `ui-knowledge/index.json` needs to be rebuilt.

## Inputs

- Project-local `ui-knowledge/patterns/**/*.pattern.json` records.
- Knowledge schemas and vocabulary from this repository.

## Workflow

1. Run or follow `scripts/validate-knowledge.mjs` behavior for schema and
   vocabulary checks.
2. Use `scripts/index-knowledge.mjs` behavior to scan pattern records.
3. Write a compact index with IDs, paths, tags, confidence, and status.
4. Report duplicate IDs, invalid tags, missing source refs, or deprecated records
   that should not be used for generation.

## Outputs

- Updated `ui-knowledge/index.json`.
- Validation or indexing errors that require curation.

## Agents

- `ui-knowledge-librarian`

## Skills

- `curate-ui-knowledge`
- `search-ui-knowledge`
