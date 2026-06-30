# Term Disambiguation

Use this reference when user language is too casual to map directly to a
UIBlueprint token. The rule is behavior first, structural layer second, visible
label last.

## Decision Heuristics

- Ask what the user can do with the element. Action and interruption define
  structure better than visual appearance.
- Ask where it lives. Page flow, sticky layer, and overlay layer have different
  accessibility and interaction obligations.
- Ask how long it persists. Inline and persistent messages are different from
  transient feedback.
- Ask whether it blocks the primary journey. Blocking work is usually `dialog`;
  secondary side work is often `drawer`; contextual helper content is usually
  `popover`.
- Keep the user's phrase as `label` or annotation when it is useful, but do not
  turn casual wording into a custom type.

## Common Ambiguous Terms

| User Term | Choose | When | Why |
| --- | --- | --- | --- |
| popup | `dialog` | Blocks the page until resolved | Focus and dismissal must be modal |
| popup | `popover` | Anchored helper or small contextual choice | Keeps the user in page flow |
| popup | `toast` | Transient status after an action | Feedback should not interrupt |
| modal | `dialog` | User must complete or dismiss focused work | "Modal" is behavior, not style |
| side panel | `drawer` | Edge-attached secondary task, cart, nav, or filter | Preserves return to page context |
| menu | `navigation` | Moves between destinations | It is page or site navigation |
| menu | `buttonGroup` | Chooses actions in the current context | It is a control group, not navigation |
| card | `card` | One reusable item with its own content/action | Represents a single entity |
| cards | `cardGrid` | Repeated peer cards | The set is different from each item |
| section | `section` | Major page band with one content purpose | Owns a step in the journey |
| section | `contentGroup` | Smaller related group inside a section or component | Avoids fake page-level hierarchy |
| alert | `banner` | Persistent inline or page-level message | Stays visible until addressed |
| alert | `toast` | Temporary confirmation or status | Clears without blocking work |
| alert | `dialog` | Requires immediate blocking decision | User must resolve it now |
| hero image | `imagePlaceholder` | Media inside a `hero` | Media is a child, not the hero itself |
| CTA | `button` with CTA role | Action control | Role explains priority |
| error | `error` state plus `errorText` role | Validation or recovery content | State and content role work together |

## Anti-Pattern

Bad: "Add a popup menu card thing" becomes a custom `popupMenuCard` node.

Corrected: split the phrase into behavior and structure. If it opens from a
filter button and contains filter controls, use `drawer` or `popover` based on
space and interruption. If it lists destinations, use `navigation`. If it is one
repeatable item inside the surface, use `card`.

## Worked Example

Input: "Show a sticky warning popup at the top after save."

Mapping: use `toast` if the message is temporary confirmation, `banner` if it
must remain visible in the page, and `stickyBar` only if persistence during
scroll is structurally required. Use `warning` state only when the message
communicates risk or required attention.

## Hand-Off

Use `interaction-patterns` when the term depends on trigger, focus, dismissal, or
state transitions. Use `layout-specification` when the term is about placement.
Use `wireframe-schema` when no approved node, role, layout, layer, or state token
can represent the concept.
