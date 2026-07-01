---
name: shared-ui-component-planner
description: Decide whether a React component should become reusable shared UI and define clean props, view models, Storybook scenarios, and extraction risks.
license: See repository LICENSE
---

# Shared UI Component Planner

Use this skill when deciding whether a component should become reusable shared
UI, a page section, or stay app-specific.

## Purpose

Evaluate shared UI suitability and produce a plan for props, view models,
ownership, Storybook scenarios, and risks without leaking app services or domain
models into reusable UI.

## Philosophy

Shared UI is valuable only when it is genuinely portable. A component that knows
about APIs, routing, cart, auth, analytics, or domain workflows is not shared UI;
it is an app-specific adapter or workflow component.

## Decision Criteria

1. Use this skill when a component may belong in a shared UI package or reusable
   section library.
2. Approve shared UI only when it can receive clean props and avoid app services.
3. Recommend container/view separation when reusable visuals need domain data.
4. Prefer Storybook-ready components with realistic fixture data.

## Boundary

- Owns: shared UI decision, ownership recommendation, props model, view-model
  shape, adapter requirements, Storybook scenarios, and extraction risks.
- Does not own: app workflow planning, service integration, runtime package
  publishing, or final component code.

## References

- `references/shared-ui-component-planning.md`
- `references/_shared/contracts/react-components/component-spec.contract.md`
- `references/_shared/contracts/react-components/shared-ui-vs-app-ui.contract.md`
- `references/_shared/react-patterns/ui-layer-boundary.md`
- `references/_shared/react-patterns/react-component-rules.md`
- `references/_shared/react-patterns/storybook-rules.md`
- `references/_shared/templates/react-components/component-analysis-template.md`
- `references/_shared/templates/react-components/storybook-plan-template.md`
- `references/_shared/vocabulary/react-components/component-layer.md`
- `references/_shared/vocabulary/react-components/data-coupling.md`

## Rules

1. Shared UI cannot own fetching, mutation, analytics, auth, routing, cart, or
   domain workflow validation.
2. Shared UI should accept display-ready props or view-model objects.
3. Domain models should be mapped before reaching shared UI.
4. Storybook must be able to render the component with local fixtures.
5. If app-specific behavior is required, define the adapter/container boundary.
6. Use the component analysis and Storybook templates when documenting shared
   UI readiness and review scenarios.

## Anti-Patterns

- A component is called shared UI but imports a service client.
- Shared props contain raw Shopify, GraphQL, REST, auth, cart, or analytics
  objects.
- The component cannot be rendered in Storybook without app providers.
- Reuse is assumed because two screens look similar but their behavior differs.
- The shared component owns route construction for one app.

## Workflow

1. Read the `ComponentSpec` or component brief.
2. Identify data coupling, state ownership, and side effects.
3. Decide component layer: `shared-ui`, `section`, `data-driven`, or
   `app-specific`.
4. Define clean props and view-model shape.
5. Name any mapper, adapter, or container required.
6. Define Storybook scenarios and reuse risks.
7. Produce a shared UI decision with rationale.

## Inline Example

```txt
Decision: shared UI with app adapter
Shared component: ProductCard
Adapter: mapShopifyProductToProductCardProps
Container: ProductCardContainer owns route and analytics
Reject from shared UI: raw Shopify product, cart mutation, auth state
Stories: Default, LongContent, WithoutImage, LoadingPlaceholder
```

## Hand-Offs

Hand app-specific integration to `app-specific-component-planner`. Hand approved
shared UI specs to `component-spec-to-react-plan`. Hand Storybook scenarios to
`storybook-from-component-spec`. Hand implementation review to
`react-component-review`.
