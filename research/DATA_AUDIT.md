# Original-data audit

Audit date: 13 November 2026. “Retrieved” below means downloaded and inspected, not merely identified in search. Original bytes and SHA-256 hashes are in `raw/` and `checksums.json`. No original field survey was conducted.

## North Crimean Canal: decision gate failed

**Question tested:** Can a 2021/2024 irrigation comparison quantify change within the North Crimean Canal’s service territory, especially Crimea?

**Finding:** Not with the evidence verified here. General service geography is documented: the canal supplied southern Kherson and Crimea. That is not a cadastral command-area polygon. The North Crimean Canal must not be conflated with the Kakhovka Main Canal or with the whole Kakhovka reservoir irrigation system. A proximity buffer or oblast boundary is not a hydraulic service boundary. No verified, licensed, machine-readable command-area polygon was located in this audit; this is a bounded search result, not a claim that none exists.

The proposed imagery comparison is therefore rejected as a canal-specific analysis. San Joaquin/Friant–Kern is the implemented fallback.

### N1. Baber et al., Irrigation of Kherson and Zaporizhzhia 2019–2025

- Original source: https://zenodo.org/records/22036773; DOI 10.5281/zenodo.22036773. Creator and license metadata retained in `raw/zenodo.json`.
- Publication date in API: see retained record; landing page says 21 August 2026, record created/modified 14 September 2026. These are release/record dates, distinct from observation years.
- License: **CC BY 4.0**, verified in API metadata; page text extraction omitted the license value. Credit Baber and coauthors, link the record, identify transformations.
- Retrieved files: 2021 `...30m_resampled_aeti_RF_v6.tif` and 2024 `...RF_v7_thresholded.tif` only. MD5s match repository checksums exactly.
- Spatial coverage: described by creators as Kherson and Zaporizhzhia oblasts. These are not the NCC service territory and do not provide full coverage of Crimea.
- Both: EPSG:4326, 21,194 columns × 8,874 rows, bounding box 31.5122713462,45.7396989846–37.2239395857,48.1311939340. Grid spacing ≈0.0002694946 degrees. “30 m” names the workflow; geographic pixels are not equal-area 30 m squares at this latitude. Never multiply the count by 900 m².
- 2021: int32; explicit values −999, 0, 1; GeoTIFF nodata metadata **unset**. Counts: 88,132,977 / 97,485,971 / 2,456,608 respectively.
- 2024: int16; values 0 and 1; nodata metadata **unset**. Counts: 186,620,987 / 1,454,569. Zero cannot be assumed to distinguish outside-mask cells from non-irrigation.
- Alignment: identical shape and effective transform to floating-point tolerance. This permits a technical overlay, not substantive comparability by itself.
- Diagnostic common-mask check: using 2021 != −999, 2024 contains 1,453,945 ones inside and 624 outside; only 134,594 cells are one in both years. This is an encoding diagnostic, **not an irrigation-loss estimate**. Stored in `irrigation-mask-check.json`.
- Unresolved: v6/v7 classifier comparability, zero semantics, crop masks, regional labels, and how these file counts reconcile with the paper’s area-adjusted estimates. Do not publish raw pixel-count decline as hectares lost or assign it to a canal.

### N2. Accompanying methods, 2026

https://doi.org/10.3389/frsen.2026.1920951 (published 5 October 2026).
The authors combine optical, thermal, meteorological and water-productivity inputs for summer irrigation classification. Their assessment uses photointerpreted reference samples because occupied territory lacks field-level ground truth. These are estimates of irrigation activity, not metered delivery. Area-adjusted estimates are different from uncorrected raster counts. The paper supports regional agricultural change, not an NCC-only treatment effect.

### N3. Service geography and historical discontinuity

Vyshnevskyi et al., 2024: https://doi.org/10.1080/00207233.2024.2320033. Scholarly interpretation, not a downloaded service polygon. Distinguishes the NCC from Kakhovka Main Canal; canal supply to Crimea was interrupted following the 2014 annexation, while mainland irrigation continued. Thus 2021 is not an intact canal-fed baseline for Crimea. Its irrigable-capacity figures must not be substituted for actually irrigated area. Article reuse rights not verified; no figures copied.

Mission of the President of Ukraine in Crimea, June 2020: https://ppu.gov.ua/wp-content/uploads/2018/10/Water.pdf. Government account of pre-2014 supply; a politically situated historical document, not an independent 2024 spatial measurement. Identified as supplementary context, not used to compute changes or map service boundaries. No license established; linked only.

Borovyk et al., Vol.15(2), 2024: https://esbur.com.ua/en/journals/t-15-2-2024/vpliv-timchasovoyi-okupatsiyi-ta-boyovikh-diy-na-vodny-stan-pivnichno-krimskogo-ta-kakhovskogo-magistralnikh-kanaliv. Satellite study of **canal water condition**, 2013–2024, using Landsat and Sentinel-2. A wet/dry channel observation is not an irrigated-field classification or a service boundary. Original analysis inputs were not retrieved here; no chart/geometry republished.

### Confounders and interpretation

Timeline: 2014 interruption to Crimea; 2022 full-scale invasion and restored canal supply; 6 June 2023 dam destruction; summer 2024 comparison. These are multiple interventions, not one clean before/after experiment. Occupation and displacement, mines and unexploded ordnance, inaccessible fields, damaged pumping/electricity, fertilizer/labor constraints, cropping decisions and weather can all change irrigated classification. Residual water, wells, local runoff, and alternative supplies further complicate interpretation. No matched controls, weather adjustment, metered deliveries or verified command area were established. An image classification difference is an observation about modeled surface conditions; sole-cause attribution would be an inference the audit cannot defend.

## Friant–Kern: evidence adequate for a bounded narrative

### F1. Canal centerline — retrieved

- Snapshot endpoint: https://services6.arcgis.com/osFtgUUq38t5BVQt/arcgis/rest/services/Friant_Kern_Canal/FeatureServer/0/query?where=1%3D1&outFields=*&outSR=4326&f=geojson
- Item: https://www.arcgis.com/home/item.html?id=6bfb1ecacc2f4a01927f8d9468e342e2. Published and modified 21 August 2023; that is the mirror date. Source compilation/update dates unspecified.
- Metadata describes federal canals compiled from 1:24,000 USGS maps, modified using USGS orthophotos. One multiline feature; WGS84 export. Coverage: entire canal, approx. 35.37–37.00°N.
- Licensing: source is federal-derived, mirror public; `licenseInfo` and `accessInformation` unset. Do **not** describe the mirror as explicitly CC-licensed. Retained for this research prototype with provenance; confirm original agency distribution terms before broader republication. App code licensing does not cover this dataset.
- Limitations: reference alignment, not cadastral or as-built; may predate 2024 realignment. No branch network, turnout attribution or service territory. The first search hit for a different mirror returned “Invalid URL”; replaced rather than silently substituting invented geometry.

### F2. DWR / TRE ALTAMIRA cumulative displacement — retrieved

- Catalog: https://data.cnra.ca.gov/dataset/tre-altamira-insar-subsidence. Current catalog metadata retained as `raw/dwr.json`; it covers multiple vintages. We intentionally use a **dated 2015–2024 service**, not the changing latest raster.
- Service: https://gis.water.ca.gov/arcgisimg/rest/services/SAR/Vertical_Displacement_TRE_ALTAMIRA_Total_Since_20150613_20240101/ImageServer
- Measurement window: 13 June 2015–1 January 2024. Variable: vertical ground displacement **feet**, not annual rate, groundwater depth, or elevation above sea level. Negative = lowering. Not a post-repair evaluation.
- Resolution: underlying observations averaged over roughly 100 m × 100 m; interpolated service grid ≈0.0011336° × 0.00089982°. This is not a 1 m engineering survey.
- Export: `bbox=-120.1,35.2,-118.6,37.2&bboxSR=4326&imageSR=4326&size=1200,2000&format=tiff&pixelType=F32&noData=-9999&interpolation=RSP_NearestNeighbor&f=image`.
- Important: server adjusted extent to preserve aspect ratio. **Actual** TIFF bounds: −120.1,34.95 to −118.6,37.45; 1,200 × 2,000; grid 0.00125°; Float32; nodata −9999. Display follows the returned geotransform, not requested bbox. Retained as `raw/displacement-2024.tif`.
- Processing: nearest-neighbor reprojection to Web Mercator for local PNG; six fixed categories; nodata transparent. Processing code in `scripts/prepare_data.py`; output footprint in `public/data/raster-meta.json`. Display range clipped by bins, not normalized anew per chapter.
- Three sampled values at approximate town locators: −0.02, −2.22, −0.12 ft. Point coordinates and provenance are in local GeoJSON. These are pixel estimates at specified points, **not canal lining measurements**, and are not representative samples of whole towns.
- License: catalog rights say “No restrictions on public use”; formal license field unspecified. DWR warranty/fitness disclaimers apply. Credit DWR/TRE ALTAMIRA. Accuracy reports are linked in catalog; no universal ± error is assigned to every displayed pixel. Spatially correlated errors, interpolation, decorrelation, reference-frame assumptions and resampling constrain interpretation.
- Local crop extrema are not canal maxima. No subsidence/pumping regression, well attribution or hydraulic calculation was performed.

### F3. Engineering record — primary documents

2020 final EIS: https://www.usbr.gov/mp/nepa/includes/documentShow.php?Doc_ID=46744. Reclamation project history: https://www.usbr.gov/mp/sccao/general-project.html. Federal documents establish capacity concerns and distinguish the broader approximately 33-mile middle reach (MP88–121/121.5 depending on document rounding) from the critical approximately 10-mile first phase completed in 2024. Original design issues and other factors also matter. These are narrative records, not GIS construction footprints or a current flow time series. No project polygon is digitized. Later project webpages are mutable; audit date provided, 2020 document is the historical anchor. Federal text is linked, no report figures reproduced.

### F4. USGS mechanism — primary agency synthesis

https://www.usgs.gov/centers/land-subsidence-in-california/science/aquifer-compaction-due-groundwater-pumping (18 October 2018). Explains aquifer-system compaction and conveyance effects. This is regional physical context, not local pumping measurement. Linked rather than reproduced. No groundwater well layer was downloaded or inferred.

### F5. Basemap and town locators

OSM Standard raster tiles, live: https://tile.openstreetmap.org/{z}/{x}/{y}.png. © OpenStreetMap contributors, ODbL data; https://www.openstreetmap.org/copyright and tile usage terms apply. Internet-dependent, orientation only; never used for measurement. Can be switched off. Local approximate town labels are editorial locators; not field observations. Local evidence layers and text remain accessible without external tiles after installation/build.

## Assignment check

Original assignment downloaded successfully with curl after web-reader failure: https://designpractices.org/assignments/04-representation/. Local presentation is explicitly allowed. Requirements addressed: deliberate scale/style, purposeful interaction, readable unattended use, runnable source, and a separate text record of code origins. The user should review/explain the implementation before submitting; this is explicitly AI-assisted work, not a claim of independent student authorship.
