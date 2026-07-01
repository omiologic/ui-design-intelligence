# Create Design Spec

## Purpose

Create an implementation-ready structural design specification from product
context, design-system seed evidence, style constraints, wireframe decisions,
and accessibility notes without requiring the user to know the internal skill
graph.

The command produces `design-spec.md` by default and optional `design-spec.json`
when a downstream consumer needs structured fields. It follows
`.convention/recipes/design-spec.recipe.md`.

## Use When

- A user asks for a design spec, UI specification, implementation handoff,
  product UI spec, component behavior spec, or structural design notes.
- The project has a brief, study, wireframe, design-system seed, style
  reference, screenshot notes, URL capture, or requirements note.
- The desired result is a buildable specification, not final UI-kit governance,
  final visual design, production code, or a runtime prototype.

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

## Missing Input Questions

Ask at most three blocking questions before proceeding.

Default questions:

1. What is the spec scope: page, screen, component, flow, or feature area?
2. Who will implement this spec: frontend engineer, designer, agent, or another
   consumer?
3. What source should be treated as design truth: design-system seed, existing
   UI, screenshot, style reference, wireframe, or written requirements?

Use this command-specific question when source truth remains unclear:

- Is there an existing brand/design-system source, or should this command make
  seed-level recommendations with confidence notes?

If missing information is non-blocking, proceed with explicit assumptions and
label inferred recommendations in `design-spec.md`.

## Default Pipeline

1. Confirm implementation audience, artifact scope, source truth, and allowed
   inference level.
2. Use `design-system-architect` to reuse or generate a seed when brand, token,
   component, or accessibility assumptions are needed.
3. Use style-reference workflows only when the user supplies style input or asks
   for visual direction to constrain the spec.
4. Use wireframe decisions or blueprint output as the structural source of
   truth when available.
5. Map layout regions to component responsibilities, variants, states, content
   roles, and responsive behavior.
6. Add interaction and state behavior for forms, dialogs, menus, filters,
   navigation, async regions, empty states, validation, and errors.
7. Add accessibility requirements as testable implementation constraints.
8. Label inferred guidance with source provenance and confidence.
9. Write `design-spec.md` first; emit `design-spec.json` only when requested or
   needed by a downstream workflow.
10. Run a handoff check for ambiguity, missing states, inaccessible behavior,
    unresolved source truth, and implementation-risk gaps.

## Stop Conditions

Stop and ask for input when:

- Implementation audience is unknown.
- Source of brand, design-system, or style truth is unknown and inferred
  recommendations are not allowed.
- There is not enough structure to name layout regions, components, states, or
  responsive behavior.
- Component vocabulary is too weak to specify reusable behavior honestly.
- The user expects production UI-kit governance, final visual design,
  production code, or a clickable prototype instead of a structural design spec.

Do not invent governed tokens, final copy, production component APIs, or product
facts when source evidence is weak. Record those as assumptions or open
questions.

## Outputs

- `design-spec.md`: primary implementation specification.
- Optional `design-spec.json`: structured scope, sources, component inventory,
  state inventory, responsive requirements, accessibility requirements, open
  questions, and handoff targets.
- Optional `design-system-seed.json` and `design-system-seed.md` when no trusted
  seed exists and seed-level recommendations are allowed.
- Optional `style-application.json` when style-reference work is explicitly in
  scope.

When no output directory is supplied, recommend:

```txt
ui-design-intelligence/
  design-spec.md
  design-spec.json
```

## Quality Checks

- The artifact follows `.convention/recipes/design-spec.recipe.md`.
- Source provenance is explicit and inferred recommendations are labeled.
- Goals, non-goals, scope, and implementation audience are named.
- Layout and information architecture are buildable from the available source.
- Component names, variants, and responsibilities are consistent with the seed
  or local vocabulary.
- Interactive components include trigger, state, feedback, validation, error,
  success, and recovery behavior where relevant.
- Responsive behavior explains priority changes, not only breakpoints.
- Accessibility requirements are testable and implementation-facing.
- Content requirements separate required copy from placeholders.
- Open questions are concrete enough to unblock a later revision.

## Agents

- Required: `design-system-architect`.
- Optional when installed through a broader bundle: `blueprint-architect`,
  `style-reference-curator`, `accessibility-reviewer`.

## Skills

- `generate-design-system-seed`
- `extract-brand-foundation`
- `extract-palette-foundation`
- `extract-typography-foundation`
- `extract-iconography-foundation`
- `generate-button-foundation`
- `generate-card-foundation`
- `generate-header-foundation`
- `generate-footer-foundation`
- `audit-design-system-completeness`
- `audit-design-system-naming`
- `audit-design-system-consistency`
- Optional adjacent skills: `generate-wireframe-config`,
  `accessibility-wireframe-review`, style-reference skill family.

## Example Invocation

```txt
/create-design-spec
Context: New patient booking homepage for a dental practice.
Scope: Homepage and booking CTA flow.
Implementation audience: frontend engineer.
Source truth: use ui-design-intelligence/wireframe.json and generate seed-level
design-system recommendations from the brief.
Output directory: ui-design-intelligence/dental-homepage-spec
```

Existing-artifact example:

```txt
/create-design-spec
Wireframe: ui-design-intelligence/product-page/wireframe.json
Design system seed: ui-design-intelligence/design-system-seed.json
Audience: agent implementing a responsive ecommerce product page.
Include components, states, accessibility, responsive behavior, and open
questions.
```

## Inputs

Use `## Required Inputs` and `## Optional Inputs` as the source of truth for this
consumer command. This compatibility section exists because bundle validation
expects every installed command to expose an `Inputs` section.

## Workflow

Use `## Default Pipeline` as the source of truth for this consumer command. This
compatibility section exists because bundle validation expects every installed
command to expose a `Workflow` section.
