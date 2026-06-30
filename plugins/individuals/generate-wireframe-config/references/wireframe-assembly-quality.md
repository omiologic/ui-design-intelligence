# Wireframe Assembly Quality

Use this reference to assemble final UIBlueprint JSON that is useful for review,
visual handoff, and implementation. A valid file is not enough; the node tree
must preserve the planned user journey and structural decisions.

## Assembly Principle

Generation should convert an already planned structure into the schema contract.
It may complete mechanical fields, normalize vocabulary, and add explicit
assumption annotations. It should not decide the page strategy, invent section
order, or design component anatomy from a weak brief.

## Planned-Enough Gate

Before final JSON assembly, confirm that the input provides or intentionally
omits:

- Scope: page, section, component, overlay, or state.
- Primary user goal and success action when page scope is involved.
- Ordered structure for header, main content, footer, and justified overlays.
- Section jobs and content roles.
- Component anatomy for forms, cards, tables, navigation, filters, and repeated
  groups.
- Required interaction states and overlay behavior.
- Responsive notes for changed order, grouping, navigation, sticky actions, or
  collapsed controls.
- Accessibility notes for landmarks, labels, focus, keyboard behavior, and
  feedback.
- Assumptions and unresolved gaps.

If these decisions are missing, stop and hand off to the relevant planner rather
than filling the gap with a generic structure.

## Assembly Flow

1. Identify the requested scope and source plan.
2. Build the top-level document fields: `id`, `type`, `label`, `version`,
   optional `description`, optional `metadata`, `root`, optional `overlays`, and
   optional `responsive`.
3. Create stable, readable IDs from the page or component context.
4. Preserve planned section order, labels, roles, states, responsive notes, and
   accessibility notes.
5. Normalize node types, layout patterns, content roles, and interaction states
   to approved vocabulary.
6. Place overlays in `overlays` when they sit outside normal reading flow; keep
   banners, sticky bars, and inline feedback in `children` when they participate
   in the page flow.
7. Add annotations for assumptions, unresolved gaps, and non-obvious structure
   when supported by the target format.
8. Run the preflight checklist, vocabulary check, and schema validation before
   returning the final JSON.

## Best-Practice Checks

- The root structure exposes the user journey, not just a pile of nodes.
- Each section has a distinct role and label.
- Repeated items use repeated structure consistently.
- One primary action remains identifiable at page level.
- Required states are represented for forms, overlays, data regions, and async
  components.
- Responsive notes preserve primary information and actions on mobile.
- Accessibility notes cover landmarks, navigation labels, form feedback, and
  overlay focus where relevant.
- Visual styling, colors, type scale, motion, and production layout values stay
  out of the wireframe.

## Anti-Patterns

- Schema-valid but purposeless: the JSON validates, but the page job and section
  roles are not visible.
- Generic assembly: missing planning is replaced with hero, cards, FAQ, and CTA.
- Node inflation: every copy fragment becomes a node, hiding the actual
  structure.
- Node flattening: meaningful containment disappears and reviewers cannot see
  ownership or sequence.
- Lost state coverage: form, overlay, table, and async states collapse to the
  happy path.
- Overlay leakage: dialogs, drawers, or popovers are buried inside the page flow
  without trigger, dismissal, or focus notes.
- Mobile afterthought: desktop structure is copied with "stacks on mobile" while
  primary actions or dense controls become unclear.
- Visual drift: schema fields or annotations carry visual polish directions that
  belong to downstream taste or implementation tools.

## Command Decision

Existing validation scripts are the right command surface for now:

- `npm run validate:examples` checks example JSON validity.
- `npm run validate:blueprint-antipatterns` checks deterministic structural
  anti-patterns.
- `npm run validate:export-seed` checks downstream seed export assumptions.

A future scaffold command could create a minimal schema-valid wrapper from a
settled plan, but generation still needs human or agent judgment for page job,
section purpose, and responsive priority. This skill does not need a separate
subagent by default; use planner skills when planning is not finished.

## Inline Example

Input plan: pricing page with header navigation, hero with one signup CTA,
comparison section, FAQ, signup dialog, desktop comparison table, and mobile
stacked plan cards.

Assembly decision:

- `root` is a `page`.
- Header and main sections stay in `children` in planned order.
- The signup dialog goes in `overlays` with closed state, trigger note,
  dismissal, and focus behavior.
- Responsive notes explain that the comparison table becomes stacked plan cards
  on mobile while the signup action remains reachable.
- Missing exact copy is represented as structural labels, not invented marketing
  copy.
