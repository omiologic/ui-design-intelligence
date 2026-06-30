# Specification Extraction Method

Use this reference to extract implementation-ready UI structure from captures or
descriptions without inventing unsupported blueprint detail.

## Core Principle

Specification study is structured extraction, not redesign. Capture visible
regions, nodes, labels, roles, states, responsive behavior, and assumptions in a
form that downstream blueprint skills can translate. If the evidence does not
support a node, state, or layout choice, mark it as inferred or missing.

## Extraction Template

For each page or screen, record:

- Source: page name, URL or route, viewport, capture date, and supplied context.
- Scope: page, section, component, overlay, state, or repeated pattern.
- Region: header, navigation, main, section, overlay, sticky UI, footer, or
  unknown.
- Candidate node type: observed or inferred UIBlueprint node type.
- Observed label: user-facing text, section title, control text, or neutral
  structural label.
- Content role: headline, body, label, helper text, error text, primary CTA,
  trust signal, metadata, price, badge, legal, or unknown.
- Children/anatomy: visible nested parts and repeated item structure.
- State evidence: selected, expanded, collapsed, open, closed, loading, empty,
  warning, error, success, disabled, or missing.
- Responsive evidence: preserved, reordered, collapsed, hidden, transformed, or
  missing.
- Accessibility evidence: visible labels, landmark cues, helper/error placement,
  focus/dismissal evidence, or missing.
- Assumptions: what the capture implies but does not prove.
- Handoff: schema, terminology, planner, interaction, accessibility, or final
  generator.

## Mapping Heuristics

- Use `page`, `header`, `main`, and `footer` only when the capture supports page
  scope or the requested output requires a page wrapper.
- Use `section` for a page region with one clear content purpose.
- Use `hero` only for the primary opener that orients the page or major offer.
- Use `contentGroup` or `textBlock` for grouped content that does not need a
  more specific node.
- Use `cardGrid` and `card` only when repeated items are peers with comparable
  anatomy.
- Use `form` and `inputGroup` when collecting input is visible.
- Use `dialog`, `drawer`, or `popover` only when an overlay surface is visible or
  supplied.
- Use `table` or `comparisonTable` when row/column relationships are the point.
- Use annotations or assumptions for uncertain node type, missing states, hidden
  content, and unresolved behavior.

## Evidence Categories

- Observed: visible structure, label, state, or relationship.
- Inferred: likely component purpose or node type based on visible affordance.
- Missing: hidden drawer contents, unopened overlay, offscreen content, untested
  state, DOM relationship, keyboard path, or unsupported responsive behavior.

## Anti-Patterns

- Visual over-specification: extracting colors, shadows, exact spacing, motion,
  or typography as if they belonged to structural blueprint work.
- Node inflation: every line of copy becomes a separate component.
- Node flattening: header, sections, controls, and repeated items lose
  containment relationships.
- Hidden uncertainty: inferred node types, states, labels, or responsive behavior
  are written as observed facts.
- Styling masquerading as layout: "premium card" or "large hero" replaces the
  structural job and anatomy.
- State omission: forms, overlays, data lists, and filters are inventoried only
  in default state.
- Invalid vocabulary drift: local names are copied when approved node types,
  roles, layouts, or states require normalization later.

## Command Decision

Schema validation is useful after extracted structure becomes example JSON or a
draft blueprint. It should not be run against raw study notes as if notes were
final config. A future command could validate generated extraction examples
against `study-output.schema.json` or validate translated blueprint JSON against
`wireframe-config.schema.json`. This skill does not need a subagent by default;
use separate extraction and validation passes only for large captures or release
fixtures.

## Worked Example

Input: product page capture with header navigation, image gallery, product
title, price, variant selector, add-to-cart button, shipping accordion, reviews
grid, and footer.

Extraction:

- Observed page regions: header, main product purchase area, support details,
  social proof, footer.
- Candidate nodes: `header`, `navigation`, `main`, product `section`,
  `contentGroup` for purchase details, `button` with `primaryCTA`, `accordion`
  for shipping details, `cardGrid` with repeated review `card`s, `footer`.
- Observed roles: title as headline, price as `price`, add-to-cart as
  `primaryCTA`, reviews as proof/testimonial content.
- Inferred: image gallery, variant selector, accordion, and review card
  components.
- Missing: add-to-cart loading/success/error state, cart drawer behavior,
  selected variant state, mobile ordering, and accessibility label details.
- Handoff: `study-ui-interaction` for cart and selector behavior,
  `component-wireframe-planner` for purchase controls, and
  `generate-ui-blueprint-from-study` for blueprint translation.
