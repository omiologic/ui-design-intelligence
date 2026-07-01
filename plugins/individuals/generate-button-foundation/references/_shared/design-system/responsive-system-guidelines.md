# Responsive System Guidelines

Use this reference when a `DesignSystemSeed`, design spec, or system review
needs responsive behavior guidance before blueprint or prototype handoff.

Responsive system guidance defines reusable expectations for tokens,
components, density, and adaptive behavior. It does not replace
`.convention/prototype/responsive-prototype-guidelines.md`, which owns concrete
screen, route, state, interaction, focus, and runtime handoff behavior.

## Core Rule

A responsive design-system seed should explain what adapts and why. Do not leave
mobile, tablet, dense dashboard, sticky action, or overflow behavior to
downstream guesswork.

## Viewport Language

Prefer semantic viewport roles over raw pixel names:

- `compact`: phone-sized or narrow viewport behavior.
- `medium`: tablet, small laptop, or split-view behavior.
- `expanded`: standard desktop behavior.
- `large`: wide desktop or high-density behavior.

Token names should follow `.convention/design-system/token-taxonomy.md`, for example:

- `breakpoint.layout.compact`
- `breakpoint.layout.medium`
- `breakpoint.layout.expanded`
- `breakpoint.content.dense`
- `spacing.section.compact`
- `size.touchTarget.minimum`

Raw pixel values can appear as recommendations or implementation notes, but the
semantic role is the contract.

## Design-System Versus Prototype Responsibility

Put responsive guidance in the design-system seed when it is reusable:

- Component layout modes by viewport.
- Density changes for spacing, typography, cards, forms, tables, and navigation.
- Token roles for breakpoints, spacing, size, z-index, and touch targets.
- Header/footer behavior expectations.
- Mobile control patterns such as menu button, drawer, sticky action, or
  collapsed filter.
- Accessibility constraints that must survive responsive shifts.

Put responsive behavior in prototype config when it is instance-specific:

- Screen-level viewport priorities.
- Node IDs for responsive-only controls.
- State changes such as `collapsed`, `expanded`, `hidden`, `visible`, `sticky`,
  `open`, or `closed`.
- Trigger conditions by viewport.
- Focus movement and focus return.
- Overlay, drawer, form step, route, scroll, and validation behavior.

If responsive guidance changes behavior, route, state, focus, or validation, it
must be handed to prototype planning.

## Responsive Expectations

| Area | Seed expectation | Handoff risk if missing |
| --- | --- | --- |
| Breakpoints | Define semantic breakpoint roles and what each role changes. | Prototype or app consumers invent raw viewport behavior. |
| Containers | State max-width, content width, side-panel, and full-bleed expectations. | Wide layouts stretch or compact layouts overflow. |
| Grids | Describe column count, card/list fallback, comparison fallback, and dense data behavior. | Cards, product grids, dashboards, and tables become desktop-only. |
| Density | Explain compact/default/dense spacing and type behavior. | Mobile or data-heavy screens become cramped or unreadable. |
| Mobile controls | Define menu button, drawer, sheet, sticky CTA, filter drawer, or compact action patterns. | Primary actions, filters, back/cancel, or recovery paths disappear. |
| Sticky regions | Define sticky header, sticky bottom action, local sticky summary, and z-index intent. | Sticky UI overlaps fields, banners, toasts, or focused content. |
| Adaptive components | Define how tabs, accordions, dialogs, forms, tables, product grids, and navigation adapt. | Downstream specs invent inconsistent responsive variants. |
| Accessibility | Preserve labels, focus visibility, reading order, target size, and error recovery. | Compact UI becomes inaccessible even if desktop is usable. |

## Component Expectations

### Header

Seed should define:

- Desktop layout: logo, navigation, utility items, primary action.
- Compact layout: menu button, drawer/sheet expectation, primary action
  behavior.
- Sticky behavior and z-index role.
- Maximum navigation item count before collapse.
- Whether primary action remains visible, moves into menu, or becomes sticky.

Fail review when compact behavior is "hamburger" with no drawer, close,
focus, or action-priority notes.

### Footer

Seed should define:

- Desktop columns versus compact stacked order.
- Legal/contact/social/navigation priority.
- Recovery navigation behavior.
- Whether dense footer groups collapse into accordions.

Fail review when mobile footer order hides contact, legal, or recovery links
needed for trust or compliance.

### Cards And Product Grids

Seed should define:

- Grid-to-list fallback.
- Minimum card content anatomy at compact widths.
- Media aspect-ratio behavior.
- Action placement when cards stack.
- Product comparison or filter/sort behavior when grid space collapses.

Fail review when grid guidance assumes all cards stay equal-width across mobile.

### Forms

Seed should define:

- Single-column compact behavior.
- Field group spacing and label placement.
- Error-summary and inline-error behavior.
- Submit, save, back, cancel, and recovery action priority.
- Multi-step progress behavior on compact viewports.

Fail review when a form seed only defines desktop row layout.

### Tables And Dashboards

Seed should define:

- Table-to-card/list fallback or horizontal-scroll constraints.
- Column priority and hidden-column rules.
- Filter/sort control movement.
- Metric card density.
- Empty, loading, and error region behavior.

Fail review when dense data surfaces are described as "responsive" without
column priority or compact alternative.

### Dialogs And Overlays

Seed should define:

- Dialog versus drawer/sheet behavior by viewport.
- Maximum height, scroll container, sticky action footer, and close control.
- Scrim, z-index, and focus constraints.
- Whether compact overlays become full-screen.

Fail review when desktop modal guidance is reused for compact viewports without
height, scroll, close, or action behavior.

## Responsive Token Expectations

Use token guidance for:

- `breakpoint.*`: semantic viewport roles and behavior thresholds.
- `spacing.*`: compact/default/dense spacing rhythm.
- `size.*`: touch target, icon, input, and control dimensions.
- `typography.*`: readable heading/body/label/caption behavior.
- `zindex.*`: sticky header, sticky action, popover, drawer, dialog, toast.
- `opacity.*`: scrim and disabled states that remain legible.
- `motion.*`: reduced-motion-safe responsive transitions.

Responsive tokens must preserve accessibility-token constraints from
`.convention/design-system/accessibility-token-guidelines.md`.

## App And Prototype Handoff

When handing responsive seed guidance to downstream artifacts, include:

```txt
Viewport roles:
Responsive token roles:
Component layout changes:
Controls that move/collapse/hide:
Sticky regions:
Overflow risks:
Accessibility constraints:
Prototype behavior needed:
Open questions:
```

If `Prototype behavior needed` includes state, route, focus, overlay, form, or
interaction behavior, hand off to
`.convention/prototype/responsive-prototype-guidelines.md`.

## Review Prompts

- Does the seed define compact, medium, expanded, or large behavior only where
  behavior actually changes?
- Are breakpoint roles semantic rather than raw pixel names?
- Are header, footer, navigation, forms, cards, tables, and overlays described
  across compact and expanded layouts?
- What moves, stacks, collapses, hides, or becomes sticky?
- Does every hidden control have an alternate path?
- Does the primary action remain discoverable on compact viewports?
- Are target size, focus visibility, label proximity, and error recovery
  preserved?
- Are dense dashboards and tables given compact alternatives?
- Are sticky regions given z-index and overlap expectations?
- Are unresolved responsive assumptions listed in `openQuestions`?

## Failure Conditions

Fail responsive readiness when:

- The seed is desktop-only.
- Mobile behavior is described as "stack everything" without priority.
- Primary actions, filters, save, back, cancel, close, or recovery controls
  disappear at compact sizes.
- Header/nav collapse lacks drawer, close, focus, or action-priority guidance.
- Tables, product grids, dashboards, or comparison surfaces have no compact
  fallback.
- Sticky regions have no overlap, z-index, or accessibility constraints.
- Responsive typography or spacing makes content unreadable or controls too
  small.

Warn when:

- Responsive behavior is plausible but not tied to token roles.
- `medium` or `large` behavior is unspecified but likely can inherit compact or
  expanded behavior.
- Prototype-specific behavior is implied but not handed off explicitly.
