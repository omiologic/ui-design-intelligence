# Design From User Information

Use this when the user provides business/product context but no prior study
artifact. Works for `{page}`, `{section}`, or `{component}` design.

## Order Of Execution

1. Gather brand and product context.
2. Generate design-system seed.
3. Create design spec.
4. Create style references.
5. Create user journey map.
6. Create wireframe.
7. Audit the first wireframe or design spec when quality risk is high.
8. Create prototype plan.
9. Generate prototype copy.
10. Package high-fidelity handoff inputs.

## Orchestration Commands

### 1. Gather Brand Info

```text
Gather brand information for:
- Project: {project-name}
- Scope: {page|section|component}
- Audience: {audience}
- Product/service: {product-or-service}
- Primary user goal: {goal}
- Brand attributes: {attributes}
- Existing constraints: {constraints}

Write assumptions and open questions before generation.
```

### 2. Design-System Seed

```text
/generate-design-system-seed
Input type: user-provided brief
Project: {project-name}
Scope: {page|section|component}
Brand info: {brand-info}
Audience: {audience}
Output directory: artifacts/{project_brand}/design-system
Create: design-system-seed.json and design-system-seed.md
```

### 3. Design Spec

```text
/create-design-spec
Context: {project-context}
Scope: {page|section|component}
Implementation audience: frontend engineer or implementation agent
Source truth:
- artifacts/{project_brand}/design-system/design-system-seed.json
- user-provided brief
Output directory: artifacts/{project_brand}/{page}/design-spec
Include layout intent, components, states, responsive behavior, accessibility,
open questions, and handoff notes.
```

### 4. Style References

```text
/generate-style-library
Style brief: {style-direction}
Source summary: user-provided brand attributes and design-system seed
Target category: {category}
Target library path: artifacts/{project_brand}/style-references
Create original style records, not copied site styles.
```

### 5. Content And User Journey

```text
/generate-user-journey-map
Industry/product: {industry-or-product}
Audience: {audience}
Primary user goal: {goal}
Page/flow/component scope: {scope}
Conversion or completion goal: {completion}
Source truth:
- user brief
- artifacts/{project_brand}/design-system/design-system-seed.json
Output directory: artifacts/{project_brand}/{page}/journey
```

### 6. Wireframe

```text
/create-wireframe
Scope: {page|section|component}
Audience: {audience}
Primary user goal: {goal}
Success action: {success-action}
Source truth:
- artifacts/{project_brand}/{page}/journey/journey-map.json
- artifacts/{project_brand}/{page}/design-spec/design-spec.md
- artifacts/{project_brand}/design-system/design-system-seed.json
Output directory: artifacts/{project_brand}/{page}/wireframe
```

### 7. Low-To-Medium Fidelity Prototype

Optional quality gate before prototype:

```text
/audit-page
Scope: {page|section|component}
Source truth:
- artifacts/{project_brand}/{page}/design-spec/design-spec.md
- artifacts/{project_brand}/{page}/wireframe/wireframe.json
Goal: catch hierarchy, clarity, accessibility, conversion, and state gaps before prototype planning
Output directory: artifacts/{project_brand}/{page}/audit-pre-prototype
```

```text
/create-prototype-plan
Source wireframe: artifacts/{project_brand}/{page}/wireframe/wireframe.json
Design spec: artifacts/{project_brand}/{page}/design-spec/design-spec.md
Key flows: {flows}
Viewport needs: {viewport-needs}
Output directory: artifacts/{project_brand}/{page}/prototype
```

### 8. Copy Content

```text
/generate-prototype-copy
Source content model or journey map: artifacts/{project_brand}/{page}/journey/journey-map.json
Source prototype config: artifacts/{project_brand}/{page}/prototype/prototype-config.json
Brand voice: artifacts/{project_brand}/design-system/design-system-seed.md
Screen IDs / node IDs: use IDs from wireframe and prototype config
Output directory: artifacts/{project_brand}/{page}/copy
```

Optional copy audit:

```text
/audit-prototype-copy
Source prototype content: artifacts/{project_brand}/{page}/copy/prototype-content.json
Source prototype config: artifacts/{project_brand}/{page}/prototype/prototype-config.json
Goal: check clarity, recovery language, CTA readiness, and brand voice fit
```

### 9. High-Fidelity Handoff Package

```text
Prepare implementation handoff for high-fidelity prototype:
- Design system: artifacts/{project_brand}/design-system/design-system-seed.json
- Style references: artifacts/{project_brand}/style-references
- Design spec: artifacts/{project_brand}/{page}/design-spec/design-spec.md
- Wireframe: artifacts/{project_brand}/{page}/wireframe/wireframe.json
- Prototype config: artifacts/{project_brand}/{page}/prototype/prototype-config.json
- Copy: artifacts/{project_brand}/{page}/copy/prototype-content.json
- Optional audits: artifacts/{project_brand}/{page}/audit-pre-prototype

Ask the implementation agent to build the high-fidelity prototype using these
artifacts as source truth.
```
