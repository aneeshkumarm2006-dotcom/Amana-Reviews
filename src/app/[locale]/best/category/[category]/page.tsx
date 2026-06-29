import { setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';
import { t, type Locale } from '@/lib/i18n';
import { brokers } from '@/data/brokers';
import { CATEGORIES, categoryName } from '@/data/taxonomy';
import { routing } from '@/i18n/routing';
import { Ranking } from '@/components/blocks';

export function generateStaticParams() {
  return routing.locales.flatMap((locale) => CATEGORIES.map((c) => ({ locale, category: c[0] })));
}

export async function generateMetadata({ params }: { params: { locale: string; category: string } }): Promise<Metadata> {
  const locale = params.locale as Locale;
  const name = categoryName(locale, params.category);
  return {
    title: t(locale, `Best brokers for ${name.toLowerCase()} (2026)`, `أفضل الوسطاء لـ${name} (2026)`),
    description: t(locale, `The brokers that do ${name.toLowerCase()} best — independently scored and regulation-verified.`, `الوسطاء الأفضل في ${name} — مُقيَّمون بشكل مستقل ومُتحقَّق من تراخيصهم.`),
    alternates: { canonical: `/${locale}/best/category/${params.category}` },
  };
}

export default function BestCategoryPage({ params }: { params: { locale: string; category: string } }) {
  const locale = params.locale as Locale;
  setRequestLocale(locale);
  const name = categoryName(locale, params.category);

  let list = brokers(locale).filter((b) => b.cats.includes(params.category));
  if (list.length < 4) list = brokers(locale).slice(0, 6);
  list = list.slice().sort((a, b) => b.score - a.score);

  const nameLower = name.toLowerCase();
  const faqs: [string, string][] = [
    [t(locale, `What makes a good ${nameLower} broker?`, `ما الذي يجعل وسيط ${name} جيدًا؟`), t(locale, 'Beyond the headline feature, regulation and execution quality matter most. Every broker here is licensed and tested with a live account.', 'إلى جانب الميزة الأساسية، يبقى التنظيم وجودة التنفيذ الأهم. كل وسيط هنا مرخّص ومُختبَر بحساب حقيقي.')],
    [t(locale, 'Which is the best overall?', 'أيها الأفضل إجمالًا؟'), t(locale, `${list[0].name} tops this category with a score of ${list[0].scoreStr}/5.`, `يتصدّر ${list[0].name} هذه الفئة بتقييم ${list[0].scoreStr}/5.`)],
    [t(locale, 'Are these brokers regulated?', 'هل هؤلاء الوسطاء مرخّصون؟'), t(locale, 'Yes. We exclude any broker without verifiable regulation from the top of our category rankings.', 'نعم. نستبعد أي وسيط بلا تنظيم يمكن التحقق منه من أعلى ترتيبات الفئة.')],
    [t(locale, 'Can beginners use these brokers?', 'هل يمكن للمبتدئين استخدام هؤلاء الوسطاء؟'), t(locale, 'Most offer demo accounts and low minimums, making them suitable for beginners as well as experienced traders.', 'يقدّم معظمهم حسابات تجريبية وحدودًا دنيا منخفضة، مما يجعلهم مناسبين للمبتدئين والمحترفين.')],
  ];

  return (
    <Ranking
      locale={locale}
      crumbs={[{ label: t(locale, 'Home', 'الرئيسية'), to: 'home' }, { label: t(locale, 'Best brokers', 'أفضل الوسطاء'), to: 'reviews' }, { label: name }]}
      eyebrow={t(locale, 'BEST FOR · ' + name.toUpperCase(), 'الأفضل لـ · ' + name)}
      title={t(locale, `Best brokers for ${nameLower} (2026)`, `أفضل الوسطاء لـ${name} (2026)`)}
      sub={t(locale, `The brokers that do ${nameLower} best — independently scored and regulation-verified by our analysts.`, `الوسطاء الأفضل في ${name} — مُقيَّمون بشكل مستقل ومُتحقَّق من تراخيصهم من قِبل محلّلينا.`)}
      intro={t(locale, `We compared every broker in our database on ${nameLower} and ranked the ${list.length} strongest below, weighted by our overall methodology score.`, `قارنّا كل وسيط في قاعدة بياناتنا في ${name} ورتّبنا الأقوى (${list.length}) أدناه، وفق تقييم منهجيتنا العام.`)}
      list={list}
      faqs={faqs}
    />
  );
}
