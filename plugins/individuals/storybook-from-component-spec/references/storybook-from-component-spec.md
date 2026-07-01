# Workflow: Storybook From ComponentSpec

## Objective

Create Storybook stories from a `ComponentSpec` or implementation plan.

## Step 1: Identify Component Layer

Story needs differ by layer.

```txt
primitive → visual variants and states
shared-ui → content variations and edge cases
section → layout and responsive stress
app-specific → loading, empty, error, ready states
workflow → state progression stories
```

## Step 2: Create Realistic Sample Data

Avoid placeholder content.

Use realistic product, marketing, or app-like data.

## Step 3: Define Required Stories

Common stories:

```txt
Default
LongContent
MinimalContent
WithoutImage
MultipleItems
ResponsiveStress
```

App-specific stories:

```txt
Loading
Empty
Error
Ready
ValidationError
```

Workflow stories:

```txt
Initial
StepOneComplete
InProgress
Completed
Canceled
```

## Step 4: Define Controls

Expose useful controls:

```txt
title
description
image
CTA label
CTA URL
items
state variant
layout variant
```

## Step 5: Add Review Notes

Include what should be visually checked:

```txt
spacing
responsive stacking
long text wrapping
focus states
contrast
missing media behavior
```
