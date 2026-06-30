# Component State Modeling

## Decision Heuristics

- Model states only when behavior, availability, validation, or accessibility
  changes.
- Prefer shared state vocabulary over custom terms.
- Keep state models small and component-scoped.
- Include focus and keyboard behavior for every modal or disclosure component.

## Anti-Pattern

Do not create a separate state for every styling variant. A primary and
secondary button may share the same state model if their behavior is identical.

## Worked Example

A dialog model starts `closed`, allows `open`, transitions from `closed` to
`open` on click or tap, transitions from `open` to `closed` on Escape or close
button, traps focus while open, and returns focus on close.

## Hand-Off

Hand completed state models to prototype config assembly. Send missing trigger
details to interaction-flow generation and unresolved naming to design-system
audits.
