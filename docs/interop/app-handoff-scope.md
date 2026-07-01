# App Handoff Scope

Sprint 008 defines an app-compatible handoff layer for UI Design Intelligence.
The goal is to make repository outputs consumable by apps, MCP-backed tools, and
future hosted artifact viewers without turning this repository into a runtime,
hosted service, visual editor, or generated UI implementation.

## App-Facing Consumers

Sprint 008 should support these consumers through stable files and contracts:

- local desktop or browser apps that inspect generated artifacts from disk
- MCP-backed tools that render or query repository artifacts for a user
- hosted artifact viewers that display uploaded or packaged handoff files
- dashboard/report surfaces that summarize run status, validation, and review
  results
- package or marketplace browsers that need bundle/package metadata without
  reading internal manifests directly

These consumers should treat Sprint 008 contracts as the API surface. They
should not depend on internal folder layout, private planning files, unvalidated
examples, or implementation details of scripts and skills.

## Stable Enough To Expose

Sprint 008 can expose contracts over these repository-owned artifact families:

- Query context: user brief, target artifact type, page/screen/component scope,
  audience, goal, constraints, retrieval filters, and source assumptions.
- Retrieval results: ranked pattern IDs, reasons, scores when available,
  confidence/status, matched dimensions, and canonical `storageRef` pointers.
- Artifact manifests: typed references to generated blueprints, design-system
  seeds, prototype configs, content/journey artifacts, reviews, and supporting
  notes.
- Creation run records: command, inputs, selected skills, output paths,
  validation status, warnings, stop conditions, and handoff readiness.
- Review run records: rubric scores, findings, severity, repair guidance,
  validation commands, and downstream readiness.
- Package metadata: bundle name, version, status, included skills, commands,
  agents, shared assets, license/changelog pointers, and supported install
  surfaces.

Existing repository artifacts remain source data, not app APIs, until a Sprint
008 schema or documented contract wraps them.

## Handoff Architecture

The app handoff layer should sit above existing skills, commands, schemas, and
validation:

```txt
brief or query
  -> app query context
  -> local or remote knowledge retrieval
  -> retrieval result contract
  -> creation or review command
  -> generated artifacts
  -> artifact manifest + run record
  -> app, MCP tool, or hosted viewer
```

Contracts should be deterministic JSON or Markdown-adjacent records that can be
validated offline. They may reference generated artifacts by relative path or
redacted storage reference. They should not require network access, AWS
credentials, browser automation, or a live app.

## Contract Principles

- Prefer small wrapper contracts over exposing internal repository layout.
- Preserve provenance: source assumptions, retrieval reasons, storage refs,
  validation commands, and run status should survive the handoff.
- Keep generated artifacts readable without an app. Apps are consumers, not the
  only way to understand the output.
- Keep local/offline validation as the default.
- Keep provider names generic where possible: local index, remote retrieval,
  canonical storage, package metadata, hosted viewer.
- Allow future adapters for MCP tools or hosted artifacts without rewriting
  skill instructions.

## Explicit Non-Goals

Sprint 008 app handoff must not include:

- hosted API, hosted worker, or multi-tenant service
- public marketplace submission or post-publish telemetry
- prototype runtime, visual editor, renderer, interaction engine, preview app,
  or export player
- production React/Vue/Svelte components, CSS, app shell, or UI kit
- visual mockup generation, image generation, mood boards, or high-fidelity
  design comps
- live cloud dependency for normal validation
- replacement of existing CLI commands, local installs, bundle manifests, or
  specialist skills
- turning generated copy into production-approved content
- making `.plan/` files, dirty worktree state, or generated `dist/` internals an
  app API

## Deferred Boundaries

These remain later-sprint tracks unless a future task explicitly scopes them:

- MCP server implementation and live tool calls
- hosted artifact packaging/deployment
- public marketplace publication
- runtime/editor prototype work
- visual-design generation
- automated subjective quality scoring beyond documented review records
- content approval workflow, CMS integration, SEO operations, or content
  calendar tooling

## Sprint 008 Guidance

Tasks `008.02` through `008.07` should use this scope to define schemas,
fixtures, validation, and docs for app handoff. The first contract set is
documented in `docs/interop/app-handoff-contracts.md` and backed by schemas in
`shared/schemas/app-*.schema.json`. It should be minimal but complete enough to
represent a realistic flow:

```txt
query context
  -> retrieval results
  -> creation/review run record
  -> artifact manifest
  -> package metadata reference
```

The later journey/content tasks may consume the same handoff layer, but they
should not expand the app scope into runtime, hosted service, or visual mockup
work.

Future local app, MCP-backed tool, and hosted viewer work should follow
`docs/interop/app-mcp-hosted-boundaries.md` so those consumers use Sprint 008
contracts without treating repository internals as API-stable.
