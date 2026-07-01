# Prototype Plan Artifact Recipe

## Artifact Purpose

Create a prototype behavior plan and structured `PrototypeConfig` from an
existing wireframe or blueprint. The recipe defines screens, routes,
interactions, states, focus behavior, responsive conditions, and runtime
handoff notes without implementing a clickable runtime.

Use this recipe when a user asks for a prototype plan, prototype config,
clickable prototype handoff, interaction plan, or behavior map.

## Required Inputs

- Source wireframe, blueprint, or design specification.
- Stable node IDs for screens, sections, components, and interactive targets.
- Key user flows.
- State requirements for forms, overlays, menus, navigation, async regions, or
  other interactive components.
- Viewport or device requirements when behavior changes responsively.

## Optional Inputs

- `design-system-seed.json` or `design-spec.md`.
- Existing component state model or interaction flow.
- Accessibility requirements.
- Runtime target or implementation framework.
- Motion constraints.
- Output directory.

## Default Pipeline

1. Confirm source wireframe exists and node IDs are stable.
2. Identify screens, routes, overlays, forms, menus, async regions, and
   navigational targets.
3. Generate or refine component state models for interactive nodes.
4. Generate interaction flows for click, tap, keyboard, submit, validation,
   overlay, navigation, and recovery behavior.
5. Assemble `PrototypeConfig` with explicit references back to wireframe node
   IDs and optional design-system seed components.
6. Write `prototype-plan.md` as the human runtime handoff.
7. Audit prototype interactions for missing focus, state, route, recovery, and
   responsive behavior.

## Outputs

- `prototype-config.json`: structured prototype behavior config.
- `prototype-plan.md`: human-readable clickable prototype plan and runtime
  handoff notes.
- Optional `component-state-model.json`.
- Optional `interaction-flow.json`.
- Optional `prototype-audit.md`.

## Required Sections Or Fields

`prototype-plan.md` should include:

- Source artifacts.
- Scope and assumptions.
- Screens and routes.
- Interactive node map.
- Primary flows.
- Component states.
- Overlay and modal behavior.
- Form validation and recovery.
- Navigation behavior.
- Keyboard and focus behavior.
- Responsive behavior.
- Runtime boundary.
- Open questions.
- Handoff.

`prototype-config.json` should include:

- Source wireframe references.
- Screens and route map.
- Interactive targets by node ID.
- State models or references.
- Interaction flows or references.
- Accessibility and focus behavior where relevant.
- Responsive conditions where relevant.

## Quality Gates

- Every interaction target references a stable source node ID.
- Routes, overlays, forms, menus, and async regions have explicit state
  behavior.
- Overlay behavior includes open, close, escape, outside-click policy, focus
  trap, and focus return when relevant.
- Forms define validation, disabled, error, success, recovery, and resubmission
  behavior where relevant.
- Keyboard behavior covers focus order, activation, escape, and submit actions.
- Responsive conditions state which interactions change, move, collapse, or
  disappear.
- Runtime boundary is clear: the artifact plans behavior but does not implement
  a prototype viewer.

## Stop Conditions

Stop and ask for input when:

- Source wireframe or blueprint is missing.
- Stable node IDs are missing for interactive targets.
- Key flows are unknown.
- State, route, overlay, or focus targets cannot be referenced.
- The user expects runtime implementation, rendered UI, or a clickable app
  instead of a behavior plan.

Ask no more than three blocking questions before proceeding with documented
assumptions for non-blocking gaps.

## Repair Guidance

- If node references are missing, repair the source wireframe before writing
  prototype behavior.
- If flows are vague, name actor, trigger, source node, destination state,
  feedback, failure path, and recovery path.
- If overlay behavior is incomplete, add close policy, focus trap, focus return,
  scroll lock, and keyboard behavior.
- If form behavior is incomplete, add validation timing, error placement,
  disabled states, success behavior, and retry or edit paths.
- If runtime scope is unclear, separate prototype config, clickable plan, and
  implementation work into distinct handoffs.

## Handoffs

- To implementation: pass `prototype-config.json`, `prototype-plan.md`, source
  wireframe, design spec, and unresolved questions.
- To audit: pass the prototype config and plan to `audit-prototype-flow`.
- Back to `create-wireframe`: pass any missing node IDs, structural gaps, or
  unreferenceable interactive targets.
