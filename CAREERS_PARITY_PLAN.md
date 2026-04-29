# Careers ↔ Homepage typographic & motion parity pass

## Context

`Careers.jsx` was built to its own typographic spec and has drifted from the homepage system in ways that compound: the hero h1 maxes at 44px vs the homepage's 68px, the "#jointhevoyage" line is rendered as 32–52px Plus Jakarta Sans 600 (display-sized type in marketing sans — violates AGENT.md §3.1), section intro paragraphs are 16px instead of 17px, the CTA at the bottom uses a tighter `-0.025em` letter-spacing where the rest of the site uses `-0.02em`, and the hero entrance is a CSS `fadeInUp` keyframe instead of the homepage's Motion clip-path reveal. The cumulative effect is a Careers page that *almost* feels like the homepage — which is worse than feeling completely different, because the eye registers the inconsistency as sloppiness.

This pass tightens every typographic, spacing and motion delta so a reader scrolling from `/` to `/careers` cannot tell where one page ends and the other begins. No layout changes, no redesigned components — just parity.

User chose to keep `#jointhevoyage` at hero scale but switch it to **Adrianna Extended** so both display lines pair correctly. Per AGENT.md §10 (override rule): two competing Adrianna lines is a deliberate deviation from §3.1 ("one Adrianna line per section"); document it inline.

---

## Files to edit / create

**Edit:**
- `src/pages/Careers.jsx` — all typographic, spacing, and motion-wiring changes.
- `src/components/ValueCard.jsx` — add `.value-icon-reveal` hook on the icon container (§D).
- `src/styles/global.css` — append the `.value-icon-reveal` keyframe + reduced-motion fallback (§D).

**Create (new graphics, all under `src/components/sections/careers/`):**
- `OperatorCapacity.jsx` — Mission graphic 1 (§A1).
- `PartnerNetwork.jsx` — Mission graphic 2 (§A2).
- `SignalToInsight.jsx` — Mission graphic 3 (§A3).
- `HowDecisionsFlow.jsx` — dark process band (§C).

The shared primitives (`Section`, `SectionLabel`, `BenefitCard`, `DetailSection`, `Reveal`, `MaskReveal`, `CountUp`, `lift-card`, `useInView`) are already correct. Reuse them — do not fork.

---

## Reference values (from homepage / AGENT.md)

| Token / value | Source |
| --- | --- |
| Hero h1 | `clamp(38px, 5.8vw, 68px)`, weight 700, `var(--font-display)`, line-height 1.1, letter-spacing `-0.035em` (`Home.jsx:117–125`) |
| Hero body | `clamp(16px, 2vw, 18px)`, weight 300, `rgba(255,255,255,0.55)`, line-height 1.75, max-width 560 (`Home.jsx:148–161`) |
| Hero padding | `120px 24px 80px`, `min-height: 100vh` (`Home.jsx:42–48`) |
| Hero teal animated line | `motion.h1` with `clipPath: inset(0 100% 0 0) → inset(0 0% 0 0)`, 0.7s, delay 0.2s, ease `[0.6, 0.01, 0.05, 1]` (`Home.jsx:131–146`) |
| Hero image reveal | `picture` + `clipPath` transition 1000ms `cubic-bezier(0.6, 0.01, 0.05, 1)`, `filter: brightness(0.3) saturate(0.7)` (`Home.jsx:52–86`) |
| Section h2 | `clamp(28px, 3.5vw, 42px)`, weight 700, navy, line-height 1.25, letter-spacing `-0.02em` (`Home.jsx:231–244`) |
| Section intro paragraph | **17px**, weight 400, `COLORS.textMuted`, line-height 1.7, max-width **540** (`Home.jsx:245–258`) |
| Dark CTA h2 | `clamp(28px, 3.5vw, 42px)`, letter-spacing `-0.02em`, line-height 1.25 (`Home.jsx:543–555`) |
| Dark CTA body | 17px, weight 300, `rgba(255,255,255,0.5)`, line-height 1.7, max-width 540, margin-bottom 40 (`Home.jsx:556–570`) |
| Dark CTA icon chip | 56×56, radius 12, `rgba(3,166,150,0.15)` bg, copper-light icon, margin-bottom 28 (`Home.jsx:528–542`) |

Existing tokens to use: `var(--font-display)`, `var(--ease-voyfai)`, `COLORS.copperLight`, `COLORS.textMuted`, `COLORS.navy`, `COLORS.white`, `RADIUS.lg`, `Icons.sparkles` (or another existing icon — verify in `src/constants/icons.js` before picking).

---

## Changes — section by section

### 1. Hero  (`Careers.jsx:162–259`)

- `min-height: 80vh` → **`100vh`** (match `Home.jsx:42`).
- Padding `140px 24px 100px` → **`120px 24px 80px`**.
- Replace the static `linear-gradient + url()` background `<div>` with a `<picture>` element using the existing `voyfai_careers_hero_1777475797821.png` (or pre-generated AVIF/WebP variants if available — otherwise keep PNG) wrapped in the homepage's clip-path reveal pattern: `clipPath: heroLoaded ? "inset(0 0 0 0)" : "inset(0 100% 0 0)"` with `transition: clip-path 1000ms cubic-bezier(0.6, 0.01, 0.05, 1)`, `filter: brightness(0.3) saturate(0.7)`. Use the same `useReducedMotion` hook + `heroLoaded` state pattern from `Home.jsx:33–34, 71`.
- Keep the two overlay divs (gradient + vignette) but mirror the homepage's gradient values for tonal parity:
  ```
  linear-gradient(180deg, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.1) 40%, rgba(0,0,0,0.6) 100%),
  radial-gradient(ellipse 800px 600px at 20% 80%, rgba(3,166,150,0.06) 0%, transparent 60%)
  ```
- Remove the wrapping `animation: "fadeInUp 900ms ..."` on the inner content `<div>` and replace with `animation: "fadeInUp 1s ease"` to match `Home.jsx:113`.
- Replace the `#jointhevoyage` div with a `motion.h1` styled identically to the homepage's animated teal line:
  - `fontFamily: "var(--font-display)"`
  - `fontSize: "clamp(38px, 5.8vw, 68px)"`
  - `fontWeight: 700`, `color: COLORS.copperLight`
  - `lineHeight: 1.1`, `letterSpacing: "-0.035em"`
  - `margin: "0 0 8px"` (or `0 0 36px` if used as the second line — see below)
  - Animate via `initial={{ clipPath: "inset(0 100% 0 0)" }}` → `animate={{ clipPath: "inset(0 0% 0 0)" }}`, `transition={{ duration: 0.7, delay: 0.2, ease: [0.6, 0.01, 0.05, 1] }}`, with `useReducedMotion` fallback to opacity.
- Promote the headline `h1` to homepage proportions:
  - `fontSize: "clamp(38px, 5.8vw, 68px)"` (was 28–44).
  - `letterSpacing: "-0.035em"` (was `-0.02em`).
  - `lineHeight: 1.1` (was 1.2).
  - Split into a structured 2-line headline. Two viable orderings — pick whichever reads best to the user; the plan uses the first:
    1. **`#jointhevoyage`** (teal Adrianna, animated clipPath) on top, then **`Shape the future of freight forwarding.`** (white Adrianna static) below — campaign hashtag becomes the eyebrow-equivalent moment, statement of intent is the body of the hero.
    2. Reverse: white statement first, then `#jointhevoyage` as the teal animated payoff.
  - Add a top-of-file comment: `// Hero intentionally pairs two Adrianna display lines (#jointhevoyage + headline) per AGENT.md §10 user override of §3.1.`
- Body paragraph (`Careers.jsx:230–244`):
  - `fontSize` `clamp(15px, 1.8vw, 17px)` → **`clamp(16px, 2vw, 18px)`**.
  - `color: "rgba(255,255,255,0.62)"` → **`"rgba(255,255,255,0.55)"`**.
  - `maxWidth: 580` → **`560`**.
  - `lineHeight: 1.75` ✓ keep.
  - `margin: "0 auto 40px"` → **`"0 auto 48px"`** (matches `Home.jsx:156`).
- CTA wrapper `gap: 12` → **`16`** (`Home.jsx:166`).
- Append a scroll indicator block matching `Home.jsx:179–224` (the small "Scroll" label + animated 1px line). Same component pattern, no new code paths.

### 2. Section intro paragraphs (Values, Life at Voyfai, How We Work, Perks, Open Positions)

Five copies of the same heading block; all five need the same touch. Reference the homepage's intro pattern (`Home.jsx:245–258`).

| Property | Current Careers | Target |
| --- | --- | --- |
| `fontSize` | `16` | `17` |
| `maxWidth` | `560` | `540` |
| `lineHeight` | `1.7` ✓ | `1.7` |
| `fontWeight` | `400` ✓ | `400` |
| `color` | `COLORS.textMuted` ✓ | `COLORS.textMuted` |

Locations:
- `Careers.jsx:305–317` (Values)
- `Careers.jsx:355–367` (Life at Voyfai)
- `Careers.jsx:436–448` (How We Work)
- `Careers.jsx:485–497` (Perks)
- `Careers.jsx:550–562` (Open Positions)

Headings (`h2`) themselves are already on-spec — leave untouched.

### 3. Values grid gap  (`Careers.jsx:320–326`)

`gap: 20` → **`16`** to match every other grid on the site (Home benefits flex via `gap: 0` w/ benefit-card flex; Home testimonials, Careers life/perks/jobs all use 16).

### 4. Open Positions intro spacing  (`Careers.jsx:550–562`)

`margin: "0 auto 24px"` → **`"0 auto 40px"`** for parity with every other section's heading-to-content gap (40px).

### 5. Dark final CTA  (`Careers.jsx:664–721`)

Bring this block into pixel-parity with `Home.jsx:498–599`. Concrete edits:

- Section background gradient and overlay are already aligned ✓ — leave.
- Add an icon chip above the h2 mirroring `Home.jsx:528–542`: 56×56, `borderRadius: 12`, `background: "rgba(3,166,150,0.15)"`, `color: COLORS.copperLight`, `margin: "0 auto 28px"`. Choose an icon from `src/constants/icons.js` that fits "apply / opportunity" — `Icons.sparkles`, `Icons.send`, or `Icons.arrowRight` are likely candidates. Verify the icon set before picking.
- h2 (`Careers.jsx:690–702`):
  - `fontSize: "clamp(28px, 4vw, 44px)"` → **`"clamp(28px, 3.5vw, 42px)"`**.
  - `letterSpacing: "-0.025em"` → **`"-0.02em"`**.
  - `lineHeight: 1.2` → **`1.25`**.
  - `margin: "0 0 16px"` ✓ keep.
- Body paragraph (`Careers.jsx:703–715`):
  - `lineHeight: 1.75` → **`1.7`** (matches `Home.jsx:561`).
  - `maxWidth: 480` → **`540`**.
  - `margin: "0 auto 36px"` → **`"0 auto 40px"`**.
  - `color: "rgba(255,255,255,0.5)"` ✓ keep.
- CTA wrap: wrap the single anchor in a flex container with `gap: 16, justifyContent: "center", flexWrap: "wrap"` so future second CTAs drop in without restructuring (match `Home.jsx:571–578`).

### 6. Sentence-case copy audit (cheap to bundle in this pass)

AGENT.md §3.1 mandates sentence case. Current Careers strings that violate:
- `Careers.jsx:215` `#jointhevoyage` — keep lowercase as-is, it's a hashtag.
- `Careers.jsx:520` `"Join Our Team!"` → `"Join our team."` (drop exclamation — see §7 anti-patterns; remove Title Case).
- `Careers.jsx:524` `"View All Jobs on Ashby"` → `"View all jobs on Ashby"`.
- `Careers.jsx:626` `"View All Jobs on Ashby"` → `"View all jobs on Ashby"`.
- `Careers.jsx:701` `"Ready to Shape the Future?"` → `"Ready to shape the future?"`.
- `Careers.jsx:97, 103, 109, 115, 121, 127, 133, 139` — perk titles are Title Case ("Competitive Compensation", "Sustainable Pace", etc.). Convert to sentence case ("Competitive compensation", "Sustainable pace") — these render as h4s, AGENT.md applies.
- `Careers.jsx:21, 27, 35` — value titles are Title Case ("Voyaging Together", etc.) — same treatment.
- `Careers.jsx:45, 51, 57` — Life titles same.

This is the kind of polish §11 calls out as the bar — running this audit alongside the typographic pass costs nothing and removes a class of "almost right" feeling.

---

---

## Premium animated graphics — added scope

The homepage earns its motion budget with five purposeful animation moments: the hero clip-reveal, the partner-stats CountUp + scaleX dividers, the four `tech/` product mocks (`RateCompare`, `ShipmentIntake`, `HubTracker`, `CustomsScan`), the `BenchmarkChart` bars, the `CustomsFlow` SVG paths, and the `HubPreview` table choreography. Careers currently has zero. Below is a calibrated set that mirrors the homepage's craft level — each one *communicates something specific about Voyfai's work*, not decoration. Built with the same primitives already in `src/components/motion/` and `motion/react`.

Each graphic should live in **`src/components/sections/careers/`** (new directory) and reuse `useInView` (`src/hooks/useInView.js`) for scroll triggers. Match the framing of the existing `tech/` graphics: ~200px height, white background, single tight motion moment, 50–90 lines each.

### A. Mission section — three interactive graphics  *(highest impact)*

The Mission section (`Careers.jsx:262–284`) currently renders the `DetailSection` component with `items` lacking the `graphic` field. The component already supports graphics (`DetailSection.jsx:60–64`) — passing them in unlocks the four-up homepage-style layout. Build three:

1. **`OperatorCapacity.jsx`** — for "Operator Capacity". A small task-list mock: 8 line-items with checkmark states. On scroll-in, items toggle from grey "manual" rows to teal "automated" rows in a 60ms stagger over ~1s, with a small "tasks automated" counter at the top counting up from 0 → 6/8. Mirrors the way `RateCompare` cycles state.
2. **`PartnerNetwork.jsx`** — for "Independent Forwarder Strength". An SVG showing 8 partner-company nodes arranged in a soft arc, with a central Voyfai hub. Connector lines draw in via `stroke-dasharray` (same technique as `CustomsFlow.jsx`) on scroll-in over 900ms, then a single node pulses gently to imply autonomy. No labels — purely structural.
3. **`SignalToInsight.jsx`** — for "Better Logistics Decisions". A small `HorizontalBars`-style chart (reuse `src/components/charts/HorizontalBars.jsx` if its API fits, else inline) showing 4 raw "shipment events" lines on the left collapsing into 1 "decision" line on the right. Animates via Motion `width` + `opacity` over 1s, ease-out-expo.

These three slot in by adding `graphic: <OperatorCapacity />` etc. to the `items` array on `Careers.jsx:267–283`. `DetailSection` does the layout — no other component changes.

### B. Stats row CountUp + scaleX dividers  *(must do — parity with homepage)*

`Careers.jsx:397–414`. Today it's four static `StatBlock` components with text labels ("Freight / AI / Group / Hybrid"). The homepage's equivalent (`Home.jsx:354–405`) has CountUp on the numbers + a `motion.div scaleX 0→1` divider drawn left-to-right with 100ms stagger. Two paths:

- **Recommended:** swap the labels for real numbers and use the same pattern: e.g. `8` partner companies, `6` countries, `25` office locations, `2024` founded. Reuse `CountUp` from `src/components/motion/CountUp.jsx` with `duration={1400}` and per-stat `delay={i * 100}`. Wrap each value in the `paddingBottom: 16` + animated divider block from `Home.jsx:368–391` exactly. Cost: ~30 lines of edit, no new components.
- **Alternative (if real numbers aren't approved):** keep the text labels but apply the divider draw + a 60ms stagger reveal on the StatBlock values via `MaskReveal` (`src/components/motion/MaskReveal.jsx`).

### C. "Process band" — punctuation between Values and Life at Voyfai  *(medium impact)*

The homepage uses dark sections (`BenchmarkChart`, `CustomsFlow`) as visual punctuation that resets the eye between content blocks. Careers currently runs five cream/warm-white sections back-to-back. Insert one dark band after Values (`Careers.jsx:334`) and before Life at Voyfai (`Careers.jsx:337`):

- **`HowDecisionsFlow.jsx`** in `src/components/sections/careers/`. Dark `var(--voyfai-ink)` background, full-width, ~72vh min-height. A horizontal SVG flow with five labeled nodes: `Operator feedback → Domain review → Build → Validate → Ship`. Uses the same stroke-dasharray technique as `CustomsFlow.jsx:242–254` for the connecting line, with each node lighting up in sequence on scroll-in (~1.6s total). One short headline above ("How decisions get made here") in `var(--font-display)` at the standard h2 clamp. No body copy — the graphic *is* the content.

This adds a sixth section but preserves narrative pacing.

### D. ValueCard icon motion  *(low risk, high polish)*

`ValueCard.jsx:17–32`. Currently icons are static. On scroll-in (already wrapped in `Reveal`), animate the icon container: `scale(0.92) → 1` + the icon SVG itself rotating in by ±4deg with `--ease-voyfai`, 600ms, 80ms staggered between cards via the existing `delay` prop on `Reveal`. CSS-only via a new `.value-icon-reveal` class in `global.css` — no JS. AGENT.md §4.5 explicitly endorses this pattern for icon containers.

### E. TeamSpotlight quote reveal  *(low risk, high polish)*

`Careers.jsx:461–463` renders `TeamSpotlight` with three quote cards. On scroll-in, reveal each quote with a `MaskReveal` (`src/components/motion/MaskReveal.jsx`) at the line level — body text translates `y: 12% → 0%` + opacity `0 → 1` with 60ms inter-line stagger, 700ms `--ease-voyfai`. Adds the deliberate "this matters" weight the homepage hero gets, applied to the most quotable copy on Careers.

### F. Life at Voyfai image — subtle parallax  *(optional)*

`Careers.jsx:371–379`. The static image gets a 12% parallax differential on scroll (well under the 15% AGENT.md ceiling, §4.6). Implement with a single `useScroll` + `useTransform` from `motion/react` translating the image `y` based on viewport progress. ~10 lines of code; no layout changes. Skip if scope is tight.

### Scope ordering (so cuts are clean)

| Tier | Item | Why |
| --- | --- | --- |
| **MUST** | A1–A3 (Mission graphics), B (Stats CountUp) | These two restore homepage-level density of motion to Careers. Without them, Careers reads as the cheap version. |
| **SHOULD** | C (Process band), D (Value icons), E (Team quotes) | Push Careers from "consistent" into "considered". Each is small in isolation but compounds. |
| **COULD** | F (Image parallax) | Pure polish; ship if there's time. |

If the user wants a tighter ship, the **MUST** tier alone closes the gap with the homepage. The full set is the $200K version.

---

## Out of scope (flagged, not changed)

- `TealCTABanner` (`src/components/TealCTABanner.jsx`) uses a teal-to-teal gradient — direct violation of AGENT.md §3.2 ("No gradients. Not on buttons, not on backgrounds, not on hover states."). Recommend a follow-up to flatten it to a solid `var(--voyfai-teal)` panel, but only on user approval since it's a pre-existing brand decision visible site-wide.
- `DetailSection` cards use hardcoded `borderRadius: 10` while every other card on both pages uses `RADIUS.lg` (16). Worth normalizing in a separate pass — touches Home and Careers.
- The "Life at Voyfai" stats row uses `COLORS.white` background with `COLORS.cream` section bg; the homepage doesn't have an equivalent stat block, so no comparison is available. Leave as-is.

---

## Verification

1. **Run the dev server** if it isn't running: `npm run dev` (already up at `http://localhost:5173/voyfai-website/`).
2. **Visual diff** — open `/voyfai-website/` and `/voyfai-website/careers` side-by-side in two browser windows at 1440px width. Scroll both. Specific checks:
   - Hero h1 reads at the same size on both pages (measure in DevTools — should be 68px at desktop).
   - The teal animated line on Careers reveals via the same clip-path easing as the homepage's "Stronger Together." line.
   - Section intro paragraphs render at 17px on every Careers section.
   - Dark final CTA on Careers matches the home dark CTA in h2 size, body width, and icon chip.
3. **Reduced motion** — toggle "Reduce motion" in macOS System Settings and reload Careers. Hero image should not clip-reveal; h1 should fade rather than clip-path. CSS in `global.css:1792–1831` handles the rest globally.
4. **Mobile (375px)** — narrow the viewport. Hero h1 should clamp to 38px floor (visible at small widths). Dark CTA h2 should clamp to 28px.
5. **Console / Lighthouse** — run a quick Lighthouse on `/careers` after changes; AGENT.md §6 sets a 95+ Perf bar. The hero `<picture>` swap and the four new graphics can affect LCP and TBT — verify neither is regressed. CLS must stay <0.05.
6. **Animated graphics, individually** — for each new component (`OperatorCapacity`, `PartnerNetwork`, `SignalToInsight`, `HowDecisionsFlow`):
   - Scroll the section into view fresh (hard reload). Animation should fire once, completely, with no layout shift on either side of the scroll trigger.
   - Replay at 25% in DevTools > Animations and confirm: easing matches `--ease-voyfai` / `--ease-out-expo`, durations land in the 700–1600ms band per AGENT.md §4.3, no `ease-in` anywhere.
   - Toggle reduced motion — each graphic should fall back to a static end-state (no movement), not disappear.
7. **Stats row** — verify CountUp fires once on scroll-in and the divider scaleX completes left-to-right, staggered. Tabular-nums only.
8. **Self-review pass** (per AGENT.md §9) — produce the mandatory Before/After table covering every numerical and motion change, then a "find three things to cut or tighten" pass before declaring done.
