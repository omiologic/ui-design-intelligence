# Capture Evidence Contract

Use this reference when producing or reviewing capture artifacts for UI study.

## Artifact Resolution

Resolve paths in this order:

1. Project `.ui-design-intelligence.yml` values.
2. Explicit user-provided output paths.
3. Repository defaults:
   `artifacts/{project_brand}/{page}/`,
   `artifacts/{project_brand}/{page}/.screenshots/`, and
   `artifacts/{project_brand}/{page}/.motion_screenshots/`.

Project-level artifacts such as design-system seeds belong under
`artifacts/{project_brand}/`. Page, section, component, and element studies
belong under `artifacts/{project_brand}/{page}/`.

## Required Manifest Fields

Each capture manifest should include:

- `schemaVersion`
- `projectBrand`
- `page`
- `source`
- `config`
- `captures`
- `failedCaptures`
- `sourceGaps`
- `handoffs`

Each capture entry should include:

- `id`
- `type`
- `status`
- `sourceUrl` or `sourcePath`
- `viewport`
- `path`
- `capturedAt`
- `readyState`
- `captureReason`
- `scrollProgress` or `interactionState` when motion or state is involved

## Readiness Fields

Capture-ready configuration should expose:

- `readySelectors`
- `loaderSelectors`
- `maxWaitMs`
- `idleWaitMs`
- `retryCount`
- `rejectBlankFrames`
- `failedCaptureDir`
- `viewports`

## Failure Policy

Failed captures are part of the evidence record. Store the failure reason,
viewport, attempted path, readiness state, and any diagnostic frame path. Common
failure reasons are `timeout`, `loader-still-visible`, `target-not-found`,
`blank-frame-rejected`, `network-blocked`, `auth-blocked`, and
`unsupported-runtime`.
