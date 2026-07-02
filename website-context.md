# website-context.md — The Foot Capacity System (fixyourmovement.com)

**LAST UPDATED**: 2026-07-02
**STATUS**: Production live. All UserJourneyCarousel rollout complete. Ask Dr. Jonathan live. Pricing updated to $97/mo + $397. All archetype pages, assessment pages, results pages, and download page current.

---

## Repository & Branch Strategy

**Website repo**: https://github.com/charlesheflin-dev/fixyourmovement.git
**Branch strategy**: `staging` branch builds to `preview.fixyourmovement.com` (Cloudflare Pages project: `foot-capacity-website-staging`). All commits go to `staging` only. Merge to `main` requires explicit two-step confirmation: user says "ready to merge" and Claude replies "confirmed, merge now."

**Cloudflare Pages — Production Build Command (CRITICAL)**
Production project (`fixyourmovement`): Build command must be `npm install --legacy-peer-deps && npm run build` — NOT `npm run build` alone. Staging project (`foot-capacity-website-staging`) uses the same command. If production ever reverts to `npm run build` only, merges to main will break the entire site.

**bun.lockb (CRITICAL — do not remove)**
`bun.lockb` must remain committed in the repo. Cloudflare auto-detects bun when `bun.lockb` is present. Without it, Cloudflare falls back to `npm ci` which fails because `package-lock.json` is not in sync with bun's dependency resolution. If lockfile errors appear during build, restore: `git checkout HEAD~N -- bun.lockb`.

**Dev dependencies and lockfile (CRITICAL)**
Never commit dev dependencies only needed for local scripts (e.g. `dotenv`, `openai`, `@supabase/supabase-js`). Install locally, use, then uninstall before pushing: `npm uninstall dotenv openai @supabase/supabase-js --legacy-peer-deps`.

**Related project**: Foot Capacity Tracker patient app. Repo: `https://github.com/charlesheflin-dev/foot-capacity-tracker-app`. The website feeds trial users into the app. Assessment FAAM data flows from website to app Supabase (`assessment_responses` table). The dynamic sales page (`/results/:userId`) reads from app Supabase.

**Project Name**: The Foot Capacity System
**URL**: https://fixyourmovement.com/
**Primary Goal**: A structured 12-week foot rehabilitation program by Dr. Jonathan Schutza, PT, DPT, designed to rebuild foot strength, restore tissue capacity, and break the cycle of chronic foot pain (plantar fasciitis) from home. Pricing: $97/mo (cancel anytime in app) or $397 one-time (lifetime access).

**Primary Technology Stack**:
- Framework: React 18.3.1 with TypeScript
- Build Tool: Vite
- Styling: Tailwind CSS + shadcn-ui (Radix UI primitives)
- State/Data: React Query (TanStack), React Hook Form, Zod
- Routing: React Router DOM
- Carousel: Embla Carousel React
- Charts: Recharts
- Animations: Framer Motion
- Icons: Lucide React

---

## File Structure

```
fixyourmovement-com/
├── public/
│   ├── bonuses/                     # Static HTML bonus content pages
│   │   ├── foot-recovery-toolkit-final/
│   │   ├── movement-repatterning-toolkit-final/
│   │   ├── flare-recovery-playbook-final/
│   │   └── *.html (daily-habit-builder, mobility-scorecard, pain-relief-tracker, foot-recovery-toolkit)
│   ├── images/                      # Public images (see Assets section)
│   ├── robots.txt
│   └── favicon.ico
├── src/
│   ├── components/
│   │   ├── ui/                      # shadcn-ui component library (34+ components)
│   │   ├── AskDrJonathan.tsx        # Floating AI chat widget (globally mounted)
│   │   ├── UserJourneyCarousel.tsx  # Vertical auto-scroll patient results carousel (universal)
│   │   ├── WalkthroughTestimonialSection.tsx
│   │   └── [homepage section components — see Component Content Map]
│   ├── pages/
│   │   ├── Index.tsx                # Main landing page
│   │   ├── Walkthrough.tsx          # Primary sales/conversion page at /walkthrough
│   │   ├── Checkout.tsx             # Checkout bridge page at /checkout
│   │   ├── Assessment.tsx           # Live assessment at /assessment (3-step: hook > profile > faam > results)
│   │   ├── AssessmentResults.tsx    # Persistent results page at /assessment-results?email= *** SISTER OF Assessment.tsx ***
│   │   ├── Results.tsx              # Dynamic trial user results/upgrade page at /results/:userId or ?email=
│   │   ├── TakeAssessment.tsx       # Assessment opt-in page at /lp/take-assessment
│   │   ├── DownloadApp.tsx          # App download landing page at /lp/download
│   │   ├── StartFrustrated.tsx      # Archetype sales page at /start/frustrated
│   │   ├── StartActive.tsx          # Archetype sales page at /start/active
│   │   ├── StartChronic.tsx         # Archetype sales page at /start/chronic
│   │   ├── StartNew.tsx             # Archetype sales page at /start/new
│   │   ├── AskDrJonathan.tsx        # Full-page AI chat at /ask
│   │   ├── EmailConfirmation.tsx    # Post-AWeber-submit page at /email-confirmation
│   │   ├── ThankYou.tsx             # Post-purchase page at /thank-you
│   │   ├── ChooseYourPlan.tsx       # 3-tier pricing page at /choose-your-plan
│   │   ├── PrivacyPolicy.tsx        # /privacy-policy (effective June 25, 2026)
│   │   ├── TermsOfService.tsx       # /terms-of-service (effective June 25, 2026)
│   │   ├── RefundPolicy.tsx         # /refund-policy (30-day guarantee)
│   │   ├── EULA.tsx                 # /eula (effective June 25, 2026)
│   │   ├── Contact.tsx              # /contact
│   │   ├── NotFound.tsx             # 404
│   │   ├── FCSNewsletterJoin.tsx    # Legacy — route redirects to /lp/take-assessment
│   │   ├── NewIndex.tsx             # Staged text-first homepage at /newindex (reference only)
│   │   ├── NewWalkthrough.tsx       # Staged text-first walkthrough at /newwalkthrough (reference only)
│   │   ├── Index_archive_2026_05_25.tsx  # Archived original homepage at /oldindex
│   │   ├── Walkthrough_archive_2026_05_25.tsx  # Archived original walkthrough at /oldwalkthrough
│   │   └── AssessmentPage.tsx       # Staged assessment at /assessment-preview (reference only)
│   ├── assets/
│   │   ├── logo.png
│   │   ├── hero-bg.jpg
│   │   └── testimonials/            # 1B.jpg–9B.jpg (active carousel variants)
│   ├── hooks/
│   ├── lib/
│   ├── test/
│   ├── App.css
│   ├── main.tsx
│   └── vite-env.d.ts
├── supabase/functions/
│   ├── ask-dr-jonathan/index.ts     # AI chat edge function (website repo)
│   ├── get-results-data/index.ts    # Fetches trial user data for /results (website repo)
│   ├── generate-results-insights/index.ts  # Claude Haiku AI copy for /results (website repo)
│   ├── save-assessment/index.ts     # Writes assessment_responses after FAAM submit
│   └── get-assessment-results/index.ts     # Reads assessment_responses by email
├── workers/
│   └── fcs-archetype-worker.js      # Cloudflare Worker — AWeber tagging
├── faq-knowledge-base/
│   ├── app-behavior.md              # 16 chunks — app behavior, phases, Calm Mode, FAAM
│   ├── clinical-plantar-fasciitis.md  # 17 chunks — clinical/PF questions, Dr. Jonathan voice
│   ├── website-conversion-knowledge.md  # 14 chunks — sales/funnel/offer knowledge
│   └── research-layer.md            # 13 chunks — clinical evidence, safety guardrails
├── scripts/
│   └── seed-faq-embeddings.js       # Seeds faq_embeddings table (requires local-only dev deps)
├── .plans/
│   └── foot-recovery-toolkit-revision-plan.md
├── index.html                       # SEO-optimized entry point
├── package.json
├── vite.config.ts
├── tailwind.config.ts
├── postcss.config.js
├── tsconfig.json / tsconfig.app.json / tsconfig.node.json
├── components.json                  # shadcn-ui config
├── playwright.config.ts / playwright-fixture.ts
├── vitest.config.ts
├── fcs-email-template.html          # AWeber email template with dynamic archetype CTA routing
├── find-images.js / fix-assets.js
└── website-context.md               # THIS FILE
```

---

## Routing (src/App.tsx)

| Route | File | Notes |
|---|---|---|
| / | Index.tsx | Main landing page |
| /walkthrough | Walkthrough.tsx | Primary sales/conversion page |
| /checkout | Checkout.tsx | Payment plan bridge before Whop |
| /assessment | Assessment.tsx | Live 3-step assessment |
| /assessment-results | AssessmentResults.tsx | Persistent results via ?email= |
| /results/:userId | Results.tsx | Trial user upgrade page (also ?email=) |
| /lp/take-assessment | TakeAssessment.tsx | Primary opt-in |
| /lp/download | DownloadApp.tsx | Direct app download with AWeber gate |
| /lp/newsletter | — | Redirects to /lp/take-assessment |
| /start/frustrated | StartFrustrated.tsx | Archetype sales page |
| /start/active | StartActive.tsx | Archetype sales page |
| /start/chronic | StartChronic.tsx | Archetype sales page |
| /start/new | StartNew.tsx | Archetype sales page |
| /ask | AskDrJonathan.tsx (page) | Full-page AI chat |
| /email-confirmation | EmailConfirmation.tsx | Post-AWeber-submit (used by both assessment and download flows) |
| /thank-you | ThankYou.tsx | Post-purchase |
| /choose-your-plan | ChooseYourPlan.tsx | 3-tier pricing |
| /privacy-policy | PrivacyPolicy.tsx | |
| /terms-of-service | TermsOfService.tsx | |
| /refund-policy | RefundPolicy.tsx | |
| /eula | EULA.tsx | |
| /contact | Contact.tsx | |
| /newindex | NewIndex.tsx | Staged text-first homepage (reference) |
| /newwalkthrough | NewWalkthrough.tsx | Staged text-first walkthrough (reference) |
| /oldindex | Index_archive_2026_05_25.tsx | Archived original |
| /oldwalkthrough | Walkthrough_archive_2026_05_25.tsx | Archived original |
| /assessment-preview | AssessmentPage.tsx | Staged assessment (reference) |
| /* | NotFound.tsx | 404 |

Features: Auto-scroll to top on route change. Cookie consent banner (30s delay). Global providers (QueryClient, Tooltip, Toaster, BrowserRouter). AskDrJonathan floating widget mounted globally, excluded from: /assessment, /assessment-results, /email-confirmation, /thank-you, /ask.

---

## Production URLs

| Page | Production URL |
|---|---|
| Walkthrough | https://fixyourmovement.com/walkthrough |
| Frustrated archetype | https://fixyourmovement.com/start/frustrated |
| Active archetype | https://fixyourmovement.com/start/active |
| Chronic archetype | https://fixyourmovement.com/start/chronic |
| New archetype | https://fixyourmovement.com/start/new |
| Checkout bridge | https://fixyourmovement.com/checkout |
| Assessment opt-in | https://fixyourmovement.com/lp/take-assessment |
| Assessment | https://fixyourmovement.com/assessment |
| Assessment results | https://fixyourmovement.com/assessment-results?email= |
| Results (trial user) | https://fixyourmovement.com/results (requires ?userId= or ?email=) |
| App download | https://fixyourmovement.com/lp/download |
| Ask Dr. Jonathan | https://fixyourmovement.com/ask |

## Staging Preview URLs

| Page | Staging URL |
|---|---|
| Walkthrough | https://preview.fixyourmovement.com/walkthrough |
| Frustrated archetype | https://preview.fixyourmovement.com/start/frustrated |
| Active archetype | https://preview.fixyourmovement.com/start/active |
| Chronic archetype | https://preview.fixyourmovement.com/start/chronic |
| New archetype | https://preview.fixyourmovement.com/start/new |
| Download page (Step 2) | https://preview.fixyourmovement.com/lp/download?access=true |
| Assessment results | https://preview.fixyourmovement.com/assessment-results?email=charlesheflin%2B500%40gmail.com |
| Results (trial user) | https://preview.fixyourmovement.com/results?email=charlesheflin%2B21%40gmail.com |
| Ask Dr. Jonathan | https://preview.fixyourmovement.com/ask |

---

## App Download / Conversion Page Inventory

**Critical rule**: Every page with a `/checkout` CTA or an app install CTA must have `UserJourneyCarousel` present.

| Page | File | Primary CTA | CTA Destination | Carousel Present |
|---|---|---|---|---|
| /walkthrough | Walkthrough.tsx | Get Started | /checkout | ✅ Below comparison section |
| /start/frustrated | StartFrustrated.tsx | Get Started | /checkout | ✅ Above comparison section |
| /start/active | StartActive.tsx | Get Started | /checkout | ✅ Above comparison section |
| /start/chronic | StartChronic.tsx | Get Started | /checkout | ✅ Above comparison section |
| /start/new | StartNew.tsx | Get Started | /checkout | ✅ Above comparison section |
| /results/:userId | Results.tsx | Continue My Recovery | /checkout | ✅ In NextStepSection + FinalCtaSection |
| /assessment (results step) | Assessment.tsx | Start Free 7-Day Trial | app install | ✅ After install CTA |
| /assessment-results | AssessmentResults.tsx | Start Free 7-Day Trial | app install | ✅ After install CTA |
| /lp/download (Step 2) | DownloadApp.tsx | Install App / QR | app install | ✅ Above footer |

**Sister pages** — Assessment.tsx (results step) and AssessmentResults.tsx must always be updated together. They render identical results screens. Any change to one must be mirrored in the other.

---

## UserJourneyCarousel Component

**File**: `src/components/UserJourneyCarousel.tsx`
**Purpose**: Reusable vertical auto-scrolling carousel of patient result cards with click-to-view story modals. Import and drop into any page with one line.

**Behavior**:
- Cards auto-scroll vertically, loop seamlessly
- Desktop: hover pauses carousel (via `isPausedRef` — not React state), click opens modal
- Mobile: "Tap a card to read the patient's story" instruction shown, tap opens modal
- Modal: centered overlay, dimmed background, closeable, scrollable
- Pause uses `isPausedRef.current` (ref, not state) — critical to prevent flicker. Never revert to useState for pause control.

**Patient data** (aliased — real data):
- Jamie B. — Phase 2, Week 5 — 60% pain reduction, +33% FAAM, 16-day streak
- Maria G. — Phase 2, Week 3 — 86% pain reduction, +26% FAAM, 3 weeks
- Annie T. — Phase 2, Week 2 — 76% pain reduction, +12% FAAM, 8-day streak

**Adding new stories**: Add a new object to the `stories` array in the component. No other changes needed.

---

## Component Content Map

### src/components/ (homepage sections)
- BonusSection.tsx — 60-Day Guarantee card. Uses /images/60-day-guarantee.png.
- CookieConsent.tsx — Cookie banner. Delay: 30000ms (30 seconds).
- DoctorCredibility.tsx — Two-column: headshot + bio. Links to instagram.com/dr.schutza.pt and facebook.com/share/18vGC5rzP8
- DrJonathanSection.tsx — Dr. Jonathan approach, patient examples, quote cards
- FAQSection.tsx — FAQ accordion (10 questions + HSA/FSA). contact link.
- FinalCTA.tsx — Two-column: moves-you-forward.png + heading + 4 features + CTA to /walkthrough (new tab)
- Footer.tsx — Copyright, links (Privacy Policy, Terms, Contact, Refund, EULA)
- Header.tsx — Logo, Patient Portal link (members.fixyourmovement.com)
- HeroSection.tsx — Background images, trust badge, headings, Cloudflare video (ID: 8e2a6e0621ae45bb67e928d218736905), CTA to /walkthrough. Hero img desktop: filter: grayscale(20%) saturate(70%) brightness(1.02), opacity: 0.32
- ObjectionsSection.tsx — "Still on the Fence" accordion (5 objections)
- PricingSection.tsx — 3 pricing preview cards linking to /walkthrough
- ProblemSection.tsx — why-pain-returns.png, 5-step cycle
- ProgramSection.tsx — 4-step timeline (Halt, Engage, Adapt, Link)
- SolutionSection.tsx — guesswork-to-clarity.png
- TestimonialSection.tsx — Auto-scrolling carousel of 9 testimonial images (1B.jpg-9B.jpg). 3000ms auto-scroll.
- TransformationSection.tsx — 4 feature cards
- WhatItIsSection.tsx — 3-phones2.png, 3 feature rows, CTA to /walkthrough
- WalkthroughTestimonialSection.tsx — Used only on /walkthrough page
- UserJourneyCarousel.tsx — Universal patient results carousel (see above)
- AskDrJonathan.tsx — Floating AI chat widget (globally mounted in App.tsx)
- MissionSection.tsx — NOT currently rendered on Index.tsx
- VisualSystemMap.tsx — NOT currently rendered on Index.tsx

### src/pages/ — Current State

**Index.tsx** — Section order: HeroSection, VSL (Section 2), ProblemSection, SolutionSection, WhatItIsSection, TransformationSection, DoctorCredibility, TestimonialSection, BonusSection, FinalCTA, FAQSection, Email opt-in. All CTAs → /walkthrough (new tab).

**Walkthrough.tsx** — Section order: Hero + video → What Changes → UserJourneyCarousel → Traditional Care vs FCS → How System Works → WalkthroughTestimonialSection → Price card + guarantee → Who This Is For/Not For → FAQ → Final CTA. All CTAs → /checkout.

**Checkout.tsx** — Two options: Monthly Recovery Plan ($97/mo, "Most Flexible", default) and Lifetime Access ($397, "Best Value"). HSA/FSA callout. Guarantee box. GA4 checkout_click fires with label checkout_bridge_monthly or checkout_bridge_onetime. Monthly Whop URL: https://whop.com/checkout/plan_myAABQ8dqq8W3. One-time Whop URL: https://whop.com/checkout/plan_f7hnKFT1vq0zb.

**Assessment.tsx** — Steps: hook (5 HOOK questions) → profile (archetype interstitial) → faam (21-question FAAM across 3 pages) → results (full results screen with FAAM gauge, archetype framing, prescription, VSL, guarantee, install CTA, UserJourneyCarousel). Reads email from ?email= URL param. Calls Worker → save-assessment → create-trial-profile on FAAM submit.

**AssessmentResults.tsx** *(SISTER of Assessment.tsx results step)* — Persistent results via /assessment-results?email=. Fetches from get-assessment-results Edge Function. Identical layout to Assessment.tsx results step. VSL video ID: 28ca18dffae027045f0b7e95c357abfb. Thumbnail: 0a87b6a7-6fb2-48dc-9e26-aa5c134c0200. Includes UserJourneyCarousel after install CTA.

**Results.tsx** — Dynamic page at /results/:userId or ?email=. For existing app trial users. 7 sections: Hero (blue gradient, AI subhead, pain stats) → Progress Trend (Recharts dual-axis chart) → What You Accomplished (2x2 grid) → Recovery Roadmap (phase timeline) → Dr. Jonathan video (ID: 7e581f9df0bbb0e4ee02287983d4f31b) → Your Next Step (offer card + UserJourneyCarousel) → Final CTA (UserJourneyCarousel). AI insights from generate-results-insights Edge Function. Redirects to /walkthrough if daysLogged === 0.

**StartFrustrated / StartActive / StartChronic / StartNew** — Archetype sales pages. Section order: Hero → Section 2 (problem deepening) → Section 3 (introduce system) → UserJourneyCarousel → Traditional Care vs FCS comparison → Doctor Credibility → Testimonials → Price card + guarantee → Who This Is For/Not For → FAQ → Final CTA. All CTAs → /checkout.

**TakeAssessment.tsx** — Headline: "Get Clarity. Know What's Next. Take the Assessment." AWeber form. Tracking label: Assessment_Opt_In. Post-submit → /email-confirmation. AWeber redirects confirmed subscriber → /assessment?email=.

**DownloadApp.tsx** — Two-state: Step 1 = AWeber opt-in (form ID 543768887, list awlist6961315); Step 2 = download page (shown after ?access=true). Stores email in fcs_email cookie on submit. Step 2 includes UserJourneyCarousel above footer. Mobile: install button. Desktop: QR code.

**ThankYou.tsx** — Post-purchase. Cloudflare Stream video ID: fc14393e8758f53eb9a7bb92fd21f071. CTA: "Get Started in the App" → https://app.fixyourmovement.com/. Green callout for trial users.

**ChooseYourPlan.tsx** — 3-tier pricing; mobile stacked + desktop Framer Motion carousel. Tier images: TIER1B.png, TIER2B.png, TIER3B.png.

**Legal pages** — Legal entity: Back At It Physical Therapy, LLC doing business as Foot Capacity System. Effective date: June 25, 2026.

---

## Pricing — Current (as of 2026-06-27)

- **Monthly Recovery Plan**: $97/mo — "Most Flexible" — cancel anytime in app
- **Lifetime Access**: $397 one-time — "Best Value"
- **$157 plan is RETIRED** — never mention $157 anywhere on any page or in any prompt
- Whop Monthly URL: https://whop.com/checkout/plan_myAABQ8dqq8W3
- Whop One-time URL: https://whop.com/checkout/plan_f7hnKFT1vq0zb
- All sales page CTAs → /checkout → Whop. Never link directly to Whop from sales pages.

---

## Styling System

### Tailwind Configuration
- Dark mode: class based
- Custom color palette: Blue (#2563EB / dark #1D4ED8 / light #EFF6FF), Slate scale (900/700/500/400/200/100/50), Green (#16A34A), Red (#DC2626)
- Custom fonts: Inter only (400-900 weights), loaded via Google Fonts
- Custom animations: accordion-down/up, fade-up, pulse-glow

### CSS Variables
--background, --foreground, --card, --card-foreground, --popover, --popover-foreground, --primary, --primary-foreground, --secondary, --secondary-foreground, --muted, --muted-foreground, --accent, --accent-foreground, --destructive, --destructive-foreground, --border, --input, --ring, --radius, --sidebar-*

### Text-First Page Design Tokens (NewIndex, NewWalkthrough)
- No cards with borders/shadows except product summary and FAQ accordion items
- White background throughout, border-t border-slate-100 section dividers
- max-w-3xl mx-auto prose, max-w-5xl mx-auto hero
- text-slate-900 headlines, text-slate-600 body, text-lg leading-relaxed
- Pull quotes: border-l-4 border-blue-600

---

## Assets

### Images (src/assets/)
- logo.png, hero-bg.jpg, 12-week-program.png
- testimonials/: 1.jpg–9.jpg (originals), 1B.jpg–9B.jpg (active variants in carousels)

### Public Root Assets (public/)
- favicon.ico, robots.txt, og-image.png (1200x630, verified working)
- new-top2.png — mobile hero background
- photo_2026-03-25_13-59-21.jpg — desktop hero background
- logo.png — used in email template at https://fixyourmovement.com/logo.png
- flare-up-guide.pdf — at https://fixyourmovement.com/flare-up-guide.pdf
- support.html — static support page

### Public Images (public/images/)
- 3-phones.png — unused variant
- 3-phones2.png — active, WhatItIsSection + DownloadApp
- 60-day-guarantee.png — BonusSection
- app-mockup-t2.png, app-mockup-t3.png — tier mockups
- app-mockup-walkthrough.png — Walkthrough product summary
- dr-jonathan-schutza-headshot.png — DoctorCredibility, TakeAssessment
- follow-on-facebook.png, follow-on-instagram.png — DoctorCredibility, archetype pages
- guesswork-to-clarity.png — SolutionSection
- moves-you-forward.png — FinalCTA
- new-phone.jpg, new-phone2.jpg — Walkthrough product summary
- patient-experiences.png — TestimonialSection
- person1.png, person2.png, person3.png — TestimonialSection lifestyle photos
- TIER1B.png, TIER2B.png, TIER3B.png — ChooseYourPlan (active)
- TIER1.jpg, TIER2.jpg, TIER3.jpg, TIER1B.jpg, TIER2B.jpg, TIER3B.jpg — reference only
- TIER3NEW.jpg, TIER3NEW.png — available, not yet active
- why-pain-returns.png — ProblemSection
- whats-included.png, problem-section.png — available, not in active use

**IMAGE USAGE RULE**: Do not create or request new images. All visual needs must use existing images listed above.

---

## Cloudflare Video IDs

| Video | ID | Used In |
|---|---|---|
| Homepage hero VSL | 8e2a6e0621ae45bb67e928d218736905 | HeroSection.tsx |
| Walkthrough VSL | b37100f8162e1ab91cf86c9e284447da | Walkthrough.tsx, AssessmentResults.tsx, DownloadApp.tsx (Step 2) |
| Assessment/Results VSL | 28ca18dffae027045f0b7e95c357abfb | Assessment.tsx, AssessmentResults.tsx |
| Dr. Jonathan personal message | 7e581f9df0bbb0e4ee02287983d4f31b | Results.tsx |
| Post-purchase welcome | fc14393e8758f53eb9a7bb92fd21f071 | ThankYou.tsx |

Universal thumbnail ID (Cloudflare Images): `0a87b6a7-6fb2-48dc-9e26-aa5c134c0200`

All videos use one-click autoplay pattern: `posterVisible` useState (true by default), onClick sets false and appends `?autoplay=true` to iframe src.

---

## SEO & Metadata

- Title: The Foot Capacity System | Guided Foot & Ankle Recovery
- Meta description: A structured recovery system by Dr. Jonathan Schutza, PT, DPT...
- og:image: https://fixyourmovement.com/og-image.png (verified working)
- Google Analytics: G-YGDHT1TE6Y
- Microsoft Clarity: wvndy6rvsx
- Schema.org: Product type, ratings 4.9/5
- /walkthrough cannot have independently crawlable meta tags (SPA, no SSR). Do not attempt to re-add react-helmet-async.

---

## Dependencies Summary

### Core
react ^18.3.1, react-dom ^18.3.1, react-router-dom ^6.30.1, react-hook-form ^7.61.1, @tanstack/react-query ^5.83.0

### UI
@radix-ui/react-* (20+ packages), class-variance-authority, clsx, tailwind-merge

### Validation
@hookform/resolvers ^3.10.0, zod ^3.25.76

### UI Functionality
framer-motion ^12.35.2, embla-carousel-react ^8.6.0, recharts ^2.15.4, sonner ^1.7.4, next-themes ^0.3.0, input-otp ^1.4.2, react-day-picker ^8.10.1, vaul ^0.9.9, cmdk ^1.1.1

### Build & Dev
vite ^5.4.19, @vitejs/plugin-react-swc ^3.11.0, typescript ^5.8.3, tailwindcss ^3.4.17, postcss ^8.5.6, autoprefixer ^10.4.21

### Testing
vitest ^3.2.4, @playwright/test ^1.57.0, @testing-library/react ^16.0.0

### Utilities
date-fns ^3.6.0, lucide-react ^0.462.0

---

## Development Environment

- Node.js required (nvm recommended)
- Port: 8080 (vite.config.ts)
- Hot Module Replacement: enabled (overlay disabled)
- Path Alias: @/ → ./src
- Scripts: `npm run dev`, `npm run build`, `npm run lint`, `npm run preview`, `npm run test`

---

## Supabase Infrastructure

**Project**: zsdmnapwxlimktqrnmii (app Supabase — used by both app and website Edge Functions)

### Tables
- `assessment_responses` — Stores FAAM submissions keyed to email. Written by save-assessment. Read by app onboarding and /results page.
- `faq_embeddings` — pgvector 1536-dim. id, source_file, chunk_index, content, embedding. Used by Ask Dr. Jonathan.
- `unanswered_questions` — Logs questions that fall below similarity threshold.
- `chat_questions` — Logs every Ask Dr. Jonathan question: id, question, reply, was_answered, similarity_score, page_path, asked_at.

### Edge Functions (all JWT OFF)

**ask-dr-jonathan** — Receives {message, history, page_path}. Embeds via OpenAI text-embedding-3-small. Retrieves top 6 chunks from faq_embeddings. All questions pass through to Claude regardless of similarity (threshold removed 2026-06-27). Logs to chat_questions (non-fatal). Calls Claude Haiku (claude-haiku-4-5-20251001, max_tokens: 300). Returns {reply, sources, similarity}.

**get-results-data** — Takes ?userId= or ?email=. Reads profiles, daily_logs, assessment_responses from app Supabase. Returns: userId, displayName, currentPhase, currentWeek, daysLogged, startingPain, latestPain, painDrop, archetype, faamScore, faamBand, isTrial, trialStartedAt, currentStreak, trialSessionsCompleted, totalReps, painTimeline. Email normalized with .replace(/ /g, "+").toLowerCase().

**generate-results-insights** — POST only. Receives user data payload. Calls Claude Haiku. Returns: heroSubhead, trendInsight, accomplishmentsCopy, finalCtoCopy[]. Non-fatal — fallback copy used on failure. Requires ANTHROPIC_API_KEY in Supabase secrets.

**save-assessment** — Writes assessment_responses row after FAAM submit. CORS: dynamic getCorsHeaders() — fixyourmovement.com + preview.fixyourmovement.com. Non-fatal.

**get-assessment-results** — Takes ?email=. Queries assessment_responses. Returns archetype, faam_score, faam_band, created_at.

---

## Ask Dr. Jonathan — AI Chatbot

### Status: LIVE on production (deployed 2026-06-17, updated 2026-06-27)

### Architecture
- Vector DB: Supabase faq_embeddings (pgvector, 1536-dim)
- Embeddings: OpenAI text-embedding-3-small
- Retrieval: match_faq_chunks RPC — top 6 chunks per query
- Generation: Claude Haiku (claude-haiku-4-5-20251001), max_tokens: 300
- UI: Floating widget (AskDrJonathan.tsx component) + /ask page (AskDrJonathan.tsx page)

### Edge Function Secrets
- OPENAI_API_KEY — embeddings
- ANTHROPIC_API_KEY — Claude Haiku generation
- SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY — auto-injected

### Environment Variable (Cloudflare Pages — both staging and production)
- VITE_ASK_DR_JONATHAN_URL = https://zsdmnapwxlimktqrnmii.supabase.co/functions/v1/ask-dr-jonathan

### System Prompt Rules (AGENT_GOALS)
- Plain text only — no markdown, asterisks, bold, bullets, headers
- Always respond in the same language the user wrote in (multilingual support)
- Answer structure: validate → explain → connect to capacity/load → next step → escalate if red flags
- Language: "this can be consistent with..." not "you have..."
- Escalation: red flag symptoms → direct to in-person care
- Program References: assessment URL first (https://fixyourmovement.com/lp/take-assessment). Install link only if user has explicitly said they signed up and confirmed email.
- Pricing: $97/mo and $397 only. Never mention $157.
- Always include https:// in URLs

### Knowledge Base (60 total chunks — all seeded to Supabase)
- clinical-plantar-fasciitis.md — 17 chunks
- app-behavior.md — 16 chunks
- website-conversion-knowledge.md — 14 chunks (pricing updated, $157 blocked, HSA/FSA added)
- research-layer.md — 13 chunks

### Seed Script
- File: scripts/seed-faq-embeddings.js
- Requires local-only: dotenv, openai, @supabase/supabase-js (NOT in package.json)
- Install locally, run `node scripts/seed-faq-embeddings.js`, then uninstall before pushing

### Widget Behavior
- Floating button bottom-right → mobile: 85vh bottom sheet / desktop: 380×500 panel
- textarea rows=2, resize-none, Enter sends (Shift+Enter for newline)
- URL parser: isUrl = /^https?:\/\// (no g-flag — avoids lastIndex bug), strips trailing punctuation before href
- History: passes last 4 turns (excluding welcome message)
- Welcome message identifies as AI assistant trained on Dr. Jonathan's knowledge

---

## GA4 Event Tracking

### Custom Events
- `checkout_click` — fires on all real checkout CTAs
- event_label values: walkthrough_cta, frustrated_cta, active_cta, chronic_cta, new_cta, checkout_bridge_monthly, checkout_bridge_onetime
- results page: results_hero_cta, results_offer_cta, results_final_cta
- NOT on hero scroll anchor ("See What's Included →")
- Tracking live from: 2026-05-28 ~3pm CT

### Checkout URL Rule
- CHECKOUT_URL in all page constants = "/checkout"
- Never set CHECKOUT_URL to a Whop URL directly in any sales page

---

## Archetype & HOOK Assessment System

### Status: FULLY LIVE — assessment → archetype tag → FAAM → email sequence → archetype sales page

### The Four Archetypes

| # | Name | Tag | Sales Page |
|---|---|---|---|
| 1 | Frustrated Fix-Seeker | archetype_frustrated_fix_seeker | /start/frustrated |
| 2 | Active Person | archetype_active_person | /start/active |
| 3 | Discouraged Chronic | archetype_discouraged_chronic | /start/chronic |
| 4 | Newly Concerned | archetype_newly_concerned | /start/new |

AWeber automatically lowercases all tags. Use lowercase as triggers in AWeber Workflows.

### Assessment Flow
/lp/take-assessment (AWeber opt-in) → email confirmation → /assessment?email= → HOOK questions → Worker applies archetype tag → archetype interstitial → FAAM (21 questions, 3 pages) → Worker applies faam band tag → save-assessment writes row → create-trial-profile creates trial user → results screen shown → archetype email sequence triggers in AWeber

### HOOK Question Answer Keys (must match exactly for Worker routing)
- Q1: few_weeks | few_months | more_than_6_months | more_than_1_year
- Q2 (multi): stretching | shoes_orthotics | rest | physical_therapy | injections | nothing
- Q3: staying_active | work_day | daily_activities | everything_confidence | not_sure_yet
- Q4: tried_so_much | keep_active | wondering_if_normal | new_to_this
- Q5: back_to_sport | work_pain_free | family_activities | trust_body | get_ahead

### FAAM Scoring
- Stored: 4 = No difficulty, 0 = Unable to do
- Display (inverted for UX): 0 = No difficulty, 4 = Unable to do
- Conversion: stored = 4 - displayValue
- ADL score = (sum / 84) × 100
- Bands: ≥80% = faam_high (green), 50-79% = faam_moderate (amber), <50% = faam_low (red)

### Assessment Page (Assessment.tsx) — Results Step Current State
Section 1: FAAM gauge + archetype headline + "What Stands Out" card
Section 2: "Why This Keeps Happening" — whatMayBeGoingOn + theBiggerIssue cards
Section 3: "You're Closer Than You Think" — 3 static week cards + forYouSpecifically card
Section 4: VSL video
Section 5: Install CTA (mobile button / desktop QR) + UserJourneyCarousel

---

## AWeber Infrastructure

### Lists
- **awlist6958674** — FCS main list (all confirmed subscribers)
- **awlist6961315** — FCS Direct App Download (temporary; auto-moves to main list after confirmation)

### Forms
- Assessment opt-in: form ID 356574860, tracking label Assessment_Opt_In (list awlist6958674)
- Download opt-in: form ID 543768887, tracking label FCS_Direct_App_Download_no_Assessment (list awlist6961315)
- Homepage opt-in: tracking label Homepage_Optin

### AWeber Developer App
- Client ID/Secret: stored in Cloudflare secrets (AWEBER_CLIENT_ID, AWEBER_CLIENT_SECRET)
- OAuth Redirect URL: https://fcs-archetype.fixyourmovement.com
- Scope: subscriber.read+subscriber.write+list.read+account.read
- NEVER hardcode credentials in this file. Never hardcode account ID as 1 (Worker fetches dynamically).

### AWeber Merge Tag Reference
- `{{ subscriber.email }}` — works in email body links
- `{!tag_exists}` — works in HTML editor (not drag-and-drop editor) for conditional routing
- Neither merge tag works in AWeber success page URL redirect field — AWeber auto-appends email to redirect URL

### fcs_email Cookie
- Set in Assessment.tsx and DownloadApp.tsx
- SameSite=Lax, expires 2099
- Used to pass email across AWeber redirect chain

### AWeber Workflows (all active)
| Workflow | Trigger | Status |
|---|---|---|
| FCS — General Nurture | subscribes to list | Active (Email 1 only; emails 2-7 not yet written) |
| FCS — Frustrated Fix-Seeker Sequence | tag: archetype_frustrated_fix_seeker | Active |
| FCS — Active Person Sequence | tag: archetype_active_person | Active |
| FCS — Discouraged Chronic Sequence | tag: archetype_discouraged_chronic | Active |
| FCS — Newly Concerned Sequence | tag: archetype_newly_concerned | Active |
| FCS — Checkout Recovery | tag: checkout_visited (2hr delay) | Active |

### AWeber Tags Applied on Purchase
- `customer` tag applied by Whop webhook (app repo supabase/functions/whop-webhook/index.ts) on membership.went_valid / membership.activated
- Exit rule for `customer` tag added to all 5 workflows — stops all sequences on purchase

### Assessment Results Email (LIVE)
- Trigger: archetype tag (fires once per subscriber after assessment completion)
- Subject: "Your Assessment Results Are Waiting"
- CTA: https://fixyourmovement.com/assessment-results?email={{ subscriber.email }}

### AWeber Post-Confirmation Redirect
- URL: https://fixyourmovement.com/assessment
- AWeber automatically appends &email=subscriber@email.com
- No merge tag needed in AWeber redirect URL field

### AWeber FAAM Campaigns — DELETED
Previously 3 campaigns (faam_low/moderate/high). All deleted 2026-06-11. Replaced by single assessment results email above.

### Pending AWeber Work
1. Write General Nurture emails 2-7 (Day 3, 6, 9, 12, 15, 18)
2. Configure Exit Rules on all 5 workflows (exit on archetype tag swap)
3. Build unconfirmed subscriber redirect: if Assessment.tsx has no email param → redirect to /lp/take-assessment
4. Build AWeber Trial Nurture Campaign (trigger: trial_accepted tag, 7-day sequence, exit: customer tag)

---

## Cloudflare Worker (AWeber Tagging)

**Worker name**: fcs-archetype-worker
**URL**: https://fcs-archetype-worker.charles-heflin.workers.dev
**File**: workers/fcs-archetype-worker.js
**Deployment**: Paste into Cloudflare dashboard editor. Do NOT use wrangler CLI.
**CORS**: fixyourmovement.com, preview.fixyourmovement.com, app.fixyourmovement.com

**Three POST request types handled**:
1. Archetype tagging: { email, answers } — determines and applies archetype tag
2. FAAM band tagging: { email, faam_tag, faam_score } — applies faam_low/moderate/high, removes other two
3. Event tagging: { email, checkout_tag } — valid: "checkout_visited", "trial_accepted". Only applies if subscriber already exists. Does NOT create new subscribers.

**OAuth**: Auto-refreshes access token on every request. Credentials: AWEBER_CLIENT_ID, AWEBER_CLIENT_SECRET, AWEBER_ACCESS_TOKEN, AWEBER_REFRESH_TOKEN, AWEBER_LIST_ID (all in Cloudflare env vars).

---

## Trial User Flow

**create-trial-profile** (app Supabase Edge Function, JWT OFF): Called from Assessment.tsx (after save-assessment) and DownloadApp.tsx (on ?access=true). Sets is_trial=true, trial_started_at=now(), token_tier=1. Idempotent.

**trial_accepted tag**: Applied by app CreateProfile.tsx after successful onboarding — NOT by website or Cloudflare Worker. Triggers Trial Nurture Campaign (pending build).

**Trial User Results Delivery** (app agent — in progress):
1. Day-7 Resend email with CTA to /results?email=
2. In-app results card on Today.tsx home screen from day 7 onward

---

## Homepage Design Guidance

**Homepage purpose**: Emotionally stabilize → explain why people stay stuck → reduce overwhelm → establish trust → create curiosity → transition to /walkthrough. NOT a sales page.

**Primary CTA rule**: All homepage CTAs → /walkthrough (new tab).
- PRIMARY: "See How The Full System Works"
- ACCEPTABLE ALT: "Watch The Full Guided Walkthrough"

**Pending homepage items** (from data, not yet implemented):
- Hero fix: CTA visible without scrolling on mobile, scroll indicator, tighter headline
- Section 6: Micro Trust Snippets (4 short emotional quotes before testimonial carousel)
- Section 8: Transition CTA Section rebuild
- Sticky mobile CTA after 15-20% scroll depth

---

## Walkthrough Page Design Guidance

**Purpose**: Primary conversion environment — objections, reassurance, trust, pricing, guarantee, FAQ, conversion.

**Global CTA rule**: All CTAs → /checkout (never directly to Whop).
- CTA text: "Get Started With The Foot Capacity System ->"

**Data insight**: 39-point scroll drop at 75-80% (price card). Section reorder implemented (value + trust before price). FAQ at 90-95% is highest engagement zone — protect and strengthen.

---

## FAQ Content Reference

Full approved FAQ answers for both homepage (FAQSection.tsx) and walkthrough page are maintained in the codebase. Key rules:
- Homepage FAQ: max 5 questions, accordion, concise 2-5 sentence answers
- Walkthrough FAQ: full depth answers, 10+ questions covering Getting Started, Recovery Process, System & Support, Trust & Risk
- HSA/FSA question added to both (2026-06-27)

---

## Analytics Reference

**Data sources**: Microsoft Clarity (wvndy6rvsx), Google Analytics (G-YGDHT1TE6Y)

**Key funnel benchmarks** (05/25-05/31/2026, cold traffic):
- Homepage → Walkthrough: 50%
- Walkthrough → checkout_click: 6.7%
- Homepage hero scroll drop: 31% lost before passing hero
- Walkthrough price card cliff: 39-point drop at 75-80%
- FAQ/final CTA (90-95%): highest engagement on entire site
- Traffic: 89% mobile, 91% new users

---

## AI Collaboration Protocol

### How Claude And This Team Work Together
- Claude is the build architect. Cursor is the execution agent.
- Claude reads files, plans changes, writes surgical Cursor prompts, reviews output, then approves push.
- User runs Cursor prompts, shares output files back to Claude for review before any push.
- New threads must begin by pasting this context file in full.
- Claude never writes a prompt without having read the current live file in the current thread.
- If a file has not been shared in the current thread, Claude asks for it before proceeding.

### Core Rules
- Always request the current file before writing any prompt. Never write a change based on memory or assumed file state.
- All prompts are surgical by default — minimum change needed, nothing else touched.
- Every prompt must explicitly state: "Do not change any other content, imports, logic, or any other file. Do not check git status, run any commands, or touch any other file. Do not stage, commit, or push any changes."
- Full file replacements only when simultaneous section reordering makes surgical find/replace unsafe.
- One logical change per prompt when possible. Separate prompts for separate files.
- Never push to production without Claude reviewing the output file first.
- PowerShell syntax only — semicolons to chain commands, never &&.

### Prompt Structure Standard — Cursor Format
```
Make only the following exact changes to [FILE PATH]. Do not modify anything else in the file. Do not check git status, run any commands, or touch any other file.

CHANGE 1
Find:
[exact string]
Replace with:
[exact string]

CHANGE 2
...
```

### Git Workflow
```
# Single file
git add [file]; git commit -m "[description]"; git push origin staging

# Multi file
git add [file1] [file2]; git commit -m "[description]"; git push origin staging

# Always check branch first
git branch; git status

# Merge staging → main (standard)
git checkout main; git merge staging --no-ff -m "Merge staging into main: [description]"; git push origin main; git checkout staging

# Merge when histories diverge
git push origin staging:main --force; git checkout staging

# Emergency rollback
git revert HEAD --no-edit; git push
```

**Merge rule**: Two-step confirmation required. User says "ready to merge" → Claude says "confirmed, merge now" → user runs command.

**Push safety**: Always use `git push origin staging` (explicit branch) to prevent accidental pushes to main.

---

## Lessons Learned

**1. Cloudflare build command must include --legacy-peer-deps.**
`npm run build` alone silently fails CSS compilation. Full command: `npm install --legacy-peer-deps && npm run build`. If staging works but production breaks after a merge, check this first.

**2. bun.lockb must stay in the repo.**
Removing it causes Cloudflare to fall back to `npm ci` which fails because package-lock.json is not in sync with bun's resolution. Restore with: `git checkout HEAD~N -- bun.lockb`.

**3. Dev dependencies break the lockfile.**
dotenv, openai, @supabase/supabase-js must never be in package.json. Install locally only when needed, uninstall before pushing.

**4. AWeber merge tags don't work in redirect URL fields.**
`{{ subscriber.email }}` and `{!email_urlencoded}` both fail in AWeber's success page URL redirect field. AWeber auto-appends the email anyway. Use merge tags only in email body links.

**5. UserJourneyCarousel hover pause must use a ref, not React state.**
Using `isPaused` as useState causes flicker — the animation loop reads the stale value before the re-render. Use `isPausedRef.current = true/false` for immediate synchronous pause. Never revert this pattern.

**6. CORS must be dynamic on Supabase Edge Functions.**
Hardcoding `Access-Control-Allow-Origin: https://fixyourmovement.com` breaks staging (`preview.fixyourmovement.com`). Use `getCorsHeaders(req)` with an ALLOWED_ORIGINS array.

**7. AWeber tags are automatically lowercased.**
Apply tags in lowercase. Set AWeber Workflow triggers in lowercase. Mixed case will not match.

**8. Cloudflare Worker account ID must be fetched dynamically.**
Never hardcode account ID as 1. Worker calls /accounts endpoint on every request. OAuth scope must include account.read.

**9. Assessment.tsx and AssessmentResults.tsx are sisters.**
These two files render identical results screens. Any layout, copy, or CTA change to one must be mirrored in the other immediately.

**10. Patient names in UserJourneyCarousel must be aliased.**
All data is real. Names must use first name + last initial format: Jamie B., Maria G., Annie T. This applies to both card display and story text inside the modal.

**11. Cloudflare Pages may delay deploy by several minutes after push.**
If deployment doesn't appear immediately after a merge to main, wait 2-3 minutes before investigating. Check Cloudflare Pages → Deployments tab for status before assuming a problem.

**12. Ask Dr. Jonathan similarity threshold was removed.**
As of 2026-06-27, all questions pass through to Claude regardless of similarity score. The 0.55 threshold is retained for logging only. Do not re-add a blocking threshold.
