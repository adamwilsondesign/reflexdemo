"use client";

import { motion } from "motion/react";
import clsx from "clsx";
import { Canvas, CiteChip, Delta, Icon, Mono, RX_EASE, Spark, useTimeline } from "@/components/visual/kit";

/**
 * Insights — anatomy of an insight (also reusable on Portfolio Monitoring).
 * Composition: one document card with a section rail. The page moves through
 * headline → takeaways → ripple effects → Ask Alfred; the rail marker follows.
 */
const SECTIONS = ["Headline", "Top 5 takeaways", "Ripple effects", "Ask Alfred"];
const OFFSETS = [0, 148, 330, 520];
const D = [3400, 3600, 3800, 3400];

export function InsightDoc() {
  const { p, ref } = useTimeline(D, { still: 2 });

  return (
    <div ref={ref}>
      <Canvas w={560} h={480}>
        <div className="rx-card rx-card-lift absolute left-[20px] top-[28px] flex h-[424px] w-[520px] overflow-hidden">
          {/* page */}
          <div className="relative flex-1 overflow-hidden">
            <motion.div className="absolute inset-x-0 top-0 px-6 pt-6" animate={{ y: -OFFSETS[p] }} transition={{ duration: 1.1, ease: RX_EASE }}>
              {/* headline */}
              <div className="h-[148px]">
                <p className="flex items-center gap-2 text-[11px] font-medium"><span className="flex items-center gap-1 text-[#3e5368]"><Spark size={10} />Market catalyst</span><span className="rounded-[5px] bg-[#f6ecd6] px-1.5 py-px text-[#8a6a1e]">Neutral</span></p>
                <p className="rx-serif mt-2 text-[20px] leading-[27px]">September flash PMI rekindles factory cost pressure</p>
                <svg viewBox="0 0 330 46" className="mt-3 h-[46px] w-full overflow-visible">
                  <line x1="0" y1="26" x2="330" y2="26" stroke="#17191c" strokeOpacity=".15" strokeDasharray="2 3" />
                  <path d="M0 18 C20 10 30 34 50 36 S80 30 100 38 S140 34 160 28 S190 12 210 14 S250 16 270 10 S310 12 330 8 L330 46 L0 46 Z" fill="#2f7457" fillOpacity=".1" />
                  <path d="M0 18 C20 10 30 34 50 36 S80 30 100 38 S140 34 160 28 S190 12 210 14 S250 16 270 10 S310 12 330 8" fill="none" stroke="#2f7457" strokeWidth="1.5" />
                </svg>
              </div>
              {/* takeaways */}
              <div className="h-[182px]">
                <p className="text-[12.5px] font-semibold">Top 5 takeaways</p>
                {["Factory activity is still expanding", "Input costs hit a four-year high", "Margin pressure lands on cyclicals first", "Automation spend holds up as a productivity hedge", "Watch backlog conversion next quarter"].map((t, i) => (
                  <motion.p key={t} className="mt-2 flex gap-3 text-[12.5px] leading-[18px] text-[var(--rx-2)]" animate={{ opacity: p === 1 ? 1 : 0.9 }}>
                    <span className="rx-num w-3 shrink-0 text-[var(--rx-3)]">{i + 1}</span>{t}<CiteChip n={i + 1} active={p === 1 && i === 1} />
                  </motion.p>
                ))}
              </div>
              {/* ripple */}
              <div className="h-[190px]">
                <p className="text-[12.5px] font-semibold">Ripple effects · Industrial automation</p>
                <p className="mt-0.5 text-[11.5px] text-[var(--rx-3)]">Ranked by how the event transmits</p>
                {[["HON", "Honeywell", 1.36, "#9a3b30"], ["ETN", "Eaton", 1.76, "#24324a"], ["ROK", "Rockwell Automation", 1.64, "#a6503a"], ["EMR", "Emerson Electric", 2.24, "#3e5368"]].map(([t, n, m, c], i) => (
                  <motion.div key={t as string} className="mt-2 flex items-center gap-3" initial={false} animate={{ x: p === 2 ? 0 : 0, opacity: 1 }}>
                    <span className="rx-num w-3 text-[11px] text-[var(--rx-3)]">{i + 1}</span>
                    <Mono t={(t as string).slice(0, 2)} tone={c as string} size={24} />
                    <span className="flex-1 text-[12.5px] font-medium">{n}</span>
                    <Delta v={m as number} />
                  </motion.div>
                ))}
              </div>
              {/* ask */}
              <div className="h-[200px]">
                <p className="text-[12.5px] font-semibold">Ask Alfred</p>
                <div className="mt-3 rounded-[12px] border border-[var(--rx-line)] p-3">
                  <p className="text-[13px] leading-5">Which of these names has the most backlog at risk if input costs stay high?</p>
                  <div className="mt-3 flex justify-end"><span className="grid h-7 w-7 place-items-center rounded-[8px] bg-[var(--rx-ink)] text-white"><Icon name="send" /></span></div>
                </div>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {["Compare margins", "Show the transmission path"].map((s) => <span key={s} className="rounded-[7px] bg-[var(--rx-well)] px-2 py-1 text-[11.5px] text-[var(--rx-2)]">{s}</span>)}
                </div>
              </div>
            </motion.div>
          </div>
          {/* rail */}
          <div className="relative w-[148px] shrink-0 border-l border-[var(--rx-line)] py-6 pl-4">
            <motion.span className="absolute left-[-1px] w-[2px] rounded-full bg-[var(--rx-signal)]" animate={{ top: 22 + p * 30, height: 22 }} transition={{ duration: 0.6, ease: RX_EASE }} />
            {SECTIONS.map((s, i) => (
              <p key={s} className={clsx("flex h-[30px] items-center text-[12px] transition-colors duration-500", i === p ? "font-medium text-[var(--rx-ink)]" : "text-[var(--rx-3)]")}>{s}</p>
            ))}
          </div>
        </div>
      </Canvas>
    </div>
  );
}
