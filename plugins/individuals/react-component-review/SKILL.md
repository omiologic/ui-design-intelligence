---
name: react-component-review
description: Review React JSX or TSX components against ComponentSpec, accessibility, responsiveness, UI/data boundaries, Storybook coverage, tests, and memoization judgment.
license: See repository LICENSE
---

# React Component Review

Use this skill to review implemented or proposed React components against a
`ComponentSpec`, implementation plan, Storybook plan, or project convention.

## Purpose

Find issues in React component architecture, props, data coupling, semantic
HTML, accessibility, responsive layout, styling maintainability, Storybook
coverage, testability, and performance decisions.

## Philosophy

Review should protect layer ownership and user experience before style
preferences. The most important failures are data-layer leakage, inaccessible
markup, broken responsive behavior, unclear props, missing states, and
performance work that adds complexity without evidence.

## Decision Criteria

1. Use this skill after JSX or TSX exists, or when reviewing a detailed
   implementation plan before coding.
2. Compare against `ComponentSpec` when available.
3. Treat shared UI data-layer leakage as a serious architecture issue.
4. Evaluate memoization by render cost, stability, and stale-state risk.
5. Check Storybook and tests as part of component readiness.

## Boundary

- Owns: review findings, severity, architecture risks, accessibility issues,
  responsive issues, props/data coupling issues, Storybook/test gaps, and
  memoization concerns.
- Does not own: rewriting the component unless explicitly asked, choosing a new
  product architecture, or approving missing accessibility evidence.

## References

- `references/react-component-review.md`
- `references/accessibility-reviewer-role.md`
- `references/design-system-reviewer-role.md`
- `references/_shared/contracts/react-components/component-spec.contract.md`
- `references/_shared/react-patterns/react-component-rules.md`
- `references/_shared/react-patterns/ui-layer-boundary.md`
- `references/_shared/react-patterns/memoization-guidelines.md`
- `references/_shared/react-patterns/accessibility-rules.md`
- `references/_shared/react-patterns/storybook-rules.md`
- `references/_shared/react-patterns/styling-rules.md`
- `references/_shared/react-patterns/ai-output-rules.md`
- `references/_shared/templates/react-components/component-implementation-plan-template.md`
- `references/_shared/templates/react-components/storybook-plan-template.md`

## Rules

1. Lead with actionable findings ordered by severity.
2. Reference the relevant component file, line, prop, state, story, or spec
   field when available.
3. Flag shared UI components that own data fetching, persistence, analytics,
   routing, auth, cart, or domain workflow logic.
4. Flag inaccessible semantics, link/button misuse, unlabeled inputs, missing
   alt text, focus loss, and color-only state.
5. Flag missing desktop/tablet/mobile behavior when layout complexity requires
   it.
6. Flag blanket memoization and stale dependency risks.
7. Mention test and Storybook gaps that block confident reuse.
8. Use the implementation and Storybook templates as review checklists when a
   component plan is provided instead of finished code.

## Anti-Patterns

- Approving a shared UI component that imports an API client.
- Ignoring missing keyboard behavior because the component looks correct.
- Treating `memo` everywhere as a performance improvement.
- Reviewing only visual similarity to a mockup.
- Accepting raw backend response shapes as shared UI props.
- Ignoring missing loading, empty, error, disabled, and long-content states.

## Workflow

1. Identify inputs: code, `ComponentSpec`, implementation plan, stories, tests,
   and consumer conventions.
2. Compare implementation against intended component layer and data coupling.
3. Review props, state, effects, events, and memoization.
4. Review semantic HTML and accessibility behavior.
5. Review responsive and styling resilience.
6. Review Storybook and test coverage.
7. Return findings first, then open questions and a concise approval status.

## Inline Example

```txt
Finding: ProductCard imports the Shopify client directly, so it cannot be
shared UI as specified. Move fetching to ProductCardContainer and pass a
ProductCardViewModel into ProductCard.

Severity: blocking
Area: UI/data boundary
```

## Hand-Offs

Hand missing or stale specs to `mockup-to-component-analysis`. Hand architecture
planning fixes to `component-spec-to-react-plan`. Hand shared UI boundary fixes
to `shared-ui-component-planner`. Hand app data and workflow fixes to
`app-specific-component-planner`. Hand Storybook gaps to
`storybook-from-component-spec`.
