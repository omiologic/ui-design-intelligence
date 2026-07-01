# Token Taxonomy

Use this reference when naming and grouping seed-level design tokens in
`DesignSystemSeed` artifacts, design-system reviews, prototype specs, and app
handoff packages.

Use `.convention/design-system/accessibility-token-guidelines.md` with this taxonomy
when token names or values affect contrast, focus visibility, target size,
readable type, opacity, disabled state, motion, or non-color state
communication.
Use `.convention/design-system/responsive-system-guidelines.md` when `breakpoint.*`,
`spacing.*`, `size.*`, `zindex.*`, or responsive component guidance affects
layout, density, sticky regions, or prototype handoff.

The taxonomy is a semantic contract, not a production token build system. It
keeps generated design guidance consistent enough for downstream agents,
renderers, prototype planners, and implementers to understand what a value is
for.

## Naming Pattern

Use:

```txt
{category}.{role}.{purpose}
```

Examples:

- `color.action.primary`
- `color.text.secondary`
- `typography.heading.h1`
- `spacing.section.default`
- `radius.control.default`
- `motion.feedback.fast`

Rules:

- Category is the token group.
- Role describes the semantic job.
- Purpose narrows the use case.
- Names describe intent, not raw values.
- Do not encode hex values, pixel values, color names, or implementation
  framework details in token names.

## Token Groups

| Group | Category | Purpose | Good names | Poor names |
| --- | --- | --- | --- | --- |
| Color | `color` | Semantic color roles for actions, text, surfaces, borders, status, and focus. | `color.action.primary`, `color.surface.subtle`, `color.status.error` | `color.blue500`, `color.brandHex`, `primaryBlue` |
| Typography | `typography` | Text family, scale, weight, line-height, and readable text roles. | `typography.heading.h1`, `typography.body.default`, `typography.label.compact` | `font16`, `bigText`, `interBold` |
| Spacing | `spacing` | Layout rhythm for gaps, padding, margins, and section distance. | `spacing.stack.tight`, `spacing.section.default`, `spacing.inline.control` | `space8`, `padding24`, `smallGap` |
| Size | `size` | Fixed or bounded dimensions for controls, media, icons, hit areas, and containers. | `size.control.default`, `size.icon.small`, `size.touchTarget.minimum` | `width320`, `icon20`, `buttonHeight` |
| Radius | `radius` | Corner shape roles for controls, cards, overlays, media, and chips. | `radius.control.default`, `radius.card.soft`, `radius.overlay.default` | `rounded8`, `pillRadius`, `borderRadius` |
| Border | `border` | Stroke roles for dividers, outlines, inputs, and focus support. | `border.input.default`, `border.divider.subtle`, `border.focus.strong` | `grayBorder`, `line1`, `inputStroke` |
| Shadow | `shadow` | Elevation roles for surfaces, overlays, popovers, and floating controls. | `shadow.overlay.default`, `shadow.card.raised`, `shadow.focus.ring` | `shadowBig`, `boxShadow1`, `dropShadow` |
| Motion | `motion` | Behavioral transition roles for feedback, route changes, overlays, and state changes. | `motion.feedback.fast`, `motion.overlay.enter`, `motion.route.standard` | `easeOut300`, `animation1`, `slideThing` |
| Z-index | `zindex` | Layer ordering for sticky UI, overlays, dialogs, popovers, and tooltips. | `zindex.sticky.header`, `zindex.overlay.modal`, `zindex.popover.default` | `z999`, `modalTop`, `superHigh` |
| Opacity | `opacity` | Alpha roles for disabled states, overlays, scrims, and secondary emphasis. | `opacity.disabled.default`, `opacity.scrim.overlay`, `opacity.text.muted` | `opacity50`, `fade`, `halfTransparent` |
| Breakpoints | `breakpoint` | Responsive thresholds and behavior targets for layout decisions. | `breakpoint.layout.mobile`, `breakpoint.layout.tablet`, `breakpoint.content.compact` | `bp768`, `desktopWidth`, `ipad` |
| Icon | `icon` | Icon size, stroke, corner treatment, and semantic usage roles. | `icon.size.inline`, `icon.stroke.default`, `icon.corner.rounded` | `lucide20`, `iconThin`, `svgSize` |

## Semantic Names Versus Raw Value Names

Prefer semantic names:

```txt
color.action.primary
spacing.section.default
radius.card.soft
motion.feedback.fast
```

Avoid raw value names:

```txt
color.blue500
spacing.24px
radius.8
motion.300ms
```

Raw values can change without changing the semantic job. A primary action may
move from blue to green, but `color.action.primary` remains the contract that
buttons, links, and prototype states can reference.

## DesignSystemSeed Mapping

Current seed artifacts govern these groups directly:

- `palette.colors`: `color.*`
- `typography.fontFamilies`: `typography.family.*`
- `typography.scale`: `typography.heading.*`, `typography.body.*`,
  `typography.label.*`, and related readable text roles.
- `iconography`: `icon.*` roles through style, stroke, corner treatment,
  preferred library, and usage rules.
- `components.buttons.base`: `radius.*`, `size.*`, `spacing.*`, and
  `typography.*` guidance when a value affects controls.
- `components.cards.base`: `color.*`, `spacing.*`, `radius.*`, `border.*`, and
  `shadow.*` guidance for grouped content.
- `components.header` and `components.footer`: `size.*`, `spacing.*`,
  `breakpoint.*`, and `zindex.*` guidance when layout or persistence matters.
- `usageNotes`: advisory tokens or unresolved groups that are not formalized in
  the seed schema yet.
- `openQuestions`: token groups that require source confirmation before
  downstream handoff.

When the schema lacks a dedicated field for a group, record the token guidance
as component rules, usage notes, or open questions. Do not force unsupported
token groups into unrelated fields.

## Good Token Examples

```txt
color.action.primary
color.text.inverse
color.border.focus
typography.heading.h1
typography.body.default
spacing.stack.compact
size.touchTarget.minimum
radius.control.default
border.input.error
shadow.overlay.default
motion.feedback.fast
zindex.overlay.modal
opacity.disabled.default
breakpoint.layout.mobile
icon.stroke.default
```

## Poor Token Examples

```txt
blue
brandBlue
color.005fcc
font18
interSemiBold
padding24
rounded8
boxShadowBig
z999
opacity50
desktop1440
```

Why these fail:

- They describe values, implementation details, or breakpoints instead of
  product intent.
- They cannot survive visual refreshes.
- They do not tell prototype specs which component, state, or layout behavior
  should consume them.

## App Handoff

App handoff packages should treat token names as stable references and token
values as seed-level recommendations.

Use token taxonomy to help app consumers answer:

- Which values are render-critical?
- Which values are advisory design guidance?
- Which component states consume each token?
- Which tokens require accessibility verification?
- Which responsive thresholds affect layout behavior?

For app handoff, prefer semantic references in generated specs:

```txt
Use `color.action.primary` for the primary submit button.
Use `spacing.stack.tight` between form fields.
Use `breakpoint.layout.mobile` when the stepper collapses to a sticky status bar.
```

Avoid handoff language that only gives raw values:

```txt
Use #0B78C2.
Use 12px.
Collapse at 768px.
```

Raw values can appear as supporting evidence, but the semantic token name should
carry the contract.

## Prototype Spec Support

Prototype configs and interaction plans should use token taxonomy for state and
behavior clarity:

- Loading, success, error, disabled, and focus states should reference semantic
  color, opacity, border, and motion roles.
- Overlays should reference semantic shadow, z-index, opacity, radius, and
  motion roles.
- Sticky bars and headers should reference semantic z-index and breakpoint
  roles.
- Responsive prototype notes should reference breakpoint intent, not only pixel
  widths.

Example:

```txt
On submit error, move focus to the error summary, apply `color.status.error`,
`border.input.error`, and `motion.feedback.fast`.
```

## Review Rules

- Fail token naming when a token category is not listed in
  `.convention/vocabulary/design-token-types.json`.
- Fail token naming when a token name encodes a raw value instead of role and
  purpose.
- Warn when a token is defined but no component, state, usage note, or handoff
  references it.
- Warn when spacing, size, radius, shadow, motion, z-index, opacity, or
  breakpoint guidance exists only as raw values.
- Keep low-confidence tokens if they are source-labeled and listed in
  `openQuestions`.
