# Design System Principles

The doctrine for the design-system layer. It is the design-system counterpart to
the structural wireframe philosophy: same job (make decisions defensible, not
generic), different layer. Where the wireframe philosophy is deliberately
structural and visual-free, this layer deliberately owns the visual foundations
the wireframe layer excluded — token intent, component foundations, and the
constraints downstream generation depends on.

Names in `code` refer to approved tokens in `.convention/vocabulary/` and fields in
`.convention/schemas/design-system-seed.schema.json`.

## Where this layer sits

The pipeline is `study → knowledge → design-system → blueprint/wireframe →
prototype`. This layer is a **generation contract**, not a finished UI kit. It
defines token intent, component foundations, allowed states, accessibility
constraints, and uncertainty metadata that downstream generators may rely on.

## 1. Produce a seed, not a system

A `DesignSystemSeed` exists to keep generated blueprints, wireframes, and
prototypes consistent — nothing more. Generate the minimum foundation that makes
downstream output coherent.

Why: scope creep is the most expensive failure here. A full spacing scale, a
complete component library, or final visual decisions are out of scope and create
false authority. If the brief asks for a seed, a system is wrong, not generous.

## 2. Semantic role before value

Decide what a token _is for_ before deciding what it _is_. Use the
`{category}.{role}.{purpose}` pattern (`color.action.primary`,
`typography.heading.h1`, `spacing.section.default`) and choose the role first.

Why: values are replaceable; roles are the contract. Downstream generation binds
to `color.action.primary`, not to a hex. A role can be re-valued without breaking
anything that depends on it; a raw value cannot.

## 3. Provenance is first-class, and confidence must match evidence

Every value carries a `source` (`observed`, `inferred`, `recommended`,
`generated`, `userProvided`) and a confidence (`low`, `medium`, `high`). Use
`observed` only for values directly found in source evidence; screenshot-derived
values are `inferred`, not `observed`, and rarely `high`.

Why: a seed that makes approximate values look authoritative misleads every
consumer downstream and corrupts the audit. Honest uncertainty is more useful than
confident guessing. This is the cardinal discipline of the layer.

## 4. Foundations encode intent, not final styling

This layer owns token intent, component anatomy, variants, allowed states, layout
roles, and accessibility constraints. It does **not** own final palette values, a
final type or spacing scale, polished visual decisions, or framework components.
Even the `motion` token type is behavioral intent only — final easing and timing
belong to the prototype and visual layers.

| Owned here                                                        | Owned downstream                       |
| ----------------------------------------------------------------- | -------------------------------------- |
| Token roles and intent                                            | Final values, scales                   |
| Component variants, anatomy, allowed states                       | Production React/Vue/Svelte components |
| Accessibility constraints (focus, contrast-required, target size) | Final CSS, visual polish               |
| Behavioral intent of `motion` tokens                              | Easing, duration, transitions          |

Why: crossing this line is how a "seed" silently becomes an unfinished, untestable
design system that no one asked for.

## 5. Accessibility constraints are part of the foundation

Bake `visibleFocus`, `keyboardReachable`, `semanticLabels`, `contrastCheckRequired`,
and `targetSize` into tokens and component foundations, not into a later pass.

Why: a constraint declared at the foundation costs nothing; retrofitting it after
values and components are chosen is expensive and usually skipped. Generated or
inferred color pairs must carry a contrast-check flag — the seed states the
requirement even when it can't compute the result.

## 6. Consistency invariants (the locks of this layer)

Declare these once and hold them across the seed:

- One primary action variant per component context (`button.primary`).
- One radius system, one elevation/`shadow` scale, one icon style.
- Semantic palette roles, never raw colors scattered across components.
- One naming convention (`{category}.{role}.{purpose}`) with no exceptions.

Why: invariants are what make a seed feel designed rather than assembled. A single
break (a second primary, an ad-hoc token name) signals the rest can't be trusted.

## 7. Keep open questions visible

Use `openQuestions` to surface every unresolved decision and `usageNotes` to state
how foundations should be applied. A seed that flags its gaps is more valuable than
one that hides them.

Why: downstream generation and audit make better choices when they can see what is
settled versus what is a placeholder. Hidden gaps become silent defects.

## Boundary and hand-offs

- Upstream: consumes `study` evidence and `knowledge` patterns; preserve their
  source labels.
- Downstream: hands foundations to blueprint/wireframe generation and to the
  prototype layer; hands final values and rendering to visual tooling.
- See `anti-slop.md` for the failure catalog and `seed-preflight.md` for the gate.
