import type { MetadataRoute } from 'next';

const BASE = 'https://amana.reviews';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: '*', allow: '/', disallow: ['/go/', '/*/search'] }],
    sitemap: `${BASE}/sitemap.xml`,
  };
}
