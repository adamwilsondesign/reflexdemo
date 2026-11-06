"use client";

import { AnimatePresence, motion } from "motion/react";
import clsx from "clsx";
import { Canvas, Cursor, Icon, Mono, RX_EASE, Spark, useTimeline, useTyped } from "@/components/visual/kit";

/**
 * Alfred · Hero — "Run the research. Stay ahead of the market."
 * Composition: a composer with a mode dropdown. A question is typed, the cursor
 * opens the mode menu and switches from "Ask once" to "Keep watching", then sends.
 * A watch card lands underneath: the same question, now running on its own.
 */
const Q = "Which AI hardware suppliers are most exposed if hyperscaler capex slows?";
const MODES = [
  { k: "Ask once", sub: "One cited answer, now" },
  { k: "Keep watching", sub: "Re-runs and alerts you" },
  { k: "Deep research", sub: "A multi-step memo" },
];
const NAMES = [
  { t: "VRT", n: "Vertiv", c: "#3e5368" },
  { t: "ANET", n: "Arista Networks", c: "#243244" },
  { t: "CLS", n: "Celestica", c: "#3e5c50" },
];

// 0 type · 1 move · 2 open · 3 hover · 4 pick · 5 to send · 6 press · 7 watching · 8 out
const D = [2900, 900, 900, 700, 450, 900, 400, 4600, 700];

// canvas geometry (cursor targets)
const LIFT = 92; // composer sits this much lower until the question is sent
const CHIP = { x: 401, y: 177 + LIFT };
const OPT = (i: number) => ({ x: 330, y: 235 + LIFT + i * 46 });
const SEND = { x: 496, y: 177 + LIFT };

export function ComposerModes() {
  const { p, ref, cycle } = useTimeline(D, { still: 7 });
  const typed = useTyped(Q, p === 0, { speed: 26, delay: 300 });
  const text = p === 0 ? typed : Q;
  const open = p >= 2 && p <= 4;
  const watching = p >= 4;
  const sent = p >= 7;
  const cursor =
    p === 0 ? { x: 470, y: 470, visible: false } :
    p <= 2 ? { ...CHIP, visible: true } :
    p <= 4 ? { ...OPT(1), visible: true } :
    { ...SEND, visible: p <= 6 };

  return (
    <div ref={ref}>
      <Canvas w={560} h={480} focusX={0.4}>
        <motion.div key={cycle} className="absolute inset-0" initial={{ opacity: 0 }} animate={{ opacity: p === 8 ? 0 : 1 }} transition={{ duration: 0.6 }}>
          {/* composer */}
          <motion.div className="rx-card rx-card-lift absolute left-[30px] top-[60px] w-[500px] px-[18px] pb-[14px] pt-4" initial={{ y: LIFT + 16 }} animate={{ y: sent ? 0 : LIFT }} transition={{ duration: 0.8, ease: RX_EASE }}>
            <p className="flex items-center gap-1.5 text-[11.5px] font-medium text-[var(--rx-3)]"><Spark size={11} className="text-[var(--rx-ink)]" />Ask Alfred</p>
            <p className="mt-2 h-[48px] text-[15px] leading-6">
              {text}
              {p === 0 && <span className="ml-0.5 inline-block h-[15px] w-px translate-y-[2px] animate-pulse bg-[var(--rx-ink)]" />}
            </p>
            <div className="mt-3 flex h-8 items-center gap-1.5">
              <span className="grid h-8 w-8 place-items-center rounded-[9px] text-[var(--rx-2)] ring-1 ring-inset ring-[var(--rx-line)]"><Icon name="attach" size={14} /></span>
              <span className="flex h-8 items-center gap-1.5 rounded-[9px] px-2.5 text-[12px] text-[var(--rx-2)] ring-1 ring-inset ring-[var(--rx-line)]"><Icon name="globe" size={13} />Filings, transcripts +3</span>
              <motion.span
                className="ml-auto flex h-8 w-[146px] items-center gap-1.5 rounded-[9px] px-2.5 text-[12px] font-medium"
                animate={{ backgroundColor: open ? "#f4f3f0" : "rgba(255,255,255,1)", scale: p === 2 ? 0.96 : 1 }}
                transition={{ duration: 0.2 }}
                style={{ boxShadow: "inset 0 0 0 1px rgb(23 25 28 / .08)" }}
              >
                {watching ? <Icon name="bell" size={13} /> : <Spark size={11} />}
                <span className="truncate">{watching ? "Keep watching" : "Ask once"}</span>
                <span className="ml-auto text-[var(--rx-3)]"><Icon name="chev" size={11} /></span>
              </motion.span>
              <motion.span className="grid h-8 w-8 place-items-center rounded-[9px] bg-[var(--rx-ink)] text-white" animate={{ scale: p === 6 ? 0.9 : 1 }} transition={{ duration: 0.15 }}>
                <Icon name="send" size={14} />
              </motion.span>
            </div>
          </motion.div>

          {/* mode menu */}
          <AnimatePresence>
            {open && (
              <motion.div className="rx-card absolute left-[242px] top-[298px] z-20 w-[230px] p-1.5" initial={{ opacity: 0, y: -6, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, transition: { duration: 0.18 } }} transition={{ duration: 0.28, ease: RX_EASE }} style={{ transformOrigin: "75% 0%" }}>
                {MODES.map((m, i) => {
                  const hot = i === 1 && p >= 3;
                  const checked = (i === 0 && p < 4) || (i === 1 && p >= 4);
                  return (
                    <span key={m.k} className={clsx("flex h-[46px] items-center gap-2.5 rounded-[8px] px-2.5 transition-colors duration-200", hot ? "bg-[var(--rx-well)]" : "")}>
                      <span className="min-w-0 flex-1">
                        <span className="block text-[12.5px] font-medium leading-4">{m.k}</span>
                        <span className="block text-[11px] leading-4 text-[var(--rx-3)]">{m.sub}</span>
                      </span>
                      {checked && <span className="text-[var(--rx-ink)]"><Icon name="check" size={13} /></span>}
                    </span>
                  );
                })}
              </motion.div>
            )}
          </AnimatePresence>

          {/* watch card */}
          <AnimatePresence>
            {sent && (
              <motion.div className="rx-card absolute left-[54px] top-[248px] w-[452px] p-[18px]" initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.8, ease: RX_EASE }}>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2 text-[12px] font-semibold">
                    <span className="grid h-6 w-6 place-items-center rounded-[7px] bg-[var(--rx-well)]"><Icon name="bell" size={13} /></span>
                    Watching
                  </span>
                  <span className="rounded-[6px] bg-[var(--rx-well)] px-2 py-1 text-[11px] text-[var(--rx-2)]">Weekdays · 07:00</span>
                </div>
                <p className="rx-serif mt-3 text-[17px] leading-[24px]">14 suppliers, ranked by capex exposure</p>
                <div className="mt-3 border-t border-[var(--rx-line)]">
                  {NAMES.map((r, i) => (
                    <motion.div key={r.t} className="flex h-[38px] items-center gap-3 border-b border-[var(--rx-line)] last:border-0" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 + i * 0.15, duration: 0.5, ease: RX_EASE }}>
                      <Mono t={r.t.slice(0, 2)} tone={r.c} size={22} />
                      <span className="flex-1 text-[12.5px]">{r.n}</span>
                      <span className="rx-num text-[11px] text-[var(--rx-3)]">{r.t}</span>
                      <motion.span className="flex w-[92px] items-center justify-end gap-1 text-[11px] text-[var(--rx-up)]" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 + i * 0.25 }}>
                        <Icon name="check" size={12} />Baseline set
                      </motion.span>
                    </motion.div>
                  ))}
                </div>
                <motion.span className="absolute -left-px top-5 h-6 w-[3px] rounded-r-full bg-[var(--rx-signal)]" initial={{ scaleY: 0 }} animate={{ scaleY: 1 }} transition={{ delay: 0.6, duration: 0.4 }} />
              </motion.div>
            )}
          </AnimatePresence>

          <Cursor {...cursor} press={p === 2 || p === 4 || p === 6} />
        </motion.div>
      </Canvas>
    </div>
  );
}
