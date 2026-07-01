---
name: generate-section-audit-report
description: Generate section-level UI audit findings for heroes, feature grids, FAQs, forms, testimonials, pricing, and repeated page sections.
license: See repository LICENSE
---

# Generate Section Audit Report

Use this skill when a specific page section needs focused evaluation.

## Purpose

Review a bounded section for purpose, hierarchy, content fit, component anatomy,
responsive behavior, accessibility, and handoff into blueprint work.

## Philosophy

A section audit asks whether one bounded part of the page is doing a clear job.
Section quality is not decorative polish; it is role clarity, hierarchy, content
fit, density, reusable anatomy, responsive priority, and how the section hands
the user to the next step. Keep the report focused on the named section and hand
off page sequence problems to page audit.

## References

- `references/section-audit-reporting.md`
- `references/section-severity-remediation.md`
- `../../../shared/schemas/page-audit.schema.json`
- `../../../shared/vocabulary/audit-severity.json`
- `../../../shared/templates/page-audit.md`

## Decision Criteria

1. `critical`: the section alone blocks or invalidates a primary page task.
2. `high`: the section's role, action, input, or required content is missing in a
   primary workflow.
3. `medium`: the section can work but hierarchy, density, proof, labels, or
   responsive order create likely friction.
4. `low`: the section is understandable but handoff detail, reuse boundary, or
   labels are weak.
5. `info`: contextual observation with no corrective action.

## Boundary

- Owns: bounded section reviews covering purpose alignment, hierarchy, content fit, component anatomy, responsive behavior, accessibility signals, and blueprint handoff readiness.
- Does not own: page-level journey evaluation, cross-section IA synthesis, or site-wide pattern findings.
- Hand off full-page evaluation to `generate-page-audit-report`.
- Hand off site-level synthesis to `generate-site-audit-report`.

## Rules

1. Cite section heading, label, role, child structure, proof, controls, repeated
   item anatomy, state notes, responsive notes, or supplied study findings.
2. Mark missing role, proof, input, action, or responsive behavior as inferred
   risk when not directly observable.
3. Do not report page-level ordering, site navigation, visual polish, animation,
   or code behavior unless it is section-scoped evidence.
4. Every finding needs target, evidence, impact, recommendation, and optional
   handoff.

1. Use `section` as `auditType`.
2. Keep findings scoped to the named section or repeated section pattern.
3. Evaluate section role, hierarchy, proof, actions, and responsive behavior.
4. Use severity only for section-level impact.
5. Return JSON matching `page-audit.schema.json`.
6. Use deterministic anti-pattern validation only when a fixture can prove a
   section failure, such as unlabeled content or selected structural anti-patterns.
   This report skill does not need a separate command or subagent yet.

## Anti-Patterns

- Anonymous section: the section has content but no clear role such as orient,
  explain, prove, compare, collect input, or answer objections.
- Decorative block: a band exists only for rhythm and carries no content role.
- Everything grid: unrelated proof, features, metadata, and actions are forced
  into equal cards.
- Uniform density: every item has the same structural weight even when one item
  should lead.
- Context leakage: page navigation, final CTA cadence, or unrelated page concerns
  are audited as if they belong inside the section.
- Unsupported mobile collapse: mobile order buries the section's required action
  or answer.

## Workflow

1. Identify the section, source, viewport, section job, and page context.
2. Review heading, supporting content, proof/input/action, repeated items,
   interaction states, accessibility basics, and responsive behavior.
3. Separate section-scoped evidence from page-level sequencing issues.
4. Assign severity from section impact using `references/section-severity-remediation.md`.
5. Return schema-valid findings with concrete section-level fixes and handoffs.

## Inline Example

```json
{
  "id": "feature-section-audit",
  "source": {
    "urlOrName": "Feature section",
    "viewport": "desktop"
  },
  "auditType": "section",
  "summary": "The feature grid mixes content jobs inside equal repeated cards.",
  "overallSeverity": "medium",
  "findings": [
    {
      "id": "mixed-card-jobs-flatten-hierarchy",
      "title": "Feature cards mix claims, proof, metadata, and CTAs",
      "severity": "medium",
      "category": "structure",
      "target": "features.section",
      "evidence": "Six equal cards combine feature claims, testimonial quotes, badges, metadata, and CTAs.",
      "impact": "Users cannot tell which content is feature, proof, or action.",
      "recommendation": "Keep feature cards comparable, move testimonials into a proof section, and use one section-level CTA after the grid.",
      "handoff": "section-wireframe-planner"
    }
  ]
}
```

## Hand-Offs

Hand off page-sequencing issues to `generate-page-audit-report`. Hand off
cross-page repeated section problems to `generate-site-audit-report`. Hand off
structural remediation to blueprint or section-planning skills.
