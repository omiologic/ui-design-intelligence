# Workflow: ComponentSpec To React Plan

## Objective

Convert a `ComponentSpec` into a React implementation plan.

## Inputs

```txt
ComponentSpec
existing design system notes
project stack
styling approach
optional app data types
```

## Step 1: Confirm Component Ownership

Decide whether the component belongs in:

```txt
shared UI package
page section
feature folder
app-specific container
prototype-only folder
```

## Step 2: Define Component Boundaries

Separate:

```txt
visual component
container component
data mapper
view model
state logic
side effects
```

## Step 3: Define TypeScript Types

Create props and view-model types.

Do not expose raw API response types directly to shared UI components unless the component is intentionally app-specific.

## Step 4: Define Styling Strategy

Choose the styling method based on the project:

```txt
SCSS module
regular SCSS
Tailwind classes
MUI component styling
CSS variables
existing design tokens
```

## Step 5: Define Responsive Strategy

Specify layout behavior for:

```txt
desktop
tablet
mobile
content overflow
long text
missing media
```

## Step 6: Define Accessibility Strategy

Specify required semantic HTML, labels, focus states, and image alt behavior.

## Step 7: Define Storybook Plan

Create story names and sample data requirements.

## Step 8: Define Test Plan

Recommend tests for:

```txt
rendering
props behavior
conditional UI
interaction state
accessibility checks
mapper functions
```

## Output

Produce a `ComponentImplementationPlan`.
