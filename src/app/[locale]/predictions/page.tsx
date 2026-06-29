import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { t, type Locale } from '@/lib/i18n';
import { predictions } from '@/data/predictions';
import { Wrap, PredCard } from '@/components/ui';
import { PageHead } from '@/components/blocks';

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const locale = params.locale as Locale;
  return {
    title: t(locale, 'Market predictions & forecasts', 'توقعات وتحليلات الأسواق'),
    description: t(locale, 'Data-driven outlooks on FX, gold, crypto and commodities.', 'نظرات قائمة على البيانات للفوركس والذهب والعملات والسلع.'),
    alternates: { canonical: `/${locale}/predictions` },
  };
}

export default function PredictionsPage({ params }: { params: { locale: string } }) {
  const locale = params.locale as Locale;
  setRequestLocale(locale);
  return (
    <div>
      <PageHead
        locale={locale}
        crumbs={[{ label: t(locale, 'Home', 'الرئيسية'), to: 'home' }, { label: t(locale, 'Predictions', 'التوقعات') }]}
        eyebrow={t(locale, 'MARKET OUTLOOK', 'نظرة على السوق')}
        title={t(locale, 'Predictions & forecasts', 'التوقعات والتحليلات')}
        sub={t(locale, 'Data-driven outlooks on FX, gold, crypto and commodities from the Amana research desk. Analysis, not investment advice.', 'نظرات قائمة على البيانات للفوركس والذهب والعملات والسلع من مكتب أبحاث أمانة. تحليل وليس نصيحة استثمارية.')}
      />
      <section style={{ padding: '40px 0 70px' }}>
        <Wrap>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '22px' }}>
            {predictions(locale).map((p) => <PredCard key={p.slug} p={p} locale={locale} />)}
          </div>
        </Wrap>
      </section>
    </div>
  );
}
