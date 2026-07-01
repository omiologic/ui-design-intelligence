# Dashboard End-To-End Example

This example demonstrates the Sprint 006 creation chain for a utility dashboard:

```txt
brief -> study / requirements -> design-system seed -> wireframe -> prototype config
```

## Files

- `brief.md`: source requirements for a finance operations dashboard.
- `dashboard.study.example.json`: requirements artifact that captures status,
  controls, diagnostics, and recovery needs.
- `dashboard.design-system-seed.example.json`: compact design-system seed for a
  dense but readable operations surface.
- `dashboard.ui-blueprint.json`: schema-backed dashboard wireframe.
- `dashboard.prototype-config.example.json`: prototype behavior config for
  filters, stale-data recovery, and validation feedback.

## Decisions

- The dashboard uses a utility-product register. Status and controls appear
  before diagnostics so the operator can orient and adjust the view.
- The warning banner appears before the table because stale data changes whether
  metrics can be trusted.
- The prototype config models the filter drawer, form validation, loading,
  success, stale-data detail, Escape dismissal, and focus return.
- Mobile priority keeps summary, warning, filter access, and diagnostics before
  secondary navigation.

## Handoff

- Use `create-design-spec` with the seed and wireframe when implementation
  teams need component/state details.
- Use `create-prototype-plan` when adding additional dashboard flows such as
  anomaly triage or scenario comparison.
