# Audit Interactions

## Purpose

Audit interaction behavior, states, forms, overlays, navigation, disclosure
patterns, and feedback flows.

## Use When

- The page or site has meaningful stateful behavior.
- The user wants interaction-specific findings.

## Inputs

- Interaction captures, screenshots, descriptions, or page study notes.
- Optional target workflow or task scenario.

## Workflow

1. Use `ui-interaction-analyst` to inventory triggers, states, and transitions.
2. Use `accessibility-reviewer` to review focus, keyboard, and error recovery.
3. Use `ui-audit-lead` to prioritize interaction findings.
4. Use `generate-interaction-audit-report` for the final interaction report.
5. Use `generate-accessibility-audit-report` for accessibility-specific interaction risks.

## Outputs

- Interaction audit report.
- State and behavior findings with remediation guidance.

## Agents

- `ui-interaction-analyst`
- `accessibility-reviewer`
- `ui-audit-lead`

## Skills

- `generate-interaction-audit-report`
- `generate-accessibility-audit-report`
- `interaction-patterns`
