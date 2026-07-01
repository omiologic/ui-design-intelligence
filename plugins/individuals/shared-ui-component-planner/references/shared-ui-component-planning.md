# Workflow: Shared UI Component Planning

## Objective

Decide whether a component should become reusable shared UI.

## Shared UI Criteria

A component is a good shared UI candidate when:

```txt
it has reusable visual purpose
it does not require app-specific services
it can receive clean props
it can be documented in Storybook
it can be reused across multiple pages or projects
it does not know about routing, cart, auth, analytics, or API response shape
```

## Not Shared UI When

Do not make it shared UI when:

```txt
it depends on Shopify Product or Variant directly
it triggers analytics events directly
it manages cart behavior
it fetches from an API
it relies on app route state
it owns domain workflow validation
```

## Recommended Pattern

```txt
App-specific container
→ maps domain data
→ passes view model props
→ shared UI component renders UI
```

## Output

The skill should produce:

```txt
recommended component layer
recommended ownership location
props model
view model shape
adapter requirements
storybook scenarios
risks
```
