"use client";

import { motion, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import clsx from "clsx";

/* ==================================================================
   Deployment marks: one quiet line-art family for this page.
   - currentColor line work, no labels, no transforms that could drift
   - lines draw in once on view; then ONE motion idea per mark,
     stepping every 4.8s (or a single travelling pulse)
   - reduced motion: fully drawn, static
   ================================================================== */

const EASE = [0.16, 1, 0.3, 1] as const;
const STEP_MS = 4800;

function useMark(count: number) {
  const ref = useRef<SVGSVGElement>(null);
  const inView = useInView(ref as unknown as React.RefObject<Element>, { amount: 0.3 });
  const seen = useInView(ref as unknown as React.RefObject<Element>, { amount: 0.3, once: true });
  const reduce = !!useReducedMotion();
  const [i, setI] = useState(0);
  const live = inView && !reduce;
  useEffect(() => {
    if (!live || count < 2) return;
    const t = setTimeout(() => setI((v) => (v + 1) % count), STEP_MS);
    return () => clearTimeout(t);
  }, [i, live, count]);
  return { ref, seen: seen || reduce, reduce, live, i };
}

const draw = (seen: boolean, reduce: boolean, delay = 0, duration = 1.4) => ({
  initial: reduce ? false : { pathLength: 0, opacity: 0 },
  animate: seen ? { pathLength: 1, opacity: 1 } : undefined,
  transition: { duration, ease: EASE, delay },
});

/** A short dash that travels along a path (same keyframes as the shared cartography). */
function Travel({ d, live, dur = 4.8, delay = 0 }: { d: string; live: boolean; dur?: number; delay?: number }) {
  if (!live) return null;
  return (
    <path
      d={d}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      pathLength={100}
      strokeDasharray="6 94"
      style={{ animation: `viz-travel ${dur}s linear ${delay}s infinite` }}
    />
  );
}

/* ---------------- Hero: your stack + one Reflexivity layer ---------------- */
/**
 * Four outlined layers (your existing stack) stay where they are. A single node
 * (Reflexivity) sits beside them; hairlines connect it to every layer. One motion
 * idea: every 4.8s the next layer lights up and a pulse travels to it.
 */
export function StackMark({ className }: { className?: string }) {
  const { ref, seen, reduce, live, i } = useMark(4);
  const layers = [72, 152, 232, 312];
  const NX = 420, NY = 192;
  const path = (y: number) => `M${NX},${NY} C 370,${NY} 360,${y + 24} 312,${y + 24}`;
  return (
    <svg ref={ref} viewBox="0 0 480 400" className={clsx("h-full w-full", className)} fill="none" aria-label="Diagram: Reflexivity connects to each layer of your existing stack without replacing it." role="img">
      {layers.map((y, k) => {
        const on = k === i;
        return (
          <g key={y}>
            <motion.rect
              x={40}
              y={y}
              width={272}
              height={48}
              rx={8}
              stroke="currentColor"
              strokeWidth={1.2}
              initial={reduce ? false : { opacity: 0, strokeOpacity: 0.35 }}
              animate={seen ? { opacity: 1, strokeOpacity: on ? 0.95 : 0.35 } : undefined}
              transition={{ duration: 0.6, ease: EASE, opacity: { duration: 0.8, delay: k * 0.12 } }}
              fill="none"
            />
            <g stroke="currentColor" strokeOpacity={0.3}>
              <line x1={64} y1={y + 18} x2={136 + k * 16} y2={y + 18} />
              <line x1={64} y1={y + 30} x2={104 + ((k * 23) % 40)} y2={y + 30} />
            </g>
            <motion.path d={path(y)} stroke="currentColor" strokeOpacity={0.3} {...draw(seen, reduce, 0.6 + k * 0.12)} />
            <motion.circle
              cx={312}
              cy={y + 24}
              r={3}
              fill="currentColor"
              animate={{ opacity: on ? 1 : 0.4 }}
              transition={{ duration: 0.6, ease: EASE }}
            />
            {on && <Travel key={`t${i}`} d={path(y)} live={live} dur={2.4} />}
          </g>
        );
      })}
      <motion.circle cx={NX} cy={NY} r={22} stroke="currentColor" strokeOpacity={0.35} {...draw(seen, reduce, 0.3)} />
      <circle cx={NX} cy={NY} r={9} fill="currentColor" />
    </svg>
  );
}

/* ---------------- Platform Access: one maintained workspace ---------------- */
/** A single frame holding three panes; the highlight moves pane to pane every 4.8s. */
export function PlatformMark({ className }: { className?: string }) {
  const { ref, seen, reduce, i } = useMark(3);
  const panes = [
    { x: 64, y: 88, w: 108, h: 176 },
    { x: 188, y: 88, w: 148, h: 80 },
    { x: 188, y: 184, w: 148, h: 80 },
  ];
  return (
    <svg ref={ref} viewBox="0 0 400 320" className={clsx("h-full w-full", className)} fill="none" aria-hidden="true">
      <motion.rect x={40} y={40} width={320} height={248} rx={12} stroke="currentColor" strokeOpacity={0.6} strokeWidth={1.2} {...draw(seen, reduce)} />
      <motion.line x1={40} y1={68} x2={360} y2={68} stroke="currentColor" strokeOpacity={0.3} {...draw(seen, reduce, 0.3)} />
      {[56, 66, 76].map((x) => <circle key={x} cx={x} cy={54} r={2.5} fill="currentColor" fillOpacity={0.4} />)}
      {panes.map((p, k) => (
        <g key={k}>
          <motion.rect
            x={p.x}
            y={p.y}
            width={p.w}
            height={p.h}
            rx={6}
            stroke="currentColor"
            strokeWidth={1}
            fill="currentColor"
            animate={{ fillOpacity: k === i ? 0.12 : 0, strokeOpacity: k === i ? 0.9 : 0.35 }}
            transition={{ duration: 0.6, ease: EASE }}
          />
          <line x1={p.x + 14} y1={p.y + 20} x2={p.x + p.w * 0.6} y2={p.y + 20} stroke="currentColor" strokeOpacity={0.35} />
          <line x1={p.x + 14} y1={p.y + 32} x2={p.x + p.w * 0.4} y2={p.y + 32} stroke="currentColor" strokeOpacity={0.25} />
        </g>
      ))}
    </svg>
  );
}

/* ---------------- API & MCP: your agents call in, answers return ---------------- */
/** Three of your tools on the left, one service node on the right; a single request travels in turn. */
export function ApiMark({ className }: { className?: string }) {
  const { ref, seen, reduce, live, i } = useMark(3);
  const ys = [80, 160, 240];
  const SX = 300, SY = 160;
  const path = (y: number) => `M92,${y} C 190,${y} 200,${SY} ${SX - 28},${SY}`;
  return (
    <svg ref={ref} viewBox="0 0 400 320" className={clsx("h-full w-full", className)} fill="none" aria-hidden="true">
      {ys.map((y, k) => (
        <g key={y}>
          <motion.rect
            x={40}
            y={y - 20}
            width={52}
            height={40}
            rx={8}
            stroke="currentColor"
            strokeWidth={1.2}
            animate={{ strokeOpacity: k === i ? 0.95 : 0.4 }}
            transition={{ duration: 0.6, ease: EASE }}
          />
          <motion.path d={path(y)} stroke="currentColor" strokeOpacity={0.3} {...draw(seen, reduce, 0.3 + k * 0.12)} />
          {k === i && <Travel key={`a${i}`} d={path(y)} live={live} dur={2.4} />}
        </g>
      ))}
      <motion.circle cx={SX} cy={SY} r={28} stroke="currentColor" strokeOpacity={0.9} strokeWidth={1.2} {...draw(seen, reduce, 0.2)} />
      <motion.circle cx={SX} cy={SY} r={48} stroke="currentColor" strokeOpacity={0.25} strokeDasharray="2 5" {...draw(seen, reduce, 0.4)} />
      <circle cx={SX} cy={SY} r={6} fill="currentColor" />
    </svg>
  );
}

/* ---------------- Knowledge Graph as a feed: a graph becomes rows ---------------- */
const G_NODES = [
  { x: 92, y: 96 }, { x: 148, y: 72 }, { x: 160, y: 140 }, { x: 96, y: 176 },
  { x: 140, y: 220 }, { x: 64, y: 244 }, { x: 200, y: 196 },
];
const G_EDGES: [number, number][] = [[0, 1], [0, 2], [1, 2], [2, 3], [3, 4], [3, 5], [2, 6], [4, 6], [4, 5]];
/** A small relationship graph on the left; structured rows on the right. One row fills in every 4.8s. */
export function FeedMark({ className }: { className?: string }) {
  const { ref, seen, reduce, i } = useMark(4);
  const rows = [88, 136, 184, 232];
  return (
    <svg ref={ref} viewBox="0 0 400 320" className={clsx("h-full w-full", className)} fill="none" aria-hidden="true">
      {G_EDGES.map(([a, b], k) => (
        <motion.line key={k} x1={G_NODES[a].x} y1={G_NODES[a].y} x2={G_NODES[b].x} y2={G_NODES[b].y} stroke="currentColor" strokeOpacity={0.35} {...draw(seen, reduce, k * 0.06)} />
      ))}
      {G_NODES.map((n, k) => (
        <circle key={k} cx={n.x} cy={n.y} r={k === 2 ? 6 : 3.5} fill="currentColor" fillOpacity={k === 2 ? 1 : 0.75} />
      ))}
      <motion.path d="M206,160 L236,160" stroke="currentColor" strokeOpacity={0.5} {...draw(seen, reduce, 0.6)} />
      <path d="M232,156 L237,160 L232,164" stroke="currentColor" strokeOpacity={0.5} />
      <motion.rect x={248} y={64} width={112} height={192} rx={8} stroke="currentColor" strokeOpacity={0.6} strokeWidth={1.2} {...draw(seen, reduce, 0.5)} />
      {rows.map((y, k) => (
        <g key={y}>
          {k > 0 && <line x1={248} y1={y - 24} x2={360} y2={y - 24} stroke="currentColor" strokeOpacity={0.2} />}
          <circle cx={266} cy={y} r={2.5} fill="currentColor" fillOpacity={0.6} />
          <motion.line
            x1={278}
            y1={y}
            x2={342}
            y2={y}
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            animate={{ strokeOpacity: k <= i ? 0.8 : 0.15 }}
            transition={{ duration: 0.6, ease: EASE }}
          />
        </g>
      ))}
    </svg>
  );
}

/* ---------------- Embedded & White-Label: a frame inside your frame ---------------- */
/** Your product's frame stays; Reflexivity's module sits inside it and quietly breathes. */
export function EmbedMark({ className }: { className?: string }) {
  const { ref, seen, reduce, i } = useMark(2);
  return (
    <svg ref={ref} viewBox="0 0 400 320" className={clsx("h-full w-full", className)} fill="none" aria-hidden="true">
      <motion.rect x={40} y={40} width={320} height={248} rx={12} stroke="currentColor" strokeOpacity={0.45} strokeWidth={1.2} {...draw(seen, reduce)} />
      <line x1={40} y1={72} x2={360} y2={72} stroke="currentColor" strokeOpacity={0.25} />
      <line x1={112} y1={72} x2={112} y2={288} stroke="currentColor" strokeOpacity={0.25} />
      {[100, 124, 148].map((y) => <line key={y} x1={60} y1={y} x2={92} y2={y} stroke="currentColor" strokeOpacity={0.3} />)}
      <line x1={60} y1={56} x2={100} y2={56} stroke="currentColor" strokeOpacity={0.4} strokeWidth={2} strokeLinecap="round" />
      <motion.rect
        x={140}
        y={100}
        width={192}
        height={160}
        rx={8}
        stroke="currentColor"
        strokeWidth={1.4}
        fill="currentColor"
        initial={reduce ? false : { pathLength: 0, opacity: 0 }}
        animate={seen ? { pathLength: 1, opacity: 1, fillOpacity: i === 1 ? 0.12 : 0.04 } : undefined}
        transition={{ pathLength: { duration: 1.4, delay: 0.5, ease: EASE }, opacity: { duration: 0.6, delay: 0.5 }, fillOpacity: { duration: 1.2, ease: EASE } }}
      />
      <circle cx={162} cy={124} r={5} fill="currentColor" />
      <line x1={176} y1={124} x2={250} y2={124} stroke="currentColor" strokeOpacity={0.6} />
      <path d="M160,224 L200,196 L236,208 L276,168 L312,176" stroke="currentColor" strokeOpacity={0.7} strokeWidth={1.2} />
    </svg>
  );
}
