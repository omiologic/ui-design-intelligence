# Contract: ComponentImplementationPlan

## Purpose

`ComponentImplementationPlan` turns a `ComponentSpec` into a technical implementation path.

It should be created before writing React code, especially for complex, data-driven, or app-specific components.

## Required Sections

```txt
1. Component target
2. Component layer
3. File ownership recommendation
4. Props and view model
5. Data mapping requirements
6. State requirements
7. Interaction requirements
8. Styling approach
9. Responsive behavior
10. Accessibility requirements
11. Storybook scenarios
12. Testing strategy
13. Risks and assumptions
```

## Implementation Target Examples

```txt
react
nextjs
storybook
shopify-hydrogen
admin-ui
prototype-only
```

## File Ownership Recommendation

The plan should identify whether the component belongs in:

```txt
packages/shared-ui
project feature folder
project page section folder
app-specific integration folder
storybook-only prototype folder
```

## Risk Detection

The plan should warn when:

```txt
the component is too app-specific for shared UI
props are too close to API response shape
visual layout requires complex responsive behavior
interaction states are underspecified
mockup lacks mobile state
component requires external service behavior
```
