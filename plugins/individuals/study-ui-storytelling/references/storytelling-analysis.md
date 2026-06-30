# Storytelling Analysis

Study the page narrative from observable evidence: headline, subheadline, proof,
offer framing, objection handling, and action sequence.

## Decision Heuristics

- Treat the first viewport as the page's thesis: identify the promise, audience,
  and primary action before reviewing lower sections.
- Look for proof before detail on trust-sensitive pages and detail before proof
  on low-risk product pages.
- Count CTA repetition only when each repeated action follows new evidence.
- Distinguish value proposition from feature description. A value proposition
  explains why the user should care; a feature explains what exists.
- Track objection handling and recovery content near the decision it unblocks,
  not just whether FAQ or support exists somewhere.
- Separate observed narrative moves from inferred business intent.

## Journey Moves

- Orient: where the user is and what the page is about.
- Promise: why the user should care.
- Explain: how the offer, task, or content works.
- Prove: why the user should trust the claim.
- Compare: how the user chooses among options.
- Handle objection: what reduces risk, uncertainty, cost, or eligibility
  concerns.
- Ask for action: what the user is invited to do.
- Resolve: where the user lands next, including support or recovery paths.

## Anti-Pattern

Bad: "The page has a good hero and good CTAs."

Corrected: "The hero promises same-week appointments, the first CTA asks for a
consultation, and testimonials appear before treatment details, so trust is
established before the user compares services."

Bad: "The repeated CTAs create a strong journey" when the page repeats buttons
without adding new proof or detail.

Corrected: "The CTA repeats three times, but only the second instance follows
new proof. The final CTA may be decorative repetition unless it follows
objection handling or process detail."

Bad: "The brand is targeting anxious patients" without visible anxiety, support,
risk, FAQ, or proof evidence.

Corrected: "The page includes financing, FAQ, and doctor credentials; inferred
intent is reducing cost and trust anxiety, but audience motivation remains
inferred."

## Worked Example

For a dental homepage, capture: hero promise, consultation CTA, insurance or
review proof, service overview, process explanation, FAQ, and final CTA. Interpret
whether the sequence lowers appointment anxiety before asking for contact.

For a dashboard page, capture current-state summary, primary metrics, filters,
alerts, diagnostic detail, empty/error states, and escalation path. Interpret
whether the sequence supports diagnosis before dense exploration.

## Hand-Off

Use `study-ui-specification` to inventory exact UI structure, `generate-page-audit-report`
to judge quality, and `page-wireframe-planner` to turn the narrative into a new
page blueprint.
