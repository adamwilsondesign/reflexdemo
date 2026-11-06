"use client";

import { AnimatePresence, motion } from "motion/react";
import { Canvas, Cursor, RX_EASE, useTimeline } from "@/components/visual/kit";

/**
 * Scenario & Stress Testing — one scenario, set up as an investor would run it.
 * Composition: a dashboard card — stat tiles over a diverging bar chart.
 * Solid bars are history; hatched bars are this scenario's projection.
 */
const SECTORS = [
  { s: "Financials", h: 2.1, f: 2.6 },
  { s: "Energy", h: 1.4, f: 0.9 },
  { s: "Industrials", h: -0.6, f: -1.1 },
  { s: "Tech", h: -3.2, f: -3.9 },
  { s: "Utilities", h: -5.4, f: -5.0 },
  { s: "Real estate", h: -6.8, f: -7.4 },
];
const STATS = [["Episodes since 1990", "14"], ["Median 3M return", "−2.8%"], ["Names that rose", "38%"]];

const BASE = 84; // y of zero line inside the chart
const PX = 10; // px per %

// 0 card · 1 history bars · 2 projection · 3 move · 4 inspect
const D = [900, 1900, 1900, 900, 3800];

export function ScenarioDash() {
  const { p, ref, cycle } = useTimeline(D, { still: 4 });
  const inspect = p === 4;

  return (
    <div ref={ref}>
      <Canvas w={560} h={480}>
        <motion.div key={cycle} className="rx-card rx-card-lift absolute left-[24px] top-[26px] w-[512px] p-5" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: RX_EASE }}>
          <p className="text-[11px] font-medium text-[var(--rx-3)]">Scenario · S&amp;P 1500</p>
          <p className="rx-serif mt-1 text-[19px] leading-[26px]">10-year yield rises 0.5% in three months</p>

          <div className="mt-4 grid grid-cols-3 gap-2">
            {STATS.map(([k, v]) => (
              <div key={k} className="rounded-[10px] bg-[var(--rx-well)] px-3 py-2.5">
                <p className="text-[10.5px] text-[var(--rx-3)]">{k}</p>
                <p className="rx-num mt-0.5 text-[17px] font-medium tracking-[-0.02em]">{v}</p>
              </div>
            ))}
          </div>

          <div className="mt-4 flex items-center justify-between text-[10.5px] text-[var(--rx-3)]">
            <span>Median sector return, 3 months after</span>
            <span className="flex items-center gap-3">
              <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-[2px] bg-[#3e5368]" />History</span>
              <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-[2px] ring-1 ring-[#3e5368]/50" style={{ backgroundImage: "repeating-linear-gradient(135deg, rgb(62 83 104 / .5) 0 1px, transparent 1px 3px)" }} />This scenario</span>
            </span>
          </div>

          <div className="relative mt-2 h-[200px]">
            <svg viewBox="0 0 472 200" className="absolute inset-0 h-full w-full overflow-visible">
              <defs>
                <pattern id="sc-hatch" width="4" height="4" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
                  <rect width="4" height="4" fill="#3e5368" fillOpacity=".06" />
                  <line x1="0" y1="0" x2="0" y2="4" stroke="#3e5368" strokeOpacity=".55" strokeWidth="1.2" />
                </pattern>
                <linearGradient id="sc-up" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stopColor="#2f7457" /><stop offset="1" stopColor="#2f7457" stopOpacity=".55" /></linearGradient>
                <linearGradient id="sc-dn" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stopColor="#3e5368" stopOpacity=".55" /><stop offset="1" stopColor="#3e5368" /></linearGradient>
              </defs>
              {[-6, -3, 0, 3].map((g) => (
                <g key={g}>
                  <line x1="34" x2="472" y1={BASE - g * PX} y2={BASE - g * PX} stroke="#17191c" strokeOpacity={g === 0 ? 0.25 : 0.07} strokeDasharray={g === 0 ? undefined : "2 3"} />
                  <text x="0" y={BASE - g * PX + 3} className="rx-num" fontSize="9" fill="#959aa1">{g > 0 ? `+${g}` : g}%</text>
                </g>
              ))}
              {SECTORS.map((c, i) => {
                const x = 50 + i * 72;
                const bar = (v: number, dx: number, fill: string, show: boolean, delay: number) => {
                  const h = Math.abs(v) * PX;
                  return (
                    <motion.rect
                      x={x + dx}
                      width="22"
                      rx="3"
                      fill={fill}
                      initial={{ y: BASE, height: 0 }}
                      animate={show ? { y: v >= 0 ? BASE - h : BASE, height: h } : { y: BASE, height: 0 }}
                      transition={{ duration: 0.9, ease: RX_EASE, delay }}
                      opacity={inspect && i !== 5 ? 0.35 : 1}
                    />
                  );
                };
                return (
                  <g key={c.s} style={{ transition: "opacity .5s" }}>
                    {bar(c.h, 0, c.h >= 0 ? "url(#sc-up)" : "url(#sc-dn)", p >= 1, i * 0.12)}
                    {bar(c.f, 25, "url(#sc-hatch)", p >= 2, i * 0.12)}
                    <text x={x + 23.5} y="194" textAnchor="middle" fontSize="10" fill="#5b6068">{c.s}</text>
                  </g>
                );
              })}
            </svg>
            <AnimatePresence>
              {inspect && (
                <motion.div className="rx-card absolute left-[218px] top-[34px] w-[180px] p-3" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.4, ease: RX_EASE, delay: 0.3 }}>
                  <p className="text-[12px] font-medium">Real estate</p>
                  <p className="mt-1.5 flex justify-between text-[11px] text-[var(--rx-2)]"><span>History</span><span className="rx-num">−6.8%</span></p>
                  <p className="flex justify-between text-[11px] text-[var(--rx-2)]"><span>This scenario</span><span className="rx-num">−7.4%</span></p>
                  <p className="mt-1.5 border-t border-[var(--rx-line)] pt-1.5 text-[10.5px] text-[var(--rx-3)]">Negative in 13 of 14 episodes</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
        <Cursor x={p >= 3 ? 438 : 600} y={p >= 3 ? 330 : 520} visible={p >= 3} />
      </Canvas>
    </div>
  );
}
