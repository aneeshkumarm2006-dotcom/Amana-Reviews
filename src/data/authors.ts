import type { Locale } from '@/lib/i18n';

export interface Author {
  slug: string;
  name: string;
  nameAr: string;
  role: string;
  roleAr: string;
  init: string;
  creds: string[];
  credsAr: string[];
  bio: string;
  bioAr: string;
}

export const AUTHORS: Author[] = [
  { slug: 'layla-haddad', name: 'Layla Haddad', nameAr: 'ليلى حدّاد', role: 'Senior Markets Analyst', roleAr: 'محلّلة أسواق أولى', init: 'LH', creds: ['CFA Charterholder', '12y FX & CFD markets', 'Ex-buy-side strategist'], credsAr: ['حاصلة على CFA', '12 عاماً في أسواق الفوركس والعقود', 'استراتيجية سابقة في جهة شرائية'], bio: 'Layla leads broker due-diligence at Amana, focusing on execution quality, spreads, and platform reliability.', bioAr: 'تقود ليلى تدقيق الوسطاء في أمانة، مع التركيز على جودة التنفيذ والسبريد وموثوقية المنصّات.' },
  { slug: 'omar-khalil', name: 'Omar Khalil', nameAr: 'عمر خليل', role: 'Regulation & Compliance Editor', roleAr: 'محرّر التنظيم والامتثال', init: 'OK', creds: ['LL.M. Financial Law', 'Former regulator liaison', 'Specialist in MENA licensing'], credsAr: ['ماجستير في القانون المالي', 'حلقة وصل سابقة مع جهة تنظيمية', 'متخصّص في تراخيص الشرق الأوسط'], bio: 'Omar verifies every license claim against FCA, CySEC, DFSA and SCA registries before a broker is scored.', bioAr: 'يتحقّق عمر من كل ادعاء ترخيص عبر سجلات FCA وCySEC وDFSA وSCA قبل تقييم أي وسيط.' },
  { slug: 'sara-nasser', name: 'Sara Nasser', nameAr: 'سارة ناصر', role: 'Fact-checker & Reviewer', roleAr: 'مدقّقة حقائق ومراجِعة', init: 'SN', creds: ['8y financial journalism', 'Data verification lead'], credsAr: ['8 أعوام في الصحافة المالية', 'مسؤولة التحقق من البيانات'], bio: 'Sara independently reviews each rating for accuracy and conflicts of interest before publication.', bioAr: 'تراجع سارة كل تقييم بشكل مستقل للتأكد من الدقة وغياب تضارب المصالح قبل النشر.' },
];

export function authorBySlug(slug: string): Author {
  return AUTHORS.find((a) => a.slug === slug) || AUTHORS[0];
}

export const authorName = (locale: Locale, a: Author) => (locale === 'ar' ? a.nameAr : a.name);
export const authorRole = (locale: Locale, a: Author) => (locale === 'ar' ? a.roleAr : a.role);
export const authorCreds = (locale: Locale, a: Author) => (locale === 'ar' ? a.credsAr : a.creds);
export const authorBio = (locale: Locale, a: Author) => (locale === 'ar' ? a.bioAr : a.bio);
