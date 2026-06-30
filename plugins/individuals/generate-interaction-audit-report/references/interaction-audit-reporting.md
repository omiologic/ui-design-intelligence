# Interaction Audit Reporting

Audit interaction quality for user tasks, controls, forms, overlays,
navigation, and stateful components.

## Decision Heuristics

- Identify the interaction path: trigger, default state, in-progress state,
  success, error, cancellation, and recovery.
- Check whether the next step is visible after each user action.
- Treat missing error recovery, broken focus, and inaccessible dismissal as high
  risk when they block task completion.
- Distinguish content ambiguity from interaction failure; content issues may
  need a page or section audit instead.
- Check whether the interaction is justified. A `dialog`, `drawer`, `popover`,
  or `toast` should earn its interruption, persistence, or disappearance.
- Tie each finding to the structural contract that is missing: trigger, surface,
  state, feedback, dismissal, focus, keyboard, or responsive behavior.

## Evidence Rules

- Observed: visible trigger, modeled state, feedback content, focus note,
  dismissal behavior, or captured interaction behavior.
- Inferred risk: required contract is missing from the wireframe or capture, such
  as no error path after submit or no dismissal for a blocking surface.
- Out of scope: animation timing, framework event names, and code-level behavior
  unless implementation evidence was provided.

## Anti-Pattern

Bad: documenting only the happy path.

Corrected: audit default, hover, focus, active, loading, empty, error, success,
cancel, and escape paths when the component supports them.

Bad: treating all overlays as acceptable because they are common UI patterns.

Corrected: judge whether the surface matches the task. Use `dialog` for blocking
decisions, `drawer` for secondary workflows, `popover` for anchored helper
content, and inline or `banner` feedback when interruption is not justified.

## Worked Example

For a booking form, inspect required fields, submit loading state, validation
messages, focus movement after errors, confirmation state, and retry path. A
missing error announcement is at least medium severity and can become high when
the form is the page's primary conversion path.

For a size guide opened from product details, report a high severity issue if it
is modeled as a blocking `dialog` without close, Escape, focus trap, or return
focus behavior. If the guide is non-blocking helper content, recommend a
`popover` or inline section instead.

## Hand-Off

Hand off interaction contract definition to `interaction-patterns`, keyboard and
assistive technology risks to `generate-accessibility-audit-report`, form and
state anatomy improvements to `component-wireframe-planner`, and page-level
prioritization to `generate-page-audit-report`.
