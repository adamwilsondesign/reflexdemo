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
  { name: "Insights", sub: "Always-on", out: "New catalyst, 2 holdings" },
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
    <div ref={ref} className="pui relative isolate overflow-hidden rounded-[18px] p-1 sm:p-2">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-chart-dark opacity-40" />

      {/* Your workflow */}
      <motion.div {...tier(0.5)}>
        <p className="mb-1.5 text-[12px] text-white/65">Your research workflow</p>
        <p className="text-[14px] leading-relaxed">
          {WORKFLOW.map((w, i) => (
            <span key={w}>
              <span className={clsx("transition-colors duration-500", i === (k + 1) % WORKFLOW.length ? "text-white" : "text-white/60")}>{w}</span>
              {i < WORKFLOW.length - 1 && <span className="px-1.5 text-white/35">·</span>}
            </span>
          ))}
        </p>
      </motion.div>

      <Pipes active={m} run={inView && !reduce} up />

      {/* Reflexivity layer */}
      <motion.div {...tier(0.35)} className="ui-card p-4">
        <div className="flex items-center gap-2">
          <AlfredGlyph className="h-4 w-4 text-[#0d0d0d]" />
          <span className="text-[14px] font-semibold text-[#0d0d0d]">Reflexivity</span>
          <span className="hidden text-[13px] text-[#8f8f8f] sm:inline">Investment intelligence layer</span>
        </div>
        <div className="mt-3 grid grid-cols-3 divide-x divide-black/10 border-t border-black/10">
          {MODULES.map((mod, i) => (
            <div key={mod.name} className="min-w-0 px-2 pt-3 first:pl-0 last:pr-0 sm:px-3">
              <span className={clsx("block truncate text-[13px] leading-tight transition-[font-weight,color] duration-500 sm:text-[14px]", i === m ? "font-semibold text-[#0d0d0d]" : "font-medium text-[#5d5d5d]")}>{mod.name}</span>
              <span className="block truncate text-[12px] text-[#8f8f8f]">{mod.sub}</span>
              <span className={clsx("mt-2 hidden items-center gap-1.5 truncate text-[12px] text-[#0d0d0d] transition-opacity duration-500 sm:flex", i === m ? "opacity-100" : "opacity-0")}>
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#0d0d0d]" />
                <span className="truncate">{mod.out}</span>
              </span>
            </div>
          ))}
        </div>
      </motion.div>

      <Pipes active={m} run={inView && !reduce} />

      {/* Data */}
      <motion.div {...tier(0.2)}>
        <p className="text-[14px] leading-relaxed text-white/70">
          {DATA.map((d, i) => (
            <span key={d}>
              {d}
              {i < DATA.length - 1 && <span className="px-1.5 text-white/35">·</span>}
            </span>
          ))}
        </p>
        <p className="mt-1.5 text-[12px] text-white/65">Institutional data and content</p>
      </motion.div>
    </div>
  );
}

function Pipes({ active, run, up = false }: { active: number; run: boolean; up?: boolean }) {
  return (
    <div className="relative my-1 grid h-12 grid-cols-3 sm:h-16" aria-hidden="true">
      {[0, 1, 2].map((i) => (
        <span key={i} className="relative mx-auto h-full w-px bg-white/25">
          {run && i === active && (
            <motion.span
              className="absolute left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-white"
              initial={{ top: "100%", opacity: 0 }}
              animate={{ top: ["100%", "0%"], opacity: [0, 1, 0] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut", delay: up ? 0.8 : 0 }}
            />
          )}
        </span>
      ))}
    </div>
  );
}
