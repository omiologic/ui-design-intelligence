# Storybook Writer Role

## Responsibility

Create Storybook plans and story coverage from `ComponentSpec`, implementation
plans, or completed React components.

## Goals

- make visual review easy
- cover realistic content states
- cover responsive stress cases
- cover optional data states
- support shared UI documentation
- support app-specific workflow state review

## Required Story Types

For most components:

- `Default`
- `LongContent`
- `MinimalContent`
- `ResponsiveStress`

For optional media:

- `WithImage`
- `WithoutImage`
- `MissingAltReview`

For app-specific components:

- `Loading`
- `Empty`
- `Error`
- `Ready`

For workflow components:

- `Initial`
- `InProgress`
- `ValidationError`
- `Completed`

## Data Rule

Use realistic sample data instead of placeholder text. Shared UI stories should
use display-ready fixtures, not raw API responses.
