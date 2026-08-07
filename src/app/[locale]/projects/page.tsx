"use client";

import ProjectsSection from "@/components/ui/projects";
import { projectsData } from "@/data/projects/projects";
import { motion } from "motion/react";
import { useTranslations } from "next-intl";


export default function ProjectsPage() {
  const t = useTranslations("ProjectsPage");
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

      <section className="container py-12">
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
mt-3
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
mt-5
text-lg
text-neutral-500
max-w-2xl
"
          >
            {t("description")}
          </p>
        </motion.div>
      </section>

      <section className="pb-12">
        <ProjectsSection projects={projectsData} />
      </section>
    </main>
  );
}
