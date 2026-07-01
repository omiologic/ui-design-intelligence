# Generate Prototype From Blueprint

## Purpose

Generate `PrototypeConfig` artifacts from an existing blueprint, wireframe
config, and optional design-system seed.

## Use When

- A static blueprint needs screens, routes, states, interactions, overlays,
  forms, navigation flows, and transitions.
- The workflow has a known node map and should not duplicate layout structure.
- The output should prepare a future runtime handoff, not implement one.

## Inputs

- Blueprint or wireframe config with stable node ids.
- Optional `DesignSystemSeed` for state, component, and accessibility
  conventions.
- User behavior requirements and known viewport needs.
- Optional output directory for `prototype-config.json` and plan notes.
- Optional reference to `docs/interop/design-system-prototype-pipeline.md` for
  artifact order and runtime split boundaries.
- Optional `.convention/recipes/prototype.recipe.md` when the output should follow
  the Sprint 006 consumer prototype artifact contract.

## Workflow

1. Use `prototype-architect` to identify source artifacts and behavior scope.
2. Generate component state models for dialogs, forms, menus, sticky bars, and
   other interactive nodes.
3. Generate interaction flows for primary click, tap, key, submit, overlay, and
   navigation behavior.
4. Assemble `PrototypeConfig` with explicit wireframe references.
5. Generate a clickable prototype plan.
6. Audit prototype interactions and record unresolved questions.

## Outputs

- `prototype-config.json`
- Component state model notes or JSON snippets.
- Interaction flow notes or JSON snippets.
- Clickable prototype plan and audit findings.
- Consumer workflow default file: `prototype-plan.md`.

## Agents

- `prototype-architect`

## Skills

- `generate-interactive-prototype-config`
- `generate-component-state-model`
- `generate-interaction-flow`
- `generate-clickable-prototype-plan`
- `audit-prototype-interactions`
