"use client";

import { AnimatePresence, motion } from "motion/react";
import clsx from "clsx";
import { Canvas, Cursor, Delta, Glyph, RX_EASE, Ticker, useTimeline } from "@/components/visual/kit";

/**
 * Thematic Exposure — "See what's driving a theme".
 * Composition: a theme card with a segmented control. The cursor flips between
 * tailwinds and headwinds; big movers and related themes sit underneath.
 */
const DRIVERS = {
  tail: [["Hyperscaler capex guidance", 5], ["Power availability deals", 4], ["Advanced packaging capacity", 3], ["Sovereign AI programs", 2]],
  head: [["Export controls on accelerators", 4], ["Grid interconnect queues", 4], ["Memory pricing cycle", 3], ["Cooling supply constraints", 2]],
} as const;

// 0 tail · 1 move → head · 2 press · 3 head · 4 move → tail · 5 press
const D = [3200, 900, 400, 3400, 900, 400];

export function ThemeDrivers() {
  const { p, ref } = useTimeline(D, { still: 0 });
  const side = p >= 2 && p <= 4 ? "head" : "tail";
  const target = p === 1 || p === 2 ? { x: 386, y: 132 } : p === 4 || p === 5 ? { x: 166, y: 132 } : { x: 470, y: 430 };

  return (
    <div ref={ref}>
      <Canvas w={560} h={480}>
        <div className="rx-card rx-card-lift absolute left-[40px] top-[28px] w-[480px] p-5">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-2 text-[11px] font-medium text-[var(--rx-3)]"><Glyph kind="theme" size={12} className="text-[var(--rx-3)]" />Theme · 214 constituents</span>
            <span className="flex items-center gap-1.5 text-[11px] text-[var(--rx-3)]">Today <Delta v={1.12} /></span>
          </div>
          <p className="rx-serif mt-1.5 text-[21px] leading-[28px]">AI infrastructure</p>

          <div className="relative mt-4 grid h-9 grid-cols-2 rounded-[10px] bg-[var(--rx-well)] p-1 text-[12px] font-medium">
            <motion.span className="absolute inset-y-1 left-1 w-[calc(50%-4px)] rounded-[8px] bg-white" style={{ boxShadow: "0 1px 2px rgb(23 32 44 / .1), 0 0 0 1px rgb(23 32 44 / .05)" }} animate={{ x: side === "head" ? "100%" : "0%" }} transition={{ type: "spring", stiffness: 380, damping: 34 }} />
            <span className={clsx("relative grid place-items-center transition-colors", side === "tail" ? "text-[var(--rx-ink)]" : "text-[var(--rx-3)]")}>Tailwinds</span>
            <span className={clsx("relative grid place-items-center transition-colors", side === "head" ? "text-[var(--rx-ink)]" : "text-[var(--rx-3)]")}>Headwinds</span>
          </div>

          <div className="relative mt-3 h-[176px] overflow-hidden">
            <AnimatePresence initial={false} mode="popLayout">
              <motion.div key={side} className="absolute inset-0" initial={{ opacity: 0, x: side === "head" ? 24 : -24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: side === "head" ? -24 : 24 }} transition={{ duration: 0.55, ease: RX_EASE }}>
                {DRIVERS[side].map(([name, s], i) => (
                  <div key={name} className="flex h-11 items-center gap-3 border-b border-[var(--rx-line)] last:border-b-0">
                    <span className="grid h-6 w-6 place-items-center rounded-[7px]" style={{ background: side === "tail" ? "rgb(47 116 87 / .1)" : "rgb(166 80 58 / .1)", color: side === "tail" ? "var(--rx-up)" : "var(--rx-down)" }}>
                      <svg viewBox="0 0 12 12" width="11" height="11"><path d={side === "tail" ? "M6 10V2M2.5 5.5 6 2l3.5 3.5" : "M6 2v8M2.5 6.5 6 10l3.5-3.5"} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    </span>
                    <span className="flex-1 text-[12.5px]">{name}</span>
                    <span className="flex gap-[3px]">
                      {[0, 1, 2, 3, 4].map((k) => (
                        <motion.span key={k} className="h-3 w-[5px] rounded-[1.5px]" initial={{ backgroundColor: "#eceae5" }} animate={{ backgroundColor: k < s ? (side === "tail" ? "#2f7457" : "#a6503a") : "#eceae5" }} transition={{ delay: 0.25 + i * 0.08 + k * 0.05, duration: 0.25 }} />
                      ))}
                    </span>
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="mt-3 flex items-center gap-4 border-t border-[var(--rx-line)] pt-3">
            <span className="text-[11px] font-medium text-[var(--rx-3)]">Big movers</span>
            {[["VRT", 3.4], ["ANET", 2.1], ["MU", -1.6]].map(([t, m]) => (
              <span key={t as string} className="flex items-center gap-1.5"><Ticker>{t}</Ticker><Delta v={m as number} /></span>
            ))}
          </div>
          <div className="mt-2.5 flex items-center gap-1.5">
            <span className="mr-2 text-[11px] font-medium text-[var(--rx-3)]">Related</span>
            {["Data center power", "Advanced packaging", "Optical networking"].map((r) => (
              <span key={r} className="rounded-full border border-[var(--rx-line)] px-2.5 py-0.5 text-[11px] text-[var(--rx-2)]">{r}</span>
            ))}
          </div>
        </div>
        <Cursor {...target} visible={p !== 0 && p !== 3} press={p === 2 || p === 5} />
      </Canvas>
    </div>
  );
}
