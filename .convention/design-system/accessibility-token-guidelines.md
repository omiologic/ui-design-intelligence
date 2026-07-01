# Accessibility Token Guidelines

Use this reference when reviewing accessibility requirements tied to
design-system tokens. It complements broader structure, prototype, and audit
guidance by focusing on token choices: color, typography, spacing, size, border,
shadow, motion, opacity, z-index, and breakpoints.

Accessibility token guidance is not production certification. A
`DesignSystemSeed` can require contrast checks, visible focus, target-size
minimums, reduced-motion paths, and disabled-state legibility without proving
the final implementation passes browser or assistive-technology QA.

## Core Rule

Token choices must preserve perceivable, operable, understandable UI states.
Do not let visual style, brand intensity, or generated palette choices hide
focus, reduce text legibility, shrink targets, or communicate state through
color alone.

## Token-Level Requirements

| Area | Token groups | Requirement | Review failure |
| --- | --- | --- | --- |
| Contrast | `color.*`, `opacity.*`, `border.*`, `shadow.*` | Text, icons, controls, focus indicators, borders, and status states must carry contrast-check requirements when values are generated or inferred. | A generated color pair is treated as approved without `contrastCheckRequired` or equivalent note. |
| Focus ring visibility | `color.focus.*`, `border.focus.*`, `shadow.focus.*`, `motion.feedback.*` | Focus indicators must be visible against expected surfaces and distinct from hover/active states. | Focus is color-only, too subtle, hidden by outline removal, or identical to hover. |
| Target size | `size.touchTarget.*`, `spacing.inline.*`, `spacing.stack.*` | Interactive controls must preserve usable hit area across desktop and touch contexts. | Padding or size tokens make buttons, links, tabs, menu items, or icon controls too small to target. |
| Readable type scale | `typography.*`, `spacing.*`, `breakpoint.*` | Type roles must support readable body text, labels, helper text, captions, and dense UI without viewport-scaled surprises. | Text tokens are too small, too compressed, line-height is weak, or labels/helper/errors become hard to scan. |
| Reduced motion | `motion.*` | Motion tokens are behavioral hints and must allow a reduced-motion path when movement affects comprehension, vestibular comfort, or task continuity. | Motion is required to understand state, success, error, route, overlay, or loading behavior. |
| Disabled legibility | `color.*`, `opacity.disabled.*`, `border.*` | Disabled states must look unavailable while remaining legible enough to explain blocked progress when needed. | Disabled text becomes unreadable or unavailable controls are the only explanation of blocked progress. |
| Non-color state | `color.status.*`, `border.*`, `icon.*`, `typography.*`, `motion.feedback.*` | Error, warning, success, selected, required, and focus states need non-color cues such as text, icon, border, placement, or live feedback. | State is communicated only by red/green/blue color change. |
| Layering | `zindex.*`, `shadow.*`, `opacity.scrim.*` | Overlays, sticky bars, menus, and toasts must preserve readable foreground/background separation and accessible dismissal/focus behavior. | Scrims, shadows, or layer tokens obscure content or imply overlays without focus/dismissal constraints. |
| Responsive access | `breakpoint.*`, `spacing.*`, `size.*`, `typography.*` | Responsive token choices must preserve reading order, target size, and control visibility. | Mobile or compact tokens hide labels, reduce controls, or collapse navigation without an accessible recovery path. |

## Semantic Color Roles

Prefer semantic roles:

- `color.text.primary`
- `color.text.secondary`
- `color.text.inverse`
- `color.surface.default`
- `color.surface.subtle`
- `color.action.primary`
- `color.border.focus`
- `color.status.error`
- `color.status.warning`
- `color.status.success`

Each semantic color role should state:

- Intent.
- Usage.
- Supported surfaces or `useOn`.
- Do-not-use guidance.
- Accessibility notes.
- Source and confidence.

Generated or inferred color pairs must carry a contrast-check requirement. Do
not imply that generated colors are measured or certified.

## Non-Color-Only State Communication

Every state that changes meaning should use at least one non-color cue:

- Error: text, icon, field association, border, summary, or focus movement.
- Warning: text label, icon, or explanatory message.
- Success: confirmation text, status message, or next-step copy.
- Selected: checkmark, selected label, active indicator, or structural
  placement.
- Required/optional: label text or helper copy.
- Focus: visible ring, outline, border, shadow, or offset treatment.

Color may reinforce state; it must not be the only carrier.

## Typography And Spacing Implications

Typography tokens affect accessibility even when color is correct.

Review for:

- Body text that remains readable without viewport-based font scaling.
- Labels that remain near their controls.
- Helper, caption, and error text with enough size and line-height to scan.
- Heading hierarchy that remains understandable at mobile breakpoints.
- Dense dashboard or table typography that does not collapse into noise.

Spacing tokens affect:

- Touch target area.
- Separation between fields and their helper/error text.
- Focus-ring clipping.
- Error-summary and recovery-action visibility.
- Reading order when sections stack responsively.

## Motion And Opacity Implications

Motion tokens should not be required for comprehension. If motion is used for
route changes, overlays, feedback, or async progress, include reduced-motion
guidance in `usageNotes`, component rules, or prototype handoff notes.

Opacity tokens need careful review:

- Disabled opacity should not make text unreadable.
- Scrim opacity should separate overlays without hiding context needed for
  recovery.
- Muted text opacity should not be used for required labels, errors, or legal
  content.
- Loading skeleton opacity should not imply disabled content unless interaction
  is actually unavailable.

## DesignSystemSeed Mapping

Use these fields to carry token accessibility constraints:

- `palette.colors.*.accessibilityNotes`
- `palette.accessibilityNotes`
- `components.buttons.states`
- `components.buttons.rules`
- `components.cards.rules`
- `components.header.rules`
- `components.footer.rules`
- `usageNotes`
- `openQuestions`

Use `openQuestions` when final values are not known enough to verify contrast,
font metrics, touch target dimensions, or motion behavior.

## Review Prompts

Use these prompts during design-system, accessibility, prototype, or handoff
review:

- Which color pairs require contrast validation?
- Is focus visible on every expected surface?
- Are hover, focus, active, selected, disabled, error, and success states
  visually and semantically distinct?
- Does any state rely on color alone?
- Are touch targets preserved at mobile breakpoints?
- Are labels, helper text, error text, captions, and metadata readable?
- Does disabled styling remain legible enough to explain blocked progress?
- Does motion have a reduced-motion path?
- Do opacity tokens make important content too faint?
- Do overlay/scrim/shadow tokens preserve foreground readability?
- Are unresolved accessibility risks recorded in `openQuestions`?

## Failure Conditions

Fail token accessibility when:

- Generated or inferred color pairs lack contrast-check notes.
- Focus indication is absent, color-only, or indistinguishable from hover.
- Error, success, warning, selected, or required states rely only on color.
- Disabled controls or helper text become unreadable.
- Touch target or spacing tokens make controls difficult to operate.
- Motion is required to understand state or progress.
- Typography tokens make body, labels, helper, error, or caption text too small
  or cramped to review.

Warn when:

- Contrast is likely acceptable but not measured.
- Focus is present but visually weak.
- Reduced-motion guidance is present but not tied to prototype behavior.
- Responsive target size depends on implementation choices not captured in the
  seed.
