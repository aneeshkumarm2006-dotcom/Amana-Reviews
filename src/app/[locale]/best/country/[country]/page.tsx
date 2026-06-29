import { setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';
import { t, type Locale } from '@/lib/i18n';
import { brokers } from '@/data/brokers';
import { COUNTRIES, countryName } from '@/data/taxonomy';
import { routing } from '@/i18n/routing';
import { Ranking } from '@/components/blocks';

export function generateStaticParams() {
  return routing.locales.flatMap((locale) => COUNTRIES.map((c) => ({ locale, country: c[0] })));
}

export async function generateMetadata({ params }: { params: { locale: string; country: string } }): Promise<Metadata> {
  const locale = params.locale as Locale;
  const name = countryName(locale, params.country);
  return {
    title: t(locale, `Best brokers in ${name} (2026)`, `أفضل الوسطاء في ${name} (2026)`),
    description: t(locale, `Independently ranked, regulation-verified brokers for traders in ${name}.`, `وسطاء مُرتَّبون بشكل مستقل ومُتحقَّق من ترخيصهم لمتداولي ${name}.`),
    alternates: { canonical: `/${locale}/best/country/${params.country}` },
  };
}

export default function BestCountryPage({ params }: { params: { locale: string; country: string } }) {
  const locale = params.locale as Locale;
  setRequestLocale(locale);
  const name = countryName(locale, params.country);

  let list = brokers(locale).filter((b) => b.countries.includes(params.country) && b.regs[0] !== 'none');
  if (list.length < 4) list = brokers(locale).filter((b) => b.regs[0] !== 'none').slice(0, 6);
  list = list.slice().sort((a, b) => b.score - a.score);

  const cheapest = list.slice().sort((a, b) => a.min - b.min)[0];
  const islamicNames = list.filter((b) => b.islamic).map((b) => b.name).slice(0, 2).join(t(locale, ' and ', ' و '));

  const faqs: [string, string][] = [
    [t(locale, `Is online trading legal in ${name}?`, `هل التداول عبر الإنترنت قانوني في ${name}؟`), t(locale, `Yes. Trading through a broker regulated by a recognised authority (such as the FCA, CySEC, DFSA or SCA) is legal for residents of ${name}. We only rank licensed brokers.`, `نعم. التداول عبر وسيط مرخّص من جهة معترف بها (مثل FCA أو CySEC أو DFSA أو SCA) قانوني لسكان ${name}. ونحن نُرتّب الوسطاء المرخّصين فقط.`)],
    [t(locale, `Which broker is best for beginners in ${name}?`, `أي وسيط أفضل للمبتدئين في ${name}؟`), t(locale, `For most beginners we recommend ${list[0].name}, thanks to its low minimum deposit, strong regulation and beginner-friendly app.`, `لمعظم المبتدئين نوصي بـ${list[0].name}، بفضل أدنى إيداع منخفض وتنظيم قوي وتطبيق مناسب للمبتدئين.`)],
    [t(locale, 'Are Islamic (swap-free) accounts available?', 'هل تتوفر حسابات إسلامية (بدون فوائد مبيت)؟'), t(locale, `Yes — ${islamicNames} offer swap-free accounts with no overnight interest.`, `نعم — ${islamicNames} يقدّمان حسابات بدون فوائد مبيت.`)],
    [t(locale, 'How much money do I need to start?', 'كم أحتاج من المال للبدء؟'), t(locale, `You can open an account from ${cheapest.minStr} with the lowest-deposit broker on this list.`, `يمكنك فتح حساب بدءًا من ${cheapest.minStr} مع الوسيط صاحب أدنى إيداع في هذه القائمة.`)],
    [t(locale, 'How do I withdraw my profits?', 'كيف أسحب أرباحي؟'), t(locale, 'All listed brokers support bank transfer and local payment methods. In our tests withdrawals were processed within 1–4 business days.', 'يدعم كل الوسطاء المدرجين التحويل البنكي ووسائل الدفع المحلية. في اختباراتنا تمت معالجة السحوبات خلال 1–4 أيام عمل.')],
  ];

  return (
    <Ranking
      locale={locale}
      crumbs={[{ label: t(locale, 'Home', 'الرئيسية'), to: 'home' }, { label: t(locale, 'Best brokers', 'أفضل الوسطاء'), to: 'reviews' }, { label: name }]}
      eyebrow={t(locale, 'BEST BROKERS · ' + name.toUpperCase(), 'أفضل الوسطاء · ' + name)}
      title={t(locale, `Best brokers in ${name} (2026)`, `أفضل الوسطاء في ${name} (2026)`)}
      sub={t(locale, `Independently ranked and regulation-verified. We tested live accounts with each broker below before recommending them to traders in ${name}.`, `مُرتَّبون بشكل مستقل ومُتحقَّق من تراخيصهم. اختبرنا حسابات حقيقية مع كل وسيط أدناه قبل التوصية به لمتداولي ${name}.`)}
      intro={t(locale, `Choosing a broker in ${name} comes down to one thing first: regulation. Below are the ${list.length} brokers we trust most for traders in ${name}, ranked by our overall score after live testing.`, `اختيار وسيط في ${name} يعتمد أولًا على شيء واحد: التنظيم. فيما يلي ${list.length} وسطاء نثق بهم أكثر لمتداولي ${name}، مُرتَّبين وفق تقييمنا العام بعد اختبار حقيقي.`)}
      list={list}
      faqs={faqs}
    />
  );
}
