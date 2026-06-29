import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import { href, type RouteName } from '@/lib/routes';
import { t, type Locale } from '@/lib/i18n';
import { COUNTRIES, CATEGORIES, countryName } from '@/data/taxonomy';
import { Wrap } from '@/components/ui';
import { PageHead } from '@/components/blocks';

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const locale = params.locale as Locale;
  return { title: t(locale, 'Sitemap', 'خريطة الموقع'), alternates: { canonical: `/${locale}/sitemap` } };
}

interface SLink { label: string; to: RouteName; param?: string }

export default function SitemapPage({ params }: { params: { locale: string } }) {
  const locale = params.locale as Locale;
  setRequestLocale(locale);

  const groups: [string, SLink[]][] = [
    [t(locale, 'Platform', 'المنصة'), [
      { label: t(locale, 'Home', 'الرئيسية'), to: 'home' },
      { label: t(locale, 'All broker reviews', 'جميع مراجعات الوسطاء'), to: 'reviews' },
      { label: t(locale, 'Scam alerts', 'تحذيرات الاحتيال'), to: 'scam-alerts' },
      { label: t(locale, 'Scam Detector', 'كاشف الاحتيال'), to: 'detector' },
      { label: t(locale, 'Methodology', 'المنهجية'), to: 'principles' },
      { label: t(locale, 'Our team', 'فريقنا'), to: 'authors' },
      { label: t(locale, 'Contact', 'تواصل'), to: 'contact' },
    ]],
    [t(locale, 'Best brokers by country', 'أفضل الوسطاء حسب الدولة'), COUNTRIES.slice(0, 10).map((c) => ({ label: t(locale, 'Best brokers in ' + c[1], 'أفضل الوسطاء في ' + c[2]), to: 'best-country' as RouteName, param: c[0] }))],
    [t(locale, 'Best brokers by category', 'أفضل الوسطاء حسب الفئة'), CATEGORIES.slice(0, 10).map((c) => ({ label: locale === 'ar' ? c[2] : c[1], to: 'best-category' as RouteName, param: c[0] }))],
    [t(locale, 'Learn', 'تعلّم'), [
      { label: t(locale, 'Articles', 'المقالات'), to: 'articles' },
      { label: t(locale, 'Predictions', 'التوقعات'), to: 'predictions' },
      { label: t(locale, 'Portfolio management', 'إدارة المحافظ'), to: 'portfolio' },
      { label: t(locale, 'Free signals', 'توصيات مجانية'), to: 'signals' },
    ]],
  ];

  return (
    <div>
      <PageHead
        locale={locale}
        crumbs={[{ label: t(locale, 'Home', 'الرئيسية'), to: 'home' }, { label: t(locale, 'Sitemap', 'خريطة الموقع') }]}
        eyebrow={t(locale, 'INDEX', 'فهرس')}
        title={t(locale, 'Sitemap', 'خريطة الموقع')}
        sub={t(locale, 'Every section of Amana, in one place.', 'كل أقسام أمانة في مكان واحد.')}
      />
      <section style={{ padding: '40px 0 70px' }}>
        <Wrap>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '36px' }}>
            {groups.map((g) => (
              <div key={g[0]}>
                <div style={{ fontSize: '12px', letterSpacing: '.12em', color: '#5A6670', fontWeight: 700, marginBottom: '12px' }}>{g[0].toUpperCase()}</div>
                {g[1].map((l, i) => (
                  <Link key={i} href={href(l.to, l.param)} className="am-link" style={{ display: 'block', fontSize: '14px', color: '#1A2227', padding: '7px 0' }}>{l.label}</Link>
                ))}
              </div>
            ))}
          </div>
        </Wrap>
      </section>
    </div>
  );
}
