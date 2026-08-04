"use client";

import { LoopIcon } from "@/components/icons";
import { HeroSection } from "@/components/sections/hero/hero";
import { AnimatedNumber } from "@/components/ui/animated-number";
import ProfileCard from "@/components/ui/profile-card";
import ProjectsSection, { Project } from "@/components/ui/projects";
import SkillsChain from "@/components/ui/skill-chain";
import JobTimeline from "@/components/ui/timeline";
import { useInView } from "motion/react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useRef } from "react";

interface Stat {
  value: string;
  label: string;
}

const projectsData = [
  {
    id: 1,
    title: "Menuvita",
    subtitle: "Digital Restaurant SaaS Platform",
    description:
      "A modern multi-tenant SaaS platform that transforms traditional restaurant menus into fast, interactive digital experiences with a powerful management dashboard.",

    tags: [
      "Next.js",
      "TypeScript",
      "Supabase",
      "Tailwind CSS",
      "Shadcn UI",
    ],

    features: [
      "Multi-tenant restaurant dashboard with role-based management",
      "Real-time menu management powered by Supabase",
      "Landing page with restaurant information, working hours, and branding",
      "Fast menu browsing with search, category filtering, and server actions",
      "Complete admin panel for managing categories, menu items, and restaurant settings",
    ],

    image: "/menuvita.webp",
    demoUrl: "https://demo.example.com",
    repoUrl: "https://github.com/user/repo",
    year: "2026",
  },

  {
    id: 2,
    title: "Torino",
    subtitle: "Tour Reservation Platform",

    description:
      "A responsive tour booking platform focused on performance, seamless user experience, and server-driven data fetching.",

    tags: [
      "Next.js",
      "React",
      "TypeScript",
      "React Query",
      "JWT Authentication",
      "Tailwind CSS",
    ],

    features: [
      "OTP authentication with mobile number",
      "Profile management with reservation history",
      "Server-side search and filtering synchronized with URL parameters",
      "Statically generated tour pages for improved performance and SEO",
      "Pixel-perfect implementation based on the Figma design",
    ],

    image: "/torino.webp",
    demoUrl: "https://demo.example.com",
    repoUrl: "https://github.com/user/repo",
    year: "2025",
  },

  {
    id: 3,
    title: "Survey App",
    subtitle: "Interactive Survey Application",

    description:
      "A lightweight survey application demonstrating modern state management, persistent storage, and real-time score calculation.",

    tags: ["Next.js", "React", "TypeScript", "Zustand", "Tailwind CSS"],

    features: [
      "Global state management using Zustand",
      "Real-time score calculation for each section and the overall survey",
      "Persistent answers with Local Storage to prevent data loss",
      "Smooth multi-step survey experience with instant feedback",
    ],

    image: "/surveyapp.webp",
    demoUrl: "https://demo.example.com",
    repoUrl: "https://github.com/user/repo",
    year: "2026",
  },
];

export default function Home() {
  const t = useTranslations("HomePage.about");
  const tSkills = useTranslations("HomePage.skills");
  const tExperiences = useTranslations("HomePage.experiences");
  const tProjects = useTranslations("HomePage.projects");
  const stats = t.raw("stats");

  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <div>
      <HeroSection />
      <div className="container py-10 flex gap-5 max-lg:flex-col-reverse">
        <div className="flex-2 flex flex-col gap-5">
          <h6 className="text-base sm:text-lg text-primary">{t("title")}</h6>
          <h2 className="text-3xl sm:text-4xl lg:text-[50px] font-bold leading-tight">
            {t("subtitle")}
          </h2>

          <h4 className="text-base sm:text-lg text-neutral-500 w-full lg:w-8/10">
            {t("description")}
          </h4>
          <div className="grid grid-cols-4 gap-10 max-lg:grid-cols-2 max-lg:gap-5 ">
            {stats.map((stat: Stat) => (
              <div
                className="relative p-0.5 rounded-2xl bg-linear-to-r from-primary-dark via-border to-secondary-dark animate-gradient hover:scale-105 transition-all duration-300"
                key={stat.label}
              >
                <div className="flex flex-col items-center justify-center p-5 rounded-2xl bg-surface backdrop-blur-sm gap-1 min-h-25">
                  <span className="text-xl sm:text-2xl" ref={ref}>
                    {stat.value === "∞" ? (
                      <LoopIcon color="var(--neutral-950)" size={30} />
                    ) : (
                      <>
                        +
                        {inView && (
                          <AnimatedNumber value={Number(stat.value)} />
                        )}
                      </>
                    )}
                  </span>
                  <span className="text-sm sm:text-base text-center">
                    {stat.label}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex-1 flex justify-end items-end max-lg:justify-center">
          <ProfileCard
            name={t("fullName")}
            title={t("role")}
            avatarUrl="/profile.png"
            showUserInfo={false}
            enableTilt={true}
            enableMobileTilt={false}
            behindGlowColor="rgba(125, 190, 255, 0.67)"
            iconUrl="/iconpattern.png"
            behindGlowEnabled
            innerGradient="linear-gradient(145deg,#60496e8c 0%,#71C4FF44 100%)"
          />
        </div>
      </div>
      <div className="py-5">
        <div className="container flex flex-col gap-4">
          <h4 className="text-center text-lg text-primary">
            {tSkills("title")}
          </h4>
          <h4 className="text-3xl sm:text-4xl font-bold leading-tight text-center mb-5">
            {tSkills("description")}
          </h4>
        </div>
        <SkillsChain />
        <div className="container flex justify-center py-10">
          <Link
            href="/skills"
            className="p-2 md:p-3 px-4 md:px-6 w-fit rounded-lg bg-surface text-sm md:text-base pointer-events-auto hover:bg-surface-hover/50 active:bg-surface-active border border-border-dark transition-colors duration-300 "
          >
            {tSkills("cta")}
          </Link>
        </div>
      </div>
      <div>
        <div className="container flex flex-col gap-4">
          <h4 className=" text-lg text-primary">{tExperiences("title")}</h4>
          <h4 className="text-3xl sm:text-4xl font-bold leading-tight  mb-5">
            {tExperiences("description")}
          </h4>
        </div>
        <div>
          <JobTimeline />
        </div>
        <div className="container flex justify-center py-5">
          <Link
            href="/skills"
            className="p-2 md:p-3 px-4 md:px-6 w-fit rounded-lg bg-surface text-sm md:text-base pointer-events-auto hover:bg-surface-hover/50 active:bg-surface-active border border-border-dark transition-colors duration-300 "
          >
            {tExperiences("cta")}
          </Link>
        </div>
      </div>
      <div className="flex flex-col gap-4 container">
        <h4 className=" text-lg text-primary">{tProjects("title")}</h4>
        <h4 className="text-3xl sm:text-4xl font-bold leading-tight  mb-5">
          {tProjects("description")}
        </h4>
      </div>
      <ProjectsSection projects={projectsData} />
      <div className="container flex justify-center py-5">
        <Link
          href="/projects"
          className="p-2 md:p-3 px-4 md:px-6 w-fit rounded-lg bg-surface text-sm md:text-base pointer-events-auto hover:bg-surface-hover/50 active:bg-surface-active border border-border-dark transition-colors duration-300 "
        >
          {tProjects("cta")}
        </Link>
      </div>
    </div>
  );
}
