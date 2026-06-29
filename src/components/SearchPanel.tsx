'use client';

import { useState, type ReactNode } from 'react';
import { Link } from '@/i18n/routing';
import { href, type RouteName } from '@/lib/routes';
import { t, loc, type Locale } from '@/lib/i18n';
import { brokers } from '@/data/brokers';
import { scams } from '@/data/scams';
import { articles } from '@/data/articles';

export default function SearchPanel({ locale, initialQuery = '' }: { locale: Locale; initialQuery?: string }) {
  const [query, setQuery] = useState(initialQuery);
  const q = query.trim().toLowerCase();

  const bm = q ? brokers(locale).filter((b) => b.name.toLowerCase().includes(q)) : [];
  const sm = q ? scams(locale).filter((s) => s.name.toLowerCase().includes(q)) : [];
  const am = q ? articles(locale).filter((a) => a.title.toLowerCase().includes(q)) : [];
  const empty = q && !bm.length && !sm.length && !am.length;

  const Row = ({ logo, title, sub, to, param, tone }: { logo: string; title: string; sub: string; to: RouteName; param: string; tone?: string }) => (
    <Link href={href(to, param)} className="am-row" style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '13px 14px', borderRadius: '10px', border: '1px solid rgba(14,20,22,.08)', background: '#fff', marginBottom: '8px' }}>
      <span style={{ width: '34px', height: '34px', borderRadius: '8px', background: tone || '#0E1416', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 700, flex: 'none' }}>{logo}</span>
      <span style={{ flex: 1, minWidth: 0 }}>
        <span style={{ display: 'block', fontSize: '14px', fontWeight: 600, color: '#1A2227' }}>{title}</span>
        <span style={{ display: 'block', fontSize: '12px', color: '#5A6670' }}>{sub}</span>
      </span>
      <span style={{ color: '#9BA4AA', fontSize: '14px' }}>→</span>
    </Link>
  );
  const Head = ({ children }: { children: ReactNode }) => (
    <div style={{ fontSize: '11px', letterSpacing: '.14em', color: '#5A6670', fontWeight: 700, padding: '14px 2px 8px' }}>{children}</div>
  );

  return (
    <div style={{ maxWidth: '720px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '4px 16px', border: '1.5px solid rgba(14,20,22,.16)', borderRadius: '12px', background: '#fff', marginBottom: '8px' }}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><circle cx="11" cy="11" r="7" stroke="#5A6670" strokeWidth={2} /><path d="M16.5 16.5L21 21" stroke="#5A6670" strokeWidth={2} strokeLinecap="round" /></svg>
        <input autoFocus value={query} onChange={(e) => setQuery(e.target.value)} placeholder={t(locale, 'Search brokers, scam alerts, articles…', 'ابحث عن وسطاء وتحذيرات ومقالات…')} style={{ flex: 1, border: 'none', outline: 'none', fontSize: '17px', color: '#0E1416', padding: '14px 0', background: 'transparent' }} />
      </div>

      {!q && <div style={{ padding: '18px 2px', fontSize: '14px', color: '#5A6670' }}>{t(locale, 'Try "NorthCap", "FXVantix", "Islamic account", or a country…', 'جرّب "NorthCap" أو "FXVantix" أو "حساب إسلامي" أو اسم دولة…')}</div>}
      {empty && <div style={{ padding: '18px 2px', fontSize: '14px', color: '#5A6670' }}>{t(locale, 'No matches for “', 'لا توجد نتائج لـ “') + query + '”.'}</div>}

      {bm.length > 0 && <Head>{t(locale, 'BROKERS', 'الوسطاء')}</Head>}
      {bm.map((b) => <Row key={b.slug} logo={b.logo} title={b.name} sub={b.regLabel + ' · ' + b.scoreStr + '/5'} to="review" param={b.slug} tone={b.tone.hex} />)}
      {sm.length > 0 && <Head>{t(locale, 'SCAM ALERTS', 'تحذيرات الاحتيال')}</Head>}
      {sm.map((s) => <Row key={s.slug} logo="!" title={s.name} sub={loc(locale, s, 'verdict') + ' · ' + loc(locale, s, 'country')} to="scam-alert" param={s.slug} tone="#C0392B" />)}
      {am.length > 0 && <Head>{t(locale, 'ARTICLES', 'المقالات')}</Head>}
      {am.map((a) => <Row key={a.slug} logo="¶" title={loc(locale, a, 'title')} sub={loc(locale, a, 'cat') + ' · ' + a.read} to="article" param={a.slug} tone="#5A6670" />)}
    </div>
  );
}
