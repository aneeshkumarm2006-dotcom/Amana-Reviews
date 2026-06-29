import type { Locale } from '@/lib/i18n';
import { REG, regLabel } from './taxonomy';

export interface BrokerRaw {
  slug: string;
  name: string;
  score: number;
  regs: string[];
  min: number;
  spread: number;
  islamic: boolean;
  platforms: string[];
  founded: number;
  hq: string;
  hqAr: string;
  countries: string[];
  cats: string[];
  blurb: string;
  blurbAr: string;
}

export const BROKERS_RAW: BrokerRaw[] = [
  { slug: 'northcap', name: 'NorthCap Markets', score: 4.7, regs: ['FCA', 'CySEC', 'SCA'], min: 100, spread: 0.6, islamic: true, platforms: ['MT4', 'MT5', 'NorthCap App'], founded: 2009, hq: 'London, UK', hqAr: 'لندن، المملكة المتحدة', countries: ['saudi-arabia', 'uae', 'uk', 'europe'], cats: ['low-spread', 'islamic', 'metatrader', 'best-apps'], blurb: 'A heavyweight, multi-regulated broker with razor-thin spreads and a genuinely good mobile app.', blurbAr: 'وسيط ثقيل الوزن متعدد التراخيص، بسبريد بالغ الانخفاض وتطبيق محمول ممتاز فعلاً.' },
  { slug: 'equiti-prime', name: 'Equiti Prime', score: 4.5, regs: ['DFSA', 'SCA', 'CySEC'], min: 50, spread: 0.8, islamic: true, platforms: ['MT4', 'MT5'], founded: 2014, hq: 'Dubai, UAE', hqAr: 'دبي، الإمارات', countries: ['uae', 'saudi-arabia', 'jordan', 'kuwait'], cats: ['islamic', 'no-capital', 'metatrader'], blurb: 'The strongest pick for GCC traders who want local DFSA/SCA oversight and swap-free accounts.', blurbAr: 'الخيار الأقوى لمتداولي الخليج الباحثين عن رقابة محلية من DFSA/SCA وحسابات بدون فوائد مبيت.' },
  { slug: 'gulfstone', name: 'GulfStone Markets', score: 4.4, regs: ['CySEC', 'SCA'], min: 200, spread: 0.9, islamic: true, platforms: ['MT5', 'GulfStone Web'], founded: 2012, hq: 'Limassol, Cyprus', hqAr: 'ليماسول، قبرص', countries: ['saudi-arabia', 'qatar', 'bahrain', 'egypt'], cats: ['gold', 'commodities', 'islamic'], blurb: 'Specialists in gold and commodities with deep liquidity and reliable execution.', blurbAr: 'متخصصون في الذهب والسلع بسيولة عميقة وتنفيذ موثوق.' },
  { slug: 'atlas-securities', name: 'Atlas Securities', score: 4.2, regs: ['FCA', 'CySEC'], min: 250, spread: 1.1, islamic: false, platforms: ['Atlas Pro', 'MT5'], founded: 2007, hq: 'London, UK', hqAr: 'لندن، المملكة المتحدة', countries: ['uk', 'europe', 'germany'], cats: ['us-stocks', 'stocks-ownership', 'cfds'], blurb: 'Real share ownership and US-stock access on a clean proprietary desktop platform.', blurbAr: 'تملّك حقيقي للأسهم ووصول للأسهم الأمريكية عبر منصة سطح مكتب خاصة وأنيقة.' },
  { slug: 'menatrade', name: 'MenaTrade', score: 4.0, regs: ['SCA'], min: 100, spread: 1.0, islamic: true, platforms: ['MT4', 'MenaTrade App'], founded: 2016, hq: 'Abu Dhabi, UAE', hqAr: 'أبوظبي، الإمارات', countries: ['uae', 'oman', 'iraq', 'lebanon'], cats: ['islamic', 'best-apps', 'forex'], blurb: 'A capable regional broker with a polished app, held back by a single regulator.', blurbAr: 'وسيط إقليمي كفؤ بتطبيق متقن، يحدّ منه اعتماده على جهة تنظيمية واحدة.' },
  { slug: 'falcon-fx', name: 'Falcon FX', score: 3.8, regs: ['CySEC'], min: 10, spread: 0.9, islamic: true, platforms: ['MT4', 'MT5'], founded: 2018, hq: 'Limassol, Cyprus', hqAr: 'ليماسول، قبرص', countries: ['egypt', 'morocco', 'tunisia', 'algeria'], cats: ['no-capital', 'low-spread', 'copy-trading'], blurb: 'A $10 minimum and copy-trading make it beginner-friendly; support can be slow.', blurbAr: 'حد أدنى 10$ ونسخ تداول يجعلانه مناسباً للمبتدئين؛ لكن الدعم قد يكون بطيئاً.' },
  { slug: 'cedar-capital', name: 'Cedar Capital', score: 3.6, regs: ['DFSA'], min: 500, spread: 1.4, islamic: false, platforms: ['Cedar Terminal'], founded: 2011, hq: 'Dubai, UAE', hqAr: 'دبي، الإمارات', countries: ['uae', 'saudi-arabia'], cats: ['cfds', 'futures', 'commodities'], blurb: 'Built for higher-net-worth, active traders — premium tooling, premium minimums.', blurbAr: 'مصمّم للمتداولين النشطين وأصحاب الملاءة العالية — أدوات متميزة وحدود إيداع مرتفعة.' },
  { slug: 'solara-invest', name: 'Solara Invest', score: 3.3, regs: ['FSA'], min: 25, spread: 1.6, islamic: true, platforms: ['Solara App'], founded: 2020, hq: 'Mahé, Seychelles', hqAr: 'ماهي، سيشل', countries: ['egypt', 'jordan', 'iraq'], cats: ['no-capital', 'islamic', 'social-copy'], blurb: 'Slick app and low entry, but offshore-only regulation means weaker protection.', blurbAr: 'تطبيق أنيق وحد دخول منخفض، لكن التنظيم الخارجي فقط يعني حماية أضعف.' },
  { slug: 'dunes-trading', name: 'Dunes Trading', score: 2.9, regs: ['none'], min: 5, spread: 2.2, islamic: true, platforms: ['Dunes Web'], founded: 2021, hq: 'St. Vincent', hqAr: 'سانت فنسنت', countries: ['iraq', 'libya', 'yemen'], cats: ['no-capital'], blurb: 'Aggressive marketing and no real regulation. Proceed with extreme caution.', blurbAr: 'تسويق عدواني وغياب لتنظيم حقيقي. توخَّ أقصى درجات الحذر.' },
];

export interface BrokerTone {
  key: 'green' | 'amber' | 'red';
  hex: string;
  label: string;
}

export interface Broker extends BrokerRaw {
  logo: string;
  scoreStr: string;
  pct: string;
  tone: BrokerTone;
  regLabel: string;
  regsFull: string[];
  minStr: string;
  spreadStr: string;
  islamicStr: string;
  hqLoc: string;
  rank: number;
}

function tone(locale: Locale, s: number): BrokerTone {
  if (s >= 4) return { key: 'green', hex: '#16A34A', label: locale === 'ar' ? 'تقييم مرتفع' : 'Highly rated' };
  if (s >= 3.4) return { key: 'amber', hex: '#C8860D', label: locale === 'ar' ? 'متباين' : 'Mixed' };
  return { key: 'red', hex: '#C0392B', label: locale === 'ar' ? 'مخاطر عالية' : 'High risk' };
}

export function brokers(locale: Locale): Broker[] {
  const ar = locale === 'ar';
  return BROKERS_RAW.map((x, i) => ({
    ...x,
    logo: x.name.split(' ').map((w) => w[0]).join('').slice(0, 2).toUpperCase(),
    scoreStr: x.score.toFixed(1),
    pct: ((x.score / 5) * 100).toFixed(0) + '%',
    tone: tone(locale, x.score),
    regLabel: regLabel(locale, x.regs[0]),
    regsFull: x.regs.map((r) => regLabel(locale, r)),
    minStr: '$' + x.min.toLocaleString('en-US'),
    spreadStr: x.spread.toFixed(1) + (ar ? ' نقطة' : ' pips'),
    islamicStr: x.islamic ? (ar ? 'نعم — بدون فوائد مبيت' : 'Yes — swap-free') : (ar ? 'لا' : 'No'),
    hqLoc: ar ? x.hqAr || x.hq : x.hq,
    rank: i + 1,
  }));
}

export function brokerBySlug(locale: Locale, slug: string): Broker {
  return brokers(locale).find((b) => b.slug === slug) || brokers(locale)[0];
}

/** Cloaked affiliate destination for a broker slug. Replace with real partner URLs. */
export function affiliateUrl(slug: string): string {
  const exists = BROKERS_RAW.some((b) => b.slug === slug);
  // Placeholder destination — swap for the real affiliate link per broker.
  return exists ? `https://partners.amana.reviews/visit/${slug}` : 'https://amana.reviews';
}

// ---- Review-detail content generators (ported from prototype) ----

export function reviewSections(b: Broker): [string, string][] {
  return [
    ['Overview', `${b.name} is a ${b.regs[0] === 'none' ? 'offshore' : 'regulated'} broker founded in ${b.founded} and headquartered in ${b.hq}. ${b.blurb} Our analysts opened a live account, deposited funds, placed trades across asset classes and tested a full withdrawal cycle before scoring.`],
    ['Commissions & spreads', `Spreads on the standard account start from ${b.spread.toFixed(1)} pips on EUR/USD. There are no deposit fees; inactivity and withdrawal fees are clearly disclosed. Overall costs land ${b.score >= 4.2 ? 'well below' : 'around'} the industry median.`],
    ['Security & regulation', `${b.name} is overseen by ${b.regs.map((r) => REG[r]).join(', ')}. ${b.regs[0] === 'none' ? 'Client funds are not held under a tier-1 regulator, which materially weakens protection.' : 'Client funds are held in segregated accounts and negative-balance protection applies.'}`],
    ['Deposits & withdrawals', `Funding is available via bank transfer, cards and local e-wallets. In our test, a withdrawal request was processed in ${b.score >= 4 ? 'under 24 hours' : '2–4 business days'} with no unexpected fees.`],
    ['Account opening', `Onboarding is fully digital and takes about ${b.score >= 4 ? '10 minutes' : 'a day'} including KYC. ${b.islamic ? 'A swap-free (Islamic) account is available on request.' : 'No swap-free account is offered.'}`],
    ['Mobile app', `The mobile experience is ${b.score >= 4.2 ? 'excellent — fast, stable and feature-complete' : b.score >= 3.6 ? 'solid for everyday trading' : 'basic and occasionally unstable'}, with biometric login and price alerts.`],
    ['Financial instruments', `You can trade ${b.cats.includes('us-stocks') ? 'real stocks, ' : ''}forex, indices, commodities${b.cats.includes('gold') ? ' (with a strong gold offering)' : ''} and major cryptocurrencies as CFDs.`],
  ];
}

export function brokerPros(b: Broker): string[] {
  return [
    `${b.regs[0] === 'none' ? 'Very low' : 'Multi-regulated'} — ${b.regsFull.slice(0, 2).join(' & ')}`,
    `Low minimum deposit of ${b.minStr}`,
    `Spreads from ${b.spreadStr}`,
    b.islamic ? 'Swap-free Islamic account available' : 'Real-share ownership available',
    `Platforms: ${b.platforms.join(', ')}`,
  ];
}

export function brokerCons(b: Broker): string[] {
  return [
    b.regs.length < 2 ? 'Single regulator — less redundancy' : 'Inactivity fee after 6 months',
    b.regs[0] === 'none' ? 'Offshore regulation — weak protection' : 'Limited educational content',
    b.score < 3.6 ? 'Customer support can be slow' : 'No fixed-spread accounts',
  ];
}

export function brokerFaqs(b: Broker): [string, string][] {
  return [
    [`Is ${b.name} a scam?`, `No. ${b.name} is a ${b.regs[0] === 'none' ? 'real but offshore-regulated' : 'legitimate, regulated'} broker. ${b.regs[0] === 'none' ? 'However, the lack of tier-1 oversight means you should size positions carefully.' : 'It holds verifiable licenses and we completed a full withdrawal during testing.'}`],
    [`Is ${b.name} regulated?`, `Yes — it is authorised by ${b.regsFull.join(', ')}. You can verify each license number directly on the regulator's public register.`],
    [`What is the minimum deposit?`, `The minimum to open a live account is ${b.minStr}.`],
    [`Does ${b.name} offer an Islamic account?`, b.islamic ? `Yes. A swap-free (Islamic) account is available on request with no overnight interest charges.` : `No. ${b.name} does not currently offer a swap-free account.`],
    [`How long do withdrawals take?`, `In our test, withdrawals were processed in ${b.score >= 4 ? 'under 24 hours' : '2–4 business days'}.`],
  ];
}
