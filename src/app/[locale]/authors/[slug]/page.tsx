import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import { href } from '@/lib/routes';
import { t, loc, type Locale } from '@/lib/i18n';
import { routing } from '@/i18n/routing';
import { AUTHORS, authorBySlug, authorName, authorRole, authorBio, authorCreds } from '@/data/authors';
import { articles, articleTitle, articleCat, articleDate } from '@/data/articles';
import { Wrap, Crumb } from '@/components/ui';
import { H2 } from '@/components/blocks';

export function generateStaticParams() {
  return routing.locales.flatMap((locale) => AUTHORS.map((a) => ({ locale, slug: a.slug })));
}

export async function generateMetadata({ params }: { params: { locale: string; slug: string } }): Promise<Metadata> {
  const locale = params.locale as Locale;
  const a = authorBySlug(params.slug);
  return { title: `${authorName(locale, a)} — ${authorRole(locale, a)}`, description: authorBio(locale, a), alternates: { canonical: `/${locale}/authors/${a.slug}` } };
}

export default function AuthorPage({ params }: { params: { locale: string; slug: string } }) {
  const locale = params.locale as Locale;
  setRequestLocale(locale);
  const a = authorBySlug(params.slug);
  const name = authorName(locale, a);
  const first = name.split(' ')[0];
  const wrote = articles(locale).filter((x, i) => x.author === a.slug || i < 2).slice(0, 3);

  return (
    <div>
      <section style={{ background: '#0E1416', color: '#fff' }}>
        <Wrap>
          <div style={{ padding: '30px 0 36px' }}>
            <div style={{ marginBottom: '22px' }}>
              <Crumb items={[{ label: t(locale, 'Home', 'الرئيسية'), to: 'home' }, { label: t(locale, 'Team', 'الفريق'), to: 'authors' }, { label: name }]} />
            </div>
            <div style={{ display: 'flex', gap: '22px', alignItems: 'center' }}>
              <span style={{ width: '82px', height: '82px', borderRadius: '50%', background: '#16A34A', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '30px', fontWeight: 600, flex: 'none' }}>{a.init}</span>
              <div>
                <h1 className="keep-serif" style={{ fontFamily: "'Newsreader',serif", fontWeight: 500, fontSize: '40px', margin: '0 0 6px' }}>{name}</h1>
                <div style={{ fontSize: '16px', color: '#6EE7A0', fontWeight: 600 }}>{authorRole(locale, a)}</div>
              </div>
            </div>
          </div>
        </Wrap>
      </section>
      <section style={{ padding: '40px 0 70px' }}>
        <Wrap>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '48px', alignItems: 'start', maxWidth: '1000px' }}>
            <div>
              <H2>{t(locale, 'About ' + first, 'عن ' + first)}</H2>
              <p style={{ fontSize: '16.5px', lineHeight: 1.75, color: '#33414B', margin: '0 0 16px' }}>{authorBio(locale, a)}</p>
              <p style={{ fontSize: '16.5px', lineHeight: 1.75, color: '#33414B', margin: '0 0 30px' }}>{t(locale, `${first} applies a regulation-first framework to every assessment, prioritising client-fund safety and verifiable licensing above marketing claims. All work is independently reviewed before publication.`, `يطبّق ${first} إطارًا يبدأ بالتنظيم في كل تقييم، مع إعطاء الأولوية لأمان أموال العملاء والتراخيص القابلة للتحقق فوق الادعاءات التسويقية. وتُراجَع كل الأعمال بشكل مستقل قبل النشر.`)}</p>
              <H2>{t(locale, 'Recent work', 'أعمال حديثة')}</H2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {wrote.map((w) => (
                  <Link key={w.slug} href={href('article', w.slug)} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '14px', background: '#fff', border: '1px solid rgba(14,20,22,.10)', borderRadius: '12px', padding: '16px 18px' }}>
                    <span>
                      <span style={{ display: 'block', fontSize: '15px', fontWeight: 600, color: '#0E1416' }}>{articleTitle(locale, w)}</span>
                      <span style={{ display: 'block', fontSize: '12.5px', color: '#5A6670', marginTop: '2px' }}>{articleCat(locale, w) + ' · ' + articleDate(locale, w)}</span>
                    </span>
                    <span style={{ color: '#9BA4AA' }}>→</span>
                  </Link>
                ))}
              </div>
            </div>
            <div style={{ background: '#fff', border: '1px solid rgba(14,20,22,.10)', borderRadius: '16px', padding: '22px' }}>
              <div style={{ fontSize: '12px', letterSpacing: '.12em', color: '#5A6670', fontWeight: 700, marginBottom: '14px' }}>{t(locale, 'CREDENTIALS', 'المؤهّلات')}</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {authorCreds(locale, a).map((c) => <div key={c} style={{ display: 'flex', gap: '9px', fontSize: '14px', color: '#1A2227' }}><span style={{ color: '#16A34A' }}>✓</span>{c}</div>)}
              </div>
            </div>
          </div>
        </Wrap>
      </section>
    </div>
  );
}
