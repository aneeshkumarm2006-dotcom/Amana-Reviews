# Amana (أمانة) — broker ratings & scam intelligence

Bilingual (English + Arabic, RTL/LTR) broker review & trust platform. A Davnoot product.
Built from the Claude Design prototype `Amana.dc.html` per [BUILD-PROMPT.md](BUILD-PROMPT.md).

## Stack
- **Next.js 14** (App Router) + **TypeScript**
- **next-intl** for i18n — locale-prefixed routes `/en/*` and `/ar/*`, RTL for Arabic
- **Tailwind CSS** + design tokens; fonts: Newsreader, Libre Franklin, IBM Plex Mono, IBM Plex Sans Arabic
- Fully static (SSG): 177 prerendered pages; SEO via metadata, `hreflang`, JSON-LD, `sitemap.xml`, `robots.txt`

## Develop
```bash
npm install
npm run dev      # http://localhost:3000  (redirects to /en)
npm run build    # production build (prerenders all pages)
npm run start    # serve the production build
```

## Routes (per locale)
`/` home · `/reviews` + `/reviews/[slug]` · `/best/country/[country]` · `/best/category/[category]`
· `/scam-alerts` + `/scam-alerts/[slug]` · `/articles` + `/articles/[slug]` · `/predictions` + `/predictions/[slug]`
· `/services/detector` · `/services/portfolio` · `/services/signals` · `/authors` + `/authors/[slug]`
· `/principles` · `/contact` · `/sitemap` · `/search` · `/go/[slug]` (cloaked affiliate redirect)

## Structure
- `src/app/[locale]/` — pages (server components)
- `src/components/` — UI: `ui.tsx`, `blocks.tsx` (server) + client islands (`SiteChrome`, `Faq`, `CommentForm`, `DetectorTool`, `PortfolioCalculator`, `SignalsForm`, `ReviewsExplorer`, `SearchPanel`, `ContactForm`)
- `src/data/` — typed bilingual data (brokers, scams, authors, articles, predictions, taxonomy)
- `src/lib/` — `i18n.ts` (`t()`/`loc()` helpers), `routes.ts`, `fonts.ts`
- `src/i18n/`, `src/middleware.ts` — next-intl config

## Notes
- All broker/scam names and data are **illustrative** placeholders. Swap real content in `src/data/`.
- Affiliate links route through `/go/[slug]` → `affiliateUrl()` in `src/data/brokers.ts` (replace with real partner URLs; wire click tracking in `src/app/go/[slug]/route.ts`).
- Forms are client-side demos (no backend yet) — wire to your API/CRM.
