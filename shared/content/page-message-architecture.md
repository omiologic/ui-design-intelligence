# Page Message Architecture

Use this reference to plan message sequence by page type and user intent before
drafting page copy. Page message architecture defines the order and job of
content sections. It does not create layout hierarchy, add blueprint nodes, or
approve production copy.

## Related References

- `shared/content/laws-of-copywriting.md`: message logic, benefit clarity,
  proof, objections, and action readiness.
- `shared/content/content-pattern-library.md`: reusable section anatomies for
  hero, feature, proof, pricing, comparison, FAQ, form, empty, and error
  surfaces.
- `shared/content/proof-and-credibility-patterns.md`: evidence requirements for
  proof-bearing sections.
- `shared/content/cta-patterns.md`: action language by user intent, readiness,
  hierarchy, and interaction risk.
- `shared/content/claim-risk-guidelines.md`: review metadata for regulated,
  technical, pricing, safety, performance, compatibility, and availability
  claims.
- `shared/schemas/user-journey-map.schema.json`: journey stages and user
  questions.
- `shared/schemas/content-model.schema.json`: node-tied section and copy roles.

## Core Rules

1. Start with page type, audience, journey stage, and primary user question.
2. Map every message section to an existing or planned blueprint node.
3. Put proof before the commitment it supports.
4. Place objections before high-commitment CTAs when risk or cost is material.
5. Shorten the sequence when user intent is narrow, source truth is limited, or
   the page is part of a task flow.
6. Reorder only when the journey stage, domain risk, or blueprint node order
   justifies it.
7. Omit sections that lack source truth, evidence, or a user-facing job.
8. Preserve review metadata for claims, proof, pricing, specs, and approval
   requirements.

## Architecture Shape

Use this structure when planning page messages:

| Field | Meaning |
| --- | --- |
| Page type | Landing, product, service, pricing, onboarding, checkout, support, healthcare, B2B SaaS |
| Journey stage | Awareness, consideration, evaluation, action, retention, recovery |
| User question | What the user needs answered before moving forward |
| Content goal | What the section must help the user understand, trust, compare, or do |
| Section role | Hero, problem, offer, proof, comparison, pricing, process, FAQ, form, support, confirmation |
| Blueprint node | Existing or planned node ID that owns the section |
| Copy roles | Headline, body, proof point, CTA, helper text, disclaimer, error, confirmation |
| Review needs | Claims, pricing, product specs, legal, medical, compliance, client approval |

## Landing Page Sequence

Use when the page introduces a focused offer, campaign, lead magnet, product
launch, service, or conversion path.

| Step | Journey Stage | User Question | Content Goal | Section Role |
| --- | --- | --- | --- | --- |
| 1 | Awareness | What is this and is it for me? | Name the offer, audience, and immediate benefit. | hero |
| 2 | Awareness | Why should I care now? | Translate pain, opportunity, or desired outcome. | problem or value |
| 3 | Consideration | How does it help? | Explain the mechanism, feature set, or service model. | feature or process |
| 4 | Consideration | Can I trust it? | Add sourced proof close to the main claim. | proof |
| 5 | Evaluation | Which path should I choose? | Compare options, plans, or use cases if needed. | comparison |
| 6 | Evaluation | What might go wrong? | Answer objections around risk, cost, timing, and fit. | FAQ or objection |
| 7 | Action | What do I do next? | Present the primary CTA with support copy. | CTA or form |

Shorten when:

- the offer is simple and low-risk
- traffic is already high-intent
- proof is not available yet and must be marked as missing
- the landing page is a step inside a larger flow

Do not omit:

- audience fit
- primary benefit
- proof or a placeholder-safe proof need for high-risk offers
- CTA outcome

## Product Page Sequence

Use when the user evaluates a product, model, SKU, app, tool, plan, or product
family.

| Step | Journey Stage | User Question | Content Goal | Section Role |
| --- | --- | --- | --- | --- |
| 1 | Consideration | What is the product and who is it for? | State product category, fit, and main benefit. | hero or product summary |
| 2 | Consideration | What does it do? | Explain core capabilities and use cases. | feature |
| 3 | Evaluation | Is it right for my needs? | Support comparison by criteria, specs, or use case. | comparison |
| 4 | Evaluation | Can I trust the claims? | Add proof, certifications, reviews, or process evidence. | proof |
| 5 | Evaluation | What does it cost and include? | Present pricing, options, bundle notes, or quote path. | pricing |
| 6 | Evaluation | What are the limits? | Address compatibility, availability, returns, support, and specs. | FAQ |
| 7 | Action | How do I buy, inquire, or configure? | Present purchase, inquiry, booking, or configuration CTA. | CTA or form |

Shorten when:

- the product is commodity-like and low-risk
- comparison already lives in a separate selector
- pricing or availability is intentionally quote-based

Reorder when:

- regulated proof must appear before feature claims
- compatibility determines whether users should keep reading
- pricing is the first decision filter

## Service Page Sequence

Use when the page explains a professional, local, consulting, healthcare,
agency, repair, maintenance, or implementation service.

| Step | Journey Stage | User Question | Content Goal | Section Role |
| --- | --- | --- | --- | --- |
| 1 | Awareness | What service is offered? | Name the service and the user problem it solves. | hero |
| 2 | Consideration | Is this the right provider? | Explain audience fit, service scope, and outcomes. | service overview |
| 3 | Consideration | How does the process work? | Describe steps, timing, owner, and what the user provides. | process |
| 4 | Evaluation | Can I trust the provider? | Add credentials, testimonials, case studies, or process proof. | proof |
| 5 | Evaluation | What will it cost or require? | Explain pricing path, quote process, consultation, or requirements. | pricing or inquiry |
| 6 | Evaluation | What concerns should I resolve? | Answer objections, eligibility, risk, timing, and support. | FAQ |
| 7 | Action | How do I start? | Use book, inquire, request quote, or contact CTA. | CTA or form |

Omit sections only when:

- the blueprint node order intentionally handles them elsewhere
- source truth is unavailable and the missing proof or pricing need is recorded

## Pricing Page Sequence

Use when the user compares plans, packages, subscriptions, service tiers,
quotes, bundles, or buying paths.

| Step | Journey Stage | User Question | Content Goal | Section Role |
| --- | --- | --- | --- | --- |
| 1 | Evaluation | Which option should I consider? | Explain who each plan or package is for. | pricing hero |
| 2 | Evaluation | What is included? | Present inclusions, limits, and differences. | pricing table |
| 3 | Evaluation | Why is the price justified? | Add value, proof, support, or process context. | value proof |
| 4 | Evaluation | What might change the price? | Clarify fees, usage, eligibility, taxes, quotes, or terms. | pricing note |
| 5 | Evaluation | What if I choose wrong? | Add support, downgrade, cancellation, trial, or consultation guidance. | objection or FAQ |
| 6 | Action | How do I choose or ask? | Present plan CTA, quote CTA, or contact path. | CTA |

Required safeguards:

- mark pricing claims for review unless approved and current
- avoid savings claims without source
- avoid "best" labels unless criteria are explicit

## Onboarding Sequence

Use when the page or flow introduces a user to setup, account creation,
personalization, trial activation, importing, or first use.

| Step | Journey Stage | User Question | Content Goal | Section Role |
| --- | --- | --- | --- | --- |
| 1 | Action | What am I setting up? | Confirm the goal and expected outcome. | orientation |
| 2 | Action | What do I need to do first? | Show the next step and required input. | step intro |
| 3 | Action | Why is this needed? | Explain value, privacy, or dependency. | helper |
| 4 | Action | Can I skip or come back? | Clarify optionality and save behavior. | support |
| 5 | Action | What happens after this? | Confirm progress, next step, or success. | confirmation |

Shorten when:

- the task is single-step
- users already chose the setup path
- the screen is a repeated step inside a wizard

Do not add marketing proof unless it reduces setup anxiety or explains a
required field.

## Checkout Sequence

Use when the user reviews cart, payment, shipping, subscription, booking,
purchase, or confirmation steps.

| Step | Journey Stage | User Question | Content Goal | Section Role |
| --- | --- | --- | --- | --- |
| 1 | Action | What am I buying or booking? | Summarize item, plan, appointment, or service. | order summary |
| 2 | Action | What does it cost? | Show price, fees, discounts, taxes, and terms. | pricing summary |
| 3 | Action | What do you need from me? | Request only necessary information. | form |
| 4 | Action | Is this safe and reversible? | Add trust, policy, guarantee, or support proof. | trust or policy |
| 5 | Action | What happens when I confirm? | Explain submit result, timing, and recovery. | confirmation prep |
| 6 | Action | Can I finish now? | Present final action with exact outcome. | final CTA |

Required safeguards:

- pricing, availability, shipping, refund, and guarantee copy needs current
  source truth
- destructive or irreversible actions need explicit confirmation copy
- disabled CTAs need helper text

## Support Flow Sequence

Use when the user needs help, recovery, account support, troubleshooting,
returns, contact, status, or issue escalation.

| Step | Journey Stage | User Question | Content Goal | Section Role |
| --- | --- | --- | --- | --- |
| 1 | Recovery | What can I do here? | Name the support job and scope. | support hero |
| 2 | Recovery | Can I solve this myself? | Offer common paths, search, or categories. | support options |
| 3 | Recovery | What information is needed? | Request only needed details with helper text. | support form |
| 4 | Recovery | What happens next? | Set expectation for response, timing, or escalation. | process |
| 5 | Recovery | What if this fails? | Provide retry, contact, status, or fallback. | recovery |

Avoid:

- sales CTAs during unresolved support tasks
- unsupported response-time promises
- blaming language in errors or retry states

## Healthcare Page Sequence

Use for medical, dental, wellness, clinical product, practitioner, clinic,
treatment, procedure, or health-adjacent pages.

| Step | Journey Stage | User Question | Content Goal | Section Role |
| --- | --- | --- | --- | --- |
| 1 | Awareness | What is the care, service, or product? | Explain plainly without diagnosis or outcome promises. | hero |
| 2 | Awareness | Is this relevant to my situation? | Describe audience, symptoms, use case, or eligibility carefully. | fit |
| 3 | Consideration | Who provides or reviews this? | Show credentials, clinical process, or expert proof. | credibility |
| 4 | Consideration | What should I expect? | Explain process, appointment, product use, or next step. | process |
| 5 | Evaluation | What are the risks, limits, or alternatives? | Add disclaimers, FAQ, limitations, and review needs. | FAQ or limits |
| 6 | Action | How do I ask or book? | Use inquiry, appointment request, or consultation CTA. | CTA or form |

Required safeguards:

- mark medical, safety, product-spec, and compliance claims for review
- avoid guarantees, universal safety, diagnosis, treatment, or prevention claims
  unless explicitly approved
- proof must be credentialed and scoped

## B2B SaaS Page Sequence

Use for software, platform, tool, integration, enterprise, product-led growth,
demo, trial, or procurement pages.

| Step | Journey Stage | User Question | Content Goal | Section Role |
| --- | --- | --- | --- | --- |
| 1 | Awareness | What business problem does this solve? | State category, user, and outcome. | hero |
| 2 | Consideration | How does it work? | Explain workflow, capabilities, and teams served. | feature or workflow |
| 3 | Consideration | Will it fit our stack? | Address integrations, security, roles, and implementation. | compatibility |
| 4 | Evaluation | Can we trust it? | Add customer proof, security proof, case studies, or expert proof. | proof |
| 5 | Evaluation | What does adoption look like? | Explain onboarding, migration, support, or process. | process |
| 6 | Evaluation | How do plans or pricing work? | Present pricing, quote path, or packaging. | pricing |
| 7 | Action | Should I start, book, or contact sales? | Match CTA to trial, demo, inquiry, or procurement readiness. | CTA |

Required safeguards:

- technical, security, compatibility, pricing, and performance claims need
  source truth and review metadata
- avoid enterprise-grade, secure, fastest, or no-code claims without support

## Shorten, Reorder, Or Omit

Shorten when:

- the user has one known task
- the page is a step inside a larger flow
- the decision is low-risk and low-cost
- source truth is too thin for extra sections
- the blueprint already resolves proof or objections elsewhere

Reorder when:

- price is the first filter
- compatibility is the first filter
- regulated proof must appear before benefit claims
- support or recovery context matters more than conversion
- a known returning user does not need awareness copy

Omit when:

- a section has no user question to answer
- proof would be fabricated
- pricing is not available and the quote path is clearer
- a CTA would ask for commitment before readiness
- the blueprint does not contain, allow, or need a matching node

## Blueprint Node Order Relationship

Message architecture guides copy roles inside blueprint structure. It should not
silently reorder or invent nodes.

When blueprint order matches the recommended sequence:

- map each section role to the existing node ID
- generate copy fields for the node's role and component anatomy
- preserve source, confidence, status, and review metadata

When blueprint order differs:

- keep node-tied output in the existing order
- record a journey or copy audit note if proof, objections, pricing, or CTA
  readiness appears out of sequence
- recommend blueprint repair only when the order blocks user understanding or
  action readiness

When a recommended section is missing:

- do not invent a node in `ContentModel`
- record the missing content role as a handoff or audit finding
- use placeholder-safe proof or review notes only when the existing node can
  honestly carry that role

## Audit Checks

Flag page message architecture when:

- the page asks for action before benefit, proof, or objection handling
- proof appears after the claim or CTA it should support
- pricing appears without terms, inclusions, caveats, or source truth
- support flows include sales pressure before recovery
- healthcare pages make unreviewed treatment, safety, or outcome claims
- B2B SaaS pages make unsupported security, integration, or performance claims
- onboarding screens explain marketing value instead of task progress
- checkout screens hide cost, terms, support, or final action outcome
- copy is free-floating and not mapped to blueprint nodes
- the sequence duplicates sections without new user questions

## Knowledge Pattern Preference

Prefer retrieved `journeyPattern` or `copyPattern` records when they provide a
more specific sequence for the audience, domain, page type, journey stage, or
conversion goal and include usable source, confidence, status, and review-risk
metadata. Use this reference as the generic fallback for page message planning.
