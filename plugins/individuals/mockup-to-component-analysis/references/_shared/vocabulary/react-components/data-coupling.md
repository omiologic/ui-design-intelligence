# Data Coupling Vocabulary

## Purpose

Data coupling describes how tightly a component is connected to data sources,
state ownership, product domain models, or external services.

## Values

### none

No data dependency beyond static markup, children, or simple composition.

### static-props

Receives simple props such as string, number, boolean, image, or CTA object.

### schema-data

Receives structured data validated by a schema.

### api-data

Consumes, maps, or adapts data shaped like an API response.

### domain-model

Uses app-specific domain types such as `Product`, `Variant`, `Customer`,
`Inquiry`, or `Thread`.

### state-machine

Depends on explicit workflow states, transitions, guards, or reducer/state
machine rules.

### external-service

Connects to services such as Shopify, analytics, auth, cart, search, or backend
APIs.

## Rule

The higher the data coupling, the more likely the implementation should use an
app-specific container, adapter, route owner, or workflow boundary instead of
putting those responsibilities inside a reusable UI component.
