# Verification record — 13 November 2026

- `npm run build` passed: Astro/TypeScript inspection of 17 files returned **0 errors, 0 warnings, 0 hints**; six retained upstream example YAML files validated; one static narrative page built. These examples are not a substitute for testing the custom narrative map.
- `npm audit fix` applied a compatible dependency patch; audit then reported **0 vulnerabilities**. The lockfile is included.
- Original 2021/2024 irrigation downloads match the repository MD5s. Headers, value counts, grid alignment and common-mask diagnostics were checked. No interpretation of zero/nodata equivalence or hectare-loss claim was accepted.
- DWR TIFF actual bounds, nodata, units, sampling and derived PNG footprint were inspected. Three sample points were read directly from the retained raster. Raw source SHA-256 inventory retained.
- Browser checked in both development and built production preview. A MapLibre v6 worker-loading error initially prevented GeoJSON rendering; explicit bundled worker configuration corrected it. The final production view visibly rendered the centerline, displacement layer and sample circles, with no new console errors observed after correction.
- Browser checked at 1280×850 and 390×844. No horizontal overflow at either tested width. Mobile evidence layers and narrative remained readable; mobile legend/note spacing refined after visual inspection. Temporary viewport override reset.
- Sample click opened the correct Terra Bella −2.22 ft popup. Forward chapter selection and reverse navigation to Chapter 1 were observed; returning to Chapter 1 hid the legend and displacement state. Explore and context controls changed state. Opacity behavior is implemented and type-checked; its individual visual response was not separately quantified. Reduced-motion branch reviewed in code, not emulated in browser.
- Source links/download routes included. External source availability and live OSM tile availability can change. The core map uses local evidence assets; initial install and orientation tiles need network. A disconnected-network run and physical phone testing were not performed.
- Desktop and mobile screenshots accompany the deliverable. Local servers used for verification were stopped after testing; use README commands to restart.

No claim of exhaustive accessibility testing, survey validation, classifier retraining, or causal analysis is made.

## November 2026 narrative revision

See `research/REVISION.md` for the seven-chapter revision, new Census layer, source checks, production browser checks, and remaining verification limits. Original checks above describe the initial prototype. Revised screenshots are in `previews/revised-*.png`.

## Terrain and editorial structure pass

Current validation and section-by-section rationale are in `research/SECTION_REVIEW.md`. USGS source/processing metadata is in `research/TERRAIN_PROVENANCE.json`. The conceptual section and main population chapter have been removed; the design allowance now appears with repair.

## Copy and design review

See `research/COPY_DESIGN_REVIEW.md` for the linked editorial checklist, before/after findings, layout changes, and browser checks. The final build passed with no Astro diagnostics. Desktop (1280 × 850) and mobile (390 × 844) checks showed no horizontal overflow; the terrain slider updated its readout. Current preview: `http://127.0.0.1:4330/friant-kern/`. The runtime asset base now supports the configured GitHub Pages subdirectory. Screenshots are in `previews/copy-review-*.png`.
