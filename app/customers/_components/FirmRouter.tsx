"use client";

import { AnimatePresence, motion, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { AlfredGlyph, Cite, Pill, Stage } from "@/components/product/ui";
import { PrecisionIcon, type IconName } from "@/components/ui/PrecisionIcon";

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
        <div className="mb-4 flex items-center justify-between text-white/80">
          <span className="t-ui flex items-center gap-2">
            <AlfredGlyph className="h-3.5 w-3.5" /> One platform
          </span>
          <span className="t-ui">Four ways of working</span>
        </div>

        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4" role="tablist" aria-label="Firm types">
          {FIRMS.map((x, k) => (
            <button
              key={x.name}
              type="button"
              role="tab"
              aria-selected={k === i}
              onClick={() => setI(k)}
              className={clsx(
                "relative flex items-center gap-2 overflow-hidden rounded-[10px] border px-2.5 py-2.5 text-left transition-colors duration-500",
                k === i ? "border-white/80 bg-white text-ink" : "border-white/20 bg-white/[0.06] text-white/80 hover:bg-white/[0.12]",
              )}
            >
              <PrecisionIcon name={x.icon} className="h-5 w-5 shrink-0" />
              <span className="font-display text-[12px] font-semibold leading-tight">{x.name}</span>
              {k === i && !reduce && inView && (
                <motion.span
                  key={`bar${i}`}
                  className="absolute bottom-0 left-0 h-[2px] bg-lake-500"
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: (i === 0 ? 5200 : 4200) / 1000, ease: "linear" }}
                />
              )}
            </button>
          ))}
        </div>

        <div className="relative mt-3 grid">
          <AnimatePresence initial={false}>
            <motion.div
              key={i}
              initial={reduce ? false : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.6, ease: EASE }}
              className="ui-card p-4 [grid-area:1/1] sm:p-5"
            >
              <div className="flex items-center justify-between gap-3">
                <span className="t-ui text-ink/50">{f.name}</span>
                <Pill tone="lake">Illustrative</Pill>
              </div>
              <p className="mt-3 font-display text-[15px] font-medium leading-snug text-ink sm:text-[17px]">{f.ask}</p>
              <ul className="mt-4 space-y-2">
                {f.lines.map(([t, c], k) => (
                  <motion.li
                    key={t}
                    initial={reduce ? false : { opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, ease: EASE, delay: 0.35 + k * 0.22 }}
                    className="flex items-center gap-2.5 rounded-md border border-ink/8 bg-white/70 px-3 py-2 text-[12.5px] text-ink/80 sm:text-[13px]"
                  >
                    <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-lake-500" />
                    <span>
                      {t}
                      {c && <Cite n={c} />}
                    </span>
                  </motion.li>
                ))}
              </ul>
              <p className="mt-4 border-t border-ink/8 pt-3 font-mono text-[10.5px] uppercase tracking-[0.05em] text-ink/50">Output · {f.out}</p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </Stage>
  );
}
