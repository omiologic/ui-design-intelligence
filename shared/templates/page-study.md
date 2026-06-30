# Page Study Template

Use this shape for study skill outputs before audit or blueprint generation.

```json
{
  "id": "example-page-study",
  "source": {
    "urlOrName": "Example page",
    "capturedAt": "YYYY-MM-DD",
    "viewport": "desktop"
  },
  "studyType": "storytelling",
  "summary": "One paragraph describing the most important observed pattern.",
  "findings": [
    {
      "label": "Finding label",
      "evidence": "Observable detail from the page or capture.",
      "interpretation": "What the evidence means for study, audit, or blueprint work.",
      "handoff": "Which downstream bundle or skill should use this finding."
    }
  ]
}
```

Keep evidence observable. Do not infer business strategy, intent, or performance
unless the source explicitly supports it.
