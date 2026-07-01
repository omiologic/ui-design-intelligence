# Changelog

All notable changes to `ui-design-intelligence` will be documented in this file.

## [0.9.0] — 2026-06-30

Pre-1.0 integration milestone. Closes the ten structural weaknesses identified
in the Sprint 009 repository audit.

- Added GitHub Actions CI pipeline (`validate.yml`) that runs `npm run
  validate:ci` on every push and pull request. Added `validate-release.yml`
  that runs `npm run validate:release` on `v*` tags.
- Added `validate:ci` npm script that runs the full validation chain with
  cloud-dependent steps excluded, safe to run in CI without credentials.
- Added `validate:cloud` npm script that runs the full remote knowledge
  storage and vector smoke checks for environments with AWS credentials.
- Made `validate:knowledge-storage`, `validate:knowledge-vectors`, and
  `validate:knowledge-remote-smoke` credential-safe: they log `[SKIP]` and
  exit 0 when required environment variables are absent rather than failing.
  Removed embedded `<bucket>` and `<region>` placeholder strings from
  `package.json`.
- Added `scripts/validate-knowledge-storage.mjs` as a credential-aware wrapper
  for the storage sync and fetch dry-run checks.
- Added `scripts/sync-shared-references.mjs` to propagate canonical `shared/`
  changes into all `skills/*/references/_shared/` and
  `plugins/individuals/*/references/_shared/` copies. Wired a `check:shared-references`
  drift check into `npm run validate`.
- Added `scripts/check-skills-mirror-parity.mjs` and `check:skills-parity` to
  detect divergence between `skills/` and `plugins/individuals/` mirror copies.
- Documented the `skills/` retirement timeline: read-only compatibility mirror,
  changes in `plugins/individuals/`, target removal at `1.0.0`.
- Added `validate:knowledge-env` check documentation for remote storage setup
  in `docs/knowledge/aws-user-setup.md`.
- Bumped version to `0.9.0` across `package.json` and all bundle manifests.
- Added CI status badge to `README.md`.
- Updated versioning roadmap in `README.md` to reflect the pre-1.0 milestone.

## Unreleased

- Replaced duplicated exploratory planning transcripts with a concise architecture plan.
- Added the initial MVP repository scaffold.
- Added shared vocabulary files for node types, layouts, content roles, interaction states, and UI layers.
- Added the MVP wireframe schema and valid blueprint examples.
- Added MVP wireframing skills and repository maintenance skills.
- Added validation scripts for skills and examples.
- Added install, uninstall, and packaging entrypoints.
- Limited default install and release packaging to product wireframing skills, excluding repository maintenance skills.
- Bundled shared vocabulary and schema references into product skills so installed skills are self-contained.
- Added semantic node vocabulary records and containment validation for examples.
- Added schema enum generation from controlled vocabulary for node types, roles, layouts, and states.
- Validated examples against the real wireframe JSON Schema before semantic validation.
- Added invalid blueprint fixtures and validation assertions for expected schema and semantic failures.
- Expanded product skill references with decision heuristics, anti-patterns, worked examples, and hand-off guidance.
- Documented the transition decision for evolving `ui-blueprint-skills` toward a multi-plugin `ui-design-intelligence` architecture.
- Scaffolded plugin monorepo directories for individuals, bundles, agents, commands, and generated plugin releases.
- Added initial plugin bundle manifests and README files for study, audit, blueprint, SEO, and full UI design intelligence bundles.
- Copied current blueprint product skills into `plugins/individuals/` and updated tooling to prefer individual plugin sources while preserving `skills/` compatibility.
- Added initial `ui-study-skills` individual skill sources plus shared study schema, vocabulary, template, and example.
- Added shared audit schema, severity vocabulary, templates, example, and validation coverage.
- Added audit report individual skills for site, page, section, interaction, accessibility, and SEO audit reports.
- Activated `ui-audit-skills` as a transitional buildable and installable bundle.
- Added SEO individual skills for title tags, meta descriptions, page summaries, and SEO audit handoffs.
- Activated `ui-seo-skills` as a transitional buildable and installable bundle.
- Added full UI design intelligence shared assets, including the blueprint summary template and canonical blueprint example.
- Activated `ui-design-intelligence` as a transitional buildable and installable full bundle.
- Added `scripts/capture-url.mjs` as a deterministic metadata helper for externally supplied page captures.
- Added structural design philosophy references and initial structural taste profiles for Sprint 002.
- Added deterministic structural anti-pattern validation and negative fixtures.
- Made study and blueprint generator skills install-safe with bundled `_shared` references.
- Deepened blueprint product skill bodies with philosophy, decision criteria, anti-patterns, workflows, examples, and hand-offs.
- Clarified schema, planner, study-translation, and generator skill boundaries in skill bodies and README usage examples.
- Deepened study skill methods with evidence discipline, step-by-step observation methods, inline findings, and hand-offs.
- Added interop documentation defining layer ownership and downstream visual-taste handoff boundaries.
- Defined the repository-native Blueprint Export Seed format with a template and worked example.
- Added a deterministic Blueprint Export Seed script and validation smoke test.
- Documented Sprint 002 install and command parity decisions, including deferred marketplace/npx work.
- Included Sprint 002 philosophy, taste-profile, interop, export-seed, and validation assets in bundle/package outputs.
- Completed Sprint 002 release validation across validation, strict bundle checks, release install/uninstall checks, and package build.
- Added shared agent and command scaffolds plus bundle validation for referenced workflow assets.
- Added manifest-driven plugin bundle builds for active/transitional bundles.
- Added manifest-selected bundle install and uninstall support.
- Added strict bundle validation and release validation for buildable plugin bundles.
- Documented the plugin monorepo model, bundle lifecycle, contributor workflow, and migration path.
- Added README documentation for installation, usage, validation, packaging, contribution, versioning, and security.
- Renamed the repository/package identity to `ui-design-intelligence` while
  retaining `ui-blueprint-skills` as the compatibility blueprint bundle.
- Added `ui-content-skills` planned bundle (Sprint 008) covering user journey
  copy, content models, prototype copy, page/section/component copy, form
  microcopy, CTA labels, copy audits (`audit-prototype-copy`,
  `audit-copy-for-user-journey`, `audit-copy-for-conversion`,
  `audit-copy-for-brand-voice`), copy-pattern extraction from study, and
  knowledge-driven copy generation. Bundle status: `planned`.
