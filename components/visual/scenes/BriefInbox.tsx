"use client";

import { AnimatePresence, motion } from "motion/react";
import clsx from "clsx";
import { Canvas, CiteChip, Cursor, RX_EASE, Spark, Ticker, useTimeline } from "@/components/visual/kit";

/**
 * Portfolio Monitoring — "Your morning read, already prepared".
 * Composition: the daily brief as an email, a timeline with citation chips
 * and a week strip. Items arrive in time order; the cursor checks a source.
 */
const ITEMS = [
  { at: "06:58", t: "VRT", text: "Vertiv backlog climbs on data-center orders", n: 1, start: true },
  { at: "06:41", t: "NKE", text: "Nike guides holiday-quarter sales lower", n: 2 },
  { at: "05:12", t: "CRWV", text: "CoreWeave begins Vera Rubin deployments", n: 3 },
];
const WEEK = [["Mon", ""], ["Tue", ""], ["Wed", "NVDA earnings"], ["Thu", "MSFT investor day"], ["Fri", ""]];

// 0 header · 1–3 items · 4 week · 5 move · 6 hover source · 7 hold
const D = [900, 700, 700, 900, 1000, 1000, 3600, 900];

export function BriefInbox() {
  const { p, ref, cycle } = useTimeline(D, { still: 6 });
  const shown = Math.max(0, Math.min(3, p));
  const pop = p === 6;

  return (
    <div ref={ref}>
      <Canvas w={480} h={480}>
        <motion.div key={cycle} className="rx-card rx-card-lift absolute left-[20px] top-[22px] w-[440px] overflow-hidden" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: RX_EASE }}>
          <div className="flex items-center gap-3 border-b border-[var(--rx-line)] px-5 py-3.5">
            <span className="grid h-8 w-8 place-items-center rounded-full bg-[var(--rx-ink)] text-white"><Spark size={13} /></span>
            <span className="flex-1">
              <span className="block text-[12.5px] font-semibold">Alfred</span>
              <span className="block text-[11px] text-[var(--rx-3)]">Daily watchlist summary</span>
            </span>
            <span className="rx-num text-[11px] text-[var(--rx-3)]">07:00</span>
          </div>

          <div className="px-5 pb-5 pt-4">
            <p className="rx-serif text-[20px] leading-[27px]">Good morning. Three things moved overnight.</p>

            <div className="relative mt-4">
              <motion.span className="absolute left-[51px] top-3 w-px origin-top bg-[var(--rx-line)]" style={{ height: 120 }} initial={{ scaleY: 0 }} animate={{ scaleY: shown / 3 }} transition={{ duration: 0.6, ease: RX_EASE }} />
              {ITEMS.map((it, i) => (
                <motion.div
                  key={it.at}
                  className={clsx("relative flex h-[48px] items-center gap-3 rounded-[10px]", it.start && "bg-[var(--rx-well)]")}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: i < shown ? 1 : 0, y: i < shown ? 0 : 8 }}
                  transition={{ duration: 0.5, ease: RX_EASE }}
                >
                  <span className="rx-num w-[40px] pl-2 text-[10.5px] text-[var(--rx-3)]">{it.at}</span>
                  <span className={clsx("relative z-10 h-[9px] w-[9px] rounded-full border-[1.5px]", it.start ? "border-[var(--rx-ink)] bg-[var(--rx-ink)]" : "border-[#959aa1] bg-white")} />
                  <span className="min-w-0 flex-1">
                    {it.start && <span className="block text-[10px] font-semibold uppercase tracking-[0.06em] text-[#3e5368]">Start here</span>}
                    <span className="block truncate text-[13px] leading-[18px]">
                      {it.text}
                      <CiteChip n={it.n} active={pop && i === 0} />
                    </span>
                  </span>
                  <Ticker className="mr-2.5 bg-white">{it.t}</Ticker>
                </motion.div>
              ))}

              <AnimatePresence>
                {pop && (
                  <motion.div className="rx-card absolute left-[176px] top-[46px] z-20 w-[220px] p-3" initial={{ opacity: 0, y: -4, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, transition: { duration: 0.2 } }} transition={{ duration: 0.35, ease: RX_EASE, delay: 0.1 }}>
                    <p className="flex items-center gap-1.5 text-[11px] text-[var(--rx-3)]"><CiteChip n={1} active />Source</p>
                    <p className="mt-1 text-[12.5px] font-medium">Vertiv Q3 earnings call</p>
                    <p className="mt-0.5 text-[11px] text-[var(--rx-2)]">Transcript · CFO remarks on backlog</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <motion.div className="mt-4 border-t border-[var(--rx-line)] pt-3.5" initial={{ opacity: 0 }} animate={{ opacity: p >= 4 ? 1 : 0 }} transition={{ duration: 0.6 }}>
              <p className="text-[11px] font-medium text-[var(--rx-3)]">This week</p>
              <div className="mt-2 grid grid-cols-5 gap-1.5">
                {WEEK.map(([d, e]) => (
                  <div key={d} className={clsx("h-[54px] rounded-[8px] px-2 py-1.5", e ? "bg-[#e9eef2]" : "bg-[var(--rx-well)]")}>
                    <p className="text-[10px] text-[var(--rx-3)]">{d}</p>
                    {e && <p className="mt-0.5 text-[10.5px] font-medium leading-[13px] text-[#243244]">{e}</p>}
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
        <CiteCursor p={p} />
      </Canvas>
    </div>
  );
}

/** Cursor that travels to the first citation chip. */
function CiteCursor({ p }: { p: number }) {
  const on = p === 5 || p === 6;
  return <Cursor x={on ? CITE.x : 520} y={on ? CITE.y : 470} visible={on} />;
}
const CITE = { x: 373, y: 204 };
