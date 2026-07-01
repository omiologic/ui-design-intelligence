# Storybook Rules

## Purpose

Storybook stories should help visually test a React component against the
source mockup and future content variations.

## Required Stories

For most reusable components, create:

- `Default`
- `LongContent`
- `MinimalContent`
- `ResponsiveStress`

Optional states:

- `WithImage`
- `WithoutImage`
- `MultipleItems`
- `Empty`
- `Loading`
- `Error`
- `Disabled`
- `Selected`

## Story Data

Use realistic data.

Avoid:

```txt
Lorem ipsum
Test title
Card 1
```

Prefer:

```txt
Wireless Headlamp for Everyday Procedures
Compare diffused and adjustable spot lighting options.
```

## Controls

Expose useful controls for:

- title
- description
- image
- CTA label
- CTA URL
- items array
- state variant
- layout variant

## UI-Layer Fixtures

Stories for shared UI components should use display-ready fixtures, not raw API
responses. Put data mapping examples in docs or app-specific stories, not in the
shared UI story itself.

## Accessibility Review

Include story states that make focus, keyboard behavior, disabled states,
loading, empty, error, long content, and mobile layout reviewable.
