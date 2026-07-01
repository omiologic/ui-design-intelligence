# Storybook Plan Template

Use this template to plan Storybook coverage from a `ComponentSpec` or React
implementation plan.

## Component

```txt
Name:
Layer:
Purpose:
Default component code format: jsx | tsx
Source spec:
```

## Fixture Strategy

```txt
Fixture grain:
Data-free UI fixtures:
View model fixture:
Raw API response excluded:
Consumer convention notes:
```

Shared UI stories should use display-ready props or view-model fixtures. Do not
use raw API responses, service clients, auth state, cart objects, analytics
emitters, or backend payloads in shared UI stories.

## Required Stories

### Default

```txt
Purpose:
Sample data:
Expected review:
```

### LongContent

```txt
Purpose:
Sample data:
Expected review:
```

### MinimalContent

```txt
Purpose:
Sample data:
Expected review:
```

### ResponsiveStress

```txt
Purpose:
Sample data:
Desktop viewport:
Tablet viewport:
Mobile viewport:
Expected review:
```

## State Stories

```txt
Loading:
Empty:
Error:
Disabled:
Selected:
ValidationError:
Success:
```

Add only states that the component can actually render. For app-specific
components, include `Ready`, `Submitting`, or workflow states when relevant.

## Controls And Args

```txt
title:
description:
image:
cta:
items:
state:
layout:
variant:
disabled:
```

Controls should expose meaningful component behavior, not internal
implementation details.

## Viewport Scenarios

```txt
Desktop:
Tablet:
Mobile:
Narrow mobile:
Reduced motion:
High zoom or long text:
```

## Accessibility Checks

```txt
Heading and landmark:
Button versus link:
Image alt text:
Keyboard and focus:
Color contrast:
Error/status feedback:
Reduced motion:
```

## Visual Review Notes

```txt
Spacing:
Wrapping:
Breakpoints:
Focus states:
Contrast:
Missing media:
Overflow:
Tap targets:
```

## Test Or Review Hand-Off

```txt
Stories that should block approval:
Stories that need design review:
Stories that need accessibility review:
Open questions:
```
