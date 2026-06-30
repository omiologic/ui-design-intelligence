# Style Application

## Decision Heuristics

Use `StyleApplication` for an intent to apply style and `StylePatch` when an
existing seed, section, component, or prototype artifact should be changed
without replacement.

Prefer this normalized prompt syntax when turning user requests into structured
style applications:

```txt
style: <style-id>
scope: site | page | section | component | prototype
target: <target-id or label>
intensity: subtle | medium | strong | experimental
preserve:
  - <brand, token, typography, component, structure, or behavior to keep>
applyTo:
  - <surface, layout, component, motion, or local treatment to change>
avoid:
  - <accessibility, compatibility, or overuse risk to prevent>
```

If the user gives free-form wording, normalize it before acting:

| User wording | Normalize as |
| --- | --- |
| "Make the whole site Japandi" | `style: japandi`, `scope: site`, `intensity: subtle` unless requested otherwise |
| "Only the hero should feel Art Deco" | `style: art-deco`, `scope: section`, `target: hero`, preserve global seed |
| "Bento pricing cards, keep the brand" | `style: bento-box`, `scope: section` or `component`, preserve palette and typography |
| "Glass dialog" | `style: glassmorphism`, `scope: component`, target dialog shell only |
| "Make interactions utilitarian" | `style: utilitarian`, `scope: prototype`, apply to behavior vocabulary |

### Scope Workflows

Site application:

1. Confirm the style should affect global visual direction.
2. Preserve user-provided brand identity, logo, and hard requirements.
3. Apply style guidance to palette, typography, surfaces, component defaults,
   header, footer, and prototype feel.
4. Hand seed-level mapping to `map-style-to-design-system-seed`.

Page or section application:

1. Preserve global seed values unless the request explicitly overrides them.
2. Apply style to local backgrounds, dividers, cards, CTA panels, imagery,
   heading treatment, or local component variants.
3. Use a `StylePatch` when an existing seed or blueprint target exists.
4. Do not alter unrelated section order, page purpose, or primary CTA hierarchy.

Component application:

1. Preserve component anatomy, labels, state requirements, and accessibility
   behavior.
2. Apply style to the shell, border, radius, shadow, density, icon treatment,
   state treatment, or local interaction feel.
3. Include avoid rules for low contrast, unclear states, and hit-target issues.

Prototype application:

1. Apply style only to behavior vocabulary: motion tone, hover states,
   transitions, surface depth, overlays, feedback, validation, and recovery.
2. Do not choose runtime libraries, animation implementation, or exact timing.
3. Respect reduced-motion and accessibility constraints.

## Anti-Pattern

Do not treat a local style request as permission to change the whole site,
brand, structure, or component system.

Do not accept missing scope. If scope is not stated, infer the narrowest
reasonable target from the user wording or ask for clarification when the
request would otherwise change global design decisions.

## Worked Example

For "make the pricing cards Bento Box but keep the brand," produce a section or
component patch that changes card layout, spacing, and grouping while preserving
brand palette and body typography.

Additional examples:

- Whole site: apply `japandi` at `site/subtle`, preserving logo, legal content,
  and primary CTA wording while mapping warm surfaces, quiet type, calm cards,
  and gentle prototype feedback.
- Hero only: apply `art-deco` at `section/medium`, preserving the page CTA and
  brand palette while adding geometric heading framing and refined divider
  treatment.
- Pricing section: apply `bento-box` at `section/medium`, preserving price
  hierarchy while changing card grouping and featured-plan emphasis.
- Card grid: apply `bento-box` at `component/medium`, preserving card labels and
  actions while adding tile variants and stable hover states.
- Dialog: apply `glassmorphism` at `component/medium`, preserving information
  architecture, labels, and button hierarchy while changing only the dialog
  shell and overlay depth.
- Drawer: apply `utilitarian` at `component/medium`, preserving route structure
  while emphasizing direct labels, focus states, and quick open/close behavior.
- Badge system: apply `neo-brutalism` at `component/subtle`, preserving status
  semantics while strengthening border, contrast, and label clarity.

## Hand-Off

Hand patchable design-system changes to `map-style-to-design-system-seed` and
hand local structure constraints to blueprint or prototype workflows.
