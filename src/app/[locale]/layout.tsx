import type { Metadata } from "next";
import { Vazirmatn } from "next/font/google";
import "./globals.css";
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

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      template: "%s | Hossein Khedmati",
      default: "Hossein Khedmati - Portfolio",
    },
    description: "Hossein Khedmati - Portfolio",
    keywords: ["portfolio", "developer", "Hossein Khedmati"],
    authors: [{ name: "Hossein Khedmati" }],
    creator: "Hossein Khedmati",
    publisher: "Hossein Khedmati",

    openGraph: {
      title: "Hossein Khedmati - Portfolio",
      description: "Explore the portfolio of Hossein Khedmati",
      url: `${SITE_URL}/${locale}`,
      siteName: "hosseinkhedmati.ir",
      locale: locale === "fa" ? "fa_IR" : "en_US",
      type: "website",
      images: [
        {
          url: "/profile.png",
          width: 1200,
          height: 630,
          alt: "Hossein Khedmati Portfolio",
          type: "image/png",
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title: "Hossein Khedmati - Portfolio",
      description: "Explore the portfolio of Hossein Khedmati",
      images: ["/profile.png"],
      // remove `creator` entirely if you don't have a real handle —
      // a fake @yourtwitterhandle looks worse than omitting it
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
