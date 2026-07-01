---
name: app-specific-component-planner
description: Plan React components that depend on app domain data, APIs, routing, workflows, services, state machines, or product-specific behavior.
license: See repository LICENSE
---

# App-Specific Component Planner

Use this skill for React components tied to domain data, APIs, workflows,
services, routing, auth, cart behavior, analytics, or complex app state.

## Purpose

Plan app-specific React components by separating domain data, side effects,
view models, mappers, containers, shared UI extraction opportunities, state
models, Storybook scenarios, tests, and implementation risks.

## Philosophy

App-specific components are allowed to know product context, but they should
still keep boundaries legible. Domain logic, side effects, and workflow state
should be named explicitly instead of leaking into presentational UI.

## Decision Criteria

1. Use this skill when data coupling is `api-data`, `domain-model`,
   `state-machine`, or `external-service`.
2. Use this skill when the component depends on routing, auth, analytics, cart,
   backend APIs, customer data, or multi-step workflows.
3. Extract shared UI only after the app-specific responsibilities are separated.
4. Require test planning for mappers, state transitions, and side effects.

## Boundary

- Owns: app-specific implementation planning, domain data, view models, mapper
  functions, container responsibilities, side effects, state model, shared UI
  extraction opportunities, Storybook scenarios, tests, and risks.
- Does not own: creating the shared UI component plan after extraction, final
  source code, backend API design, or service credentials.

## References

- `references/app-specific-component-planning.md`
- `references/_shared/contracts/react-components/component-spec.contract.md`
- `references/_shared/contracts/react-components/shared-ui-vs-app-ui.contract.md`
- `references/_shared/react-patterns/ui-layer-boundary.md`
- `references/_shared/react-patterns/react-component-rules.md`
- `references/_shared/react-patterns/memoization-guidelines.md`
- `references/_shared/templates/react-components/component-implementation-plan-template.md`
- `references/_shared/templates/react-components/storybook-plan-template.md`
- `references/_shared/vocabulary/react-components/data-coupling.md`
- `references/_shared/vocabulary/react-components/component-complexity.md`

## Rules

1. Name domain data types and source services.
2. Separate domain model, view model, mapper, container, shared UI, and workflow
   logic.
3. Identify side effects: fetch, mutation, analytics, navigation, storage, file
   upload, cart, auth, or draft save.
4. Define UI states and domain workflow states separately.
5. Preserve shared UI extraction opportunities without pretending app-specific
   logic is reusable UI.
6. Do not include secrets, credentials, or real customer data in examples.
7. Use the implementation and Storybook templates to keep app-specific plans
   reviewable before code is written.

## Anti-Patterns

- Domain workflow state hidden inside a presentational component.
- Shared UI imports API clients.
- Mapper logic duplicated across every component.
- Service-specific raw responses passed into visual components.
- Analytics and navigation side effects are not named in the plan.
- Loading, empty, error, success, and validation states are omitted.

## Workflow

1. Identify domain model and source services.
2. Separate domain data from UI view models.
3. Identify side effects and their owners.
4. Define state model and transitions.
5. Define UI composition and shared extraction opportunities.
6. Define Storybook state scenarios with safe local fixtures.
7. Define tests for rendering, mappers, states, and side effects.
8. Produce an app-specific implementation plan.

## Inline Example

```txt
Component: VariantSelectorContainer
Domain data: Product, Variant
Mapper: mapProductToVariantSelectorViewModel
Shared UI: VariantSelector
Container owns: selected variant, URL sync, analytics, cart mutation callback
States: ready, unavailable, selecting, error
Tests: mapper, disabled variants, selection callback, error state
```

## Hand-Offs

Hand extracted shared UI decisions to `shared-ui-component-planner`. Hand final
React implementation plan to `component-spec-to-react-plan`. Hand Storybook
state coverage to `storybook-from-component-spec`. Hand finished code to
`react-component-review`.
