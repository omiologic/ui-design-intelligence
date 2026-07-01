# React Component Ecosystem Architecture

## Purpose

The React component skill layer keeps wireframe, prototype, mockup analysis, and
React implementation planning inside one modular ecosystem. It avoids isolated
skill folders that cannot share vocabulary, schemas, output contracts, or
validation.

## High-Level Pipeline

```txt
study
-> knowledge
-> style reference
-> design system seed
-> runtime design theme
-> blueprint / wireframe
-> prototype
-> visual experience spec
-> component spec
-> implementation plan
-> Storybook plan
-> component review
```

## Existing Layer

The current `ui-design-intelligence` repository already owns the structural
design intelligence layer:

```txt
study findings
information architecture
wireframe hierarchy
interaction contracts
responsive priorities
accessibility constraints
schema-valid blueprint JSON
prototype planning
runtime design theme planning
visual experience handoff
```

## React Component Layer

The React component skill layer owns:

```txt
mockup interpretation
component classification
component tree generation
props and view-model modeling
JSX/TSX implementation planning
shared UI vs app-specific decisioning
Storybook planning
accessibility and responsive implementation review
memoization judgment
UI/data layer boundary review
```

## Artifact Rule

Every major layer should produce or consume a structured artifact. This prevents
agents from jumping directly from screenshot to arbitrary JSX.

Recommended artifact flow:

```txt
Mockup / screenshot / wireframe / design artifact
-> ComponentSpec
-> ComponentImplementationPlan
-> StorybookPlan
-> ReviewReport
```

## ComponentSpec Position

`ComponentSpec` connects:

- `StudyOutput`
- `PatternKnowledge`
- `StyleReference`
- `DesignSystemSeed`
- `RuntimeDesignTheme`
- `UIBlueprint`
- `PrototypeConfig`
- `VisualExperienceSpec`

to:

- React implementation plans
- Storybook plans
- shared UI extraction decisions
- app-specific integration decisions
- component reviews

## Why This Matters

Mockup-to-component work can range from simple to domain-specific:

- simple: `Button`, `Badge`, `ProductCard`, `FeatureCard`
- moderate: `HeroSection`, `ProductGridSection`, `ComparisonTable`
- advanced: product selector, builder, nested editor, checkout-connected UI
- domain-specific: headlamp builder, repair inquiry thread, metafield editor

Without a shared contract, every visual mockup risks becoming static JSX. The
ecosystem needs vocabulary and rules that decide whether something belongs in
primitive UI, shared UI, section UI, data-driven UI, app-specific UI, or
workflow UI.
