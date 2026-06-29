import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { t, loc, type Locale } from '@/lib/i18n';
import { routing } from '@/i18n/routing';
import { ARTICLES, articleBySlug, articles, articleTitle, articleExcerpt, articleCat, articleDate, articleRead } from '@/data/articles';
import { ArticleCard } from '@/components/ui';
import ArticleScaffold from '@/components/ArticleScaffold';

export function generateStaticParams() {
  return routing.locales.flatMap((locale) => ARTICLES.map((a) => ({ locale, slug: a.slug })));
}

export async function generateMetadata({ params }: { params: { locale: string; slug: string } }): Promise<Metadata> {
  const locale = params.locale as Locale;
  const a = articleBySlug(params.slug);
  return { title: articleTitle(locale, a), description: articleExcerpt(locale, a), alternates: { canonical: `/${locale}/articles/${a.slug}` } };
}

export default function ArticlePage({ params }: { params: { locale: string; slug: string } }) {
  const locale = params.locale as Locale;
  setRequestLocale(locale);
  const a = articleBySlug(params.slug);

  const sections: [string, string[]][] = [
    [t(locale, 'Why this matters', 'لماذا يهم هذا'), [
      t(locale, 'Choosing where to trade is the single most important decision you’ll make as a retail investor — more important than any individual trade. The wrong broker can cost you through hidden fees, poor execution, or, in the worst case, outright fraud.', 'اختيار مكان التداول هو أهم قرار تتخذه كمستثمر فرد — أهم من أي صفقة منفردة. فالوسيط الخاطئ قد يكلّفك عبر رسوم خفية أو تنفيذ سيئ أو، في أسوأ الحالات، احتيال صريح.'),
      t(locale, 'This guide walks through what to look for, in plain language, with the same framework our analysts use when scoring brokers.', 'يشرح هذا الدليل ما يجب البحث عنه بلغة بسيطة، وبالإطار نفسه الذي يستخدمه محلّلونا عند تقييم الوسطاء.'),
    ]],
    [t(locale, 'What to check first', 'ما الذي تتحقق منه أولًا'), [
      t(locale, 'Start with regulation. A broker authorised by the FCA, CySEC, DFSA or SCA is held to capital, conduct and client-money rules — and you have somewhere to complain if things go wrong. Verify the license number on the regulator’s own register, never just the broker’s website.', 'ابدأ بالتنظيم. الوسيط المرخّص من FCA أو CySEC أو DFSA أو SCA يخضع لقواعد رأس المال والسلوك وأموال العملاء — ولديك جهة تشكو إليها إن ساء الأمر. تحقّق من رقم الترخيص في سجل الجهة المنظِّمة نفسه، لا من موقع الوسيط فقط.'),
      t(locale, 'Next, look at the real cost of trading: the spread plus any commission, not the headline figure. Then test the withdrawal process with a small amount before committing serious capital.', 'بعد ذلك، انظر إلى التكلفة الحقيقية للتداول: السبريد مع أي عمولة، لا الرقم المعلن. ثم اختبر عملية السحب بمبلغ صغير قبل إيداع رأس مال كبير.'),
    ]],
    [t(locale, 'Common mistakes to avoid', 'أخطاء شائعة يجب تجنّبها'), [
      t(locale, 'Chasing bonuses is the classic trap — promotional credit usually locks up your funds with impossible turnover requirements. Equally dangerous is trusting social-media "gurus" who are paid to promote unregulated platforms.', 'مطاردة المكافآت فخّ كلاسيكي — فالرصيد الترويجي عادةً يحبس أموالك بشروط تداول مستحيلة. ومثلها خطورةً الثقة بـ«خبراء» وسائل التواصل المدفوعين للترويج لمنصات غير مرخّصة.'),
      t(locale, 'If a broker guarantees returns, pressures you to deposit quickly, or only contacts you via Telegram, treat those as serious red flags.', 'إذا ضمن وسيط عوائد، أو ضغط عليك للإيداع سريعًا، أو تواصل معك عبر تيليجرام فقط، فاعتبر ذلك علامات خطر جدّية.'),
    ]],
    [t(locale, 'The bottom line', 'الخلاصة'), [
      t(locale, 'Regulation first, costs second, everything else third. Use our ratings and Scam Detector as a starting point, and never deposit money you cannot afford to lose.', 'التنظيم أولًا، التكاليف ثانيًا، وكل ما عداهما ثالثًا. استخدم تصنيفاتنا وكاشف الاحتيال كنقطة بداية، ولا تُودِع أبدًا أموالًا لا يمكنك تحمّل خسارتها.'),
    ]],
  ];
  const faqs: [string, string][] = [
    [t(locale, 'How do I know if a broker is regulated?', 'كيف أعرف أن الوسيط مرخّص؟'), t(locale, 'Find the broker’s license number on its website, then search for it on the regulator’s public register (e.g. the FCA Register). If it’s not there, do not deposit.', 'ابحث عن رقم ترخيص الوسيط على موقعه، ثم ابحث عنه في السجل العام للجهة المنظِّمة (مثل سجل FCA). إن لم يكن موجودًا، فلا تُودِع.')],
    [t(locale, 'Is a higher minimum deposit safer?', 'هل الحد الأدنى الأعلى للإيداع أكثر أمانًا؟'), t(locale, 'Not necessarily. Minimum deposit and safety are unrelated — regulation is what matters. Some excellent brokers have very low minimums.', 'ليس بالضرورة. لا علاقة بين الحد الأدنى للإيداع والأمان — التنظيم هو المهم. بعض الوسطاء الممتازين لديهم حدود دنيا منخفضة جدًا.')],
    [t(locale, 'Can I trust online broker reviews?', 'هل يمكنني الوثوق بمراجعات الوسطاء على الإنترنت؟'), t(locale, 'Look for reviews that publish their methodology and disclose affiliate relationships, like ours. Be wary of sites that only ever praise brokers.', 'ابحث عن مراجعات تنشر منهجيتها وتفصح عن علاقاتها الإعلانية، مثل مراجعاتنا. واحذر من المواقع التي تمدح الوسطاء دائمًا فقط.')],
  ];

  const related = articles(locale).filter((x) => x.slug !== a.slug).slice(0, 3);

  return (
    <ArticleScaffold
      locale={locale}
      crumbs={[{ label: t(locale, 'Home', 'الرئيسية'), to: 'home' }, { label: t(locale, 'Articles', 'المقالات'), to: 'articles' }, { label: articleCat(locale, a) }]}
      tag={articleCat(locale, a)}
      title={articleTitle(locale, a)}
      date={articleDate(locale, a)}
      read={articleRead(locale, a)}
      authorSlug={a.author}
      sections={sections}
      faqs={faqs}
      relatedTitle={t(locale, 'Related articles', 'مقالات ذات صلة')}
      relatedCards={related.map((r) => <ArticleCard key={r.slug} a={r} locale={locale} />)}
    />
  );
}
