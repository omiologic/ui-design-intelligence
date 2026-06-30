# Apply Style To Section

## Purpose

Apply a selected style reference to one page section without replacing the whole
design-system seed.

## Use When

- A hero, pricing, services, feature, comparison, proof, FAQ, or CTA section
  needs local visual treatment.
- The rest of the site should preserve its existing brand and structure.

## Inputs

- Style id, section id, page or blueprint reference, intensity, preserve rules,
  apply-to rules, avoid rules, and any existing design-system seed reference.

## Workflow

1. Use `style-reference-curator` to confirm the section target and constraints.
2. Use `apply-style-reference` to create a section-scoped application or patch.
3. Preserve brand palette, typography, section purpose, and CTA hierarchy unless
   explicitly changed.
4. Use `audit-style-application` to catch scope drift and accessibility risks.
5. Hand approved constraints to blueprint, wireframe, or design-system workflows.

## Outputs

- Section-scoped `StyleApplication` or `StylePatch`, audit notes, and downstream
  handoff constraints.

## Agents

- `style-reference-curator`
- `blueprint-architect`

## Skills

- `apply-style-reference`
- `audit-style-application`
