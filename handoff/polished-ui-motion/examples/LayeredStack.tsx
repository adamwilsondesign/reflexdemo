"use client";

import { AnimatePresence, motion } from "motion/react";
import { Canvas, Cursor, Glyph, Icon, RX_EASE, Spark, Ticker, useTimeline } from "@/components/visual/kit";

/**
 * Direction C — "Layered stack".
 * Question, evidence and answer dealt in depth. Hatching marks what isn't
 * disclosed. The cursor turns the answer into an action (follow → alerts on).
 */
const BARS = [
  { t: "CRUS", name: "Cirrus Logic", v: 0.88 },
  { t: "AMKR", name: "Amkor", v: 0.64 },
  { t: "GLW", name: "Corning", v: 0.47 },
  { t: "JBL", name: "Jabil", v: 0.34, nd: true },
];

// 0 back · 1 evidence · 2 answer · 3 move · 4 press · 5 toast · 6 out
const D = [700, 2300, 1700, 1000, 450, 3600, 700];

export function LayeredStack() {
  const { p, ref, cycle } = useTimeline(D, { still: 5 });
  const out = p === 6;
  const following = p >= 4 && p < 6;
  const cursor = p >= 3 && p <= 5 ? { x: 112, y: 394, visible: true } : { x: 330, y: 500, visible: false };

  return (
    <div ref={ref}>
      <Canvas w={560} h={480} focusX={0.25}>
        <motion.div key={cycle} className="absolute inset-0" animate={{ opacity: out ? 0 : 1 }} transition={{ duration: 0.6 }}>
          {/* question (back) */}
          <motion.div
            className="rx-card absolute left-[96px] top-[20px] w-[368px] px-4 py-3"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0, scale: p >= 1 ? 0.94 : 1 }}
            transition={{ duration: 0.8, ease: RX_EASE }}
            style={{ transformOrigin: "50% 0%" }}
          >
            <p className="flex items-center gap-2 text-[13px] text-[var(--rx-2)]">
              <span className="grid h-[20px] w-[20px] shrink-0 place-items-center rounded-full bg-[var(--rx-well)] text-[9px] font-semibold">AW</span>
              <span className="truncate">Map AAPL’s ecosystem and find the hidden beneficiaries.</span>
            </p>
          </motion.div>

          {/* evidence (middle) */}
          <AnimatePresence>
            {p >= 1 && (
              <motion.div
                className="rx-card absolute left-[56px] top-[72px] w-[448px] p-[18px]"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0, scale: p >= 2 ? 0.96 : 1 }}
                transition={{ duration: 0.8, ease: RX_EASE }}
                style={{ transformOrigin: "50% 0%" }}
              >
                <div className="flex items-baseline justify-between">
                  <p className="rx-serif text-[16px]">Revenue linked to Apple</p>
                  <span className="flex items-center gap-3 text-[10.5px] text-[var(--rx-3)]">
                    <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-[2px] bg-[#2f7457]/70" />Disclosed</span>
                    <span className="flex items-center gap-1.5"><span className="rx-hatch h-2 w-2 rounded-[2px] ring-1 ring-[#2f7457]/40" />Not disclosed</span>
                  </span>
                </div>
                <div className="mt-4 space-y-2.5">
                  {BARS.map((b, i) => (
                    <div key={b.t} className="flex items-center gap-3">
                      <span className="w-[86px] truncate text-[12px] text-[var(--rx-2)]">{b.name}</span>
                      <span className="relative h-[14px] flex-1 overflow-hidden rounded-[4px] bg-[var(--rx-well)]">
                        <motion.span
                          className={b.nd ? "rx-hatch absolute inset-y-0 left-0 rounded-[4px] ring-1 ring-inset ring-[#2f7457]/35" : "absolute inset-y-0 left-0 rounded-[4px]"}
                          style={b.nd ? undefined : { background: "linear-gradient(90deg, rgb(47 116 87 / .45), rgb(47 116 87 / .8))" }}
                          initial={{ width: 0 }}
                          animate={{ width: b.nd ? "100%" : `${b.v * 100}%`, opacity: b.nd ? 0.7 : 1 }}
                          transition={{ delay: 0.5 + i * 0.18, duration: 1.1, ease: RX_EASE }}
                        />
                      </span>
                      <span className="rx-num w-[34px] text-right text-[11px] text-[var(--rx-2)]">{b.nd ? "n/d" : `${Math.round(b.v * 100)}%`}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* answer (front) */}
          <AnimatePresence>
            {p >= 2 && (
              <motion.div
                className="rx-card rx-card-lift absolute left-[40px] top-[256px] w-[480px] p-[18px]"
                initial={{ opacity: 0, y: 48 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.85, ease: RX_EASE }}
              >
                <p className="flex items-center gap-1.5 text-[12px] font-semibold"><Spark className="text-[var(--rx-signal)]" />Alfred</p>
                <p className="rx-serif mt-2 text-[18px] leading-[25px]">Four less obvious names exposed to Apple</p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {BARS.map((b, i) => (
                    <motion.span key={b.t} className="flex items-center gap-1.5 rounded-[7px] border border-[var(--rx-line)] px-2 py-1 text-[11.5px]" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 + i * 0.12, duration: 0.5, ease: RX_EASE }}>
                      <Glyph kind="company" size={9} active={following} className="text-[var(--rx-3)]" />
                      {b.name}
                    </motion.span>
                  ))}
                </div>
                <div className="mt-4 flex items-center gap-2">
                  <motion.span
                    className="flex h-8 items-center gap-1.5 rounded-[9px] px-3 text-[12px] font-medium"
                    animate={{ backgroundColor: following ? "#f4f3f0" : "#17191c", color: following ? "#17191c" : "#ffffff", scale: p === 4 ? 0.95 : 1 }}
                    transition={{ duration: 0.25 }}
                  >
                    <Icon name={following ? "check" : "plus"} size={13} />
                    {following ? "Following" : "Follow all four"}
                  </motion.span>
                  <span className="flex h-8 items-center rounded-[9px] px-3 text-[12px] font-medium text-[var(--rx-2)] ring-1 ring-inset ring-[var(--rx-line)]">Ask a follow-up</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* toast */}
          <AnimatePresence>
            {p === 5 && (
              <motion.div
                className="rx-card rx-card-lift absolute left-[284px] top-[8px] z-30 flex w-[264px] items-start gap-3 p-3.5"
                initial={{ opacity: 0, y: 16, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8 }}
                transition={{ duration: 0.55, ease: RX_EASE, delay: 0.35 }}
              >
                <span className="grid h-7 w-7 shrink-0 place-items-center rounded-[8px] bg-[var(--rx-signal-soft)] text-[#8a5a12]"><Icon name="bell" size={14} /></span>
                <span>
                  <span className="block text-[12.5px] font-medium leading-4">Alerts on for 4 names</span>
                  <span className="mt-0.5 block text-[11.5px] leading-4 text-[var(--rx-3)]">You’ll hear when a link in the path changes.</span>
                </span>
              </motion.div>
            )}
          </AnimatePresence>

          <Cursor {...cursor} press={p === 4} />
        </motion.div>
      </Canvas>
    </div>
  );
}
