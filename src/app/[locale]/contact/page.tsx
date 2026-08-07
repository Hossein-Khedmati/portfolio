"use client";

import {
  EmailIcon,
  GithubIcon,
  LinkedinIcon,
  LinkIcon,
  TelegramIcon,
  TickIcon,
} from "@/components/icons";
import { motion } from "motion/react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { socialLinks } from "@/data/social-links/social-links";


const availabilityItems = [
  { key: "freelance" },
  { key: "fulltime" },
  { key: "remote" },
];

const containerAnimation = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const itemAnimation = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

export default function ContactPage() {
  const t = useTranslations("ContactPage");

  return (
    <main className="relative overflow-hidden">
      {/* Background Glow */}
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

      <div
        className="
        absolute
        right-0
        top-1/3
        -z-10
        h-100
        w-100
        rounded-full
        bg-primary-dark/30
        blur-[120px]
        "
      />

      {/* Hero */}

      <section className="container py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl"
        >
          <p className="text-lg text-primary">{t("title")}</p>

          <h1
            className="
            mt-4
            text-4xl
            sm:text-5xl
            lg:text-7xl
            font-bold
            leading-tight
            "
          >
            {t("subtitle")}
            <span className="text-primary"> {t("subtitleHighlight")}</span>
          </h1>

          <p
            className="
            mt-6
            max-w-2xl
            text-lg
            text-neutral-500
            "
          >
            {t("description")}
          </p>
        </motion.div>
      </section>

      {/* Main */}

      <section className="container pb-24">
        <div
          className="
          grid
          grid-cols-1
          lg:grid-cols-[350px_1fr]
          gap-8
          "
        >
          {/* LEFT SIDE */}

          <motion.div
            variants={containerAnimation}
            initial="hidden"
            animate="show"
            className="flex flex-col gap-5"
          >
            <motion.div
              variants={itemAnimation}
              className="
              rounded-2xl
              border
              border-border-dark
              bg-surface
              p-6
              "
            >
              <h3 className="text-xl font-semibold mb-5">{t("contactInfo")}</h3>

              <div className="flex flex-col gap-3">
                {socialLinks.map((item) => {
                  const Icon = item.icon;

                  return (
                    <Link
                      key={item.key}
                      href={item.href}
                      target="_blank"
                      className="
                      group
                      flex
                      items-center
                      gap-4
                      rounded-xl
                      border
                      border-border-dark
                      p-4
                      transition-all
                      hover:bg-surface-hover/50
                      hover:-translate-y-1
                      "
                    >
                      <div
                        className="
                        flex
                        size-11
                        items-center
                        justify-center
                        rounded-xl
                        bg-background
                        "
                      >
                        <Icon size={22} />
                      </div>

                      <div>
                        <p className="text-sm text-neutral-500">
                          {t(`socials.${item.key}`)}
                        </p>

                        <p className="text-sm font-medium">{item.value}</p>
                      </div>

                      <span
                        className="
                        ms-auto
                        text-neutral-500
                        transition-transform
                        group-hover:translate-x-1
                        "
                      >
                        <LinkIcon />
                      </span>
                    </Link>
                  );
                })}
              </div>
            </motion.div>

            {/* Availability */}

            <motion.div
              variants={itemAnimation}
              className="
              rounded-2xl
              border
              border-border-dark
              bg-surface
              p-6
              "
            >
              <div className="flex items-center gap-2">
                <span
                  className="
                  size-3
                  rounded-full
                  bg-success
                  animate-pulse
                  "
                />

                <h3 className="font-semibold">{t("availability")}</h3>
              </div>

              <div className="mt-5 flex flex-col gap-3 text-sm text-neutral-500">
                {availabilityItems.map((item) => (
                  <p key={item.key} className="flex gap-3 items-center">
                    <TickIcon color="var(--success)" />
                    {t(`availabilityItems.${item.key}`)}
                  </p>
                ))}
              </div>

              <p
                className="
                mt-5
                text-sm
                text-neutral-500
                "
              >
                {t("replyTime")}
              </p>
            </motion.div>
          </motion.div>

          {/* FORM */}

          <motion.form
            initial={{
              opacity: 0,
              y: 30,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.6,
            }}
            className="
            rounded-2xl
            border
            border-border-dark
            bg-surface
            p-6
            sm:p-8
            flex
            flex-col
            gap-5
            "
          >
            <Input
              label={t("form.name")}
              placeholder={t("form.namePlaceholder")}
            />

            <Input
              label={t("form.email")}
              placeholder={t("form.emailPlaceholder")}
            />

            <Input
              label={t("form.subject")}
              placeholder={t("form.subjectPlaceholder")}
            />

            <div className="flex flex-col gap-2">
              <label className="text-sm">{t("form.details")}</label>

              <textarea
                placeholder={t("form.detailsPlaceholder")}
                className="
                min-h-45
                resize-none
                rounded-xl
                border
                border-border-dark
                bg-background
                px-5
                py-4
                outline-none
                transition
                placeholder:text-neutral-500
                focus:border-primary
                "
              />
            </div>

            <button
              className="
              group
              mt-3
              flex
              items-center
              justify-center
              gap-3
              rounded-xl
              bg-primary
              py-4
              font-medium
              text-background
              transition-all
              hover:scale-[1.01]
              active:scale-[0.98]
              "
            >
              {t("form.submit")}
              <span
                className="
                transition-transform
                group-hover:translate-x-1
                "
              >
                →
              </span>
            </button>

            <p
              className="
              text-center
              text-sm
              text-neutral-500
              "
            >
              {t("form.footer")}
            </p>
          </motion.form>
        </div>
      </section>
    </main>
  );
}

function Input({ label, placeholder }: { label: string; placeholder: string }) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm">{label}</label>

      <input
        placeholder={placeholder}
        className="
        h-14
        rounded-xl
        border
        border-border-dark
        bg-background
        px-5
        outline-none
        transition
        placeholder:text-neutral-500
        focus:border-primary
        "
      />
    </div>
  );
}
