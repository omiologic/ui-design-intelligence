# Marketing Page End-To-End Example

This example demonstrates the Sprint 006 creation chain:

```txt
brief -> study -> design-system seed -> wireframe -> prototype config
```

## Files

- `brief.md`: source requirements for a B2B SaaS marketing page.
- `marketing-page.study.example.json`: study artifact that captures conversion
  structure and proof-before-commitment logic.
- `marketing-page.design-system-seed.example.json`: compact design-system seed
  for brand, palette, typography, buttons, cards, header, and footer.
- `marketing-page.ui-blueprint.json`: schema-backed wireframe artifact.
- `marketing-page.prototype-config.example.json`: prototype behavior config for
  demo-request interactions.

## Decisions

- The wireframe uses a conversion register. Proof appears before feature detail
  because the visitor needs trust before deeper product explanation.
- The primary CTA is consistently "Request demo"; supporting actions do not
  compete with it.
- The prototype config models the demo dialog, form validation, success
  feedback, Escape dismissal, and mobile sticky CTA.
- Mobile responsive priority preserves promise, action, proof, and objection
  support before lower-priority footer navigation.

## Handoff

- Use `create-design-spec` with the design-system seed and wireframe when an
  implementation-ready spec is needed.
- Use `review-generated-wireframe` before implementation to score the wireframe
  against the blueprint quality rubric.
