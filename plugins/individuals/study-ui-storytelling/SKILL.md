---
name: study-ui-storytelling
description: Study a captured page's narrative, value proposition, proof placement, and calls to action before audit or blueprint generation.
license: See repository LICENSE
---

# Study UI Storytelling

Use this skill when a captured page or page description needs narrative analysis before audits, SEO work, or blueprint planning.

## Purpose

Identify how a page explains value, earns trust, sequences proof, and asks for action. Produce observable study findings using the shared study output shape.

## Philosophy

UI storytelling is observable journey structure. A page story is not the brand's
imagined strategy; it is the sequence of visible promises, proof, explanations,
objections, actions, and recovery paths that a user encounters. Study that
sequence before judging or redesigning it.

## Evidence Discipline

Treat the page as evidence, not as a prompt to invent strategy. Quote or
paraphrase visible claims, CTAs, proof, and objection handling separately from
any inferred business intent. If the capture does not show later-page proof,
pricing, testimonials, or CTA destinations, record the absence as missing
evidence instead of assuming the page lacks them.

## References

- `references/storytelling-analysis.md`
- `references/storytelling-study-method.md`
- `references/_shared/schemas/study-output.schema.json`
- `references/_shared/templates/page-study.md`
- `references/_shared/vocabulary/ui-terminology.json`
- `references/_shared/examples/page-study.example.json`

## Rules

1. Separate observed copy and structure from inferred business intent.
2. Track the first-viewport promise, supporting proof, objection handling, and CTA sequence.
3. Use the shared `study-output.schema.json` shape for structured findings.
4. Hand off structure recommendations to blueprint skills and quality judgments to audit skills.
5. Preserve observed, inferred, and missing-evidence categories in findings.
6. Do not treat decorative rhythm, repeated cards, or repeated CTAs as journey
   evidence unless they change what the user understands, trusts, compares, can
   do, or can recover from.
7. Do not add a command or subagent by default; sequence comparisons can be
   deterministic later, but narrative interpretation remains judgment-led.

## Method

1. Identify the first visible promise, target audience, and primary CTA before
   reading lower sections.
2. Walk the page in visible order and classify each narrative move: orient,
   promise, explain, prove, compare, answer objection, ask for action, support,
   or resolve.
3. Record proof placement, CTA cadence, objection handling, and resolution paths
   relative to the decision they support.
4. Record exact visible labels or representative copy snippets when they define
   the page story.
5. Mark inferred intent explicitly, such as "appears to support consultation
   booking" or "likely reduces price anxiety."
6. Mark missing evidence such as CTA destination, later-page proof, form
   behavior, pricing detail, or post-submit state.
7. Finish with handoff notes: what blueprint generation should preserve and what
   audit work should evaluate.

## Anti-Patterns

- Invented intent: declaring business strategy without visible claim, audience,
  proof, or CTA evidence.
- Decorative rhythm as journey: treating alternating sections or card grids as
  narrative progress without a decision role.
- CTA counting without evidence: calling cadence strong because buttons repeat
  even when no new proof or detail appears between them.
- Proof detachment: noting proof without naming the claim it supports.
- Objection dump: treating FAQ as effective without tying questions to decision
  blockers.
- Hero tunnel vision: judging the whole story from the first viewport.
- Missing evidence erased: omitting unknown CTA destinations, form behavior,
  pricing detail, proof source, or post-submit resolution.

## Inline Example

Input evidence: first viewport says "Same-day dental implants", shows a "Book a
consultation" CTA, then lower sections show doctor credentials and financing.

Finding: observed promise is same-day implant treatment; observed primary action
is consultation booking; observed proof is credential-led and payment-led;
inferred intent is reducing urgency and cost objections; missing evidence is
whether the booking CTA opens a form or navigates.

Structured finding:

- Observed: hero promises same-day implant treatment; CTA asks for consultation;
  credentials and financing appear before lower commitment content.
- Inferred: the sequence appears to reduce trust and cost anxiety before contact.
- Missing evidence: booking destination, form behavior, proof source, and
  post-submit resolution.
- Handoff: preserve proof before process in `page-wireframe-planner`; send proof
  quality and unsupported same-day claims to audit skills.

## Hand-Offs

- Send page sequence and CTA cadence to `page-wireframe-planner`.
- Send quality claims, weak proof, or unsupported value propositions to audit
  skills.
- Send exact headings, CTAs, and proof labels to SEO or blueprint generation only
  as observed evidence.
