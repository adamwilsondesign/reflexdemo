"use client";

import { motion, useInView, useReducedMotion } from "motion/react";
import { useRef } from "react";
import clsx from "clsx";

/* ------------------------------------------------------------------
   Precision line illustrations (rebuilt from the Figma line art so they
   draw on, inherit currentColor and stay crisp). Decorative only.
   ------------------------------------------------------------------ */

const EASE = [0.16, 1, 0.3, 1] as const;

function useDraw() {
  const ref = useRef<SVGSVGElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const visible = useInView(ref, { amount: 0 });
  const reduce = useReducedMotion();
  const draw = (delay: number, duration = 1.6) =>
    reduce
      ? { initial: false as const }
      : {
          initial: { pathLength: 0, opacity: 0 },
          animate: inView ? { pathLength: 1, opacity: 1 } : undefined,
          transition: { duration, delay, ease: EASE },
        };
  const pop = (delay: number) =>
    reduce
      ? { initial: false as const }
      : { initial: { scale: 0, opacity: 0 }, animate: inView ? { scale: 1, opacity: 1 } : undefined, transition: { duration: 0.6, delay, ease: EASE } };
  return { ref, draw, pop, reduce: reduce || !visible };
}

/** Two points joined by a lens of arcs (n949): many routes between a question and an answer. */
export function LensLines({ className }: { className?: string }) {
  const { ref, draw, pop } = useDraw();
  const arcs = Array.from({ length: 13 }, (_, i) => (i - 6) * 42);
  return (
    <svg ref={ref} viewBox="0 0 520 560" fill="none" className={clsx("h-full w-full", className)} aria-hidden="true">
      {[130, 260, 390].map((x, i) => (
        <motion.line key={x} x1={x} x2={x} y1={20} y2={540} stroke="currentColor" strokeOpacity={0.35} strokeWidth={1} vectorEffect="non-scaling-stroke" {...draw(0.1 * i, 1.2)} />
      ))}
      {arcs.map((d, i) => (
        <motion.path
          key={d}
          d={`M10 280 C 150 ${280 + d * 1.3}, 370 ${280 + d * 1.3}, 510 280`}
          stroke="currentColor"
          strokeOpacity={0.75}
          strokeWidth={1}
          vectorEffect="non-scaling-stroke"
          {...draw(0.2 + i * 0.05)}
        />
      ))}
      {arcs.map((d, i) => (
        <motion.circle key={`p${d}`} cx={260} cy={280 + d * 0.975} r={2.6} fill="#7d978c" {...pop(1.1 + i * 0.03)} />
      ))}
      <motion.circle cx={10} cy={280} r={6} stroke="currentColor" strokeWidth={3} fill="none" {...pop(0.2)} />
      <motion.circle cx={510} cy={280} r={8} stroke="currentColor" strokeWidth={4} fill="none" {...pop(1.6)} />
    </svg>
  );
}

/** Three interlocking ring sets with evidence points in the overlap (n925): a theme seen from several angles. */
export function VennRings({ className }: { className?: string }) {
  const { ref, draw, pop, reduce } = useDraw();
  const centres = [
    [215, 230],
    [345, 230],
    [280, 335],
  ];
  const pts = [
    [262, 252], [288, 276], [318, 257], [337, 249], [236, 288], [299, 297], [316, 283], [251, 319], [293, 325],
  ];
  return (
    <svg ref={ref} viewBox="0 0 560 580" fill="none" className={clsx("h-full w-full", className)} aria-hidden="true">
      {centres.map(([cx, cy], s) =>
        Array.from({ length: 6 }, (_, i) => (
          <motion.circle
            key={`${s}-${i}`}
            cx={cx}
            cy={cy}
            r={70 + i * 26}
            stroke="currentColor"
            strokeOpacity={0.8}
            strokeWidth={1}
            vectorEffect="non-scaling-stroke"
            {...draw(s * 0.25 + i * 0.07, 1.8)}
          />
        )),
      )}
      {pts.map(([x, y], i) => (
        <motion.g key={i} {...pop(1.4 + i * 0.07)} style={{ transformOrigin: `${x}px ${y}px` }}>
          <circle cx={x} cy={y} r={6} stroke="currentColor" strokeWidth={1.4} />
          <circle cx={x} cy={y} r={2.2} fill="currentColor" />
          {!reduce && i % 3 === 0 && (
            <motion.circle cx={x} cy={y} r={6} stroke="currentColor" strokeWidth={1} initial={{ opacity: 0.6, scale: 1 }} animate={{ opacity: 0, scale: 3 }} transition={{ duration: 2.6, repeat: Infinity, delay: 2 + i * 0.4, ease: "easeOut" }} style={{ transformOrigin: `${x}px ${y}px` }} />
          )}
        </motion.g>
      ))}
    </svg>
  );
}

/** Concentric rings deformed by a shock at a single point (n927): a scenario hitting a system. */
export function ShockRings({ className }: { className?: string }) {
  const { ref, draw, pop, reduce } = useDraw();
  const rings = Array.from({ length: 13 }, (_, i) => i);
  const shape = (i: number) => {
    const rx = 28 + i * 17;
    const ry = 40 + i * 21;
    const cx = 300;
    const cy = 310;
    const left = cx - rx;
    const pinch = Math.max(0, 70 - i * 2) * (i / 12); // rings pulled toward the shock point
    const k = 0.5523;
    // ellipse with its left side pulled toward the shock at x = 70
    return `M ${cx} ${cy - ry}
      C ${cx + rx * k} ${cy - ry}, ${cx + rx} ${cy - ry * k}, ${cx + rx} ${cy}
      C ${cx + rx} ${cy + ry * k}, ${cx + rx * k} ${cy + ry}, ${cx} ${cy + ry}
      C ${cx - rx * k} ${cy + ry}, ${left} ${cy + ry * k}, ${left - pinch * 0.3} ${cy + 22}
      L ${left - pinch} ${cy}
      L ${left - pinch * 0.3} ${cy - 22}
      C ${left} ${cy - ry * k}, ${cx - rx * k} ${cy - ry}, ${cx} ${cy - ry}Z`;
  };
  return (
    <svg ref={ref} viewBox="0 0 560 620" fill="none" className={clsx("h-full w-full", className)} aria-hidden="true">
      <motion.line x1={70} x2={70} y1={30} y2={590} stroke="currentColor" strokeOpacity={0.7} strokeWidth={1} vectorEffect="non-scaling-stroke" {...draw(0, 1)} />
      {rings.map((i) => (
        <motion.path key={i} d={shape(i)} stroke="currentColor" strokeOpacity={0.85} strokeWidth={1} vectorEffect="non-scaling-stroke" {...draw(0.3 + i * 0.06, 1.6)} />
      ))}
      <motion.g {...pop(0.2)} style={{ transformOrigin: "70px 310px" }}>
        <circle cx={70} cy={310} r={9} fill="#3e5c50" stroke="currentColor" strokeWidth={2} />
        <circle cx={70} cy={310} r={3} fill="currentColor" />
      </motion.g>
      {!reduce && (
        <motion.circle cx={70} cy={310} r={9} stroke="currentColor" strokeWidth={1} initial={{ opacity: 0.7, scale: 1 }} animate={{ opacity: 0, scale: 5 }} transition={{ duration: 2.8, repeat: Infinity, delay: 2, ease: "easeOut" }} style={{ transformOrigin: "70px 310px" }} />
      )}
    </svg>
  );
}
