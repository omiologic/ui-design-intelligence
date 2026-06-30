# Storytelling Study Method

Use this reference to study UI storytelling as observable journey structure:
orientation, promise, proof, explanation, comparison, objection handling, action,
and resolution.

## Core Principle

Storytelling study describes how the page asks a user to move from first
understanding to trust, decision, action, and recovery. It must be grounded in
visible structure and copy. Do not invent business intent, user motivation, or
strategy when the page does not provide evidence.

## Journey Capture Template

For each page or capture, record:

- Source: page name, route, viewport, capture date, and supplied context.
- First viewport thesis: visible headline, subheadline, audience cue, primary
  action, proof/status, and missing evidence.
- Narrative moves in order: orient, promise, explain, prove, compare, handle
  objection, ask for action, support/recover, resolve.
- Visible claims: exact or paraphrased value propositions, benefits, guarantees,
  pricing claims, urgency, proof, and limitations.
- Proof placement: testimonials, reviews, credentials, data, logos, case
  studies, guarantees, or social proof relative to the claim they support.
- CTA cadence: label, location, repetition, whether new evidence appears before
  each repeated CTA, and whether secondary actions are subordinate.
- Objection handling: FAQ, pricing, eligibility, risk, process, support,
  security, privacy, insurance, or recovery content.
- Resolution: final CTA, support path, next step, footer reassurance, or
  continuation path.
- Observed evidence, inferred intent, missing evidence, and handoff.

## Narrative Moves

| Move | Observable Signal | Common Question |
| --- | --- | --- |
| Orient | Page title, H1, hero, breadcrumb, category label | Where am I and what is this? |
| Promise | Value proposition, outcome, offer, task title | Why should I care? |
| Explain | Feature detail, process, scope, how-it-works | How does this work? |
| Prove | Reviews, testimonials, logos, credentials, stats | Can I trust it? |
| Compare | Plans, alternatives, before/after, options | Which one should I choose? |
| Handle objection | FAQ, pricing, support, insurance, risk, guarantee | What might stop me? |
| Ask for action | CTA, form, checkout, booking, signup, contact | What do I do next? |
| Support/recover | Help, fallback, error support, contact, legal | What if I am not ready or something fails? |
| Resolve | Confirmation, next step, footer support | Where does this path land? |

## Evidence Discipline

- Observed: visible copy, labels, section order, proof, CTAs, support, and
  recovery content.
- Inferred: likely intent, such as reducing price anxiety or moving users toward
  booking.
- Missing: CTA destination, later-page proof, offscreen content, hidden FAQ,
  conversion flow, analytics, audience research, or business strategy.

## Anti-Patterns

- Invented intent: declaring the business strategy without visible claim,
  audience, proof, or CTA evidence.
- Decorative rhythm as journey: treating alternating bands, logo strips, or card
  grids as narrative progress when they do not change user understanding.
- CTA counting without evidence: calling CTA cadence strong because buttons
  repeat, even when no new proof or detail appears between them.
- Proof detachment: treating proof as effective without noting which claim it
  supports.
- Objection dump: marking FAQ as successful objection handling without linking
  questions to the decision they unblock.
- Hero tunnel vision: judging the story from the first viewport while ignoring
  lower sequence, support, and resolution.
- Missing evidence erased: not recording unknown CTA destinations, form behavior,
  pricing detail, or proof quality limits.

## Command Decision

Commands can compare section sequences across examples when blueprint or capture
data is structured, but narrative quality depends on user journey reasoning.
Do not add a command or subagent by default. A future deterministic check could
flag CTA pile-up or repeated generic section sequences in fixtures, while this
skill remains responsible for evidence-grounded interpretation.

## Worked Example

Input: dental homepage capture with hero "Same-week implant consultations",
`Book a consultation` CTA, doctor credential cards, financing support, treatment
process, FAQ, and final contact form.

Finding:

- Observed: first viewport promises timely implant consultation and asks for
  booking; credential proof appears before process detail; financing appears
  before FAQ; contact form closes the sequence.
- Inferred: the page appears to reduce trust, process, and cost anxiety before
  asking users to submit contact details.
- Missing evidence: booking CTA destination, form validation behavior, review
  authenticity/source, and post-submit resolution.
- Handoff: `page-wireframe-planner` should preserve proof before process for
  high-friction healthcare decisions; audit skills should evaluate proof quality
  and unsupported claims.
