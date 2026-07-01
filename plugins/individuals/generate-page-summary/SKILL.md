---
name: generate-page-summary
description: Generate concise page summaries that capture page purpose, audience, content hierarchy, primary action, and downstream audit or blueprint handoff.
license: See repository LICENSE
---

# Generate Page Summary

Use this skill when a page needs a short factual summary for SEO, audit, or
blueprint handoff.

## Purpose

Summarize what the page is, who it serves, what it offers, what proof it uses,
and what action or understanding it asks from users.

## Philosophy

A page summary is handoff clarity, not generic prose and not an audit in
disguise. It should compress observed page evidence into a reusable factual
description so SEO, audit, and blueprint work start from the same understanding.
When the page intent is uncertain, the summary should preserve that uncertainty
instead of inventing a better story.

## References

- `references/page-summary-generation.md`
- `references/page-summary-quality.md`
- `../generate-meta-description/references/metadata-example.json`
- `../../../.convention/vocabulary/ui-terminology.json`

## Decision Criteria

1. Lead with page type, topic, and visible purpose.
2. Include audience, proof, offer, and primary action only when supported.
3. Capture major content hierarchy and journey, not every section or feature.
4. Keep tone neutral unless the user explicitly asks for an evaluative summary.
5. Hand quality judgments, missing-proof concerns, or SEO mismatch to audit
   skills.

## Boundary

- Owns: factual page-level summary of purpose, audience, offering, proof structure, and primary call to action — neutral description, not audit findings.
- Does not own: audit findings, design recommendations, SEO tag writing, or multi-page synthesis.
- Hand off evaluation and findings to `generate-page-audit-report`.
- Hand off SEO metadata review to `generate-seo-audit-report`.

## Rules

1. Treat headings, visible copy, section structure, CTAs, forms, proof, metadata,
   wireframe nodes, and supplied study notes as evidence.
2. Mark likely audience or intent as inference only when supported by multiple
   signals.
3. State missing evidence plainly when page purpose, audience, proof, or action
   cannot be determined.
4. Do not invent location, pricing, claims, proof, or calls to action.

1. Separate observed page purpose from inferred business intent.
2. Include the primary audience and action only when supported by the page.
3. Capture content hierarchy, not every section detail.
4. Keep summaries neutral and reusable for SEO, audit, and blueprint work.
5. Hand off quality judgments to audit skills.
6. Summary fixture checks can be useful later for required fields or banned
   generic phrases, but this skill does not need a separate command or subagent
   unless summary work expands into audit modes.

## Anti-Patterns

- Vague paraphrase: "A page about services" without naming the service, audience,
  content groups, or action.
- Unsupported intent: assigns audience, location, promise, or business goal not
  present in the source.
- Hidden audit: turns summary into severity, recommendation, or critique.
- Section inventory dump: lists every section without explaining the page's
  purpose or journey.
- Marketing rewrite: replaces observed structure with better-sounding claims.

## Workflow

1. Read the source, page study, screenshot notes, wireframe, or provided
   description.
2. Identify page type, topic, audience, primary action, proof, and major content
   groups.
3. Separate observed facts from inferred intent and missing evidence.
4. Write a concise neutral summary that captures purpose, hierarchy, journey, and
   handoff context.
5. Send quality, SEO, or UX concerns to the appropriate audit or metadata skill.

## Inline Example

Input: SaaS pricing page with plan cards, feature comparison, proof logos, FAQ,
and trial/contact CTAs.

Output: "A SaaS pricing page that helps buyers compare subscription plans,
review feature differences, validate the offer through customer proof, and
choose between starting a trial or contacting sales."

Input: service page with offer details but no visible audience or primary action.

Output: "A service page describing the offer, supporting details, and related
information. The primary audience and next action are not clear from the supplied
source."

## Hand-Offs

Hand off snippet writing to `generate-title-tag` or
`generate-meta-description`. Hand off quality, SEO, UX, or accessibility
concerns to the relevant audit skill instead of embedding findings in the
summary.
