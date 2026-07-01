---
name: audit-prototype-copy
description: Audit prototype copy for clarity, journey alignment, CTA consistency, brand voice, unsupported claims, redundancy, and microcopy completeness.
license: See repository LICENSE
---

# Audit Prototype Copy

Use this skill to review generated content models or prototype content before a
prototype is presented or handed off.

## Purpose

Find copy issues that affect prototype realism, user understanding, journey
alignment, brand voice, claims risk, CTA clarity, and state completeness.

## Philosophy

Prototype copy can become sticky. Audit should prevent placeholder, generic, or
unsupported text from being mistaken for approved production language.

## Decision Criteria

1. Use this after content model or prototype content generation.
2. Flag missing error, success, empty, or helper copy.
3. Treat unsupported claims and approval gaps as real risks.

## Boundary

- Owns: copy quality findings and remediation guidance.
- Does not own: final rewrite, legal approval, medical review, SEO audit, visual
  design, or prototype behavior validation.

## References

- `../../../shared/content/claim-risk-guidelines.md`
- `../../../shared/content/content-accessibility-guidelines.md`
- `../../../shared/content/cta-patterns.md`
- `../../../shared/content/copy-quality-checklist.md`
- `../../../shared/content/laws-of-copywriting.md`
- `../../../shared/content/microcopy-guidelines.md`
- `../../../shared/content/proof-and-credibility-patterns.md`
- `../../../shared/schemas/content-model.schema.json`
- `../../../shared/schemas/prototype-content.schema.json`
- `../../../shared/schemas/brand-voice.schema.json`

## Rules

1. Cite node IDs, screen IDs, or copy fields.
2. Distinguish clarity issues from claims risk.
3. Check CTA consistency and microcopy completeness.
4. Do not approve generated copy for production.
5. Use the laws-of-copywriting reference as an audit checklist for decision
   logic, benefits, story sequence, proof, objections, and action readiness.
6. Use the copy quality checklist for pass/fail checks across clarity, benefit,
   proof, CTA, objections, tone fit, claim risk, scannability, accessibility,
   and node fit.
7. Use the CTA patterns reference to audit primary, secondary, destructive,
   disabled, retry, continue, save, and support labels against actual prototype
   behavior.
8. Use claim-risk guidelines to flag missing `needsReview`, unsafe
   `productionReady` status, or unsupported regulated, technical, pricing,
   safety, performance, compatibility, and availability claims.
9. Use proof and credibility patterns to flag prototype proof placeholders that
   look production-ready or proof sections with missing evidence requirements.
10. Use microcopy guidelines to audit labels, helper text, validation errors,
   empty states, success states, confirmations, destructive actions, loading
   states, permission prompts, recovery paths, accessibility, and tone fit.
11. Use content accessibility guidelines to flag plain-language, label clarity,
   ambiguous link/button, jargon, idiom, cognitive-load, error recovery, and
   screen-reader-friendly copy issues.

## Anti-Patterns

- Ignoring missing error or confirmation messages.
- Treating "sounds good" as sufficient.
- Rewriting everything without explaining risks.

## Workflow

1. Validate artifact shape.
2. Apply the copy quality checklist to each relevant copy field or surface.
3. Check journey alignment, clarity, and CTA consistency.
4. Check microcopy surfaces for clarity, recovery, accessibility, and tone
   restraint.
5. Check copy accessibility independent of visual mockups.
6. Compare CTA labels against intent, hierarchy, state, and interaction risk.
7. Check proof sections, trust signals, badges, stats, testimonials, and
   placeholders against required evidence.
8. Check brand voice and claim-risk metadata against the claim-risk categories.
9. Report findings and repair steps.

## Inline Example

```json
{
  "finding": "missing-form-error-copy",
  "nodeId": "quote-form",
  "severity": "medium",
  "recommendation": "Add field-level error and recovery copy before prototype review."
}
```

## Hand-Offs

Hand off form fixes to `generate-form-microcopy`, CTA fixes to
`generate-cta-copy`, and journey issues to `audit-user-journey`.
