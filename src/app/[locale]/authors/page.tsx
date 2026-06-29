import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import { href } from '@/lib/routes';
import { t, loc, type Locale } from '@/lib/i18n';
import { AUTHORS, authorName, authorRole, authorBio, authorCreds } from '@/data/authors';
import { Wrap } from '@/components/ui';
import { PageHead } from '@/components/blocks';

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const locale = params.locale as Locale;
  return {
    title: t(locale, 'Our team of analysts', 'فريق المحلّلين لدينا'),
    description: t(locale, 'Named, credentialed experts behind every Amana rating and article.', 'خبراء معروفون ومؤهّلون خلف كل تقييم ومقال في أمانة.'),
    alternates: { canonical: `/${locale}/authors` },
  };
}

export default function AuthorsPage({ params }: { params: { locale: string } }) {
  const locale = params.locale as Locale;
  setRequestLocale(locale);
  return (
    <div>
      <PageHead
        locale={locale}
        crumbs={[{ label: t(locale, 'Home', 'الرئيسية'), to: 'home' }, { label: t(locale, 'Our team', 'فريقنا') }]}
        eyebrow={t(locale, 'EXPERTISE & TRUST', 'الخبرة والثقة')}
        title={t(locale, 'Meet the analysts', 'تعرّف على المحلّلين')}
        sub={t(locale, 'Every rating and article on Amana is produced by named, credentialed experts and independently fact-checked. This is who stands behind our work.', 'كل تقييم ومقال في أمانة يُنتجه خبراء معروفون ومؤهّلون ويُدقَّق بشكل مستقل. هؤلاء من يقف خلف عملنا.')}
      />
      <section style={{ padding: '40px 0 70px' }}>
        <Wrap>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '22px' }}>
            {AUTHORS.map((a) => (
              <Link key={a.slug} href={href('author', a.slug)} className="am-card" style={{ display: 'block', background: '#fff', border: '1px solid rgba(14,20,22,.10)', borderRadius: '16px', padding: '26px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '16px' }}>
                  <span style={{ width: '58px', height: '58px', borderRadius: '50%', background: '#0E1416', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '19px', fontWeight: 600, flex: 'none' }}>{a.init}</span>
                  <div>
                    <div className="keep-serif" style={{ fontFamily: "'Newsreader',serif", fontSize: '21px', color: '#0E1416' }}>{authorName(locale, a)}</div>
                    <div style={{ fontSize: '13px', color: '#16A34A', fontWeight: 600 }}>{authorRole(locale, a)}</div>
                  </div>
                </div>
                <p style={{ fontSize: '14px', lineHeight: 1.6, color: '#42505A', margin: '0 0 16px' }}>{authorBio(locale, a)}</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '7px' }}>
                  {authorCreds(locale, a).map((c) => <span key={c} style={{ fontSize: '11.5px', color: '#5A6670', background: '#F2F0EA', padding: '5px 10px', borderRadius: '5px' }}>{c}</span>)}
                </div>
              </Link>
            ))}
          </div>
        </Wrap>
      </section>
    </div>
  );
}
