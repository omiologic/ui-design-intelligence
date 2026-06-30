# Section Severity And Remediation

Use this reference to turn section-level observations into prioritized findings.
A section is healthy when its role is clear, its content supports that role, its
density matches the decision, and it transitions cleanly to neighboring content.

## Decision Heuristics

- Start with the section job: orient, explain, prove, compare, collect input,
  answer objections, support navigation, or move to action.
- Judge completeness against the job, not against a generic section template.
- Check local hierarchy: heading, supporting copy, proof, controls, repeated
  items, and next action should not compete for the same priority.
- Check density: equal-weight cards, overloaded feature grids, and decorative
  blocks often hide weak structure.
- Check adjacency: the section should make sense after the previous section and
  set up the next step without acting like a full page.
- Keep findings scoped to the section. Use a page audit when the problem is
  sequence, CTA cadence, or navigation outside the section.

## Severity Model

| Severity | Use When | Example |
| --- | --- | --- |
| `critical` | The section blocks or invalidates a primary page task by itself | Required checkout form section has no usable submit or recovery path |
| `high` | The section's role, action, or required content is missing in a primary workflow | Contact section has form fields but no labels, submit action, or error path |
| `medium` | The section can work but hierarchy, density, proof, labels, or responsive order create likely friction | Feature grid uses equal cards for unrelated benefits and proof |
| `low` | The section is understandable but handoff detail, reuse boundary, or labels are weak | FAQ answers exist but section dependency notes are missing |
| `info` | Contextual observation with no corrective action | Strong reusable section pattern worth preserving |

## Section Audit Checks

- Role: one dominant job is identifiable.
- Completeness: heading, support, proof/input/action, and state needs match the
  section job.
- Hierarchy: the most important content is structurally first or clearly grouped.
- Density: the amount of content fits the decision being made.
- Repetition: repeated cards, FAQ items, or form fields stay comparable unless a
  variant is declared.
- Interaction: accordions, tabs, forms, overlays, and sticky controls include
  state, feedback, and dismissal where relevant.
- Accessibility: headings, labels, controls, and focus-sensitive content are
  represented enough for handoff.
- Responsive behavior: mobile preserves required information and action priority.

## Remediation Patterns

| Issue | Typical Severity | Structural Fix |
| --- | --- | --- |
| Anonymous section | medium to high | Rename and restructure around one job |
| Decorative block with no content role | low to medium | Remove it or assign a real role tied to the journey |
| Equal cards flatten hierarchy | medium | Split proof, features, metadata, or actions into distinct groups |
| FAQ answers are vague or unlabeled | low to medium | Add clear question labels and answer content |
| Form section lacks recovery states | high | Add labels, helper text, error states, loading, success, and submit feedback |
| Comparison section hides deciding attributes | medium to high | Use a table or structured comparison with explicit criteria |
| Mobile stack buries primary action | high | Reorder or preserve the action in mobile notes |

## Anti-Pattern

Bad: "The section feels weak."

Corrected: "`features.section` uses six equal cards containing unrelated proof,
benefits, and CTAs. This is medium severity because users cannot tell which
benefits matter or what proof supports the claim. Split testimonials into a proof
section, keep feature cards comparable, and place one primary CTA after the
section's strongest evidence."

## Worked Example

```json
{
  "id": "feature-section-mixes-proof-and-actions",
  "title": "Feature cards mix unrelated roles",
  "severity": "medium",
  "category": "structure",
  "target": "features.section",
  "evidence": "Each card includes a feature, testimonial quote, badge, metadata, and CTA, making all items equal weight despite different roles.",
  "impact": "Users cannot scan the feature set or understand which proof supports the claim, reducing section clarity.",
  "recommendation": "Keep the feature grid to comparable feature cards, move testimonials into a proof section, and place one section-level CTA after the grid.",
  "handoff": "section-wireframe-planner"
}
```

## Hand-Off

Use `section-wireframe-planner` for section restructuring, `component-wireframe-planner`
for repeated cards, forms, accordions, or tabs, `generate-interaction-audit-report`
for stateful behavior, `generate-accessibility-audit-report` for accessibility
risk, and `generate-page-audit-report` when the issue depends on page sequence or
CTA cadence.
