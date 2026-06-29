import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { t, type Locale } from '@/lib/i18n';
import { Wrap } from '@/components/ui';
import { PageHead } from '@/components/blocks';
import SearchPanel from '@/components/SearchPanel';

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const locale = params.locale as Locale;
  return { title: t(locale, 'Search', 'بحث'), robots: { index: false }, alternates: { canonical: `/${locale}/search` } };
}

export default function SearchPage({ params, searchParams }: { params: { locale: string }; searchParams: { q?: string } }) {
  const locale = params.locale as Locale;
  setRequestLocale(locale);
  const q = typeof searchParams.q === 'string' ? searchParams.q : '';
  return (
    <div>
      <PageHead
        locale={locale}
        crumbs={[{ label: t(locale, 'Home', 'الرئيسية'), to: 'home' }, { label: t(locale, 'Search', 'بحث') }]}
        eyebrow={t(locale, 'SEARCH', 'بحث')}
        title={t(locale, 'Search Amana', 'ابحث في أمانة')}
      />
      <section style={{ padding: '40px 0 80px' }}>
        <Wrap><SearchPanel locale={locale} initialQuery={q} /></Wrap>
      </section>
    </div>
  );
}
