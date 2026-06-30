# Wireframe Best Practices

A decision reference for UIBlueprint wireframe work. Every item carries its
reason, because the reason is what makes it usable judgment rather than a generic
rule. This file stays at **structural fidelity** — it never prescribes color,
type scale, shadow, motion timing, or imagery. Those belong to downstream visual
tooling, not to a wireframe.

Names in `code` refer to approved tokens in `shared/vocabulary/`.

## First principle

A good wireframe decision is one you can state a reason for. If the only
justification for a choice is "it's the default," that is the choice to
reconsider. Annotate the *why* next to the structure; a wireframe without
rationale gets re-litigated at every review.

## 1. Fidelity discipline

- **Stay pre-visual on purpose.** Grayscale, boxes, labels. Polish pulls
  reviewers toward aesthetics when you are still testing structure, so it costs
  you the feedback you actually need.
- **Raise fidelity only as decisions firm up.** Low fidelity for flow and
  structure, mid fidelity for hierarchy and content. Do not pay for detail you
  will discard.
- **Do not encode production detail.** Exact spacing, easing, and pixel values
  are downstream layers; deciding them here is both wasted and misleading.

## 2. Start from goal and content, not layout

- **Name the page's single job and the user's primary goal first.** Layout-first
  thinking is what produces interchangeable templates. Structure should follow
  intent.
- **One primary action per screen.** Competing primary CTAs dilute the path and
  signal that the intent was never decided. Secondary actions are fine when they
  read as secondary.
- **Use real content for load-bearing parts.** Real headlines, labels, and button
  copy. Placeholder text hides the length and meaning problems wireframes exist to
  surface — `Submit` versus `Get my quote` changes the whole interaction.

## 3. Structure and layout

- **Order sections by the user's decision journey,** not by convention: promise →
  supporting proof → objection handling → action. Sequence is a design decision,
  not a given.
- **Let real content relationships pick the arrangement.** Reach for asymmetric or
  `splitContent` layouts and varied density when the content calls for it. A
  uniform grid of equal `card`s flattens hierarchy and is the most common
  "templated" tell.
- **Vary section weight.** If every section has the same density and rhythm, the
  page has no hierarchy and nothing reads as more important than anything else.
- **Keep alignment and grouping consistent even at low fidelity.** Alignment is how
  a reader infers what belongs together; inconsistent edges read as unrelated
  items.
- **Keep the node tree shallow and meaningful.** Nest to express real containment
  (`form` contains `inputGroup`s), not to mirror visual indentation. Deep trees
  that encode styling are harder to validate and to change.

## 4. Labeling and interaction

- **Label every region by content role and every control by what it does.** A
  wireframe is a communication artifact; unlabeled boxes get misread by everyone
  downstream.
- **Choose the interaction surface deliberately.** The surface *is* the
  interaction decision. Pick by the task's nature:

  | Task nature | Surface | Why |
  | --- | --- | --- |
  | Inline, non-blocking, part of the flow | inline node | Keeps context; no interruption |
  | Small contextual helper tied to a trigger | `popover` | Light, dismissible, anchored |
  | Blocking decision the user must resolve now | `dialog` | Demands focus; halts the flow on purpose |
  | Secondary task or navigation beside the main flow | `drawer` | Roomy, set-aside, returnable |
  | Transient confirmation or status | `toast` | Non-blocking feedback that auto-clears |
  | Persistent page-level message | `banner` | Stays until addressed; not modal |
  | A genuinely separate task or content set | new page | Deserves its own URL and back-button |

- **For each interaction, note trigger, surface, dismissal, focus, and feedback.**
  Those five are the structural contract of an interaction; "it opens a modal" is
  not a specification.
- **Prefer progressive disclosure over cramming — but never bury the primary
  action.** Disclosure manages complexity; hiding the main task behind it defeats
  the page.

## 5. State coverage

- **Design empty, loading, and error states, not just the happy path.** Most real
  screen time is spent outside the ideal state; a full-data-only wireframe lies
  about the experience.
- **Match required states to the component.** Cover what the component can actually
  be in:

  | Component | States that usually matter |
  | --- | --- |
  | `form` / `inputGroup` | default, focus, error, disabled, loading, success |
  | `button` | default, hover, active, disabled, loading |
  | data list / `cardGrid` / `table` | populated, empty, loading, error |
  | `dialog` / `drawer` | closed, open, (loading if it fetches) |
  | `tabs` / `accordion` | selected/open vs unselected/closed |

  Use the canonical names in `shared/vocabulary/interaction-states.json`.

## 6. Responsive intent

- **Show what changes per breakpoint explicitly:** what reorders, collapses,
  stacks, or hides across desktop, tablet, and mobile. "It's responsive" is not a
  decision.
- **Never hide required content or actions on mobile.** Collapsing navigation is
  fine; dropping the primary action or essential information is a defect, not a
  simplification.
- **Decide table and multi-column behavior deliberately** (scroll, stack, or
  summarize). These are the structures that most often break on small viewports.

## 7. Accessibility (cheap now, expensive later)

- **Establish landmarks and a logical heading/reading order at wireframe stage.**
  Structure decided here is nearly free; retrofitting it after visual design is
  not.
- **Give every input a visible label and an error/help affordance.** This is
  structural, not cosmetic, so it belongs in the wireframe.
- **Sanity-check the keyboard and focus path for every overlay:** where focus goes
  on open, that it is trapped while open, and where it returns on close.
- **Do not rely on position or color alone to convey meaning** (color is out of
  scope here anyway). Encode meaning in structure and labels.

## Structural anti-patterns (avoid by default; each has a reason)

- **Three equal cards for every group** — flattens hierarchy; the default that
  signals "generated." Use the relationship the content actually has.
- **Competing primary CTAs** — splits the path; the user can't tell what to do.
- **Uniform density across all sections** — removes hierarchy; nothing leads.
- **Decorative sections with no content role** — if it carries no `role`, it is
  noise; cut it or give it a job.
- **`dialog` for non-blocking content** — interrupts without cause; use `popover`,
  `banner`, or inline.
- **Accordion or modal hiding primary content** — disclosure is for secondary
  detail, not the main task.
- **Carousel for primary content** — content past the first slide is rarely seen.
- **Hidden mobile actions or content** — see Responsive; this is a defect.
- **Unlabeled regions or controls** — unreadable to reviewers and to assistive
  tech.
- **Happy-path-only screens** — omits the states where users actually spend time.
- **Placeholder copy on load-bearing elements** — hides length and meaning
  problems.
- **Premature visual detail** — moves the conversation off structure too early.

## Pre-flight checklist (gate before a wireframe is "done")

- [ ] The page's job and the primary user goal are stated.
- [ ] Exactly one primary action is identifiable.
- [ ] Landmarks exist (header, nav, main, footer) and heading order is logical.
- [ ] Every input has a label and an error/help affordance.
- [ ] Every overlay notes trigger, dismissal, and focus behavior.
- [ ] Responsive intent is specified per breakpoint; nothing required is hidden on
      mobile.
- [ ] Data-driven nodes define empty, loading, and error states.
- [ ] All node types, roles, layouts, and states use approved vocabulary.
- [ ] Each non-obvious structural choice has a one-line rationale.

If a checkbox can't be honestly checked, the wireframe is not finished.

## Hand-offs

- Terminology disputes → `design-terminology`.
- Page composition and section ordering → `page-wireframe-planner`.
- Reusable section structure → `section-wireframe-planner`.
- Component anatomy and states → `component-wireframe-planner`.
- Layout-pattern selection and responsive structure → `layout-specification`.
- Overlay and interaction contracts → `interaction-patterns`.
- Structural accessibility review → `accessibility-wireframe-review`.
- Visual taste (color, type, motion, code) → downstream tooling, not this repo.
