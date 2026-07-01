# Design Spec Artifact Recipe

## Artifact Purpose

Create a design specification that turns product context, design-system
assumptions, wireframe decisions, and interaction requirements into a practical
implementation handoff. The spec should explain what to build, what is inferred,
what remains open, and where implementation should not guess.

Use this recipe when a user asks for a design spec, UI specification, product UI
handoff, component behavior spec, or implementation-ready design notes.

## Required Inputs

- Product or project context.
- Target scope: page, screen, component, flow, or feature area.
- Intended implementation audience.
- Brand, design-system seed, style reference, existing UI source, or explicit
  permission to generate seed-level recommendations.
- Wireframe decisions, blueprint output, or enough structure to define layout,
  components, states, and responsive behavior.

## Optional Inputs

- `wireframe.json` and `wireframe-notes.md`.
- `design-system-seed.json` or `design-system-seed.md`.
- Style reference, style application, or taste profile.
- Accessibility notes.
- Target platform, framework, component library, or token constraints.
- Content inventory and localization requirements.
- Output directory.

## Default Pipeline

1. Confirm implementation audience, artifact scope, source truth, and allowed
   inference level.
2. Generate or reuse a design-system seed when brand, token, component, or
   accessibility assumptions are required.
3. Treat wireframe decisions as the structural source of truth.
4. Map layout regions to component responsibilities, states, content roles, and
   responsive behavior.
5. Document interaction and state behavior for forms, dialogs, menus, filters,
   navigation, async regions, empty states, and errors.
6. Label inferred recommendations with confidence and source provenance.
7. Write the Markdown spec first; emit JSON only when a downstream consumer
   needs structured data.
8. Run a handoff check for ambiguity, missing states, inaccessible behavior, and
   implementation-risk gaps.

## Outputs

- `design-spec.md`: primary human-readable implementation specification.
- Optional `design-spec.json`: structured summary when a downstream tool needs
  machine-readable fields.
- Optional supporting artifacts: `design-system-seed.json`,
  `style-application.json`, or `wireframe-review.md`.

## Required Sections Or Fields

`design-spec.md` should include:

- Summary.
- Source provenance and confidence.
- Goals and non-goals.
- Scope and implementation audience.
- Design-system assumptions.
- Layout and information architecture.
- Components and variants.
- States and interactions.
- Responsive behavior.
- Accessibility requirements.
- Content requirements.
- Implementation notes.
- Open questions.
- Validation checklist.
- Handoff.

`design-spec.json`, when emitted, should include:

- Scope.
- Sources and assumptions.
- Component inventory.
- State inventory.
- Responsive requirements.
- Accessibility requirements.
- Open questions.
- Handoff targets.

## Quality Gates

- The spec names source truth and labels inferred guidance.
- Component vocabulary is consistent with the design-system seed or explicit
  local naming.
- Each interactive component has trigger, state, feedback, and recovery notes.
- Responsive behavior explains priority changes, not only breakpoints.
- Accessibility requirements are implementation-facing and testable.
- Content requirements distinguish required copy from placeholder copy.
- Open questions are concrete and decision-oriented.
- Implementation notes avoid pretending seed-level recommendations are a
  governed production design system.

## Stop Conditions

Stop and ask for input when:

- Implementation audience is unknown.
- Source of brand, design-system, or style truth is unknown and inferred
  recommendations are not allowed.
- There is not enough structure to name layout regions or components.
- The user expects production UI-kit governance, final visual design, or code
  implementation rather than a design specification.

Ask no more than three blocking questions before proceeding with documented
assumptions for non-blocking gaps.

## Repair Guidance

- If source provenance is weak, add confidence labels and separate observed
  facts from recommendations.
- If component naming drifts, normalize names against the design-system seed or
  local component vocabulary.
- If the spec is too visual and vague, rewrite sections around buildable layout,
  components, states, and content requirements.
- If states are missing, add empty, loading, error, validation, success,
  disabled, active, hover, focus, and selected behavior where relevant.
- If implementation risk is high, convert vague notes into open questions or
  explicit non-goals.

## Handoffs

- To `create-wireframe`: pass source assumptions and any structural gaps that
  require a new or revised wireframe.
- To `create-prototype-plan`: pass `design-spec.md`, `wireframe.json`, stable
  node IDs, component states, and responsive behavior.
- To implementation: pass the spec, supporting design-system seed, wireframe,
  open questions, and validation checklist.
