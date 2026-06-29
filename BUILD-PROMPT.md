# Amana — Master Build Prompt

> **Use this document as the single source of truth to build the site.**
> It is the functional + content spec (a feature-complete replica of a broker-review platform,
> rebuilt under our own brand). **Visual design will be supplied separately** — wherever you see
> 🎨 `DESIGN`, defer to the provided design system. Everything else (structure, data, behavior,
> i18n, SEO) is specified here.

---

## 0. One-paragraph brief

Build **Amana** (أمانة) — a **bilingual (English + Arabic) broker & trading-platform review and trust
platform**. It rates online trading brokers, ranks the best brokers by country and by category,
exposes scam/fraudulent brokers, publishes educational articles and market predictions, and offers
lead-gen services (portfolio management, free trading signals). It is monetized through **affiliate
links** to brokers (with clear advertiser disclosure). The Arabic edition is **RTL**; the English
edition is **LTR**. SEO is mission-critical: the entire architecture is built to rank for
"best broker in <country>", "<broker> review", and "<broker> scam" queries.

- **Brand:** Amana (أمانة), a Davnoot product
- **Tagline:** EN *"Trade with confidence."* / AR *"تداول بأمان، واختر بثقة."*
- **Tone:** authoritative, protective, transparent, expert-led (E-E-A-T).

---

## 1. Tech & platform requirements

> 🎨 Stack is a recommendation — swap freely; the spec is stack-agnostic. Default below is chosen
> for bilingual RTL/LTR + heavy SEO.

- **Framework:** Next.js (App Router) + TypeScript + Tailwind CSS.
- **i18n:** `next-intl` (or equivalent). Locale-prefixed routes: `/en/...` and `/ar/...`.
  - `dir="rtl"` + Arabic font stack for `ar`; `dir="ltr"` for `en`. Mirror all layout, icons, and spacing.
  - **Language switcher** in the header that preserves the current page (maps the equivalent slug per locale).
  - Per-locale slugs (Arabic slugs in Arabic, English slugs in English) with `hreflang` alternates.
- **Content source:** structured data (DB or headless CMS) for brokers, scams, reviews, authors;
  **MDX/CMS** for articles, predictions, press releases. (Keep content layer pluggable.)
- **SEO:** SSR/SSG, per-page meta, canonical + `hreflang`, XML sitemap, JSON-LD structured data
  (see §7). Fast LCP, image optimization.
- **Analytics + affiliate click tracking** on all outbound `/go/` links.
- **Forms:** server-validated, spam-protected (honeypot/CAPTCHA), stored + optional email notify.

---

## 2. Brand & global UI 🎨

Design supplied separately. Build these **global elements** to receive the design:

- **Header** with mega-menu navigation (5 menus, see §3), site search, language switcher, logo.
- **Footer**: quick links, top-rated brokers, by-country list, legal links, copyright (© Davnoot / Amana).
- **Persistent risk disclaimer** block (legal) + recurring **scam-warning callout**.
- **"Featured on / media" logo strip** (press mentions).
- **Floating WhatsApp/contact** button.
- **Advertiser-disclosure** component (collapsible) for monetized pages.
- **Breadcrumbs** on all interior pages.

---

## 3. Navigation (mega-menu)

Five top-level menus, each opening a panel:

1. **Ratings** → featured brokers (8 highlighted) + "All ratings".
2. **Best Brokers** → two groups:
   - **By Country** (~30): Saudi Arabia, UAE, Bahrain, Kuwait, Qatar, Oman, Jordan, Iraq, Egypt,
     Lebanon, Tunisia, Algeria, Morocco, Libya, Palestine, Syria, Yemen, Mauritania, Germany, Italy,
     France, Spain, Sweden, Turkey, Cyprus, UK, Europe, Australia. ("More countries" expander.)
   - **By Category** (~24): best apps, no-capital platforms, futures, Islamic/halal, low-spread,
     social/copy trading, CFDs, gold, forex, US stocks, commission-free, ECN, algo/automated,
     MetaTrader brokers, commodities, stocks-ownership, no-leverage, etc. ("All categories" expander.)
3. **Articles** → educational content index.
4. **Predictions** → stock/market forecast index.
5. **Services** → Portfolio Management, Free Trading Signals, Scam Detector.

Global **search** (`/search?q=`) across brokers + articles + pages.

---

## 4. Sitemap / routes (per locale, prefixed `/en` and `/ar`)

```
/                              Home
/reviews                       All broker reviews (index, ~160+ brokers, scored cards)
/reviews/[broker]              Broker review (core template)
/best/country/[country]        Best brokers in <country> (SEO ranking page)
/best/category/[category]      Best brokers for <category> (SEO ranking page)
/articles                      Articles index
/articles/[slug]               Article
/predictions                   Predictions index
/predictions/[slug]            Stock/market forecast
/scam-alerts                   Scam complaints index
/scam-alerts/[slug]            Individual scam-alert article
/services/portfolio            Portfolio management (calculator + lead form)
/services/signals              Free trading signals (sample feed + Telegram/WhatsApp signup)
/services/scam-detector        Scam-checker tool (search the DB) + scam-names reference
/authors                       Team / authors index
/authors/[slug]                Author profile
/principles                    Methodology & rating principles
/press-releases                Press releases index
/press-releases/[slug]         Press release
/contact                       Contact + "what to do if scammed"
/terms                         Terms of use
/privacy                       Privacy policy
/sitemap                       HTML sitemap
/search                        Search results
/go/[broker]                   Cloaked affiliate redirect (tracked, nofollow/sponsored)
```

---

## 5. Page templates (build these)

### 5.1 Home
Sections in order: Hero → Portfolio-management banner → "Protect your money" (scam protection) →
Trusted-brokers grid (logo cards: score, "Visit site", "Profile") → Investor testimonials →
Trading-signals (Telegram) block → Articles preview grid → "Pros & cons of brokers" → Methodology
teaser → Media-coverage strip → Important links + top-rated + by-country lists.

### 5.2 Broker review `/reviews/[broker]` — **the core template**
- H1 + **overall score (0–5)** + verdict + advertiser disclosure + "last updated" date.
- Sectioned body: **Overview, Commissions, Security, Withdrawal/Deposit, Account Opening,
  Mobile App, Financial Instruments**.
- **Pros / Cons** blocks.
- **Key-facts table(s):** min deposit, regulators/licenses (FCA, DFSA, SCA, CySEC…), spreads,
  Islamic account (yes/no), platforms, instruments.
- CTAs: **Open account / Trade now / Visit site** → `/go/[broker]` (tracked).
- **FAQ accordion** (is it a scam? is it licensed? min deposit? regulated in <country>? etc.).
- **Sources** section.
- **Author byline + Reviewer** (two roles — see §6 data model).
- **Related licensed brokers**.
- **Comments + review-submit form** → fields: `rating, comment, name, email, share_agreement`.

### 5.3 Reviews index `/reviews`
Grid of all brokers (160+) as scored cards (score badge 0/5–5/5, logo, "Visit site", "Profile").
Optional client-side filter/sort (by score, name, regulator, Islamic).

### 5.4 Best-by-Country `/best/country/[country]` & Best-by-Category `/best/category/[category]`
Heavy SEO template (shared):
- H1 + intro + **auto Table of Contents**.
- **Ranked, numbered broker list** with "Open account with X" CTAs + "broker of the month" highlight.
- Multiple **comparison tables** (commissions, features).
- Extensive localized **FAQ sections** (regulators, beginners, instruments, Islamic, withdrawal,
  CFD legality, etc.).

### 5.5 Article `/articles/[slug]`
H1, **TOC**, rich body (MDX), inline broker CTA widgets, **FAQ**, author byline, "consult via
WhatsApp" block, **related articles**, comments form.

### 5.6 Articles index `/articles`
Card grid of educational posts (title, excerpt, author, date, thumbnail).

### 5.7 Predictions index + detail `/predictions[/slug]`
Index: forecast cards ("<TICKER> expert outlook 2026"). Detail: same article template, finance-forecast flavored.

### 5.8 Scam alerts index `/scam-alerts`
List of scam-warning entries (company name + warning). 

### 5.9 Scam alert detail `/scam-alerts/[slug]`
Per-scam template: "Why we don't recommend X", "Is it licensed?", "How it lures victims",
"How to avoid scams", FAQ, author, **related scam alerts**, comments.

### 5.10 Static & utility
Authors index + profile, Principles/Methodology (incl. **rating-weight table**, values, partners,
FAQ), Press releases index + detail, Contact (info + legal entity + "if scammed" steps), Terms,
Privacy, HTML Sitemap, Search results (grouped: brokers / articles / pages).

---

## 6. Functional features (the logic)

### F1. Broker rating system
Weighted score (0–5) across categories (commissions, security, deposit/withdrawal, platform,
instruments, support). Methodology + weights published on `/principles`.

### F2. Broker data model
`Broker { id, name, slug{en,ar}, logo, score, verdict{en,ar}, regulators[], minDeposit, spreads,
islamicAccount:bool, platforms[], instruments[], pros[]{en,ar}, cons[]{en,ar}, sections{...},
faqs[]{q,a}, sources[], affiliateUrl, authorId, reviewerId, updatedAt, status }`

### F3. Reviews & comments
User submission (rating + text + name + email + consent), moderation queue, display with dates &
average rating. Anti-spam.

### F4. Affiliate redirect & tracking (`/go/[broker]`)
Server redirect to `affiliateUrl`, `rel="sponsored nofollow"`, click logged (broker, page, ts).
**Advertiser-disclosure** shown on monetized pages.

### F5. Scam database + **Scam Detector tool**
Searchable DB of scam brokers (grouped by country) + licensed-recommended list. Tool: input a
broker name → verdict (scam / licensed / unknown) with link to the relevant alert or review.
Plus a static **scam-names reference page** + warning-signs + recovery/report guidance + regulators table.

### F6. Site search
Full-text across brokers + articles + scam alerts + pages; grouped results.

### F7. Taxonomy
Brokers tagged by **country** and **category**; powers the Best-by-* pages and filters.

### F8. Content CMS
Articles, predictions, press releases, scam alerts: MDX/CMS with **auto-TOC**, **FAQ blocks**,
author+reviewer attribution, "last updated" stamp, related-content.

### F9. **Investment-return calculator** (Portfolio page)
Slider for portfolio size ($5k → $100k+) → computes **expected monthly profit** (configurable
rate). **PAMM/MAM comparison table**. Lead form: `name, email, mobile, consent` → store + notify.

### F10. **Trading signals** (Signals page)
Sample/live signals feed (FX pairs, entry/target), claimed success rate, **Telegram/WhatsApp
signup** funnel.

### F11. Author + reviewer attribution (E-E-A-T)
Two roles per content item: **Written by** + **Reviewed by**. Author profiles with bio/credentials.
`Author { id, name, slug, avatar, bio{en,ar}, role, credentials[] }`.

### F12. Per-page metadata
"Last updated" date, advertiser-disclosure flag, locale alternates.

### F13. Lead/contact funnels
WhatsApp consult, Telegram signals, portfolio register, contact form, "report a scam" form.

---

## 7. SEO & structured data
- Per-page `<title>`/meta/canonical; **`hreflang`** between en/ar equivalents.
- **JSON-LD:** `Review`/`AggregateRating` (broker pages), `FAQPage` (FAQ blocks),
  `BreadcrumbList`, `Article` (articles/predictions/alerts), `Organization`.
- XML sitemap (per locale) + HTML sitemap page.
- "Updated <year>" freshness signals in titles/headings where appropriate.
- Clean, keyword-rich localized slugs.

---

## 8. Compliance & trust
- Prominent **risk disclaimer** (trading-loss warning) site-wide.
- **Advertiser disclosure** on all monetized/affiliate pages.
- Clear separation of editorial scoring vs. affiliate relationships (state methodology).
- Privacy policy + cookie/consent handling; GDPR-friendly form consent checkboxes.

---

## 9. Bilingual (EN/AR) requirements — applies everywhere
- Every page, nav item, label, form, and content type exists in **both locales**.
- **RTL** for Arabic (layout mirror, logical CSS properties, RTL-aware components/icons).
- Localized **slugs, dates, numbers**, and **SEO metadata** per locale.
- Language switcher maps to the equivalent page in the other locale (fallback to section index).
- Content model stores `{en, ar}` for all human-readable fields.

---

## 10. Design handoff 🎨
The visual design system (colors, typography, components, spacing, logo, illustrations, motion)
**will be provided separately**. Implement all components above to consume that design. Until then,
build with neutral, accessible defaults and a clean component structure so the design drops in
without structural changes.

---

## 11. Out of scope / open questions for product owner
- Exact monetization config (affiliate networks, payout logic).
- Real signals data source (manual vs. feed) and calculator profit-rate assumptions.
- Initial content volume to migrate vs. author fresh.
- Admin/CMS choice (self-host DB+admin vs. headless CMS).
