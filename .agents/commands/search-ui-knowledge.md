# Search UI Knowledge

## Purpose

Retrieve relevant pattern records from a knowledge index for a brief or blueprint
request.

## Use When

- A page, section, component, interaction, or conversion brief should be informed
  by existing reusable knowledge.
- The user asks which known patterns apply to a new UI problem.

## Inputs

- Project brief, page type, industry, audience, conversion goal, component type,
  interaction type, and `ui-knowledge/index.json`.

## Workflow

1. Use `search-ui-knowledge` to convert the brief into query tags.
2. Load the knowledge index and filter out deprecated patterns.
3. Rank matches by relevance, confidence, status, and specificity.
4. Return compact matches with reasons and recommended use.
5. Identify missing query dimensions or tag gaps.

## Outputs

- Ranked pattern matches with reasons, recommended use, and retrieval gaps.

## Agents

- `ui-knowledge-librarian`

## Skills

- `search-ui-knowledge`
- `curate-ui-knowledge`
