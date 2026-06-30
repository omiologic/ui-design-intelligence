# Blueprint Export Seed

## Source

- Blueprint ID: `ui-blueprint-example`
- Blueprint version: `0.1.0`
- Source file or capture: `shared/examples/ui-blueprint.example.json with shared/taste-profiles/conversion.json`
- Scope: page, rooted at `example-page`
- Register: `marketing`
- Taste profile: `conversion`

## Product Context

- Product, service, or page: Example Page marketing experience
- Audience: missing evidence
- Primary user goal: Canonical full-bundle UIBlueprint example for ui-design-intelligence handoff.
- Success action: `example-primary-cta`
- Evidence status: generated from committed UIBlueprint structure and the `conversion` structural taste profile; audience, brand voice, and visual style remain missing evidence.

## Structural Intent

The blueprint describes a page with this ordered structure:

1. `example-header`: Example Header
2. `example-hero`: Evidence-Led Hero
3. `example-feature-section`: Feature Section
4. `example-footer`: Example Footer

Reusable structures and stateful areas:

- `example-nav`: Example Navigation (navigation)
- `example-hero-actions`: Hero Actions (buttonGroup)
- `example-hero-proof`: Hero Proof Card (card)
- `example-feature-grid`: Feature Cards (cardGrid)
- `example-feature-card`: Feature Card (card)
- `example-contact-dialog`: Contact Dialog (dialog)
- `example-contact-form`: Contact Form (form)

Overlays:

- `example-contact-dialog`: Contact Dialog (dialog, state `closed`)

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

- primary journey: preserve the source node order and keep `example-primary-cta` as the success action.
- navigation model: preserve visible navigation nodes and their accessibility labels.
- CTA model: keep one primary CTA unless new product evidence justifies another.
- required sections or components: preserve `example-header`, `example-hero`, `example-feature-section`, `example-footer`.
- content or proof placement: preserve proof, feature, and action groups near their source sections.
- non-obvious annotations: preserve overlays, responsive notes, accessibility notes, and state nodes.

## Accessibility And Interaction Contracts

- `example-header` landmark: banner.
- `example-nav` ariaLabel: Primary navigation.
- `example-main` landmark: main.
- `example-footer` landmark: contentinfo.
- `example-contact-dialog` ariaLabel: Contact form; focusManagement: Trap focus while open and return focus to the trigger on close.; keyboardBehavior: Escape closes the dialog..
- `example-contact-dialog` uses `closed` state.
- `example-contact-form-error` uses `error` state.
- `example-contact-form-success` uses `success` state.

Open questions:

- Confirm DOM order, ARIA wiring, keyboard behavior, and screen reader behavior downstream.
- Confirm exact overlay trigger nodes when the blueprint does not identify them.

## Responsive Priorities

- desktop: Hero uses a split layout with proof visible in the first viewport.
- tablet: Hero columns remain visible with reduced spacing.
- mobile: Hero copy, proof, feature cards, and footer stack in one column.
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
