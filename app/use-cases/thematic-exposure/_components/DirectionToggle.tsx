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
      ["Teradyne", 0.58, "Partial · one segment"],
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
      ["Rates", 0.31, "Sensitivity"],
    ] as [string, number, string][],
  },
];

/** Interactive: the same relationship read in both directions. */
export function DirectionToggle() {
  const [m, setM] = useState(0);
  const reduce = useReducedMotion();
  const mode = MODES[m];
  return (
    <div className="overflow-hidden rounded-[18px] border border-ink/10 bg-white shadow-[0_30px_80px_-40px_rgb(23_25_28/0.3)]">
      <div className="flex flex-col gap-4 border-b border-ink/8 bg-mist-100 p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
        <div role="tablist" aria-label="Direction" className="inline-flex rounded-full bg-ink/[0.06] p-1">
          {MODES.map((x, i) => (
            <button
              key={x.key}
              role="tab"
              aria-selected={m === i}
              aria-controls="direction-panel"
              id={`dir-${x.key}`}
              onClick={() => setM(i)}
              className={clsx("relative rounded-full px-4 py-2 font-display text-[13.5px] font-medium transition-colors duration-300", m === i ? "text-paper" : "text-ink/60 hover:text-ink")}
            >
              {m === i && <motion.span layoutId="dir-pill" className="absolute inset-0 rounded-full bg-ink" transition={{ duration: reduce ? 0 : 0.5, ease: EASE }} />}
              <span className="relative">{x.label}</span>
            </button>
          ))}
        </div>
        <span className="font-mono text-[10px] uppercase tracking-[0.05em] text-ink/45">Illustrative scores</span>
      </div>
      <div id="direction-panel" role="tabpanel" aria-labelledby={`dir-${mode.key}`} className="min-h-[400px] p-5 sm:p-7">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div key={mode.key} initial={reduce ? false : { opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.45, ease: EASE }}>
            <p className="font-display text-[17px] font-semibold leading-snug text-ink sm:text-[19px]">{mode.q}</p>
            <div className="mt-6 grid grid-cols-[1fr_128px] gap-x-4 border-b border-ink/10 pb-2 font-mono text-[10px] uppercase tracking-[0.05em] text-ink/45 sm:grid-cols-[1.2fr_1fr_1fr]">
              <span>{mode.head[0]}</span>
              <span className="hidden sm:block">{mode.head[1]}</span>
              <span className="text-right sm:text-left">{mode.head[2]}</span>
            </div>
            <ul>
              {mode.rows.map(([n, w, tag], i) => {
                const hi = n === "Eaton" || n === "Industrial Automation";
                return (
                  <motion.li
                    key={n}
                    initial={reduce ? false : { opacity: 0, x: -6 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.45, delay: 0.08 * i, ease: EASE }}
                    className={clsx("grid grid-cols-[1fr_128px] items-center gap-x-4 border-b border-ink/8 py-3 sm:grid-cols-[1.2fr_1fr_1fr]", hi && "bg-lake-100/50 -mx-3 px-3")}
                  >
                    <span className="font-display text-[14px] font-semibold text-ink">{n}</span>
                    <span className="hidden items-center gap-3 sm:flex">
                      <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-ink/8">
                        <motion.span className="block h-full bg-pine-500" initial={{ width: 0 }} animate={{ width: `${w * 100}%` }} transition={{ duration: 0.8, delay: 0.1 + 0.08 * i, ease: EASE }} />
                      </span>
                      <span className="w-9 font-mono text-[11px] text-ink/70">{w.toFixed(2)}</span>
                    </span>
                    <span className={clsx("text-right text-[12.5px] sm:text-left", hi ? "font-medium text-lake-700" : "text-ink/60")}>{tag}</span>
                  </motion.li>
                );
              })}
            </ul>
            <p className="mt-5 text-[13px] leading-relaxed text-ink/60">
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
