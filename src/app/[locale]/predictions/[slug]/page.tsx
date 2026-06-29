import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { t, type Locale } from '@/lib/i18n';
import { routing } from '@/i18n/routing';
import { PREDICTIONS, predictionBySlug, predictions, predTitle, predExcerpt, predName, predBias, predDate } from '@/data/predictions';
import { PredCard } from '@/components/ui';
import ArticleScaffold from '@/components/ArticleScaffold';

export function generateStaticParams() {
  return routing.locales.flatMap((locale) => PREDICTIONS.map((p) => ({ locale, slug: p.slug })));
}

export async function generateMetadata({ params }: { params: { locale: string; slug: string } }): Promise<Metadata> {
  const locale = params.locale as Locale;
  const p = predictionBySlug(params.slug);
  return { title: predTitle(locale, p), description: predExcerpt(locale, p), alternates: { canonical: `/${locale}/predictions/${p.slug}` } };
}

export default function PredictionPage({ params }: { params: { locale: string; slug: string } }) {
  const locale = params.locale as Locale;
  setRequestLocale(locale);
  const p = predictionBySlug(params.slug);
  const name = predName(locale, p);
  const bias = predBias(locale, p);
  const excerpt = predExcerpt(locale, p);

  const sections: [string, string[]][] = [
    [t(locale, 'Our view in brief', 'رأينا باختصار'), [
      t(locale, `We hold a ${bias.toLowerCase()} bias on ${name} (${p.ticker}) into year-end, with a working target around ${p.target}. ${excerpt}`, `نتبنّى نظرة ${bias} تجاه ${name} (${p.ticker}) حتى نهاية العام، بهدف عملي حول ${p.target}. ${excerpt}`),
    ]],
    [t(locale, 'What’s driving the move', 'ما الذي يحرّك الاتجاه'), [
      t(locale, 'The dominant macro driver remains the path of interest rates and the relative strength of the US dollar. Positioning data and recent flows reinforce the case, though headline risk around central-bank communication keeps near-term volatility elevated.', 'يبقى المحرّك الكلي المهيمن هو مسار أسعار الفائدة والقوة النسبية للدولار الأمريكي. وتعزّز بيانات المراكز والتدفقات الأخيرة هذه الرؤية، رغم أن مخاطر تصريحات البنوك المركزية تبقي التقلّب قصير المدى مرتفعًا.'),
      t(locale, 'We expect the prevailing trend to persist while price holds key structural levels; a decisive break would force a reassessment.', 'نتوقّع استمرار الاتجاه السائد ما دام السعر يحافظ على المستويات البنيوية الرئيسية؛ وأي كسر حاسم سيفرض إعادة تقييم.'),
    ]],
    [t(locale, 'Levels to watch', 'مستويات يجب مراقبتها'), [
      t(locale, 'On the upside, reclaiming the recent swing high opens the door to our target. On the downside, a close below near-term support would neutralise the setup and shift our bias to neutral.', 'صعودًا، استعادة القمة الأخيرة تفتح الباب نحو هدفنا. وهبوطًا، إغلاق دون الدعم القريب سيُحيّد الإعداد ويحوّل نظرتنا إلى محايدة.'),
    ]],
    [t(locale, 'How to trade it responsibly', 'كيف تتداوله بمسؤولية'), [
      t(locale, 'Size positions so that a single losing trade costs no more than 1% of your account. Use a stop-loss, and never add to a losing position. Forecasts are probabilities, not certainties.', 'حدّد أحجام صفقاتك بحيث لا تكلّف الصفقة الخاسرة الواحدة أكثر من 1% من حسابك. استخدم وقف الخسارة، ولا تزِد أبدًا على صفقة خاسرة. التوقعات احتمالات وليست يقينًا.'),
    ]],
  ];
  const faqs: [string, string][] = [
    [t(locale, 'Is this investment advice?', 'هل هذه نصيحة استثمارية؟'), t(locale, 'No. Our forecasts are educational market analysis. Always do your own research and consider your risk tolerance.', 'لا. توقعاتنا تحليل سوقي تعليمي. قم دائمًا ببحثك الخاص وراعِ قدرتك على تحمّل المخاطر.')],
    [t(locale, 'How often is this updated?', 'كم مرة يُحدَّث هذا؟'), t(locale, 'We revisit each major forecast monthly, or sooner if there’s a significant market event.', 'نراجع كل توقّع رئيسي شهريًا، أو أسرع إن وقع حدث سوقي مهم.')],
    [t(locale, `Which broker is best for trading ${name}?`, `أي وسيط أفضل لتداول ${name}؟`), t(locale, `Any of our top-rated regulated brokers offer ${name}. See our ratings for the lowest spreads.`, `أي من وسطائنا المرخّصين الأعلى تقييمًا يوفّر ${name}. راجع تصنيفاتنا لأدنى سبريد.`)],
  ];

  const related = predictions(locale).filter((x) => x.slug !== p.slug).slice(0, 3);

  return (
    <ArticleScaffold
      locale={locale}
      crumbs={[{ label: t(locale, 'Home', 'الرئيسية'), to: 'home' }, { label: t(locale, 'Predictions', 'التوقعات'), to: 'predictions' }, { label: p.ticker }]}
      tag={t(locale, p.ticker + ' forecast', 'توقع ' + p.ticker)}
      title={predTitle(locale, p)}
      date={predDate(locale, p)}
      read={t(locale, '6 min', '6 دقائق')}
      authorSlug="layla-haddad"
      sections={sections}
      faqs={faqs}
      relatedTitle={t(locale, 'More predictions', 'المزيد من التوقعات')}
      relatedCards={related.map((r) => <PredCard key={r.slug} p={r} locale={locale} />)}
    />
  );
}
