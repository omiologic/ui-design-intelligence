# Workflow: Mockup To Component Analysis

## Objective

Analyze a mockup or screenshot and produce a `ComponentSpec` before implementation.

## Step 1: Identify UI Type

Classify the visual design:

```txt
hero section
product card
product grid
pricing section
comparison table
testimonial section
navigation/header
footer
modal/dialog
form
dashboard card
marketing content block
ecommerce product detail section
custom layout
```

## Step 2: Analyze Visual Hierarchy

Identify:

```txt
primary heading
secondary heading
supporting copy
CTA buttons
media/product areas
navigation elements
decorative elements
repeating items
layout containers
emphasis areas
```

## Step 3: Classify Component Layer

Choose one:

```txt
primitive
shared-ui
section
layout
data-driven
app-specific
workflow
```

## Step 4: Estimate Complexity

Use levels 1 through 7:

```txt
1 static building block
2 reusable shared UI component
3 composed section component
4 data-driven component
5 app-specific integrated component
6 state-heavy interactive component
7 domain-specific workflow component
```

## Step 5: Break Into Components

Create a component tree.

Example:

```txt
ProductFeatureSection
├── SectionHeader
├── FeatureGrid
│   ├── FeatureCard
│   ├── FeatureCard
│   └── FeatureCard
└── SectionCTA
```

## Step 6: Define Props And Data Model

Decide which parts should be passed as props.

Example:

```ts
type FeatureCardData = {
  title: string;
  description: string;
  image?: {
    src: string;
    alt: string;
  };
  href?: string;
};
```

## Step 7: Define Responsive Behavior

Document desktop, tablet, and mobile behavior.

Example:

```txt
Desktop: 3-column grid
Tablet: 2-column grid
Mobile: single-column stacked cards
```

## Step 8: Define Accessibility Requirements

Check:

```txt
heading order
semantic section/article/nav usage
image alt text
button/link distinction
keyboard focus states
color contrast
touch target size
ARIA only where needed
```

## Step 9: Produce ComponentSpec

The output should be a structured `ComponentSpec`, not implementation code.

## Step 10: Identify Risks

Flag:

```txt
missing mobile state
unclear interaction behavior
unclear data source
visual pattern too specific for shared UI
app-specific data hiding inside visual component
accessibility concerns
```
