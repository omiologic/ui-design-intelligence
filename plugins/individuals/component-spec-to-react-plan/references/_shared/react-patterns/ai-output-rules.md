# AI Output Rules For React Components

## Do Not Jump Straight To Code

For mockups, first produce:

- analysis
- component layer
- complexity level
- component tree
- props model
- responsive behavior
- accessibility notes
- implementation risks
- open questions

Only write JSX or TSX after structure is clear or the user explicitly asks for
implementation.

## Prefer Structured Output

Use these artifacts when possible:

- `ComponentSpec`
- `ComponentImplementationPlan`
- `StorybookPlan`
- `ReviewReport`

## State Assumptions

When information is missing, make reasonable assumptions and list them. Do not
hide uncertainty inside code.

## Separate Concerns

Do not mix these unless the component is intentionally app-specific:

- visual component
- container component
- data fetching
- API mapping
- analytics
- routing
- cart logic
- auth/session logic

## Codegen Quality

Generated code should not include:

- invented imports from libraries not present in the project
- fake design-system components
- hard-coded secrets or credentials
- placeholder copy such as `Lorem ipsum` unless asked
- blanket `memo`, `useMemo`, or `useCallback`
- raw API response props in shared UI components
