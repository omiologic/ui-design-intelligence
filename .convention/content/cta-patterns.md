# CTA Patterns

Use this reference to choose call-to-action labels by user intent, journey
stage, and interaction risk. CTA copy should make the next action clear without
inflating commitment, urgency, or proof.

## Related References

- `.convention/content/laws-of-copywriting.md`: checks whether the action has been
  earned by benefit clarity, proof, objections, and decision readiness.
- `.convention/content/copy-quality-checklist.md`: pass/fail checks for clarity,
  CTA readiness, accessibility, claim risk, and node fit.
- `.convention/content/content-pattern-library.md`: surrounding page, section, form,
  empty-state, and error-state structures.
- `.convention/content/tone-of-voice/tone-of-voice-reference.md`: tone expression
  examples that should preserve the same user intent.
- `.convention/schemas/content-model.schema.json`: node-tied CTA fields.
- `.convention/schemas/prototype-content.schema.json`: prototype-ready CTA labels,
  helper text, disabled copy, error recovery, and state messages.

## CTA Selection Rules

1. Start with user intent, not button placement.
2. Match commitment level to journey stage.
3. Use the object of the action when ambiguity is possible.
4. Use verbs that describe the actual system or business outcome.
5. Keep primary and secondary CTAs distinct.
6. Avoid unsupported urgency, discounts, guarantees, outcomes, or availability.
7. Keep labels short enough for buttons, but not so short that they become vague.
8. Use supporting copy for caveats, eligibility, timing, cost, or review needs.

## Journey Strength

Use lower-commitment CTAs when the user is still learning or comparing. Use
higher-commitment CTAs only after the page, section, or flow has answered the
required proof, objection, pricing, compatibility, and risk questions.

| Journey Stage | CTA Strength | Good Fit | Avoid |
| --- | --- | --- | --- |
| Awareness | Low | Learn, explore, view, see | Buy, book, submit, commit |
| Consideration | Medium | Compare, check, estimate, ask | Finalize, guarantee, claim |
| Evaluation | Medium to high | Request, book, start, configure | Vague "Get Started" without context |
| Action | High | Buy, book, submit, continue, save | New exploratory CTAs that distract |
| Recovery | Low to medium | Retry, edit, contact support | Blame, dead ends, pressure |

## CTA Hierarchy

### Primary CTA

Purpose: names the main action that advances the current decision.

Use when:

- the user has enough context to act
- the action target is known
- the page or state has one dominant next step

Patterns:

- `[Verb] [object]`
- `[Verb] [outcome noun]`
- `[Start/Continue/Save] [specific flow]`

Examples:

- Compare Models
- Request Product Guidance
- Book a Consultation
- Start Your Application
- Continue Checkout
- Save Configuration

Audit checks:

- Does the label name what happens next?
- Is the commitment level earned by the surrounding content?
- Would the same label still be clear out of visual context?
- Does supporting copy cover cost, timing, eligibility, or review caveats when
  needed?

### Secondary CTA

Purpose: supports a lower-commitment alternate path without competing with the
primary action.

Use when:

- users may need proof, comparison, examples, or help before acting
- the secondary action reduces friction or uncertainty
- the page needs a credible non-conversion path

Patterns:

- `Compare [options]`
- `View [details]`
- `Read [guide]`
- `Ask [role]`
- `Check [fit]`

Examples:

- Compare Plans
- View Specifications
- Read the Buying Guide
- Ask a Specialist
- Check Compatibility

Audit checks:

- Does the secondary CTA answer a likely hesitation?
- Is it visually and semantically subordinate to the primary CTA?
- Does it avoid duplicating the primary CTA's job?

### Tertiary CTA

Purpose: provides contextual navigation, support, or disclosure without
interrupting the primary decision.

Use when:

- the action is helpful but not central
- the user may need policy, details, or account support
- the label appears as an inline link or low-emphasis control

Patterns:

- `View [policy/detail]`
- `Edit [item]`
- `Manage [setting]`
- `Contact [support team]`

Examples:

- View Warranty Details
- Edit Shipping Address
- Manage Preferences
- Contact Support

Audit checks:

- Does it stay out of the primary action path?
- Is the destination or consequence clear?
- Would a screen reader user understand the link target?

### Destructive CTA

Purpose: names an irreversible or potentially harmful action clearly.

Use when:

- the action deletes, cancels, discards, revokes, or permanently changes data
- the user must understand the consequence before acting
- confirmation copy is needed

Patterns:

- `Delete [object]`
- `Cancel [service/booking]`
- `Discard [changes]`
- `Remove [item]`

Examples:

- Delete Account
- Cancel Appointment
- Discard Changes
- Remove Saved Card

Audit checks:

- Does the label name the consequence, not soften it?
- Is a safer cancel/back option nearby?
- Does confirmation copy explain what can and cannot be recovered?

### Disabled CTA

Purpose: communicates that an action is unavailable without hiding the expected
next step.

Use when:

- required fields are missing
- eligibility, inventory, permissions, or dependencies block the action
- the disabled state needs helper text

Patterns:

- Button label keeps the eventual action: `Submit Application`, `Save Changes`,
  `Continue Checkout`
- Helper text explains the blocker: `Complete required fields to continue.`

Examples:

- Continue Checkout
- Save Changes
- Submit Application
- Helper: Add a shipping address to continue.
- Helper: Choose at least one item before saving.

Audit checks:

- Does the disabled label preserve the user's goal?
- Is the reason for disablement available in nearby helper text?
- Is there an accessible disabled-state explanation?

## Intent Patterns

### Learn

Use when the user is in awareness or needs context before comparing.

Labels:

- Learn How It Works
- See How It Works
- Read the Guide
- Explore Options
- View Details

Tone variations:

- Direct: Learn How It Works
- Warm: See How It Works
- Expert: Read the Buying Guide
- Bold: Explore the Difference

Avoid:

- Learn More when the destination is specific
- labels that imply purchase readiness too early

### Compare

Use when the user must choose between products, plans, providers, packages, or
approaches.

Labels:

- Compare Plans
- Compare Models
- View Side-by-Side
- Check Fit
- Review Options

Tone variations:

- Direct: Compare Plans
- Warm: Find the Right Fit
- Expert: Review Specifications
- Bold: See the Difference

Avoid:

- Buy Now before proof, pricing, or fit is clear
- vague comparison labels that hide the criteria

### Inquire

Use when the next step is a sales, support, expert, or service conversation.

Labels:

- Request Guidance
- Ask a Specialist
- Request a Quote
- Talk to an Expert
- Send an Inquiry

Tone variations:

- Direct: Request a Quote
- Warm: Ask a Specialist
- Expert: Discuss Requirements
- Bold: Talk to an Expert

Avoid:

- Contact Us when the reason or recipient can be clearer
- promising a response time unless sourced and approved

### Buy

Use when price, availability, return policy, and product fit are clear enough
for purchase.

Labels:

- Add to Cart
- Buy Now
- Purchase License
- Complete Purchase
- Secure Checkout

Tone variations:

- Direct: Add to Cart
- Warm: Add to Bag
- Expert: Purchase License
- Bold: Get Yours

Avoid:

- guarantee, savings, stock, or delivery claims without source support
- forcing "Buy Now" before required options are selected

### Book

Use when the user schedules a meeting, service, appointment, demo, event, or
consultation.

Labels:

- Book a Consultation
- Schedule a Demo
- Reserve a Time
- Request an Appointment
- Choose a Time

Tone variations:

- Direct: Schedule a Demo
- Warm: Choose a Time
- Expert: Book a Consultation
- Bold: Reserve Your Spot

Avoid:

- implying confirmed availability before the scheduler confirms it
- hiding whether the booking is a request or confirmed appointment

### Download

Use when the action retrieves a file, report, guide, template, asset, or export.

Labels:

- Download Guide
- Download Report
- Export CSV
- Get the Template
- Save PDF

Tone variations:

- Direct: Download Report
- Warm: Get the Guide
- Expert: Export CSV
- Bold: Grab the Template

Avoid:

- "Get" when the result is not immediate
- failing to mention format when format matters

### Start

Use when the action begins a workflow, setup, trial, application, assessment, or
builder.

Labels:

- Start Assessment
- Start Setup
- Start Application
- Begin Configuration
- Create Workspace

Tone variations:

- Direct: Start Setup
- Warm: Start When Ready
- Expert: Begin Configuration
- Bold: Start Building

Avoid:

- "Get Started" when the actual first step is known
- starting flows before scope, time, or requirements are clear

### Continue

Use when the user is already in a flow and needs to proceed.

Labels:

- Continue Checkout
- Continue Setup
- Continue Application
- Review and Continue
- Continue to Payment

Tone variations:

- Direct: Continue Checkout
- Warm: Keep Going
- Expert: Continue to Payment
- Bold: Finish Setup

Avoid:

- changing verbs across the same flow without reason
- hiding the next destination in multi-step forms

### Save

Use when the user preserves edits, preferences, drafts, configurations, or
state.

Labels:

- Save Changes
- Save Draft
- Save Configuration
- Save Preferences
- Add to Saved Items

Tone variations:

- Direct: Save Changes
- Warm: Save for Later
- Expert: Save Configuration
- Bold: Keep This Setup

Avoid:

- unclear distinction between save, submit, publish, and share
- promising auto-save if the system does not provide it

### Retry

Use when the user can recover from a failed action, error, timeout, or
unavailable result.

Labels:

- Try Again
- Retry Upload
- Check Again
- Reload Results
- Resend Code

Tone variations:

- Direct: Try Again
- Warm: Try Again
- Expert: Retry Upload
- Bold: Give It Another Try

Avoid:

- blaming the user
- repeating the same failed action when support or edit is safer

### Contact Support

Use when the user needs help, escalation, troubleshooting, eligibility review,
or account assistance.

Labels:

- Contact Support
- Chat with Support
- Get Help
- Report an Issue
- Request Account Help

Tone variations:

- Direct: Contact Support
- Warm: Get Help
- Expert: Request Account Help
- Bold: Talk to Support

Avoid:

- hiding support behind vague "Learn More" links
- promising immediate help unless support coverage is sourced

## Tone Variation Rules

Tone may change expression, but it must not change the underlying intent,
commitment level, or system outcome.

| Intent | Neutral | Warm | Expert | Bold |
| --- | --- | --- | --- | --- |
| Learn | Learn How It Works | See How It Works | Read the Guide | Explore the Difference |
| Compare | Compare Plans | Find the Right Fit | Review Specifications | See the Difference |
| Inquire | Request Guidance | Ask a Specialist | Discuss Requirements | Talk to an Expert |
| Buy | Add to Cart | Add to Bag | Purchase License | Get Yours |
| Book | Schedule a Demo | Choose a Time | Book a Consultation | Reserve Your Spot |
| Download | Download Report | Get the Guide | Export CSV | Grab the Template |
| Start | Start Setup | Start When Ready | Begin Configuration | Start Building |
| Continue | Continue Checkout | Keep Going | Continue to Payment | Finish Setup |
| Save | Save Changes | Save for Later | Save Configuration | Keep This Setup |
| Retry | Try Again | Try Again | Retry Upload | Give It Another Try |
| Support | Contact Support | Get Help | Request Account Help | Talk to Support |

## ContentModel Fit

Use CTA patterns for fields such as:

- `primaryCTA`
- `secondaryCTA`
- `supportCTA`
- `nodeRole`: `primaryCTA`, `secondaryCTA`, `supportCTA`, `destructiveCTA`
- section copy where local CTAs appear

Each CTA entry should preserve source, confidence, status, and review-risk
metadata when the label depends on claims, pricing, availability, response
times, eligibility, or regulated outcomes.

## PrototypeContent Fit

Use CTA patterns for:

- screen-level primary and secondary actions
- dialog confirm, cancel, and destructive actions
- form submit, save, continue, and disabled states
- error retry and support actions
- empty-state recovery actions
- sticky action bars and mobile action regions

Prototype CTAs should match actual prototype behavior. Do not label an action
`Book`, `Buy`, `Submit`, `Download`, or `Save` unless the prototype path or
handoff notes support that outcome.

## Audit Checks

Flag CTA copy when:

- the label is vague even though the target is known
- the label promises an outcome the system or business does not guarantee
- the label asks for more commitment than the journey stage has earned
- multiple primary CTAs compete at one decision point
- primary and secondary CTAs perform the same job
- destructive actions are softened or unclear
- disabled CTAs lack helper text explaining the blocker
- tone variation changes the action, risk, or commitment level
- CTAs rely on unsupported urgency, savings, availability, response-time, or
  performance claims
- repeated CTAs change wording without a user-facing reason
- button text depends on surrounding layout to be understood

## Knowledge Pattern Preference

Prefer a retrieved knowledge `copyPattern` over this generic reference when the
pattern is specific to the audience, domain, page type, journey stage, or
conversion goal and includes usable source, confidence, status, and review-risk
metadata. Use this reference as the fallback when no suitable sourced CTA
pattern exists.
