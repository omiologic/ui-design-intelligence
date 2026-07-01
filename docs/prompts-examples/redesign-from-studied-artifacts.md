# Redesign From Studied Artifact References

Use this when a prior study already exists and the user wants a redesigned
`{page}`, `{section}`, or `{component}` based on that evidence.

## Order Of Execution

1. Read studied artifacts and source gaps.
2. Audit the studied artifact against the redesign problem.
3. Convert audit findings into redesign requirements.
4. Update design-system seed and design spec.
5. Create or update style references.
6. Create revised journey map.
7. Create redesigned wireframe from artifact files.
8. Audit the redesigned wireframe against the original problem.
9. Create prototype plan.
10. Generate revised copy.
11. Package high-fidelity handoff inputs.

## Artifact Inputs

```text
artifacts/{project_brand}/{page}/page-study.md
artifacts/{project_brand}/{page}/capture-manifest.json
artifacts/{project_brand}/{page}/visual-experience-spec.md
artifacts/{project_brand}/{page}/audit/*
artifacts/{project_brand}/design-system/design-system-seed.json
```

## Orchestration Commands

### 1. Evidence Review

```text
Review existing artifacts:
- Page study: artifacts/{project_brand}/{page}/page-study.md
- Capture manifest: artifacts/{project_brand}/{page}/capture-manifest.json
- Visual experience spec: artifacts/{project_brand}/{page}/visual-experience-spec.md
- Existing design system: artifacts/{project_brand}/design-system/design-system-seed.json

List source gaps before redesign. Do not treat missing states as observed.
```

### 2. Problem-Focused Audit

```text
/audit-page
Scope: {page|section|component}
Problem to solve: {problem}
Source truth:
- artifacts/{project_brand}/{page}/page-study.md
- artifacts/{project_brand}/{page}/capture-manifest.json
- artifacts/{project_brand}/{page}/visual-experience-spec.md
Output directory: artifacts/{project_brand}/{page}/audit-redesign
```

If motion or visual experience is part of the problem:

```text
/study-visual-experience
Source: artifacts/{project_brand}/{page}/capture-manifest.json
Existing visual spec: artifacts/{project_brand}/{page}/visual-experience-spec.md
Problem to solve: {motion-or-visual-problem}
Output directory: artifacts/{project_brand}/{page}/visual-experience-redesign
```

### 3. Design Foundation Update

Convert audit findings before generation:

```text
Summarize redesign requirements from audit:
- Must fix: {high-severity findings}
- Should improve: {medium-severity findings}
- Preserve: {working patterns from study}
- Do not copy: {reference-specific patterns}
- Source gaps: {unknown states or missing captures}
```

```text
/generate-design-system-seed
Input type: studied artifacts plus redesign audit
Source truth:
- artifacts/{project_brand}/{page}/audit-redesign
- artifacts/{project_brand}/{page}/visual-experience-spec.md
- artifacts/{project_brand}/design-system/design-system-seed.json
Output directory: artifacts/{project_brand}/design-system
Update seed with confidence notes.
```

```text
/create-design-spec
Scope: {page|section|component}
Implementation audience: frontend engineer or implementation agent
Source truth:
- artifacts/{project_brand}/{page}/audit-redesign
- artifacts/{project_brand}/{page}/visual-experience-spec.md
- artifacts/{project_brand}/design-system/design-system-seed.json
Output directory: artifacts/{project_brand}/{page}/design-spec-redesign
```

### 4. Style References

```text
/recommend-style
Need: style direction that solves {problem}
Source:
- design-system-seed.json
- visual-experience-spec.md
- audit-redesign findings
Output: recommended style reference candidates and rationale
```

```text
/generate-style-library
Style brief: accepted redesign style direction
Source summary: audit-redesign and visual-experience-spec principles
Target category: {category}
Target library path: artifacts/{project_brand}/style-references
```

### 5. Revised Journey Map

```text
/generate-user-journey-map
Audience: from studied artifacts
Primary user goal: from studied artifacts
Problem to solve: {problem}
Source truth:
- page-study.md
- audit-redesign findings
- visual-experience-spec.md
Output directory: artifacts/{project_brand}/{page}/journey-redesign
```

### 6. Redesigned Wireframe From Artifacts

```text
/create-wireframe
Scope: {page|section|component}
Source truth:
- artifacts/{project_brand}/{page}/page-study.md
- artifacts/{project_brand}/{page}/audit-redesign
- artifacts/{project_brand}/{page}/journey-redesign/journey-map.json
- artifacts/{project_brand}/{page}/design-spec-redesign/design-spec.md
Output directory: artifacts/{project_brand}/{page}/wireframe-redesign
```

### 7. Prototype Plan

Audit revised wireframe before prototype planning:

```text
/review-generated-wireframe
Wireframe: artifacts/{project_brand}/{page}/wireframe-redesign/wireframe.json
Source audit: artifacts/{project_brand}/{page}/audit-redesign
Goal: verify the redesign addresses the original problem without introducing new structural risks
```

```text
/create-prototype-plan
Source wireframe: artifacts/{project_brand}/{page}/wireframe-redesign/wireframe.json
Design spec: artifacts/{project_brand}/{page}/design-spec-redesign/design-spec.md
Motion constraints: artifacts/{project_brand}/{page}/visual-experience-spec.md
Key flows: flows affected by {problem}
Output directory: artifacts/{project_brand}/{page}/prototype-redesign
```

### 8. Revised Prototype Copy

```text
/generate-prototype-copy
Source content model or journey map: artifacts/{project_brand}/{page}/journey-redesign/journey-map.json
Source prototype config: artifacts/{project_brand}/{page}/prototype-redesign/prototype-config.json
Brand voice: artifacts/{project_brand}/design-system/design-system-seed.md
Output directory: artifacts/{project_brand}/{page}/copy-redesign
```

### 9. High-Fidelity Handoff Package

```text
Prepare artifact-backed redesign handoff:
- page-study.md
- capture-manifest.json
- visual-experience-spec.md
- audit-redesign findings
- design-system-seed.json
- style reference records
- design-spec-redesign/design-spec.md
- wireframe-redesign/wireframe.json
- wireframe review findings
- prototype-redesign/prototype-config.json
- copy-redesign/prototype-content.json

Ask implementation to solve the documented problem while preserving evidence
constraints and originality guardrails.
```
