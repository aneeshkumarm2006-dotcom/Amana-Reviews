/** Central route → locale-relative href map. next-intl Link prepends the locale. */
export type RouteName =
  | 'home'
  | 'reviews'
  | 'review'
  | 'best-country'
  | 'best-category'
  | 'articles'
  | 'article'
  | 'predictions'
  | 'prediction'
  | 'scam-alerts'
  | 'scam-alert'
  | 'detector'
  | 'portfolio'
  | 'signals'
  | 'authors'
  | 'author'
  | 'principles'
  | 'contact'
  | 'sitemap'
  | 'search';

export function href(route: RouteName, param?: string): string {
  switch (route) {
    case 'home': return '/';
    case 'reviews': return '/reviews';
    case 'review': return `/reviews/${param}`;
    case 'best-country': return `/best/country/${param}`;
    case 'best-category': return `/best/category/${param}`;
    case 'articles': return '/articles';
    case 'article': return `/articles/${param}`;
    case 'predictions': return '/predictions';
    case 'prediction': return `/predictions/${param}`;
    case 'scam-alerts': return '/scam-alerts';
    case 'scam-alert': return `/scam-alerts/${param}`;
    case 'detector': return '/services/detector';
    case 'portfolio': return '/services/portfolio';
    case 'signals': return '/services/signals';
    case 'authors': return '/authors';
    case 'author': return `/authors/${param}`;
    case 'principles': return '/principles';
    case 'contact': return '/contact';
    case 'sitemap': return '/sitemap';
    case 'search': return '/search';
    default: return '/';
  }
}
