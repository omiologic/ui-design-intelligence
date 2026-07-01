# Runtime Design Theme Generation

## Purpose

Generate `runtime-design-theme.json` as an apply-ready design dataset for
prototype viewers and future runtime surfaces.

## Source Order

Prefer sources in this order:

1. User-provided brand assets and explicit brand-kit values.
2. Source-code assets, SVG fills, CSS custom properties, and checked-in tokens.
3. Validated `DesignSystemSeed` semantic roles.
4. Style references and style applications.
5. Study output, capture manifests, and screenshot crops.
6. Generated recommendations.

Lower-confidence sources can fill gaps but must not overwrite stronger source
truth.

## Required Output Shape

The output must include:

- `brandAssets`: asset refs, source type, safe backgrounds, do-not-use
  surfaces, extracted colors, provenance, and confidence.
- `colorSystem`: primitives, ramps, semantic roles, theme variants, and
  contrast pairs.
- `statusSystem`: success, error, warning, info, neutral, disabled, focus, and
  selected.
- `interactionStates`: default, hover, active, focus, loading, disabled,
  selected, error, success, and empty.
- `componentThemes`: token bindings for reusable components.
- `runtimeExports`: CSS variables, viewer groups, preview swatches, and sample
  component bindings.
- `accessibility`: contrast checks and non-color-state requirements.
- `openQuestions`: unresolved runtime, asset, contrast, or token decisions.

## Readiness Rules

Fail readiness when:

- contrast pairs are absent
- a required status or interaction state is missing
- status or validation feedback relies only on color
- logo colors are screenshot-derived or inferred but marked high confidence
- runtime exports bind directly to raw hex values instead of semantic tokens
- no source refs identify the seed, capture, style, or asset evidence

## Hand-Off

Use the runtime theme for viewer and prototype styling decisions. Use the seed
for upstream brand, palette, typography, and component assumptions. Keep the
two artifacts separate so runtime needs do not bloat the seed contract.
