"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "@/i18n/navigation";
import { useLocale, useTranslations } from "next-intl";
import { LogoIcon } from "@/components/icons";
import { AnimatePresence, motion } from "motion/react";
import clsx from "clsx";
import Image from "next/image";

const navLinks = [
  {
    href: "/",
    key: "home",
  },
  {
    href: "/skills",
    key: "skills",
  },
  {
    href: "/projects",
    key: "projects",
  },
  {
    href: "/contact",
    key: "contact",
  },
];

export function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const t = useTranslations("Menu");

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      document.body.style.touchAction = "none";
    } else {
      document.body.style.overflow = "";
      document.body.style.touchAction = "";
    }

    return () => {
      document.body.style.overflow = "";
      document.body.style.touchAction = "";
    };
  }, [isOpen]);

  const toggleLocale = () => {
    const nextLocale = locale === "en" ? "fa" : "en";

    const pathnameWithoutLocale = pathname.replace(`/${locale}`, "") || "/";

    router.push(pathnameWithoutLocale, {
      locale: nextLocale,
    });
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border-dark bg-surface/50 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}

        <Link
          href="/"
          className="flex items-center gap-2 transition-opacity hover:opacity-80"
        >
          <LogoIcon className="size-9" />

          <span className="font-bold tracking-tight text-lg">{t("logo")}</span>
        </Link>

        {/* Desktop */}

        <nav className="hidden items-center gap-2 md:flex">
          {navLinks.map((link) => {
            const active =
              pathname === link.href ||
              (link.href !== "/" && pathname.startsWith(link.href));

            return (
              <Link
                key={link.href}
                href={link.href}
                className={clsx(
                  "relative rounded-full px-4 py-2 text-sm font-medium transition-all",
                  active
                    ? "text-primary-dark"
                    : "text-foreground/70 hover:text-foreground",
                )}
              >
                {t(link.key)}

                {active && (
                  <motion.div
                    layoutId="desktop-nav"
                    className="absolute inset-0 rounded-full border border-primary-dark/30 bg-primary-dark/10"
                    transition={{
                      type: "spring",
                      stiffness: 350,
                      damping: 30,
                    }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right */}

        <div className="flex items-center gap-3">
          <button
            onClick={toggleLocale}
            className="cursor-pointer rounded-full border-2 border-primary px-3 py-2 text-xs font-mono uppercase transition hover:bg-primary/20 flex gap-2"
          >
            {locale === "en" ? "FA " : "EN"}
            <Image
              src={locale === "en" ? "/iran-flag.webp" : "/english-flag.webp"}
              alt="language logo"
              width={1000}
              height={1000}
              className="w-6 h-4 rounded-sm"
            />
          </button>

          <Link
            href="/contact"
            className="hidden rounded-full bg-primary-dark px-5 py-2 text-sm font-bold text-foreground transition hover:scale-[1.02] hover:bg-primary-dark/90 active:scale-95 sm:block"
          >
            {t("letsTalk")}
          </Link>

          <button
            onClick={() => setIsOpen((prev) => !prev)}
            className="rounded-lg p-2 transition hover:bg-white/5 md:hidden"
            aria-label={isOpen ? t("close") : t("navigation")}
          >
            <AnimatePresence mode="wait">
              {isOpen ? (
                <motion.div
                  key="x"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  className="text-xl font-bold"
                >
                  ✕
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  className="text-2xl font-bold"
                >
                  ☰
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Overlay */}

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{
                duration: 0.25,
              }}
              onClick={() => setIsOpen(false)}
              className="fixed top-0 right-0 z-49 w-full h-screen bg-black/70 backdrop-blur-md md:hidden"
            />

            {/* Drawer */}

            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{
                type: "spring",
                damping: 28,
                stiffness: 260,
              }}
              className="fixed right-0 top-0 z-50 flex h-screen w-75 flex-col border-l border-border bg-surface backdrop-blur-2xl shadow-2xl md:hidden"
            >
              <div className="flex h-16 items-center justify-between border-b border-border px-6">
                <span className="font-semibold">{t("navigation")}</span>

                <button
                  onClick={() => setIsOpen(false)}
                  className="rounded-lg p-2 hover:bg-white/5"
                  aria-label={t("close")}
                >
                  ✕
                </button>
              </div>

              <nav className="flex flex-1 flex-col gap-2 p-5">
                {navLinks.map((link, index) => {
                  const active =
                    pathname === link.href ||
                    (link.href !== "/" && pathname.startsWith(link.href));

                  return (
                    <motion.div
                      key={link.href}
                      initial={{
                        opacity: 0,
                        x: 20,
                      }}
                      animate={{
                        opacity: 1,
                        x: 0,
                      }}
                      transition={{
                        delay: index * 0.08,
                      }}
                    >
                      <Link
                        href={link.href}
                        onClick={() => setIsOpen(false)}
                        className={clsx(
                          "group flex items-center justify-between rounded-xl px-4 py-4 text-base font-medium transition-all",
                          active
                            ? "bg-primary-dark text-black shadow-lg shadow-primary-dark/20"
                            : "text-foreground/80 hover:bg-foreground/5 hover:text-foreground",
                        )}
                      >
                        {t(link.key)}

                        {active && (
                          <motion.div
                            layoutId="mobile-dot"
                            className="h-2 w-2 rounded-full bg-black"
                          />
                        )}
                      </Link>
                    </motion.div>
                  );
                })}

                <Link
                  href="/contact"
                  onClick={() => setIsOpen(false)}
                  className="mt-auto rounded-xl bg-primary-dark py-4 text-center font-bold text-foreground transition hover:scale-[1.02]"
                >
                  {t("letsTalk")}
                </Link>
              </nav>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
