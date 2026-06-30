# Design System Principles

A shared philosophy reference distilled from established design systems —
primarily **Material 3** — and translated to this repository's layer. It is a
companion to `wireframe-best-practices.md`: that file is the general practice
checklist; this file is the *reasoning* behind the structural decisions, grounded
in a mature system that has already argued these points out.

This document deliberately imports only Material's **structural** thinking. Names
in `code` refer to approved tokens in `shared/vocabulary/`.

## The boundary: what a system like Material teaches us, and what it doesn't

A design system spans the whole stack, from information architecture down to
pixels. This repository works at wireframe fidelity, so we take the upper layers
and leave the lower ones to downstream visual tooling. Being explicit about that
line is the point — it is what keeps the blueprint honest.

| Material concept | Transfers here? | Why |
| --- | --- | --- |
| Component states (hover, focus, pressed, selected, disabled…) | **Yes** | Structural: which states a component can be in is decided at wireframe time |
| Navigation model (bar / rail / drawer by size) | **Yes** | Structural: a navigation decision, not a visual one |
| Communication surfaces (toast / banner / dialog) | **Yes** | Structural: which surface carries which message |
| Layout regions + window size classes | **Yes** | Structural: regions and breakpoints are arrangement, not style |
| Density and information hierarchy | **Partly** | The *decision* transfers; the spacing values do not |
| Color, tonal palettes, dynamic color | No | Visual layer; out of scope |
| Elevation and shadow | No | Visual layer |
| Type scale and font | No | Visual layer |
| Motion physics, easing, shape morphing | No | Visual/behavioral polish; downstream |

Litmus test, same as elsewhere in the repo: if a Material guideline only makes
sense once you pick a color, a shadow, or an easing curve, it is below our line.

## 1. Design for size classes, not devices

Material stopped designing for named devices and switched to **window size
classes**, because available space is dynamic — split-screen, resized windows,
and foldables all change the space a layout gets without changing the "device."
A blueprint should think the same way.

Recommended mapping for UIBlueprint `responsive` notes (replace "desktop/tablet/
mobile" naming, which describes hardware rather than space):

| Size class | Width (Material) | Typical | Default structure |
| --- | --- | --- | --- |
| compact | < 600 | phone portrait | single pane / single column |
| medium | 600–839 | small tablet, phone landscape | optional second pane, low density |
| expanded | 840–1199 | tablet landscape, desktop | multi-pane, persistent navigation |
| large / extra-large | ≥ 1200 | desktop, external displays | two-to-three panes |

Four adaptation strategies, in order of preference — name which one each
responsive note uses:

1. **Reveal / hide** a pane as space allows (list collapses to a single pane on
   compact; list + detail side by side on expanded).
2. **Reflow** content across columns.
3. **Reposition** for ergonomics — Material moves primary actions from the bottom
   of a compact window to the leading edge of an expanded one, because reach and
   input differ by size.
4. **Transform / swap** a component for an equivalent one (see navigation, below).

Material's "canonical layouts" are reusable structural patterns worth naming in a
blueprint: **list-detail** (a list that opens a detail pane), **supporting pane**
(a main area plus a secondary/contextual panel), and **feed** (a column-count grid
of cards that reflows by size class). Map these to repo layout tokens such as
`splitContent` and `cardGrid`.

## 2. Establish regions before content

Material decomposes a screen into **app bar, navigation, and body** before
anything else. That is the same instinct as accessibility landmarks: decide the
regions first, then fill them. In UIBlueprint terms, place `header`,
navigation, `main`, and `footer` (and any `stickyBar`) before populating section
structure. Regions are the skeleton; sections are the muscle.

## 3. Navigation scales with available space

The same destinations should be reachable at every size class, but the *container*
changes:

- compact → bottom navigation bar
- medium → navigation rail (vertical, leading edge)
- expanded → navigation drawer (persistent)

Principle: navigation is one decision (the set of primary destinations) expressed
through different structures by size class — a "transform" adaptation, not three
separate designs. Keep primary destinations few (Material caps top-level
navigation at roughly three to five) so the hierarchy stays legible.

## 4. Communication: match the surface to the message's importance

This is the single most transferable model Material offers, and it maps directly
onto your `interaction-patterns` skill. Material's core rule: **choose the surface
by how important and how interrupting the message is**, and avoid overusing any
one surface. The escalation ladder, lowest interruption first:

| Message | Surface | Repo token | Rule of thumb |
| --- | --- | --- | --- |
| Status tied to a control ("Saved") | inline update | — | Prefer this; least disruptive |
| Brief, non-blocking feedback, no required action | snackbar | `toast` | Auto-dismisses; at most one optional action |
| Prominent, persistent notice with optional actions | banner | `banner` | Stays until addressed; one at a time; top of content |
| A decision the user must make before continuing | dialog | `dialog` | Blocks; holds focus until resolved |

Material's specific, hard-won rules worth inheriting:

- **Two or more actions, or anything that must block the screen → use a dialog,
  not a toast.** A toast is for one optional action at most.
- **A dialog holds focus until dismissed** and scrims everything behind it — so
  only use it when interruption is justified. Overusing dialogs is the most common
  failure this model prevents.
- **Dialog action labels name the outcome** (`Send`, `Create`, `Discard`), never
  `OK`/`Done`/`Yes`. The label is the user's only preview of what happens.
- **Limit a dialog to two actions.** If you need a third, the content belongs in an
  expansion or a separate surface.
- **Field errors appear inline at the field**, not in a toast or a dialog — the
  error must sit where the fix happens.

## 5. State is part of structure, not a visual afterthought

Material treats interaction **states** as a first-class system. At wireframe time,
enumerate the states each interactive node can be in; do not defer them to visual
design. Material's states map cleanly to `interaction-states.json`:

| Material state | Repo token | Note |
| --- | --- | --- |
| enabled | `default` | The baseline |
| hover | `hover` | Pointer only; one at a time in a layout |
| focus | `focus` | Keyboard; one at a time; must be reachable by Tab |
| pressed | `active` | Momentary on tap/click/key |
| selected / activated | `selected` | Persistent choice within a set |
| disabled | `disabled` | Can't be focused, pressed, or hovered — so don't rely on it to convey required info |

Beyond Material's interaction states, a blueprint also owns **content/process
states** the visual layer can't infer: `loading`, `error`, `success`, and `empty`
for any data-driven node. These belong in the wireframe because they change
*structure*, not just appearance.

## 6. Density and hierarchy are deliberate choices

Material ties density to context: low-density content suits multi-pane and wide
layouts; high-density content does not (a two-pane medium layout with dense
content hurts usability). Decide density per context rather than defaulting to one
rhythm everywhere — uniform density is what flattens hierarchy. Keep text columns
to roughly **40–60 characters** so reading order stays legible as panes resize.

## 7. Labels are part of the structure

Material keeps action labels brief and specific (one to three words, a concrete
verb). A wireframe should carry real, specific labels for load-bearing controls
and regions for the same reason: the label is what a reader uses to understand the
structure. Generic labels (`Submit`, `Learn more` everywhere) hide intent.

## Vocabulary mapping (Material → UIBlueprint)

Use this when translating Material references into approved tokens so the blueprint
stays inside its controlled vocabulary:

| Material term | Repo token |
| --- | --- |
| snackbar | `toast` |
| banner | `banner` |
| basic / full-screen dialog | `dialog` |
| navigation drawer, modal drawer, bottom sheet | `drawer` |
| menu, popover | `popover` |
| top / bottom app bar | `stickyBar`, `header` |
| navigation bar / rail / drawer | navigation node + size-class swap |
| pressed state | `active` state |
| list-detail / supporting pane | `splitContent` layout |
| feed | `cardGrid` layout |

## How this relates to the other references

- `wireframe-best-practices.md` — the practice checklist; start there for any
  single wireframe.
- This file — the *why*, with a mature system as the worked precedent; reach for
  it when a decision is contested or when defining a taste profile.
- Both stop at structural fidelity. Color, type, motion, and code are owned by
  downstream visual-taste tooling, not this repository.

## Sources

Distilled and paraphrased from Material Design 3 foundations (layout / window size
classes, interaction states, navigation) and component guidelines (dialogs,
snackbars). Original wording is not reproduced; these are principles, restated for
this repository's structural layer.
