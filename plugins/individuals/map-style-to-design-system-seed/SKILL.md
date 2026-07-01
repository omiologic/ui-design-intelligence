---
name: map-style-to-design-system-seed
description: Convert StyleReference, StyleApplication, StyleBlend, or StylePatch guidance into DesignSystemSeed-compatible decisions.
license: See repository LICENSE
---

# Map Style To Design System Seed

Use this skill when style guidance should inform brand, palette, typography,
iconography, button, card, header, footer, or prototype behavior conventions.

## Purpose

Map structured style artifacts into design-system seed recommendations or style
patches while preserving existing seed decisions.

## Philosophy

Mapping style into a design-system seed is a controlled translation layer. Style
artifacts can influence semantic foundation choices, but they do not override
proven brand, accessibility, typography, palette, component, or prototype
contracts by default. The mapper should either produce seed-section
recommendations for a new seed or a preservation-aware `StylePatch` for an
existing seed; it should not silently regenerate the entire system for a local
visual request.

## Decision Criteria

1. Use style `designSystemMapping` fields for seed guidance.
2. Use patches when an existing seed should be preserved.
3. Map component guidance to component foundations, not raw CSS.
4. Map prototype guidance to behavior vocabulary, not runtime code.
5. Generate a full seed only when no seed exists or the user asks for a new
   seed.
6. Generate a `StylePatch` when the user wants a local section/component
   treatment or preservation of existing brand, palette, typography, or
   component decisions.
7. Hand off to `generate-design-system-seed` for final seed assembly rather
   than treating style mapping as a complete seed.

## Boundary

- Owns: style-to-seed mapping and patch recommendations.
- Does not own: complete seed assembly, seed audit, blueprint structure,
  production token pipelines, component implementation, or prototype runtime.

## References

- `references/style-to-design-system-seed.md`
- `../../../shared/schemas/style-reference.schema.json`
- `../../../shared/schemas/style-application.schema.json`
- `../../../shared/schemas/style-patch.schema.json`
- `../../../shared/schemas/style-blend.schema.json`
- `../../../shared/schemas/design-system-seed.schema.json`
- `references/_shared/design-system/visual-style-calibration.md`

## Rules

1. Preserve explicit seed values unless a patch says to change them.
2. Keep source and style ids visible in notes or lineage.
3. Do not convert style mood directly into exact color/font claims.
4. Keep local section/component treatments as patches unless the user requests a
   new global seed.


## Anti-Patterns

- Replacing the full seed for a local style treatment.
- Treating style mappings as exact tokens without evidence.
- Ignoring conflicts between blend rules and existing seed values.

## Workflow

1. Load style artifact and target seed context.
2. Identify preserved values and allowed change paths.
3. Calibrate the style source across contrast, density, hierarchy, restraint,
   texture, imagery, motion posture, and category fit before selecting seed
   fields.
4. Map brand, palette, typography, iconography, buttons, cards, header, footer,
   and prototype guidance.
5. If no seed exists, emit seed-section recommendations for
   `generate-design-system-seed`.
6. If a seed exists, emit a `StylePatch` with explicit `preserve` and `changes`
   paths.
7. Keep prototype guidance as behavior vocabulary and hand it to prototype
   config work without runtime assumptions.

## Inline Example

```json
{
  "version": "0.1.0",
  "type": "stylePatch",
  "styleId": "quiet-editorial",
  "target": {
    "scope": "section",
    "id": "article-hero",
    "artifactType": "section"
  },
  "intensity": "medium",
  "changes": [
    {
      "operation": "replace",
      "path": "typography.headingTreatment",
      "value": "editorial contrast with existing brand font family",
      "reason": "Apply style mapping without replacing approved typography."
    }
  ],
  "preserve": ["brand.primaryColor", "typography.body", "buttons.primary"],
  "avoid": ["new global palette", "unverified font names", "low contrast rules"],
  "rationale": "Map a local section style into seed-compatible guidance without regenerating the seed."
}
```

## Hand-Offs

Hand mapped recommendations to `generate-design-system-seed` and hand naming or
completeness concerns to design-system audit skills.
