# Contract: Storybook Handoff

## Purpose

Storybook handoff turns a `ComponentSpec` or implemented component into realistic stories for visual review, regression testing, and client demonstration.

## Required Story Types

For most components, include:

```txt
Default
LongContent
MinimalContent
ResponsiveStress
MissingOptionalMedia
MultipleItems
```

For app-specific components, include:

```txt
Loading
Empty
Error
DataReady
EdgeCase
```

For workflow components, include:

```txt
Initial
InProgress
ValidationError
Completed
Canceled
```

## Story Data Rule

Use realistic data.

Avoid:

```txt
Lorem ipsum
Test title
Card 1
```

Prefer domain-like sample content:

```txt
Wireless Headlamp for Everyday Procedures
Compare diffused and adjustable spot lighting options.
```

## Controls

Expose useful controls for:

```txt
title
description
image
CTA label
CTA URL
items array
state variant
layout variant
```

## Handoff Output

The skill should produce:

```txt
story names
story purpose
sample data
control recommendations
edge cases
visual review notes
```
