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

The filename stem is the manifest reference. For example,
`commands/study-page.md` is referenced as `study-page`.

## Discipline Groups

- Study commands: `study-page`, `study-site`.
- Audit commands: `audit-page`, `audit-site`, `audit-interactions`.
- SEO commands: `seo-audit-page`, `seo-audit-site`.
- Blueprint commands: `generate-blueprint-from-study`.
- Prototype commands: `generate-prototype-from-blueprint`,
  `generate-prototype-from-knowledge`, `audit-prototype-flow`,
  `explain-prototype-interactions`.

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
