# Contract: Shared UI vs App-Specific UI

## Purpose

This contract prevents the AI from mixing reusable visual components with app-specific data, routing, analytics, API, cart, or domain logic.

## Shared UI Component

A shared UI component should be generic, reusable, and mostly unaware of the application domain.

It should:

```txt
receive clean props
avoid direct API calls
avoid app-specific data fetching
avoid cart/auth/routing logic
avoid analytics side effects
be testable in Storybook
be usable across multiple pages or projects
```

Examples:

```txt
Button
Badge
ProductCard
FeatureCard
ComparisonTable
HeroShowcase
ProductGrid
Accordion
JsonTreeViewer
```

## App-Specific Component

An app-specific component is allowed to know about domain models, APIs, routing, or business logic.

It may:

```txt
read Shopify product data
map variant data
connect to cart behavior
trigger analytics events
load app-specific content
handle authentication state
connect to backend APIs
adapt domain models into shared UI props
```

Examples:

```txt
ShopifyProductCardContainer
BiLumixHeadlampVariantSelector
JKDentalRepairInquiryThread
ShopifyMetafieldJsonEditor
HeadlampBuilderConfigurator
```

## Recommended Pattern

Use this separation:

```txt
Domain data
→ adapter / mapper
→ view model
→ shared UI component
```

Example:

```txt
Shopify Product
→ mapShopifyProductToProductCard()
→ ProductCardViewModel
→ <ProductCard />
```

## Rule

A mockup can describe a visual component, but the implementation skill must decide whether the output should become:

```txt
shared UI
section-level UI
app-specific container
workflow component
```

Do not make everything a shared UI component. Do not put app-specific data logic inside reusable UI components.
