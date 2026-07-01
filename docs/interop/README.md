# Taste Stack Interop

## Purpose

`ui-blueprint-skills` sits upstream of visual taste tooling. It produces
schema-valid structural blueprints, study findings, and handoff constraints that
downstream visual, motion, and code tools can consume.

This repository does not compete with Taste Skill, Impeccable, or Emil
Kowalski-style design engineering skills. It defines the structure before those
tools decide how the interface should look, move, or be implemented.

## Layer Ownership

| Layer | This Repository Owns | Downstream Taste Tools Own |
| --- | --- | --- |
| Product intent | Captured goals, observed page purpose, primary task, action priority | Refining the creative brief, campaign tone, final product positioning |
| Information architecture | Navigation groups, page hierarchy, section order, content grouping, wayfinding | Visual navigation treatment, brand expression, final copy rhythm |
| Style reference | Controlled visual vocabulary, style records, scoped applications, blends, patches, compatibility, intensity, source metadata, and style-to-design-system mappings | Final art direction, rendered visual exploration, mood boards, image generation, high-fidelity mockups |
| Design-system foundation | Seed/foundation artifact ownership, semantic token intent, component vocabulary, state names, layout rules, accessibility constraints, source/confidence metadata | Final brand system, production token pipeline, visual styling, governed component library, implementation docs |
| Wireframe structure | Pages, sections, components, overlays, states, responsive priority, schema-valid UIBlueprint JSON | Rendered composition, art direction, visual density calibration, final component styling |
| Accessibility structure | Landmarks, labels, focus expectations, form relationships, overlay contracts, responsive access risks | Visual contrast, focus-ring styling, motion reduction implementation, production accessibility details |
| Structural taste | Taste profiles for section order, CTA cadence, density, overlay use, and anti-pattern avoidance | Visual taste systems for color, typography, spacing, imagery, animation, and polish |
| Motion | Interaction contract, state names, open/close/dismiss expectations | Easing, timing, choreography, transition craft, micro-interactions |
| Code | Handoff-ready schema, IDs, node roles, state and responsive notes | Framework components, CSS, runtime behavior, tests, production integration |

## Integration Map

| Tool Family | What It Consumes From This Repo | What It Produces Downstream | Seam |
| --- | --- | --- | --- |
| Taste Skill-style workflows | Product/page brief, structural locks, anti-slop rules, primary CTA, section sequence, responsive priorities | Visual direction, anti-slop visual constraints, rendered design guidance | Blueprint plus selected taste profile becomes a design brief seed. |
| Impeccable-style workflows | Product context, register, page goal, structural blueprint, accessibility constraints, optional `metadata.tasteProfile` | `PRODUCT.md` or `DESIGN.md`-style context, visual audit, rendered UI direction, implementation-ready guidance | Exported seed translates UIBlueprint structure into product/design context without copying Impeccable content. |
| Emil Kowalski-style design engineering skills | Component anatomy, interaction contracts, state requirements, focus and keyboard expectations | Component polish guidance, animation judgment, implementation details | UIBlueprint preserves structural decisions; design-engineering skills choose the craft layer. |

## Handoff Data

The recommended handoff from this repository to downstream tools includes:

- source blueprint ID, version, and page or component scope
- primary user goal and success action
- section order and section purpose
- core components and repeated patterns
- overlays and interaction contracts
- responsive priority notes
- accessibility constraints and open questions
- selected structural taste profile, when present
- explicit non-goals for visual design, motion, and code

Future export tasks may serialize this as a `PRODUCT.md` or `DESIGN.md`-style
seed. That seed should be generated from local blueprint and taste-profile data,
not copied from any third-party tool.

Sprint 002 defines this as a repository-native Blueprint Export Seed. See
`docs/interop/blueprint-export-seed.md` for required fields, evidence
boundaries, adapter strategy, a worked example, and the
`scripts/export-blueprint-seed.mjs` prototype workflow.

Sprint 003 adds a lightweight design-system foundation layer between knowledge
and blueprint/prototype generation. See
`docs/interop/design-system-layer-architecture.md` for the pipeline order,
artifact ownership, maturity labels, integration rules, and scope boundary.

Sprint 003 also defines prototype config as a behavior layer over wireframe
structure. See `docs/interop/prototype-config-architecture.md` for the reference
rules and schema ownership boundary.

The full study-to-prototype artifact sequence and the split boundary between
schema/skill work and a future runtime are documented in
`docs/interop/design-system-prototype-pipeline.md`.

Sprint 003 also adds a style-reference layer between knowledge and
design-system seed generation. See
`docs/interop/style-reference-layer-architecture.md` for the data-over-skills
decision, artifact ownership, scope semantics, intensity levels, integration
rules, and boundary with design-system, blueprint, and prototype layers. See
`docs/interop/design-system-prototype-pipeline.md` for the full
study-to-knowledge-to-style-to-design-system-to-blueprint-to-prototype sequence,
including when to recommend, apply, blend, patch, or audit styles.

Install and command parity with downstream taste tooling is documented in
`docs/interop/install-command-parity.md`. The supported Codex/GPT, Claude, and
generic local install layouts are documented in
`docs/interop/cross-agent-compatibility-contract.md`.
The generated local Codex marketplace fixture and smoke-test flow are documented
in `docs/interop/codex-local-marketplace-fixture.md`.
Sprint 006 consumer creation command behavior is documented in
`docs/interop/consumer-creation-contract.md`.

Sprint 008 defines the app-compatible handoff scope for local apps,
MCP-backed tools, hosted artifact viewers, run records, artifact manifests,
retrieval results, and package metadata. See
`docs/interop/app-handoff-scope.md`. The first schema-backed app contracts are
documented in `docs/interop/app-handoff-contracts.md`. Consumer boundaries for
future local apps, MCP-backed tools, hosted artifact viewers, and remote
adapters are documented in `docs/interop/app-mcp-hosted-boundaries.md`.

Sprint 008 adds the first content and journey layer for realistic prototypes.
See `docs/interop/content-journey-layer-architecture.md` for how
`UserJourneyMap`, `ContentModel`, `PrototypeContent`, `BrandVoice`,
`WireframeConfig`, and `PrototypeConfig` relate without turning generated copy
into production-approved content.

Canonical skill shapes and release validation expectations are documented in
`docs/skill-shapes-and-validation.md`.

## Non-Copying Boundary

This repository may reference third-party projects by name to describe
interoperability, installation expectations, or layer ownership. It must not
vendor, fork, quote at length, or recreate their private or copyrighted skill
content.

Allowed:

- referencing external tools as downstream consumers
- adapting the general pattern of explicit rules, locks, anti-patterns, and
  pre-flight checks
- generating local handoff files that a user may paste into or use alongside
  those tools

Not allowed:

- copying third-party `SKILL.md`, command, detector, prompt, or template content
- claiming compatibility with a private format that this repository does not
  actually emit
- moving visual taste, motion craft, or production code generation into this
  structural blueprint layer

## Review Rule

When a change adds visual styling, motion timing, rendered code, or tool-specific
prompt content, it belongs downstream unless it is only a structural placeholder
needed for a valid blueprint handoff.
