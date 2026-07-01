# Generate Content Model From Blueprint

## Purpose

Generate a node-tied `ContentModel` from a source blueprint, journey map, brand
voice, and optional content knowledge patterns.

## Use When

- A blueprint has stable node IDs but still contains placeholder copy.
- A prototype needs realistic content before interaction or runtime handoff.
- Copy must remain tied to structure, source, confidence, status, and review
  risks.

## Inputs

- Source blueprint or wireframe JSON with stable node IDs.
- User journey map or content journey map.
- Audience, page goal, and section content goals.
- Optional brand voice, design-system seed, and retrieved content patterns.
- Optional output directory.

Stop when blueprint node IDs, journey stage, or primary content goal is missing.

## Workflow

1. Use `ux-content-strategist` to confirm journey-stage and content-goal fit.
2. Use `ux-copywriter` to map blueprint nodes to content model entries.
3. Use `generate-content-model-from-blueprint` to generate node-tied copy with
   source, confidence, status, `basedOn`, and `needsReview` metadata.
4. Use `.convention/content/laws-of-copywriting.md` to check decision sequence,
   benefit clarity, story flow, proof, objections, and CTA readiness before
   finalizing copy fields.
5. Use `generate-copy-from-knowledge` when selected content patterns should
   inform copy.
6. Use `audit-copy-for-user-journey` and `audit-copy-for-brand-voice` when the
   content model will feed a prototype or client review.

## Outputs

- `content-model.json` or schema-ready `ContentModel`.
- Optional content notes with assumptions, review risks, and handoffs.

## Agents

- `ux-content-strategist`
- `ux-copywriter`
- Optional: `user-journey-architect`

## Skills

- `generate-content-model-from-blueprint`
- `generate-copy-from-knowledge`
- `generate-page-copy`
- `generate-section-copy`
- `generate-component-copy`
- `audit-copy-for-user-journey`
- `audit-copy-for-brand-voice`
