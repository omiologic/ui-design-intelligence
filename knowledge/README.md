# UI Knowledge Format Foundation

This directory defines the reusable knowledge-base formats for
`ui-blueprint-skills`. It is not a warehouse for captured websites, client
research, competitor screenshots, or project-specific studies.

The repository owns the format layer:

- `knowledge/schemas/`: JSON schemas for source records, study wrappers, pattern
  records, audit insights, indexes, and blueprint lineage.
- `knowledge/vocabulary/`: controlled tokens for pattern types, source types,
  confidence levels, statuses, and knowledge tags.
- `knowledge/templates/`: markdown templates for hand-authored or reviewed
  knowledge artifacts.
- `knowledge/examples/`: small generic examples that demonstrate schema shape
  without copying real client or competitor archives.

User projects own the archive layer. Real captures, screenshots, studies,
audits, extracted patterns, generated blueprints, and lineage files should live
in a project-local `ui-knowledge/` workspace created for that project.

## Project-Local Archive Shape

A project-local archive should be disposable and client/project scoped:

```txt
ui-knowledge/
  index.json
  sources/
    {source-id}/
      source.json
      pages/
        {page-id}/
          capture/
          studies/
          audits/
          patterns/
  patterns/
    pages/
    sections/
    components/
    interactions/
    storytelling/
    conversion/
  blueprints/
    generated/
  lineage/
    blueprint-lineage/
```

Do not commit project-local `ui-knowledge/` archives to this repository unless a
future task explicitly adds sanitized fixtures under `knowledge/examples/`.

## Artifact Levels

The knowledge system has distinct artifact levels. Keeping them separate
prevents raw observations from becoming copyable design instructions.

| Level | Artifact | Responsibility |
| --- | --- | --- |
| 1 | Capture | Stores page evidence such as URL metadata, screenshots, extracted DOM/text, and raw capture files. |
| 2 | Study | Records evidence-backed observations from study skills. `StudyOutput` answers what was observed. |
| 3 | Audit | Evaluates quality, risk, gaps, severity, and remediation. Audit reports answer what is strong, weak, missing, or risky. |
| 4 | Pattern Knowledge | Extracts reusable UI structure, behavior, hierarchy, conversion logic, accessibility constraints, or responsive rules from evidence. |
| 5 | Knowledge Index | Summarizes pattern records for fast lookup by tags such as industry, page type, section type, conversion goal, and confidence. |
| 6 | Blueprint | Applies selected patterns to a new planned UI structure or UIBlueprint wireframe. |
| 7 | Lineage | Records which patterns influenced a generated blueprint and why. |

## Evidence vs Reusable Knowledge

`StudyOutput` stays evidence-based. It should preserve source observations,
interpretations, and downstream handoff notes without pretending one observed
page is a reusable rule.

Pattern records carry reusable knowledge. A pattern record should abstract from
one or more studies or audits into a reusable recommendation, retain source
references, declare confidence, and avoid copying exact page composition.

In short:

- Study output answers: what did we observe?
- Audit output answers: what is strong, weak, missing, or risky?
- Pattern knowledge answers: what reusable design pattern can be applied later?
- Blueprint output answers: what should be built or wireframed now?

## Sprint 003 Boundary

Sprint 003 establishes this directory and the format foundation. Later Sprint
003 tasks will add vocabulary, templates, examples, validation scripts,
workspace initialization, skills, commands, agents, and bundle packaging.

Initial schemas are defined in `knowledge/schemas/`:

- `source-record.schema.json`
- `study-record.schema.json`
- `pattern-record.schema.json`
- `audit-insight.schema.json`
- `knowledge-index.schema.json`
- `blueprint-lineage.schema.json`

## Validation And Indexing

Knowledge records are checked by deterministic scripts:

```bash
npm run validate:knowledge
npm run validate:knowledge-index
```

`validate:knowledge` checks schema shape, unique pattern IDs, approved tag
vocabulary, approved confidence/status values, required `sourceRefs`, and
wireframe mapping vocabulary. `validate:knowledge-index` verifies that
`knowledge/examples/knowledge-index.example.json` is generated from the seed
pattern records.

These checks intentionally do not judge whether a pattern is strategically good,
whether its confidence should be raised, or whether it should be merged with a
near-duplicate. Those remain curation and review responsibilities.

## Workspace Initialization

Create a project-local archive with:

```bash
node scripts/init-knowledge-workspace.mjs --out ./ui-knowledge
```

The script creates an empty `index.json`, source/page capture folders, study and
audit folders, pattern folders, generated blueprint storage, and lineage
storage. Use `--check` to validate the planned structure without writing files:

```bash
node scripts/init-knowledge-workspace.mjs --out ./ui-knowledge --check
```

The initialized workspace belongs to the user project. Keep real captures,
screenshots, studies, audits, and generated client work out of this plugin
repository unless they are intentionally sanitized as examples.
