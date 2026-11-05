"use client";

import { motion, useInView, useReducedMotion } from "motion/react";
import { useRef } from "react";
import clsx from "clsx";

/* ==================================================================
   Market cartography — abstract, animated faux data-viz.
   Thin line work, nodes and orbits that explain a concept
   (a system, an exposure, a branching question, a flow of signal)
   without pretending to be a literal chart. All draw in on view,
   loop gently while visible, and stop for reduced motion.
   Colour: inherits currentColor; `accent` for highlighted nodes.
   ================================================================== */

const EASE = [0.16, 1, 0.3, 1] as const;
/** round to 2dp so server and client render identical SVG (no hydration drift) */
const r2 = (n: number) => Math.round(n * 100) / 100;

function useViz() {
  const ref = useRef<SVGSVGElement>(null);
  const inView = useInView(ref as unknown as React.RefObject<Element>, { amount: 0.25 });
  const seen = useInView(ref as unknown as React.RefObject<Element>, { amount: 0.25, once: true });
  const reduce = !!useReducedMotion();
  return { ref, inView, seen, reduce, live: inView && !reduce };
}

const draw = (seen: boolean, reduce: boolean, delay = 0, duration = 1.6) => ({
  initial: reduce ? false : { pathLength: 0, opacity: 0 },
  animate: seen || reduce ? { pathLength: 1, opacity: 1 } : undefined,
  transition: { duration, ease: EASE, delay },
});

const pop = (seen: boolean, reduce: boolean, delay = 0) => ({
  initial: reduce ? false : { scale: 0, opacity: 0 },
  animate: seen || reduce ? { scale: 1, opacity: 1 } : undefined,
  transition: { duration: 0.7, ease: EASE, delay },
});

/** A pulse that travels along a path (dash animation). */
function Pulse({ d, live, dur = 3.2, delay = 0, color = "currentColor", width = 1.6 }: { d: string; live: boolean; dur?: number; delay?: number; color?: string; width?: number }) {
  if (!live) return null;
  return (
    <path
      d={d}
      fill="none"
      stroke={color}
      strokeWidth={width}
      strokeLinecap="round"
      pathLength={100}
      strokeDasharray="6 94"
     
      style={{ animation: `viz-travel ${dur}s linear ${delay}s infinite` }}
    />
  );
}

/* ---------------- Radial system: "every market is a system" ---------------- */
export function RadialSystem({ className, accent = "currentColor", label }: { className?: string; accent?: string; label?: string }) {
  const { ref, seen, reduce, live } = useViz();
  const C = 200;
  const spokes = 24;
  const dots = Array.from({ length: 34 }, (_, i) => {
    const a = (i * 137.5 * Math.PI) / 180;
    const r = 40 + ((i * 53) % 150);
    return { x: r2(C + Math.cos(a) * r), y: r2(C + Math.sin(a) * r), s: i % 7 === 0 ? 3 : 1.6, i };
  });
  return (
    <svg ref={ref} viewBox="0 0 400 400" className={clsx("h-full w-full overflow-visible", className)} fill="none" aria-hidden="true">
      {[60, 110, 160, 190].map((r, i) => (
        <motion.circle key={r} cx={C} cy={C} r={r} stroke="currentColor" strokeOpacity={i === 3 ? 0.35 : 0.22} strokeWidth={1} strokeDasharray={i === 1 ? "2 5" : undefined} {...draw(seen, reduce, i * 0.15, 1.8)} />
      ))}
      <motion.g style={{ originX: "200px", originY: "200px" }} animate={live ? { rotate: 360 } : undefined} transition={{ duration: 160, repeat: Infinity, ease: "linear" }}>
        {Array.from({ length: spokes }, (_, i) => {
          const a = (i / spokes) * Math.PI * 2;
          const rr = i % 3 === 0 ? 190 : 160;
          return <motion.line key={i} x1={C} y1={C} x2={r2(C + Math.cos(a) * rr)} y2={r2(C + Math.sin(a) * rr)} stroke="currentColor" strokeOpacity={0.16} strokeWidth={1} {...draw(seen, reduce, 0.4 + i * 0.02, 1.2)} />;
        })}
        {dots.map((d) => (
          <motion.circle key={d.i} cx={d.x} cy={d.y} r={d.s} fill={d.s > 2 ? accent : "currentColor"} fillOpacity={d.s > 2 ? 1 : 0.7} {...pop(seen, reduce, 0.8 + d.i * 0.025)} />
        ))}
      </motion.g>
      <circle cx={C} cy={C} r={4} fill={accent} />
      {live && <circle cx={C} cy={C} r={4} stroke={accent} className="animate-pulse-ring" style={{ transformOrigin: "200px 200px" }} />}
      {label && <text x={C} y={392} textAnchor="middle" fill="currentColor" fillOpacity={0.55} fontSize={10} letterSpacing={1.2} style={{ fontFamily: "var(--font-archivo)", textTransform: "uppercase" }}>{label}</text>}
    </svg>
  );
}

/* ---------------- Exposure polar: "trace the exposure" ---------------- */
export function ExposurePolar({ className, accent = "currentColor" }: { className?: string; accent?: string }) {
  const { ref, seen, reduce, live } = useViz();
  const C = 200;
  const pts = [
    { a: -60, r: 150, w: 0.9 }, { a: -20, r: 95, w: 0.7 }, { a: 20, r: 170, w: 0.5 }, { a: 55, r: 120, w: 0.85 },
    { a: 100, r: 175, w: 0.4 }, { a: 140, r: 80, w: 0.6 }, { a: 190, r: 140, w: 0.75 }, { a: 235, r: 165, w: 0.35 }, { a: 280, r: 110, w: 0.55 },
  ].map((p) => ({ ...p, x: r2(C + Math.cos((p.a * Math.PI) / 180) * p.r), y: r2(C + Math.sin((p.a * Math.PI) / 180) * p.r) }));
  return (
    <svg ref={ref} viewBox="0 0 400 400" className={clsx("h-full w-full overflow-visible", className)} fill="none" aria-hidden="true">
      {[45, 90, 135, 180].map((r, i) => (
        <motion.circle key={r} cx={C} cy={C} r={r} stroke="currentColor" strokeOpacity={0.2} strokeWidth={1} strokeDasharray="1.5 4" {...draw(seen, reduce, i * 0.12)} />
      ))}
      {[0, 45, 90, 135].map((a) => {
        const r = (a * Math.PI) / 180;
        return <motion.line key={a} x1={r2(C - Math.cos(r) * 190)} y1={r2(C - Math.sin(r) * 190)} x2={r2(C + Math.cos(r) * 190)} y2={r2(C + Math.sin(r) * 190)} stroke="currentColor" strokeOpacity={0.14} {...draw(seen, reduce, 0.3)} />;
      })}
      {pts.map((p, i) => {
        const d = `M${C},${C} L${p.x},${p.y}`;
        return (
          <g key={i}>
            <motion.path d={d} stroke="currentColor" strokeOpacity={0.25 + p.w * 0.5} strokeWidth={0.6 + p.w * 1.2} {...draw(seen, reduce, 0.6 + i * 0.12, 1)} />
            <Pulse d={d} live={live} dur={2.4 + i * 0.3} delay={i * 0.35} color={accent} />
            <motion.circle cx={p.x} cy={p.y} r={2 + p.w * 3} fill={p.w > 0.7 ? accent : "currentColor"} {...pop(seen, reduce, 1 + i * 0.12)} />
          </g>
        );
      })}
      <circle cx={C} cy={C} r={5} fill={accent} />
    </svg>
  );
}

/* ---------------- Branch lines: one origin fanning to outcomes ---------------- */
export function BranchLines({
  className,
  accent = "currentColor",
  origin = "Question",
  branches = ["Investigation", "Analysis", "Evidence"],
}: {
  className?: string;
  accent?: string;
  origin?: string;
  branches?: string[];
}) {
  const { ref, seen, reduce, live } = useViz();
  const ox = 60, oy = 150;
  const n = branches.length;
  const ends = branches.map((b, i) => ({ b, x: 300, y: n === 1 ? oy : 40 + (i * 220) / (n - 1) }));
  return (
    <svg ref={ref} viewBox="0 0 440 300" className={clsx("h-full w-full overflow-visible", className)} fill="none" aria-hidden="true">
      {ends.map((e, i) => {
        const d = `M${ox},${oy} C ${ox + 120},${oy} ${e.x - 140},${e.y} ${e.x},${e.y}`;
        return (
          <g key={e.b}>
            <motion.path d={d} stroke="currentColor" strokeOpacity={0.6} strokeWidth={1.1} {...draw(seen, reduce, 0.3 + i * 0.18, 1.4)} />
            <Pulse d={d} live={live} dur={2.8} delay={i * 0.6} color={accent} width={2} />
            <motion.circle cx={e.x} cy={e.y} r={4} fill={accent} {...pop(seen, reduce, 1.2 + i * 0.18)} />
            <motion.text x={e.x + 14} y={e.y + 4} fill="currentColor" fillOpacity={0.75} fontSize={12} initial={reduce ? false : { opacity: 0 }} animate={seen || reduce ? { opacity: 1 } : undefined} transition={{ delay: 1.4 + i * 0.18 }} style={{ fontFamily: "var(--font-archivo)" }}>
              {e.b}
            </motion.text>
          </g>
        );
      })}
      <circle cx={ox} cy={oy} r={5} fill="currentColor" />
      {live && <circle cx={ox} cy={oy} r={5} stroke="currentColor" className="animate-pulse-ring" style={{ transformOrigin: `${ox}px ${oy}px` }} />}
      <text x={ox} y={oy - 16} textAnchor="middle" fill="currentColor" fillOpacity={0.75} fontSize={12} style={{ fontFamily: "var(--font-archivo)" }}>{origin}</text>
    </svg>
  );
}

/* ---------------- Flow lines: many signals converging and re-routing ---------------- */
export function FlowLines({ className, accent = "currentColor", count = 6 }: { className?: string; accent?: string; count?: number }) {
  const { ref, seen, reduce, live } = useViz();
  const lines = Array.from({ length: count }, (_, i) => {
    const y0 = r2(30 + i * (240 / (count - 1)));
    const y1 = 150 + (i - (count - 1) / 2) * 34;
    return { d: `M10,${y0} C 140,${y0} 150,150 220,150 S 330,${y1} 430,${y1}`, y1, i };
  });
  return (
    <svg ref={ref} viewBox="0 0 440 300" className={clsx("h-full w-full overflow-visible", className)} fill="none" aria-hidden="true">
      {lines.map((l) => (
        <g key={l.i}>
          <motion.path d={l.d} stroke="currentColor" strokeOpacity={0.4} strokeWidth={1} {...draw(seen, reduce, l.i * 0.1, 1.8)} />
          <Pulse d={l.d} live={live} dur={3.6} delay={l.i * 0.5} color={accent} />
          <motion.circle cx={430} cy={l.y1} r={3.5} fill={accent} {...pop(seen, reduce, 1.4 + l.i * 0.08)} />
          <motion.circle cx={10} cy={r2(30 + l.i * (240 / (count - 1)))} r={2.5} fill="currentColor" fillOpacity={0.7} {...pop(seen, reduce, 0.2 + l.i * 0.08)} />
        </g>
      ))}
      <motion.circle cx={220} cy={150} r={7} stroke="currentColor" strokeWidth={1.2} {...pop(seen, reduce, 0.9)} />
      <circle cx={220} cy={150} r={2.5} fill={accent} />
    </svg>
  );
}

/* ---------------- Scenario fan: one start, a distribution of paths ---------------- */
export function ScenarioFan({ className, accent = "currentColor", labels = ["Bull case", "Base case", "Bear case"] }: { className?: string; accent?: string; labels?: string[] }) {
  const { ref, seen, reduce, live } = useViz();
  const paths = Array.from({ length: 14 }, (_, i) => {
    const end = 40 + i * 17;
    const mid = 150 + (end - 150) * 0.45;
    return { d: `M20,150 C 120,150 180,${mid} 260,${(mid + end) / 2} S 360,${end} 400,${end}`, end, i };
  });
  return (
    <svg ref={ref} viewBox="0 0 440 300" className={clsx("h-full w-full overflow-visible", className)} fill="none" aria-hidden="true">
      {paths.map((p) => (
        <motion.path key={p.i} d={p.d} stroke="currentColor" strokeOpacity={p.i === 3 || p.i === 7 || p.i === 11 ? 0.85 : 0.22} strokeWidth={p.i === 3 || p.i === 7 || p.i === 11 ? 1.4 : 1} {...draw(seen, reduce, 0.2 + p.i * 0.05, 1.6)} />
      ))}
      {[3, 7, 11].map((k, j) => (
        <g key={k}>
          <Pulse d={paths[k].d} live={live} dur={3} delay={j * 0.8} color={accent} width={2} />
          <motion.circle cx={400} cy={paths[k].end} r={4} fill={accent} {...pop(seen, reduce, 1.4 + j * 0.15)} />
          <text x={410} y={paths[k].end + 4} fill="currentColor" fillOpacity={0.75} fontSize={11} style={{ fontFamily: "var(--font-archivo)" }}>{labels[j]}</text>
        </g>
      ))}
      <circle cx={20} cy={150} r={5} fill="currentColor" />
    </svg>
  );
}

/* ---------------- Signal field: faux time series with an event marker ---------------- */
export function SignalField({ className, accent = "currentColor", series = 4 }: { className?: string; accent?: string; series?: number }) {
  const { ref, seen, reduce } = useViz();
  const mk = (seed: number, amp: number, base: number) => {
    let s = seed, v = base;
    const pts: string[] = [];
    for (let x = 0; x <= 400; x += 10) {
      s = (s * 9301 + 49297) % 233280;
      v += ((s / 233280) - 0.5) * amp + (x > 240 ? -0.5 * (seed % 3) : 0);
      pts.push(`${x === 0 ? "M" : "L"}${x},${v.toFixed(1)}`);
    }
    return pts.join(" ");
  };
  return (
    <svg ref={ref} viewBox="0 0 400 260" className={clsx("h-full w-full overflow-visible", className)} fill="none" aria-hidden="true">
      {[52, 104, 156, 208].map((y) => (
        <line key={y} x1={0} x2={400} y1={y} y2={y} stroke="currentColor" strokeOpacity={0.1} strokeDasharray="2 4" />
      ))}
      {Array.from({ length: series }, (_, i) => (
        <motion.path key={i} d={mk(7 + i * 13, 14, 70 + i * 40)} stroke={i === 0 ? accent : "currentColor"} strokeOpacity={i === 0 ? 1 : 0.4} strokeWidth={i === 0 ? 1.6 : 1} {...draw(seen, reduce, i * 0.15, 2)} />
      ))}
      <motion.line x1={240} x2={240} y1={10} y2={250} stroke={accent} strokeWidth={1} strokeDasharray="3 3" {...draw(seen, reduce, 1.2, 0.8)} />
      <motion.circle cx={240} cy={18} r={4} fill={accent} {...pop(seen, reduce, 1.6)} />
    </svg>
  );
}
