# OverlaysNow-Inspired Homepage + Product Profile Design (Performance-First)

## 1) Title and goal

**Title:** OverlaysNow-inspired (not clone) visual refresh for Homepage + Product Profile (PDP)

**Goal:** Deliver a premium, modern visual direction inspired by OverlaysNow’s clarity and motion language while staying original to this storefront’s brand, with strict performance-first implementation and no autoplay media.

## 2) Scope and non-goals

### Scope
- Redesign information architecture and UX hierarchy for:
  - Homepage
  - Product Profile (PDP) at `shop/[slug]`
- Define a reusable animation system for these surfaces.
- Map required UI changes to existing codebase files/components.
- Establish enforceable performance limits and QA checks.

### Non-goals
- Full design system rewrite.
- Backend/catalog API contract changes.
- Checkout/cart flow redesign.
- Introducing autoplay videos, cinematic background media, or continuous loop animations.
- Building Related Products if it violates performance guardrails (feature remains optional/deferred).

## 3) Homepage IA (5 sections in exact order)

Homepage must render these sections in this exact sequence:

1. **Hero**
   - Clear value proposition, primary CTA, optional secondary CTA.
   - One visually strong static image (single `priority` image on page).
2. **Trust strip**
   - Short credibility items (e.g., shipping, quality, returns, secure checkout).
   - Lightweight icon + text presentation.
3. **New In grid**
   - Latest products, quick-scan card layout, strong product imagery.
   - Keep first visible rows lightweight and optimized.
4. **Collection highlight banner**
   - Editorial-style callout to a key collection/campaign.
   - Single focused CTA.
5. **Testimonials**
   - Compact social proof, text-first for speed.

## 4) Product Profile IA and UX hierarchy

PDP hierarchy from top to bottom:

1. **Breadcrumb + product title**
   - Breadcrumb for context/discoverability.
   - Product title and high-signal metadata immediately visible.
2. **Gallery**
   - Primary product image and thumbnails/alternate views.
   - No autoplay video modules.
3. **Buying panel**
   - Price, variant selectors, quantity, add-to-cart.
   - Sticky behavior only if performance-safe and non-janky.
4. **Trust badges**
   - Returns, shipping, quality assurances near CTA zone.
5. **Related products (optional/deferred)**
   - Include only if performance budgets remain healthy.
   - Defer/lazy-load or remove if page weight/regressions appear.

## 5) Animation system (durations, easing, stagger, motion rules)

### Core timings
- **Entrance transitions:** `0.45s–0.6s`
- **Hover/focus transitions:** `0.18s–0.25s`
- **Stagger interval for lists/grids:** `0.06s–0.1s`

### Easing
- Use smooth deceleration for entrances (e.g., ease-out / standard cubic-bezier ease-out family).
- Use quick, subtle ease for hover state changes (no spring overshoot by default).

### Motion rules
- Animate **transform and opacity only**.
- Do **not** animate `filter` or `backdrop-filter`.
- No continuous/infinite loops.
- Use one-time in-view reveals (animate once, then remain static).
- Respect `prefers-reduced-motion`: reduce to near-instant opacity changes or no motion.

## 6) Performance guardrails (hard limits)

- **Homepage priority images:** maximum **1** image marked as priority.
- **Autoplay media:** **not allowed** (no autoplay videos/GIF-like heavy loops).
- **Above-the-fold heavy assets:** strictly limited; prioritize single hero visual and minimal blocking assets.
- Keep initial render path focused on critical content; defer non-critical UI/media.
- All animations must remain compositor-friendly (transform/opacity only).
- Must honor `prefers-reduced-motion` across homepage and PDP.

## 7) Component mapping to existing codebase files

Primary implementation touchpoints:

- `store/src/app/page.tsx`
  - Compose homepage in required 5-section IA order.
- `store/src/components/layout/Navbar.tsx`
  - Ensure navbar behavior remains compatible with new hero/trust-strip stacking.
- `store/src/components/home/CircleCategories.tsx`
  - Candidate for trust strip or supporting lightweight category/trust visuals.
- `store/src/components/home/SquareProductGrid.tsx`
  - Primary New In grid rendering.
- `store/src/components/home/EditorialPoster.tsx`
  - Primary Collection highlight banner.
- `store/src/app/shop/[slug]/page.tsx`
  - PDP hierarchy: breadcrumb/title, gallery, buying panel, trust badges, optional related products.

Guideline: reuse and adapt existing components before introducing new abstractions.

## 8) Data flow/state rules

- **Global/cart state:** continue using existing Zustand cart store for add-to-cart/cart interactions.
- **PDP local UI state:** keep selector state (size/color/quantity/active media index) local to PDP component tree unless already centralized for a clear reason.
- Avoid duplicating product/cart sources of truth.
- Keep derived UI state memoized/lightweight where needed for render stability.

## 9) Acceptance criteria

- Homepage renders exactly in this order: Hero → Trust strip → New In grid → Collection highlight banner → Testimonials.
- PDP follows defined hierarchy with buying panel and trust badges visible in expected order.
- Animation usage adheres to timing ranges and transform/opacity-only rule.
- No autoplay media anywhere in homepage/PDP implementation.
- Homepage uses at most one priority image.
- Reduced-motion users receive compliant low/no-motion experience.
- Existing reusable components are leveraged from mapped files where feasible.
- Cart interactions remain functional through Zustand store.

## 10) Validation/QA checklist

- [ ] Verify homepage section order matches spec exactly.
- [ ] Verify PDP structural order and CTA visibility.
- [ ] Verify no autoplay video/media exists.
- [ ] Verify only one homepage image uses `priority`.
- [ ] Verify animations use transform/opacity only (no filter/backdrop-filter animation).
- [ ] Verify entrance/hover/stagger timings fall within defined ranges.
- [ ] Verify in-view reveals are one-time (no looping behavior).
- [ ] Verify `prefers-reduced-motion` path is implemented and testable.
- [ ] Verify cart add flow still updates Zustand-backed state correctly.
- [ ] Verify optional related products is deferred/disabled if performance regresses.

## 11) Risks + mitigations

- **Risk:** Visual ambition increases LCP/interaction latency.
  - **Mitigation:** Enforce hard media/priority limits; defer non-critical sections; keep motion lightweight.
- **Risk:** Animation overuse harms perceived stability.
  - **Mitigation:** One-time reveals only; strict duration caps; no continuous loops.
- **Risk:** PDP complexity causes state bugs.
  - **Mitigation:** Keep selectors local, cart global via Zustand, avoid duplicated state.
- **Risk:** Related products section adds payload/render cost.
  - **Mitigation:** Make optional and defer/remove when performance budgets are threatened.

## 12) Self-review notes

- Scope is consistent: homepage + PDP IA, motion system, performance-first constraints.
- No TODO/TBD placeholders remain.
- Requirements captured include: OverlaysNow-inspired (not clone), no autoplay media, strict performance guardrails, existing component reuse, and state/data-flow expectations.
