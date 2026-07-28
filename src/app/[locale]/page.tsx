import { LoopIcon } from "@/components/icons";
import { HeroSection } from "@/components/sections/hero/hero";
import ProfileCard from "@/components/ui/profile-card";
import SkillsChain from "@/components/ui/skill-chain";
import { useTranslations } from "next-intl";
import Link from "next/link";

interface Stat {
  value: string;
  label: string;
}

export default function Home() {
  const t = useTranslations("HomePage.about");
  const stats = t.raw("stats");

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
                className="flex flex-col items-center justify-center p-5 border-2 border-border-dark rounded-2xl bg-surface gap-1"
                key={stat.label}
              >
                <span className="text-xl sm:text-2xl">
                  {stat.value === "∞" ? (
                    <LoopIcon color="var(--neutral-950)" size={30}/>
                  ) : (
                    stat.value
                  )}
                </span>
                <span className="text-sm sm:text-base text-center">
                  {stat.label}
                </span>
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
      <div>
        <div className="container flex flex-col gap-4">
        <h4 className="text-center text-lg text-primary">My Journey</h4>
        <h4 className="text-3xl sm:text-4xl font-bold leading-tight text-center mb-5" >Skills & Technologies</h4>
        </div>
        <SkillsChain />
        <div className="container flex justify-center py-10">
          <Link href="/skills" className="p-2 md:p-3 px-4 md:px-6 w-fit rounded-lg bg-surface text-sm md:text-base pointer-events-auto hover:bg-surface-hover/50 active:bg-surface-active border border-border-dark transition-colors duration-300 ">View all Skills</Link>
        </div>
      </div>
    </div>
  );
}
