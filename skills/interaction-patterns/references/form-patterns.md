# Form Patterns

Use `form` with `inputGroup` children.

## Decision Heuristics

- Use one `inputGroup` per logical field or tightly related field set.
- Put helper text before error text in the anatomy so the default state is clear
  and the error state can replace or supplement it.
- Use `required` and `optional` states only when the distinction changes user
  behavior.
- Use `banner` for form-level errors and `paragraph` with role `errorText` near
  the affected `inputGroup` for field-level errors.
- Use progressive disclosure only when later inputs depend on earlier answers.

## Include

- Field labels.
- Helper or error text when relevant.
- Required and optional states.
- Submit action.
- Success and error feedback.

For long forms, group related inputs and consider progressive disclosure.

## Anti-Pattern

Bad: placing all validation errors in a toast after submit.

Corrected: use a form-level `banner` summarizing the problem and field-level
`errorText` near each affected `inputGroup` so keyboard and screen-reader users
can recover.

## Worked Example

For a contact form:

`form` -> `heading`, name `inputGroup`, email `inputGroup`, message
`inputGroup`, consent `inputGroup`, submit `button`, optional error `banner`.

Group contact fields before message content because identity and reply path are
required before the message can be acted on.

## Hand-Off

This reference defines form behavior. Use `component-wireframe-planner` for the
form's node anatomy and `accessibility-wireframe-review` for label association,
error association, and focus order.
