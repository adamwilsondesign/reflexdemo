"use client";

import { motion } from "motion/react";
import { Canvas, CiteChip, Delta, Glyph, Icon, RX_EASE, Spark, useTimeline } from "@/components/visual/kit";

/**
 * Use cases · "Research, monitoring, and testing feed each other".
 * Composition: one position's activity timeline. Monitor → research → test →
 * keep watching land one by one on the rail; then, two days later, a new
 * Insight arrives because of the work done on Monday, and the loop closes.
 */
type E = { kind: "insight" | "alfred" | "test" | "watch"; label: string; when: string; body: React.ReactNode; extra?: React.ReactNode; signal?: boolean };
const chip = (n: string) => (
  <span key={n} className="flex h-[22px] items-center gap-1.5 rounded-[6px] border border-[var(--rx-line)] px-1.5 text-[11px] font-medium"><Glyph kind="company" size={8} className="text-[var(--rx-3)]" />{n}</span>
);
const ENTRIES: E[] = [
  { kind: "insight", label: "Insight", when: "Mon 8:12", body: "CoreWeave rolls out Nvidia Vera Rubin", extra: <>{chip("CoreWeave")}{chip("NVIDIA")}<span className="text-[11px] text-[var(--rx-3)]">On your watchlist</span></> },
  { kind: "alfred", label: "Alfred", when: "Mon 9:40", body: <>Demand read holds; supply is the constraint<CiteChip n={1} /><CiteChip n={2} /></>, extra: <>{chip("NVIDIA")}{chip("TSMC")}</> },
  { kind: "test", label: "Stress test", when: "Mon 11:05", body: <>AI capex slows 20%: position <span className="rx-num text-[#a6503a]">−6.8%</span></>, extra: <span className="rx-num rounded-[5px] bg-[var(--rx-well)] px-1.5 py-0.5 text-[10.5px] text-[var(--rx-2)]">Ran in code · 2Y betas</span> },
  { kind: "watch", label: "Watchlist", when: "Mon 11:06", body: "Following the names you tested", extra: <>{chip("CoreWeave")}{chip("NVIDIA")}{chip("Nebius")}</> },
  { kind: "insight", label: "Insight", when: "Wed 7:30", body: "Nebius adds GPU capacity in Finland", extra: <><Delta v={4.1} /><span className="text-[11px] text-[var(--rx-3)]">Reached you because of Monday’s test</span></>, signal: true },
];
const RH = 84;

// 0..4 entry i lands · 5 hold · 6 out
const D = [1500, 1700, 1700, 1700, 2300, 3600, 700];

export function LoopTimeline() {
  const { p, ref, cycle } = useTimeline(D, { still: 5 });
  const n = Math.min(p, 4) + 1;
  const shift = n >= 5 ? RH : 0;

  return (
    <div ref={ref}>
      <Canvas w={560} h={480} focusX={0.3}>
        <motion.div key={cycle} className="absolute inset-0" initial={{ opacity: 0 }} animate={{ opacity: p === 6 ? 0 : 1 }} transition={{ duration: 0.6 }}>
          <motion.div className="rx-card rx-card-lift absolute left-[40px] top-[28px] h-[424px] w-[480px] overflow-hidden" initial={{ y: 14 }} animate={{ y: 0 }} transition={{ duration: 0.8, ease: RX_EASE }}>
            <div className="relative z-10 flex items-center justify-between border-b border-[var(--rx-line)] bg-white px-5 pb-3 pt-4">
              <span className="flex items-center gap-2.5">
                <span className="grid h-7 w-7 place-items-center rounded-[7px] bg-[#24324a] text-[10px] font-semibold text-white">NV</span>
                <span><span className="block text-[13px] font-semibold leading-4">NVIDIA position</span><span className="block text-[11px] leading-4 text-[var(--rx-3)]">Activity</span></span>
              </span>
              <span className="text-[11px] text-[var(--rx-3)]">Monitor · Research · Test</span>
            </div>
            <motion.div className="relative px-5 pt-4" animate={{ y: -shift }} transition={{ duration: 0.9, ease: RX_EASE }}>
              <motion.span className="absolute left-[33px] top-[30px] w-px bg-[var(--rx-line)]" style={{ background: "rgb(23 25 28 / .12)" }} initial={{ height: 0 }} animate={{ height: (n - 1) * RH }} transition={{ duration: 0.7, ease: RX_EASE }} />
              {ENTRIES.map((e, i) => (
                <motion.div key={i} className="relative flex gap-3.5" style={{ height: RH }} initial={{ opacity: 0, y: 10 }} animate={{ opacity: i < n ? 1 : 0, y: i < n ? 0 : 10 }} transition={{ duration: 0.55, ease: RX_EASE, delay: i < n ? 0.15 : 0 }}>
                  <span className="relative z-10 grid h-7 w-7 shrink-0 place-items-center rounded-full bg-white text-[var(--rx-2)] shadow-[0_0_0_1px_rgb(23_32_44/.1)]"><KindIcon k={e.kind} /></span>
                  <span className="min-w-0 flex-1 pt-0.5">
                    <span className="flex items-center justify-between text-[11px]">
                      <span className="font-medium text-[#3e5368]">{e.label}</span>
                      <span className="text-[var(--rx-3)]">{e.when}</span>
                    </span>
                    <span className="mt-0.5 block truncate text-[13px] font-medium leading-5">{e.body}</span>
                    <span className="mt-1.5 flex items-center gap-1.5">{e.extra}</span>
                  </span>
                  {e.signal && <motion.span className="absolute -left-5 top-1 h-6 w-[2px] rounded-r-full bg-[var(--rx-signal)]" initial={{ scaleY: 0 }} animate={{ scaleY: i < n ? 1 : 0 }} transition={{ delay: 0.6 }} />}
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </motion.div>
      </Canvas>
    </div>
  );
}

function KindIcon({ k }: { k: E["kind"] }) {
  if (k === "insight") return <Icon name="bell" size={13} />;
  if (k === "alfred") return <Spark size={12} />;
  if (k === "watch") return <Icon name="check" size={13} />;
  return <svg viewBox="0 0 16 16" width="13" height="13" aria-hidden="true"><path d="M2.5 13.5h11M4.5 11V8M8 11V4.5M11.5 11V7" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>;
}
