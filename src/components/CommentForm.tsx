'use client';

import { useState } from 'react';
import { t, type Locale } from '@/lib/i18n';

function Stars({ n, size = 14 }: { n: number; size?: number }) {
  return (
    <span style={{ display: 'inline-flex', gap: '1px' }}>
      {[1, 2, 3, 4, 5].map((i) => (
        <span key={i} style={{ color: i <= n ? '#16A34A' : '#D5D8D5', fontSize: size + 'px' }}>★</span>
      ))}
    </span>
  );
}

export default function CommentForm({ locale }: { locale: Locale }) {
  const [rating, setRating] = useState(0);
  const [done, setDone] = useState(false);

  const sample: [string, number, string, string][] = [
    ['Faisal M.', 5, t(locale, 'Opened an account after reading this. Withdrawal hit my bank the next day — exactly as described.', 'فتحت حسابًا بعد قراءة هذا. وصل السحب إلى بنكي في اليوم التالي — تمامًا كما ورد.'), t(locale, '2 weeks ago', 'قبل أسبوعين')],
    ['Nadia K.', 4, t(locale, 'Solid, balanced review. I wish the app section went a little deeper on charting tools.', 'مراجعة متوازنة وجيدة. أتمنى لو تعمّق قسم التطبيق أكثر في أدوات الرسوم البيانية.'), t(locale, '1 month ago', 'قبل شهر')],
  ];

  const inputStyle = { width: '100%', border: '1px solid rgba(14,20,22,.16)', borderRadius: '8px', padding: '11px 13px', fontSize: '14px', outline: 'none' } as const;

  return (
    <div style={{ margin: '8px 0 0' }}>
      <h2 className="keep-serif" style={{ fontFamily: "'Newsreader',serif", fontWeight: 500, fontSize: '27px', letterSpacing: '-.01em', margin: '0 0 16px', color: '#0E1416' }}>{t(locale, 'Reviews from traders', 'مراجعات من المتداولين')}</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '28px' }}>
        {sample.map((c, i) => (
          <div key={i} style={{ background: '#fff', border: '1px solid rgba(14,20,22,.08)', borderRadius: '12px', padding: '18px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '11px', marginBottom: '10px' }}>
              <span style={{ width: '38px', height: '38px', borderRadius: '50%', background: '#0E1416', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px', fontWeight: 600 }}>{c[0][0]}</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '14px', fontWeight: 600, color: '#0E1416' }}>{c[0]}</div>
                <Stars n={c[1]} size={13} />
              </div>
              <span style={{ fontSize: '12px', color: '#9BA4AA' }}>{c[3]}</span>
            </div>
            <p style={{ margin: 0, fontSize: '14.5px', lineHeight: 1.6, color: '#42505A' }}>{c[2]}</p>
          </div>
        ))}
      </div>

      {done ? (
        <div style={{ background: 'rgba(22,163,74,.07)', border: '1px solid rgba(22,163,74,.25)', borderRadius: '14px', padding: '26px', textAlign: 'center' }}>
          <div style={{ fontSize: '30px', marginBottom: '8px' }}>✓</div>
          <div className="keep-serif" style={{ fontFamily: "'Newsreader',serif", fontSize: '21px', color: '#0E1416', marginBottom: '4px' }}>{t(locale, 'Thank you for your review', 'شكرًا على مراجعتك')}</div>
          <div style={{ fontSize: '14px', color: '#5A6670' }}>{t(locale, 'It will appear here once our team has verified it.', 'ستظهر هنا بعد أن يتحقق منها فريقنا.')}</div>
        </div>
      ) : (
        <form
          onSubmit={(e) => { e.preventDefault(); setDone(true); }}
          style={{ background: '#fff', border: '1px solid rgba(14,20,22,.10)', borderRadius: '14px', padding: '24px' }}
        >
          <div style={{ fontSize: '16px', fontWeight: 700, color: '#0E1416', marginBottom: '16px' }}>{t(locale, 'Leave your review', 'اترك مراجعتك')}</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
            <span style={{ fontSize: '13.5px', color: '#5A6670', fontWeight: 600 }}>{t(locale, 'Your rating', 'تقييمك')}</span>
            <span style={{ display: 'inline-flex', gap: '2px' }}>
              {[1, 2, 3, 4, 5].map((i) => (
                <button key={i} type="button" onClick={() => setRating(i)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, fontSize: '22px', color: i <= rating ? '#16A34A' : '#D5D8D5' }}>★</button>
              ))}
            </span>
          </div>
          <textarea required placeholder={t(locale, 'Share your experience with this broker…', 'شارك تجربتك مع هذا الوسيط…')} rows={3} style={{ width: '100%', border: '1px solid rgba(14,20,22,.16)', borderRadius: '8px', padding: '12px 13px', fontSize: '14px', outline: 'none', resize: 'vertical', marginBottom: '12px', fontFamily: 'inherit' }} />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '12px' }}>
            <input required placeholder={t(locale, 'Name', 'الاسم')} style={inputStyle} />
            <input required type="email" placeholder={t(locale, 'Email (not published)', 'البريد (لا يُنشر)')} style={inputStyle} />
          </div>
          <label style={{ display: 'flex', alignItems: 'flex-start', gap: '9px', fontSize: '12.5px', color: '#5A6670', lineHeight: 1.5, marginBottom: '16px', cursor: 'pointer' }}>
            <input required type="checkbox" style={{ marginTop: '2px' }} />
            {t(locale, 'I agree to the publication of my review and accept the privacy policy.', 'أوافق على نشر مراجعتي وأقبل سياسة الخصوصية.')}
          </label>
          <button type="submit" style={{ background: '#0E1416', color: '#fff', border: 'none', borderRadius: '9px', padding: '13px 24px', fontSize: '14px', fontWeight: 600, cursor: 'pointer' }}>{t(locale, 'Submit review', 'إرسال المراجعة')}</button>
        </form>
      )}
    </div>
  );
}
