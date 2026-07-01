# React Component Rules

## Purpose

Use this reference when turning a mockup, screenshot, wireframe, or
`ComponentSpec` into a React component plan. The goal is to produce components
that are focused, accessible, reusable where appropriate, and honest about their
data and integration boundaries.

## Component Design

- Prefer semantic HTML before ARIA.
- Prefer named exports.
- Use explicit props and event contracts.
- Keep components focused on one UI responsibility.
- Extract repeated visual blocks only when the abstraction has a real name and
  stable reuse.
- Avoid unnecessary local state.
- Avoid unnecessary effects.
- Do not hard-code copy unless the component is a page-specific section.
- Do not mix data fetching into visual components unless the component is
  explicitly app-specific.
- Use `ComponentSpec` before JSX or TSX for mockup-to-component work.

## Composition

Good composition names the parts a reader would expect:

```txt
ProductFeatureGrid
SectionHeader
FeatureCardList
FeatureCard
SectionCTA
```

Poor composition hides structure behind vague pieces:

```txt
Wrapper
LeftThing
InfoBox
Content
```

## Props

Props should represent content, state, and allowed behavior. Prefer view-model
props over raw API response objects.

Good:

```ts
type ProductCardProps = {
  title: string;
  description: string;
  image: {
    src: string;
    alt: string;
  };
  price?: string;
  href?: string;
};
```

Avoid:

```ts
type ProductCardProps = {
  blueText: string;
  leftThing: string;
  box1: string;
};
```

Avoid raw service shapes in shared UI:

```ts
type ProductCardProps = {
  shopifyProduct: ShopifyProductResponse;
};
```

Prefer:

```txt
API response -> mapper -> view model -> shared UI props
```

## Controlled And Uncontrolled State

Use controlled props when the parent needs to own the state:

- selected item
- open/closed state shared with routing or analytics
- form field value
- active tab tied to URL or workflow state

Use local state when the state is purely presentational and disposable:

- hover-adjacent visual affordance
- internal disclosure for a self-contained FAQ
- temporary animation state

Do not mirror props into local state unless there is a clear reset or editing
workflow.

## Event Contracts

Event props should name user intent, not DOM mechanics:

- `onSelectProduct`
- `onDismiss`
- `onSubmitSearch`
- `onToggleExpanded`

Avoid vague handlers:

- `onClickThing`
- `handleData`
- `onChangeStuff`

## Slots And Children

Use `children` or named slots when a component owns layout but not exact
content. Keep slot APIs narrow enough that the component still has a coherent
purpose.

## Responsive Behavior

Every planned component at section complexity or above should state:

- desktop behavior
- tablet behavior
- mobile behavior
- reduced-motion behavior when animation is involved

## Storybook Readiness

Reusable components should have story scenarios for:

- default content
- long content
- minimal content
- responsive stress
- empty/loading/error states when applicable

## Anti-Patterns

- Jumping from mockup directly to JSX or TSX without a `ComponentSpec`.
- Reusable UI component owns `fetch`, persistence, analytics dispatch, cart
  mutation, auth, or routing.
- `useEffect` is used to derive values that could be computed during render.
- Props expose raw API response objects to shared UI components.
- Component names describe appearance instead of purpose.
- Components hard-code content that should be props or data.
- Abstractions are extracted before reuse is proven.
