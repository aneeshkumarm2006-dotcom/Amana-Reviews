import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { t, type Locale } from '@/lib/i18n';
import { SIGNALS } from '@/data/predictions';
import { Wrap } from '@/components/ui';
import { PageHead } from '@/components/blocks';
import SignalsForm from '@/components/SignalsForm';

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const locale = params.locale as Locale;
  return {
    title: t(locale, 'Free trading signals (FX, gold, crypto)', 'توصيات تداول مجانية (فوركس، ذهب، عملات)'),
    description: t(locale, 'Daily FX, gold and crypto signals with entry, target and stop levels.', 'توصيات يومية للفوركس والذهب والعملات بنقاط دخول وهدف ووقف.'),
    alternates: { canonical: `/${locale}/services/signals` },
  };
}

export default function SignalsPage({ params }: { params: { locale: string } }) {
  const locale = params.locale as Locale;
  setRequestLocale(locale);
  const stats: [string, string][] = [
    [t(locale, 'Win rate', 'نسبة الربح'), '78%'],
    [t(locale, 'Signals / week', 'توصيات / أسبوع'), '25+'],
    [t(locale, 'Avg R:R', 'متوسط المخاطرة:العائد'), '1 : 2.3'],
  ];

  return (
    <div>
      <PageHead
        locale={locale}
        dark
        crumbs={[{ label: t(locale, 'Home', 'الرئيسية'), to: 'home' }, { label: t(locale, 'Services', 'الخدمات') }, { label: t(locale, 'Free signals', 'توصيات مجانية') }]}
        eyebrow={t(locale, 'SERVICE · SIGNALS', 'خدمة · التوصيات')}
        title={t(locale, 'Free trading signals', 'توصيات تداول مجانية')}
        sub={t(locale, 'FX, gold and crypto trade ideas with clear entry, target and stop levels — published by our analysts and free to join on Telegram.', 'أفكار تداول للفوركس والذهب والعملات بنقاط دخول وهدف ووقف واضحة — ينشرها محلّلونا والانضمام مجاني على تيليجرام.')}
      />
      <section style={{ padding: '40px 0 70px' }}>
        <Wrap>
          <div style={{ display: 'grid', gridTemplateColumns: '1.4fr .9fr', gap: '40px', alignItems: 'start' }}>
            <div>
              <div style={{ display: 'flex', gap: '14px', marginBottom: '22px', flexWrap: 'wrap' }}>
                {stats.map((s) => (
                  <div key={s[0]} style={{ flex: '1 1 120px', background: '#fff', border: '1px solid rgba(14,20,22,.10)', borderRadius: '12px', padding: '16px 18px' }}>
                    <div style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: '26px', fontWeight: 600, color: '#16A34A' }}>{s[1]}</div>
                    <div style={{ fontSize: '12.5px', color: '#5A6670', marginTop: '2px' }}>{s[0]}</div>
                  </div>
                ))}
              </div>
              <div style={{ border: '1px solid rgba(14,20,22,.10)', borderRadius: '14px', overflow: 'hidden' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 18px', background: '#FBFAF7', borderBottom: '1px solid rgba(14,20,22,.10)' }}>
                  <span style={{ fontSize: '13px', fontWeight: 700, color: '#0E1416' }}>{t(locale, 'Live signals', 'توصيات مباشرة')}</span>
                  <span style={{ fontSize: '11px', fontWeight: 600, color: '#16A34A', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#16A34A', animation: 'amPulse 2s infinite' }} />
                    {t(locale, 'STREAMING', 'بثّ مباشر')}
                  </span>
                </div>
                {SIGNALS.map((s, i) => (
                  <div key={i} style={{ display: 'grid', gridTemplateColumns: '56px 1fr repeat(3,auto)', gap: '14px', alignItems: 'center', padding: '15px 18px', borderBottom: i < SIGNALS.length - 1 ? '1px solid rgba(14,20,22,.07)' : 'none' }}>
                    <span style={{ fontSize: '11px', fontWeight: 700, textAlign: 'center', padding: '5px 0', borderRadius: '5px', background: s.dir === 'BUY' ? 'rgba(22,163,74,.12)' : 'rgba(192,57,43,.10)', color: s.dir === 'BUY' ? '#0E7A43' : '#C0392B' }}>{s.dir}</span>
                    <span style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: '15px', fontWeight: 600, color: '#0E1416' }}>{s.pair}</span>
                    <span style={{ fontSize: '12px', color: '#5A6670', fontFamily: "'IBM Plex Mono',monospace" }}>{t(locale, 'Entry ', 'دخول ')}<strong style={{ color: '#1A2227' }}>{s.entry}</strong></span>
                    <span style={{ fontSize: '12px', color: '#5A6670', fontFamily: "'IBM Plex Mono',monospace" }}>TP <strong style={{ color: '#0E7A43' }}>{s.tp}</strong></span>
                    <span style={{ fontSize: '11px', fontWeight: 600, color: s.status === 'Active' ? '#16A34A' : '#9BA4AA', textAlign: 'end' }}>{s.status === 'Active' ? t(locale, 'Active', 'نشط') : t(locale, 'Hit TP', 'تحقّق الهدف')}</span>
                  </div>
                ))}
              </div>
              <p style={{ fontSize: '12px', color: '#9BA4AA', marginTop: '14px', lineHeight: 1.5 }}>{t(locale, 'Signals are educational and not investment advice. Past performance does not guarantee future results.', 'التوصيات تعليمية وليست نصيحة استثمارية. الأداء السابق لا يضمن النتائج المستقبلية.')}</p>
            </div>
            <SignalsForm locale={locale} />
          </div>
        </Wrap>
      </section>
    </div>
  );
}
