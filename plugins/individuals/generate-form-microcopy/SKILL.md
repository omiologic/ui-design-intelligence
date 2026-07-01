---
name: generate-form-microcopy
description: Generate form labels, helper text, placeholders, errors, confirmations, and recovery copy for blueprint or prototype forms.
license: See repository LICENSE
---

# Generate Form Microcopy

Use this skill when a form, dialog, or multi-step flow needs usable labels,
helper text, errors, success messages, and recovery copy.

## Purpose

Generate form microcopy that clarifies requirements, reduces friction, and
supports validation and recovery states.

## Philosophy

Good form microcopy prevents errors and helps recovery. It should be specific
without overexplaining or hiding required information.

## Decision Criteria

1. Use this when form fields or validation states are known.
2. Include helper, error, and confirmation copy.
3. Mark sensitive data, legal, medical, or pricing language for review.

## Boundary

- Owns: labels, helper text, placeholders, errors, confirmations, and recovery
  messages.
- Does not own: validation logic, data model, backend submission, privacy
  policy, or runtime implementation.

## References

- `../../../.convention/content/content-accessibility-guidelines.md`
- `../../../.convention/content/laws-of-copywriting.md`
- `../../../.convention/content/microcopy-guidelines.md`
- `../../../.convention/schemas/prototype-content.schema.json`
- `../../../.convention/schemas/content-model.schema.json`

## Rules

1. Labels must identify the requested information.
2. Helper text should explain why or how to answer.
3. Error text should describe the fix.
4. Confirmation copy should state what happened next.
5. Use the laws-of-copywriting reference for decision friction, objection
   handling, risk reduction, and action readiness in form flows.
6. Use microcopy guidelines for labels, helper text, validation errors, empty
   states, success states, confirmation dialogs, destructive actions, loading
   states, permission prompts, tone restraint, and accessibility.
7. Use content accessibility guidelines for plain language, label clarity,
   error recovery, cognitive load, screen-reader-friendly copy, and ambiguous
   link or button checks.

## Anti-Patterns

- Placeholder-only labels.
- Error messages that blame users.
- Asking for sensitive information without explanation.

## Workflow

1. Read form fields and journey stage.
2. Identify the user's objection or uncertainty at each field or step.
3. Select microcopy guidance for each field, state, dialog, or flow moment.
4. Check accessibility requirements for labels, helper text, errors, and
   recovery paths.
5. Draft labels and helper text.
6. Draft validation, error, success, and recovery messages.
7. Add review flags.

## Inline Example

```json
{
  "fieldId": "procedure-type",
  "label": "What type of procedures do you perform most often?",
  "helperText": "This helps compare broad and focused lighting needs.",
  "errorText": "Choose a procedure type to continue."
}
```

## Hand-Offs

Hand off prototype placement to `generate-prototype-copy` and conversion review
to `audit-conversion-flow`.
