# Blueprint Export Seed

## Source

- Blueprint ID: `ledgerpilot-marketing-wireframe`
- Blueprint version: `0.1.0`
- Source file or capture: `.convention/examples/marketing-page-e2e/marketing-page.ui-blueprint.json with .convention/taste-profiles/conversion.json`
- Scope: page, rooted at `ledgerpilot-marketing-page`
- Register: `unknown`
- Taste profile: `conversion`

## Product Context

- Product, service, or page: LedgerPilot Marketing Page experience
- Audience: missing evidence
- Primary user goal: Conversion marketing page blueprint with proof before feature depth and demo request behavior.
- Success action: `header-demo-button`
- Evidence status: generated from committed UIBlueprint structure and the `conversion` structural taste profile; audience, brand voice, and visual style remain missing evidence.

## Structural Intent

The blueprint describes a page with this ordered structure:

1. `site-header`: Site Header
2. `hero-section`: Cash Flow Clarity Hero
3. `proof-section`: Proof Before Feature Detail
4. `features-section`: Finance Workflow Features
5. `objections-section`: Setup And Trust Objections
6. `final-cta-section`: Final Demo Request
7. `site-footer`: Site Footer

Reusable structures and stateful areas:

- `primary-navigation`: Primary Navigation (navigation)
- `hero-actions`: Hero Actions (buttonGroup)
- `customer-count-card`: Customer Count Proof (card)
- `reporting-time-card`: Reporting Time Saved Proof (card)
- `finance-team-card`: Finance Team Trust Proof (card)
- `feature-grid`: Feature Grid (cardGrid)
- `runway-view-card`: Runway View Card (card)
- `anomaly-alerts-card`: Anomaly Alerts Card (card)
- `board-report-card`: Board Ready Report Card (card)
- `objection-faq`: Setup Compatibility Accuracy FAQ (accordion)
- `demo-request-dialog`: Demo Request Dialog (dialog)
- `demo-request-form`: Demo Request Form (form)

Overlays:

- `demo-request-dialog`: Demo Request Dialog (dialog, state `closed`)

## Taste Profile Bias

The `conversion` profile contributes structural bias only:

- section-order bias: orient, prove, explain, resolve-objections, act
- density bias: moderate by default; Conversion pages need enough evidence to build trust without making the primary action hard to see.
- CTA cadence: Repeating one action can help; competing actions weaken the decision path.
- overlay guidance: Conversion overlays must support commitment or focused clarification, not hide essential persuasion.
- responsive priority: offer, primary-action, early-proof, key-benefit, objection-resolution, final-action

Do not treat this section as visual style guidance.

## Structural Constraints

Downstream tools should preserve:

- primary journey: preserve the source node order and keep `header-demo-button` as the success action.
- navigation model: preserve visible navigation nodes and their accessibility labels.
- CTA model: keep one primary CTA unless new product evidence justifies another.
- required sections or components: preserve `site-header`, `hero-section`, `proof-section`, `features-section`, `objections-section`, `final-cta-section`, `site-footer`.
- content or proof placement: preserve proof, feature, and action groups near their source sections.
- non-obvious annotations: preserve overlays, responsive notes, accessibility notes, and state nodes.

## Accessibility And Interaction Contracts

- `site-header` landmark: banner.
- `primary-navigation` ariaLabel: Primary navigation.
- `main-content` landmark: main.
- `site-footer` landmark: contentinfo.
- `demo-request-dialog` ariaLabel: Request a LedgerPilot demo; focusManagement: Move focus into the dialog on open and return focus to the triggering demo button on close.; keyboardBehavior: Escape closes the dialog and Tab remains inside while open..
- `demo-request-dialog` uses `closed` state.
- `demo-form-error` uses `error` state.
- `demo-form-success` uses `success` state.

Open questions:

- Confirm DOM order, ARIA wiring, keyboard behavior, and screen reader behavior downstream.
- Confirm exact overlay trigger nodes when the blueprint does not identify them.

## Responsive Priorities

- desktop: Header navigation, hero preview, proof cards, feature grid, objections, and final CTA are visible in conversion order.
- tablet: Hero columns compress and proof cards reduce columns while the demo action remains visible.
- mobile: Navigation moves to a drawer; order preserves promise, demo CTA, proof, features, objections, and final action.
- priority order: offer, primary-action, early-proof, key-benefit, objection-resolution, final-action

## Downstream Ownership

This repository owns the structural page order, node hierarchy, overlay
contracts, responsive priorities, and accessibility constraints above.

Downstream tools own final visual direction: color, typography, spacing, imagery,
icons, motion, component polish, and production code.

## Evidence Boundaries

Do not infer without additional evidence:

- actual brand personality or tone of voice.
- visual style, palette, type scale, imagery, or motion.
- target audience beyond provided or observed evidence.
- proof claim content, metrics, testimonials, or regulated claims.
- hidden interactions not represented in the blueprint.
- implementation framework or component library.
- DOM order, ARIA implementation, or screen reader behavior.

## Adapter Notes

- For product-context tools: use the page scope, primary goal, success action,
  register, and evidence boundaries.
- For design-direction tools: use the structural constraints, taste-profile bias,
  responsive priorities, and accessibility contracts without treating them as
  visual style.
- For design-engineering tools: use the component inventory, overlay contracts,
  state requirements, landmarks, and open implementation questions.
