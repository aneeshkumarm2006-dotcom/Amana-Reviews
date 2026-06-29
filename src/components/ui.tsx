import type { CSSProperties, ReactNode } from 'react';
import { Link } from '@/i18n/routing';
import { href, type RouteName } from '@/lib/routes';
import { t, loc, type Locale } from '@/lib/i18n';
import type { Broker } from '@/data/brokers';
import { authorBySlug } from '@/data/authors';

export const WRAP = '1240px';

export function Wrap({
  children,
  max = 1240,
  style,
}: {
  children: ReactNode;
  max?: number;
  style?: CSSProperties;
}) {
  return (
    <div style={{ maxWidth: max + 'px', margin: '0 auto', padding: '0 28px', ...style }}>
      {children}
    </div>
  );
}

export function Eyebrow({ label, color = '#16A34A' }: { label: string; color?: string }) {
  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '9px', fontSize: '11.5px', letterSpacing: '.18em', fontWeight: 700, color }}>
      <span style={{ width: '22px', height: '1.5px', background: 'currentColor', display: 'inline-block' }} />
      {label}
    </div>
  );
}

type Variant = 'primary' | 'dark' | 'ghost' | 'light';
const btnBase: CSSProperties = { border: 'none', cursor: 'pointer', fontSize: '14px', fontWeight: 600, padding: '13px 22px', borderRadius: '9px', display: 'inline-flex', alignItems: 'center', gap: '9px' };
const btnStyles: Record<Variant, CSSProperties> = {
  primary: { ...btnBase, background: '#16A34A', color: '#fff' },
  dark: { ...btnBase, background: '#0E1416', color: '#fff' },
  ghost: { ...btnBase, background: '#fff', color: '#0E1416', border: '1px solid rgba(14,20,22,.16)' },
  light: { ...btnBase, background: 'rgba(255,255,255,.12)', color: '#fff', border: '1px solid rgba(255,255,255,.22)' },
};

export function LinkBtn({
  label,
  to,
  param,
  variant = 'primary',
  arrow = true,
}: {
  label: string;
  to: RouteName;
  param?: string;
  variant?: Variant;
  arrow?: boolean;
}) {
  return (
    <Link href={href(to, param)} className="am-btn" style={btnStyles[variant]}>
      {label}
      {arrow && <span style={{ fontSize: '15px', marginTop: '-1px' }}>→</span>}
    </Link>
  );
}

export function Badge({ b, size = 62 }: { b: Broker; size?: number }) {
  const sz = size;
  const r = (sz - 7) / 2;
  const c = 2 * Math.PI * r;
  const off = c * (1 - b.score / 5);
  return (
    <div style={{ position: 'relative', width: sz + 'px', height: sz + 'px', flex: 'none' }}>
      <svg width={sz} height={sz} viewBox={`0 0 ${sz} ${sz}`} style={{ transform: 'rotate(-90deg)' }}>
        <circle cx={sz / 2} cy={sz / 2} r={r} fill="none" stroke="rgba(14,20,22,.10)" strokeWidth={3.5} />
        <circle cx={sz / 2} cy={sz / 2} r={r} fill="none" stroke={b.tone.hex} strokeWidth={3.5} strokeLinecap="round" strokeDasharray={c} strokeDashoffset={off} />
      </svg>
      <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <span style={{ fontFamily: "'IBM Plex Mono',monospace", fontWeight: 600, fontSize: sz * 0.31 + 'px', color: '#0E1416', lineHeight: 1 }}>{b.scoreStr}</span>
        <span style={{ fontSize: sz * 0.135 + 'px', color: '#9BA4AA', fontWeight: 600 }}>/ 5</span>
      </div>
    </div>
  );
}

export function VerifiedTag({ regs }: { regs: string }) {
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', fontSize: '11px', fontWeight: 600, color: '#0E7A43', background: 'rgba(22,163,74,.10)', padding: '4px 9px', borderRadius: '5px' }}>
      <svg width={11} height={11} viewBox="0 0 24 24" fill="none">
        <path d="M12 2l8 3v6c0 4.5-3.2 8.4-8 11-4.8-2.6-8-6.5-8-11V5l8-3z" fill="#16A34A" />
        <path d="M8.5 12l2.4 2.4L16 9.3" stroke="#fff" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      {regs}
    </span>
  );
}

export function BrokerCard({ b, locale }: { b: Broker; locale: Locale }) {
  return (
    <div className="am-card" style={{ background: '#fff', border: '1px solid rgba(14,20,22,.10)', borderRadius: '14px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Link href={href('review', b.slug)} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', minWidth: 0 }}>
            <span style={{ width: '46px', height: '46px', borderRadius: '10px', background: '#0E1416', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'IBM Plex Mono',monospace", fontWeight: 600, fontSize: '15px', flex: 'none' }}>{b.logo}</span>
            <div style={{ minWidth: 0 }}>
              <div style={{ fontWeight: 700, fontSize: '16px', color: '#0E1416', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{b.name}</div>
              <div style={{ fontSize: '12.5px', color: '#5A6670', marginTop: '2px' }}>{b.regLabel}</div>
            </div>
          </div>
          <Badge b={b} size={52} />
        </div>
        <p style={{ margin: 0, fontSize: '13.5px', lineHeight: 1.55, color: '#42505A', fontFamily: "'Newsreader',serif" }}>{loc(locale, b, 'blurb')}</p>
        <div style={{ display: 'flex', gap: '18px', padding: '12px 0', borderTop: '1px solid rgba(14,20,22,.08)', borderBottom: '1px solid rgba(14,20,22,.08)' }}>
          <Stat label={t(locale, 'MIN DEPOSIT', 'أدنى إيداع')} value={b.minStr} mono />
          <Stat label={t(locale, 'SPREAD FROM', 'السبريد من')} value={b.spreadStr} mono />
          <Stat label={t(locale, 'ISLAMIC', 'إسلامي')} value={b.islamic ? t(locale, 'Yes', 'نعم') : t(locale, 'No', 'لا')} color={b.islamic ? '#0E7A43' : '#5A6670'} />
        </div>
      </Link>
      <div style={{ display: 'flex', gap: '10px' }}>
        <a href={`/go/${b.slug}`} rel="sponsored nofollow" className="am-btn" style={{ flex: 1, background: '#16A34A', color: '#fff', borderRadius: '8px', padding: '11px', fontSize: '13.5px', fontWeight: 600, textAlign: 'center' }}>{t(locale, 'Visit site', 'زيارة الموقع')}</a>
        <Link href={href('review', b.slug)} className="am-btn" style={{ flex: 1, background: '#fff', color: '#0E1416', border: '1px solid rgba(14,20,22,.16)', borderRadius: '8px', padding: '11px', fontSize: '13.5px', fontWeight: 600, textAlign: 'center' }}>{t(locale, 'Read review', 'اقرأ المراجعة')}</Link>
      </div>
    </div>
  );
}

function Stat({ label, value, mono, color = '#1A2227' }: { label: string; value: string; mono?: boolean; color?: string }) {
  return (
    <div>
      <div style={{ fontSize: '10.5px', letterSpacing: '.08em', color: '#9BA4AA', fontWeight: 600 }}>{label}</div>
      <div style={{ fontSize: '14px', fontWeight: 600, color, fontFamily: mono ? "'IBM Plex Mono',monospace" : undefined }}>{value}</div>
    </div>
  );
}

export interface CrumbItem {
  label: string;
  to?: RouteName;
  param?: string;
}

export function Crumb({ items }: { items: CrumbItem[] }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12.5px', color: '#5A6670', flexWrap: 'wrap' }}>
      {items.map((it, i) => {
        const last = i === items.length - 1;
        return (
          <span key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
            {it.to && !last ? (
              <Link href={href(it.to, it.param)} className="am-link" style={{ color: '#5A6670' }}>{it.label}</Link>
            ) : (
              <span style={{ color: '#0E1416', fontWeight: 600 }}>{it.label}</span>
            )}
            {!last && <span style={{ color: '#C2C9CD' }}>/</span>}
          </span>
        );
      })}
    </div>
  );
}

export function Disclosure({ locale }: { locale: Locale }) {
  return (
    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', background: 'rgba(200,134,13,.07)', border: '1px solid rgba(200,134,13,.22)', borderRadius: '10px', padding: '12px 15px', fontSize: '12.5px', color: '#7A5B0C', lineHeight: 1.5 }}>
      <svg width={16} height={16} viewBox="0 0 24 24" fill="none" style={{ flex: 'none', marginTop: '1px' }}>
        <circle cx={12} cy={12} r={9} stroke="#C8860D" strokeWidth={2} />
        <path d="M12 8v5M12 16.5v.01" stroke="#C8860D" strokeWidth={2} strokeLinecap="round" />
      </svg>
      <span>
        <strong>{t(locale, 'Advertiser disclosure. ', 'إفصاح إعلاني. ')}</strong>
        {t(locale, 'We may earn a commission if you open an account via links on this page. This never affects our editorial score, set by our published methodology.', 'قد نحصل على عمولة إذا فتحت حسابًا عبر روابط هذه الصفحة. ولا يؤثر ذلك أبدًا على تقييمنا التحريري المحدد وفق منهجيتنا المنشورة.')}
      </span>
    </div>
  );
}

export function ArticleCard({ a, locale }: { a: import('@/data/articles').Article; locale: Locale }) {
  const au = authorBySlug(a.author);
  return (
    <Link href={href('article', a.slug)} className="am-card" style={{ display: 'flex', flexDirection: 'column', background: '#fff', border: '1px solid rgba(14,20,22,.10)', borderRadius: '14px', overflow: 'hidden' }}>
      <div style={{ height: '150px', background: 'linear-gradient(135deg,#0E1416,#1d2b25)', position: 'relative', display: 'flex', alignItems: 'flex-end', padding: '16px' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(255,255,255,.05) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.05) 1px,transparent 1px)', backgroundSize: '30px 30px' }} />
        <span style={{ position: 'relative', fontSize: '11px', fontWeight: 700, letterSpacing: '.08em', color: '#0E1416', background: '#6EE7A0', padding: '5px 10px', borderRadius: '5px' }}>{loc(locale, a, 'cat').toUpperCase()}</span>
      </div>
      <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', flex: 1 }}>
        <h3 className="keep-serif" style={{ fontFamily: "'Newsreader',serif", fontWeight: 500, fontSize: '21px', lineHeight: 1.25, margin: '0 0 10px', color: '#0E1416' }}>{loc(locale, a, 'title')}</h3>
        <p style={{ fontSize: '13.5px', lineHeight: 1.55, color: '#5A6670', margin: '0 0 16px', flex: 1 }}>{loc(locale, a, 'excerpt')}</p>
        <div style={{ display: 'flex', alignItems: 'center', gap: '9px', fontSize: '12px', color: '#5A6670' }}>
          <span style={{ width: '24px', height: '24px', borderRadius: '50%', background: '#0E1416', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', fontWeight: 600 }}>{au.init}</span>
          <span>{loc(locale, au, 'name')}</span>
          <span style={{ color: '#C2C9CD' }}>·</span>
          <span>{loc(locale, a, 'date')}</span>
          <span style={{ color: '#C2C9CD' }}>·</span>
          <span>{loc(locale, a, 'read')}</span>
        </div>
      </div>
    </Link>
  );
}

export function PredCard({ p, locale }: { p: import('@/data/predictions').Prediction; locale: Locale }) {
  const bias = loc(locale, p, 'bias');
  const tone = p.bias === 'Bullish' ? '#16A34A' : p.bias === 'Bearish' ? '#C0392B' : '#C8860D';
  return (
    <Link href={href('prediction', p.slug)} className="am-card" style={{ display: 'flex', flexDirection: 'column', background: '#fff', border: '1px solid rgba(14,20,22,.10)', borderRadius: '14px', overflow: 'hidden' }}>
      <div style={{ padding: '18px 20px', borderBottom: '1px solid rgba(14,20,22,.07)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: '15px', fontWeight: 600, color: '#0E1416' }}>{p.ticker}</span>
        <span style={{ fontSize: '11px', fontWeight: 700, color: tone, background: tone + '1a', padding: '4px 10px', borderRadius: '5px' }}>{bias.toUpperCase()}</span>
      </div>
      <div style={{ padding: '18px 20px', flex: 1 }}>
        <h3 className="keep-serif" style={{ fontFamily: "'Newsreader',serif", fontWeight: 500, fontSize: '19px', lineHeight: 1.25, margin: '0 0 8px', color: '#0E1416' }}>{loc(locale, p, 'title')}</h3>
        <p style={{ fontSize: '13px', color: '#5A6670', lineHeight: 1.5, margin: 0 }}>{loc(locale, p, 'excerpt')}</p>
      </div>
      <div style={{ padding: '12px 20px', background: '#FBFAF7', display: 'flex', justifyContent: 'space-between', fontSize: '12px' }}>
        <span style={{ color: '#5A6670' }}>{t(locale, 'Target ', 'الهدف ')}<strong style={{ color: '#0E1416', fontFamily: "'IBM Plex Mono',monospace" }}>{p.target}</strong></span>
        <span style={{ color: '#9BA4AA' }}>{loc(locale, p, 'date')}</span>
      </div>
    </Link>
  );
}

/** Section heading with serif face (used across pages). */
export function SectionTitle({ children, style }: { children: ReactNode; style?: CSSProperties }) {
  return (
    <h2 className="keep-serif" style={{ fontFamily: "'Newsreader',serif", fontWeight: 600, color: '#0E1416', margin: 0, ...style }}>
      {children}
    </h2>
  );
}
