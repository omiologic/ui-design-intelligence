# Explain Prototype Interactions

## Purpose

Explain how a prototype config works in human-readable terms while preserving
the ids, states, flows, and source references needed for review.

## Use When

- A stakeholder needs to understand what a prototype config represents.
- An implementation team needs a runtime handoff summary.
- A reviewer needs an interaction map without reading raw JSON first.

## Inputs

- `PrototypeConfig` JSON or selected interaction/state model snippets.
- Optional source blueprint, wireframe, design-system seed, or knowledge notes.
- Specific interaction, screen, route, overlay, or form ids to explain.

## Workflow

1. Use `prototype-architect` to identify the relevant config scope.
2. Summarize screens, routes, states, and entry points.
3. Explain each selected trigger, condition, action, result, and transition.
4. Call out focus, keyboard, validation, and responsive behavior.
5. List missing or ambiguous behavior as open questions.

## Outputs

- Interaction explanation with stable ids.
- Screen and route behavior summary.
- Accessibility and responsive behavior notes.
- Open questions and recommended follow-up skills.

## Agents

- `prototype-architect`

## Skills

- `generate-clickable-prototype-plan`
- `audit-prototype-interactions`
- `study-ui-prototype-behavior`
