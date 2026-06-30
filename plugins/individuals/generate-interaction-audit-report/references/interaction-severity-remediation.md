# Interaction Severity And Remediation

Use this reference to turn interaction observations into prioritized audit
findings. A good interaction finding explains the user's path, the missing or
broken contract, the task impact, and the smallest fix that restores a clear
next step.

## Decision Heuristics

- Start with the interaction path: trigger, default state, in-progress state,
  success, error, cancellation, dismissal, and recovery.
- Use `critical` when the user cannot complete, cancel, recover, or escape a
  primary task.
- Use `high` when a primary workflow is likely blocked or misleading because the
  trigger, feedback, error path, focus path, or dismissal contract is missing.
- Use `medium` when completion remains possible but the next step, state, or
  recovery path is unclear.
- Use `low` when the interaction works but handoff detail is weak.
- Use `info` for contextual observations that do not require corrective action.
- Do not penalize a page for lacking an interaction that is not justified by the
  task. Prefer fewer, clearer interactions over decorative behavior.

## Contract Checklist

Every reportable interaction should be checked for:

- Trigger: what starts the interaction and whether it is discoverable.
- Surface: inline, `dialog`, `drawer`, `popover`, `banner`, `toast`, or page.
- State: default, open, closed, loading, empty, error, success, disabled,
  selected, expanded, or collapsed as relevant.
- Feedback: what the user sees after action, wait, success, failure, and retry.
- Dismissal: Escape, cancel, close, outside click, timeout, or completion.
- Focus and keyboard: where focus moves, stays, and returns.
- Responsive behavior: whether mobile preserves the same task and recovery path.

## Remediation Patterns

| Issue | Typical Severity | Structural Fix |
| --- | --- | --- |
| Trigger is unclear or unlabeled | medium to high | Rename the trigger and tie it to the target surface |
| Dialog used for non-blocking helper content | medium | Replace with `popover`, `banner`, or inline content |
| Overlay lacks dismissal or return path | high to critical | Add close, Escape, cancel, completion, and return-focus behavior |
| Form submit has no loading, error, or success state | medium to high | Add feedback states and recovery path |
| Primary content is hidden inside accordion or modal | high | Move primary content inline or make disclosure secondary |
| Toast carries required recovery instructions | high | Use inline error, `banner`, or `dialog` depending on urgency |
| Mobile interaction removes required action | high | Preserve the action or document an equivalent mobile path |

## Anti-Pattern

Bad: "The modal interaction is confusing."

Corrected: "`pricing.dialog` opens from Compare plans but has no close path,
Escape behavior, or return-focus note. This is high severity because users can
enter a blocking comparison task without a modeled way to leave or resume plan
selection. Add visible close, Escape dismissal, focus trap, and return focus to
the Compare plans trigger."

## Worked Example

```json
{
  "id": "filters-drawer-missing-apply-feedback",
  "title": "Filter drawer lacks apply feedback and recovery",
  "severity": "medium",
  "category": "interaction",
  "target": "productFilters.drawer",
  "evidence": "The drawer includes filter controls and an Apply button, but no loading, empty, error, or success state is modeled after apply.",
  "impact": "Users cannot tell whether filters are applying, failed, or produced no results, which makes product discovery feel stalled.",
  "recommendation": "Add loading feedback after Apply, an empty-results state, an error state with retry, and return focus to the updated result summary.",
  "handoff": "component-wireframe-planner"
}
```

## Hand-Off

Use `interaction-patterns` when the source needs an interaction contract before
reporting. Use `accessibility-wireframe-review` or
`generate-accessibility-audit-report` for assistive-technology risk. Use
`component-wireframe-planner` when remediation changes component anatomy or
state coverage. Use deterministic validation only when a fixture can prove a
specific missing contract, such as an overlay without dismissal notes.
