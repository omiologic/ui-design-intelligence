# Apply Style To Design System

## Purpose

Apply a selected style reference to a design-system seed as recommendations or a
style patch.

## Use When

- A `DesignSystemSeed` should adopt a visual direction without losing explicit
  project decisions.
- A style should influence brand, palette, typography, iconography, buttons,
  cards, header, footer, or prototype behavior conventions.

## Inputs

- Style id or style blend, target design-system seed, preserve rules, intensity,
  source notes, and avoid constraints.

## Workflow

1. Use `style-reference-curator` to confirm scope and preserve rules.
2. Use `apply-style-reference` or `blend-style-references` to shape the style
   request.
3. Use `map-style-to-design-system-seed` to produce seed recommendations or a
   `StylePatch`.
4. Use `audit-style-application` to catch conflicts, overuse, and accessibility
   risks.
5. Hand approved changes to design-system seed generation or audit workflows.

## Outputs

- Style-to-seed mapping notes, `StylePatch` changes, preserve rules, avoid
  rules, and audit findings.

## Agents

- `style-reference-curator`
- `design-system-architect`

## Skills

- `apply-style-reference`
- `blend-style-references`
- `map-style-to-design-system-seed`
- `audit-style-application`
