import type { Metadata } from "next";
import {  Vazirmatn } from "next/font/google";
import "./globals.css";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { Header } from "@/components/ui/header";
import CustomCursor from "@/components/ui/custom-cursor";
import Footer from "@/components/ui/footer";
import { Suspense } from "react";
import Loading from "@/components/ui/loading";

const vazirmatn = Vazirmatn({
  subsets: ["arabic", "latin"],
  display: "swap",
});

// ✅ IMPROVED: Better metadata with template and social tags
export const metadata: Metadata = {
  title: {
    template: "%s | Hossein Khedmati",
    default: "Hossein Khedmati - Portfolio",
  },
  description: "Hossein Khedmati - Portfolio",
  keywords: ["portfolio", "developer", "Hossein Khedmati"],
  authors: [{ name: "Hossein Khedmati" }],
  creator: "Hossein Khedmati",
  publisher: "Hossein Khedmati",
  
  // Open Graph for social sharing
  openGraph: {
    title: "Hossein Khedmati - Portfolio",
    description: "Explore the portfolio of Hossein Khedmati",
    url: "https://yourdomain.com",
    siteName: "Hossein Khedmati Portfolio",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/profile.png",
        width: 1200,
        height: 630,
        alt: "Hossein Khedmati Portfolio",
      },
    ],
  },
  
  // Twitter Card
  twitter: {
    card: "summary_large_image",
    title: "Hossein Khedmati - Portfolio",
    description: "Explore the portfolio of Hossein Khedmati",
    images: ["https://yourdomain.com"],
    creator: "@yourtwitterhandle",
  },
  
  // Icons
  icons: {
    icon: "/logo-android.png",
    apple: "/logo-apple.png",
  },
  
  // ✅ CRITICAL: Canonical URL (important for SEO)
  alternates: {
    canonical: "https://yourdomain.com",
  },
  
  // Robots meta (optional, but good practice)
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
      <body className={`min-h-full flex flex-col ${vazirmatn.className}`}>
        <NextIntlClientProvider>
          <Suspense fallback={<Loading/>}>
          <Header />
          {/* <CustomCursor /> */}
          {children}
          <Footer/>
          </Suspense>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}