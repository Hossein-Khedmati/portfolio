// app/[locale]/skills/layout.tsx
"use client";

import { usePathname } from "@/i18n/navigation";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { motion } from "motion/react";
import clsx from "clsx";

export default function SkillsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const t = useTranslations("SkillsPage");

  const tabs = [
    {
      name: t("tabs.skills"),
      href: "/skills",
      isActive: pathname === "/skills",
    },
    {
      name: t("tabs.experiences"),
      href: "/skills/experiences",
      isActive: pathname === "/skills/experiences",
    },
  ];

  return (
    <main className="relative overflow-hidden">
      {/* Background */}
      <div
        className="
          absolute
          left-0
          top-0
          -z-10
          h-100
          w-100
          rounded-full
          bg-primary-dark/30
          blur-[120px]
        "
      />

      <section className="container py-8 md:12">
        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.5,
          }}
          className="max-w-3xl"
        >
          <p className="text-primary text-lg">{t("title")}</p>
          <h1
            className="
              mt-4
              text-4xl
              sm:text-5xl
              lg:text-6xl
              font-bold
              leading-tight
            "
          >
            {t("subtitle")}
          </h1>
          <p
            className="
              mt-6
              text-lg
              text-neutral-500
            "
          >
            {t("description")}
          </p>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.5,
          }}
          className="mt-8 flex gap-1 rounded-2xl bg-surface/50 p-1 backdrop-blur-sm border border-border-dark/50 w-full max-w-2xl mx-auto"
        >
          {tabs.map((tab) => (
            <Link
              key={tab.href}
              href={tab.href}
              className={clsx(
                "relative flex-1 px-6 py-2.5 text-base font-medium transition-all duration-300 rounded-xl text-center",
                tab.isActive
                  ? "text-foreground bg-linear-to-r from-primary/20 via-primary/10 to-primary/20 shadow-lg shadow-primary/10"
                  : "text-neutral-500 hover:text-foreground hover:bg-primary/10",
              )}
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                {tab.name}
              </span>
              {tab.isActive && (
                <motion.div
                  layoutId="active-tab"
                  className="absolute inset-0 rounded-xl bg-linear-to-r from-primary/20 via-primary/10 to-primary/20"
                  transition={{
                    type: "spring",
                    stiffness: 500,
                    damping: 30,
                  }}
                />
              )}
            </Link>
          ))}
        </motion.div>
      </section>

      <section className="container pb-12">{children}</section>
    </main>
  );
}
