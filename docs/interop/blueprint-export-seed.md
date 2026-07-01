# Blueprint Export Seed Format

## Decision

Sprint 002 defines a repository-native **Blueprint Export Seed** as the canonical
handoff artifact. The seed can be adapted into `PRODUCT.md`, `DESIGN.md`, or
tool-specific prompts later, but this repository does not claim to implement a
third-party private format directly.

Why: a native seed lets UIBlueprint preserve structural decisions, evidence, and
accessibility constraints without importing visual style rules from downstream
tools. Adapters can translate this seed into the shape a visual-taste workflow
expects.

## File Shape

Recommended filename:

```txt
{blueprint-id}.export-seed.md
```

Required sections:

1. `# Blueprint Export Seed`
2. `## Source`
3. `## Product Context`
4. `## Structural Intent`
5. `## Taste Profile Bias`
6. `## Structural Constraints`
7. `## Accessibility And Interaction Contracts`
8. `## Responsive Priorities`
9. `## Downstream Ownership`
10. `## Evidence Boundaries`
11. `## Adapter Notes`

## Field Sources

| Field | Source | Required | Notes |
| --- | --- | --- | --- |
| Blueprint ID | UIBlueprint `id` | Yes | Do not invent. |
| Blueprint version | UIBlueprint `version` | Yes | Use the source blueprint value. |
| Scope | UIBlueprint root type and label | Yes | Page, section, component, or overlay scope. |
| Register | `metadata.register` or explicit user input | Yes | If absent, write `unknown`. |
| Taste profile | `metadata.tasteProfile` or chosen profile | No | If absent, write `none selected`. |
| Primary user goal | Blueprint description, study evidence, or explicit brief | Yes | Mark inferred if not directly provided. |
| Success action | CTA role, study evidence, or explicit brief | Yes | Mark missing if no action is visible. |
| Section order | Blueprint node tree | Required for page scope | Preserve source order. |
| Component inventory | Blueprint node tree | Yes | Summarize major reusable components and repeated patterns. |
| Overlay contracts | Blueprint `overlays` and interaction notes | No | Required only when overlays exist. |
| Responsive priorities | Blueprint `responsive` plus taste profile priority | Yes | Preserve information/action priority, not visual layout. |
| Accessibility constraints | Blueprint `accessibility` fields and study/audit notes | Yes | Include open questions. |
| Profile bias | `.convention/taste-profiles/{name}.json` | No | Structural bias only: section order, density, CTA cadence, overlays. |
| Visual non-goals | This repository's layer boundary | Yes | Color, typography, imagery, motion, and code are downstream. |

## Do Not Infer Without Evidence

Do not invent these fields from a blueprint alone:

- brand personality, tone of voice, or campaign concept
- final color palette, typography, spacing scale, imagery, icon style, or motion
- target demographic beyond observed or provided audience
- conversion claims, proof claims, metrics, testimonials, or regulated claims
- product features not present in the blueprint or study evidence
- implementation framework, component library, analytics, or backend behavior
- accessibility implementation details that require DOM, keyboard, or screen
  reader testing

If a downstream tool would benefit from one of these fields, mark it as
`missing evidence` or `downstream decision`.

## Adapter Strategy

The native seed can be adapted in three directions:

- `PRODUCT.md`-style context: use product context, audience, goal, scope,
  evidence boundaries, and success action.
- `DESIGN.md`-style context: use structural intent, constraints, responsive
  priorities, accessibility contracts, and selected taste profile bias.
- Design-engineering prompt: use component inventory, state requirements,
  overlays, focus/keyboard contracts, and implementation non-goals.

Adapters must preserve the layer boundary: this repository exports structure and
constraints; downstream tools choose visual design, motion, and code.

## Template

Use `.convention/templates/blueprint-export-seed.md`.

## Worked Example

See `.convention/examples/ui-blueprint.export-seed.md`, generated from
`.convention/examples/ui-blueprint.example.json` with the `conversion` taste profile.

## Prototype Workflow

Sprint 002 prototypes deterministic generation with:

```bash
node scripts/export-blueprint-seed.mjs \
  --blueprint .convention/examples/ui-blueprint.example.json \
  --profile .convention/taste-profiles/conversion.json \
  --out .convention/examples/ui-blueprint.generated.export-seed.md
```

Use `--check` to smoke-test generation without writing a file:

```bash
npm run validate:export-seed
```

The validation command regenerates the seed and compares it to
`.convention/examples/ui-blueprint.export-seed.md`.

The script emits this repository-native seed only. A user can hand the generated
markdown to Impeccable, Taste Skill-style workflows, or a design-engineering
skill as context, while those tools remain responsible for visual design, motion,
and code decisions.

## Sprint 008 App Handoff Role

Sprint 008 promotes Blueprint Export Seed as an optional `exportSeed` artifact
inside app artifact manifests. This promotion is intentionally narrow:

- The seed remains repository-native Markdown, not a third-party-specific file
  format.
- App manifests should reference the seed by `path` and use this document as
  the `schemaRef`/format reference.
- Apps and hosted viewers may display the seed as a human-readable handoff
  summary for product-context, design-direction, or design-engineering adapters.
- The seed must not replace schema-backed artifacts such as `WireframeConfig`,
  `DesignSystemSeed`, `PrototypeConfig`, run records, retrieval results, or
  artifact manifests.
- The seed does not authorize visual mockup generation, runtime/editor behavior,
  production code generation, or third-party prompt compatibility claims.

The Sprint 008 fixture includes
`.convention/examples/app-handoff/marketing-page.export-seed.md` as a concrete
example of this optional manifest artifact.
