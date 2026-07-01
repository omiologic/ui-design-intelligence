# App Handoff Contracts

Sprint 008 exposes a small app-facing contract layer above existing UI Design
Intelligence artifacts. Apps, MCP-backed tools, hosted artifact viewers, and
package browsers should consume these records instead of depending on internal
folder layout, planning files, command output, or generated `dist/` internals.

## Contract Set

| Contract | Schema | Purpose |
| --- | --- | --- |
| Query context | `.convention/schemas/app-query-context.schema.json` | Captures the user brief, target artifact type, scope, retrieval filters, source assumptions, and consumer surface before retrieval or creation starts. |
| Retrieval results | `.convention/schemas/app-retrieval-results.schema.json` | Captures ranked knowledge matches, reasons, scores when available, confidence/status, matched dimensions, and safe local or redacted storage references. |
| Artifact manifest | `.convention/schemas/app-artifact-manifest.schema.json` | Lists generated or reviewed artifacts with type, path, status, schema reference, validation command summaries, and optional storage references. |
| Run record | `.convention/schemas/app-run-record.schema.json` | Captures creation, review, retrieval, validation, and package runs with inputs, outputs, selected skills, validation status, findings, warnings, and handoff readiness. |
| Package metadata | `.convention/schemas/app-package-metadata.schema.json` | Exposes bundle/package metadata for local installers, package browsers, and hosted viewers without requiring consumers to parse internal manifests directly. |

## Artifact Schema References

The app contracts are wrappers. They should point at existing artifact schemas
through `schemaRef` instead of duplicating artifact payloads.

Common `schemaRef` values include:

- `.convention/schemas/wireframe-config.schema.json`
- `.convention/schemas/design-system-seed.schema.json`
- `.convention/schemas/prototype-config.schema.json`
- `.convention/schemas/user-journey-map.schema.json`
- `.convention/schemas/content-model.schema.json`
- `.convention/schemas/prototype-content.schema.json`
- `.convention/schemas/brand-voice.schema.json`
- `.convention/schemas/page-audit.schema.json`
- `.convention/schemas/study-output.schema.json`
- `docs/interop/blueprint-export-seed.md` for optional Markdown `exportSeed`
  artifacts

An app can load the referenced artifact and validate it against its own schema
after validating the wrapper record. The wrapper only proves that the artifact
is discoverable, typed, and safe to hand off.

## Safe Storage References

`storageRef` is allowed only as a pointer. Committed examples and fixtures must
not contain real bucket names, account IDs, signed URLs, credentials, or private
infrastructure values.

Use one of these safe patterns in repository examples:

- local paths such as `knowledge/patterns/navigation/example.json`
- package paths such as `package://ui-blueprint-skills/.convention/example.json`
- redacted remote values such as `s3://example-bucket/redacted/pattern.json`
- documented placeholders such as `s3-vector://example-vector-bucket/index/pattern-id`

Real bucket URLs belong in local environment variables or user-owned config, not
committed records.

## Typical Flow

```txt
appQueryContext
  -> appRetrievalResults
  -> appRunRecord
  -> appArtifactManifest
  -> appPackageMetadata
```

The records may be stored separately so an app can inspect partial work. For
example, retrieval results can exist even if creation is skipped, and a failed
run record can still point to validation output or review findings.

## Validation Boundary

These schemas are intentionally offline and credential-free. Validation should
only need the repository checkout and local JSON files. Sprint 008 validation
fixtures should validate the wrapper contracts first, then validate referenced
artifacts against the existing artifact schemas where those files are present.

The contracts do not define a hosted API, live MCP server, vector database
client, runtime renderer, visual editor, or cloud worker.

See `docs/interop/app-mcp-hosted-boundaries.md` for the supported consumer
boundary across local apps, MCP-backed tools, hosted artifact viewers, remote
storage adapters, and later runtime work.
