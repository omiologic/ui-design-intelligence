---
name: generate-meta-description
description: Generate search-facing meta descriptions grounded in page purpose, visible content, audience intent, and snippet clarity.
license: See repository LICENSE
---

# Generate Meta Description

Use this skill when a page needs a concise, search-facing meta description.

## Purpose

Write or improve meta descriptions that summarize the page honestly, support
search intent, and reflect visible content rather than invented keyword targets.

## Philosophy

A meta description is UX before the click. It should create accurate information
scent: the user can understand what the page offers, why it is relevant, and what
they can do next. A good description is not a keyword container; it is a compact
promise that the visible page content can keep.

## References

- `references/meta-description-generation.md`
- `references/meta-description-quality.md`
- `references/metadata-example.json`
- `../../../.convention/vocabulary/ui-terminology.json`

## Decision Criteria

1. Use the page purpose and primary user task as the lead input.
2. Include audience, offer, location, proof, or action only when supported.
3. Aim for roughly 120 to 160 characters, with the core promise early enough to
   survive truncation.
4. Prefer a specific, evidence-grounded value cue over broad marketing claims.
5. If evidence is weak, write conservatively and hand off content mismatch to
   `generate-seo-audit-report`.

## Boundary

- Owns: meta description writing and revision — the `<meta name="description">` summary text that reflects visible page content and honest search intent.
- Does not own: title tag creation, structured data, on-page content rewriting, heading structure, or full SEO auditing.
- Hand off title tag work to `generate-title-tag`.
- Hand off full SEO audit to `generate-seo-audit-report`.

## Rules

1. Identify page purpose, audience, and primary offer before writing.
2. Keep the description specific to the page content.
3. Avoid keyword stuffing, unsupported claims, and vague marketing filler.
4. Prefer one clear action or value cue when the page has a conversion goal.
5. Hand off misaligned content hierarchy to `generate-seo-audit-report`.
6. A length-check command could be useful later for deterministic character
   bounds or repeated generic phrase checks, but this skill does not need a
   separate command or subagent yet.

## Anti-Patterns

- Keyword stuffing: repeated variants replace a readable user-facing sentence.
- Unsupported superlatives: "best", "leading", "affordable", or "trusted" appear
  without page evidence.
- Generic promise: the description could apply to any competitor or category.
- Mismatched intent: the snippet promises booking, pricing, downloads, or local
  availability that the page does not support.
- CTA pileup: multiple actions compete inside one short snippet.

## Workflow

1. Read the page summary, title, visible headings, primary action, and supporting
   proof.
2. Identify page type and search/user intent.
3. Choose one supported promise and one optional action cue.
4. Draft a natural description, keeping the key promise early.
5. Check for unsupported claims, keyword stuffing, vague filler, and misleading
   intent before finalizing.

## Inline Example

Input: dental homepage with Austin location, emergency and family care,
insurance support, reviews, and same-week appointments.

Output: "Book family and emergency dental care in Austin with Example Dental.
View services, insurance support, patient reviews, and same-week appointments."

Input: generic page summary with no location, proof, or action.

Output: write a conservative page-specific description and hand off missing
purpose or evidence to `generate-seo-audit-report` instead of inventing claims.

## Hand-Offs

Hand off title generation to `generate-title-tag`. Hand off metadata/content
mismatch, unsupported claims, or missing page purpose to
`generate-seo-audit-report`.
