"use client";

import { AnimatePresence, motion } from "motion/react";
import { useRef } from "react";
import clsx from "clsx";
import { Canvas, Cursor, Icon, RX_EASE, Spark, useTimeline, useTyped } from "@/components/visual/kit";
import { useAnchor } from "@/components/visual/anchor";

/**
 * Platform · Alfred — "investigate a company, analyze a portfolio, pressure-test a thesis".
 * Composition: a composer with a mode dropdown. The question is typed, the
 * cursor switches the mode to Deep research and sends; the plan appears and
 * its steps check off.
 */
const Q = "Pressure-test my AI infrastructure thesis. What breaks it?";
const MODES = [["Quick answer", "Seconds"], ["Deep research", "Cited memo"], ["Portfolio analysis", "Your holdings"]] as const;
const PLAN = ["Pull capex guidance from filings", "Map suppliers in the Knowledge Graph", "Run a capex-slowdown scenario", "Draft the cited memo"];

// 0 type · 1 move · 2 open · 3 hover · 4 pick · 5 move · 6 send · 7 plan · 8 out
const D = [2700, 800, 700, 700, 350, 700, 350, 4200, 700];

export function PlatformAsk() {
  const { p, ref, cycle } = useTimeline(D, { still: 7 });
  const root = useRef<HTMLDivElement>(null);
  const pill = useRef<HTMLSpanElement>(null);
  const opt = useRef<HTMLSpanElement>(null);
  const send = useRef<HTMLSpanElement>(null);
  const aPill = useAnchor(root, pill, [p >= 1, cycle], { ax: 0.4 });
  const aOpt = useAnchor(root, opt, [p >= 2 && p <= 4, cycle], { ax: 0.35 });
  const aSend = useAnchor(root, send, [p >= 5 && p < 7, cycle]);
  const typed = useTyped(Q, p < 8, { speed: 26, delay: 300 });
  const deep = p >= 4 && p < 8;
  const sent = p >= 7 && p < 8;
  const open = p >= 2 && p <= 4;
  const cursor =
    p === 1 || p === 2 ? { x: aPill?.x ?? 200, y: aPill?.y ?? 200, visible: true } :
    p === 3 || p === 4 ? { x: aOpt?.x ?? 200, y: aOpt?.y ?? 240, visible: true } :
    p === 5 || p === 6 ? { x: aSend?.x ?? 480, y: aSend?.y ?? 200, visible: true } :
    p === 7 ? { x: (aSend?.x ?? 480) + 20, y: (aSend?.y ?? 200) + 60, visible: false } :
    { x: 470, y: 420, visible: false };

  return (
    <div ref={ref}>
      <Canvas w={560} h={400} focusX={0.3}>
        <div ref={root} className="absolute inset-0">
          <motion.div key={cycle} className="absolute inset-0" initial={{ opacity: 0 }} animate={{ opacity: p === 8 ? 0 : 1 }} transition={{ duration: 0.6 }}>
            <motion.div className="rx-card rx-card-lift absolute left-[40px] z-10 w-[480px] p-4" initial={{ top: 112 }} animate={{ top: sent ? 24 : 112 }} transition={{ duration: 0.8, ease: RX_EASE }}>
              <p className="flex items-center gap-1.5 text-[11px] font-semibold"><Spark size={11} className="text-[var(--rx-signal)]" />Ask Alfred</p>
              <p className="mt-2 min-h-[44px] text-[14.5px] leading-[22px]">{typed}{p === 0 && <span className="ml-px inline-block h-[15px] w-px translate-y-[2px] bg-[var(--rx-ink)]" />}</p>
              <div className="mt-2 flex items-center gap-2">
                <span className="grid h-8 w-8 place-items-center rounded-[9px] text-[var(--rx-3)] ring-1 ring-inset ring-[var(--rx-line)]"><Icon name="attach" /></span>
                <span ref={pill} className={clsx("flex h-8 items-center gap-1.5 rounded-[9px] px-3 text-[12px] font-medium transition-colors", open ? "bg-[var(--rx-well)]" : "ring-1 ring-inset ring-[var(--rx-line)]")}>
                  {deep ? "Deep research" : "Quick answer"}<Icon name="chev" size={12} className="text-[var(--rx-3)]" />
                </span>
                <span className="flex h-8 items-center gap-1.5 px-1 text-[11.5px] text-[var(--rx-3)]"><Icon name="globe" size={13} />Filings, transcripts, your notes</span>
                <motion.span ref={send} className="ml-auto grid h-8 w-8 place-items-center rounded-[9px] bg-[#17191c] text-white" animate={{ scale: p === 6 ? 0.88 : 1 }} transition={{ duration: 0.15 }}><Icon name="send" /></motion.span>
              </div>

              <AnimatePresence>
                {open && (
                  <motion.div className="rx-card absolute left-[56px] top-[134px] z-20 w-[230px] p-1.5" initial={{ opacity: 0, y: -4, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, transition: { duration: 0.15 } }} transition={{ duration: 0.25, ease: RX_EASE }} style={{ transformOrigin: "20% 0%" }}>
                    {MODES.map(([n, d], i) => (
                      <span key={n} ref={i === 1 ? opt : undefined} className={clsx("flex h-9 items-center gap-2 rounded-[8px] px-2.5 text-[12.5px]", i === 1 && p >= 3 ? "bg-[var(--rx-well)] text-[var(--rx-ink)]" : "text-[var(--rx-2)]")}>
                        {n}<span className="ml-auto text-[11px] text-[var(--rx-3)]">{d}</span>
                        <span className="w-3 text-[var(--rx-ink)]">{(i === 0 && p < 4) || (i === 1 && p >= 4) ? <Icon name="check" size={12} /> : null}</span>
                      </span>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            <AnimatePresence>
              {sent && (
                <motion.div className="rx-card absolute left-[40px] top-[188px] w-[480px] px-5 pb-3 pt-4" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.8, ease: RX_EASE, delay: 0.3 }}>
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="font-medium">Deep research · Plan</span>
                    <span className="text-[var(--rx-3)]">4 steps · 12 sources</span>
                  </div>
                  <div className="mt-2">
                    {PLAN.map((s, i) => (
                      <div key={s} className="flex h-[38px] items-center gap-3 border-t border-[var(--rx-line)] text-[12.5px]">
                        <span className="relative grid h-[18px] w-[18px] place-items-center">
                          <motion.span className="absolute inset-0 rounded-full border-[1.5px] border-[var(--rx-3)] border-t-transparent" initial={{ opacity: 1 }} animate={{ opacity: 0, rotate: 360 }} transition={{ opacity: { delay: 0.9 + i * 0.75, duration: 0.2 }, rotate: { duration: 0.9, repeat: Infinity, ease: "linear" } }} />
                          <motion.span className="absolute inset-0 grid place-items-center rounded-full bg-[#2f7457] text-white" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.95 + i * 0.75, duration: 0.3 }}><Icon name="check" size={11} /></motion.span>
                        </span>
                        <span>{s}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            <Cursor {...cursor} press={p === 2 || p === 4 || p === 6} />
          </motion.div>
        </div>
      </Canvas>
    </div>
  );
}
