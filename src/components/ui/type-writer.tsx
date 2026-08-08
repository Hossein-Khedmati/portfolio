"use client";

import { motion } from "motion/react";
import { useEffect, useState } from "react";
import clsx from "clsx";

interface TypewriterProps {
  text: string;
  className?: string;
}

export function Typewriter({ text, className }: TypewriterProps) {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    let mounted = true;

    const sleep = (ms: number) =>
      new Promise((resolve) => setTimeout(resolve, ms));

    const run = async () => {
      while (mounted) {
        // Type
        for (let i = 1; i <= text.length; i++) {
          if (!mounted) return;
          setDisplayedText(text.slice(0, i));
          await sleep(70);
        }

        await sleep(1800);

        // Delete
        for (let i = text.length - 1; i >= 0; i--) {
          if (!mounted) return;
          setDisplayedText(text.slice(0, i));
          await sleep(35);
        }

        await sleep(400);
      }
    };

    run();

    return () => {
      mounted = false;
    };
  }, [text]);

  return (
    <span
      className={clsx("relative inline-block whitespace-nowrap", className)}
    >
      {/* Reserve layout */}
      <span className="invisible select-none">{text}</span>

      {/* Animated text */}
      <span className="absolute inset-0">
        {displayedText}
        <motion.span
          className="inline-block"
          animate={{ opacity: [1, 0] }}
          transition={{
            duration: 0.8,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        >
          |
        </motion.span>
      </span>
    </span>
  );
}
