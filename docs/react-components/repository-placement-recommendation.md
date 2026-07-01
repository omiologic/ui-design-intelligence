# React Component Repository Placement

## Recommendation

Keep the React UI component skill set inside `ui-design-intelligence` first.
Do not create a separate repository during the skill-contract phase.

## Reason

`ui-design-intelligence` already has the right plugin monorepo shape:

```txt
plugins/individuals/
plugins/bundles/
.convention/
docs/
scripts/
```

This is the right place for modular skills, reusable contracts, controlled
vocabulary, templates, rules, examples, and installable bundles.

## Keep It Here When Work Is Skill-Oriented

Keep work in this repository when it involves:

- mockup analysis
- component breakdown
- props modeling
- responsive planning
- accessibility review
- Storybook planning
- React implementation guidance
- review rules
- handoff contracts
- bundle packaging

These are intelligence and instruction layers.

## Split Later When Work Is Runtime-Oriented

Create a separate repository only when the work includes:

- actual React component library code
- Storybook application
- Playwright or visual regression tests
- image processing scripts
- Figma parser
- AI CLI commands
- generated component output
- npm package exports
- Next.js demo app

At that point, the project becomes tooling, runtime, and package
infrastructure, not only a skill set.

## Long-Term Split

```txt
ui-design-intelligence
  skills, contracts, schemas, workflows, reasoning conventions

react-ui-component-lab
  Storybook, generated components, visual tests, runtime examples
```

## Bundle Naming

Use `ui-react-component-skills` first.

Potential future bundle names:

- `ui-shared-component-skills`
- `ui-app-component-skills`
- `ui-implementation-skills`
