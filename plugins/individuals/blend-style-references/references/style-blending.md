# Style Blending

## Decision Heuristics

Use a blend when multiple styles are genuinely needed. The primary style should
own the main structure and tone; secondary styles should own specific areas.

Use this normalized blend syntax:

```txt
primaryStyle: <style-id>
secondaryStyles:
  - <style-id>
ratio:
  - <primary-style-id>: 0.70
  - <secondary-style-id>: 0.30
scope: site | page | section | component | prototype
target: <target-id or label>
intensity: subtle | medium | strong | experimental
rules:
  - area: <palette | typography | layout | surfaces | components | motion>
    styleId: <style-id>
    rule: <what this style owns>
avoid:
  - <conflict or risk to prevent>
```

### Ratio Guidance

- Use 70/30 or 75/25 when one style should clearly lead.
- Use 60/40 only when both styles are compatible and the target is local.
- Avoid 50/50 blends unless a human brief explicitly accepts contradiction risk.
- Keep expressive secondary styles local, subtle, or component-scoped by
  default.

### Conflict Rules

Every blend must identify which style owns these areas when relevant:

- palette
- typography
- layout rhythm
- surface treatment
- component variants
- imagery or decorative motifs
- prototype motion and feedback

If both styles want the same area, choose one owner and put the other in `avoid`
or restrict it to a smaller target.

## Anti-Pattern

Do not merge styles by concatenating names. Without ratio and area rules, a
blend becomes an ambiguous prompt rather than a reusable contract.

## Worked Example

For "Japandi with subtle Glassmorphism," let Japandi own palette, spacing, and
type while Glassmorphism affects only the inquiry dialog surface at 25 percent.

For "Luxury Typography with Aurora in the hero," use `luxury-typography` as the
primary style at 70 percent for type scale, copy rhythm, and restraint. Use
`aurora` at 30 percent only for hero background atmosphere and subtle prototype
surface depth. Avoid gradient text, low contrast, and animated color fields
behind body copy.

## Hand-Off

Hand the blend to application and audit workflows before it is mapped into a
design-system seed or local style patch.
