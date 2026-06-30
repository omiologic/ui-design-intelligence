---
name: audit-prototype-interactions
description: Audit PrototypeConfig, InteractionFlow, and ComponentStateModel artifacts for reference integrity, accessibility coverage, responsive behavior, and runtime handoff readiness.
license: See repository LICENSE
---

# Audit Prototype Interactions

Use this skill before a prototype config is handed to a runtime, editor, or
implementation team.

## Purpose

Audit prototype artifacts for missing references, incomplete state coverage,
unsafe overlay behavior, form validation gaps, responsive ambiguity, and runtime
handoff risk.

## Philosophy

Prototype audits should prove that behavior is ready to hand off, not that a
runtime will look polished. The audit prioritizes schema validity, reference
integrity, focus and keyboard behavior, overlay dismissal, form failure paths,
responsive conditions, and clear runtime handoff notes. Visual styling,
animation craft, browser QA, and production accessibility certification remain
outside the artifact unless a later implementation package owns them.

## Decision Criteria

1. Use this audit after prototype config or major interaction flows are drafted.
2. Check schema validity and cross-reference integrity first.
3. Check accessibility, keyboard, focus, and validation behavior before polish.
4. Separate blocking issues from improvements and runtime notes.
5. Route fixes to the smallest relevant generation skill instead of rewriting
   the whole prototype artifact by default.

## Boundary

- Owns: interaction audit and readiness assessment.
- Does not own: final runtime implementation, browser QA, visual regression
  testing, final animation polish, visual UI-kit work, or production
  accessibility certification.

## References

- `references/prototype-interaction-audit.md`
- `../../../shared/schemas/prototype-config.schema.json`
- `../../../shared/schemas/interaction-flow.schema.json`
- `../../../shared/schemas/component-state-model.schema.json`
- `../../../shared/vocabulary/interaction-states.json`

## Rules

1. Report findings with artifact id, severity, and fix guidance.
2. Verify references to screens, routes, states, node ids, overlays, forms, and
   transitions.
3. Verify close paths for overlays and failure states for forms.
4. Do not rewrite the config unless explicitly asked.
5. Every overlay must have open, close, focus target, and focus return behavior.
6. Every form must have required field, error, and success paths.
7. Every mobile-only flow must have viewport conditions.
8. Every interaction result must map to a known state or route.

## Anti-Patterns

- Treating schema validity as sufficient interaction quality.
- Omitting keyboard paths for mouse-driven flows.
- Letting runtime assumptions hide missing config.

## Workflow

1. Validate schemas and record parse failures.
2. Check id uniqueness and cross references.
3. Review flows for trigger/action/result completeness.
4. Review state models for disabled, loading, validation, and focus behavior.
5. Review mobile, overlay, form, transition, and navigation behavior.
6. Produce severity-ranked findings and handoff readiness notes.

## Inline Example

```json
{
  "status": "changes_required",
  "artifactId": "appointment-dialog-prototype",
  "findings": [
    {
      "severity": "high",
      "artifactPath": "overlays.appointment-dialog-overlay.dismissal",
      "issue": "Dialog has an open flow but no explicit close button flow.",
      "fix": "Add a closeOverlay interaction for the close button and Escape key."
    },
    {
      "severity": "medium",
      "artifactPath": "forms.appointment-form.validation",
      "issue": "Failure state is listed but no interaction maps submit to error.",
      "fix": "Add a submit flow with whenInvalid condition and form-error result."
    }
  ],
  "handoff": "Return to generate-interaction-flow before runtime handoff."
}
```

## Hand-Offs

Hand fix work to the relevant generation skill. Hand validated config to future
runtime/editor packages only after blockers are resolved.
