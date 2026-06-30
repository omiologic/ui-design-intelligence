# Audit Design System Seed

## Purpose

Audit a `DesignSystemSeed` for completeness, naming discipline, cross-section
consistency, provenance, and readiness for downstream generation.

## Use When

- A seed has been generated or edited.
- Blueprint, wireframe, or prototype skills are about to consume a seed.
- A user wants to know whether a seed is ready or where it is weak.

## Inputs

- `design-system-seed.json`
- Optional design-system seed Markdown notes.
- Shared vocabulary and schema references.

## Workflow

1. Use `audit-design-system-completeness` to check required sections,
   source/confidence, semantic token fields, accessibility notes, and open
   questions.
2. Use `audit-design-system-naming` to check token, variant, component,
   anatomy, state, header, and footer naming.
3. Use `audit-design-system-consistency` to check cross-section token,
   component, state, action, and accessibility alignment.
4. Summarize blockers, warnings, suggested fixes, and downstream readiness.

## Outputs

- Design-system seed audit findings.
- Readiness summary for blueprint, wireframe, and prototype generation.
- Recommended fixes or handoffs.

## Agents

- `design-system-architect`

## Skills

- Design-system audit skill family.
