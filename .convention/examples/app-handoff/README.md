# App Handoff Fixture

This fixture demonstrates the Sprint 008 app-facing handoff shape:

```txt
app-query-context.example.json
  -> app-retrieval-results.example.json
  -> app-creation-run-record.example.json
  -> app-review-run-record.example.json
  -> app-artifact-manifest.example.json
  -> app-package-metadata.example.json
```

The records reference existing repository examples only. They do not require
network access, cloud credentials, real bucket names, signed URLs, or private
infrastructure values.

## Referenced Artifacts

- `.convention/knowledge/examples/credibility-first-healthcare-hero.pattern.json`
- `.convention/knowledge/examples/sticky-appointment-cta.pattern.json`
- `.convention/examples/marketing-page-e2e/marketing-page.design-system-seed.example.json`
- `.convention/examples/marketing-page-e2e/marketing-page.ui-blueprint.json`
- `.convention/examples/marketing-page-e2e/marketing-page.prototype-config.example.json`
- `.convention/examples/app-handoff/marketing-page.export-seed.md`
- `.convention/examples/page-audit.example.json`

The app wrapper records point to existing artifact schemas through `schemaRef`
rather than embedding those artifact payloads.

`marketing-page.export-seed.md` is a repository-native Blueprint Export Seed.
It is included as an `exportSeed` artifact so apps and hosted viewers can show a
human-readable downstream handoff without introducing a third-party-specific
format.
