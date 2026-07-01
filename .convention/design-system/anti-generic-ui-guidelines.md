# Anti-Generic UI Guidelines

Use this guide when a generated design-system seed, design spec, blueprint, or
wireframe looks technically valid but visually generic. This is the
design-system-specific companion to
`.convention/design-philosophy/design-system/design-system-anti-slop.md` and should
be used with `.convention/design-system/visual-style-calibration.md` and
`.convention/style-references/`.

Anti-generic review is not about making every interface loud. It is about
preventing default-looking choices that do not express the product category,
user task, hierarchy, or brand evidence.

## Generic Failure Patterns

| Failure | Why it is weak | Replace with |
| --- | --- | --- |
| One-note palettes | Every surface, border, chart, badge, and action uses variants of one hue, so hierarchy depends on saturation instead of role. | Semantic roles for action, surface, text, border, status, and emphasis with explicit usage and contrast notes. |
| Weak hierarchy | Headings, body, labels, cards, and CTAs share similar size, weight, spacing, or color. | A type and component hierarchy tied to the primary user job, scan path, and action priority. |
| Generic cards | Every section becomes a rounded card grid, even when comparison, narrative, form completion, or dense operations need another pattern. | Component selection rules that justify cards, tables, lists, panels, or inline groups by task. |
| Over-rounded components | Large radii are applied everywhere because they look friendly, not because they match density, brand, or component anatomy. | Radius roles by component purpose: control, card, overlay, badge, input, or media treatment. |
| Decorative gradients | Gradients appear as background filler without improving focus, depth, brand, or state. | Purpose-bound surface, emphasis, or illustration guidance with contrast and restraint limits. |
| Vague spacing | Spacing is described as roomy, clean, or balanced without component density rules. | Density decisions per surface: compact, moderate, spacious, editorial, operational, or mobile-first. |
| Default typography | System sans with a generic scale is treated as a visual direction. | Type roles for display, heading, body, label, data, and UI controls, with rhythm and readability constraints. |
| Unsupported flourishes | Shadows, blurs, bokeh, glass, grain, icons, motion, or illustrations are added without source, task, or accessibility rationale. | Style-calibrated effects tied to brand evidence, component role, user comprehension, or state feedback. |

## Stronger Replacement Patterns

### Palette

Do not generate a palette by choosing a primary hue and tinting everything.
Instead:

- Define `color.action.primary`, `color.action.secondary`, and status roles only
  when the product task needs them.
- Define surfaces by role: default, raised, muted, inverse, overlay, selected,
  warning, or critical.
- State supported `useOn` surfaces and contrast requirements.
- Keep decorative accent colors subordinate to action and status clarity.

### Typography

Do not treat font family as the whole type system. Instead:

- Define what each text role does: display, heading, body, label, metadata,
  data, helper, error, or legal.
- Use weight, line height, size, and spacing to create a scan path.
- Tie type contrast to category fit: editorial, operational, clinical,
  developer, commerce, luxury, or service.
- Mark guessed font families as recommended or inferred, not observed.

### Components

Do not make cards, pills, badges, and soft buttons the default visual language.
Instead:

- Use `.convention/design-system/component-selection-guidelines.md` to justify the
  component pattern.
- Define component anatomy before styling.
- Give each reusable component variants, states, usage limits, and avoid rules.
- Treat action hierarchy as a system decision: one primary action model per
  context.

### Spacing, Radius, And Elevation

Do not hide weak hierarchy behind whitespace and shadows. Instead:

- Tie spacing to density and scan behavior.
- Use radius to express component family, not global decoration.
- Use elevation for grouping, overlay, affordance, or emphasis only.
- Document when flat surfaces, borders, dividers, or negative space should
  replace card containers.

### Imagery, Texture, And Motion

Do not add visual flourishes because the interface needs "more design." Instead:

- Use imagery when it reveals the product, place, state, person, proof, or
  process users need to inspect.
- Use texture only when it supports brand category and remains legible.
- Use motion posture as state or prototype handoff guidance, not final animation
  code.
- Document avoid rules for blur, glass, glow, grain, decorative icons, and
  stock-like media.

## Style Reference And Calibration Checks

Before accepting visual direction:

1. Identify whether the style comes from user input, observed UI, a
   `StyleReference`, a generated recommendation, or a local patch.
2. Use `.convention/design-system/visual-style-calibration.md` to translate the style
   into contrast, density, hierarchy, restraint, texture, imagery, motion
   posture, and category fit.
3. Map calibrated decisions into token roles, component variants, rules, and
   handoff notes.
4. Keep local style patches local. Do not rewrite global seed choices for a
   single section or component unless the user asks for a global system change.
5. Preserve accessibility and responsive constraints even when the style pushes
   toward expressive visuals.

## Review Prompts

Use these prompts when reviewing AI-generated design-system output:

- Could this seed describe almost any SaaS, portfolio, or landing page? If yes,
  which token, component, or density decisions make it specific to this product?
- Are all surfaces cards? If yes, which content should become a table, list,
  inline group, panel, editorial section, or form step?
- Is hierarchy carried only by font size? If yes, what role should weight,
  spacing, contrast, grouping, and action priority play?
- Does the palette rely on one hue family? If yes, where are neutral surfaces,
  status roles, text roles, and action hierarchy defined?
- Are gradients, shadows, glass, blur, or illustrations doing a job? If not,
  remove them or constrain them to a documented role.
- Are radius and shadow values consistent with brand/category fit, or just
  default friendly UI styling?
- Are token names semantic, or do they encode colors, sizes, style names, or
  component internals?
- Are inferred values clearly marked, or did the output launder guesses into
  authoritative production decisions?
- Does mobile behavior preserve hierarchy, or does the desktop design simply
  stack into generic cards?
- Would the same system work unchanged for a healthcare service, analytics
  dashboard, ecommerce product page, and developer tool? If yes, it is probably
  under-calibrated.

## Minimum Repair Bar

A weak or generic seed is not repaired by adding more adjectives. A repair must
change at least one concrete system decision:

- token role, usage, source, confidence, or contrast note
- typography role, hierarchy, or readability rule
- component variant, anatomy, state, usage limit, or avoid rule
- density, spacing, radius, elevation, or surface rule
- imagery, texture, or motion-posture handoff note
- source reference, preserve rule, or open question

If none of those change, the review is only commentary and the design system is
still generic.
