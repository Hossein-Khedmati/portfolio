"use client";

import FaultyTerminal from "@/components/ui/faulty-terminal";
import { EmailIcon, GithubIcon, LinkedinIcon } from "@/components/icons";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { codeLines } from "./code-lines";
import { Typewriter } from "@/components/ui/type-writer";

export const HeroSection = () => {
  const t = useTranslations("HomePage.hero");

  return (
    <div className="w-full relative overflow-hidden py-10 h-fit">
      <div className="absolute top-0 left-0 w-full h-full z-0">
        <FaultyTerminal
          scale={1.9}
          gridMul={[2, 1]}
          digitSize={1.1}
          timeScale={0.4}
          pause={false}
          scanlineIntensity={0.5}
          glitchAmount={1}
          flickerAmount={1}
          noiseAmp={0.7}
          chromaticAberration={0}
          dither={0}
          curvature={0.2}
          tint="#483fcb"
          mouseReact
          mouseStrength={0.5}
          pageLoadAnimation
          brightness={0.6}
        />
      </div>

      {/* Content - positioned in front of galaxy */}
      <div className="relative z-10 w-full h-full container pointer-events-none">
        <div className="flex justify-between gap-5 max-md:flex-col">
          <div className="flex-1 flex flex-col gap-6">
            <h1 className="text-base md:text-lg">{t("greeting")}</h1>

            <div className="flex flex-col text-[40px] md:text-[80px] font-bold leading-none">
              <span>{t("firstName")}</span>
              <span className="text-gradient">{t("lastName")}</span>
            </div>

            <h2 className="text-xl md:text-3xl font-medium">
              <Typewriter text={t("role")} />
            </h2>

            <h3 className="text-sm md:text-lg font-medium text-neutral-500 w-full md:w-2/3">
              {t("description")}
            </h3>

            <div className="flex flex-col sm:flex-row gap-3 md:gap-5">
              <button className="p-2 md:p-3 px-4 md:px-6 w-fit rounded-lg bg-primary-dark text-sm md:text-base pointer-events-auto transition-colors duration-200 hover:bg-primary-hover">
                {t("buttons.viewProjects")}
              </button>
              <button className="p-2 md:p-3 px-4 md:px-6 w-fit rounded-lg border-2 border-border-dark bg-surface transition-colors duration-200 hover:bg-surface-hover text-sm md:text-base pointer-events-auto">
                {t("buttons.downloadResume")}
              </button>
            </div>

            <div className="flex gap-3 md:gap-5">
              <Link
                href="#"
                aria-label={t("social.github")}
                className="size-8 md:size-10 w-fit rounded-full p-1 bg-surface flex items-center justify-center overflow-hidden transition-all duration-300 hover:bg-primary-dark hover:scale-110 pointer-events-auto"
              >
                <GithubIcon size={24} />
              </Link>
              <Link
                href="#"
                aria-label={t("social.linkedin")}
                className="size-8 md:size-10 w-fit rounded-full p-1 bg-surface flex items-center justify-center overflow-hidden transition-all duration-300 hover:bg-primary-dark hover:scale-110 pointer-events-auto "
              >
                <LinkedinIcon size={16} />
              </Link>
              <Link
                href="#"
                aria-label={t("social.email")}
                className="size-8 md:size-10 w-fit rounded-full p-1 bg-surface flex items-center justify-center overflow-hidden transition-all duration-300 hover:bg-primary-dark hover:scale-110 pointer-events-auto"
              >
                <EmailIcon size={24} />
              </Link>
            </div>
          </div>
          <div className="flex-1 h-fit code-block max-w-lg mx-auto lg:mx-0 bg-surface border border-primary-dark max-md:mx-0">
            <div className="code-header">
              <div className="dot dot-red" />
              <div className="dot dot-yellow" />
              <div className="dot dot-green" />
            </div>
            <div
              className="code-content text-sm md:text-xl!"
              style={{ direction: "ltr", textAlign: "left" }}
            >
              {codeLines.map((line) => (
                <div key={line.num} className="flex items-start">
                  <span className="code-line-num">{line.num}</span>
                  <span>{line.content}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
