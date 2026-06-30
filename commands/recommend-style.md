# Recommend Style

## Purpose

Recommend suitable style references for a project, page, section, component, or
prototype target.

## Use When

- A user needs visual direction before design-system seed generation.
- A project brief has industry, audience, conversion, accessibility, or brand
  constraints.
- Multiple style options need comparison before application.

## Inputs

- Project brief, industry, audience, goals, brand tone, constraints, target
  scope, existing design-system seed, and optional style preferences.

## Workflow

1. Use `style-reference-curator` to frame the target scope and constraints.
2. Use `recommend-style-reference` to rank 2-5 candidate styles.
3. Include style id, scope, intensity, reason, and avoid guidance for each.
4. Flag poor-fit styles when the user asks for a risky direction.
5. Hand the selected style to application, blend, or mapping workflows.

## Outputs

- Style recommendations, avoid list, scope/intensity guidance, and next-step
  handoff notes.

## Agents

- `style-reference-curator`

## Skills

- `recommend-style-reference`
- `audit-style-application`
