# React Component Build Config

React component skills can use project-local conventions from
`.ui-design-intelligence.yml`.

## Config Key

```yaml
reactComponents:
  defaultComponentCodeFormat: "tsx"
  componentBuildConventionPath: "./docs/react-component-conventions.md"
```

`componentBuildConventionPath` points to a markdown file owned by the consuming
project. Use it for project-specific React conventions such as component file
layout, TSX or JSX preference, styling rules, Storybook naming, test strategy,
and prop typing expectations.

## Path Resolution

- Relative paths resolve from the consumer workspace root.
- Absolute paths are allowed when explicitly provided.
- The target file must be markdown: `.md` or `.markdown`.
- Missing or unreadable files should produce a warning and fall back to
  repository defaults.

## Precedence

1. Repository default React component rules.
2. Bundle default rules.
3. Consumer markdown from `componentBuildConventionPath`.
4. Explicit user instruction in the current request.

Consumer conventions can make implementation choices more specific, but they do
not replace repository safety constraints. A local convention cannot authorize
data fetching inside reusable UI components, inaccessible component plans,
secret exposure, premature JSX/TSX before `ComponentSpec`, or blanket
memoization advice.

## Example Convention File

```md
# React Component Conventions

- Prefer TSX for new components.
- Export props as `ComponentNameProps`.
- Keep reusable components data-free; route loaders and containers own fetching.
- Use CSS Modules for component-local styles.
- Add Storybook stories for default, loading, empty, error, and mobile states.
- Use `memo` only after a measured or clearly explained render-cost issue.
```

## Skill Behavior

When a skill sees `componentBuildConventionPath`, it should read the markdown
before producing a `ComponentSpec`, implementation plan, Storybook plan, or
review. If it cannot read the file, it should continue with defaults and report
the missing convention path.
