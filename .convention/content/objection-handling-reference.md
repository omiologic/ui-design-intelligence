# Objection Handling Reference

Use this reference to identify common user objections and choose honest response
patterns without adding unsupported claims. Objection handling should reduce
uncertainty, not pressure users.

## Related References

- `.convention/content/audience-intent-reference.md`: audience readiness and
  emotional state.
- `.convention/content/page-message-architecture.md`: where objections belong in a
  page sequence.
- `.convention/content/proof-and-credibility-patterns.md`: proof needed to answer
  trust, risk, comparison, or claim objections.
- `.convention/content/claim-risk-guidelines.md`: review handling for regulated,
  pricing, technical, safety, performance, compatibility, and availability
  claims.
- `.convention/content/cta-patterns.md`: CTA posture after objections are answered.
- `knowledge/schemas/objection-pattern.schema.json`: project-specific or
  reusable objection records with source, confidence, status, and review
  metadata.

## Core Rules

1. Name the user's concern before answering it.
2. Use proof, comparison, process, policy, or support instead of reassurance
   alone.
3. Do not invent guarantees, savings, compatibility, safety, availability,
   performance, or policy terms.
4. Put objections before high-commitment CTAs when the concern affects action
   readiness.
5. Match response depth to audience readiness and emotional state.
6. Mark claim-sensitive responses with review metadata.
7. Prefer a lower-commitment CTA when objections remain unresolved.

## Objection Categories

### Price

User concern:

- Is this worth the cost?
- What is included?
- Are there hidden fees?
- Can I justify this purchase?

Response patterns:

- Show inclusions, limits, and plan differences.
- Explain quote, estimate, or pricing process.
- Tie value to specific use cases or outcomes only when sourced.
- Offer lower-commitment CTA: compare plans, request quote, view pricing.

Section mapping:

- pricing table
- pricing note
- comparison copy
- FAQ
- CTA support copy

Avoid:

- unsourced savings claims
- "best value" without criteria
- no-fee or discount claims without current source truth

### Trust

User concern:

- Can I trust this company, product, provider, or process?
- Who stands behind it?
- Is this credible or just marketing?

Response patterns:

- Add credentials, customer proof, expert proof, certifications, or process
  proof.
- Explain who reviews, supports, or delivers the work.
- Use specific proof near the claim it supports.
- Offer CTA: view proof, read case study, ask a specialist.

Section mapping:

- proof section
- testimonial or case study
- credential block
- trust badge
- FAQ

Avoid:

- invented logos, testimonials, or badges
- vague "trusted by everyone" proof
- expanding certification beyond its scope

### Complexity

User concern:

- Is this too hard to understand?
- Will setup be confusing?
- Do I need expertise?

Response patterns:

- Break the process into steps.
- Explain what the user needs to provide.
- Show guided setup, support, onboarding, or defaults.
- Use examples and plain-language labels.

Section mapping:

- process section
- onboarding copy
- helper text
- FAQ
- support CTA

Avoid:

- pretending a complex process is effortless
- hiding prerequisites
- using vague "simple" claims without explaining why

### Effort

User concern:

- How much time, work, or information will this require?
- What happens after I submit?
- Can I pause or come back?

Response patterns:

- State steps, time expectations, required inputs, and save behavior when
  sourced.
- Use form helper text to explain why each field matters.
- Add progress, confirmation, and recovery microcopy.
- Offer CTA: start setup, save draft, continue later.

Section mapping:

- form intro
- onboarding steps
- helper text
- confirmation copy
- FAQ

Avoid:

- unsupported timing promises
- asking for sensitive information without rationale
- hiding dependencies until late in the flow

### Risk

User concern:

- What if this does not work?
- Can I undo, cancel, return, downgrade, or get help?
- What happens if I choose wrong?

Response patterns:

- Explain policies, support, reversibility, and recovery paths.
- Use guarantee or policy proof only when approved.
- For irreversible actions, explain consequences clearly.
- Offer CTA: review policy, ask support, compare options.

Section mapping:

- policy note
- FAQ
- confirmation dialog
- CTA support copy
- error or recovery state

Avoid:

- "risk-free" without terms
- hiding exclusions or irreversibility
- softening destructive actions

### Compatibility

User concern:

- Will this work with my device, workflow, account, role, platform, procedure,
  or existing system?

Response patterns:

- Show supported items, criteria, specs, or integration lists.
- Use fit checks and comparison criteria.
- Route uncertain users to specialist or support guidance.
- Offer CTA: check compatibility, compare models, ask an expert.

Section mapping:

- comparison table
- specs section
- product selector
- FAQ
- support CTA

Avoid:

- "works with everything" claims
- universal-fit recommendations
- unsupported technical or product-spec claims

### Time

User concern:

- How long will this take?
- When will I get a response, delivery, appointment, setup, or result?

Response patterns:

- State timing only when sourced and current.
- Explain process stages instead of promising speed.
- Offer status, scheduler, or support paths.
- Use loading and confirmation microcopy carefully.

Section mapping:

- process section
- booking flow
- confirmation state
- support flow
- FAQ

Avoid:

- same-day, instant, or response-time claims without source truth
- fake progress precision
- urgency based only on conversion pressure

### Switching Cost

User concern:

- What happens to my current data, workflow, provider, subscription, tools, or
  habits?
- Is migration worth it?

Response patterns:

- Explain migration, import, onboarding, support, and fallback options.
- Show comparison against current workflow when evidence exists.
- Clarify what changes and what stays the same.
- Offer CTA: plan migration, talk to an expert, review setup steps.

Section mapping:

- process proof
- migration or onboarding section
- comparison section
- FAQ
- support CTA

Avoid:

- "seamless" without evidence
- minimizing real operational effort
- implying no disruption without proof

### Privacy

User concern:

- Why do you need this information?
- How will my data be used?
- Who can see it?

Response patterns:

- Explain data purpose near the field or permission prompt.
- Link to policy or approved privacy copy when needed.
- State fallback options if permission is optional.
- Use calm, precise microcopy.

Section mapping:

- form helper text
- permission prompt
- FAQ
- trust or policy note
- account settings copy

Avoid:

- summarizing legal policy from memory
- "always protected" claims without approved language
- pressuring users to grant optional access

### Safety

User concern:

- Is this safe for me, my team, my patients, my family, or my environment?
- What are the limits or precautions?

Response patterns:

- Use approved safety instructions, warnings, specs, or expert guidance.
- Keep claims scoped and review-flagged.
- Direct users to consult appropriate experts when needed.
- Offer CTA: review safety details, ask a specialist, check fit.

Section mapping:

- healthcare or regulated FAQ
- product specs
- warning or helper text
- expert proof
- support CTA

Avoid:

- absolute safety claims
- universal suitability
- medical, legal, or technical advice without review

### Proof Gaps

User concern:

- Where is the evidence?
- Why should I believe this claim?
- Are examples, reviews, metrics, or credentials missing?

Response patterns:

- Add sourced proof when available.
- Use placeholder-safe proof needs in prototypes.
- Downgrade unsupported claims to neutral capability language.
- Mark missing proof as a review or handoff requirement.

Section mapping:

- proof section
- case study
- testimonial slot
- stat slot
- audit finding

Avoid:

- filling gaps with invented proof
- increasing claim intensity when evidence is weak
- treating proof gaps as tone issues

## Mapping To Content Surfaces

Use objections in:

- page sections: problem, proof, comparison, pricing, process, FAQ, CTA
- FAQ entries: direct concern, plain answer, next step or source
- comparison copy: criteria, tradeoff, fit, caveat
- form microcopy: rationale for sensitive fields, recovery, save behavior
- CTA support copy: risk, timing, cost, support, or next-step clarification
- prototype states: empty, error, confirmation, support, retry, permission

Do not use objections as:

- fear-based urgency
- unsupported reassurance
- hidden claim expansion
- pressure to convert before readiness

## Response Pattern Library

Use these safe patterns:

- Acknowledge: "If you are comparing options, start with..."
- Clarify: "This includes... It does not include..."
- Scope: "Designed for... Review fit if..."
- Route: "Ask a specialist before choosing."
- Compare: "Use these criteria to decide..."
- Recover: "You can edit this before submitting."
- Defer: "Policy terms need review before publishing."
- Placeholder: `[Approved proof needed for this objection.]`

Avoid these unsafe patterns:

- "No risk"
- "Guaranteed results"
- "Works for everyone"
- "Always available"
- "No hidden fees" without approved pricing source
- "Completely safe"
- "Seamless migration" without evidence

## ObjectionPattern Knowledge Boundary

`.convention/content/objection-handling-reference.md` is generic guidance. It
defines common categories and response structures that can apply across
industries.

`knowledge/schemas/objection-pattern.schema.json` records are project-specific
or reusable knowledge items. Prefer an `objectionPattern` record when it has:

- a specific audience, domain, page type, journey stage, or product context
- source, confidence, status, and review metadata
- evidence-backed response strategy
- known copy, proof, CTA, or section guidance

Use this shared reference as the fallback when no suitable sourced
`objectionPattern` exists.

## Audit Checks

Flag objection handling when:

- a likely objection is missing before a high-commitment CTA
- the response uses reassurance without proof, process, policy, comparison, or
  support
- copy answers the wrong readiness state
- price, trust, compatibility, privacy, safety, or risk concerns are hidden
- FAQ answers dismiss concerns instead of resolving them
- comparison copy omits tradeoffs
- CTA support copy promises unsupported outcomes
- prototype copy uses production-sounding proof placeholders
- response language creates claim-risk without `needsReview`
- generic objection guidance is used when a stronger sourced
  `objectionPattern` exists
