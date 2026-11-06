"use client";

import { motion } from "motion/react";
import clsx from "clsx";
import { Canvas, CiteChip, Mono, RX_EASE, Spark, useTimeline } from "@/components/visual/kit";

/**
 * Data notices — every figure traces back to a licensed provider.
 * Composition: an answer snippet overlapping a "Sources" table. Each citation
 * lights in turn and its provider row is marked in the table beneath.
 */
const ROWS = [
  { n: "LSEG", m: "LS", c: "Market data", tone: "#3e5368", cite: 1 },
  { n: "S&P Global", m: "SP", c: "Fundamentals", tone: "#7a6a58" },
  { n: "Quartr", m: "Qu", c: "Earnings calls", tone: "#3e5c50", cite: 3 },
  { n: "Dow Jones", m: "DJ", c: "News", tone: "#24324a" },
  { n: "FRED", m: "FR", c: "Economic data", tone: "#5a6f63", cite: 2 },
];

// 0 in · 1 cite 1 · 2 cite 2 · 3 cite 3
const D = [1400, 2400, 2400, 2600];

export function SourceLedger() {
  const { p, ref, cycle } = useTimeline(D, { still: 1 });
  const on = p;

  return (
    <div ref={ref}>
      <Canvas w={560} h={474} focusX={0.4}>
        <motion.div key={cycle} className="absolute inset-0" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}>
          {/* sources table */}
          <div className="rx-card absolute left-[60px] top-[150px] w-[480px] px-5 pb-2 pt-[58px]">
            <div className="grid grid-cols-[1fr_120px_74px] border-b border-[var(--rx-line)] pb-2 text-[10.5px] font-medium text-[var(--rx-3)]">
              <span>Provider</span><span>Content</span><span className="text-right">Licence</span>
            </div>
            {ROWS.map((r) => {
              const act = r.cite === on;
              return (
                <div key={r.n} className="relative grid h-[44px] grid-cols-[1fr_120px_74px] items-center border-b border-[var(--rx-line)] last:border-b-0">
                  <motion.span className="absolute -inset-x-2 inset-y-1 rounded-[8px]" initial={false} animate={{ backgroundColor: act ? "#f4f3f0" : "rgba(244,243,240,0)" }} transition={{ duration: 0.4 }} />
                  <span className="relative flex items-center gap-2.5">
                    <Mono t={r.m} tone={r.tone} size={24} />
                    <span className="text-[12.5px] font-medium">{r.n}</span>
                    {r.cite && <CiteChip n={r.cite} active={act} />}
                  </span>
                  <span className="relative text-[12px] text-[var(--rx-2)]">{r.c}</span>
                  <span className="relative flex items-center justify-end gap-1.5 text-[11px] text-[var(--rx-up)]"><span className="h-1.5 w-1.5 rounded-full bg-[var(--rx-up)]" />Licensed</span>
                </div>
              );
            })}
          </div>

          {/* answer */}
          <motion.div className="rx-card rx-card-lift absolute left-[24px] top-[30px] w-[420px] p-5" initial={{ y: 10 }} animate={{ y: 0 }} transition={{ duration: 0.8, ease: RX_EASE }}>
            <p className="flex items-center gap-1.5 text-[11px] font-semibold"><Spark size={11} className="text-[#3e5368]" />Alfred</p>
            <p className="rx-serif mt-2 text-[14.5px] leading-[23px] text-[var(--rx-2)]">
              <Span on={on === 1}>Brent fell 2.1%</Span> on the OPEC+ headline<CiteChip n={1} active={on === 1} /> as{" "}
              <Span on={on === 2}>10-year yields eased to 4.12%</Span><CiteChip n={2} active={on === 2} />. Management flagged{" "}
              <Span on={on === 3}>softer freight demand</Span><CiteChip n={3} active={on === 3} />.
            </p>
          </motion.div>
        </motion.div>
      </Canvas>
    </div>
  );
}

function Span({ on, children }: { on: boolean; children: React.ReactNode }) {
  return (
    <span className={clsx("relative whitespace-nowrap transition-colors duration-300", on ? "text-[var(--rx-ink)]" : "")}>
      <motion.span className="absolute -inset-x-0.5 inset-y-0 origin-left rounded-[3px] bg-[var(--rx-signal-soft)]" initial={false} animate={{ scaleX: on ? 1 : 0 }} transition={{ duration: 0.5, ease: RX_EASE }} />
      <span className="relative">{children}</span>
    </span>
  );
}
