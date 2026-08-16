import ProjectsSection from "@/components/shared/projects";
import { featuredProjectsData } from "@/data/projects/projects";
import { useTranslations } from "next-intl";
import Link from "next/link";

export const FeaturedProjects = () => {
  const t = useTranslations("HomePage.projects");

  return (
    <>
      {" "}
      <div className="flex flex-col gap-4 container">
        <h4 className=" text-lg text-primary">{t("title")}</h4>
        <h4 className="text-3xl sm:text-4xl font-bold leading-tight  mb-5">
          {t("description")}
        </h4>
      </div>
      <ProjectsSection projects={featuredProjectsData} />
      <div className="container flex justify-center pt-6">
        <Link
          href="/projects"
          className="p-2 md:p-3 px-4 md:px-6 w-fit rounded-lg bg-surface text-sm md:text-base pointer-events-auto hover:bg-surface-hover/50 active:bg-surface-active border border-border-dark transition-colors duration-300 "
        >
          {t("cta")}
        </Link>
      </div>
    </>
  );
};
