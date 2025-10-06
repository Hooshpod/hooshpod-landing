### Concise PRD — HooshPod (هوشپاد) Multilingual Landing Site

- **Product**: Marketing site for HooshPod, an AI company specializing in Agentic AI workflows and cost-efficient, low-latency LLM inference on GPU infra.
- **Goals**: Educate, build trust, and convert (book demo/contact). World-class SEO, fast SSG, multilingual with full RTL/LTR.

### Decisions (Resolved)

- **Default locale & redirect**: Default `en`. Automatic locale detection from `Accept-Language` and redirect from `/` → best match of `en`, `ar`, `fa` (fallback `en`). Manual language switcher persists route.
- **Model lineup & benchmarks**: Not published at launch. Placeholder copy with “contact us for detailed benchmarks.”
- **Enterprise pricing**: “Contact sales” for enterprise. Public cards for other tiers; no exact per-model costs at launch.
- **Regions & compliance**:
  - Regions: Global-ready, with focus on Europe and Middle East; regionalized endpoints and datasov controls.
  - Compliance: GDPR-ready. SOC 2 and ISO 27001 positioned as “in progress/available upon request” (no false certification claims).

### Information Architecture

- Localized routes: `/[locale]` where `[locale] ∈ {en, ar, fa}`
- Pages (SSG for each locale): Home, Solutions, Platform, Products, Use Cases, Pricing, About, Blog (+post), Careers, Contact, Privacy, Terms, 404/500.

### Key Content (per page)

- **Home**: Hero on Agentic AI workflows and GPU-backed low-latency inference; value pillars; lifecycle (Architect → Simulate → Orchestrate → Monitor); metrics (placeholders); CTAs.
- **Solutions**: Agent patterns and lifecycle; integrations.
- **Platform**: GPU infra (autoscaling, streaming); OSS models supported conceptually; latency/cost narrative without hard numbers; security and regionalization.
- **Products**: Agentic Studio, Agent Runtime, Observability/Guardrails, Eval/Sim.
- **Use Cases**: Support automation, RPA augmentation, data pipelines, enterprise search, code agents.
- **Pricing**: Transparent non-enterprise tiers; Enterprise → Contact Sales.
- **About/Blog/Careers/Contact/Legal**: Standard marketing content, localized.

### Localization

- **Locales**: `en` (LTR), `ar` and `fa` (RTL).
- **Tech**: `next-intl` with `[locale]` segment, middleware-based detection/redirect, per-locale messages, `dir` toggling, mirrored icons and RTL-safe components.
- **Copy**: Native-quality translations; locale-appropriate tone; RTL-optimized typography.

### Technical Implementation

- **Framework**: Next.js App Router.
- **SSG**: All pages statically generated per locale. Use `generateStaticParams`. MDX for blog; optional ISR for blog only.
- **i18n status (implemented)**:
  - `next-intl` configured with locales `en`, `ar`, `fa` and default `en`.
  - Middleware-based locale detection and redirect from `/` → best match; root `/` redirects to `/en` server-side.
  - `app/layout.tsx` provides `NextIntlClientProvider` and sets `lang` and `dir` (RTL for `ar`/`fa`).
  - `[locale]/page.tsx` statically generated with `generateStaticParams`.
  - Initial messages for nav/hero/CTA wired; expand per page as content lands.
- **SEO**:
  - Per-locale `generateMetadata`: title, description, canonical, OpenGraph/Twitter.
  - `hreflang` for `en`, `ar`, `fa`, plus `x-default`.
  - `robots.txt`, `sitemap.xml` with localized URLs.
  - JSON-LD: `Organization`, `Product`, `WebSite`, `BreadcrumbList`, `FAQPage`, `BlogPosting`.
- **Performance**: `next/image`, responsive sizes; critical font preloads (Latin/Arabic/Persian subsets); minimal JS; deferred non-critical scripts; immutable static assets.
- **Accessibility**: Semantic HTML, aria, focus states, contrast; `lang`/`dir` at root; keyboard-friendly nav and language switcher.
- **Design System**: RTL-aware utilities using logical properties; components (Navbar, Footer, Hero, FeatureGrid, Tabs, Testimonials, PricingCards, BlogList, BlogPost, LanguageSwitcher); optional dark mode.
- **Analytics & Consent**: Privacy-friendly analytics; localized consent if needed.
- **Forms**: Contact via third-party endpoint; localized validation; SSG-safe.

### Acceptance Criteria

- All pages exist and build via SSG for `en`, `ar`, `fa`.
- Locale detection redirects `/` to best match; manual switcher preserves path and scroll; correct `dir` mirrors UI.
- SEO: canonical, `hreflang`, OpenGraph/Twitter, JSON-LD; `robots.txt` and `sitemap.xml` list localized URLs.
- Lighthouse (key pages, all locales): Performance ≥ 90, Accessibility ≥ 95, Best Practices ≥ 95, SEO ≥ 95.
- No model-specific benchmarks published; enterprise pricing via Contact Sales.
- 404/500 localized and SSG.

### Success Metrics

- Organic impressions/clicks per locale.
- Demo/contact conversion rate.
- Core Web Vitals: LCP < 2.0s, CLS < 0.1, INP < 200ms.

### Risks & Mitigations

- **RTL regressions**: RTL visual checks; logical CSS properties.
- **Translation quality**: Professional translators; glossary per locale.
- **SEO duplication**: Strict canonical + `hreflang`; single-language per page.
- **Compliance claims**: Phrase as “in progress/upon request” until certified.

### Timeline

- Week 1: IA, design system, `next-intl` setup, locale middleware, base pages.
- Week 2: EN content → AR/FA localization, SEO wiring, structured data.
- Week 3: MDX blog, pricing page, contact form, analytics/consent.
- Week 4: RTL QA, performance tuning, Lighthouse checks, launch.

- Updated the PRD with your decisions: default `en` with automatic detection/redirect, no published model lineup/benchmarks at launch, enterprise “Contact sales,” and Europe/Middle East focus with GDPR-ready positioning and SOC 2/ISO 27001 as “in progress/upon request.”

### High‑impact image placements for the landing site (Unsplash-ready)

- **Hero (Home)**

  - **Type**: Abstract AI/flow systems or tech architecture; subtle motion-friendly background.
  - **Keywords**: “generative abstract network”, “ai workflow”, “data flow abstract”, “neural network art”.
  - **Aspect**: 16:9 or 21:9; 2400–2880px wide.
  - **Alt**: “Abstract visualization of agentic AI workflows.”

- **Value Pillars (Home)**

  - **Type**: 3 small feature visuals or icon-style photos.
  - **Keywords**: “automation abstract”, “low latency concept”, “open source code texture”.
  - **Aspect**: 1:1 or 4:3; 800–1200px.
  - **Alt**: One line per pillar describing benefit.

- **How It Works (Home)**

  - **Type**: Step visuals per phase or a single horizontal strip image.
  - **Keywords**: “workflow diagram abstract”, “systems orchestration”, “monitoring dashboard abstract”.
  - **Aspect**: 3–4 tiles at 4:3; 1000px each.
  - **Alt**: “Architect step”, “Simulate step”, “Orchestrate step”, “Monitor step”.

- **Social Proof strip (Home)**

  - **Type**: Optional subtle texture behind logos.
  - **Keywords**: “clean gradient texture”, “paper grain gradient”.
  - **Aspect**: Thin 21:9 background.
  - **Alt**: Decorative; use empty alt if purely aesthetic.

- **Solutions (Agentic Workflows)**

  - **Type**: Multi‑agent concept visuals; team collaboration without identifiable faces.
  - **Keywords**: “multi agent ai”, “collaboration abstract”, “graph systems”.
  - **Aspect**: Banner 16:9 + 2–3 inline 3:2.
  - **Alt**: Describe the pattern or workflow shown.

- **Platform (LLM Inference & Infra)**

  - **Type**: Data center/GPU racks; fiber optics; latency/streaming abstractions.
  - **Keywords**: “data center”, “gpu server”, “optical fiber internet”, “edge computing”.
  - **Aspect**: Hero 16:9; supporting 4:3.
  - **Alt**: “GPU infrastructure enabling low‑latency LLM inference.”

- **Products**

  - **Type**: Clean device mockups background or abstract UI textures.
  - **Keywords**: “minimal workstation”, “dark ui abstract”, “grid glassmorphism”.
  - **Aspect**: 4:3 or device‑like 3:2.
  - **Alt**: Describe the product area (“Agentic Studio visual builder”).

- **Use Cases**

  - **Type**: Industry‑agnostic conceptuals: support automation, RPA, data pipelines, enterprise search, code agents.
  - **Keywords**:
    - “customer support abstract”, “robotic process automation concept”
    - “data pipeline”, “enterprise search”, “software developer workstation minimal”
  - **Aspect**: Card visuals 4:3 or 16:9.
  - **Alt**: Clear outcome per use case.

- **Pricing**

  - **Type**: Light abstract background (no people).
  - **Keywords**: “soft gradient background”, “tech gradient texture”.
  - **Aspect**: Full‑width strip; low contrast.
  - **Alt**: Decorative; empty alt if purely aesthetic.

- **About**

  - **Type**: Regionally relevant cityscapes (Europe, Middle East), culture‑neutral office.
  - **Keywords**: “Dubai skyline”, “Riyadh city”, “Tehran skyline”, “Berlin tech”, “europe tech hub”, “modern office minimal”.
  - **Aspect**: 16:9 banner + 1:1 team/placeholders.
  - **Alt**: “Hooshpod focus regions: Europe and Middle East.”

- **Blog/Insights**

  - **Type**: Cover per post: abstract AI, benchmarking, architecture.
  - **Keywords**: “benchmark charts abstract”, “ai architecture diagram”, “neural graph abstract”.
  - **Aspect**: 16:9 cover; 1200×630 OpenGraph-friendly.
  - **Alt**: Summarize the article topic.

- **Careers**

  - **Type**: Inclusive, non‑identifiable collaboration; workspace details; avoid close‑ups requiring releases.
  - **Keywords**: “collaborative workspace”, “modern office desk minimal”, “pair programming hands keyboard”.
  - **Aspect**: 3:2 or 4:3.
  - **Alt**: “Collaborative, globally distributed team.”

- **Contact**

  - **Type**: Subtle background texture to reduce visual noise.
  - **Keywords**: “clean gradient texture”, “paper texture minimal”.
  - **Aspect**: Full‑width low‑contrast.
  - **Alt**: Decorative; empty alt if purely aesthetic.

- **404/500**
  - **Type**: Tasteful abstract noise/gradient.
  - **Keywords**: “grain gradient”, “nebula abstract”.
  - **Aspect**: Centered illustration.
  - **Alt**: “Decorative abstract background.”

### Art direction and consistency

- **Palette**: Pick 2–3 tones matching brand (e.g., indigo, cyan, graphite). Prefer images that can be tinted to that palette.
- **Style**: Abstract/systemic over literal people shots; avoid stock cliché.
- **Regional nods**: Select a few EU/MENA cityscapes for About and subtle Home background variants.

### Accessibility and localization

- **Alt text**: Descriptive, locale‑aware translations for `en`, `ar`, `fa`.
- **RTL/LTR**: Choose images that remain meaningful when mirrored or positioned on either side of text; avoid directional arrows embedded in photos.

### Performance and implementation tips

- Use `next/image` with `fill`/`sizes` and responsive `srcset`.
- Provide 3–4 breakpoints; target ≤200KB hero (after compression) and ≤100KB for secondary images.
- Prefer JPEG/AVIF; pre-generate dominant color placeholder or blurDataURL.
- Preload only the above‑the‑fold hero.
- Keep OG images at 1200×630, <300KB.

### Attribution and licensing

- Unsplash allows free use; add non‑intrusive credit in `About` or site footer if desired.
- Avoid identifiable faces unless the shot is general enough; prefer abstracts to sidestep model releases.

### Quick starter keyword sets (copy/paste)

- “agentic ai workflow abstract”
- “neural network abstract lines”
- “gpu server data center”
- “optical fiber bokeh”
- “clean gradient texture”
- “europe middle east skyline night”
- “minimal workstation dark ui”

- You can place high‑impact Unsplash images in Hero, Platform (GPU/infra), and About (regional focus), with abstract textures for Pricing/Contact and small conceptual visuals for Pillars, Solutions, Products, and Use Cases. Use `next/image`, localized alt text, and palette‑consistent abstracts to keep it fast, accessible, and on‑brand.
