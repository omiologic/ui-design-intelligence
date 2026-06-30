---
name: extract-ui-pattern-knowledge
description: Convert evidence-backed UI study and audit findings into reusable pattern knowledge records without copying exact page composition.
license: See repository LICENSE
---

# Extract UI Pattern Knowledge

Use this skill when study outputs or audit findings contain reusable structure,
behavior, hierarchy, conversion logic, accessibility constraints, or responsive
rules that should become tagged pattern records.

## Purpose

Extract reusable UI pattern knowledge from evidence-backed artifacts and emit
records shaped for `knowledge/schemas/pattern-record.schema.json`.

## Philosophy

Extraction is not summarization. A useful pattern abstracts from evidence into a
reusable rule while keeping enough source traceability to review why the pattern
exists. Do not copy a page. Preserve the observed evidence in study and audit
artifacts, then save only the reusable design intelligence as pattern knowledge.

## References

- `references/pattern-extraction.md`
- `../../../knowledge/schemas/pattern-record.schema.json`
- `../../../knowledge/vocabulary/pattern-types.json`
- `../../../knowledge/vocabulary/knowledge-tags.json`
- `../../../knowledge/templates/pattern-record.md`

## Decision Criteria

1. Extract only observations that can guide future page, section, component,
   interaction, accessibility, responsive, SEO, storytelling, or conversion work.
2. Every pattern must link back to study or audit evidence through `sourceRefs`.
3. Prefer reusable structure and decision logic over exact copy, layout sequence,
   or brand-specific treatment.
4. Assign conservative confidence unless multiple evidence points or review
   history justify a stronger level.

## Boundary

- Owns: deciding whether evidence contains reusable pattern knowledge and shaping
  candidate `*.pattern.json` records.
- Does not own: indexing, search ranking, blueprint generation, final curation,
  or confidence promotion.

## Rules

1. Reject trivial observations such as "uses cards" unless the structure changes
   user decision-making or implementation responsibility.
2. Normalize tags to `knowledge/vocabulary/knowledge-tags.json`.
3. Keep status `candidate` unless an explicit curation step says otherwise.
4. Do not invent source evidence. Use placeholders only in repository examples,
   not in project-local extracted records.

## Anti-Patterns

- Screenshot copying: preserving exact page order, text, or visual treatment as a
  reusable pattern.
- Evidence-free pattern: a reusable recommendation with no `sourceRefs`.
- Tag stuffing: adding broad industries, page types, or goals that the evidence
  does not support.
- Premature confidence: marking a single observation as high or validated.

## Workflow

1. Read study and audit artifacts and list candidate reusable observations.
2. Reject observations that are decorative, too specific, or unsupported.
3. Choose `patternType`, category, tags, structure, and wireframe mapping.
4. Add `sourceRefs`, confidence, and candidate status.
5. Save or return `*.pattern.json` records for curation and indexing.

## Inline Example

```json
{
  "id": "credibility-first-healthcare-hero",
  "type": "pattern",
  "patternType": "section",
  "category": "healthcare conversion",
  "name": "Credibility-first healthcare hero",
  "summary": "Place credentials or outcome proof near the primary appointment CTA before asking for commitment.",
  "tags": {
    "industries": ["healthcare"],
    "sectionTypes": ["hero"],
    "conversionGoals": ["appointment"]
  },
  "useWhen": ["A healthcare page asks users to book or request care."],
  "avoidWhen": ["The page is informational and has no conversion action."],
  "structure": {
    "required": ["headline", "primaryCTA", "trustSignal"],
    "optional": ["testimonial", "metadata"],
    "notes": ["Proof should support the action rather than appear after all service detail."]
  },
  "wireframeMapping": {
    "nodeType": "hero",
    "layout": "splitHero",
    "contentRoles": ["headline", "primaryCTA", "trustSignal"],
    "recommendedChildren": ["heading", "button", "card"],
    "notes": ["Keep the trust signal close to the CTA."]
  },
  "sourceRefs": [
    {
      "sourceId": "homepage-study",
      "studyId": "homepage-study",
      "findingLabels": ["Credentials appear before booking CTA"]
    }
  ],
  "confidence": {
    "level": "medium",
    "reason": "Single study finding with clear conversion rationale."
  },
  "status": "candidate"
}
```

## Hand-Offs

- Use `curate-ui-knowledge` before accepting, merging, or promoting patterns.
- Use `index-knowledge-base` after approved or candidate pattern files are saved.
- Use `search-ui-knowledge` when a brief needs relevant existing patterns.
