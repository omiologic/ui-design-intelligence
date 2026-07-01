# React Component File Organization

## Goal

Use the existing repository organization so React component skills can compose
with study, blueprint, design-system, style-reference, prototype, and audit
skills.

## Source Of Truth

```txt
plugins/individuals/ = reusable skill modules
plugins/bundles/ = installable skill bundles
.convention/ = shared contracts, schemas, vocabulary, templates, examples, and rules
docs/react-components/ = React component layer architecture and usage docs
scripts/ = validation and packaging utilities
```

## Current React Component Layout

```txt
plugins/individuals/
  mockup-to-component-analysis/
  component-spec-to-react-plan/
  storybook-from-component-spec/
  shared-ui-component-planner/
  app-specific-component-planner/
  react-component-review/

plugins/bundles/
  ui-react-component-skills/

.convention/
  contracts/react-components/
  schemas/component-spec.schema.json
  examples/react-components/
  vocabulary/react-components/
  templates/react-components/
  react-patterns/
```

Canonical React pattern references live at:

```txt
.convention/react-patterns/
```

## Avoid

Do not create disconnected top-level systems such as:

```txt
react-skills/
prototype-skills/
wireframe-skills/
mockup-skills/
```

That structure makes it harder to share contracts and merge workflows later.

## Install-Safe References

Each React component skill should keep local `references/` workflow files and
install-safe copies under `references/_shared/`. `SKILL.md` should reference
those local files, not the source repository root and not the original download
folder.

## Future Runtime Repository

Runtime code should move to a separate repository only after this skill layer is
stable.

Candidate future runtime repository:

```txt
react-ui-component-lab/
  actual React components
  Storybook app
  visual regression tests
  generated examples
  npm packages
  Next.js demo app
```
