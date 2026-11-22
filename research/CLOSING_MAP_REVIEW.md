# Closing map — 13 November 2026

The narrative now leads from aquifer compaction to an independent exploration map. Story scrolling does not change this map's layers or camera. The initial view shows the approximate Phase 1 repair corridor, Census community income areas, and incorporated and unincorporated place points.

## Narrative additions

Applied the same concrete-language and reader-effort framework recorded in `COPY_DESIGN_REVIEW.md`. The new section names its geography and evidence. It does not claim an affected-population total or replace the ending with a slogan. Controls have functional labels; no decorative metric cards or repeated animation sequence was added.

From the user's [FWA canal resource](https://friantwater.org/fkc), added the 1951 completion date and the role of turnouts to the route section. Added the 14 check structures and their regulation of water levels to the capacity section. These details explain how canal geometry and distribution work. Historical promotional claims about agricultural land values were not carried into the narrative.

## Layers and interpretation

- **Repair:** approximately 10.09 miles of the retained reference centerline clipped between the latitudes of the two documented project-end roads. This locates the approximately ten-mile Phase 1 corridor. It does not invent an eastward offset or trace a new as-built channel. The FWA construction map identifies Avenue 136 and Avenue 64; crossing geocoder responses are retained. The approximate geometry and method are downloadable and documented in `EXPLORER_PROVENANCE.json`.
- **Community income:** all 329 DWR block groups intersecting the regional query window, with ACS 2019–2023 income and population estimates. The supplied DWR DAC23 designation is preserved, including unavailable data. Polygons are simplified for display, not statistical analysis. No margins of error were supplied in this extract.
- **Places:** 39 Census 2020 Gazetteer reference points, including Census-designated places such as Terra Bella, Earlimart, and Richgrove. Point containment is computed against original, unsimplified block-group polygons. Selecting a place reports estimates for the containing block group, explicitly not a town total.
- **Ground movement:** optional retained DWR / TRE ALTAMIRA cumulative displacement raster, June 2015–January 2024. Its six-bin legend and dates remain visible when enabled. When combined with income areas, fill opacity is reduced to distinguish the layers.
- **Aerial inspection:** a close-up preset shows the channels near Terra Bella with income and project overlays switched off. The older reference alignment remains identified. Imagery dates vary; this is not a dated before/after comparison. A credited FWA / Stantec photograph documents the completed Phase 1 canal independently of the basemap.

The map distinguishes proximity and socioeconomic context from demonstrated impacts. Water-service boundaries, delivery records, well conditions, and household evidence would be required to attribute benefits or disruption to particular communities.

## Verification

- `npm run build` passed: 18 Astro files checked with no errors, warnings, or hints; six retained YAML examples validated; one static page built.
- Checked 329 unique block-group IDs and valid supplied classification values. All 39 place reference points match a retained block group. The approximate locator length is consistent with the documented ten-mile project.
- Browser checked the built `/friant-kern/` preview at 1440 × 1000 and 390 × 844. Neither width had horizontal overflow. The new map renders local polygons, canal locator, and place points.
- Tested Terra Bella selection: its reference point matches block group 061070045002; displayed estimates are $51,837 median household income and 968 people, labeled as block-group estimates.
- Tested area selection, optional displacement, wider-valley and repair presets, aerial close-up, and street/aerial switching. Mobile map taps expose a readable popup as well as updating the selection panel. Source link opens the methods disclosure.
- No browser console errors were observed. Temporary viewport override reset. Preview remains available at `http://127.0.0.1:4330/friant-kern/#explore-canal`.
- Screenshots: `previews/closing-map-desktop.png`, `previews/closing-map-aerial.png`, `previews/closing-map-mobile.png`.

Physical-phone testing, offline browser testing, independent canal survey verification, and a service-area impact analysis were not performed. External basemap and aerial tiles require network access; evidence layers are local.
