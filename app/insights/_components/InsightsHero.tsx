"use client";

import { AnimatePresence, motion } from "motion/react";
import { Stage } from "@/components/product/ui";
import { MOTION_EASE, MockPanel, StepDots, useCycle } from "@/components/product/motion";

const ITEMS = [
  { type: "Market catalyst", title: "AI data center power buildout accelerates", why: "You follow Vertiv" },
  { type: "Company catalyst", title: "Sanofi settles Regeneron dispute in expanded antibody pact", why: "Sanofi is on your watchlist" },
  { type: "Earnings recap", title: "Guidance overshadowed a mixed Nike quarter", why: "Nike is on your watchlist" },
] as const;

/** Hero: one Insight arrives at a time, with the reason it reached you. */
export function InsightsHero() {
  const [i, ref, setI] = useCycle(ITEMS.length, { ms: 5200, finalForReduced: 0 });
  const prev = ITEMS[(i - 1 + ITEMS.length) % ITEMS.length];
  const it = ITEMS[i];

  return (
    <Stage field="none" className="flex w-full items-center justify-center">
      <div ref={ref} className="w-full max-w-[420px]">
        <MockPanel height={296}>
          <div className="flex items-center justify-between text-[13px]">
            <span className="font-semibold">Insights</span>
            <span className="text-[#8f8f8f]">For you</span>
          </div>
          <div className="relative mt-3 h-[152px] border-t border-black/10">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div key={i} initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.6, ease: MOTION_EASE }} className="pt-3">
                <p className="flex justify-between text-[12px] text-[#8f8f8f]"><span>{it.type}</span><span>now</span></p>
                <p className="mt-1 text-[16px] font-semibold leading-6 text-[#0d0d0d]">{it.title}</p>
                <p className="mt-3 rounded-[10px] bg-[#f9f9f9] px-3 py-2 text-[13px] text-[#5d5d5d]">
                  <span className="font-medium text-[#0d0d0d]">Why:</span> {it.why}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>
          <div className="border-t border-black/10 pt-3 opacity-45">
            <p className="flex justify-between text-[12px] text-[#8f8f8f]"><span>{prev.type}</span><span>12m</span></p>
            <p className="mt-1 truncate text-[14px] font-medium text-[#0d0d0d]">{prev.title}</p>
          </div>
        </MockPanel>
        <StepDots count={ITEMS.length} active={i} onSelect={setI} />
      </div>
    </Stage>
  );
}
