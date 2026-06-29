import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import { href } from '@/lib/routes';
import { t, type Locale } from '@/lib/i18n';
import { scams, scamWhy, scamVerdict, scamCountry } from '@/data/scams';
import { Wrap } from '@/components/ui';
import { PageHead } from '@/components/blocks';

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const locale = params.locale as Locale;
  return {
    title: t(locale, 'Scam alerts & broker blacklist (2026)', 'تحذيرات الاحتيال والقائمة السوداء (2026)'),
    description: t(locale, 'Brokers and platforms flagged as fraudulent or high-risk by our analysts.', 'وسطاء ومنصات صنّفها محلّلونا كاحتيالية أو عالية الخطورة.'),
    alternates: { canonical: `/${locale}/scam-alerts` },
  };
}

export default function ScamAlertsPage({ params }: { params: { locale: string } }) {
  const locale = params.locale as Locale;
  setRequestLocale(locale);
  return (
    <div>
      <PageHead
        locale={locale}
        dark
        crumbs={[{ label: t(locale, 'Home', 'الرئيسية'), to: 'home' }, { label: t(locale, 'Scam alerts', 'تحذيرات الاحتيال') }]}
        eyebrow={t(locale, 'SCAM INTELLIGENCE', 'رصد الاحتيال')}
        title={t(locale, 'Scam alerts & blacklist', 'تحذيرات الاحتيال والقائمة السوداء')}
        sub={t(locale, 'Brokers and "investment" platforms our analysts have flagged as fraudulent or high-risk. Updated continuously. All names shown are illustrative.', 'وسطاء ومنصات «استثمار» صنّفها محلّلونا كاحتيالية أو عالية الخطورة. تُحدَّث باستمرار. كل الأسماء المعروضة توضيحية.')}
      />
      <section style={{ padding: '40px 0 70px' }}>
        <Wrap>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {scams(locale).map((s) => {
              const confirmed = s.verdict === 'Confirmed scam';
              return (
                <Link key={s.slug} href={href('scam-alert', s.slug)} style={{ display: 'flex', gap: '18px', alignItems: 'flex-start', background: '#fff', border: '1px solid rgba(14,20,22,.10)', borderInlineStart: '4px solid ' + (confirmed ? '#C0392B' : '#C8860D'), borderRadius: '12px', padding: '22px' }}>
                  <span style={{ width: '46px', height: '46px', borderRadius: '10px', background: confirmed ? 'rgba(192,57,43,.10)' : 'rgba(200,134,13,.12)', color: confirmed ? '#C0392B' : '#C8860D', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px', fontWeight: 700, flex: 'none' }}>⚠</span>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap', marginBottom: '5px' }}>
                      <h3 className="keep-serif" style={{ fontFamily: "'Newsreader',serif", fontWeight: 600, fontSize: '21px', margin: 0, color: '#0E1416' }}>{s.name}</h3>
                      <span style={{ fontSize: '11px', fontWeight: 700, color: confirmed ? '#C0392B' : '#C8860D', background: confirmed ? 'rgba(192,57,43,.10)' : 'rgba(200,134,13,.12)', padding: '4px 10px', borderRadius: '5px' }}>{scamVerdict(locale, s).toUpperCase()}</span>
                      <span style={{ fontSize: '12.5px', color: '#9BA4AA' }}>{scamCountry(locale, s)}</span>
                    </div>
                    <p style={{ margin: 0, fontSize: '14.5px', lineHeight: 1.55, color: '#42505A' }}>{scamWhy(locale, s)}</p>
                  </div>
                  <span style={{ color: '#9BA4AA', fontSize: '18px', flex: 'none' }}>→</span>
                </Link>
              );
            })}
          </div>
        </Wrap>
      </section>
    </div>
  );
}
