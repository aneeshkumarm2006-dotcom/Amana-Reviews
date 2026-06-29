import type { Locale } from '@/lib/i18n';

export interface Scam {
  slug: string;
  name: string;
  country: string;
  countryAr: string;
  verdict: string;
  verdictAr: string;
  why: string;
  whyAr: string;
  flags: string[];
  flagsAr: string[];
}

export const SCAMS: Scam[] = [
  { slug: 'fxvantix', name: 'FXVantix', country: 'UAE', countryAr: 'الإمارات', verdict: 'Confirmed scam', verdictAr: 'احتيال مؤكّد', why: 'Unlicensed, blocks withdrawals, and impersonates a real DFSA-regulated firm.', whyAr: 'غير مرخّص، يحجب السحوبات، وينتحل صفة شركة حقيقية مرخّصة من DFSA.', flags: ['No verifiable license', 'Withdrawal blocked after deposit', 'Guaranteed-return promises', 'Aggressive cold-calling'], flagsAr: ['لا يوجد ترخيص يمكن التحقق منه', 'حجب السحب بعد الإيداع', 'وعود بعوائد مضمونة', 'اتصالات ترويجية ملحّة'] },
  { slug: 'crownbit-trade', name: 'CrownBit Trade', country: 'Egypt', countryAr: 'مصر', verdict: 'Confirmed scam', verdictAr: 'احتيال مؤكّد', why: 'Crypto "investment platform" running a classic deposit-then-vanish model.', whyAr: '«منصة استثمار» للعملات الرقمية تعمل بنموذج الإيداع ثم الاختفاء الكلاسيكي.', flags: ['Fake regulator badges', 'Pressure to deposit more', 'Cloned website', 'Anonymous owners'], flagsAr: ['شارات تنظيمية مزيّفة', 'ضغط للإيداع أكثر', 'موقع منسوخ', 'ملاك مجهولون'] },
  { slug: 'royalpip-capital', name: 'RoyalPip Capital', country: 'Saudi Arabia', countryAr: 'السعودية', verdict: 'Confirmed scam', verdictAr: 'احتيال مؤكّد', why: 'Recovery-fee fraud targeting victims of other scams.', whyAr: 'احتيال «رسوم استرداد» يستهدف ضحايا عمليات احتيال أخرى.', flags: ['Asks for upfront "recovery fees"', 'No physical address', 'Telegram-only contact'], flagsAr: ['يطلب «رسوم استرداد» مقدّماً', 'لا يوجد عنوان فعلي', 'التواصل عبر تيليجرام فقط'] },
  { slug: 'menagold-invest', name: 'MenaGold Invest', country: 'Jordan', countryAr: 'الأردن', verdict: 'High risk', verdictAr: 'مخاطر عالية', why: 'Offshore shell with manipulated platform pricing and hidden fees.', whyAr: 'شركة خارجية صورية بأسعار منصة متلاعَب بها ورسوم خفية.', flags: ['Slippage on every trade', 'Bonus traps lock funds', 'Unverifiable address'], flagsAr: ['انزلاق سعري في كل صفقة', 'مكافآت تحبس الأموال', 'عنوان لا يمكن التحقق منه'] },
  { slug: 'trade7-pro', name: 'Trade7 Pro', country: 'Iraq', countryAr: 'العراق', verdict: 'High risk', verdictAr: 'مخاطر عالية', why: 'Operates without oversight and uses fake influencer endorsements.', whyAr: 'يعمل دون رقابة ويستخدم تأييدات مزيّفة من مؤثّرين.', flags: ['Paid fake reviews', 'No segregated client funds', 'Vague terms'], flagsAr: ['مراجعات مزيّفة مدفوعة', 'لا فصل لأموال العملاء', 'شروط غامضة'] },
];

export function scams(_locale?: Locale): Scam[] {
  return SCAMS;
}

export function scamBySlug(slug: string): Scam {
  return SCAMS.find((x) => x.slug === slug) || SCAMS[0];
}

export const scamCountry = (locale: Locale, s: Scam) => (locale === 'ar' ? s.countryAr : s.country);
export const scamVerdict = (locale: Locale, s: Scam) => (locale === 'ar' ? s.verdictAr : s.verdict);
export const scamWhy = (locale: Locale, s: Scam) => (locale === 'ar' ? s.whyAr : s.why);
export const scamFlags = (locale: Locale, s: Scam) => (locale === 'ar' ? s.flagsAr : s.flags);
