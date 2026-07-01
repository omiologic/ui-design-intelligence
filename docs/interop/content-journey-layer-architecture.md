# Content And Journey Layer Architecture

Sprint 008 adds a content and journey layer between structural blueprint work
and prototype behavior. The layer exists so prototypes can carry realistic,
node-tied copy without pretending generated copy is production-approved.

## Decision

Use journey artifacts to decide what users need at each stage, then use
blueprint node structure to constrain copy length, role, and placement.

The intended order is:

```txt
UserJourneyMap
  -> WireframeConfig / UIBlueprint
  -> ContentModel
  -> PrototypeContent
  -> PrototypeConfig
  -> copy audit
```

Copy generation should not run before journey and structure exist. A content
model fills declared blueprint nodes; it does not invent a parallel page
hierarchy.

## Ownership

| Artifact | Owns | Does Not Own |
| --- | --- | --- |
| `UserJourneyMap` | Audience goal, journey stages, user questions, needs, objections, content goals, recommended section roles, and conversion logic. | Page layout, component anatomy, visual styling, final copy, or interactions. |
| `WireframeConfig` | Structural hierarchy, node IDs, node types, labels, responsive notes, and accessibility annotations. | Realistic copy, approved marketing language, journey strategy, or prototype behavior. |
| `ContentModel` | Realistic page, section, and component copy tied to blueprint node IDs, with source, confidence, status, and review-risk metadata. | New structural nodes, runtime interactions, final brand/legal/medical approval, or CMS content governance. |
| `PrototypeContent` | Prototype-ready headings, CTAs, form labels, helper text, errors, confirmations, dialog copy, FAQ copy, and footer copy tied to prototype screens or nodes. | Routes, events, state machines, animation timing, or renderer implementation. |
| `PrototypeConfig` | Screens, routes, states, events, overlays, forms, navigation flows, and transitions. | Copy generation, copy approval, content hierarchy strategy, or content knowledge storage. |

## Bundle Boundary

`ux-journey-skills` owns strategy:

- user goals and intent
- journey stages
- decision points
- objections and friction
- conversion paths
- page and prototype flow strategy

`ui-content-skills` owns copy execution:

- content models
- prototype copy
- page, section, and component copy
- CTA labels
- form labels, helper text, errors, and confirmations
- brand-voice application
- source, confidence, status, and review-risk metadata

Journey skills should usually run before content skills. Content skills may ask
for a journey map when audience, goal, stage, or objection logic is missing.

## Reference Rules

- Use `sourceBlueprintId` and `sourceBlueprintRef` to identify the source
  blueprint.
- Use `nodeId` to bind content entries to existing blueprint nodes.
- Do not copy the blueprint `root`, `children`, or layout hierarchy into a
  content model.
- Use `sourcePrototypeConfigId`, `screenId`, and `nodeId` to bind prototype
  content to prototype screens and referenced nodes.
- Use `brandVoiceRef` when content should follow a standalone `BrandVoice`
  artifact.
- Keep `source`, `confidence`, `status`, and `needsReview` explicit for
  generated, inferred, or claim-sensitive copy.

## Tone And Voice Boundaries

The shared tone-of-voice reference is controlled vocabulary, not a project
voice contract. Use `shared/content/tone-of-voice/tone-of-voice-reference.json`
when a skill needs stable tone IDs, tone-fit guidance, copy rules, sample lines,
or safe tone-mixing defaults before a project-specific voice exists.

Use a project-level `BrandVoice` artifact when the work has a specific brand,
audience, vocabulary, restricted terms, CTA verbs, approval state, or client
review boundary. `BrandVoice.tone` may use shared tone IDs such as
`clear-practical`, but the artifact owns the project-specific rules and review
metadata.

Use a knowledge `voiceProfile` record when a reusable voice pattern should be
stored for later retrieval across projects, industries, or page types. A
`voiceProfile` can capture repeated brand/domain voice behavior, preferred and
restricted terms, reusable CTA language, source evidence, confidence, and
candidate/accepted/validated status.

The precedence order for generation and audit is:

```txt
client-approved BrandVoice
  -> retrieved voiceProfile evidence
  -> shared tone-of-voice reference
  -> generic clarity rules
```

If a selected shared tone conflicts with a `BrandVoice` rule, the `BrandVoice`
wins. If a retrieved `voiceProfile` conflicts with client-approved copy or
brand vocabulary, the approved project source wins. The shared tone reference
should guide language shape, but it must not override factual accuracy,
accessibility, claim-risk review, or approval status.

## Copywriting Laws Boundary

`shared/content/laws-of-copywriting.md` is the shared content strategy
checklist for persuasion logic and message readiness. Use it when planning or
auditing:

- decision sequence: what the user must understand or believe before action
- benefit translation: how features become practical and emotional value
- story sequence: how the page moves from problem to solution to next step
- proof: what support the copy needs before asking for trust
- objections: what concerns should be answered before a CTA
- CTA readiness: whether the action matches the user's stage and confidence

The laws-of-copywriting reference is not a schema, not a brand voice, and not a
license to invent claims. It complements `UserJourneyMap` by sharpening the
decision path, complements `ContentModel` and `PrototypeContent` by improving
copy purpose, and complements copy audits by supplying a checklist for clarity,
benefits, proof, objections, and action readiness.

Content review instructions should flag copy when the user benefit is left for
the reader to infer, the story sequence skips required context, proof appears
after commitment, objections remain unanswered, or CTAs ask for more commitment
than the journey stage has earned. These are review findings, not automatic
production approval gates.

Tone-of-voice guidance controls expression. `BrandVoice` controls
project-specific vocabulary, restrictions, and approval state. The copywriting
laws control message logic. When these conflict, approved source truth,
`BrandVoice`, review-risk metadata, and node/prototype constraints take
precedence over persuasive polish.

## Copy Quality Checklist Boundary

`shared/content/copy-quality-checklist.md` is the shared pass/fail checklist
for copy audits. It covers clarity, benefit, proof, CTA readiness, objections,
tone fit, claim risk, scannability, accessibility, and node fit.

Use the checklist after generated copy exists and before a content model,
prototype content artifact, page-copy draft, CTA set, form flow, or copy audit
is handed off. It can block `productionReady` status when quality, metadata,
claim-review, source-truth, or approval requirements are missing.

The checklist distinguishes quality review from approval review. It can say
copy is unclear, unsupported, unearned, inaccessible, or detached from a node.
It cannot approve legal, medical, pricing, product-spec, brand, or client
claims by itself.

## Content Pattern Library Boundary

`shared/content/content-pattern-library.md` provides generic reusable copy
structures for common page, section, component, form, and prototype surfaces:
hero copy, feature sections, proof sections, pricing copy, comparison tables,
FAQs, empty states, forms, and error states.

Use the library when a content skill needs a default anatomy before drafting
copy. Prefer retrieved knowledge `copyPattern` records when they are more
specific to the audience, industry, page type, journey stage, or conversion
goal and have usable evidence, confidence, and status metadata.

The pattern library controls copy structure, not final wording. Tone-of-voice
and `BrandVoice` guide expression; laws-of-copywriting guide persuasion logic;
the copy quality checklist audits the result; review metadata controls approval
and claim-risk status.

## CTA Patterns Boundary

`shared/content/cta-patterns.md` provides intent-specific CTA label guidance
for learn, compare, inquire, buy, book, download, start, continue, save, retry,
and support actions. It also defines primary, secondary, tertiary, destructive,
and disabled CTA guidance with audit checks for vague, misleading,
overpromising, mismatched, or hierarchy-conflicting action language.

Use the CTA reference when content generation or prototype-copy workflows need
action labels for page sections, forms, dialogs, empty states, errors, sticky
action bars, or repeated conversion points. CTA labels should preserve the same
underlying user intent when tone varies, and should match the action outcome
implemented or described by the surrounding artifact.

The CTA reference chooses action language; it does not define conversion
strategy, routing, form submission behavior, analytics, pricing approval, or
legal approval. Prefer retrieved knowledge `copyPattern` records when they
provide more specific and sourced CTA language for the domain, audience,
journey stage, or offer.

## Claim Risk Guidelines Boundary

`shared/content/claim-risk-guidelines.md` defines shared detection and handling
rules for medical, financial, legal, technical, pricing, safety, performance,
compatibility, and availability claims in generated or audited copy.

Use the guidelines when content generation, prototype-copy generation, CTA
generation, or copy-audit workflows encounter claims that depend on source
truth, product facts, pricing, business operations, regulated review, or client
approval. Generated copy should set `needsReview`, stay draft or reviewed, and
avoid `productionReady` status when approval is missing or inferred.

The claim-risk reference is not legal, medical, financial, safety, regulatory,
or compliance advice. It cannot approve claims. It only standardizes when to
flag review risks, preserve uncertainty, and rewrite unsupported claims into
safer source-aware draft language.

## Proof And Credibility Patterns Boundary

`shared/content/proof-and-credibility-patterns.md` defines reusable proof
structures for testimonials, stats, certifications, case studies, expert proof,
guarantees, trust badges, comparison proof, and process proof.

Use the proof reference when content generation, prototype-copy generation, or
copy-audit workflows need credibility sections, trust signals, proof near CTAs,
comparison support, pricing support, or placeholder-safe prototype proof. Each
proof pattern lists required evidence so workflows can use real proof, preserve
missing-proof placeholders, or flag unsupported credibility claims instead of
inventing evidence.

The proof reference does not approve proof, create customer quotes, invent
metrics, certify products, or validate policy guarantees. Claim-risk metadata
and human review still control whether proof-bearing copy can move beyond draft
or reviewed status.

## Page Message Architecture Boundary

`shared/content/page-message-architecture.md` defines generic message sequences
by page type and user intent for landing pages, product pages, service pages,
pricing pages, onboarding, checkout, support flows, healthcare pages, and B2B
SaaS pages.

Use this reference when journey and content workflows need to map journey stage,
user question, content goal, and section role before writing copy. It helps
content models stay node-tied by mapping recommended roles to existing or
planned blueprint nodes instead of creating free-floating page copy.

The page message architecture reference guides section order and content roles;
it does not own layout, create blueprint nodes, override observed source order,
or approve copy. When the blueprint order differs from the recommended message
sequence, content workflows should preserve node-tied output and create a
journey or copy audit finding when the order blocks understanding, proof,
objection handling, or CTA readiness.

## Microcopy Guidelines Boundary

`shared/content/microcopy-guidelines.md` defines shared rules for small UI copy:
form labels, helper text, validation errors, empty states, success states,
confirmation dialogs, destructive actions, loading states, permission prompts,
recovery paths, accessibility, and tone restraint.

Use this reference when content, component, form, and prototype-copy workflows
need field-level or state-level language. It helps generated microcopy stay
clear, actionable, accessible, and tied to fields, dialogs, screens, states,
nodes, or content refs instead of becoming free-floating UX prose.

The microcopy reference does not define validation logic, runtime state
machines, permissions implementation, backend submission, privacy policy, or
final product behavior. Prototype microcopy should match represented behavior
or carry a draft handoff note when behavior is not modeled.

## Content Accessibility Guidelines Boundary

`shared/content/content-accessibility-guidelines.md` defines copy-focused
accessibility guidance for plain language, reading level, inclusive language,
label clarity, error recovery, cognitive load, and screen-reader-friendly copy.

Use this reference when content, form, component, prototype, brand-voice, and
copy-audit workflows need to flag ambiguous links, vague buttons, jargon,
idioms, overly long helper text, inaccessible errors, or support copy that
leaves blocked users without a next step. It can be applied from content
artifacts alone, without requiring a visual mockup.

The content accessibility reference complements visual and interaction
accessibility reviews. It does not validate color contrast, focus order,
keyboard behavior, semantic roles, live-region behavior, or production assistive
technology support. Those concerns remain with accessibility, prototype, and
design-system reviews.

## Audience Intent Reference Boundary

`shared/content/audience-intent-reference.md` maps audience awareness,
readiness, and emotional state to user questions, content needs, proof needs,
CTA posture, and tone considerations. It covers unaware, problem-aware,
solution-aware, comparison-ready, purchase-ready, anxious, skeptical, and
returning-user states.

Use this reference before journey maps, content journey maps, content models,
page copy, and copy audits when copy pressure depends on what the user is ready
to understand, trust, compare, or do. It helps workflows avoid purchase-ready
CTAs, high-pressure proof, or overly casual microcopy for audiences that are
still unaware, anxious, skeptical, or comparing.

The audience intent reference does not replace source evidence, analytics,
research, segmentation, or user testing. When intent is inferred, workflows
should preserve confidence and notes instead of treating the inferred state as
approved fact.

## Objection Handling Reference Boundary

`shared/content/objection-handling-reference.md` defines common objection
categories and safe response patterns for price, trust, complexity, effort,
risk, compatibility, time, switching cost, privacy, safety, and proof gaps.

Use this reference when journey, conversion, content, and copy-audit workflows
need to map likely concerns to page sections, FAQ entries, comparison copy,
form support, CTA support, proof needs, or recovery language. The reference
favors proof, process, policy, comparison, support, recovery, and lower-
commitment actions over unsupported reassurance or pressure.

The shared reference is generic. Project-specific `objectionPattern` knowledge
records remain the preferred source when they include domain, audience, page
type, journey stage, source, confidence, status, and review metadata. The
shared reference should not invent proof, terms, guarantees, compatibility,
safety, pricing, or availability claims.

## Review Metadata

Content can become client-facing by accident. Generated copy should preserve:

- source: `userProvided`, `generated`, `derivedFromStudy`,
  `derivedFromKnowledge`, or `clientApproved`
- confidence: `low`, `medium`, `high`, or `approved`
- status: `draft`, `reviewed`, `clientApproved`, `productionReady`, or
  `deprecated`
- review risks such as medical claims, pricing accuracy, product specs,
  compliance language, or client approval

Healthcare, medical product, financial, legal, and other claim-sensitive
domains should mark review risks instead of smoothing over uncertainty.

## Non-Goals

- Do not build a CMS.
- Do not create a content calendar or SEO content operation.
- Do not treat prototype copy as production-approved copy.
- Do not add visual mockup generation.
- Do not require network access or external content APIs.
- Do not move runtime/editor responsibilities into content artifacts.

## Schema Set

- `shared/schemas/user-journey-map.schema.json`
- `shared/schemas/content-model.schema.json`
- `shared/schemas/prototype-content.schema.json`
- `shared/schemas/brand-voice.schema.json`
- `shared/schemas/tone-of-voice-reference.schema.json`
