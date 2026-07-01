# Design System Anti-Slop

These are schema-valid seed and foundation patterns that still produce weak design
systems. Treat all of them as design failures unless there is an explicit,
recorded reason. Some are detectable by `validate-design-system`; skills should not
rely on the validator to catch them.

## Anti-Patterns

### Value-Named Tokens

Why: names like `blueButton`, `color12`, or `radiusBig` encode appearance, which
changes, instead of role, which doesn't. Downstream binds to intent; a value-named
token breaks the moment the value changes. Use `{category}.{role}.{purpose}`.

### False Precision

Why: presenting an exact hex or pixel value as authoritative when it was eyeballed
from a screenshot misleads every consumer. Confidence must match evidence —
screenshot-derived values are `inferred` with `low`/`medium` confidence, never
`observed` or `high`.

### A System When A Seed Was Asked

Why: generating a full spacing scale, every component, or a complete visual system
is scope creep that creates false authority. The seed should be the minimum
foundation that keeps downstream output consistent.

### Raw Values Over Semantic Roles

Why: defining a color or size directly on a component, instead of as a semantic
role the component references, breaks the contract downstream generation depends
on. Roles first, values second.

### Multiple Primaries

Why: more than one primary action variant in a context makes priority ambiguous —
the token-level version of structural CTA pile-up. One `button.primary` per
context.

### Missing Required States

Why: a component foundation without `focus`, `disabled`, or `loading` where the
component needs them leaves downstream to invent states unsafely. States are part
of the foundation contract.

### Orphan Tokens

Why: tokens defined but never given a semantic usage or role are noise that
implies structure where there is none. Every token must carry intent.

### Inconsistent Naming

Why: mixing `{category}.{role}.{purpose}` with ad-hoc names breaks tooling,
auditing, and downstream mapping. One convention, no exceptions.

### Confidence Laundering

Why: labeling `generated` or `inferred` values as `observed`, or marking guesses as
`high` confidence, corrupts provenance. Audit and downstream generation rely on
honest source labels; this is the most damaging failure in the layer.

### Contrast Ignored

Why: shipping generated or inferred color pairs without a `contrastCheckRequired`
flag bakes accessibility debt into the foundation. The seed must state the
requirement even when it cannot compute the result.

### Brand Fabrication

Why: inventing a brand identity, voice, or palette not present in the evidence is
worse than leaving it open. Reflect observed brand, flag inferred brand, and put
the rest in `openQuestions` rather than fabricating.

### Final-Styling Drift

Why: specifying production CSS, final easing/timing, or framework component code
crosses into downstream territory and turns a seed into an unfinished system.
Behavioral and visual finishing belong to the prototype and visual layers.
