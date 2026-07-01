# React Accessibility Rules

## Required Checks

Every component created from a mockup must consider:

- heading order
- landmark and section semantics
- link versus button usage
- image alt text
- keyboard focus states
- input labels
- color contrast
- touch target size
- reduced motion when animation is used
- visible error and success feedback

## Image Rules

Decorative image:

```tsx
<img src={src} alt="" aria-hidden="true" />
```

Meaningful image:

```tsx
<img src={src} alt="Clear description of the product or content" />
```

## Button Versus Link

Use a link when navigation happens:

```tsx
<a href="/shop">Shop now</a>
```

Use a button when an in-place action happens:

```tsx
<button type="button">Open details</button>
```

## ARIA

Do not add ARIA unless it improves accessibility.

Bad:

```tsx
<div role="button">Click me</div>
```

Good:

```tsx
<button type="button">Click me</button>
```

## Forms

Inputs need visible labels or explicit accessible names. Validation errors
should be associated with their inputs and visible without relying on color
alone.

## Motion

Animated components need a reduced-motion fallback in the plan. Motion should
not hide essential content or prevent keyboard operation.
