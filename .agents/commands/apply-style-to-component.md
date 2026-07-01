# Apply Style To Component

## Purpose

Apply a selected style reference to one component family or component instance.

## Use When

- Cards, dialogs, drawers, badges, buttons, navigation, or form components need
  a style variant.
- A user wants visual treatment without changing the site or page direction.

## Inputs

- Style id, component id or family, target artifact reference, intensity,
  preserve rules, apply-to rules, avoid rules, and accessibility constraints.

## Workflow

1. Use `style-reference-curator` to confirm the component target.
2. Use `apply-style-reference` to create a component-scoped application or
   patch.
3. Preserve component anatomy, labels, state requirements, and accessibility
   behavior unless explicitly changed.
4. Use `audit-style-application` to review state clarity, contrast, and scope.
5. Hand approved constraints to component, design-system, or prototype workflows.

## Outputs

- Component-scoped `StyleApplication` or `StylePatch`, audit notes, and state or
  design-system handoff constraints.

## Agents

- `style-reference-curator`

## Skills

- `apply-style-reference`
- `audit-style-application`
