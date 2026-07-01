---
name: generate-page-audit-report
description: Generate page-level UI audit reports with prioritized findings, evidence, severity, impact, and remediation guidance.
license: See repository LICENSE
---

# Generate Page Audit Report

Use this skill when one page needs an evidence-backed quality review.

## Purpose

Evaluate page structure, storytelling, content clarity, interaction quality,
accessibility, responsive behavior, SEO, and conversion risks.

## Philosophy

A page audit is a decision-journey review. It should explain whether the page
helps the user orient, trust, compare, act, and recover in the right order for
the page type. Findings must be grounded in observed structure or supplied study
evidence; the report should not turn personal visual preference into severity.

## References

- `references/page-audit-reporting.md`
- `references/page-severity-remediation.md`
- `../../../shared/schemas/page-audit.schema.json`
- `../../../shared/vocabulary/audit-severity.json`
- `../../../shared/templates/page-audit.md`

## Decision Criteria

1. `critical`: the page cannot satisfy its core intent or blocks the primary
   task.
2. `high`: the primary workflow is likely blocked, misleading, inaccessible, or
   trust-breaking.
3. `medium`: the page can work, but hierarchy, proof, CTA cadence, or responsive
   priority creates likely friction.
4. `low`: the page is understandable but handoff, section rationale, or content
   clarity is weak.
5. `info`: contextual observation with no corrective action.

## Boundary

- Owns: multi-dimension page audit reports covering structure, storytelling, content clarity, interaction quality, accessibility, responsive behavior, SEO, and conversion risks.
- Does not own: cross-page IA synthesis, section-level anatomy focus, or site-wide pattern reporting.
- Hand off cross-page synthesis to `generate-site-audit-report`.
- Hand off section-level focus to `generate-section-audit-report`.
- Hand off SEO-only focus to `generate-seo-audit-report`.

## Rules

1. Cite visible structure, section order, headings, CTAs, proof, forms, overlays,
   responsive notes, or supplied study findings.
2. Mark missing decision steps as inferred risk, not as observed behavior.
3. Do not report subjective taste, visual polish, animation, or code behavior
   unless the source provides evidence.
4. Every finding needs target, evidence, impact, recommendation, and optional
   handoff.

1. Use `page` as `auditType`.
2. Anchor every finding in visible page evidence or supplied study notes.
3. Assign severity from `audit-severity.json`.
4. Recommend specific changes, not general preferences.
5. Return JSON matching `page-audit.schema.json`.
6. Stay report-only unless existing validation commands are needed to verify
   schema fixtures. Add a subagent only if future workflows require separate
   specialist passes before the page-level synthesis.

## Anti-Patterns

- Taste-only finding: "looks generic" without structural evidence or user impact.
- Section-count prescription: asks for more or fewer sections without naming the
  missing journey step.
- CTA scatter: accepts multiple primary actions before the page establishes what
  users should do.
- Proof-late commitment: asks for booking, checkout, or contact before trust,
  process, pricing, eligibility, or risk reducers.
- Mobile afterthought: desktop hierarchy is accepted even when mobile hides or
  buries required action.

## Workflow

1. Identify page type, source, viewport, audience, primary goal, and primary
   action.
2. Review first viewport for orientation, promise, CTA, proof, and navigation.
3. Review the full section sequence for journey logic, content evidence, CTA
   cadence, interaction contracts, accessibility basics, and responsive priority.
4. Separate observed issues from inferred risks and specialist findings.
5. Assign severity from task impact using `references/page-severity-remediation.md`.
6. Return schema-valid findings with concrete fixes and handoffs.

## Inline Example

```json
{
  "id": "healthcare-homepage-audit",
  "source": {
    "urlOrName": "Healthcare homepage",
    "viewport": "desktop"
  },
  "auditType": "page",
  "summary": "The page repeats booking CTAs before establishing proof or process.",
  "overallSeverity": "medium",
  "findings": [
    {
      "id": "proof-appears-after-booking-ctas",
      "title": "Booking asks arrive before trust evidence",
      "severity": "medium",
      "category": "conversion",
      "target": "main.hero + main.services",
      "evidence": "The hero and services section repeat booking CTAs before patient proof, process, insurance support, or outcomes.",
      "impact": "Users face a high-consideration consultation request before enough trust evidence is available.",
      "recommendation": "Move one proof or process section directly after the hero and repeat booking only after that evidence.",
      "handoff": "page-wireframe-planner"
    }
  ]
}
```

## Hand-Offs

Hand off specialist accessibility, interaction, SEO, section, or site concerns
to the focused audit skills when page-level synthesis reveals deeper risks. Hand
off structural fixes to blueprint or wireframe generation skills.
