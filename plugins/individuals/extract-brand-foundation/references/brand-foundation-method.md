# Brand Foundation Method

## Decision Heuristics

Classify each brand field by evidence strength. User-provided names and audience
segments are stronger than inferred category norms.

## Anti-Pattern

Do not invent a premium brand story from a sparse local-service prompt. Keep the
brand foundation practical and evidence-aware.

## Worked Example

For a healthcare prompt, "patients" may be `userProvided` if the user says it;
"trustworthy" may be `inferred`; "clear, reassuring, and direct" may be
`recommended`.

## Hand-Off

Return fields that fit `brand-foundation.schema.json` and leave missing facts in
the parent seed’s `openQuestions`.

When logo, wordmark, favicon, or app icon evidence is present, hand off that
evidence to `RuntimeDesignTheme` using the brand asset contract. A user-provided
vector logo or source-code SVG can support high-confidence extracted colors.
Screenshot crops, capture frames, favicons, compressed images, or inferred
brand colors should remain medium or low confidence until a source asset
confirms them.
