import Link from "next/link";
import JobTimeline from "@/components/shared/timeline";
import { useTranslations } from "next-intl";
import { SolarSystem } from "./solar-system";

export const JourneySection = () => {
  const tSkills = useTranslations("HomePage.skills");
  const tExperiences = useTranslations("HomePage.experiences");
  return (
    <>
      <div className="py-5">
        <div className="container flex flex-col gap-4">
          <h4 className="text-center text-lg text-primary">
            {tSkills("title")}
          </h4>
          <h4 className="text-3xl sm:text-4xl font-bold leading-tight text-center mb-5">
            {tSkills("description")}
          </h4>
        </div>
        <div className="flex justify-center items-center w-full">
        <SolarSystem />
        </div>
        <div className="container flex justify-center py-10 ">
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
    </>
  );
};
