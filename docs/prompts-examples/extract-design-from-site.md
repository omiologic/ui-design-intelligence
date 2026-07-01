# Extract Design From Site

Use this when the goal is to study a real site and extract reusable design
intelligence without copying the site's exact design.

## Output Goal

Create reusable artifacts such as:

- `capture-manifest.json`
- `page-study.md` or site study notes
- `visual-experience-spec.md`
- `design-system-seed.json`
- style reference records
- UI pattern records
- copy/journey pattern records

## Order Of Execution

1. Capture and study the site.
2. Study visual experience when motion, scroll, canvas, WebGL, or transitions
   matter.
3. Generate a design-system seed from evidence.
4. Extract reusable style references.
5. Extract reusable UI patterns.
6. Extract reusable copy and journey patterns.
7. Index the knowledge base.
8. Use the indexed knowledge for future design or redesign.

## Orchestration Commands

### 1. Study The Site Or Page

For one page:

```text
/study-page
Source: {url-or-local-capture}
Project/brand slug: {project_brand}
Page slug: {page}
Scope: {page|section|component}
Output directory: artifacts/{project_brand}/{page}
Use capture when evidence is missing, stale, loader-prone, or incomplete.
```

For multiple pages:

```text
/study-site
Site: {site-url}
Project/brand slug: {project_brand}
Pages: {page-list-or-sitemap}
Output root: artifacts/{project_brand}
Capture each page under artifacts/{project_brand}/{page}
```

### 2. Study Visual Experience

Use this when the site relies on motion, scroll choreography, color
transitions, canvas, WebGL/WebGPU, GSAP, React Spring, React Three Fiber, or
scroll reveal effects.

```text
/study-visual-experience
Source: {url-or-capture-manifest}
Project/brand slug: {project_brand}
Page slug: {page}
Scope: {page|section|component}
Output directory: artifacts/{project_brand}/{page}
Create or update:
- capture-manifest.json
- .screenshots/
- .motion_screenshots/
- visual-experience-spec.md
```

### 3. Extract Design System

```text
/generate-design-system-seed
Input type: site study, capture evidence, and visual experience evidence
Source truth:
- artifacts/{project_brand}/{page}/page-study.md
- artifacts/{project_brand}/{page}/capture-manifest.json
- artifacts/{project_brand}/{page}/visual-experience-spec.md
Output directory: artifacts/{project_brand}/design-system
Create: design-system-seed.json and design-system-seed.md
```

### 4. Extract Style References

```text
/generate-style-library
Style brief: abstract reusable style principles from the studied site
Source summary:
- artifacts/{project_brand}/{page}/visual-experience-spec.md
- artifacts/{project_brand}/design-system/design-system-seed.md
Target category: {category}
Target library path: artifacts/{project_brand}/style-references
Do not copy exact site design, assets, choreography, copy, or brand signatures.
```

### 5. Extract UI Pattern Knowledge

```text
/extract-patterns-from-study
Study output:
- artifacts/{project_brand}/{page}/page-study.md
- artifacts/{project_brand}/{page}/capture-manifest.json
- artifacts/{project_brand}/{page}/visual-experience-spec.md
Audit findings: optional
Target knowledge path: artifacts/{project_brand}/ui-knowledge/patterns
Extraction scope: structure, responsive behavior, interactions, motion, IA, or conversion pattern
```

### 6. Extract Copy And Journey Patterns

```text
/extract-copy-patterns-from-study
Study output:
- artifacts/{project_brand}/{page}/page-study.md
- artifacts/{project_brand}/{page}/capture-manifest.json
Pattern type: copy, journey, objection, or voice
Target knowledge path: artifacts/{project_brand}/ui-knowledge/content
Do not copy protected wording; abstract reusable copy behavior.
```

### 7. Index Knowledge

```text
/index-knowledge-base
Knowledge path: artifacts/{project_brand}/ui-knowledge
Input records:
- artifacts/{project_brand}/ui-knowledge/patterns/**/*.pattern.json
- artifacts/{project_brand}/ui-knowledge/content/**
Output: artifacts/{project_brand}/ui-knowledge/index.json
```

### 8. Reuse Extracted Knowledge

```text
/search-ui-knowledge
Knowledge index: artifacts/{project_brand}/ui-knowledge/index.json
Brief: {new-page-section-component-brief}
Audience: {audience}
Goal: {goal}
Return relevant reusable patterns with confidence and recommended use.
```

## Quality Rules

- Study is evidence; extraction is abstraction.
- Preserve source references and confidence.
- Do not copy exact layouts, assets, copy, timing, or brand-specific visual
  signatures.
- Store source gaps next to the extracted knowledge.
- Prefer smaller patterns over broad site-level generalizations.
