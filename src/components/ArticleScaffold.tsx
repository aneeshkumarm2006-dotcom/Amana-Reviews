import type { ReactNode } from 'react';
import { Link } from '@/i18n/routing';
import { href } from '@/lib/routes';
import { t, loc, type Locale } from '@/lib/i18n';
import { AUTHORS, authorBySlug } from '@/data/authors';
import { brokers } from '@/data/brokers';
import { Wrap, Crumb, type CrumbItem } from './ui';
import { H2, Byline } from './blocks';
import Faq from './Faq';

export interface ArticleScaffoldProps {
  locale: Locale;
  crumbs: CrumbItem[];
  tag: string;
  title: string;
  date: string;
  read: string;
  authorSlug: string;
  sections: [string, string[]][];
  faqs: [string, string][];
  relatedTitle: string;
  relatedCards: ReactNode;
}

export default function ArticleScaffold({ locale, crumbs, tag, title, date, read, authorSlug, sections, faqs, relatedTitle, relatedCards }: ArticleScaffoldProps) {
  const au = authorBySlug(authorSlug);
  const rv = AUTHORS[2];
  const recBroker = brokers(locale)[0];
  const toc = sections.map((s) => s[0]);

  return (
    <div>
      <section style={{ background: '#fff', borderBottom: '1px solid rgba(14,20,22,.10)' }}>
        <Wrap>
          <div style={{ padding: '26px 0 34px', maxWidth: '820px' }}>
            <div style={{ marginBottom: '20px' }}><Crumb items={crumbs} /></div>
            <div style={{ display: 'flex', gap: '10px', marginBottom: '16px' }}>
              <span style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '.08em', color: '#0E7A43', background: 'rgba(22,163,74,.10)', padding: '5px 11px', borderRadius: '5px' }}>{tag.toUpperCase()}</span>
            </div>
            <h1 className="keep-serif" style={{ fontFamily: "'Newsreader',serif", fontWeight: 500, fontSize: '44px', letterSpacing: '-.015em', lineHeight: 1.1, margin: '0 0 20px', color: '#0E1416' }}>{title}</h1>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '13px', color: '#5A6670', flexWrap: 'wrap' }}>
              <span style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#0E1416', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 600 }}>{au.init}</span>
              <span>{t(locale, 'By ', 'بقلم ')}<strong style={{ color: '#0E1416' }}>{loc(locale, au, 'name')}</strong></span>
              <span style={{ color: '#C2C9CD' }}>·</span>
              <span>{t(locale, 'Reviewed by ', 'مراجعة ') + loc(locale, rv, 'name')}</span>
              <span style={{ color: '#C2C9CD' }}>·</span>
              <span>{date}</span>
              <span style={{ color: '#C2C9CD' }}>·</span>
              <span>{read}</span>
            </div>
          </div>
        </Wrap>
      </section>

      <section style={{ padding: '40px 0 70px' }}>
        <Wrap>
          <div style={{ display: 'grid', gridTemplateColumns: '220px 1fr', gap: '48px', alignItems: 'start', maxWidth: '1000px' }}>
            <div style={{ position: 'sticky', top: '92px' }}>
              <div style={{ fontSize: '11px', letterSpacing: '.12em', color: '#5A6670', fontWeight: 700, marginBottom: '14px' }}>{t(locale, 'CONTENTS', 'المحتويات')}</div>
              {toc.map((tc, i) => (
                <div key={i} style={{ padding: '8px 0', borderInlineStart: '2px solid ' + (i === 0 ? '#16A34A' : 'rgba(14,20,22,.12)'), paddingInlineStart: '14px', fontSize: '13.5px', color: '#42505A' }}>{tc}</div>
              ))}
              <div style={{ marginTop: '22px', padding: '18px', background: '#0B5132', borderRadius: '12px' }}>
                <div style={{ color: '#A7D8BD', fontSize: '12px', marginBottom: '8px' }}>{t(locale, 'Need advice?', 'تحتاج استشارة؟')}</div>
                <div style={{ color: '#fff', fontSize: '14px', fontWeight: 600, marginBottom: '12px', lineHeight: 1.4 }}>{t(locale, 'Talk to an analyst on WhatsApp', 'تحدّث مع محلّل على واتساب')}</div>
                <Link href={href('contact')} style={{ display: 'block', textAlign: 'center', background: '#16A34A', color: '#fff', borderRadius: '8px', padding: '10px', fontSize: '13px', fontWeight: 600 }}>{t(locale, 'Start chat', 'ابدأ المحادثة')}</Link>
              </div>
            </div>

            <div>
              {sections.map((sec, i) => (
                <div key={i} style={{ marginBottom: '28px' }}>
                  <H2>{sec[0]}</H2>
                  {sec[1].map((p, j) => <p key={j} style={{ margin: '0 0 14px', fontSize: '16.5px', lineHeight: 1.75, color: '#33414B' }}>{p}</p>)}
                </div>
              ))}

              <div style={{ background: '#0E1416', borderRadius: '16px', padding: '24px', display: 'flex', alignItems: 'center', gap: '18px', margin: '10px 0 36px', flexWrap: 'wrap' }}>
                <span style={{ width: '48px', height: '48px', borderRadius: '11px', background: '#16A34A', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'IBM Plex Mono',monospace", fontWeight: 600, fontSize: '15px', flex: 'none' }}>{recBroker.logo}</span>
                <div style={{ flex: 1, minWidth: '180px' }}>
                  <div style={{ color: '#9BA4AA', fontSize: '12px' }}>{t(locale, 'Editor’s recommended broker', 'الوسيط الموصى به من المحرّر')}</div>
                  <div style={{ color: '#fff', fontSize: '17px', fontWeight: 700 }}>{recBroker.name + ' · ' + recBroker.scoreStr + '/5'}</div>
                </div>
                <Link href={href('review', recBroker.slug)} className="am-btn" style={{ background: '#16A34A', color: '#fff', borderRadius: '9px', padding: '12px 20px', fontSize: '14px', fontWeight: 600 }}>{t(locale, 'Read review →', 'اقرأ المراجعة →')}</Link>
              </div>

              <Faq faqs={faqs} locale={locale} />
              <Byline locale={locale} />

              <H2>{relatedTitle}</H2>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px' }}>{relatedCards}</div>
            </div>
          </div>
        </Wrap>
      </section>
    </div>
  );
}
