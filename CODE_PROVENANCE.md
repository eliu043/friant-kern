# Code origins and authorship

This prototype was developed by OpenAI Codex at the user's request on 13 November 2026. It includes AI-generated code, copy, processing and research synthesis. It must not be represented as independently authored student work.

Base: https://github.com/design-practices/astro-maplibre-template/
Cloned commit: c15a1e44726b858cb7f04e3249639ed754663f8e (version 2).
Retained: Astro package/build foundation, TypeScript configuration, local fonts, teaching map/story examples and supporting components. Original template README preserved in `research/TEMPLATE-README.md`. Upstream repository supplied no top-level license file at this commit; do not assume a blanket code license.

New/adapted: `src/pages/index.astro` supplies the five chapters, evidence desk and research disclosure; `src/styles/narrative.css` supplies responsive editorial design; `src/scripts/story.ts` uses MapLibre directly for deterministic chapter visibility, restrained camera changes, accessible controls and sample inspection. The template's YAML examples remain validation examples, not the content engine of this custom page. `scripts/prepare_data.py` creates local display assets from the retained DWR export; `scripts/audit_irrigation.py` reproduces the rejected comparison diagnostics.

Libraries: Astro; MapLibre GL JS and bundled CSS; the template’s existing packages. An exact local Node development dependency satisfies the newer template runtime requirement on the provided computer. No API keys, accounts or analytics are required. Street tiles are the only live map-data dependency.

No copied tutorial implementation, generated imagery, simulated data, invented irrigation polygons, or invented well records. Dataset terms are separate from code origins; see `research/DATA_AUDIT.md`.

How it fits together: Astro renders all narrative/citation text as HTML; a client script constructs the MapLibre canvas. Local GeoJSON supplies the reference line and sampled cells; a georeferenced PNG supplies classified regional displacement. Scrolling selects one of five camera/layer states. The PNG is a visualization of measured estimates, not a simulation.

MapLibre v6 worker integration follows the official Vite recipe at https://maplibre.org/maplibre-gl-js/docs/ (explicit `?worker&url` import and `setWorkerUrl`). The initial browser check caught and corrected the worker-path issue. The compatible dependency audit patch was applied; lockfile retained.

November 2026 revision: seven-chapter editorial structure, conceptual longitudinal sections, source-linked capacity metric and repair chronology, two documentary photographs published by the Bureau of Reclamation in its January 2023 construction account (https://www.usbr.gov/newsroom/news-release/4410?field_story=1), and a Census city-population layer. Image captions and source credits are on the page; source URLs and hashes are in research/REVISION.md. No Walton assets or code were copied. The Walton reference informed pacing, type hierarchy, and image scale. Population processing is in scripts/prepare_communities.py with research/CENSUS_PROVENANCE.json.

Further narrative/design revision: removed the conceptual longitudinal sections; replaced the population chapter with a terrain chapter based on a retained USGS 3DEP export. scripts/prepare_terrain.py supplies local Terrarium-encoded DEM tiles, a tint, and a sampled map-linked west–east terrain section. Terrain sampling is not a canal-bed survey. A bounded dataset footprint, 2× model exaggeration, approximately 23× profile exaggeration, and source limitations are explicit. Lora regular/italic WOFF2 files are bundled from the existing @fontsource/lora dependency; its license is retained in public/fonts/Lora-LICENSE.txt. Chapter-boundary selection and once-only IntersectionObserver entry transitions replace nearest-center selection; reduced-motion support is retained. See research/SECTION_REVIEW.md.
