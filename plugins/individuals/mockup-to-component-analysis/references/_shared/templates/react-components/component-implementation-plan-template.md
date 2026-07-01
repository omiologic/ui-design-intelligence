# Component Implementation Plan Template

Use this template after a `ComponentSpec` exists. This template plans React
implementation; it does not require generating source files.

## Component Target

```txt
Component name:
Component layer:
Implementation target: react
Default component code format: jsx | tsx
Ownership location:
Consumer convention source:
```

## Component Boundaries

```txt
Visual component:
Container component:
Mapper:
View model:
State logic:
Side effects:
Shared UI extraction:
App-specific owner:
```

## JSX/TSX Output Preference

```txt
Use JSX when:
Use TSX when:
Chosen format:
Reason:
```

If the chosen format is `tsx`, plan explicit prop types and exported view-model
types where useful. If the chosen format is `jsx`, still keep prop names and
data shape explicit in prose or JSDoc if the project convention expects it.

## Props And View Model

```txt
Props type:
View model type:
Required props:
Optional props:
Events:
Children or slots:
```

## Type Shape

```ts
type ComponentProps = {};
type ComponentViewModel = {};
```

## Data And Side-Effect Boundary

```txt
Data source:
Mapper owner:
Container owner:
Side effects:
Service dependencies:
What must stay out of shared UI:
```

## Styling Strategy

```txt
Approach:
Tokens:
Responsive method:
Consumer convention notes:
State classes or variants:
```

## Responsive Strategy

```txt
Desktop:
Tablet:
Mobile:
Long content:
Missing media:
Reduced motion:
```

## Accessibility Strategy

```txt
Semantic HTML:
Keyboard:
Images:
Focus:
ARIA:
Error/status feedback:
Motion:
```

## Storybook Plan

```txt
Default:
LongContent:
MinimalContent:
ResponsiveStress:
Loading:
Empty:
Error:
Disabled:
Selected:
ValidationError:
Controls/args:
Data-free fixtures:
```

## Test Plan

```txt
Render tests:
Interaction tests:
Mapper tests:
Accessibility tests:
Responsive or visual checks:
State tests:
```

## Performance And Memoization

```txt
Expected render cost:
Memo needed: yes | no | later
memo reason:
useMemo reason:
useCallback reason:
Stale dependency risks:
```

Do not recommend `memo`, `useMemo`, or `useCallback` by default. Explain the
render-cost or referential-stability reason when recommending them.

## Risks And Assumptions

```txt
Assumptions:
Risks:
Open questions:
```
