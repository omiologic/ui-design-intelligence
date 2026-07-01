---
name: generate-title-tag
description: Generate concise page title tags that align page intent, brand, content hierarchy, search usefulness, and snippet constraints.
license: See repository LICENSE
---

# Generate Title Tag

Use this skill when a page needs a search-facing title tag.

## Purpose

Create title tags that name the page topic, distinguish the page from similar
pages, and fit the actual content and brand context.

## Philosophy

A title tag is a UX promise before the click. It should help users understand
what the page offers, why this result differs from neighboring pages, and
whether the page is worth opening. It is not a keyword bucket; it is the shortest
accurate label for the page's purpose.

Good title generation starts from page evidence: visible headings, page summary,
primary action, product or service names, location, audience, proof, and brand
context. When the page cannot support a stronger promise, write a conservative
title and hand off the mismatch to SEO audit instead of inventing claims.

## References

- `references/title-tag-generation.md`
- `references/title-tag-quality.md`
- `../generate-meta-description/references/metadata-example.json`
- `../../../shared/vocabulary/ui-terminology.json`

## Decision Criteria

1. Lead with the page-specific topic, task, product, service, or content promise.
2. Include brand after the topic unless the brand is the main search target.
3. Include location, audience, proof, availability, price, urgency, or format
   only when supported by visible content or supplied context.
4. Aim for roughly 50 to 60 characters when possible, but prioritize clarity,
   specificity, and natural reading over exact length.
5. Make titles distinct across related pages without stuffing variants.

## Boundary

- Owns: title tag creation and revision — the `<title>` element text that names the page topic, distinguishes the page, and fits the actual content and brand context.
- Does not own: meta description, on-page headings, structured data, or full SEO auditing.
- Hand off meta description work to `generate-meta-description`.
- Hand off full SEO audit to `generate-seo-audit-report`.

## Rules

- Use the H1, page summary, section headings, visible copy, primary CTA, product
  or service names, location, audience, proof, page type, and brand.
- Check neighboring titles when available to avoid duplicate or barely changed
  titles across distinct pages.
- Do not claim rankings, search volume, local availability, urgency, pricing,
  or superiority unless the source material supports it.
- If title and content intent are misaligned, hand off to
  `generate-seo-audit-report`.

1. Put the page-specific topic before generic brand or category text.
2. Include brand, location, or audience only when relevant and supported.
3. Avoid duplicate titles across distinct pages.
4. Avoid keyword stuffing and vague titles such as "Home" or "Services".
5. Hand off title/content mismatch to `generate-seo-audit-report`.
6. Keep the core promise early so truncation does not remove the page topic.
7. A deterministic command could later check title length, duplicate titles, and
   banned generic phrases; this focused generation skill does not need a
   command or subagent yet.

## Anti-Patterns

- Vague label: "Home", "Services", "Products", "About", or "Welcome".
- Duplicate title: distinct pages share the same title or differ only by brand.
- Keyword stuffing: repeated query variants replace a readable title.
- Unsupported modifier: "best", "cheap", "same-day", "official", "near me", or
  a location appears without evidence.
- Back-loaded meaning: brand or generic category text comes before the unique
  page topic.
- Overlong title: the title tries to include every service, audience, feature,
  and location.
- Mismatched page type: an article title sounds like a product page, or a
  service page title sounds like a generic category.

## Workflow

1. Identify page type, page purpose, likely user intent, and source evidence.
2. Select the most specific supported topic or task.
3. Add one supported differentiator when it improves clarity.
4. Add brand after the topic when it helps recognition or ownership.
5. Check length, truncation resilience, duplicate risk, unsupported claims, and
   keyword stuffing before finalizing.

## Inline Example

Input: service page with H1 "Emergency Dental Care in Austin", same-week
appointment copy, insurance support, and Example Dental branding.

Output: `Emergency Dental Care in Austin | Example Dental`

Input: family dentistry page with general service list but no emergency,
affordability, or same-day proof.

Avoid: `Affordable Emergency Dentist Near Me | Example Dental`

Output: `Family Dentistry Services | Example Dental`

## Hand-Offs

Hand off meta description generation to `generate-meta-description`. Hand off
duplicate, unsupported, or content-mismatched metadata concerns to
`generate-seo-audit-report`.
