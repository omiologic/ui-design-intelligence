# Generate Design System Seed

## Purpose

Generate a lightweight `DesignSystemSeed` as JSON and Markdown from a prompt,
screenshot, URL capture, study output, knowledge patterns, or mixed input.

## Use When

- A blueprint, wireframe, or prototype workflow needs consistent brand,
  token, component, state, and accessibility assumptions.
- The project needs a seed, not a production design-system governance package.

## Inputs

- User brief, screenshots, URL captures, study output, knowledge patterns, or
  mixed evidence.
- Optional `.ui-design-intelligence.yml` project config.
- Desired output directory for `design-system-seed.json` and
  `design-system-seed.md`.

## Workflow

1. Use `design-system-architect` to determine input type, evidence strength,
   and seed scope.
2. Use focused foundation skills for brand, palette, typography, iconography,
   buttons, cards, header, and footer.
3. Use `generate-design-system-seed` to assemble JSON and Markdown output.
4. Run completeness, naming, and consistency audits.
5. Preserve usage notes and open questions for downstream generation.

## Outputs

- `design-system-seed.json`
- `design-system-seed.md`
- Audit notes and unresolved questions for downstream blueprint/prototype work.

## Agents

- `design-system-architect`

## Skills

- Design-system foundation skill family.
