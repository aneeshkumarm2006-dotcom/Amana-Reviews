'use client';

import { useState } from 'react';
import { Link } from '@/i18n/routing';
import { href } from '@/lib/routes';
import { t, type Locale } from '@/lib/i18n';
import { brokers } from '@/data/brokers';
import { scams, scamWhy } from '@/data/scams';

type ResultType = 'scam' | 'risk' | 'licensed' | 'unknown';
interface Result { type: ResultType; data?: any; q?: string }

export default function DetectorTool({ locale }: { locale: Locale }) {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState<Result | null>(null);

  const run = (raw?: string) => {
    const q = (raw ?? query).trim().toLowerCase();
    if (!q) { setResult(null); return; }
    const scam = scams(locale).find((s) => s.name.toLowerCase().includes(q) || q.includes(s.name.toLowerCase()));
    const lic = brokers(locale).find((b) => b.name.toLowerCase().includes(q) || q.includes(b.name.toLowerCase()));
    if (scam) setResult({ type: 'scam', data: scam });
    else if (lic) setResult({ type: lic.regs[0] === 'none' ? 'risk' : 'licensed', data: lic });
    else setResult({ type: 'unknown', q: raw ?? query });
  };

  const conf: Record<ResultType, { bg: string; bd: string; ic: string; label: string }> = {
    scam: { bg: '#FBE9E7', bd: '#C0392B', ic: '⚠', label: t(locale, 'Known scam — do not deposit', 'احتيال معروف — لا تُودِع') },
    risk: { bg: '#FDF3E2', bd: '#C8860D', ic: '!', label: t(locale, 'High risk — proceed with caution', 'مخاطر عالية — توخَّ الحذر') },
    licensed: { bg: '#E7F6EC', bd: '#16A34A', ic: '✓', label: t(locale, 'Licensed & independently reviewed', 'مرخّص ومُراجَع بشكل مستقل') },
    unknown: { bg: '#F0F1F2', bd: '#5A6670', ic: '?', label: t(locale, 'Not yet in our database', 'غير موجود في قاعدتنا بعد') },
  };

  const r = result;
  const c = r ? conf[r.type] : null;

  return (
    <div style={{ maxWidth: '820px', margin: '0 auto' }}>
      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => { if (e.key === 'Enter') run(); }}
          placeholder={t(locale, 'e.g. FXVantix, NorthCap Markets, CrownBit…', 'مثال: FXVantix أو NorthCap Markets أو CrownBit…')}
          style={{ flex: '1 1 320px', border: '1.5px solid rgba(14,20,22,.18)', borderRadius: '10px', padding: '15px 18px', fontSize: '16px', outline: 'none' }}
        />
        <button onClick={() => run()} style={{ background: '#0E1416', color: '#fff', border: 'none', borderRadius: '10px', padding: '15px 28px', fontSize: '15px', fontWeight: 600, cursor: 'pointer' }}>{t(locale, 'Check broker', 'افحص الوسيط')}</button>
      </div>
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '12px' }}>
        {['FXVantix', 'NorthCap Markets', 'CrownBit Trade', 'Equiti Prime'].map((q) => (
          <button key={q} onClick={() => { setQuery(q); run(q); }} style={{ background: '#fff', border: '1px solid rgba(14,20,22,.14)', borderRadius: '100px', padding: '7px 14px', fontSize: '12.5px', color: '#5A6670', cursor: 'pointer' }}>{t(locale, 'Try “', 'جرّب “') + q + '”'}</button>
        ))}
      </div>

      {r && c && (
        <div style={{ marginTop: '24px', background: c.bg, border: '1.5px solid ' + c.bd, borderRadius: '14px', padding: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '12px' }}>
            <span style={{ width: '44px', height: '44px', borderRadius: '50%', background: c.bd, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px', fontWeight: 700, flex: 'none' }}>{c.ic}</span>
            <div>
              <div style={{ fontSize: '13px', fontWeight: 700, letterSpacing: '.04em', color: c.bd }}>{c.label.toUpperCase()}</div>
              <div className="keep-serif" style={{ fontFamily: "'Newsreader',serif", fontSize: '23px', color: '#0E1416' }}>{r.type === 'unknown' ? '“' + r.q + '”' : r.data.name}</div>
            </div>
          </div>
          {r.type === 'scam' && (
            <div>
              <p style={{ fontSize: '15px', lineHeight: 1.6, color: '#42505A', margin: '0 0 14px' }}>{scamWhy(locale, r.data)}</p>
              <Link href={href('scam-alert', r.data.slug)} style={{ display: 'inline-block', background: '#C0392B', color: '#fff', borderRadius: '8px', padding: '11px 18px', fontSize: '14px', fontWeight: 600 }}>{t(locale, 'Read the full scam alert →', 'اقرأ تحذير الاحتيال كاملًا →')}</Link>
            </div>
          )}
          {r.type === 'licensed' && (
            <div>
              <p style={{ fontSize: '15px', lineHeight: 1.6, color: '#42505A', margin: '0 0 14px' }}>{t(locale, `This is a legitimate, regulated broker in our database with a score of ${r.data.scoreStr}/5, regulated by ${r.data.regsFull.join(', ')}.`, `هذا وسيط شرعي ومرخّص في قاعدتنا بتقييم ${r.data.scoreStr}/5، مرخّص من ${r.data.regsFull.join('، ')}.`)}</p>
              <Link href={href('review', r.data.slug)} style={{ display: 'inline-block', background: '#16A34A', color: '#fff', borderRadius: '8px', padding: '11px 18px', fontSize: '14px', fontWeight: 600 }}>{t(locale, 'Read our review →', 'اقرأ مراجعتنا →')}</Link>
            </div>
          )}
          {r.type === 'risk' && (
            <div>
              <p style={{ fontSize: '15px', lineHeight: 1.6, color: '#42505A', margin: '0 0 14px' }}>{t(locale, 'This broker is in our database but holds only offshore regulation, which offers weak protection. Size positions carefully.', 'هذا الوسيط في قاعدتنا لكنه يحمل تنظيمًا خارجيًا فقط، وهو يوفّر حماية ضعيفة. حدّد أحجام صفقاتك بحذر.')}</p>
              <Link href={href('review', r.data.slug)} style={{ display: 'inline-block', background: '#C8860D', color: '#fff', borderRadius: '8px', padding: '11px 18px', fontSize: '14px', fontWeight: 600 }}>{t(locale, 'Read our review →', 'اقرأ مراجعتنا →')}</Link>
            </div>
          )}
          {r.type === 'unknown' && (
            <p style={{ fontSize: '15px', lineHeight: 1.6, color: '#42505A', margin: 0 }}>{t(locale, 'We have no record of this name yet. That alone isn’t proof it’s safe — verify it against a regulator’s public register before depositing, and check the warning signs below.', 'لا يوجد لدينا سجل لهذا الاسم بعد. هذا وحده ليس دليلًا على أنه آمن — تحقّق منه عبر السجل العام لجهة منظِّمة قبل الإيداع، وراجع علامات التحذير أدناه.')}</p>
          )}
        </div>
      )}
    </div>
  );
}
