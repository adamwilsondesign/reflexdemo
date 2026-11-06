"use client";

import { motion } from "motion/react";
import clsx from "clsx";
import { Canvas, Delta, Icon, Mono, RX_EASE, Spark, useTimeline } from "@/components/visual/kit";

/**
 * Insights — anatomy of an insight (also reusable on Portfolio Monitoring).
 * Composition: one document card with a section rail. The page moves through
 * headline → takeaways → ripple effects → Ask Alfred; the rail marker follows.
 * Kept deliberately light: one idea per section.
 */
const SECTIONS = ["Headline", "Takeaways", "Ripple effects", "Ask Alfred"];
const SEC_H = 214;
const D = [3200, 3200, 3400, 3200];

export function InsightDoc() {
  const { p, ref } = useTimeline(D, { still: 2 });

  return (
    <div ref={ref}>
      <Canvas w={560} h={480}>
        <div className="rx-card rx-card-lift absolute left-[30px] top-[60px] flex h-[360px] w-[500px] overflow-hidden">
          <div className="relative flex-1 overflow-hidden">
            <motion.div className="absolute inset-x-0 top-0 px-7" animate={{ y: 72 - p * SEC_H }} transition={{ duration: 1.1, ease: RX_EASE }}>
              <Sec on={p === 0}>
                <p className="flex items-center gap-1.5 text-[11px] font-medium text-[#3e5368]"><Spark size={10} />Market catalyst</p>
                <p className="rx-serif mt-2 text-[22px] leading-[29px]">Flash PMI rekindles factory cost pressure</p>
                <p className="mt-2 text-[12.5px] leading-[19px] text-[var(--rx-2)]">Input costs hit a four-year high.</p>
              </Sec>
              <Sec on={p === 1}>
                <p className="text-[12px] font-semibold">Takeaways</p>
                {["Factory activity still expanding", "Margins squeezed first in cyclicals", "Automation spend holds up"].map((t, i) => (
                  <p key={t} className="mt-2.5 flex gap-3 text-[13px] text-[var(--rx-2)]"><span className="rx-num w-3 text-[var(--rx-3)]">{i + 1}</span>{t}</p>
                ))}
              </Sec>
              <Sec on={p === 2}>
                <p className="text-[12px] font-semibold">Ripple effects</p>
                {[["EMR", "Emerson Electric", 2.24, "#3e5368"], ["ETN", "Eaton", 1.76, "#24324a"], ["ROK", "Rockwell Automation", 1.64, "#a6503a"]].map(([t, n, m, c]) => (
                  <div key={t as string} className="mt-2.5 flex items-center gap-3">
                    <Mono t={(t as string).slice(0, 2)} tone={c as string} size={24} />
                    <span className="flex-1 text-[13px]">{n}</span>
                    <Delta v={m as number} />
                  </div>
                ))}
              </Sec>
              <Sec on={p === 3}>
                <p className="text-[12px] font-semibold">Ask Alfred</p>
                <div className="mt-3 flex items-center gap-3 rounded-[12px] border border-[var(--rx-line)] py-2.5 pl-3.5 pr-2.5">
                  <p className="flex-1 text-[13px]">Which name has the most backlog at risk?</p>
                  <span className="grid h-7 w-7 place-items-center rounded-[8px] bg-[var(--rx-ink)] text-white"><Icon name="send" /></span>
                </div>
              </Sec>
            </motion.div>
          </div>
          <div className="relative w-[128px] shrink-0 border-l border-[var(--rx-line)] py-7 pl-4">
            <motion.span className="absolute left-[-1px] w-[2px] rounded-full bg-[var(--rx-ink)]" animate={{ top: 32 + p * 30, height: 20 }} transition={{ duration: 0.6, ease: RX_EASE }} />
            {SECTIONS.map((s, i) => (
              <p key={s} className={clsx("flex h-[30px] items-center text-[12px] transition-colors duration-500", i === p ? "font-medium text-[var(--rx-ink)]" : "text-[var(--rx-3)]")}>{s}</p>
            ))}
          </div>
        </div>
      </Canvas>
    </div>
  );
}

function Sec({ on, children }: { on: boolean; children: React.ReactNode }) {
  return (
    <motion.div className="h-[214px]" animate={{ opacity: on ? 1 : 0 }} transition={{ duration: 0.5 }}>
      {children}
    </motion.div>
  );
}
