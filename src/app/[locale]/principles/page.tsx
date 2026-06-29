import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { t, type Locale } from '@/lib/i18n';
import { Wrap } from '@/components/ui';
import { PageHead, H2 } from '@/components/blocks';
import Faq from '@/components/Faq';

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const locale = params.locale as Locale;
  return {
    title: t(locale, 'Methodology & principles', 'المنهجية والمبادئ'),
    description: t(locale, 'How we score brokers, why you can trust the result, and where our money comes from.', 'كيف نقيّم الوسطاء، ولماذا يمكنك الوثوق بالنتيجة، ومن أين يأتي دخلنا.'),
    alternates: { canonical: `/${locale}/principles` },
  };
}

export default function PrinciplesPage({ params }: { params: { locale: string } }) {
  const locale = params.locale as Locale;
  setRequestLocale(locale);

  const weights: [string, string, string][] = [
    [t(locale, 'Security & regulation', 'الأمان والتنظيم'), '28%', t(locale, 'License verification, fund segregation, negative-balance protection', 'التحقق من الترخيص، وفصل الأموال، وحماية الرصيد السلبي')],
    [t(locale, 'Commissions & spreads', 'العمولات والسبريد'), '22%', t(locale, 'All-in cost of trading across account types', 'التكلفة الإجمالية للتداول عبر أنواع الحسابات')],
    [t(locale, 'Deposits & withdrawals', 'الإيداع والسحب'), '16%', t(locale, 'Speed, fees and reliability in live testing', 'السرعة والرسوم والموثوقية في الاختبار الحقيقي')],
    [t(locale, 'Platforms & app', 'المنصات والتطبيق'), '14%', t(locale, 'Stability, speed, charting and mobile experience', 'الاستقرار والسرعة والرسوم البيانية وتجربة الجوال')],
    [t(locale, 'Financial instruments', 'الأدوات المالية'), '12%', t(locale, 'Breadth and quality of tradable markets', 'اتساع وجودة الأسواق القابلة للتداول')],
    [t(locale, 'Support & education', 'الدعم والتعليم'), '8%', t(locale, 'Responsiveness and quality of help', 'سرعة الاستجابة وجودة المساعدة')],
  ];
  const values: [string, string][] = [
    [t(locale, 'Independence', 'الاستقلالية'), t(locale, 'Editorial scores are set before any commercial discussion and never sold.', 'تُحدَّد التقييمات التحريرية قبل أي نقاش تجاري ولا تُباع أبدًا.')],
    [t(locale, 'Transparency', 'الشفافية'), t(locale, 'We publish our methodology, cite our sources and disclose every affiliate link.', 'ننشر منهجيتنا، ونوثّق مصادرنا، ونفصح عن كل رابط إعلاني.')],
    [t(locale, 'Evidence', 'الدليل'), t(locale, 'We open live accounts and test real deposits and withdrawals — no desk research alone.', 'نفتح حسابات حقيقية ونختبر إيداعات وسحوبات فعلية — لا بحث مكتبي فقط.')],
    [t(locale, 'Protection', 'الحماية'), t(locale, 'When a broker is unsafe, saying so clearly matters more than any commission.', 'حين يكون الوسيط غير آمن، فقول ذلك بوضوح أهم من أي عمولة.')],
  ];
  const faqs: [string, string][] = [
    [t(locale, 'Do brokers pay to be ranked higher?', 'هل يدفع الوسطاء مقابل ترتيب أعلى؟'), t(locale, 'No. Rankings are determined solely by our scoring methodology. Commercial relationships never affect a score, and we disclose them on every page.', 'لا. تتحدّد الترتيبات حصريًا بمنهجية تقييمنا. ولا تؤثر العلاقات التجارية أبدًا على التقييم، ونفصح عنها في كل صفحة.')],
    [t(locale, 'How often are ratings updated?', 'كم مرة تُحدَّث التقييمات؟'), t(locale, 'Brokers are re-reviewed at least annually, and immediately if there’s a regulatory action or significant change.', 'تُعاد مراجعة الوسطاء سنويًا على الأقل، وفورًا عند أي إجراء تنظيمي أو تغيير مهم.')],
    [t(locale, 'How do you make money?', 'كيف تحقّقون الدخل؟'), t(locale, 'We earn affiliate commissions when readers open accounts through some of our links, at no extra cost to the reader. This is clearly disclosed.', 'نحصل على عمولات إحالة عندما يفتح القرّاء حسابات عبر بعض روابطنا، دون تكلفة إضافية على القارئ. وهذا مُفصح عنه بوضوح.')],
  ];

  return (
    <div>
      <PageHead
        locale={locale}
        dark
        crumbs={[{ label: t(locale, 'Home', 'الرئيسية'), to: 'home' }, { label: t(locale, 'Methodology', 'المنهجية') }]}
        eyebrow={t(locale, 'HOW WE WORK', 'كيف نعمل')}
        title={t(locale, 'Methodology & principles', 'المنهجية والمبادئ')}
        sub={t(locale, 'How we score brokers, why you can trust the result, and exactly where our money comes from.', 'كيف نقيّم الوسطاء، ولماذا يمكنك الوثوق بالنتيجة، ومن أين يأتي دخلنا بالضبط.')}
      />
      <section style={{ padding: '44px 0 70px' }}>
        <Wrap>
          <div style={{ maxWidth: '860px' }}>
            <H2>{t(locale, 'Our scoring weights', 'أوزان تقييمنا')}</H2>
            <p style={{ fontSize: '16px', lineHeight: 1.7, color: '#42505A', margin: '0 0 22px' }}>{t(locale, 'Each broker earns a score from 0 to 5, built from six weighted pillars. Regulation carries the most weight because it’s what protects your money.', 'يحصل كل وسيط على تقييم من 0 إلى 5، مبني على ست ركائز موزونة. ويحمل التنظيم الوزن الأكبر لأنه ما يحمي أموالك.')}</p>
            <div style={{ border: '1px solid rgba(14,20,22,.10)', borderRadius: '14px', overflow: 'hidden', marginBottom: '44px' }}>
              {weights.map((w, i) => (
                <div key={w[0]} style={{ display: 'grid', gridTemplateColumns: '1fr 70px', gap: '16px', alignItems: 'center', padding: '18px', background: i % 2 ? '#FBFAF7' : '#fff', borderBottom: i < weights.length - 1 ? '1px solid rgba(14,20,22,.07)' : 'none' }}>
                  <div>
                    <div style={{ fontSize: '15px', fontWeight: 700, color: '#0E1416', marginBottom: '3px' }}>{w[0]}</div>
                    <div style={{ fontSize: '13px', color: '#5A6670' }}>{w[2]}</div>
                  </div>
                  <div style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: '22px', fontWeight: 600, color: '#16A34A', textAlign: 'end' }}>{w[1]}</div>
                </div>
              ))}
            </div>
            <H2>{t(locale, 'What we stand for', 'ما نؤمن به')}</H2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '44px' }}>
              {values.map((v) => (
                <div key={v[0]} style={{ background: '#fff', border: '1px solid rgba(14,20,22,.10)', borderRadius: '12px', padding: '22px' }}>
                  <div className="keep-serif" style={{ fontFamily: "'Newsreader',serif", fontSize: '21px', color: '#0E1416', marginBottom: '8px' }}>{v[0]}</div>
                  <p style={{ margin: 0, fontSize: '14px', lineHeight: 1.6, color: '#42505A' }}>{v[1]}</p>
                </div>
              ))}
            </div>
            <Faq faqs={faqs} locale={locale} />
          </div>
        </Wrap>
      </section>
    </div>
  );
}
