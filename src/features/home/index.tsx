"use client";

import { LoopIcon } from "@/components/icons";
import { HeroSection } from "@/components/sections/hero/hero";
import { AnimatedNumber } from "@/components/ui/animated-number";
import ProfileCard from "@/components/ui/profile-card";
import ProjectsSection from "@/components/ui/projects";
import SkillsChain from "@/components/ui/skill-chain";
import JobTimeline from "@/components/ui/timeline";
import { featuredProjectsData } from "@/data/projects/projects";
import { useInView } from "motion/react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useRef } from "react";

interface Stat {
  value: string;
  label: string;
}

export const HomePage = () => {
  const t = useTranslations("HomePage.about");
  const tSkills = useTranslations("HomePage.skills");
  const tExperiences = useTranslations("HomePage.experiences");
  const tProjects = useTranslations("HomePage.projects");
  const tContact = useTranslations("HomePage.contact");
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
                className="relative p-0.5 rounded-2xl bg-linear-to-r from-primary-dark via-border to-secondary-dark animate-gradient hover:scale-105 transition-all duration-300 flex items-stretch"
                key={stat.label}
              >
                <div className="flex flex-col items-center justify-center p-5 rounded-2xl bg-surface backdrop-blur-sm gap-1 min-h-25 w-full">
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
        <div className="flex-1 flex justify-end items-end max-lg:justify-center max-md:pointer-events-none">
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
            href="/skills/experiences"
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
      <ProjectsSection projects={featuredProjectsData} />
      <div className="container flex justify-center pt-6">
        <Link
          href="/projects"
          className="p-2 md:p-3 px-4 md:px-6 w-fit rounded-lg bg-surface text-sm md:text-base pointer-events-auto hover:bg-surface-hover/50 active:bg-surface-active border border-border-dark transition-colors duration-300 "
        >
          {tProjects("cta")}
        </Link>
      </div>
      {/* contact box */}
      <div className="container w-full py-10 relative overflow-hidden">
        <div className="flex flex-col md:flex-row gap-6 relative z-10 border border-border bg-surface rounded-2xl px-8 py-10">
          {/* Left Side */}
          <div className="flex flex-col gap-6 flex-2">
            <div className="flex items-center gap-2 w-fit px-3 py-1 rounded-full border border-primary-dark/40 bg-primary-dark/10">
              <span className="text-sm text-primary-dark font-medium">
                {tContact("badge")}
              </span>
            </div>

            <h3 className="text-3xl md:text-4xl text-foreground w-full leading-tight">
              {tContact("heading.part1")}{" "}
              <span className="text-primary-dark relative inline-block">
                {tContact("heading.highlight")}
                <svg
                  className="absolute -bottom-1 left-0 w-full"
                  viewBox="0 0 200 8"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1 5.5 C50 1.5, 150 1.5, 199 5.5"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    className="text-primary-dark"
                  />
                </svg>
              </span>{" "}
              {tContact("heading.part2")}
            </h3>

            <p className="text-base text-neutral-400">
              {tContact("description")}
            </p>

            <Link
              href="/contact"
              className="group flex items-center justify-center md:justify-start gap-2 p-3 md:p-4 px-4 md:px-6 w-full md:w-fit rounded-lg bg-primary-dark text-sm md:text-base pointer-events-auto hover:bg-primary-dark/70 active:bg-primary-active transition-colors duration-300 "
            >
              {tContact("cta")}
            </Link>
          </div>

          {/* Right Side */}
          <div className="flex-1 flex items-center justify-center mt-12 mb-8 md:my-0">
            <div className="relative w-full max-w-xs mx-auto">
              {/* Central card */}
              <div className="relative z-10 rounded-2xl border border-border bg-background p-6 shadow-2xl">
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex flex-col">
                    <p className="text-sm font-semibold text-foreground">
                      {tContact("chat.name")}
                    </p>
                    <p className="text-xs text-neutral-400">
                      {tContact("chat.replyTime")}
                    </p>
                  </div>
                </div>

                {/* Message bubbles */}
                <div className="flex flex-col gap-2 text-sm">
                  <div className="self-start bg-border/50 rounded-xl rounded-tl-none px-4 py-2 text-neutral-300 max-w-[85%]">
                    {tContact("chat.messages.user")}
                  </div>
                  <div className="self-end bg-primary-dark/80 rounded-xl rounded-tr-none px-4 py-2 text-white max-w-[85%]">
                    {tContact("chat.messages.reply")}
                  </div>
                  <div className="self-start bg-border/50 rounded-xl rounded-tl-none px-4 py-2 text-neutral-300 max-w-[85%]">
                    {tContact("chat.messages.followUp")}
                  </div>
                </div>
              </div>

              {/* Floating top-right chip */}
              <div className="absolute -top-6 -right-4 z-20 flex items-center gap-2 rounded-xl border border-border bg-surface px-3 py-2 shadow-lg">
                <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
                <span className="text-xs font-semibold text-foreground">
                  {tContact("chips.fastDelivery")}
                </span>
              </div>

              {/* Floating bottom-left chip */}
              <div className="absolute -bottom-6 -left-4 z-20 flex items-center gap-2 rounded-xl border border-border bg-surface px-3 py-2 shadow-lg">
                <span className="w-2 h-2 rounded-full bg-primary-dark animate-pulse" />
                <span className="text-xs font-semibold text-foreground">
                  {tContact("chips.letsConnect")}
                </span>
              </div>

              {/* Decorative dots grid */}
              <div className="absolute -z-10 -bottom-8 -right-8 grid grid-cols-5 gap-1.5">
                {Array.from({ length: 25 }).map((_, i) => (
                  <div
                    key={i}
                    className="w-1.5 h-1.5 rounded-full bg-primary-dark/30"
                  />
                ))}
              </div>

              {/* Decorative ring */}
              <div className="absolute -z-10 inset-0 rounded-2xl border-2 border-dashed border-primary-dark/20 scale-110" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
