# Visual Experience Spec

## Evidence Files

- Capture manifest: `artifacts/aurora-labs/home/capture-manifest.json`
- Still screenshots:
  - `artifacts/aurora-labs/home/.screenshots/home_desktop_page.jpeg`
  - `artifacts/aurora-labs/home/.screenshots/home_mobile_page.jpeg`
- Motion frames:
  - `artifacts/aurora-labs/home/.motion_screenshots/home_desktop_frame_0001.jpeg`
  - `artifacts/aurora-labs/home/.motion_screenshots/home_desktop_frame_0002.jpeg`
- Recordings or source notes: none supplied
- Source gaps:
  - Mobile scroll-bound canvas frame at 50% could not be captured.
  - Reduced-motion runtime behavior was not inspected.

## Palette Timeline

| Range Or State | Observed Palette | Transition | Confidence | Evidence |
| --- | --- | --- | --- | --- |
| 0%-10% | Deep charcoal field, cool blue highlights, white foreground copy | Static-to-slow glow increase | medium | `home_desktop_frame_0001.jpeg` |
| 40%-60% | Charcoal warms toward graphite, blue highlight shifts to green accent | Scroll-scrubbed background and accent transition | medium | `home_desktop_frame_0002.jpeg` |
| Mobile default | Same dark field with reduced visible background detail | Motion behavior incomplete | low | `home_mobile_page.jpeg`, source gap |

## Scroll Storyboard

| Frame | Scroll Progress | Section | Visual State | Motion Notes | Evidence |
| --- | ---: | --- | --- | --- | --- |
| 0001 | 0% | Hero | Brand copy sits over fixed dark canvas-like field | Background appears fixed while text begins in default state | `home_desktop_frame_0001.jpeg` |
| 0002 | 50% | Hero to proof transition | Foreground copy is partially replaced by proof cards | Pinned hero releases into next section; accent color changes | `home_desktop_frame_0002.jpeg` |
| mobile-gap | 50% | Hero | Mobile motion state unknown | Capture failed with `motion-state-unavailable` | `home_mobile_frame_0002.jpeg` diagnostic |

## Section State Map

| Section | Default State | Active Or Pinned State | Exit State | Viewport Notes | Gaps |
| --- | --- | --- | --- | --- | --- |
| Hero | Dark field, centered headline, primary CTA | Background remains visually fixed while copy advances | Proof cards enter as hero releases | Mobile preserves content hierarchy but motion sample is incomplete | Reduced-motion fallback unknown |
| Proof | Cards stack below hero | Cards receive accent highlight during transition | Cards become static grid | Mobile likely stacks cards in one column | Hover/tap state not inspected |

## Motion Fields

- Trigger: scroll
- Rendering layer: Canvas/WebGL unknown plus DOM text/cards
- Start state: fixed dark field with headline and CTA
- End state: proof cards visible with warmer graphite background and green accent
- Keyframes or sampled states: 0%, 50%, mobile default, mobile failed 50%
- Easing or physics: unknown; appears scrubbed to scroll
- Duration or scroll range: approximately hero 0%-60%
- Scrub: likely true
- Pin: hero appears pinned during early scroll
- Stagger: proof cards appear sequentially, confidence low
- Interaction states: default only
- Reduced-motion expectation: provide static dark hero and no pinned canvas
- Performance risks: fixed canvas/WebGL layer, scroll listener refresh, mobile frame failure
- Confidence: medium for desktop, low for mobile motion

## Captured Frame Index

| Frame ID | Path | Type | Viewport | Scroll Progress | Interaction State | Status |
| --- | --- | --- | --- | ---: | --- | --- |
| home-desktop-page | `artifacts/aurora-labs/home/.screenshots/home_desktop_page.jpeg` | screenshot | desktop 1440x1200 | 0 | default | success |
| home-mobile-page | `artifacts/aurora-labs/home/.screenshots/home_mobile_page.jpeg` | screenshot | mobile 390x1200 | 0 | default | success |
| home-desktop-frame-0001 | `artifacts/aurora-labs/home/.motion_screenshots/home_desktop_frame_0001.jpeg` | motion-frame | desktop 1440x1200 | 0 | default | success |
| home-desktop-frame-0002 | `artifacts/aurora-labs/home/.motion_screenshots/home_desktop_frame_0002.jpeg` | motion-frame | desktop 1440x1200 | 0.5 | pinned-hero-active | success |
| home-mobile-frame-0002 | `artifacts/aurora-labs/home/.motion_screenshots/home_mobile_frame_0002.jpeg` | motion-frame | mobile 390x1200 | 0.5 | pinned-hero-active | failed |

## Rendering Layer Ownership

| Region | Layer Owner | Evidence | Confidence | Notes |
| --- | --- | --- | --- | --- |
| Hero background | Canvas/WebGL unknown | Fixed visual field changes independently of DOM copy | medium | Confirm runtime before implementation |
| Hero copy and CTA | DOM/CSS | Text and button remain readable over background | high | Preserve contrast during palette transition |
| Proof cards | DOM/CSS with scroll reveal | Cards enter during hero release | medium | Stagger is inferred from sampled states |

## Design Quality Notes

The strongest reusable principle is the contrast between a quiet pinned visual
field and crisp foreground copy. The transition needs stable readability while
palette accents shift. Mobile evidence is incomplete, so a conservative mobile
implementation should reduce or remove the pinned canvas behavior until better
capture exists.

## Implementation Notes

- Candidate implementation: DOM content over a fixed canvas or WebGL layer.
- Provide a reduced-motion path with static background and no pinning.
- Test desktop and mobile scroll positions at 0%, 25%, 50%, 75%, and 100%.
- Avoid layout shifts when proof cards enter.
- Keep canvas layer isolated from text contrast and focus order.

## Originality Guardrails

Reuse the principle of a capture-backed pinned visual field with scroll-synced
palette changes. Do not copy the reference site's exact timing, exact color
values, exact canvas asset, copy, layout, or brand-specific choreography.
