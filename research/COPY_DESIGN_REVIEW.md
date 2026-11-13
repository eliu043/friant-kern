# Copy and design review — 13 November 2026

Applied to the current Friant–Kern narrative using Peter Yang's [article](https://creatoreconomy.so/p/use-my-no-ai-slop-skill-to-remove-20-ai-slop-patterns), its linked [editing checklist](https://github.com/petergyang/no-ai-slop/blob/main/skills/no-ai-slop/SKILL.md), and [evaluation criteria](https://github.com/petergyang/no-ai-slop/blob/main/skills/no-ai-slop/eval.md).

The source addresses writing. The design findings below are my application of its specificity and reader-effort principles to this page. This is an editorial assessment of visible patterns, with no inference about who authored any sentence.

## Copy findings and edits

| Location | Before | Finding | Change |
| --- | --- | --- | --- |
| Opening | “A story about moving water / on ground that keeps moving.” | Repeated wording introduces atmosphere but leaves the subject and consequence unnamed. | State that the story concerns subsidence, canal capacity, and repair. Keep the established project title. |
| Route heading | “Water takes the long way south.” | The claim about a long way is imprecise; the endpoints are useful facts. | Name Friant Dam and the Kern River. |
| Terrain | “The 3D view sets the route in that terrain.” | Describes the presentation rather than the geography or the data relationship. | Explain that the transect crosses the reference canal near Lindsay and that the profile and model use the same USGS export. |
| Ground heading | “Ground that will not hold still.” | Human behavior substitutes for a defined measurement. | Name ground movement and the 2015–January 2024 interval. Name DWR / TRE ALTAMIRA in the paragraph. |
| Samples | “cells near Lindsay and Delano dropped a tenth of a foot or less” | Delano’s −0.12 ft exceeds a tenth of a foot. The prose rounded across its own stated threshold. | Remove that threshold claim. Preserve the exact −0.02, −2.22, and −0.12 ft readings and explain what the sampled cells represent. |
| Capacity heading | “A bottleneck changes what can pass.” | Could describe almost any constrained system. | Identify the Phase 1 reach. Keep the >60% metric, historical scope, and named authority. |
| Repair | “The fix was physical: a new concrete-lined channel…” | A staged reveal delays the actual work. | Start with completion of ten miles of new canal in 2024. Keep the approximately 33-mile project scope. |
| Repair allowance | “room to spare” | Imprecise substitute for the documented design allowance. | Use the 5 ft design provision with its dated Reclamation source. |
| Closing heading | “Water levels can recover. Lost storage may not.” | A paired rhetorical construction carries a valid scientific distinction. | State the mechanism directly: compaction can permanently reduce aquifer storage. Preserve groundwater recovery and potentially lasting storage loss in the paragraph. |
| Closing line | “Restoring the route for water is one task. Protecting the space that stores it is another.” | Restates the conclusion as an aphorism without adding evidence. | Delete it. End on the concrete storage-loss explanation. |
| Ground transition | “But the ground did not sink evenly.” | Repeats the raster paragraph and the following sample graphic. | Delete the separate italic sentence. |
| Brand and labels | “WATER / GROUND”; “A FIELD STORY…” | Generic labels suggest a publication identity without helping locate the subject. | Use Friant–Kern and the geographic location. Keep actionable interface labels. |

The seven-section progression, regional terrain model, sources, dates, measurement units, and scope qualifications remain. Methodological qualifications about canal surveys, sampled cells, historical capacity, and future design allowances are necessary for interpreting the evidence. They were retained even where they contain a literal comparison or negation.

## Design findings and changes

- The opening used three forced title lines, centered copy, and an isolated floating photograph. The revised opening uses a consistent text-and-image grid, an aligned location label, and a two-line title. The photograph has a caption and a clear place in that grid.
- Every chapter inherited a long minimum height. Shorter passages now use less vertical space; the terrain profile and other substantial content can determine their own height. This reduces repeated empty pauses without changing the map's evidence sequence.
- Several heading treatments gave general statements the scale of a finding. More specific headings use a smaller, consistent scale. Prose is 16 px at the tested widths, with supporting labels increased where needed.
- The capacity metric already has scale and a distinct background. Its extra delayed entrance animation was removed. The existing layer transitions and a shorter text entry remain.
- The final section had a large centered heading, a centered paragraph, and an italic recap. Its new left-aligned layout ends after the storage explanation and its scope note.
- Mobile system-scale figures now use readable rows instead of three compressed columns. Their values, scope, and source are preserved.

## Evaluation after editing

Meaning and evidence: preserved the canal story and retained source-linked figures. Corrected the Delano wording rather than changing the data. Added no study result, exposure count, forecast, or pumping attribution.

Voice and proportionality: kept the project title, place names, direct controls, local photographs, serif/sans roles, and seven-section sequence. Replaced the passages identified above; retained the technical context needed for a public reader.

Specificity and syntax: headings now identify locations, variables, time intervals, or project work. Named agencies support the factual claims. The repair paragraph starts with the completed work. Removed the redundant transition and closing recap instead of replacing them with another metaphor.

Presentation: no decorative bold or new card system was introduced. Numerals remain prominent where they carry evidence. The plot and map keep their units and source limitations.

A saved copy of the pre-edit source is in archive/index-before-copy-review.astro.txt. The full edited copy is in src/pages/index.astro and the built page.

## Hosting-path correction

During the visual check, the project used Astro base `/friant-kern` while the existing preview process still used its earlier root configuration. Restarted the preview with the current configuration. Also normalized the runtime asset base to end with a slash; this prevents paths such as `/friant-kerndata/...`. Preserved the configured GitHub Pages site and base.

## Verification

- `npm run build` passed: Astro checked 17 files with no errors, warnings, or hints; all six retained YAML examples validated; the static page built successfully.
- Checked the built preview at `http://127.0.0.1:4330/friant-kern/` at 1280 × 850 and 390 × 844. Fonts and images loaded; neither width showed horizontal overflow.
- Visually checked the opening, terrain chapter, and final aquifer chapter. The terrain map rendered and moving its slider updated the distance/elevation readout. No browser console errors were observed in this pass.
- Saved `previews/copy-review-desktop.png`, `previews/copy-review-mobile.png`, and `previews/copy-review-terrain.png`. Reset the temporary viewport override and left the built preview available.
- This pass did not independently revalidate scientific source data or test on a physical phone.
