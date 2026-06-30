# Study To Blueprint

Convert study findings into UIBlueprint structure by preserving observed user
journey, evidence, and interaction behavior.

## Decision Heuristics

- Use `page` output when the study describes a full route or screen.
- Use `section` output when findings focus on one page band such as hero, FAQ,
  proof, comparison, or form.
- Use `component` output when findings describe one reusable card, dialog, form,
  navigation block, or disclosure pattern.
- Preserve proof placement and CTA sequence from the study unless the study
  identifies them as audit problems.
- Convert observed interaction behavior into approved states and overlay nodes.
- Translate observed page purpose, journey order, and content hierarchy before
  choosing layout patterns.
- Treat responsive, accessibility, and interaction findings as structural
  constraints, not optional notes.
- Carry uncertainty forward when the study does not settle a section order,
  component anatomy, state, or breakpoint behavior.

## Evidence Rules

- Map each major node to a study finding, observed page region, or required
  structural convention.
- Separate observed facts, interpretations, and assumptions before generating
  structure.
- Use approved vocabulary for node types, roles, layouts, and states; hand off
  ambiguous terminology instead of copying unclear study wording.
- Do not invent copy, proof, pricing, page claims, or journey steps that the
  study did not observe or the user did not supply.
- Preserve study uncertainty in annotations, assumptions, or planner handoffs.

## Anti-Pattern

Bad: turning every study into a generic landing page with hero, cards, FAQ, and CTA.

Corrected: preserve the studied page's decision logic. If proof appears before
service details because trust is the blocker, keep proof early in the blueprint.

Bad: flattening interaction findings into static nodes and losing open, error,
loading, disabled, or success states.

Corrected: map observed behavior into approved interaction states and add
accessibility notes for focus, keyboard behavior, labels, and recovery.

Bad: silently filling missing page order with a familiar section sequence.

Corrected: mark the missing order as an assumption or hand it to
`page-wireframe-planner`.

## Worked Example

A dental homepage study says the hero promises same-week appointments, reviews
appear before service details, and FAQ appears before the contact form. Generate
`page` -> `header`, `main` with `hero`, proof `section`, service `section`, FAQ
`section`, contact `section`, optional booking `stickyBar`, then `footer`.

Inline traceability:

- Hero promise evidence -> `hero` with headline, body, and one `primaryCTA`.
- Reviews before service detail -> proof `section` before service `section`.
- FAQ before contact form -> FAQ `section` before contact `form`.
- Mobile sticky booking evidence -> `stickyBar` plus responsive mobile note.
- Unknown comparison placement -> planner handoff instead of invented section
  order.

## Hand-Off

Use `generate-wireframe-config` to finalize schema-valid JSON, `page-wireframe-planner`
for page ordering gaps, and `accessibility-wireframe-review` for focus, landmark,
and form notes.
