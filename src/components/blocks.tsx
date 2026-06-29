import type { ReactNode } from 'react';
import { Link } from '@/i18n/routing';
import { href } from '@/lib/routes';
import { t, loc, type Locale } from '@/lib/i18n';
import { AUTHORS } from '@/data/authors';
import type { Broker } from '@/data/brokers';
import Faq from './Faq';
import { Wrap, Eyebrow, Crumb, BrokerLogo, type CrumbItem } from './ui';

export function H2({ children }: { children: ReactNode }) {
  return (
    <h2 className="keep-serif" style={{ fontFamily: "'Newsreader',serif", fontWeight: 500, fontSize: '27px', letterSpacing: '-.01em', margin: '0 0 16px', color: '#0E1416' }}>{children}</h2>
  );
}

export function Byline({ locale }: { locale: Locale }) {
  const pairs: [string, (typeof AUTHORS)[number]][] = [
    [t(locale, 'Written by', 'بقلم'), AUTHORS[0]],
    [t(locale, 'Reviewed by', 'مراجعة'), AUTHORS[2]],
  ];
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', margin: '8px 0 44px', padding: '22px', background: '#F2F0EA', borderRadius: '14px' }}>
      {pairs.map((x) => (
        <Link key={x[0]} href={href('author', x[1].slug)} style={{ display: 'flex', gap: '13px', alignItems: 'center' }}>
          <span style={{ width: '46px', height: '46px', borderRadius: '50%', background: '#0E1416', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '15px', fontWeight: 600, flex: 'none' }}>{x[1].init}</span>
          <div>
            <div style={{ fontSize: '11px', letterSpacing: '.1em', color: '#5A6670', fontWeight: 700 }}>{x[0].toUpperCase()}</div>
            <div style={{ fontSize: '15px', fontWeight: 700, color: '#0E1416' }}>{loc(locale, x[1], 'name')}</div>
            <div style={{ fontSize: '12.5px', color: '#5A6670' }}>{loc(locale, x[1], 'role')}</div>
          </div>
        </Link>
      ))}
    </div>
  );
}

export function KeyFacts({ b, locale }: { b: Broker; locale: Locale }) {
  const rows: [string, string][] = [
    [t(locale, 'Minimum deposit', 'أدنى إيداع'), b.minStr],
    [t(locale, 'Regulated by', 'الجهة المنظِّمة'), b.regsFull.join(', ')],
    [t(locale, 'Spread from', 'السبريد من'), b.spreadStr],
    [t(locale, 'Islamic account', 'حساب إسلامي'), b.islamicStr],
    [t(locale, 'Platforms', 'المنصات'), b.platforms.join(', ')],
    [t(locale, 'Founded', 'تأسست'), String(b.founded)],
  ];
  return (
    <div style={{ margin: '8px 0 44px' }}>
      <H2>{t(locale, 'Key facts at a glance', 'حقائق سريعة')}</H2>
      <div style={{ border: '1px solid rgba(14,20,22,.10)', borderRadius: '12px', overflow: 'hidden' }}>
        {rows.map((r, i) => (
          <div key={r[0]} style={{ display: 'grid', gridTemplateColumns: '190px 1fr', gap: '16px', padding: '14px 18px', background: i % 2 ? '#FBFAF7' : '#fff', borderBottom: i < rows.length - 1 ? '1px solid rgba(14,20,22,.07)' : 'none' }}>
            <span style={{ fontSize: '13.5px', color: '#5A6670', fontWeight: 600 }}>{r[0]}</span>
            <span style={{ fontSize: '14px', color: '#1A2227', fontFamily: "'IBM Plex Mono',monospace" }}>{r[1]}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function CompareTable({ list, locale }: { list: Broker[]; locale: Locale }) {
  const th = { textAlign: 'start', padding: '13px 16px', fontSize: '11px', letterSpacing: '.08em', color: '#5A6670', fontWeight: 700, borderBottom: '1px solid rgba(14,20,22,.12)', whiteSpace: 'nowrap' } as const;
  const td = { padding: '14px 16px', fontSize: '13.5px', color: '#1A2227', borderBottom: '1px solid rgba(14,20,22,.07)' } as const;
  const thEnd = { ...th, textAlign: 'end' } as const;
  const thCenter = { ...th, textAlign: 'center' } as const;
  return (
    <div style={{ overflowX: 'auto', border: '1px solid rgba(14,20,22,.10)', borderRadius: '14px' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '640px' }}>
        <thead>
          <tr style={{ background: '#FBFAF7' }}>
            <th style={th}>#</th>
            <th style={th}>{t(locale, 'Broker', 'الوسيط')}</th>
            <th style={thEnd}>{t(locale, 'Score', 'التقييم')}</th>
            <th style={thEnd}>{t(locale, 'Min deposit', 'أدنى إيداع')}</th>
            <th style={thEnd}>{t(locale, 'Spread', 'السبريد')}</th>
            <th style={thCenter}>{t(locale, 'Islamic', 'إسلامي')}</th>
            <th style={th}>{t(locale, 'Regulators', 'الجهات المنظِّمة')}</th>
          </tr>
        </thead>
        <tbody>
          {list.map((b, i) => (
            <tr key={b.slug} style={{ background: i % 2 ? '#fff' : 'rgba(251,250,247,.5)' }}>
              <td style={{ ...td, fontFamily: "'IBM Plex Mono',monospace", color: '#9BA4AA' }}>{i + 1}</td>
              <td style={td}>
                <Link href={href('review', b.slug)} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <BrokerLogo broker={b} size={28} radius={6} />
                  <span style={{ fontWeight: 600 }}>{b.name}</span>
                </Link>
              </td>
              <td style={{ ...td, textAlign: 'end', fontFamily: "'IBM Plex Mono',monospace", fontWeight: 600, color: b.tone.hex }}>{b.scoreStr}</td>
              <td style={{ ...td, textAlign: 'end', fontFamily: "'IBM Plex Mono',monospace" }}>{b.minStr}</td>
              <td style={{ ...td, textAlign: 'end', fontFamily: "'IBM Plex Mono',monospace" }}>{b.spreadStr}</td>
              <td style={{ ...td, textAlign: 'center', color: b.islamic ? '#0E7A43' : '#9BA4AA', fontWeight: 600 }}>{b.islamic ? t(locale, 'Yes', 'نعم') : t(locale, 'No', 'لا')}</td>
              <td style={{ ...td, fontSize: '12px', color: '#5A6670' }}>{b.regs.join(', ')}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function PageHead({
  locale,
  dark,
  crumbs,
  eyebrow,
  title,
  sub,
}: {
  locale: Locale;
  dark?: boolean;
  crumbs?: CrumbItem[];
  eyebrow?: string;
  title: string;
  sub?: string;
}) {
  return (
    <section style={{ background: dark ? '#0E1416' : '#fff', color: dark ? '#fff' : '#0E1416', borderBottom: '1px solid ' + (dark ? 'rgba(255,255,255,.10)' : 'rgba(14,20,22,.10)'), position: 'relative', overflow: 'hidden' }}>
      {dark && <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(255,255,255,.03) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.03) 1px,transparent 1px)', backgroundSize: '44px 44px', maskImage: 'radial-gradient(ellipse 60% 100% at 80% 0%,#000,transparent)' }} />}
      <Wrap>
        <div style={{ padding: '28px 0 34px', position: 'relative' }}>
          {crumbs && <div style={{ marginBottom: '18px' }}><Crumb items={crumbs} /></div>}
          {eyebrow && <Eyebrow label={eyebrow} color={dark ? '#6EE7A0' : '#16A34A'} />}
          <h1 className="keep-serif" style={{ fontFamily: "'Newsreader',serif", fontWeight: 500, fontSize: '44px', letterSpacing: '-.015em', margin: eyebrow ? '16px 0 0' : '0', lineHeight: 1.08 }}>{title}</h1>
          {sub && <p style={{ fontSize: '17px', color: dark ? '#B9C1C6' : '#5A6670', margin: '14px 0 0', maxWidth: '760px', lineHeight: 1.55 }}>{sub}</p>}
        </div>
      </Wrap>
    </section>
  );
}

export interface RankingProps {
  locale: Locale;
  crumbs: CrumbItem[];
  eyebrow: string;
  title: string;
  sub: string;
  intro: string;
  list: Broker[];
  faqs: [string, string][];
}

export function Ranking({ locale, crumbs, eyebrow, title, sub, intro, list, faqs }: RankingProps) {
  const toc: [string, string][] = [
    ['summary', t(locale, 'Quick summary', 'ملخص سريع')],
    ['ranking', t(locale, 'The ranking, broker by broker', 'الترتيب، وسيطًا تلو الآخر')],
    ['compare', t(locale, 'Side-by-side comparison', 'مقارنة جنبًا إلى جنب')],
    ['how', t(locale, 'How we chose', 'كيف اخترنا')],
    ['faq', t(locale, 'Frequently asked questions', 'الأسئلة الشائعة')],
  ];
  return (
    <div>
      <PageHead locale={locale} dark crumbs={crumbs} eyebrow={eyebrow} title={title} sub={sub} />
      <section style={{ padding: '40px 0 70px' }}>
        <Wrap>
          <div style={{ display: 'grid', gridTemplateColumns: '220px 1fr', gap: '48px', alignItems: 'start' }}>
            {/* TOC */}
            <div style={{ position: 'sticky', top: '92px' }}>
              <div style={{ fontSize: '11px', letterSpacing: '.12em', color: '#5A6670', fontWeight: 700, marginBottom: '14px' }}>{t(locale, 'ON THIS PAGE', 'في هذه الصفحة')}</div>
              {toc.map((tc, i) => (
                <div key={tc[0]} style={{ display: 'flex', gap: '10px', padding: '8px 0', fontSize: '13.5px', color: '#42505A', borderInlineStart: '2px solid ' + (i === 0 ? '#16A34A' : 'rgba(14,20,22,.12)'), paddingInlineStart: '14px' }}>{tc[1]}</div>
              ))}
              <div style={{ marginTop: '20px', padding: '16px', background: '#0E1416', borderRadius: '12px' }}>
                <div style={{ fontSize: '12px', color: '#9BA4AA', marginBottom: '8px' }}>{t(locale, 'Editor’s pick', 'اختيار المحرّر')}</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                  <BrokerLogo broker={list[0]} size={34} radius={8} />
                  <span style={{ color: '#fff', fontSize: '14px', fontWeight: 600 }}>{list[0].name}</span>
                </div>
                <Link href={href('review', list[0].slug)} style={{ display: 'block', textAlign: 'center', background: '#16A34A', color: '#fff', borderRadius: '8px', padding: '10px', fontSize: '13px', fontWeight: 600 }}>{t(locale, 'See review', 'شاهد المراجعة')}</Link>
              </div>
            </div>

            {/* CONTENT */}
            <div>
              <p style={{ fontSize: '17px', lineHeight: 1.7, color: '#42505A', margin: '0 0 14px' }}>{intro}</p>
              <p style={{ fontSize: '15px', lineHeight: 1.7, color: '#5A6670', margin: '0 0 36px' }}>{t(locale, 'Every broker on this list is independently scored against our methodology and verified against its regulator’s public register. Rankings are updated monthly — last reviewed June 2026.', 'كل وسيط في هذه القائمة مُقيَّم بشكل مستقل وفق منهجيتنا ومُتحقَّق منه عبر السجل العام لجهته المنظِّمة. تُحدَّث الترتيبات شهريًا — آخر مراجعة يونيو 2026.')}</p>

              <H2>{t(locale, 'The ranking, broker by broker', 'الترتيب، وسيطًا تلو الآخر')}</H2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', margin: '0 0 44px' }}>
                {list.map((b, i) => (
                  <div key={b.slug} style={{ position: 'relative', background: '#fff', border: '1px solid ' + (i === 0 ? 'rgba(22,163,74,.35)' : 'rgba(14,20,22,.10)'), borderRadius: '14px', padding: '22px', boxShadow: i === 0 ? '0 18px 40px -26px rgba(22,163,74,.5)' : 'none' }}>
                    {i === 0 && <div style={{ position: 'absolute', top: '-11px', insetInlineStart: '22px', background: '#16A34A', color: '#fff', fontSize: '11px', fontWeight: 700, letterSpacing: '.04em', padding: '4px 12px', borderRadius: '100px' }}>{t(locale, '★ BROKER OF THE MONTH', '★ وسيط الشهر')}</div>}
                    <div style={{ display: 'flex', gap: '18px', alignItems: 'flex-start' }}>
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px', flex: 'none' }}>
                        <span style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: '13px', color: '#9BA4AA', fontWeight: 600 }}>{'#' + (i + 1)}</span>
                        <BrokerLogo broker={b} size={52} radius={12} />
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap', marginBottom: '4px' }}>
                          <h3 className="keep-serif" style={{ fontFamily: "'Newsreader',serif", fontWeight: 600, fontSize: '21px', margin: 0, color: '#0E1416' }}>{b.name}</h3>
                          <span style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: '13px', fontWeight: 600, color: b.tone.hex }}>{b.scoreStr + ' / 5'}</span>
                        </div>
                        <p style={{ fontSize: '14px', lineHeight: 1.55, color: '#42505A', margin: '0 0 12px' }}>{loc(locale, b, 'blurb')}</p>
                        <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', marginBottom: '14px' }}>
                          {([[t(locale, 'Min', 'أدنى'), b.minStr], [t(locale, 'Spread', 'السبريد'), b.spreadStr], [t(locale, 'Islamic', 'إسلامي'), b.islamic ? t(locale, 'Yes', 'نعم') : t(locale, 'No', 'لا')], [t(locale, 'Regulated', 'مرخّص'), b.regs.join(', ')]] as [string, string][]).map((f) => (
                            <span key={f[0]} style={{ fontSize: '12.5px', color: '#5A6670' }}>{f[0] + ': '}<strong style={{ color: '#1A2227' }}>{f[1]}</strong></span>
                          ))}
                        </div>
                        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                          <a href={`/go/${b.slug}`} rel="sponsored nofollow" className="am-btn" style={{ background: '#16A34A', color: '#fff', borderRadius: '8px', padding: '10px 18px', fontSize: '13.5px', fontWeight: 600 }}>{t(locale, 'Open account with ', 'افتح حسابًا مع ') + b.name}</a>
                          <Link href={href('review', b.slug)} className="am-btn" style={{ background: '#fff', color: '#0E1416', border: '1px solid rgba(14,20,22,.16)', borderRadius: '8px', padding: '10px 18px', fontSize: '13.5px', fontWeight: 600 }}>{t(locale, 'Read full review', 'اقرأ المراجعة كاملة')}</Link>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <H2>{t(locale, 'Side-by-side comparison', 'مقارنة جنبًا إلى جنب')}</H2>
              <div style={{ margin: '0 0 44px' }}><CompareTable list={list} locale={locale} /></div>

              <H2>{t(locale, 'How we chose', 'كيف اخترنا')}</H2>
              <p style={{ fontSize: '15.5px', lineHeight: 1.7, color: '#42505A', margin: '0 0 36px' }}>
                {t(locale, 'We weight regulation and security most heavily (28%), followed by trading costs (22%). Each broker is tested with a live account, a real deposit and a full withdrawal cycle. Brokers without verifiable tier-1 or local (DFSA/SCA) regulation cannot rank in the top three. See our full ', 'نُعطي التنظيم والأمان الوزن الأكبر (28%)، يليه تكاليف التداول (22%). يُختبَر كل وسيط بحساب حقيقي وإيداع فعلي ودورة سحب كاملة. الوسطاء بلا تنظيم من الفئة الأولى أو محلي (DFSA/SCA) لا يمكنهم دخول المراكز الثلاثة الأولى. اطّلع على ')}
                <Link href={href('principles')} style={{ color: '#16A34A', fontWeight: 600 }}>{t(locale, 'methodology', 'منهجيتنا الكاملة')}</Link>.
              </p>

              <Faq faqs={faqs} locale={locale} />
              <Byline locale={locale} />
            </div>
          </div>
        </Wrap>
      </section>
    </div>
  );
}
