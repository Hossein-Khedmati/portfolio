"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  AnimatePresence,
} from "motion/react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Spark {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  size: number;
}

interface CursorState {
  isHovering: boolean;
  isClicking: boolean;
  isVisible: boolean;
  hoverText: string;
}

// ─── Constants ────────────────────────────────────────────────────────────────

const COLORS = {
  primary: "#6366f1",
  secondary: "#8b5cf6",
  accent: "#06b6d4",
};

const INTERACTIVE_TAGS = new Set([
  "A",
  "BUTTON",
  "INPUT",
  "TEXTAREA",
  "SELECT",
]);

const isInteractive = (el: HTMLElement): boolean => {
  if (INTERACTIVE_TAGS.has(el.tagName)) return true;
  if (el.closest("a, button, [role='button'], [data-cursor='pointer']"))
    return true;
  return window.getComputedStyle(el).cursor === "pointer";
};

const getHoverText = (el: HTMLElement): string =>
  el.getAttribute("data-cursor-text") ||
  el.closest("[data-cursor-text]")?.getAttribute("data-cursor-text") ||
  "";

// ─── Touch detection ──────────────────────────────────────────────────────────

const isTouchDevice = (): boolean => {
  if (typeof window === "undefined") return false;
  return (
    "ontouchstart" in window ||
    navigator.maxTouchPoints > 0 ||
    window.matchMedia("(pointer: coarse)").matches
  );
};

// ─── Spark engine (canvas) ────────────────────────────────────────────────────

function useSparkEngine(canvasRef: React.RefObject<HTMLCanvasElement | null>) {
  const sparks = useRef<Spark[]>([]);
  const sparkId = useRef(0);
  const rafId = useRef<number>(0);
  const lastPos = useRef({ x: -200, y: -200 });
  const isRunning = useRef(false);

  const addSparks = useCallback((x: number, y: number) => {
    const dx = x - lastPos.current.x;
    const dy = y - lastPos.current.y;
    const speed = Math.sqrt(dx * dx + dy * dy);
    lastPos.current = { x, y };

    if (speed < 6) return;

    const count = Math.min(Math.floor(speed / 5), 6);
    const palette = [
      COLORS.primary,
      COLORS.secondary,
      COLORS.accent,
      "#a78bfa",
      "#67e8f9",
    ];

    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const mag = 1.5 + Math.random() * 3.5;
      sparks.current.push({
        id: sparkId.current++,
        x,
        y,
        vx: Math.cos(angle) * mag,
        vy: Math.sin(angle) * mag,
        color: palette[Math.floor(Math.random() * palette.length)],
        size: 1.5 + Math.random() * 2.5,
      });
    }

    if (sparks.current.length > 80) {
      sparks.current = sparks.current.slice(-80);
    }
  }, []);

  const startLoop = useCallback(() => {
    if (isRunning.current) return;
    isRunning.current = true;

    const tick = () => {
      const canvas = canvasRef.current;
      if (!canvas) {
        rafId.current = requestAnimationFrame(tick);
        return;
      }
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        rafId.current = requestAnimationFrame(tick);
        return;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      sparks.current = sparks.current.filter((s) => s.size > 0.1);

      for (const s of sparks.current) {
        s.x += s.vx;
        s.y += s.vy;
        s.vx *= 0.92;
        s.vy *= 0.92;
        s.vy += 0.06;
        s.size *= 0.93;

        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);

        const alpha = Math.min(s.size / 2.5, 1);
        ctx.fillStyle =
          s.color +
          (alpha < 1
            ? Math.round(alpha * 255)
                .toString(16)
                .padStart(2, "0")
            : "");
        ctx.shadowBlur = s.size * 4;
        ctx.shadowColor = s.color;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      rafId.current = requestAnimationFrame(tick);
    };

    rafId.current = requestAnimationFrame(tick);
  }, [canvasRef]);

  const stopLoop = useCallback(() => {
    isRunning.current = false;
    cancelAnimationFrame(rafId.current);
  }, []);

  return { addSparks, startLoop, stopLoop };
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function CustomCursor() {
  // ── Detect touch/mobile — render nothing if true ───────────────────────────
  const [isTouch, setIsTouch] = useState<boolean | null>(null);

  useEffect(() => {
    setIsTouch(isTouchDevice());

    // Also listen for the rare hybrid device that switches input mode
    const onTouchStart = () => setIsTouch(true);
    window.addEventListener("touchstart", onTouchStart, {
      once: true,
      passive: true,
    });

    return () => window.removeEventListener("touchstart", onTouchStart);
  }, []);

  // Don't render until we know the device type (avoids SSR flash)
  if (isTouch === null || isTouch === true) return null;

  return <CursorRenderer />;
}

// ─── Cursor renderer (only mounts on non-touch devices) ───────────────────────

function CursorRenderer() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { addSparks, startLoop, stopLoop } = useSparkEngine(canvasRef);

  const [state, setState] = useState<CursorState>({
    isHovering: false,
    isClicking: false,
    isVisible: false,
    hoverText: "",
  });

  const mx = useMotionValue(-200);
  const my = useMotionValue(-200);

  const dotX = useSpring(mx, { damping: 12, stiffness: 900, mass: 0.2 });
  const dotY = useSpring(my, { damping: 12, stiffness: 900, mass: 0.2 });
  const ringX = useSpring(mx, { damping: 28, stiffness: 220, mass: 1 });
  const ringY = useSpring(my, { damping: 28, stiffness: 220, mass: 1 });

  // ── Resize canvas ──────────────────────────────────────────────────────────

  useEffect(() => {
    const resize = () => {
      const c = canvasRef.current;
      if (!c) return;
      c.width = window.innerWidth;
      c.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize, { passive: true });
    return () => window.removeEventListener("resize", resize);
  }, []);

  // ── Event listeners ────────────────────────────────────────────────────────

  const onMove = useCallback(
    (e: MouseEvent) => {
      mx.set(e.clientX);
      my.set(e.clientY);
      addSparks(e.clientX, e.clientY);
      setState((p) => (p.isVisible ? p : { ...p, isVisible: true }));
    },
    [mx, my, addSparks],
  );

  const onOver = useCallback((e: MouseEvent) => {
    const target = e.target as HTMLElement;
    if (!isInteractive(target)) return;
    setState((p) => ({
      ...p,
      isHovering: true,
      hoverText: getHoverText(target),
    }));
  }, []);

  const onOut = useCallback((e: MouseEvent) => {
    const target = e.target as HTMLElement;
    if (!isInteractive(target)) return;
    const related = e.relatedTarget as HTMLElement | null;
    if (related && isInteractive(related)) return;
    setState((p) => ({ ...p, isHovering: false, hoverText: "" }));
  }, []);

  const onDown = useCallback(
    () => setState((p) => ({ ...p, isClicking: true })),
    [],
  );
  const onUp = useCallback(
    () => setState((p) => ({ ...p, isClicking: false })),
    [],
  );
  const onLeave = useCallback(
    () => setState((p) => ({ ...p, isVisible: false })),
    [],
  );
  const onEnter = useCallback(
    () => setState((p) => ({ ...p, isVisible: true })),
    [],
  );

  useEffect(() => {
    startLoop();

    const styleEl = document.createElement("style");
    styleEl.textContent = "*, *::before, *::after { cursor: none !important; }";
    document.head.appendChild(styleEl);

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseover", onOver);
    window.addEventListener("mouseout", onOut);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);

    return () => {
      stopLoop();
      if (document.head.contains(styleEl)) {
        document.head.removeChild(styleEl);
      }
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      window.removeEventListener("mouseout", onOut);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
    };
  }, [
    startLoop,
    stopLoop,
    onMove,
    onOver,
    onOut,
    onDown,
    onUp,
    onLeave,
    onEnter,
  ]);

  const { isHovering, isClicking, isVisible, hoverText } = state;

  return (
    <>
      {/* ── Spark canvas ── */}
      <canvas
        ref={canvasRef}
        style={{
          position: "fixed",
          inset: 0,
          pointerEvents: "none",
          zIndex: 99990,
          opacity: isVisible ? 1 : 0,
          transition: "opacity 0.3s",
        }}
      />

      {/* ── Outer lazy ring ── */}
      <motion.div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
          pointerEvents: "none",
          zIndex: 99995,
          opacity: isVisible ? 1 : 0,
          transition: "opacity 0.3s ease",
        }}
      >
        <motion.div
          animate={{
            width: isClicking ? 28 : isHovering ? 52 : 38,
            height: isClicking ? 28 : isHovering ? 52 : 38,
            borderColor: isHovering
              ? "rgba(139,92,246,0.7)"
              : "rgba(99,102,241,0.45)",
            backgroundColor: isHovering
              ? "rgba(139,92,246,0.06)"
              : "rgba(99,102,241,0.04)",
            boxShadow: isHovering
              ? `0 0 18px rgba(139,92,246,0.35), 0 0 40px rgba(139,92,246,0.15), inset 0 0 14px rgba(139,92,246,0.1)`
              : `0 0 12px rgba(99,102,241,0.2), 0 0 28px rgba(99,102,241,0.08), inset 0 0 10px rgba(99,102,241,0.05)`,
          }}
          transition={{
            type: "spring",
            stiffness: 380,
            damping: 22,
            mass: 0.5,
          }}
          style={{
            borderRadius: "50%",
            border: "1.5px solid rgba(99,102,241,0.45)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
            position: "relative",
          }}
        >
          {/* Spinning conic sweep */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{
              duration: isHovering ? 1.8 : 4,
              repeat: Infinity,
              ease: "linear",
            }}
            style={{
              position: "absolute",
              inset: -1,
              borderRadius: "50%",
              background: isHovering
                ? "conic-gradient(from 0deg, transparent 60%, rgba(139,92,246,0.6) 80%, rgba(6,182,212,0.5) 90%, transparent 100%)"
                : "conic-gradient(from 0deg, transparent 70%, rgba(99,102,241,0.3) 90%, transparent 100%)",
            }}
          />

          {/* Counter-spin inner arc — only on hover */}
          <AnimatePresence>
            {isHovering && (
              <motion.div
                key="inner-arc"
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1, rotate: -360 }}
                exit={{ opacity: 0, scale: 0.6 }}
                transition={{
                  opacity: { duration: 0.2 },
                  scale: { duration: 0.2 },
                  rotate: {
                    duration: 2.4,
                    repeat: Infinity,
                    ease: "linear",
                  },
                }}
                style={{
                  position: "absolute",
                  inset: 5,
                  borderRadius: "50%",
                  background:
                    "conic-gradient(from 180deg, transparent 55%, rgba(6,182,212,0.55) 80%, rgba(139,92,246,0.4) 92%, transparent 100%)",
                }}
              />
            )}
          </AnimatePresence>
        </motion.div>

        {/* Hover label */}
        <AnimatePresence>
          {hoverText && (
            <motion.span
              key="label"
              initial={{ opacity: 0, y: 6, scale: 0.88 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 6, scale: 0.88 }}
              transition={{ type: "spring", stiffness: 500, damping: 28 }}
              style={{
                position: "absolute",
                top: "calc(100% + 10px)",
                left: "50%",
                translateX: "-50%",
                whiteSpace: "nowrap",
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: "0.06em",
                color: "#e0e7ff",
                background: "rgba(15,15,30,0.82)",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(99,102,241,0.35)",
                borderRadius: 8,
                padding: "4px 10px",
                boxShadow: "0 4px 20px rgba(99,102,241,0.25)",
              }}
            >
              {hoverText}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>

      {/* ── Sharp inner dot ── */}
      <motion.div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          x: dotX,
          y: dotY,
          translateX: "-50%",
          translateY: "-50%",
          pointerEvents: "none",
          zIndex: 99999,
          opacity: isVisible ? 1 : 0,
          transition: "opacity 0.3s ease",
        }}
      >
        {/* Click-burst ripple */}
        <AnimatePresence>
          {isClicking && (
            <motion.div
              key="ripple"
              initial={{ width: 8, height: 8, opacity: 0.9, borderWidth: 2 }}
              animate={{ width: 44, height: 44, opacity: 0, borderWidth: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.45, ease: [0.2, 0.8, 0.4, 1] }}
              style={{
                position: "absolute",
                borderRadius: "50%",
                border: "2px solid rgba(139,92,246,0.9)",
                boxShadow: "0 0 18px rgba(139,92,246,0.6)",
                translateX: "-50%",
                translateY: "-50%",
                top: 0,
                left: 0,
              }}
            />
          )}
        </AnimatePresence>

        {/* Steady pulse ring */}
        <motion.div
          animate={{
            scale: [1, 1.7, 1],
            opacity: [isHovering ? 0.35 : 0.15, 0, isHovering ? 0.35 : 0.15],
          }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          style={{
            position: "absolute",
            width: 12,
            height: 12,
            borderRadius: "50%",
            background: isHovering
              ? "radial-gradient(circle, rgba(139,92,246,0.6), transparent)"
              : "radial-gradient(circle, rgba(99,102,241,0.4), transparent)",
            translateX: "-50%",
            translateY: "-50%",
            top: 0,
            left: 0,
          }}
        />

        {/* Core dot */}
        <motion.div
          animate={{
            scale: isClicking ? 0.55 : isHovering ? 1.25 : 1,
            background: isClicking
              ? `radial-gradient(circle at 35% 35%, #fff 0%, ${COLORS.secondary} 55%, #4f46e5 100%)`
              : isHovering
                ? `radial-gradient(circle at 35% 35%, #fff 0%, ${COLORS.secondary} 60%, #7c3aed 100%)`
                : `radial-gradient(circle at 35% 35%, #fff 0%, ${COLORS.primary} 60%, #4338ca 100%)`,
            boxShadow: isClicking
              ? `0 0 0 2px rgba(139,92,246,0.4), 0 0 22px rgba(139,92,246,0.7), 0 0 48px rgba(139,92,246,0.3)`
              : isHovering
                ? `0 0 0 1.5px rgba(139,92,246,0.3), 0 0 16px rgba(139,92,246,0.55), 0 0 36px rgba(139,92,246,0.2)`
                : `0 0 0 1px rgba(99,102,241,0.25), 0 0 10px rgba(99,102,241,0.45), 0 0 24px rgba(99,102,241,0.15)`,
          }}
          transition={{
            type: "spring",
            stiffness: 750,
            damping: 14,
            mass: 0.15,
          }}
          style={{
            width: 11,
            height: 11,
            borderRadius: "50%",
            translateX: "-50%",
            translateY: "-50%",
            position: "absolute",
            top: 0,
            left: 0,
          }}
        />
      </motion.div>
    </>
  );
}
