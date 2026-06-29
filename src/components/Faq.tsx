'use client';

import { useState } from 'react';
import { t, type Locale } from '@/lib/i18n';
import JsonLd, { faqJsonLd } from './JsonLd';

export default function Faq({
  faqs,
  locale,
  title,
}: {
  faqs: [string, string][];
  locale: Locale;
  title?: string;
}) {
  const [open, setOpen] = useState(0);
  return (
    <div style={{ margin: '8px 0 44px' }}>
      <JsonLd data={faqJsonLd(faqs)} />
      <h2 className="keep-serif" style={{ fontFamily: "'Newsreader',serif", fontWeight: 500, fontSize: '27px', letterSpacing: '-.01em', margin: '0 0 16px', color: '#0E1416' }}>
        {title || t(locale, 'Frequently asked questions', 'الأسئلة الشائعة')}
      </h2>
      <div style={{ border: '1px solid rgba(14,20,22,.10)', borderRadius: '12px', overflow: 'hidden' }}>
        {faqs.map((f, i) => (
          <div key={i} style={{ borderBottom: i < faqs.length - 1 ? '1px solid rgba(14,20,22,.07)' : 'none' }}>
            <button onClick={() => setOpen((o) => (o === i ? -1 : i))} style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px', padding: '16px 18px', background: open === i ? '#FBFAF7' : '#fff', border: 'none', cursor: 'pointer', textAlign: 'start' }}>
              <span style={{ fontSize: '15px', fontWeight: 600, color: '#0E1416' }}>{f[0]}</span>
              <span style={{ fontSize: '20px', color: '#16A34A', transform: open === i ? 'rotate(45deg)' : 'none', transition: 'transform .2s', flex: 'none' }}>+</span>
            </button>
            {open === i && <div style={{ padding: '0 18px 18px', fontSize: '14.5px', lineHeight: 1.6, color: '#42505A' }}>{f[1]}</div>}
          </div>
        ))}
      </div>
    </div>
  );
}
