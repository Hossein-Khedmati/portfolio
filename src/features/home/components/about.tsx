"use client";
import { LoopIcon } from "@/components/icons";
import { AnimatedNumber } from "@/components/shared/animated-number";
import ProfileCard from "@/components/shared/profile-card";
import { useInView } from "motion/react";
import { useTranslations } from "next-intl";
import { useRef } from "react";

interface Stat {
  value: string;
  label: string;
}

export const AboutSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  const t = useTranslations("HomePage.about");
  const stats = t.raw("stats");

  return (
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
                      +{inView && <AnimatedNumber value={Number(stat.value)} />}
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
      <div className="flex-1 flex justify-end items-end max-lg:justify-center ">
        <ProfileCard
          name={t("fullName")}
          title={t("role")}
          avatarUrl="/profile.webp"
          showUserInfo={false}
          enableTilt={true}
          enableMobileTilt={false}
          behindGlowColor="rgba(125, 190, 255, 0.67)"
          iconUrl="/iconpattern.webp"
          behindGlowEnabled
          innerGradient="linear-gradient(145deg,#60496e8c 0%,#71C4FF44 100%)"
        />
      </div>
    </div>
  );
};
