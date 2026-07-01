---
name: generate-runtime-design-theme
description: Generate RuntimeDesignTheme JSON from a DesignSystemSeed, style references, capture evidence, brand assets, or mixed input for prototype viewers and future runtime surfaces.
license: See repository LICENSE
---

# Generate Runtime Design Theme

Use this skill when a workflow needs `runtime-design-theme.json` for a
prototype viewer, editor, or future runtime surface.

## Purpose

Generate a `RuntimeDesignTheme` dataset downstream of `DesignSystemSeed`. The
output should preserve seed provenance while adding machine-readable palette,
brand asset, status, interaction-state, component-theme, accessibility, and
viewer export groups.

## Philosophy

Runtime theme generation is not visual polish and not production design-system
governance. It is a structured handoff layer that makes a prototype viewer
understand which colors, brand assets, states, and component mappings are safe
to apply. When evidence is weak, the theme must stay useful without pretending
that inferred values are certified brand tokens.

## References

- `references/runtime-design-theme-generation.md`
- `references/_shared/schemas/runtime-design-theme.schema.json`
- `references/_shared/schemas/design-system-seed.schema.json`
- `references/_shared/design-system/runtime-palette-status-state-modeling.md`
- `references/_shared/design-system/brand-asset-color-extraction.md`
- `references/_shared/design-system/accessibility-token-guidelines.md`
- `references/_shared/design-system/component-state-guidelines.md`
- `references/_shared/design-system/component-anatomy-reference.md`
- `references/_shared/design-system/design-system-handoff-checklist.md`
- `references/_shared/design-system/token-taxonomy.md`
- `references/_shared/vocabulary/design-system-source-kinds.json`
- `references/_shared/vocabulary/interaction-states.json`
- `references/_shared/vocabulary/component-variants.json`

## Decision Criteria

1. Use this skill after a `DesignSystemSeed` exists or when mixed evidence is
   strong enough to produce a runtime dataset with explicit uncertainty.
2. Prefer user-provided brand assets, source code assets, and validated seed
   tokens over screenshot or generated values.
3. Generate runtime theme data only when a consumer needs viewer-ready tokens,
   state styling, component bindings, or CSS variable groups.
4. Keep seed generation in `generate-design-system-seed`; use this skill for
   downstream runtime theme structure.

## Rules

1. Emit `runtime-design-theme.json` that validates against
   `runtime-design-theme.schema.json`.
2. Preserve source refs to seed, style, capture, study, and brand asset inputs.
3. Include color primitives, ramps, semantic roles, theme variants, and contrast
   pairs.
4. Include required status roles: success, error, warning, info, neutral,
   disabled, focus, and selected.
5. Include required interaction states: default, hover, active, focus, loading,
   disabled, selected, error, success, and empty.
6. Never rely on color alone for error, success, focus, selected, or disabled
   states.
7. Keep logo, wordmark, favicon, and app icon evidence in `brandAssets` with
   source type, safe backgrounds, do-not-use surfaces, extracted colors,
   provenance, and confidence.
8. Do not mark screenshot-derived, generated, or inferred brand colors as high
   confidence.
9. Add runtime export groups only as references and token bindings; do not
   generate a runtime component library.

## Boundary

- Owns: runtime theme assembly, schema-facing JSON, source refs, palette/status
  groups, brand asset evidence, component theme mappings, accessibility checks,
  viewer groups, CSS variable names, sample bindings, and open questions.
- Does not own: initial seed generation, final UI-kit governance, visual
  mockups, production token build pipelines, runtime viewer implementation, or
  frontend component code.

## Workflow

1. Identify the primary `DesignSystemSeed` and any style, study, capture, or
   brand asset sources.
2. Load the runtime theme schema and review required sections.
3. Convert seed palette values into primitives, ramps, semantic roles, theme
   variants, and contrast pairs.
4. Convert status and feedback needs into `statusSystem` entries with non-color
   cues.
5. Convert reusable component state needs into `interactionStates` overrides.
6. Preserve logo, wordmark, favicon, app icon, and screenshot crop evidence in
   `brandAssets`.
7. Map buttons, inputs, cards, alerts, dialogs, toasts, tabs, navigation,
   badges, forms, tables, and empty states into `componentThemes` when evidence
   supports them.
8. Add `runtimeExports` for CSS variables, viewer groups, preview swatches, and
   sample component bindings.
9. Add accessibility required checks and non-color-state requirements.
10. Record open questions for missing brand assets, uncertain contrast, weak
   token evidence, or unsupported runtime bindings.
11. Validate the JSON and send gaps back to seed, palette, brand, or component
   foundation work.

## Anti-Patterns

- Treating `RuntimeDesignTheme` as a replacement for `DesignSystemSeed`.
- Shipping a flat color list without status roles, contrast pairs, or state
  mappings.
- Marking inferred logo colors as high-confidence brand truth.
- Creating viewer bindings that point to raw hex values instead of semantic
  tokens.
- Omitting success, error, disabled, loading, focus, selected, or empty states.
- Representing validation, focus, or status feedback through color alone.
- Adding React, Vue, Svelte, or CSS framework implementation code to the theme.

## Inline Example

```json
{
  "version": "0.1.0",
  "type": "runtimeDesignTheme",
  "id": "ledgerpilot-runtime-theme",
  "name": "LedgerPilot Runtime Theme",
  "source": {
    "primarySeedRef": "shared/examples/marketing-page-e2e/marketing-page.design-system-seed.example.json",
    "sourceRefs": [
      {
        "type": "designSystemSeed",
        "ref": "shared/examples/marketing-page-e2e/marketing-page.design-system-seed.example.json",
        "confidence": "medium"
      }
    ],
    "confidence": "medium"
  },
  "brandAssets": {
    "assets": [
      {
        "id": "ledgerpilot-logo",
        "type": "logo",
        "sourceType": "userProvidedAsset",
        "ref": "assets/ledgerpilot/logo.svg",
        "safeBackgrounds": ["color.surface.default"],
        "doNotUseOn": ["color.brand.primary"],
        "extractedColors": [],
        "provenance": {"source": "userProvided", "confidence": "high"}
      }
    ],
    "usageNotes": ["Do not promote asset colors without semantic mapping."]
  },
  "openQuestions": ["Confirm measured contrast for inferred palette pairs."]
}
```

## Hand-Offs

Hand missing seed decisions to `generate-design-system-seed`. Hand palette
gaps to `extract-palette-foundation`, brand asset gaps to
`extract-brand-foundation`, component state gaps to the relevant foundation
skill, and behavior-specific gaps to prototype skills.
