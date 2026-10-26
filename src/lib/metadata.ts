import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

const SITE_URL = 'https://hosseinkhedmati.ir';
const SITE_NAME = 'Hossein Khedmati';

export interface PageMetadataProps {
  locale: string;
  path?: string;
}

export async function generatePageMetadata(
  locale: string,
  translationKey: string,
  path: string = ''
): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'metadata' });
  
  const title = t(`${translationKey}.title`);
  const description = t(`${translationKey}.description`);
  const keywords = t(`${translationKey}.keywords`);
  const ogTitle = t(`${translationKey}.ogTitle`);
  const ogDescription = t(`${translationKey}.ogDescription`);
  
  const canonicalUrl = `${SITE_URL}/${locale}${path}`;
  const isRTL = locale === 'fa';
  
  return {
    title,
    description,
    keywords: keywords.split(',').map(k => k.trim()),
    authors: [{ name: SITE_NAME, url: SITE_URL }],
    creator: SITE_NAME,
    publisher: SITE_NAME,
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    openGraph: {
      title: ogTitle,
      description: ogDescription,
      url: canonicalUrl,
      siteName: SITE_NAME,
      locale: isRTL ? 'fa_IR' : 'en_US',
      type: 'website',
      images: [
        {
          url: `${SITE_URL}/og-image.png`,
          width: 1200,
          height: 630,
          alt: ogTitle,
          type: 'image/png',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: ogTitle,
      description: ogDescription,
      images: [`${SITE_URL}/og-image.png`],
    },
    alternates: {
      canonical: canonicalUrl,
      languages: {
        en: `${SITE_URL}/en${path}`,
        fa: `${SITE_URL}/fa${path}`,
      },
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

export const SITE_CONFIG = {
  url: SITE_URL,
  name: SITE_NAME,
  defaultLocale: 'en',
  locales: ['en', 'fa'],
} as const;
