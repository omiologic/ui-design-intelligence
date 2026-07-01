# Style Reference Layer Architecture

## Decision

Sprint 003 adds a style-reference layer between reusable knowledge and
design-system seed generation.

The pipeline order is:

```txt
study -> knowledge -> style reference -> design system foundation -> blueprint/wireframe -> prototype
```

This layer is a controlled visual vocabulary. It turns style names, visual
references, screenshots, prompts, and curated examples into structured records
that downstream skills can recommend, apply, blend, audit, and map into design
system seed decisions.

Style references are data records, not one skill per named style. The repository
should store styles as normalized shared assets and expose a small skill set for
working with them.

## Why Styles Are Data

A skill per style would make the system harder to maintain and combine. It would
also make local application awkward: applying `glassmorphism` to one dialog or
`bento-box` to one pricing section should not require a separate skill branch or
a regenerated site theme.

Style records should be searchable, schema-valid, source-aware, and composable.
A single record can describe visual DNA, mood, best use cases, avoid cases,
scope-specific application rules, design-system mapping, component mapping,
prototype mapping, accessibility risks, compatibility, implementation hints, and
source metadata.

The style skill set should operate on those records:

- recommend suitable styles for a project, industry, audience, scope, and goal
- extract a style reference from a prompt, article summary, screenshot, or study
- generate a normalized style reference record
- apply a style reference to a site, page, section, component, or prototype
- blend style references with explicit ratios and conflict rules
- audit whether a style was applied coherently and accessibly
- map style records to `DesignSystemSeed` fields or style patches

## Sprint 003 Scope

`ui-style-reference-skills` should define the first reusable style vocabulary
and the rules for applying it without collapsing visual direction, design-system
foundation, blueprint structure, and prototype behavior into one artifact.

In scope:

- style-reference architecture, schemas, starter records, examples, templates,
  validation, commands, skills, agent scaffolding, and bundle packaging
- normalized MVP style records such as `bento-box`, `glassmorphism`, `japandi`,
  `brutalism`, `neo-brutalism`, `art-deco`, `luxury-typography`, `aurora`,
  `bauhaus`, and `utilitarian`
- scope-aware style application for site, page, section, component, and
  prototype targets
- intensity levels: `subtle`, `medium`, `strong`, and `experimental`
- structured style patches that preserve existing design-system decisions
- style blends with primary/secondary ratios and conflict-resolution rules
- compatibility and accessibility guidance
- source metadata for external references, screenshots, prompts, studies, and
  generated records

Out of scope for Sprint 003:

- a fully exhaustive style encyclopedia
- one skill, command, or bundle per named style
- copying third-party article prose into distributed records
- final visual design, rendered mockups, production CSS, or implementation code
- production design-system governance or token build pipelines
- prototype runtime, preview player, visual editor, or export engine behavior

## Artifact Ownership

| Artifact | Owner | Responsibility | Downstream Use |
| --- | --- | --- | --- |
| `StyleReference` | `ui-style-reference-skills` | Normalized style record with visual DNA, mood, scope rules, mappings, risks, compatibility, implementation hints, and source metadata. | Gives design-system, blueprint, and prototype skills a stable visual vocabulary. |
| `StyleApplication` | `ui-style-reference-skills` | A request to apply one style to a scope, target, and intensity with preserve/apply/avoid rules. | Lets generators apply style globally or locally without ambiguous prompt text. |
| `StyleBlend` | `ui-style-reference-skills` | A structured combination of primary and secondary styles with ratios and conflict rules. | Prevents vague hybrid prompts from producing contradictory output. |
| `StylePatch` | `ui-style-reference-skills` | A scoped set of changes to an existing design-system seed, section, component, or prototype behavior spec. | Preserves existing brand, typography, palette, or component decisions while applying visual treatment. |
| Style recommendation | `ui-style-reference-skills` | Recommends 2-5 styles with scope, intensity, reasons, and avoid guidance. | Helps users choose visually plausible styles for an industry, audience, conversion goal, and constraints. |
| Design-system seed | `ui-design-system-skills` | Converts selected style mappings into brand, palette, typography, iconography, button, card, header, and footer foundations. | Turns visual vocabulary into reusable token and component contracts. |
| Blueprint/wireframe outputs | `ui-blueprint-skills` | Apply structural choices while referencing selected style/design-system artifacts. | Keep structure separate from visual treatment. |
| Prototype config | `ui-prototype-skills` | Uses style prototype mapping for motion tone, transitions, hover states, surface depth, and feedback vocabulary. | Adds interaction feel without requiring a runtime. |

## Scope Semantics

Style application must name the target scope. If scope is omitted, skills should
ask for clarification or choose the narrowest reasonable scope.

| Scope | Meaning | Typical Targets | Rules |
| --- | --- | --- | --- |
| `site` | Global visual direction across the project. | palette, typography, surface language, illustration, layout rhythm | Use low or medium intensity unless the project brief explicitly asks for a dominant style. |
| `page` | Primary visual direction for one page. | homepage, product page, landing page, dashboard | May influence hero, section backgrounds, cards, and CTA panels while preserving global brand constraints. |
| `section` | Local treatment for one section. | hero, pricing, features, testimonials, FAQ, comparison | Must not rewrite unrelated sections or global design-system values. |
| `component` | Variant treatment for one component family or instance. | cards, dialog, drawer, button group, badge, navigation item | Should produce component-level rules or a style patch rather than a full seed replacement. |
| `prototype` | Interaction feel and behavior tone. | motion, transitions, hover states, feedback, overlays, depth | Must describe behavior vocabulary only; runtime implementation remains out of scope. |

## Intensity Levels

Use intensity to prevent expressive styles from overpowering practical UI work.

| Intensity | Meaning | Example Behavior |
| --- | --- | --- |
| `subtle` | Style cues are restrained and secondary to brand clarity. | Small motifs, token suggestions, restrained surfaces, minimal decorative treatment. |
| `medium` | Style is visible but still compatible with business UI norms. | Clear surface treatment, layout rhythm, typography or component variants, controlled accent use. |
| `strong` | Style is a primary visual signal. | Distinct motifs, high-contrast palette choices, pronounced component treatment, stronger layout character. |
| `experimental` | Style may intentionally break conventional UI expectations. | Use only when the brief accepts higher risk; must preserve accessibility and task completion constraints. |

## Boundary With Neighboring Layers

Style recommendations answer: Which visual direction is appropriate for this
project, scope, industry, audience, goal, and constraint set?

Style references answer: What reusable visual vocabulary defines the style?

Style applications and patches answer: How should that vocabulary affect this
specific site, page, section, component, or prototype behavior target while
preserving selected decisions?

Design-system seed generation answers: Which brand, token, typography,
iconography, component, state, accessibility, and layout conventions should
constrain generation?

Blueprint and wireframe generation answer: What structure should be built now?

Prototype config answers: How should screens, states, events, transitions,
overlays, forms, and navigation flows behave?

Do not let style records own final visual design, structural page planning,
production token governance, runtime behavior, or implementation code.

## Integration Rules

Design-system skills may consume style artifacts under these rules:

- Map style fields into seed/foundation roles rather than copying prose.
- Preserve existing seed values when `StyleApplication.preserve` or a
  `StylePatch` says to keep brand, palette, typography, or component decisions.
- Treat style compatibility and accessibility risks as constraints, not
  optional notes.
- Record style IDs and source references in lineage when they materially affect
  generated design-system decisions.

Blueprint and wireframe skills may consume style artifacts under these rules:

- Use style only to guide visual treatment and component selection constraints.
- Do not let a style change the page goal, section order, information
  architecture, or accessibility structure unless a separate blueprint decision
  supports that change.
- Use local scope when style is requested for only a section or component.
- Keep output structural and reference style/design-system artifacts by ID.

Prototype skills may consume style artifacts under these rules:

- Use `prototypeMapping` for motion tone, transition character, hover state
  treatment, overlay depth, and feedback feel.
- Do not invent a runtime, animation library, or implementation details.
- Apply reduced-motion and accessibility constraints before expressive motion.

## Validation Implications

Later Sprint 003 tasks should add deterministic checks that:

- style ids, category ids, scopes, intensity values, and mapping keys match
  controlled vocabulary
- each style record includes source metadata and avoids copied third-party prose
- style applications include scope, target, intensity, preserve rules, apply
  rules, and avoid rules where needed
- style blends include ratios and conflict-resolution rules
- style patches preserve existing seed decisions when requested
- examples cover site, page, section, component, and prototype application

## Split Boundary

Keep style schemas, records, templates, examples, validation scripts, skills,
commands, agents, bundle manifests, and interop docs in this repository.

Split only later if a separate package needs to own rendered visual style
exploration, image generation, mockup production, CSS/token build output, a
preview app, a visual editor, or a prototype runtime.
