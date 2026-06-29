import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { t, type Locale } from '@/lib/i18n';
import { Wrap } from '@/components/ui';
import { PageHead, H2 } from '@/components/blocks';
import PortfolioCalculator from '@/components/PortfolioCalculator';

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const locale = params.locale as Locale;
  return {
    title: t(locale, 'Portfolio management & return calculator', 'إدارة المحافظ وحاسبة العوائد'),
    description: t(locale, 'Estimate managed-portfolio returns, compare PAMM/MAM, and request a consultation.', 'قدّر عوائد المحفظة المُدارة، قارن PAMM/MAM، واطلب استشارة.'),
    alternates: { canonical: `/${locale}/services/portfolio` },
  };
}

export default function PortfolioPage({ params }: { params: { locale: string } }) {
  const locale = params.locale as Locale;
  setRequestLocale(locale);

  const pamm: [string, string, string, string][] = [
    [t(locale, 'Managed (PAMM)', 'مُدار (PAMM)'), t(locale, 'Manager trades a pooled account; you share profits pro-rata.', 'يتداول المدير حسابًا مجمّعًا؛ وتتقاسم الأرباح تناسبيًا.'), t(locale, 'Hands-off', 'دون تدخّل'), t(locale, 'Performance fee', 'رسوم أداء')],
    ['MAM', t(locale, 'Manager allocates across linked accounts with custom risk.', 'يوزّع المدير عبر حسابات مرتبطة بمخاطر مخصّصة.'), t(locale, 'Flexible', 'مرن'), t(locale, 'Performance fee', 'رسوم أداء')],
    [t(locale, 'Self-directed', 'ذاتي الإدارة'), t(locale, 'You trade your own account using our signals & research.', 'تتداول حسابك بنفسك باستخدام توصياتنا وأبحاثنا.'), t(locale, 'Full control', 'تحكّم كامل'), t(locale, 'Spread only', 'سبريد فقط')],
  ];
  const headers = [t(locale, 'Structure', 'البنية'), t(locale, 'How it works', 'كيف تعمل'), t(locale, 'Control', 'التحكّم'), t(locale, 'Fees', 'الرسوم')];

  return (
    <div>
      <PageHead
        locale={locale}
        dark
        crumbs={[{ label: t(locale, 'Home', 'الرئيسية'), to: 'home' }, { label: t(locale, 'Services', 'الخدمات') }, { label: t(locale, 'Portfolio management', 'إدارة المحافظ') }]}
        eyebrow={t(locale, 'SERVICE · PORTFOLIO', 'خدمة · المحافظ')}
        title={t(locale, 'Portfolio management', 'إدارة المحافظ')}
        sub={t(locale, 'Estimate what a professionally managed portfolio could return, compare PAMM and MAM structures, and request a no-obligation consultation.', 'قدّر عائد محفظة مُدارة باحتراف، وقارن بين بنيتَي PAMM وMAM، واطلب استشارة دون التزام.')}
      />
      <section style={{ padding: '40px 0 30px' }}>
        <Wrap><PortfolioCalculator locale={locale} /></Wrap>
      </section>
      <section style={{ padding: '20px 0 70px' }}>
        <Wrap>
          <H2>{t(locale, 'PAMM vs MAM vs self-directed', 'PAMM مقابل MAM مقابل الإدارة الذاتية')}</H2>
          <div style={{ overflowX: 'auto', border: '1px solid rgba(14,20,22,.10)', borderRadius: '14px' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '620px' }}>
              <thead>
                <tr style={{ background: '#FBFAF7' }}>
                  {headers.map((th) => <th key={th} style={{ textAlign: 'start', padding: '13px 16px', fontSize: '11px', letterSpacing: '.08em', color: '#5A6670', fontWeight: 700, borderBottom: '1px solid rgba(14,20,22,.12)' }}>{th}</th>)}
                </tr>
              </thead>
              <tbody>
                {pamm.map((p, i) => (
                  <tr key={p[0]} style={{ background: i % 2 ? '#fff' : 'rgba(251,250,247,.5)' }}>
                    <td style={{ padding: '15px 16px', fontSize: '14px', fontWeight: 700, color: '#0E1416', borderBottom: '1px solid rgba(14,20,22,.07)' }}>{p[0]}</td>
                    <td style={{ padding: '15px 16px', fontSize: '13.5px', color: '#42505A', borderBottom: '1px solid rgba(14,20,22,.07)' }}>{p[1]}</td>
                    <td style={{ padding: '15px 16px', fontSize: '13.5px', color: '#42505A', borderBottom: '1px solid rgba(14,20,22,.07)' }}>{p[2]}</td>
                    <td style={{ padding: '15px 16px', fontSize: '13.5px', color: '#42505A', borderBottom: '1px solid rgba(14,20,22,.07)' }}>{p[3]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Wrap>
      </section>
    </div>
  );
}
