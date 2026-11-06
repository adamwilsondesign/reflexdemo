"use client";

import { AnimatePresence, motion } from "motion/react";
import clsx from "clsx";
import { Canvas, Cursor, Glyph, RX_EASE, Spark, type EntityKind, useTimeline } from "@/components/visual/kit";

/**
 * Insights · Every Insight says why it reached you.
 * Composition: an Insight card with a "Why am I seeing this?" link; the cursor
 * opens it and a popover draws the relevance path, hop by hop, as a vertical
 * timeline that ends at the Insight.
 */
type Step = { k: string; v: string; kind: EntityKind };
export const WHY_ROUTES: { type: string; title: string; steps: Step[] }[] = [
  {
    type: "Company catalyst",
    title: "Sanofi settles Regeneron dispute in expanded antibody pact",
    steps: [
      { k: "You follow", v: "Sanofi", kind: "company" },
      { k: "Event", v: "Regeneron dispute settled", kind: "driver" },
    ],
  },
  {
    type: "Market catalyst",
    title: "AI data center power buildout accelerates",
    steps: [
      { k: "You follow", v: "Vertiv", kind: "company" },
      { k: "Knowledge Graph link", v: "Supplies power & cooling", kind: "product" },
      { k: "Event", v: "Data center power demand", kind: "driver" },
    ],
  },
  {
    type: "Earnings recap",
    title: "Guidance overshadows a mixed Nike quarter",
    steps: [
      { k: "Theme you follow", v: "Consumer discretionary", kind: "theme" },
      { k: "Constituent", v: "Nike", kind: "company" },
      { k: "Event", v: "Quarterly results", kind: "driver" },
    ],
  },
];

const LINK = { x: 118, y: 176 };
// 0 card · 1 move · 2 press · 3 hold
const D = [900, 900, 400, 6000];

export function WhyPopover({ route = 0 }: { route?: number }) {
  const { p, ref } = useTimeline(D, { still: 3, loop: false });
  const r = WHY_ROUTES[route] ?? WHY_ROUTES[0];
  const open = p >= 2;
  const cursor = p === 0 ? { x: 300, y: 470, visible: false } : { ...LINK, visible: p < 3 };

  return (
    <div ref={ref}>
      <Canvas w={560} h={440} focusX={0.12}>
        <motion.div className="rx-card absolute left-[30px] top-[40px] w-[420px] p-5" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: RX_EASE }}>
          <p className="flex items-center justify-between text-[11px] text-[var(--rx-3)]">
            <span className="flex items-center gap-1.5 font-medium text-[#3e5368]"><Spark size={10} />{r.type}</span>
            <span>In your feed · 07:12</span>
          </p>
          <p className="rx-serif mt-2 h-[54px] text-[20px] leading-[27px]">{r.title}</p>
          <p className="mt-4 border-t border-[var(--rx-line)] pt-3 text-[12px]">
            <span className={clsx("rounded-[6px] px-1.5 py-1 font-medium underline decoration-[var(--rx-line)] underline-offset-4 transition-colors duration-300", open ? "bg-[var(--rx-well)]" : "")}>Why am I seeing this?</span>
          </p>
        </motion.div>

        <AnimatePresence>
          {open && (
            <motion.div className="rx-card rx-card-lift absolute left-[150px] top-[196px] z-10 w-[340px] p-5" initial={{ opacity: 0, y: -8, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4, ease: RX_EASE }} style={{ transformOrigin: "10% 0%" }}>
              <p className="text-[12.5px] font-semibold">Why this reached you</p>
              <div className="relative mt-4">
                <motion.span className="absolute left-[11px] top-3 w-px origin-top bg-[var(--rx-ink)]/25" style={{ height: r.steps.length * 46 }} initial={{ scaleY: 0 }} animate={{ scaleY: 1 }} transition={{ delay: 0.3, duration: 0.3 + r.steps.length * 0.3, ease: "linear" }} />
                {r.steps.map((s, i) => (
                  <motion.div key={s.v} className="relative flex h-[46px] items-start gap-3" initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 + i * 0.3, duration: 0.45, ease: RX_EASE }}>
                    <span className="relative z-10 grid h-[23px] w-[23px] shrink-0 place-items-center rounded-full bg-white text-[var(--rx-2)] ring-1 ring-[var(--rx-line)]"><Glyph kind={s.kind} size={10} /></span>
                    <span>
                      <span className="block text-[10.5px] leading-[14px] text-[var(--rx-3)]">{s.k}</span>
                      <span className="block text-[12.5px] font-medium leading-[17px]">{s.v}</span>
                    </span>
                  </motion.div>
                ))}
                <motion.div className="relative flex items-center gap-3" initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 + r.steps.length * 0.3, duration: 0.45, ease: RX_EASE }}>
                  <span className="relative z-10 grid h-[23px] w-[23px] shrink-0 place-items-center rounded-full bg-[var(--rx-ink)] text-white"><Spark size={11} /></span>
                  <span className="flex items-center gap-1.5 text-[12.5px] font-medium">This Insight<span className="h-[14px] w-[2px] rounded-full bg-[var(--rx-signal)]" /></span>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <Cursor {...cursor} press={p === 2} />
      </Canvas>
    </div>
  );
}
