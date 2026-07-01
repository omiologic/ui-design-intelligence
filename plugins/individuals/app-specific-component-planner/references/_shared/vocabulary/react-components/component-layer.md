# Component Layer Vocabulary

## Purpose

Component layer classifies where a React component belongs and how reusable it
should be before implementation planning starts.

## Values

### primitive

Smallest reusable visual building block.

Examples: `Button`, `Badge`, `Icon`, `Input`, `Divider`.

### shared-ui

Reusable component that can be used across pages, routes, or projects without
owning app data, fetching, routing, analytics, or persistence.

Examples: `ProductCard`, `FeatureCard`, `ComparisonTable`, `Accordion`.

### section

Page or screen section composed of smaller shared components.

Examples: `HeroSection`, `ProductGridSection`, `PricingSection`, `FAQSection`.

### layout

Component responsible for page, screen, or container structure.

Examples: `PageShell`, `TwoColumnLayout`, `DashboardLayout`,
`MarketingPageLayout`.

### data-driven

Component renders supplied structured data or schema-driven content. It may map
data for rendering, but should not own fetching or persistence unless it is
explicitly app-specific.

Examples: `ProductGrid`, `JsonAccordionEditor`, `DynamicComparisonTable`.

### app-specific

Component knows app domain, routing, API, cart, analytics, auth, or other
product-specific infrastructure.

Examples: `ShopifyProductSelector`, `RepairInquiryThread`,
`VariantSelectorContainer`.

### workflow

Component manages multi-step interaction, domain-specific states, validation, or
process behavior.

Examples: `HeadlampBuilder`, `RepairServiceWizard`, `MetafieldEditorFlow`.
