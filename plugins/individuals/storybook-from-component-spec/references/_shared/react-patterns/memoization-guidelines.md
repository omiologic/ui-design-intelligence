# React Memoization Guidelines

## Purpose

Memoization is a performance tool, not a default component style. Use `memo`,
`useMemo`, and `useCallback` only when there is a clear render-cost reason,
referential stability contract, or measured issue.

## When To Use `memo`

Use `memo` when:

- the component is pure and renders the same output for the same props
- render work is meaningfully expensive
- parent renders frequently while this component's props usually stay stable
- props are stable primitives or memoized objects/functions
- profiling, Storybook stress cases, or obvious component shape supports the
  cost

Good candidates:

- large static cards in virtualized or dense lists
- expensive SVG/icon compositions
- data-heavy tables where rows receive stable view-model props

## When Not To Use `memo`

Do not use `memo` when:

- the component is cheap to render
- props include fresh inline objects, arrays, or functions every render
- the component reads frequently changing context
- memoization makes the code harder to understand than the render cost warrants
- there is no stated performance risk

Anti-pattern:

```txt
Wrap every component in memo because memoization sounds safer.
```

## When To Use `useMemo`

Use `useMemo` for:

- expensive derived data
- stable object/array props passed to memoized children
- computed values that would otherwise cause avoidable downstream rerenders

Do not use `useMemo` for trivial string joins, simple boolean checks, or as a
way to hide unclear data flow.

## When To Use `useCallback`

Use `useCallback` when:

- passing a handler to a memoized child
- registering/unregistering subscriptions where stable identity matters
- a dependency array requires stable function identity for a real effect

Do not use `useCallback` on every event handler by default.

## Stale State Risks

Memoization can freeze incorrect assumptions when dependencies are incomplete.
Every memoized value or callback must list the state, props, and functions it
uses. If the dependency list is hard to reason about, simplify the component
first.

## Review Questions

- What render cost does this memoization avoid?
- Are the props or dependencies actually stable?
- Would moving data mapping to a parent or adapter be clearer?
- Is this component pure enough for `memo`?
- Would a Storybook stress story or profiler trace justify the optimization?
