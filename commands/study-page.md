# Study Page

## Purpose

Study a single page and produce evidence-backed notes about storytelling,
structure, interactions, responsive behavior, and accessibility risks.

## Use When

- The user provides a URL, screenshot, capture, or page description.
- The next step may be audit, SEO review, or blueprint generation.

## Inputs

- Page URL and externally captured page material.
- Optional capture metadata from `scripts/capture-url.mjs`.
- Optional audience, business goal, or conversion goal.

## Workflow

1. Use `ui-researcher` to identify audience, offer, proof, and primary journey.
2. Use `ui-specification-analyst` to inventory regions, sections, and components.
3. Use `ui-interaction-analyst` to analyze externally observed stateful behavior and overlays.
4. Use `accessibility-reviewer` to flag structural accessibility risks.
5. Summarize evidence and handoff recommendations.

## Capture Decision

Sprint 001 does not include browser automation. `scripts/capture-url.mjs`
creates a deterministic metadata envelope for a URL and optional externally
captured screenshots, DOM exports, or notes; it does not fetch the page.

## Outputs

- Page study notes.
- Evidence, interpretation, and handoff items.

## Agents

- `ui-researcher`
- `ui-specification-analyst`
- `ui-interaction-analyst`
- `accessibility-reviewer`

## Skills

- Study UI skill family.
