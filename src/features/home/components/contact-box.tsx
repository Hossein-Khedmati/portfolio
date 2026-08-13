import { useTranslations } from "next-intl";
import Link from "next/link";

export const ContactBox = () => {
  const t = useTranslations("HomePage.contact");

  return (
    <div className="container w-full py-10 relative overflow-hidden">
      <div className="flex flex-col md:flex-row gap-6 relative z-10 border border-border bg-surface rounded-2xl px-8 py-10">
        {/* Left Side */}
        <div className="flex flex-col gap-6 flex-2">
          <div className="flex items-center gap-2 w-fit px-3 py-1 rounded-full border border-primary-dark/40 bg-primary-dark/10">
            <span className="text-sm text-primary-dark font-medium">
              {t("badge")}
            </span>
          </div>

          <h3 className="text-3xl md:text-4xl text-foreground w-full leading-tight">
            {t("heading.part1")}{" "}
            <span className="text-primary-dark relative inline-block">
              {t("heading.highlight")}
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
            {t("heading.part2")}
          </h3>

          <p className="text-base text-neutral-400">
            {t("description")}
          </p>

          <Link
            href="/contact"
            className="group flex items-center justify-center md:justify-start gap-2 p-3 md:p-4 px-4 md:px-6 w-full md:w-fit rounded-lg bg-primary-dark text-sm md:text-base pointer-events-auto hover:bg-primary-dark/70 active:bg-primary-active transition-colors duration-300 "
          >
            {t("cta")}
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
                    {t("chat.name")}
                  </p>
                  <p className="text-xs text-neutral-400">
                    {t("chat.replyTime")}
                  </p>
                </div>
              </div>

              {/* Message bubbles */}
              <div className="flex flex-col gap-2 text-sm">
                <div className="self-start bg-border/50 rounded-xl rounded-tl-none px-4 py-2 text-neutral-300 max-w-[85%]">
                  {t("chat.messages.user")}
                </div>
                <div className="self-end bg-primary-dark/80 rounded-xl rounded-tr-none px-4 py-2 text-white max-w-[85%]">
                  {t("chat.messages.reply")}
                </div>
                <div className="self-start bg-border/50 rounded-xl rounded-tl-none px-4 py-2 text-neutral-300 max-w-[85%]">
                  {t("chat.messages.followUp")}
                </div>
              </div>
            </div>

            {/* Floating top-right chip */}
            <div className="absolute -top-6 -right-4 z-20 flex items-center gap-2 rounded-xl border border-border bg-surface px-3 py-2 shadow-lg">
              <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
              <span className="text-xs font-semibold text-foreground">
                {t("chips.fastDelivery")}
              </span>
            </div>

            {/* Floating bottom-left chip */}
            <div className="absolute -bottom-6 -left-4 z-20 flex items-center gap-2 rounded-xl border border-border bg-surface px-3 py-2 shadow-lg">
              <span className="w-2 h-2 rounded-full bg-primary-dark animate-pulse" />
              <span className="text-xs font-semibold text-foreground">
                {t("chips.letsConnect")}
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
  );
};
