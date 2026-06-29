import { Link } from '@/i18n/routing';
import { href } from '@/lib/routes';
import { setRequestLocale } from 'next-intl/server';
import { t, loc, type Locale } from '@/lib/i18n';
import { Wrap, Eyebrow, LinkBtn, BrokerCard, ArticleCard, BrokerLogo } from '@/components/ui';
import CountUp from '@/components/anim/CountUp';
import RevealOnScroll from '@/components/anim/RevealOnScroll';
import { PARTNERS, logoUrl } from '@/data/partners';
import { brokers } from '@/data/brokers';
import { scams, scamWhy, scamVerdict } from '@/data/scams';
import { articles } from '@/data/articles';
import { SIGNALS } from '@/data/predictions';

export default function HomePage({ params }: { params: { locale: string } }) {
  const locale = params.locale as Locale;
  setRequestLocale(locale);
  const bs = brokers(locale);
  const feat = bs.slice(0, 6);

  const stats: [string, string][] = [
    ['158', t(locale, 'Brokers reviewed', 'وسيط تمت مراجعته')],
    ['11', t(locale, 'Regulators tracked', 'جهة رقابية متابعة')],
    ['43', t(locale, 'Scams exposed', 'عملية احتيال مكشوفة')],
    ['2.4M', t(locale, 'Traders helped', 'متداول استفادوا')],
  ];
  const testi: [string, string, string][] = [
    [t(locale, '“I almost wired $4,000 to FXVantix. Amana’s scam check stopped me cold.”', '“كدت أحوّل 4,000 دولار إلى FXVantix. فحص الاحتيال من أمانة أوقفني فورًا.”'), 'Khalid R.', t(locale, 'Riyadh', 'الرياض')],
    [t(locale, '“Finally a ranking that actually explains the methodology instead of just selling me a broker.”', '“أخيرًا تصنيف يشرح المنهجية فعلًا بدل مجرد بيعي وسيطًا.”'), 'Mariam A.', t(locale, 'Dubai', 'دبي')],
    [t(locale, '“The Islamic-account breakdown was the clearest I’ve found anywhere.”', '“شرح الحسابات الإسلامية كان الأوضح على الإطلاق.”'), 'Youssef B.', t(locale, 'Cairo', 'القاهرة')],
  ];
  const pillars: [string, string][] = [
    [t(locale, 'Commissions & spreads', 'العمولات والسبريد'), '22%'],
    [t(locale, 'Security & regulation', 'الأمان والتنظيم'), '28%'],
    [t(locale, 'Deposits & withdrawals', 'الإيداع والسحب'), '16%'],
    [t(locale, 'Platforms & app', 'المنصات والتطبيق'), '14%'],
    [t(locale, 'Instruments', 'الأدوات'), '12%'],
    [t(locale, 'Support', 'الدعم'), '8%'],
  ];
  const linkCountries: [string, string][] = [
    ['saudi-arabia', t(locale, 'Saudi Arabia', 'السعودية')], ['uae', t(locale, 'UAE', 'الإمارات')], ['egypt', t(locale, 'Egypt', 'مصر')], ['qatar', t(locale, 'Qatar', 'قطر')], ['kuwait', t(locale, 'Kuwait', 'الكويت')], ['uk', t(locale, 'United Kingdom', 'المملكة المتحدة')],
  ];
  const linkCats: [string, string][] = [
    ['islamic', t(locale, 'Islamic / halal accounts', 'حسابات إسلامية / حلال')], ['low-spread', t(locale, 'Lowest spreads', 'أدنى سبريد')], ['best-apps', t(locale, 'Best trading apps', 'أفضل تطبيقات التداول')], ['no-capital', t(locale, 'Low minimum deposit', 'أدنى إيداع')], ['gold', t(locale, 'Gold trading', 'تداول الذهب')], ['metatrader', t(locale, 'MetaTrader brokers', 'وسطاء ميتاتريدر')],
  ];

  return (
    <div>
      <RevealOnScroll />
      {/* HERO */}
      <section style={{ background: '#0E1416', color: '#fff', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(255,255,255,.035) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.035) 1px,transparent 1px)', backgroundSize: '48px 48px', maskImage: 'radial-gradient(ellipse 70% 80% at 70% 30%,#000,transparent)' }} />
        <div style={{ position: 'absolute', top: '-120px', right: '-80px', width: '420px', height: '420px', background: 'radial-gradient(circle,rgba(22,163,74,.22),transparent 65%)' }} />
        <Wrap>
          <div style={{ position: 'relative', padding: '76px 0 84px', display: 'grid', gridTemplateColumns: '1.15fr .85fr', gap: '56px', alignItems: 'center' }}>
            <div className="am-rise">
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '9px', fontSize: '12px', fontWeight: 600, color: '#9BE3B4', background: 'rgba(22,163,74,.12)', border: '1px solid rgba(22,163,74,.30)', padding: '7px 13px', borderRadius: '100px', marginBottom: '26px' }}>
                <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#16A34A' }} />
                {t(locale, 'Independent · Methodology-driven · Updated June 2026', 'مستقل · قائم على منهجية · محدّث يونيو 2026')}
              </div>
              <h1 className="keep-serif" style={{ fontFamily: "'Newsreader',serif", fontWeight: 500, fontSize: '62px', lineHeight: 1.04, letterSpacing: '-.015em', margin: '0 0 22px' }}>
                {t(locale, 'Trade with ', 'تداول ')}
                <span style={{ fontStyle: 'italic', color: '#6EE7A0' }}>{t(locale, 'confidence.', 'بثقة.')}</span>
              </h1>
              <p style={{ fontSize: '18px', lineHeight: 1.6, color: '#B9C1C6', maxWidth: '520px', margin: '0 0 32px' }}>
                {t(locale, 'Independent ratings of 158 online brokers, a live scam database, and expert-reviewed analysis — so you know exactly who you’re trusting with your money.', 'تصنيفات مستقلة لـ158 وسيطًا، وقاعدة بيانات احتيال حيّة، وتحليلات يراجعها خبراء — لتعرف بالضبط بمن تئتمن على أموالك.')}
              </p>
              <div style={{ display: 'flex', gap: '13px', flexWrap: 'wrap' }}>
                <LinkBtn label={t(locale, 'See top-rated brokers', 'أفضل الوسطاء تقييمًا')} to="reviews" variant="primary" />
                <LinkBtn label={t(locale, 'Check a broker for scams', 'افحص وسيطًا')} to="detector" variant="light" />
              </div>
              <div style={{ display: 'flex', gap: '34px', marginTop: '44px', paddingTop: '30px', borderTop: '1px solid rgba(255,255,255,.12)' }}>
                {stats.map((s, i) => (
                  <div key={s[1]}>
                    <div style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: '30px', fontWeight: 600, color: '#fff' }}><CountUp value={s[0]} delayMs={i * 90} /></div>
                    <div style={{ fontSize: '12px', color: '#8A949A', marginTop: '2px' }}>{s[1]}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* hero card */}
            <div className="am-rise" style={{ animationDelay: '.08s' }}>
              <div style={{ background: '#fff', borderRadius: '18px', padding: '24px', boxShadow: '0 40px 80px -30px rgba(0,0,0,.6)' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                  <div style={{ fontSize: '13px', fontWeight: 700, color: '#0E1416', letterSpacing: '.02em' }}>{t(locale, 'Today’s top-rated', 'الأعلى تقييمًا اليوم')}</div>
                  <Link href={href('reviews')} style={{ fontSize: '11px', color: '#16A34A', fontWeight: 600 }}>{t(locale, 'All ratings →', 'كل التصنيفات →')}</Link>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  {bs.slice(0, 4).map((b, i) => (
                    <Link key={b.slug} href={href('review', b.slug)} className="am-row" style={{ display: 'flex', alignItems: 'center', gap: '13px', padding: '11px 10px', borderRadius: '10px', background: i === 0 ? 'rgba(22,163,74,.06)' : 'transparent' }}>
                      <span style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: '13px', color: '#9BA4AA', width: '16px' }}>{'0' + (i + 1)}</span>
                      <BrokerLogo broker={b} size={38} radius={9} />
                      <span style={{ flex: 1, minWidth: 0 }}>
                        <span style={{ display: 'block', fontSize: '14px', fontWeight: 600, color: '#0E1416' }}>{b.name}</span>
                        <span style={{ display: 'block', fontSize: '11.5px', color: '#5A6670' }}>{b.regLabel}</span>
                      </span>
                      <span style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: '14px', fontWeight: 600, color: b.tone.hex }}><CountUp value={b.scoreStr} delayMs={i * 90} /></span>
                    </Link>
                  ))}
                </div>
                <Link href={href('detector')} style={{ marginTop: '14px', padding: '13px 15px', background: '#0E1416', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '11px' }}>
                  <svg width={20} height={20} viewBox="0 0 24 24" fill="none"><path d="M12 3l7 2.5v5.5c0 4-2.8 7.4-7 9.5-4.2-2.1-7-5.5-7-9.5V5.5L12 3z" stroke="#16A34A" strokeWidth={2} strokeLinejoin="round" /></svg>
                  <span style={{ flex: 1, fontSize: '12.5px', color: '#C7CDD1' }}>{t(locale, 'Worried about a broker? Run it through our Scam Detector.', 'قلِق بشأن وسيط؟ افحصه عبر كاشف الاحتيال.')}</span>
                  <span style={{ background: '#16A34A', color: '#fff', borderRadius: '7px', padding: '8px 12px', fontSize: '12.5px', fontWeight: 600 }}>{t(locale, 'Check', 'افحص')}</span>
                </Link>
              </div>
            </div>
          </div>
        </Wrap>

        {/* media strip */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,.10)', position: 'relative' }}>
          <Wrap>
            <div style={{ padding: '20px 0', display: 'flex', alignItems: 'center', gap: '34px', flexWrap: 'wrap' }}>
              <span style={{ fontSize: '11px', letterSpacing: '.16em', color: '#6B747A', fontWeight: 700 }}>{t(locale, 'FEATURED IN', 'ظهرنا في')}</span>
              {['Bloomberg', 'Reuters', 'Al Arabiya', 'Financial Times', 'The National', 'CNBC'].map((n) => (
                <span key={n} className="keep-serif" style={{ fontFamily: "'Newsreader',serif", fontSize: '19px', color: '#7E888E', fontWeight: 500 }}>{n}</span>
              ))}
            </div>
          </Wrap>
        </div>
      </section>

      {/* FEATURED LICENSED BROKERS (real, externally linked) */}
      <section style={{ padding: '64px 0 8px' }}>
        <Wrap>
          <div style={{ textAlign: 'center', marginBottom: '30px' }}>
            <div style={{ display: 'flex', justifyContent: 'center' }}><Eyebrow label={t(locale, 'GLOBALLY LICENSED', 'مرخّصة عالميًا')} /></div>
            <h2 className="keep-serif" style={{ fontFamily: "'Newsreader',serif", fontWeight: 500, fontSize: '34px', letterSpacing: '-.01em', margin: '14px 0 0', color: '#0E1416' }}>{t(locale, 'The best globally licensed trading companies, at your fingertips', 'أفضل شركات التداول المرخّصة عالميًا بين يديك')}</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6,1fr)', gap: '14px' }}>
            {PARTNERS.map((p) => (
              <a key={p.name} href={p.url} target="_blank" rel="sponsored noopener noreferrer" className="am-card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', background: '#fff', border: '1px solid rgba(14,20,22,.10)', borderRadius: '14px', padding: '22px 14px', textAlign: 'center' }}>
                <span style={{ width: '64px', height: '64px', borderRadius: '14px', background: '#fff', border: '1px solid rgba(14,20,22,.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 'none', overflow: 'hidden' }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={logoUrl(p.domain)} alt={`${p.name} logo`} width={44} height={44} loading="lazy" style={{ maxWidth: '44px', maxHeight: '44px', objectFit: 'contain' }} />
                </span>
                <span style={{ fontSize: '14px', fontWeight: 600, color: '#0E1416' }}>{p.name}</span>
                <span style={{ fontSize: '12px', color: '#16A34A', fontWeight: 600 }}>{t(locale, 'Visit site →', 'زيارة الموقع →')}</span>
              </a>
            ))}
          </div>
        </Wrap>
      </section>

      {/* PORTFOLIO BANNER */}
      <section style={{ background: '#0B5132' }}>
        <Wrap>
          <div style={{ padding: '30px 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '24px', flexWrap: 'wrap' }}>
            <div style={{ color: '#fff' }}>
              <div className="keep-serif" style={{ fontFamily: "'Newsreader',serif", fontSize: '24px', fontWeight: 500 }}>{t(locale, 'Have $10k+ to invest? See what a managed portfolio could return.', 'لديك 10 آلاف دولار أو أكثر؟ اكتشف عائد المحفظة المُدارة.')}</div>
              <div style={{ fontSize: '14px', color: '#A7D8BD', marginTop: '4px' }}>{t(locale, 'Free return calculator · PAMM/MAM comparison · No obligation', 'حاسبة عوائد مجانية · مقارنة PAMM/MAM · دون التزام')}</div>
            </div>
            <LinkBtn label={t(locale, 'Open the calculator', 'افتح الحاسبة')} to="portfolio" variant="light" />
          </div>
        </Wrap>
      </section>

      {/* PROTECT YOUR MONEY */}
      <section style={{ padding: '78px 0' }}>
        <Wrap>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '56px', alignItems: 'center' }}>
            <div>
              <Eyebrow label={t(locale, 'PROTECT YOUR MONEY', 'احمِ أموالك')} color="#C0392B" />
              <h2 className="keep-serif" style={{ fontFamily: "'Newsreader',serif", fontWeight: 500, fontSize: '40px', lineHeight: 1.1, letterSpacing: '-.01em', margin: '18px 0 18px', color: '#0E1416' }}>{t(locale, 'Scams cost MENA traders millions every year. We make them visible.', 'يكلّف الاحتيال متداولي المنطقة الملايين سنويًا. نحن نكشفه.')}</h2>
              <p style={{ fontSize: '16px', lineHeight: 1.65, color: '#42505A', margin: '0 0 26px' }}>{t(locale, 'Our analysts cross-check every license against FCA, CySEC, DFSA and SCA registers, monitor regulator blacklists, and document complaints. If a broker is unsafe, you’ll know before you deposit.', 'يتحقق محلّلونا من كل ترخيص عبر سجلات FCA وCySEC وDFSA وSCA، ويراقبون القوائم السوداء، ويوثّقون الشكاوى. إذا كان الوسيط غير آمن، ستعرف قبل أن تودع.')}</p>
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                <LinkBtn label={t(locale, 'Browse scam alerts', 'تصفّح تحذيرات الاحتيال')} to="scam-alerts" variant="dark" />
                <LinkBtn label={t(locale, 'How to spot a scam', 'كيف تكتشف الاحتيال')} to="article" param="spot-forex-scam-2026" variant="ghost" />
              </div>
            </div>
            <div style={{ background: '#fff', border: '1px solid rgba(14,20,22,.10)', borderRadius: '16px', overflow: 'hidden' }}>
              <div style={{ padding: '16px 20px', borderBottom: '1px solid rgba(14,20,22,.08)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '13px', fontWeight: 700, color: '#0E1416' }}>{t(locale, 'Recent scam alerts', 'أحدث تحذيرات الاحتيال')}</span>
                <span style={{ fontSize: '11px', fontWeight: 600, color: '#C0392B', background: 'rgba(192,57,43,.10)', padding: '4px 9px', borderRadius: '5px' }}>{t(locale, 'LIVE', 'مباشر')}</span>
              </div>
              {scams(locale).slice(0, 4).map((s) => (
                <Link key={s.slug} href={href('scam-alert', s.slug)} className="am-row" style={{ display: 'flex', alignItems: 'center', gap: '13px', padding: '15px 20px', borderBottom: '1px solid rgba(14,20,22,.06)' }}>
                  <span style={{ width: '34px', height: '34px', borderRadius: '8px', background: 'rgba(192,57,43,.10)', color: '#C0392B', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '17px', fontWeight: 700, flex: 'none' }}>!</span>
                  <span style={{ flex: 1, minWidth: 0 }}>
                    <span style={{ display: 'block', fontSize: '14px', fontWeight: 600, color: '#0E1416' }}>{s.name}</span>
                    <span style={{ display: 'block', fontSize: '12px', color: '#5A6670', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{scamWhy(locale, s)}</span>
                  </span>
                  <span style={{ fontSize: '11px', fontWeight: 600, color: '#C0392B', whiteSpace: 'nowrap' }}>{scamVerdict(locale, s)}</span>
                </Link>
              ))}
            </div>
          </div>
        </Wrap>
      </section>

      {/* TRUSTED BROKERS GRID */}
      <section style={{ padding: '0 0 78px' }}>
        <Wrap>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '30px', flexWrap: 'wrap', gap: '16px' }}>
            <div>
              <Eyebrow label={t(locale, 'THE RATINGS', 'التصنيفات')} />
              <h2 className="keep-serif" style={{ fontFamily: "'Newsreader',serif", fontWeight: 500, fontSize: '40px', letterSpacing: '-.01em', margin: '16px 0 0', color: '#0E1416' }}>{t(locale, 'Top-rated regulated brokers', 'أعلى الوسطاء المرخّصين تقييمًا')}</h2>
            </div>
            <LinkBtn label={t(locale, 'View all 158 reviews', 'عرض كل المراجعات')} to="reviews" variant="ghost" />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '20px' }}>
            {feat.map((b) => <BrokerCard key={b.slug} b={b} locale={locale} />)}
          </div>
        </Wrap>
      </section>

      {/* TESTIMONIALS */}
      <section style={{ background: '#F2F0EA', padding: '72px 0' }}>
        <Wrap>
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <div style={{ display: 'flex', justifyContent: 'center' }}><Eyebrow label={t(locale, 'FROM REAL TRADERS', 'من متداولين حقيقيين')} /></div>
            <h2 className="keep-serif" style={{ fontFamily: "'Newsreader',serif", fontWeight: 500, fontSize: '36px', margin: '14px 0 0', color: '#0E1416' }}>{t(locale, 'Trusted where it matters most', 'موثوق حيث يهم الأمر أكثر')}</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '20px' }}>
            {testi.map((tt, i) => (
              <div key={i} style={{ background: '#fff', border: '1px solid rgba(14,20,22,.08)', borderRadius: '14px', padding: '26px' }}>
                <div style={{ display: 'flex', gap: '2px', marginBottom: '14px' }}>{[0, 1, 2, 3, 4].map((j) => <span key={j} style={{ color: '#16A34A', fontSize: '15px' }}>★</span>)}</div>
                <p className="keep-serif" style={{ fontFamily: "'Newsreader',serif", fontSize: '18px', lineHeight: 1.5, color: '#1A2227', margin: '0 0 18px' }}>{tt[0]}</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ width: '36px', height: '36px', borderRadius: '50%', background: '#0E1416', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px', fontWeight: 600 }}>{tt[1][0]}</span>
                  <div>
                    <div style={{ fontSize: '13.5px', fontWeight: 600, color: '#0E1416' }}>{tt[1]}</div>
                    <div style={{ fontSize: '12px', color: '#5A6670' }}>{tt[2]}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Wrap>
      </section>

      {/* SIGNALS BLOCK */}
      <section style={{ background: '#0E1416', color: '#fff', padding: '70px 0' }}>
        <Wrap>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '56px', alignItems: 'center' }}>
            <div>
              <Eyebrow label={t(locale, 'FREE TRADING SIGNALS', 'توصيات تداول مجانية')} color="#6EE7A0" />
              <h2 className="keep-serif" style={{ fontFamily: "'Newsreader',serif", fontWeight: 500, fontSize: '38px', letterSpacing: '-.01em', margin: '16px 0 16px' }}>{t(locale, 'Daily signals, straight to Telegram', 'توصيات يومية مباشرة على تيليجرام')}</h2>
              <p style={{ fontSize: '16px', lineHeight: 1.6, color: '#B9C1C6', margin: '0 0 26px' }}>{t(locale, 'FX, gold and crypto setups with clear entry, target and stop levels — published by our analysts and free to join.', 'إعدادات للفوركس والذهب والعملات الرقمية بنقاط دخول وهدف ووقف واضحة — ينشرها محلّلونا والانضمام مجاني.')}</p>
              <LinkBtn label={t(locale, 'Get free signals', 'احصل على التوصيات')} to="signals" variant="primary" />
            </div>
            <div style={{ background: 'rgba(255,255,255,.04)', border: '1px solid rgba(255,255,255,.12)', borderRadius: '16px', overflow: 'hidden' }}>
              {SIGNALS.slice(0, 4).map((s) => (
                <div key={s.pair} style={{ display: 'flex', alignItems: 'center', gap: '14px', padding: '15px 20px', borderBottom: '1px solid rgba(255,255,255,.08)' }}>
                  <span style={{ fontSize: '11px', fontWeight: 700, padding: '4px 9px', borderRadius: '5px', background: s.dir === 'BUY' ? 'rgba(22,163,74,.18)' : 'rgba(192,57,43,.18)', color: s.dir === 'BUY' ? '#6EE7A0' : '#F09B8F' }}>{s.dir}</span>
                  <span style={{ flex: 1, fontFamily: "'IBM Plex Mono',monospace", fontSize: '14px', fontWeight: 600, color: '#fff' }}>{s.pair}</span>
                  <span style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: '12.5px', color: '#8A949A' }}>{'@ ' + s.entry}</span>
                  <span style={{ fontSize: '11px', color: s.status === 'Active' ? '#6EE7A0' : '#8A949A' }}>{s.status}</span>
                </div>
              ))}
            </div>
          </div>
        </Wrap>
      </section>

      {/* ARTICLES PREVIEW */}
      <section style={{ padding: '78px 0' }}>
        <Wrap>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '30px', flexWrap: 'wrap', gap: '16px' }}>
            <div>
              <Eyebrow label={t(locale, 'LEARN', 'تعلّم')} />
              <h2 className="keep-serif" style={{ fontFamily: "'Newsreader',serif", fontWeight: 500, fontSize: '40px', letterSpacing: '-.01em', margin: '16px 0 0', color: '#0E1416' }}>{t(locale, 'Expert-reviewed guides', 'أدلة يراجعها الخبراء')}</h2>
            </div>
            <LinkBtn label={t(locale, 'All articles', 'كل المقالات')} to="articles" variant="ghost" />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '20px' }}>
            {articles(locale).slice(0, 3).map((a) => <ArticleCard key={a.slug} a={a} locale={locale} />)}
          </div>
        </Wrap>
      </section>

      {/* METHODOLOGY TEASER */}
      <section style={{ background: '#F2F0EA', padding: '70px 0' }}>
        <Wrap>
          <div style={{ display: 'grid', gridTemplateColumns: '.9fr 1.1fr', gap: '56px', alignItems: 'center' }}>
            <div>
              <Eyebrow label={t(locale, 'HOW WE SCORE', 'كيف نقيّم')} />
              <h2 className="keep-serif" style={{ fontFamily: "'Newsreader',serif", fontWeight: 500, fontSize: '36px', letterSpacing: '-.01em', margin: '16px 0 16px', color: '#0E1416' }}>{t(locale, 'A score you can actually audit', 'تقييم يمكنك تدقيقه فعلًا')}</h2>
              <p style={{ fontSize: '16px', lineHeight: 1.65, color: '#42505A', margin: '0 0 24px' }}>{t(locale, 'Every broker is rated 0–5 across six weighted pillars. The weights are published, the sources are cited, and affiliate relationships are disclosed on every page.', 'يُقيَّم كل وسيط من 0 إلى 5 عبر ست ركائز موزونة. الأوزان منشورة، والمصادر موثّقة، والعلاقات الإعلانية مُفصح عنها في كل صفحة.')}</p>
              <LinkBtn label={t(locale, 'Read our methodology', 'اقرأ منهجيتنا')} to="principles" variant="dark" />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              {pillars.map((p) => (
                <div key={p[0]} style={{ background: '#fff', border: '1px solid rgba(14,20,22,.08)', borderRadius: '12px', padding: '16px 18px' }}>
                  <div style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: '22px', fontWeight: 600, color: '#16A34A' }}><CountUp value={p[1]} /></div>
                  <div style={{ fontSize: '13px', color: '#42505A', marginTop: '3px' }}>{p[0]}</div>
                </div>
              ))}
            </div>
          </div>
        </Wrap>
      </section>

      {/* IMPORTANT LINKS */}
      <section style={{ padding: '70px 0' }}>
        <Wrap>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '40px' }}>
            <div>
              <div style={{ fontSize: '12px', letterSpacing: '.14em', color: '#5A6670', fontWeight: 700, marginBottom: '16px' }}>{t(locale, 'BEST BROKERS BY COUNTRY', 'أفضل الوسطاء حسب الدولة')}</div>
              {linkCountries.map((c) => (
                <Link key={c[0]} href={href('best-country', c[0])} className="am-link" style={{ display: 'block', fontSize: '14.5px', color: '#1A2227', padding: '8px 0', borderBottom: '1px solid rgba(14,20,22,.07)' }}>{t(locale, 'Best brokers in ' + c[1], 'أفضل الوسطاء في ' + c[1])}</Link>
              ))}
            </div>
            <div>
              <div style={{ fontSize: '12px', letterSpacing: '.14em', color: '#5A6670', fontWeight: 700, marginBottom: '16px' }}>{t(locale, 'BEST BROKERS BY CATEGORY', 'أفضل الوسطاء حسب الفئة')}</div>
              {linkCats.map((c) => (
                <Link key={c[0]} href={href('best-category', c[0])} className="am-link" style={{ display: 'block', fontSize: '14.5px', color: '#1A2227', padding: '8px 0', borderBottom: '1px solid rgba(14,20,22,.07)' }}>{c[1]}</Link>
              ))}
            </div>
            <div>
              <div style={{ fontSize: '12px', letterSpacing: '.14em', color: '#5A6670', fontWeight: 700, marginBottom: '16px' }}>{t(locale, 'TOP-RATED BROKERS', 'الوسطاء الأعلى تقييمًا')}</div>
              {bs.slice(0, 6).map((b) => (
                <Link key={b.slug} href={href('review', b.slug)} className="am-link" style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14.5px', color: '#1A2227', padding: '8px 0', borderBottom: '1px solid rgba(14,20,22,.07)' }}>
                  <span>{b.name}</span>
                  <span style={{ fontFamily: "'IBM Plex Mono',monospace", color: b.tone.hex, fontWeight: 600 }}>{b.scoreStr}</span>
                </Link>
              ))}
            </div>
          </div>
        </Wrap>
      </section>
    </div>
  );
}
