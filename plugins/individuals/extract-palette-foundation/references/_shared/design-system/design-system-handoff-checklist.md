# Design System Handoff Checklist

Use this checklist before handing a `DesignSystemSeed` to implementation,
blueprint generation, prototype generation, app rendering, MCP-backed tooling,
hosted artifact viewing, or formal review.

This checklist aligns design-system handoff with Sprint 008 app-facing
contracts:

- `appQueryContext`
- `appRetrievalResults`
- `appRunRecord`
- `appArtifactManifest`
- `appPackageMetadata`

The checklist is repository-local and offline by default. It does not define a
token build pipeline, component library, runtime renderer, hosted API, visual
editor, or implementation framework.

## Required Handoff Artifacts

A complete design-system handoff should identify the available artifacts:

- Source brief, query context, or user request.
- Source study, screenshot notes, URL capture, style reference, or brand input.
- Optional retrieval results or knowledge records.
- `DesignSystemSeed` JSON.
- Optional `RuntimeDesignTheme` JSON when a prototype viewer, editor, or future
  runtime needs apply-ready palette, state, status, component theme, or export
  groups.
- Optional human-readable design-system seed Markdown.
- Optional design spec or design-spec recipe output.
- Optional style application, blend, or patch.
- Optional blueprint or wireframe that consumes the seed.
- Optional prototype config that consumes seed component and state vocabulary.
- Validation status or validation command summary.
- Open questions and known blockers.

When app-facing wrappers are present, list these artifacts through
`appArtifactManifest.artifacts[]` with repository-relative paths and schema or
document references.

## App Contract Alignment

### Query Context

Use `appQueryContext` or equivalent handoff notes to identify:

- User goal.
- Target artifact type.
- Scope: project, page, flow, component, or feature area.
- Source assumptions for brand, style, study, or existing design system.
- Consumer surface, such as local app, MCP-backed tool, hosted viewer, or human
  implementation handoff.

Fail handoff when:

- The seed goal is unclear.
- The expected consumer is unknown.
- The artifact claims production governance beyond the requested scope.

### Retrieval Results

Use `appRetrievalResults` when the seed depends on knowledge records, style
records, examples, studies, or reference material.

Pass when:

- Retrieved sources are named or referenced.
- Confidence and status are represented where available.
- Storage references are local, package-safe, redacted, or documented
  placeholders.
- Source-to-seed decisions are represented as observed, inferred, recommended,
  generated, or user-provided.

Fail handoff when:

- The seed depends on undocumented knowledge.
- Exact colors, fonts, spacing, or component rules are claimed from weak
  evidence.
- Real credentials, signed URLs, private buckets, account IDs, or private
  infrastructure values appear in committed examples.

### Run Record

Use `appRunRecord` to summarize creation, review, validation, or packaging work.

Pass when:

- Inputs and outputs are named.
- Selected skills or agents are listed when relevant.
- Validation status is included.
- Findings, warnings, readiness level, and blockers are explicit.

Fail handoff when:

- The run status says ready but validation or blockers are missing.
- Review findings are hidden in prose and not reflected in readiness.
- Open questions affect primary action, typography, color contrast, responsive
  behavior, or component states but are not called out.

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

For design-system handoff, common `artifactType` and `schemaRef` pairs include:

- `designSystemSeed` -> `.convention/schemas/design-system-seed.schema.json`
- `runtimeDesignTheme` -> `.convention/schemas/runtime-design-theme.schema.json`
- `studyOutput` -> `.convention/schemas/study-output.schema.json`
- `wireframeConfig` -> `.convention/schemas/wireframe-config.schema.json`
- `prototypeConfig` -> `.convention/schemas/prototype-config.schema.json`
- `contentModel` -> `.convention/schemas/content-model.schema.json`
- `prototypeContent` -> `.convention/schemas/prototype-content.schema.json`
- `exportSeed` -> `docs/interop/blueprint-export-seed.md`
- Markdown seed notes -> `.convention/templates/design-system-seed.md`

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
- The design-system handoff depends on unpublished local state without notes.

## Design-System Artifact Checklist

### Token Names And Semantic Roles

Pass when:

- Token names use semantic dot notation.
- Token roles describe purpose, not raw values.
- Tokens are mapped to component or surface usage.
- Low-confidence or generated values are marked with source and confidence.
- Token categories follow `.convention/design-system/token-taxonomy.md`.

Fail when:

- Tokens are value-named, style-named, duplicated, or orphaned.
- A downstream consumer must infer where a token should be used.
- Exact token values are claimed without source evidence.

### Component Coverage

Pass when:

- Required seed sections exist: brand, palette, typography, iconography,
  buttons, cards, header, and footer.
- Component variants define use cases, action priority, and constraints.
- Component anatomy follows
  `.convention/design-system/component-anatomy-reference.md`.
- Component selection rules follow
  `.convention/design-system/component-selection-guidelines.md` where relevant.

Fail when:

- Components are decorative descriptions without reusable rules.
- Cards, buttons, header, or footer lack anatomy, variants, or usage limits.
- A table, card list, tabs, segmented control, modal, drawer, dropdown,
  combobox, accordion, or disclosure choice is implied but not justified.

### State Coverage

Pass when:

- Interactive components define relevant states such as default, hover, focus,
  active, selected, disabled, loading, success, warning, error, empty, open, and
  closed.
- State guidance follows
  `.convention/design-system/component-state-guidelines.md`.
- Prototype-specific transitions remain handoff notes instead of seed-owned
  runtime details.

Fail when:

- Buttons, forms, overlays, navigation, or data components only define a default
  state.
- Focus, disabled, loading, error, or recovery behavior is missing where the
  user can act or fail.
- The seed invents runtime animation behavior instead of reusable state rules.

### Accessibility Notes

Pass when:

- Contrast, focus visibility, readable type, target size, disabled legibility,
  non-color state, reduced motion, and icon labeling risks are explicit.
- Accessibility guidance follows
  `.convention/design-system/accessibility-token-guidelines.md`.
- Unverified color pairs are marked for contrast checks.

Fail when:

- Accessibility is limited to a generic sentence.
- Color, opacity, motion, disabled state, or icon decisions would block review.
- Downstream agents must infer focus or error behavior.

### Responsive Notes

Pass when:

- Header, footer, cards, actions, density, sticky regions, and component
  adaptation rules are documented.
- Responsive guidance follows
  `.convention/design-system/responsive-system-guidelines.md`.
- Mobile behavior is specific enough for blueprint and prototype handoff.

Fail when:

- The seed only says desktop/mobile without behavior.
- A downstream wireframe or prototype must invent what stacks, collapses,
  hides, scrolls, or remains persistent.

### Source References

Pass when:

- Source references explain whether values are user-provided, observed,
  inferred, recommended, or generated.
- Screenshots, studies, style references, knowledge records, or briefs are named
  where they influenced decisions.
- Weak evidence remains visible through confidence and notes.

Fail when:

- The seed appears authoritative without provenance.
- Source conflicts are resolved silently.
- Generated recommendations are presented as approved production truth.

### Unresolved Decisions

Pass when:

- Open questions are specific and field-oriented.
- Blockers identify the downstream artifact they affect.
- Advisory decisions are separated from governed decisions.

Fail when:

- Open questions are vague or hidden in prose.
- Primary action, typography hierarchy, contrast, responsive behavior, or
  component states remain unresolved but the handoff claims readiness.

## Handoff Readiness Levels

### Draft Handoff

Use when the seed is useful for exploration but not ready to constrain
implementation or app rendering.

Pass when:

- Required seed sections exist.
- Source/confidence metadata is present.
- Major open questions are visible.

Blockers:

- Missing required sections.
- No source or confidence metadata.
- Exact values are invented from weak evidence.

### Review-Ready Handoff

Use when a designer, engineer, agent, or app can inspect the seed and decide
what must change before downstream use.

Pass when:

- Token roles, component coverage, states, accessibility notes, responsive
  notes, source references, and unresolved decisions are reviewable.
- Validation status is included.
- App wrapper records, when present, point to repository-safe paths.

Blockers:

- Component rules are too generic to guide blueprint or prototype work.
- Accessibility or responsive notes are absent for interactive surfaces.
- Manifest entries or schema references are missing.

### Implementation-Ready Handoff

Use when the seed can constrain a design spec, blueprint, prototype, or
implementation handoff without forcing avoidable invention. It is still not a
production UI-kit contract.

Pass when:

- Every render-critical token and component decision has role, usage, source,
  confidence, and handoff notes.
- Accessibility and responsive constraints are testable.
- Blueprint and prototype consumers know what to preserve, what to treat as
  advisory, and what remains unresolved.

Blockers:

- Open questions affect primary action, type hierarchy, contrast, component
  behavior, or responsive behavior.
- Downstream work would need to invent core tokens, states, or component rules.
- The seed overclaims final production governance.

## Blueprint And Prototype Connections

Design-system handoff should tell blueprint and prototype consumers what they
may rely on.

For blueprint and wireframe generation, hand off:

- semantic component names and variants
- token roles that affect hierarchy and surfaces
- component selection rules
- state requirements that change structure
- accessibility and responsive constraints
- source confidence and unresolved questions

For prototype generation, hand off:

- allowed component state names
- overlay, form, navigation, and feedback constraints
- focus, keyboard, dismissal, validation, and recovery expectations
- responsive behavior that changes interaction
- visual style and motion posture only as constraints, not runtime code

Do not copy the full seed into every downstream artifact. Downstream artifacts
should reference the seed where useful and preserve lineage without duplicating
the design-system contract.

## Review Output Shape

Use this shape when reporting handoff readiness:

```md
# Design System Handoff Review

## Summary

- Readiness: draft | review-ready | implementation-ready
- Blocking issues: 0
- Warnings: 0
- Primary downstream risk: short statement

## Required Artifacts

| Artifact | Status | Path | Notes |
| --- | --- | --- | --- |

## Checklist Results

| Area | Status | Evidence | Repair |
| --- | --- | --- | --- |

## App Contract Alignment

## Blueprint Handoff Notes

## Prototype Handoff Notes

## Blocking Issues

## Warnings

## Open Questions
```

Status values:

- `pass`: The element is present, coherent, and usable for the target readiness.
- `warning`: The element is usable but weak, inferred, incomplete, or needs
  human confirmation.
- `fail`: The element is missing, contradictory, unsupported, or blocks safe
  downstream use.
