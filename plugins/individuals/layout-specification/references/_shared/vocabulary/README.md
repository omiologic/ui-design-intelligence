# Shared Vocabulary

Use these files as the canonical vocabulary for UI blueprint skills. Skills should reference these terms instead of creating local alternatives for the same concept.

## Files

- `node-types.json` defines valid UI blueprint node `type` values, definitions, allowed child relationships, overlay-only placement, and selected cardinality rules.
- `layout-patterns.json` defines reusable layout pattern names.
- `content-roles.json` defines semantic content roles for text, calls to action, metadata, and trust signals.
- `interaction-states.json` defines common UI states for controls, overlays, and feedback.
- `design-token-types.json` defines token categories and semantic naming examples
  for design-system seed output.
- `component-anatomy.json` defines expected component parts for buttons, cards,
  headers, footers, dialogs, and forms.
- `component-variants.json` defines approved design-system variant names such as
  `button.primary` and `card.service`.
- `layout-roles.json` defines design-system layout roles that complement
  wireframe layout patterns.
- `accessibility-rules.json` defines reusable accessibility rule names for
  design-system seed and prototype contracts.
- `design-system-source-kinds.json` defines source and confidence vocabulary for
  observed, inferred, recommended, generated, and user-provided values.
- `ui-layer-types.json` defines page, section, overlay, sticky, and supporting UI layers.
- `ui-terminology.json` defines study workflow terms for evidence types and handoff targets.
- `audit-severity.json` defines severity levels for audit findings.

## Naming

Use boring, predictable names. Single-word terms are lowercase. Compound vocabulary tokens use lower camel case to match the initial UIBlueprint convention, such as `contentGroup`, `primaryCTA`, and `stickyBar`.

## Node Semantics

Each `node-types.json` record includes:

- `name`: the schema-facing node type token.
- `definition`: a short structural definition.
- `allowedChildren`: node types that may appear directly under this node.
- `overlayOnly`: whether the node is restricted to top-level `overlays` or overlay component roots.
- `rootAllowed`: optional flag for overlay component examples that use an overlay node as `root`.
- `cardinality`: optional child-count rules enforced by the semantic validator.
