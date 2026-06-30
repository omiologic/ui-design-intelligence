---
name: page-wireframe-planner
description: Plan page-level UIBlueprint structure, journey, section order, and handoff notes for websites and product pages before final JSON assembly.
license: See repository LICENSE
---

# Page Wireframe Planner

Use this skill when the user needs page composition decisions: journey, section
order, CTA cadence, page-level overlays, and responsive priorities. Use
`generate-wireframe-config` afterward when the plan must be emitted as final
schema-valid JSON.

## Purpose

Plan full pages with clear user journeys, section order, layout intent,
responsive behavior, overlays, and accessibility expectations.

## Philosophy

A page wireframe earns its value by making the sequence of decisions visible
early. It should answer what the user is trying to do, what they need before
acting, how proof and comparison support that action, and what can safely wait
until later. Fidelity is intentional: add enough structure to test scope and
handoff assumptions, but do not drift into visual design.

The page job and user journey come first. A familiar page pattern is only useful
when it supports the specific path from orientation to trust, detail,
comparison, action, and recovery.

## References

- `references/page-patterns.md`
- `references/page-planning-rubric.md`
- `references/page-section-ordering.md`
- `references/_shared/wireframe-schema/wireframe-config.schema.json`
- `references/_shared/wireframe-schema/valid-node-types.md`
- `references/_shared/vocabulary/node-types.json`
- `references/_shared/schemas/wireframe-config.schema.json`
- `references/_shared/design-philosophy/page-section-ordering.md`
- `references/_shared/design-philosophy/blueprint-locks.md`
- `references/_shared/design-philosophy/preflight-checklist.md`
- `references/_shared/taste-profiles/README.md`
- `references/_shared/taste-profiles/conversion.json`
- `references/_shared/taste-profiles/utility-product.json`

## Decision Criteria

1. Start with the primary user goal, then choose the section sequence that helps
   a user orient, trust, compare, act, and recover.
2. Put essential orientation and one primary action early; place proof before
   commitment when the decision is high-friction.
3. Select and apply a structural taste profile before drafting section order:
   use `conversion` for marketing, landing, service, ecommerce, and high-trust
   conversion pages; use `utility-product` for dashboards, app screens, account,
   settings, records, comparison, and repeated task flows. If neither profile
   fits, state the reason and fall back to neutral schema vocabulary plus the
   page-section-ordering references.
4. Use a utility/product sequence for repeated work, account, settings, or
   operational pages; use a conversion sequence for landing, service, or product
   marketing pages.
5. Apply the selected profile structurally, not visually: `sectionOrder` sets the
   preferred journey jobs, `preferredStructures` biases node and layout choices,
   and each entry's `reason` explains why that job belongs in the sequence.
6. Add overlays only for work that is interruptive, supplemental, or persistent
   enough to need separate trigger and dismissal behavior.
7. Preserve action and information priority across desktop, tablet, and mobile;
   responsive notes are about equivalence, not just stacking.
8. For form, dashboard, transactional, content, and utility pages, plan the task
   path first instead of forcing a marketing sequence.

## Boundary

- Owns: page journey, section order, page-level locks, page CTA cadence,
  page-level overlay justification, and responsive priority.
- Does not own: raw schema explanation, reusable component internals, or final
  JSON assembly from an already settled plan.
- Hand off unresolved node representation questions to `wireframe-schema`.
- Hand off final emission to `generate-wireframe-config`.

## Rules

1. Make the main journey legible before filling secondary content.
2. Use representative content roles rather than filler sections.
3. Declare page-level locks such as primary CTA, navigation model, overlay model,
   and responsive priority when they shape downstream work.
4. Annotate conditional flows, forms, filters, and sticky UI that reviewers
   cannot infer from the node tree.
5. Each section must advance orientation, trust, comparison, action, or recovery.
6. Existing validation can check selected page-level preflight criteria, but this
   skill does not need a new command or subagent by default.

## Anti-Patterns

- Equal-weight section stack: every band has the same density, so no priority is
  visible.
- CTA scatter: several unrelated primary actions compete before the user knows
  what to do.
- Conventional ordering without rationale: a familiar hero, logo strip, cards,
  FAQ, and CTA sequence appears even when it does not match the page job.
- Decorative section with no role: it consumes page space without advancing
  orientation, trust, comparison, action, or recovery.
- App page marketing drift: workflow pages over-explain instead of putting
  current state, controls, states, and recovery first.
- Dashboard data dump: dense charts and tables appear without status summary,
  timeframe, filters, or diagnostic action.
- Proof after commitment: high-friction pages ask users to book, pay, apply, or
  submit before credibility and eligibility are clear.
- Mobile afterthought: desktop order is copied to mobile even when the task path
  changes.

## Workflow

1. Name the page type, audience, primary goal, and success action.
2. Select a taste profile from the user's stated register or inferred page job,
   then state the selected profile and why. If no profile applies, state the
   fallback.
3. Identify friction: trust, risk, complexity, cost, urgency, regulation, data
   density, or recovery needs.
4. Pick a section-ordering model from the references and reconcile it with the
   selected profile's `sectionOrder`.
5. Draft header, main sections, footer, and only justified overlays. For each
   major section, map the profile job to a concrete section purpose and prefer
   structures from `preferredStructures` when they match the schema vocabulary.
6. Declare page-level locks: primary action, CTA cadence, navigation model,
   overlay model, responsive priority, and open assumptions.
7. Add responsive equivalence notes from the selected profile's
   `responsivePriority` and the page-specific task path.
8. Add accessibility notes for navigation, forms, overlays, and sticky controls.
9. Stop at the structural plan unless the user explicitly asks for final JSON; if
   so, hand the plan to `generate-wireframe-config`.

## Inline Example

Input: "Dental homepage for booking implants consultations."

Output: selected profile `conversion` because this is a high-trust service page.
Use the profile order as orient -> prove -> explain -> resolve objections -> act:
header navigation; hero with booking CTA; early proof and outcomes; treatment
overview; process; insurance/payment support; FAQ; final booking CTA; footer.
Mobile notes keep booking reachable without adding competing primary actions.

Input: "Dashboard page for weekly revenue monitoring."

Output: selected profile `utility-product` because this is a repeated monitoring
task. Use the profile order as establish state -> expose controls -> support
comparison -> show feedback -> support recovery: header and timeframe controls;
status summary; key metrics with alerts; filters; primary trend chart; exception
table; drilldown details; empty, loading, and error states; support/audit trail.
Mobile notes keep status and alerts before dense detail.

Profile-applied JSON sketch:

```json
{
  "metadata": {
    "tasteProfile": "conversion",
    "register": "marketing"
  },
  "root": {
    "type": "page",
    "children": [
      { "type": "header", "label": "Clinic navigation" },
      {
        "type": "main",
        "children": [
          { "type": "hero", "label": "Implant consultation hero", "layout": "splitHero" },
          { "type": "section", "label": "Patient proof before treatment details", "layout": "cardGrid" },
          { "type": "section", "label": "Implant process and eligibility" },
          { "type": "accordion", "label": "Cost and recovery objections" },
          { "type": "section", "label": "Final booking action" }
        ]
      },
      { "type": "footer", "label": "Clinic footer" }
    ]
  }
}
```

This is a planning sketch, not final JSON: it shows the conversion profile's
orient -> prove -> explain -> resolve objections -> act sequence before
`generate-wireframe-config` adds stable IDs, annotations, responsive notes,
accessibility notes, and full schema completion.

## Hand-Offs

- Use `section-wireframe-planner` when one section needs deeper anatomy.
- Use `layout-specification` when section arrangement or breakpoint behavior is
  the hard part.
- Use `interaction-patterns` for overlays, sticky bars, filters, and forms.
- Use `generate-wireframe-config` to assemble final UIBlueprint JSON once page
  decisions are settled.
- Use `accessibility-wireframe-review` before final handoff.
