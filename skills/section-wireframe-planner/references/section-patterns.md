# Section Patterns

Build sections around the decision they need to support. A section should have a
single job: orient, persuade, compare, collect input, disclose detail, or move
the user to action.

## Decision Heuristics

- Start by naming the section job: orient, prove, compare, explain, collect
  input, answer objections, navigate, recover, or move to action.
- Use `hero` when the section introduces the page or a major offer.
- Use `section` with `cardGrid` when items are peers and should be scanned.
- Use `comparisonTable` when rows or attributes decide the choice.
- Use `accordion` when content answers objections that do not all need to be
  visible at once.
- Use `form` only when collecting input is the section's main task.
- Use `buttonGroup` when actions are alternatives; use a single `button` when
  there is one obvious next step.
- Add responsive notes when the section's job changes through stacking,
  disclosure, dense data, or hidden controls.

## Hero

Use `hero` with heading, paragraph, buttonGroup, and optional media placeholder.
The media/proof region must have a decision role; otherwise keep the hero
focused and simpler.

## Feature Grid

Use `section` containing `cardGrid`; each feature is a `card` with heading and
paragraph.
Use only when items are peers. If one feature carries the main decision, promote
it or split it into a separate detail/proof section.

## FAQ

Use `section` containing `accordion`; each item should have a question label and
answer content.
Include an escalation path or helper text when the answers resolve high-friction
objections such as pricing, eligibility, support, or risk.

## Comparison

Use `section` containing `comparisonTable` or a `cardGrid` when the comparison is
lightweight.

## Form Section

Use `section` containing textBlock plus `form` with grouped inputs.
Include labels, helper/error placement, submit action, and relevant loading,
error, disabled, and success states.

## CTA Section

Use a CTA section only when the page has added new evidence since the last
primary action. Include one dominant action, a supporting reason, and a clear
continuation target.

## Navigation Section

Use navigation sections when local wayfinding is the section's job. Include
scope, labels, selected/current state, and responsive behavior.

## Anti-Pattern

Bad: a feature section where every `card` contains a heading, paragraph, button,
image, testimonial, badge, and metadata.

Corrected: split the content into a `cardGrid` for features and a separate proof
`section` for testimonials. Cards should stay comparable when they are presented
as a set.

Bad: a decorative divider section with a vague label such as "Experience" and no
content role.

Corrected: remove it or give it a clear job such as proof, comparison, process,
or objection handling.

Bad: a reusable CTA section that hard-codes final page navigation and competes
with page-level CTA cadence.

Corrected: define the CTA anatomy locally and hand off cadence and placement to
`page-wireframe-planner`.

## Worked Example

For "FAQ section about pricing", use:

`section` -> `heading`, `paragraph`, `accordion`

Each accordion item uses a clear question label and answer content. Do not use a
`cardGrid` because the user is resolving objections, not comparing peers.

## Hand-Off

This skill shapes one section. Use `page-wireframe-planner` for ordering across
the full page, `component-wireframe-planner` for reusable component anatomy, and
`layout-specification` for responsive layout naming.
