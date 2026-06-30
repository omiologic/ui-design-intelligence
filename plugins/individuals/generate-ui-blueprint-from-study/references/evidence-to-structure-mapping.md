# Evidence To Structure Mapping

Use this reference when converting study findings into UIBlueprint nodes,
roles, states, annotations, and handoff assumptions.

## Translation Principle

Every structural decision should trace back to one of three sources:

1. Observed evidence from the study.
2. Approved vocabulary from shared schemas and vocabulary files.
3. Explicit inference that is named as an assumption or handed off for planning.

If a decision cannot be traced to one of those sources, do not hide it inside the
blueprint.

## Mapping Rules

| Study Evidence | Blueprint Translation | Notes |
| --- | --- | --- |
| Page route, screen, or full-page journey | `page` root with `header`, `main`, and `footer` when observed or required by context | Do not invent a complete marketing page when the study only covers one section. |
| First viewport promise and primary action | `hero`, `heading`, `paragraph`, `buttonGroup`, `button` with `primaryCTA` role | Preserve the studied action priority unless the study flags it as a problem. |
| Repeated proof, testimonials, statistics, reviews, or trust signals | `section`, `card`, `contentGroup`, or role such as `trustSignal` | Keep proof placement when it explains the decision journey. |
| Feature, service, product, or option group | `section`, `cardGrid`, `card`, `list`, or `contentGroup` | Pick structure by relationship, not by default grid habit. |
| Form, booking, checkout, signup, or contact flow | `form`, `inputGroup`, `button`, `banner`, relevant states | Include error, loading, disabled, and success states when the study mentions them or the form requires them. |
| Overlay, drawer, popover, disclosure, or modal behavior | Overlay node with approved `type`, `state`, trigger, dismissal, focus notes | Do not create a `dialog` unless the task is blocking. |
| Navigation, tabs, filters, search, or account controls | Approved navigation or control nodes and interaction states | Preserve labels and grouping when observed. |
| Responsive change such as stacking, sticky CTA, hidden nav, or reordered content | `responsive` notes at blueprint or node level | Never drop required content or actions on mobile. |
| Accessibility finding such as landmark, label, focus, or keyboard behavior | `accessibility` annotation on the relevant node | Distinguish required accessibility structure from visual implementation. |
| Ambiguous or missing structure | `assumptions`, annotation text, or planner handoff | Do not silently fill gaps with generic sections. |

## Traceability Checklist

- Each major node can point to a study finding, page region, or required
  structural convention.
- Each non-obvious role, layout, state, or overlay has a short rationale.
- Unsupported content, copy, proof, or page order is marked as an assumption or
  sent to a planner.
- Study uncertainty is preserved in annotations or handoffs.
- Output uses approved node types, content roles, layout patterns, and
  interaction states.
- The final blueprint can pass schema validation after assembly.

## Uncertainty Handling

- Use observed labels when the study supplies them.
- Use neutral structural labels when the study names a region but not final copy.
- Mark missing details as assumptions, not facts.
- Hand off unresolved page ordering to `page-wireframe-planner`.
- Hand off unresolved component anatomy or state coverage to
  `component-wireframe-planner`.
- Hand off unclear terminology to `design-terminology`.

## Anti-Patterns

- Generic landing-page inflation: a small study becomes a full page with hero,
  feature cards, FAQ, and CTA without evidence.
- Evidence loss: a generated blueprint looks plausible but no longer carries the
  study's journey, proof order, or interaction findings.
- Hidden invention: missing sections, states, overlays, or claims appear without
  being marked as assumptions.
- Vocabulary drift: study language is copied directly when approved node types,
  roles, layouts, or states require normalization.
- Happy-path collapse: forms, overlays, and data components lose error, loading,
  empty, disabled, or success states from the study.
- Mobile erasure: responsive notes omit a sticky action, collapsed navigation, or
  reordered priority that the study observed.

## Command Decision

A future deterministic command could compare study finding IDs or labels against
blueprint annotations to check that required evidence was carried forward. That
check should validate traceability metadata and vocabulary use; it should not
try to decide UX quality. This skill does not need a subagent by default because
the study and translation can be separated through workflow gates and handoffs.

## Worked Example

Study finding:

```json
{
  "label": "Proof appears before service details",
  "evidence": "Trust signals and testimonials appear before the step-by-step service explanation.",
  "interpretation": "The page treats confidence as a prerequisite for reading service details.",
  "handoff": "Preserve proof before service detail unless page planning finds a stronger order."
}
```

Blueprint translation:

```json
{
  "id": "homepage-proof-section",
  "type": "section",
  "label": "Proof Before Service Detail",
  "layout": "cardGrid",
  "children": [
    {
      "id": "homepage-proof-card",
      "type": "card",
      "label": "Trust Signal",
      "role": "trustSignal"
    }
  ]
}
```

Translation note: this section should appear before the service-detail section
because the study evidence says trust is a prerequisite in the page journey. If
the final blueprint format supports annotations, carry the finding label or
evidence summary forward with the node.
