import type { Locale } from '@/lib/i18n';

export interface Article {
  slug: string;
  cat: string;
  catAr: string;
  read: string;
  readAr: string;
  date: string;
  dateAr: string;
  title: string;
  titleAr: string;
  excerpt: string;
  excerptAr: string;
  author: string;
}

export const ARTICLES: Article[] = [
  { slug: 'spot-forex-scam-2026', cat: 'Safety', catAr: 'الأمان', read: '7 min', readAr: '7 دقائق', date: 'June 18, 2026', dateAr: '18 يونيو 2026', title: 'How to spot a forex broker scam in 2026', titleAr: 'كيف تكتشف احتيال وسيط فوركس في 2026', excerpt: 'Eight red flags that separate a regulated broker from a fraud — and what to do before you deposit a single dollar.', excerptAr: 'ثماني علامات تحذيرية تفصل الوسيط المرخّص عن المحتال — وماذا تفعل قبل أن تودع دولاراً واحداً.', author: 'omar-khalil' },
  { slug: 'islamic-swap-free-accounts', cat: 'Education', catAr: 'تعليم', read: '6 min', readAr: '6 دقائق', date: 'June 11, 2026', dateAr: '11 يونيو 2026', title: 'What is an Islamic (swap-free) account, really?', titleAr: 'ما هو الحساب الإسلامي (بدون فوائد مبيت) حقّا؟', excerpt: 'How swap-free accounts work, where the costs hide, and how to tell a genuinely Shariah-compliant broker from a marketing label.', excerptAr: 'كيف تعمل الحسابات بدون فوائد مبيت، وأين تختبئ التكاليف، وكيف تميّز الوسيط المتوافق فعلاً مع الشريعة.', author: 'layla-haddad' },
  { slug: 'spreads-explained', cat: 'Education', catAr: 'تعليم', read: '5 min', readAr: '5 دقائق', date: 'June 4, 2026', dateAr: '4 يونيو 2026', title: 'Forex spreads and commissions, explained', titleAr: 'سبريد الفوركس والعمولات — شرح مبسّط', excerpt: 'Spread vs. commission, raw vs. standard accounts, and the real cost of a trade once everything is added up.', excerptAr: 'الفرق بين السبريد والعمولة، والحسابات الخام مقابل القياسية، والتكلفة الحقيقية للصفقة.', author: 'layla-haddad' },
  { slug: 'regulation-fca-cysec-dfsa-sca', cat: 'Regulation', catAr: 'التنظيم', read: '9 min', readAr: '9 دقائق', date: 'May 28, 2026', dateAr: '28 مايو 2026', title: 'Broker regulation explained: FCA, CySEC, DFSA & SCA', titleAr: 'تنظيم الوسطاء بالتفصيل: FCA وCySEC وDFSA وSCA', excerpt: 'What each license actually protects you from, the compensation schemes behind them, and which matters most for MENA traders.', excerptAr: 'ممّا يحميك كل ترخيص فعلياً، وأنظمة التعويض خلفها، وأيّها الأهم لمتداولي المنطقة.', author: 'omar-khalil' },
  { slug: 'risk-management-basics', cat: 'Strategy', catAr: 'استراتيجية', read: '8 min', readAr: '8 دقائق', date: 'May 20, 2026', dateAr: '20 مايو 2026', title: 'Risk management for new traders', titleAr: 'إدارة المخاطر للمتداولين الجدد', excerpt: 'Position sizing, stop-losses, and the 1% rule — the unglamorous habits that keep accounts alive.', excerptAr: 'تحديد حجم الصفقة، ووقف الخسارة، وقاعدة 1% — العادات التي تبقي الحسابات حيّة.', author: 'layla-haddad' },
  { slug: 'choosing-first-broker', cat: 'Education', catAr: 'تعليم', read: '6 min', readAr: '6 دقائق', date: 'May 12, 2026', dateAr: '12 مايو 2026', title: 'How to choose your first broker', titleAr: 'كيف تختار وسيطك الأول', excerpt: 'A practical, regulation-first checklist for opening your first trading account without getting burned.', excerptAr: 'قائمة عملية تبدأ بالتنظيم لفتح أول حساب تداول دون أن تتعرّض للخسارة.', author: 'sara-nasser' },
];

export function articles(_locale?: Locale): Article[] {
  return ARTICLES;
}

export function articleBySlug(slug: string): Article {
  return ARTICLES.find((a) => a.slug === slug) || ARTICLES[0];
}

export const articleTitle = (locale: Locale, a: Article) => (locale === 'ar' ? a.titleAr : a.title);
export const articleExcerpt = (locale: Locale, a: Article) => (locale === 'ar' ? a.excerptAr : a.excerpt);
export const articleCat = (locale: Locale, a: Article) => (locale === 'ar' ? a.catAr : a.cat);
export const articleRead = (locale: Locale, a: Article) => (locale === 'ar' ? a.readAr : a.read);
export const articleDate = (locale: Locale, a: Article) => (locale === 'ar' ? a.dateAr : a.date);
