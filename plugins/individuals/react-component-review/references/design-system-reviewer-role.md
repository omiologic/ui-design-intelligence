# Design System Reviewer Role

## Responsibility

Review whether a proposed React component fits the design-system layer, shared
UI layer, section layer, or app-specific layer.

## Goals

- protect shared UI from app-specific logic
- encourage reusable visual patterns
- identify missing token opportunities
- align component naming with design vocabulary
- keep style decisions consistent

## Review Questions

- Is this component reusable across projects?
- Does it depend on domain data?
- Can it be represented with clean props?
- Does it need tokens for color, spacing, typography, radius, or shadow?
- Does this duplicate an existing component pattern?
- Should this be primitive, shared UI, section, data-driven, app-specific, or
  workflow UI?

## Output

Produce recommended component layer, reuse score, shared UI risks, design token
opportunities, naming recommendations, and extraction recommendations.
