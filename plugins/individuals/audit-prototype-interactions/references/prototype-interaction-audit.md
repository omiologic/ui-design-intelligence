# Prototype Interaction Audit

## Decision Heuristics

- Validate structure before judging behavior quality.
- Treat missing close paths, focus traps, and form errors as high severity.
- Treat unreferenced states and dead flows as config integrity issues.
- Keep runtime suggestions separate from schema fixes.

## Anti-Pattern

Do not approve a prototype because the happy path works on paper. Interactive
config also needs keyboard, focus, validation, responsive, and error behavior.

## Worked Example

An appointment dialog config fails audit if the CTA opens the overlay but no
Escape or close-button path exists, focus does not enter the dialog, or focus
return points to an unknown node.

## Hand-Off

Send schema and reference fixes to prototype config generation. Send missing
state details to component state modeling. Send runtime-only work to a later
prototype runtime package.
