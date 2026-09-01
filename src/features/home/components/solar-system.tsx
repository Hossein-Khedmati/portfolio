'use client';

import React, { useState, useMemo, useEffect, useCallback } from "react";
import { cn } from "@/lib/utils";
import {
  AzureCodeIcon,
  CssIcon,
  HtmlIcon,
  JsIcon,
  LinkIcon,
  NextIcon,
  ReactIcon,
  TailwindIcon,
  TsIcon,
} from "@/components/icons";

/**
 * ============================================================================
 * TYPE DEFINITIONS & CUSTOMIZATION CONTRACTS
 * ============================================================================
 */

export interface SolarSystemItem {
  id: string;
  label: string;
  type?: string;
  badge?: string;
  desc?: string;
  color: string;
  svg: React.ReactNode;
}

export interface OrbitConfig {
  id: string;
  name: string;
  radiusClass: string;
  radiusPx: number;
  speed: number;
  items: SolarSystemItem[];
}

export interface SolarSystemProps extends React.HTMLAttributes<HTMLDivElement> {
  centerLogo?: string | React.ReactNode;
  centerLogoAlt?: string;
  orbits?: OrbitConfig[];
  isPaused?: boolean;
  speedMultiplier?: number;
}

/**
 * ============================================================================
 * DEFAULT ORBITS CONFIGURATION
 * ============================================================================
 */
const DEFAULT_ORBITS: OrbitConfig[] = [
  {
    id: "inner",
    name: "Inner Ring",
    radiusClass: "var(--radius-inner)",
    radiusPx: 175,
    speed: 20,
    items: [
      {
        id: "react",
        label: "React",
        color: "#61DAFB",
        svg: <ReactIcon size={20} />,
      },
      {
        id: "nextjs",
        label: "Next.js",
        color: "#ffffff",
        svg: <NextIcon size={20} />,
      },
      {
        id: "typescript",
        label: "TypeScript",
        color: "#3178C6",
        svg: <TsIcon size={20} />,
      },
      {
        id: "javascript",
        label: "JavaScript",
        color: "#F7DF1E",
        svg: <JsIcon size={20} />,
      },
    ],
  },
  {
    id: "mid",
    name: "Middle Ring",
    radiusClass: "var(--radius-mid)",
    radiusPx: 285,
    speed: 32,
    items: [
      {
        id: "tailwind",
        label: "Tailwind",
        color: "#06B6D4",
        svg: <TailwindIcon size={22} />,
      },
      {
        id: "css",
        label: "CSS",
        color: "#0890f1",
        svg: <CssIcon size={20} />,
      },
    ],
  },
  {
    id: "outer",
    name: "Outer Ring",
    radiusClass: "var(--radius-outer)",
    radiusPx: 395,
    speed: 48,
    items: [
      {
        id: "html",
        label: "HTML",
        color: "#E34F26",
        svg: <HtmlIcon size={20} />,
      },
    ],
  },
];

// Responsive radius values
const getRadiusValues = (width: number) => {
  if (width < 480) {
    return { inner: 70, mid: 115, outer: 160, dust: [65, 100, 140, 160, 85, 150, 175] };
  }
  if (width < 640) {
    return { inner: 85, mid: 140, outer: 195, dust: [80, 125, 170, 200, 105, 185, 215] };
  }
  if (width < 768) {
    return { inner: 100, mid: 165, outer: 230, dust: [95, 150, 200, 235, 125, 220, 255] };
  }
  if (width < 1024) {
    return { inner: 140, mid: 225, outer: 310, dust: [130, 205, 275, 320, 170, 290, 340] };
  }
  return { inner: 175, mid: 285, outer: 395, dust: [165, 260, 340, 395, 200, 365, 430] };
};

export const SolarSystem = React.forwardRef<HTMLDivElement, SolarSystemProps>(
  (
    {
      centerLogo,
      centerLogoAlt = "Core Engine",
      orbits = DEFAULT_ORBITS,
      isPaused = false,
      speedMultiplier = 1,
      className,
      ...props
    },
    ref
  ) => {
    const [hoveredId, setHoveredId] = useState<string | null>(null);
    const [containerWidth, setContainerWidth] = useState<number>(typeof window !== 'undefined' ? window.innerWidth : 1024);
    const [mounted, setMounted] = useState(false);

    // Get responsive values
    const radiusVals = useMemo(() => getRadiusValues(containerWidth), [containerWidth]);

    const dustItems = useMemo(
      () => [
        { delay: "-4s", radius: `${radiusVals.dust[0]}px`, color: "#00f5d4" },
        { delay: "-11s", radius: `${radiusVals.dust[1]}px`, color: "#a855f7" },
        { delay: "-19s", radius: `${radiusVals.dust[2]}px`, color: "#3b82f6" },
        { delay: "-28s", radius: `${radiusVals.dust[3]}px`, color: "#00f5d4" },
        { delay: "-7s", radius: `${radiusVals.dust[4]}px`, color: "#ec4899" },
        { delay: "-15s", radius: `${radiusVals.dust[5]}px`, color: "#eab308" },
        { delay: "-23s", radius: `${radiusVals.dust[6]}px`, color: "#a855f7" },
      ],
      [radiusVals]
    );

    // Update radius CSS variables
    useEffect(() => {
      if (typeof window === "undefined") return;
      
      const root = document.documentElement;
      root.style.setProperty("--radius-inner", `${radiusVals.inner}px`);
      root.style.setProperty("--radius-mid", `${radiusVals.mid}px`);
      root.style.setProperty("--radius-outer", `${radiusVals.outer}px`);
    }, [radiusVals]);

    // Track container width
    const containerRef = useCallback((node: HTMLDivElement | null) => {
      if (!node || typeof window === "undefined") return;
      
      const resizeObserver = new ResizeObserver((entries) => {
        for (const entry of entries) {
          setContainerWidth(entry.contentRect.width);
        }
      });
      
      resizeObserver.observe(node);
      setContainerWidth(node.offsetWidth);
      
      return () => resizeObserver.disconnect();
    }, []);

    useEffect(() => {
      setMounted(true);
    }, []);

    // Memoize container size for performance
    const containerSize = useMemo(() => {
      if (containerWidth < 480) return { w: 320, h: 320 };
      if (containerWidth < 640) return { w: 420, h: 380 };
      if (containerWidth < 768) return { w: 540, h: 400 };
      if (containerWidth < 1024) return { w: 720, h: 440 };
      return { w: 940, h: 450 };
    }, [containerWidth]);

    // Memoize center logo size
    const logoSize = useMemo(() => {
      if (containerWidth < 480) return { w: 44, h: 44, p: 1.5 };
      if (containerWidth < 768) return { w: 56, h: 56, p: 2 };
      return { w: 80, h: 80, p: 3 };
    }, [containerWidth]);

    const isSmall = containerWidth < 640;
    const isExtraSmall = containerWidth < 480;

    if (!mounted) {
      return (
        <div
          ref={ref}
          className={cn(
            "relative flex items-center justify-center w-full h-[320px] md:h-[450px]",
            className
          )}
          {...props}
        />
      );
    }

    return (
      <div
        ref={containerRef}
        className={cn(
          "relative flex items-center justify-center w-full max-w-[940px] h-[160px] md:h-[300px] perspective-[1200px] select-none overflow-visible mb-4 sm:mb-12",
          className
        )}
        {...props}
      >
        <style dangerouslySetInnerHTML={{ __html: `
          :root {
            --radius-inner: ${radiusVals.inner}px;
            --radius-mid: ${radiusVals.mid}px;
            --radius-outer: ${radiusVals.outer}px;
          }

          @keyframes custom-orbitMove {
            0% {
              transform: translate(-50%, -50%) rotateZ(0deg) translateX(var(--orbit-radius));
            }
            100% {
              transform: translate(-50%, -50%) rotateZ(-360deg) translateX(var(--orbit-radius));
            }
          }

          @keyframes custom-billboardCancel {
            0% {
              transform: translate(-50%, -50%) rotateZ(0deg) rotateY(10deg) rotateX(-65deg);
            }
            100% {
              transform: translate(-50%, -50%) rotateZ(360deg) rotateY(10deg) rotateX(-65deg);
            }
          }

          @keyframes custom-sun-pulse {
            0% { transform: scale(0.9); opacity: 0.7; }
            100% { transform: scale(1.1); opacity: 1; }
          }

          @keyframes custom-spin-clockwise {
            0% { transform: rotateX(65deg) rotateY(-10deg) rotateZ(0deg); }
            100% { transform: rotateX(65deg) rotateY(-10deg) rotateZ(360deg); }
          }
          @keyframes custom-spin-counter {
            0% { transform: rotateX(65deg) rotateY(-10deg) rotateZ(0deg); }
            100% { transform: rotateX(65deg) rotateY(-10deg) rotateZ(-360deg); }
          }

          .animate-custom-orbit {
            animation: custom-orbitMove var(--orbit-duration) linear infinite;
            animation-play-state: var(--orbit-play-state);
          }
          .animate-custom-billboard {
            animation: custom-billboardCancel var(--orbit-duration) linear infinite;
            animation-play-state: var(--orbit-play-state);
          }
          .animate-custom-sun-pulse {
            animation: custom-sun-pulse 4s ease-in-out infinite alternate;
          }
          .animate-custom-spin-cw {
            animation: custom-spin-clockwise 20s linear infinite;
          }
          .animate-custom-spin-ccw {
            animation: custom-spin-counter 30s linear infinite;
          }

          .orbit-logo-card {
            position: absolute;
            left: 50%;
            top: 50%;
            display: flex;
            align-items: center;
            gap: ${isExtraSmall ? '4px' : isSmall ? '6px' : '8px'};
            padding: ${isExtraSmall ? '0.2rem 0.5rem' : isSmall ? '0.3rem 0.7rem' : '0.45rem 0.95rem'};
            background: rgba(10, 10, 12, 0.75);
            backdrop-filter: blur(12px);
            -webkit-backdrop-filter: blur(12px);
            border: 1px solid rgba(255, 255, 255, 0.08);
            border-radius: 100px;
            font-weight: 600;
            color: #ffffff;
            white-space: nowrap;
            user-select: none;
            cursor: pointer;
            pointer-events: auto;
            transition: border-color 0.25s ease, color 0.25s ease, background 0.25s ease, box-shadow 0.25s ease, transform 0.25s ease;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.05);
            font-size: ${isExtraSmall ? '9px' : isSmall ? '10px' : '13px'};
            will-change: transform;
          }

          .orbit-logo-card svg {
            width: ${isExtraSmall ? '14px' : isSmall ? '16px' : '20px'};
            height: ${isExtraSmall ? '14px' : isSmall ? '16px' : '20px'};
          }

          @media (min-width: 1024px) {
            .orbit-logo-card {
              padding: 0.5rem 1.1rem;
              gap: 10px;
              font-size: 14px;
            }
            .orbit-logo-card svg {
              width: 22px;
              height: 22px;
            }
          }
        `}} />

        <div 
          className="absolute flex items-center justify-center"
          style={{
            width: containerSize.w,
            height: containerSize.h,
            transform: "rotateX(65deg) rotateY(-10deg)",
            transformStyle: "preserve-3d",
          }}
        >
          {/* Center Logo */}
          <div 
            className="absolute flex items-center justify-center z-20 pointer-events-none"
            style={{
              width: logoSize.w + 20,
              height: logoSize.h + 20,
              transform: "rotateY(10deg) rotateX(-65deg)",
              transformStyle: "preserve-3d",
            }}
          >
            <div 
              className="absolute rounded-full filter blur-md animate-custom-sun-pulse z-10 bg-primary/20"
              style={{
                width: logoSize.w + 10,
                height: logoSize.h + 10,
              }}
            />
            
            {centerLogo ? (
              typeof centerLogo === "string" ? (
                <img
                  className="rounded-full border-2 border-primary/40 shadow-[0_0_30px_#818cf8] z-20 bg-zinc-950 relative"
                  style={{ width: logoSize.w, height: logoSize.h, padding: logoSize.p }}
                  src={centerLogo}
                  alt={centerLogoAlt}
                  width={logoSize.w}
                  height={logoSize.h}
                />
              ) : (
                <div 
                  className="rounded-full border-2 border-primary/40 shadow-[0_0_30px_#818cf8] z-20 bg-zinc-950 flex items-center justify-center relative"
                  style={{ width: logoSize.w, height: logoSize.h, padding: logoSize.p }}
                >
                  {centerLogo}
                </div>
              )
            ) : (
              <div 
                className="rounded-full border-2 border-primary/40 shadow-[0_0_30px_#818cf8] z-20 bg-zinc-950 flex items-center justify-center relative"
                style={{ width: logoSize.w, height: logoSize.h, padding: logoSize.p }}
              >
                <svg 
                  viewBox="0 0 24 24" 
                  className="w-3/4 h-3/4 text-primary animate-pulse" 
                  fill="none" 
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path 
                    d="M10.5 16.5L13.5 7.5" 
                    stroke="currentColor" 
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <path 
                    d="M16.5 8.5L19.5 12L16.5 15.5" 
                    stroke="currentColor" 
                    strokeWidth="2"
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  />
                  <path 
                    d="M7.5 8.5L4.5 12L7.5 15.5" 
                    stroke="currentColor" 
                    strokeWidth="2"
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            )}

            <div 
              className="absolute rounded-full border border-dashed border-primary/20 animate-custom-spin-cw pointer-events-none"
              style={{ width: logoSize.w + 30, height: logoSize.h + 30 }}
            />
            <div 
              className="absolute rounded-full border border-dashed border-primary/10 animate-custom-spin-ccw pointer-events-none"
              style={{ width: logoSize.w + 70, height: logoSize.h + 70 }}
            />
          </div>

          {/* Dust Particles */}
          {dustItems.map((dust, idx) => (
            <div
              key={idx}
              className="absolute left-1/2 top-1/2 w-1 h-1 rounded-full opacity-40 pointer-events-none animate-custom-orbit"
              style={{
                background: dust.color,
                boxShadow: `0 0 6px ${dust.color}`,
                animationDelay: dust.delay,
                animationPlayState: isPaused ? "paused" : "running",
                animationDuration: `${24 / speedMultiplier}s`,
                "--orbit-radius": dust.radius,
                "--orbit-duration": `${24 / speedMultiplier}s`,
                "--orbit-play-state": isPaused ? "paused" : "running",
              } as React.CSSProperties}
            />
          ))}

          {/* Orbits */}
          {orbits.map((orbit) => (
            <React.Fragment key={orbit.id}>
              <div
                className="absolute rounded-full border border-dashed border-zinc-700/60 pointer-events-none"
                style={{
                  width: `calc(2 * ${orbit.radiusClass})`,
                  height: `calc(2 * ${orbit.radiusClass})`,
                  boxShadow: "inset 0 0 25px rgba(255, 255, 255, 0.01), 0 0 25px rgba(255, 255, 255, 0.01)",
                  "--orbit-radius": orbit.radiusClass,
                } as React.CSSProperties}
              />

              {orbit.items.map((item, idx, arr) => {
                const delayValue = -(orbit.speed / arr.length) * idx;
                const durationValue = orbit.speed / speedMultiplier;
                const isHovered = hoveredId === item.id;

                return (
                  <div
                    key={item.id}
                    className="absolute left-1/2 top-1/2 w-0 h-0 pointer-events-none animate-custom-orbit"
                    style={{
                      animationDelay: `${delayValue}s`,
                      animationDuration: `${durationValue}s`,
                      animationPlayState: isPaused ? "paused" : "running",
                      "--orbit-radius": orbit.radiusClass,
                      "--orbit-duration": `${durationValue}s`,
                      "--orbit-play-state": isPaused ? "paused" : "running",
                      "--hover-color": item.color,
                      zIndex: isHovered ? 30 : 10,
                      transformStyle: "preserve-3d",
                    } as React.CSSProperties}
                  >
                    <div
                      className="absolute right-0 top-1/2 h-[1.5px] origin-right -translate-y-1/2 pointer-events-none transition-opacity duration-300 z-0"
                      style={{
                        width: orbit.radiusClass,
                        opacity: isHovered ? 1 : 0,
                        background: `linear-gradient(90deg, rgba(0,0,0,0) 0%, rgba(255,255,255,0.15) 20%, ${item.color} 80%, ${item.color} 100%)`,
                        boxShadow: `0 0 8px ${item.color}, 0 0 16px ${item.color}40`,
                      }}
                    />

                    <div
                      onMouseEnter={() => setHoveredId(item.id)}
                      onMouseLeave={() => setHoveredId(null)}
                      className="orbit-logo-card animate-custom-billboard"
                      style={{
                        animationDelay: `${delayValue}s`,
                        animationDuration: `${durationValue}s`,
                        animationPlayState: isPaused ? "paused" : "running",
                        borderColor: isHovered ? item.color : undefined,
                        boxShadow: isHovered 
                          ? `0 0 20px rgba(0, 0, 0, 0.6), 0 0 15px ${item.color}35`
                          : undefined,
                        transform: isHovered ? "scale(1.05)" : "scale(1)",
                        "--orbit-duration": `${durationValue}s`,
                        "--orbit-play-state": isPaused ? "paused" : "running",
                      } as React.CSSProperties}
                    >
                      <div 
                        className="transition-transform duration-250"
                        style={{
                          transform: isHovered ? "scale(1.1)" : "scale(1)",
                          color: item.color,
                        }}
                      >
                        {item.svg}
                      </div>
                      <span className="tracking-tight">{item.label}</span>
                    </div>
                  </div>
                );
              })}
            </React.Fragment>
          ))}
        </div>
      </div>
    );
  }
);

SolarSystem.displayName = "SolarSystem";