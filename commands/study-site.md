# Study Site

## Purpose

Study multiple pages as a site-level experience and identify shared story,
navigation, structure, and interaction patterns.

## Use When

- The user wants a site study before audit or blueprint work.
- Multiple URLs or page captures should be compared.

## Inputs

- Site URL, sitemap, page list, and externally captured pages.
- Optional capture metadata from `scripts/capture-url.mjs` for each page.
- Optional audience and business goal.

## Workflow

1. Use `ui-researcher` to identify site purpose and primary user journeys.
2. Use `ui-specification-analyst` to compare IA, templates, and reusable components.
3. Use `ui-interaction-analyst` to compare shared interactions and state patterns.
4. Use `accessibility-reviewer` to flag repeated structural accessibility risks.
5. Produce site-level synthesis and page-specific notes.

## Capture Decision

Sprint 001 does not include browser automation. `scripts/capture-url.mjs`
creates deterministic metadata for URL-based study inputs and references
externally captured screenshots, DOM exports, or notes.

## Outputs

- Site study summary.
- Repeated patterns and inconsistencies.
- Handoff notes for audit or blueprint work.

## Agents

- `ui-researcher`
- `ui-specification-analyst`
- `ui-interaction-analyst`
- `accessibility-reviewer`

## Skills

- Study UI skill family.
