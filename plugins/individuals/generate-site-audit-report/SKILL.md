---
name: generate-site-audit-report
description: Generate site-level UI audit reports that compare repeated page patterns, journeys, navigation, accessibility, SEO, and conversion risks.
license: See repository LICENSE
---

# Generate Site Audit Report

Use this skill when multiple pages, templates, or journeys need one prioritized
audit report.

## Purpose

Summarize cross-page UX, IA, interaction, accessibility, SEO, and conversion
quality into evidence-backed findings.

## Philosophy

A site audit is a cross-page pattern review, not a bundle of unrelated page
critiques. The report should explain how navigation, page relationships,
journey continuity, repeated components, metadata, accessibility, and responsive
behavior either reinforce or weaken the user's ability to move through the site.

Strong findings name the system-level pattern first, cite representative pages,
then recommend a fix that can be applied through taxonomy, template, component,
or content-model changes.

## References

- `references/site-audit-reporting.md`
- `references/site-severity-remediation.md`
- `../../../shared/schemas/page-audit.schema.json`
- `../../../shared/vocabulary/audit-severity.json`
- `../../../shared/templates/page-audit.md`

## Decision Criteria

1. Use `critical` when a core site journey cannot be completed across the
   affected page group.
2. Use `high` when a repeated pattern blocks, misleads, or materially damages a
   primary journey, or creates major accessibility or SEO risk.
3. Use `medium` when cross-page inconsistency creates likely friction but the
   journey remains recoverable.
4. Use `low` when the pattern is understandable but weakens system consistency,
   maintainability, or handoff quality.
5. Use `info` for contextual site observations that should inform future
   structure without requiring immediate remediation.

## Rules

- Cite representative pages, template groups, navigation labels, CTA labels,
  metadata, repeated components, responsive behavior, and supplied study or page
  audit notes.
- Separate observed evidence from inferred user, business, SEO, or
  implementation impact.
- Do not claim analytics, rankings, conversion loss, or performance impact
  unless the source material provides that evidence.
- Every finding needs a target, evidence, impact, recommendation, and handoff.
- Keep isolated page defects in page-level reports unless they reveal a repeated
  template, component, navigation, metadata, or journey pattern.

1. Compare repeated issues before isolated page-specific details.
2. Separate observed evidence from inferred business impact.
3. Use `site` as `auditType`.
4. Prioritize findings by user impact, frequency, and implementation risk.
5. Return JSON matching `page-audit.schema.json`.
6. Stay site-level: page-specific remediation belongs in a handoff unless the
   same pattern repeats.
7. Use commands only for deterministic cross-page metadata, route, or blueprint
   consistency checks. Do not add subagents unless specialist pass sequencing is
   explicitly needed.

## Anti-Patterns

- Vague site critique: "the site needs better UX" without a repeated pattern.
- Single-page overreach: treating one page defect as a site-level issue.
- Inconsistent labels: the same navigation item, CTA, or action has multiple
  labels across related pages.
- Orphaned pages: important pages lack a clear path from navigation, hubs,
  contextual sections, or footer support.
- Repeated generic layouts: related pages reuse structure so aggressively that
  users cannot understand page-specific intent.
- Template drift: shared cards, forms, accordions, filters, or CTA blocks change
  anatomy without changing user purpose.
- Metadata duplication: titles, descriptions, summaries, or page promises repeat
  across pages that should answer distinct intents.

## Workflow

1. Identify the page set, template groups, primary journeys, and known source
   material.
2. Inventory navigation, labels, CTAs, forms, metadata, repeated components,
   responsive behavior, and existing page or study audit notes.
3. Cluster repeated patterns and preserve representative page evidence for each
   finding.
4. Assign severity using frequency, journey centrality, recoverability, and
   implementation blast radius.
5. Write schema-valid findings with target, evidence, impact, recommendation,
   and handoff.

## Inline Example

```json
{
  "id": "service-site-audit",
  "source": {
    "urlOrName": "Service page group"
  },
  "auditType": "site",
  "summary": "Service pages use inconsistent booking paths across the same template group.",
  "overallSeverity": "high",
  "findings": [
    {
      "id": "service-pages-inconsistent-booking-path",
      "title": "Service pages use inconsistent booking paths",
      "severity": "high",
      "category": "conversion",
      "target": "service page template group",
      "evidence": "Implants uses \"Book consultation\", Emergency uses \"Call now\", Cleaning hides contact below FAQ, and service navigation order changes between pages.",
      "impact": "Users comparing services cannot predict how to request care, which weakens the primary conversion journey.",
      "recommendation": "Define one booking/contact action model for service pages, keep canonical CTA labels, and place the primary contact path consistently across the template group.",
      "handoff": "generate-page-audit-report"
    }
  ]
}
```

## Hand-Offs

Hand off representative page-level problems to `generate-page-audit-report`.
Hand off template or section-level remediation to blueprint, wireframe, or
section-planning skills after the site-level pattern is confirmed.
