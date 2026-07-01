# Capture Manifest Consumption

Use this workflow when a study skill receives `capture-manifest.json` from
`study-ui-capture`.

## Evidence Priority

Treat the manifest as the evidence index for screenshots, motion frames, failed
captures, viewport coverage, interaction states, and source gaps.

Evidence order:

1. Successful captures with matching source, viewport, scope, and state.
2. Supplied recordings, DOM exports, or implementation notes.
3. Failed captures and source gaps.
4. Inference from visible controls or common UI conventions.

Do not upgrade failed captures or source gaps into observed findings.

## Fields To Inspect

- `source`
- `config.pageDir`
- `config.screenshotDir`
- `config.motionScreenshotDir`
- `captures`
- `failedCaptures`
- `sourceGaps`
- `handoffs`

For each capture, inspect:

- `id`
- `type`
- `status`
- `viewport`
- `path`
- `captureReason`
- `scrollProgress`
- `interactionState`
- `readyState`
- `failureReason`

## Consumer Rules

- Specification study uses successful still captures for visible structure and
  treats failed captures/source gaps as missing sections, states, or scopes.
- Responsive study compares viewport-specific captures and treats missing
  breakpoints or failed mobile/tablet captures as explicit gaps.
- Interaction study uses interaction-state captures for observed states and
  treats failed state captures as missing trigger, target, feedback, or recovery
  evidence.
- Accessibility study uses failed focus, keyboard, overlay, reduced-motion, or
  blocked captures as unverified accessibility evidence, not confirmed failure.
- Storytelling study uses available captures to sequence visible narrative and
  treats missing lower-page, CTA-destination, or proof captures as narrative
  source gaps.
- Information architecture study uses capture coverage to map navigation and
  hierarchy, and treats missing collapsed menus, search, route, or page captures
  as IA gaps.

## Output Requirement

When a study consumes a capture manifest, include:

- Manifest path.
- Captures used.
- Failed captures that limit conclusions.
- Source gaps that affect findings.
- Handoffs for missing evidence that needs more capture.
