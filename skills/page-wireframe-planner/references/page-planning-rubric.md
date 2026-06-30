# Page Planning Rubric

Use this rubric before choosing sections. A page plan should expose the user's
decision path, not just list common page blocks.

## Core Principle

The page job and user journey come first. Section order should answer what the
user needs to know, believe, compare, do, and recover from. A conventional order
is acceptable only when you can state why it supports the task.

## Page Planning Inputs

- Page type and route or screen context.
- Audience and primary user goal.
- Success action or continuation path.
- Decision friction: risk, cost, trust, time, complexity, urgency, or regulation.
- Required proof, comparison, eligibility, pricing, process, or support.
- Primary CTA and secondary actions.
- Required forms, filters, overlays, sticky UI, or stateful components.
- Desktop, tablet, and mobile priority.
- Accessibility and recovery expectations.

## Page-Type Decisions

| Page Type | Primary Job | Typical Sequence | Planning Risks |
| --- | --- | --- | --- |
| Marketing or landing | Orient, prove, persuade, convert | Hero, proof, benefits, comparison/process, objections, CTA | Asking for action before credibility; generic feature grids. |
| Product detail | Help users evaluate one item | Product hero, options, proof, details, comparison, FAQ, related items | Related content distracting from the main product decision. |
| Service page | Build trust and explain process | Service promise, proof, scope, process, eligibility/payment, FAQ, contact | Proof too late; contact before concerns are resolved. |
| App or utility workflow | Help users complete repeated work | Current state, primary controls, data/results, secondary context, states, help | Explanation displacing the task; missing empty/error states. |
| Content or article | Help readers understand or decide | Topic promise, scannable outline, ordered content, examples/proof, next step | Decorative sections interrupting comprehension. |
| Form or application | Collect input with confidence | Orientation, eligibility, grouped fields, helper/error feedback, review/submit, confirmation | Long ungrouped forms; missing recovery and validation states. |
| Dashboard or monitoring | Surface status and enable diagnosis | Summary status, key metrics, filters, primary table/chart, details, alerts, drilldowns | Metrics without action; dense data with no priority. |
| Transactional checkout/booking | Complete a high-value action | Cart/selection summary, required details, payment/scheduling, review, confirmation, support | Hidden costs, weak error recovery, competing exits. |
| Support or help | Resolve a known problem | Search/task intro, common topics, guided steps, escalation, related help | Hero overkill; contact buried after irrelevant content. |

## Section Ordering Model

1. Orientation: where the user is, what the page is for, and what action is
   possible.
2. Confidence: proof, status, eligibility, or context needed before commitment.
3. Detail: information, controls, or content needed to understand the decision.
4. Comparison or input: the moment where the user chooses, filters, fills, or
   acts.
5. Objection and recovery: FAQ, errors, support, reassurance, or alternate path.
6. Continuation: primary CTA, submit, save, book, next item, escalation, or
   footer support.

Not every page needs every step. Remove sections that do not change the user's
understanding, trust, comparison, action, or recovery.

## Page-Level Locks

Declare these before handoff when they shape downstream work:

- Primary action and allowed secondary actions.
- Navigation model and whether breadcrumbs are needed.
- Section sequence and why it fits the page type.
- CTA cadence and whether sticky action replaces repeated CTAs.
- Required overlays, forms, filters, tables, or stateful components.
- Responsive priority, especially mobile order and persistent actions.
- Accessibility expectations for landmarks, heading order, forms, overlays, and
  recovery messages.
- Open assumptions that need user, planner, or audit follow-up.

## Anti-Patterns

- Conventional order without rationale: hero, logo strip, cards, FAQ, CTA
  appears because it is familiar, not because it matches the decision path.
- Competing CTAs: several unrelated primary actions appear before the page has a
  clear job.
- Uniform density: every section has the same weight, so priority disappears.
- Decorative completeness: extra sections make the page feel full but do not
  advance orientation, trust, comparison, action, or recovery.
- Proof after commitment: high-friction pages ask users to book, pay, apply, or
  submit before credibility and eligibility are clear.
- App page marketing drift: workflow pages over-explain instead of putting
  current state and primary controls first.
- Dashboard data dump: metrics, charts, and tables appear without a status
  summary or next diagnostic action.
- Mobile priority loss: desktop order is copied to mobile even when action,
  support, or recovery needs to move earlier.

## Command Decision

Existing preflight and anti-pattern validation can catch deterministic fixture
issues such as missing primary action, hidden mobile actions, or generic
structural patterns. Do not add a page-planning command yet; page quality depends
on user goal and journey reasoning. A future command should check declared
preflight criteria, not replace planner judgment.

## Worked Examples

Transactional booking page:

1. Booking context and selected service.
2. Date/time selection and required patient details.
3. Insurance/payment or eligibility support.
4. Review and confirm.
5. Error/recovery, contact fallback, and confirmation state.

Reason: booking pages fail when users lose context, cannot recover from invalid
input, or see support only after the flow breaks.

Dashboard page:

1. Summary status and timeframe.
2. Key metrics with alerts.
3. Filters or segment controls.
4. Primary chart or table.
5. Detail drilldown and exception list.
6. Empty/error/loading states and support.

Reason: dashboards should make status and next diagnostic action visible before
dense detail.
