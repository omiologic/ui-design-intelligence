# Meta Description Quality

Use this reference to decide whether a meta description is specific, honest, and
useful as search-result information scent. The description is a promise before
the click; it should set expectations the page can actually satisfy.

## Decision Heuristics

- Start with the page's visible purpose and primary user task.
- Include audience, location, product, service, proof, or action only when the
  page or supplied context supports it.
- Prefer one clear value cue over a list of keywords.
- Keep the sentence natural when truncated. A good snippet still makes sense if
  the end is cut off.
- Match the page's scope. A service page can be specific; a homepage may need a
  broader but still concrete description.
- If the page purpose is unclear, write a conservative description or hand off to
  `generate-seo-audit-report`; do not invent a sharper offer.

## Length Guidance

- Aim for roughly 120 to 160 characters when possible.
- Shorter is acceptable when the page has a narrow task and the description is
  still complete.
- Longer is acceptable only when supplied requirements demand it, but make the
  first 120 characters carry the core promise.
- Character length can be checked deterministically, but quality still depends on
  page evidence and intent.

## Evidence Checklist

Before finalizing, verify the description names or implies:

- Page topic or offer.
- Audience, market, or location when supported.
- Primary action or next step when the page has a conversion goal.
- Proof, differentiator, or content type only when visible or supplied.
- No claims that exceed the page evidence.

## Anti-Pattern

Bad: "Best solutions for all your needs. Contact our expert team today for
quality service and affordable prices."

Corrected: "Schedule same-week family dental care in Austin with Example Dental.
Review services, insurance support, patient reviews, and booking options."

## Worked Example

Input evidence: dental homepage, Austin location, preventive and emergency care,
insurance support, patient reviews, same-week appointments, primary booking CTA.

Output: "Book family and emergency dental care in Austin with Example Dental.
View services, insurance support, patient reviews, and same-week appointments."

Why: the description names the service, location, proof/support content, and
primary next step without adding unsupported "best" or "affordable" claims.

## Hand-Off

Use `generate-title-tag` when the page needs a title, `generate-page-summary`
when the page purpose is not yet summarized, and `generate-seo-audit-report` when
metadata is missing, duplicated, misleading, or unsupported by page content.
