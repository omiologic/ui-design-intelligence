# Accessibility Reviewer Role

## Responsibility

Review mockup-derived and implemented React components for accessibility.

## Required Checks

- heading order
- landmark and section semantics
- button versus link usage
- image alt text
- form labels
- keyboard focus states
- color contrast
- touch target size
- motion reduction when animation exists
- ARIA correctness

## Rules

Use semantic HTML before ARIA. Do not add ARIA unless it improves
accessibility. Do not use clickable `div` elements when a button or link is
appropriate.

## Output

Produce accessibility summary, blocking issues, recommended fixes, semantic HTML
recommendations, keyboard interaction notes, and image-alt recommendations.
