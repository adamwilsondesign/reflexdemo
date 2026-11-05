"use client";

import { motion, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { AlfredGlyph } from "@/components/product/ui";

const EASE = [0.16, 1, 0.3, 1] as const;

const WORKFLOW = ["Research notes", "Excel", "Teams", "Your models", "AI agents"];
const MODULES = [
  { name: "Alfred", sub: "AI analyst", out: "Cited answer ready" },
  { name: "Knowledge Graph", sub: "Relationships", out: "3 hidden exposures" },
  { name: "Insights", sub: "Always-on", out: "New catalyst · 2 holdings" },
];
const DATA = ["LSEG", "S&P Global", "Cboe", "Dow Jones", "Quartr", "Nasdaq"];

/**
 * Platform hero visual: Reflexivity as the intelligence layer between institutional data
 * and the tools a research team already uses. Signals travel up; modules take turns.
 */
export function LayerStack() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.3 });
  const reduce = useReducedMotion();
  const [k, setK] = useState(0);
  useEffect(() => {
    if (!inView || reduce) return;
    const iv = setInterval(() => setK((x) => x + 1), 2600);
    return () => clearInterval(iv);
  }, [inView, reduce]);
  const m = k % MODULES.length;

  const tier = (d: number) => ({
    initial: reduce ? false : { opacity: 0, y: 18 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.9, ease: EASE, delay: d },
  });

  return (
    <div ref={ref} className="relative isolate overflow-hidden rounded-[18px] p-1 sm:p-2">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-chart-dark opacity-40" />

      {/* Your workflow */}
      <motion.div {...tier(0.5)}>
        <p className="t-ui mb-2.5 text-[10px] text-white/70">Your research workflow</p>
        <div className="flex flex-wrap gap-1.5">
          {WORKFLOW.map((w, i) => (
            <span key={w} className={clsx("rounded-md border px-2.5 py-1.5 font-display text-[12px] font-medium backdrop-blur transition-colors duration-500", i === (k + 1) % WORKFLOW.length ? "border-white/60 bg-white/25 text-white" : "border-white/20 bg-white/10 text-white/75")}>{w}</span>
          ))}
        </div>
      </motion.div>

      <Pipes active={m} run={inView && !reduce} up />

      {/* Reflexivity layer */}
      <motion.div {...tier(0.35)} className="ui-card p-3 sm:p-4">
        <div className="mb-3 flex items-center justify-between">
          <span className="flex items-center gap-2 font-display text-[13px] font-semibold text-ink"><AlfredGlyph className="h-4 w-4 text-lake-700" />Reflexivity</span>
          <span className="hidden font-mono text-[9.5px] uppercase tracking-[0.06em] text-ink/45 sm:inline">Investment intelligence layer</span>
        </div>
        <div className="grid grid-cols-3 gap-1.5 sm:gap-2">
          {MODULES.map((mod, i) => (
            <div key={mod.name} className={clsx("relative overflow-hidden rounded-[10px] border p-2.5 transition-[border-color,background-color] duration-500 sm:p-3", i === m ? "border-lake-500/50 bg-lake-100/60" : "border-ink/8 bg-white/60")}>
              <span className="block font-display text-[12px] font-semibold leading-tight text-ink sm:text-[13.5px]">{mod.name}</span>
              <span className="block truncate font-mono text-[9px] uppercase tracking-[0.05em] text-ink/45">{mod.sub}</span>
              <motion.span key={k + mod.name} initial={false} animate={{ opacity: i === m ? 1 : 0, y: i === m ? 0 : 4 }} transition={{ duration: 0.5 }} className="mt-2 hidden truncate text-[10.5px] text-lake-700 sm:block">{mod.out}</motion.span>
            </div>
          ))}
        </div>
        <div className="mt-2 grid grid-cols-2 gap-1.5 sm:gap-2">
          {[["Auditability", " · cited, inspectable"], ["Security", " · SOC 2 Type II controls"]].map(([a, b]) => (
            <span key={a} className="truncate rounded-md bg-ink/[0.04] px-2.5 py-1.5 font-mono text-[9.5px] uppercase tracking-[0.04em] text-ink/55">{a}<span className="hidden sm:inline">{b}</span></span>
          ))}
        </div>
      </motion.div>

      <Pipes active={m} run={inView && !reduce} />

      {/* Data */}
      <motion.div {...tier(0.2)}>
        <div className="grid grid-cols-3 gap-1.5 sm:grid-cols-6">
          {DATA.map((d) => (
            <span key={d} className="truncate rounded-md border border-white/15 bg-black/10 px-2 py-1.5 text-center font-mono text-[10px] uppercase tracking-[0.04em] text-white/70">{d}</span>
          ))}
        </div>
        <p className="t-ui mt-2.5 text-[10px] text-white/60">Institutional data and content</p>
      </motion.div>
    </div>
  );
}

function Pipes({ active, run, up = false }: { active: number; run: boolean; up?: boolean }) {
  return (
    <div className="relative my-1 grid h-12 grid-cols-3 sm:h-16" aria-hidden="true">
      {[0, 1, 2].map((i) => (
        <span key={i} className="relative mx-auto h-full w-px bg-white/25">
          {run && (
            <motion.span
              className={clsx("absolute left-1/2 h-2 w-2 -translate-x-1/2 rounded-full", i === active ? "bg-white" : "bg-white/40")}
              initial={{ top: "100%", opacity: 0 }}
              animate={{ top: ["100%", "0%"], opacity: [0, 1, 0] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut", delay: i * 0.5 + (up ? 0.8 : 0) }}
            />
          )}
        </span>
      ))}
    </div>
  );
}
