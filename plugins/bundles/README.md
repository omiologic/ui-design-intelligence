# Plugin Bundle Manifests

Bundle directories contain committed metadata only. Built bundle contents are
generated under `dist/build/{bundle-name}` and zipped under `dist/plugins/`.

Bundles are curated packages assembled from reusable skill sources in
`plugins/individuals/`, shared assets in `shared/`, agent definitions in
`agents/`, and command definitions in `commands/`.

Marketplace or `npx skills add` support is deferred. Do not add
marketplace-only fields such as `category`, `icon`, `keywords`, `homepage`,
publisher IDs, marketplace slugs, or publishing identifiers to `plugin.json`
until a later task defines that format.

## Bundle Map

| Bundle | Layer | Install when | Command ownership |
| --- | --- | --- | --- |
| `ui-blueprint-skills` | Structural blueprint | Planning and emitting UIBlueprint wireframes. | `generate-blueprint-from-study` |
| `ui-study-skills` | Study capture and analysis | Turning captured pages into structured study evidence. | `study-page`, `study-site` |
| `ui-audit-skills` | Quality audit | Reviewing site, page, section, interaction, accessibility, and SEO quality. | `audit-page`, `audit-site`, `audit-interactions` |
| `ui-seo-skills` | SEO metadata and SEO review | Generating titles, descriptions, summaries, and SEO-only audit findings. | `seo-audit-page`, `seo-audit-site` |
| `ui-knowledge-skills` | Reusable knowledge | Extracting, curating, indexing, searching, and explaining UI pattern knowledge. | `extract-patterns-from-study`, `index-knowledge-base`, `search-ui-knowledge`, `generate-blueprint-from-knowledge`, `explain-blueprint-lineage` |
| `ui-design-system-skills` | Design-system seed | Creating and auditing lightweight design-system seed and foundation artifacts. | `generate-design-system-seed`, `audit-design-system-seed` |
| `ui-style-reference-skills` | Style reference | Creating, recommending, blending, applying, and auditing reusable visual style references. | `generate-style-library`, `recommend-style`, `apply-style-to-design-system`, `apply-style-to-section`, `apply-style-to-component` |
| `ui-prototype-skills` | Prototype behavior | Generating prototype configs, interaction flows, state models, and prototype audits. | `generate-prototype-from-blueprint`, `generate-prototype-from-knowledge`, `audit-prototype-flow`, `explain-prototype-interactions` |
| `ui-design-intelligence` | Aggregate | Installing the full study, audit, knowledge, blueprint, design-system, style, and prototype stack. | May include component-bundle commands; does not create new ownership. |

The layered architecture is: study evidence and knowledge inform blueprint
structure; design-system seeds and style references constrain visual foundations;
prototype skills add behavior; audit skills cut across the stack.

## Internal `plugin.json` Fields

Required now:

- `name`: bundle name and directory name.
- `displayName`: human-readable bundle name.
- `version`: independent bundle semver. It should change when bundle contents,
  commands, shared files, or install behavior change.
- `description`: short install-facing bundle description.
- `status`: `active`, `planned`, or `transitional`.
- `maintainer`: repository or team owner for maintenance questions.
- `repository`: source repository URL or canonical repo identifier.
- `license`: bundle-local license filename.
- `changelog`: bundle-local changelog filename.
- `dependencies`: inter-bundle dependencies by bundle name. Use an empty array
  when the bundle is standalone.
- `skills`: individual skill names included in the bundle.
- `agents`: shared agent names included in the bundle.
- `commands`: command names owned or intentionally included by the bundle.
- `shared`: shared repository files or directories copied into the bundle.
- `includes`: aggregate-only list of component bundles to compose.

These hygiene fields are internal and not marketplace-specific. Marketplace-only
fields remain deferred until the marketplace format is defined.

Aggregate bundles should use `includes` instead of hand-maintaining `skills`,
`agents`, `commands`, and `shared`. Build and validation expand includes
deterministically into self-contained package manifests.

## Bundle Lifecycle

- `planned`: records intended bundle shape before all referenced skills and
  shared files exist.
- `transitional`: buildable and installable, but still mid-migration or missing
  release-grade professionalization fields.
- `active`: buildable, installable, documented, and treated as a normal release
  bundle.

Do not use `active` for a bundle that lacks command ownership clarity,
install-safe shared references, or current README coverage.

## README Standard

Every release-grade bundle README should use these sections:

1. `# {Display Name}`
2. `## Summary`: one paragraph describing the bundle scope.
3. `## When To Install`: concrete use cases and non-use cases.
4. `## Included`: skills, agents, commands, and shared assets.
5. `## Requirements`: prerequisites, dependencies, and required setup.
6. `## Install`: install and uninstall commands.
7. `## Usage Example`: one realistic workflow using the bundle commands or
   skills.
8. `## Relationship To Other Bundles`: upstream/downstream bundles and overlap.
9. `## Versioning And Status`: version, status, and maturity notes.
10. `## License`: per-bundle license file and repository license relationship.

Existing transitional READMEs may be shorter, but new professionalization work
should converge on this template.

## License And Changelog

Each release-grade distributable bundle should include:

- `LICENSE`: either a copy of the repository license or a short file pointing to
  the repository license when the bundle has no separate licensing terms.
- `CHANGELOG.md`: bundle-scoped changes, including added or removed skills,
  agents, commands, shared files, and command ownership changes.

Repository-level `LICENSE` and `CHANGELOG.md` remain the source of truth for the
monorepo, but installed bundles should still be self-describing.

## Command And Agent Ownership

Command names are install-time surface area. A non-aggregate bundle must not list
a command already owned by another non-aggregate bundle.

- General audit commands belong to `ui-audit-skills`: `audit-page`,
  `audit-site`, and `audit-interactions`.
- SEO-specific audit commands belong to `ui-seo-skills`: `seo-audit-page` and
  `seo-audit-site`.
- Aggregate bundles such as `ui-design-intelligence` may include component
  bundle commands, but they do not create new command ownership.
- If a bundle needs another bundle's command, document the dependency or handoff
  instead of listing that command in its own manifest.

Agents may be shared across bundles when the same agent file is intentionally
installed by multiple bundles. If two bundles need different behavior, create
distinct agent names rather than overloading one filename.

`validate-bundles` rejects command collisions among component bundles.

## Adding A Skill To A Bundle

1. Add or update `plugins/individuals/{skill-name}/SKILL.md`.
2. Add reusable references under that skill's `references/` directory.
3. Add required shared schemas, vocabulary, templates, or examples under
   `shared/`.
4. Add the skill name to the target manifest's `skills` array.
5. Add any required `agents`, `commands`, and `shared` entries.
6. Confirm the command is owned by this bundle or belongs in another bundle.
7. Run `npm run validate:bundles`.
8. Run any domain validator that applies, such as
   `npm run validate:design-system` for design-system seed assets or
   `npm run validate:style-references` for style-reference library assets.
9. Run `npm run build:bundles -- {bundle-name}` for buildable bundles.

## Professionalization Gate

A bundle is release-grade when:

- `plugin.json` has meaningful version, status, description, display name,
  maintainer, repository, license, changelog, and dependencies.
- README follows the standard sections above.
- Per-bundle `LICENSE` and `CHANGELOG.md` exist.
- Commands have one non-aggregate owner and no install collision.
- Agents are intentionally shared or distinctly named.
- Shared files referenced by skills resolve after build and install.
- Aggregate bundles are expressed as composition or otherwise validated against
  their component bundles.
- Marketplace-only metadata remains absent until the marketplace format is
  defined.
