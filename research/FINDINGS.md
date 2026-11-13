# Findings and limitations

**Decision:** implement the San Joaquin/Friant–Kern fallback. The original North Crimean Canal question is compelling, but its canal-specific 2021/2024 comparison is not defensible from the verified inputs. The result is a working five-chapter Astro–MapLibre prototype, not a completed causal GIS study.

## What the original-data audit changed

The two original irrigation GeoTIFFs were downloaded, their repository MD5 checksums matched, and their grids and value encodings inspected. Their geographic grids align. Their masks do not have equivalent encodings: the 2021 file has an explicit −999 category while the 2024 file has only zero/one and no nodata metadata. Zero cannot safely become a “not irrigated” observation throughout the export rectangle. The two files also name different classifier versions. Raw pixel counts were not converted to hectares or presented as field loss.

Most importantly, the data creators describe coverage as Kherson and Zaporizhzhia, not the North Crimean Canal service area or full Crimea. No verified command-area polygon was located. A canal buffer would invent hydraulic membership. The 2021 baseline also follows the interruption of supply to Crimea beginning in 2014. Mainland continuation and Crimean interruption must be distinguished. A reservoir-wide or multi-canal result cannot be relabeled as an NCC statistic. See [original data](https://zenodo.org/records/22036773), [methods](https://doi.org/10.3389/frsen.2026.1920951), and [reservoir/canal research](https://doi.org/10.1080/00207233.2024.2320033).

The before/after dates span invasion, occupation, changes in electricity and pumping infrastructure, mine contamination, field access, crop choice and weather, as well as dam destruction. None is controlled in this prototype. Satellite irrigation classification observes a modeled agricultural signal; it does not isolate the cause. The complete North Crimean audit and conditional storyboard remain in the research folder, with original files and hashes.

## What the fallback supports

The implemented sequence reveals the reference canal alignment, adds a dated regional displacement raster, introduces three sampled cells, connects these to engineering records, then states the limits of interpretation.

The DWR/TRE ALTAMIRA raster describes cumulative displacement from 13 June 2015 to 1 January 2024. At the three stated approximate locators the exported raster returns −0.02, −2.22 and −0.12 feet. These samples illustrate variation; they are not representative town averages or surveys of the canal lining. The display uses fixed bins and preserves transparent no-data. See [DWR source and accuracy reports](https://data.cnra.ca.gov/dataset/tre-altamira-insar-subsidence).

Reclamation independently documents capacity concerns and identifies regional subsidence, original design deficiencies and other factors. The broader middle-reach project covers approximately 33 miles; the critical approximately 10-mile first phase was completed in 2024. No project boundary is guessed from canal proximity, and no flow capacity is calculated from raster colors. See [2020 final EIS](https://www.usbr.gov/mp/nepa/includes/documentShow.php?Doc_ID=46744) and [project history](https://www.usbr.gov/mp/sccao/general-project.html).

USGS supplies an established physical explanation linking groundwater decline to compaction in fine-grained sediments. This supports the regional interpretation; the prototype includes no well-specific pumping record or attribution. See [USGS mechanism](https://www.usgs.gov/centers/land-subsidence-in-california/science/aquifer-compaction-due-groundwater-pumping).

## Practical limits

- Regional InSAR estimates and interpolation are not engineering-grade canal surveys. Resampled export pixels do not increase information resolution.
- The DWR export returned an expanded extent. Processing uses the actual TIFF geotransform, then nearest-neighbor Web Mercator reprojection; requested bounds are not incorrectly imposed on the display.
- The canal centerline is a historical federal-derived compilation hosted by a public mirror. Original compilation date and mirror license are unspecified. It may predate repairs; confirm distribution terms for broader publication.
- The raster ends before completion of the 2024 works. This is not a post-repair effectiveness assessment, a current subsidence map, or a future projection.
- No groundwater time series, water-delivery series, hydraulic model, crop-water-demand model or counterfactual analysis was built. No individual farmer or well is assigned responsibility.
- External OSM tiles provide orientation only. Local evidence layers, citations and narrative remain available if those tiles fail; initial dependency installation requires internet. A browser without WebGL can read the narrative and download data but cannot render the interactive map.

The evidence supports the bounded narrative **“uneven regional ground movement intersects infrastructure with documented capacity problems.”** It does not support **“these particular pumping wells caused this amount of lost canal flow.”**

## Next research increment

For Friant–Kern, add dated engineering survey profiles, officially georeferenced repair extents, carefully screened groundwater monitoring records and operational capacity measurements. For North Crimea, first obtain authenticated historical command areas and reconcile classification semantics/masks and uncertainty on a common equal-area grid; then distinguish mainland from Crimea and test competing explanations. Neither missing dataset is replaced here with a fabricated layer.
