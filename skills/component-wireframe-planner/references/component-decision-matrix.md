# Component Decision Matrix

Use this matrix to decide what a component must expose before it is handed to a
page planner or JSON generator. A component is complete when its structure makes
the user's possible actions, states, feedback, and accessibility contract clear
without relying on final visual design.

## Decision Heuristics

- Start with the user action the component owns. Anatomy follows the action, not
  the visual box.
- Add child nodes only when they carry a role, state, action, data dependency, or
  accessibility relationship.
- Add states when the user sees different content, makes a different decision, or
  needs different feedback.
- Keep page-owned sequencing outside the component. A component can declare
  required inputs and outputs, but the page decides where it sits in the journey.
- Prefer one stable anatomy with named variants over several slightly different
  copies of the same component.

## Component To Required States

| Component | Required Structural Questions | States To Consider | Why |
| --- | --- | --- | --- |
| `form` | What fields are required, how are errors shown, where does submit feedback go? | default, focus, disabled, loading, success, error | Input can fail, wait, or recover |
| `inputGroup` | What label, helper, requirement, and error relationship exists? | default, focus, error, disabled | Users need meaning before entering data |
| `button` | What action does it perform and when is it unavailable? | default, disabled, loading, active | Controls must explain action and wait states |
| `card` | What item is represented and what action or selection changes it? | default, selected, unavailable, loading | Cards are often read-only unless they select or navigate |
| `dialog` | What trigger opens it, what blocks, what closes, where does focus return? | closed, open, loading, error | Blocking surfaces need a complete focus and recovery model |
| `drawer` | What secondary task does it contain and how does it preserve page context? | closed, open, loading, error | Side workflows must remain returnable |
| `tabs` | What panels are peers and how is the active panel identified? | selected, default | Hidden peer content must remain navigable |
| `accordion` | What content can expand independently and what remains visible collapsed? | expanded, collapsed | Disclosure should not hide the primary task |
| `table` / list | What happens with no data, slow data, failed data, filters, or selection? | loading, empty, error, selected, default | Data components are incomplete without non-happy paths |

## Anatomy Rubric

For each component, define:

1. Container type and label.
2. Required child nodes and repeated item structure.
3. Controls and their roles.
4. State-dependent feedback areas.
5. Accessibility relationships: labels, descriptions, focus, and keyboard notes.
6. Parent inputs and child outputs.
7. Responsive notes only when the component changes priority, order, or access.

## Anti-Pattern

Bad: a reusable product card has image, title, price, description, badge, rating,
wishlist, compare, quantity, add-to-cart, delivery estimate, and promo copy in
every instance because one page needed all of them.

Corrected: define stable slots for media, name, primary metadata, primary action,
and optional secondary controls. Require variants for commerce-specific actions
instead of making the base card carry every page concern.

## Worked Example

Input: "Filter drawer for mobile product results."

Output: `drawer` with a labeled trigger, open and closed states, heading, filter
groups, apply and clear actions, loading state for result counts, error state
when filters fail to apply, focus trap while open, Escape or close-button
dismissal, and return focus to the trigger.

## Hand-Off

Use this matrix before `generate-wireframe-config`. Hand off overlay behavior to
`interaction-patterns`, accessibility review to `accessibility-wireframe-review`,
and section placement to `section-wireframe-planner`.
