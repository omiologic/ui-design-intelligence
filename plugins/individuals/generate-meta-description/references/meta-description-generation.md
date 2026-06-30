# Meta Description Generation

Generate concise descriptions for search result snippets and link previews.

## Decision Heuristics

- Start from the page's visible promise, not a generic business category.
- Include audience, offer, location, proof, or action only when supported by page
  content or supplied context.
- Favor clarity over density; the description should read naturally when
  truncated.
- If the page purpose is ambiguous, produce a finding for
  `generate-seo-audit-report` rather than inventing a stronger claim.
- Treat the description as information scent: it should help the user predict
  whether the page satisfies their task before they click.
- Use a rough 120 to 160 character target when possible, but prioritize accurate
  evidence and readable syntax over exact length.

## Decision Rules

- Homepage: summarize the main audience, offer, location or market when known,
  and primary action if visible.
- Service page: name the specific service, audience or location when supported,
  and one concrete next step.
- Product page: name the product, category, core benefit or proof, and purchase
  or evaluation path when visible.
- Article or guide: name the topic, learning outcome, and content type.
- Support page: name the task the user can resolve and the support path.
- Unknown purpose: keep the description conservative and hand off the mismatch to
  `generate-seo-audit-report`.

## Evidence Rules

- Use only visible page content, supplied page summary, title, blueprint
  structure, or explicit user context.
- Do not add "best", "leading", "affordable", "trusted", "near me", ratings, or
  urgency unless the page supports the claim.
- Keep one primary action cue. Multiple calls to action make the snippet vague.
- Preserve brand and location only when they improve search usefulness and are
  supported.

## Anti-Pattern

Bad: "Best services, affordable pricing, expert team, call today."

Corrected: name the actual service, user need, location or audience when known,
and one concrete reason to continue.

Bad: repeating keyword variants until the snippet reads like a tag list.

Corrected: write one clear sentence that connects the page topic to the user's
task and supported proof.

## Worked Example

For a dental homepage focused on same-week appointments, generate a description
that mentions family dental care, the local practice, appointment availability,
and the primary booking action if those are present on the page.

For a support page about resetting passwords, generate a description that says
users can reset access and recover their account. Do not include product sales
language unless the support page visibly includes it.

## Hand-Off

Hand off title generation to `generate-title-tag`, page summaries to
`generate-page-summary`, and metadata/content misalignment to
`generate-seo-audit-report`.
