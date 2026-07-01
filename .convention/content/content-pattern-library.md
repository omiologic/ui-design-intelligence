# Content Pattern Library

Use this library to choose reusable copy structures for common UI and marketing
sections before writing final draft copy. Patterns are generic defaults for
`ContentModel` and `PrototypeContent` work; project-specific retrieved
`copyPattern` knowledge should win when it is more relevant, sourced, and
confidence-scored.

## Related References

- `.convention/content/laws-of-copywriting.md`: decision sequence, benefit clarity,
  story, proof, objections, and action readiness.
- `.convention/content/copy-quality-checklist.md`: pass/fail audit prompts.
- `.convention/content/tone-of-voice/tone-of-voice-reference.md`: tone selection and
  phrasing style.
- `knowledge/schemas/copy-pattern.schema.json`: project or domain-specific
  reusable copy patterns.
- `.convention/schemas/content-model.schema.json`: page, section, and component copy
  tied to blueprint nodes.
- `.convention/schemas/prototype-content.schema.json`: screen, dialog, form, state,
  and message copy tied to prototypes.

## Pattern Selection Rules

1. Pick the pattern that matches the user's current decision job, not just the
   visual section type.
2. Prefer a sourced `copyPattern` record from knowledge when it is specific to
   the industry, audience, page type, or journey stage.
3. Use this library when no stronger project-specific pattern exists.
4. Keep generated copy tied to node IDs, content refs, screen IDs, form IDs, or
   message IDs.
5. Preserve source, confidence, status, and review-risk metadata for generated
   or claim-sensitive copy.

## Hero Pattern

Purpose: establish relevance, value, and next action.

Required inputs:

- audience and primary intent
- page goal
- core offer or product
- primary next action
- review-sensitive claim boundaries

Recommended copy roles:

- eyebrow or category cue
- headline
- subheadline or body
- primaryCTA
- secondaryCTA
- proof hint or trust note when available

ContentModel fit:

- `nodeRole`: `hero`, `headline`, `primaryCTA`, `secondaryCTA`, `trustSignal`
- `journeyStage`: awareness, inspection, or problem recognition

PrototypeContent fit:

- screen intro copy
- route-level page title
- primary and secondary action labels
- hero support message

Common mistakes:

- writing a slogan with no concrete value
- asking for high commitment before proof or comparison
- adding unsupported "best", "guaranteed", or performance claims

Audit checks:

- Does the headline say who this is for or what problem it solves?
- Does the CTA match readiness?
- Are claims either sourced or marked for review?

## Feature Section Pattern

Purpose: translate capabilities into user-relevant value.

Required inputs:

- feature list
- user task or pain
- practical benefit for each feature
- component anatomy, such as card grid, tabs, or table

Recommended copy roles:

- section headline
- section body
- feature title
- feature body
- optional supportCTA

ContentModel fit:

- `nodeRole`: `featureSection`, `cardGrid`, `tabPanel`
- `copy`: `headline`, `body`, `items`, `supportCTA`

PrototypeContent fit:

- tab panel body
- card title and body
- accordion summary

Common mistakes:

- listing features without benefits
- repeating the same benefit in every card
- exceeding compact card or tab copy limits

Audit checks:

- Does each feature answer "why does this matter?"
- Does the component copy fit the available surface?
- Are technical or product claims marked for review?

## Proof Section Pattern

Purpose: give users a reason to trust the claim or action.

Required inputs:

- approved evidence or explicit lack of evidence
- source references
- risk level
- claim type

Recommended copy roles:

- proof headline
- proof body
- statistic, quote, credential, source note, or customer outcome when approved
- disclaimer or review note when needed

ContentModel fit:

- `nodeRole`: `proofSection`, `trustSignal`, `testimonial`, `credential`
- `copy`: `headline`, `body`, `proofPoint`, `disclaimer`

PrototypeContent fit:

- trust banner
- confirmation support copy
- evidence note in dialog or drawer

Common mistakes:

- fabricating reviews, ratings, client logos, or statistics
- using "proven" or "trusted" without evidence
- hiding proof after the CTA that needs it

Audit checks:

- Is every proof claim sourced or flagged?
- Does proof appear before the commitment it supports?
- Is regulated proof marked for legal, medical, financial, or client review?

## Pricing Copy Pattern

Purpose: explain cost, plan differences, and value without obscuring terms.

Required inputs:

- pricing source or placeholder status
- plan names and differences
- billing period
- exclusions, limits, or review requirements

Recommended copy roles:

- pricing headline
- plan title
- plan description
- included features
- price note
- primaryCTA
- disclaimer

ContentModel fit:

- `nodeRole`: `pricingSection`, `pricingCard`, `comparisonTable`
- `copy`: `headline`, `body`, `priceNote`, `disclaimer`, `primaryCTA`

PrototypeContent fit:

- pricing card labels
- selected plan confirmation
- unavailable or error message

Common mistakes:

- inventing prices or discounts
- hiding material limits
- using urgency before price clarity

Audit checks:

- Is pricing sourced or marked `pricingAccuracy`?
- Are terms clear enough for the user to compare?
- Does CTA wording avoid unsupported savings claims?

## Comparison Table Pattern

Purpose: help users choose between options.

Required inputs:

- options being compared
- comparison criteria
- decision stage
- source for specs or attributes

Recommended copy roles:

- comparison headline
- guidance body
- column labels
- row labels
- best-fit note
- follow-up CTA

ContentModel fit:

- `nodeRole`: `comparison`, `comparisonTable`
- `copy`: `headline`, `body`, `criteria`, `primaryCTA`

PrototypeContent fit:

- table heading
- empty comparison state
- selected option confirmation

Common mistakes:

- comparing too many attributes at once
- implying a "best" choice without context
- using unsourced product specs

Audit checks:

- Can the user tell which criteria matter?
- Are comparison claims sourced or flagged `productSpecs`?
- Does the CTA follow the user's likely decision?

## FAQ Pattern

Purpose: answer objections and reduce uncertainty.

Required inputs:

- top objections or support questions
- approved answers or source gaps
- audience and journey stage

Recommended copy roles:

- FAQ headline
- question
- answer
- supportCTA
- disclaimer when needed

ContentModel fit:

- `nodeRole`: `faq`, `accordion`, `supportSection`
- `copy`: `faqQuestion`, `faqAnswer`, `supportCTA`

PrototypeContent fit:

- accordion labels and panels
- dialog support copy
- help drawer copy

Common mistakes:

- using FAQ as a dumping ground for unrelated details
- answering legal, medical, pricing, or policy questions without review
- writing questions users would not actually ask

Audit checks:

- Does each answer remove a real objection?
- Are sensitive answers review flagged?
- Is the next support path clear?

## Empty State Pattern

Purpose: explain what is missing and what the user can do next.

Required inputs:

- empty condition
- user goal
- available recovery or next action

Recommended copy roles:

- emptyState headline
- emptyState body
- primaryCTA or secondaryCTA

ContentModel fit:

- `nodeRole`: `emptyState`, `message`, `card`
- `copy`: `emptyState`, `body`, `primaryCTA`

PrototypeContent fit:

- `messages.kind`: `empty`
- screen or component empty content

Common mistakes:

- making the user feel at fault
- omitting a recovery path
- using playful copy in serious flows

Audit checks:

- Does the empty state explain why nothing appears?
- Does it offer a useful next step?
- Is tone appropriate for the risk level?

## Form Pattern

Purpose: help users provide information with low friction and clear recovery.

Required inputs:

- fields and required state
- validation rules
- reason for asking
- privacy, legal, medical, pricing, or sensitive data constraints

Recommended copy roles:

- form title
- form description
- formLabel
- formHelperText
- placeholder only when supplementary
- errorText
- confirmationMessage
- recovery copy

ContentModel fit:

- `nodeRole`: `form`, `field`, `helperText`, `errorText`
- `copy`: `label`, `helperText`, `errorText`, `confirmationMessage`

PrototypeContent fit:

- `forms.fields.label`
- `forms.fields.helperText`
- `forms.fields.errorText`
- `messages.kind`: `error`, `success`, or `confirmation`

Common mistakes:

- using placeholders instead of labels
- blaming the user in errors
- asking for sensitive data without context

Audit checks:

- Does every required field have a clear label?
- Does helper text explain how or why to answer?
- Do errors explain the fix?
- Are sensitive fields review flagged?

## Error State Pattern

Purpose: explain the problem and help the user recover.

Required inputs:

- error condition
- user action that caused or revealed it
- recovery options
- whether data was saved, changed, or lost

Recommended copy roles:

- error headline or message
- recovery body
- retryCTA or supportCTA
- field-level errorText when applicable

ContentModel fit:

- `nodeRole`: `errorText`, `message`, `banner`
- `copy`: `errorText`, `body`, `primaryCTA`

PrototypeContent fit:

- `messages.kind`: `error`
- form field error text
- dialog or toast recovery copy

Common mistakes:

- saying only "Something went wrong"
- blaming the user
- hiding whether progress was saved

Audit checks:

- Does the error state say what happened in plain language?
- Does it explain the next recoverable action?
- Does it avoid unsupported cause claims?

## Knowledge Pattern Preference

Prefer a project-specific `copyPattern` knowledge record over this generic
library when:

- it has evidence refs tied to the same industry, page type, audience, or
  conversion goal
- it has higher confidence than the generic default
- it captures domain-specific objections, proof types, vocabulary, or review
  risks
- it has accepted or validated status

Still apply the copy quality checklist after using a knowledge pattern. Pattern
fit does not imply legal, medical, brand, pricing, product-spec, or client
approval.
