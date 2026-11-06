"use client";

import { AnimatePresence, motion } from "motion/react";
import { Canvas, RX_EASE, Spark, useTimeline } from "@/components/visual/kit";
import { ANNOUNCEMENTS, PRESS, formatNewsDate } from "@/app/news/_components/data";
import { Wordmark } from "@/app/news/_components/Wordmark";

/**
 * News & Press — the newsroom as an activity log.
 * Composition: one coverage card with a timeline rail; new coverage lands
 * at the top and the log steps down. The latest announcement is pinned
 * as a separate card overlapping the bottom of the log.
 */
const FEED = PRESS.filter((p) => p.outlet);
// Walk the most recent coverage from older to newest; each step lands one item on top.
const STEPS = Math.max(1, Math.min(FEED.length - 3, 6));
const D = Array(STEPS).fill(2800);

export function PressLog() {
  const { p, ref } = useTimeline(D, { still: STEPS - 1 });
  const top = STEPS - 1 - p;
  const rows = [0, 1, 2, 3].map((k) => FEED[top + k]).filter(Boolean).map((r, k) => ({ ...r, slot: k }));
  const a = ANNOUNCEMENTS[0];

  return (
    <div ref={ref}>
      <Canvas w={560} h={460} focusX={0.35}>
        <div className="rx-card absolute left-[30px] top-[28px] w-[480px] px-5 pb-4 pt-4">
          <div className="flex items-center justify-between">
            <span className="text-[13px] font-semibold">In the press</span>
            <span className="rx-num text-[10.5px] text-[var(--rx-3)]">{PRESS.length} placements</span>
          </div>
          <div className="relative mt-3 h-[264px] overflow-hidden border-t border-[var(--rx-line)]">
            <span className="absolute bottom-0 left-[5px] top-0 w-px bg-[var(--rx-line)]" />
            <AnimatePresence initial={false} mode="popLayout">
              {rows.map((r) => (
                <motion.div
                  key={r.title}
                  layout
                  className="relative flex h-[66px] items-center gap-4 pl-6"
                  initial={{ opacity: 0, y: -18 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, transition: { duration: 0.25 } }}
                  transition={{ duration: 0.8, ease: RX_EASE }}
                >
                  <motion.span
                    className="absolute left-[1px] top-1/2 h-[9px] w-[9px] -translate-y-1/2 rounded-full"
                    initial={false}
                    animate={{ backgroundColor: r.slot === 0 ? "#3e5368" : "#ffffff", boxShadow: r.slot === 0 ? "0 0 0 3px rgba(62,83,104,.16)" : "inset 0 0 0 1.3px rgba(23,25,28,.22)" }}
                  />
                  <span className="flex w-[84px] shrink-0 text-[var(--rx-ink)]"><Wordmark outlet={r.outlet} format={r.format} size="sm" /></span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-[13px] font-medium leading-[18px]">{r.title}</span>
                    <span className="mt-0.5 block text-[11px] leading-4 text-[var(--rx-3)]">{r.format}{r.date ? ` · ${formatNewsDate(r.date)}` : ""}</span>
                  </span>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        <div className="rx-card rx-card-lift absolute left-[110px] top-[334px] w-[420px] p-4">
          <div className="flex items-center gap-2 text-[11px]">
            <span className="flex items-center gap-1 font-medium text-[#3e5368]"><Spark size={10} />Announcement</span>
            <span className="rounded-[5px] bg-[var(--rx-well)] px-1.5 py-px text-[var(--rx-2)]">{a.tag}</span>
            <span className="rx-num ml-auto text-[10.5px] text-[var(--rx-3)]">{formatNewsDate(a.date)}</span>
          </div>
          <p className="rx-serif mt-2 text-[16.5px] leading-[23px]">{a.title}</p>
          <span className="absolute -left-px top-4 h-7 w-[3px] rounded-r-full bg-[var(--rx-signal)]" />
        </div>
      </Canvas>
    </div>
  );
}
