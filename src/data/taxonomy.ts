import type { Locale } from '@/lib/i18n';

/** Regulator code → label (location-free). */
export const REG: Record<string, string> = {
  FCA: 'FCA',
  CySEC: 'CySEC',
  DFSA: 'DFSA',
  SCA: 'SCA',
  ASIC: 'ASIC',
  FSA: 'FSA',
  none: 'Offshore',
};

const REG_AR: Record<string, string> = {
  Offshore: 'خارجي',
};

export function regLabel(locale: Locale, code: string): string {
  const en = REG[code] ?? code;
  return locale === 'ar' ? REG_AR[en] ?? en : en;
}

/** [slug, EN, AR] */
export const COUNTRIES: [string, string, string][] = [
  ['saudi-arabia', 'Saudi Arabia', 'السعودية'],
  ['uae', 'UAE', 'الإمارات'],
  ['bahrain', 'Bahrain', 'البحرين'],
  ['kuwait', 'Kuwait', 'الكويت'],
  ['qatar', 'Qatar', 'قطر'],
  ['oman', 'Oman', 'عُمان'],
  ['jordan', 'Jordan', 'الأردن'],
  ['iraq', 'Iraq', 'العراق'],
  ['egypt', 'Egypt', 'مصر'],
  ['lebanon', 'Lebanon', 'لبنان'],
  ['tunisia', 'Tunisia', 'تونس'],
  ['algeria', 'Algeria', 'الجزائر'],
  ['morocco', 'Morocco', 'المغرب'],
  ['libya', 'Libya', 'ليبيا'],
  ['palestine', 'Palestine', 'فلسطين'],
  ['syria', 'Syria', 'سوريا'],
  ['yemen', 'Yemen', 'اليمن'],
  ['mauritania', 'Mauritania', 'موريتانيا'],
  ['germany', 'Germany', 'ألمانيا'],
  ['italy', 'Italy', 'إيطاليا'],
  ['france', 'France', 'فرنسا'],
  ['spain', 'Spain', 'إسبانيا'],
  ['sweden', 'Sweden', 'السويد'],
  ['turkey', 'Turkey', 'تركيا'],
  ['cyprus', 'Cyprus', 'قبرص'],
  ['uk', 'UK', 'المملكة المتحدة'],
  ['europe', 'Europe', 'أوروبا'],
  ['australia', 'Australia', 'أستراليا'],
];

export const CATEGORIES: [string, string, string][] = [
  ['best-apps', 'Best trading apps', 'أفضل تطبيقات التداول'],
  ['no-capital', 'No-deposit / low-capital', 'رأس مال منخفض'],
  ['futures', 'Futures', 'العقود الآجلة'],
  ['islamic', 'Islamic / halal', 'إسلامي / حلال'],
  ['low-spread', 'Low spread', 'سبريد منخفض'],
  ['social-copy', 'Social & copy trading', 'التداول الاجتماعي والنسخ'],
  ['copy-trading', 'Copy trading', 'نسخ التداول'],
  ['cfds', 'CFDs', 'العقود مقابل الفروقات'],
  ['gold', 'Gold', 'الذهب'],
  ['forex', 'Forex', 'الفوركس'],
  ['us-stocks', 'US stocks', 'الأسهم الأمريكية'],
  ['commission-free', 'Commission-free', 'بدون عمولة'],
  ['ecn', 'ECN', 'حسابات ECN'],
  ['algo', 'Algo / automated', 'التداول الآلي'],
  ['metatrader', 'MetaTrader brokers', 'وسطاء ميتاتريدر'],
  ['commodities', 'Commodities', 'السلع'],
  ['stocks-ownership', 'Stock ownership', 'تملّك الأسهم'],
  ['no-leverage', 'No-leverage', 'بدون رافعة'],
];

export function countryName(locale: Locale, slug: string): string {
  const f = COUNTRIES.find((c) => c[0] === slug);
  if (f) return locale === 'ar' ? f[2] : f[1];
  return locale === 'ar' ? 'السعودية' : 'Saudi Arabia';
}

export function categoryName(locale: Locale, slug: string): string {
  const f = CATEGORIES.find((c) => c[0] === slug);
  if (f) return locale === 'ar' ? f[2] : f[1];
  return locale === 'ar' ? 'سبريد منخفض' : 'Low spread';
}
