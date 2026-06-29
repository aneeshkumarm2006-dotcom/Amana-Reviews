import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { t, type Locale } from '@/lib/i18n';
import { Wrap } from '@/components/ui';
import { PageHead, H2 } from '@/components/blocks';
import ContactForm from '@/components/ContactForm';

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const locale = params.locale as Locale;
  return {
    title: t(locale, 'Contact & report a scam', 'تواصل والإبلاغ عن احتيال'),
    description: t(locale, 'Questions about a broker, a correction, or a fraud to report.', 'أسئلة عن وسيط، أو تصحيح، أو احتيال للإبلاغ عنه.'),
    alternates: { canonical: `/${locale}/contact` },
  };
}

export default function ContactPage({ params }: { params: { locale: string } }) {
  const locale = params.locale as Locale;
  setRequestLocale(locale);

  const steps = [
    t(locale, 'Stop all payments and pay no "recovery" fees.', 'أوقف كل المدفوعات ولا تدفع أي رسوم «استرداد».'),
    t(locale, 'Save every screenshot, transfer and message.', 'احفظ كل لقطة شاشة وتحويل ورسالة.'),
    t(locale, 'Contact your bank for a possible chargeback.', 'تواصل مع بنكك لاحتمال استرداد المبلغ.'),
    t(locale, 'Report to the regulator and local cybercrime unit.', 'أبلغ الجهة المنظِّمة ووحدة الجرائم الإلكترونية المحلية.'),
    t(locale, 'Send us the details using the form — we may publish a warning.', 'أرسل لنا التفاصيل عبر النموذج — قد ننشر تحذيرًا.'),
  ];
  const contacts: [string, string][] = [
    [t(locale, 'Email', 'البريد'), 'hello@amana.example'],
    [t(locale, 'WhatsApp', 'واتساب'), '+971 4 000 0000'],
    [t(locale, 'Legal entity', 'الكيان القانوني'), t(locale, 'Amana Research FZ-LLC, Dubai (DIFC)', 'أمانة للأبحاث FZ-LLC، دبي (DIFC)')],
    [t(locale, 'Hours', 'ساعات العمل'), t(locale, 'Sun–Fri, 9:00–18:00 GST', 'الأحد–الجمعة، 9:00–18:00 بتوقيت الخليج')],
  ];

  return (
    <div>
      <PageHead
        locale={locale}
        dark
        crumbs={[{ label: t(locale, 'Home', 'الرئيسية'), to: 'home' }, { label: t(locale, 'Contact', 'تواصل') }]}
        eyebrow={t(locale, 'GET IN TOUCH', 'تواصل معنا')}
        title={t(locale, 'Contact & report a scam', 'تواصل والإبلاغ عن احتيال')}
        sub={t(locale, 'Questions about a broker, a correction to a review, or a fraud to report — our team reads every message.', 'أسئلة عن وسيط، أو تصحيح لمراجعة، أو احتيال للإبلاغ عنه — يقرأ فريقنا كل رسالة.')}
      />
      <section style={{ padding: '44px 0 70px' }}>
        <Wrap>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '48px', alignItems: 'start' }}>
            <div>
              <H2>{t(locale, 'If you’ve been scammed', 'إذا تعرّضت للاحتيال')}</H2>
              <ol style={{ margin: '0 0 30px', paddingInlineStart: '20px', fontSize: '15.5px', lineHeight: 1.9, color: '#33414B' }}>
                {steps.map((s, i) => <li key={i}>{s}</li>)}
              </ol>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                {contacts.map((c) => (
                  <div key={c[0]} style={{ display: 'flex', justifyContent: 'space-between', gap: '12px', padding: '13px 0', borderBottom: '1px solid rgba(14,20,22,.08)' }}>
                    <span style={{ fontSize: '13.5px', color: '#5A6670', fontWeight: 600 }}>{c[0]}</span>
                    <span style={{ fontSize: '14px', color: '#0E1416', fontWeight: 600 }}>{c[1]}</span>
                  </div>
                ))}
              </div>
              <a href="#" className="am-btn" style={{ display: 'inline-flex', alignItems: 'center', gap: '9px', marginTop: '22px', background: '#16A34A', color: '#fff', borderRadius: '10px', padding: '14px 24px', fontSize: '14.5px', fontWeight: 600 }}>
                <span>✆</span>{t(locale, 'Chat with us on WhatsApp', 'تحدّث معنا على واتساب')}
              </a>
            </div>
            <ContactForm locale={locale} />
          </div>
        </Wrap>
      </section>
    </div>
  );
}
