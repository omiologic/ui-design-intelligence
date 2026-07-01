# ComponentSpec Contract

## Purpose

`ComponentSpec` is the implementation-facing bridge between UI design
intelligence and React component planning. It should be produced before writing
JSX or TSX.

It can be produced from:

- mockup analysis
- screenshot analysis
- wireframe output
- prototype planning
- design-system seed
- runtime design theme
- style reference
- visual experience spec

It can be consumed by:

- React implementation planning
- Storybook planning
- test planning
- shared UI planning
- app-specific integration planning
- component review

## Core Principle

Do not jump directly from mockup to JSX or TSX.

First create a `ComponentSpec` that records:

- what the component is
- where it belongs in the UI layer
- how reusable it should be
- what data shape it accepts
- what code format a later implementation plan should prefer
- how it responds across breakpoints
- what accessibility requirements apply
- what implementation risks must be handled before code
- what questions remain unresolved

## Required Fields

- `componentName`
- `componentLayer`
- `implementationTarget`
- `sourceType`
- `complexityLevel`
- `dataCoupling`
- `purpose`
- `componentTree`
- `propsModel`
- `responsiveBehavior`
- `accessibilityRequirements`
- `implementationRisks`
- `openQuestions`

## Implementation Target

`implementationTarget` describes the later implementation environment. It does
not require the `ComponentSpec` producer to write code.

Required fields:

- `framework`: currently `react`
- `defaultComponentCodeFormat`: `jsx` or `tsx`

Optional fields:

- `stylingApproach`
- `storybookRequired`
- `testPlanRequired`

Use `tsx` when the consumer project expects typed props, exported prop types,
or TypeScript-first component packages. Use `jsx` when the consumer project is
plain JavaScript or explicitly asks for JSX.

## Component Layer Values

Canonical vocabulary:
`.convention/vocabulary/react-components/component-layer.md`.

- `primitive`: low-level presentational element such as button, badge, icon, or
  input shell
- `shared-ui`: reusable composed UI component with no domain data ownership
- `section`: page or screen section assembled from smaller UI components
- `layout`: structural wrapper that arranges content or regions
- `data-driven`: component that renders supplied data but should still avoid
  owning fetch/persistence logic unless explicitly app-specific
- `app-specific`: integrated component tied to one product area, route, or
  domain model
- `workflow`: state-heavy or multi-step flow that coordinates task completion

## Data Coupling Values

Canonical vocabulary:
`.convention/vocabulary/react-components/data-coupling.md`.

- `none`
- `static-props`
- `schema-data`
- `api-data`
- `domain-model`
- `state-machine`
- `external-service`

## Complexity Levels

Canonical vocabulary:
`.convention/vocabulary/react-components/component-complexity.md`.

- `1`: static building block
- `2`: reusable shared UI component
- `3`: composed section component
- `4`: data-driven component
- `5`: app-specific integrated component
- `6`: state-heavy interactive component
- `7`: domain-specific workflow component

## UI/Data Boundary

Reusable UI components should stay in the UI layer. They may accept data through
props, render states, and emit events, but should not own fetching,
persistence, analytics dispatch, routing decisions, or domain workflow logic.

If the component needs those concerns, the spec should name an adapter,
container, route-level owner, or app-specific integration boundary.

## Related Vocabulary

- Source type:
  `.convention/vocabulary/react-components/source-type.md`
- Implementation target:
  `.convention/vocabulary/react-components/implementation-target.md`
- Component code format:
  `.convention/vocabulary/react-components/component-code-format.md`

## Example

```json
{
  "componentName": "ProductFeatureGrid",
  "componentLayer": "section",
  "implementationTarget": {
    "framework": "react",
    "defaultComponentCodeFormat": "tsx",
    "stylingApproach": "project-convention",
    "storybookRequired": true,
    "testPlanRequired": true
  },
  "sourceType": "mockup",
  "complexityLevel": 3,
  "dataCoupling": "static-props",
  "purpose": "Display a grid of product feature cards with heading, supporting copy, and optional CTA.",
  "componentTree": [
    "ProductFeatureGrid",
    "SectionHeader",
    "FeatureCardList",
    "FeatureCard",
    "SectionCTA"
  ],
  "propsModel": {
    "title": "string",
    "description": "string",
    "items": "FeatureCardItem[]",
    "cta": "LinkAction | null"
  },
  "responsiveBehavior": {
    "desktop": "Three-column card grid",
    "tablet": "Two-column card grid",
    "mobile": "Single-column stacked cards"
  },
  "accessibilityRequirements": [
    "Use section with labelled heading",
    "Cards should use article when each item is independently meaningful",
    "CTA should be link if it navigates"
  ],
  "implementationRisks": [
    "Avoid hard-coding feature card count",
    "Avoid using image-only cards without text alternatives"
  ],
  "openQuestions": [
    "Confirm whether cards link to feature detail pages or only support the section CTA."
  ]
}
```
