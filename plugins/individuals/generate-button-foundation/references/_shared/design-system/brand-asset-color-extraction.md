# Brand Asset Color Extraction

## Purpose

Use this reference when logo, wordmark, favicon, app icon, or source asset
evidence should inform a `RuntimeDesignTheme`.

`DesignSystemSeed` captures broad brand direction. `RuntimeDesignTheme`
captures runtime-safe asset evidence: where the asset came from, which colors
were extracted, where the asset can appear, and which values are still
approximate.

## Evidence Strength

Treat brand asset evidence by source:

- `userProvidedAsset`: strongest source. Exact SVG/PDF/brand-kit values can be
  high confidence when the value is read directly from the asset.
- `sourceCodeAsset`: strong source. CSS variables, SVG fills, or checked-in
  asset files can be high confidence when read directly.
- `faviconDiscovery`: medium by default. Favicons and app icons may be cropped,
  compressed, or simplified variants.
- `captureManifestFrame` or `screenshotCrop`: medium or low confidence. Pixel
  sampling can be affected by compression, antialiasing, overlays, and browser
  color management.
- `inferred`: never high confidence. Use only as a working recommendation until
  a real asset or source token confirms it.

## Required Runtime Fields

Every runtime brand asset should include:

- `type`: logo, wordmark, symbol, favicon, appIcon, image, or unknown.
- `sourceType`: how the asset was obtained.
- `ref`: source path, manifest ref, URL placeholder, or package-safe reference.
- `safeBackgrounds`: semantic tokens where the asset remains legible.
- `doNotUseOn`: semantic tokens where the asset should not be rendered.
- `extractedColors`: color values with role, source, confidence, and source ref.
- `provenance`: asset-level source and confidence.

## Rules

1. Do not promote screenshot-derived or inferred colors to high confidence.
2. Do not use logo colors as general UI colors without semantic mapping through
   `colorSystem.semantic`.
3. Do not render logos on unknown surfaces. Add `safeBackgrounds` and
   `doNotUseOn` before runtime viewer handoff.
4. Keep favicon/app-icon colors separate from primary logo colors unless the
   source asset proves they are the same system.
5. Preserve package-safe refs in committed examples. Do not include private URLs
   or signed asset links.

## Examples

User-provided vector logo:

```json
{
  "id": "brand-logo",
  "type": "logo",
  "sourceType": "userProvidedAsset",
  "ref": "assets/brand/logo.svg",
  "safeBackgrounds": ["color.surface.default", "color.surface.inverse"],
  "doNotUseOn": ["color.brand.primary"],
  "extractedColors": [
    {
      "name": "Logo primary blue",
      "value": "#145C9E",
      "role": "logoPrimary",
      "usage": "Logo mark only until mapped to semantic tokens.",
      "provenance": {
        "source": "userProvided",
        "confidence": "high",
        "sourceRef": "assets/brand/logo.svg"
      }
    }
  ],
  "provenance": {
    "source": "userProvided",
    "confidence": "high",
    "sourceRef": "assets/brand/logo.svg"
  }
}
```

Screenshot-inferred logo color:

```json
{
  "id": "screenshot-logo",
  "type": "wordmark",
  "sourceType": "screenshotCrop",
  "ref": "capture-manifest:homepage-logo-crop",
  "safeBackgrounds": ["color.surface.default"],
  "doNotUseOn": ["color.surface.subtle"],
  "extractedColors": [
    {
      "name": "Approximate wordmark ink",
      "value": "#17212B",
      "role": "logoPrimary",
      "usage": "Approximate only; confirm against source asset.",
      "provenance": {
        "source": "inferred",
        "confidence": "medium",
        "sourceRef": "capture-manifest:homepage-logo-crop",
        "note": "Sampled from screenshot crop."
      }
    }
  ],
  "provenance": {
    "source": "inferred",
    "confidence": "medium",
    "sourceRef": "capture-manifest:homepage-logo-crop"
  }
}
```
