# Generate Copy From Knowledge

## Purpose

Generate draft UX copy from selected content knowledge patterns while preserving
source, confidence, status, review risks, and node or journey context.

## Use When

- Copy, journey, objection, or voice patterns have already been selected.
- A content model, section, component, CTA, or prototype surface should use
  retrieved content knowledge.
- The workflow needs adapted draft copy, not copied source text.

## Inputs

- Selected content knowledge patterns or retrieval results.
- Audience, journey stage, content goal, and target node or component.
- Optional brand voice, source blueprint, and content model.

Stop when selected patterns, target audience, journey stage, or node/component
context are missing.

## Workflow

1. Use `generate-copy-from-knowledge` to apply selected pattern structure and
   voice guidance to the current context.
2. Use `ux-copywriter` to keep copy node-fit and review-safe.
3. Use `generate-content-model-from-blueprint` when the output should be stored
   in a content model.
4. Use `audit-copy-for-user-journey` and `audit-copy-for-brand-voice` before
   prototype or client handoff.
5. Mark all generated copy as draft unless client-approved source exists.

## Outputs

- Draft copy fields with `basedOn` pattern references.
- Optional content model patch or section/component copy notes.
- Review-risk notes for claims, pricing, specs, or approval-sensitive language.

## Agents

- `ux-copywriter`
- Optional: `ux-content-strategist`
- Optional: `ui-knowledge-librarian`

## Skills

- `generate-copy-from-knowledge`
- `generate-content-model-from-blueprint`
- `audit-copy-for-user-journey`
- `audit-copy-for-brand-voice`
- Optional: `search-ui-knowledge`
