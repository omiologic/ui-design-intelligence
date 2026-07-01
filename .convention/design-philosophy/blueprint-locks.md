# Blueprint Locks

Blueprint locks are page-level invariants declared before detailed structure.
They prevent locally reasonable nodes from producing a globally confused page.

## Required Locks

### Primary Goal Lock

Name the one user outcome the blueprint optimizes first.

Why: without a primary goal, every section can appear equally valid and the page
loses sequence.

### Primary Action Lock

Name the dominant action and keep CTA variants aligned to that action unless a
secondary path is intentionally declared.

Why: competing CTAs create structural ambiguity before visual design begins.

### Navigation Lock

Declare the navigation model: global nav, local nav, breadcrumb, sidebar, tabs,
or no navigation.

Why: multiple navigation systems without hierarchy create wayfinding conflict.

### Overlay Layer Lock

Declare whether overlays exist, what layer types are allowed, and which user
jobs justify them.

Why: overlays are easy to add and hard to reason about after the structure is
already fragmented.

### Evidence Lock

Declare what evidence supports the page's primary claim or task.

Why: proof placed late or far from claims weakens comprehension and trust.

### Responsive Lock

Declare what must remain first, grouped, persistent, or reachable on smaller
viewports.

Why: responsive behavior is structural. It should not be left to visual layout
alone.

## Lock Format

Use concise planning notes or metadata before writing final JSON:

```txt
primaryGoal: book-consultation
primaryAction: request-appointment
navigationModel: global-nav
overlayModel: contact-dialog-only
evidenceModel: reviews-and-insurance-proof-near-hero
responsivePriority: offer, action, proof, form
```
