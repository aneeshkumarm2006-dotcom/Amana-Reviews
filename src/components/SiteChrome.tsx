'use client';

import { useEffect, useState, type ReactNode, type CSSProperties } from 'react';
import { Link, usePathname } from '@/i18n/routing';
import { href, type RouteName } from '@/lib/routes';
import { t, loc, type Locale } from '@/lib/i18n';
import { brokers } from '@/data/brokers';
import { scams } from '@/data/scams';
import { articles } from '@/data/articles';
import { predictions } from '@/data/predictions';
import { COUNTRIES, CATEGORIES, countryName } from '@/data/taxonomy';

type MenuKey = 'ratings' | 'best' | 'articles' | 'predictions' | 'services';

export default function SiteChrome({ locale, children }: { locale: Locale; children: ReactNode }) {
  const [menu, setMenu] = useState<MenuKey | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState('');
  const pathname = usePathname();
  const ar = locale === 'ar';

  // close menus on route change
  useEffect(() => {
    setMenu(null);
    setSearchOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSearchOpen(false);
        setMenu(null);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const navItems: { key: MenuKey; label: string }[] = [
    { key: 'ratings', label: t(locale, 'Ratings', 'التصنيفات') },
    { key: 'best', label: t(locale, 'Best Brokers', 'أفضل الوسطاء') },
    { key: 'articles', label: t(locale, 'Articles', 'المقالات') },
    { key: 'predictions', label: t(locale, 'Predictions', 'التوقعات') },
    { key: 'services', label: t(locale, 'Services', 'الخدمات') },
  ];

  return (
    <div dir={ar ? 'rtl' : 'ltr'} style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* RISK STRIP */}
      <div style={{ background: '#0E1416', color: '#C7CDD1', fontSize: '11.5px', letterSpacing: '.02em' }}>
        <div style={{ maxWidth: '1240px', margin: '0 auto', padding: '7px 28px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '9px', minWidth: 0 }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#C8860D', flex: 'none', animation: 'amPulse 2.4s infinite' }} />
            <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {t(locale, 'Risk warning: 74–89% of retail investor accounts lose money trading CFDs. Trade only with capital you can afford to lose.', 'تحذير المخاطر: 74–89% من حسابات المستثمرين الأفراد تخسر المال عند تداول العقود مقابل الفروقات. تداول فقط بما يمكنك تحمل خسارته.')}
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '18px', flex: 'none' }}>
            <Link href={href('principles')} style={{ color: '#C7CDD1' }}>{t(locale, 'Methodology', 'المنهجية')}</Link>
            <div style={{ display: 'flex', alignItems: 'center', gap: '7px', fontFamily: "'IBM Plex Mono',monospace" }}>
              <Link href={pathname} locale="en" style={{ color: ar ? 'rgba(255,255,255,.5)' : '#fff', fontWeight: 600 }}>EN</Link>
              <span style={{ opacity: 0.4 }}>/</span>
              <Link href={pathname} locale="ar" style={{ color: ar ? '#fff' : 'rgba(255,255,255,.5)', fontWeight: 600 }}>ع</Link>
            </div>
          </div>
        </div>
      </div>

      {/* HEADER */}
      <header onMouseLeave={() => setMenu(null)} style={{ position: 'sticky', top: 0, zIndex: 60, background: 'rgba(251,250,247,.92)', backdropFilter: 'saturate(1.4) blur(10px)', borderBottom: '1px solid rgba(14,20,22,.10)' }}>
        <div style={{ maxWidth: '1240px', margin: '0 auto', padding: '0 28px', height: '72px', display: 'flex', alignItems: 'center', gap: '30px' }}>
          <Link href={href('home')} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ width: '30px', height: '30px', borderRadius: '6px', background: '#0E1416', display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 'none' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M12 2l8 3v6c0 4.5-3.2 8.4-8 11-4.8-2.6-8-6.5-8-11V5l8-3z" fill="#16A34A" /><path d="M8.5 12l2.4 2.4L16 9.3" stroke="#0E1416" strokeWidth={2.1} strokeLinecap="round" strokeLinejoin="round" /></svg>
            </span>
            <span style={{ display: 'flex', flexDirection: 'column', lineHeight: 1 }}>
              <span className="keep-serif" style={{ fontFamily: "'Newsreader',serif", fontWeight: 600, fontSize: '22px', letterSpacing: '.01em', color: '#0E1416' }}>Amana</span>
              <span style={{ fontSize: '9.5px', letterSpacing: '.22em', color: '#5A6670', fontWeight: 600, marginTop: '2px' }}>{t(locale, 'BROKER TRUST INDEX', 'مؤشر الثقة بالوسطاء')}</span>
            </span>
          </Link>

          <nav style={{ display: 'flex', alignItems: 'center', gap: '2px', marginInlineStart: '6px' }}>
            {navItems.map((item) => (
              <button key={item.key} onMouseEnter={() => setMenu(item.key)} onClick={() => setMenu((m) => (m === item.key ? null : item.key))} className="am-menu-link" style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '14px', fontWeight: 600, color: menu === item.key ? '#16A34A' : '#1A2227', padding: '9px 13px', borderRadius: '6px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                {item.label}
                <span style={{ fontSize: '9px', opacity: 0.5, marginTop: '1px' }}>▾</span>
              </button>
            ))}
          </nav>

          <div style={{ marginInlineStart: 'auto', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button onClick={() => { setSearchOpen(true); setQuery(''); }} aria-label="Search" style={{ width: '40px', height: '40px', borderRadius: '8px', border: '1px solid rgba(14,20,22,.14)', background: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none"><circle cx="11" cy="11" r="7" stroke="#1A2227" strokeWidth={2} /><path d="M16.5 16.5L21 21" stroke="#1A2227" strokeWidth={2} strokeLinecap="round" /></svg>
            </button>
            <Link href={href('detector')} className="am-btn" style={{ background: '#0E1416', color: '#fff', fontSize: '13.5px', fontWeight: 600, padding: '11px 17px', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none"><path d="M12 3l7 2.5v5.5c0 4-2.8 7.4-7 9.5-4.2-2.1-7-5.5-7-9.5V5.5L12 3z" stroke="#16A34A" strokeWidth={2} strokeLinejoin="round" /></svg>
              {t(locale, 'Scam Detector', 'كاشف الاحتيال')}
            </Link>
          </div>
        </div>

        {menu && (
          <div style={{ position: 'absolute', left: 0, right: 0, top: '72px', background: '#fff', borderBottom: '1px solid rgba(14,20,22,.12)', boxShadow: '0 24px 48px -24px rgba(14,20,22,.30)', animation: 'amPanel .22s ease both' }}>
            <div style={{ maxWidth: '1240px', margin: '0 auto', padding: '30px 28px 36px' }}>
              <MegaPanel which={menu} locale={locale} onNav={() => setMenu(null)} />
            </div>
          </div>
        )}
      </header>

      {/* SEARCH OVERLAY */}
      {searchOpen && (
        <div onClick={() => setSearchOpen(false)} style={{ position: 'fixed', inset: 0, zIndex: 90, background: 'rgba(14,20,22,.55)', backdropFilter: 'blur(3px)', animation: 'amFade .18s ease both', display: 'flex', justifyContent: 'center', alignItems: 'flex-start', paddingTop: '96px' }}>
          <div onClick={(e) => e.stopPropagation()} style={{ width: 'min(680px,92vw)', background: '#fff', borderRadius: '14px', boxShadow: '0 30px 80px -20px rgba(0,0,0,.5)', overflow: 'hidden', animation: 'amRise .22s ease both' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '18px 22px', borderBottom: '1px solid rgba(14,20,22,.10)' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><circle cx="11" cy="11" r="7" stroke="#5A6670" strokeWidth={2} /><path d="M16.5 16.5L21 21" stroke="#5A6670" strokeWidth={2} strokeLinecap="round" /></svg>
              <input autoFocus value={query} onChange={(e) => setQuery(e.target.value)} placeholder={t(locale, 'Search brokers, scam alerts, articles…', 'ابحث عن وسطاء وتحذيرات ومقالات…')} style={{ flex: 1, border: 'none', outline: 'none', fontSize: '18px', color: '#0E1416' }} />
              <kbd style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: '11px', color: '#5A6670', border: '1px solid rgba(14,20,22,.16)', borderRadius: '5px', padding: '3px 7px' }}>ESC</kbd>
            </div>
            <div className="am-scroll" style={{ maxHeight: '52vh', overflow: 'auto', padding: '8px' }}>
              <SearchResults query={query} locale={locale} />
            </div>
          </div>
        </div>
      )}

      <main style={{ flex: 1 }}>{children}</main>

      <SiteFooter locale={locale} />
    </div>
  );
}

// ---------- Mega menu panels ----------
function MenuCol({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div>
      <div style={{ fontSize: '11px', letterSpacing: '.16em', color: '#5A6670', fontWeight: 700, marginBottom: '14px' }}>{title}</div>
      {children}
    </div>
  );
}

function MenuLink({ label, to, param, sub, onNav }: { label: string; to: RouteName; param?: string; sub?: string; onNav: () => void }) {
  return (
    <Link href={href(to, param)} onClick={onNav} className="am-menu-link" style={{ display: 'flex', flexDirection: 'column', gap: '2px', padding: '8px 0' }}>
      <span style={{ fontSize: '14px', fontWeight: 600, color: '#1A2227' }}>{label}</span>
      {sub && <span style={{ fontSize: '12px', color: '#5A6670' }}>{sub}</span>}
    </Link>
  );
}

function MegaPanel({ which, locale, onNav }: { which: MenuKey; locale: Locale; onNav: () => void }) {
  if (which === 'ratings') {
    const feat = brokers(locale).slice(0, 8);
    return (
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px 40px' }}>
        <div style={{ gridColumn: '1 / -1', display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '4px' }}>
          <div className="keep-serif" style={{ fontFamily: "'Newsreader',serif", fontSize: '19px', color: '#0E1416' }}>{t(locale, 'Featured ratings', 'تصنيفات مختارة')}</div>
          <Link href={href('reviews')} onClick={onNav} style={{ fontSize: '13px', fontWeight: 600, color: '#16A34A' }}>{t(locale, 'All ratings →', 'كل التصنيفات →')}</Link>
        </div>
        {feat.map((b) => (
          <Link key={b.slug} href={href('review', b.slug)} onClick={onNav} className="am-row" style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '9px 10px', borderRadius: '8px' }}>
            <span style={{ width: '34px', height: '34px', borderRadius: '7px', background: '#0E1416', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 700, fontFamily: "'IBM Plex Mono',monospace", flex: 'none' }}>{b.logo}</span>
            <span style={{ flex: 1, minWidth: 0 }}>
              <span style={{ display: 'block', fontSize: '14px', fontWeight: 600, color: '#1A2227' }}>{b.name}</span>
              <span style={{ display: 'block', fontSize: '12px', color: '#5A6670' }}>{b.regLabel}</span>
            </span>
            <span style={{ fontFamily: "'IBM Plex Mono',monospace", fontWeight: 600, fontSize: '13px', color: b.tone.hex }}>{b.scoreStr}</span>
          </Link>
        ))}
      </div>
    );
  }
  if (which === 'best') {
    return (
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px' }}>
        <MenuCol title={t(locale, 'By country', 'حسب الدولة')}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 24px' }}>
            {COUNTRIES.slice(0, 14).map((c) => (
              <MenuLink key={c[0]} label={t(locale, 'Best brokers in ' + c[1], 'أفضل الوسطاء في ' + c[2])} to="best-country" param={c[0]} onNav={onNav} />
            ))}
          </div>
        </MenuCol>
        <MenuCol title={t(locale, 'By category', 'حسب الفئة')}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 24px' }}>
            {CATEGORIES.slice(0, 12).map((c) => (
              <MenuLink key={c[0]} label={locale === 'ar' ? c[2] : c[1]} to="best-category" param={c[0]} onNav={onNav} />
            ))}
          </div>
        </MenuCol>
      </div>
    );
  }
  if (which === 'articles') {
    return (
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '40px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4px 30px' }}>
          {articles(locale).slice(0, 6).map((a) => (
            <MenuLink key={a.slug} label={loc(locale, a, 'title')} to="article" param={a.slug} sub={loc(locale, a, 'cat') + ' · ' + a.read} onNav={onNav} />
          ))}
        </div>
        <MenuCol title={t(locale, 'BROWSE', 'تصفّح')}>
          <MenuLink label={t(locale, 'All articles', 'كل المقالات')} to="articles" onNav={onNav} />
          <MenuLink label={t(locale, 'Scam alerts', 'تحذيرات الاحتيال')} to="scam-alerts" onNav={onNav} />
          <MenuLink label={t(locale, 'Methodology', 'المنهجية')} to="principles" onNav={onNav} />
        </MenuCol>
      </div>
    );
  }
  if (which === 'predictions') {
    return (
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4px 40px' }}>
        {predictions(locale).map((p) => (
          <MenuLink key={p.slug} label={loc(locale, p, 'title')} to="prediction" param={p.slug} sub={p.ticker + ' · ' + t(locale, 'target', 'الهدف') + ' ' + p.target} onNav={onNav} />
        ))}
      </div>
    );
  }
  // services
  const svc: { to: RouteName; title: string; desc: string }[] = [
    { to: 'portfolio', title: t(locale, 'Portfolio Management', 'إدارة المحافظ'), desc: t(locale, 'Return calculator, PAMM/MAM comparison and a managed-account consultation.', 'حاسبة العوائد، ومقارنة PAMM/MAM، واستشارة حساب مُدار.') },
    { to: 'signals', title: t(locale, 'Free Trading Signals', 'توصيات تداول مجانية'), desc: t(locale, 'Daily FX, gold and crypto signals with entry, target and stop levels.', 'توصيات يومية للفوركس والذهب والعملات الرقمية بنقاط دخول وهدف ووقف.') },
    { to: 'detector', title: t(locale, 'Scam Detector', 'كاشف الاحتيال'), desc: t(locale, 'Check any broker name against our scam and licensed-broker database.', 'تحقّق من أي اسم وسيط في قاعدة بيانات الاحتيال والوسطاء المرخّصين.') },
  ];
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '30px' }}>
      {svc.map((s) => (
        <Link key={s.to} href={href(s.to)} onClick={onNav}>
          <div style={{ fontSize: '15px', fontWeight: 700, color: '#0E1416', marginBottom: '5px' }}>{s.title}</div>
          <div style={{ fontSize: '13px', color: '#5A6670', lineHeight: 1.5 }}>{s.desc}</div>
        </Link>
      ))}
    </div>
  );
}

// ---------- Search ----------
function SearchResults({ query, locale }: { query: string; locale: Locale }) {
  const q = query.trim().toLowerCase();
  const muted: CSSProperties = { padding: '18px 16px', fontSize: '13px', color: '#5A6670' };
  if (!q) return <div style={muted}>{t(locale, 'Try "NorthCap", "FXVantix", "Islamic account", or a country…', 'جرّب "NorthCap" أو "FXVantix" أو "حساب إسلامي" أو اسم دولة…')}</div>;
  const bm = brokers(locale).filter((b) => b.name.toLowerCase().includes(q));
  const sm = scams(locale).filter((s) => s.name.toLowerCase().includes(q));
  const am = articles(locale).filter((a) => a.title.toLowerCase().includes(q));
  if (!bm.length && !sm.length && !am.length) return <div style={muted}>{t(locale, 'No matches for “', 'لا توجد نتائج لـ “') + query + '”.'}</div>;

  const Row = ({ logo, title, sub, to, param, tone }: { logo: string; title: string; sub: string; to: RouteName; param: string; tone?: string }) => (
    <Link href={href(to, param)} className="am-row" style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '11px 14px', borderRadius: '10px' }}>
      <span style={{ width: '32px', height: '32px', borderRadius: '7px', background: tone || '#0E1416', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 700, flex: 'none' }}>{logo}</span>
      <span style={{ flex: 1, minWidth: 0 }}>
        <span style={{ display: 'block', fontSize: '14px', fontWeight: 600, color: '#1A2227' }}>{title}</span>
        <span style={{ display: 'block', fontSize: '12px', color: '#5A6670' }}>{sub}</span>
      </span>
      <span style={{ color: '#9BA4AA', fontSize: '14px' }}>→</span>
    </Link>
  );
  const Head = ({ children }: { children: ReactNode }) => (
    <div style={{ fontSize: '11px', letterSpacing: '.14em', color: '#5A6670', fontWeight: 700, padding: '10px 14px 4px' }}>{children}</div>
  );

  return (
    <>
      {bm.length > 0 && <Head>{t(locale, 'BROKERS', 'الوسطاء')}</Head>}
      {bm.map((b) => <Row key={b.slug} logo={b.logo} title={b.name} sub={b.regLabel + ' · ' + b.scoreStr + '/5'} to="review" param={b.slug} tone={b.tone.hex} />)}
      {sm.length > 0 && <Head>{t(locale, 'SCAM ALERTS', 'تحذيرات الاحتيال')}</Head>}
      {sm.map((s) => <Row key={s.slug} logo="!" title={s.name} sub={loc(locale, s, 'verdict') + ' · ' + loc(locale, s, 'country')} to="scam-alert" param={s.slug} tone="#C0392B" />)}
      {am.length > 0 && <Head>{t(locale, 'ARTICLES', 'المقالات')}</Head>}
      {am.map((a) => <Row key={a.slug} logo="¶" title={loc(locale, a, 'title')} sub={loc(locale, a, 'cat') + ' · ' + a.read} to="article" param={a.slug} tone="#5A6670" />)}
    </>
  );
}

// ---------- Footer ----------
function SiteFooter({ locale }: { locale: Locale }) {
  const top = brokers(locale).slice(0, 5);
  const platform: { label: string; to: RouteName }[] = [
    { label: t(locale, 'All broker reviews', 'جميع مراجعات الوسطاء'), to: 'reviews' },
    { label: t(locale, 'Scam alerts', 'تحذيرات الاحتيال'), to: 'scam-alerts' },
    { label: t(locale, 'Scam Detector', 'كاشف الاحتيال'), to: 'detector' },
    { label: t(locale, 'Articles', 'المقالات'), to: 'articles' },
    { label: t(locale, 'Methodology', 'المنهجية'), to: 'principles' },
    { label: t(locale, 'Our team', 'فريقنا'), to: 'authors' },
  ];
  const countries = ['saudi-arabia', 'uae', 'egypt', 'qatar', 'uk', 'kuwait'];

  return (
    <footer style={{ background: '#0E1416', color: '#9BA4AA', marginTop: 'auto' }}>
      <div style={{ maxWidth: '1240px', margin: '0 auto', padding: '56px 28px 30px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr 1fr 1fr', gap: '40px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
              <span style={{ width: '28px', height: '28px', borderRadius: '6px', background: '#16A34A', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none"><path d="M8.5 12l2.4 2.4L16 9.3" stroke="#0E1416" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round" /></svg>
              </span>
              <span className="keep-serif" style={{ fontFamily: "'Newsreader',serif", fontWeight: 600, fontSize: '21px', color: '#fff' }}>Amana</span>
            </div>
            <p style={{ fontSize: '13px', lineHeight: 1.6, maxWidth: '300px', margin: '0 0 18px' }}>{t(locale, 'Independent broker ratings and scam intelligence for MENA and global traders. Trade with confidence.', 'تصنيفات مستقلة للوسطاء ورصد للاحتيال لمتداولي الشرق الأوسط والعالم. تداول بثقة.')}</p>
            <div style={{ display: 'flex', gap: '9px' }}>
              {['in', 'X', 'tg'].map((s) => (
                <span key={s} style={{ width: '34px', height: '34px', borderRadius: '8px', border: '1px solid rgba(255,255,255,.14)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', color: '#C7CDD1' }}>{s}</span>
              ))}
            </div>
          </div>
          <FooterCol title={t(locale, 'PLATFORM', 'المنصة')}>
            {platform.map((l) => (
              <Link key={l.to} href={href(l.to)} className="am-link" style={{ display: 'block', fontSize: '13.5px', padding: '6px 0', color: '#C7CDD1' }}>{l.label}</Link>
            ))}
          </FooterCol>
          <FooterCol title={t(locale, 'TOP-RATED', 'الأعلى تقييمًا')}>
            {top.map((b) => (
              <Link key={b.slug} href={href('review', b.slug)} className="am-link" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px', fontSize: '13.5px', padding: '6px 0', color: '#C7CDD1' }}>
                <span>{b.name}</span>
                <span style={{ fontFamily: "'IBM Plex Mono',monospace", color: '#16A34A', fontSize: '12px' }}>{b.scoreStr}</span>
              </Link>
            ))}
          </FooterCol>
          <FooterCol title={t(locale, 'BY COUNTRY', 'حسب الدولة')}>
            {countries.map((c) => (
              <Link key={c} href={href('best-country', c)} className="am-link" style={{ display: 'block', fontSize: '13.5px', padding: '6px 0', color: '#C7CDD1' }}>{t(locale, 'Best brokers in ' + countryName('en', c), 'أفضل الوسطاء في ' + countryName('ar', c))}</Link>
            ))}
          </FooterCol>
        </div>

        <div style={{ marginTop: '40px', padding: '22px 0 0', borderTop: '1px solid rgba(255,255,255,.10)', fontSize: '12px', lineHeight: 1.7, color: '#6B747A' }}>
          <strong style={{ color: '#9BA4AA' }}>{t(locale, 'Advertiser disclosure.', 'إفصاح إعلاني.')}</strong> {t(locale, 'Amana is reader-supported. We may earn a commission when you open an account through links on our site, at no cost to you. Commissions never influence our editorial scores, which follow a published', 'تعتمد أمانة على دعم القراء. قد نحصل على عمولة عند فتح حساب عبر روابط موقعنا، دون أي تكلفة عليك. ولا تؤثر العمولات أبدًا على تقييماتنا التحريرية، التي تتبع')} <Link href={href('principles')} style={{ color: '#16A34A' }}>{t(locale, 'methodology', 'منهجية منشورة')}</Link>{t(locale, '. Trading involves substantial risk of loss. Broker names and data shown in this prototype are illustrative.', '. ينطوي التداول على مخاطر خسارة كبيرة. أسماء الوسطاء والبيانات المعروضة في هذا النموذج توضيحية.')}
        </div>

        <div style={{ marginTop: '18px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px', fontSize: '12px', color: '#6B747A' }}>
          <span>{t(locale, '© 2026 Amana — a Davnoot product. All rights reserved.', '© 2026 أمانة — منتج من Davnoot. جميع الحقوق محفوظة.')}</span>
          <div style={{ display: 'flex', gap: '18px' }}>
            <Link href={href('contact')}>{t(locale, 'Contact', 'تواصل')}</Link>
            <span>{t(locale, 'Terms', 'الشروط')}</span>
            <span>{t(locale, 'Privacy', 'الخصوصية')}</span>
            <Link href={href('sitemap')}>{t(locale, 'Sitemap', 'خريطة الموقع')}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div>
      <div style={{ fontSize: '11px', letterSpacing: '.16em', color: '#6B747A', fontWeight: 700, marginBottom: '14px' }}>{title}</div>
      {children}
    </div>
  );
}
