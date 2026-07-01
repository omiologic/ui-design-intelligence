# Audit Prototype Copy

## Purpose

Audit content models or prototype content for clarity, journey alignment, CTA
consistency, brand voice, unsupported claims, redundancy, microcopy completeness,
and review-risk metadata.

## Use When

- Prototype copy is ready for review before client or runtime handoff.
- A content model may contain generic, unsupported, misplaced, or incomplete
  copy.
- Forms, dialogs, empty states, errors, confirmations, or CTAs need copy checks.

## Inputs

- Content model, prototype content, or draft copy artifact.
- Journey map or content journey map.
- Optional brand voice, source blueprint, prototype config, or domain review
  constraints.

Stop when the copy artifact is missing or cannot be mapped to stages, nodes, or
screens.

## Workflow

1. Use `prototype-content-designer` for prototype-surface context when screens,
   states, dialogs, or forms are present.
2. Use `audit-prototype-copy` to check clarity, completeness, state coverage,
   and review metadata.
3. Use `.convention/content/laws-of-copywriting.md` to flag missing benefit clarity,
   weak story sequence, unsupported proof, unhandled objections, unclear CTAs,
   or action language that is not earned by the journey.
4. Use `audit-copy-for-user-journey` to check journey-stage fit.
5. Use `audit-copy-for-conversion` when CTAs or lead actions are present.
6. Use `audit-copy-for-brand-voice` when a brand voice or voice profile exists.
7. Return findings with node IDs, field names, severity, and repair steps.

## Outputs

- `prototype-copy-audit.md` or structured audit findings.
- Repair recommendations for copy, journey, brand voice, or prototype handoff.

## Agents

- `prototype-content-designer`
- `ux-copywriter`
- Optional: `conversion-copywriter`

## Skills

- `audit-prototype-copy`
- `audit-copy-for-user-journey`
- `audit-copy-for-conversion`
- `audit-copy-for-brand-voice`
- Optional: `generate-form-microcopy`
- Optional: `generate-cta-copy`
