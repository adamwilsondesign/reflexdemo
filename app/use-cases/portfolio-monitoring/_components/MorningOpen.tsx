"use client";

import { AnimatePresence, motion } from "motion/react";
import clsx from "clsx";
import { CardHeader, Stage } from "@/components/product/ui";
import { useLoop } from "../../_components/useLoop";

const EASE = [0.16, 1, 0.3, 1] as const;

const ROWS = [
  { t: "CRWV", n: "CoreWeave", tag: "AI infrastructure" },
  { t: "NKE", n: "Nike", tag: "Consumer" },
  { t: "VRT", n: "Vertiv", tag: "Data center power" },
  { t: "LLY", n: "Eli Lilly", tag: "GLP-1" },
];

const FEED: { row: number; meta: string; title: string; why: string }[] = [
  { row: 0, meta: "Company catalyst · Bullish", title: "CoreWeave rolls out Nvidia Vera Rubin with Cognition live", why: "CoreWeave is on your watchlist. NVIDIA is connected as platform supplier." },
  { row: 1, meta: "Earnings recap · Bearish", title: "Guidance overshadowed a mixed Nike quarter", why: "Nike reported overnight. Two suppliers in the Graph share the read-through." },
  { row: 2, meta: "Market catalyst · Bullish", title: "AI data center power buildout accelerates", why: "Second-order: Vertiv sits in the data center power theme you follow." },
  { row: 3, meta: "Scenario pattern", title: "Eli Lilly: recession probability at a new low", why: "A historical pattern on a watchlist name, with the episodes behind it." },
];

/** Hero: the morning open. Insights land on the names you follow, each with the reason it reached you. */
export function MorningOpen() {
  const { ref, step, reduce } = useLoop(FEED.length, 3400, 0);
  const it = FEED[step];
  return (
    <Stage field="lake" className="p-4 sm:p-7" image="/figma/n915.png">
      <div ref={ref} className="relative mx-auto max-w-[560px] pb-[176px] sm:pb-[130px]">
        {/* watchlist */}
        <div className="ui-card p-4 sm:w-[78%]">
          <CardHeader title="Your watchlist" trail={["Mon 07:00"]} />
          <ul className="mt-3 divide-y divide-black/10 border-t border-black/10">
            {ROWS.map((r, i) => {
              const hit = it.row === i;
              return (
                <li key={r.t} className="flex items-center gap-3 py-2.5">
                  <span className="min-w-0 flex-1">
                    <span className={clsx("block truncate text-[14px] transition-colors duration-500", hit ? "font-semibold text-[#0d0d0d]" : "font-medium text-[#5d5d5d]")}>{r.n}</span>
                    <span className="block truncate text-[12px] text-[#8f8f8f]">{r.tag}</span>
                  </span>
                  <span className={clsx("flex items-center gap-1.5 text-[12px] text-[#0d0d0d] transition-opacity duration-500", hit ? "opacity-100" : "opacity-0")}>
                    <span className="h-1.5 w-1.5 rounded-full bg-[#0d0d0d]" />
                    New insight
                  </span>
                </li>
              );
            })}
          </ul>
        </div>

        {/* arriving insight */}
        <div className="absolute bottom-0 right-0 w-full sm:w-[72%]">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={step}
              initial={reduce ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.6, ease: EASE }}
              className="ui-card p-4"
            >
              <p className="text-[12px] text-[#8f8f8f]">{it.meta}</p>
              <p className="mt-1 text-[16px] font-semibold leading-snug text-[#0d0d0d]">{it.title}</p>
              <p className="mt-2 border-t border-black/10 pt-2 text-[13px] leading-relaxed text-[#5d5d5d]">{it.why}</p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </Stage>
  );
}
