# Command Definition Format

Command files are shared workflow entrypoints referenced by plugin bundle
manifests.

Use one markdown file per command:

```txt
commands/{command-name}.md
```

Each file should include:

- `# {Command Name}` heading.
- `## Purpose`: what the command accomplishes.
- `## Use When`: when to run the command.
- `## Inputs`: information, captures, or files needed.
- `## Workflow`: ordered execution steps.
- `## Outputs`: expected artifacts.
- `## Agents`: shared agents used by the command.
- `## Skills`: skills or skill families used by the command.

Sprint 006 consumer creation commands have a stricter contract on top of this
base shape. `create-wireframe`, `create-design-spec`, `create-prototype-plan`,
and `review-generated-wireframe` must also define required inputs, optional
inputs, missing-input questions, default pipeline, stop conditions, output
files, quality checks, and example invocations. See
`docs/interop/consumer-creation-contract.md` and the artifact recipes in
`shared/recipes/`.

The filename stem is the manifest reference. For example,
`commands/study-page.md` is referenced as `study-page`.

## Discipline Groups

- Study commands: `study-page`, `study-site`.
- Audit commands: `audit-page`, `audit-site`, `audit-interactions`.
- SEO commands: `seo-audit-page`, `seo-audit-site`.
- Blueprint commands: `create-wireframe`, `generate-blueprint-from-study`,
  `review-generated-wireframe`.
- Design-system commands: `create-design-spec`,
  `generate-design-system-seed`, `audit-design-system-seed`.
- Prototype commands: `create-prototype-plan`, `generate-prototype-from-blueprint`,
  `generate-prototype-from-knowledge`, `audit-prototype-flow`,
  `explain-prototype-interactions`.
- Journey commands: `generate-user-journey-map`.
- Content commands: `generate-content-model-from-blueprint`,
  `generate-prototype-copy`, `audit-prototype-copy`,
  `extract-copy-patterns-from-study`, `generate-copy-from-knowledge`.

## Artifact Recipes

- `shared/recipes/wireframe.recipe.md`: contract for `wireframe.json` and
  `wireframe-notes.md`.
- `shared/recipes/design-spec.recipe.md`: contract for `design-spec.md` and
  optional `design-spec.json`.
- `shared/recipes/prototype.recipe.md`: contract for `prototype-config.json`
  and `prototype-plan.md`.

Sprint 002 keeps the Blueprint Export Seed workflow as
`scripts/export-blueprint-seed.mjs` rather than an installed command. See
`docs/interop/install-command-parity.md` for the install and command parity
decision.

## Command Ownership

Each non-aggregate bundle owns the command names it installs. General audit
commands belong to `ui-audit-skills`; SEO-specific audit commands belong to
`ui-seo-skills`. Aggregate bundles such as `ui-design-intelligence` may include
commands from component bundles, but component bundles must not install the same
command name unless the command has one explicitly documented owner and the
other bundle omits it from its manifest.
