# Section-by-section narrative and design review

13 November 2026 · Current editorial direction

The organizing question is: **How does a canal built to move water by gravity adapt to ground that keeps moving?** This is a sequence of evidence and consequences, not a tour of unrelated datasets.

| Section | What was weak | Its current job | Why the next section follows |
| --- | --- | --- | --- |
| Opening | A title, three numbers, and a montage competed for attention; construction imagery gave away the response too early. | Establish one subject with a large regular-weight serif title, a quiet documentary image, and a short premise. System-wide scale figures sit beneath the premise. | The reader now needs to locate the water route. |
| 01 · Route | A made-up section suggested a relationship to the canal that had not been measured. | Establish the mapped route and sourced gravity-conveyance mechanism. No schematic or invented grade. Regional shaded terrain provides orientation. | The route's setting needs to be understood in actual elevation. |
| 02 · Terrain | The city-population chapter introduced settlement without establishing water-service membership or exposure. | Replace it with USGS elevation, a 3D view, and a section along an explicitly mapped west–east transect near Lindsay. The reference canal intersection is calculated from retained geometry. | Static elevation alone cannot establish land movement; the next scene explicitly changes from height to displacement. |
| 03 · Ground movement | Narrative language blurred the terrain shape, a cumulative change, and a rate. | Flatten the view and reveal the dated displacement raster. Explain that this is accumulated change over June 2015–January 2024. | A regional pattern raises a question about the scale of differences. |
| 04 · Local readings | Three locators could be mistaken for representative town or canal statistics. | Present three explicitly illustrative regional samples, with exact values in the text, local point popups, dates, and a comparison graphic. | These data show variation; independent engineering evidence is needed to establish a conveyance consequence. |
| 05 · Bottleneck | Repeated split-screen chapters made the metric feel like another field in a card. | Step out of the map and devote the whole screen to the documented historical capacity loss in the critical 10-mile section. Do not calculate that loss from raster colors. | A documented bottleneck motivates the physical repair. |
| 06 · Repair | The timeline and the 5 ft figure were separated; the construction image appeared prematurely in the opening. | Combine construction imagery, the 2020–2024 chronology, completed first-phase scope, and the 5 ft future-subsidence design provision. All belong to the engineering response. | Allowing for future movement raises the distinction between repairing infrastructure and reversing aquifer-system compaction. |
| 07 · Storage | Population circles and the 5 ft figure implied a connection to storage loss that the evidence does not establish. | Remove both. End by distinguishing recovering groundwater levels from potentially permanent storage loss, with USGS as the source. Conveyance and storage are different physical capacities. | The story closes on its actual implication, rather than another unrelated metric. |
| Sources | A large evidence desk read as another chapter and repeated development history. | Collapse methods and source links into a reading aid. Links from the narrative open the relevant note. Census remains documented only as an optional context layer. | Readers can inspect the support without being forced through the research workflow. |

## Visual system

Regular-weight Lora serif supplies titles and large figures; Mona Sans supplies prose, annotations, and controls. These roles have explicit scales rather than synthetic bold headings. Reading measures stay narrow. Whitespace is allocated by scene purpose: a spacious opening, held maps for geographic evidence, a full-width metric, an image-led repair, and a centered ending. Fonts are bundled locally, with the Lora license retained.

The map keeps one stable left-hand frame through the first four chapters. Terrain is introduced with a restrained pitch change, then flattened for displacement comparison. The displacement layer fades in; chapter text enters once with a short fade and small vertical movement. Map states follow chapter boundaries, rather than whichever differently sized text box has the nearest center. The metric, repair, and conclusion deliberately leave the map layout. Reduced-motion preferences remove entry animations and camera durations. No wheel interception, automatic orbit, count-up statistic, or scroll-lock sequence is used.

## Evidence boundaries

The USGS regional terrain cannot establish canal-bed slope, freeboard, or repair performance. The section is across the landscape, not along the canal. The 3D height exaggeration and separate profile exaggeration are labeled. Terrain source acquisition dates vary; the export and service snapshot dates are not observation dates. The old schematic has been removed.

Census population adds optional settlement context only. It does not establish who receives canal water or whose supplies are affected. It has no measured connection to the 5 ft design provision or to aquifer storage loss.

The 5 ft figure describes the construction design's provision for future subsidence. It is not observed movement, a forecast from the raster, or an aquifer-storage metric. It appears only with the repair.

See TERRAIN_PROVENANCE.json and scripts/prepare_terrain.py for the retained elevation source and processing. See REVISION.md for the preceding revision's source checks; this document supersedes its section structure.

## Verification record

The final production build passed on 13 November 2026: 17 Astro files inspected, 0 errors, 0 warnings, 0 hints; six example YAML files validated; one static page generated.

Verified the retained USGS TIFF hash against terrain metadata, finite positive elevation values, five transect samples against the original raster, 181 ordered section positions, and all 93 local 256×256 RGB terrain tiles. No raw terrain or displacement data was substituted with an illustration.

Browser inspection covered all seven chapter roles, the opening typography, terrain rendering, the profile slider and linked map cursor, flattening to the displacement view, local sample presentation, the full-screen bottleneck, onward repair navigation, the distinct storage conclusion, and opening the appropriate source note. Desktop 1280×850 and mobile 390×844 overflow checks passed. Profile controls returned the expected readouts at checked positions. No missing images or console errors were reported at the checked production views. Compact mobile attribution remains expandable. Reduced-motion handling was reviewed in code; it was not browser-emulated in this pass.

The bounded USGS export is a regional terrain model. Its edge is delineated; outside that footprint is basemap context. Larger optional exports timed out and were not used. Terrain exaggeration does not convert the model into a canal survey. A source-linked engineering profile would be needed for bed slope and freeboard.

Saved current production previews: terrain-desktop.png, terrain-mobile.png, editorial-metric.png, and editorial-repair.png under previews/. Earlier revised-*.png files describe the preceding design. The preview was returned to the opening, temporary browser sizing reset, and the built local preview remains at http://127.0.0.1:4330/.
