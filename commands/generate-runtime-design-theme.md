# Generate Runtime Design Theme

## Purpose

Generate `runtime-design-theme.json` from a design-system seed, style
references, study evidence, capture manifests, brand assets, or mixed input.

## Use When

- A prototype viewer, editor, or future runtime needs machine-readable theme
  data.
- The existing `DesignSystemSeed` is too lightweight for runtime styling.
- The project needs semantic palette groups, status roles, interaction-state
  styling, brand asset refs, component theme mappings, or CSS variable groups.

## Inputs

- Required or preferred `design-system-seed.json`.
- Optional style reference, style application, study output, capture manifest,
  visual-experience spec, or brand asset refs.
- Target output path for `runtime-design-theme.json`.
- Any known runtime viewer or prototype consumer constraints.

## Workflow

1. Confirm the theme consumer and target scope.
2. Use `design-system-architect` to decide whether the seed is sufficient or
   must be generated or revised first.
3. Use `generate-runtime-design-theme` to assemble the runtime theme contract.
4. Include brand asset refs, extracted colors, source type, safe backgrounds,
   do-not-use surfaces, provenance, and confidence.
5. Include palette primitives, ramps, semantic roles, theme variants, contrast
   pairs, status roles, interaction states, component themes, runtime exports,
   accessibility checks, and open questions.
6. Validate the artifact against `shared/schemas/runtime-design-theme.schema.json`.
7. Send missing seed, brand, palette, contrast, or component-state gaps back to
   the relevant design-system skill.

## Outputs

- `runtime-design-theme.json`
- Validation notes
- Open questions for missing contrast, asset, status, state, or component theme
  evidence

## Agents

- `design-system-architect`

## Skills

- `generate-runtime-design-theme`
- `generate-design-system-seed`
- `extract-brand-foundation`
- `extract-palette-foundation`
