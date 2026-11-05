"use client";

import { motion, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { AlfredGlyph, Cite } from "@/components/product/ui";

const EASE = [0.16, 1, 0.3, 1] as const;

const PROVIDERS = ["LSEG", "S&P Global", "Cboe", "Dow Jones", "Nasdaq", "Quartr", "MT Newswires", "Benzinga", "FRED"];

/**
 * Hero visual: licensed sources flow into the platform and come out as attributed citations.
 * One provider is highlighted at a time; paused off-screen, static with reduced motion.
 */
export function SourceMap() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.3 });
  const reduce = useReducedMotion();
  const [on, setOn] = useState(0);
  useEffect(() => {
    if (!inView || reduce) return;
    const iv = setInterval(() => setOn((x) => (x + 1) % PROVIDERS.length), 1700);
    return () => clearInterval(iv);
  }, [inView, reduce]);

  const rowH = 100 / PROVIDERS.length;

  return (
    <div ref={ref} className="relative grid grid-cols-[minmax(0,0.9fr)_minmax(0,0.5fr)_minmax(0,1.1fr)] items-center gap-0" aria-hidden="true">
      {/* providers */}
      <ul className="ui-card divide-y divide-black/10 overflow-hidden px-3 py-1">
        {PROVIDERS.map((p, i) => (
          <motion.li
            key={p}
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.4 + i * 0.06, ease: EASE }}
            className={clsx(
              "flex items-center justify-between gap-2 truncate py-[5px] text-[12px] transition-colors duration-500 sm:text-[13px]",
              i === on ? "font-medium text-[#0d0d0d]" : "text-[#8f8f8f]",
            )}
          >
            <span className="truncate">{p}</span>
            <span className={clsx("h-1.5 w-1.5 shrink-0 rounded-full bg-[#0d0d0d] transition-opacity duration-500", i === on ? "opacity-100" : "opacity-0")} />
          </motion.li>
        ))}
      </ul>

      {/* connectors */}
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="h-full w-full self-stretch">
        {PROVIDERS.map((p, i) => {
          const y = rowH * i + rowH / 2;
          return (
            <motion.path
              key={p}
              d={`M0 ${y} C 50 ${y}, 50 50, 100 50`}
              fill="none"
              stroke={i === on ? "#ffffff" : "rgba(255,255,255,0.28)"}
              strokeWidth={i === on ? 1.6 : 1}
              vectorEffect="non-scaling-stroke"
              initial={reduce ? false : { pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.1, delay: 0.7 + i * 0.05, ease: EASE }}
              style={{ transition: "stroke 0.5s" }}
            />
          );
        })}
      </svg>

      {/* answer with attribution */}
      <motion.div
        initial={reduce ? false : { opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 1.1, ease: EASE }}
        className="ui-card p-3.5 sm:p-4"
      >
        <div className="flex items-center gap-2">
          <AlfredGlyph className="h-4 w-4 text-[#0d0d0d]" />
          <span className="text-[14px] font-semibold text-[#0d0d0d]">Answer</span>
        </div>
        <p className="mt-2 text-[13px] leading-relaxed text-[#5d5d5d]">
          Figures and claims link back to the licensed source they came from<Cite n={on + 1} />
        </p>
        <div className="mt-3 border-t border-black/10 pt-2">
          <p className="text-[12px] text-[#8f8f8f]">Source {on + 1}</p>
          <motion.p key={on} initial={reduce ? false : { opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }} className="mt-0.5 truncate text-[14px] font-medium text-[#0d0d0d]">
            {PROVIDERS[on]}
          </motion.p>
        </div>
      </motion.div>
    </div>
  );
}
