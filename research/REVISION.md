# Narrative revision — 13 November 2026

## Implemented

Seven chapters replace the original five: route and gravity; communities; ground movement; three readings; historical bottleneck; phased repair; aquifer compaction and the question of protecting the repair.

The public narrative no longer contains the rejected-site explanation, assignment branding, simulation disclaimers, or the development claim-matrix download. Historical original research is retained outside the reading experience. The public report and public claim matrix are focused on Friant–Kern.

Visual changes: stronger serif hierarchy and spacious opening; an asymmetric water/ground/work image sequence; a recurring line-and-station motif; conceptual longitudinal sections; an interruption of the desktop map with a full-width historical capacity metric; a repair chronology; and a design-allowance detail before the final question. No reference-site code or assets are copied.

## New data and claims

Census population layer: 28 incorporated cities with July 2025 estimates, joined by GEOID to 2020 Gazetteer reference points inside a regional bounding window. Area of each circle is proportional to population. Not a canal-service polygon, exposed-population count, city footprint, or time-matched observation of 2015–January 2024 displacement. Unincorporated places and rural households are absent. Census API request returned a missing-key page; it was not used. The official bulk CSV was downloaded instead. See CENSUS_PROVENANCE.json and scripts/prepare_communities.py.

The source-linked >60% metric concerns historical loss in the critical 10-mile Phase 1 segment, per Friant Water Authority. It does not describe current loss along the whole canal. The ten-mile first-phase completion in 2024 is distinguished from the broader approximately 33-mile effort. The approximately 5 ft subsidence allowance is from Reclamation's January 2023 construction account and is not a prediction.

Photos and the construction context: https://www.usbr.gov/newsroom/news-release/4410?field_story=1. Source-provided captions identify the canal in Tulare County and the existing/replacement canals. The page publication date is known; image capture dates are not. Photo URLs and file hashes are in PHOTO_PROVENANCE.json.

The longitudinal sections illustrate how a local depression can reduce room below the bank. They are exaggerated conceptual profiles, not measured elevations, canal surveys, or a hydraulic calculation.

## Source links

- System scale, first-phase completion, and Record of Decision: https://www.usbr.gov/newsroom/news-release/4884
- Critical-section historical loss and recharge connection: https://friantwater.org/fkc-mrccp
- Construction start and scope: https://www.usbr.gov/mp/sccao/general-project.html
- Gravity conveyance: https://www.usbr.gov/mp/sccao/fkc-fr.html
- Compaction and potential irreversible storage effects: https://www.usgs.gov/centers/land-subsidence-in-california/science/aquifer-compaction-due-groundwater-pumping
- Original displacement provenance is unchanged; see DATA_AUDIT.md.

## Verification

Final npm run build passed: 17 Astro files; 0 errors, 0 warnings, 0 hints; six teaching-example YAML files valid; one static page built. The archival work/ checkout is excluded from TypeScript checks.

All 28 Census population joins were checked against the original official CSV, including GEOID uniqueness and positive values. Original raw-data hashes still match. The Census asset can be regenerated with the standard-library-only Python script; no live API is needed by the site.

Browser verification covered the development and built production site: population circles and a Porterville 63,088 popup; displacement and sample layers; the Terra Bella −2.22 ft popup in production; combined population/displacement controls and opacity; the full-width capacity scene; onward repair navigation; reverse chapter selection; and the mobile layout at 390×844. The production page reported no missing image loads or console errors at the checked sample view. Horizontal overflow checks passed at the tested desktop and mobile widths. Mobile attribution starts collapsed and remains expandable. Reduced-motion handling is preserved in CSS and map camera code; not browser-emulated in this pass. No claim of exhaustive accessibility or physical-device testing.

Production screenshots: previews/revised-mobile.png, previews/revised-metric.png, and previews/revised-desktop.png. Original preview files remain historical. The built site is dist/index.html and its assets; it needs an HTTP server for the interactive map.

## Next layers worth investigating

1. **Groundwater levels:** pair a small set of wells with dated hydrographs to connect pressure change to compaction. Screen measurement dates, missing observations, well depth and aquifer interval; do not infer pumping responsibility. DWR source: https://data.cnra.ca.gov/dataset/periodic-groundwater-level-measurements; documentation: https://sgma.water.ca.gov/webgis/config/custom/html/SGMADataViewer/doc/.
2. **Agricultural land use:** dated crop polygons would show what surrounds the route. Crop type is not canal supply, irrigation volume, or a water-rights boundary. Source: https://data.cnra.ca.gov/dataset/statewide-crop-mapping.
3. **Water-system service boundaries:** relate settled places to actual drinking-water systems before making a distributional claim. The boundary alone does not establish that a system receives Friant water. Source: https://gispublic.waterboards.ca.gov/portalserver/rest/services/Drinking_Water/California_Drinking_Water_System_Area_Boundaries/FeatureServer/0.
4. **Official repair geometry and survey profiles:** replace conceptual sections with dated engineering measurements when obtained. An interpolated segment or distance buffer is not a substitute.

These are prospective additions, not layers implemented in this revision. An income or race layer would require a defined water-access question, appropriate population denominator, dated supply/service data, and uncertainty treatment. Proximity alone cannot support an inequity claim.
