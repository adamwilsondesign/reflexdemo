"use client";

import { motion, useInView, useReducedMotion } from "motion/react";
import { useRef } from "react";

const EASE = [0.16, 1, 0.3, 1] as const;

const NODES = [
  { id: "home", x: 22, y: 30, label: "Home", r: 3.2 },
  { id: "platform", x: 50, y: 18, label: "Platform", r: 2.6 },
  { id: "alfred", x: 74, y: 34, label: "Alfred", r: 2.6 },
  { id: "graph", x: 44, y: 52, label: "Knowledge Graph", r: 3.6 },
  { id: "blog", x: 18, y: 70, label: "Blog", r: 2.4 },
  { id: "demo", x: 58, y: 82, label: "Request a Demo", r: 2.8 },
] as const;
const LOST = { x: 86, y: 70 };
const EDGES: [string, string][] = [
  ["home", "platform"],
  ["platform", "alfred"],
  ["home", "graph"],
  ["platform", "graph"],
  ["alfred", "graph"],
  ["graph", "blog"],
  ["graph", "demo"],
  ["blog", "demo"],
];

const at = (id: string) => NODES.find((n) => n.id === id)!;

/** A small relationship graph with one edge that no longer resolves: the 404. */
export function BrokenGraph() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.2 });
  const reduce = useReducedMotion();
  const loop = inView && !reduce;
  const a = at("alfred");
  // Broken edge: alfred → lost node, drawn in two pieces with a gap.
  const mx = (a.x + LOST.x) / 2, my = (a.y + LOST.y) / 2;

  return (
    <div ref={ref} className="relative aspect-[10/9] w-full" aria-hidden="true">
      <svg viewBox="0 0 100 90" className="absolute inset-0 h-full w-full overflow-visible">
        {EDGES.map(([f, t], i) => {
          const A = at(f), B = at(t);
          return (
            <motion.line
              key={f + t}
              x1={A.x}
              y1={A.y}
              x2={B.x}
              y2={B.y}
              stroke="currentColor"
              strokeOpacity={0.28}
              strokeWidth={0.35}
              initial={reduce ? false : { pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1, delay: 0.3 + i * 0.08, ease: EASE }}
            />
          );
        })}

        {/* travelling pulse on a healthy edge */}
        {loop && (
          <motion.circle
            r={0.7}
            fill="#5d738c"
            initial={{ cx: at("home").x, cy: at("home").y, opacity: 0 }}
            animate={{ cx: [at("home").x, at("graph").x, at("demo").x], cy: [at("home").y, at("graph").y, at("demo").y], opacity: [0, 1, 0] }}
            transition={{ duration: 3.2, repeat: Infinity, repeatDelay: 1.2, ease: "easeInOut" }}
          />
        )}

        {/* broken edge, first half */}
        <motion.line
          x1={a.x}
          y1={a.y}
          x2={mx - 2.2}
          y2={my - 2.6}
          stroke="#9a4b3c"
          strokeWidth={0.45}
          initial={reduce ? false : { pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.8, delay: 1.1, ease: EASE }}
        />
        {/* broken edge, second half: dashed and drifting */}
        <motion.line
          x1={mx + 2.2}
          y1={my + 2.6}
          x2={LOST.x}
          y2={LOST.y}
          stroke="#9a4b3c"
          strokeWidth={0.45}
          strokeDasharray="1.2 1.4"
          initial={reduce ? false : { opacity: 0 }}
          animate={loop ? { opacity: [0.25, 0.8, 0.25] } : { opacity: 0.5 }}
          transition={loop ? { duration: 2.8, repeat: Infinity, ease: "easeInOut", delay: 1.6 } : { duration: 0.6, delay: 1.6 }}
        />
        {/* snap marks */}
        <motion.g initial={reduce ? false : { opacity: 0, scale: 0.6 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, delay: 1.7, ease: EASE }} style={{ transformOrigin: `${mx}px ${my}px` }}>
          <line x1={mx - 1.2} y1={my + 1.4} x2={mx + 0.2} y2={my - 0.2} stroke="#9a4b3c" strokeWidth={0.35} />
          <line x1={mx + 0.4} y1={my + 1.8} x2={mx + 1.6} y2={my + 0.4} stroke="#9a4b3c" strokeWidth={0.35} />
        </motion.g>

        {NODES.map((n, i) => (
          <motion.g key={n.id} initial={reduce ? false : { opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.15 + i * 0.08 }}>
            <circle cx={n.x} cy={n.y} r={n.r} fill="var(--color-paper)" stroke="currentColor" strokeWidth={0.4} />
            <circle cx={n.x} cy={n.y} r={n.r * 0.38} fill="currentColor" />
            <text x={n.x} y={n.y + n.r + 3.6} textAnchor="middle" className="fill-current font-mono" style={{ fontSize: 2.3, letterSpacing: "0.04em", textTransform: "uppercase", opacity: 0.6 }}>
              {n.label}
            </text>
          </motion.g>
        ))}

        {/* the node that no longer resolves */}
        <motion.g
          initial={reduce ? false : { opacity: 0 }}
          animate={loop ? { opacity: 1, x: [0, 1.2, 0], y: [0, -1, 0] } : { opacity: 1 }}
          transition={loop ? { opacity: { duration: 0.6, delay: 1.8 }, x: { duration: 6, repeat: Infinity, ease: "easeInOut" }, y: { duration: 6, repeat: Infinity, ease: "easeInOut" } } : { duration: 0.6, delay: 1.8 }}
        >
          <circle cx={LOST.x} cy={LOST.y} r={4.2} fill="none" stroke="#9a4b3c" strokeWidth={0.4} strokeDasharray="1 1" />
          <text x={LOST.x} y={LOST.y + 1} textAnchor="middle" className="font-mono" style={{ fontSize: 2.8, fill: "#9a4b3c", fontWeight: 500 }}>
            404
          </text>
          <text x={LOST.x} y={LOST.y + 8} textAnchor="middle" className="font-mono" style={{ fontSize: 2.3, fill: "#9a4b3c", letterSpacing: "0.04em", textTransform: "uppercase", opacity: 0.8 }}>
            Unresolved
          </text>
        </motion.g>
      </svg>
    </div>
  );
}
