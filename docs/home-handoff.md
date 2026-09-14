# Homepage alignment

The homepage now uses the existing library-page palette, Bricolage typography, lp-wrap spacing, buttons, header and footer from PASS MAO and Formations. Route-specific composition lives in src/styles/home-library.css. The old home-page background styling is no longer applied.

All six destinations in homeOptions remain. Three main paths use existing category colors; YouTube, Tools and emails are lighter editorial links below them. Existing biography and proof figures are retained. The portrait is optimized to WebP through Astro.

Production build and diff whitespace check passed. Browser inspected at desktop and 390px mobile, with six destinations, no horizontal overflow, no failed image and a working dark/light toggle. No deployment performed.
