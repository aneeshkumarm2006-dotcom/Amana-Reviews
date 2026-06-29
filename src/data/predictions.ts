import type { Locale } from '@/lib/i18n';

export interface Prediction {
  slug: string;
  ticker: string;
  name: string;
  nameAr: string;
  date: string;
  dateAr: string;
  bias: string;
  biasAr: string;
  target: string;
  title: string;
  titleAr: string;
  excerpt: string;
  excerptAr: string;
}

export const PREDICTIONS: Prediction[] = [
  { slug: 'gold-xauusd-2026', ticker: 'XAU/USD', name: 'Gold', nameAr: 'الذهب', date: 'June 22, 2026', dateAr: '22 يونيو 2026', bias: 'Bullish', biasAr: 'صاعد', target: '$2,640', title: 'Gold (XAU/USD) outlook: where prices head in 2026', titleAr: 'نظرة على الذهب (XAU/USD): إلى أين تتجه الأسعار في 2026', excerpt: 'Rate-cut expectations and central-bank buying keep the structural case for gold intact through year-end.', excerptAr: 'توقعات خفض الفائدة وشراء البنوك المركزية تبقي الحجّة البنيوية للذهب قائمة حتى نهاية العام.' },
  { slug: 'eurusd-q3-2026', ticker: 'EUR/USD', name: 'Euro', nameAr: 'اليورو', date: 'June 16, 2026', dateAr: '16 يونيو 2026', bias: 'Neutral', biasAr: 'محايد', target: '1.09–1.13', title: 'EUR/USD forecast for Q3 2026', titleAr: 'توقعات EUR/USD للربع الثالث 2026', excerpt: 'A narrowing rate differential leaves the pair range-bound; we map the levels that matter.', excerptAr: 'تضيّق فارق الفائدة يبقي الزوج ضمن نطاق؛ نرسم المستويات المهمة.' },
  { slug: 'btc-2026', ticker: 'BTC/USD', name: 'Bitcoin', nameAr: 'البتكوين', date: 'June 9, 2026', dateAr: '9 يونيو 2026', bias: 'Bullish', biasAr: 'صاعد', target: '$78,000', title: 'Bitcoin price prediction for 2026', titleAr: 'توقع سعر البتكوين لعام 2026', excerpt: 'Post-halving supply dynamics and ETF flows frame a constructive but volatile second half.', excerptAr: 'ديناميكيات العرض بعد الهالفينغ وتدفقات صناديق ETF ترسم نصفاً ثانياً إيجابياً لكن متقلباً.' },
  { slug: 'oil-wti-2026', ticker: 'WTI', name: 'Crude Oil', nameAr: 'النفط الخام', date: 'June 2, 2026', dateAr: '2 يونيو 2026', bias: 'Bearish', biasAr: 'هابط', target: '$64', title: 'Crude oil (WTI) outlook for 2026', titleAr: 'نظرة على النفط الخام (WTI) لعام 2026', excerpt: 'Softening demand and resilient supply tilt the balance lower into the autumn.', excerptAr: 'تراجع الطلب وصمود العرض يميلان بالميزان نحو الأدنى مع حلول الخريف.' },
];

export function predictions(_locale?: Locale): Prediction[] {
  return PREDICTIONS;
}

export function predictionBySlug(slug: string): Prediction {
  return PREDICTIONS.find((p) => p.slug === slug) || PREDICTIONS[0];
}

export const predTitle = (locale: Locale, p: Prediction) => (locale === 'ar' ? p.titleAr : p.title);
export const predExcerpt = (locale: Locale, p: Prediction) => (locale === 'ar' ? p.excerptAr : p.excerpt);
export const predName = (locale: Locale, p: Prediction) => (locale === 'ar' ? p.nameAr : p.name);
export const predBias = (locale: Locale, p: Prediction) => (locale === 'ar' ? p.biasAr : p.bias);
export const predDate = (locale: Locale, p: Prediction) => (locale === 'ar' ? p.dateAr : p.date);

export interface Signal {
  pair: string;
  dir: string;
  entry: string;
  tp: string;
  sl: string;
  status: string;
  conf: number;
}

export const SIGNALS: Signal[] = [
  { pair: 'EUR/USD', dir: 'BUY', entry: '1.0865', tp: '1.0940', sl: '1.0820', status: 'Active', conf: 82 },
  { pair: 'XAU/USD', dir: 'SELL', entry: '2,612', tp: '2,584', sl: '2,628', status: 'Active', conf: 76 },
  { pair: 'GBP/JPY', dir: 'BUY', entry: '198.40', tp: '199.90', sl: '197.60', status: 'Hit TP', conf: 88 },
  { pair: 'USD/CAD', dir: 'SELL', entry: '1.3720', tp: '1.3650', sl: '1.3760', status: 'Active', conf: 71 },
  { pair: 'BTC/USD', dir: 'BUY', entry: '71,200', tp: '73,400', sl: '70,100', status: 'Hit TP', conf: 79 },
];
