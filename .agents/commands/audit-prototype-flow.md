# Audit Prototype Flow

## Purpose

Audit prototype artifacts for schema validity, reference integrity, state
coverage, accessibility behavior, responsive behavior, and runtime handoff
readiness.

## Use When

- A `PrototypeConfig`, interaction flow, or component state model is ready for
  review.
- A future runtime or implementation team needs a blocker list.
- A prototype plan should be checked before build work begins.

## Inputs

- `PrototypeConfig` JSON.
- Optional standalone `InteractionFlow` and `ComponentStateModel` JSON.
- Source wireframe, blueprint, design-system seed, or knowledge references.
- Known user requirements and target viewport assumptions.

## Workflow

1. Use `prototype-architect` to identify expected artifacts and source
   references.
2. Run `audit-prototype-interactions` for schema and cross-reference review.
3. Check overlays, forms, navigation flows, transitions, and mobile-specific
   behavior.
4. Rank findings by severity and note likely fixes.
5. Record whether the config is ready for later runtime/editor work.

## Outputs

- Severity-ranked prototype audit findings.
- Reference and state coverage notes.
- Runtime handoff readiness summary.
- Open questions for generation, design-system, or blueprint follow-up.

## Agents

- `prototype-architect`

## Skills

- `audit-prototype-interactions`
- `generate-component-state-model`
- `generate-interaction-flow`
