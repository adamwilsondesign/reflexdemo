"use client";

import { AnimatePresence, motion } from "motion/react";
import clsx from "clsx";
import { Canvas, Icon, RX_EASE, Spark, useTimeline } from "@/components/visual/kit";

/**
 * Alfred · Analysis that stays alive.
 * Composition: a scheduled-question card (form rows + a week of runs). Friday’s
 * run spins, checks off, and the morning brief lands as a toast over the card.
 */
const DAYS = [["Mon", 2], ["Tue", 3], ["Wed", 4], ["Thu", 5], ["Fri", 6]] as const;
const CHANGES = [
  { t: "MU", s: "Raised Q1 guidance on HBM demand" },
  { t: "AVGO", s: "AI revenue outlook unchanged" },
];

// 0 card · 1 run · 2 done · 3 brief · 4 out
const D = [1300, 1700, 700, 4600, 700];

export function ScheduledRun() {
  const { p, ref, cycle } = useTimeline(D, { still: 3 });

  return (
    <div ref={ref}>
      <Canvas w={560} h={480} focusX={0.25}>
        <motion.div key={cycle} className="absolute inset-0" initial={{ opacity: 0 }} animate={{ opacity: p === 4 ? 0 : 1 }} transition={{ duration: 0.6 }}>
          <motion.div className="rx-card rx-card-lift absolute left-[30px] top-[30px] w-[500px] p-5" initial={{ y: 16 }} animate={{ y: 0 }} transition={{ duration: 0.8, ease: RX_EASE }}>
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1.5 text-[11.5px] font-medium text-[#3e5368]"><Spark size={10} />Scheduled question</span>
              <span className="flex items-center gap-1.5 rounded-full bg-[rgb(47_116_87/.1)] px-2 py-0.5 text-[10.5px] font-medium text-[var(--rx-up)]"><span className="h-1.5 w-1.5 rounded-full bg-[var(--rx-up)]" />Active</span>
            </div>
            <p className="rx-serif mt-2 text-[19px] leading-[26px]">Guidance changes across my semiconductor names</p>

            <div className="mt-4 grid grid-cols-3 gap-2">
              {[["Repeats", "Weekdays"], ["Time", "07:00 ET"], ["Deliver to", "Inbox, Teams"]].map(([k, v]) => (
                <div key={k} className="rounded-[10px] px-3 py-2 ring-1 ring-inset ring-[var(--rx-line)]">
                  <p className="text-[10.5px] text-[var(--rx-3)]">{k}</p>
                  <p className="mt-0.5 flex items-center justify-between text-[12.5px] font-medium">{v}<span className="text-[var(--rx-3)]"><Icon name="chev" size={11} /></span></p>
                </div>
              ))}
            </div>

            <p className="mt-5 text-[11px] text-[var(--rx-3)]">This week · November</p>
            <div className="mt-2 grid grid-cols-5 gap-2">
              {DAYS.map(([d, n], i) => {
                const st = i < 4 ? "done" : p === 1 ? "run" : p >= 2 ? "done" : "next";
                return (
                  <div key={d} className={clsx("rounded-[10px] px-2.5 py-2.5 transition-colors duration-500", i === 4 ? "bg-[var(--rx-well)]" : "")} style={{ boxShadow: i === 4 ? undefined : "inset 0 0 0 1px rgb(23 25 28 / .08)" }}>
                    <p className="flex items-baseline justify-between text-[10.5px] text-[var(--rx-3)]"><span>{d}</span><span className="rx-num text-[12px] text-[var(--rx-ink)]">{n}</span></p>
                    <p className={clsx("mt-2.5 flex h-4 items-center gap-1 text-[10.5px] font-medium", st === "done" ? "text-[var(--rx-up)]" : st === "run" ? "text-[#3e5368]" : "text-[var(--rx-3)]")}>
                      {st === "done" && <><Icon name="check" size={11} />07:00</>}
                      {st === "run" && <><Spin />Running</>}
                      {st === "next" && <>Next</>}
                    </p>
                  </div>
                );
              })}
            </div>
            <div className="mt-4 border-t border-[var(--rx-line)] pt-3 text-[11.5px] text-[var(--rx-2)]">
              <p className="flex justify-between"><span>Covers</span><span className="rx-num">NVDA · AVGO · MU · AMD · TSM</span></p>
            </div>
          </motion.div>

          <AnimatePresence>
            {p === 3 && (
              <motion.div className="rx-card rx-card-lift absolute left-[150px] top-[300px] z-10 w-[370px] p-4" initial={{ opacity: 0, y: 24, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 10 }} transition={{ duration: 0.6, ease: RX_EASE }}>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2 text-[12.5px] font-medium">
                    <span className="grid h-7 w-7 place-items-center rounded-[8px] bg-[var(--rx-ink)] text-white"><Spark size={12} /></span>
                    Morning brief
                  </span>
                  <span className="text-[11px] text-[var(--rx-3)]">Fri · 07:00</span>
                </div>
                <p className="mt-2.5 text-[12px] text-[var(--rx-2)]">2 changes since yesterday</p>
                {CHANGES.map((c, i) => (
                  <motion.p key={c.t} className="mt-1.5 flex items-center gap-2 text-[12.5px]" initial={{ opacity: 0, x: 8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.45 + i * 0.15, duration: 0.5, ease: RX_EASE }}>
                    <span className="rx-num w-[40px] text-[11px] text-[var(--rx-3)]">{c.t}</span>{c.s}
                  </motion.p>
                ))}
                <motion.span className="absolute -left-px top-4 h-7 w-[3px] rounded-r-full bg-[var(--rx-signal)]" initial={{ scaleY: 0 }} animate={{ scaleY: 1 }} transition={{ delay: 0.5, duration: 0.4 }} />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </Canvas>
    </div>
  );
}

function Spin() {
  return (
    <motion.svg viewBox="0 0 12 12" width="10" height="10" animate={{ rotate: 360 }} transition={{ duration: 0.9, repeat: Infinity, ease: "linear" }} aria-hidden="true">
      <circle cx="6" cy="6" r="4.2" fill="none" stroke="currentColor" strokeOpacity=".3" strokeWidth="1.6" />
      <path d="M6 1.8a4.2 4.2 0 0 1 4.2 4.2" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </motion.svg>
  );
}
