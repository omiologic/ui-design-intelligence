# Design System Skill Doctrine

This is the Sprint 004 implementation reference for design-system skills. It
turns the design-system principles and anti-slop catalog into concrete guidance
for `SKILL.md` bodies, examples, audits, and later validation.

Use this alongside:

- `design-system-principles.md`
- `design-system-anti-slop.md`
- `shared/schemas/design-system-seed.schema.json`
- `shared/vocabulary/design-token-types.json`
- `shared/vocabulary/component-anatomy.json`
- `shared/vocabulary/component-variants.json`
- `shared/vocabulary/layout-roles.json`
- `shared/vocabulary/accessibility-rules.json`

## Layer Ownership

Design-system skills produce a `DesignSystemSeed`, not a finished design
system. The seed is a generation contract that downstream blueprint, wireframe,
prototype, and visual generation work can rely on.

Own here:

- token intent and semantic roles
- source and confidence metadata
- component foundations, anatomy, variants, and allowed states
- layout roles and reusable component rules
- accessibility constraints and checks that must be preserved downstream
- usage notes, unresolved decisions, and open questions

Do not own here:

- final production CSS
- final color, type, spacing, radius, shadow, or motion scales
- framework components
- full UI-kit governance
- visual polish or expressive style treatment
- prototype runtime behavior or animation craft

## Required Doctrine

### Seed Before System

Generate the minimum foundation that keeps downstream output coherent. A
complete component library, exhaustive spacing system, or final UI kit is out of
scope unless a later sprint defines that product surface.

### Semantic Role Before Value

Name tokens by intent before assigning values. Use the
`{category}.{role}.{purpose}` convention, such as `color.action.primary` or
`typography.heading.h1`. Downstream generators should bind to semantic roles,
not raw values.

### Provenance And Confidence

Every meaningful value needs a source label and confidence level. Use:

- `observed` only for values directly present in source evidence
- `inferred` for screenshot-derived or indirectly derived values
- `recommended` for expert recommendations based on the brief or patterns
- `generated` for newly created foundation choices
- `userProvided` for explicit user input

Confidence must match evidence. Screenshot-derived colors, sizes, and type
values are rarely high confidence.

### Accessibility Is Foundational

Carry accessibility constraints in the seed instead of deferring them to a later
audit. Component and token guidance should preserve visible focus, keyboard
reachability, semantic labels, target size, and contrast-check requirements.

Generated or inferred color pairs should carry a contrast-check requirement
when the exact contrast cannot be proven.

### Consistency Locks

Preserve these invariants across the seed:

- one primary action variant per component context
- one naming convention
- semantic palette roles instead of scattered raw colors
- one radius system
- one elevation or shadow scale
- one iconography style
- required states for interactive components

### Open Questions Stay Visible

Unresolved brand, palette, typography, component, or accessibility decisions
belong in `openQuestions` or usage notes. Do not hide gaps by fabricating final
answers.

## Anti-Slop Rules For Skills

Skills must avoid these patterns even when the output can pass schema
validation:

- value-named tokens such as `blueButton`, `color12`, or `radiusBig`
- raw values on components where semantic token references should exist
- false precision from screenshots or weak evidence
- confidence laundering from `inferred` or `generated` to `observed`
- multiple primary button or action variants in the same context
- missing required states such as focus, disabled, loading, active, or error
- orphan tokens without usage, role, or component binding
- inconsistent token naming conventions
- generated or inferred color pairs without contrast-check requirements
- fabricated brand identity, palette, voice, or iconography
- production CSS, final easing/timing, or framework code in a seed

## Skill Body Guidance

Every design-system skill should make the doctrine visible in its body:

- `## Philosophy` should state that the skill creates foundation contracts, not
  final visual systems.
- `## Decision Criteria` should identify source quality, required evidence, and
  when to leave decisions open.
- `## Rules` should require semantic roles, provenance, confidence, accessibility
  constraints, and consistency locks.
- `## Anti-Patterns` should name the relevant anti-slop failures for that skill.
- `## Inline Example` should show compact, schema-shaped JSON with source,
  confidence, intent, constraints, and open questions where relevant.
- `## Hand-Offs` should point to audit skills before downstream blueprint,
  wireframe, prototype, or style work.

## Skills Requiring Direct Doctrine References

These design-system skills should cite this doctrine directly during the Sprint
004 migration:

- `generate-design-system-seed`
- `extract-brand-foundation`
- `extract-palette-foundation`
- `extract-typography-foundation`
- `extract-iconography-foundation`
- `generate-button-foundation`
- `generate-card-foundation`
- `generate-header-foundation`
- `generate-footer-foundation`
- `audit-design-system-completeness`
- `audit-design-system-naming`
- `audit-design-system-consistency`

Adjacent style-reference skill that should cite or defer to this doctrine when
mapping visual style into design-system contracts:

- `map-style-to-design-system-seed`

## Validation Implications

Later Sprint 004 validation should be able to check for:

- required doctrine references in design-system skill files
- required `## Philosophy` and `## Inline Example` sections
- semantic token naming examples instead of value-named tokens
- source and confidence examples for evidence-bearing values
- accessibility constraints in examples
- anti-slop guidance for false precision, confidence laundering, value naming,
  missing states, orphan tokens, and final-styling drift

Validation should remain deterministic. Judgment-heavy quality checks belong in
skill guidance or golden fixtures until they can be expressed safely.
