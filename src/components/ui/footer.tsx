// components/layout/footer.tsx
"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { LogoIcon } from "../icons";
import { socialLinks } from "@/data/social-links/social-links";
import { navLinks } from "@/data/navigations/navigation";

export default function Footer() {
  const t = useTranslations("Footer");
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border-light bg-surface mt-10">
      <div className="container py-12">
        <div className="flex flex-col md:flex-row gap-10 md:gap-6">
          {/* Brand */}
          <div className="flex flex-col gap-4 flex-2">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 w-fit group">
              <div className="relative size-12 rounded-lg flex items-center justify-center overflow-hidden group-hover:opacity-70 transition-all duration-200">
                  <LogoIcon size={40}/>
              </div>
              <span className="text-xl font-bold text-foreground group-hover:opacity-70 transition-all duration-200">
                {t("brand")}
              </span>
            </Link>

            <p className="text-sm text-neutral-400 max-w-xs leading-relaxed">
              {t("description")}
            </p>

            {/* Status indicator */}
            <div className="flex items-center gap-2 w-fit">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-success" />
              </span>
              <span className="text-xs text-neutral-400">{t("status")}</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col gap-4 flex-1">
            <h4 className="text-sm font-semibold text-foreground uppercase tracking-wider">
              {t("quickLinks")}
            </h4>
            <nav className="flex flex-col gap-2.5">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-neutral-400 hover:text-primary-dark transition-colors duration-300 w-fit"
                >
                  {t(`links.${link.key}`)}
                </Link>
              ))}
            </nav>
          </div>

          {/* Socials */}
          <div className="flex flex-col gap-4 flex-1">
            <h4 className="text-sm font-semibold text-foreground uppercase tracking-wider">
              {t("socials")}
            </h4>
            <nav className="flex flex-col gap-2.5">
              {socialLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-neutral-400 hover:text-primary-dark transition-colors duration-300 w-fit"
                >
                  {t(`links.${link.key}`)}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact Info */}
          <div className="flex flex-col gap-4 flex-1">
            <h4 className="text-sm font-semibold text-foreground uppercase tracking-wider">
              {t("contactTitle")}
            </h4>
            <div className="flex flex-col gap-2.5">
              <Link
                href="tel:+989379747509"
                className="text-sm text-neutral-400 hover:text-primary-dark transition-colors duration-300 w-fit"
              >
                {t("phone")}
              </Link>
              <p className="text-sm text-neutral-400">{t("location")}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="container">
        <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      </div>

      {/* Copyright */}
      <div className="container py-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-neutral-500 text-center sm:text-start">
            © {currentYear} {t("brand")}. {t("rights")}
          </p>

          <div className="flex items-center gap-1.5 text-xs text-neutral-500">
            <span>{t("madeWith")}</span>
            <span className="inline-block animate-pulse text-red-400">♥</span>
            <span>{t("madeBy")}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
