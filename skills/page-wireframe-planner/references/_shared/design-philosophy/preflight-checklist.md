# Blueprint Pre-Flight Checklist

Run this before handing a blueprint to audit, visual design, or implementation.

## Structure

- [ ] Root is a page or requested component scope with a clear label.
- [ ] Header, main, and footer landmarks exist when page scope requires them.
- [ ] Each section has a distinct job.
- [ ] Section order follows the primary user decision path.
- [ ] Repeated items use a repeated structure such as cards, list items, or rows.
- [ ] Decorative content is not modeled as required structure.

## Interaction

- [ ] Every interactive node has a clear role and action.
- [ ] Overlays have trigger, open, close, dismissal, focus, and keyboard behavior.
- [ ] Forms expose labels, helper/error placement, submit behavior, and states.
- [ ] Stateful components include meaningful states, not only a default state.

## Accessibility

- [ ] Landmark intent is explicit where the schema supports it.
- [ ] Navigation has an accessible label when multiple navigation regions exist.
- [ ] Dialog and drawer focus behavior is declared.
- [ ] Error and success feedback is structurally represented.

## Responsive

- [ ] Responsive notes preserve the primary goal and action.
- [ ] Priority order is declared for mobile stacking.
- [ ] Navigation and overlays have mobile behavior.
- [ ] Dense regions explain how controls remain reachable.

## Handoff

- [ ] The blueprint states unresolved assumptions.
- [ ] Evidence and inference are separated when generated from study inputs.
- [ ] The selected taste profile or register is named in metadata or planning
  notes when relevant.
- [ ] The blueprint avoids visual style instructions that belong downstream.
