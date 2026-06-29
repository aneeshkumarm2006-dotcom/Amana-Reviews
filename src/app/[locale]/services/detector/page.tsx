import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import { href } from '@/lib/routes';
import { t, type Locale } from '@/lib/i18n';
import { Wrap } from '@/components/ui';
import { PageHead, H2 } from '@/components/blocks';
import DetectorTool from '@/components/DetectorTool';

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const locale = params.locale as Locale;
  return {
    title: t(locale, 'Scam Detector — check any broker', 'كاشف الاحتيال — افحص أي وسيط'),
    description: t(locale, 'Check any broker name against our scam database and licensed-broker list.', 'افحص أي اسم وسيط في قاعدة بيانات الاحتيال وقائمة الوسطاء المرخّصين.'),
    alternates: { canonical: `/${locale}/services/detector` },
  };
}

export default function DetectorPage({ params }: { params: { locale: string } }) {
  const locale = params.locale as Locale;
  setRequestLocale(locale);

  const signs: [string, string][] = [
    [t(locale, 'Guaranteed returns', 'عوائد مضمونة'), t(locale, 'No legitimate broker promises fixed or guaranteed profits.', 'لا يَعِد أي وسيط شرعي بأرباح ثابتة أو مضمونة.')],
    [t(locale, 'Pressure to deposit', 'ضغط للإيداع'), t(locale, 'Urgency, bonuses and "limited offers" are classic manipulation.', 'الاستعجال والمكافآت و«العروض المحدودة» تلاعب كلاسيكي.')],
    [t(locale, 'No verifiable license', 'لا ترخيص يمكن التحقق منه'), t(locale, 'If you can’t find them on a regulator’s register, walk away.', 'إن لم تجدهم في سجل جهة منظِّمة، فابتعد.')],
    [t(locale, 'Withdrawal problems', 'مشاكل في السحب'), t(locale, 'Blocked or endlessly delayed withdrawals are the #1 red flag.', 'حجب السحوبات أو تأخيرها بلا نهاية هو العلامة الأخطر.')],
    [t(locale, 'Cold contact', 'تواصل غير مطلوب'), t(locale, 'Unsolicited calls, DMs or WhatsApp messages about trading.', 'مكالمات أو رسائل واتساب غير مطلوبة عن التداول.')],
    [t(locale, 'Recovery scams', 'احتيال الاسترداد'), t(locale, 'Anyone asking for a fee to "recover" lost funds is scamming you.', 'كل من يطلب رسومًا لـ«استرداد» أموالك المفقودة يحتال عليك.')],
  ];
  const regs: [string, string, string][] = [
    ['FCA', t(locale, 'United Kingdom', 'المملكة المتحدة'), t(locale, '£85,000 FSCS compensation', 'تعويض FSCS حتى 85,000£')],
    ['CySEC', t(locale, 'Cyprus / EU', 'قبرص / الاتحاد الأوروبي'), t(locale, '€20,000 ICF compensation', 'تعويض ICF حتى 20,000€')],
    ['DFSA', t(locale, 'Dubai (DIFC)', 'دبي (DIFC)'), t(locale, 'Segregated client funds', 'فصل أموال العملاء')],
    ['SCA', t(locale, 'United Arab Emirates', 'الإمارات العربية المتحدة'), t(locale, 'Local UAE oversight', 'رقابة إماراتية محلية')],
  ];
  const steps = [
    t(locale, 'Stop all payments immediately and do not pay any "recovery" or "tax" fees.', 'أوقف كل المدفوعات فورًا ولا تدفع أي رسوم «استرداد» أو «ضرائب».'),
    t(locale, 'Document everything — screenshots, transfers, names and contact details.', 'وثّق كل شيء — لقطات الشاشة والتحويلات والأسماء وبيانات الاتصال.'),
    t(locale, 'Report to your bank and request a chargeback if you paid by card.', 'أبلغ بنكك واطلب استرداد المبلغ إن دفعت بالبطاقة.'),
    t(locale, 'File a complaint with the relevant regulator (FCA, CySEC, DFSA or SCA).', 'قدّم شكوى للجهة المنظِّمة المعنية (FCA أو CySEC أو DFSA أو SCA).'),
    t(locale, 'Report to local police / cybercrime unit.', 'أبلغ الشرطة المحلية / وحدة الجرائم الإلكترونية.'),
  ];

  return (
    <div>
      <PageHead
        locale={locale}
        dark
        crumbs={[{ label: t(locale, 'Home', 'الرئيسية'), to: 'home' }, { label: t(locale, 'Scam Detector', 'كاشف الاحتيال') }]}
        eyebrow={t(locale, 'FREE TOOL', 'أداة مجانية')}
        title={t(locale, 'Scam Detector', 'كاشف الاحتيال')}
        sub={t(locale, 'Type any broker or "investment" company name. We’ll check it against our scam database and our list of licensed, reviewed brokers.', 'اكتب اسم أي وسيط أو شركة «استثمار». سنفحصه في قاعدة بيانات الاحتيال وقائمة الوسطاء المرخّصين المُراجَعين.')}
      />
      <section style={{ padding: '40px 0 24px' }}>
        <Wrap>
          <DetectorTool locale={locale} />
        </Wrap>
      </section>
      <section style={{ padding: '24px 0 70px' }}>
        <Wrap>
          <div style={{ margin: '30px 0 44px' }}>
            <H2>{t(locale, 'Warning signs of a broker scam', 'علامات احتيال الوسطاء')}</H2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '14px' }}>
              {signs.map((s) => (
                <div key={s[0]} style={{ background: '#fff', border: '1px solid rgba(14,20,22,.10)', borderRadius: '12px', padding: '18px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '7px' }}>
                    <span style={{ color: '#C0392B', fontSize: '16px' }}>⚠</span>
                    <span style={{ fontSize: '15px', fontWeight: 700, color: '#0E1416' }}>{s[0]}</span>
                  </div>
                  <p style={{ margin: 0, fontSize: '13.5px', lineHeight: 1.5, color: '#5A6670' }}>{s[1]}</p>
                </div>
              ))}
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px', alignItems: 'start' }}>
            <div>
              <H2>{t(locale, 'Recognised regulators', 'جهات تنظيمية معترف بها')}</H2>
              <div style={{ border: '1px solid rgba(14,20,22,.10)', borderRadius: '12px', overflow: 'hidden' }}>
                {regs.map((rg, i) => (
                  <div key={rg[0]} style={{ display: 'grid', gridTemplateColumns: '70px 1fr', gap: '12px', padding: '14px 16px', background: i % 2 ? '#FBFAF7' : '#fff', borderBottom: i < regs.length - 1 ? '1px solid rgba(14,20,22,.07)' : 'none' }}>
                    <span style={{ fontWeight: 700, fontSize: '14px', color: '#0E1416' }}>{rg[0]}</span>
                    <span>
                      <span style={{ display: 'block', fontSize: '13.5px', color: '#1A2227' }}>{rg[1]}</span>
                      <span style={{ display: 'block', fontSize: '12px', color: '#5A6670' }}>{rg[2]}</span>
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <H2>{t(locale, 'If you’ve already been scammed', 'إذا تعرّضت للاحتيال بالفعل')}</H2>
              <ol style={{ margin: 0, paddingInlineStart: '20px', fontSize: '14.5px', lineHeight: 1.9, color: '#42505A' }}>
                {steps.map((s, i) => <li key={i}>{s}</li>)}
              </ol>
              <Link href={href('contact')} className="am-btn" style={{ display: 'inline-block', marginTop: '18px', background: '#0E1416', color: '#fff', borderRadius: '9px', padding: '13px 22px', fontSize: '14px', fontWeight: 600 }}>{t(locale, 'Report a scam to our team →', 'أبلغ فريقنا عن احتيال →')}</Link>
            </div>
          </div>
        </Wrap>
      </section>
    </div>
  );
}
