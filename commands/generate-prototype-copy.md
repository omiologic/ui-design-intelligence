# Generate Prototype Copy

## Purpose

Generate `PrototypeContent` for screens, dialogs, forms, messages, errors,
success states, confirmations, and recovery paths from a content model and
prototype flow or config.

## Use When

- A prototype config or plan needs realistic copy before review.
- Dialogs, forms, validation states, confirmations, or empty/error states still
  use placeholders.
- Prototype content should reference content model entries and node IDs.

## Inputs

- Source content model.
- Source prototype config, prototype flow, or blueprint node map.
- Screen IDs, form IDs, dialog node IDs, or message targets.
- Optional brand voice and journey map.

Stop when source content model, screen IDs, or required node IDs are missing.

## Workflow

1. Use `prototype-content-designer` to confirm source content and prototype
   surfaces.
2. Use `generate-prototype-copy` to generate screen, dialog, form, and message
   copy tied to nodes and content refs.
3. Use `generate-form-microcopy` for labels, helper text, placeholders, errors,
   confirmations, and recovery copy.
4. Use `generate-cta-copy` for action labels.
5. Use `shared/content/laws-of-copywriting.md` to check decision clarity,
   benefit clarity, proof, objections, CTA readiness, and recovery language for
   prototype surfaces.
6. Use `audit-prototype-copy` before handoff.

## Outputs

- `prototype-content.json` or schema-ready `PrototypeContent`.
- Optional prototype content notes with missing nodes, review risks, and
  behavior handoffs.

## Agents

- `prototype-content-designer`
- Optional: `prototype-architect`
- Optional: `ux-copywriter`

## Skills

- `generate-prototype-copy`
- `generate-form-microcopy`
- `generate-cta-copy`
- `audit-prototype-copy`
- Optional: `generate-prototype-flow`
