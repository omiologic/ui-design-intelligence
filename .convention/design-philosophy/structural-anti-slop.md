# Structural Anti-Slop

These are schema-valid patterns that still produce weak blueprints. Validators
may eventually detect some of them, but skills should treat all of them as
design failures unless there is an explicit reason.

## Anti-Patterns

### Three Equal Cards For Unequal Ideas

Why: equal cards imply equal importance. If one item drives the decision, it
needs stronger hierarchy or a different section pattern.

### CTA Pile-Up

Why: multiple primary actions in the same decision moment make the user's next
step ambiguous.

### Modal For Non-Blocking Content

Why: blocking the page for optional information creates interruption without a
task reason.

### Uniform-Density Page

Why: pages need rhythm. Dense comparison, low-density persuasion, and task
controls should not all use the same structural weight.

### Decorative Section With No Job

Why: if a section does not orient, prove, compare, collect, navigate, or help
the user act, it is visual decoration, not blueprint structure.

### Proof Detached From Claim

Why: evidence loses force when it is far from the claim it supports.

### Tabs Hiding Required Comparison

Why: tabs are for alternate panels, not information the user must compare at the
same time.

### Overlay Without Contract

Why: an overlay missing trigger, dismissal, focus, or responsive behavior is not
an interaction model.

### Form Without Recovery

Why: forms need error, loading, success, and correction paths because submission
is a stateful workflow, not a static component.

### Navigation Stack

Why: multiple unprioritized navigation systems create wayfinding conflict and
make responsive behavior harder to preserve.

## Deterministic Validation

Sprint 002 includes `scripts/validate-blueprint-antipatterns.mjs`. It checks
shared page-level blueprint examples by default and can validate explicit files
when paths are passed on the command line.

Currently machine-checked:

- Missing page-level `header`, `main`, or `footer` regions on page blueprints.
- Missing `responsive.desktop`, `responsive.tablet`, or `responsive.mobile`
  notes on page blueprints.
- Filler labels such as `Placeholder`, `TODO`, `Heading`, `Button`, or `Text`.
- CTA pile-up when sibling nodes under the same parent both use `role:
  primaryCTA`.
- Dialog, drawer, and popover overlays missing state, accessible label, focus
  management, or keyboard behavior.
- Forms missing both error and success recovery states.
- Decorative `section` nodes that contain only imagery, dividers, spacers, or
  annotations and have no content, action, comparison, collection, form, or
  explicit role signal.
- Dialog overlays that have no form, button, button group, primary action, or
  secondary action. A blocking overlay needs a task, confirmation, dismissal, or
  submission contract.
- Header navigation stacks where sibling `navigation` nodes compete at the same
  level.

Still judgment-only:

- Whether three cards truly represent equal or unequal ideas.
- Whether density is appropriate for the task or register.
- Whether proof is close enough to the claim it supports.
- Whether tabs hide required comparison.
- Whether a section with real content has the right job for the page journey.
- Whether a CTA cadence is persuasive, excessive, or underpowered for the
  selected taste profile.
- Whether multiple navigation systems are justified by product complexity when
  they are not sibling header stacks.
