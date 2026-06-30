# Interaction Flow Generation

## Decision Heuristics

- Require trigger, source, action, target, and result.
- Use conditions for responsive, route, or state-specific behavior.
- Treat accessibility behavior as part of the flow, not optional commentary.
- Keep flows small enough to audit independently.

## Anti-Pattern

Do not describe a flow only as user intent, such as "book appointment". The
flow must say which event fires on which node and what state or route changes.

## Worked Example

Hero CTA click on `hero-book-appointment-button` triggers `openOverlay`, targets
`appointment-dialog`, results in `appointment-dialog-open`, and moves focus to
the dialog container.

## Hand-Off

Send validated flows to prototype config assembly. Send inaccessible focus
behavior or missing close paths to prototype audit.
