"use client";

import { useEffect, useRef, useState, useCallback, ReactNode } from "react";
import { motion } from "motion/react";
import {
  CssIcon,
  HtmlIcon,
  JsIcon,
  NextIcon,
  ReactIcon,
  TailwindIcon,
  TsIcon,
} from "../icons";

const chain = [
  {
    stage: 0,
    nodes: [
      {
        id: "html",
        name: "HTML",
        color: "#E34F26",
        bg: "#1a0800",
        icon: <HtmlIcon size={30} />,
      },
      {
        id: "css",
        name: "CSS",
        color: "#0890f1",
        bg: "#011625",
        icon: <CssIcon size={30} />,
      },
    ],
  },
  {
    stage: 1,
    nodes: [
      {
        id: "tailwind",
        name: "Tailwind",
        color: "#06B6D4",
        bg: "#001a1f",
        icon: <TailwindIcon size={40} />,
      },
    ],
  },
  {
    stage: 2,
    nodes: [
      {
        id: "ts",
        name: "TypeScript",
        color: "#3178C6",
        bg: "#001a33",
        icon: <TsIcon size={30} />,
      },
      {
        id: "js",
        name: "JavaScript",
        color: "#F7DF1E",
        bg: "#1a1a00",
        icon: <JsIcon size={30} />,
      },
    ],
  },
  {
    stage: 3,
    nodes: [
      {
        id: "react",
        name: "React",
        color: "#61DAFB",
        bg: "#001a1f",
        icon: <ReactIcon size={30} />,
      },
    ],
  },
  {
    stage: 4,
    nodes: [
      {
        id: "nextjs",
        name: "Next.js",
        color: "#ffffff",
        bg: "#111111",
        icon: <NextIcon size={30} />,
      },
    ],
  },
];

// Which nodes connect to which (from -> to by id)
const edges: [string, string][] = [
  ["html", "tailwind"],
  ["css", "tailwind"],
  ["tailwind", "ts"],
  ["tailwind", "js"],
  ["ts", "react"],
  ["js", "react"],
  ["react", "nextjs"],
];

// ─── Types ────────────────────────────────────────────────────────────────────
interface NodePos {
  id: string;
  x: number;
  y: number;
  w: number;
  h: number;
}

interface EdgePath {
  id: string;
  d: string;
  beamDuration: number;
  beamDelay: number;
}

// ─── SVG Connectors ───────────────────────────────────────────────────────────
function Connectors({ edges }: { edges: EdgePath[] }) {
  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ overflow: "visible" }}
    >
      <defs>
        <linearGradient id="beam" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#0ea5e9" stopOpacity={0} />
          <stop offset="40%" stopColor="#38bdf8" stopOpacity={1} />
          <stop offset="60%" stopColor="#7dd3fc" stopOpacity={1} />
          <stop offset="100%" stopColor="#0ea5e9" stopOpacity={0} />
        </linearGradient>
        <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="2.5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {edges.map((edge) => (
        <g key={edge.id}>
          {/* Base wire */}
          <path
            d={edge.d}
            fill="none"
            stroke="#1e3a4a"
            strokeWidth={1.5}
            strokeLinecap="round"
          />
          {/* Subtle glow base */}
          <path
            d={edge.d}
            fill="none"
            stroke="#0ea5e9"
            strokeWidth={1}
            strokeLinecap="round"
            opacity={0.12}
          />
          {/* Travelling beam */}
          <motion.path
            d={edge.d}
            fill="none"
            stroke="url(#beam)"
            strokeWidth={2.5}
            strokeLinecap="round"
            style={{ filter: "url(#glow)" }}
            initial={{ pathLength: 0, pathOffset: 0, opacity: 0 }}
            animate={{
              pathLength: [0, 0.4, 0],
              pathOffset: [0, 0.6, 1],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: edge.beamDuration,
              delay: edge.beamDelay,
              repeat: Infinity,
              ease: "easeInOut",
              repeatDelay: 1.2,
            }}
          />
        </g>
      ))}
    </svg>
  );
}

// ─── Skill Node ───────────────────────────────────────────────────────────────
function SkillNode({
  node,
  stageIndex,
  nodeIndex,
  nodeRef,
}: {
  node: {
    id: string;
    name: string;
    color: string;
    bg: string;
    icon: ReactNode;
  };
  stageIndex: number;
  nodeIndex: number;
  nodeRef: (el: HTMLDivElement | null) => void;
}) {
  const [hovered, setHovered] = useState(false);
  const delay = stageIndex * 0.15 + nodeIndex * 0.08;

  return (
    <motion.div
      ref={nodeRef}
      data-node-id={node.id}
      className="relative cursor-pointer select-none"
      initial={{ opacity: 0, scale: 0.7 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.45,
        delay,
        type: "spring",
        stiffness: 220,
        damping: 18,
      }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
    >
      {/* Pulsing border ring */}
      <motion.div
        className="absolute rounded-xl border"
        style={{ borderColor: `${node.color}40`, inset: -3 }}
        animate={{ opacity: [0.3, 0.9, 0.3], scale: [0.97, 1.04, 0.97] }}
        transition={{
          duration: 2.8,
          repeat: Infinity,
          delay: stageIndex * 0.3 + nodeIndex * 0.15,
        }}
      />

      {/* Glow on hover */}
      <motion.div
        className="absolute inset-0 rounded-xl"
        animate={{
          boxShadow: hovered
            ? `0 0 24px 6px ${node.color}44`
            : `0 0 8px 1px ${node.color}18`,
        }}
        transition={{ duration: 0.25 }}
      />

      {/* Card */}
      <motion.div
        className="group relative flex items-center justify-center overflow-hidden rounded-xl border border-white/10 backdrop-blur-sm"
        style={{
          background: node.bg,
          width: "100px",
          height: "48px",
        }}
        animate={{ y: hovered ? -3 : 0 }}
        transition={{ duration: 0.2 }}
      >
        {/* Shimmer */}
        <motion.div
          className="absolute inset-0 bg-linear-to-br from-white/8 to-transparent"
          animate={{ opacity: hovered ? 1 : 0.5 }}
        />

        {/* Icon */}
        <span
          className="absolute z-10 transition-all duration-300 group-hover:opacity-0 group-hover:scale-75"
          style={{ color: node.color }}
        >
          {node.icon}
        </span>

        {/* Name */}
        <span
          className="absolute z-10 opacity-0 scale-90 transition-all duration-300 group-hover:opacity-100 group-hover:scale-100"
          style={{ color: node.color }}
        >
          {node.name}
        </span>
      </motion.div>
    </motion.div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function SkillsChain() {
  const containerRef = useRef<HTMLDivElement>(null);
  const nodeEls = useRef<Map<string, HTMLDivElement>>(new Map());
  const [edgePaths, setEdgePaths] = useState<EdgePath[]>([]);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 640px)");
    setIsMobile(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const recalc = useCallback(() => {
    if (!containerRef.current) return;
    const cRect = containerRef.current.getBoundingClientRect();

    const positions = new Map<string, NodePos>();
    nodeEls.current.forEach((el, id) => {
      const r = el.getBoundingClientRect();
      positions.set(id, {
        id,
        x: r.left - cRect.left,
        y: r.top - cRect.top,
        w: r.width,
        h: r.height,
      });
    });

    const paths: EdgePath[] = [];
    edges.forEach(([fromId, toId], i) => {
      const from = positions.get(fromId);
      const to = positions.get(toId);
      if (!from || !to) return;

      // Connection points: right-center of "from", left-center of "to" (desktop)
      // bottom-center of "from", top-center of "to" (mobile)
      let fx: number, fy: number, tx: number, ty: number;

      if (isMobile) {
        fx = from.x + from.w / 2;
        fy = from.y + from.h;
        tx = to.x + to.w / 2;
        ty = to.y;
      } else {
        fx = from.x + from.w;
        fy = from.y + from.h / 2;
        tx = to.x;
        ty = to.y + to.h / 2;
      }

      // Smooth cubic bezier
      const dx = Math.abs(tx - fx);
      const dy = Math.abs(ty - fy);
      let d: string;

      if (isMobile) {
        const cy = (fy + ty) / 2;
        d = `M ${fx} ${fy} C ${fx} ${cy}, ${tx} ${cy}, ${tx} ${ty}`;
      } else {
        const cx1 = fx + dx * 0.5;
        const cy1 = fy;
        const cx2 = tx - dx * 0.5;
        const cy2 = ty;
        d = `M ${fx} ${fy} C ${cx1} ${cy1}, ${cx2} ${cy2}, ${tx} ${ty}`;
      }

      paths.push({
        id: `${fromId}-${toId}`,
        d,
        beamDuration: 1.4 + (i % 3) * 0.3,
        beamDelay: i * 0.2,
      });
    });

    setEdgePaths(paths);
  }, [isMobile]);

  useEffect(() => {
    // Small timeout to let layout settle
    const t = setTimeout(recalc, 80);
    window.addEventListener("resize", recalc);
    return () => {
      clearTimeout(t);
      window.removeEventListener("resize", recalc);
    };
  }, [recalc]);

  return (
    <div
      ref={containerRef}
      className="relative w-full"
      style={{ minHeight: isMobile ? "auto" : "140px" }}
    >
      {/* SVG layer */}
      <Connectors edges={edgePaths} />

      {/* Desktop: flex row of stages */}
      {/* Mobile: flex column of stages */}
      <div
        className="
          relative z-10
          flex items-center justify-center
          gap-16
          md:flex-row
          flex-col
          py-5 px-6
        "
        dir="ltr"
      >
        {chain.map((stage, si) => (
          <div
            key={stage.stage}
            className={`
              flex items-center justify-center gap-4
              flex-row md:flex-col
            `}
          >
            {stage.nodes.map((node, ni) => (
              <SkillNode
                key={node.id}
                node={node}
                stageIndex={si}
                nodeIndex={ni}
                nodeRef={(el) => {
                  if (el) nodeEls.current.set(node.id, el);
                  else nodeEls.current.delete(node.id);
                }}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
