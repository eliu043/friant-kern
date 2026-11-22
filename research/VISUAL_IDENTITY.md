# Atlas visual identity — 13 November 2026

Reference: [SPUN Underground Atlas](https://www.spun.earth/underground-atlas/mycorrhizal-biodiversity).

Inspected the live page at desktop width. Its visual hierarchy combines a black interface, condensed display headings, monospace labels, high-contrast geographic evidence, and a clearly divided map/control rail. Applied those principles to the canal story, retaining the seven narrative chapters and the final independent map.

## The implemented system

- **Type:** Barlow Condensed Bold for headings and evidence numerals; Mona Sans for paragraphs; system monospace for map controls, units, dates, and source labels. Headings use uppercase; body copy retains sentence case. Balanced chapter headings avoid a single trailing word. Font roles are defined once in the consolidated stylesheet.
- **Color:** near-black `#080b0d`, off-white `#f2f4ec`, orange `#ff8a3d`, community blue `#7896ff`, and muted gray `#afb9b9`. Orange identifies the canal, repair locator, selected controls, and prominent evidence numerals. Blue identifies community context. The reference canal in the final map remains a dashed off-white line, distinct from the thick orange repair locator.
- **Evidence:** the six displacement-raster colors and numerical boundaries are unchanged. Their warmer colors distinguish measured ground movement from the blue Census polygons. No underlying geometry, estimate, measurement date, or population claim changed in this visual pass.
- **Structure:** compact header links to story, exploration, and sources; aligned introduction and system-scale figures; sticky map with restrained controls; full-width capacity, repair, and compaction chapters; a consistent final map rail. The >60% capacity figure and five-foot design allowance retain their scopes and source links.
- **Interaction:** square controls, visible selected states, consistent labels and borders, dark popups and navigation controls, and reduced-motion support. No new decorative animation, metric carousel, or card grid was added.

This adapts the reference's visual principles. SPUN's logo, licensed typefaces, scientific content, map data, and imagery were not copied. The site uses its existing canal photographs and research assets. Public wording now calls the approximate locator orange; earlier review notes and screenshots describe the previous lime and gold palettes.

## Assets and provenance

Barlow Condensed Bold is bundled locally from [Google Fonts](https://github.com/google/fonts/tree/main/ofl/barlowcondensed). Its SIL Open Font License is retained as `public/fonts/BarlowCondensed-OFL.txt`. The display font file is approximately 110 KB. Existing Mona Sans files remain local.

The geographic context uses [Esri World Dark Gray Base](https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Base/MapServer). Inspected the service metadata and retained it in `research/raw/identity/esri-dark-basemap.json`. Esri / HERE / Garmin / OpenStreetMap contributor attribution is included on both maps. The aerial layer and its credits are unchanged. External context and imagery tiles require network access; local evidence assets do not depend on those services.

## Validation

- Final build passed: 18 Astro files checked with no errors, warnings, or hints; six YAML examples validated; one static page built.
- Checked the opening at 1440 × 1000 and 390 × 844. The bundled display font loaded and neither width showed horizontal overflow. Mobile figures remain rows with readable values and source context.
- Inspected the mobile terrain section and moved the slider to verify the updated 68 km / approximately 80 m readout.
- Checked the final map at both widths. Terra Bella selection retained the correct block-group context: 061070045002, $51,837 median household income and 968 people, explicitly labeled as block-group estimates.
- Verified repair reset, aerial close-up control state, and the optional ground-movement layer and its matching legend. Local linework, place points, and Census polygons rendered with the revised palette. No browser console errors were observed.
- Corrected a flex-layout conflict that collapsed the closing map's color ramp. Verified all six bins render at positive widths (approximately 45 px each at the tested desktop size), with the exact retained raster colors. The final build passed after this correction.
- Screenshots: `previews/atlas-identity-desktop.png`, `previews/atlas-identity-mobile.png`, and `previews/atlas-identity-map.png`.

This was a visual and interaction check, not an exhaustive accessibility audit or a new validation of the scientific data. Physical-phone and disconnected-network tests were not performed.

## Orange accent revision

Switched the lime accent to orange `#ff8a3d` at the user’s request. Updated CSS controls, focus and selected states, headings, evidence numerals, map linework and cursors, repair keys, and color references in the copy. The terrain-profile fill now uses a warm dark tint. Blue community context and the measured displacement ramp retain their existing colors.
