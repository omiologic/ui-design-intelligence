# UI Layer Boundary

## Purpose

Reusable UI components should stay in the UI layer. They render prepared data,
show states, expose event contracts, and preserve accessibility. They should not
own product data retrieval, persistence, domain workflows, or service
integration.

## UI Component Responsibilities

Reusable UI components may own:

- semantic markup
- layout and visual hierarchy
- responsive behavior
- accessibility labels and relationships
- presentational variants
- simple local UI state
- event callbacks
- display-ready props

## Data Layer Responsibilities

Route loaders, containers, adapters, services, or workflow owners should own:

- data fetching
- mutation and persistence
- API response mapping
- cache invalidation
- auth/session checks
- analytics dispatch
- routing decisions
- cart or checkout integration
- domain validation
- state machines for business workflows

## Good Separation

```txt
ProductRoute
-> load product data
-> map API response to ProductCardViewModel
-> render ProductCard
```

`ProductCard` receives:

```txt
title
description
image
price
href
status
onSelectProduct
```

It does not receive:

```txt
Shopify client
raw GraphQL response
auth token
cart mutation function with service-specific payload
```

## Container Adapter Pattern

When a component needs app data, split it:

- `ProductCard`: shared UI
- `ProductCardContainer`: app-specific adapter
- `mapProductToProductCardProps`: data mapping

The shared UI remains portable. The container can know routing, services, and
domain models.

## State Machine Boundary

Reusable UI can render a state such as `loading`, `error`, `empty`, `selected`,
or `disabled`. Workflow components or state machines should own transitions,
guards, service calls, and domain validation.

## Routing Boundary

Reusable UI may render an `href` or call `onNavigate`. It should not decide the
route structure for a product unless it is an app-specific component.

## Anti-Patterns

- Shared component imports an API client.
- Shared component calls `fetch`.
- Shared component dispatches analytics directly.
- Shared component mutates cart or checkout state.
- Shared component parses backend response shape during render.
- Shared component owns business validation rules.
- Component is named as shared UI but requires domain-only models.

## ComponentSpec Requirement

When data coupling is `api-data`, `domain-model`, `state-machine`, or
`external-service`, the `ComponentSpec` must describe where the data-layer
responsibility lives and whether the React implementation should use a
container, adapter, route owner, or workflow boundary.
