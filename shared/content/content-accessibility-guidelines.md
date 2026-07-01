# Content Accessibility Guidelines

Use this reference to review and generate copy that is understandable,
actionable, inclusive, and usable without relying on visual context. Content
accessibility complements visual and interaction accessibility; it does not
replace keyboard, focus, contrast, semantics, or assistive technology testing.

## Related References

- `shared/content/copy-quality-checklist.md`: pass/fail checks for clarity,
  accessibility, scannability, node fit, and recovery.
- `shared/content/microcopy-guidelines.md`: labels, helper text, errors, empty
  states, confirmations, destructive actions, loading, and permission prompts.
- `shared/content/cta-patterns.md`: button and link label clarity.
- `shared/content/audience-intent-reference.md`: readiness, emotional state, and
  tone pressure.
- `shared/content/claim-risk-guidelines.md`: review boundaries for sensitive
  claims.
- `shared/schemas/content-model.schema.json`: node-tied content roles.
- `shared/schemas/prototype-content.schema.json`: prototype screen, form,
  dialog, message, and state copy.

## Core Rules

1. Use plain language before brand expression.
2. Make labels, links, buttons, errors, and status messages understandable out
   of visual context.
3. Say what happened, why it matters, and what the user can do next.
4. Avoid idioms, jokes, metaphors, and cultural references in critical flows.
5. Keep helper text short and close to the related field, action, or state.
6. Do not use color, icon, position, animation, or sound as the only carrier of
   meaning.
7. Preserve review metadata for medical, legal, financial, safety, pricing, or
   account-impacting copy.

## Plain Language

Use:

- common words
- active voice
- short sentences
- specific nouns and verbs
- one instruction per sentence when possible
- concrete outcomes instead of abstract promises

Avoid:

- internal product terms
- legal, medical, or technical jargon without explanation
- vague phrases such as "complete this action" when the action is known
- dense multi-clause helper text
- idioms such as "hang tight", "kick things off", or "you are all set" in
  serious flows

Audit checks:

- Can the user understand the instruction on first read?
- Does the copy use the user's terms instead of internal terms?
- Is every sentence doing work?

## Reading Level

Generated UI copy should be concise enough for repeated scanning. For general
audiences, prefer short, direct copy. For expert audiences, use domain terms
only when they reduce ambiguity.

Rules:

- Keep labels short.
- Keep helper text to one or two short sentences.
- Use bullets for multiple requirements.
- Break complex instructions into steps.
- Put exceptions or policy details behind a clear link when the full text is
  required.

Audit checks:

- Is the copy too long for the surface?
- Does one message contain multiple unrelated instructions?
- Could a user with limited time or stress still act correctly?

## Inclusive Language

Use copy that does not assume identity, ability, income, technical skill,
family structure, location, device, or prior knowledge unless the product scope
requires it.

Rules:

- Use person-first or domain-appropriate language.
- Avoid shame, blame, and ability assumptions.
- Use "you" carefully in errors so it does not sound accusatory.
- Offer support paths when users may be blocked by access, eligibility, or
  documentation.
- Avoid gendered or culturally specific examples unless sourced and relevant.

Audit checks:

- Does the copy blame the user?
- Does it assume everyone can complete the same task the same way?
- Does it provide a path for blocked users?

## Label Clarity

Labels must identify the item, field, action, or destination without relying on
placeholder text or adjacent visual layout.

Rules:

- Use visible labels for form fields.
- Use specific button labels such as "Save Changes" instead of "OK".
- Use specific link labels such as "View pricing details" instead of "Learn
  more" when the destination is known.
- Distinguish primary, secondary, destructive, retry, and support actions.
- Keep repeated actions consistent unless the action changes.

Audit checks:

- Would the label make sense in a screen reader link or button list?
- Does the label describe the destination or outcome?
- Is placeholder text doing label work?

## Error Recovery

Accessible error copy explains the problem and the fix without blame.

Rules:

- Put field-level errors near the field.
- Use error summaries for multi-field problems.
- Name the field or step that needs attention.
- Explain recovery in plain language.
- Preserve entered data when possible and reassure users when nothing was lost.
- Avoid "invalid", "failed", or "error" alone.

Examples:

- Enter an email address in this format: name@example.com.
- Choose a procedure type to continue.
- We could not send the request. Nothing was lost; try again or contact
  support.

Audit checks:

- Does the error say what to fix?
- Can a screen-reader user identify the affected field?
- Does serious recovery copy avoid jokes and casual tone?

## Cognitive Load

Reduce cognitive load by sequencing information and avoiding unnecessary
choices.

Rules:

- Show requirements before users fail validation.
- Put the most important instruction first.
- Use consistent terms for the same object or action.
- Avoid repeating the same CTA with different labels.
- Use progressive disclosure for complex rules.
- Split long form instructions by step or field.

Audit checks:

- Does the user need to remember information from another section?
- Are terms consistent across labels, helper text, errors, and CTAs?
- Is optional information visually and verbally subordinate?

## Screen-Reader-Friendly Copy

Copy should remain understandable when read without visual layout.

Rules:

- Button and link text should be unique enough to identify the action.
- Do not rely on "above", "below", "left", "right", color, or icon-only
  references.
- Status messages should name the state: loading, saved, sent, failed, empty,
  unavailable, or complete.
- Dialog titles should name the decision or consequence.
- Empty states should explain why content is missing.
- Dynamic state copy should be suitable for live-region announcement when
  implemented.

Audit checks:

- Would the copy make sense if read in isolation?
- Does it avoid spatial-only directions?
- Does status copy describe the state and next action?

## Content Role Mapping

### Forms

- Labels: name the requested input.
- Helper text: explain requirements, rationale, or format.
- Errors: state the fix.
- Confirmation: state what happened next.
- Accessibility focus: visible labels, associated help/error text, no
  placeholder-only labels.

### Navigation

- Labels: name destinations, not internal route names.
- Current location: use clear page or section names.
- Empty or unavailable nav: explain why and what to do.
- Accessibility focus: avoid duplicate ambiguous labels such as repeated
  "Learn more".

### CTAs

- Labels: name the action and outcome.
- Disabled states: keep the intended action label and explain the blocker.
- Destructive actions: name the consequence.
- Accessibility focus: action labels must make sense out of context.

### Dialogs

- Title: name the decision or state.
- Body: explain consequence, requirement, or next step.
- Buttons: use specific confirm and cancel labels.
- Accessibility focus: no vague "Are you sure?" without consequence.

### Empty States

- Explain why nothing appears.
- Offer a specific recovery action when available.
- Avoid decorative or overly playful language when the absence is a problem.
- Accessibility focus: do not rely on illustration alone.

### Support Content

- State what help is available.
- Explain what information the user needs to provide.
- Set response expectations only when sourced.
- Provide fallback routes for blocked users.
- Accessibility focus: avoid pressure, blame, or vague escalation language.

## Visual And Interaction Accessibility Boundary

Content accessibility covers wording, structure, clarity, and recovery paths.
It complements:

- visual accessibility: contrast, typography, spacing, target size, and visual
  affordance
- interaction accessibility: keyboard flow, focus order, focus trapping,
  announcements, validation timing, and pointer alternatives
- semantic accessibility: roles, names, relationships, headings, and live
  regions

Content workflows can flag likely issues without a mockup, but they should hand
implementation and visual behavior concerns to accessibility, prototype, or
design-system reviews.

## Audit Checks

Flag copy when:

- links or buttons use ambiguous labels such as "Click here", "More", "OK", or
  repeated "Learn more"
- form fields rely on placeholder-only labels
- helper text is long, dense, or unrelated to the field
- errors do not explain recovery
- errors blame the user or use over-clever language
- status messages do not say what changed
- copy uses spatial, color-only, icon-only, animation-only, or sound-only cues
- jargon, idioms, or metaphors obscure important action
- destructive actions are softened or unclear
- support copy leaves blocked users without a next step
- serious health, money, legal, safety, account, or privacy copy uses casual
  tone
- accessibility concerns are treated as visual-only when copy creates the
  barrier

## Knowledge Pattern Preference

Prefer retrieved `copyPattern`, `voiceProfile`, or project-specific approved
copy when it provides accessible wording with source, confidence, status, and
review metadata. Use this reference as the generic fallback for copy-focused
accessibility checks.
