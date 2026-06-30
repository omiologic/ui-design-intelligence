# Page Section Ordering

Order sections by user decision flow, not by a decorative template. A strong page
answers four questions in sequence: where am I, why should I care, can I trust
this, and what should I do next?

## Decision Heuristics

1. Lead with orientation: use `header`, optional `breadcrumb`, and one `hero`
   that names the page promise and primary action.
2. Place proof before detail when the claim is high stakes, expensive, medical,
   financial, unfamiliar, or trust-sensitive.
3. Place detail before proof when the user first needs to understand the offer,
   workflow, pricing model, or eligibility.
4. Repeat CTAs only after the page has introduced new decision evidence. Do not
   stack CTA sections without adding proof, comparison, FAQ, or process context.
5. Use sticky CTAs only when the primary action remains relevant throughout the
   page, such as booking, checkout, contact, or applying.
6. End with closure: `footer`, support links, legal copy, or contact details that
   reduce anxiety after the main action.
7. For utility and dashboard pages, lead with current state, controls, and
   diagnostic priority instead of a marketing hero.
8. For form and transactional pages, preserve context, validation, review,
   confirmation, and recovery in the sequence.

## Proof Placement

- Use early proof directly after the hero for trust-heavy offers.
- Use proof after benefits for low-risk products where value is obvious.
- Use comparison before FAQ when the user must choose among plans, products, or
  service levels.
- Use FAQ near the end to remove objections before the final action.

## CTA Frequency

Use one primary CTA in the hero, one after the strongest proof or detail block,
and one final CTA near the end for long pages. Short pages may need only the hero
CTA. A sticky CTA can replace repeated CTA sections on mobile.

## Page-Level Preflight

- The primary user goal and success action are named.
- The first viewport or first task region orients the user.
- Each section changes what the user understands, trusts, compares, can do, or
  can recover from.
- CTA repetition follows new evidence, not decorative rhythm.
- Page-level forms, filters, tables, overlays, and sticky UI have handoff notes.
- Mobile order preserves primary action and recovery paths.
- Open assumptions are explicit before final JSON assembly.

## Anti-Pattern

Bad: `hero` -> decorative logo strip -> generic feature grid -> CTA -> another
CTA -> FAQ.

Corrected: `hero` -> proof section -> benefit sections -> comparison or process
section -> FAQ -> final CTA. Each action follows new evidence.

Bad: every section has equal density and an identical card grid, so users cannot
tell what matters first.

Corrected: vary section weight based on the decision path: orientation, proof,
detail, comparison, recovery, and action.

Bad: a mobile plan copies desktop order and moves support or recovery below
unrelated content.

Corrected: move recovery, validation, and primary action closer to the relevant
mobile task step.

## Worked Example

For "book a dental consultation", order the page as:

`header` -> `main` with `hero`, trust proof, services overview, process, FAQ,
contact form, sticky booking bar -> `footer`.

The trust proof appears before detailed services because healthcare decisions
require confidence before comparison. The contact form appears after FAQ because
the user should not have to commit before common concerns are answered.

## Hand-Off

This reference decides page-level sequence only. Use `section-wireframe-planner`
to design the internal anatomy of a section, `layout-specification` to choose
layout names and responsive behavior, and `interaction-patterns` for overlays,
forms, sticky bars, and state behavior.
