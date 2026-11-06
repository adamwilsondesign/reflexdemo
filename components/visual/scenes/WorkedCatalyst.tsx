"use client";

import { motion } from "motion/react";
import { Canvas, Glyph, Mono, RX_EASE, Spark, useTimeline } from "@/components/visual/kit";

/**
 * Home · Worked example 01 — "A catalyst lands".
 * Composition: an insight card built around one chart. The prices-paid line
 * draws, the last print jumps to a four-year high, then the holdings it
 * touches stack up underneath with the reason it reached you.
 */
const PTS = [51.2, 52.0, 50.8, 51.5, 52.6, 52.1, 53.4, 52.8, 53.9, 54.6, 55.1, 58.4];
const CW = 448, CH = 120, MIN = 49, MAX = 60;
const X = (i: number) => (i / (PTS.length - 1)) * CW;
const Y = (v: number) => CH - ((v - MIN) / (MAX - MIN)) * CH;
const LINE = PTS.slice(0, -1).map((v, i) => `${i ? "L" : "M"}${X(i).toFixed(1)} ${Y(v).toFixed(1)}`).join(" ");
const LAST = `M${X(PTS.length - 2).toFixed(1)} ${Y(PTS[PTS.length - 2]).toFixed(1)} L${X(PTS.length - 1)} ${Y(PTS[PTS.length - 1]).toFixed(1)}`;
const AREA = `${LINE} L${X(PTS.length - 2).toFixed(1)} ${CH} L0 ${CH} Z`;
const HOLD = [["ETN", "Eaton", "#24324a"], ["ROK", "Rockwell", "#a6503a"], ["EMR", "Emerson", "#3e5368"], ["HON", "Honeywell", "#5a6f63"]] as const;

// 0 card · 1 line · 2 spike · 3 holdings · 4 hold · 5 out
const D = [700, 1700, 1300, 1600, 3800, 700];

export function WorkedCatalyst() {
  const { p, ref, cycle } = useTimeline(D, { still: 4 });
  return (
    <div ref={ref}>
      <Canvas w={560} h={480} focusX={0.25}>
        <motion.div key={cycle} className="absolute inset-0" initial={{ opacity: 0 }} animate={{ opacity: p === 5 ? 0 : 1 }} transition={{ duration: 0.6 }}>
          <motion.div className="rx-card rx-card-lift absolute left-[32px] top-[40px] w-[496px] p-6" initial={{ y: 16 }} animate={{ y: 0 }} transition={{ duration: 0.8, ease: RX_EASE }}>
            <div className="flex items-center justify-between text-[11px]">
              <span className="flex items-center gap-1.5 font-medium text-[#3e5368]"><Spark size={10} />Market catalyst · Macro</span>
              <span className="text-[var(--rx-3)]">Today, 9:45 AM</span>
            </div>
            <p className="rx-serif mt-2 text-[21px] leading-[28px]">Flash PMI rekindles factory cost pressure</p>

            <div className="mt-4 flex items-baseline justify-between text-[10.5px] text-[var(--rx-3)]">
              <span>Prices paid index, U.S. manufacturing</span>
              <span className="rx-num">12M</span>
            </div>
            <svg viewBox={`-4 -18 ${CW + 8} ${CH + 26}`} className="mt-1 w-full overflow-visible" style={{ height: CH + 26 }}>
              <defs>
                <linearGradient id="wc-fill" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stopColor="#3e5368" stopOpacity=".16" /><stop offset="1" stopColor="#3e5368" stopOpacity="0" /></linearGradient>
              </defs>
              {[52, 55, 58].map((g) => <line key={g} x1="0" x2={CW} y1={Y(g)} y2={Y(g)} stroke="#17191c" strokeOpacity=".07" strokeDasharray="2 3" />)}
              <motion.path d={AREA} fill="url(#wc-fill)" initial={{ opacity: 0 }} animate={{ opacity: p >= 1 ? 1 : 0 }} transition={{ duration: 1, delay: 0.6 }} />
              <motion.path d={LINE} fill="none" stroke="#3e5368" strokeWidth="1.8" strokeLinejoin="round" initial={{ pathLength: 0 }} animate={{ pathLength: p >= 1 ? 1 : 0 }} transition={{ duration: 1.4, ease: "easeInOut" }} />
              <motion.path d={LAST} fill="none" stroke="#17191c" strokeWidth="2" initial={{ pathLength: 0 }} animate={{ pathLength: p >= 2 ? 1 : 0 }} transition={{ duration: 0.5, ease: RX_EASE }} />
              <motion.g initial={{ opacity: 0, scale: 0.4 }} animate={{ opacity: p >= 2 ? 1 : 0, scale: p >= 2 ? 1 : 0.4 }} transition={{ duration: 0.4, delay: 0.4 }} style={{ transformOrigin: `${X(11)}px ${Y(58.4)}px` }}>
                <circle cx={X(11)} cy={Y(58.4)} r="9" fill="#17191c" fillOpacity=".08" />
                <circle cx={X(11)} cy={Y(58.4)} r="3.6" fill="#17191c" />
                <circle cx={X(11)} cy={Y(58.4)} r="1.4" fill="#e9a93a" />
              </motion.g>
              <motion.g initial={{ opacity: 0 }} animate={{ opacity: p >= 2 ? 1 : 0 }} transition={{ duration: 0.4, delay: 0.6 }}>
                <text x={X(11) - 12} y={Y(58.4) - 4} textAnchor="end" className="rx-num" fontSize="12" fontWeight="500" fill="#17191c">58.4</text>
                <text x={X(11) - 12} y={Y(58.4) + 10} textAnchor="end" fontSize="10" fill="#959aa1">4-year high</text>
              </motion.g>
            </svg>

            <div className="mt-3 border-t border-[var(--rx-line)] pt-3.5">
              <p className="flex items-center gap-1.5 text-[11px] text-[var(--rx-3)]"><Glyph kind="driver" size={10} />Reached you because 4 holdings carry input-cost exposure</p>
              <div className="mt-2.5 grid grid-cols-4 gap-2">
                {HOLD.map(([t, n, c], i) => (
                  <motion.span key={t} className="flex items-center gap-2 rounded-[9px] border border-[var(--rx-line)] px-2 py-1.5" initial={{ opacity: 0, y: 8 }} animate={{ opacity: p >= 3 ? 1 : 0, y: p >= 3 ? 0 : 8 }} transition={{ duration: 0.5, ease: RX_EASE, delay: p >= 3 ? i * 0.14 : 0 }}>
                    <Mono t={t.slice(0, 2)} tone={c} size={22} />
                    <span className="truncate text-[12px] font-medium">{n}</span>
                  </motion.span>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </Canvas>
    </div>
  );
}
