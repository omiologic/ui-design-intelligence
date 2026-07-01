---
name: generate-section-copy
description: Generate realistic section-level copy tied to a section node, journey stage, content goal, and brand voice.
license: See repository LICENSE
---

# Generate Section Copy

Use this skill when one section needs realistic copy that fits its node role and
journey stage.

## Purpose

Generate section copy such as eyebrow, headline, body, proof points, card text,
and local CTAs for a known section node.

## Philosophy

Section copy has a job. It should answer the specific user need for that stage,
not restate the whole page promise.

## Decision Criteria

1. Use this for hero, comparison, proof, FAQ, CTA, feature, or support sections.
2. Require section node ID or section role.
3. Use review metadata for claims.

## Boundary

- Owns: section-level draft copy and copy roles.
- Does not own: page flow, component state, final approval, or visual layout.

## References

- `../../../shared/content/claim-risk-guidelines.md`
- `../../../shared/content/content-accessibility-guidelines.md`
- `../../../shared/content/content-pattern-library.md`
- `../../../shared/content/cta-patterns.md`
- `../../../shared/content/laws-of-copywriting.md`
- `../../../shared/content/proof-and-credibility-patterns.md`
- `../../../shared/schemas/content-model.schema.json`
- `../../../knowledge/schemas/copy-pattern.schema.json`

## Rules

1. Fit copy to section role and component anatomy.
2. Keep local CTA language aligned with page goal.
3. Do not add claims without review flags.
4. Reference the section node when possible.
5. Use the laws-of-copywriting reference to check the section's decision job,
   benefit clarity, proof support, objection handling, and CTA readiness.
6. Use the content pattern library for hero, feature, proof, pricing,
   comparison, FAQ, empty, form, and error section anatomy.
7. Use CTA patterns for local section CTAs so labels match intent, readiness,
   hierarchy, and interaction risk.
8. Use claim-risk guidelines for medical, financial, legal, technical, pricing,
   safety, performance, compatibility, and availability claims.
9. Use proof and credibility patterns for proof sections, trust signals,
   testimonials, stats, certifications, case studies, guarantees, comparisons,
   and process proof.
10. Use content accessibility guidelines to keep section headings, body copy,
   links, buttons, helper copy, and support text plain, scannable, and usable
   without visual context.

## Anti-Patterns

- Writing a full landing page inside one section.
- Ignoring card or table limits.
- Making every section a conversion section.

## Workflow

1. Identify section node, role, and journey stage.
2. Select the matching content pattern or project-specific `copyPattern`.
3. Select proof patterns and required evidence when the section carries
   credibility or claim support.
4. Check content accessibility for headings, links, CTAs, and support copy.
5. Select CTA patterns for local actions when the section includes buttons,
   links, sticky actions, or state recovery.
6. Select brand voice.
7. Check the laws-of-copywriting reference for the section's decision role.
8. Draft role-specific copy fields.
9. Add source, confidence, status, and claim-risk review metadata.

## Inline Example

```json
{
  "nodeId": "comparison-section",
  "copy": {
    "headline": "Compare headlamp options by lighting style",
    "primaryCTA": "Find the Right Model"
  }
}
```

## Hand-Offs

Hand off component-level copy to `generate-component-copy` and CTA refinement
to `generate-cta-copy`.
