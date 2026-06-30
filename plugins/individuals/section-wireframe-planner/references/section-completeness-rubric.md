# Section Completeness Rubric

Use this rubric to decide whether a section plan has enough structure to be
useful, reusable, and reviewable.

## Core Principle

A section is reusable when its job is clear and its anatomy is stable across
compatible page contexts. Reusable does not mean generic. The section should
carry one dominant purpose and expose the content roles, interaction needs,
responsive behavior, and assumptions required for that purpose to survive handoff.

## Section Planning Inputs

- Section job: orient, prove, compare, explain, collect input, answer
  objections, navigate, recover, or move to action.
- Page context and what comes before or after the section.
- Required content roles such as `headline`, `body`, `trustSignal`,
  `primaryCTA`, `helperText`, `errorText`, `price`, or `metadata`.
- Repeated item anatomy and whether every repeated item is truly a peer.
- Local layout intent and responsive behavior.
- Required interactions, states, accessibility notes, and handoff assumptions.

## Completeness By Section Type

| Section Type | Complete When It Includes | Common Risk |
| --- | --- | --- |
| Hero | Promise, audience or context, supporting copy, primary action, optional proof/media with a real job | Decorative media or multiple competing CTAs. |
| Proof | Claim being supported, trust signal/testimonial/stat anatomy, source or context label, relationship to nearby claim | Proof detached from the claim it supports. |
| Feature | Section premise, repeated peer items, consistent card/list anatomy, optional secondary action | Equal cards for unequal ideas. |
| Comparison | Options, comparable attributes, decision criteria, selected/recommended state if relevant, mobile comparison behavior | Cards replacing row-level comparison. |
| FAQ | Objection topic, question labels, answer content, escalation path for unresolved concerns | FAQ as a dump far from the decision it unblocks. |
| Form | Purpose, grouped fields, labels, helper/error placement, submit action, loading/error/success states | Static form with no recovery. |
| CTA | One action, supporting reason, target or continuation path, secondary action only when clearly subordinate | CTA pile-up without new evidence. |
| Navigation | Scope, labels, current/selected state, relationship to page or section, responsive behavior | Navigation stack or unclear wayfinding hierarchy. |
| Data/list | Item anatomy, empty/loading/error states, filters/sort if needed, primary row or item action | Dense repeated content without action or recovery. |

## Role Criteria

- A section should have one dominant job. Secondary content must support that job.
- Every repeated item needs comparable anatomy unless a meaningful variant is
  declared.
- Every action needs a target, priority, and relationship to page-level CTA
  cadence.
- Every form, overlay, disclosure, or data region needs relevant state and
  recovery notes.
- Responsive notes should preserve the section's job, not just say that content
  stacks.
- Page-specific assumptions belong in annotations or handoff notes unless the
  section cannot function without them.

## Reuse Rules

- Keep section internals stable enough to reuse across compatible pages.
- Do not hard-code page-specific navigation, final CTA cadence, or unrelated page
  context into the section.
- Do not make the section so generic that its role disappears.
- Name what the page planner must supply: surrounding sequence, CTA cadence,
  source data, proof quality, or interaction behavior.

## Anti-Patterns

- Decorative section: the section exists for visual rhythm but does not orient,
  prove, compare, collect, answer, navigate, recover, or move to action.
- Section sameness: hero, proof, feature, and CTA sections all use the same
  density and card rhythm.
- Kitchen-sink card: each repeated item includes every possible content role,
  destroying scanability.
- Unsupported proof: testimonials, ratings, or claims appear without a nearby
  claim or source context.
- Context leakage: reusable section anatomy includes page-specific final CTA,
  global navigation, or unrelated route assumptions.
- Missing recovery: form, data, or interactive sections omit error, empty,
  loading, disabled, or success states.
- Responsive collapse without priority: dense desktop structure becomes a long
  mobile stack with no preserved action or comparison path.

## Validation And Commands

Existing anti-pattern validation can catch some deterministic failures, such as
forms without recovery states, CTA pile-up, filler labels, and incomplete overlay
contracts. Missing section role, decorative intent, and section sameness remain
judgment-led. Do not add a new command or subagent unless future fixtures define
repeatable section-level failures.

## Worked Examples

Pricing FAQ section:

- Job: answer objections before pricing commitment.
- Anatomy: heading, short intro, accordion items with question labels and answer
  content, helper copy or escalation path for unresolved pricing questions.
- Responsive: keep question labels visible before expansion; avoid hiding all
  pricing recovery behind collapsed content.

Feature grid section:

- Job: scan peer benefits.
- Anatomy: heading, premise copy, repeated cards with consistent headline/body
  anatomy, optional secondary action after the grid.
- Risk: if one benefit is the main decision driver, promote it or split it into a
  separate proof/detail section instead of forcing equal cards.
