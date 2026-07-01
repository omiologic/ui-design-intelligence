# Audience Intent Reference

Use this reference to map audience awareness, readiness, and emotional state to
copy needs before generating journeys, content models, page copy, CTAs, or
prototype copy. Audience intent defines what the user is ready to understand,
trust, compare, or do.

## Related References

- `.convention/schemas/user-journey-map.schema.json`: audience goals, journey stages,
  user questions, needs, objections, and content goals.
- `.convention/schemas/content-model.schema.json`: node-tied copy roles and review
  metadata.
- `.convention/content/page-message-architecture.md`: page-level sequence by page
  type and user intent.
- `.convention/content/cta-patterns.md`: CTA posture by intent, journey stage, and
  action risk.
- `.convention/content/proof-and-credibility-patterns.md`: proof needs by claim and
  hesitation.
- `.convention/content/microcopy-guidelines.md`: field, state, dialog, and recovery
  language.
- `.convention/content/tone-of-voice/tone-of-voice-reference.md`: tone expression and
  restraint.

## Core Rules

1. Identify readiness before choosing CTA strength.
2. Match message depth to what the audience already understands.
3. Use proof and objections to move readiness forward; do not skip them.
4. Treat emotional state as a constraint on tone and pressure.
5. Do not write purchase-ready copy for unaware, anxious, skeptical, or blocked
   users.
6. Do not over-explain to returning users or users already inside a task flow.
7. Preserve source and confidence when audience intent is inferred rather than
   user-provided.

## Audience States

### Unaware

Definition: the user does not yet know the problem, need, product category, or
decision frame.

Likely user questions:

- Why does this matter?
- Is this relevant to me?
- What problem are we talking about?

Content needs:

- plain-language problem framing
- audience fit
- concrete examples
- low-jargon category explanation
- low-commitment next steps

Proof needs:

- light credibility signals
- recognizable context
- examples that make the issue real

CTA posture:

- learn, explore, see how it works, read guide
- avoid buy, book, submit, start trial, or request quote unless the user intent
  is known from context

Tone considerations:

- clear, patient, low-pressure
- avoid urgency and insider language

Audit checks:

- Does the copy assume category knowledge the user may not have?
- Does it ask for commitment before explaining relevance?

### Problem-Aware

Definition: the user understands the problem or pain but may not know the
solution category or available approaches.

Likely user questions:

- What options exist?
- What should I consider?
- What would improvement look like?

Content needs:

- problem-to-solution bridge
- education on approaches
- risk and effort framing
- common mistakes or criteria

Proof needs:

- process proof
- expert proof
- examples of similar situations

CTA posture:

- compare approaches, read guide, check fit, ask a specialist
- avoid immediate purchase pressure

Tone considerations:

- helpful, specific, not alarmist
- acknowledge friction without amplifying anxiety

Audit checks:

- Does the copy jump to features before explaining the solution logic?
- Does it use fear instead of useful framing?

### Solution-Aware

Definition: the user knows the solution category and is evaluating whether this
specific offer, product, service, or workflow fits.

Likely user questions:

- Why this option?
- How does it work?
- Is it right for my situation?

Content needs:

- offer clarity
- differentiators
- feature-to-benefit translation
- fit criteria
- limitations or scope

Proof needs:

- comparison proof
- testimonials or case studies
- credentials or product specs

CTA posture:

- compare, check compatibility, request guidance, view details
- use stronger CTAs only after fit and proof are clear

Tone considerations:

- confident but not inflated
- reduce ambiguity around fit and next steps

Audit checks:

- Does the copy rely on generic value claims instead of fit criteria?
- Are claims and proof close enough to support the decision?

### Comparison-Ready

Definition: the user is actively comparing options, plans, products, providers,
or approaches.

Likely user questions:

- What is different?
- Which option is right for me?
- What tradeoffs matter?

Content needs:

- comparison criteria
- plan or product differences
- eligibility, compatibility, scope, and limits
- pricing context if relevant

Proof needs:

- sourced comparison proof
- specs, certifications, benchmarks, case studies, or expert proof
- current pricing or availability source when used

CTA posture:

- compare plans, view specifications, check fit, ask an expert, request quote
- avoid "best" or "buy now" without criteria

Tone considerations:

- precise, structured, calm
- avoid hype and unsupported superiority

Audit checks:

- Does the copy hide tradeoffs?
- Does it recommend an option without criteria?

### Purchase-Ready

Definition: the user has enough context and trust to buy, book, subscribe,
submit, request, or otherwise commit.

Likely user questions:

- What happens when I act?
- What will it cost?
- Can I change my mind?
- Is my information safe?

Content needs:

- final action outcome
- pricing, terms, timing, and support
- policy, guarantee, or risk-reversal details when available
- form and confirmation microcopy

Proof needs:

- trust badges
- policy proof
- guarantee terms
- final reassurance tied to the specific action

CTA posture:

- buy, book, start, continue, submit, request, save
- be exact about the outcome

Tone considerations:

- clear, steady, action-oriented
- avoid surprise, pressure, or last-minute ambiguity

Audit checks:

- Does the final CTA match the actual outcome?
- Are pricing, terms, availability, and recovery clear?

### Anxious

Definition: the user may be worried about cost, health, safety, data, time,
mistakes, eligibility, or consequences.

Likely user questions:

- What if I make the wrong choice?
- Is this safe?
- Will I lose money, time, data, or access?
- Can someone help me?

Content needs:

- reassurance with specifics
- recovery paths
- support options
- privacy, safety, cost, or eligibility explanations
- calm microcopy

Proof needs:

- process proof
- expert proof
- policy proof
- support proof

CTA posture:

- ask a specialist, check fit, review options, save draft, contact support
- avoid urgency, pressure, and irreversible language unless necessary

Tone considerations:

- calm, service-oriented, precise
- avoid jokes, hype, and fear-based motivation

Audit checks:

- Does tone make the serious moment feel casual?
- Does the copy explain recovery and support?

### Skeptical

Definition: the user doubts claims, differentiation, pricing, trustworthiness,
or fit.

Likely user questions:

- Why should I believe this?
- What evidence supports it?
- What are the limits?
- Is this just marketing?

Content needs:

- specific claims
- transparent limits
- evidence near claims
- comparison criteria
- objection handling

Proof needs:

- sourced stats
- case studies
- expert proof
- certifications
- customer proof with approval

CTA posture:

- compare, view proof, read case study, review specifications, talk to expert
- avoid generic "get started" as the only next step

Tone considerations:

- direct, evidence-oriented, not defensive
- avoid vague superlatives

Audit checks:

- Does the copy make claims without evidence?
- Does it answer skepticism or just intensify persuasion?

### Returning User

Definition: the user has prior context, an account, saved progress, past
purchases, existing settings, or a known task.

Likely user questions:

- Where was I?
- What changed?
- What is the next step?
- Can I finish quickly?

Content needs:

- status and continuity
- concise summaries
- saved progress
- change notes
- direct task actions

Proof needs:

- less introductory proof
- account, status, or process confirmation
- policy or support proof only when risk changes

CTA posture:

- continue, resume, save, manage, review, finish
- avoid awareness copy and broad education unless context changed

Tone considerations:

- efficient, respectful, minimal
- do not re-sell what the user already chose

Audit checks:

- Does the copy waste time with first-visit explanation?
- Does it hide status, progress, or next step?

## Journey Map Fit

Use audience state to shape:

- `audience.intent`
- journey stage order
- user questions
- content goals
- objections
- proof needs
- CTA readiness
- support or recovery needs

When audience state is inferred:

- mark confidence appropriately
- record the evidence or assumption
- avoid high-pressure CTAs until readiness is supported

## ContentModel Fit

Use audience state to choose:

- section roles and copy density
- headline framing
- body depth
- proof placement
- CTA strength
- microcopy specificity
- tone restraint
- review metadata for claim-sensitive copy

Content models should stay tied to blueprint nodes. If the blueprint node order
does not match audience readiness, keep generated copy node-tied and raise a
journey or content audit finding.

## Tone And Emotional State

Tone must respect readiness:

| State | Tone Posture | Avoid |
| --- | --- | --- |
| Unaware | plain, orienting | jargon, urgency |
| Problem-aware | helpful, specific | fear, premature features |
| Solution-aware | clear, confident | vague differentiation |
| Comparison-ready | precise, structured | hype, hidden tradeoffs |
| Purchase-ready | direct, reassuring | surprise, ambiguity |
| Anxious | calm, service-oriented | jokes, pressure |
| Skeptical | evidence-oriented | unsupported claims |
| Returning user | efficient, contextual | re-selling, overexplaining |

## Audit Checks

Flag copy when:

- it asks unaware users to commit before explaining relevance
- it treats problem-aware users as if they already chose the solution
- it gives solution-aware users generic marketing instead of fit criteria
- it gives comparison-ready users no criteria, specs, pricing context, or proof
- it gives purchase-ready users unclear terms, outcomes, or recovery paths
- it uses playful or vague copy for anxious users
- it answers skepticism with stronger claims instead of evidence
- it makes returning users repeat awareness or onboarding copy unnecessarily
- CTA strength exceeds audience readiness
- tone hides risk, cost, eligibility, compatibility, or next-step consequences
- content is not tied to a journey stage or blueprint node

## Knowledge Pattern Preference

Prefer retrieved `journeyPattern`, `objectionPattern`, or `copyPattern` records
when they include audience-specific readiness, emotional state, source,
confidence, status, and review metadata. Use this reference as the generic
fallback for audience intent planning and audit checks.
