# Microcopy Guidelines

Use this reference for small UI copy across forms, states, dialogs, product
flows, and prototype surfaces. Microcopy should clarify what is happening, what
the user can do next, and how to recover. It should not hide product behavior,
overpromise outcomes, or make serious moments overly clever.

## Related References

- `.convention/content/tone-of-voice/tone-of-voice-reference.md`: tone choices for
  neutral, friendly, expert, service-oriented, playful, and other expression.
- `.convention/content/copy-quality-checklist.md`: pass/fail checks for clarity,
  accessibility, recovery, claim risk, and node fit.
- `.convention/content/cta-patterns.md`: action labels for primary, secondary,
  destructive, disabled, retry, save, continue, and support actions.
- `.convention/content/claim-risk-guidelines.md`: review handling for regulated,
  pricing, technical, safety, performance, compatibility, and availability
  claims.
- `.convention/content/content-pattern-library.md`: form, empty state, and error
  state structures.
- `.convention/schemas/content-model.schema.json`: node-tied component and form copy.
- `.convention/schemas/prototype-content.schema.json`: prototype screen, dialog,
  form, state, message, and helper copy.

## Core Rules

1. Say what the user needs to know at the point of action.
2. Make recovery clear before adding personality.
3. Use calm, plain language for errors, permissions, payments, health, safety,
   legal, and account-impacting states.
4. Keep labels independent from placeholders.
5. Explain sensitive data requests before or near the field.
6. Do not blame the user.
7. Do not use humor when money, medical, safety, account access, or data loss is
   involved.
8. Preserve source, confidence, status, and review metadata for claims,
   policies, pricing, availability, and regulated language.

## Surface Guidance

### Form Labels

Purpose: identify the information requested.

Rules:

- Use nouns or short questions.
- Keep labels visible; do not rely on placeholders.
- Match the expected input, not an internal field name.
- Mark optional fields explicitly when useful.
- Avoid jargon unless the audience expects it.

Examples:

| Tone | Example |
| --- | --- |
| Neutral | Email address |
| Friendly | What email should we use? |
| Expert | Work email |
| Service-oriented | Best email for follow-up |

Audit checks:

- Does the label name the requested information?
- Would it still make sense after the field is filled?
- Is the label accessible without placeholder text?

### Helper Text

Purpose: explain why information is needed, how to answer, or what happens with
the answer.

Rules:

- Use helper text only when it reduces uncertainty.
- Put requirements before validation errors when possible.
- Explain sensitive, medical, financial, legal, or account-impacting requests.
- Avoid repeating the label.
- Keep it close to the field or control it supports.

Examples:

| Tone | Example |
| --- | --- |
| Neutral | Use the email linked to your account. |
| Friendly | We will send the guide here. |
| Expert | Use your work email for account matching. |
| Service-oriented | This helps us route your request to the right specialist. |

Audit checks:

- Does it explain how, why, or what happens next?
- Does it reduce friction without adding clutter?
- Is sensitive-data rationale explicit?

### Validation Errors

Purpose: explain what went wrong and how to fix it.

Rules:

- State the fix, not just the failure.
- Avoid blame or scolding.
- Keep field-level errors near the field.
- Use summary errors for multi-field or form-level problems.
- Preserve entered data whenever possible and say so when anxiety may be high.

Examples:

| Tone | Example |
| --- | --- |
| Neutral | Enter a valid email address. |
| Friendly | That email does not look right. Please check it and try again. |
| Expert | Email format must include a domain, such as name@example.com. |
| Service-oriented | Please check the email address so we can reach you. |

Audit checks:

- Does the message say how to recover?
- Is the error associated with the affected field?
- Does it avoid jokes, blame, and vague "invalid" language?

### Empty States

Purpose: explain why content is missing and what the user can do.

Rules:

- Say whether the state is new, filtered, unavailable, or blocked.
- Provide a relevant next action when one exists.
- Avoid making the state feel like a dead end.
- Do not use fake encouragement when the user has a real problem.

Examples:

| Tone | Example |
| --- | --- |
| Neutral | No results match the selected filters. |
| Friendly | Nothing matches those filters yet. Try widening your search. |
| Expert | No compatible products found for the selected criteria. |
| Service-oriented | We could not find a match. Contact support for help choosing an option. |

Audit checks:

- Does it explain why nothing appears?
- Is the recovery action specific?
- Does tone match the seriousness of the moment?

### Success States

Purpose: confirm that an action worked and explain what happens next.

Rules:

- Confirm the completed action.
- Include timing, destination, or next step when relevant.
- Avoid over-celebrating routine tasks.
- Do not imply approval, booking, purchase, or delivery before it is confirmed.

Examples:

| Tone | Example |
| --- | --- |
| Neutral | Your changes were saved. |
| Friendly | Saved. You can come back and edit this anytime. |
| Expert | Configuration saved. Review compatibility before ordering. |
| Service-oriented | Request sent. A specialist will review it before follow-up. |

Audit checks:

- Does the message confirm the exact outcome?
- Does it avoid promising next steps that are not guaranteed?
- Is the next action clear?

### Confirmation Dialogs

Purpose: help users confirm consequential actions before proceeding.

Rules:

- Name the action and consequence.
- Use clear confirm and cancel labels.
- Include reversibility, timing, or data-loss information when relevant.
- Do not use vague titles like "Are you sure?" alone.

Examples:

| Tone | Example |
| --- | --- |
| Neutral | Delete saved configuration? This cannot be undone. |
| Friendly | Delete this draft? You will lose the saved changes. |
| Expert | Remove integration? Connected workflows may stop syncing. |
| Service-oriented | Cancel appointment request? We will not hold this time. |

Audit checks:

- Does the dialog describe the consequence?
- Are destructive and safe actions visually and verbally distinct?
- Does it avoid softening irreversible actions?

### Destructive Actions

Purpose: communicate deletion, cancellation, removal, revocation, reset, or
discard actions clearly.

Rules:

- Use direct verbs: delete, cancel, remove, discard, revoke, reset.
- Avoid euphemisms like "clean up" or "start over" for destructive actions.
- Explain what can and cannot be recovered.
- Use neutral tone, even in friendly products.

Examples:

| Tone | Example |
| --- | --- |
| Neutral | Delete account |
| Friendly | Delete this draft |
| Expert | Revoke API key |
| Service-oriented | Cancel appointment request |

Audit checks:

- Does the label name the destructive result?
- Is there a clear safe alternative?
- Is recovery or irreversibility explained?

### Loading States

Purpose: reassure users that work is happening and set expectation when needed.

Rules:

- Use short text for brief waits.
- Add progress or timing only when the system can support it.
- Avoid fake precision.
- Provide cancel, retry, or support paths for long waits.

Examples:

| Tone | Example |
| --- | --- |
| Neutral | Loading results... |
| Friendly | Getting your results... |
| Expert | Checking compatibility... |
| Service-oriented | Sending your request... |

Audit checks:

- Does the message match the actual process?
- Does it avoid unsupported timing claims?
- Is there recovery for long or failed loading?

### Permission Prompts

Purpose: explain why access is needed and what the user can do if they decline.

Rules:

- Ask close to the moment of need.
- Explain the benefit and scope of access.
- Provide a fallback if possible.
- Do not pressure users into granting permission.

Examples:

| Tone | Example |
| --- | --- |
| Neutral | Allow notifications to receive appointment updates. |
| Friendly | Turn on notifications so you do not miss updates. |
| Expert | Enable location to show nearby pickup options. |
| Service-oriented | Allow camera access to upload the required document. |

Audit checks:

- Does it explain why permission is needed?
- Is the scope of access clear?
- Is declining handled gracefully?

## Tone Restraint

Tone should shape expression without changing the action, risk, or recovery
path.

Use more restraint when microcopy involves:

- errors
- payments
- healthcare or wellness
- legal or compliance copy
- account deletion
- sensitive data
- safety
- failed submissions
- permission prompts

Avoid:

- jokes in errors
- cute labels for destructive actions
- emotional pressure in permission prompts
- celebratory copy before confirmation is real
- brand voice that obscures what happened

## Accessibility Rules

- Labels must be available to assistive technology.
- Helper and error copy should be programmatically associated with the relevant
  field or state in implementation handoff notes.
- Do not rely on color, icon-only messages, or position alone.
- Error summaries should link or refer to affected fields when multiple fields
  fail.
- Button and link labels should be meaningful out of context.
- Loading and status copy should be announced when the prototype or runtime
  represents live status.

## ContentModel Fit

Use these guidelines for:

- `nodeRole`: `form`, `field`, `helperText`, `errorText`, `message`, `dialog`,
  `emptyState`, `banner`, `primaryCTA`, `secondaryCTA`
- copy fields such as `label`, `helperText`, `placeholder`, `errorText`,
  `confirmationMessage`, `emptyState`, `body`, `primaryCTA`, and `supportCTA`
- review metadata when microcopy contains claims, policies, pricing,
  availability, or regulated language

## PrototypeContent Fit

Use these guidelines for:

- screen messages
- dialog titles, descriptions, confirm labels, and cancel labels
- form field labels, helper text, placeholders, validation errors, and success
  messages
- empty, loading, error, warning, success, and confirmation states
- retry, save, continue, support, and destructive action copy
- permission and access prompts

Prototype microcopy should match the represented behavior. If behavior is not
modeled, mark the copy as draft or add a handoff note instead of pretending the
runtime behavior exists.

## Audit Checks

Flag microcopy when:

- a label depends on placeholder text
- helper text repeats the label without adding value
- errors do not explain recovery
- errors blame the user or use over-clever language
- empty states do not explain why content is missing
- success states promise outcomes not confirmed by the flow
- confirmation dialogs hide consequences
- destructive actions use vague or softened labels
- loading states imply unsupported timing or progress
- permission prompts do not explain scope or fallback
- tone makes serious moments feel casual or unclear
- accessibility relationships are missing from handoff notes
- copy is not tied to a field, state, dialog, screen, node, or content ref

## Knowledge Pattern Preference

Prefer a retrieved `copyPattern` when it contains domain-specific field labels,
state messages, support language, or regulated wording with source, confidence,
status, and review metadata. Use this reference as the fallback for generic
microcopy structure and audit checks.
