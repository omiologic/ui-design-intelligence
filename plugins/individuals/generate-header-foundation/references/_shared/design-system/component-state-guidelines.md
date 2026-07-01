# Component State Guidelines

Use this reference to decide which component states must be represented in a
`DesignSystemSeed`, `ComponentStateModel`, prototype plan, design spec, or
review. It aligns with `shared/vocabulary/interaction-states.json` and
`shared/schemas/component-state-model.schema.json`.

State guidance is a shared contract between design-system and prototype work:

- Design-system seeds define reusable state expectations, token roles, anatomy
  hooks, and accessibility constraints.
- Prototype configs define concrete node IDs, transitions, triggers, validation
  behavior, focus behavior, and route/screen outcomes.

## State Vocabulary

Use canonical state names from `shared/vocabulary/interaction-states.json`.
Do not invent near-duplicates such as `pressed`, `done`, `invalid`,
`processing`, or `expandedOpen` when `active`, `success`, `error`, `loading`,
or `expanded` fits.

## Core Requirements

Every interactive component should answer:

- What is the resting state?
- What feedback appears when the user points, focuses, presses, selects, opens,
  submits, waits, succeeds, fails, or finds no content?
- Which states change visuals only, and which states change behavior?
- Which state owns copy, focus, keyboard behavior, or accessibility
  announcement?
- Which states are reusable design-system expectations versus prototype-specific
  transitions?

## State Expectations

| State | Visual expectation | Content expectation | Interaction expectation | Accessibility expectation |
| --- | --- | --- | --- | --- |
| `default` | Resting style is legible and clearly available. | Label or visible content states the component job. | Component is ready for normal interaction. | Name, role, and value are understandable. |
| `hover` | Pointer affordance changes without becoming the only signal. | Copy should not change unless preview meaning changes. | No committed action happens on hover alone. | Hover-only information must also be available by focus or activation. |
| `focus` | Focus indicator is visible and not color-only. | Focused field/control keeps label and helper context available. | Keyboard users can activate, edit, or move intentionally. | Focus order and focus target are explicit. |
| `active` | Pressed/current activation state is visually distinct from hover. | Copy remains stable unless a short pressed label is required. | Trigger is being activated or is currently active. | Activation does not trap keyboard or pointer users. |
| `selected` | Selected option, tab, row, plan, or filter is clearly distinct. | Selected item text explains what is chosen. | Selection can be changed or cleared when applicable. | Selected state is programmatically exposed in implementation handoff. |
| `disabled` | Disabled control is visibly unavailable while still readable. | If unavailability is not obvious, explain why or how to unlock it. | Disabled controls do not trigger actions. | Disabled state is not the only way to communicate blocked progress. |
| `loading` | Loading state preserves layout and prevents duplicate action when needed. | Say what is loading when ambiguity matters. | Submits, fetches, validates, or transitions are in progress. | Important loading states need status announcement guidance. |
| `error` | Error state is visually distinct and paired with text. | State what failed and how to recover. | User can retry, edit, cancel, or navigate to recovery. | Error is associated with the affected field/region and not color-only. |
| `success` | Success state confirms completion without overclaiming permanence. | State what happened and what happens next. | User can continue, undo, view result, or dismiss when relevant. | Success feedback should be announced when it follows user action. |
| `empty` | Empty region preserves the expected structure. | Explain why nothing appears and provide a next step when possible. | Filters/search/setup/recovery actions remain available. | Empty state appears in reading order and does not imply inaccessible content. |
| `expanded` | Expanded area reveals content and indicates open state. | Trigger label remains understandable with revealed content. | Collapse path remains available. | Expanded state and controlled region relationship are exposed. |
| `collapsed` | Collapsed area indicates more content is available. | Trigger label previews what will open. | Expand path is available by pointer and keyboard. | Collapsed state is exposed and focus does not move unexpectedly. |

Related overlay and visibility states:

- `open` / `closed`: use for dialogs, drawers, menus, popovers, and overlays.
- `visible` / `hidden`: use for conditional regions and responsive visibility.
- `sticky`: use when a region remains fixed in a scroll context.
- `dismissible`: use when feedback or overlay can be removed.
- `required` / `optional`: use for form fields, steps, or inputs where
  completion rules affect behavior.
- `warning`: use when the user can continue but needs attention.

## Design-System Seed Versus Prototype Config

Put guidance in the design-system seed when it is reusable:

- Which states a component family supports.
- Which token roles apply to states.
- Which anatomy parts carry state feedback.
- Which states require content slots such as helper text, error text, loading
  label, empty title, or success message.
- Which accessibility constraints apply across instances.

Put guidance in prototype config when it is instance-specific:

- Source node IDs for stateful parts.
- Initial state for a specific component.
- Allowed states for one node.
- Triggers and transitions.
- Validation states and error placement.
- Focus movement, focus return, keyboard behavior, and announcement details.
- Route, screen, overlay, and async results.

If a state changes only styling, document it in the design-system seed or
design spec. If a state changes behavior, focus, validation, or flow outcome,
model it in `ComponentStateModel` or `PrototypeConfig`.

## Component Coverage

Minimum state expectations by component type:

- Button: `default`, `hover`, `focus`, `active`, `disabled`, `loading`; add
  `success` or `error` when the button owns async feedback.
- Input: `default`, `focus`, `disabled`, `required` or `optional`, `error`;
  add `success` for confirmed valid entries and `loading` for async validation.
- Card: `default`; add `hover`, `focus`, `selected`, `empty`, or `loading`
  only when the card is interactive, selectable, or data-driven.
- Table: `default`, `loading`, `empty`, `error`; add `selected` for selectable
  rows and `active` for sorted columns or current pagination.
- Dialog: `closed`, `open`; add `loading`, `error`, `success`, or `warning`
  when the dialog contains submission, confirmation, or destructive action.
- Navigation: `default`, `focus`, `active`, `selected`; add `expanded` and
  `collapsed` for disclosures or mobile navigation.
- Product grid: `default`, `loading`, `empty`, `error`; add `selected` for
  selected filters or compared products.
- Form: `default`, `required`, `optional`, `loading`, `error`, `success`;
  add `disabled` for unavailable submit or locked steps.
- Tabs: `default`, `focus`, `selected`; add `disabled` if a tab is visible but
  unavailable.
- Accordion: `collapsed`, `expanded`, `focus`; add `disabled` only when a panel
  cannot be opened.
- Alert: `warning`, `error`, `success`; add `dismissible` when removable.
- Toast: `success`, `error`, `warning`, `dismissible`; define timeout policy in
  prototype or handoff notes.
- Empty state: `empty`; add `error` when absence is caused by failed loading or
  permission.

## Review Prompts

Use these prompts when auditing design-system seeds, prototype plans, or
generated component state models:

- Are required states present for every interactive component?
- Are hover, focus, active, and selected visually distinct enough to review?
- Does focus have a visible indicator and keyboard behavior?
- Does disabled state explain blocked progress when needed?
- Does loading prevent duplicate submission or duplicate async work?
- Does error feedback say what failed and how to recover?
- Does success feedback say what changed and what happens next?
- Does empty state distinguish first-use, filtered, permission, and true absence?
- Are expanded/collapsed and open/closed relationships clear?
- Are state names from the canonical vocabulary?
- Does any state belong in prototype config because it changes behavior or
  focus rather than only style?
- Are state content slots tied to component anatomy?

## Failure Conditions

Fail state coverage when:

- A component can be interacted with but has no focus state.
- A form or async action has no loading, error, or recovery behavior.
- Error, warning, or success states are represented only by color.
- Disabled controls block progress without explanation.
- Expanded/collapsed or open/closed controls have no keyboard or focus behavior.
- State names do not map to the interaction-state vocabulary.
- Design-system seed prose promises states that prototype configs cannot model.

Warn when:

- Hover and active are visually indistinct but behavior is still clear.
- Empty state has a recovery action but weak diagnostic copy.
- Success feedback exists only as a toast for a high-consequence action.
- A component includes many states but no clear initial state.

## Handoff Shape

When handing state guidance to prototype work, include:

```txt
Component:
Node id:
Initial state:
Allowed states:
Stateful anatomy parts:
Transitions needed:
Validation or async behavior:
Focus and keyboard behavior:
Announcement or live-region needs:
Open questions:
```
