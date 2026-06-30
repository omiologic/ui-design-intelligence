# Migration Guide

No breaking migrations are required for `0.1.0`.

## Sprint 001 Multi-Plugin Transition

The repository is now named `ui-design-intelligence`. The default installer
continues to install the `ui-blueprint-skills` compatibility bundle. Existing
users can keep using:

```bash
./install.sh
```

Earlier installs that used `UI_BLUEPRINT_SKILLS_DIR` are still supported:

```bash
UI_BLUEPRINT_SKILLS_DIR="/path/to/.claude/skills" ./install.sh
```

New bundle-aware installs can select a bundle and target an agent root:

```bash
UI_PLUGIN_BUNDLE="ui-study-skills" UI_PLUGIN_TARGET="/path/to/.claude" ./install.sh
```

During this transition:

- `skills/` remains the compatibility surface for the existing blueprint MVP.
- `plugins/individuals/` is the source of truth for new reusable plugin skills.
- `plugins/bundles/` contains committed manifests and README files only.
- `dist/build/` and `dist/plugins/` contain generated build and release output.
- `ui-design-intelligence` is the repository name and the full aggregate bundle.
  It is installable by selecting `UI_PLUGIN_BUNDLE="ui-design-intelligence"`.

Future breaking changes to `shared/vocabulary/`, `shared/schemas/`, install behavior, or skill output expectations should be documented here with before/after examples and upgrade steps.

## Sprint 002 Install And Command Parity

No install migration is required for Sprint 002.

The repository intentionally keeps the current local bundle installer as the
supported path:

```bash
./install.sh
UI_PLUGIN_BUNDLE="ui-design-intelligence" ./install.sh
UI_PLUGIN_TARGET="/path/to/.claude" ./install.sh
```

Marketplace or `npx skills add` style installation is deferred. Sprint 002 only
documents how this repository sits beside downstream visual-taste tools: install
one of the local bundles, use discipline-scoped commands for study, audit, or
blueprint generation, then hand exported Blueprint Export Seed markdown to a
downstream visual-taste workflow.

Command parity is manifest-driven. Existing command files under `commands/` are
installed only when referenced by a selected bundle manifest. The Sprint 002
export seed workflow remains a script prototype, not an installed command:

```bash
node scripts/export-blueprint-seed.mjs \
  --blueprint shared/examples/ui-blueprint.example.json \
  --profile shared/taste-profiles/conversion.json \
  --out /tmp/ui-blueprint.export-seed.md
```

See `docs/interop/install-command-parity.md` for the current bundle command
matrix and deferred marketplace work.

## Sprint 002 Package Contents

No migration is required, but release packages now include Sprint 002 structural
interop assets:

- `docs/interop/`
- `shared/design-philosophy/`
- `shared/taste-profiles/`
- `shared/templates/blueprint-export-seed.md`
- `shared/examples/ui-blueprint.export-seed.md`
- `scripts/export-blueprint-seed.mjs`
- `tests/invalid-antipatterns/`

These files support downstream visual-taste handoff and validation. They do not
change the existing default bundle install command.
