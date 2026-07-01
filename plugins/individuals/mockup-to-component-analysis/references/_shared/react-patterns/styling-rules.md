# React Styling Rules

## General

- Match the mockup's visual intent, not every raw pixel.
- Use spacing consistently.
- Prefer design tokens when available.
- Keep class names meaningful.
- Avoid deeply nested selectors.
- Avoid fragile absolute positioning unless the design requires it.
- Make responsive behavior explicit.

## Preferred Styling Order

If the project has an existing design system, use it first.

If no system exists, prefer:

1. CSS variables for theme-level values.
2. CSS Modules, SCSS Modules, or regular SCSS when the project already uses
   them.
3. Utility classes when already used in the project.
4. Inline styles only for dynamic computed values.

Consumer conventions from `componentBuildConventionPath` may choose a project
styling approach, but they cannot remove accessibility, responsive behavior, or
UI/data boundary requirements.

## Spacing

Use a consistent spacing scale.

Example:

```css
--space-2: 0.5rem;
--space-3: 0.75rem;
--space-4: 1rem;
--space-6: 1.5rem;
--space-8: 2rem;
--space-12: 3rem;
```

## Responsive Rules

Every major layout should define:

- desktop behavior
- tablet behavior
- mobile behavior

For mobile:

- avoid fixed widths
- avoid tiny tap targets
- stack complex grids
- keep CTAs reachable
- preserve reading order

## Anti-Patterns

- Styling depends on exact source screenshot dimensions.
- Important content requires hover.
- Fixed widths break mobile layouts.
- Visual states rely only on color.
- Inline style objects are recreated every render without need.
