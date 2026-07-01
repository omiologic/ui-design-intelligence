# Edge Case Scenarios

Use these scenarios when planning, generating, or auditing prototypes so the
handoff covers more than the ideal path.

This reference complements:

- `.convention/prototype/prototype-quality-checklist.md`
- `.convention/prototype/state-and-feedback-guidelines.md`
- `.convention/prototype/form-flow-patterns.md`
- `.convention/prototype/navigation-patterns.md`
- `.convention/prototype/responsive-prototype-guidelines.md`
- `.convention/prototype/component-behavior-reference.md`

Edge cases should be represented in `PrototypeConfig` states, interactions,
forms, overlays, navigation flows, transitions, and notes when they affect
behavior. Edge-case copy should be represented in `PrototypeContent` when it is
part of the user-facing prototype experience.

## Required Versus Optional

### Required Edge Cases

Include an edge case when it affects:

- Completion of the primary flow.
- Error recovery.
- Accessibility.
- Responsive behavior.
- Sensitive claims or review-risk copy.
- Data integrity.
- Payment, submission, account, permission, or destructive actions.
- Availability, eligibility, or compatibility decisions.

### Optional Product-Specific Edge Cases

Treat an edge case as optional when:

- It affects a secondary path only.
- The source brief does not include the underlying product behavior.
- It needs domain-specific business rules not available in the source artifacts.
- It belongs to implementation resilience rather than prototype behavior.

Optional edge cases should still be listed as open questions when they could
change the final implementation.

## Long Text

Use this scenario for long labels, headings, CTA text, names, product titles,
table cells, filenames, addresses, error messages, translated copy, and dynamic
content.

Expected prototype handling:

- Text wraps, truncates with accessible full value, or moves into a detail view.
- Buttons and controls keep stable dimensions where the UI depends on them.
- Labels remain connected to fields.
- Error text remains near the affected input.
- Cards, tables, dialogs, drawers, and sticky regions do not overlap following
  content.

Required when:

- The prototype includes generated copy, user-entered values, product names,
  table cells, form labels, or translated content.

Optional when:

- The surface is a static short label and the source content is known.

Review checks:

- Does the longest realistic label still fit the control?
- Does wrapped text push actions off-screen?
- Does truncation preserve meaning and accessible access to the full value?

## No Data

Use this scenario for empty dashboards, empty carts, empty inboxes, no saved
items, no records, empty search results, and first-use states.

Expected prototype handling:

- Distinguish first-use empty state from filtered zero-results state.
- Explain why nothing appears when it is not obvious.
- Provide a recovery action or next step when one exists.
- Preserve filters or search terms when zero results are caused by filtering.
- Avoid implying the user has no data when permission or loading is the real
  cause.

Required when:

- Lists, tables, grids, dashboards, carts, search results, or product listings
  are part of the prototype.

Optional when:

- The prototype only covers a static content page with no dynamic collections.

Review checks:

- Is the empty state tied to a source node or state?
- Does it offer a path forward?
- Is no-data distinct from error, loading, and permission denied?

## Too Many Items

Use this scenario for dense tables, grids, nav lists, filters, menus, search
results, card lists, notifications, and repeated form groups.

Expected prototype handling:

- Define pagination, load more, virtualized region, grouping, filtering,
  sorting, truncation, or overflow behavior.
- Keep selected, focused, and active items discoverable.
- Preserve user context when the list updates.
- Define bulk-action behavior where selection exists.

Required when:

- A list or grid can realistically exceed the visible region.
- Bulk actions, filtering, sorting, or pagination are included.

Optional when:

- The item count is fixed and small by product rule.

Review checks:

- What happens after the visible area fills?
- Can users find the selected item after filtering or pagination?
- Does compact behavior still support the list task?

## Slow Network

Use this scenario for async loading, submission, filtering, upload, search,
checkout, account update, or data refresh behavior.

Expected prototype handling:

- Show `loading`, saving, syncing, or pending state.
- Prevent duplicate submission when needed.
- Preserve entered data and selected state.
- Define timeout, retry, cancel, or support path.
- Move or preserve focus intentionally when loading completes or fails.

Required when:

- The prototype includes remote data, form submission, upload, checkout,
  filtering, authentication, or save behavior.

Optional when:

- The prototype is entirely static and has no async behavior.

Review checks:

- What can the user do while waiting?
- What happens if the action times out?
- Is the loading state announced or visible enough?

## Invalid Input

Use this scenario for forms, search, filters, checkout, profile updates,
configuration, compatibility checks, and required choices.

Expected prototype handling:

- Validation timing is explicit.
- Error placement is defined: inline, summary, toast, or none.
- Error text says how to recover.
- User-entered values are preserved.
- Focus moves to the error summary or first invalid field when appropriate.

Required when:

- The prototype includes forms, required fields, product configuration, search,
  checkout, or settings.

Optional when:

- Input is not part of the scoped flow.

Review checks:

- Does the user know what is wrong?
- Can the user fix it without re-entering everything?
- Is validation accessible and not color-only?

## Unavailable Product Or Option

Use this scenario for ecommerce, product selectors, plan selection, appointment
booking, eligibility, compatibility, inventory, or feature access.

Expected prototype handling:

- Unavailable options use `disabled`, `warning`, or `error` state as
  appropriate.
- Explain why the item is unavailable when the reason affects user choice.
- Provide alternatives, notify-me, change selection, contact support, or
  backtracking paths when available.
- Prevent unavailable options from being submitted as valid choices.

Required when:

- The user must choose a product, variant, time slot, plan, service, or
  compatible option.

Optional when:

- Availability is known to be fixed for the prototype scope.

Review checks:

- Can users distinguish unavailable from unselected?
- Is there a recovery path?
- Does unavailable state survive responsive layout changes?

## Permission Denied

Use this scenario for authenticated areas, account roles, browser permissions,
admin actions, location access, file access, privacy settings, and gated data.

Expected prototype handling:

- Distinguish unauthenticated, unauthorized, permission not requested,
  permission denied, and unavailable permission where relevant.
- Explain what access is needed and why.
- Provide sign in, request access, change setting, contact admin, retry, or
  continue-without path.
- Avoid presenting permission-driven empty states as true no-data states.

Required when:

- The prototype includes account data, protected actions, browser permissions,
  admin tools, uploads, or role-based behavior.

Optional when:

- The flow is public and permission-independent.

Review checks:

- What permission is missing?
- Can users recover or continue?
- Is the copy clear without being coercive?

## Mobile Overflow

Use this scenario for compact viewports, sticky CTAs, dialogs, drawers, forms,
tables, bottom navigation, banners, cookie notices, and dense content.

Expected prototype handling:

- Define stacking, wrapping, truncation, scrolling, sticky behavior, or alternate
  layout.
- Keep primary actions and recovery controls visible or reachable.
- Avoid sticky regions covering errors, fields, nav, or system controls.
- Define mobile drawer, dialog, or sheet overflow and close behavior.

Required when:

- The prototype has `compact` viewport behavior or mobile-priority flow.

Optional when:

- The scoped handoff explicitly excludes compact viewports.

Review checks:

- Is there a compact equivalent for every primary desktop action?
- Does anything overlap or become unreachable?
- Are touch targets large enough and separated from destructive actions?

## Missing Media

Use this scenario for product images, avatars, icons, videos, thumbnails,
logos, maps, charts, screenshots, illustrations, and uploaded files.

Expected prototype handling:

- Provide placeholder, fallback, retry, remove, upload-again, or alternate text
  behavior.
- Preserve layout without hiding critical text or actions.
- Distinguish intentionally absent media from failed media.
- Do not rely on media alone for essential meaning.

Required when:

- Media is decision-critical, user-uploaded, remote-loaded, or repeated in
  cards, grids, tables, profiles, or product pages.

Optional when:

- Media is decorative and not part of the prototype decision path.

Review checks:

- What happens when media fails?
- Is the core task still possible?
- Is alternative text or fallback copy represented where relevant?

## Cross-Scenario Stress Cases

Some realistic failures combine multiple edge cases. Include these when they
affect the primary flow:

- Slow network plus duplicate submit.
- Invalid input plus mobile keyboard overlap.
- No data plus permission denied.
- Too many items plus mobile overflow.
- Missing media plus product selection.
- Unavailable option plus checkout or booking.
- Long translated text plus sticky CTA.
- Upload failure plus partial progress.

Review checks:

- Does one recovery path conflict with another?
- Does the user lose context when multiple edge cases happen?
- Which edge case determines the main state shown to the user?

## Review Outcomes

Use these outcomes for edge-case review:

- `pass`: Required edge cases are covered for the stated prototype scope.
- `passWithNotes`: Optional or lower-risk edge cases are documented but do not
  block handoff.
- `revise`: Required edge cases are missing, unclear, inaccessible, or
  unrecoverable.
- `blocked`: Source requirements, state model, product rules, responsive scope,
  or validation behavior are missing.

## Minimum Bar

A prototype meets the minimum edge-case bar when:

- Primary flows include loading, empty, error, success, disabled, and recovery
  states where relevant.
- Forms cover invalid input, failed submission, and partial-progress behavior.
- Lists, grids, tables, and dashboards cover no data and too many items.
- Product, booking, compatibility, or selection flows cover unavailable options.
- Protected actions cover permission denied or clearly state that permission is
  out of scope.
- Compact viewport flows cover mobile overflow and hidden-control recovery.
- Media-dependent flows cover missing media.
- Optional edge cases are listed as non-blocking open questions when product
  rules are missing.
