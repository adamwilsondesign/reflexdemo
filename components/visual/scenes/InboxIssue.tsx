"use client";

import { AnimatePresence, motion } from "motion/react";
import clsx from "clsx";
import { Canvas, Cursor, Glyph, RX_EASE, Spark, Ticker, useTimeline } from "@/components/visual/kit";

/**
 * Newsletter — a sample issue arriving.
 * Composition: an inbox list cropped at the left edge and a reading pane.
 * A new issue lands at the top of the inbox, the cursor opens it, and the
 * issue's sections settle in: signal, relationship, product note.
 */
const INBOX = [
  { from: "Risk desk", sub: "Weekly VaR pack", t: "8:12" },
  { from: "Calendar", sub: "IC meeting moved to 3 PM", t: "7:58" },
  { from: "Ops", sub: "Q3 attribution draft", t: "Wed" },
  { from: "Research", sub: "Notes from the semis call", t: "Wed" },
];

// 0 inbox · 1 arrive · 2 move · 3 press · 4 read · 5 out
const D = [1300, 1500, 900, 400, 5200, 600];

export function InboxIssue() {
  const { p, ref, cycle } = useTimeline(D, { still: 4 });
  const arrived = p >= 1;
  const reading = p >= 4;
  const cursor = p <= 1 ? { x: 230, y: 470, visible: false } : { x: 150, y: 104, visible: p < 4 };

  return (
    <div ref={ref}>
      <Canvas w={560} h={460} focusX={0.6}>
        <motion.div key={cycle} className="absolute inset-0" initial={{ opacity: 0 }} animate={{ opacity: p === 5 ? 0 : 1 }} transition={{ duration: 0.5 }}>
          {/* inbox, cropped at the left edge */}
          <div className="rx-card absolute left-[-24px] top-[36px] w-[260px] overflow-hidden pb-2 pt-3">
            <p className="flex items-center justify-between px-4 pl-[38px] text-[11.5px] font-semibold">Inbox<span className="rx-num font-normal text-[var(--rx-3)]">Thu</span></p>
            <div className="mt-2">
              <AnimatePresence initial={false}>
                {arrived && (
                  <motion.div key="issue" layout className={clsx("relative border-t border-[var(--rx-line)] px-4 py-2.5 pl-[38px] transition-colors", p >= 3 ? "bg-[var(--rx-well)]" : "")} initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 62 }} transition={{ duration: 0.6, ease: RX_EASE }}>
                    <span className="absolute left-[26px] top-[18px] h-1.5 w-1.5 rounded-full bg-[#3e5368]" />
                    <span className="flex items-center justify-between text-[12px] font-semibold leading-4">Reflexivity<span className="rx-num text-[10.5px] font-normal text-[var(--rx-3)]">7:00</span></span>
                    <span className="mt-0.5 block truncate text-[11.5px] leading-4">What moved, what connects</span>
                    <span className="block truncate text-[11px] leading-4 text-[var(--rx-3)]">Issue 42 · 4 min read</span>
                  </motion.div>
                )}
                {INBOX.map((m) => (
                  <motion.div key={m.sub} layout transition={{ duration: 0.6, ease: RX_EASE }} className="h-[62px] border-t border-[var(--rx-line)] px-4 py-2.5 pl-[38px]">
                    <span className="flex items-center justify-between text-[12px] font-medium leading-4 text-[var(--rx-2)]">{m.from}<span className="rx-num text-[10.5px] font-normal text-[var(--rx-3)]">{m.t}</span></span>
                    <span className="mt-0.5 block truncate text-[11.5px] leading-4 text-[var(--rx-3)]">{m.sub}</span>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>

          {/* reading pane */}
          <AnimatePresence>
            {reading && (
              <motion.div className="rx-card rx-card-lift absolute left-[196px] top-[60px] w-[336px] p-5" initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.7, ease: RX_EASE }}>
                <div className="flex items-center justify-between text-[11px]">
                  <span className="flex items-center gap-1.5 font-semibold"><Spark size={11} className="text-[#3e5368]" />Reflexivity</span>
                  <span className="rx-num rounded-[6px] bg-[var(--rx-well)] px-1.5 py-[2px] text-[10.5px] text-[var(--rx-2)]">Thu 7:00 AM</span>
                </div>
                <p className="rx-serif mt-3 text-[20px] leading-[26px]">What moved, what connects, what&rsquo;s new</p>
                {[
                  { k: "Market signal", t: "Data-center power buildout accelerates", extra: <span className="mt-1.5 flex gap-1"><Ticker>VRT</Ticker><Ticker>ETN</Ticker><Ticker>CEG</Ticker></span> },
                  { k: "Relationship", t: "Hyperscaler capex to advanced packaging", extra: <span className="mt-1.5 flex items-center gap-1.5 text-[var(--rx-2)]"><Glyph kind="theme" size={11} /><Line /><Glyph kind="product" size={11} /><Line /><Glyph kind="company" size={11} active /></span> },
                  { k: "Product note", t: "Introducing Earnings Insights" },
                ].map((s, i) => (
                  <motion.div key={s.k} className="mt-3 border-t border-[var(--rx-line)] pt-3" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 + i * 0.35, duration: 0.6, ease: RX_EASE }}>
                    <span className="block text-[10.5px] font-medium uppercase tracking-[0.06em] text-[var(--rx-3)]">{s.k}</span>
                    <span className="mt-0.5 block text-[13px] font-medium leading-[18px]">{s.t}</span>
                    {s.extra}
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
          <Cursor {...cursor} press={p === 3} />
        </motion.div>
      </Canvas>
    </div>
  );
}

function Line() {
  return <span className="h-px w-5 bg-current opacity-40" />;
}
