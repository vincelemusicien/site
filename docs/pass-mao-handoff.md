# PASS MAO implementation

The new route is /pass-mao/. Page-specific code: src/pages/pass-mao.astro, src/styles/pass-library.css, src/data/pass-library.ts. The original course sources remain src/data/pass-mao.ts and src/data/formations.ts; the adapter merges and deduplicates them into 26 entries, without adding uncertain catalogue entries such as Fondations MAO.

## Checkout
Set PUBLIC_PASS_CHECKOUT_MONTHLY and PUBLIC_PASS_CHECKOUT_ANNUAL to the actual checkout URLs and rebuild. Both values are public URLs, never secret keys. The relevant CTA automatically becomes a direct link and its unavailable state disappears when configured. With neither set, the page accurately explains that online registration is unavailable and offers contact@lemusicien.fr with the chosen plan in the subject. No email is sent automatically.

## Assets
Existing project images under public/images are reused without artistic changes. Five sober thematic catalogue images fill entries that had no dedicated cover, while category colors and typography keep the cards tied to the same system. Three authentic PM School captures show training, sharing and community navigation. Astro produces cached optimized WebP variants at build time; the source files stay untouched. The hero reuses the same optimized course image URLs as the library.

Bricolage Grotesque Bold is self-hosted at public/fonts/bricolage-grotesque-bold.ttf (Google Fonts distribution via fonts.gstatic.com). SIL Open Font License is stored alongside at public/fonts/OFL-Bricolage-Grotesque.txt. No font/CDN requests at runtime.

## Behavior
Eight courses on first load; seven category options, accent-insensitive search, need shortcuts, 26-course expansion, native details, live result count and empty reset. Without JS all courses and native details are available; enhancement-only controls stay hidden. Mobile CTA appears after the hero and hides while pricing/closing CTA is visible. Existing theme switch retained, styles scoped to library-page/.lp. No motion autoplay.

## Limitations
Checkout URLs, legal footer URLs and authentic testimonials were not supplied. Existing legal placeholders elsewhere in the site remain unchanged. No public deployment performed. Impeccable launcher failed permission denied; guidance applied directly, no CLI detector result claimed. Browser verification uses the available Codex browser because agent-browser CLI is not installed.

## Verification performed
Production build succeeds (`npm run build`) and `git diff --check` passes. No duplicate IDs, missing local image files or missing in-page anchor targets in generated HTML. The updated catalogue, PM School gallery and launch pricing were reviewed at the default desktop viewport and at 390 × 844; the page has no horizontal overflow and no failed images. Earlier full-flow checks covered 320, 390, 768, 1280 and 1440 CSS pixels, all 26 disclosures, filters, accent-insensitive search, empty state, keyboard access, checkout fallbacks and dark theme. Evidence is in .impeccable/review/.
