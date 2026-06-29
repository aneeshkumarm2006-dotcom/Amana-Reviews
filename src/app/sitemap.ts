import type { MetadataRoute } from 'next';
import { routing } from '@/i18n/routing';
import { BROKERS_RAW } from '@/data/brokers';
import { SCAMS } from '@/data/scams';
import { ARTICLES } from '@/data/articles';
import { PREDICTIONS } from '@/data/predictions';
import { AUTHORS } from '@/data/authors';
import { COUNTRIES, CATEGORIES } from '@/data/taxonomy';

const BASE = 'https://amana.reviews';

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths = ['', '/reviews', '/scam-alerts', '/articles', '/predictions', '/authors', '/principles', '/contact', '/sitemap', '/services/detector', '/services/portfolio', '/services/signals'];
  const dynamicPaths = [
    ...BROKERS_RAW.map((b) => `/reviews/${b.slug}`),
    ...SCAMS.map((s) => `/scam-alerts/${s.slug}`),
    ...ARTICLES.map((a) => `/articles/${a.slug}`),
    ...PREDICTIONS.map((p) => `/predictions/${p.slug}`),
    ...AUTHORS.map((a) => `/authors/${a.slug}`),
    ...COUNTRIES.map((c) => `/best/country/${c[0]}`),
    ...CATEGORIES.map((c) => `/best/category/${c[0]}`),
  ];
  const all = [...staticPaths, ...dynamicPaths];

  return all.flatMap((path) =>
    routing.locales.map((locale) => ({
      url: `${BASE}/${locale}${path}`,
      lastModified: new Date('2026-06-24'),
      alternates: {
        languages: Object.fromEntries(routing.locales.map((l) => [l, `${BASE}/${l}${path}`])),
      },
    }))
  );
}
