"use client";

import { motion } from "motion/react";
import clsx from "clsx";
import { useLoop } from "./useLoop";

const EASE = [0.16, 1, 0.3, 1] as const;

const NODES = [
  { label: "Monitor", sub: "An Insight flags CoreWeave’s Rubin rollout", x: 50, y: 12 },
  { label: "Research", sub: "Alfred pressure-tests the read on NVIDIA", x: 88, y: 74 },
  { label: "Test", sub: "Stress the position against a capex slowdown", x: 12, y: 74 },
];

/** Research, monitoring and testing feed each other; Insights keep running around the loop. */
export function ConnectedLoop() {
  const { ref, step, reduce, inView } = useLoop(3, 2600, 0);
  return (
    <div ref={ref} className="grid items-center gap-14 lg:grid-cols-12 lg:gap-16">
      <ol className="space-y-px overflow-hidden rounded-[14px] bg-white/10 lg:col-span-5">
        {NODES.map((n, i) => (
          <li key={n.label} className={clsx("flex gap-4 p-5 transition-colors duration-500 md:p-6", step === i ? "bg-[#2c3d52]" : "bg-lake-900")}>
            <span className={clsx("mt-1 h-2 w-2 shrink-0 rounded-full transition-colors duration-500", step === i ? "bg-paper" : "bg-white/25")} />
            <span>
              <span className="block font-display text-[17px] font-semibold">{n.label}</span>
              <span className="mt-1 block text-[15px] leading-relaxed text-paper/65">{n.sub}</span>
            </span>
          </li>
        ))}
        <li className="flex gap-4 bg-lake-900 p-5 md:p-6">
          <span className="mt-1 h-2 w-2 shrink-0 rounded-full border border-paper/50" />
          <span>
            <span className="block font-display text-[17px] font-semibold">Keep watching</span>
            <span className="mt-1 block text-[15px] leading-relaxed text-paper/65">The names you researched and tested stay on your watchlist, so the next relevant development comes back to you.</span>
          </span>
        </li>
      </ol>
    <div className="relative mx-auto aspect-square w-[86%] max-w-[480px] lg:col-span-7">
      <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full overflow-visible" fill="none" aria-hidden="true">
        {/* always-on ring */}
        <circle cx={50} cy={53} r={47} stroke="rgb(244 243 241 / 0.12)" strokeWidth={0.3} strokeDasharray="0.8 1.4" />
        {/* the loop */}
        <path id="loop" d="M50 12 L88 74 L12 74 Z" stroke="rgb(244 243 241 / 0.28)" strokeWidth={0.35} strokeLinejoin="round" />
        {!reduce && inView && (
          <circle r={1.3} fill="#d5e0da">
            <animateMotion dur="7.8s" repeatCount="indefinite" rotate="auto">
              <mpath href="#loop" />
            </animateMotion>
          </circle>
        )}
        {!reduce && inView && (
          <circle r={0.9} fill="#8fa3b6">
            <animateMotion dur="14s" repeatCount="indefinite" path="M50 6 A47 47 0 1 1 49.99 6" />
          </circle>
        )}
        {/* centre: ideas */}
        <circle cx={50} cy={53} r={11} stroke="rgb(244 243 241 / 0.35)" strokeWidth={0.3} />
        <circle cx={50} cy={53} r={7.5} stroke="rgb(244 243 241 / 0.2)" strokeWidth={0.3} />
      </svg>

      <div className="absolute left-1/2 top-[53%] -translate-x-1/2 -translate-y-1/2 text-center">
        <p className="font-display text-[14px] font-semibold text-paper sm:text-[16px]">Ideas</p>
        <p className="font-mono text-[9px] uppercase tracking-[0.05em] text-paper/50 sm:text-[10px]">from every pass</p>
      </div>

      <p className="t-ui absolute left-1/2 top-[-1%] -translate-x-1/2 -translate-y-full whitespace-nowrap text-[10px] text-paper/45">Insights · always on</p>

      {NODES.map((n, i) => (
        <div key={n.label} className="absolute -translate-x-1/2 -translate-y-1/2" style={{ left: `${n.x}%`, top: `${n.y}%` }}>
          <motion.div
            animate={{ scale: step === i ? 1.06 : 1 }}
            transition={{ duration: 0.6, ease: EASE }}
            className={clsx(
              "flex h-[64px] w-[64px] items-center justify-center rounded-full border font-display text-[13px] font-semibold transition-colors duration-500 sm:h-[84px] sm:w-[84px] sm:text-[15px]",
              step === i ? "border-paper bg-paper text-ink" : "border-white/25 bg-lake-900 text-paper",
            )}
          >
            {n.label}
          </motion.div>
        </div>
      ))}
    </div>
    </div>
  );
}

