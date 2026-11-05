"use client";

import { AnimatePresence, motion, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { Cite, Stage } from "@/components/product/ui";
import type { IconName } from "@/components/ui/PrecisionIcon";

const EASE = [0.16, 1, 0.3, 1] as const;

const FIRMS: {
  name: string;
  icon: IconName;
  ask: string;
  lines: [string, number?][];
  out: string;
}[] = [
  {
    name: "Hedge Funds",
    icon: "crosshair",
    ask: "What changed for my book overnight, and what’s second-order?",
    lines: [["Supplier guidance cut touches 3 positions", 1], ["Two names exposed through a shared customer", 2], ["One thesis input weakened; review sizing"]],
    out: "Ranked, cited list of affected positions",
  },
  {
    name: "Financial Institutions",
    icon: "knot",
    ask: "Serve relationship context inside our client research portal.",
    lines: [["Graph response · 38 related entities", 1], ["Sources attached to each relationship", 2], ["Delivered under your brand and entitlements"]],
    out: "API response rendered natively",
  },
  {
    name: "Asset Managers",
    icon: "stack",
    ask: "Refresh the IC pack for the clean-energy sleeve.",
    lines: [["Exposure by theme and region updated", 1], ["Attribution narrative redrafted for committee", 2], ["Changes since last pack highlighted"]],
    out: "Committee-ready, refreshable narrative",
  },
  {
    name: "Wealth Managers",
    icon: "petals",
    ask: "Explain today’s rate move for the Patel household.",
    lines: [["Two holdings most sensitive to rates", 1], ["Plain-language talking points for the call", 2], ["Every figure linked to its source"]],
    out: "Client-ready note tied to holdings",
  },
];

/** Hero visual: one platform, routed to four kinds of firm. Hedge Funds lead the cycle. */
export function FirmRouter() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.3 });
  const reduce = useReducedMotion();
  const [i, setI] = useState(0);

  useEffect(() => {
    if (!inView || reduce) return;
    const t = setTimeout(() => setI((x) => (x + 1) % FIRMS.length), i === 0 ? 5200 : 4200);
    return () => clearTimeout(t);
  }, [i, inView, reduce]);

  const f = FIRMS[i];

  return (
    <Stage field="lake" className="p-4 sm:p-7 md:p-8">
      <div ref={ref}>
        <div className="mb-4 flex items-center justify-between text-[13px] text-white/80">
          <span>One platform</span>
          <span className="hidden sm:inline">Four ways of working</span>
        </div>

        <div className="ui-card p-4 sm:p-5">
          <div className="flex gap-4 overflow-x-auto border-b border-black/10 no-scrollbar" role="tablist" aria-label="Firm types">
            {FIRMS.map((x, k) => (
              <button
                key={x.name}
                type="button"
                role="tab"
                aria-selected={k === i}
                onClick={() => setI(k)}
                className={clsx(
                  "-mb-px shrink-0 border-b pb-2 text-[13px] transition-colors duration-500",
                  k === i ? "border-[#0d0d0d] font-medium text-[#0d0d0d]" : "border-transparent text-[#8f8f8f] hover:text-[#5d5d5d]",
                )}
              >
                {x.name}
              </button>
            ))}
          </div>

          <div className="relative mt-4 grid">
            <AnimatePresence initial={false}>
              <motion.div
                key={i}
                initial={reduce ? false : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.6, ease: EASE }}
                className="bg-white [grid-area:1/1]"
              >
                <p className="text-[16px] font-medium leading-snug text-[#0d0d0d] sm:text-[18px]">{f.ask}</p>
                <ul className="mt-3 divide-y divide-black/10 border-t border-black/10">
                  {f.lines.map(([t, c], k) => (
                    <motion.li
                      key={t}
                      initial={reduce ? false : { opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5, ease: EASE, delay: 0.35 + k * 0.22 }}
                      className="py-2 text-[13px] text-[#5d5d5d]"
                    >
                      {t}
                      {c && <Cite n={c} />}
                    </motion.li>
                  ))}
                </ul>
                <p className="mt-2 text-[12px] text-[#8f8f8f]">Output: {f.out} · Illustrative</p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </Stage>
  );
}
