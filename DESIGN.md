---
name: PASS MAO — La bibliothèque de Vince
description: A studio reference library with the appetite of browsing record sleeves, scoped to /pass-mao/.
colors:
  blue: "#2946d3"
  blue-hover: "#2038ab"
  paper: "#f6f7f9"
  surface: "#fff"
  ink: "#182b49"
  muted: "#526077"
  line: "#d9dfE8"
  mist: "#e8ecf5"
  butter: "#f3e59b"
  mix-paper: "#dfe9f5"
  mix-ink: "#203c65"
  create-ink: "#493c0c"
  workflow-paper: "#dcd8ef"
  workflow-ink: "#352c64"
  produce-paper: "#c9dfd2"
  produce-ink: "#204b39"
  logic-ink: "#263d62"
  release-paper: "#e8d7d0"
  release-ink: "#613525"
  manifesto-copy: "#d7e1ef"
  dark-paper: "#162236"
  dark-surface: "#1f3049"
  dark-ink: "#f3f5fa"
  dark-muted: "#bec9d9"
  dark-line: "#3d5069"
  dark-blue: "#aab8ff"
  dark-blue-hover: "#c4cdff"
  dark-mist: "#243854"
typography:
  display:
    fontFamily: "Bricolage, ui-sans-serif, sans-serif"
    fontSize: "clamp(3.5rem, 6.5vw, 5.5rem)"
    fontWeight: 700
    lineHeight: 0.99
    letterSpacing: "-0.04em"
  headline:
    fontFamily: "Bricolage, ui-sans-serif, sans-serif"
    fontSize: "clamp(2.2rem, 4.4vw, 3.5rem)"
    fontWeight: 700
    lineHeight: 1.07
    letterSpacing: "-0.035em"
  title:
    fontFamily: "Bricolage, ui-sans-serif, sans-serif"
    fontSize: "27px"
    fontWeight: 700
    lineHeight: 1.06
    letterSpacing: "-0.025em"
  body:
    fontFamily: "ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.6
  button:
    fontFamily: "ui-sans-serif, system-ui, sans-serif"
    fontSize: "14px"
    fontWeight: 700
    lineHeight: 1.3
  label:
    fontFamily: "ui-sans-serif, system-ui, sans-serif"
    fontSize: "12px"
    fontWeight: 400
  imprint:
    fontFamily: "Georgia, serif"
    fontSize: "17px"
    lineHeight: 1.4
rounded:
  badge: "4px"
  filter: "5px"
  control: "6px"
  button: "7px"
  sleeve: "9px"
  cover-mobile: "10px"
  cover: "12px"
  portrait: "14px"
  community: "16px"
spacing:
  xs: "8px"
  sm: "12px"
  md: "16px"
  lg: "24px"
  xl: "32px"
  xxl: "48px"
components:
  button-primary:
    backgroundColor: "{colors.blue}"
    textColor: "{colors.surface}"
    typography: "{typography.button}"
    rounded: "{rounded.button}"
    padding: "13px 23px"
  button-primary-hover:
    backgroundColor: "{colors.blue-hover}"
  button-outline:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    typography: "{typography.button}"
    rounded: "{rounded.button}"
    padding: "13px 23px"
  search:
    textColor: "{colors.ink}"
    rounded: "{rounded.control}"
    padding: "0 10px"
  navigation-join:
    backgroundColor: "{colors.mist}"
    rounded: "{rounded.control}"
    padding: "9px 16px"
  filter:
    rounded: "{rounded.filter}"
    padding: "10px 11px"
  filter-selected:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
  course-cover:
    rounded: "{rounded.cover}"
    height: "270px"
  price-card:
    rounded: "{rounded.portrait}"
    padding: "34px"
  price-annual:
    backgroundColor: "{colors.mist}"
  community:
    backgroundColor: "{colors.mist}"
    rounded: "{rounded.community}"
    padding: "52px"
---

# Design System: PASS MAO

## Overview

**Creative North Star: “La bibliothèque de studio.”** Approachable, useful and tactile: confident display type, quiet paper surfaces and real course sleeves make music learning feel available to browse. The identity supports Vince’s practical, encouraging teaching voice.

This system applies only to `/pass-mao/`, implemented in `src/pages/pass-mao.astro` and `src/styles/pass-library.css`. The existing global site outside this route is unchanged. The shared header, footer and theme switch retain their site functions, with route-local presentation adjustments.

Key characteristics: expressive titles, category-colored sleeves, generous open sections, compact functional controls and restrained photographic proof.

## Colors

### Primary
Blue identifies actions, links and keyboard focus. Its darker hover shade provides feedback without changing the visual hierarchy.

### Secondary
Butter warms selected supporting details and the annual savings label. Six course families retain consistent pairs: mix paper/mix ink; butter/create ink; workflow paper/workflow ink; produce paper/produce ink; logic ink/white; release paper/release ink. These cover pairs remain fixed in dark mode.

### Neutral
Paper is the canvas, surface supports pricing, ink carries headings and muted carries supporting text. Mist groups community and value content; line defines controls and dividers. The manifesto uses logic ink, paper, manifesto copy and butter.

Dark theme replaces canvas, surface, text, muted, line, blue and mist with their dark tokens. Primary buttons use ink-colored lettering in dark mode. Butter remains constant.

## Typography

Bricolage Grotesque is locally loaded under the family name Bricolage, bold only, with `font-display: swap`. It carries headlines, course titles and prices; system sans carries reading and controls. Georgia appears only as the small library imprint on typographic covers.

Use the frontmatter hierarchy as the desktop baseline. Display headings are tightly tracked and balanced; course names use natural word wrapping. Primary reading is generally (16–18px); compact descriptions and metadata use smaller, explicit styles.

**The Complete Title Rule.** Preserve full course names without arbitrary intra-word breaks or clipping. Typographic titles use `overflow-wrap: normal`, `flex-shrink: 0` and line-height (1.2). At widths up to (600px), typographic titles and long names use (18px). Up to (360px), typographic titles use (16px) with (10px) inline margins, while image-cover titles use (17px). Long names on desktop use (25px). These final overrides supersede earlier stylesheet declarations.

## Layout

The centered content width caps at (1280px), with total horizontal gutters of (96px), then (64px) below (1150px), (40px) below (600px), and (32px) below (360px). Desktop hero uses two columns; the course catalogue uses four columns with (32px × 22px) gaps. At (800px) the hero stacks, the shelf reduces from six covers to three, and the catalogue becomes two columns. At (600px), narrative and pricing sections stack; category filters scroll horizontally and hero actions stack with a full-width primary button.

Open section spacing is generous, commonly (80–104px) on desktop and (54–60px) on mobile. Mobile hero type uses `clamp(2.85rem, 11.5vw, 4.2rem)` with line-height (1.02). The catalogue stays two columns even at the narrowest supported layout.

**The Community Practice Rule.** Present PM School as the practical continuation of the catalogue. A four-step strip links learning, trying, sharing and progressing. Three authentic phone captures sit side by side with restrained rotation on desktop. Below (600px), they become a horizontal, snap-scrolling gallery so each capture stays legible without widening the page.

## Elevation & Depth

Most sections and catalogue cards are flat: spacing, color and borders provide separation. The hero shelf is rotated (−4°), with a staggered middle column and restrained sleeve shadows. Hover lifts individual sleeves; tablet removes the shelf rotation. Only primary button hover, sleeves and the mobile sticky action use shadows; exact values are in the sidecar. Motion lasts (160–180ms) with ease timing. Reduced-motion preference disables route transitions and animations and restores automatic scrolling.

## Shapes

Soft rectangular covers establish the object language. Controls are gently rounded, never oversized pills. Cover, control and container radii are normative in the frontmatter. Circular plus controls distinguish expandable course details; thin dividers keep the FAQ open. Photography retains its proportions, with rounded corners and no decorative overlay.

## Components

- **Buttons:** blue primary and transparent bordered outline; minimum height (52px), reduced to (50px) on mobile. Primary hover darkens and adds a small shadow; outline hover fills with mist. Keyboard focus uses a blue (3px) outline offset (5px).
- **Search:** transparent field with a line-colored border, compact search icon and muted placeholder. Focus-within uses a blue (2px) outline offset (3px). Mobile input text grows to (16px).
- **Navigation:** modest wordmark and text links with underline feedback, plus a mist join control. Mobile hides this join control; the shared header retains member access and theme control.
- **Filters and need chips:** small rectangles, pressed state explicitly visible. Category selection inverts ink and paper; need selection uses mist and a blue border. Search and filter results announce changes accessibly.
- **Course cards:** colored covers above unboxed descriptive copy. Native details reveal descriptions and benefits. The outlined plus rotates (45°) when open. Eight cards appear initially with JavaScript; expansion, search and filters reveal the rest. Without JavaScript all course details remain available.
- **Pricing:** two equal-access plans, with a quiet outlined monthly card and mist annual card. Both carry a butter launch badge and state the future public price close to the current price. On mobile the cards stack.
- **FAQ and mobile action:** native disclosure rows use dividers and plus icons. A fixed, safe-area-aware mobile action appears after the hero and hides while pricing or the closing action is visible.

## Do's and Don'ts

- **Do** scope this identity to PASS MAO and preserve existing global theme behavior.
- **Do** keep recognizable course art, complete titles and consistent category colors.
- **Do** retain visible keyboard focus, native disclosures and reduced-motion support.
- **Don't** reduce PM School to a decorative screenshot; show how it turns training into regular practice.
- **Don't** introduce decorative waveforms, autoplay, a catalogue carousel or fabricated social proof.
- **Don't** turn every narrative section into a card or imply a global redesign from this route.
