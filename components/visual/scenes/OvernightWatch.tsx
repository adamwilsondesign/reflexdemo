"use client";

import { AnimatePresence, animate, motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";
import { Canvas, Delta, Icon, RX_EASE, Spark, Ticker, useTimeline } from "@/components/visual/kit";

/**
 * Home · Always-on intelligence — "surfacing insights without waiting for a prompt".
 * Composition: a monitor card with an overnight time track. A scan head sweeps
 * the night, every development is read (small ticks), the few that touch your
 * book stand up; then one lands as a notification.
 */
const TICKS = Array.from({ length: 58 }, (_, i) => {
  const r = Math.sin(i * 12.9898) * 43758.5453;
  return { x: (i + 0.5) / 58 + ((r - Math.floor(r)) - 0.5) * 0.012, h: 8 + Math.round((r - Math.floor(r)) * 10) };
});
const HITS = [{ x: 0.27, label: "TSMC" }, { x: 0.61, label: "Eaton" }, { x: 0.83, label: "Micron" }];
const HOURS = ["6 PM", "9 PM", "12 AM", "3 AM", "6 AM"];
const TRACK = 432;

// 0 in · 1 scan · 2 land · 3 hold · 4 out
const D = [700, 3400, 600, 3800, 700];

function Count({ to, run, dur = 3.2 }: { to: number; run: boolean; dur?: number }) {
  const reduce = useReducedMotion();
  const [v, setV] = useState(reduce ? to : 0);
  useEffect(() => {
    if (reduce) { setV(to); return; }
    if (!run) { setV(0); return; }
    const c = animate(0, to, { duration: dur, ease: "linear", onUpdate: (x) => setV(Math.round(x)) });
    return () => c.stop();
  }, [run, to, dur, reduce]);
  return <>{v.toLocaleString("en-US")}</>;
}

export function OvernightWatch() {
  const { p, ref, cycle, reduce } = useTimeline(D, { still: 3 });
  const scanning = p >= 1 && p < 4;
  const done = p >= 2 && p < 4;

  return (
    <div ref={ref}>
      <Canvas w={560} h={400} focusX={0.25}>
        <motion.div key={cycle} className="absolute inset-0" initial={{ opacity: 0 }} animate={{ opacity: p === 4 ? 0 : 1 }} transition={{ duration: 0.6 }}>
          <motion.div className="rx-card rx-card-lift absolute left-[32px] top-[30px] w-[496px] p-5" initial={{ y: 14 }} animate={{ y: 0 }} transition={{ duration: 0.8, ease: RX_EASE }}>
            <div className="flex items-center justify-between text-[11px]">
              <span className="flex items-center gap-1.5 font-medium text-[var(--rx-3)]"><span className="relative grid h-2 w-2 place-items-center"><motion.span className="absolute h-2 w-2 rounded-full bg-[#2f7457]" animate={{ scale: [1, 2.2], opacity: [0.5, 0] }} transition={{ duration: 1.6, repeat: Infinity }} /><span className="h-1.5 w-1.5 rounded-full bg-[#2f7457]" /></span>Monitoring · 42 names · 7 themes</span>
              <span className="text-[var(--rx-3)]">No prompt needed</span>
            </div>
            <p className="rx-serif mt-1.5 text-[19px] leading-[26px]">Overnight, while you were away</p>

            <div className="relative mt-5 h-[84px]" style={{ width: TRACK }}>
              <div className="absolute inset-x-0 bottom-[22px] h-px bg-[var(--rx-line)]" />
              {TICKS.map((t, i) => (
                <motion.span key={i} className="absolute bottom-[22px] w-px rounded-full bg-[#3e5368]" style={{ left: t.x * TRACK, height: t.h }} initial={{ opacity: 0, scaleY: 0 }} animate={scanning || reduce ? { opacity: 0.38, scaleY: 1 } : { opacity: 0, scaleY: 0 }} transition={{ delay: reduce ? 0 : t.x * 3.1, duration: 0.25 }} />
              ))}
              {HITS.map((h, i) => (
                <motion.span key={h.label} className="absolute bottom-[22px] flex -translate-x-1/2 flex-col items-center" style={{ left: h.x * TRACK }} initial={{ opacity: 0, y: 6 }} animate={(scanning || reduce) ? { opacity: 1, y: 0 } : { opacity: 0, y: 6 }} transition={{ delay: reduce ? 0 : h.x * 3.1 + 0.1, duration: 0.45, ease: RX_EASE }}>
                  <span className="rounded-[6px] bg-[#243244] px-1.5 py-[2px] text-[10.5px] font-medium text-white">{h.label}</span>
                  <span className="h-[30px] w-[2px] rounded-full" style={{ background: i === 2 ? "var(--rx-signal)" : "#243244" }} />
                </motion.span>
              ))}
              <motion.span className="absolute bottom-[16px] top-0 w-px bg-[var(--rx-ink)]" initial={{ left: 0, opacity: 0 }} animate={p === 1 && !reduce ? { left: TRACK, opacity: [0, 1, 1, 0] } : { left: TRACK, opacity: 0 }} transition={{ duration: 3.1, ease: "linear" }} />
              <div className="absolute inset-x-0 bottom-0 flex justify-between">
                {HOURS.map((h) => <span key={h} className="rx-num text-[10px] text-[var(--rx-3)]">{h}</span>)}
              </div>
            </div>

            <div className="mt-4 grid grid-cols-3 gap-2">
              {[["Developments read", 1284], ["Touch your book", 3], ["Sent to you", 1]].map(([k, v], i) => (
                <div key={k as string} className="rounded-[10px] bg-[var(--rx-well)] px-3 py-2.5">
                  <p className="text-[10.5px] text-[var(--rx-3)]">{k}</p>
                  <p className="rx-num mt-0.5 text-[17px] font-medium tracking-[-0.02em]">{i === 0 ? <Count to={v as number} run={p >= 1} /> : (done || reduce) ? v : 0}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <AnimatePresence>
            {(done || reduce) && (
              <motion.div className="rx-card rx-card-lift absolute left-[196px] top-[312px] z-20 flex w-[340px] items-start gap-3 p-3.5" initial={{ opacity: 0, y: 18, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 8 }} transition={{ duration: 0.6, ease: RX_EASE, delay: 0.2 }}>
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-[9px] bg-[#243244] text-white"><Icon name="bell" size={15} /></span>
                <span className="min-w-0 flex-1">
                  <span className="flex items-center justify-between text-[11px] text-[var(--rx-3)]"><span className="flex items-center gap-1 font-medium text-[#3e5368]"><Spark size={10} />Company catalyst</span>6:12 AM</span>
                  <span className="mt-0.5 block text-[13px] font-medium leading-[18px]">Micron lifts capex outlook</span>
                  <span className="mt-1 flex items-center gap-1.5 text-[11px] text-[var(--rx-3)]">Reached you via <Ticker>AMAT</Ticker><Ticker>LRCX</Ticker><Delta v={2.14} className="ml-auto" /></span>
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </Canvas>
    </div>
  );
}
