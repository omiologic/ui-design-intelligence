---
name: audit-copy-for-brand-voice
description: Audit generated UI copy against brand voice, tone rules, preferred language, restricted terms, and review-risk metadata.
license: See repository LICENSE
---

# Audit Copy For Brand Voice

Use this skill when generated copy must be checked against a `BrandVoice` or
voice-profile artifact.

## Purpose

Find copy that violates tone, vocabulary, CTA verbs, restricted terms, audience
fit, or review metadata expectations.

## Philosophy

Brand voice is a constraint on clarity, not decoration. Voice audit should
protect trust and consistency while preserving the user task.

## Decision Criteria

1. Use this when brand voice or voice-profile guidance exists.
2. Flag restricted terms, tone drift, and unsupported claims.
3. Preserve user clarity over ornamental language.

## Boundary

- Owns: brand-voice fit findings for generated copy.
- Does not own: brand strategy creation, final client approval, legal approval,
  translation, or visual identity.

## References

- `../../../shared/content/claim-risk-guidelines.md`
- `../../../shared/content/content-accessibility-guidelines.md`
- `../../../shared/content/copy-quality-checklist.md`
- `../../../shared/content/laws-of-copywriting.md`
- `../../../shared/schemas/brand-voice.schema.json`
- `../../../knowledge/schemas/voice-profile.schema.json`
- `../../../shared/schemas/content-model.schema.json`

## Rules

1. Cite voice rules or restricted terms.
2. Check tone against audience and task.
3. Flag missing source, confidence, status, or review metadata.
4. Do not rewrite into vague brand adjectives.
5. Keep the laws-of-copywriting reference separate from tone: use it to check
   message logic, benefit clarity, proof, objections, and CTA readiness while
   `BrandVoice` controls phrasing constraints.
6. Use the copy quality checklist to separate voice-fit issues from clarity,
   claim-risk, accessibility, node-fit, legal, or brand-approval blockers.
7. Use claim-risk guidelines when restricted terms, tone changes, or brand
   claims create unsupported medical, financial, legal, technical, pricing,
   safety, performance, compatibility, or availability risk.
8. Use content accessibility guidelines to distinguish brand-voice issues from
   plain-language, inclusive-language, label clarity, jargon, idiom, and
   cognitive-load blockers.

## Anti-Patterns

- Making copy more expressive but less clear.
- Ignoring restricted terms.
- Approving claim-heavy copy because tone sounds correct.

## Workflow

1. Read brand voice and generated copy.
2. Check tone, vocabulary, CTA verbs, and restrictions.
3. Check whether tone changes weaken clarity, proof, objections, or action
   readiness.
4. Check whether voice changes introduce unsupported claim risk.
5. Check whether voice expression reduces content accessibility.
6. Identify voice drift and review risks.
7. Recommend focused repairs.

## Inline Example

```json
{
  "finding": "tone-too-promotional",
  "nodeId": "hero-section",
  "recommendation": "Use calmer reassurance and avoid guarantee language."
}
```

## Hand-Offs

Hand off voice source gaps to `generate-copy-from-knowledge`, copy repair to
`generate-page-copy`, and prototype-copy issues to `audit-prototype-copy`.
