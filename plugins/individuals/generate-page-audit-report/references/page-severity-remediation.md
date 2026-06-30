# Page Severity And Remediation

Use this reference to turn page-level observations into prioritized findings.
Page audit severity follows the page's primary job: if the issue prevents the
user from understanding, trusting, acting, or recovering, severity rises.

## Decision Heuristics

- Start with the page purpose, audience, primary user goal, and primary action.
- Evaluate first-viewport orientation before lower-page polish because it frames
  every later decision.
- Judge section order by the user's decision journey, not by template convention.
- Tie severity to task impact: blocked action, missing proof, unclear hierarchy,
  broken responsive priority, inaccessible behavior, or misleading content.
- Prefer structural, content, and interaction fixes over aesthetic preferences.
- Keep specialist checks in their lane. The page audit can identify the risk and
  hand it off rather than pretending to run a full interaction, accessibility, or
  SEO audit.

## Severity Model

| Severity | Use When | Example |
| --- | --- | --- |
| `critical` | The page cannot satisfy its core intent or blocks the primary task | Checkout page has no viable checkout path |
| `high` | A primary workflow is likely blocked, misleading, inaccessible, or trust-breaking | Service page asks for booking before explaining service, proof, or eligibility |
| `medium` | The page can work but hierarchy, proof, CTA cadence, or responsive priority creates likely friction | Hero CTA is clear but no proof appears before a high-stakes commitment |
| `low` | The page is understandable but handoff, content, or section rationale is weak | FAQ exists but is placed before users know the offer |
| `info` | Contextual observation with no required corrective action | Strong page pattern worth preserving |

## Page Audit Checks

- Primary goal: one page job and one identifiable primary action.
- First viewport: orientation, promise, primary action, and appropriate proof.
- Section order: promise, proof, detail, comparison, objection handling, action,
  and recovery in a sequence that fits the page type.
- Content evidence: representative copy, labels, proof, and next-step clarity.
- CTA cadence: repeated actions only after new evidence or context.
- Interaction fit: overlays, sticky UI, forms, and disclosure patterns are
  justified and have clear contracts.
- Accessibility basics: landmarks, headings, labels, focus-sensitive overlays,
  and mobile access are represented enough for handoff.
- Responsive priority: mobile preserves required content and actions.

## Remediation Patterns

| Issue | Typical Severity | Structural Fix |
| --- | --- | --- |
| No clear page job | high | Restate the page promise and primary action in the hero or first meaningful section |
| Competing primary CTAs | medium to high | Pick one primary action and demote or sequence alternatives |
| Missing trust before high-friction action | medium to high | Add proof, process, eligibility, or risk-reducer before commitment |
| Decorative section with no role | low to medium | Remove it or give it a content role tied to the user journey |
| Uniform section density | medium | Vary section weight so priority and proof are legible |
| Mobile hides primary action | high | Preserve the action or document an equivalent mobile path |
| Form, overlay, or state path is incomplete | medium to high | Hand off to interaction or accessibility audit and add missing states/contracts |

## Anti-Pattern

Bad: "The page feels generic."

Corrected: "The first three sections use equal-weight feature cards and no proof
before the booking CTA. This is medium severity because the page asks users to
book a healthcare consultation before establishing trust. Add one proof section
or outcome/process block before the second CTA and reduce equal-card repetition."

## Worked Example

```json
{
  "id": "booking-page-missing-early-proof",
  "title": "Booking CTA appears before trust evidence",
  "severity": "medium",
  "category": "conversion",
  "target": "main.hero + main.services",
  "evidence": "The hero and next section both push booking, but patient proof, process, insurance support, or outcomes appear only near the bottom.",
  "impact": "Users are asked to commit before the page answers trust and risk questions, which can reduce consultation completion.",
  "recommendation": "Move one proof or process section directly after the hero and repeat the booking CTA only after that new evidence.",
  "handoff": "page-wireframe-planner"
}
```

## Hand-Off

Use `page-wireframe-planner` for structural redesign, `section-wireframe-planner`
for section anatomy, `generate-interaction-audit-report` for stateful behavior,
`generate-accessibility-audit-report` for accessibility risks,
`generate-seo-audit-report` for metadata and search intent, and
`layout-specification` for layout or responsive-priority fixes.
