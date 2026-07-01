# Capture Execution Contract

Use this reference when `study-ui-capture` must acquire or verify screenshots,
motion frames, failed captures, and capture manifests consistently.

## Tool Selection

Use the most direct browser control available for the environment:

1. Codex app browser or Chrome control when the task depends on a rendered page,
   current browser state, screenshots, or live interaction.
2. A repo-local browser script when one exists and already implements the
   required viewport, wait, screenshot, and manifest behavior.
3. Deterministic metadata scripts such as `scripts/capture-url.mjs` only when
   URL metadata is enough and no rendered visual evidence is required.
4. Supplied screenshots, recordings, DOM exports, or notes only when they are
   fresh enough for the requested scope and source gaps are recorded.

Do not claim a live capture succeeded when only metadata or a DOM summary was
collected.

## Path Setup

Before capturing, resolve:

- `artifactRoot`
- `projectBrand`
- `page`
- `pageDir`
- `screenshotDir`
- `motionScreenshotDir`
- `failedCaptureDir`
- `captureManifest`

Use `.ui-design-intelligence.yml` when present. Otherwise use
`artifacts/{project_brand}/{page}/` defaults.

Create or plan these directories before capture:

- `.screenshots/`
- `.motion_screenshots/`
- `.screenshots/failed/`

## Viewport Iteration

Capture each configured viewport independently. Default viewport order:

1. `desktop`
2. `tablet`
3. `mobile`

Each capture entry must record viewport `name`, `width`, and `height`. If a
viewport cannot be captured, add a failed capture or source gap instead of
omitting it silently.

## Readiness Algorithm

For each viewport and capture target:

1. Navigate to the source URL or load the local capture.
2. Wait for at least one configured `readySelectors` item when provided.
3. Wait for all configured `loaderSelectors` to disappear or become inactive.
4. Wait for `idleWaitMs` after the last visible loading or layout-changing
   event.
5. Stop waiting after `maxWaitMs`.
6. If readiness fails, retry until `retryCount` is exhausted.
7. If readiness still fails, write a failed capture entry.

Recommended default readiness values:

- `maxWaitMs`: `15000`
- `idleWaitMs`: `1500`
- `retryCount`: `3`
- `readySelectors`: `["main", "[data-ui-ready='true']"]`
- `loaderSelectors`: `[".loader", "[data-loading='true']", "[aria-busy='true']"]`

## Retry Behavior

Retries should repeat the full readiness sequence for the same viewport and
target. Record the final failure only unless intermediate failures reveal
different source gaps that matter. Never overwrite a successful capture with a
later failed attempt.

## Blank-Frame Rejection

When `rejectBlankFrames` is true, reject a screenshot or motion frame when:

- The image is a single solid or near-solid color.
- The frame contains only a loader/skeleton without target content.
- The expected target region is empty or transparent.
- Canvas/WebGL content is absent while the page shell is present.
- The frame is visually identical across multiple scroll positions where motion
  was expected, unless the source confirms no motion occurs.

When rejected, write a failed capture with `failureReason:
"blank-frame-rejected"` and store a diagnostic image under
`.screenshots/failed/` when available.

## Still Screenshot Naming

Use deterministic names:

```text
{page}_{viewport}_{scope}.jpeg
{page}_{viewport}_{scope}_{state}.jpeg
```

Examples:

```text
home_desktop_page.jpeg
home_mobile_nav-open.jpeg
pricing_desktop_hero.jpeg
```

## Motion Frame Naming

Use deterministic names:

```text
{page}_frame_{index}.jpeg
{page}_{viewport}_frame_{index}.jpeg
```

Frame indexes are one-based and zero-padded to four digits:

```text
home_desktop_frame_0001.jpeg
home_desktop_frame_0002.jpeg
```

Default scroll progress sampling:

- `0`
- `0.1`
- `0.25`
- `0.5`
- `0.75`
- `1`

Add frames at section boundaries, pinned-region start/end points, interaction
states, and animation key moments when visible.

## Manifest Update Semantics

Create `capture-manifest.json` if it does not exist. If it exists:

1. Preserve prior successful captures unless replacing the same `id` with a
   newer successful capture for the same source, viewport, target, and state.
2. Append new captures with stable `id` values.
3. Move failed attempts into `failedCaptures`.
4. Preserve `sourceGaps` unless later captures close the gap; when closing a
   gap, keep a short note in the relevant capture entry.
5. Preserve handoffs and append new handoffs when additional downstream study is
   required.

Each successful capture should include:

- `id`
- `type`
- `status: "success"`
- `sourceUrl` or `sourcePath`
- `viewport`
- `path`
- `captureReason`
- `readyState`
- `capturedAt`
- `scrollProgress` or `interactionState` when relevant

Each failed capture should include:

- `id`
- `type`
- `status: "failed"`
- `sourceUrl` or `sourcePath`
- `viewport`
- `attemptedPath`
- `diagnosticPath` when available
- `failureReason`
- `readyState`
- `capturedAt`

## Failure Reason Vocabulary

Use these values:

- `timeout`
- `loader-still-visible`
- `target-not-found`
- `blank-frame-rejected`
- `network-blocked`
- `auth-blocked`
- `unsupported-runtime`
- `capture-tool-unavailable`
- `viewport-unavailable`
- `interaction-state-unavailable`
- `motion-state-unavailable`

## Source Gaps

Record source gaps for missing pages, states, breakpoints, interactions, scroll
positions, motion frames, inaccessible URLs, authentication barriers, blocked
network access, unsupported runtime features, or capture-tool limitations.

Source gaps are not failures of the study. They are evidence boundaries that
downstream study must respect.
