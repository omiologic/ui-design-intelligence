---
name: recommend-style-reference
description: Recommend suitable StyleReference options for a project, section, component, or prototype based on brief constraints.
license: See repository LICENSE
---

# Recommend Style Reference

Use this skill when a user needs candidate style directions before applying or
mapping a style.

## Purpose

Recommend 2-5 style references with scope, intensity, reasons, and avoid
guidance.

## Philosophy

Style recommendation is a fit decision, not a taste showcase. The skill should
translate a brief into a small set of plausible style options with explicit
scope and risk controls. Recommendations should make local treatment easy when
only a section, component, or prototype behavior needs visual character, and
should avoid implying that choosing a style automatically creates or replaces a
design-system seed.

## Decision Criteria

1. Match style to industry, audience, conversion goal, brand tone, and
   accessibility constraints.
2. Prefer subtle or medium intensity for trust-sensitive business UI.
3. Include explicit avoid recommendations for poor-fit styles.
4. Recommend local scope when only a section or component needs treatment.
5. Recommend `generate-style-reference` only when no existing style id fits the
   brief; recommend `generate-design-system-seed` only after a style choice must
   become reusable seed foundations.

## Boundary

- Owns: style fit and recommendation reasoning.
- Does not own: producing the final design-system seed, applying patches,
  blending styles, auditing outputs, or changing blueprint structure.

## References

- `references/style-recommendation.md`
- `../../../.convention/style-references/index.json`
- `../../../.convention/style-references/categories.json`
- `../../../.convention/schemas/style-reference.schema.json`

## Rules

1. Use only style ids from the style-reference index unless generating a new
   style record is requested.
2. Explain scope and intensity for each recommendation.
3. Do not recommend expressive styles without noting risk.
4. State preserve assumptions when brand, accessibility, typography, palette,
   or component decisions must survive the later application.


## Anti-Patterns

- Offering every style as equally plausible.
- Ignoring accessibility or industry trust constraints.
- Recommending a site-wide style when the user asked for one component.

## Workflow

1. Read the brief and constraints.
2. Load the style index and candidate records.
3. Rank fit by industry, scope, component, mood, and risk.
4. Return recommended styles, scopes, intensities, reasons, and avoid list.

## Inline Example

```json
{
  "recommendations": [
    {
      "styleId": "bento-box",
      "scope": "section",
      "target": "pricing-grid",
      "intensity": "medium",
      "reason": "Improves plan comparison with modular grouping.",
      "preserve": ["brand palette", "button hierarchy"],
      "avoid": ["nested cards", "animated tile resizing"]
    },
    {
      "styleId": "utilitarian",
      "scope": "site",
      "target": "admin-console",
      "intensity": "subtle",
      "reason": "Supports dense repeated operational work.",
      "preserve": ["accessibility contrast", "form component states"],
      "avoid": ["decorative surfaces", "low-density marketing rhythm"]
    }
  ],
  "notRecommended": [
    {
      "styleId": "glassmorphism",
      "reason": "High transparency risk for a text-heavy pricing section."
    }
  ]
}
```

## Hand-Offs

Hand selected styles to `apply-style-reference`,
`blend-style-references`, or `map-style-to-design-system-seed`.
