# Wireframe Config Generation

Generate UIBlueprint JSON as a machine-checkable contract, not prose.

## Decision Heuristics

- Use the smallest valid structure that captures the requested scope.
- Confirm the input is planned enough before assembling JSON; missing journey,
  section order, component anatomy, states, or responsive behavior belongs with
  planners, not silent generation.
- Preserve page job, section role, CTA priority, and evidence notes from the
  source plan or study translation.
- Put overlay surfaces in `overlays` when they are outside normal reading flow.
- Put inline banners and sticky bars inside `children` when they participate in
  the page flow or persistent page action.
- Add `responsive` notes only when breakpoint structure changes.
- Add `accessibility` notes for landmarks, names, focus, keyboard behavior, and
  form error behavior.
- Use annotations for assumptions, unresolved gaps, and non-obvious assembly
  logic when the target format supports them.

## Validation Gates

- Schema: required top-level fields, node nesting, overlays, responsive notes,
  and allowed field names are valid.
- Vocabulary: node types, layouts, roles, and states use approved shared tokens.
- Structure: the root exposes the requested scope and the section order follows
  the supplied plan.
- Interaction: overlays, forms, sticky actions, and stateful components retain
  trigger, dismissal, feedback, and state notes.
- Accessibility: landmarks, labels, focus behavior, keyboard behavior, and form
  feedback are present where relevant.
- Responsive: mobile and tablet notes preserve required content and primary
  actions instead of only saying "stacks".

## Anti-Pattern

Bad: adding custom fields like `columns`, `visualStyle`, or `priority`.

Corrected: express structure with approved nodes and use `layout`, `role`,
`state`, `responsive`, `accessibility`, and `annotations` for schema-compatible
meaning.

Bad: returning schema-valid JSON where every section is a generic card grid and
the page's actual job is not visible.

Corrected: preserve the planned section jobs, CTA cadence, repeated structures,
and responsive priority before validating mechanical schema shape.

Bad: using generation to invent missing page order from a short brief.

Corrected: hand off unresolved page journey to `page-wireframe-planner` and
assemble JSON only after the plan is settled.

## Worked Example

For a simple section request, generate a full wireframe wrapper with a `page`
root, one `main`, and the requested `section` inside `main`. This keeps the file
schema-valid while preserving the requested section scope.

For a pricing page plan with a signup dialog, keep pricing sections in page
order under `root.children`, place the dialog in `overlays`, include trigger and
focus notes, and describe mobile comparison behavior in `responsive`.

## Hand-Off

Use `wireframe-schema` for schema interpretation, `design-terminology` for token
normalization, `page-wireframe-planner` for unsettled page sequence,
`component-wireframe-planner` for missing component anatomy, and
`validate-examples.mjs` to prove JSON validity.
