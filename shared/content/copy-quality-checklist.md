# Copy Quality Checklist

Use this checklist to review generated page, section, component, CTA, form, and
prototype copy before client, prototype, or implementation handoff.

This checklist is a quality gate for draft copy. It is not legal approval,
medical review, pricing approval, brand approval, or production signoff.

## Related References

- `shared/content/laws-of-copywriting.md`: decision logic, benefit clarity,
  story sequence, proof, objections, and action readiness.
- `shared/content/tone-of-voice/tone-of-voice-reference.md`: shared tone
  vocabulary, tone fit, sample lines, and tone mixing.
- `shared/schemas/brand-voice.schema.json`: project-specific voice rules,
  vocabulary, restrictions, and approval state.
- `shared/schemas/content-model.schema.json`: node-tied page and section copy.
- `shared/schemas/prototype-content.schema.json`: prototype screen, dialog,
  form, message, and state copy.

## Review Outcomes

- `pass`: copy is clear, node-fit, source-aware, and ready for the next planned
  handoff.
- `revise`: copy has quality issues that should be fixed before handoff.
- `blocked`: copy depends on missing source truth, legal/medical/pricing review,
  brand approval, or structural/prototype context.

Do not mark copy `productionReady` unless the relevant project owner has
approved brand, legal, pricing, medical, product-spec, and claim-sensitive
content where applicable.

## Checklist

### 1. Clarity

- Pass: the copy states one clear idea per field or UI surface.
- Pass: the user can understand the next step without reading surrounding
  implementation notes.
- Fail: headings, CTAs, helper text, or errors use vague language such as
  "learn more", "submit", or "something went wrong" when a clearer action or
  recovery exists.
- Fail: the copy sounds polished but does not answer the user question for the
  current journey stage.

### 2. Benefit

- Pass: product, service, or feature copy explains why the detail matters to the
  user.
- Pass: benefits are practical before they become emotional or aspirational.
- Fail: the user must translate a feature into value on their own.
- Fail: the copy promises an outcome without explaining the mechanism or source.

### 3. Proof

- Pass: claims are supported by source material, product facts, approved
  evidence, or explicit review flags.
- Pass: proof appears before copy asks for high-commitment action.
- Fail: ratings, testimonials, clinical claims, financial outcomes, time
  savings, pricing, availability, or performance claims are invented or
  unreviewed.
- Fail: vague proof language such as "trusted by everyone" or "proven results"
  appears without source evidence.

### 4. CTA Readiness

- Pass: CTA strength matches the user's readiness and the current journey stage.
- Pass: primary and secondary CTAs have distinct jobs.
- Fail: the copy asks users to buy, book, submit, or commit before explaining
  value, proof, cost, risk, or recovery.
- Fail: multiple CTAs compete for the same decision point.

### 5. Objections

- Pass: the copy answers likely concerns before the next action.
- Pass: comparison, FAQ, support, and helper copy reduce real friction.
- Fail: pricing, fit, compatibility, timing, risk, support, privacy, or product
  suitability concerns are ignored when they affect action readiness.
- Fail: objections are dismissed with generic reassurance instead of useful
  information.

### 6. Tone Fit

- Pass: tone supports the user's task, risk level, and emotional state.
- Pass: shared tone IDs, `BrandVoice`, and retrieved voice profiles are applied
  consistently where available.
- Fail: tone makes serious, regulated, error, or recovery copy feel casual,
  vague, pushy, or dismissive.
- Fail: brand expression reduces clarity or hides required information.

### 7. Claim Risk

- Pass: generated or inferred claim-sensitive copy includes source,
  confidence, status, and `needsReview` metadata.
- Pass: medical, legal, financial, pricing, product-spec, availability, and
  compliance-sensitive copy is explicitly marked for review.
- Fail: draft copy implies approval, guarantee, certification, savings,
  performance, or availability without evidence.
- Fail: review-sensitive copy is marked as `productionReady` without approval.

### 8. Scannability

- Pass: headings, bullets, labels, and short paragraphs fit the UI surface.
- Pass: compact components use compact copy.
- Fail: cards, dialogs, tabs, table cells, sticky bars, or form helper text carry
  long paragraph copy.
- Fail: repeated sections use the same message without adding new decision
  value.

### 9. Accessibility

- Pass: link and button text describes the action or destination.
- Pass: error and recovery copy explains the fix without blame.
- Pass: helper text and confirmation messages are plain-language and specific.
- Fail: copy relies on visual position, color, icon-only meaning, idioms, or
  sensory language to explain the task.
- Fail: instructions are only in placeholders or disappear after input.

### 10. Node Fit

- Pass: copy fields map to existing blueprint node IDs, prototype screen IDs, or
  content refs.
- Pass: copy length and role fit the node type, component anatomy, and prototype
  state.
- Fail: the copy invents sections, states, claims, or interactions not present
  in the source blueprint or prototype config.
- Fail: prototype copy is free-floating and cannot be traced to a screen, node,
  form, dialog, or message target.

## Production-Ready Blockers

Keep copy below `productionReady` when any of these are true:

- product specifications, pricing, stock, availability, legal, medical,
  financial, or compliance claims are unverified
- brand voice, restricted terms, or approval status are unresolved
- required source, confidence, status, or review-risk metadata is missing
- the copy fails clarity, benefit, proof, objection, CTA, accessibility, or node
  fit checks
- the copy cannot be traced to an approved source artifact or reviewer

## Audit Finding Shape

When an audit fails a checklist item, cite the exact location and repair path:

```json
{
  "finding": "cta-not-earned",
  "nodeId": "hero-primary-cta",
  "check": "CTA Readiness",
  "severity": "medium",
  "recommendation": "Use a lower-commitment CTA until proof and comparison copy appear."
}
```
