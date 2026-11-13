# Relocation record — 13 November 2026

Moved the deliverables from the **Build canal spatial narrative** chat (`01a1d53b-72d1-7a53-abb8-a87fdc2e8009`) to `/Users/ericliu/Documents/GitHub/friant-kern`.

The Astro app is at the destination root. Both original previews are in `previews/`; the unchanged original ZIP is in `archives/`. All scratch research material, including the original template checkout and Python environment, is retained in `work/`. The stray workspace lockfile is retained there as `workspace-package-lock.json`. Empty source folders and macOS folder metadata were left behind.

Transfer verified against 83 project-file SHA-256 hashes before subsequent documentation updates and build regeneration. The manifest excludes node_modules, .astro caches, and .DS_Store. All raw research files were separately rechecked against `research/checksums.json`; the original ZIP passed its integrity check.

`ASTRO_TELEMETRY_DISABLED=1 npm run build` passed from the new root: 0 errors, 0 warnings, 0 hints; six example YAML files validated; one static page generated. The 34-file Astro check also discovered retained template files in the archived `work/` checkout. No new browser interaction test was performed on the relocated app; the original browser verification and screenshots remain documented in `VALIDATION.md`.

Added `NARRATIVE_DESIGN_REVIEW.md`, updated README navigation, and ignored archival `work/` and Python environment/cache folders for future Git use. The application narrative, styling, and analytical assets were preserved. No publication or remote repository action was performed.
