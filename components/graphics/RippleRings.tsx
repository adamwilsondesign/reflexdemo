"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import clsx from "clsx";

/**
 * Concentric "ripple" line art — the brand's precision illustration language
 * (an event at a node, effects propagating outward). Draws on, then breathes.
 */
export function RippleRings({
  className,
  rings = 14,
  nodes = 4,
  stroke = "currentColor",
  vertical = true,
}: {
  className?: string;
  rings?: number;
  nodes?: number;
  stroke?: string;
  vertical?: boolean;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<SVGSVGElement>(null);
  const { scrollYProgress } = useScroll({ target: ref as unknown as React.RefObject<HTMLElement>, offset: ["start end", "end start"] });
  const rot = useTransform(scrollYProgress, [0, 1], [-6, 6]);

  const W = 400;
  const H = 1000;
  const clusters = Array.from({ length: nodes }, (_, n) => {
    const r = 170 - n * 22;
    const cy = 150 + n * (H - 300) / Math.max(1, nodes - 1);
    return { cx: W / 2, cy, r };
  });

  return (
    <motion.svg
      ref={ref}
      viewBox={`0 0 ${W} ${H}`}
      className={clsx("overflow-visible", className)}
      fill="none"
      aria-hidden="true"
      style={reduce ? undefined : { rotate: vertical ? 0 : rot }}
    >
      {clusters.map((c, ci) =>
        Array.from({ length: rings }, (_, i) => {
          const t = (i + 1) / rings;
          const rr = c.r * t;
          // rings sit tangent to the top node, like the Framer hero illustration
          const cy = c.cy - c.r + rr;
          return (
            <motion.circle
              key={`${ci}-${i}`}
              cx={c.cx}
              cy={cy}
              r={rr}
              stroke={stroke}
              strokeWidth={1}
              vectorEffect="non-scaling-stroke"
              initial={reduce ? false : { pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.25 + 0.6 * (1 - t) }}
              transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1], delay: 0.3 + ci * 0.25 + i * 0.04 }}
            />
          );
        }),
      )}
      {clusters.map((c, ci) => (
        <g key={`n${ci}`}>
          <motion.circle
            cx={c.cx}
            cy={c.cy - c.r}
            r={9}
            stroke={stroke}
            strokeWidth={1.4}
            fill="var(--color-paper)"
            initial={reduce ? false : { scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.8, delay: 0.5 + ci * 0.25, ease: [0.16, 1, 0.3, 1] }}
          />
          <circle cx={c.cx} cy={c.cy - c.r} r={3.5} fill={stroke} />
          {!reduce && (
            <circle cx={c.cx} cy={c.cy - c.r} r={9} stroke={stroke} strokeWidth={1} className="animate-pulse-ring" style={{ transformOrigin: `${c.cx}px ${c.cy - c.r}px`, animationDelay: `${ci * 0.6}s` }} />
          )}
        </g>
      ))}
    </motion.svg>
  );
}

/** Horizontal propagation field used in CTA bands: rings expand from an origin node indefinitely. */
export function PropagationField({ className, color = "rgba(244,243,241,0.35)" }: { className?: string; color?: string }) {
  const reduce = useReducedMotion();
  return (
    <svg viewBox="0 0 800 400" className={clsx("h-full w-full", className)} fill="none" aria-hidden="true" preserveAspectRatio="xMidYMid slice">
      {Array.from({ length: 9 }, (_, i) => (
        <motion.circle
          key={i}
          cx={620}
          cy={200}
          stroke={color}
          strokeWidth={1}
          vectorEffect="non-scaling-stroke"
          initial={{ r: 4, opacity: 0 }}
          animate={reduce ? { r: 40 + i * 50, opacity: 0.6 } : { r: [4, 460], opacity: [0.9, 0] }}
          transition={reduce ? { duration: 0 } : { duration: 9, repeat: Infinity, ease: "linear", delay: i * 1 }}
        />
      ))}
      <circle cx={620} cy={200} r={5} fill={color} />
    </svg>
  );
}
