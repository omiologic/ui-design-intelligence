# Site Severity And Remediation

Use this reference to turn cross-page observations into prioritized site
findings. A site finding should identify the repeated pattern, affected pages or
journeys, user impact, and system-level fix.

## Decision Heuristics

- Start with primary journeys across pages: orientation, navigation,
  comparison, conversion or contact, support, and recovery.
- Prioritize repeated patterns over isolated page defects when they affect the
  same journey or template family.
- Judge information architecture by labels, navigation consistency, page
  relationships, orphaned pages, and findability.
- Judge template consistency by repeated components, CTA labels, forms,
  metadata, headings, and responsive behavior.
- Escalate severity when cross-page inconsistency blocks comparison, contact,
  checkout, booking, account, support, or makes page intent unrecoverable.
- Preserve representative page evidence so the finding can be traced and fixed.

## Severity Model

| Severity | Use When | Example |
| --- | --- | --- |
| `critical` | A core site journey cannot be completed across pages. | Contact, booking, checkout, or support path breaks across the templates that should complete it. |
| `high` | A repeated pattern blocks, misleads, or materially damages a primary journey. | Navigation labels and order change across service pages while CTA placement hides the contact path. |
| `medium` | Cross-page inconsistency creates likely friction, but the journey remains recoverable. | Multiple templates use different CTA labels for the same next action. |
| `low` | The pattern is understandable but weakens system consistency or handoff quality. | Footer support labels differ slightly across related page groups. |
| `info` | The observation is contextual and worth preserving without immediate remediation. | A newer template family is more consistent than legacy pages and should become the model. |

## Site Audit Checks

- Information architecture, navigation labels, and navigation order.
- Page relationships, hubs, details, supporting pages, and orphaned pages.
- Journey continuity across discovery, comparison, decision, action, and
  recovery steps.
- Template consistency across page groups and repeated section roles.
- Repeated component anatomy, including cards, forms, accordions, search, and
  filters.
- CTA naming, placement, cadence, and whether the same action has the same
  label.
- Metadata, title, summary, and page intent consistency across related pages.
- Responsive equivalence across key templates, especially primary actions and
  navigation.
- Repeated accessibility or interaction risks that should be fixed at the
  component or template level.

## Remediation Patterns

| Pattern | Remediation |
| --- | --- |
| Inconsistent navigation labels or order | Define a site taxonomy and apply canonical labels and ordering across shared navigation surfaces. |
| Orphaned key page | Add a route from the relevant hub, global navigation, contextual section, or footer support path. |
| CTA labels vary for the same action | Choose a canonical action role and label set, then apply it across the affected template group. |
| Repeated component drift | Define the shared component or section anatomy before adjusting individual pages. |
| Duplicate or vague metadata across related pages | Make metadata page-specific while preserving the page group's shared intent and vocabulary. |
| Mobile hides primary actions on multiple templates | Define mobile priority rules for navigation, sticky actions, and first-screen content. |
| Same journey uses different form, error, or recovery models | Standardize form states, validation, error messaging, and recovery routes. |
| Repeated generic layouts hide page differences | Give each page type a clear structural role while keeping shared navigation and action contracts consistent. |

## Anti-Pattern

Bad: "The site feels inconsistent."

Corrected: "`/services/*` pages use three labels for consultation booking, two
navigation orders, and inconsistent contact placement. This creates a
site-level journey issue because users comparing services cannot predict how to
request care."

## Worked Example

```json
{
  "id": "service-pages-inconsistent-booking-path",
  "auditType": "site",
  "title": "Service pages use inconsistent booking paths",
  "severity": "high",
  "category": "conversion",
  "target": "service page template group",
  "evidence": "The implants page uses \"Book consultation\", the emergency page uses \"Call now\", the cleaning page hides contact below FAQ, and navigation order differs between service pages.",
  "impact": "Users comparing services cannot predict how to request care, increasing abandonment and support burden.",
  "recommendation": "Define one booking/contact action model for service pages, keep canonical CTA labels, and place the primary contact path consistently after service proof and FAQ.",
  "handoff": "generate-page-audit-report"
}
```

## Hand-Off

- Use `generate-page-audit-report` for page-specific remediation after the
  repeated site pattern is named.
- Use `generate-interaction-audit-report` for repeated state, form, flow, or
  recovery issues.
- Use `generate-accessibility-audit-report` for repeated accessibility risks.
- Use `generate-seo-audit-report` for duplicated or conflicting metadata,
  intent, and search presentation issues.
- Use `study-ui-information-architecture` when navigation, taxonomy, page
  relationships, or orphaned pages need deeper mapping before audit.
- Use deterministic commands only for checks such as duplicate metadata,
  missing shared blueprint fields, or cross-page blueprint consistency.
