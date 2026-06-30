# Style Application Audit

## Decision Heuristics

Audit by asking whether the style is appropriate for the target scope, whether
it preserves required decisions, and whether it creates accessibility or brand
trust risks.

### Compatibility Criteria

Industry fit:

- Healthcare, finance, legal, and public-service contexts should default to
  subtle or medium intensity unless the brief explicitly accepts expressive
  risk.
- Developer tools, creator products, education, and campaign pages can support
  stronger visual personality when task clarity remains intact.
- Luxury and hospitality can support editorial or historical styles when
  readability and conversion paths stay clear.

Scope fit:

- Site-wide application requires broad brand compatibility and accessible global
  tokens.
- Page and section application must not rewrite unrelated global seed values.
- Component application must preserve component anatomy, state clarity, labels,
  focus behavior, and target size.
- Prototype application must remain behavior vocabulary, not runtime code.

Component fit:

- Dense forms, tables, and operational dashboards should reject decorative
  treatments that reduce scan speed.
- Dialogs, drawers, and overlays require contrast, focus containment, dismissal,
  and readable labels before any surface style.
- Badges and status labels must preserve semantic meaning and not rely on color
  alone.

Brand-tone fit:

- The style must support the promised brand tone. A raw, playful, or futuristic
  style should be rejected or reduced when the brief needs calm trust,
  institutional authority, or clinical clarity.

### Audit Failure Criteria

Flag or reject when any of these are present:

- Overpowering intensity: the style dominates the user task or brand message.
- Low contrast: text, icons, labels, focus rings, or status states become hard
  to read.
- Incompatible industry/style fit: the style weakens trust for the audience or
  product category.
- Scope drift: a section/component request changes page or site-wide rules.
- Preserve contradiction: patch changes a seed value listed in `preserve`.
- Accessibility regression: focus, keyboard, touch target, reduced-motion,
  labels, validation, or reading order get weaker.
- Source risk: external prose appears copied or source/license notes are
  missing.

### Severity Guidance

- High: low contrast on critical text, broken state clarity, copied source
  prose, or preserve-rule contradiction.
- Medium: overuse, questionable industry fit, unclear component mapping, or
  missing avoid rules.
- Low: wording ambiguity, minor mismatch between style mood and target, or
  incomplete implementation hints.

## Anti-Pattern

Do not approve a visually interesting treatment that changes unrelated scopes,
overpowers the brief, or removes clear interaction states.

## Worked Example

A glassmorphism component patch for a dialog should fail if it makes form fields
transparent, drops text contrast, or applies blur to the whole page.

A neo-brutalism badge-system patch should fail if it changes status semantics,
uses color as the only differentiator, or makes badge labels too small for
scanning. It may pass if it preserves semantic labels and only strengthens
border, contrast, and active/selected states.

## Hand-Off

Approved artifacts move to design-system mapping or local generation. Rejected
artifacts return with concrete required changes.
