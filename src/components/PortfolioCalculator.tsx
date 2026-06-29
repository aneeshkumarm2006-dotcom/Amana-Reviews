'use client';

import { useState } from 'react';
import { t, type Locale } from '@/lib/i18n';

const RATES: Record<string, number> = { conservative: 0.012, balanced: 0.025, growth: 0.045 };

export default function PortfolioCalculator({ locale }: { locale: Locale }) {
  const [portfolio, setPortfolio] = useState(25000);
  const [strategy, setStrategy] = useState<'conservative' | 'balanced' | 'growth'>('balanced');
  const [leadDone, setLeadDone] = useState(false);

  const r = RATES[strategy];
  const monthly = portfolio * r;
  const future = portfolio * Math.pow(1 + r, 12);
  const profit = future - portfolio;
  const fmt = (n: number) => '$' + Math.round(n).toLocaleString('en-US');

  const strat: [string, string, string][] = [
    ['conservative', t(locale, 'Conservative', 'محافظ'), '~1.2% / mo'],
    ['balanced', t(locale, 'Balanced', 'متوازن'), '~2.5% / mo'],
    ['growth', t(locale, 'Growth', 'نمو'), '~4.5% / mo'],
  ];
  const outputs: [string, string, string][] = [
    [t(locale, 'Est. monthly profit', 'الربح الشهري المقدّر'), fmt(monthly), '#16A34A'],
    [t(locale, 'Projected value (12 mo)', 'القيمة المتوقعة (12 شهرًا)'), fmt(future), '#0E1416'],
    [t(locale, 'Total profit (12 mo)', 'إجمالي الربح (12 شهرًا)'), fmt(profit), '#0E1416'],
  ];

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1.25fr .9fr', gap: '40px', alignItems: 'start' }}>
      {/* CALCULATOR */}
      <div style={{ background: '#fff', border: '1px solid rgba(14,20,22,.10)', borderRadius: '16px', padding: '28px' }}>
        <div style={{ fontSize: '16px', fontWeight: 700, color: '#0E1416', marginBottom: '22px' }}>{t(locale, 'Return calculator', 'حاسبة العوائد')}</div>
        <div style={{ marginBottom: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '10px' }}>
            <span style={{ fontSize: '13.5px', color: '#5A6670', fontWeight: 600 }}>{t(locale, 'Portfolio size', 'حجم المحفظة')}</span>
            <span style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: '22px', fontWeight: 600, color: '#0E1416' }}>{fmt(portfolio)}</span>
          </div>
          <input type="range" min={5000} max={250000} step={5000} value={portfolio} onChange={(e) => setPortfolio(+e.target.value)} style={{ width: '100%', accentColor: '#16A34A', cursor: 'pointer' }} />
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#9BA4AA', fontFamily: "'IBM Plex Mono',monospace", marginTop: '4px' }}>
            <span>$5k</span><span>$250k</span>
          </div>
        </div>
        <div style={{ marginBottom: '26px' }}>
          <div style={{ fontSize: '13.5px', color: '#5A6670', fontWeight: 600, marginBottom: '10px' }}>{t(locale, 'Strategy', 'الاستراتيجية')}</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px' }}>
            {strat.map((s) => (
              <button key={s[0]} onClick={() => setStrategy(s[0] as any)} style={{ textAlign: 'start', background: strategy === s[0] ? 'rgba(22,163,74,.08)' : '#fff', border: '1.5px solid ' + (strategy === s[0] ? '#16A34A' : 'rgba(14,20,22,.14)'), borderRadius: '10px', padding: '13px', cursor: 'pointer' }}>
                <div style={{ fontSize: '14px', fontWeight: 700, color: strategy === s[0] ? '#0E7A43' : '#1A2227' }}>{s[1]}</div>
                <div style={{ fontSize: '11.5px', color: '#5A6670', fontFamily: "'IBM Plex Mono',monospace", marginTop: '3px' }}>{s[2]}</div>
              </button>
            ))}
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px', marginBottom: '18px' }}>
          {outputs.map((o) => (
            <div key={o[0]} style={{ background: '#FBFAF7', borderRadius: '12px', padding: '16px' }}>
              <div style={{ fontSize: '11.5px', color: '#5A6670', marginBottom: '6px', lineHeight: 1.3 }}>{o[0]}</div>
              <div style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: '21px', fontWeight: 600, color: o[2] }}>{o[1]}</div>
            </div>
          ))}
        </div>
        <div style={{ fontSize: '11.5px', color: '#9BA4AA', lineHeight: 1.5 }}>{t(locale, 'Illustrative only. Figures assume a constant monthly return compounded over 12 months and are not a forecast or guarantee. Trading carries substantial risk of loss.', 'لأغراض التوضيح فقط. تفترض الأرقام عائدًا شهريًا ثابتًا مُركَّبًا على 12 شهرًا، وليست توقعًا أو ضمانًا. ينطوي التداول على مخاطر خسارة كبيرة.')}</div>
      </div>

      {/* LEAD FORM */}
      {leadDone ? (
        <div style={{ background: 'rgba(22,163,74,.07)', border: '1px solid rgba(22,163,74,.25)', borderRadius: '16px', padding: '30px', textAlign: 'center' }}>
          <div style={{ fontSize: '34px', marginBottom: '10px' }}>✓</div>
          <div className="keep-serif" style={{ fontFamily: "'Newsreader',serif", fontSize: '23px', color: '#0E1416', marginBottom: '6px' }}>{t(locale, 'Request received', 'تم استلام الطلب')}</div>
          <p style={{ fontSize: '14px', color: '#5A6670', lineHeight: 1.55, margin: 0 }}>{t(locale, 'A licensed advisor will contact you within one business day. No obligation.', 'سيتواصل معك مستشار مرخّص خلال يوم عمل واحد. دون أي التزام.')}</p>
        </div>
      ) : (
        <form onSubmit={(e) => { e.preventDefault(); setLeadDone(true); }} style={{ background: '#0E1416', color: '#fff', borderRadius: '16px', padding: '28px' }}>
          <div style={{ fontSize: '17px', fontWeight: 700, marginBottom: '6px' }}>{t(locale, 'Request a free consultation', 'اطلب استشارة مجانية')}</div>
          <p style={{ fontSize: '13px', color: '#9BA4AA', margin: '0 0 20px', lineHeight: 1.5 }}>{t(locale, 'Speak with a licensed advisor about a managed portfolio. No obligation.', 'تحدّث مع مستشار مرخّص عن محفظة مُدارة. دون أي التزام.')}</p>
          {([[t(locale, 'Full name', 'الاسم الكامل'), 'text'], [t(locale, 'Email address', 'البريد الإلكتروني'), 'email'], [t(locale, 'Mobile (with country code)', 'الجوال (مع رمز الدولة)'), 'tel']] as [string, string][]).map((f) => (
            <input key={f[0]} required type={f[1]} placeholder={f[0]} style={{ width: '100%', background: 'rgba(255,255,255,.06)', border: '1px solid rgba(255,255,255,.16)', borderRadius: '9px', padding: '13px 15px', fontSize: '14px', color: '#fff', outline: 'none', marginBottom: '12px' }} />
          ))}
          <label style={{ display: 'flex', gap: '9px', alignItems: 'flex-start', fontSize: '12px', color: '#9BA4AA', lineHeight: 1.5, margin: '4px 0 18px', cursor: 'pointer' }}>
            <input required type="checkbox" style={{ marginTop: '2px' }} />
            {t(locale, 'I consent to being contacted and accept the privacy policy.', 'أوافق على التواصل معي وأقبل سياسة الخصوصية.')}
          </label>
          <button type="submit" style={{ width: '100%', background: '#16A34A', color: '#fff', border: 'none', borderRadius: '10px', padding: '14px', fontSize: '15px', fontWeight: 600, cursor: 'pointer' }}>{t(locale, 'Request consultation', 'اطلب الاستشارة')}</button>
        </form>
      )}
    </div>
  );
}
