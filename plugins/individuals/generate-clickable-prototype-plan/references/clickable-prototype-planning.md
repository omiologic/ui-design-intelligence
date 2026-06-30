# Clickable Prototype Planning

## Decision Heuristics

- Anchor every plan step to a config id.
- Include entry point, action, resulting state, and expected visible change.
- Capture compact viewport behavior separately.
- Add audit checkpoints before runtime build work.

## Anti-Pattern

Do not call a plan "clickable" if it does not identify click targets,
conditions, and resulting states.

## Worked Example

Step 1: load `home-route` on `homepage-screen`. Step 2: click
`hero-book-appointment-button`. Step 3: open `appointment-dialog-overlay` and
enter `appointment-dialog-open`. Step 4: submit empty form and show
`appointment-form-error`. Step 5: press Escape and return focus to the CTA.

## Hand-Off

Send plans with stable ids to the future runtime or editor package. Send
schema/reference errors back to prototype audit.
