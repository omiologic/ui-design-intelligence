# Publishing

This repository treats a version as released only after the release commit is
tagged and pushed. Built files in `dist/` are release candidates, not releases.

## Release Signals

A published repository release must have all of these:

- The intended version is committed in `package.json`.
- Buildable bundle manifests in `plugins/bundles/*/plugin.json` use the intended
  compatible version.
- `CHANGELOG.md` has a dated entry for the version.
- `npm run validate:release` passes locally or in CI.
- A signed-off release commit is pushed to `main`.
- A Git tag named `v{version}` is pushed, such as `v0.9.0`.
- Release archives from `dist/` are attached to the GitHub release or otherwise
  published in the chosen distribution channel.

If only the package version or generated archive exists, the version is ready to
publish but not released.

## Before Publishing

Start from a clean working tree:

```bash
git status --short --branch
```

Confirm the version:

```bash
node -p "require('./package.json').version"
```

Check every buildable bundle manifest version:

```bash
node -e "const fs=require('fs'); for (const d of fs.readdirSync('plugins/bundles')) { const p='plugins/bundles/'+d+'/plugin.json'; if (fs.existsSync(p)) console.log(JSON.parse(fs.readFileSync(p)).name, JSON.parse(fs.readFileSync(p)).version); }"
```

Update `CHANGELOG.md` so the version has a dated section. Move release-bound
items out of `Unreleased`.

## Validate

Run the full release gate:

```bash
npm run validate:release
```

This runs the full validation chain, install matrix, bundle builds, strict
bundle validation, temporary install/uninstall checks, Codex plugin package
builds, installed reference checks, and release artifact inspection.

Review the generated inspection report:

```bash
cat dist/release-artifact-inspection.md
```

The report should show expected bundle archives, generated Codex plugin
packages, marketplace fixture entries, and matching package versions.

## Build Archives

Build the repository package archive:

```bash
npm run package
```

This creates:

```txt
dist/{package-name}-{version}.zip
```

Bundle archives and Codex plugin packages are produced by the release validation
flow:

```txt
dist/plugins/{bundle-name}.zip
dist/codex-plugins/{bundle-name}/
dist/codex-marketplace/
```

Run the artifact inspection again after `npm run package` so the repository
archive appears in the report:

```bash
npm run inspect:release-artifacts
```

Do not use `npm run package:fast` for a release candidate. It is only for local
packaging iteration after the release gate has already passed.

## Commit And Tag

Commit only source, metadata, and documentation changes. Generated files under
`dist/` are ignored and should not be committed.

```bash
git status --short
git add package.json CHANGELOG.md README.md docs plugins/bundles
git commit -m "release v0.9.0"
```

Push the release commit:

```bash
git push origin main
```

Create and push the version tag:

```bash
git tag -a v0.9.0 -m "v0.9.0"
git push origin v0.9.0
```

Pushing a `v*` tag starts the GitHub Actions release validation workflow defined
in `.github/workflows/validate-release.yml`.

## Publish On GitHub

After the tag workflow passes, create a GitHub release for the tag and attach
the generated archives:

```bash
gh release create v0.9.0 \
  dist/ui-design-intelligence-0.9.0.zip \
  dist/plugins/*.zip \
  --title "v0.9.0" \
  --notes-file CHANGELOG.md \
  --draft
```

Before publishing the draft, trim the release notes to the version's changelog
section instead of the full changelog file.

If `gh` is unavailable, create the release from GitHub's web UI and upload the
same files from `dist/`.

## Publish A Local Codex Marketplace Fixture

For local Codex plugin testing, generate the marketplace fixture:

```bash
npm run build:codex-plugins
```

Then add the local marketplace source:

```bash
codex plugin marketplace add ./dist/codex-marketplace
codex plugin marketplace list
```

The generated marketplace manifest is:

```txt
dist/codex-marketplace/.agents/plugins/marketplace.json
```

This is a local fixture, not a public marketplace publication.

## Post-Publish Checks

Verify the release exists as a tag:

```bash
git fetch --tags
git tag --list "v*"
```

Verify the GitHub release has the expected files:

```bash
gh release view v0.9.0 --json tagName,isDraft,assets
```

Install from the published source in a temporary target before announcing the
release:

```bash
node scripts/install-bundle.mjs install ui-design-intelligence /tmp/ui-di-release-check /tmp/ui-di-release-check/skills --dry-run
node scripts/install-bundle.mjs install ui-design-intelligence /tmp/ui-di-release-check /tmp/ui-di-release-check/skills
node scripts/verify-installed-references.mjs /tmp/ui-di-release-check/skills
node scripts/install-bundle.mjs uninstall ui-design-intelligence /tmp/ui-di-release-check /tmp/ui-di-release-check/skills
```

## Rollback

If the tag was pushed but the GitHub release was not published, delete the tag
locally and remotely:

```bash
git tag -d v0.9.0
git push origin :refs/tags/v0.9.0
```

If the GitHub release is already public, prefer publishing a corrective patch
release unless the release contains a security or licensing problem.
