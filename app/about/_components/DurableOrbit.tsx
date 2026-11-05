"use client";

import { AnimatePresence, motion, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";

const EASE = [0.16, 1, 0.3, 1] as const;

const LAYERS = [
  { r: 78, label: "The audit trail", angle: -55 },
  { r: 118, label: "The monitoring", angle: 200 },
  { r: 158, label: "The Knowledge Graph", angle: 32 },
  { r: 198, label: "The data", angle: 128 },
];

const MODELS = ["Model · gen 1", "Model · gen 2", "Model · gen 3", "Model · next"];

/**
 * Hero line-art: the model at the centre keeps changing; the rings that hold the work around it
 * (data, Graph, monitoring, audit trail) stay put. A ripple goes out on each model change.
 */
export function DurableOrbit() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.3 });
  const reduce = useReducedMotion();
  const [gen, setGen] = useState(0);

  useEffect(() => {
    if (!inView || reduce) return;
    const iv = setInterval(() => setGen((g) => g + 1), 3200);
    return () => clearInterval(iv);
  }, [inView, reduce]);

  const C = 240;

  return (
    <div ref={ref} className="relative mx-auto aspect-square w-full max-w-[560px] text-lake-700">
      <svg viewBox="0 0 480 480" className="h-full w-full overflow-visible" fill="none" aria-hidden="true">
        {/* fine concentric guides */}
        {Array.from({ length: 22 }, (_, i) => {
          const r = 30 + i * 9.4;
          return (
            <motion.circle
              key={i}
              cx={C}
              cy={C}
              r={r}
              stroke="currentColor"
              strokeWidth={0.6}
                initial={reduce ? false : { pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.12 + (i % 4 === 0 ? 0.12 : 0) }}
              transition={{ duration: 1.6, ease: EASE, delay: 0.2 + i * 0.03 }}
            />
          );
        })}
        {/* durable layers */}
        {LAYERS.map((l, i) => (
          <motion.circle
            key={l.label}
            cx={C}
            cy={C}
            r={l.r}
            stroke="currentColor"
            strokeWidth={1.2}
            initial={reduce ? false : { pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.7 }}
            transition={{ duration: 1.8, ease: EASE, delay: 0.5 + i * 0.15 }}
          />
        ))}
        {/* ripple on each model generation */}
        {!reduce && (
          <motion.circle
            key={gen}
            cx={C}
            cy={C}
            stroke="var(--color-lake-500)"
            strokeWidth={1.2}
            initial={{ r: 34, opacity: 0.9 }}
            animate={{ r: 220, opacity: 0 }}
            transition={{ duration: 2.6, ease: [0.2, 0.6, 0.3, 1] }}
          />
        )}
        {/* layer nodes */}
        {LAYERS.map((l, i) => {
          const a = (l.angle * Math.PI) / 180;
          const x = C + Math.cos(a) * l.r;
          const y = C + Math.sin(a) * l.r;
          return (
            <motion.g key={l.label} initial={reduce ? false : { opacity: 0, scale: 0.6 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, ease: EASE, delay: 1 + i * 0.15 }} style={{ transformOrigin: `${x}px ${y}px` }}>
              <circle cx={x} cy={y} r={8} fill="var(--color-paper)" stroke="currentColor" strokeWidth={1.4} />
              <circle cx={x} cy={y} r={3} fill="currentColor" />
            </motion.g>
          );
        })}
      </svg>

      {/* labels (HTML for crisp type) */}
      {LAYERS.map((l, i) => {
        const a = (l.angle * Math.PI) / 180;
        const x = ((C + Math.cos(a) * l.r) / 480) * 100;
        const y = ((C + Math.sin(a) * l.r) / 480) * 100;
        const above = Math.sin(a) < 0;
        return (
          <motion.span
            key={l.label}
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.2 + i * 0.15 }}
            className="pui absolute whitespace-nowrap rounded-[10px] border border-black/10 bg-white px-2 py-1 text-[12px] text-[#0d0d0d] sm:text-[13px]"
            style={{ left: `${x}%`, top: `${y}%`, transform: `translate(-50%, ${above ? "calc(-100% - 14px)" : "14px"})` }}
          >
            {l.label}
          </motion.span>
        );
      })}

      {/* the swappable centre */}
      <div className="absolute left-1/2 top-1/2 flex h-[19%] w-[19%] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-lake-900 text-paper shadow-[0_12px_40px_-12px_rgb(36_50_68/0.6)]">
        <AnimatePresence initial={false}>
          <motion.span
            key={gen % MODELS.length}
            initial={reduce ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.5, ease: EASE }}
            className="pui absolute px-1 text-center text-[10px] font-medium leading-tight sm:text-[12px]"
          >
            {MODELS[gen % MODELS.length]}
          </motion.span>
        </AnimatePresence>
      </div>
    </div>
  );
}
