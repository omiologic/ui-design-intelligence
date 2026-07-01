# Design From Studied Artifact References

Use this when the user has already studied a site, page, section, component, or
visual experience and wants a new design based on those artifacts.

## Order Of Execution

1. Read study artifacts and source gaps.
2. Optionally audit study artifacts when design risk or problem priority is
   unclear.
3. Extract or generate design-system seed.
4. Create design spec from studies and audits.
5. Create or recommend style references.
6. Create journey/content map.
7. Create wireframe from study artifacts.
8. Create prototype plan.
9. Generate prototype copy.
10. Package high-fidelity handoff inputs.

## Required Artifact References

Use whichever exist:

```text
artifacts/{project_brand}/{page}/page-study.md
artifacts/{project_brand}/{page}/capture-manifest.json
artifacts/{project_brand}/{page}/visual-experience-spec.md
artifacts/{project_brand}/design-system/design-system-seed.json
artifacts/{project_brand}/style-references/*
```

## Orchestration Commands

### 1. Confirm Study Evidence

```text
Review studied artifact references:
- Page study: artifacts/{project_brand}/{page}/page-study.md
- Capture manifest: artifacts/{project_brand}/{page}/capture-manifest.json
- Visual experience spec: artifacts/{project_brand}/{page}/visual-experience-spec.md
- Source gaps: list all gaps before generation

Do not copy the studied site. Extract reusable structure, constraints, and
principles only.
```

### 2. Design-System Seed

Optional audit gate:

```text
/audit-page
Scope: {page|section|component}
Source truth:
- artifacts/{project_brand}/{page}/page-study.md
- artifacts/{project_brand}/{page}/capture-manifest.json
- artifacts/{project_brand}/{page}/visual-experience-spec.md
Goal: identify severity-ranked risks before creating a new design
Output directory: artifacts/{project_brand}/{page}/audit-design-inputs
```

```text
/generate-design-system-seed
Input type: study output and capture evidence
Source truth:
- artifacts/{project_brand}/{page}/page-study.md
- artifacts/{project_brand}/{page}/capture-manifest.json
- artifacts/{project_brand}/{page}/visual-experience-spec.md
Output directory: artifacts/{project_brand}/design-system
Create or update: design-system-seed.json and design-system-seed.md
```

### 3. Design Spec

```text
/create-design-spec
Scope: {page|section|component}
Implementation audience: frontend engineer or implementation agent
Source truth:
- artifacts/{project_brand}/{page}/page-study.md
- artifacts/{project_brand}/{page}/visual-experience-spec.md
- optional artifacts/{project_brand}/{page}/audit-design-inputs
- artifacts/{project_brand}/design-system/design-system-seed.json
Output directory: artifacts/{project_brand}/{page}/design-spec
Include source gaps, audit priorities, and originality guardrails.
```

### 4. Style References

```text
/generate-style-library
Style brief: abstract style principles from studied artifacts
Source summary:
- visual-experience-spec.md
- design-system-seed.md
Target category: {category}
Target library path: artifacts/{project_brand}/style-references
Preserve provenance and avoid exact reference-site copying.
```

### 5. Journey Map

```text
/generate-user-journey-map
Audience: from page-study.md or user brief
Primary user goal: from studied artifacts
Scope: {page|section|component}
Source truth:
- artifacts/{project_brand}/{page}/page-study.md
- artifacts/{project_brand}/{page}/visual-experience-spec.md
Output directory: artifacts/{project_brand}/{page}/journey
```

### 6. Wireframe From Artifacts

```text
/create-wireframe
Scope: {page|section|component}
Source truth:
- artifacts/{project_brand}/{page}/page-study.md
- artifacts/{project_brand}/{page}/journey/journey-map.json
- artifacts/{project_brand}/{page}/design-spec/design-spec.md
- artifacts/{project_brand}/design-system/design-system-seed.json
Output directory: artifacts/{project_brand}/{page}/wireframe
```

### 7. Prototype Plan

```text
/create-prototype-plan
Source wireframe: artifacts/{project_brand}/{page}/wireframe/wireframe.json
Design spec: artifacts/{project_brand}/{page}/design-spec/design-spec.md
Motion constraints: artifacts/{project_brand}/{page}/visual-experience-spec.md
Output directory: artifacts/{project_brand}/{page}/prototype
```

### 8. Prototype Copy

```text
/generate-prototype-copy
Source content model or journey map: artifacts/{project_brand}/{page}/journey/journey-map.json
Source prototype config: artifacts/{project_brand}/{page}/prototype/prototype-config.json
Brand voice: artifacts/{project_brand}/design-system/design-system-seed.md
Output directory: artifacts/{project_brand}/{page}/copy
```

### 9. High-Fidelity Handoff Package

```text
Prepare implementation handoff:
- design-system-seed.json
- style reference records
- design-spec.md
- optional audit-design-inputs findings
- visual-experience-spec.md
- wireframe.json
- prototype-config.json
- prototype-content.json

Use studied artifacts as evidence and guardrails, not as a direct visual copy.
```
