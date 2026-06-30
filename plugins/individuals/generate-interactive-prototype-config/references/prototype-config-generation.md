# Prototype Config Generation

## Decision Heuristics

- Start from a known wireframe or blueprint node map.
- Add behavior as references to existing structure.
- Use `DesignSystemSeed` states and accessibility notes where available.
- Keep unsupported runtime details as implementation notes, not schema fields.

## Anti-Pattern

Do not copy the wireframe layout tree into prototype config. The prototype layer
should reference screens, routes, and nodes, then add states and interactions.

## Worked Example

For a dental homepage with a hero CTA and mobile sticky CTA, create one screen,
one route, a closed dialog state, an open dialog state, a sticky-bar visible
state, two open-overlay interactions, one Escape close interaction, and an
overlay record with focus return to the triggering CTA.

## Hand-Off

Send incomplete node maps back to blueprint or wireframe skills. Send missing
state semantics to `generate-component-state-model`. Send final config to
`audit-prototype-interactions` before runtime work begins.
