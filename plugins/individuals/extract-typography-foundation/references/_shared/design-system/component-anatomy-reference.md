# Component Anatomy Reference

Use this reference to describe common component structure in design-system
seeds, wireframes, prototype plans, and node-tied content models.

Component anatomy defines the parts a component needs to communicate meaning,
support interaction, expose accessible names/descriptions, and hand off stable
slots to downstream specs. It is not visual style and it is not implementation
code.

## Anatomy Versus Style Versus Code

Anatomy answers:

- What parts does this component contain?
- Which parts are required for the component to be understandable?
- Which optional slots are allowed before the component becomes another pattern?
- Which parts own labels, descriptions, errors, focus, or state feedback?

Style answers:

- What tokens, spacing, radius, shadows, typography, and color roles should
  apply?

Implementation code answers:

- Which framework component, prop names, event handlers, DOM structure, and
  runtime state implementation should be used?

Keep these layers separate. A seed can define `dialog.title`,
`dialog.closeControl`, and `dialog.primaryAction` without deciding React props,
CSS class names, or final animation timing.

## Anatomy Model

Each component should define:

- Required parts: slots that must exist for the component to work.
- Optional parts: slots that may appear when content or behavior requires them.
- Variants: meaningful structural or behavioral variants.
- Content slots: parts that copy/content agents can fill.
- Accessibility hooks: labels, descriptions, keyboard behavior, focus behavior,
  relationships, and live-region needs.
- State hooks: loading, error, success, empty, disabled, selected, expanded,
  collapsed, or active states that prototype plans must model.

## Common Component Anatomy

| Component | Required parts | Optional parts | Common variants | Content slots | Accessibility hooks |
| --- | --- | --- | --- | --- | --- |
| Button | `label` | `leadingIcon`, `trailingIcon`, `loadingIndicator`, `shortcutHint` | primary, secondary, ghost, destructive, icon+label | label, loading label, destructive confirmation text | accessible name, disabled state, loading announcement, focus indicator |
| Input | `label`, `input` | `helperText`, `errorText`, `prefix`, `suffix`, `counter`, `clearControl` | text, email, search, password, textarea, select-like | label, placeholder, helper, error, success | label association, error association, required state, autocomplete, focus order |
| Card | `title` | `media`, `eyebrow`, `description`, `metadata`, `badge`, `actions`, `secondaryLink` | feature, service, product, testimonial, metric, article | title, summary, metadata, action label | heading level, link target, action name, media alt policy |
| Table | `caption`, `columns`, `rows` | `toolbar`, `filters`, `sortControls`, `pagination`, `emptyState`, `bulkActions` | data, comparison, selectable, compact | caption, column labels, row labels, empty copy | caption/summary, header associations, sort state, keyboard navigation |
| Dialog | `title`, `body`, `primaryAction`, `closeControl` | `description`, `secondaryAction`, `destructiveAction`, `footer`, `statusMessage` | confirmation, form, destructive, information, picker | title, description, body, action labels, error copy | focus trap, focus return, escape policy, accessible name/description |
| Navigation | `landmarkLabel`, `items` | `logo`, `utilityItems`, `primaryAction`, `activeIndicator`, `overflowMenu` | global, local, sidebar, breadcrumb, pagination | item labels, active label, menu labels | landmark naming, current item, keyboard traversal, disclosure state |
| Product grid | `gridLabel`, `productCards` | `filters`, `sortControl`, `resultCount`, `pagination`, `emptyState`, `loadingState` | browse, search results, recommendations, comparison | product names, prices, badges, filter labels | result count announcement, card heading policy, filter state, loading state |
| Form | `fieldGroups`, `submitAction` | `intro`, `progress`, `errorSummary`, `saveAction`, `recoveryAction`, `successMessage` | single-step, multi-step, inline, wizard, checkout | labels, helper text, errors, success, review labels | field labels, error summary focus, validation timing, submit state |
| Tabs | `tabList`, `tabs`, `panels` | `badge`, `overflowMenu`, `panelIntro` | horizontal, vertical, segmented, responsive-select | tab labels, panel headings, badge text | selected state, keyboard arrows, tab-panel relationship |
| Accordion | `items`, `trigger`, `panel` | `summary`, `icon`, `metadata`, `nestedActions` | single-open, multi-open, FAQ, settings | trigger label, panel body, summary | expanded state, heading level, keyboard activation |
| Alert | `message`, `severity` | `title`, `description`, `action`, `dismissControl`, `icon` | info, success, warning, error, inline, page-level | title, body, action, dismiss label | role/status choice, live announcement, focus policy |
| Toast | `message` | `title`, `action`, `dismissControl`, `timeout`, `undoAction` | success, error, info, undo, persistent | message, action label, undo text | live region, timeout policy, pause on hover/focus, dismissal |
| Empty state | `title`, `description` | `illustration`, `primaryAction`, `secondaryAction`, `nextSteps`, `recoveryLink` | first-use, no-results, error-recovery, permission, filtered | title, description, action labels, recovery copy | heading, action name, diagnostic clarity, focus placement after filters |

## Vocabulary Alignment

The vocabulary file `.convention/vocabulary/component-anatomy.json` defines the
canonical component names and part names that schema-facing design-system
reviews can validate. Use this markdown reference for richer guidance; use the
JSON vocabulary for deterministic checks.

When adding a new component family:

1. Add the component and part names to `component-anatomy.json`.
2. Add variants to `component-variants.json` only when they represent reusable
   structural or behavioral differences.
3. Add state requirements to prototype references when behavior changes.
4. Add content-slot guidance when copy length or role changes layout.

## Prototype Behavior Mapping

Component anatomy gives prototype plans stable targets:

- Button `loadingIndicator` maps to loading and disabled submit states.
- Input `errorText` maps to validation errors and focus recovery.
- Dialog `closeControl` maps to dismissal, escape behavior, and focus return.
- Table `sortControls` map to selected/sorted state and result announcements.
- Tabs `tabList`, `tabs`, and `panels` map to selected state and keyboard arrow
  behavior.
- Accordion `trigger` and `panel` map to expanded/collapsed state.
- Alert and toast `message` slots map to live-region behavior.
- Empty-state `primaryAction` maps to recovery or first-use onboarding flow.

Prototype configs should reference the source node IDs for these parts when the
part is interactive, focusable, stateful, or announced.

## Content Mapping

Content agents should write to anatomy slots instead of inventing parallel
structures:

- Button: action label, loading label, destructive confirmation.
- Input: label, helper text, placeholder, error text, success text.
- Card: title, description, metadata, badge, action label.
- Dialog: title, description, body, primary/secondary action labels.
- Alert/toast: severity-appropriate message, action, recovery text.
- Empty state: diagnostic title, next-step explanation, recovery action.

If copy does not fit the slot, flag the component anatomy or content strategy
instead of forcing long copy into a small control.

## Accessibility Hooks

Always identify the part that owns:

- Accessible name.
- Accessible description.
- Error relationship.
- Current/selected/expanded state.
- Keyboard activation behavior.
- Focus target after open, close, submit, validation, or recovery.
- Live announcement behavior for async, error, success, and status messages.

If those hooks are unknown, the component is not ready for prototype handoff.

## Review Rules

- Fail anatomy when required parts are missing.
- Fail anatomy when interactive parts have no accessible name or state hook.
- Warn when optional parts appear in every instance and should become required.
- Warn when a component carries page-level content that belongs to a section.
- Warn when copy slots are too vague for content generation.
- Keep anatomy independent from visual style, framework props, and CSS class
  names.
