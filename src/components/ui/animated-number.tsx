"use client";

import { animate } from "motion";
import { useEffect, useRef } from "react";

interface AnimatedNumberProps {
  value: number;
  duration?: number;
}

export function AnimatedNumber({
  value,
  duration = 1.5,
}: AnimatedNumberProps) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const controls = animate(0, value, {
      duration,
      ease: "easeOut",
      onUpdate(latest) {
        if (ref.current) {
          ref.current.textContent = Math.round(latest).toString();
        }
      },
    });

    return () => controls.stop();
  }, [value, duration]);

  return <span ref={ref}>0</span>;
}