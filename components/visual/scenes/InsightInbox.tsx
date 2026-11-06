"use client";

import { AnimatePresence, motion } from "motion/react";
import clsx from "clsx";
import { Canvas, Cursor, Delta, Glyph, Icon, RX_EASE, Spark, Ticker, type EntityKind, useTimeline } from "@/components/visual/kit";

/**
 * Insights · Hero — "Intelligence that arrives before you ask."
 * Composition: master–detail. A feed list on the left; the cursor opens one
 * Insight after another and the reading card on the right swaps, always with
 * the line that says why it reached you.
 */
const ITEMS: { type: string; title: string; when: string; why: string; whyKind: EntityKind; names: [string, number][] }[] = [
  { type: "Market catalyst", title: "AI data center power buildout accelerates", when: "07:12", why: "You follow Vertiv", whyKind: "company", names: [["VRT", 2.14], ["ETN", 1.38]] },
  { type: "Company catalyst", title: "Sanofi settles Regeneron dispute in expanded antibody pact", when: "06:48", why: "Sanofi is on your watchlist", whyKind: "company", names: [["SNY", 0.82], ["REGN", 1.91]] },
  { type: "Earnings recap", title: "Guidance overshadows a mixed Nike quarter", when: "06:05", why: "Inside Consumer discretionary, a theme you follow", whyKind: "theme", names: [["NKE", -0.84], ["ONON", -1.2]] },
  { type: "Scenario pattern", title: "Copper hits the level that preceded miner rallies", when: "Yesterday", why: "Inside Metals & mining", whyKind: "theme", names: [] },
];

const ROW = (k: number) => ({ x: 104, y: 118 + k * 74 });

// show0 · move1 · press1 · show1 · move2 · press2 · show2 · move0 · press0
const D = [3400, 800, 380, 3400, 800, 380, 3400, 800, 380];

export function InsightInbox() {
  const { p, ref } = useTimeline(D, { still: 0 });
  const sel = p <= 1 ? 0 : p <= 4 ? 1 : p <= 7 ? 2 : 0;
  const target = p <= 2 ? 1 : p <= 5 ? 2 : p <= 7 ? 0 : 0;
  const moving = p % 3 !== 0;
  const cursor = moving ? { ...ROW(target), visible: true } : { x: ROW(sel).x + 40, y: ROW(sel).y + 18, visible: true };
  const it = ITEMS[sel];

  return (
    <div ref={ref}>
      <Canvas w={560} h={480} focusX={0.62}>
        {/* feed */}
        <div className="rx-card absolute left-[18px] top-[34px] w-[236px] overflow-hidden">
          <div className="flex h-[46px] items-center justify-between border-b border-[var(--rx-line)] px-4">
            <span className="text-[13px] font-semibold">Insights</span>
            <span className="flex items-center gap-1 text-[11px] text-[var(--rx-3)]">For you<Icon name="chev" size={10} /></span>
          </div>
          {ITEMS.map((x, k) => (
            <div key={x.title} className={clsx("relative h-[74px] border-b border-[var(--rx-line)] px-4 py-3 transition-colors duration-300 last:border-0", k === sel ? "bg-[var(--rx-well)]" : "")}>
              {k === sel && <motion.span layoutId="inbox-mark" className="absolute left-0 top-3 h-6 w-[2px] rounded-full bg-[var(--rx-ink)]" transition={{ duration: 0.4, ease: RX_EASE }} />}
              <p className="flex items-center justify-between text-[10.5px] text-[var(--rx-3)]">
                <span className="flex items-center gap-1.5">{k < 2 && k !== sel && <span className="h-1.5 w-1.5 rounded-full bg-[#3e5368]" />}{x.type}</span>
                <span>{x.when}</span>
              </p>
              <p className="mt-1 line-clamp-2 text-[12px] font-medium leading-[16px]">{x.title}</p>
            </div>
          ))}
        </div>

        {/* reading card */}
        <div className="rx-card rx-card-lift absolute left-[226px] top-[76px] h-[340px] w-[316px] overflow-hidden">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div key={sel} className="flex h-full flex-col p-5" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.45, ease: RX_EASE }}>
              <p className="flex items-center gap-1.5 text-[11px] font-medium text-[#3e5368]"><Spark size={10} />{it.type}</p>
              <p className="rx-serif mt-2 text-[20px] leading-[27px]">{it.title}</p>
              <div className="mt-4 rounded-[10px] bg-[var(--rx-well)] px-3 py-2.5">
                <p className="text-[10.5px] text-[var(--rx-3)]">Why you’re seeing this</p>
                <p className="mt-1 flex items-center gap-2 text-[12.5px]"><Glyph kind={it.whyKind} size={10} active className="text-[var(--rx-2)]" />{it.why}</p>
              </div>
              <div className="mt-auto">
                <p className="text-[10.5px] text-[var(--rx-3)]">Moves today</p>
                <div className="mt-2 flex gap-2">
                  {it.names.map(([t, m]) => (
                    <span key={t} className="flex items-center gap-2 rounded-[8px] px-2.5 py-1.5 ring-1 ring-inset ring-[var(--rx-line)]"><Ticker>{t}</Ticker><Delta v={m} /></span>
                  ))}
                </div>
                <span className="mt-4 flex h-8 w-fit items-center gap-1.5 rounded-[9px] bg-[var(--rx-ink)] px-3 text-[12px] font-medium text-white"><Spark size={11} />Open in Alfred</span>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
        <Cursor {...cursor} press={p % 3 === 2} />
      </Canvas>
    </div>
  );
}
