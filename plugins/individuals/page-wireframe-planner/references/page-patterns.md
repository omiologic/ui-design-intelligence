# Page Patterns

Use these starter patterns as decision scaffolds, not fixed templates. Choose the
pattern that matches the user's decision context and remove any section that does
not support the page goal.

## Decision Heuristics

- Choose a landing-page pattern when the page has one primary conversion goal and
  the audience needs quick orientation before proof.
- Choose a product-detail pattern when the user is evaluating one item and needs
  details before related alternatives.
- Choose a service-page pattern when trust and process clarity matter more than
  browsing.
- Choose a contact-page pattern when submission, outreach, or location selection
  is the user's main task.
- Choose an app or utility pattern when repeated work, status, controls, and
  recoverable states matter more than persuasion.
- Choose a content pattern when comprehension and scanning matter more than
  conversion.
- Choose a dashboard pattern when status, diagnosis, and drilldown are the core
  task.
- Choose a transactional pattern when the user must complete booking, checkout,
  application, or account work with strong recovery paths.

## Landing Page

`header` -> `main` with `hero`, trust section, feature sections, CTA section -> `footer`

Use `centeredHero` when copy is the product; use `splitHero` when one visual
materially explains the offer.

## Product Detail Page

`header` -> `main` with product hero, details, comparison, FAQ, related cards -> `footer`

Put details before related cards so comparison does not distract from the primary
product decision.

## Service Page

`header` -> `main` with service hero, proof, process, FAQ, contact CTA -> `footer`

Place proof near the top when the service is high-consideration or local.

## Contact Page

`header` -> `main` with contact intro, form, location/details, FAQ -> `footer`

Keep the form visible before secondary content unless location choice is the
primary decision.

## App Or Utility Page

`header` -> `main` with task title/current state, primary controls, data or
results, secondary context, states, help/escalation -> `footer`

Keep time-to-action low. Empty, loading, error, disabled, and success states are
part of the page plan, not optional implementation detail.

## Content Or Article Page

`header` -> `main` with topic promise, scannable outline, ordered content,
examples/proof, related next step -> `footer`

Order content by reader comprehension. Avoid decorative conversion blocks that
interrupt the argument.

## Dashboard Page

`header` -> `main` with status summary, key metrics, filters, primary chart or
table, detail drilldowns, alerts, empty/error/loading states -> `footer`

Expose status and the next diagnostic action before dense detail.

## Transactional Page

`header` -> `main` with selected item/context, required details, payment or
scheduling, review, confirmation, support and recovery -> `footer`

Preserve context, validation, and error recovery. Do not introduce competing
exits before the transaction is complete.

## Anti-Pattern

Bad: using the landing-page pattern for every page because it feels complete.

Corrected: for a support page, use `header` -> `main` with search/help intro,
topic cards, contact escalation, FAQ -> `footer`; the hero is smaller because
the user already has a task.

Bad: using a marketing page sequence for an app settings screen.

Corrected: put current state, controls, validation states, and help first; proof
or persuasion is not the main job.

Bad: putting dashboard charts before a status summary and filters.

Corrected: lead with timeframe, status, key metrics, and controls that explain
how to read the dense chart or table.

## Worked Example

Prompt: "Plan a product page for a subscription analytics tool."

Use a product-detail flow: product hero with primary CTA, proof logos, feature
details, plan comparison, implementation FAQ, related resources, footer. The
comparison appears before FAQ because pricing choice is the central decision.

## Hand-Off

This file chooses page archetypes. Use `page-section-ordering.md` for sequence
rationale, `section-wireframe-planner` for section anatomy, and
`wireframe-schema` to produce final schema-valid JSON.
