---
name: component-spec-to-react-plan
description: Convert an approved ComponentSpec into a React JSX or TSX implementation plan with ownership, props, styling, accessibility, Storybook, and test guidance.
license: See repository LICENSE
---

# ComponentSpec To React Plan

Use this skill after a `ComponentSpec` exists and the user wants a technical
React implementation plan.

## Purpose

Translate `ComponentSpec` into an implementation plan that names component
ownership, file boundaries, props, view models, adapters, styling strategy,
responsive behavior, accessibility strategy, Storybook coverage, and test
coverage.

## Philosophy

A React plan should make implementation boring. It should settle boundaries and
risks before files are generated, especially where shared UI might accidentally
absorb app data, routing, analytics, cart, auth, or workflow responsibilities.

## Decision Criteria

1. Use this skill when the input already has a `ComponentSpec`.
2. Prefer TSX planning when the spec or consumer config selects `tsx`.
3. Plan container/view separation for complex or data-coupled components.
4. Keep implementation plans code-format aware without writing code unless the
   user explicitly asks for implementation.

## Boundary

- Owns: implementation plan, component ownership, props and view-model shape,
  mapper/container boundaries, styling approach, responsive strategy,
  accessibility strategy, Storybook plan summary, and test plan summary.
- Does not own: producing the original `ComponentSpec`, writing source files,
  creating Storybook stories, or reviewing finished code.

## References

- `references/component-spec-to-react-plan.md`
- `references/react-component-architect-role.md`
- `references/ui-implementation-engineer-role.md`
- `references/_shared/contracts/react-components/component-spec.contract.md`
- `references/_shared/contracts/react-components/component-implementation.contract.md`
- `references/_shared/contracts/react-components/component-build-config.contract.md`
- `references/_shared/schemas/component-spec.schema.json`
- `references/_shared/templates/react-components/component-implementation-plan-template.md`
- `references/_shared/templates/react-components/storybook-plan-template.md`
- `references/_shared/react-patterns/react-component-rules.md`
- `references/_shared/react-patterns/memoization-guidelines.md`
- `references/_shared/react-patterns/ui-layer-boundary.md`
- `references/_shared/react-patterns/styling-rules.md`
- `references/_shared/react-patterns/accessibility-rules.md`
- `references/_shared/templates/ui-design-intelligence.config.yml`

## Rules

1. Start from a valid `ComponentSpec`.
2. Respect `implementationTarget.defaultComponentCodeFormat`: `jsx` or `tsx`.
3. Use `component-implementation-plan-template.md` for structured implementation
   planning output.
4. If `componentBuildConventionPath` is configured, apply consumer conventions
   after repository defaults and before current request overrides.
5. Separate visual component, container, mapper, view model, state logic, and
   side effects.
6. Recommend memoization only when there is a render-cost or referential
   stability reason.
7. Do not plan raw API response objects as shared UI props.
8. Include Storybook and test implications, even when source code generation is
   deferred.

## Anti-Patterns

- Generating code without resolving ownership and data coupling.
- Treating every component as TSX if the project convention says JSX.
- Planning `memo`, `useMemo`, or `useCallback` everywhere by default.
- Putting API clients, route decisions, or analytics inside shared UI.
- Omitting tests for mapper functions when mapper functions are required.

## Workflow

1. Validate the `ComponentSpec` shape and identify missing decisions.
2. Resolve consumer config and default component code format.
3. Decide ownership location: shared UI package, page section, feature folder,
   app-specific container, or prototype-only surface.
4. Define visual component boundaries and any adapter/container boundaries.
5. Define JSX/TSX props, view-model shape, and mapper responsibilities.
6. Define styling, responsive, accessibility, Storybook, and test strategies.
7. Identify performance considerations and only justified memoization.
8. Produce `ComponentImplementationPlan` prose or structured markdown.

## Inline Example

```txt
Component: ProductFeatureGrid
Format: TSX
Ownership: page section with reusable FeatureCard child
View component: ProductFeatureGrid.tsx
Props: ProductFeatureGridProps with title, description, items, cta
Data boundary: route loader maps API data to FeatureCardItem[]
Stories: Default, LongContent, MinimalContent, ResponsiveStress
Memoization: not needed initially; FeatureCard render cost is low
```

## Hand-Offs

Hand Storybook-specific work to `storybook-from-component-spec`. Hand shared
package decisions to `shared-ui-component-planner`. Hand app-data and workflow
decisions to `app-specific-component-planner`. Hand finished implementation to
`react-component-review`.
