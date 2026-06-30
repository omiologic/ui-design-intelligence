# Controlled Vocabulary

The canonical machine-readable vocabulary lives in `_shared/vocabulary/`.

## Decision Heuristics

Normalize terms by behavior and structure, not by the user's casual wording.
Preserve user intent in labels and descriptions, but convert machine-readable
tokens to approved vocabulary.

## Vocabulary Categories

- Node types: structural and component `type` values used by wireframe nodes.
- Layout patterns: reusable placement and composition names.
- Content roles: semantic roles for copy, calls to action, metadata, and trust signals.
- Interaction states: common control, overlay, and feedback states.
- UI layer types: page, section, overlay, sticky, and supporting layer categories.

## Authoring Rule

Use the shared vocabulary files as the source of truth. Do not define local
alternatives inside individual skills.

## Anti-Pattern

Bad: adding `type: "modalWindow"` because the user said "modal window".

Corrected: map the concept to `dialog` when it blocks background interaction, or
to `popover` when it is contextual and lightweight.

## Worked Example

User phrase: "sticky promo alert with a buy button".

Approved terms: use `stickyBar` when it persists during scroll, `banner` when it
is inline, `button` with role `primaryCTA` for the action, and `warning` only if
the message communicates risk or urgency.

## Hand-Off

This reference chooses vocabulary tokens. Use planning skills to decide page,
section, and component structure after terminology is normalized. Use
`wireframe-schema` to validate that the chosen tokens are accepted by the schema.
