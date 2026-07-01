# Claim Risk Guidelines

Use this reference to detect and handle claim risk in generated content models,
prototype copy, CTA labels, forms, audit findings, and copy-pattern extraction.
It is not legal, medical, financial, safety, or compliance advice. It exists to
make generated copy safer by preserving uncertainty and requiring appropriate
human review.

## Related References

- `shared/content/copy-quality-checklist.md`: pass/fail quality checks for
  unsupported claims, source truth, and review metadata.
- `shared/content/laws-of-copywriting.md`: persuasion logic that must not
  invent evidence or overstate benefits.
- `shared/content/cta-patterns.md`: action labels that should avoid unsupported
  savings, availability, urgency, or outcome claims.
- `shared/content/content-pattern-library.md`: page and state structures where
  claims commonly appear.
- `shared/schemas/content-model.schema.json`: content entries with source,
  confidence, status, and `needsReview` metadata.
- `shared/schemas/prototype-content.schema.json`: prototype copy with review
  metadata for screens, states, dialogs, forms, and messages.

## Core Rules

1. Do not invent claims, proof, credentials, guarantees, rankings, outcomes,
   savings, availability, compatibility, or response times.
2. If a claim depends on domain expertise or business truth, preserve it as
   draft copy and add `needsReview`.
3. If source support is weak, rewrite toward factual scope, user action, or
   neutral capability instead of stronger persuasion.
4. Do not mark regulated, technical, pricing, safety, performance,
   compatibility, or availability claims `productionReady` unless approval is
   explicit in the supplied source.
5. Separate copy quality from approval. A sentence can be clear and still need
   legal, medical, financial, compliance, product, pricing, or client review.

## Review Metadata Rules

Set `needsReview` when generated or derived copy includes any claim category
below and source approval is missing, ambiguous, outdated, or inferred.

Use these review-risk labels where supported by the artifact:

- `medicalClaims`
- `financialClaims`
- `legalClaims`
- `technicalAccuracy`
- `pricingAccuracy`
- `safetyClaims`
- `performanceClaims`
- `compatibilityClaims`
- `availabilityClaims`
- `clientApproval`
- `productSpecs`
- `complianceLanguage`

Status guidance:

| Situation | Minimum Metadata |
| --- | --- |
| Generated claim with no direct source | `source: "generated"`, `confidence: "low"`, `status: "draft"`, `needsReview` |
| Derived claim from study or knowledge | `source: "derivedFromStudy"` or `"derivedFromKnowledge"`, confidence from evidence, `status: "draft"` or `"reviewed"`, `needsReview` if approval is not explicit |
| User-provided unapproved claim | `source: "userProvided"`, confidence from context, `status: "draft"`, `needsReview` |
| Client-approved claim | `source: "clientApproved"`, `confidence: "approved"`, `status: "clientApproved"` or `"productionReady"` |
| Prototype placeholder claim | `source: "generated"`, `confidence: "low"`, `status: "draft"`, `needsReview`, and handoff note |

Avoid `productionReady` when:

- regulated review is required
- the claim names a measurable outcome without approved evidence
- pricing, availability, eligibility, or compatibility can change
- the copy includes guarantees, superlatives, rankings, safety assurances, or
  response times
- source material is a competitor study, public screenshot, inferred pattern,
  or generated copy

## Claim-Risk Categories

### Medical Claims

Risk: health outcomes, treatment claims, clinical quality, diagnosis,
prevention, safety, device efficacy, patient results, practitioner
recommendations, or regulatory status.

High-risk examples:

- Clinically proven to reduce pain.
- Safe for every patient.
- Recommended by dentists for all procedures.
- FDA-approved treatment.

Safer patterns:

- Source-supported scope: Designed for dental procedure lighting.
- Review-aware draft: Intended to support visibility during dental workflows.
- User action: Ask the clinical team which model fits your procedure needs.

Required handling:

- Add `needsReview: ["medicalClaims", "complianceLanguage", "clientApproval"]`
  unless explicit approved source is supplied.
- Do not imply diagnosis, prevention, treatment, safety, regulatory clearance,
  or universal suitability from general product facts.

### Financial Claims

Risk: savings, revenue, ROI, affordability, financing, investment outcomes,
tax impact, approval odds, fees, or payment guarantees.

High-risk examples:

- Save 40 percent instantly.
- Guaranteed ROI in 30 days.
- No hidden fees.
- Get approved today.

Safer patterns:

- Source-supported scope: Compare plan pricing before you choose.
- Review-aware draft: Estimate potential savings with your account details.
- User action: Request pricing guidance.

Required handling:

- Add `needsReview: ["financialClaims", "pricingAccuracy", "clientApproval"]`
  unless exact approved pricing or finance language is supplied.
- Do not infer affordability or savings from lower price alone.

### Legal Claims

Risk: compliance, liability, contracts, rights, privacy, security obligations,
certifications, guarantees, terms, refunds, cancellations, or eligibility.

High-risk examples:

- Fully compliant with every regulation.
- Your data is always protected.
- Cancel anytime with no conditions.
- Legally guaranteed.

Safer patterns:

- Source-supported scope: Review cancellation terms before booking.
- Review-aware draft: Built with privacy-conscious account controls.
- User action: View policy details.

Required handling:

- Add `needsReview: ["legalClaims", "complianceLanguage", "clientApproval"]`
  when legal, privacy, compliance, refund, cancellation, or eligibility language
  is not explicitly approved.
- Link to policies or mark policy copy as missing instead of summarizing terms
  from memory.

### Technical Claims

Risk: product specs, integrations, architecture, security posture,
availability, data handling, accuracy, reliability, AI behavior, device
capability, or implementation details.

High-risk examples:

- Works with every EHR system.
- 100 percent accurate detection.
- Enterprise-grade security.
- Zero downtime sync.

Safer patterns:

- Source-supported scope: Supports the listed integrations.
- Review-aware draft: Designed for secure team workflows.
- User action: Check compatibility with your stack.

Required handling:

- Add `needsReview: ["technicalAccuracy", "productSpecs", "clientApproval"]`
  when specs, integrations, architecture, security, or accuracy are not directly
  sourced.
- Do not convert technical ambition into shipped capability.

### Pricing Claims

Risk: exact prices, discounts, savings, free trials, fees, financing, taxes,
shipping, subscriptions, renewal terms, bundles, or plan availability.

High-risk examples:

- Always free.
- Best price guaranteed.
- Save $500 today.
- No setup fees.

Safer patterns:

- Source-supported scope: View current pricing.
- Review-aware draft: Compare plan costs and included features.
- User action: Request a quote.

Required handling:

- Add `needsReview: ["pricingAccuracy", "clientApproval"]` unless exact current
  pricing language is supplied and approved.
- Avoid pricing claims in CTA labels unless the CTA target confirms current
  pricing.

### Safety Claims

Risk: physical safety, workplace safety, product safety, security,
child/family/patient safety, emergency use, hazard prevention, or risk
elimination.

High-risk examples:

- Completely safe in all environments.
- Prevents workplace accidents.
- Eliminates risk.
- Child-safe by default.

Safer patterns:

- Source-supported scope: Review safety specifications before use.
- Review-aware draft: Built with safety-focused controls.
- User action: Read safety details.

Required handling:

- Add `needsReview: ["safetyClaims", "complianceLanguage", "clientApproval"]`
  unless approved safety documentation is supplied.
- Do not use absolute safety language unless explicitly approved.

### Performance Claims

Risk: speed, accuracy, quality, productivity, conversion, ranking, uptime,
durability, battery life, clinical performance, sales impact, or benchmark
results.

High-risk examples:

- Doubles productivity.
- Fastest in the market.
- Converts more customers.
- Runs all day on one charge.

Safer patterns:

- Source-supported scope: Compare performance specifications.
- Review-aware draft: Designed for faster setup.
- User action: Review benchmark details.

Required handling:

- Add `needsReview: ["performanceClaims", "productSpecs", "clientApproval"]`
  unless performance evidence and approval are supplied.
- Avoid superlatives and measurable gains without source-backed numbers.

### Compatibility Claims

Risk: fit with devices, systems, roles, conditions, industries, browsers,
platforms, workflows, or eligibility requirements.

High-risk examples:

- Works with every device.
- Fits all users.
- Compatible with any workflow.
- Perfect for every clinic.

Safer patterns:

- Source-supported scope: Compatible with the listed devices.
- Review-aware draft: Check whether this model fits your workflow.
- User action: Check compatibility.

Required handling:

- Add `needsReview: ["compatibilityClaims", "technicalAccuracy",
  "productSpecs"]` unless compatibility is explicitly listed.
- Prefer "check fit" CTAs when compatibility depends on user context.

### Availability Claims

Risk: inventory, appointment availability, shipping, delivery timing, response
times, support coverage, capacity, event seats, or geographic service areas.

High-risk examples:

- Ships today.
- Available everywhere.
- Get a response in minutes.
- Appointments always available.

Safer patterns:

- Source-supported scope: Check current availability.
- Review-aware draft: Request available appointment times.
- User action: Choose a time.

Required handling:

- Add `needsReview: ["availabilityClaims", "clientApproval"]` unless current
  operational data or approved language is supplied.
- Do not make urgency or scarcity claims from layout, tone, or conversion goal.

## Safer Rewrite Patterns

Use these transformations when source support is missing.

| Risky Pattern | Safer Rewrite |
| --- | --- |
| Absolute guarantee | Describe the intended use or invite verification. |
| Superlative claim | Name the comparison criteria or remove the ranking. |
| Measurable outcome | Ask the user to estimate, compare, or review sourced data. |
| Universal compatibility | Say what is listed or invite a compatibility check. |
| Pricing promise | Route to current pricing, quote, or plan comparison. |
| Availability promise | Route to current availability or scheduler. |
| Regulated claim | Keep neutral, add review metadata, and request expert review. |
| Unsupported urgency | Remove urgency or tie it to a sourced deadline. |

Examples:

- Risky: Guaranteed to improve clinical accuracy.
  Safer: Designed to support clearer visibility during clinical workflows.
- Risky: Save 30 percent on every order.
  Safer: Compare current pricing options before you choose.
- Risky: Works with every platform.
  Safer: Check compatibility with your current platform.
- Risky: Book instantly today.
  Safer: Request available appointment times.
- Risky: The safest choice for families.
  Safer: Review safety details before choosing.

## Generator Checks

Before returning generated copy:

- Identify every claim-bearing word or phrase.
- Match each claim to a source, approved input, or review-risk label.
- Downgrade unsupported claims to draft language.
- Add `needsReview` for any regulated, technical, pricing, safety,
  performance, compatibility, or availability claim.
- Avoid `productionReady` unless approval is explicit.
- Prefer neutral capability, comparison, verification, or inquiry language when
  evidence is missing.

## Audit Checks

Flag generated or supplied copy when:

- claims have no visible source or approval state
- generated copy strengthens a source claim
- proof, rating, testimonial, certification, or benchmark data is invented
- CTAs promise savings, availability, response time, eligibility, or outcome
- regulated claims are treated as copy-quality issues only
- `needsReview` is missing for claim-sensitive fields
- `productionReady` is used without approved source truth
- compatibility, pricing, or availability appears current but no current source
  is supplied

## Non-Advice Boundary

This reference only helps content workflows identify risk and preserve review
metadata. It does not provide legal, medical, financial, safety, regulatory, or
compliance advice. High-risk claims must be reviewed by the appropriate human
owner before they are treated as approved or production-ready.
