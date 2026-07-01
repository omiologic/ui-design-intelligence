---
name: extract-style-from-reference
description: Transform prompts, screenshots, study artifacts, or summarized external references into original StyleReference candidates.
license: See repository LICENSE
---

# Extract Style From Reference

Use this skill when style inspiration exists in a prompt, screenshot, study
output, or external reference summary and should become structured style data.

## Purpose

Extract style signals into candidate `StyleReference` records without copying
source prose or final visual layouts.

## Philosophy

Extraction is translation, not duplication. The skill should turn a prompt,
screenshot, study artifact, or summarized reference into original UI vocabulary
that can be validated, audited, and reused. It should keep evidence limits
visible, avoid source-specific brand/layout copying, and separate observed
style signals from downstream decisions about recommendation, application,
blending, or design-system seed generation.

## Decision Criteria

1. Extract reusable visual vocabulary, not exact composition.
2. Rewrite summaries and mappings in original UI-focused language.
3. Track source type, usage, and license notes.
4. Preserve uncertainty when evidence is weak.
5. Hand off to generation when a normalized reusable record is needed; hand off
   to design-system seed work only after mappings have been normalized.

## Boundary

- Owns: evidence-to-style candidate extraction.
- Does not own: final curation, recommendation ranking, visual rendering,
  design-system seed creation, or copying source layouts.

## References

- `references/style-extraction.md`
- `../../../.convention/schemas/style-reference.schema.json`
- `../../../.convention/templates/style-reference.json`

## Rules

1. Do not copy article descriptions, screenshots, or brand-specific layouts.
2. Capture visual DNA, scope rules, mappings, risks, and compatibility.
3. Use generated/internal source notes when creating original records.
4. Mark weak evidence as candidate guidance instead of inventing exact tokens,
   font names, colors, or implementation details.


## Anti-Patterns

- Copying external style definitions verbatim.
- Treating a screenshot as permission to duplicate a layout.
- Omitting accessibility and compatibility risks.

## Workflow

1. Read source material and identify reusable style signals.
2. Reject source-specific or copyrighted detail.
3. Normalize into `StyleReference` fields.
4. Add source/license notes and confidence caveats in prose fields.
5. Hand off for generation or curation.

## Inline Example

```json
{
  "candidateStyle": {
    "type": "styleReference",
    "id": "candidate-soft-utility",
    "summary": "A restrained utility style with calm surfaces and clear task grouping.",
    "visualDNA": {
      "palette": ["muted neutral base", "single functional accent"],
      "typography": ["plain readable labels"],
      "surfaces": ["flat panels with light separation"],
      "layout": ["dense but orderly task zones"]
    },
    "bestFor": ["settings pages", "admin forms"],
    "avoidFor": ["expressive campaign pages"],
    "source": {
      "type": "screenshot",
      "usage": "Derived as original UI vocabulary from observed style signals.",
      "licenseNotes": "Do not copy the source layout or brand-specific details."
    }
  },
  "uncertainties": ["Exact color values were not measured."]
}
```

## Hand-Offs

Hand extracted candidates to `generate-style-reference` for normalization and
to `audit-style-application` for source and usability review.
