# Visual Style Calibration

Use this guide when a brand direction, `StyleReference`, screenshot study, or
prompt needs to become concrete `DesignSystemSeed` choices. Calibration is the
translation step between "what it should feel like" and reusable decisions for
tokens, components, states, and handoff notes.

Calibration does not invent final CSS. It defines the visual posture a seed
should enforce, with source labels, confidence, and open questions.

## Calibration Axes

| Axis | Calibrate | Seed targets | Generic failure |
| --- | --- | --- | --- |
| Contrast | How much separation exists between foreground/background, primary/secondary action, and active/inactive state. | `palette.colors`, `palette.accessibilityNotes`, `components.*.rules` | Low-contrast decoration, multiple competing primaries, or contrast only checked after styling. |
| Density | How compact or spacious the interface should feel for its task and audience. | `brand.visualDirection.density`, component `base`, component layout/rules, responsive notes | Default roomy SaaS cards for every domain, or cramped density without scan hierarchy. |
| Hierarchy | Which content, actions, and surfaces get visual priority. | typography scale, button variants, card variants, header/footer rules | Flat heading weights, generic type scale, or every card/action carrying equal emphasis. |
| Restraint | What visual effects are intentionally limited or absent. | palette usage, shadow/elevation rules, radius rules, iconography usage, avoid notes | Stacking gradients, shadows, borders, icons, and decorative color without a role. |
| Texture | Whether the system uses flat, tactile, editorial, raw, glass, material, or illustrated surface language. | card base, surface tokens, border/shadow rules, imagery notes | Theme words with no component consequences. |
| Imagery | How images, icons, illustrations, and product media should support trust and inspection. | brand visual direction, iconography, card/header/footer rules, usage notes | Stock-like imagery, decorative icons, or media crops that do not reveal the product/state. |
| Motion posture | How state changes should feel before prototype timing exists. | component states, usage notes, prototype handoff notes | Motion library recommendations or exact durations in the seed layer. |
| Category fit | Whether the style fits the product category, risk level, and user job. | brand positioning, visual direction, component density, accessibility notes | Applying a fashionable style that fights the domain or task. |

## Style Reference To Seed Translation

Translate style guidance into semantic decisions that downstream skills can use:

1. Identify the style source, target scope, and confidence. User-provided and
   observed style sources outrank generated recommendations.
2. Convert style adjectives into calibrated axes. For example, "editorial"
   usually affects hierarchy, type contrast, whitespace, and image treatment;
   "utilitarian" usually affects density, contrast, restrained surfaces, and
   direct state feedback.
3. Map each axis to seed fields rather than raw CSS. Use token roles,
   component variants, rules, and usage notes.
4. Preserve accessibility and responsive constraints. Style intensity never
   outranks contrast, readable type, target size, focus visibility, or buildable
   responsive behavior.
5. Record uncertainty as `openQuestions` instead of pretending exactness.

### Token Decisions

- Palette tokens should express intent and supported surfaces, such as
  `color.action.primary`, `color.surface.raised`, or `color.border.subtle`.
  Do not create `color.blue500` or style-name tokens such as
  `color.glass.primary`.
- Typography tokens should state hierarchy and usage. If a style suggests high
  editorial contrast, map it to heading/body/UI roles and readability
  constraints, not a guessed font family.
- Spacing, radius, opacity, size, z-index, and breakpoint tokens should appear
  only when the seed has enough evidence or needs a reusable constraint.
- Motion posture should become state and handoff guidance unless the target
  artifact is a prototype config.

### Component Decisions

- Buttons: map style into action hierarchy, shape, border/fill treatment, state
  visibility, and disabled/loading clarity. Keep one primary action model per
  context.
- Cards: map style into media treatment, content density, surface depth,
  border/radius, and when cards should not be used.
- Header: map style into navigation density, active-state expression, CTA
  prominence, sticky expectations, and mobile collapse behavior.
- Footer: map style into trust signals, link grouping, legal/contact treatment,
  and visual quietness.
- Iconography: map style into stroke/fill posture, density, pairing with text,
  and avoid rules. Icons do not replace accessible labels.

## Anti-Generic Review Prompts

Use these prompts before handing the seed to blueprint, design-spec, prototype,
or implementation workflows:

- Weak hierarchy: What is the single highest-priority action or message in each
  major region, and which token/component decisions make that visible?
- Default typography: Could this type scale belong to any generic SaaS page? If
  yes, what role, contrast, weight, spacing, or readability rule ties it to the
  product category?
- One-note visual system: Is every surface a variation of the same hue, radius,
  shadow, or card treatment? If yes, define roles for emphasis, quiet surfaces,
  borders, and negative space.
- Style drift: Did a local style patch rewrite global brand, palette,
  typography, or component rules without permission?
- Decoration without purpose: Which gradients, shadows, borders, textures,
  icons, or images help comprehension, trust, hierarchy, or affordance?
- Category mismatch: Would the same style posture work for a consumer landing
  page, clinical tool, financial dashboard, and developer console? If yes, it
  is probably under-calibrated.

## Boundaries

### Style Calibration Vs Brand Voice

Brand voice controls language: tone, wording, claims, audience posture, and
content constraints. Visual style calibration controls how the system looks and
feels: hierarchy, density, contrast, surface language, imagery, and component
emphasis. A calm voice can still use high visual contrast; a bold voice can
still require restrained UI if the product task demands it.

### Style Calibration Vs Prototype Behavior

Prototype behavior controls flows, interactions, transitions, timing, state
changes, and runtime affordances. Visual style calibration can set motion
posture and state expression, but it should not choose animation libraries,
exact timing values, router behavior, or renderer implementation.

### Style Calibration Vs Final Visual Design

Calibration is a seed-level contract. It should constrain downstream design and
generation, but it is not a polished mockup, production CSS, or final UI kit.
When exact values are not evidenced, use recommended guidance with confidence
labels and concrete open questions.

## Output Expectations

A calibrated seed or style-to-seed handoff should include:

- affected seed sections and field paths
- source id, source kind, and confidence
- axis-level rationale for contrast, density, hierarchy, restraint, texture,
  imagery, motion posture, and category fit where relevant
- token and component consequences, not just mood words
- accessibility and responsive constraints that limit style intensity
- explicit preserve rules for existing seed values
- open questions for unverified colors, fonts, imagery, motion, or component
  values
