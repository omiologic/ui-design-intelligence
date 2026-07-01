# Design System Layer Architecture

## Decision

Sprint 003 adds a lightweight design-system layer between reusable knowledge and
blueprint/prototype generation.

The pipeline order is:

```txt
study -> knowledge -> design system foundation -> blueprint/wireframe -> prototype
```

This layer is a generation contract. It defines the vocabulary, token intent,
component foundations, state names, layout conventions, accessibility
constraints, and uncertainty metadata that downstream generators may rely on. It
is not a finished UI kit, production component library, or governance program.

## Sprint 003 Scope

`ui-design-system-skills` should produce and audit enough design-system
foundation to keep generated blueprints, wireframes, and prototype specs
consistent.

In scope:

- `DesignSystemSeed` generation from prompt, screenshot, URL capture,
  `StudyOutput`, knowledge patterns, or mixed input
- brand, palette, typography, iconography, buttons, cards, header, and footer
  foundation sections
- token intent, semantic usage, source, and confidence metadata
- component anatomy, variants, allowed states, and basic interaction contracts
- layout rules, content roles, responsive assumptions, and accessibility notes
- naming, completeness, and consistency audits for seed/foundation artifacts

Out of scope for Sprint 003:

- production React/Vue/Svelte components
- final typography, final palette, final spacing scale, or polished visual
  system decisions
- design-token build pipelines for Style Dictionary, Figma, CSS variables, or
  app packages
- versioned design-system governance, contribution workflow, migration planning,
  changelog policy, or deprecation process
- renderer/runtime behavior, visual editor behavior, hosting, or export engines

## Artifact Ownership

| Artifact | Owner | Responsibility | Downstream Use |
| --- | --- | --- | --- |
| `DesignSystemSeed` | `ui-design-system-skills` | Initial normalized foundation generated from prompt, screenshot, URL capture, study output, knowledge patterns, or mixed input. | Gives blueprint, wireframe, and prototype skills a consistent brand/component baseline. |
| `DesignSystemFoundation` | `ui-design-system-skills` | More explicit design contract derived from the seed: token names, component vocabulary, state names, layout rules, content roles, and accessibility rules. | Constrains generation without requiring final production design-system governance. |
| Token specs | `ui-design-system-skills` | Define semantic token intent, value when known, source, confidence, usage, use-on, do-not-use-on, and accessibility notes. | Helps generators choose meaningful roles such as `color.action.primary` instead of raw visual guesses. |
| Component specs | `ui-design-system-skills` | Define component anatomy, variants, required parts, allowed states, allowed actions, responsive behavior, and accessibility requirements. | Lets blueprint and prototype skills select components and states without inventing terms. |
| Design-system audits | `ui-design-system-skills` and `ui-audit-skills` | Report naming drift, missing foundation sections, inconsistent component/state usage, low-confidence assumptions, and accessibility gaps. | Blocks or annotates downstream generation when the design-system contract is incomplete. |
| Blueprint/wireframe outputs | `ui-blueprint-skills` | Apply selected knowledge patterns and design-system constraints to a planned structure. | Preserve structure and reference seed/foundation artifacts for lineage. |
| Prototype config | `ui-prototype-skills` | Add screens, routes, state models, events, transitions, overlays, forms, and navigation flow over wireframe concepts. | Use design-system component states and interaction vocabulary as allowed behavior. |

## Maturity Labels

Use maturity labels to prevent enterprise design-system assumptions from leaking
into early prototype work.

| Label | Meaning | Required Discipline |
| --- | --- | --- |
| `designSystemSeed` | Initial normalized foundation from available inputs. Values may be observed, inferred, recommended, generated, or user-provided. | Must mark source and confidence where exactness matters. Must include open questions. |
| `brandStyleGuide` | A visual/voice guide with brand direction and basic usage rules. | May inform tone and visual direction, but does not define component behavior by itself. |
| `componentStarterKit` | A small component vocabulary and anatomy set. | Defines names, variants, parts, and states for common components without implying production implementation. |
| `prototypeDesignSystem` | A contract tuned for interactive prototype generation. | Must define allowed component states, interaction actions, overlays, validation states, and responsive behavior. |
| `productionDesignSystem` | A governed, versioned system used by product teams and codebases. | Requires governance, release process, deprecation policy, accessibility compliance, token build pipeline, and implementation docs. Out of Sprint 003 scope. |

Sprint 003 targets `designSystemSeed`, early `componentStarterKit`, and enough
`prototypeDesignSystem` structure to support later prototype config work. It does
not target `productionDesignSystem`.

## Integration Rules

Blueprint and wireframe skills may consume design-system artifacts under these
rules:

- Prefer semantic roles over raw values. Use token intent such as
  `color.action.primary` or `button.primary` when present.
- Treat low-confidence fields as suggestions, not facts. Preserve open questions
  in generated output or lineage.
- Do not infer exact color, font, spacing, icon library, or brand claims from a
  screenshot unless the source evidence supports it.
- Use component specs to choose anatomy, variant, state, and responsive behavior.
- Keep blueprint output structural. It may reference design-system roles, but it
  should not become a final visual spec.
- Record the design-system seed or foundation ID in lineage when it materially
  affects a generated blueprint.

Prototype skills may consume design-system artifacts under these rules:

- Use component state models from the design-system foundation as the allowed
  state vocabulary for prototype config.
- Use allowed actions and overlay rules before inventing behaviors such as
  dialog, drawer, popover, toast, sticky bar, validation, loading, error, or
  success behavior.
- Treat design-system accessibility rules as prototype constraints, especially
  focus behavior, keyboard dismissal, field-error placement, and touch-target
  requirements.
- Do not add runtime/editor responsibilities to design-system artifacts.
  Prototype config describes behavior; a future runtime may implement it.

## Validation Implications

Later Sprint 003 tasks should add deterministic checks that:

- required seed sections exist for brand, palette, typography, iconography,
  buttons, cards, header, and footer
- generated or inferred values carry source/confidence metadata where needed
- token, component, variant, and state names match controlled vocabulary
- audit outputs flag missing sections, ambiguous names, and unsupported exactness
- blueprint/prototype examples reference design-system artifacts by ID rather
  than copying ad hoc values

## Project Config Convention

Design-system skills should look for a project-local config file named:

```txt
.ui-design-intelligence.yml
```

The repository template lives at:

```txt
.convention/templates/ui-design-intelligence.config.yml
```

The config records project defaults for audience, industry, design-system output
directory, required seed sections, confidence threshold, knowledge workspace,
blueprint output, prototype output, and capture viewports. Skills should use
these defaults before asking repeat setup questions.

## Split Boundary

Keep skills, schemas, vocabulary, examples, commands, agents, audits, and
lineage in this repository.

Split only later if a separate package needs to own a real runtime, renderer,
visual editor, hosted preview, interaction engine, export engine, or independent
release cycle.
