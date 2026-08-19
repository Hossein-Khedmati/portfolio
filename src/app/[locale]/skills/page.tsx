"use client";

import {
  AxiosIcon,
  AzureCodeIcon,
  CssIcon,
  FigmaIcon,
  GithubIcon,
  GitIcon,
  HtmlIcon,
  JestIcon,
  JsIcon,
  MantineIcon,
  MotionIcon,
  NextIcon,
  PocketbaseIcon,
  ReactHookFormIcon,
  ReactIcon,
  ReduxIcon,
  ShadcnUiIcon,
  SupabaseIcon,
  TailwindIcon,
  TanstackIcon,
  TestingLibraryIcon,
  TsIcon,
  ZodIcon,
  ZustandIcon,
  StoryBookIcon,
} from "@/components/icons";

import { motion } from "motion/react";
import { Metadata } from "next";
import { useTranslations } from "next-intl";



const skillCategories = [
  {
    titleKey: "frontend.title",
    descriptionKey: "frontend.description",
    skills: [
      { name: "React.js", icon: ReactIcon },
      { name: "Next.js", icon: NextIcon },
      { name: "TypeScript", icon: TsIcon },
      { name: "JavaScript", icon: JsIcon },
      { name: "HTML5", icon: HtmlIcon },
      { name: "CSS3", icon: CssIcon },
    ],
  },
  {
    titleKey: "ui.title",
    descriptionKey: "ui.description",
    skills: [
      { name: "Tailwind CSS", icon: TailwindIcon },
      { name: "Mantine UI", icon: MantineIcon },
      { name: "Shadcn UI", icon: ShadcnUiIcon },
      { name: "Motion", icon: MotionIcon },
      { name: "Responsive Design", icon: AzureCodeIcon },
      { name: "Accessibility", icon: AzureCodeIcon },
    ],
  },
  {
    titleKey: "state.title",
    descriptionKey: "state.description",
    skills: [
      { name: "Redux Toolkit", icon: ReduxIcon },
      { name: "TanStack Query", icon: TanstackIcon },
      { name: "React Context", icon: AzureCodeIcon },
      { name: "Zustand", icon: ZustandIcon },
      { name: "Axios", icon: AxiosIcon },
      { name: "React Hook Form", icon: ReactHookFormIcon },
      { name: "Zod", icon: ZodIcon },
    ],
  },
  {
    titleKey: "backend.title",
    descriptionKey: "backend.description",
    skills: [
      { name: "REST APIs", icon: AzureCodeIcon },
      { name: "Authentication", icon: AzureCodeIcon },
      { name: "Authorization", icon: AzureCodeIcon },
      { name: "Supabase", icon: SupabaseIcon },
      { name: "PocketBase", icon: PocketbaseIcon },
    ],
  },
  {
    titleKey: "testing.title",
    descriptionKey: "testing.description",
    skills: [
      { name: "Jest", icon: JestIcon },
      { name: "Testing Library", icon: TestingLibraryIcon },
      { name: "Storybook", icon: StoryBookIcon },
      { name: "Clean Code", icon: AzureCodeIcon },
    ],
  },
  {
    titleKey: "tools.title",
    descriptionKey: "tools.description",
    skills: [
      { name: "Git", icon: GitIcon },
      { name: "GitHub", icon: GithubIcon },
      { name: "Figma", icon: FigmaIcon },
    ],
  },
];

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 30,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

export default function SkillsPage() {
  const t = useTranslations("SkillsPage");

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="space-y-8"
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="
          grid
          grid-cols-1
          md:grid-cols-2
          gap-6
        "
      >
        {skillCategories.map((category) => (
          <motion.div
            variants={cardVariants}
            key={category.titleKey}
            className="
              group
              rounded-2xl
              border
              border-border-dark
              bg-surface
              p-6
              transition-all
              duration-300
              hover:-translate-y-1
              hover:bg-transparent
              hover:backdrop-blur-[2px]
            "
          >
            <h2
              className="
                text-2xl
                font-bold
              "
            >
              {t(`categories.${category.titleKey}`)}
            </h2>

            <p
              className="
                mt-3
                text-neutral-500
                leading-relaxed
              "
            >
              {t(`categories.${category.descriptionKey}`)}
            </p>

            <div
              className="
                mt-6
                flex
                flex-wrap
                gap-2
              "
            >
              {category.skills.map((skill) => {
                const IconComponent = skill.icon;
                return (
                  <span
                    key={skill.name}
                    className="
                      inline-flex
                      items-center
                      gap-2
                      rounded-lg
                      border
                      border-border-dark
                      bg-background
                      px-3
                      py-2
                      text-sm
                      transition
                      group-hover:border-primary/40
                    "
                  >
                    <IconComponent size={16} className="shrink-0" />
                    <span>{skill.name}</span>
                  </span>
                );
              })}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
}
