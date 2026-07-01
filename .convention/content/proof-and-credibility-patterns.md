# Proof And Credibility Patterns

Use this reference to choose credible proof structures without fabricating
evidence. Proof should support a specific claim, answer a specific hesitation,
and appear before the copy asks for trust or commitment.

## Related References

- `.convention/content/laws-of-copywriting.md`: why proof must appear before
  high-commitment CTAs and unsupported claims.
- `.convention/content/claim-risk-guidelines.md`: when proof or claim language needs
  review metadata and cannot be treated as production-ready.
- `.convention/content/copy-quality-checklist.md`: pass/fail checks for proof,
  source truth, CTA readiness, and claim risk.
- `.convention/content/content-pattern-library.md`: section structures for proof,
  comparison, pricing, FAQ, forms, empty states, and errors.
- `.convention/schemas/content-model.schema.json`: node-tied proof copy with source,
  confidence, status, and `needsReview`.
- `.convention/schemas/prototype-content.schema.json`: prototype-ready proof labels,
  helper text, disclaimers, and state copy.

## Core Rules

1. Tie every proof point to the claim it supports.
2. Use only supplied, observed, approved, or explicitly placeholder-safe proof.
3. Preserve source, confidence, status, and review-risk metadata.
4. Do not convert prototype placeholders into production claims.
5. Prefer specific, modest proof over broad credibility language.
6. Put proof before high-commitment CTAs, pricing asks, form submission, or
   regulated claims.
7. If real proof is unavailable, name the missing proof need instead of
   inventing testimonials, stats, badges, awards, clients, or case studies.

## Proof Selection

Choose proof by user hesitation:

| User Hesitation | Better Proof Type | Avoid |
| --- | --- | --- |
| Can I trust this provider? | Credentials, certifications, expert proof, process proof | Vague trust badges |
| Does it work? | Stats, case studies, process proof, comparison proof | Unsupported "proven" language |
| Is this right for me? | Comparison proof, expert proof, compatibility proof | Universal-fit claims |
| Is the risk manageable? | Guarantees, policy proof, process proof, safety review | Absolute safety promises |
| Has anyone like me used it? | Testimonials, case studies, industry examples | Invented logos or quotes |
| Is the price justified? | Pricing context, comparison proof, value evidence | Unsourced savings claims |

## Proof Types

### Testimonials

Purpose: show that a real customer, patient, client, or user experienced a
specific benefit or resolved a specific hesitation.

Required evidence:

- exact quote or approved paraphrase
- person, role, company, or anonymization rule
- permission or approval status
- source date or freshness when relevant
- claim-risk review for medical, financial, legal, safety, or performance
  outcomes

Use for:

- trust-sensitive landing pages
- product evaluation sections
- service pages with high uncertainty
- prototype realism when clearly marked as placeholder

Placeholder-safe prototype pattern:

- `[Approved customer quote needed about setup confidence.]`
- `Customer proof placeholder: add quote after client approval.`
- `Draft testimonial slot: source and permission required.`

Avoid:

- invented quotes
- fake names, headshots, logos, or ratings
- vague quotes such as "Amazing service" unless supplied
- regulated outcome claims without review

Audit checks:

- Is the quote sourced and approved?
- Does the testimonial support a nearby claim?
- Are identity, permission, and review status clear?
- Does the quote overpromise outcomes?

### Stats

Purpose: provide measurable evidence for scale, outcomes, speed, adoption,
quality, satisfaction, or performance.

Required evidence:

- exact number and unit
- source name or dataset
- measurement window
- denominator or sample size when applicable
- calculation method or scope
- approval status and claim-risk category

Use for:

- adoption proof
- performance comparisons
- customer outcomes
- operational credibility
- product specifications

Placeholder-safe prototype pattern:

- `[Metric needed: adoption, satisfaction, or performance stat.]`
- `Metric placeholder: add sourced benchmark before production.`
- `Draft stat slot: confirm number, window, and source.`

Avoid:

- unsourced percentages
- "up to" claims without conditions
- cherry-picked metrics without scope
- rounded numbers that imply unsupported precision

Audit checks:

- Is the source, denominator, and timeframe clear?
- Does the stat support the exact claim nearby?
- Is the claim marked for review when regulated or performance-sensitive?
- Could the number be outdated, conditional, or misleading?

### Certifications

Purpose: show third-party verification, compliance, training, credentialing,
security posture, professional standing, or product qualification.

Required evidence:

- certification name
- issuing organization
- holder or product covered
- active/expired status
- date, version, level, or scope
- approved usage rules for badges or logos

Use for:

- regulated or technical products
- professional services
- security and privacy reassurance
- procurement or enterprise evaluation

Placeholder-safe prototype pattern:

- `[Certification badge pending approval.]`
- `Credential slot: add approved certification name and scope.`
- `Compliance proof placeholder: legal review required.`

Avoid:

- generic "certified" labels
- expired or out-of-scope badges
- implying certification covers the entire product when it covers one process
- using logos without permission

Audit checks:

- Is the issuing body named?
- Is scope clear?
- Is the certification current and approved for use?
- Does the copy avoid expanding the certification beyond its scope?

### Case Studies

Purpose: show a specific before/after, implementation path, decision process,
or outcome with enough context to be credible.

Required evidence:

- customer or anonymized profile
- starting problem
- solution or process used
- outcome or lesson
- source approval
- limits, caveats, or review risks

Use for:

- B2B evaluation
- high-cost products or services
- complex implementation
- proof that process and expertise are real

Placeholder-safe prototype pattern:

- `[Case study needed: include problem, approach, and approved result.]`
- `Case proof placeholder: add approved customer story.`
- `Draft case slot: confirm outcome before publishing.`

Avoid:

- invented customer stories
- unsupported before/after claims
- outcome numbers without source context
- implying all users will get the same result

Audit checks:

- Does the case identify context and limits?
- Is the outcome sourced?
- Does the story support the surrounding offer?
- Are regulated or performance claims reviewed?

### Expert Proof

Purpose: show that a qualified human, team, advisor, reviewer, or specialist
supports the recommendation, product, process, or content.

Required evidence:

- expert name, role, or team
- credential or qualification scope
- relationship to the product or service
- approved quote, review note, or authorship
- conflict or sponsorship limits when relevant

Use for:

- professional services
- technical products
- regulated domains
- high-risk decisions
- complex comparison or compatibility guidance

Placeholder-safe prototype pattern:

- `[Expert review note needed.]`
- `Specialist guidance placeholder: confirm reviewer and scope.`
- `Draft expert proof: add approved quote or credential.`

Avoid:

- vague "our experts say"
- invented credentials
- implying independent review when the expert is internal
- medical, legal, financial, or safety advice without review

Audit checks:

- Is the expert's scope of authority clear?
- Is the proof independent, internal, or sponsored?
- Does the expert claim require regulated review?
- Does the copy avoid overstating certainty?

### Guarantees

Purpose: reduce perceived risk by explaining an approved policy, warranty,
trial, refund, cancellation, uptime, support, or satisfaction commitment.

Required evidence:

- exact guarantee or policy text
- terms, exclusions, duration, and eligibility
- approving owner
- legal or compliance review status
- destination for full policy details

Use for:

- purchase decisions
- booking or subscription flows
- high-friction forms
- pricing and checkout pages

Placeholder-safe prototype pattern:

- `[Policy proof needed: confirm guarantee terms.]`
- `Guarantee placeholder: add approved terms before production.`
- `Risk-reversal copy pending legal review.`

Avoid:

- "risk-free" unless policy supports it
- guarantee language without exclusions
- mixing satisfaction, warranty, cancellation, and refund terms
- CTA labels that imply guaranteed approval or outcome

Audit checks:

- Are terms and exclusions available?
- Is the guarantee approved?
- Does it avoid broader legal, financial, medical, or safety promises?
- Is the full policy easy to access?

### Trust Badges

Purpose: provide compact credibility signals such as secure checkout, payment
methods, memberships, awards, privacy, shipping, returns, or support coverage.

Required evidence:

- badge label and meaning
- source or owner
- usage permission
- scope and date when relevant
- relationship to the claim or action nearby

Use for:

- checkout and forms
- pricing cards
- account setup
- service inquiry pages
- trust-sensitive CTAs

Placeholder-safe prototype pattern:

- `[Trust badge pending source.]`
- `Badge placeholder: add approved security, membership, or policy proof.`
- `Trust signal slot: confirm label and scope.`

Avoid:

- decorative badge piles
- fake awards or memberships
- security icons without actual security claim approval
- badges that are unrelated to the decision point

Audit checks:

- Does the badge mean something specific?
- Is the badge close to the risk it reduces?
- Is the badge approved for use?
- Does it avoid implying a broader guarantee?

### Comparison Proof

Purpose: help users understand differences across options, plans, products,
providers, workflows, or approaches using sourced criteria.

Required evidence:

- comparison criteria
- source for each claim
- scope, version, date, or model covered
- basis for recommendations
- review status for specs, pricing, compatibility, and performance

Use for:

- product pages
- pricing pages
- plan selection
- compatibility checks
- buying guides

Placeholder-safe prototype pattern:

- `[Comparison criteria needed.]`
- `Comparison proof placeholder: confirm specs and pricing.`
- `Draft comparison: product team review required.`

Avoid:

- competitor claims without source
- "best" or "better" without criteria
- outdated pricing or specs
- universal-fit recommendations

Audit checks:

- Are criteria explicit?
- Are comparison claims sourced and current?
- Does the recommendation match the user's context?
- Are specs, pricing, compatibility, and performance flagged for review?

### Process Proof

Purpose: make an offer believable by showing how work happens, what the user
can expect, what safeguards exist, or how decisions are made.

Required evidence:

- steps or workflow
- owner or responsible role
- timing or dependency caveats
- quality controls, review steps, or support paths
- source or operating truth

Use for:

- services
- onboarding
- complex products
- regulated or review-heavy domains
- forms and post-submit states

Placeholder-safe prototype pattern:

- `[Process steps pending confirmation.]`
- `Process proof placeholder: confirm sequence and ownership.`
- `Draft workflow proof: add reviewed steps before production.`

Avoid:

- false simplicity
- timelines without operational support
- implying human review when none exists
- hiding dependencies or next steps

Audit checks:

- Does the process explain what happens next?
- Are timing and ownership claims sourced?
- Does it reduce uncertainty before a CTA or form?
- Does it include recovery or support paths when needed?

## ContentModel Fit

Use proof patterns for:

- `nodeRole`: `proofSection`, `testimonial`, `credential`, `trustSignal`,
  `comparison`, `caseStudy`, `pricing`, `faq`, `primaryCTA`
- fields such as `headline`, `body`, `proofPoint`, `disclaimer`, `supportCTA`,
  `priceNote`, and comparison criteria
- review metadata where source, confidence, status, and `needsReview` are
  required

Content models should not turn placeholder proof into final claims. If proof is
missing, record the proof need and preserve draft status.

## PrototypeContent Fit

Use proof patterns for:

- proof callouts in prototype screens
- testimonial or stat slots in page prototypes
- certification or badge placeholders near forms and CTAs
- comparison proof in product selectors
- process proof in booking, onboarding, quote, and application flows
- disclaimers and helper text that identify missing proof or review needs

Prototype proof should make the interaction realistic without pretending the
copy is approved. Prefer bracketed placeholders or explicit handoff notes when
real proof is unavailable.

## Placeholder-Safe Patterns

Use these when proof is needed but unavailable:

- `[Approved testimonial needed for this claim.]`
- `[Metric needed: confirm source, denominator, and date.]`
- `[Certification badge pending approval.]`
- `[Case study needed: confirm problem, approach, and result.]`
- `[Expert review note needed before production.]`
- `[Guarantee terms pending legal review.]`
- `[Trust badge pending source and usage approval.]`
- `[Comparison criteria require product review.]`
- `[Process steps pending operations review.]`

Do not use:

- fake names
- fake logos
- fake ratings
- "trusted by thousands" without a source
- "proven" without evidence
- "certified" without issuer and scope
- invented before/after outcomes

## Audit Checks

Flag proof and credibility copy when:

- proof is vague, decorative, or detached from a claim
- testimonials, stats, logos, awards, or case studies appear invented
- proof appears after the CTA that needed it
- proof is missing source, confidence, status, approval, or review-risk metadata
- regulated, pricing, technical, safety, performance, compatibility, or
  availability proof lacks review flags
- badges imply claims they do not support
- comparison proof lacks criteria, date, model, version, or source
- guarantees omit terms, exclusions, duration, or eligibility
- process proof promises timelines or review steps without operational support
- prototype placeholders look like production copy

## Knowledge Pattern Preference

Prefer a retrieved knowledge `copyPattern` when it contains proof structures
specific to the audience, industry, page type, claim, journey stage, or
conversion goal and includes source, confidence, status, and review-risk
metadata. Use this reference as the fallback for generic proof selection and
audit checks.
