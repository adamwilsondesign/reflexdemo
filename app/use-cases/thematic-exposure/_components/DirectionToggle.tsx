"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useState } from "react";
import clsx from "clsx";

const EASE = [0.16, 1, 0.3, 1] as const;

const MODES = [
  {
    key: "t2c",
    label: "Theme → company",
    q: "Which companies does Industrial Automation move, and which are tradable expressions of it?",
    head: ["Company", "Exposure", "Basket fit"],
    rows: [
      ["Rockwell Automation", 0.93, "Eligible · pure play"],
      ["Fanuc", 0.91, "Eligible · pure play"],
      ["Harmonic Drive Systems", 0.66, "Eligible · supplier"],
      ["Eaton", 0.46, "Exposed · not a pure expression"],
    ] as [string, number, string][],
  },
  {
    key: "c2t",
    label: "Company → theme",
    q: "Which themes move Eaton, and how much does Industrial Automation matter to it?",
    head: ["Theme", "Exposure", "Role"],
    rows: [
      ["Data center power", 0.82, "Primary driver"],
      ["Electrification", 0.78, "Primary driver"],
      ["Industrial Automation", 0.46, "Matters · secondary"],
      ["Reshoring", 0.4, "Supporting"],
    ] as [string, number, string][],
  },
];

/** Interactive: the same relationship read in both directions. */
export function DirectionToggle() {
  const [m, setM] = useState(0);
  const reduce = useReducedMotion();
  const mode = MODES[m];
  return (
    <div className="ui-card pui overflow-hidden">
      <div className="flex items-center justify-between gap-3 border-b border-black/10 px-4 py-3 sm:px-5">
        <div role="tablist" aria-label="Direction" className="inline-flex rounded-[10px] border border-black/10 p-0.5">
          {MODES.map((x, i) => (
            <button
              key={x.key}
              role="tab"
              aria-selected={m === i}
              aria-controls="direction-panel"
              id={`dir-${x.key}`}
              onClick={() => setM(i)}
              className={clsx("relative rounded-[8px] px-3 py-1.5 text-[13px] transition-colors duration-300", m === i ? "font-medium text-[#0d0d0d]" : "text-[#5d5d5d] hover:text-[#0d0d0d]")}
            >
              {m === i && <motion.span layoutId="dir-pill" className="absolute inset-0 rounded-[8px] bg-black/[0.05]" transition={{ duration: reduce ? 0 : 0.4, ease: EASE }} />}
              <span className="relative">{x.label}</span>
            </button>
          ))}
        </div>
        <span className="hidden text-[12px] text-[#8f8f8f] sm:inline">Illustrative scores</span>
      </div>
      <div id="direction-panel" role="tabpanel" aria-labelledby={`dir-${mode.key}`} className="min-h-[340px] p-4 sm:p-6">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div key={mode.key} initial={reduce ? false : { opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.45, ease: EASE }}>
            <p className="text-[18px] font-semibold leading-snug text-[#0d0d0d]">{mode.q}</p>
            <div className="mt-5 grid grid-cols-[1fr_48px] gap-x-4 border-b border-black/10 pb-2 text-[12px] text-[#8f8f8f] sm:grid-cols-[1.2fr_64px_1fr]">
              <span>{mode.head[0]}</span>
              <span className="text-right">{mode.head[1]}</span>
              <span className="hidden sm:block">{mode.head[2]}</span>
            </div>
            <ul className="divide-y divide-black/10">
              {mode.rows.map(([n, w, tag], i) => {
                const hi = n === "Eaton" || n === "Industrial Automation";
                return (
                  <motion.li
                    key={n}
                    initial={reduce ? false : { opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.45, delay: 0.08 * i, ease: EASE }}
                    className="grid grid-cols-[1fr_48px] items-baseline gap-x-4 py-2.5 sm:grid-cols-[1.2fr_64px_1fr]"
                  >
                    <span className="min-w-0">
                      <span className={clsx("block text-[14px] text-[#0d0d0d]", hi ? "font-semibold" : "font-medium")}>{n}</span>
                      <span className="block text-[12px] text-[#8f8f8f] sm:hidden">{tag}</span>
                    </span>
                    <span className="text-right text-[13px] tabular-nums text-[#0d0d0d]">{w.toFixed(2)}</span>
                    <span className={clsx("hidden text-[13px] sm:block", hi ? "text-[#0d0d0d]" : "text-[#5d5d5d]")}>{tag}</span>
                  </motion.li>
                );
              })}
            </ul>
            <p className="mt-4 text-[13px] leading-relaxed text-[#5d5d5d]">
              {m === 0
                ? "Eaton is genuinely exposed to automation, but the theme is a small part of its story. A desk building a basket would weight it differently from a pure play."
                : "Read from Eaton’s side, Industrial Automation matters, but data center power and electrification drive far more of the business."}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
