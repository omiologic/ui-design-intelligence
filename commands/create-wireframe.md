# Create Wireframe

## Purpose

Create a user-facing wireframe artifact from a brief, study, audit, screenshot
notes, URL capture, knowledge pattern, or written requirements without requiring
the user to know the internal skill graph.

The command produces a structural wireframe plan and, when inputs are sufficient,
schema-ready UIBlueprint JSON. It follows
`shared/recipes/wireframe.recipe.md`.

## Use When

- A user asks for a wireframe, blueprint, screen structure, page structure,
  component structure, overlay plan, or flow structure.
- The source is a brief, requirements note, study output, audit finding,
  screenshot notes, URL capture, or reusable knowledge pattern.
- The desired result is structural planning, not final visual design,
  production UI code, or a clickable runtime prototype.

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

## Missing Input Questions

Ask at most three blocking questions before proceeding.

Default questions:

1. What is the artifact scope: page, screen, component, overlay, or flow?
2. Who is the primary user and what are they trying to complete?
3. What source should be treated as truth: brief, screenshot, existing page,
   study output, design-system seed, or written requirements?

Use this command-specific question when the first three do not settle the
artifact:

- What is the primary action or completion condition?

If missing information is non-blocking, proceed with explicit assumptions and
list them in `wireframe-notes.md`.

## Default Pipeline

1. Confirm scope, audience, primary goal, success action, and source truth.
2. Use study skills only when the input is observed UI, screenshot notes, URL
   capture, or raw page notes.
3. Use `blueprint-architect` to choose the narrowest useful output scope.
4. Use `page-wireframe-planner`, `section-wireframe-planner`, or
   `component-wireframe-planner` based on scope.
5. Use `layout-specification` when layout choice, density, responsive priority,
   or page section order affects the artifact.
6. Use `interaction-patterns` when forms, overlays, filters, menus, sticky UI,
   async regions, or stateful components appear.
7. Use `accessibility-wireframe-review` before final assembly when the artifact
   includes navigation, forms, overlays, state, or responsive behavior.
8. Use `generate-wireframe-config` only after planning is sufficient.
9. Produce `wireframe-notes.md` with assumptions, decisions, gaps, and handoffs.
10. Recommend `review-generated-wireframe` after output when that command is
    available.

## Stop Conditions

Stop and ask for input when:

- Artifact scope is unknown.
- Primary user or primary goal is unknown.
- Success action or completion condition is unknown.
- Required content is too vague to choose a structure or register.
- The user expects final visual design, production code, or a clickable runtime
  prototype instead of a structural wireframe.

Do not invent final copy, claims, product facts, page order, interaction states,
or responsive behavior when they are central to the artifact and unsupported by
the source.

## Outputs

- `wireframe.json`: schema-valid or schema-ready UIBlueprint JSON.
- `wireframe-notes.md`: assumptions, source summary, planning decisions, open
  questions, quality checks, and handoff notes.
- Optional `wireframe-review.md` after `review-generated-wireframe` is run.
- Optional `blueprint-lineage.md` when the wireframe is derived from study or
  knowledge records.

When no output directory is supplied, recommend:

```txt
ui-design-intelligence/
  wireframe.json
  wireframe-notes.md
```

## Quality Checks

- Scope, audience, primary goal, and success action are explicit.
- The artifact follows `shared/recipes/wireframe.recipe.md`.
- Node IDs are stable enough for later prototype planning.
- Section order supports the user journey rather than a generic template.
- Major regions have one clear primary action.
- Proof, comparison, or confidence-building content appears before commitment
  when the artifact is conversion-oriented.
- Forms, overlays, filters, async components, and data components name state and
  recovery behavior where relevant.
- Responsive notes explain priority changes, not only stacking.
- Accessibility notes cover landmarks, labels, focus, keyboard behavior, and
  error recovery where relevant.
- Structural anti-patterns are absent: decorative-only sections, CTA piles,
  card-only page structure, navigation stacks, filler labels, and dialogs
  without task control.

## Agents

- Required: `blueprint-architect`.
- Required when accessibility, state, forms, navigation, overlays, or
  responsive behavior are present: `accessibility-reviewer`.
- Optional when installed through the aggregate bundle:
  `ui-researcher`, `ui-specification-analyst`, `ui-interaction-analyst`.

## Skills

- `page-wireframe-planner`
- `section-wireframe-planner`
- `component-wireframe-planner`
- `layout-specification`
- `interaction-patterns`
- `accessibility-wireframe-review`
- `generate-ui-blueprint-from-study`
- `generate-wireframe-config`
- `wireframe-schema`
- `design-terminology`

## Example Invocation

```txt
/create-wireframe
Brief: Create a homepage wireframe for a dental practice focused on booking new
patient consultations. Audience is local adults comparing providers. Primary
action is booking an appointment. Use a conversion register.
```

Existing-artifact example:

```txt
/create-wireframe
Source: ui-design-intelligence/page-study.json
Scope: product detail page
Audience: shoppers comparing variants before adding to cart
Success action: add selected product to cart
Output directory: ui-design-intelligence/product-page-wireframe
```

## Inputs

Use `## Required Inputs` and `## Optional Inputs` as the source of truth for this
consumer command. This compatibility section exists because bundle validation
expects every installed command to expose an `Inputs` section.

## Workflow

Use `## Default Pipeline` as the source of truth for this consumer command. This
compatibility section exists because bundle validation expects every installed
command to expose a `Workflow` section.
