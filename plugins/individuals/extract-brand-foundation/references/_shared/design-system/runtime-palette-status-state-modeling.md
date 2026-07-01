# Runtime Palette Status And State Modeling

## Purpose

Use this reference when a workflow needs `RuntimeDesignTheme` color data for a
prototype viewer, editor, or future runtime surface. This is downstream of
`DesignSystemSeed`; it turns seed-level palette intent into runtime-applicable
theme groups.

## Required Model

Runtime palette work must preserve these layers:

- `colorSystem.primitives`: raw color values with provenance.
- `colorSystem.ramps`: named color families and steps for controlled expansion.
- `colorSystem.semantic`: role tokens that point at primitives.
- `colorSystem.themeVariants`: light, dark, mixed, or named mode token maps.
- `colorSystem.contrastPairs`: foreground/background pairs with pass, fail,
  unknown, or requires-check status.
- `statusSystem`: success, error, warning, info, neutral, disabled, focus, and
  selected role mappings.
- `interactionStates`: default, hover, active, focus, loading, disabled,
  selected, error, success, and empty token overrides.

## Rules

1. Never represent success, error, warning, selected, or focus state through
   color alone. Each status and interaction state needs a non-color cue such as
   icon, text, border style, focus outline, disabled opacity plus label, or
   validation copy.
2. Do not emit status colors without foreground, background, border, and icon
   roles.
3. Do not mark contrast as `pass` unless the ratio is known from measured
   values. Use `requiresCheck` for inferred or generated pairs.
4. Keep primitive tokens stable and semantic tokens meaningful. Runtime
   components should bind to semantic tokens, not directly to raw hex values.
5. Theme variants must map consumer-facing semantic tokens to concrete
   primitives or aliases for the selected mode.
6. Interaction-state token overrides should name only what changes from the
   base state.

## Hand-Off

Use `shared/schemas/runtime-design-theme.schema.json` for the contract. Runtime
theme generation should fail readiness when contrast pairs are absent, required
status roles are missing, or error/success/focus states rely only on color.
