---
name: blend-style-references
description: Create structured StyleBlend records with primary and secondary styles, ratios, scope, intensity, and conflict rules.
license: See repository LICENSE
---

# Blend Style References

Use this skill when a user asks for a hybrid style direction or multiple style
references need to be combined.

## Purpose

Create `StyleBlend` records that make hybrid style prompts explicit and
reviewable.

## Philosophy

Style blending turns a vague hybrid direction into an accountable contract.
Every blend needs ownership: one style should lead, secondary styles should
have limited roles, ratios should be visible, and conflicts should be resolved
before the blend reaches design-system, blueprint, or prototype work. Blending
should increase clarity, not stack visual trends until the output loses brand,
accessibility, or component coherence.

## Decision Criteria

1. Choose one primary style and one or more secondary styles.
2. Assign ratios and area-specific rules.
3. Keep high-risk secondary styles local or subtle unless requested.
4. Add avoid rules where styles conflict.
5. Use a blend when multiple styles must coexist; use a recommendation when
   style choice is still undecided; use a patch when the change is already
   scoped to an existing artifact.

## Boundary

- Owns: hybrid style contract.
- Does not own: final visual rendering, design-system seed assembly,
  implementation code, blueprint structure, or prototype runtime.

## References

- `references/style-blending.md`
- `../../../.convention/schemas/style-blend.schema.json`
- `../../../.convention/templates/style-blend.json`
- `../../../.convention/style-references/index.json`

## Rules

1. Do not output vague combinations like "Japandi Glassmorphism" without ratios.
2. Define which style owns palette, typography, layout, surfaces, and motion.
3. Preserve accessibility constraints before expressive blending.
4. Keep global blends conservative unless the brief explicitly accepts strong
   visual dominance.


## Anti-Patterns

- Equal-weight blends that create contradictory rules.
- Applying two strong styles globally by default.
- Hiding conflict resolution in prose.

## Workflow

1. Load candidate style references.
2. Pick primary/secondary roles and scope.
3. Set ratio, intensity, target, rules, and avoid list.
4. Return a schema-shaped style blend.

## Inline Example

```json
{
  "version": "0.1.0",
  "type": "styleBlend",
  "id": "utilitarian-bento-dashboard",
  "name": "Utilitarian Dashboard With Bento Summary",
  "primaryStyle": "utilitarian",
  "secondaryStyles": ["bento-box"],
  "ratio": [
    { "styleId": "utilitarian", "weight": 0.7 },
    { "styleId": "bento-box", "weight": 0.3 }
  ],
  "scope": "page",
  "target": {
    "scope": "page",
    "id": "analytics-overview",
    "label": "Analytics Overview"
  },
  "intensity": "medium",
  "rules": [
    {
      "area": "tables and filters",
      "styleId": "utilitarian",
      "rule": "Keep dense controls, clear labels, and predictable alignment."
    },
    {
      "area": "summary modules",
      "styleId": "bento-box",
      "rule": "Use modular tiles only for top-level KPI grouping."
    }
  ],
  "avoid": ["decorative cards inside data tables", "reduced contrast metadata"]
}
```

## Hand-Offs

Hand the blend to `apply-style-reference`,
`audit-style-application`, or `map-style-to-design-system-seed`.
