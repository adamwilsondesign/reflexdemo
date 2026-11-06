"use client";

import { AnimatePresence, motion } from "motion/react";
import { Canvas, Delta, RX_EASE, Spark, useTimeline } from "@/components/visual/kit";

/**
 * Alfred always-on / Insights — "Get alerts for what matters".
 * Composition: a roll of separate alert cards. A new one lands at the top,
 * the rest settle down a slot, the oldest leaves the frame.
 * Alert anatomy follows the product (theme, date, headline, move, type, time).
 */
const ALERTS = [
  { theme: "Data center power", title: "Gas-turbine order surge signals data-center power strain", m: 3.22, type: "Market catalyst", bg: "#3e5368", icon: "rack" },
  { theme: "Industrial automation", title: "September flash PMI rekindles factory cost pressure", m: 0.4, type: "Neutral", bg: "#3e5c50", icon: "gear" },
  { theme: "Consumer discretionary", title: "Guidance overshadows a mixed Nike quarter", m: -0.84, type: "Earnings recap", bg: "#7a6a58", icon: "bag" },
  { theme: "Semiconductors", title: "Packaging capacity tightens as AI orders climb", m: 1.12, type: "Market catalyst", bg: "#243244", icon: "chip" },
  { theme: "GLP-1 ripple effects", title: "Supply expansion widens access to GLP-1 therapies", m: 0.67, type: "Company catalyst", bg: "#5a6f63", icon: "drop" },
] as const;

const D = Array(ALERTS.length * 2).fill(2600);

export function AlertRoll() {
  const { p, ref } = useTimeline(D, { still: 3 });
  const visible = [0, 1, 2, 3].map((k) => p - k).filter((i) => i >= 0);

  return (
    <div ref={ref}>
      <Canvas w={560} h={480}>
        <div className="absolute left-[30px] top-[24px] w-[500px]">
          <AnimatePresence initial={false}>
            {visible.map((i, slot) => {
              const a = ALERTS[i % ALERTS.length];
              return (
                <motion.div
                  key={i}
                  layout
                  className={slot === 0 ? "rx-card rx-card-lift relative mb-3 flex h-[96px] items-start gap-3.5 p-4" : "rx-card relative mb-3 flex h-[96px] items-start gap-3.5 p-4"}
                  initial={{ opacity: 0, y: -24, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 24, transition: { duration: 0.4 } }}
                  transition={{ duration: 0.7, ease: RX_EASE }}
                >
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full text-white" style={{ background: a.bg }}><ThemeIcon name={a.icon} /></span>
                  <span className="min-w-0 flex-1">
                    <span className="flex items-center justify-between text-[11.5px] text-[var(--rx-3)]">
                      <span>{a.theme} · Today</span>
                      <span className="flex items-center gap-1 font-medium" style={{ color: a.type === "Neutral" ? "#8a6a1e" : "#3e5368" }}><Spark size={10} />{a.type}</span>
                    </span>
                    <span className="mt-1 block truncate text-[14px] font-medium leading-5">{a.title}</span>
                    <span className="mt-1.5 flex items-center justify-between text-[11.5px]">
                      <span className="flex items-center gap-1.5"><Delta v={a.m} /><span className="text-[var(--rx-up)]">· Market open</span></span>
                      <span className="text-[var(--rx-3)]">{slot === 0 ? "Just now" : `${slot * 14} min ago`}</span>
                    </span>
                  </span>
                  {slot === 0 && (
                    <motion.span className="absolute -left-px top-4 h-8 w-[3px] rounded-r-full bg-[var(--rx-signal)]" initial={{ scaleY: 0 }} animate={{ scaleY: 1 }} transition={{ delay: 0.4, duration: 0.4 }} />
                  )}
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </Canvas>
    </div>
  );
}

function ThemeIcon({ name }: { name: string }) {
  const p = { fill: "none", stroke: "currentColor", strokeWidth: 1.5, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  return (
    <svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true">
      {name === "rack" && <g {...p}><rect x="3" y="2.5" width="10" height="3.5" rx="1" /><rect x="3" y="7.5" width="10" height="3.5" rx="1" /><path d="M5.5 4.2h.01M5.5 9.2h.01M8 13.5h0M5 13.5h6" /></g>}
      {name === "gear" && <g {...p}><circle cx="8" cy="8" r="2.2" /><path d="M8 2v2M8 12v2M2 8h2M12 8h2M3.8 3.8l1.4 1.4M10.8 10.8l1.4 1.4M3.8 12.2l1.4-1.4M10.8 5.2l1.4-1.4" /></g>}
      {name === "bag" && <g {...p}><path d="M3.5 5.5h9l-.8 8h-7.4z" /><path d="M6 5.5V4.5a2 2 0 0 1 4 0v1" /></g>}
      {name === "chip" && <g {...p}><rect x="4" y="4" width="8" height="8" rx="1.2" /><path d="M6 2v2M10 2v2M6 12v2M10 12v2M2 6h2M2 10h2M12 6h2M12 10h2" /></g>}
      {name === "drop" && <path {...p} d="M8 2.5s4 4.3 4 7a4 4 0 0 1-8 0c0-2.7 4-7 4-7z" />}
    </svg>
  );
}
