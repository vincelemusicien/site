# Catalogue Formations

The /formations/ route extends the established PASS MAO identity. It imports the same styles and uses the same BaseLayout, Header, Footer and shared CourseCover component. Catalogue-specific layout is in src/styles/catalogue.css. No new visual direction or assets.

src/data/catalogue.ts merges all 23 entries from formations.ts with the Pass library by normalized title: 27 distinct products. Existing direct product URLs are retained, including the Défi Songwriting page. Pass-only resources link to the matching course anchor. Entries without a dedicated sale page use the existing Systeme.io catalogue; no purchase availability or level is invented.

Eight category filters, accent-insensitive search, five need-based selections, three featured entry points, empty state and reset. All product links and copy are rendered into HTML. Without JavaScript all 27 products remain visible. Mobile uses one comfortable card per row and horizontally scrollable categories. Personal services are a separate contact section.

The existing /compression/ URL returned 404 during verification and was replaced with the existing Systeme.io catalogue (200). All eight other checked external destinations responded 200. Legal footer placeholders remain inherited from the shared footer.

Verification: production build succeeds; generated HTML contains 27 product IDs, one H1, no duplicate IDs, no missing image files and no broken local anchors. Desktop and 390px mobile layouts reviewed without horizontal overflow. Mixage filter returns four courses; accent-insensitive “etincelle” returns one; empty state and reset work; finishing need returns Musicien Productif, Finish Line and L’Art de finir. Browser viewport restored after review.
