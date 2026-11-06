"use client";

import { motion, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";

const EASE = [0.16, 1, 0.3, 1] as const;
const C = 200;
const r2 = (n: number) => Math.round(n * 100) / 100;

/**
 * Local, static-centred radial for "One environment per client".
 * Nothing rotates: the spokes converge exactly on (200,200), the centre of every ring.
 * The only motion is a soft ring breathing outward from that same centre (radius
 * animation, not a transform, so the origin cannot drift).
 */
export function IsolationViz() {
  const ref = useRef<SVGSVGElement>(null);
  const inView = useInView(ref, { amount: 0.3 });
  const reduce = useReducedMotion();
  // Render geometry after mount: trig output can differ in the last digit between server and client.
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const seen = inView || !!reduce;
  const live = inView && !reduce;

  const spokes = Array.from({ length: 24 }, (_, i) => {
    const a = (i / 24) * Math.PI * 2;
    const rr = i % 3 === 0 ? 180 : 150;
    return { x: r2(C + Math.cos(a) * rr), y: r2(C + Math.sin(a) * rr), i };
  });
  const dots = Array.from({ length: 30 }, (_, i) => {
    const a = (i * 137.5 * Math.PI) / 180;
    const r = 50 + ((i * 53) % 130);
    return { x: r2(C + Math.cos(a) * r), y: r2(C + Math.sin(a) * r), big: i % 7 === 0, i };
  });

  return (
    <svg ref={ref} viewBox="0 0 400 400" className="h-full w-full" fill="none" aria-hidden="true">
      {mounted && (
        <>
          {[56, 104, 150, 184].map((r, i) => (
            <motion.circle
              key={r}
              cx={C}
              cy={C}
              r={r}
              stroke="currentColor"
              strokeOpacity={i === 3 ? 0.4 : 0.22}
              strokeDasharray={i === 1 ? "2 5" : undefined}
              initial={reduce ? false : { pathLength: 0, opacity: 0 }}
              animate={seen ? { pathLength: 1, opacity: 1 } : undefined}
              transition={{ duration: 1.8, delay: i * 0.15, ease: EASE }}
            />
          ))}
          {spokes.map((s) => (
            <motion.line
              key={s.i}
              x1={C}
              y1={C}
              x2={s.x}
              y2={s.y}
              stroke="currentColor"
              strokeOpacity={0.16}
              initial={reduce ? false : { pathLength: 0 }}
              animate={seen ? { pathLength: 1 } : undefined}
              transition={{ duration: 1.2, delay: 0.4 + s.i * 0.02, ease: EASE }}
            />
          ))}
          {dots.map((d) => (
            <motion.circle
              key={d.i}
              cx={d.x}
              cy={d.y}
              r={d.big ? 3 : 1.6}
              fill="currentColor"
              fillOpacity={d.big ? 1 : 0.6}
              initial={reduce ? false : { opacity: 0 }}
              animate={seen ? { opacity: 1 } : undefined}
              transition={{ duration: 0.6, delay: 0.8 + d.i * 0.025 }}
            />
          ))}
          {live && (
            <motion.circle
              cx={C}
              cy={C}
              stroke="currentColor"
              strokeWidth={1}
              initial={{ r: 8, opacity: 0.6 }}
              animate={{ r: [8, 56], opacity: [0.6, 0] }}
              transition={{ duration: 4.8, repeat: Infinity, ease: "easeOut" }}
            />
          )}
          <circle cx={C} cy={C} r={8} stroke="currentColor" strokeWidth={1.2} />
          <circle cx={C} cy={C} r={3.5} fill="currentColor" />
        </>
      )}
    </svg>
  );
}
