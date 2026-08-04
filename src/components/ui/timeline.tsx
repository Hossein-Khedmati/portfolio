// components/ui/timeline.tsx
"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "motion/react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Job {
  id: number;
  company: string;
  jobTitle: string;
  startDate: string;
  endDate: string;
  isCurrentJob?: boolean;
  achievements: string[];
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const jobsData: Job[] = [
  {
    id: 1,
    company: "Etmita UG",
    jobTitle: "Frontend Developer",
    startDate: "Dec 2025",
    endDate: "Present",
    isCurrentJob: true,
    achievements: [
      "Advanced TypeScript proficiency through production-scale applications",
      "Established modern component development and testing practices",
      "Strengthened experience with scalable frontend architecture",
      "Thrived in a collaborative engineering environment with structured workflows",
    ],
  },
  {
    id: 2,
    company: "Cyrays Co.",
    jobTitle: "Intern Frontend Developer",
    startDate: "Jul 2025",
    endDate: "Sep 2025",
    achievements: [
      "Built a strong foundation in TypeScript and scalable React development",
      "Adopted feature-driven architecture and maintainable code organization",
      "Expanded frontend expertise with Shadcn UI and modern tooling",
      "Developed professional collaboration and agile development practices",
    ],
  },
];

// ─── Sub-Components ───────────────────────────────────────────────────────────

function DateBadge({
  startDate,
  endDate,
  isCurrent,
}: {
  startDate: string;
  endDate: string;
  isCurrent?: boolean;
}) {
  return (
    <div className="flex shrink-0 flex-col items-center rounded-xl border border-border-dark bg-surface-hover/40 px-3.5 py-1.5 text-center">
      <span className="text-[10px] font-semibold uppercase tracking-widest text-primary">
        {startDate}
      </span>
      <div className="my-1 h-px w-full bg-border-dark" />
      <span className="text-[10px] font-semibold uppercase tracking-widest text-neutral-500">
        {endDate}
      </span>
      {isCurrent && (
        <span className="mt-1.5 rounded-full bg-primary/10 px-2 py-0.5 text-[8px] font-bold uppercase tracking-wider text-primary">
          Current
        </span>
      )}
    </div>
  );
}

function JobCard({ job, isLeft }: { job: Job; isLeft: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: isLeft ? -30 : 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="relative rounded-2xl border-2 border-border-dark bg-surface p-5 shadow-sm transition-all duration-300 hover:border-primary/30 hover:shadow-md"
    >
      <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-primary/40 to-transparent" />

      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h3 className="text-lg font-bold tracking-tight text-foreground sm:text-xl">
            {job.company}
          </h3>
          <p className="text-xs font-medium text-primary sm:text-sm">
            {job.jobTitle}
          </p>
        </div>
        <DateBadge
          startDate={job.startDate}
          endDate={job.endDate}
          isCurrent={job.isCurrentJob}
        />
      </div>

      <div className="my-3 h-px bg-border-dark/60" />

      {/* Achievements */}
      <div>
        <p className="mb-2 text-[10px] font-semibold uppercase tracking-widest text-neutral-500">
          What I Learned & Earned
        </p>
        <ul className="space-y-2">
          {job.achievements.map((ach, i) => (
            <li
              key={i}
              className="flex items-start gap-2.5 text-xs text-neutral-400 sm:text-sm"
            >
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
              {ach}
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}

function TimelineDot({ isLarge }: { isLarge?: boolean }) {
  const size = isLarge ? "h-12 w-12 sm:h-14 sm:w-14" : "h-8 w-8";
  const innerSize = isLarge ? "h-4 w-4 sm:h-5 sm:w-5" : "h-2.5 w-2.5";

  return (
    <motion.div
      initial={{ scale: 0 }}
      whileInView={{ scale: 1 }}
      viewport={{ once: true }}
      transition={{ type: "spring", stiffness: 250, damping: 20 }}
      className={`relative z-20 flex ${size} shrink-0 items-center justify-center rounded-full border-2 border-primary bg-surface shadow-md shadow-primary/20`}
    >
      <div className={`${innerSize} rounded-full bg-primary`} />

      {isLarge && (
        <motion.div
          animate={{ scale: [1, 1.4, 1], opacity: [0.2, 0.5, 0.2] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0 rounded-full bg-primary/20"
        />
      )}
    </motion.div>
  );
}

// ─── Scroll Line Controller ───────────────────────────────────────────────────

function ScrollProgressLine({
  containerRef,
}: {
  containerRef: React.RefObject<HTMLDivElement | null>;
}) {
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 70%", "end 80%"],
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 25,
    restDelta: 0.001,
  });
  const glowTop = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <>
      <div className="absolute inset-0 w-0.5 bg-border-dark" />
      <motion.div
        style={{ scaleY, transformOrigin: "top" }}
        className="absolute inset-0 w-0.5 bg-linear-to-b from-primary via-primary/70 to-primary/40"
      />
      <motion.div
        style={{ top: glowTop }}
        className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 z-10"
      >
        <div className="h-3 w-3 rounded-full bg-primary shadow-[0_0_12px_4px] shadow-primary/50" />
      </motion.div>
    </>
  );
}

// ─── Desktop View ─────────────────────────────────────────────────────────────

function DesktopTimeline({
  containerRef,
}: {
  containerRef: React.RefObject<HTMLDivElement | null>;
}) {
  return (
    <div className="hidden md:block relative max-w-5xl mx-auto">
      {/* Center Line Track - Anchored precisely to dot centers */}
      <div className="absolute left-1/2 -translate-x-1/2 top-12 bottom-18 w-0.5">
        <ScrollProgressLine containerRef={containerRef} />
      </div>

      <div className="space-y-12">
        {/* Start Node */}
        <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-8">
          <div />
          <div className="z-10 flex flex-col items-center">
            <div className="mb-5 text-center">
              <p className="text-xs font-semibold uppercase tracking-wider text-primary">
                The Career Path Begins
              </p>
            </div>
            <TimelineDot isLarge />
          </div>
          <div />
        </div>

        {/* Cards & Nodes */}
        {jobsData.map((job, index) => {
          const isLeft = index % 2 === 0;
          return (
            <div
              key={job.id}
              className="grid grid-cols-[1fr_auto_1fr] items-center gap-8"
            >
              {/* Left Column */}
              <div>{isLeft && <JobCard job={job} isLeft={isLeft} />}</div>

              {/* Center Dot */}
              <div className="z-10 flex justify-center">
                <TimelineDot />
              </div>

              {/* Right Column */}
              <div>{!isLeft && <JobCard job={job} isLeft={isLeft} />}</div>
            </div>
          );
        })}

        {/* End Node */}
        <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-8">
          <div />
          <div className="z-10 flex flex-col items-center">
            <TimelineDot isLarge />
            <div className="mt-5 text-center">
              <p className="text-xs font-semibold uppercase tracking-wider text-primary">
                The Journey Continues
              </p>
              <p className="mt-1 text-[11px] text-neutral-500">
                Always learning, always building
              </p>
            </div>
          </div>
          <div />
        </div>
      </div>
    </div>
  );
}

// ─── Mobile View ──────────────────────────────────────────────────────────────

function MobileTimeline({
  containerRef,
}: {
  containerRef: React.RefObject<HTMLDivElement | null>;
}) {
  return (
    <div className="relative flex flex-col gap-8 md:hidden">
      {/* Mobile Track Line */}
      <div className="absolute left-5.75 top-6 bottom-6 w-0.5">
        <ScrollProgressLine containerRef={containerRef} />
      </div>

      {/* Start Mobile Node */}
      <div className="flex items-center gap-4">
        <TimelineDot isLarge />
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-primary">
            The Career Path Begins
          </p>
        </div>
      </div>

      {/* Job Items */}
      {jobsData.map((job) => (
        <div key={job.id} className="flex gap-4 items-start">
          <div className="z-10 flex justify-center w-12 pt-4">
            <TimelineDot />
          </div>
          <div className="flex-1">
            <JobCard job={job} isLeft={true} />
          </div>
        </div>
      ))}

      {/* End Mobile Node */}
      <div className="flex items-center gap-4">
        <TimelineDot isLarge />
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-primary">
            The Journey Continues
          </p>
          <p className="text-[11px] text-neutral-500 mt-0.5">
            Always learning, always building
          </p>
        </div>
      </div>
    </div>
  );
}

// ─── Main Export ──────────────────────────────────────────────────────────────

export default function JobTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section ref={containerRef} className="container py-6">
      <DesktopTimeline containerRef={containerRef} />
      <MobileTimeline containerRef={containerRef} />
    </section>
  );
}
