# Component Complexity Vocabulary

## Purpose

Complexity levels define how much planning is required before implementation.
Higher levels require clearer state, data, testing, Storybook, and integration
boundaries.

## Levels

### 1: Static Building Block

Simple visual piece with minimal props and no meaningful state.

Examples: `Button`, `Badge`, `Divider`, `IconLabel`.

### 2: Reusable Shared UI Component

Reusable card, panel, row, or item component.

Examples: `ProductCard`, `FeatureCard`, `TestimonialCard`, `PricingCard`.

### 3: Composed Section Component

Section built from multiple smaller parts.

Examples: `HeroShowcase`, `ProductGridSection`, `ComparisonSection`,
`FeatureHighlightSection`.

### 4: Data-Driven Component

Component renders from arrays, schemas, or structured data.

Examples: `CollectionGrid`, `DynamicComparisonTable`, `JsonTreeViewer`,
`NestedAccordionEditor`.

### 5: App-Specific Integrated Component

Component connects to app-level data types or services.

Examples: `ShopifyProductCardContainer`, `VariantSelector`,
`CustomerInquiryThread`.

### 6: State-Heavy Interactive Component

Component has complex UI state or interaction rules.

Examples: `ConfigurableProductBuilder`, `EditableJsonAccordion`,
`InteractiveProductComparison`.

### 7: Domain-Specific Workflow Component

Component handles business-specific flow, validation, and external integrations.

Examples: `BiLumixHeadlampBuilder`, `RepairServiceWizard`,
`ShopifyMetafieldPublishingFlow`.
