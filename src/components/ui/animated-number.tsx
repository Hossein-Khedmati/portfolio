"use client";

import { animate } from "motion";
import { useFormatter } from "next-intl";
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
  const format = useFormatter();

  const toPersianNumbers = (num: number): string => {
    return format.number(num, {
      style: 'decimal',
    });
  };

  useEffect(() => {
    const controls = animate(0, value, {
      duration,
      ease: "easeOut",
      onUpdate(latest) {
        if (ref.current) {
          const rounded = Math.round(latest);
          ref.current.textContent = toPersianNumbers(rounded);
        }
      },
    });

    return () => controls.stop();
  }, [value, duration]);

  return <span ref={ref}>۰</span>;
}