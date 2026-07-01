# Multi-Step Form End-To-End Example

This example demonstrates the Sprint 006 creation chain for a transactional
multi-step form:

```txt
brief -> study / requirements -> design-system seed -> wireframe -> prototype config
```

## Files

- `brief.md`: source requirements for the claim intake flow.
- `multi-step-form.study.example.json`: requirements artifact for steps,
  validation, review, success, and recovery.
- `multi-step-form.design-system-seed.example.json`: compact form-focused seed.
- `multi-step-form.ui-blueprint.json`: schema-backed form wireframe.
- `multi-step-form.prototype-config.example.json`: prototype behavior config for
  step transitions, validation, backtracking, save/resume, and success.

## Decisions

- The flow uses a transactional register. Progress and current-step context stay
  visible before the form controls.
- Validation includes inline field errors and an error summary so users can
  recover from multiple missing fields.
- Review is a separate state before submit because the claim has high user
  consequence.
- Save-and-resume is modeled as a recovery path, not a competing primary action.

## Handoff

- Use `create-design-spec` to turn this chain into implementation-facing form
  requirements.
- Use `create-prototype-plan` when adding extra steps such as identity
  verification, document upload, or claim status tracking.
