'use client';

import { useState } from 'react';
import { t, type Locale } from '@/lib/i18n';

export default function SignalsForm({ locale }: { locale: Locale }) {
  const [done, setDone] = useState(false);
  if (done) {
    return (
      <div style={{ background: 'rgba(22,163,74,.07)', border: '1px solid rgba(22,163,74,.25)', borderRadius: '16px', padding: '30px', textAlign: 'center' }}>
        <div style={{ fontSize: '34px', marginBottom: '10px' }}>✓</div>
        <div className="keep-serif" style={{ fontFamily: "'Newsreader',serif", fontSize: '22px', color: '#0E1416', marginBottom: '6px' }}>{t(locale, 'You’re on the list', 'أنت مُسجَّل الآن')}</div>
        <p style={{ fontSize: '14px', color: '#5A6670', margin: 0, lineHeight: 1.55 }}>{t(locale, 'Check your inbox for the Telegram invite link.', 'تحقّق من بريدك للحصول على رابط دعوة تيليجرام.')}</p>
      </div>
    );
  }
  return (
    <form onSubmit={(e) => { e.preventDefault(); setDone(true); }} style={{ background: '#0E1416', color: '#fff', borderRadius: '16px', padding: '28px' }}>
      <div style={{ width: '46px', height: '46px', borderRadius: '12px', background: '#16A34A', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px', marginBottom: '16px' }}>✈</div>
      <div style={{ fontSize: '18px', fontWeight: 700, marginBottom: '6px' }}>{t(locale, 'Join free on Telegram', 'انضم مجانًا على تيليجرام')}</div>
      <p style={{ fontSize: '13px', color: '#9BA4AA', margin: '0 0 20px', lineHeight: 1.5 }}>{t(locale, 'Get every signal the moment it’s published. Cancel anytime.', 'احصل على كل توصية لحظة نشرها. ألغِ في أي وقت.')}</p>
      <input required type="email" placeholder={t(locale, 'Email address', 'البريد الإلكتروني')} style={{ width: '100%', background: 'rgba(255,255,255,.06)', border: '1px solid rgba(255,255,255,.16)', borderRadius: '9px', padding: '13px 15px', fontSize: '14px', color: '#fff', outline: 'none', marginBottom: '12px' }} />
      <button type="submit" style={{ width: '100%', background: '#16A34A', color: '#fff', border: 'none', borderRadius: '10px', padding: '14px', fontSize: '15px', fontWeight: 600, cursor: 'pointer', marginBottom: '10px' }}>{t(locale, 'Get free signals', 'احصل على التوصيات المجانية')}</button>
      <button type="submit" style={{ width: '100%', background: 'rgba(255,255,255,.10)', color: '#fff', border: '1px solid rgba(255,255,255,.2)', borderRadius: '10px', padding: '13px', fontSize: '14px', fontWeight: 600, cursor: 'pointer' }}>{t(locale, 'Join via WhatsApp', 'انضم عبر واتساب')}</button>
    </form>
  );
}
