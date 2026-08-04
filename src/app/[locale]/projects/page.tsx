"use client";

import ProjectsSection, { Project } from "@/components/ui/projects";
import { motion } from "motion/react";
import { useTranslations } from "next-intl";

const projectsData: Project[] = [
  {
    id: 1,
    title: "Menuvita",
    subtitle: "Digital Restaurant SaaS Platform",
    description:
      "A modern multi-tenant SaaS platform that transforms traditional restaurant menus into fast, interactive digital experiences with a powerful management dashboard.",

    tags: ["Next.js", "TypeScript", "Supabase", "Tailwind CSS", "Shadcn UI"],

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
