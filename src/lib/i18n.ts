import type { Locale } from '@/i18n/routing';

export type { Locale };

/** Pick EN/AR string — mirrors the prototype's tr(en, ar). */
export function t(locale: Locale, en: string, ar: string): string {
  return locale === 'ar' ? ar : en;
}

/** Localized field accessor — mirrors loc(obj, key): returns obj[key+'Ar'] for ar when present. */
export function loc<T extends Record<string, any>>(
  locale: Locale,
  obj: T,
  key: string
): any {
  if (locale === 'ar' && obj[key + 'Ar'] != null) return obj[key + 'Ar'];
  return obj[key];
}

export const isAr = (locale: Locale) => locale === 'ar';
export const dir = (locale: Locale) => (locale === 'ar' ? 'rtl' : 'ltr');
