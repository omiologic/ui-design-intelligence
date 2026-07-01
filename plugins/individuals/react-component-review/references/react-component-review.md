# Workflow: React Component Review

## Objective

Review an implemented React component against its `ComponentSpec`, accessibility requirements, responsive behavior, and maintainability expectations.

## Review Areas

```txt
component architecture
props design
data coupling
semantic HTML
accessibility
responsive layout
styling maintainability
Storybook coverage
testability
performance
```

## Architecture Checks

Verify:

```txt
component names are meaningful
component boundaries are clean
repeated visual blocks are extracted
shared UI is not coupled to app-specific data
state is minimal and justified
side effects are not inside visual components unless intended
```

## Props Checks

Verify:

```txt
props represent content and behavior
prop names are clear
optional props have safe behavior
raw API response shapes are not leaked into shared UI
```

## Accessibility Checks

Verify:

```txt
headings are logical
buttons and links are used correctly
images have appropriate alt behavior
focus state exists
keyboard interaction works
ARIA is not overused
```

## Responsive Checks

Verify:

```txt
layout works on desktop, tablet, and mobile
long content does not break layout
missing image state is handled
CTA remains usable on mobile
```

## Output

Produce:

```txt
summary
blocking issues
recommended improvements
nice-to-have improvements
approval status
```
