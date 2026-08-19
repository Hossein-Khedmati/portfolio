"use client";
import { motion, Variants } from "motion/react";
import {
  experiencesData,
  Experience,
} from "@/data/experiences/experiences-page";
import { Locale } from "@/config/locales";
import { useLocale, useTranslations } from "next-intl";
import { Metadata } from "next";

export default function ExperiencesPage() {
  const locale = (useLocale() as Locale) ?? "en";

  const containerVariants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.12,
      },
    },
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 24 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="min-h-screen"
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="flex flex-col gap-8"
      >
        {experiencesData.map((experience: Experience) => (
          <ExperienceCard
            key={experience.id}
            experience={experience}
            locale={locale}
            cardVariants={cardVariants}
          />
        ))}
      </motion.div>
    </motion.div>
  );
}

// ─── Sub-components ──────────────────────────────────────────────────────────

interface CardProps {
  experience: Experience;
  locale: Locale;
  cardVariants: Variants;
}

function ExperienceCard({ experience, locale, cardVariants }: CardProps) {
  const t = (field: { en: string; fa: string }) => field[locale];
  const tArr = (field: { en: string[]; fa: string[] }) => field[locale];
  const tExperinces = useTranslations("SkillsPage.experinces");

  return (
    <motion.article
      variants={cardVariants}
      className={`relative rounded-2xl border p-6 md:p-8 transition-all duration-300
        hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-0.5
        ${
          experience.current
            ? "border-primary/30 bg-surface"
            : "border-border-dark bg-surface hover:border-primary/20"
        }`}
    >
      {/* ── Top stripe accent for current role */}
      {experience.current && (
        <span className="absolute inset-x-0 top-0 h-px rounded-t-2xl bg-linear-to-r from-transparent via-primary/60 to-transparent" />
      )}

      {/* ── Header ─────────────────────────────────────────── */}
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        {/* Left: role + company */}
        <div className="flex flex-col gap-2">
          {/* Current badge */}
          {experience.current && (
            <span className="inline-flex w-fit items-center justify-center gap-1.5 rounded-full border border-green-500/25 bg-green-500/10 px-2.5 py-0.5 text-[11px] font-medium text-green-400">
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-success " />
              {tExperinces("current")}
            </span>
          )}

          <h3 className="text-xl md:text-2xl font-bold text-foreground leading-snug tracking-tight">
            {t(experience.role)}
          </h3>

          <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
            <span className="text-primary font-semibold text-base md:text-lg">
              {t(experience.company)}
            </span>
            <span className="text-xs md:text-sm text-neutral-400 rounded-full border border-border-dark px-2.5 py-0.5 font-medium">
              {t(experience.employmentType)}
            </span>
          </div>
        </div>

        {/* Right: date + location */}
        <div className="flex flex-wrap gap-2 md:flex-col md:items-end md:gap-1.5 shrink-0">
          <span className="inline-flex items-center text-xs md:text-sm font-medium text-neutral-500">
            {t(experience.startDate)} – {t(experience.endDate)}
          </span>
          <span className="inline-flex items-center text-xs text-neutral-500">
            {t(experience.location)}
          </span>
        </div>
      </div>

      {/* ── Divider */}
      <div className="my-6 h-px bg-border-dark/60" />

      {/* ── Summary ────────────────────────────────────────── */}
      <p className="text-sm md:text-base text-neutral-500 leading-relaxed mb-6 font-normal">
        {t(experience.summary)}
      </p>

      {/* ── Two-column content grid ────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <Section
          title={tExperinces("responsibility")}
          items={tArr(experience.responsibilities)}
          dotColor="bg-primary"
        />

        <Section
          title={tExperinces("expertise")}
          items={tArr(experience.learned)}
          dotColor="bg-primary"
        />
      </div>

      {/* ── Achievements ───────────────────────────────────── */}
      {experience.achievements[locale]?.length > 0 && (
        <div className="mb-6 rounded-xl border border-primary-dark/30 bg-surface-hover/30 p-4 md:p-5">
          <SectionTitle title={tExperinces("achievements")} />
          <ul className="mt-3 grid grid-cols-1 gap-2.5">
            {tArr(experience.achievements).map((item, idx) => (
              <li key={idx} className="flex items-start gap-2.5">
                <span className="mt-1 shrink-0 text-amber-400 font-bold text-xs">
                  ✦
                </span>
                <span className="text-xs md:text-sm text-neutral-600 leading-relaxed font-medium">
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* ── Tech Stack ─────────────────────────────────────── */}
      <div className="pt-4 border-t border-border-dark/50">
        <p className="text-sm uppercase tracking-widest text-neutral-600 font-semibold mb-3">
          {tExperinces("stacks")}
        </p>
        <div className="flex flex-wrap gap-1.5">
          {experience.technologies.map((tech) => (
            <span
              key={tech}
              className="rounded-full border border-border-dark bg-background/40 px-3 py-1
                text-xs font-medium text-neutral-500 transition-all duration-200
                hover:border-primary/40 hover:bg-primary/5 hover:text-primary cursor-default"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </motion.article>
  );
}

// ─── Section block ────────────────────────────────────────────────────────────

interface SectionProps {
  title: string;
  items: string[];
  dotColor: string;
}

function Section({ title, items, dotColor }: SectionProps) {
  return (
    <div className="flex flex-col">
      <SectionTitle title={title} />
      <ul className="mt-3 space-y-2.5">
        {items.map((item, idx) => (
          <li key={idx} className="flex items-start gap-2.5 group/item">
            <span
              className={`mt-2 shrink-0 w-1.5 h-1.5 rounded-full ${dotColor}
                group-hover/item:opacity-80 opacity-100 transition-opacity`}
            />
            <span className="text-xs md:text-sm text-neutral-500 group-hover/item:text-neutral-400 transition-colors leading-relaxed">
              {item}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function SectionTitle({ title }: { title: string }) {
  return (
    <h4 className="text-sm uppercase tracking-widest font-bold text-neutral-800">
      {title}
    </h4>
  );
}
