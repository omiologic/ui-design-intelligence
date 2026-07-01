# Codex Local Marketplace Fixture

Sprint 005 generates a local Codex marketplace fixture for manual testing before
public publishing. The fixture is generated, not committed:

```bash
npm run build:codex-plugins
npm run validate:codex-plugins
```

Generated output:

```txt
dist/codex-plugins/{bundle-name}/
dist/codex-marketplace/.agents/plugins/marketplace.json
dist/codex-marketplace/plugins/{bundle-name}/
dist/codex-marketplace/marketplace.json
dist/codex-marketplace/README.md
```

The CLI-compatible marketplace lives at
`dist/codex-marketplace/.agents/plugins/marketplace.json`. Its entries point at
mirrored plugin package folders under `dist/codex-marketplace/plugins/` with
`./`-prefixed paths relative to `dist/codex-marketplace`. A root
`dist/codex-marketplace/marketplace.json` mirror is also generated for direct
inspection.

## CLI Setup

From the repository root:

```bash
codex plugin marketplace add ./dist/codex-marketplace
codex plugin marketplace list
```

Open the plugin browser:

```text
codex
/plugins
```

Use the marketplace tabs to choose the local marketplace. Open a plugin detail
page, install it, and press Space on an installed plugin to toggle whether it is
enabled.

To refresh or remove the marketplace:

```bash
codex plugin marketplace upgrade ui-design-intelligence-local
codex plugin marketplace remove ui-design-intelligence-local
```

If Codex chooses a different marketplace name, use the name printed by
`codex plugin marketplace list`.

## Codex App Setup

After generating the fixture, restart Codex. Open **Plugins** in the Codex app,
choose the local marketplace source, inspect a package, and select
**Add to Codex**.

For a local marketplace deep link, open this form after replacing the path with
the absolute path on your machine:

```text
codex://plugins/?marketplacePath=/absolute/path/to/ui-design-intelligence/dist/codex-marketplace/.agents/plugins/marketplace.json
```

## Smoke Test

1. Run `npm run build:codex-plugins`.
2. Run `npm run validate:codex-plugins`.
3. Add the marketplace with `codex plugin marketplace add ./dist/codex-marketplace`.
4. Open the plugin browser in Codex CLI or Codex app.
5. Install `ui-blueprint-skills` or `ui-design-intelligence`.
6. Start a new thread and invoke an installed skill with `@`.
7. Disable the plugin from the plugin browser, restart Codex, and confirm the
   skill is no longer offered.
8. Re-enable or uninstall the plugin from the plugin browser.
9. Remove the local marketplace if needed.

## Validation

`npm run validate:codex-plugins` checks:

- generated package directories exist
- each package has `.codex-plugin/plugin.json`, `skills/`, package docs, and
  `PACKAGE_INSPECTION.md`
- package skill references resolve
- generated Codex packages do not include Claude/local `agents/` or `commands/`
- `dist/codex-marketplace/.agents/plugins/marketplace.json` exists
- `dist/codex-marketplace/marketplace.json` exists as an inspection mirror
- every marketplace entry has `source.source: "local"`
- every marketplace `source.path` is `./`-prefixed and resolves to an existing
  plugin folder with `.codex-plugin/plugin.json`
- every generated package has a marketplace entry
