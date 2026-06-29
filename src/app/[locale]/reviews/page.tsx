import { setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';
import { t, type Locale } from '@/lib/i18n';
import { brokers } from '@/data/brokers';
import { Wrap } from '@/components/ui';
import { PageHead } from '@/components/blocks';
import ReviewsExplorer from '@/components/ReviewsExplorer';

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const locale = params.locale as Locale;
  return {
    title: t(locale, 'All broker reviews (2026)', 'جميع مراجعات الوسطاء (2026)'),
    description: t(locale, 'Every broker independently scored 0–5 against our published methodology.', 'كل وسيط مُقيَّم بشكل مستقل من 0 إلى 5 وفق منهجيتنا المنشورة.'),
    alternates: { canonical: `/${locale}/reviews` },
  };
}

export default function ReviewsPage({ params }: { params: { locale: string } }) {
  const locale = params.locale as Locale;
  setRequestLocale(locale);
  const list = brokers(locale);

  return (
    <div>
      <PageHead
        locale={locale}
        crumbs={[{ label: t(locale, 'Home', 'الرئيسية'), to: 'home' }, { label: t(locale, 'Broker reviews', 'مراجعات الوسطاء') }]}
        eyebrow={t(locale, 'THE RATINGS', 'التصنيفات')}
        title={t(locale, 'All broker reviews', 'جميع مراجعات الوسطاء')}
        sub={t(locale, 'Every broker below is independently scored 0–5 against our published methodology. We open a live account and test a full withdrawal before publishing.', 'كل وسيط أدناه مُقيَّم بشكل مستقل من 0 إلى 5 وفق منهجيتنا المنشورة. نفتح حسابًا حقيقيًا ونختبر دورة سحب كاملة قبل النشر.')}
      />
      <section style={{ padding: '28px 0 70px' }}>
        <Wrap>
          <ReviewsExplorer list={list} locale={locale} />
        </Wrap>
      </section>
    </div>
  );
}
