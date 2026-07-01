# Prototype Config Generation

## Decision Heuristics

- Start from a known wireframe or blueprint node map.
- Add behavior as references to existing structure.
- Use `DesignSystemSeed` states and accessibility notes where available.
- Use `RuntimeDesignTheme` when component state styling, status behavior, focus
  rings, disabled treatments, selected treatments, loading indicators, empty
  states, or viewer swatches need a machine-readable theme source.
- Keep unsupported runtime details as implementation notes, not schema fields.

## Runtime Theme Handoff

`PrototypeConfig` may include `runtimeDesignThemeRef` and
`source.sourceRuntimeDesignThemeRef` when a `RuntimeDesignTheme` artifact exists.
Use those refs to connect behavior to viewer-ready theme data:

- map error/success/warning/info prototype states to runtime status roles
- cite focus, disabled, selected, loading, and empty state styling without
  copying token values
- align component state models with runtime component theme variants
- let a future viewer resolve CSS variables, swatch groups, and sample bindings

Do not inline palette values, CSS variable maps, brand asset extraction, or
contrast pair tables into prototype config. Those belong to
`RuntimeDesignTheme`. If a theme does not exist yet, leave
`runtimeDesignThemeRef` unset and add a note that viewer theming is deferred.

## Anti-Pattern

Do not copy the wireframe layout tree into prototype config. The prototype layer
should reference screens, routes, and nodes, then add states and interactions.
Do not copy runtime theme token maps into prototype config; cite the runtime
theme instead.

## Worked Example

For a dental homepage with a hero CTA and mobile sticky CTA, create one screen,
one route, a closed dialog state, an open dialog state, a sticky-bar visible
state, two open-overlay interactions, one Escape close interaction, and an
overlay record with focus return to the triggering CTA.

## Hand-Off

Send incomplete node maps back to blueprint or wireframe skills. Send missing
state semantics to `generate-component-state-model`. Send final config to
`audit-prototype-interactions` before runtime work begins. Send missing palette,
status, component-theme, logo provenance, or viewer export data to
`generate-runtime-design-theme` before claiming viewer-ready handoff.
