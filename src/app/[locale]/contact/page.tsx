"use client";

import { LinkIcon, TickIcon } from "@/components/icons";
import { motion } from "motion/react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { socialLinks } from "@/data/social-links/social-links";
import { useContactForm, MAX_ATTEMPTS } from "@/hooks";

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
  const {
    formData,
    errors,
    isSubmitting,
    submitStatus,
    formRef,
    handleChange,
    handleSubmit,
    remainingSubmissions,
    blockMessage
  } = useContactForm();

  // Function to get translated error messages
  const getErrorMessage = (
    errorKey: string | undefined,
  ): string | undefined => {
    if (!errorKey) return undefined;

    // Handle rate limit errors
    if (errorKey.startsWith("rateLimit.error.")) {
      const seconds = errorKey.split(".")[2];
      return t("rateLimit.error", { seconds });
    }

    return t(errorKey as any);
  };

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
                      bg-bg-surface
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
                        group-hover:bg-primary-dark
                        transition-all
                        duration-200
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
                        group-hover:translate-x-1
                        group-hover:text-primary-dark
                        transition-all
                        duration-200
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
            ref={formRef}
            onSubmit={handleSubmit}
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
            {/* Honeypot field - hidden from real users */}
            <div
              className="absolute opacity-0 pointer-events-none"
              aria-hidden="true"
            >
              <input
                type="text"
                id="honeypot-field"
                name="website"
                tabIndex={-1}
                autoComplete="off"
              />
            </div>
            <Input
              label={t("form.name")}
              placeholder={t("form.namePlaceholder")}
              value={formData.name}
              onChange={(value) => handleChange("name", value)}
              error={getErrorMessage(errors.name)}
              disabled={isSubmitting}
            />
            <Input
              label={t("form.email")}
              placeholder={t("form.emailPlaceholder")}
              type="email"
              value={formData.email}
              onChange={(value) => handleChange("email", value)}
              error={getErrorMessage(errors.email)}
              disabled={isSubmitting}
            />
            <Input
              label={t("form.subject")}
              placeholder={t("form.subjectPlaceholder")}
              value={formData.subject}
              onChange={(value) => handleChange("subject", value)}
              error={getErrorMessage(errors.subject)}
              disabled={isSubmitting}
            />
            <div className="flex flex-col gap-2">
              <label className="text-sm">
                {t("form.details")}
                <span className="text-red-500 ml-1">*</span>
              </label>
              <textarea
                placeholder={t("form.detailsPlaceholder")}
                value={formData.details}
                onChange={(e) => handleChange("details", e.target.value)}
                disabled={isSubmitting}
                className={`
                  min-h-45
                  resize-none
                  rounded-xl
                  border
                  bg-background
                  px-5
                  py-4
                  outline-none
                  transition
                  placeholder:text-neutral-500
                  ${errors.details ? "border-red-500" : "border-border-dark"}
                  focus:border-primary
                  disabled:opacity-50
                  disabled:cursor-not-allowed
                `}
              />
              {errors.details && (
                <p className="text-sm text-red-500 mt-1">
                  {getErrorMessage(errors.details)}
                </p>
              )}
            </div>
            {/* Rate limit indicator */}
            {submitStatus === "blocked" ? (
              <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-center">
                <p className="text-red-600 font-medium">
                  🚫 {blockMessage || t("rateLimit.error")}
                </p>
              </div>
            ) : remainingSubmissions < MAX_ATTEMPTS &&
              submitStatus !== "success" ? (
              <div className="text-sm text-neutral-500 text-center">
                {t("rateLimitRemaining", { count: remainingSubmissions })}
              </div>
            ) : null}
            {/* Submit button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className={`
              group
              mt-3
              flex
              items-center
              justify-center
              gap-3
              rounded-xl
              py-4
              font-medium
              transition-all
              ${
                submitStatus === "success"
                  ? "bg-success text-white"
                  : "bg-primary-dark text-foreground hover:scale-[1.01] active:scale-[0.98]"
              }
              disabled:opacity-50
              disabled:cursor-not-allowed
              disabled:hover:scale-100
              cursor-pointer
              `}
            >
              {isSubmitting ? (
                <>
                  <svg
                    className="animate-spin h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  {t("form.sending")}
                </>
              ) : submitStatus === "success" ? (
                <>
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  {t("form.sent")}
                </>
              ) : submitStatus === "error" ? (
                <>{t("form.error")}</>
              ) : (
                <>{t("form.submit")}</>
              )}
            </button>
            {/* Status message */}
            {submitStatus === "error" && (
              <p className="text-center text-sm text-red-500">
                {t("form.errorMessage")}
              </p>
            )}
            <p className="text-center text-sm text-neutral-500">
              {t("form.footer")}
            </p>
          </motion.form>
        </div>
      </section>
    </main>
  );
}

// Updated Input component with validation
function Input({
  label,
  placeholder,
  type = "text",
  value,
  onChange,
  error,
  disabled = false,
}: {
  label: string;
  placeholder: string;
  type?: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  disabled?: boolean;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm">
        {label}
        <span className="text-red-500 ml-1">*</span>
      </label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        className={`
          h-14
          rounded-xl
          border
          bg-background
          px-5
          outline-none
          transition
          placeholder:text-neutral-500
          ${error ? "border-red-500" : "border-border-dark"}
          focus:border-primary
          disabled:opacity-50
          disabled:cursor-not-allowed
        `}
      />
      {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
    </div>
  );
}
