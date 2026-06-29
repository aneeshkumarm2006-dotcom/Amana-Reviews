import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { t, type Locale } from '@/lib/i18n';
import { articles } from '@/data/articles';
import { Wrap, ArticleCard } from '@/components/ui';
import { PageHead } from '@/components/blocks';

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const locale = params.locale as Locale;
  return {
    title: t(locale, 'Articles & trading guides', 'مقالات وأدلة التداول'),
    description: t(locale, 'Expert-reviewed education on brokers, regulation and trading costs.', 'تعليم يراجعه الخبراء حول الوسطاء والتنظيم وتكاليف التداول.'),
    alternates: { canonical: `/${locale}/articles` },
  };
}

export default function ArticlesPage({ params }: { params: { locale: string } }) {
  const locale = params.locale as Locale;
  setRequestLocale(locale);
  return (
    <div>
      <PageHead
        locale={locale}
        crumbs={[{ label: t(locale, 'Home', 'الرئيسية'), to: 'home' }, { label: t(locale, 'Articles', 'المقالات') }]}
        eyebrow={t(locale, 'LEARN', 'تعلّم')}
        title={t(locale, 'Articles & guides', 'مقالات وأدلة')}
        sub={t(locale, 'Expert-reviewed education on brokers, regulation, trading costs and staying safe — written by our analysts and fact-checked before publishing.', 'تعليم يراجعه الخبراء حول الوسطاء والتنظيم وتكاليف التداول والبقاء آمنًا — يكتبه محلّلونا ويُدقَّق قبل النشر.')}
      />
      <section style={{ padding: '40px 0 70px' }}>
        <Wrap>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '22px' }}>
            {articles(locale).map((a) => <ArticleCard key={a.slug} a={a} locale={locale} />)}
          </div>
        </Wrap>
      </section>
    </div>
  );
}
