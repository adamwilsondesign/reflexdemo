"use client";

import { AnimatePresence, motion } from "motion/react";
import clsx from "clsx";
import { Canvas, CiteChip, Icon, Mono, RX_EASE, Spark, useTimeline, useTyped } from "@/components/visual/kit";

/**
 * Home · Worked example 03 — "Ask Alfred what it means for you".
 * Composition: a composer scoped to your book; the question is typed and sent,
 * then the answer resolves holding by holding into a checklist of status chips.
 */
const Q = "Which of my holdings can pass higher input costs through?";
const ROWS = [
  { t: "ETN", n: "Eaton", c: "#24324a", ok: true, note: "Pricing escalators on ~70% of revenue", cite: 1 },
  { t: "ROK", n: "Rockwell Automation", c: "#a6503a", ok: true, note: "Pass-through on ~60% of revenue", cite: 2 },
  { t: "EMR", n: "Emerson Electric", c: "#3e5368", ok: false, note: "−52 bps margin per 1% inflation", cite: 3 },
  { t: "HON", n: "Honeywell", c: "#5a6f63", ok: false, note: "−41 bps margin per 1% inflation", cite: 4 },
];

// 0 typing · 1 send · 2 answer · 3 resolve · 4 hold · 5 out
const D = [2600, 500, 900, 2000, 3600, 700];

export function WorkedAsk() {
  const { p, ref, cycle } = useTimeline(D, { still: 4 });
  const typed = useTyped(Q, p >= 0 && p < 5, { speed: 28, delay: 300 });

  return (
    <div ref={ref}>
      <Canvas w={560} h={480} focusX={0.3}>
        <motion.div key={cycle} className="absolute inset-0" initial={{ opacity: 0 }} animate={{ opacity: p === 5 ? 0 : 1 }} transition={{ duration: 0.6 }}>
          {/* composer */}
          <motion.div className="rx-card absolute left-[40px] w-[480px] p-3.5" initial={{ top: 150 }} animate={{ top: p >= 2 ? 28 : 150 }} transition={{ duration: 0.8, ease: RX_EASE }}>
            <p className="min-h-[40px] px-1 text-[14px] leading-5">{p >= 2 ? Q : typed}<span className={clsx("ml-px inline-block h-[15px] w-px translate-y-[2px] bg-[var(--rx-ink)]", p >= 1 && "opacity-0")} /></p>
            <div className="mt-2 flex items-center gap-2">
              <span className="flex h-7 items-center gap-1.5 rounded-[8px] bg-[var(--rx-well)] px-2.5 text-[11.5px] font-medium text-[var(--rx-2)]"><span className="h-1.5 w-1.5 rounded-full bg-[#2f7457]" />My book · 4 exposed</span>
              <span className="flex h-7 items-center gap-1 rounded-[8px] px-2 text-[11.5px] text-[var(--rx-3)] ring-1 ring-inset ring-[var(--rx-line)]">Flash PMI insight <Icon name="chev" size={11} /></span>
              <motion.span className="ml-auto grid h-8 w-8 place-items-center rounded-[9px] text-white" animate={{ backgroundColor: typed.length === Q.length || p >= 1 ? "#17191c" : "#c9c7c2", scale: p === 1 ? 0.9 : 1 }} transition={{ duration: 0.2 }}><Icon name="send" /></motion.span>
            </div>
          </motion.div>

          {/* answer */}
          <AnimatePresence>
            {p >= 2 && p < 5 && (
              <motion.div className="rx-card rx-card-lift absolute left-[40px] top-[146px] w-[480px] p-5" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.8, ease: RX_EASE }}>
                <p className="flex items-center gap-1.5 text-[12px] font-semibold"><Spark className="text-[var(--rx-signal)]" />Alfred</p>
                <p className="rx-serif mt-2 text-[17px] leading-[24px]">Two can pass costs through. Two will feel it in margins.</p>
                <div className="mt-3">
                  {ROWS.map((r, i) => {
                    const on = p >= 3;
                    const delay = p === 3 ? 0.2 + i * 0.4 : 0;
                    return (
                      <div key={r.t} className="flex h-[52px] items-center gap-3 border-t border-[var(--rx-line)]">
                        <Mono t={r.t.slice(0, 2)} tone={r.c} size={26} />
                        <span className="min-w-0 flex-1">
                          <span className="block truncate text-[12.5px] font-medium leading-4">{r.n}</span>
                          <motion.span className="block truncate text-[11px] leading-4 text-[var(--rx-3)]" initial={{ opacity: 0 }} animate={{ opacity: on ? 1 : 0 }} transition={{ delay: delay + 0.15 }}>{r.note}<CiteChip n={r.cite} /></motion.span>
                        </span>
                        <span className="relative h-[24px] w-[104px]">
                          <motion.span className="absolute inset-0 flex items-center justify-center gap-1.5 rounded-[7px] bg-[var(--rx-well)] text-[11px] text-[var(--rx-3)]" animate={{ opacity: on ? 0 : 1 }} transition={{ delay }}>
                            <motion.span className="h-2.5 w-2.5 rounded-full border-[1.5px] border-[var(--rx-3)] border-t-transparent" animate={{ rotate: 360 }} transition={{ duration: 0.9, repeat: Infinity, ease: "linear" }} />Checking
                          </motion.span>
                          <motion.span className="absolute inset-0 flex items-center justify-center gap-1 rounded-[7px] text-[11px] font-medium" style={{ background: r.ok ? "rgb(47 116 87 / .1)" : "rgb(166 80 58 / .1)", color: r.ok ? "#2f7457" : "#a6503a" }} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: on ? 1 : 0, scale: on ? 1 : 0.9 }} transition={{ delay, duration: 0.35 }}>
                            {r.ok ? <><Icon name="check" size={12} />Passes through</> : "Margin at risk"}
                          </motion.span>
                        </span>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </Canvas>
    </div>
  );
}
