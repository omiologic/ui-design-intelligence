# UI React Component Skills

## Summary

`ui-react-component-skills` is the React component planning bundle. It converts
mockups, screenshots, wireframes, and design-intelligence artifacts into
`ComponentSpec` output, JSX/TSX-aware implementation plans, Storybook plans,
shared versus app-specific component decisions, and React component reviews.

## When To Install

Install this bundle when the next workflow is React component analysis or
planning, especially when a user asks to turn a mockup, screenshot, wireframe,
prototype, design-system seed, runtime theme, or style reference into component
boundaries before code.

Use it for:

- `ComponentSpec` generation before JSX or TSX
- React implementation planning without premature source generation
- Storybook scenario planning with realistic fixtures
- shared UI versus app-specific component decisions
- React component review for accessibility, responsiveness, memoization, and
  UI/data layer boundaries

Do not install it as a production React component library, Storybook app,
visual regression suite, npm package, or runtime renderer.

## Included

Skills:

- `mockup-to-component-analysis`
- `component-spec-to-react-plan`
- `storybook-from-component-spec`
- `shared-ui-component-planner`
- `app-specific-component-planner`
- `react-component-review`

Agents:

- None in this first bundle. Role and agent ownership is deferred until the
  workflow stabilizes.

Commands:

- None in this first bundle. Users invoke the skills directly or through an
  aggregate workflow.

Shared assets include `ComponentSpec` contracts and schema, React component
vocabulary, React pattern guidance, JSX/TSX-aware templates, Storybook planning
templates, ecosystem docs, config docs, and a valid `ComponentSpec` example.

## Requirements

This bundle is skill-oriented and can run without a React application checkout.
For best output, provide one or more of:

- mockup or screenshot
- UIBlueprint or wireframe notes
- DesignSystemSeed
- RuntimeDesignTheme
- StyleReference
- VisualExperienceSpec
- existing React component code for review
- consumer project config at `.ui-design-intelligence.yml`

Consumer projects can configure local conventions with:

```yaml
reactComponents:
  defaultComponentCodeFormat: "tsx"
  componentBuildConventionPath: "./docs/react-component-conventions.md"
```

The referenced convention file augments repository defaults. It cannot override
safety rules such as producing `ComponentSpec` before code, keeping shared UI
out of the data layer, preserving accessibility, or avoiding blanket
memoization.

## Install

Codex/GPT full `.agents` target:

```bash
node scripts/install-bundle.mjs install ui-react-component-skills "$HOME/.agents" "$HOME/.agents/skills" --dry-run
node scripts/install-bundle.mjs install ui-react-component-skills "$HOME/.agents" "$HOME/.agents/skills"
```

Claude/local full-bundle target:

```bash
UI_PLUGIN_BUNDLE="ui-react-component-skills" ./install.sh
```

Claude/local project target:

```bash
UI_PLUGIN_BUNDLE="ui-react-component-skills" UI_PLUGIN_TARGET="./.claude" ./install.sh --dry-run
UI_PLUGIN_BUNDLE="ui-react-component-skills" UI_PLUGIN_TARGET="./.claude" ./install.sh
```

Use `--with-config` to install the starter `.ui-design-intelligence.yml` config
template when needed.

Uninstall:

```bash
UI_PLUGIN_BUNDLE="ui-react-component-skills" ./uninstall.sh
```

## Usage Example

Use `mockup-to-component-analysis` when the user provides a product-card mockup
and asks for a React component. The skill produces a `ComponentSpec` with
component layer, complexity, data coupling, props, responsive behavior,
accessibility requirements, risks, and open questions instead of jumping
straight to JSX or TSX.

Then use `component-spec-to-react-plan` to choose JSX or TSX, plan props and
view models, separate containers and mappers, define styling and responsive
strategy, and outline tests.

Use `storybook-from-component-spec` to plan `Default`, `LongContent`,
`MinimalContent`, `ResponsiveStress`, state stories, controls/args, and
data-free fixtures.

Use `react-component-review` after implementation to check the component against
the spec, accessibility rules, responsive behavior, UI/data boundaries,
Storybook coverage, tests, and memoization choices.

## Relationship To Other Bundles

- Upstream inputs may come from `ui-study-skills`, `ui-blueprint-skills`,
  `ui-design-system-skills`, `ui-style-reference-skills`, or
  `ui-prototype-skills`.
- `ui-design-intelligence` may include these skills later after the standalone
  bundle stabilizes.
- Future `ui-shared-component-skills` and `ui-app-component-skills` bundle
  splits are deferred. Sprint 011 keeps shared and app-specific planning inside
  this standalone React component bundle.

## Versioning And Status

Version: `0.9.0`. Status: `active`. The bundle is buildable and installable as a
skill and contract layer. It intentionally does not ship React runtime code,
Storybook app infrastructure, visual regression tests, npm packages, or a demo
application.

## License

Uses the repository license. The bundle-local `LICENSE` file points to the
repository license terms.
