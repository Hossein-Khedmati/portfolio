import type { Metadata } from "next";
import { Vazirmatn } from "next/font/google";
import "./globals.css";
import "../performance.css";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { Header } from "@/components/layout/header";
import CustomCursor from "@/components/shared/custom-cursor";
import Footer from "@/components/layout/footer";
import { Suspense } from "react";
import Loading from "@/components/shared/loading";
import clsx from "clsx";
import { locales } from "@/config/locales";

const vazirmatn = Vazirmatn({
  subsets: ["arabic", "latin"],
  display: "swap",
});

const SITE_URL = "https://hosseinkhedmati.ir";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const { getTranslations } = await import('next-intl/server');
  const t = await getTranslations({ locale, namespace: 'metadata.home' });

  const title = t('title');
  const description = t('description');
  const keywords = t('keywords');
  const ogTitle = t('ogTitle');
  const ogDescription = t('ogDescription');

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      template: "%s | Hossein Khedmati",
      default: title,
    },
    description,
    keywords: keywords.split(',').map(k => k.trim()),
    authors: [{ name: "Hossein Khedmati", url: SITE_URL }],
    creator: "Hossein Khedmati",
    publisher: "Hossein Khedmati",
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },

    openGraph: {
      title: ogTitle,
      description: ogDescription,
      url: `${SITE_URL}/${locale}`,
      siteName: "Hossein Khedmati",
      locale: locale === "fa" ? "fa_IR" : "en_US",
      type: "website",
      images: [
        {
          url: `${SITE_URL}/og-image.png`,
          width: 1200,
          height: 630,
          alt: ogTitle,
          type: "image/png",
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description: ogDescription,
      images: [`${SITE_URL}/og-image.png`],
    },

    icons: {
      icon: "/logo-android.png",
      apple: "/logo-apple.png",
    },

    alternates: {
      canonical: `${SITE_URL}/${locale}`,
      languages: Object.fromEntries(
        locales.map((l) => [l, `${SITE_URL}/${l}`])
      ),
    },

    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

const getDir = (locale: string): "ltr" | "rtl" => {
  const rtlLocale = "fa";
  return rtlLocale === locale ? "rtl" : "ltr";
};

export default async function RootLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const dir = getDir(locale);

  return (
    <html lang={locale} dir={dir} className="h-full antialiased">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Person',
              name: 'Hossein Khedmati',
              url: 'https://hosseinkhedmati.ir',
              jobTitle: 'Frontend Developer',
              description: 'Professional Frontend Developer specializing in React, Next.js, and TypeScript',
              knowsAbout: [
                'React.js',
                'Next.js',
                'TypeScript',
                'JavaScript',
                'Web Development',
                'Frontend Development',
                'Tailwind CSS',
              ],
              sameAs: [
                'https://github.com/hosseinkhedmati',
                'https://linkedin.com/in/hosseinkhedmati',
                'https://t.me/hosseinkhedmati',
              ],
            }),
          }}
        />
      </head>
      <body className={clsx("min-h-full flex flex-col", vazirmatn.className)}>
        <NextIntlClientProvider>
          <Suspense fallback={<Loading />}>
            <Header />
            <CustomCursor />
            {children}
            <Footer />
          </Suspense>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
