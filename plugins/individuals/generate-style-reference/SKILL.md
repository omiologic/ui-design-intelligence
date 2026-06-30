---
name: generate-style-reference
description: Create schema-valid StyleReference records as original, source-aware UI visual vocabulary for downstream generation.
license: See repository LICENSE
---

# Generate Style Reference

Use this skill when a project needs a normalized style record that can be
recommended, applied, blended, audited, or mapped to a design-system seed.

## Purpose

Generate `StyleReference` JSON shaped by
`shared/schemas/style-reference.schema.json`.

## Philosophy

Style references are portable visual vocabulary, not finished designs or
production token systems. A good record makes a style reusable by naming its
visual DNA, scope behavior, mappings, risks, and source notes in original
UI-focused language. It should be expressive enough to guide visual direction
and bounded enough that downstream skills can preserve brand, accessibility,
component, blueprint, and prototype decisions.

## Decision Criteria

1. Generate a style record when the style should be reusable across projects or
   scopes.
2. Prefer original UI-specific summaries over copied design-history prose.
3. Include design-system, component, and prototype mappings.
4. Include source and license notes for external references, screenshots,
   prompts, or generated records.
5. Stop at a style record when the user needs visual vocabulary; hand off to
   `generate-design-system-seed` only when reusable seed foundations are needed.

## Boundary

- Owns: normalized style record generation for reusable style vocabulary.
- Does not own: selecting final visual direction, creating a design-system seed,
  rendering mockups, writing CSS, changing blueprint structure, or defining
  prototype runtime behavior.

## References

- `references/style-reference-generation.md`
- `../../../shared/schemas/style-reference.schema.json`
- `../../../shared/templates/style-reference.json`
- `../../../shared/style-references/categories.json`

## Rules

1. Emit schema-valid JSON with `type: styleReference`.
2. Use supported category ids and scope/intensity vocabulary.
3. Include accessibility risks and compatibility guidance.
4. Do not create one skill per style.
5. Write mappings as recommendations and avoid rules, not exact token, CSS, or
   component implementation claims unless the evidence supports them.


## Anti-Patterns

- Copying source prose into a distributed style record.
- Stopping at mood words without UI mappings.
- Treating a style reference as a full design-system seed.

## Workflow

1. Identify style category, mood, and reusable visual DNA.
2. Define scope rules for site, page, section, component, and prototype.
3. Map the style to design-system, component, and prototype guidance.
4. Add risks, compatibility, implementation hints, and source notes.
5. Validate against the style-reference schema.

## Inline Example

```json
{
  "version": "0.1.0",
  "type": "styleReference",
  "id": "quiet-editorial",
  "name": "Quiet Editorial",
  "category": "mixed",
  "summary": "A restrained editorial UI style for content-led product pages.",
  "visualDNA": {
    "palette": ["warm off-white base", "ink text", "one restrained accent"],
    "typography": ["high-contrast headings", "readable body scale"],
    "surfaces": ["flat sections", "thin dividers"],
    "layout": ["asymmetric content rhythm"],
    "shapes": ["small-radius controls"],
    "effects": ["minimal shadow"],
    "imagery": ["documentary product imagery"]
  },
  "mood": ["calm", "precise"],
  "bestFor": ["editorial landing pages"],
  "avoidFor": ["dense operational dashboards"],
  "applicationScopes": {
    "section": {
      "strength": "local treatment",
      "appliesTo": ["hero typography", "section rhythm"],
      "defaultIntensity": "medium",
      "notes": ["Preserve page structure and CTA hierarchy."]
    }
  },
  "designSystemMapping": {
    "typography": {
      "recommendations": ["Use editorial heading contrast."],
      "avoid": ["Do not replace body font without seed approval."]
    }
  },
  "accessibilityRisks": [
    {
      "risk": "Thin divider contrast may disappear.",
      "severity": "medium",
      "mitigation": "Keep dividers and text above contrast thresholds."
    }
  ],
  "source": {
    "type": "internalReference",
    "title": "Original quiet editorial style record",
    "usage": "Reusable UI style vocabulary.",
    "licenseNotes": "No third-party prose copied."
  }
}
```

## Hand-Offs

Hand recommendations to `recommend-style-reference`, applications to
`apply-style-reference`, blends to `blend-style-references`, audits to
`audit-style-application`, and token mapping to
`map-style-to-design-system-seed`.
