# Design System Prototype Pipeline

## Purpose

This document explains how Sprint 003 artifacts connect from study through
prototype without merging their responsibilities.

The short version:

```txt
study -> knowledge -> style reference -> DesignSystemSeed -> RuntimeDesignTheme -> blueprint/wireframe -> PrototypeConfig -> viewer/runtime
```

Create evidence first, normalize reusable decisions second, generate structure
third, and add behavior last.

## Artifact Creation Order

| Step | Create | Why It Comes Here | Next Consumer |
| --- | --- | --- | --- |
| 1 | `StudyOutput` | Captures observed page, interaction, responsive, accessibility, and content evidence. | Knowledge extraction, design-system seed generation, blueprint generation. |
| 2 | Knowledge records | Turns repeated evidence into reusable, confidence-scored UI patterns. | Style, design-system, blueprint, and prototype generation. |
| 3 | Style references | Defines reusable visual vocabulary, intensity, scope, compatibility, and design-system mapping without creating a full seed. | `DesignSystemSeed` and scoped visual guidance. |
| 4 | `DesignSystemSeed` | Normalizes brand, palette, typography, iconography, component vocabulary, state names, layout rules, and accessibility constraints. | Runtime theme, blueprint, wireframe, and prototype skills. |
| 5 | `RuntimeDesignTheme` | Expands seed decisions into viewer-ready palette, status, state, component theme, logo provenance, and export binding data. | Prototype config, future viewer, editor, preview player, or export engine. |
| 6 | `UIBlueprint` / `WireframeConfig` | Defines page, section, component, overlay, responsive, and structural node hierarchy. | Prototype config. |
| 7 | `PrototypeConfig` | Adds screens, routes, states, interaction flows, overlays, forms, navigation flows, transitions, and optional `runtimeDesignThemeRef` over wireframe node references. | A future runtime, editor, preview player, or export engine. |

Do not skip directly from a prompt to prototype runtime work when the structure,
component vocabulary, state names, and node IDs are not stable yet.

## Style Reference As Visual Vocabulary

Sprint 003 style-reference work is a visual-vocabulary contract. It is not a
finished mockup, theme, CSS output, or production design system.

Style references answer:

- Which style vocabulary is appropriate for the project, audience, industry, and
  target scope?
- What visual DNA, mood, best uses, avoid cases, compatibility, accessibility
  risks, and source notes define that style?
- Should the style apply globally to a site, locally to a page or section,
  narrowly to a component, or behaviorally to prototype interaction feel?
- Which existing brand, palette, typography, component, structure, or behavior
  decisions must be preserved?
- Should the result be a recommendation, application request, blend, patch, or
  audit finding?

Style-reference artifacts do not own final art direction, exact color/font
values, production tokens, rendered UI, blueprint structure, or prototype
runtime behavior.

## Style Operation Choice

Use the smallest operation that matches the request:

| Operation | Use When | Output |
| --- | --- | --- |
| Recommend | The user has a project brief but has not selected a style. | 2-5 candidate style ids with scope, intensity, reasons, and avoid guidance. |
| Apply | One selected style should affect a site, page, section, component, or prototype target. | `StyleApplication` or a scoped application note. |
| Blend | Two or more styles should be combined. | `StyleBlend` with primary/secondary styles, ratios, ownership rules, and avoid guidance. |
| Patch | Existing seed, section, component, or prototype behavior should be preserved while style changes are applied. | `StylePatch` with explicit `preserve`, `changes`, and `avoid` paths. |
| Audit | A style artifact may be too strong, incompatible, inaccessible, copied, or contradictory. | Findings and required fixes before downstream use. |

Normalize style prompts before acting:

```txt
style: <style-id>
scope: site | page | section | component | prototype
target: <target-id or label>
intensity: subtle | medium | strong | experimental
preserve:
  - <brand, token, typography, component, structure, or behavior to keep>
applyTo:
  - <surface, layout, component, motion, or local treatment to change>
avoid:
  - <accessibility, compatibility, or overuse risk to prevent>
```

Global style application may affect seed-level brand, palette, typography,
surfaces, component defaults, header, footer, and prototype feel. Local style
application must preserve unrelated global seed values and should usually emit a
`StylePatch` for a page, section, component, or prototype target.

## Design System As Prototype Contract

Sprint 003 design-system work is a prototype design contract. It is not a
finished UI kit.

`DesignSystemSeed` should answer enough questions for downstream generators:

- What brand, tone, and product category assumptions are in play?
- Which semantic token roles exist, and which values are observed or inferred?
- Which component names, variants, anatomy, states, and actions are allowed?
- Which layout roles, content roles, and responsive assumptions should be used?
- Which accessibility constraints affect focus, keyboard behavior, validation,
  overlays, and touch targets?
- Which values are low confidence or unresolved?

It should not imply:

- production React/Vue/Svelte components
- governed token release pipelines
- final palette, typography, spacing, or icon decisions
- versioned design-system governance
- a rendered prototype player

## Runtime Theme As Viewer Dataset

`RuntimeDesignTheme` is the downstream dataset for prototype viewers, editors,
or future runtime surfaces. It does not replace `DesignSystemSeed`; it consumes
seed decisions plus style references, study evidence, capture manifests, and
user-provided brand assets when those sources exist.

Use `RuntimeDesignTheme` when a consumer needs machine-readable visual data:

- palette primitives, semantic roles, theme variants, and contrast pairs
- logo and brand asset refs with extracted color provenance
- success, error, warning, info, neutral, disabled, focus, and selected roles
- hover, active, focus, loading, disabled, selected, error, success, and empty
  interaction-state token overrides
- component theme mappings for prototype components
- CSS variable names, viewer groups, preview swatches, and sample bindings

Do not force runtime viewer needs back into `DesignSystemSeed`. The seed should
remain a lightweight foundation; the runtime theme should carry the structured
dataset a viewer can apply.

## RuntimeDesignTheme Versus VisualExperienceSpec

`RuntimeDesignTheme` and `VisualExperienceSpec` may both inform a polished
prototype, but they answer different questions.

`RuntimeDesignTheme` owns reusable theme data:

- color primitives, ramps, semantic roles, and contrast pairs
- status roles such as success, error, warning, info, disabled, focus, and
  selected
- interaction-state token mappings such as hover, active, focus, loading,
  disabled, selected, error, success, and empty
- logo, wordmark, and brand asset refs with extracted color provenance
- component theme token bindings, CSS variable names, viewer groups, swatches,
  and sample runtime bindings

`VisualExperienceSpec` owns observed or intended visual experience behavior:

- motion posture, scroll choreography, transition intent, and viewport timing
- capture-frame evidence, animation observations, and visual rhythm notes
- media, canvas, WebGL/WebGPU, or generated-image considerations
- implementation handoff notes that help a builder reproduce a visual feel

Keep palette/status/component theme data in `RuntimeDesignTheme`. Keep motion,
capture evidence, scroll behavior, and experiential implementation guidance in
`VisualExperienceSpec`. If a prototype needs both, cite both artifacts instead
of duplicating theme tokens inside the visual-experience handoff.

## How DesignSystemSeed Feeds Blueprint And Wireframe

Blueprint and wireframe skills consume the seed as constraints, not as final
visual implementation.

Use the seed to:

- choose semantic roles such as `button.primary`, `card.service`, or
  `color.action.primary`
- keep component names and variants consistent across sections
- preserve state names such as `default`, `hover`, `focus`, `disabled`,
  `loading`, `error`, `success`, `open`, and `closed`
- apply known accessibility requirements when creating forms, dialogs, drawers,
  sticky bars, cards, and navigation
- record seed IDs and source confidence in lineage when decisions depend on the
  seed

Do not copy the seed into every blueprint node. A blueprint or wireframe should
reference design-system roles where needed while keeping structural hierarchy as
its primary responsibility.

## How Design System Constrains Prototype Behavior

Prototype skills should treat design-system component vocabulary as the allowed
behavior language.

Use design-system data to constrain:

- component state models: initial state, allowed states, disabled/loading/error
  behavior, validation state, and focus expectations
- interaction flows: allowed actions such as `openOverlay`, `closeOverlay`,
  `submitForm`, `navigate`, `toggleState`, and `scrollTo`
- overlays: modal vs non-modal behavior, dismissal rules, focus target, focus
  return, and keyboard behavior
- forms: required fields, validation placement, success/error state names, and
  accessibility messaging
- responsive interactions: mobile sticky bars, drawers, compact navigation, and
  touch-specific affordances
- transitions: named state changes and route changes without prescribing final
  animation craft

When the design-system seed lacks a needed state or action, record an open
question or feed the finding back into design-system foundation work. Do not
silently invent one-off prototype vocabulary.

When a `RuntimeDesignTheme` is available, prototype skills may cite
`runtimeDesignThemeRef` for visual state interpretation. Use it to identify the
tokens behind component states, status feedback, focus rings, disabled
treatments, selected treatments, loading indicators, empty states, and viewer
swatch groups. Do not copy token values into `PrototypeConfig`; keep behavior in
prototype fields and reference the runtime theme for visual theming.

## Prototype Config Over Wireframe

`PrototypeConfig` extends wireframe work by reference.

It should use:

- `source.sourceWireframeId` and `source.sourceWireframeRef`
- optional `source.sourceRuntimeDesignThemeId`,
  `source.sourceRuntimeDesignThemeRef`, and top-level `runtimeDesignThemeRef`
  when viewer-ready theme data exists
- `screen.wireframeRef`
- `nodeId`, `sourceNodeId`, `targetNodeId`, `triggerNodeId`, and related node
  reference fields
- state IDs and route IDs defined in the prototype config
- component state models and interaction flows that can be audited separately

It should not copy:

- wireframe root nodes
- section hierarchy
- component layout trees
- layout patterns
- final visual styling
- runtime theme token maps

The prototype layer owns behavior. The wireframe layer owns structure.

## Command Handoffs

Recommended command sequence:

1. `study-page` or `study-site`
2. `extract-patterns-from-study`
3. `recommend-style` when the brief needs visual direction
4. `generate-style-library` when a missing reusable style must be added
5. `apply-style-to-design-system`, `apply-style-to-section`, or
   `apply-style-to-component` when a style has been selected
6. `generate-design-system-seed`
7. `generate-runtime-design-theme` when prototype viewer, editor, or runtime
   theming needs palette/status/component-state data
8. `generate-blueprint-from-study` or `generate-blueprint-from-knowledge`
9. `generate-prototype-from-blueprint` or `generate-prototype-from-knowledge`
10. `audit-prototype-flow`
11. `explain-prototype-interactions`

Use `style-reference-curator` when a workflow needs recommendation, extraction,
generation, application, blending, patching, auditing, or style-to-seed mapping.
Use `prototype-architect` when a workflow needs to chain component state models,
interaction flows, prototype config assembly, clickable planning, and audit.

## Repository Boundary

Keep these responsibilities in this repository:

- schemas
- controlled vocabulary
- examples
- validation scripts
- skills
- commands
- agents
- interop docs
- bundle manifests and packaging

Split later only when a separate package needs to own:

- React, Vue, Svelte, or native runtime components
- a prototype player
- a visual editor
- a hosted preview service
- gesture or animation playback engines
- export to code, Figma, screenshots, or video
- a separate npm package lifecycle or release cadence

Sprint 003 keeps prototype skills here because they are part of the design
intelligence pipeline. They define behavior data and audit rules; they do not
ship a runtime.

## Readiness Checklist

Before creating `PrototypeConfig`, confirm:

- the wireframe has stable node IDs
- the design-system seed has component names, states, and accessibility rules
- runtime theming needs are either captured in `RuntimeDesignTheme` and cited
  through `runtimeDesignThemeRef`, or explicitly deferred as a viewer handoff
- selected style references, applications, blends, or patches have been audited
  for scope, intensity, preserve rules, compatibility, and accessibility risks
- mobile-specific behavior has viewport conditions
- overlays have open and close behavior
- forms have validation states
- prototype interactions can cite source screens, routes, states, and nodes

Before runtime/editor work, confirm:

- `PrototypeConfig` validates
- interaction flows have trigger, condition, action, target, and result
- state models include disabled/loading/error/success behavior where relevant
- focus and keyboard behavior are represented
- unresolved questions are either fixed or explicitly handed off
