import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import ProjectsClient from "./projects-client";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata.projects' });

  return {
    title: t('title'),
    description: t('description'),
  };
}

export default function ProjectsPage() {
  return <ProjectsClient />;
}
