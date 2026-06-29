import type { ReactNode } from 'react';
import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import { href } from '@/lib/routes';
import { t, loc, type Locale } from '@/lib/i18n';
import { routing } from '@/i18n/routing';
import { brokers, brokerBySlug, reviewSections, brokerPros, brokerCons, brokerFaqs, BROKERS_RAW } from '@/data/brokers';
import { Wrap, Crumb, Badge, VerifiedTag, Disclosure } from '@/components/ui';
import { KeyFacts, Byline, H2 } from '@/components/blocks';
import Faq from '@/components/Faq';
import CommentForm from '@/components/CommentForm';
import JsonLd from '@/components/JsonLd';

export function generateStaticParams() {
  return routing.locales.flatMap((locale) => BROKERS_RAW.map((b) => ({ locale, slug: b.slug })));
}

export async function generateMetadata({ params }: { params: { locale: string; slug: string } }): Promise<Metadata> {
  const locale = params.locale as Locale;
  const b = brokerBySlug(locale, params.slug);
  return {
    title: t(locale, `${b.name} review (2026): is it a scam or legit?`, `مراجعة ${b.name} (2026): احتيال أم موثوق؟`),
    description: loc(locale, b, 'blurb'),
    alternates: { canonical: `/${locale}/reviews/${b.slug}` },
  };
}

function ProConCard({ title, items, good }: { title: string; items: string[]; good: boolean }) {
  return (
    <div style={{ background: '#fff', border: '1px solid ' + (good ? 'rgba(22,163,74,.25)' : 'rgba(192,57,43,.22)'), borderRadius: '14px', padding: '22px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '9px', marginBottom: '15px', fontSize: '13px', fontWeight: 700, letterSpacing: '.06em', color: good ? '#0E7A43' : '#C0392B' }}>
        <span style={{ width: '20px', height: '20px', borderRadius: '50%', background: good ? '#16A34A' : '#C0392B', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px' }}>{good ? '✓' : '✕'}</span>
        {title}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '11px' }}>
        {items.map((it, i) => (
          <div key={i} style={{ display: 'flex', gap: '9px', fontSize: '14px', lineHeight: 1.45, color: '#42505A' }}>
            <span style={{ color: good ? '#16A34A' : '#C0392B', flex: 'none', fontWeight: 700 }}>{good ? '+' : '–'}</span>
            {it}
          </div>
        ))}
      </div>
    </div>
  );
}

function Fact({ label, val, mono }: { label: string; val: ReactNode; mono?: boolean }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', gap: '12px', padding: '11px 0', borderBottom: '1px solid rgba(14,20,22,.07)' }}>
      <span style={{ fontSize: '13px', color: '#5A6670' }}>{label}</span>
      <span style={{ fontSize: '13.5px', fontWeight: 600, color: '#0E1416', fontFamily: mono ? "'IBM Plex Mono',monospace" : 'inherit', textAlign: 'end' }}>{val}</span>
    </div>
  );
}

export default function ReviewPage({ params }: { params: { locale: string; slug: string } }) {
  const locale = params.locale as Locale;
  setRequestLocale(locale);
  const b = brokerBySlug(locale, params.slug);
  const secs = reviewSections(b);
  const pros = brokerPros(b);
  const cons = brokerCons(b);
  const faqs = brokerFaqs(b);
  const related = brokers(locale).filter((x) => x.slug !== b.slug && x.regs[0] !== 'none').slice(0, 3);

  const reviewLd = {
    '@context': 'https://schema.org',
    '@type': 'Review',
    itemReviewed: { '@type': 'FinancialService', name: b.name },
    reviewRating: { '@type': 'Rating', ratingValue: b.score, bestRating: 5, worstRating: 0 },
    author: { '@type': 'Organization', name: 'Amana' },
    publisher: { '@type': 'Organization', name: 'Amana' },
  };

  return (
    <div>
      <JsonLd data={reviewLd} />
      {/* HEADER */}
      <section style={{ background: '#fff', borderBottom: '1px solid rgba(14,20,22,.10)' }}>
        <Wrap>
          <div style={{ padding: '24px 0 30px' }}>
            <div style={{ marginBottom: '22px' }}>
              <Crumb items={[{ label: t(locale, 'Home', 'الرئيسية'), to: 'home' }, { label: t(locale, 'Reviews', 'المراجعات'), to: 'reviews' }, { label: b.name }]} />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '32px', alignItems: 'center' }}>
              <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
                <span style={{ width: '70px', height: '70px', borderRadius: '15px', background: '#0E1416', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'IBM Plex Mono',monospace", fontWeight: 600, fontSize: '24px', flex: 'none' }}>{b.logo}</span>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
                    <h1 className="keep-serif" style={{ fontFamily: "'Newsreader',serif", fontWeight: 500, fontSize: '40px', letterSpacing: '-.015em', margin: 0, color: '#0E1416' }}>{t(locale, b.name + ' review', 'مراجعة ' + b.name)}</h1>
                    {b.regs[0] !== 'none' && <VerifiedTag regs={t(locale, 'Regulated', 'مرخّص')} />}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', margin: '10px 0', flexWrap: 'wrap' }}>
                    {b.regsFull.map((r) => <span key={r} style={{ fontSize: '12px', fontWeight: 600, color: '#42505A', background: '#F2F0EA', padding: '4px 10px', borderRadius: '5px' }}>{r}</span>)}
                  </div>
                  <p className="keep-serif" style={{ fontFamily: "'Newsreader',serif", fontStyle: 'italic', fontSize: '18px', lineHeight: 1.5, color: '#42505A', margin: 0, maxWidth: '560px' }}>{loc(locale, b, 'blurb')}</p>
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                <Badge b={b} size={90} />
                <span style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '.05em', color: b.tone.hex }}>{b.tone.label.toUpperCase()}</span>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center', margin: '24px 0 18px', flexWrap: 'wrap' }}>
              <a href={`/go/${b.slug}`} rel="sponsored nofollow" className="am-btn" style={{ background: '#16A34A', color: '#fff', fontSize: '14px', fontWeight: 600, padding: '13px 22px', borderRadius: '9px' }}>{t(locale, 'Open account', 'افتح حسابًا')}</a>
              <a href={`/go/${b.slug}`} rel="sponsored nofollow" className="am-btn" style={{ background: '#fff', color: '#0E1416', border: '1px solid rgba(14,20,22,.16)', fontSize: '14px', fontWeight: 600, padding: '13px 22px', borderRadius: '9px' }}>{t(locale, 'Visit ' + b.name, 'زيارة ' + b.name)}</a>
              <span style={{ fontSize: '12.5px', color: '#9BA4AA', marginInlineStart: 'auto', fontFamily: "'IBM Plex Mono',monospace" }}>{t(locale, 'Last updated June 24, 2026', 'آخر تحديث 24 يونيو 2026')}</span>
            </div>
            <Disclosure locale={locale} />
          </div>
        </Wrap>
      </section>

      {/* BODY */}
      <section style={{ padding: '40px 0 70px' }}>
        <Wrap>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 330px', gap: '48px', alignItems: 'start' }}>
            {/* MAIN */}
            <div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '40px' }}>
                <ProConCard title={t(locale, 'PROS', 'المزايا')} items={pros} good />
                <ProConCard title={t(locale, 'CONS', 'العيوب')} items={cons} good={false} />
              </div>
              {secs.map((s, i) => (
                <div key={i} style={{ marginBottom: '30px' }}>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px', marginBottom: '10px' }}>
                    <span style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: '13px', color: '#16A34A', fontWeight: 600 }}>{'0' + (i + 1)}</span>
                    <h2 className="keep-serif" style={{ fontFamily: "'Newsreader',serif", fontWeight: 500, fontSize: '25px', letterSpacing: '-.01em', margin: 0, color: '#0E1416' }}>{s[0]}</h2>
                  </div>
                  <p style={{ margin: 0, fontSize: '15.5px', lineHeight: 1.7, color: '#42505A' }}>{s[1]}</p>
                </div>
              ))}
              <KeyFacts b={b} locale={locale} />
              <Faq faqs={faqs} locale={locale} />
              <div style={{ margin: '8px 0 44px' }}>
                <H2>{t(locale, 'Sources', 'المصادر')}</H2>
                <ul style={{ margin: 0, paddingInlineStart: '20px', fontSize: '14px', lineHeight: 1.9, color: '#5A6670' }}>
                  <li>{t(locale, 'FCA / CySEC / DFSA / SCA public registers (license verification)', 'السجلات العامة لـ FCA / CySEC / DFSA / SCA (التحقق من الترخيص)')}</li>
                  <li>{t(locale, 'Live account testing by Amana analysts, June 2026', 'اختبار حساب حقيقي من محلّلي أمانة، يونيو 2026')}</li>
                  <li>{t(locale, 'Broker fee schedule and client agreement', 'جدول رسوم الوسيط واتفاقية العميل')}</li>
                </ul>
              </div>
              <Byline locale={locale} />
              <CommentForm locale={locale} />
            </div>

            {/* SIDEBAR */}
            <div style={{ position: 'sticky', top: '92px', display: 'flex', flexDirection: 'column', gap: '18px' }}>
              <div style={{ background: '#0E1416', color: '#fff', borderRadius: '16px', padding: '22px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '16px' }}>
                  <Badge b={b} size={64} />
                  <div>
                    <div style={{ fontSize: '12px', color: '#9BA4AA' }}>{t(locale, 'Overall score', 'التقييم العام')}</div>
                    <div className="keep-serif" style={{ fontFamily: "'Newsreader',serif", fontSize: '20px', color: '#fff' }}>{b.tone.label}</div>
                  </div>
                </div>
                <a href={`/go/${b.slug}`} rel="sponsored nofollow" className="am-btn" style={{ display: 'block', textAlign: 'center', background: '#16A34A', color: '#fff', borderRadius: '9px', padding: '13px', fontSize: '14px', fontWeight: 600, marginBottom: '9px' }}>{t(locale, 'Open account →', 'افتح حسابًا →')}</a>
                <a href={`/go/${b.slug}`} rel="sponsored nofollow" className="am-btn" style={{ display: 'block', textAlign: 'center', background: 'rgba(255,255,255,.10)', color: '#fff', border: '1px solid rgba(255,255,255,.20)', borderRadius: '9px', padding: '13px', fontSize: '14px', fontWeight: 600 }}>{t(locale, 'Visit ' + b.name, 'زيارة ' + b.name)}</a>
                <div style={{ fontSize: '11px', color: '#6B747A', textAlign: 'center', marginTop: '10px' }}>{t(locale, '74–89% of retail accounts lose money.', '74–89% من حسابات الأفراد تخسر المال.')}</div>
              </div>
              <div style={{ background: '#fff', border: '1px solid rgba(14,20,22,.10)', borderRadius: '16px', padding: '20px' }}>
                <div style={{ fontSize: '12px', letterSpacing: '.12em', color: '#5A6670', fontWeight: 700, marginBottom: '8px' }}>{t(locale, 'AT A GLANCE', 'لمحة سريعة')}</div>
                <Fact label={t(locale, 'Minimum deposit', 'أدنى إيداع')} val={b.minStr} mono />
                <Fact label={t(locale, 'Spread from', 'السبريد من')} val={b.spreadStr} mono />
                <Fact label={t(locale, 'Islamic account', 'حساب إسلامي')} val={b.islamic ? t(locale, 'Yes', 'نعم') : t(locale, 'No', 'لا')} />
                <Fact label={t(locale, 'Regulators', 'الجهات المنظِّمة')} val={b.regs.join(', ')} />
                <Fact label={t(locale, 'Platforms', 'المنصات')} val={t(locale, b.platforms.length + ' available', b.platforms.length + ' متاحة')} />
              </div>
              <div style={{ background: '#fff', border: '1px solid rgba(14,20,22,.10)', borderRadius: '16px', padding: '20px' }}>
                <div style={{ fontSize: '12px', letterSpacing: '.12em', color: '#5A6670', fontWeight: 700, marginBottom: '14px' }}>{t(locale, 'RELATED LICENSED BROKERS', 'وسطاء مرخّصون ذوو صلة')}</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {related.map((rb) => (
                    <Link key={rb.slug} href={href('review', rb.slug)} style={{ display: 'flex', alignItems: 'center', gap: '11px' }}>
                      <span style={{ width: '34px', height: '34px', borderRadius: '8px', background: '#0E1416', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 600, fontFamily: "'IBM Plex Mono',monospace", flex: 'none' }}>{rb.logo}</span>
                      <span style={{ flex: 1, minWidth: 0 }}>
                        <span style={{ display: 'block', fontSize: '13.5px', fontWeight: 600, color: '#0E1416' }}>{rb.name}</span>
                        <span style={{ display: 'block', fontSize: '11.5px', color: '#5A6670' }}>{rb.regLabel}</span>
                      </span>
                      <span style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: '13px', fontWeight: 600, color: rb.tone.hex }}>{rb.scoreStr}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Wrap>
      </section>
    </div>
  );
}
