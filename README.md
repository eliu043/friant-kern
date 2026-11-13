# The ground beneath the canal

Design Practices Assignment 04 • Astro–MapLibre spatial narrative • 13 November 2026

**Open the project folder in a terminal.** Requires npm 9+ and Node **22.23.4+** (Node 24 also works). An exact local Node development dependency is included for this machine; installing it does not replace your system Node.

```sh
npm ci
npm run dev
```

Open http://localhost:4321/. All seven chapters and citations render as static HTML. Scroll from the canal route and actual terrain to regional displacement, sample readings, capacity loss, repair, and aquifer storage. Click **Explore map** to enable pan/pinch/keyboard zoom; wheel scrolling always advances the narrative. Use the seven chapter buttons to jump, the opacity slider to compare, and **Reset** to restore the current chapter. Click sample dots for their dated values. Open **Layers** for 3D terrain, optional city context, ground opacity, or street context. The terrain chapter includes a slider linked to a mapped USGS terrain transect.

```sh
npm run build
npm run preview
```

Build runs Astro/TypeScript checks, validates the retained template YAML examples, and creates a static `dist/`. Preview at http://localhost:4321/. Serve `dist/` through any static HTTP server; do not open index.html through file://. No keys, login or database. Local core evidence assets are bundled; OSM orientation tiles require internet. Do not bulk-download OSM tiles. If Astro telemetry preferences are blocked on a restricted computer, run `ASTRO_TELEMETRY_DISABLED=1 npm run build` / `npm run dev` on macOS/Linux, or set that environment variable in your terminal on Windows.

## Deliverables

- `src/pages/index.astro`: narrative and source desk.
- `src/scripts/story.ts`: map, deterministic chapter states and controls.
- `src/styles/narrative.css`: desktop/mobile/reduced-motion layout.
- `public/data/`: local canal, georeferenced display raster and sampled observations.
- `research/FINDINGS.md`: concise decision, findings and limitations.
- `research/DATA_AUDIT.md`: provenance, resolution, dates, coverage, licensing and analytical gates.
- `research/CLAIM_EVIDENCE.csv`: accepted/rejected claims and permitted wording.
- `research/STORYBOARD.md`: seven implemented chapters and conditional North Crimean sequence.
- `research/raw/`: original irrigation rasters, bounded DWR export and downloaded source metadata.
- `research/checksums.json`: raw-file SHA-256 inventory.
- `CODE_PROVENANCE.md`: template commit, AI assistance, adaptations and authorship disclosure required by the assignment.
- `VALIDATION.md`: checks completed and verification limits.

## Regenerate research assets (optional)

The web app does not need Python. To reproduce local processing, use Python 3.9+:

```sh
python3 -m venv .venv
.venv/bin/pip install rasterio==1.4.3 numpy==2.0.2 pillow==11.3.0 pyproj==3.6.1
.venv/bin/python scripts/audit_irrigation.py
.venv/bin/python scripts/prepare_data.py
```

On Windows use `.venv\Scripts\python` / `pip`. Processing is deterministic and uses the retained original files, without a live API. `prepare_data.py` preserves the DWR export’s actual spatial extent and uses nearest-neighbor reprojection. No satellite classification is retrained and no hydraulic simulation is run. For original retrieval URLs/parameters see the audit.

## Publication

This is a local prototype, as allowed by the assignment. For root-path hosting upload `dist/`. For GitHub Pages under a repository subpath, set Astro `base` and update absolute font URLs in `narrative.css`; then rebuild. Confirm the mirrored centerline distribution terms before wider public release. Source dataset terms are not a license for the application code.

## Relocation and design review

The project now lives at `/Users/ericliu/Documents/GitHub/friant-kern`, with the app at the folder root. See `research/NARRATIVE_DESIGN_REVIEW.md` for proposed narrative and visual refinements informed by the Walton reference. The November 2026 narrative revision implements the new seven-chapter story, Census population layer, conceptual sections, documentary image sequence, and metric interlude. See `research/REVISION.md` for source and verification details.

- `previews/`: original desktop and mobile screenshots.
- `archives/the-sinking-canal-original.zip`: unchanged original delivery archive.
- `work/`: retained research scratch files, upstream template checkout, and original Python environment. This is archival working material; recreate the Python environment with the instructions above rather than relying on its old absolute paths.
- `research/RELOCATION_MANIFEST.json`: original source/destination and verified SHA-256 hashes of transferred project files, excluding dependencies, generated Astro caches, and macOS metadata. Hashes record transfer-time contents, before this README update and regeneration of build output.

The original archive predates this review. Node dependencies and generated build output were also moved; `npm run build` was rerun from this folder. Build results are recorded in `research/RELOCATION.md`.

Population assets can be regenerated offline with `python3 scripts/prepare_communities.py`; original inputs and join rules are recorded in `research/CENSUS_PROVENANCE.json`. The main narrative is local-only.

## Narrative and terrain revision

The current section audit is `research/SECTION_REVIEW.md`. Population is now optional context, not a narrative chapter. The 5 ft design allowance appears with construction and repair, separately from aquifer storage. The schematic has been removed.

`work/geo-env/bin/python scripts/prepare_terrain.py` regenerates 93 local elevation tiles, tint, and a sampled west–east section from the retained USGS export. A fresh Python environment with the documented raster libraries can run the same script. See `research/TERRAIN_PROVENANCE.json` for the source request, actual raster bounds, resolution, source hash, exaggeration, and limitations. This is regional terrain, not canal-bed geometry or a hydraulic model.
