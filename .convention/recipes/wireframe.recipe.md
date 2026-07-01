# Wireframe Artifact Recipe

## Artifact Purpose

Create a structural wireframe artifact that is useful before visual design or
implementation. The recipe produces a schema-ready UIBlueprint plus short notes
that explain assumptions, decisions, unresolved gaps, and downstream handoffs.

Use this recipe when a user asks for a wireframe, blueprint, page structure,
screen plan, component structure, or flow structure.

## Required Inputs

- Artifact scope: page, screen, component, overlay, or flow.
- Audience or primary user type.
- Primary user goal.
- Success action or completion condition.
- Source truth: brief, study, audit, screenshot notes, URL capture, knowledge
  pattern, or requirements note.

## Optional Inputs

- Existing page or site study.
- Design-system seed or style reference.
- Known content inventory.
- Target register or taste profile.
- Accessibility, SEO, conversion, or implementation constraints.
- Output directory.

## Default Pipeline

1. Confirm scope, audience, primary goal, success action, and source truth.
2. Run study or audit interpretation only when the input is observed UI or raw
   page notes.
3. Choose the planner by scope: page, section, component, overlay, or flow.
4. Select layout patterns, hierarchy density, and responsive priorities.
5. Add interaction and state requirements for forms, filters, overlays, menus,
   sticky UI, async states, and recovery paths.
6. Add accessibility notes for landmarks, focus order, labels, keyboard access,
   error handling, and reduced-motion or responsive behavior.
7. Assemble schema-ready UIBlueprint JSON with stable node IDs.
8. Produce notes that list assumptions, open questions, quality checks, and
   suggested next artifact.

## Outputs

- `wireframe.json`: schema-valid or schema-ready UIBlueprint JSON.
- `wireframe-notes.md`: assumptions, source summary, planning decisions, open
  questions, and handoff notes.
- Optional `wireframe-review.md` after running the quality review workflow.

## Required Sections Or Fields

`wireframe-notes.md` should include:

- Source and assumptions.
- Scope and audience.
- Primary goal and success action.
- Structural strategy.
- Interaction and state notes.
- Responsive priorities.
- Accessibility notes.
- Open questions.
- Handoff.

`wireframe.json` should include:

- Stable IDs for all referenceable nodes.
- Explicit page, section, component, or flow hierarchy.
- Node roles and content roles from shared vocabulary where possible.
- Interaction states when behavior matters.
- Responsive notes when priority or layout changes.

## Quality Gates

- Scope, audience, goal, and success action are explicit.
- The structure has one clear primary action per major region.
- Section order supports the user journey instead of mirroring generic page
  templates.
- Proof, comparison, or confidence-building content appears before commitment
  when the artifact is conversion-oriented.
- Stateful components name empty, loading, error, validation, success, and
  recovery behavior where relevant.
- Responsive priorities explain what collapses, hides, pins, or changes order.
- Accessibility notes cover landmarks, labels, focus, keyboard, and error
  recovery where relevant.
- Structural anti-patterns are avoided: decorative-only sections, CTA piles,
  card-only page structure, navigation stacks, dialog without task control, and
  filler labels.

## Stop Conditions

Stop and ask for input when:

- The artifact scope is unknown.
- The primary user or primary goal is unknown.
- The success action or completion condition is unknown.
- Required content is too vague to choose a structure or register.
- The user expects final visual design, production code, or a clickable runtime
  instead of a structural wireframe.

Ask no more than three blocking questions before proceeding with documented
assumptions for non-blocking gaps.

## Repair Guidance

- If the artifact is schema-invalid, repair IDs, node types, required fields,
  and vocabulary first.
- If the journey is weak, rewrite section order around the user's decision path
  before adding detail.
- If the wireframe feels generic, replace decorative or filler regions with
  evidence, decision support, task controls, or recovery paths.
- If interactions are underspecified, add trigger, state, result, focus, and
  recovery notes before prototype planning.
- If responsive behavior is vague, define desktop, tablet, and mobile priority
  changes for the major regions.

## Handoffs

- To `create-design-spec`: pass `wireframe.json`, `wireframe-notes.md`, source
  assumptions, and any design-system seed or style reference.
- To `review-generated-wireframe`: pass `wireframe.json`, the original brief,
  and `wireframe-notes.md`.
- To `create-prototype-plan`: pass `wireframe.json` with stable node IDs,
  interaction notes, and known viewport requirements.
