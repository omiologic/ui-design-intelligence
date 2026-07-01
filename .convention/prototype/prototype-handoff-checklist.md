# Prototype Handoff Checklist

Use this checklist before handing a prototype to implementation, app rendering,
MCP-backed tooling, hosted artifact viewing, or formal review.

This checklist aligns prototype handoff with Sprint 008 app-facing contracts:

- `appQueryContext`
- `appRetrievalResults`
- `appRunRecord`
- `appArtifactManifest`
- `appPackageMetadata`

The checklist is repository-local and offline by default. It does not define a
runtime renderer, hosted API, visual editor, or implementation framework.

## Required Handoff Artifacts

A complete prototype handoff should identify the available artifacts:

- Source brief, query context, or user request.
- Source wireframe or blueprint.
- Optional design-system seed.
- Optional user journey map.
- Optional content model.
- Optional prototype content.
- Prototype config.
- Optional interaction flow or component state model.
- Optional human-readable prototype plan.
- Validation status or validation command summary.
- Open questions and known blockers.

When app-facing wrappers are present, list these artifacts through
`appArtifactManifest.artifacts[]` with repository-relative paths and schema
references.

## App Contract Alignment

### Query Context

Use `appQueryContext` or equivalent handoff notes to identify:

- User goal.
- Target artifact type.
- Scope.
- Assumptions.
- Consumer surface, such as local app, MCP-backed tool, hosted viewer, or human
  implementation handoff.

Fail handoff when:

- The prototype goal is unclear.
- The expected consumer is unknown.
- The artifact claims runtime behavior outside the requested scope.

### Retrieval Results

Use `appRetrievalResults` when the prototype depends on knowledge records,
patterns, examples, or reference material.

Pass when:

- Retrieved sources are named or referenced.
- Confidence and status are represented where available.
- Storage references are local, package-safe, redacted, or documented
  placeholders.

Fail handoff when:

- The prototype depends on undocumented knowledge.
- Real credentials, signed URLs, private buckets, account IDs, or private
  infrastructure values appear in committed examples.

### Run Record

Use `appRunRecord` to summarize creation, review, validation, or packaging work.

Pass when:

- Inputs and outputs are named.
- Selected skills or agents are listed when relevant.
- Validation status is included.
- Findings, warnings, and handoff readiness are explicit.

Fail handoff when:

- The run status says ready but validation or blockers are missing.
- Review findings are hidden in prose and not reflected in readiness.

### Artifact Manifest

Use `appArtifactManifest` to list handoff artifacts.

Each artifact entry should include:

- Artifact ID.
- Artifact type.
- Repository-relative path.
- Status.
- Schema reference or document reference.
- Label.
- Validation command summary where available.
- Notes for known limitations.

For prototype handoff, common `artifactType` and `schemaRef` pairs include:

- `wireframeConfig` -> `.convention/schemas/wireframe-config.schema.json`
- `designSystemSeed` -> `.convention/schemas/design-system-seed.schema.json`
- `userJourneyMap` -> `.convention/schemas/user-journey-map.schema.json`
- `contentModel` -> `.convention/schemas/content-model.schema.json`
- `prototypeContent` -> `.convention/schemas/prototype-content.schema.json`
- `prototypeConfig` -> `.convention/schemas/prototype-config.schema.json`
- `pageAudit` -> `.convention/schemas/page-audit.schema.json`
- `exportSeed` -> `.convention/workflows/blueprint-export-seed.md`

Fail handoff when:

- A referenced artifact path does not exist.
- A JSON artifact lacks a schema reference.
- Manifest status says validated without a validation command or note.
- The manifest points consumers to internal planning files as product APIs.

### Package Metadata

Use `appPackageMetadata` when handoff depends on bundle or package visibility.

Pass when:

- Package metadata exposes consumer-safe bundle information.
- Consumers do not need to parse internal plugin or build output details.
- Package paths are stable and safe.

Fail handoff when:

- Runtime consumers must inspect `dist/` internals.
- The prototype handoff depends on unpublished local state without notes.

## Prototype Artifact Checklist

### Screens

Pass when:

- Each screen has a stable ID.
- Each screen has a label.
- Each screen references a source wireframe or blueprint node.
- Each screen has an initial state.
- Relevant viewport priorities are documented.

Fail when:

- A route or interaction points to an undefined screen.
- Screens duplicate the same role without explanation.
- A screen has no source relationship.

### Nodes

Pass when:

- Interactive targets reference stable source node IDs.
- Form fields, buttons, nav items, overlays, dialogs, and stateful components
  have clear node references.
- Generated responsive-only controls are documented when they are not duplicated
  in the wireframe hierarchy.

Fail when:

- Engineers must invent node identity.
- Mobile-only controls appear without a source, note, or responsive rationale.

### States

Pass when relevant states are represented:

- `default`
- `hover`
- `focus`
- `active`
- `selected`
- `disabled`
- `expanded`
- `collapsed`
- `open`
- `closed`
- `loading`
- `success`
- `warning`
- `error`
- `empty`
- `hidden`
- `visible`
- `sticky`
- `dismissible`
- `required`
- `optional`

Fail when:

- Async behavior lacks loading, success, error, and recovery states.
- Forms lack required, optional, disabled, validation, error, success, and
  recovery behavior.
- Overlays lack open, close, focus, and dismissal behavior.

### Interactions

Pass when each interaction defines:

- Trigger event.
- Source node ID.
- Condition.
- Action.
- Result.
- Feedback.
- Recovery.
- Accessibility notes where relevant.

Fail when:

- Interaction names describe intent but not behavior.
- Keyboard behavior conflicts with pointer behavior.
- Resulting route, state, overlay, form, or feedback is unclear.

### Content References

Pass when:

- Prototype copy is provided in `PrototypeContent` or clearly documented in the
  prototype plan.
- Copy fields include source, confidence, status, and review-risk metadata where
  schema-backed.
- Sensitive generated copy is not marked production-ready without review.
- CTA labels match interaction outcomes.

Fail when:

- Placeholder copy blocks meaningful review.
- Error, success, confirmation, or form helper copy is missing.
- Medical, legal, financial, pricing, product-spec, brand, client,
  accessibility, or translation risks are not flagged.

### Design-System References

Pass when:

- The prototype references a design-system seed when component behavior,
  responsive behavior, or visual system assumptions depend on it.
- Component names, states, and variants are consistent with the seed or noted as
  assumptions.
- Token or component gaps are listed as open questions.

Fail when:

- The prototype assumes components or states the design system does not define.
- Engineers must infer visual or component behavior from prototype notes alone.

### Responsive Behavior

Pass when:

- Relevant viewport priorities are listed.
- Desktop, compact, and any special medium or large behavior are documented.
- Hidden controls have alternate paths.
- Sticky actions include visibility, overlap, focus, and state behavior.
- Overflow, touch target, and mobile-only dead-end risks are reviewed.

Fail when:

- Desktop behavior is assumed unchanged on mobile.
- A primary action disappears on compact viewports.
- A mobile overlay, drawer, or dialog lacks close and focus behavior.

### Accessibility

Pass when:

- Focus order and focus return are documented.
- Keyboard activation and escape behavior are documented.
- Form errors are associated with fields or summaries.
- Dialogs and drawers define focus management.
- State feedback does not rely only on color.
- Important loading, success, error, and saved states include announcement notes
  where relevant.

Fail when:

- Prototype behavior is pointer-only.
- Focus is lost after route changes, overlay close, validation, or async
  feedback.
- Recovery actions are not keyboard reachable.

### Assumptions

Pass when:

- Assumptions are explicit and tied to artifacts or missing inputs.
- Assumptions do not silently change product behavior.
- Generated behavior is labeled as generated, inferred, recommended, or
  user-provided where relevant.

Fail when:

- Product, legal, clinical, financial, pricing, or implementation assumptions
  are presented as facts.
- Engineers must discover assumptions by reading unrelated planning notes.

### Unresolved Questions

Pass when each unresolved question includes:

- Owner or audience.
- Artifact or node affected.
- Whether it blocks implementation.
- Suggested default if non-blocking.

Fail when:

- Blocking questions are hidden in notes.
- Open questions affect validation, accessibility, content approval, or
  implementation readiness but are marked non-blocking.

### Validation Status

Pass when:

- JSON artifacts have schema references.
- Validation commands are listed when available.
- Known validation gaps are documented.
- App wrappers validate before referenced artifacts are consumed by apps.

Fail when:

- Handoff claims readiness without validation status.
- Missing validation is not documented.
- App-facing consumers must infer schema paths.

## Readiness Levels

### Draft Handoff

Use draft handoff for early review.

Draft requires:

- Source artifact references.
- Primary screens and routes.
- Main interaction path.
- Known assumptions and open questions.

Draft blocks implementation.

### Review Handoff

Use review handoff for product, design, content, accessibility, or engineering
review.

Review handoff requires:

- Stable screens and node references.
- Primary and secondary flows.
- Core states and recovery paths.
- Prototype copy or content references.
- Responsive and accessibility notes.
- Validation status or validation plan.

### Implementation Handoff

Use implementation handoff when the prototype is ready to build from.

Implementation handoff requires:

- Complete screen, route, state, interaction, overlay, form, navigation, and
  responsive behavior for scoped flows.
- Linked design-system and content artifacts where relevant.
- Accessibility behavior sufficient for implementation.
- Non-blocking open questions only.
- App-safe manifest or equivalent artifact list.
- Validation status for schema-backed artifacts.

### App Rendering Handoff

Use app rendering handoff when a local app, MCP-backed tool, or hosted artifact
viewer will inspect the artifact set.

App rendering handoff requires:

- App wrapper contracts where available.
- Repository-relative or package-safe artifact paths.
- Schema references for JSON artifacts.
- No private credentials or unsafe remote storage references.
- Clear unsupported-runtime notes.

## Blockers

Block handoff when:

- Source wireframe or blueprint is missing.
- Stable node IDs are missing for interactive targets.
- Primary flow is unknown.
- Required screens or routes are missing.
- Required states or recovery paths are missing.
- Prototype copy is too placeholder-heavy for meaningful review.
- Review-risk metadata is missing for sensitive generated content.
- Accessibility behavior is missing for forms, dialogs, route changes, or error
  states.
- Responsive behavior hides required actions.
- Validation status is absent for schema-backed artifacts.
- Artifact paths are unsafe, private, or not repository-reference-safe.

## Local And Offline Safety

Prototype handoffs should remain local/offline by default.

Use safe references:

- Repository-relative paths, such as `.convention/examples/...`.
- Package paths, such as `package://ui-blueprint-skills/...`.
- Redacted remote placeholders only in examples.
- Documented placeholders for optional user-owned remote storage.

Do not commit:

- Real bucket names.
- Account IDs.
- Signed URLs.
- Access tokens.
- Private infrastructure values.
- User-owned credentials.

Do not require:

- Network access.
- Cloud credentials.
- Hosted artifact service.
- Runtime renderer.
- Visual editor.

## Handoff Outcomes

Use these outcomes:

- `pass`: Ready for the stated handoff level.
- `passWithNotes`: Usable with non-blocking notes.
- `revise`: Important gaps must be resolved before the stated handoff.
- `blocked`: Required source artifacts, IDs, flows, validation, or review input
  are missing.

## Minimum Implementation Handoff Bar

A prototype meets the minimum implementation handoff bar when:

- Source artifacts are named.
- Screens, routes, nodes, and primary interactions are stable.
- States and recovery paths are complete for scoped flows.
- Forms, overlays, navigation, responsive behavior, and accessibility behavior
  are documented where relevant.
- Prototype content and design-system references are linked or explicitly
  marked unavailable.
- Assumptions and unresolved questions are visible.
- Validation status is documented.
- Artifact references are local, offline-safe, and repository-reference-safe.
