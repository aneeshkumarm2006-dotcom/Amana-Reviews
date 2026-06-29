import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import { href } from '@/lib/routes';
import { t, type Locale } from '@/lib/i18n';
import { routing } from '@/i18n/routing';
import { SCAMS, scamBySlug, scams, scamWhy, scamVerdict, scamCountry, scamFlags } from '@/data/scams';
import { Wrap, Crumb } from '@/components/ui';
import { H2, Byline } from '@/components/blocks';
import Faq from '@/components/Faq';

export function generateStaticParams() {
  return routing.locales.flatMap((locale) => SCAMS.map((s) => ({ locale, slug: s.slug })));
}

export async function generateMetadata({ params }: { params: { locale: string; slug: string } }): Promise<Metadata> {
  const locale = params.locale as Locale;
  const s = scamBySlug(params.slug);
  return {
    title: t(locale, `${s.name}: scam warning (2026)`, `${s.name}: تحذير من الاحتيال (2026)`),
    description: scamWhy(locale, s),
    alternates: { canonical: `/${locale}/scam-alerts/${s.slug}` },
  };
}

export default function ScamAlertPage({ params }: { params: { locale: string; slug: string } }) {
  const locale = params.locale as Locale;
  setRequestLocale(locale);
  const s = scamBySlug(params.slug);
  const why = scamWhy(locale, s);
  const verdict = scamVerdict(locale, s);
  const country = scamCountry(locale, s);
  const related = scams(locale).filter((x) => x.slug !== s.slug).slice(0, 3);

  const secs: [string, string][] = [
    [t(locale, `Why we don’t recommend ${s.name}`, `لماذا لا نوصي بـ${s.name}`), t(locale, `${why} Our team could not verify any legitimate license, and multiple trader reports describe the same pattern of blocked withdrawals.`, `${why} لم يتمكن فريقنا من التحقق من أي ترخيص شرعي، وتصف بلاغات متعددة من المتداولين النمط نفسه من حجب السحوبات.`)],
    [t(locale, `Is ${s.name} licensed?`, `هل ${s.name} مرخّص؟`), t(locale, `No. We checked the FCA, CySEC, DFSA and SCA public registers and found no authorisation for ${s.name}. Any regulatory badges shown on its website are fabricated.`, `لا. تحققنا من سجلات FCA وCySEC وDFSA وSCA العامة ولم نجد أي ترخيص لـ${s.name}. وأي شارات تنظيمية على موقعه مفبركة.`)],
    [t(locale, 'How it lures victims', 'كيف يستدرج الضحايا'), t(locale, `${s.name} typically reaches people through unsolicited messages and social-media ads promising high, "guaranteed" returns. After an initial small "profit", victims are pressured to deposit far more — then withdrawals are frozen.`, `${s.name} يصل إلى الناس عادةً عبر رسائل غير مرغوبة وإعلانات تعد بعوائد «مضمونة» مرتفعة. بعد «ربح» مبدئي صغير، يُضغط على الضحايا لإيداع المزيد — ثم تُجمَّد السحوبات.`)],
    [t(locale, 'How to protect yourself', 'كيف تحمي نفسك'), t(locale, 'Never deposit with an unregulated broker. Verify every license number on the regulator’s own website, ignore guaranteed-return promises, and use our Scam Detector before funding any account.', 'لا تُودِع أبدًا لدى وسيط غير مرخّص. تحقّق من كل رقم ترخيص على موقع الجهة المنظِّمة نفسه، وتجاهل وعود العوائد المضمونة، واستخدم كاشف الاحتيال قبل تمويل أي حساب.')],
  ];

  const faqs: [string, string][] = [
    [t(locale, `Can I get my money back from ${s.name}?`, `هل يمكنني استرداد أموالي من ${s.name}؟`), t(locale, 'Recovery is difficult but possible. Contact your bank for a chargeback, document everything, and report to the relevant regulator. Beware of "recovery agents" — they are usually a second scam.', 'الاسترداد صعب لكنه ممكن. تواصل مع بنكك لاسترداد المبلغ، ووثّق كل شيء، وأبلغ الجهة المنظِّمة. واحذر من «وكلاء الاسترداد» — فهم غالبًا احتيال ثانٍ.')],
    [t(locale, `Is ${s.name} regulated anywhere?`, `هل ${s.name} مرخّص في أي مكان؟`), t(locale, 'We found no verifiable regulation. Treat any license claim as false until you confirm it on the regulator’s register.', 'لم نجد أي تنظيم يمكن التحقق منه. اعتبر أي ادعاء ترخيص كاذبًا حتى تتأكد منه في سجل الجهة المنظِّمة.')],
    [t(locale, `What should I do if I was contacted by ${s.name}?`, `ماذا أفعل إذا تواصل معي ${s.name}؟`), t(locale, 'Do not deposit. Block the contact and report it. If you have already paid, follow the recovery steps on our Scam Detector page.', 'لا تُودِع. احظر جهة الاتصال وأبلغ عنها. وإن كنت قد دفعت بالفعل، اتّبع خطوات الاسترداد في صفحة كاشف الاحتيال.')],
  ];

  return (
    <div>
      <section style={{ background: '#0E1416', color: '#fff' }}>
        <Wrap>
          <div style={{ padding: '26px 0 32px' }}>
            <div style={{ marginBottom: '20px' }}>
              <Crumb items={[{ label: t(locale, 'Home', 'الرئيسية'), to: 'home' }, { label: t(locale, 'Scam alerts', 'تحذيرات الاحتيال'), to: 'scam-alerts' }, { label: s.name }]} />
            </div>
            <div style={{ display: 'flex', gap: '18px', alignItems: 'center' }}>
              <span style={{ width: '58px', height: '58px', borderRadius: '14px', background: 'rgba(192,57,43,.2)', color: '#F09B8F', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px', fontWeight: 700, flex: 'none' }}>⚠</span>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap', marginBottom: '6px' }}>
                  <h1 className="keep-serif" style={{ fontFamily: "'Newsreader',serif", fontWeight: 500, fontSize: '40px', margin: 0 }}>{t(locale, s.name + ': scam warning', s.name + ': تحذير من الاحتيال')}</h1>
                  <span style={{ fontSize: '12px', fontWeight: 700, color: '#fff', background: '#C0392B', padding: '5px 12px', borderRadius: '6px' }}>{verdict.toUpperCase()}</span>
                </div>
                <div style={{ fontSize: '14px', color: '#B9C1C6' }}>{t(locale, 'Reported region: ', 'المنطقة المُبلَّغ عنها: ') + country + t(locale, '  ·  Last reviewed June 2026', '  ·  آخر مراجعة يونيو 2026')}</div>
              </div>
            </div>
          </div>
        </Wrap>
      </section>

      <section style={{ padding: '40px 0 70px' }}>
        <Wrap>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: '48px', alignItems: 'start' }}>
            <div>
              <div style={{ display: 'flex', gap: '10px', background: '#FBE9E7', border: '1px solid rgba(192,57,43,.3)', borderRadius: '12px', padding: '16px 18px', marginBottom: '32px' }}>
                <span style={{ color: '#C0392B', fontSize: '18px' }}>⚠</span>
                <p style={{ margin: 0, fontSize: '14.5px', lineHeight: 1.55, color: '#7a2018' }}>
                  <strong>{t(locale, 'Do not deposit funds with ' + s.name + '.', 'لا تُودِع أموالًا لدى ' + s.name + '.')}</strong> {t(locale, 'Our analysts have flagged this company as ', 'صنّف محلّلونا هذه الشركة كـ') + verdict.toLowerCase() + '.'}
                </p>
              </div>
              {secs.map((sec, i) => (
                <div key={i} style={{ marginBottom: '30px' }}>
                  <H2>{sec[0]}</H2>
                  <p style={{ margin: 0, fontSize: '15.5px', lineHeight: 1.7, color: '#42505A' }}>{sec[1]}</p>
                </div>
              ))}
              <div style={{ margin: '8px 0 40px' }}>
                <H2>{t(locale, 'Red flags we found', 'علامات خطر وجدناها')}</H2>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                  {scamFlags(locale, s).map((f) => (
                    <span key={f} style={{ display: 'inline-flex', alignItems: 'center', gap: '7px', background: '#fff', border: '1px solid rgba(192,57,43,.25)', borderRadius: '100px', padding: '8px 14px', fontSize: '13px', color: '#C0392B', fontWeight: 600 }}>{'✕ ' + f}</span>
                  ))}
                </div>
              </div>
              <Faq faqs={faqs} locale={locale} />
              <Byline locale={locale} />
            </div>

            <div style={{ position: 'sticky', top: '92px', display: 'flex', flexDirection: 'column', gap: '18px' }}>
              <div style={{ background: '#fff', border: '1px solid rgba(14,20,22,.10)', borderRadius: '16px', padding: '20px' }}>
                <div style={{ fontSize: '12px', letterSpacing: '.12em', color: '#5A6670', fontWeight: 700, marginBottom: '12px' }}>{t(locale, 'CHECK ANOTHER BROKER', 'افحص وسيطًا آخر')}</div>
                <Link href={href('detector')} style={{ display: 'block', textAlign: 'center', background: '#0E1416', color: '#fff', borderRadius: '9px', padding: '13px', fontSize: '14px', fontWeight: 600 }}>{t(locale, 'Open Scam Detector', 'افتح كاشف الاحتيال')}</Link>
              </div>
              <div style={{ background: '#fff', border: '1px solid rgba(14,20,22,.10)', borderRadius: '16px', padding: '20px' }}>
                <div style={{ fontSize: '12px', letterSpacing: '.12em', color: '#5A6670', fontWeight: 700, marginBottom: '14px' }}>{t(locale, 'RELATED ALERTS', 'تحذيرات ذات صلة')}</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {related.map((rs) => (
                    <Link key={rs.slug} href={href('scam-alert', rs.slug)} style={{ display: 'flex', alignItems: 'center', gap: '11px' }}>
                      <span style={{ width: '30px', height: '30px', borderRadius: '7px', background: 'rgba(192,57,43,.1)', color: '#C0392B', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px', flex: 'none' }}>⚠</span>
                      <span style={{ flex: 1, minWidth: 0 }}>
                        <span style={{ display: 'block', fontSize: '13.5px', fontWeight: 600, color: '#0E1416' }}>{rs.name}</span>
                        <span style={{ display: 'block', fontSize: '11.5px', color: '#5A6670' }}>{scamVerdict(locale, rs)}</span>
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
              <div style={{ background: '#FBFAF7', border: '1px solid rgba(14,20,22,.10)', borderRadius: '16px', padding: '20px' }}>
                <div style={{ fontSize: '14px', fontWeight: 700, color: '#0E1416', marginBottom: '6px' }}>{t(locale, 'Recommended instead', 'موصى به بدلًا منه')}</div>
                <p style={{ margin: '0 0 12px', fontSize: '13px', color: '#5A6670', lineHeight: 1.5 }}>{t(locale, 'Looking for a safe, regulated alternative?', 'تبحث عن بديل آمن ومرخّص؟')}</p>
                <Link href={href('reviews')} style={{ display: 'block', textAlign: 'center', background: '#16A34A', color: '#fff', borderRadius: '9px', padding: '12px', fontSize: '13.5px', fontWeight: 600 }}>{t(locale, 'See top-rated brokers', 'شاهد الأعلى تقييمًا')}</Link>
              </div>
            </div>
          </div>
        </Wrap>
      </section>
    </div>
  );
}
