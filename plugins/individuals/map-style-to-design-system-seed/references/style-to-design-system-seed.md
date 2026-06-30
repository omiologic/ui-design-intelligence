# Style To Design System Seed Mapping

## Decision Heuristics

Map style guidance to seed sections only where it improves reusable generation:
brand, palette, typography, iconography, buttons, cards, header, footer, and
prototype behavior conventions.

Use two modes:

- Full-seed guidance when no `DesignSystemSeed` exists yet.
- `StylePatch` guidance when an existing seed, section, component, or prototype
  behavior target must preserve explicit decisions.

### Design-System Mapping Contract

Map `StyleReference.designSystemMapping` to seed sections as recommendations,
not exact values:

| Style field | Seed target | Mapping rule |
| --- | --- | --- |
| `brand.recommendations` | `brand.personality`, `brand.summary`, `brand.visualDirection.style` | Convert style tone into recommended personality and visual-direction language. |
| `palette.recommendations` | `palette.colors`, `palette.accessibilityNotes` | Create semantic color-role recommendations. Do not invent exact hex values unless source evidence supports them. |
| `typography.recommendations` | `typography.fontFamilies`, `typography.scale` | Recommend type roles, hierarchy, weight, and readability constraints. |
| `iconography.recommendations` | `iconography.style`, `iconography.usage` | Recommend icon style, density, pairing, and avoid rules. |
| `buttons.recommendations` | `components.buttons.variants`, `components.buttons.rules` | Recommend button shape, hierarchy, state treatment, and accessibility notes. |
| `cards.recommendations` | `components.cards.base`, `components.cards.variants`, `components.cards.rules` | Recommend card radius, border, shadow, layout role, and content density. |
| `header.recommendations` | `components.header.layout`, `components.header.rules` | Recommend nav treatment, density, active states, and responsive expectations. |
| `footer.recommendations` | `components.footer.layout`, `components.footer.rules` | Recommend footer structure, tone, link grouping, and legal-link clarity. |

### Component Mapping Contract

Map `StyleReference.componentMapping` to focused component and local target
rules:

- `cards` can affect card variants, tile sizing, radius, border, shadow,
  padding, media treatment, and card-level actions.
- `buttons` can affect button shape, hierarchy, border, state treatment, and
  disabled/active clarity.
- `dialogs` and `drawers` can affect surface opacity, edge treatment, overlay
  depth, entrance behavior, close affordances, and contrast requirements.
- `badges` can affect label density, color use, icon pairing, and status
  semantics.
- `navigation` can affect active states, grouping, spacing, and utility density.
- Section treatments can affect local backgrounds, dividers, card grids, CTA
  panels, and proof blocks without rewriting global brand rules.

### Prototype Mapping Contract

Map `StyleReference.prototypeMapping` to prototype behavior vocabulary:

- `motionTone` informs whether transitions should feel calm, snappy, direct,
  refined, or minimal.
- `hoverStates` informs visible state treatment such as lift, border change,
  underline, inversion, or subtle tone shift.
- `transitions` informs fade, slide, reveal, instant, or contained expand/collapse
  behavior.
- `surfaceDepth` informs overlay depth, panel layering, shadow strength, and
  backdrop treatment.
- `feedback` informs inline status, toast usage, validation emphasis, and
  recovery clarity.

Do not map prototype guidance to animation libraries, runtime code, or exact
timing values in this layer.

### Full Seed Mode

When no seed exists, return seed-section recommendations that
`generate-design-system-seed` can assemble. The output should identify:

- style id and source record
- seed sections affected
- recommended source label, usually `recommended` or `generated`
- confidence, usually `medium` unless the user supplied exact values
- open questions for exact palette, font, spacing, or component values

Full seed mode still does not own final seed assembly. It prepares mapped
recommendations for the design-system skill.

### Patch Mode

When a seed exists, return a `StylePatch` instead of regenerating the seed.
Patch paths should be explicit enough for review, for example:

- `components.cards.base.radius`
- `components.cards.variants.card.feature.layout`
- `components.buttons.variants.button.primary.border`
- `palette.colors.color.surface.subtle.intent`
- `prototype.motionTone`

Every patch must include `preserve` rules for explicit brand, palette,
typography, component anatomy, route structure, or accessibility decisions that
should not change.

## Anti-Pattern

Do not overwrite existing seed values just because a style has a strong visual
identity. Preserve explicit project decisions unless the patch authorizes a
change.

Do not convert style mood into exact colors, fonts, spacing, or animation
durations without evidence. Mood can guide roles and constraints; exact values
belong to observed, user-provided, or separately generated design-system data.

## Worked Example

For `japandi`, map calm brand personality, warm neutral palette roles, restrained
type, soft card surfaces, and quiet motion guidance into seed recommendations
with source notes.

For a local `bento-box` services section patch, preserve
`brand.primaryColor`, `typography.body`, and the section CTA hierarchy. Change
only `components.cards` guidance and section grouping rules.

For a `glassmorphism` dialog patch, preserve dialog information architecture,
button hierarchy, and form labels. Change only dialog shell surface, border,
overlay depth, and hover/transition guidance while adding contrast avoid rules.

## Hand-Off

Hand recommendations to `generate-design-system-seed` for assembly and to audit
skills for completeness, naming, and consistency review.

Hand local section/component constraints to blueprint and prototype workflows as
style references or patches, not as full design-system replacements.
