# Explain Blueprint Lineage

## Purpose

Explain which reusable pattern records influenced a generated blueprint and why.

## Use When

- A blueprint needs reviewable reasoning and traceability.
- A stakeholder asks why a section, component, or interaction exists.
- The team needs to audit whether pattern use was appropriate.

## Inputs

- Blueprint lineage JSON, generated blueprint references, pattern IDs, source
  refs, assumptions, and unresolved gaps.

## Workflow

1. Read the lineage record and generated output references.
2. Use `explain-blueprint-lineage` to group pattern influence by decision.
3. Explain why each pattern matched the brief or query.
4. Separate evidence-backed decisions from assumptions and gaps.
5. Recommend curation or audit follow-up when lineage is weak.

## Outputs

- Lineage explanation suitable for review, handoff, or audit.
- Open questions and curation follow-ups.

## Agents

- `ui-knowledge-librarian`
- `blueprint-architect`

## Skills

- `explain-blueprint-lineage`
- `curate-ui-knowledge`
