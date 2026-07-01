---
name: study-ui-capture
description: Capture reliable visual evidence for UI study workflows, including screenshots, motion frames, readiness checks, blank-frame rejection, and capture manifests.
license: See repository LICENSE
---

# Study UI Capture

Use this skill when a page, section, component, element, flow, or captured UI
needs reliable screenshot and frame evidence before downstream study skills
analyze it. Also use it for "study visual experience" requests before motion
analysis.

## Purpose

Produce trustworthy visual evidence and a capture manifest for UI study. This
skill owns browser readiness, viewport presets, screenshot paths, motion-frame
paths, failed-capture records, and source gaps.

## Philosophy

Capture is evidence acquisition, not interpretation. A screenshot that is
blank, still loading, blocked by an overlay, or taken at the wrong scroll state
should be recorded as a capture failure or source gap instead of being treated
as visual truth. The manifest should make downstream study repeatable and make
missing evidence visible.

## Evidence Discipline

Every capture must record the source, viewport, page slug, output path, capture
reason, readiness outcome, timestamp, status, and any failure reason. Motion
frames must also record scroll progress or interaction state. Do not silently
discard failed screenshots; store failed capture metadata and, when useful, a
failed frame in the configured failed-capture directory.

## References

- `references/capture-evidence-contract.md`
- `references/capture-execution-contract.md`
- `../../../shared/workflows/study-capture-motion-routing.md`
- `../../../shared/workflows/visual-experience-agent-routing.md`
- `../../../shared/templates/ui-design-intelligence.config.yml`
- `../../../shared/templates/capture-manifest.example.json`

## Boundary

- Owns: screenshot capture planning, readiness checks, blank-frame QA, viewport
  presets, capture manifests, failed-capture storage, and artifact paths.
- Does not own: visual interpretation, motion analysis, design critique,
  structural specification, accessibility review, or final implementation.
- Hand off captured evidence to `study-ui-specification`,
  `study-ui-responsive-behavior`, `study-ui-interaction`,
  `study-ui-accessibility`, and `study-ui-motion`.

## Rules

1. Resolve artifact paths from `.ui-design-intelligence.yml` when present;
   otherwise use `artifacts/{project_brand}/{page}/`.
2. Store still screenshots under the configured page screenshot directory and
   motion frames under the configured motion screenshot directory.
3. Use readiness settings before capture: ready selectors, loader selectors,
   max wait, idle wait, retry count, viewport presets, and blank-frame
   rejection.
4. Treat a blank solid-color frame, active loader, missing target, blocked
   page, or capture timeout as a failed capture with a manifest entry.
5. Capture page, section, component, and element scopes with explicit source
   selectors or source notes when available.
6. Use deterministic file names for motion frames such as
   `{page}_frame_0001.jpeg`.
7. Preserve source gaps for pages, states, breakpoints, interactions, or scroll
   positions that could not be inspected.

## Anti-Patterns

- Blank-frame laundering: using a blank, loading, or failed screenshot as valid
  evidence.
- Flat artifact drift: writing page studies directly under `artifacts/*` when
  project/page scope is known.
- Path guessing: inventing output paths without checking the project config or
  stating the default resolution.
- Single-viewport certainty: studying responsive behavior from one viewport and
  treating it as complete.
- Motion collapse: replacing scroll-bound or animated evidence with one static
  screenshot.

## Workflow

1. Identify the requested scope: site, page, section, component, element, flow,
   state, viewport, or scroll position.
2. Use `../../../shared/workflows/study-capture-motion-routing.md` when capture
   is part of a `study-page`, `study-site`, or natural-language Codex request.
   Use `../../../shared/workflows/visual-experience-agent-routing.md` when
   role-level routing or handoff ownership is needed without runtime subagents.
3. Resolve the artifact root, project slug, page slug, screenshot directory,
   motion screenshot directory, failed-capture directory, and manifest path.
4. Follow `references/capture-execution-contract.md` for browser/tool
   selection, viewport iteration, readiness waits, retries, blank-frame
   rejection, naming, manifest updates, and failure reasons.
5. Capture required viewport stills and any requested states.
6. Capture scroll or motion frames when motion, canvas, WebGL, WebGPU, GSAP,
   React Spring, React Three Fiber, or scroll-reveal behavior is suspected.
7. Write or update the capture manifest with successful captures, failed
   captures, source gaps, and downstream handoff notes.
8. Hand the manifest and frame paths to the relevant study skills.

## Inline Example

```json
{
  "projectBrand": "oryzo",
  "page": "home",
  "captures": [
    {
      "id": "home-desktop-hero",
      "type": "screenshot",
      "status": "success",
      "sourceUrl": "https://oryzo.ai/",
      "viewport": { "name": "desktop", "width": 1440, "height": 1200 },
      "path": "artifacts/oryzo/home/.screenshots/home_desktop_hero.jpeg",
      "readyState": "content-ready",
      "capturedAt": "2026-07-01T00:00:00.000Z"
    },
    {
      "id": "home-desktop-scroll-0001",
      "type": "motion-frame",
      "status": "failed",
      "scrollProgress": 0.25,
      "path": "artifacts/oryzo/home/.screenshots/failed/home_frame_0001.jpeg",
      "failureReason": "blank-frame-rejected"
    }
  ],
  "sourceGaps": ["Mobile menu open state was not captured."]
}
```

## Hand-Offs

Hand still captures to `study-ui-specification`,
`study-ui-information-architecture`, `study-ui-storytelling`,
`study-ui-responsive-behavior`, `study-ui-interaction`, and
`study-ui-accessibility`. Hand scroll samples, animation frames, canvas/WebGL
evidence, and failed blank-frame notes to `study-ui-motion`.
