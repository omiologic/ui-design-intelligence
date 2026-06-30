# Generate Style Library

## Purpose

Create or extend a schema-valid style-reference library with original,
source-aware UI style records.

## Use When

- A project or repository needs reusable style records.
- External reference summaries, screenshots, or prompts should become normalized
  style data.
- The starter library needs a new style category or style record.

## Inputs

- Style brief, source summary, optional screenshot or study references, target
  category, source/license notes, and target library path.

## Workflow

1. Use `style-reference-curator` to decide whether the style belongs in the
   shared library.
2. Use `extract-style-from-reference` when source material needs abstraction.
3. Use `generate-style-reference` to produce a schema-valid record.
4. Audit source/license notes and UI mappings before saving.
5. Update the style-reference index after accepting the record.

## Outputs

- Candidate or accepted `*.style.json` records, index update notes, and audit
  follow-ups.

## Agents

- `style-reference-curator`

## Skills

- `extract-style-from-reference`
- `generate-style-reference`
- `audit-style-application`
