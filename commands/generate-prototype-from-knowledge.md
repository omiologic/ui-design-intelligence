# Generate Prototype From Knowledge

## Purpose

Generate prototype behavior from indexed UI knowledge patterns and apply it to a
target blueprint or wireframe.

## Use When

- Existing knowledge patterns describe reusable behavior such as sticky CTAs,
  drawers, dialogs, validation, onboarding, or checkout flows.
- A prototype needs behavior recommendations grounded in stored study evidence.
- The output must remain structured config, not runtime code.

## Inputs

- Knowledge search results or pattern records.
- Target blueprint or wireframe config with stable node ids.
- Optional `DesignSystemSeed`.
- User requirements, constraints, and preferred prototype journey.

## Workflow

1. Use `prototype-architect` to classify behavior patterns and target nodes.
2. Study pattern evidence with `study-ui-prototype-behavior`.
3. Convert selected patterns into component state models and interaction flows.
4. Assemble `PrototypeConfig` against the target wireframe references.
5. Generate a clickable prototype plan that cites selected patterns.
6. Audit references, accessibility coverage, responsive behavior, and open
   questions.

## Outputs

- `prototype-config.json`
- Pattern-to-behavior mapping notes.
- Clickable prototype plan.
- Audit findings and unresolved evidence gaps.

## Agents

- `prototype-architect`

## Skills

- `study-ui-prototype-behavior`
- `generate-interactive-prototype-config`
- `generate-component-state-model`
- `generate-interaction-flow`
- `generate-clickable-prototype-plan`
- `audit-prototype-interactions`
