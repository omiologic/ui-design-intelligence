# App, MCP, And Hosted Artifact Boundaries

Sprint 008 defines an app-compatible handoff layer. The contract is file-based:
apps and tools consume validated JSON wrapper records, then optionally load the
referenced artifacts. This repository still remains a schema, skill, fixture,
and validation package, not a hosted runtime.

## Supported Handoff Files

These files are stable enough for future app, MCP, and hosted viewer work to
consume:

| File family | Stable input for | Notes |
| --- | --- | --- |
| `.convention/schemas/app-*.schema.json` | local apps, MCP tools, hosted viewers, package browsers | The app-facing schema set. Consumers should validate wrapper records before trusting them. |
| `.convention/examples/app-handoff/*.example.json` | fixture readers, validation tests, app prototypes | Representative examples only. They are safe committed fixtures, not user project state. |
| `appQueryContext` records | local apps, MCP tools, retrieval adapters | Captures request intent, target artifact type, scope, filters, assumptions, and consumer surface. |
| `appRetrievalResults` records | apps, MCP tools, dashboards | Captures ranked matches and safe `storageRef` pointers. It is not a vector database response format. |
| `appRunRecord` records | dashboards, review tools, hosted viewers | Captures creation, review, retrieval, validation, or package run status and outputs. |
| `appArtifactManifest` records | local apps, hosted viewers, MCP render tools | Lists typed artifact refs and `schemaRef` values. It does not embed artifact payloads. |
| `appPackageMetadata` records | package browsers, local installers, hosted viewers | Exposes package contents without making internal bundle manifests the public API. |

Artifact payloads such as `WireframeConfig`, `DesignSystemSeed`,
`PrototypeConfig`, `UserJourneyMap`, `ContentModel`, `PrototypeContent`,
`BrandVoice`, and `PageAudit` remain governed by their own schemas. The app
contracts reference those payloads through `path` plus `schemaRef`.

## Repository-Local And Not API-Stable

Consumers must not treat these as stable public APIs:

- `.plan/` files, sprint summaries, task files, and objectives
- dirty worktree state, local branch names, or uncommitted generated output
- `dist/`, package build internals, temporary release artifacts, or marketplace
  build layouts
- script implementation details, stdout text, internal helper functions, or
  command ordering beyond documented package scripts
- skill prompt bodies, agent instruction text, or private reference folder
  layout unless a package metadata record explicitly exposes a path
- local environment variables and real user cloud resource names
- remote vector index implementation details, embedding provider responses, or
  managed retrieval service payloads

If future work needs one of those values, it should add a new app-facing wrapper
field, fixture, schema update, or documented adapter contract instead of making
the internal source stable by accident.

## Local App Boundary

Local desktop or browser apps may:

- load app wrapper records from a user-selected project directory
- validate wrappers against `.convention/schemas/app-*.schema.json`
- follow repository-relative `path` and `schemaRef` references
- show run status, validation results, warnings, findings, package contents, and
  referenced artifact summaries
- optionally validate referenced JSON artifacts against their own schemas

Local apps should not:

- require AWS credentials, network access, or remote buckets to inspect committed
  fixtures
- infer hidden state from `.plan/`, `dist/`, command stdout, or script internals
- mutate generated artifacts unless a future task defines an edit/write contract
- present generated prototype copy as approved production copy

## MCP Tool Boundary

Future MCP tools should be thin adapters over the file contracts. A tool may
expose operations such as:

```txt
listAppHandoffRecords(root)
validateAppHandoffRecord(path)
readArtifactManifest(path)
readRunRecord(path)
readReferencedArtifact(path, schemaRef)
summarizeHandoffStatus(manifestPath)
```

MCP tools should return validated contract data or concise summaries derived
from validated records. They should not make direct promises about internal
folder layouts, live vector database APIs, hosted URLs, or skill implementation
details.

Remote retrieval can be exposed later behind adapter operations such as:

```txt
queryKnowledge(queryContext)
fetchCanonicalRecord(storageRef)
validateCanonicalRecord(record, schemaRef)
```

Those operations should preserve the Sprint 007 storage boundary: normal S3 or
local files are canonical storage, while vector indexes are rebuildable search
indexes. MCP tools should not make S3 Vectors, Bedrock Knowledge Bases,
OpenSearch, or another provider the app contract itself.

## Hosted Artifact Viewer Boundary

Hosted viewers may display uploaded or packaged handoff records when the user or
calling tool has already supplied the files. A hosted viewer may:

- read an `appArtifactManifest` and render a navigable list of artifacts
- show `appRunRecord` validation status, findings, warnings, and readiness
- show `appRetrievalResults` reasons and safe redacted storage references
- display referenced artifact JSON or markdown when included in the upload or
  package
- show package metadata and supported install surfaces

Hosted viewers should not:

- fetch private buckets, signed URLs, or user-owned storage unless a future
  authenticated adapter explicitly scopes that behavior
- become the source of truth for generated artifacts
- execute repository commands, skills, or validation scripts on behalf of an
  untrusted upload
- provide a prototype runtime, visual editor, interaction engine, export player,
  or high-fidelity design renderer as part of Sprint 008
- publish package metadata to a public marketplace or emit telemetry by default

If hosted packaging is added later, the package should include the wrapper
records, referenced artifacts, schemas needed for validation, and a manifest of
omitted private references.

## Remote Storage Boundary

Remote storage is optional and configured outside committed records. The app
contracts may carry `storageRef` pointers, but real bucket names, account IDs,
signed URLs, credentials, ARNs, and session tokens must stay out of committed
fixtures.

When remote retrieval is enabled by a user project, app and MCP consumers should
still treat the app wrapper records as the handoff API:

```txt
query context
  -> retrieval adapter
  -> retrieval results with storage refs
  -> fetched canonical records
  -> validated artifacts
  -> run record and artifact manifest
```

The remote provider is replaceable. The stable contract is the validated wrapper
record plus referenced canonical artifacts.

## Explicit Out Of Scope

The app handoff layer does not include:

- hosted API, hosted worker, or multi-tenant service
- MCP server implementation or live tool registration
- prototype runtime, visual editor, renderer, interaction engine, or export
  player
- production React, Vue, Svelte, CSS, app shell, or UI kit generation
- visual mockup generation, image generation, mood boards, or high-fidelity
  design comps
- public marketplace submission, post-publish telemetry, or analytics
- content approval workflow, CMS integration, SEO operation, or content calendar

Future sprints can add those capabilities only by defining separate contracts
that consume the Sprint 008 wrapper records rather than replacing them.
