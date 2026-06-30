# Prototype Behavior Study

## Decision Heuristics

- Prefer observed triggers and state changes over inferred ones.
- Mark confidence on behavior that was only visible in screenshots.
- Separate responsive behavior from default route behavior.
- Track accessibility behavior whenever focus can move or content appears.

## Anti-Pattern

Do not collapse behavior into generic labels like "interactive" or "dynamic".
Prototype generation needs event, source, condition, action, target, and result
details.

## Worked Example

If a mobile sticky appointment bar appears after scrolling and opens the same
dialog as a hero CTA, record the sticky bar as a viewport-conditioned behavior,
reuse the same target overlay, and note whether focus return differs.

## Hand-Off

Send extracted findings to interaction-flow and state-model skills. Send
unverified claims to the prototype architect as open questions.
