'use client';

import { useState } from 'react';
import { t, type Locale } from '@/lib/i18n';

export default function ContactForm({ locale }: { locale: Locale }) {
  const [done, setDone] = useState(false);
  if (done) {
    return (
      <div style={{ background: 'rgba(22,163,74,.07)', border: '1px solid rgba(22,163,74,.25)', borderRadius: '16px', padding: '34px', textAlign: 'center' }}>
        <div style={{ fontSize: '34px', marginBottom: '10px' }}>✓</div>
        <div className="keep-serif" style={{ fontFamily: "'Newsreader',serif", fontSize: '23px', color: '#0E1416', marginBottom: '6px' }}>{t(locale, 'Message sent', 'تم إرسال الرسالة')}</div>
        <p style={{ fontSize: '14px', color: '#5A6670', margin: 0, lineHeight: 1.55 }}>{t(locale, 'Thank you. Our team will respond within one business day.', 'شكرًا لك. سيردّ فريقنا خلال يوم عمل واحد.')}</p>
      </div>
    );
  }
  const fields: [string, string][] = [
    [t(locale, 'Your name', 'اسمك'), 'text'],
    [t(locale, 'Email', 'البريد الإلكتروني'), 'email'],
    [t(locale, 'Broker / company (if reporting)', 'الوسيط / الشركة (عند الإبلاغ)'), 'text'],
  ];
  return (
    <form onSubmit={(e) => { e.preventDefault(); setDone(true); }} style={{ background: '#fff', border: '1px solid rgba(14,20,22,.10)', borderRadius: '16px', padding: '28px' }}>
      <div style={{ fontSize: '17px', fontWeight: 700, color: '#0E1416', marginBottom: '18px' }}>{t(locale, 'Send a message', 'أرسل رسالة')}</div>
      {fields.map((f) => (
        <input key={f[0]} required={f[1] !== 'text' || f[0] === fields[0][0]} type={f[1]} placeholder={f[0]} style={{ width: '100%', border: '1px solid rgba(14,20,22,.16)', borderRadius: '9px', padding: '13px 15px', fontSize: '14px', outline: 'none', marginBottom: '12px' }} />
      ))}
      <textarea required placeholder={t(locale, 'How can we help?', 'كيف يمكننا مساعدتك؟')} rows={4} style={{ width: '100%', border: '1px solid rgba(14,20,22,.16)', borderRadius: '9px', padding: '13px 15px', fontSize: '14px', outline: 'none', resize: 'vertical', marginBottom: '12px', fontFamily: 'inherit' }} />
      <label style={{ display: 'flex', gap: '9px', alignItems: 'flex-start', fontSize: '12.5px', color: '#5A6670', lineHeight: 1.5, marginBottom: '18px', cursor: 'pointer' }}>
        <input required type="checkbox" style={{ marginTop: '2px' }} />
        {t(locale, 'I consent to Amana storing this information to respond to my enquiry.', 'أوافق على احتفاظ أمانة بهذه المعلومات للرد على استفساري.')}
      </label>
      <button type="submit" style={{ width: '100%', background: '#0E1416', color: '#fff', border: 'none', borderRadius: '10px', padding: '14px', fontSize: '15px', fontWeight: 600, cursor: 'pointer' }}>{t(locale, 'Send message', 'إرسال الرسالة')}</button>
    </form>
  );
}
