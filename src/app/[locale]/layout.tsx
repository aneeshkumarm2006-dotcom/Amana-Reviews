import type { ReactNode } from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { routing, type Locale } from '@/i18n/routing';
import { serif, sans, mono, arabic } from '@/lib/fonts';
import { t } from '@/lib/i18n';
import SiteChrome from '@/components/SiteChrome';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const locale = params.locale as Locale;
  const title = t(locale, 'Amana — Independent broker ratings & scam intelligence', 'أمانة — تصنيفات مستقلة للوسطاء ورصد للاحتيال');
  const description = t(
    locale,
    'Independent broker ratings and scam intelligence for MENA and global traders. Trade with confidence.',
    'تصنيفات مستقلة للوسطاء ورصد للاحتيال لمتداولي الشرق الأوسط والعالم. تداول بثقة.'
  );
  return {
    metadataBase: new URL('https://amana.reviews'),
    title: { default: title, template: '%s · Amana' },
    description,
    alternates: {
      canonical: `/${locale}`,
      languages: { en: '/en', ar: '/ar' },
    },
    openGraph: { title, description, siteName: 'Amana', locale: locale === 'ar' ? 'ar_AR' : 'en_US' },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: { locale: string };
}) {
  const locale = params.locale as Locale;
  if (!routing.locales.includes(locale)) notFound();
  setRequestLocale(locale);

  const messages = await getMessages();
  const dir = locale === 'ar' ? 'rtl' : 'ltr';
  const fontVars = `${serif.variable} ${sans.variable} ${mono.variable} ${arabic.variable}`;

  const orgLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Amana',
    url: 'https://amana.reviews',
    description: 'Independent broker ratings and scam intelligence.',
    parentOrganization: { '@type': 'Organization', name: 'Davnoot' },
  };

  return (
    <html lang={locale} dir={dir} className={fontVars}>
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgLd) }} />
        <NextIntlClientProvider messages={messages}>
          <SiteChrome locale={locale}>{children}</SiteChrome>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
