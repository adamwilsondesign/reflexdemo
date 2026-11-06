"use client";

import { motion } from "motion/react";
import { Canvas, Cursor, Delta, Glyph, Icon, Mono, RX_EASE, Spark, useTimeline, useTyped } from "@/components/visual/kit";

/**
 * Portfolio Monitoring — "See the ripple effects in action".
 * Composition: a headline card with a ranked ripple list sliding out beside it.
 * The cursor opens the ripple; then a follow-up is typed into Ask Alfred.
 */
const RIPPLE = [
  { t: "NV", n: "NVIDIA", why: "Platform supplier", c: "#24324a", e: 0.92, m: 2.14 },
  { t: "SK", n: "SK hynix", why: "HBM memory", c: "#3e5368", e: 0.74, m: 1.62 },
  { t: "VR", n: "Vertiv", why: "Power and cooling", c: "#3e5c50", e: 0.61, m: 1.18 },
  { t: "NB", n: "Nebius", why: "Competing cloud", c: "#7a6a58", e: 0.48, m: -0.72 },
  { t: "AN", n: "Arista Networks", why: "Cluster networking", c: "#5b6068", e: 0.41, m: 0.66 },
];
const ASK = "Which regions are most exposed?";

// 0 headline · 1 move · 2 press · 3 ripple · 4 to composer · 5 type · 6 hold
const D = [2400, 900, 400, 3600, 900, 2600, 1800];

export function RippleSpread() {
  const { p, ref, cycle } = useTimeline(D, { still: 6 });
  const open = p >= 3;
  const typed = useTyped(ASK, p >= 5, { speed: 34 });
  const cursor =
    p === 0 ? { x: 300, y: 500, visible: false } :
    p <= 3 ? { x: 200, y: 298, visible: p < 3 } :
    { x: 120, y: 348, visible: p === 4 };

  return (
    <div ref={ref}>
      <Canvas w={640} h={460} focusX={0.15}>
        <motion.div key={cycle} className="absolute inset-0" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}>
          <motion.div
            className="rx-card absolute left-[300px] top-[62px] w-[330px] p-5"
            initial={false}
            animate={{ x: open ? 0 : -150, opacity: open ? 1 : 0 }}
            transition={{ duration: 0.9, ease: RX_EASE }}
          >
            <div className="flex items-center justify-between pl-4 text-[11px] font-medium text-[var(--rx-3)]">
              <span className="flex items-center gap-1.5"><Icon name="graph" size={12} />Ripple effects</span>
              <span>Exposure</span>
            </div>
            <div className="mt-2 pl-4">
              {RIPPLE.map((r, i) => (
                <motion.div key={r.n} className="flex h-[54px] items-center gap-2.5 border-t border-[var(--rx-line)]" initial={false} animate={{ opacity: open ? 1 : 0, x: open ? 0 : -10 }} transition={{ delay: open ? 0.45 + i * 0.14 : 0, duration: 0.5, ease: RX_EASE }}>
                  <span className="rx-num w-3 text-[11px] text-[var(--rx-3)]">{i + 1}</span>
                  <Mono t={r.t} tone={r.c} size={24} />
                  <span className="min-w-0 flex-1">
                    <span className="block text-[12.5px] font-medium leading-4">{r.n}</span>
                    <span className="block text-[10.5px] leading-4 text-[var(--rx-3)]">{r.why}</span>
                  </span>
                  <span className="h-[5px] w-[44px] overflow-hidden rounded-full bg-[var(--rx-well)]">
                    <motion.span className="block h-full rounded-full bg-[#3e5368]" initial={false} animate={{ width: open ? `${r.e * 100}%` : "0%" }} transition={{ delay: open ? 0.6 + i * 0.14 : 0, duration: 0.7, ease: RX_EASE }} />
                  </span>
                  <span className="w-[54px] text-right"><Delta v={r.m} /></span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <div className="rx-card rx-card-lift absolute left-[24px] top-[40px] w-[300px] p-5">
            <p className="flex items-center gap-2 text-[11px] font-medium">
              <span className="flex items-center gap-1 text-[#3e5368]"><Spark size={10} />Company catalyst</span>
              <span className="rounded-[5px] bg-[#e4efe9] px-1.5 py-px text-[var(--rx-up)]">Bullish</span>
            </p>
            <p className="rx-serif mt-2 text-[20px] leading-[26px]">CoreWeave rolls out Nvidia Vera Rubin</p>
            <p className="mt-2 flex items-center gap-1.5 text-[11.5px] text-[var(--rx-2)]"><Glyph kind="theme" size={11} className="text-[var(--rx-3)]" />AI infrastructure</p>
            <div className="mt-4 space-y-2 border-t border-[var(--rx-line)] pt-3">
              {["Customer deployments begin", "Demand signal strengthens", "Supply chain scales"].map((t, i) => (
                <p key={t} className="flex gap-2.5 text-[12px] text-[var(--rx-2)]"><span className="rx-num text-[var(--rx-3)]">{i + 1}</span>{t}</p>
              ))}
            </div>
            <motion.span
              className="mt-4 flex h-9 items-center justify-between rounded-[9px] px-3 text-[12px] font-medium"
              initial={false}
              animate={{ backgroundColor: open ? "#17191c" : "#f4f3f0", color: open ? "#ffffff" : "#17191c" }}
              transition={{ duration: 0.3 }}
            >
              <span className="flex items-center gap-1.5"><Icon name="graph" size={13} />Ripple effects</span>
              <span className="rx-num text-[11px] opacity-70">5 names</span>
            </motion.span>
            <div className="mt-3 flex h-10 items-center gap-2 rounded-[10px] border border-[var(--rx-line)] pl-3 pr-1.5">
              <span className="min-w-0 flex-1 truncate text-[12px]">
                {typed ? <span>{typed}</span> : <span className="text-[var(--rx-3)]">Ask Alfred a follow-up…</span>}
              </span>
              <span className="grid h-7 w-7 shrink-0 place-items-center rounded-[8px] bg-[var(--rx-ink)] text-white"><Icon name="send" size={13} /></span>
            </div>
          </div>
          <Cursor {...cursor} press={p === 2} />
        </motion.div>
      </Canvas>
    </div>
  );
}
