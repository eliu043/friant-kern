# Narrative and visual direction

13 November 2026 · Original review of the relocated prototype. Many recommendations are now implemented; see [REVISION.md](REVISION.md) for the current seven-chapter design and verification record. The recommendations below are retained as design history.

## Editorial direction

Keep **The ground beneath the canal**. The strongest question is: **What happens to a gravity-fed canal when the ground beneath it moves unevenly?** Bring that question into the opening. The current five chapters establish sound evidence boundaries, but delay the physical stakes until chapter four. Introduce the dependence on slope before asking readers to interpret displacement colors.

Suggested opening copy, for a future editorial pass:

> A canal built to carry water by gravity crosses ground that is moving unevenly. Follow the Friant–Kern Canal to see what satellite estimates reveal, what engineering records establish, and where the evidence stops.

This is proposed wording grounded in the existing research package, not a new hydraulic analysis. Keep the reference alignment and raster dates visible throughout.

## Revised five-chapter arc

| Chapter | Reader-facing heading | Narrative job | Map / evidence treatment |
| --- | --- | --- | --- |
| 01 | A canal depends on its slope. | Introduce the route and explain why relative elevation matters. | Reveal the centerline; identify its endpoints. Add a small diagram of gravity conveyance explicitly labeled conceptual, not to scale or measured. |
| 02 | The ground does not move evenly. | Show the dated regional pattern before adding detail. | Add the existing fixed-bin displacement raster. Explain negative values and missing data in plain language. |
| 03 | Three places, different estimates. | Make the regional signal concrete without presenting a canal survey. | Retain the three locators; pair each with a visible value, date, and “regional raster cell” label. Explain why these locators were chosen; do not imply representative sampling. |
| 04 | The engineering record shows the consequence. | Connect the landscape to independently documented capacity problems and repair. | Keep the reference map; add a compact dated record distinguishing the approximately 33-mile project and 10-mile first phase. Add a repair boundary only after obtaining authoritative geometry. |
| 05 | What can this evidence tell us? | End on the supported finding and the next unresolved question. | Reframe the route and retained evidence; summarize what is known, what remains unmeasured, and what data would resolve it. |

Each chapter should offer one main proposition, one visible evidence change or documented record, and one short qualification. The last two chapters currently retain nearly identical layers: use a source-linked engineering inset and a final evidence summary to make those beats distinct without inventing spatial data.

## Specific copy and evidence refinements

- Replace “Repairing the canal does not fix the aquifer.” The present heading makes a broader claim about repair and aquifer outcomes than this prototype measures. “What can this evidence tell us?” fits the actual conclusion.
- Lead chapter three with spatial variation; keep “not a canal survey” immediately beside the values. Retain exact exported values in downloads and popups; consider approximate values in prose only after checking product accuracy. Rounding alone does not establish uncertainty.
- Replace opening interface language about “no simulated outcomes” with a useful reading cue: “Scroll to compare the route and ground movement, 2015–January 2024.” Keep methodology in the evidence desk.
- Explain sample selection. These three cells illustrate differences; they do not support town averages, trends along the entire canal, or a statistical comparison.
- Review the legend’s first category. It currently includes values ≥ −0.1 ft, including positive displacement, while the overall cue says “Lowering.” Label that category explicitly as near-zero / positive values, with the numerical threshold. Do not imply all colored pixels are subsidence.
- Preserve two distinct clocks: the raster ends 1 January 2024; engineering documentation describes a phase completed later in 2024. An annotated timeline would prevent readers from treating the raster as a post-repair assessment.
- Keep the rejected North Crimean comparison in the research appendix and expandable source section. It is useful provenance, but interrupts the main Friant–Kern argument if promoted into the opening.

## Visual identity: a field atlas of water and ground

The [Walton opportunity site](https://opportunity.waltonfamilyfoundation.org/) was reviewed on 13 November 2026. Its opening combines a pale textured field, large high-contrast serif lettering, italic emphasis, generous empty space, and a small identity mark. Later scrolling introduces small photographic fragments and numbered narrative sections. Its page structure also moves from a central question to findings and supporting context. These observations are reference analysis; the recommendations below are our interpretation.

Borrow the typographic confidence and pacing. Build an identity specific to this canal: a continuous dark green line, warm paper, soil-colored evidence, and small cartographic annotations. The current prototype already has much of that palette and an editorial serif/sans pairing.

| Element | Proposed treatment | Purpose |
| --- | --- | --- |
| Page | Warm paper `#F4F1E9`, dark ink `#222E2C` | Continue the existing quiet atlas character. |
| Canal | Deep green `#244D43` with a light halo | Keep the route distinct over every raster bin. |
| Displacement | Retain the six ordered evidence colors and thresholds | Keep analytical meaning stable between chapters. Do not reuse the ramp as decorative chapter colors. |
| Type | Large serif headlines; Mona Sans for body and controls; tabular numerals for data | Separate argument, explanation, and measurement. Use existing local fonts. |
| Motif | A thin line with numbered stations | Carry the route through the title, chapter navigation, and evidence desk. Clearly decorative outside the map. |
| Photography | One verified canal photograph, with location, date, credit, and usage rights, if acquired | Give the structure physical scale. Use documentary imagery only when it adds evidence or orientation. |
| Motion | Short layer fades and restrained camera movement; reduced-motion support | Let the reader follow the evidence. Keep ordinary scrolling and direct chapter navigation. |

Avoid introducing Walton’s mark, borrowed photo assets, or its full animated collage. A canal story needs a stable geographic reference. The map should remain its most visually specific element.

## Reading and interaction priorities

Increase small controls, notes, and metadata from the current 8–11 px range toward readable sizes, then recheck the 390 px layout. Give chapter buttons descriptive labels and larger touch targets. Reduce competing map overlays by grouping secondary controls; retain units, date, no-data meaning, attribution, and current chapter near the evidence. On mobile, test a shorter sticky map or an expandable legend so map furniture does not consume the reading area. Keep sample values available in HTML as well as on canvas.

Before calling the redesign complete, verify text contrast and keyboard focus, forward/reverse chapter changes, direct anchors, reduced motion, mobile legend overlap, and a WebGL failure path. The original previews show the previous layout; they are not proof of these proposed changes.

## Recommended implementation order

1. Revise the opening, chapter headings, sample-selection explanation, ending, and legend wording using the existing claim–evidence matrix.
2. Add the conceptual slope diagram and source-linked engineering timeline, with explicit status and dates.
3. Consolidate typography, spacing, line motif, and mobile control sizes into shared CSS tokens; retain the evidence palette.
4. Acquire authoritative repair geometry or engineering profiles before adding any new geographic claims. Add documentary photography only with verified provenance.

The underlying sources remain in [DATA_AUDIT.md](DATA_AUDIT.md), [CLAIM_EVIDENCE.csv](CLAIM_EVIDENCE.csv), and [FINDINGS.md](FINDINGS.md). This review adds no new measured results.
