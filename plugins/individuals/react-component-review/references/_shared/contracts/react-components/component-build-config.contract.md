# Component Build Config Contract

## Purpose

React component skills can read consumer project configuration from
`.ui-design-intelligence.yml` when it is available. The config lets a consuming
project provide local React component conventions without editing this skill
repository.

## Config Shape

```yaml
reactComponents:
  defaultComponentCodeFormat: "tsx"
  componentBuildConventionPath: "./docs/react-component-conventions.md"
```

## `componentBuildConventionPath`

`componentBuildConventionPath` points to a consumer-owned markdown file with
project-specific React component rules.

Allowed value:

- string path ending in `.md` or `.markdown`

Path resolution:

- relative paths resolve from the consumer workspace root, not from the installed
  skill directory
- absolute paths may be used when the consumer explicitly provides one
- missing files should not fail the skill workflow; the skill should warn and
  continue with repository defaults
- unreadable files should be treated like missing files and reported clearly

The referenced markdown should contain conventions such as:

- JSX versus TSX preference
- styling approach
- component folder and file naming
- prop typing and export conventions
- Storybook conventions
- test conventions
- project-specific UI/data boundary rules

It must not be generated component code, bundled source output, secrets, or
runtime configuration with credentials.

## Precedence

Apply conventions in this order:

1. Repository default rules and safety constraints.
2. Bundle default React component rules.
3. Consumer markdown from `componentBuildConventionPath`.
4. Explicit user instruction in the current request.

Consumer conventions can make decisions more specific, such as choosing TSX,
CSS Modules, or a Storybook naming style. They cannot override repository safety
constraints:

- do not jump from mockup to code before `ComponentSpec`
- do not put data fetching, persistence, analytics dispatch, routing ownership,
  or domain workflows inside reusable UI components
- do not emit secrets or credentials
- do not produce inaccessible component plans
- do not use blanket memoization rules

When consumer conventions conflict with repository safety constraints, the skill
must state the conflict and follow the safer repository rule.

## Missing Config

When `.ui-design-intelligence.yml` is missing, or when
`reactComponents.componentBuildConventionPath` is unset, use repository defaults.

When the config path is set but the markdown cannot be read, continue with
repository defaults and include a warning in the plan or review output.

## Validation Guidance

Validation should check that the starter config template includes
`reactComponents.componentBuildConventionPath` and that docs explain:

- path resolution
- markdown-only expectation
- missing-file behavior
- precedence
- safety constraints that cannot be overridden
