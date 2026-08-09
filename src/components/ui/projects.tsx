"use client";

import { useRef, useEffect } from "react";
import { motion, useInView } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { GithubIcon } from "../icons";
import { Project } from "@/data/projects/projects";
import { useLocale, useTranslations } from "next-intl";

interface ProjectsSectionProps {
  projects: Project[];
}

function ProjectCard({
  project,
  index,
  locale,
}: {
  project: Project;
  index: number;
  locale: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, {
    once: true,
    margin: "0px 0px -100px 0px",
    amount: 0.1,
  });

  const isFeatured = project.id === 1;

  const subtitle =
    project.subtitle[locale as keyof typeof project.subtitle] ||
    project.subtitle.en;
  const description =
    project.description[locale as keyof typeof project.description] ||
    project.description.en;
  const features =
    project.features[locale as keyof typeof project.features] ||
    project.features.en;

  const t = useTranslations("ProjectsPage");

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      className={`group relative flex flex-col overflow-hidden rounded-2xl border border-border-dark bg-surface transition-colors duration-300 hover:border-primary/40 ${
        isFeatured ? "lg:col-span-2 lg:flex-row-reverse" : ""
      }`}
    >
      {/* Image Section */}
      <div
        className={`relative overflow-hidden bg-surface-hover shrink-0 ${
          isFeatured ? "lg:w-1/2 min-h-75" : "min-h-75"
        }`}
      >
        <Image
          src={project.image}
          alt={project.title}
          fill
          sizes="500"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          priority={index === 0}
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent" />
        <div className="absolute top-4 left-4 flex items-center gap-2">
          <span className="text-[10px] font-mono uppercase tracking-wider text-primary bg-black/60 backdrop-blur-md border border-primary/30 px-2.5 py-1 rounded-md">
            {project.year}
          </span>
        </div>
      </div>

      {/* Content Section */}
      <div
        className={`flex flex-col flex-1 gap-4 p-6 ${
          isFeatured ? "lg:w-1/2 lg:p-10 lg:justify-center" : ""
        }`}
      >
        <div>
          <p className="text-[10px] text-neutral-500 tracking-[0.2em] uppercase mb-1">
            {subtitle}
          </p>
          <h3
            className={`font-bold leading-tight text-white ${
              isFeatured ? "text-2xl lg:text-3xl" : "text-xl"
            }`}
          >
            {project.title}
          </h3>
        </div>

        <p className="text-base text-neutral-400 leading-relaxed line-clamp-2">
          {description}
        </p>

        {/* Feature list */}
        <ul className="flex flex-col gap-2 shrink-0">
          {features
            .slice(0, isFeatured ? features.length : 3)
            .map((feature) => (
              <li
                key={feature}
                className="flex items-center gap-2.5 text-sm text-neutral-400"
              >
                <span className="w-1 h-1 rounded-full bg-primary/60 shrink-0" />
                {feature}
              </li>
            ))}
        </ul>

        {/* Tags*/}
        <div className="flex flex-wrap gap-2 pt-1 shrink-0">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="text-[10px] px-2 py-0.5 rounded border border-border-dark text-neutral-500 font-mono"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3 pt-4 mt-auto shrink-0">
          <Link
            href={project.demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-primary-dark text-foreground text-base font-semibold transition-all hover:bg-primary-dark/90 active:scale-95"
          >
            {t("demo")}
          </Link>

          <Link
            href={project.repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group/github inline-flex items-center justify-center rounded-lg border border-border-dark bg-surface-hover text-white transition-all active:scale-95 size-10"
            aria-label="View Github Repository"
          >
            <GithubIcon className="text-white transition-all duration-300 group-hover/github:text-primary-dark group-hover/github:scale-105" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

export default function ProjectsSection({ projects }: ProjectsSectionProps) {
  const locale = useLocale();

  return (
    <section className="py-4 scroll-mt-20" id="projects">
      <div className="container px-4 mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              locale={locale}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
